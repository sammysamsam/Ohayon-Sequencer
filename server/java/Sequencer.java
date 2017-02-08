import java.util.Arrays;
import java.util.ArrayList;
import java.util.concurrent.ThreadLocalRandom;
import java.util.*;
public class Sequencer
{
    ArrayList<Strand> componentList;
    ThermodynamicsCalculator thermoCalc;
    ArrayList<FullStrand> fullStrandList;

    public Sequencer(ArrayList<Strand> componentList, ThermodynamicsCalculator x)
    {
        this.thermoCalc = x;
        this.componentList = componentList;
    }

    public Sequencer(ArrayList<Strand> componentList, ThermodynamicsCalculator x, ArrayList<FullStrand> fullStrandList)
    {
        this.thermoCalc = x;
        this.componentList = componentList;
        this.fullStrandList = fullStrandList;
    }


/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

STATUS OF STRANDLIST METHODS

** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    public void componentOverview()
    {
        CompareStrands c = new CompareStrands(this.thermoCalc);
        
        System.out.println("\n=========================================\n\n\n");        
        for(int i = 0; i < this.componentList.size(); i++)
        {
            Strand current = this.componentList.get(i);
            
            System.out.println("Sequence of Strand:"
                + current.name + " = " 
                + current.toString() 
                + "  Restricted sequence score:" 
                + restrictedSequences(current)+"\n" 
                );
 
            componentAnalysis(i,c);
            System.out.println("\n__________________");
        }
        System.out.println("\n=========================================\n\n\n");
    }

    public void componentAnalysis(int i,CompareStrands c){
        Strand strandCurrent = this.componentList.get(i);
        for(int x = i; x < this.componentList.size(); x++)
        {
                c.bestArrangement(strandCurrent,this.componentList.get(x));
        }
    }


    //////

    public void fullStrandOverview(CompareStrands c)
    {
        for(int x = 0; x < this.fullStrandList.size(); x++)
        {
            FullStrand currentFullStrand = this.fullStrandList.get(x);
            for(int y = x; y < this.fullStrandList.size(); y++)
            {
                FullStrand tempFullStrand = this.fullStrandList.get(y);

                int[] complementShifts = tempFullStrand.getComplementShifts(currentFullStrand,this.componentList);
                if(complementShifts.length == 0)
                {
                    System.out.print("\n\n"+currentFullStrand.name + " vs " + tempFullStrand.name+": ");
                    System.out.println(currentFullStrand.combine(this.componentList).mismatch(tempFullStrand.combine(this.componentList),5));
                    c.bestArrangement(currentFullStrand.combine(this.componentList),tempFullStrand.combine(this.componentList));
                }
                else
                {
                    System.out.print("\n\n* "+currentFullStrand.name + "vs " +tempFullStrand.name + ":"); // temp = this current = other
                    System.out.println(currentFullStrand.combine(this.componentList).mismatch2(tempFullStrand.combine(this.componentList), 5, complementShifts));  //current slides through while other stays same
                    c.bestArrangementFull(currentFullStrand.combine(this.componentList),tempFullStrand.combine(this.componentList),complementShifts);
                }
            }
        }
    }

    //////

