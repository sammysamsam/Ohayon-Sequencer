import java.util.Arrays;
import java.util.ArrayList;
import java.util.concurrent.ThreadLocalRandom;
import java.util.*;
public class Sequencer
{
    ArrayList<Strand> componentList;
    ThermodynamicsCalculator thermoCalc;
    ArrayList<FullStrand> fullStrandList;

    int fullStrandMismatchLimit = 5;

    public Sequencer(ArrayList<Strand> componentList, ThermodynamicsCalculator x)
    {
        this.thermoCalc = x;
        this.componentList = componentList;
        this.fullStrandList = new ArrayList<FullStrand>();
    }

    public Sequencer(ArrayList<Strand> componentList, ThermodynamicsCalculator x, ArrayList<FullStrand> fullStrandList)
    {
        this.thermoCalc = x;
        this.componentList = componentList;
        this.fullStrandList = fullStrandList;
    }

    public void runAlgorithm()
    {
        minimizeInteractions();
    }

/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

STATUS OF STRANDLIST METHODS

** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    public void componentOverview()
    {
        CompareStrands c = new CompareStrands(this.thermoCalc);
        for(int i = 0; i < this.componentList.size(); i++)
        {
            System.out.println("\n===================");

            Strand current = this.componentList.get(i);
            
            System.out.println("Sequence of Strand:"
                + current.name + " = " 
                + current.toString() 
                + this.componentList.get(i).name 
                + "  Restricted sequence score:" 
                + restrictedSequences(current)+"\n" 
                );
 
            componentAnalysis(i,c);
        }
    }

    public void componentAnalysis(int i,CompareStrands c){
        Strand strandCurrent = this.componentList.get(i);
        for(int x = 0; x < this.componentList.size(); x++)
        {
            if(x != i)
            {
                c.bestArrangement(strandCurrent,this.componentList.get(x));
            }
        }
    }


    //////