    private void printFullStrand()
    {
      for(int y = 0; y < this.fullStrandList.size(); y++)
        {
            FullStrand tempFullStrand = this.fullStrandList.get(y);
            System.out.println(tempFullStrand.combine(this.componentList)+"\n");
        }
    }




/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

STRAND SEQUENCING METHOD:

** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    public boolean minimizeInteractions(int timeLimit)
    {
        long start = System.currentTimeMillis();
        long end = start - 2000 + timeLimit*60*1000; // 60 seconds * 1000 ms/sec
        
        System.out.println("\nRunning Sequencing Algorithm");

        CompareStrands comparer = new CompareStrands(thermoCalc);
        ArrayList<Strand> fullComponentList = this.componentList;
        ArrayList<FullStrand> fullStrandList = this.fullStrandList;
        this.componentList = new ArrayList<Strand>();

        /*
        step 1: add next strand
        step 2: randomize strand
        step 3: run base fixing algorithm, check if checkpoint 1 (restricted seq) is satisfied, if not go back to step 6
        step 4: run base fixing algorithm, check if checkpoint 2 (restricted seq, mismatch < 5) is satisfied, if not go back to step 6
        step 5: minimize component edges add next strand if checkpoint 3 is satisfied
        *: if strand is not successfully sequenced after 10 tries (numTries variable), 
        delete current and previous strand and start step 4 at previous step
        */

        for(int i = 0; i < fullComponentList.size(); i++)
        {
            int numTries = 0;
            Strand component = fullComponentList.get(i);
            this.componentList.add(component); //step 1 and 2
            this.strandRandomizer(component.length, i);
            
            System.out.println("\n~~~~~\nadd " + fullComponentList.get(i).name+"\n~~~~~");    
            while(true)
            {
                        //  if (System.currentTimeMillis() > end)
                        //      return false;
                    numTries++;

                    if(numTries > (10))
                    {
                        if(i > 0)                 
                        { 
                            System.out.println("back, list size now:" + this.componentList.size());
                            this.componentList.remove(i);
                            i = i - 2;          
                            this.componentList.remove(i + 1);
                            break;
                        }
                    }

                    this.strandRandomizer(component.length/2, i);   //step 2
                    System.out.print(".");
                    while(baseFixingAlgorithm(1, i, end))     //step 3
                    {
                    }
                        // if (System.currentTimeMillis() > end)
                        //    return false;
                    System.out.println(restrictedSequences(component));
                   if(!checkpoint1(i))  
                   {
                        numTries --;
                        continue;
                   }

                    while(baseFixingAlgorithm(2, i, end))     //step 4
                    {
                    } 
                    System.out.print("( "+this.totalConsecutiveMatches(i) +" )");

                    //if (System.currentTimeMillis() > end)
                    //   return false;
                    if(!sequencingStageCheckpoint(2))
                        continue;

                    this.minimizeEdges(i);           //step 5
                    System.out.print("[ "+sumFullStrand()+" ]");   

                    if(sequencingStageCheckpoint(3))
                        break;
            }
        }
        componentOverview();
        return true;
}

/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

CHECKPOINT FOR ALGORITHM METHODS:

** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    public int sumFullStrand()
    {
        int sum = 0;
        for(int i = 0; i < this.fullStrandList.size(); i++)
        {
            for(int h = i+1; h < this.fullStrandList.size(); h++)
            {
                //System.out.print(" - " + this.fullStrandList.get(i).name + "  "+ this.fullStrandList.get(h).name);
                sum = sum + this.fullStrandList.get(i).mismatch(this.fullStrandList.get(h),this.componentList);
            }  
        }  
        //System.out.println(" score: "+sum);
 
        return sum;
    }

    public int sumComponents()
    {
        int sum = 0;
        for(int i = 0; i < this.componentList.size(); i++)
        {
            sum = sum + this.totalConsecutiveMatches(i);
        }  
        return sum;
    }

    /** check if all strands have restricted sequence score above -100**/
    public boolean sequencingStageCheckpoint(int checkpointNumber)
    {
        
        if(checkpointNumber == 3)
        {
            if(sumFullStrand() > 0)
                    return false;
            else 
                return(sequencingStageCheckpoint(2));
        }

        for(int i = 0; i < this.componentList.size(); i++)
        {
            if(checkpointNumber == 2 && checkpoint2(i) == false)
                return false;
            if(checkpointNumber == 1 && checkpoint1(i) == false)

                return false;   
        }
        return true;
    }



    private boolean checkpoint2(int i)
    {
        if(this.totalConsecutiveMatches(i) > 0)
        {
            return false;
        }
        return checkpoint1(i);
    }

    private boolean checkpoint1(int i)
    {
        /*
        save this for later when melting point is added

        if (meltingPointDifference(this.componentList.get(i)) != 0 && this.componentList.get(i).desiredMeltingPoint != -1000)
            return false;
        */
        Strand currStrand = this.componentList.get(i);
        if (restrictedSequences(currStrand) < 0)
        {
            return false;
        }
        if (baseRatioScore(currStrand) > 10)
            return false;
        else
            return true;
    }
/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

FULL STRAND/EDGE ALGORITHM METHODS:

** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
public void minimizeEdges(int componentIndex)
{   
    int[] shuffledStrandOrder = shuffleStrandIndices(this.componentList.size());  
    
    while(true)
    {
        boolean changes = false;
        for(int i: shuffledStrandOrder)
        {
            //System.out.print(this.componentList.get(i).name+" before "+
            if (edgeFixingAlgorithm(i))
                changes = true;

            //int result = this.fullStrandMatches(this.componentList.get(i).name);            
            //System.out.println( "   after    "+result);
        
        }

        //if conditions satisfied or no changes can be made, break;
        if(!changes || ( 0 == this.fullStrandMatches(this.componentList.get(componentIndex).name)))
            break;
    }
}

public boolean edgeFixingAlgorithm(int strandPosition)
{
   boolean changes = false;

    char[] bases = shuffleBase();
    Strand currStrand = this.componentList.get(strandPosition);
    char[] baseArray = currStrand.sequence.toCharArray(); // strand x's sequence now split by each letter into array

    int[] basePositions = shuffleEdgeArray(currStrand);

    for (int basePosition: basePositions) // for every base in currStrand
    { 
        if(basePosition > -1)
        {
            if(0 == this.fullStrandMatches(this.componentList.get(strandPosition).name) )
                break;

            char originalbase = baseArray[basePosition];
            for (char testBase: bases)
            {
                if (!(originalbase == testBase))
                {
                    if(baseFixingTestEdge(strandPosition, testBase, baseArray, basePosition, originalbase) == true )
                    {
                        baseArray[basePosition] = testBase;
                        currStrand.setSequence(String.valueOf(baseArray));
                        changes = true;
                        break;
                    }   
                }
            }
        }
    }

    //return true if one or more changes have been made to strand
    return changes;
}


public boolean baseFixingTestEdge(int componentIndex, char testBase, 
                            char[] baseArray, int basePosition, char originalbase)
{
    int[] test1Scores = testSelf(componentIndex, testBase, baseArray, basePosition, originalbase);
    int initialBaseBalance = test1Scores[0];
    int initialRestrictedScore = test1Scores[1];
    int newBaseBalance = test1Scores[2];
    int newRestrictedScore = test1Scores[3];
    

    if ((newRestrictedScore > -1 ) && ( newBaseBalance < 12 ))
    {
        if (testEdge(componentIndex, testBase, baseArray, basePosition, originalbase))
        {
             return true;
        }
    }
    return false;
}

private boolean testEdge(int componentIndex, char testBase, 
                        char[] baseArray, int basePosition, char originalbase)
{
    int initialFULLscore= fullStrandMatches(this.componentList.get(componentIndex).name);
    int oldCOMPONENTScore= totalConsecutiveMatches(componentIndex);

    //replace testbase
    baseArray[basePosition] = testBase;
    this.componentList.get(componentIndex).setSequence(String.valueOf(baseArray));
    
    int newFULLscore = fullStrandMatches(this.componentList.get(componentIndex).name);
    int newCOMPONENTScore= totalConsecutiveMatches(componentIndex);


    //put base back
    baseArray[basePosition] = originalbase;
    this.componentList.get(componentIndex).setSequence(String.valueOf(baseArray));
    
    //if newscore (total mismatch score) is better( less than ) initial score
    if(initialFULLscore > newFULLscore)
        return true;
    else
        return false;
}
/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

COMPONENT ALGORITHM METHODS:

** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