    public void fullStrandOverview()
    {
        CompareStrands c = new CompareStrands(this.thermoCalc);
        for(int x = 0; x < this.fullStrandList.size(); x++)
        {
            FullStrand currentFullStrand = this.fullStrandList.get(x);
            for(int y = x; y < this.fullStrandList.size(); y++)
            {
                FullStrand tempFullStrand = this.fullStrandList.get(y);

                int[] complementShifts = currentFullStrand.getComplementShifts(tempFullStrand,this.componentList);
                if(complementShifts.length == 0)
                {
                    System.out.print("\n\n"+currentFullStrand.name + " vs "+ tempFullStrand.name+": ");
                    System.out.println(currentFullStrand.combine(this.componentList).mismatch(tempFullStrand.combine(this.componentList),this.fullStrandMismatchLimit));
                    c.bestArrangement(currentFullStrand.combine(this.componentList),tempFullStrand.combine(this.componentList));
                   
                }
                else
                {
                    System.out.print("\n\n* "+currentFullStrand.name + "vs "+tempFullStrand.name + ":"); // temp = this current = other
                    System.out.println(currentFullStrand.combine(this.componentList).mismatch2(tempFullStrand.combine(this.componentList),this.fullStrandMismatchLimit,complementShifts));  //current slides through while other stays same
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

    public void minimizeInteractions()
    {
        System.out.println("Running Sequencing Algorithm:");

        ArrayList<Strand> fullComponentList = this.componentList;
        ArrayList<FullStrand> fullStrandList = this.fullStrandList;
        this.componentList = new ArrayList<Strand>();

        /* 
        Step 1: add first strand to list
        Step 2: run base fixing algorithm on phase 1 (eliminate restricted sequences) until 
        no changes can be done anymore (the algorithm returns false) or until restricted sequence score is satisfied (checkpoint 1)
        Step 3: (if necessary) randomize strand at first position and start again at step 2
        */
        this.componentList.add(fullComponentList.get(0)); //step1
        while(true)
        {
            while(baseFixingAlgorithm(1, 0))  // step2
            {
            }

            if(sequencingStageCheckpoint(1))
                break;
            else
                this.strandRandomizer(30, 0); //step 3
        }

        /*
        step 4: add next strand
        step 5: randomize strand
        step 6: run base fixing algorithm, check if checkpoint 1 (restricted seq) is satisfied, if not go back to step 6
        step 7: run base fixing algorithm, check if checkpoint 2 (restricted seq, mismatch < 5) is satisfied, if not go back to step 6
        step 8: minimize component edges add next strand if checkpoint 3 is satisfied
        *: if strand is not successfully sequenced after 10 tries (numTries variable), 
        delete current and previous strand and start step 4 at previous step
        */

        for(int i = 1; i < fullComponentList.size(); i++)
        {
            int numTries = 0;

            this.componentList.add(fullComponentList.get(i)); //step 4
            System.out.println("add " + fullComponentList.get(i).name);  
                        this.printFullStrand();       
            while(true)
            {
                    numTries++;
                    this.strandRandomizer(5, i);   //step 5
              
                    if(numTries > 10)
                    {
                        if(i > 1)                 
                        {
                            this.fullStrandOverview();                          
                            this.componentList.remove(i);
                            i = i - 2;          
                            this.componentList.remove(i + 1);
                            System.out.println("back, list size now:" + this.componentList.size());
                            break;
                        }
                    }


                    int[] stages = {1,2};
                    boolean checkpointResult = false;    
                    for(int stage: stages)
                    {
                        checkpointResult = false;
                        System.out.println("stage : "+stage);  
                        if(stage == 2)  
                            minimizeEdges();
                        while(baseFixingAlgorithm(stage, i))     //step 6
                        {
                            if(sequencingStageCheckpoint(stage))
                            {
                                checkpointResult = true;
                                break;
                            }
                        }
                        if(!checkpointResult)
                            break;
                    }
                    if(!checkpointResult)
                        continue;

                    System.out.print("\n___\n");
                    this.minimizeEdges();

                    if(sequencingStageCheckpoint(3))
                        break;
            }
        }
        this.printFullStrand();
    }

/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

CHECKPOINT FOR ALGORITHM METHODS:

** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    /** check if all strands have restricted sequence score above -100**/
    public boolean sequencingStageCheckpoint(int checkpointNumber)
    {
        for(int i = 0; i < this.componentList.size(); i++)
        {
            if(checkpointNumber == 3 && checkpoint3(i) == false)
                return false;
            if(checkpointNumber == 2 && checkpoint2(i) == false)
                return false;
            if(checkpointNumber == 1 && checkpoint1(i) == false)
                return false;   
        }
        return true;
    }
    private boolean checkpoint3(int i)
    {
        if(this.fullStrandList.size() > 0 && this.fullStrandMatches(this.componentList.get(i).name) > 0)
            return false;
        return checkpoint2(i);
    }

    private boolean checkpoint2(int i)
    {
        if(this.totalConsecutiveMatches(i) > 0)
            return false;
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
            return false;
        if (selfBaseBalance(currStrand) > 10)
            return false;
        else
            return true;
    }
/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

FULL STRAND/EDGE ALGORITHM METHODS:

** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
public void minimizeEdges()
{   
    if(this.fullStrandList.size() > 0)
    {
        int[] shuffledStrandOrder = shuffleStrandIndices(this.componentList.size());  

        while(true)
        {
            boolean changes = false;
            for(int i: shuffledStrandOrder)
            {
                System.out.print(this.componentList.get(i).name+" before "+
                    this.fullStrandMatches(this.componentList.get(i).name));


                if (edgeFixingAlgorithm(i))
                    changes = true;

                int result = this.fullStrandMatches(this.componentList.get(i).name);            
                System.out.println( "   after    "+result);
            }

            //if conditions satisfied or no changes can be made, break;
            if(!changes || sequencingStageCheckpoint(3))
                break;
        }
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
            if(checkpoint3(strandPosition))
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
    return false;
}
/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

COMPONENT ALGORITHM METHODS:

** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

   public boolean baseFixingAlgorithm(int phase, int strandPosition)
   {
        Strand currStrand = this.componentList.get(strandPosition);
        int[] basePositions = shuffleBaseArray(currStrand);
        char[] baseArray = currStrand.sequence.toCharArray(); // strand x's sequence now split by each letter into array
        

        boolean changes = false;
        for (int basePosition: basePositions) // for every base in currStrand
        { 
            if(basePosition > -1)
            {
                if(  (phase == 1 && checkpoint1(strandPosition) == true) 
                        || (phase == 2 && checkpoint2(strandPosition) == true)
                       )
                    break;  
                char[] bases = shuffleBase();     
                char originalbase = baseArray[basePosition];
                for (char testBase: bases)
                {
                    if (!(originalbase == testBase))
                    {
                        if(  (phase == 1 && baseFixingTestSelf(strandPosition, testBase, baseArray, basePosition, originalbase) == true )
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
                    && newRestrictedScore >= 0)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    private boolean testMismatch(int componentIndex, char testBase, 
                            char[] baseArray, int basePosition, char originalbase)
    {
        int initialscore= totalConsecutiveMatches(componentIndex);
        
        //replace testbase
        baseArray[basePosition] = testBase;
        this.componentList.get(componentIndex).setSequence(String.valueOf(baseArray));
        
        int newscore = totalConsecutiveMatches(componentIndex);
        
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

    /** TEST 1 [0] = initial base balance, [1] = initial triple gs/triple cs/hairpin score,
     * [2] = new base balance, [3] = new restricted score */
    private int[] testSelf(int componentIndex, char testBase, char[] baseArray, int basePosition, char originalbase)
    {
        int[] test1scores = new int[4];
        
        test1scores[0]= selfBaseBalance(this.componentList.get(componentIndex));    
        test1scores[1] = restrictedSequences(this.componentList.get(componentIndex));
        
        baseArray[basePosition] = testBase;
        this.componentList.get(componentIndex).setSequence(String.valueOf(baseArray));
        
        test1scores[2] = selfBaseBalance(this.componentList.get(componentIndex));
        test1scores[3] = restrictedSequences(this.componentList.get(componentIndex));
        
        baseArray[basePosition] = originalbase;
        this.componentList.get(componentIndex).setSequence(String.valueOf(baseArray));
            
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
                    int[] complementShifts = currentFullStrand.getComplementShifts(tempFullStrand,this.componentList);
                    
                    if(complementShifts.length == 0)
                    {
                        Strand strand1 = currentFullStrand.combine(this.componentList);
                        Strand strand2 = tempFullStrand.combine(this.componentList);
                        sum = sum +strand1.mismatch(strand2,this.fullStrandMismatchLimit);
                        //System.out.println(currentFullStrand.name+" "+currentFullStrand.combine(this.componentList).sequence+" vs "+tempFullStrand.name+" "+tempFullStrand.combine(this.componentList).sequence+" | "+sum);
                        
                    }
                    else
                    {
                        Strand strand1 = currentFullStrand.combine(this.componentList);
                        Strand strand2 = tempFullStrand.combine(this.componentList);
                        sum = sum +strand1.mismatch2(strand2,this.fullStrandMismatchLimit,complementShifts); 
                       // System.out.println(currentFullStrand.name+" "+currentFullStrand.combine(this.componentList).sequence+" vs "+tempFullStrand.name+" "+tempFullStrand.combine(this.componentList).sequence+" | "+sum);
                    }
                } 
            }

        }
        return sum;
    }

/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 * Return restricted sequence score ( takes into account GGG, quadruple repeats and possible hairpining)
 * 
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */ 

    public int restrictedSequences(Strand currentStrand)
    {
        char[] currSeq = currentStrand.sequence.toCharArray();
        

        int seqScore =  -1 * currentStrand.mismatch(currentStrand,currentStrand.hairpinThreshold);
        seqScore =  seqScore - currentStrand.selfvsComplementMismatch(this.thermoCalc);
        
       /*
        // strand vs itself, 5 mismatch limit   (i think this is unnecessary cus it is checked with check above plus we want to give ppl freedom to make hairpin)
        seqScore = seqScore - 10*currentStrand.consecMismatch(this.thermoCalc, 5);
        */

        for (int z = 0; z < currSeq.length - 3; z++)
        {
            char[] baselist = {currSeq[z], currSeq[z + 1], currSeq[z + 2], currSeq[z + 3]};     
            if((baselist[0] == baselist[1]) 
                    && (baselist[1] == baselist[2]) 
                    && (baselist[2] == baselist[3]))
            {
                seqScore = seqScore - 10;
            }
            String possibilityA = "" + baselist[0]+ baselist[1]+ baselist[2];
            String possibilityB = "" + baselist[1]+ baselist[2]+ baselist[3];
            if( possibilityA.equals("GGG") || possibilityB.equals("GGG"))
            {
                 seqScore = seqScore - 10;               
            }

            if( (possibilityB.equals("CCC") || possibilityA.equals("CCC")) 
                && currentStrand.complementExists == true) 
            {
                seqScore = seqScore - 10;
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
   public static int selfBaseBalance(Strand currentStrand)
   {
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
                {
                    basePosition[f] = f;
                }
                else
                {
                    basePosition[f] = -1;
                }
            }
        }
        return basePosition;
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
                for(int pos : basePosition)
                {
                    if(x.blueprint[pos] == 'o')
                        basePosition[pos] = -1;
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