   public boolean baseFixingAlgorithm(int phase, int strandPosition,long expiredTimer)
   {
        Strand currStrand = this.componentList.get(strandPosition);
        int[] basePositions = shuffleBaseArray(currStrand);
        //if(phase == 2)
        //    basePositions = getBasePositions(strandPosition);

        char[] baseArray = currStrand.sequence.toCharArray(); // strand x's sequence now split by each letter into array


        boolean changes = false;
        for (int basePosition: basePositions) // for every base in currStrand
        { 
            if(basePosition > -1)
            {
                char[] bases = shuffleBase();
                char originalbase = baseArray[basePosition];
                for (char testBase: bases)
                {
                    if(System.currentTimeMillis() > expiredTimer)
                    {
                        return false;
                    }
                    if (!(originalbase == testBase))
                    {
                        if ( (phase == 1 && baseFixingTestSelf(strandPosition, testBase, baseArray, basePosition, originalbase) == true )
                            || (phase == 2 && baseFixingTestMismatch(strandPosition, testBase, baseArray, basePosition, originalbase) == true)
                           )
                        {
                            baseArray[basePosition] = testBase;
                            currStrand.setSequence(String.valueOf(baseArray));
                            changes = true;
                            break;
                        }   
                    }
                }
            }
        }
        if  (  (phase == 1 && checkpoint1(strandPosition) == true) 
              ||(phase == 2 && checkpoint2(strandPosition) == true)
            )
            changes = false;

        //return true if one or more changes have been made to strand
        return changes;
    }

    public boolean baseFixingTestMismatch(int componentIndex, char testBase, 
                                    char[] baseArray, int basePosition, char originalbase)
    {
        int[] test1Scores = testSelf(componentIndex, testBase, baseArray, basePosition, originalbase);
        int initialBaseBalance = test1Scores[0];
        int initialRestrictedScore = test1Scores[1];
        int newBaseBalance = test1Scores[2];
        int newRestrictedScore = test1Scores[3];
        
        if ((newRestrictedScore > -1 ) && ( newBaseBalance < 12 ))
        {
            if( testMismatch(componentIndex, testBase, baseArray, basePosition, originalbase))
                return true;
        }
        return false;
    }


    private boolean testMismatch(int componentIndex, char testBase, 
                            char[] baseArray, int basePosition, char originalbase)
    {
        int initialscore= totalConsecutiveMatches(componentIndex,basePosition);
        
        //replace testbase
        baseArray[basePosition] = testBase;
        this.componentList.get(componentIndex).setSequence(String.valueOf(baseArray));
        
        int newscore = totalConsecutiveMatches(componentIndex,basePosition);
        
        //put base back
        baseArray[basePosition] = originalbase;
        this.componentList.get(componentIndex).setSequence(String.valueOf(baseArray));
        
        //if newscore (total mismatch score) is better( less than ) initial score
        if(initialscore > newscore)
        {
            return true;
        }
        return false;
    }   
    public boolean baseFixingTestSelf(int componentIndex, char testBase, 
                                    char[] baseArray, int basePosition, char originalbase)
    {
        int[] test1Scores = testSelf(componentIndex, testBase, baseArray, basePosition, originalbase);
        
        int initialBaseBalance = test1Scores[0];
        int initialRestrictedScore = test1Scores[1];
        int newBaseBalance = test1Scores[2];
        int newRestrictedScore = test1Scores[3];

        //improve restricted score
        if (newRestrictedScore > initialRestrictedScore)
        {
            return true;
        }

        //if base balance improves  and restricted score condition remains the satisfied
        if(initialBaseBalance > newBaseBalance
                    && initialBaseBalance > 10
                    && newRestrictedScore == 0)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    /** TEST 1 [0] = initial base balance, [1] = initial triple gs/triple cs/hairpin score,
     * [2] = new base balance, [3] = new restricted score */
    private int[] testSelf(int componentIndex, char testBase, char[] baseArray, int basePosition, char originalbase)
    {
        int[] test1scores = new int[4];
        Strand strand = this.componentList.get(componentIndex);

        test1scores[0]= baseRatioScore(strand);    
        test1scores[1] = restrictedSequences(strand); 
                 
        baseArray[basePosition] = testBase;
        strand.setSequence(String.valueOf(baseArray));
        
        test1scores[2] = baseRatioScore(strand);
        test1scores[3] = restrictedSequences(strand); 

        
        baseArray[basePosition] = originalbase;
        strand.setSequence(String.valueOf(baseArray));
            
        return test1scores;
    }

/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

STRAND RANDOMIZER METHOD:

** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    public boolean strandRandomizer(int number, int strandPosition)
    {
        Strand x = this.componentList.get(strandPosition);                                          
        
        char[] sequenceArray = x.sequence.toCharArray();            
        int[] basePosition = shuffleBaseArray(x);               
        int randomnumbermax = number;
        
        //check:randomizing up to max length 
        if(sequenceArray.length < number)
            randomnumbermax = sequenceArray.length;
        
        //check: number of non permanent bases is = or less than number of bases that will be randomized
        int nonblueprintcounter = sequenceArray.length;
        for(int z: basePosition)
        {
            if(z == -1)
                nonblueprintcounter --;
        }           
        if(nonblueprintcounter < randomnumbermax)
            randomnumbermax = nonblueprintcounter;              
        
            //make sure base position does not include bases that should not be changed (listed in blueprint)
            for(int d:basePosition)
            {
                char[] base = shuffleBase(); 
                if(d != -1)
                {
                    sequenceArray[d] = base[0];         
                    x.setSequence( String.valueOf(sequenceArray) ); 
                    randomnumbermax --;
                }
            }
        return false;
   }    
    
/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

STRAND VS STRAND CHECK METHOD:

** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    // Gets total number of consecutive hits equal or above the mismatch threshold
    // of a strand vs all other strands (if mismatch threshold are different then 
    // use the smallest threshold when comparing two strands)
    public int totalConsecutiveMatches(int strandPosition, int basePosition)
{

        Strand currStrand = this.componentList.get(strandPosition);
        int len = currStrand.length;
        if(len > 20)
        {
            int total = 0;

            int start = 0;
            if(basePosition > 5)
                start = basePosition - 5;
            int end = len;
            if(basePosition < len-6)
                end = basePosition + 5;

            String tempSequence = currStrand.sequence.substring(start,end);
            Strand tempStrand = new Strand(tempSequence,true);
            for(int i = 0; i < this.componentList.size(); i++)
            {
                if (i != strandPosition)
                {
                    Strand comparedStrand = this.componentList.get(i);
                    //get smallest mismatch threshold of the two strands
                    int consecNum = java.lang.Math.min(currStrand.mismatchThreshold,
                                                        comparedStrand.mismatchThreshold);
                    //strand vs others
                    total = total + tempStrand.mismatch(comparedStrand, consecNum);
                   
                    //strand complement vs others
                    if(currStrand.complementExists)
                    {
                        total = total + tempStrand.complement()
                                            .mismatch(comparedStrand, consecNum);
                    }
                }
            }
            return total;
        }
        else
            return totalConsecutiveMatches(strandPosition);

}
    public int totalConsecutiveMatches(int strandPosition)
    {
        int total = 0;
        Strand currStrand = this.componentList.get(strandPosition);


        for(int i = 0; i < this.componentList.size(); i++)
        {
            if (i != strandPosition)
            {
                Strand comparedStrand = this.componentList.get(i);
                //get smallest mismatch threshold of the two strands
                int consecNum = java.lang.Math.min(currStrand.mismatchThreshold,
                                                    comparedStrand.mismatchThreshold);
                //strand vs others
                total = total + currStrand.mismatch(comparedStrand, consecNum);
               
                //strand complement vs others
                if(currStrand.complementExists)
                {
                    total = total + currStrand.complement()
                                        .mismatch(comparedStrand, consecNum);
                }
            }
        }
        return total;
    }
    public int fullStrandMatches(String componentName)
    {
        int sum = 0;
        for(int x = 0; x < this.fullStrandList.size(); x++)
        {
            FullStrand currentFullStrand = this.fullStrandList.get(x);
                
            // only check for fullstrands that contains component (identified by its name), and if all components of full strand exist
            if(currentFullStrand.contains(componentName))
            {
                for(int y = 0; y < this.fullStrandList.size(); y++)
                {
                    FullStrand tempFullStrand = this.fullStrandList.get(y);
                    sum = sum + currentFullStrand.mismatch(tempFullStrand,this.componentList);
                } 
            }
        }
        return sum;
    }

/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 * Return restricted sequence score ( takes into account GGG, 5 repeats and possible hairpining)
 * 
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */ 
    public int fullRestrictedSequences(Strand currentStrand)
    {
        int seqScore = 0;

        for(int x = 0; x < this.fullStrandList.size(); x++)
        {
            FullStrand currentFullStrand = this.fullStrandList.get(x);
 
             if(currentFullStrand.contains(currentStrand.name))
            {
                Strand strand = currentFullStrand.combine(this.componentList);
                char[] currSeq = strand.sequence.toCharArray();
                
                seqScore = seqScore - this.baseRepeatCheck(currSeq,currentStrand.complementExists);
            }
        }

        return seqScore;     //negative
    }
    public int restrictedSequences(Strand currentStrand)
    {
        char[] currSeq = currentStrand.sequence.toCharArray();
        int seqScore =  -1 * currentStrand.mismatch(currentStrand,currentStrand.hairpinThreshold);
        //seqScore =  seqScore - currentStrand.selfvsComplementMismatch(this.thermoCalc);

        if(this.fullStrandList.size() == 0)
            seqScore = seqScore - baseRepeatCheck(currSeq,currentStrand.complementExists);
        else
            seqScore = seqScore + fullRestrictedSequences(currentStrand);
 
        return seqScore;
    }

    private int baseRepeatCheck(char[] currSeq, boolean compExist)
    {
        int seqScore = 0;
        for (int z = 0; z < currSeq.length - 3; z++)
        {
            if(z != currSeq.length-4)
            {
                if( (currSeq[z] == currSeq[z+1]) 
                        && (currSeq[z+1] == currSeq[z+2]) 
                        && (currSeq[z+2] == currSeq[z+3])
                        && (currSeq[z+3] == currSeq[z+4]) && currSeq[z] != 'o')

                {
                    seqScore = seqScore + 10;
                }
            }
            String possibilityA = "" + currSeq[z]+ currSeq[z+1]+ currSeq[z+2];
            String possibilityB = "" + currSeq[z+1]+ currSeq[z+2]+ currSeq[z+3];
            if( possibilityA.equals("GGG") || possibilityB.equals("GGG"))
            {
                 seqScore = seqScore + 10;               
            }

            if( (possibilityB.equals("CCC") || possibilityA.equals("CCC")) 
                && compExist == true) 
            {
                seqScore = seqScore + 10;
            }
        }   
        return seqScore;   
    }
/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

MELTING POINT METHOD:

** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    public double meltingPointDifference(Strand x)
    {
        if(x.desiredMeltingPoint == -1000)
        {
            return 0;
        }
        double TmDifference = java.lang.Math.abs(x.desiredMeltingPoint - this.thermoCalc.temperatureCalculator(x));
        if(TmDifference <3)
            return 0;
        return TmDifference;
    }
    
    
/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

UTILITY METHODS:

** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  /** Return .500 - percentage of A and T in sequence (closer to 0 the better)
    */


   public static int baseRatioScore(Strand currentStrand)
   {
        if(currentStrand.length <= 4)
            return 0;
        char[] currSeq = currentStrand.sequence.toCharArray();
        double c;
        int AT = 0;
        int CG = 0;
        for (int z = 0; z < currSeq.length; z++)
        {
            char x = currSeq[z];
            if(x == 'A'|| x == 'T')
            {
                AT++;
            }
            else
            {
                CG++;
            }
        }
        int total = AT + CG;
        c = (double)AT/(double)total;     //percentage of AT in strand
        c = (double).5 - c;             // .5 (desired percentage) = actualpercentage + difference   ==> desiredpercentage - actualpercentage = difference
        c = Math.abs(c);
        return (int)(c*100);
   }
   /** 
    * Return randomized array of possible bases (A T C G)
    */
   public static char[] shuffleBase() 
   {       
       char[] array= {'G', 'A', 'T', 'C'};
       for (int i = array.length - 1; i > 0; i--) 
       {
            int j = (int)Math.floor(Math.random() * (i + 1));
           char temp = array[i];
           array[i] = array[j];
           array[j] = temp;
       }
       return array;
   }
   /** Return randomized array of possible base positions (0 to strand.length-1) if blueprint exists, then do not include position of bases that can not be changed)
    */
   public int[] shuffleBaseArray(Strand x) 
   {
        int[] basePosition = new int[x.length];
        if(x.blueprintExists == false)
        {
            for (int f = 0; f < x.length; f++)
            { 
                basePosition[f] = f;
            }
        }
        else
        {
            for (int f = 0; f < x.length; f++)
            {
                if(x.blueprint[f] == 'o')
                    basePosition[f] = f;
                else
                    basePosition[f] = -1;
            }
        }
        return basePosition;
   }
    public int[] getBasePositions(int currStrandIndex)
    {
        ArrayList<Integer> worstBases = new ArrayList<Integer>();
        Strand currStrand = this.componentList.get(currStrandIndex);

        for(int i = 0; i < this.componentList.size(); i++)
        {
            Strand comparedStrand = this.componentList.get(i);
            ArrayList<Integer> currBadBases = currStrand.baseArrayMismatch(comparedStrand, 5);
            if(currBadBases.size() > worstBases.size())
                worstBases = currBadBases;
        }

        if(currStrand.blueprintExists)
        {
            for (int f = 0; f < worstBases.size(); f++)
            {
                if(currStrand.blueprint[worstBases.get(f)] != 'o')
                {
                    worstBases.set(f, -1);
                }
            }
        }
        int[] arr = worstBases.stream().mapToInt(i -> i).toArray();
        return arr;
    }


   public int[] shuffleEdgeArray(Strand x) 
   {
        if(x.length < 9)
        {
            return shuffleBaseArray(x);
        }
        else
        {
            int[] basePosition = {0,1,2,3,x.length-4,x.length-3,x.length-2,x.length-1};
            if(x.blueprintExists)
            {
                int counter = 0;
                for(int pos : basePosition)
                {
                    if(x.blueprint[pos] != 'o'){
                        basePosition[counter] = -1;
                    }
                    counter ++;
                }
            }
           shuffleArray(basePosition);
           return basePosition;
        }
   }


     // Implementing Fisher–Yates shuffle
    public void shuffleArray(int[] ar)
    {
        Random rnd = ThreadLocalRandom.current();
        for (int i = ar.length - 1; i > 0; i--)
        {
            int index = rnd.nextInt(i + 1);
            int a = ar[index];
            ar[index] = ar[i];
            ar[i] = a;
        }
    }

    public int[] shuffleStrandIndices(int range) 
    {
        int[] intArray = new int[range];
        for (int d = 0; d < range; d++)
        {
            intArray[d] =d;
        }
        shuffleArray(intArray);
        return intArray;
    }
}

