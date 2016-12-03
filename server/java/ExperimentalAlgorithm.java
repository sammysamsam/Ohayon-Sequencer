import java.util.Arrays;
import java.util.ArrayList;
public class ExperimentalAlgorithm {

ArrayList<Strand> strandlist;
ThermodynamicsCalculator thermocalc;

public ExperimentalAlgorithm(ArrayList<Strand> strandlist,ThermodynamicsCalculator x){
	this.thermocalc = x;
	this.strandlist = strandlist;
}
public void runAlgorithm(){
	minimizeinteractions();
	//scorecheck();
}

/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

STATUS OF STRANDLIST METHODS

** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */


public void progresschecker(){
	for(int i = 0;i < this.strandlist.size();i++){
		strandstatus(i);
	}
 	System.out.println("\n");
}
public void strandstatus(int i){
	Strand current = this.strandlist.get(i);
    System.out.println("\nSequence of Strand:"+current.name + " = \"" + current.toString()+this.strandlist.get(i).name+"  Restricted sequence score:" + RestrictedSequences(current)+"\nConsecutive 5 Mismatch Score: "+consecCheck(i,5) + "   |   Consecutive Mismatch Threshold Score: "+maxConsec(i));	 	
}



public void scorecheck(){
	for(int i = 0;i < this.strandlist.size();i++){
	 	System.out.print("\n___________________________________________________________\n");
		scorechecker(this.strandlist.get(i),i);		
	}
}
protected void scorechecker(Strand currentstrand, int i){

	strandstatus(i);
	this.strandlist.get(i).setmismatchtheshold(this.strandlist.get(i).mismatchthreshold-1);
 	int position = (int)strandcheck(i)[1];
   
    Strand reverse = currentstrand.reverse();
    reverse.isFivePrime = true;
 	
	if(this.strandlist.get(i).complementexists == true){
 	 	if(position != -1){
 	 		String[][] ff = {this.strandlist.get(i).lowestFreeEnergy(this.strandlist.get(position), this.thermocalc), this.strandlist.get(i).complement().lowestFreeEnergy(this.strandlist.get(position), this.thermocalc)};	 		
 	 		System.out.println("\n\nCurrent Strand vs Other Strand\nLowest free energy:"+strandcheck(i)[0]+ "kcal/mol"); 
 	 		System.out.println(ff[0][1]+"\nfree energy: "+ff[0][0]+"kcal/mol\n\nComplement vs Other Strand\n"+ff[1][1]+"\nfree energy: "+ff[1][0]+"kcal/mol\n");
 	 	}
 	 	String[] hh = this.strandlist.get(i).complement().lowestFreeEnergy(this.strandlist.get(i), this.thermocalc);
 	 	System.out.println("\n              vs\n"+hh[1]+"\nfree energy: "+hh[0]+"kcal/mol\n");
 	}
 	else{
 	 	if(position != -1){
 	 		String[] ff = this.strandlist.get(position).lowestFreeEnergy(this.strandlist.get(i), this.thermocalc);
 	 		System.out.println(ff[1]+"\nfree energy: "+ff[0]+"kcal/mol  |  Tm: "+this.thermocalc.temperatureCalculator(this.strandlist.get(i)));
 	 	}
		System.out.println("\n(complement does not exist)\n");
 	}
}


/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

STRAND SEQUENCING METHOD:

** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */


	public void minimizeinteractions(){
		System.out.println("Running Sequencing Algorithm:");
		ArrayList<Strand> fulllist = this.strandlist;
		this.strandlist = new ArrayList<Strand>();
		
		this.strandlist.add(fulllist.get(0));
		while(true){
			while(Algorithm(1,0)){
			}
			if(algorithmcheckpoint(1)){
				break;
			}
			else{
				this.StrandRandomizer(30, 0);
			}
		}

		for(int i = 1; i< fulllist.size();i++){
			int counter = 0;
			//progresschecker();
			this.strandlist.add(fulllist.get(i));
			while(true){
				counter++;
				this.StrandRandomizer(30, i);
				if(counter > 150){
					if(i > 1){
						this.strandlist.remove(i);
						i= i -2;			
						this.strandlist.remove(i+1);
						break;
					}
				}		
				while(Algorithm(1,i)){					
					if(algorithmcheckpoint(1)){
						break;
					}	
				}
				if(!algorithmcheckpoint(1)){
					continue;
					}
				while(Algorithm(2,i)){
					if(algorithmcheckpoint(2))
						break;
				}
				if(!algorithmcheckpoint(2)){
					continue;
				}
				while(Algorithm(3,i)){
					if(algorithmcheckpoint(3))
						break;
				}

				if(algorithmcheckpoint(3)){
					counter = 0;
					break;
				}
				System.out.println("checkpointFINAL");
			}
		}
	}
/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

CHECKPOINT FOR ALGORITHM METHODS:

** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

/** check if all strands have restricted sequence score above -100**/
public boolean algorithmcheckpoint(int checkpointnumber){
	for(int i = 0;i<this.strandlist.size();i++){
		if(checkpointnumber == 3 &&checkpoint3(i) == false)
			return false;
		if(checkpointnumber == 2 &&checkpoint2(i) == false)
			return false;
		if(checkpointnumber == 1 && checkpoint1(i) == false)
			return false;	
	}
	return true;
}

private boolean checkpoint3(int i){
	if(this.consecCheck(i,5) > 0){
		//System.out.println("\nissue: 1");
		return false;
	}
	if (RestrictedSequences(this.strandlist.get(i)) < -99)   {
		//System.out.print("issue: 2");
			return false;
	}
	if(this.maxConsec(i) > 0){
		return false;	
	}
	if(this.consecCheck(i,this.strandlist.get(i).mismatchthreshold) > 0){
		//System.out.println("\nissue: 1");
		return false;
	}
	else
		return true;
}


private boolean checkpoint2(int i){	
		if(this.consecCheck(i,5) > 0)
			return false;
		if (RestrictedSequences(this.strandlist.get(i)) < -99)   			
   			return false;	
		else
			return true;
}
private boolean checkpoint1(int i){
		if (RestrictedSequences(this.strandlist.get(i)) < -99)
   			return false;
   		//if (meltingPointDifference(this.strandlist.get(i)) != 0 && this.strandlist.get(i).DesiredMeltingPoint != -1000)
   			//return false;
   		else
   			return true;
}



/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

ALGORITHM METHODS:

** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */


   public boolean Algorithm(int phase,int strandposition){      
  				 				
  				boolean changes = false;
		   		String[] base = shufflebase();
		   		int[] baseposition = shuffleBaseArray(this.strandlist.get(strandposition));		   		
		   		String[] SequenceArray = this.strandlist.get(strandposition).sequence.split("(?!^)"); 		//	strand x's sequence now split by each letter into array   		
		   	   	
		   		for (int z: baseposition){ 			//	FOR EVERY BASE IN STRAND
		   	   		if(z >-1){   			  
				   		if(phase == 2 && checkpoint2(strandposition) == true||phase == 1 && checkpoint1(strandposition) == true)
				   			break;	
		   	   			
		   	   			String originalbase = SequenceArray[z];						  	   			
		   	   			
		   	   			for (String TESTBASE: base){   				
		   	   				if (TESTBASE.equalsIgnoreCase(originalbase) == false){		   	   							   	   					
		   	   					if(phase == 1 && GeneticAlgorithm1(strandposition,TESTBASE,SequenceArray,z,originalbase) == true || phase == 2 && GeneticAlgorithm2(strandposition,TESTBASE,SequenceArray,z,originalbase) == true || phase == 3 && GeneticAlgorithm3(strandposition,TESTBASE,SequenceArray,z,originalbase) == true){		
		   	   						SequenceArray[z] = TESTBASE;
		   	   						this.strandlist.get(strandposition).sequence(Arrays.toString(SequenceArray));
		   	   						changes = true;
		   	   						break;
		   	   					}		   	   					
		   	   				}
		   				}
		   	   		}
		   	}
		   	return changes;
}   
   
   public boolean GeneticAlgorithm3(int r,String testbase,String[] SequenceArray,int z, String originalbase){        		  				
			double[] Test1Scores = test1(r,testbase,SequenceArray,z,originalbase);	
			if ((Test1Scores[3] > -100 ) && ( Test1Scores[2] < .12 ) && test3(r,testbase,SequenceArray,z,originalbase))
				return true;  				
			return false;
}
   
	private boolean test3(int r,String testbase,String[] SequenceArray,int z, String originalbase){	
		double[] test3scores = { 0,0};
		test3scores[0] = maxConsec(r);
  		SequenceArray[z] = testbase;
  		this.strandlist.get(r).sequence(Arrays.toString(SequenceArray));
		
  		test3scores[1] = maxConsec(r);
  		SequenceArray[z] = originalbase;
  		this.strandlist.get(r).sequence(Arrays.toString(SequenceArray));
  			
  		if(test3scores[0] > test3scores[1])
  			return true;
  		return false;
	}
	

   public boolean GeneticAlgorithm2(int r,String testbase,String[] SequenceArray,int z, String originalbase){        	
			//TEST 1 [0] = initial base balance, [1] = initial restricted score, [2] = new base balance, [3] = new restricted score	  	  				
			double[] Test1Scores = test1(r,testbase,SequenceArray,z,originalbase);	
			if ((Test1Scores[3] > -100 ) && ( Test1Scores[2] < .12 ) && test2(r,testbase,SequenceArray,z,originalbase))
	   	   		return true;	   				
			return false;
}
   
   
   private boolean test2(int r,String testbase,String[] SequenceArray,int z, String originalbase){
		
		//find if total number of max possible consecutive mismatches decreases if test base is inserted
		int maxconsecs = 1;
		for (int i = 2;i< SequenceArray.length;i++){
		   	if(consecCheck(r, i) == 0)
		   		break;
		   	else
		   		maxconsecs = i;
		}		   	   				
		double maxconsecscore = consecCheck(r, maxconsecs);
		SequenceArray[z] = testbase;
		this.strandlist.get(r).sequence(Arrays.toString(SequenceArray));		  	
		
		int newmaxconsecs = 1;
		for (int i = 2;i< SequenceArray.length;i++){
		   	if(consecCheck(r, i) == 0)
		   		break;
		   	else
		   		newmaxconsecs = i;
		}	
		
		double newmaxconsecscore =consecCheck(r, newmaxconsecs); 	
		SequenceArray[z] = new String(originalbase);
		this.strandlist.get(r).sequence(Arrays.toString(SequenceArray));		
		
		//if total number of possible consecutive matches larger or equal to consecnum decreases AND largest consecutive 
		if( (newmaxconsecscore < maxconsecscore && newmaxconsecs <= maxconsecs) || newmaxconsecs < maxconsecs){
			//System.out.println(newmaxconsecs +"  <=  " + maxconsecs + "|  "+ newmaxconsecscore + " , "+  maxconsecscore);
			return true;
		}
		return false;
}
   
   public boolean GeneticAlgorithm1(int r,String testbase,String[] SequenceArray,int z, String originalbase){        	
	   				//TEST 1 [0] = initial base balance, [1] = initial restricted score, [2] = new base balance, [3] = new restricted score	  	  				
	   				double[] Test1Scores = test1(r,testbase,SequenceArray,z,originalbase);	
	   				if ((Test1Scores[3] > Test1Scores[1] && Test1Scores[1] < -99 ) || ((Test1Scores[0] > Test1Scores[2] && Test1Scores[0] > .1 ) && Test1Scores[3] > -100))
	   	   				return true;
	   	   			return false;
}


/**	TEST 1 [0] = initial base balance, [1] = initial restricted score, [2] = new base balance, [3] = new restricted score */
   private double[] test1(int r,String testbase,String[] SequenceArray,int z, String originalbase){		
	   double[] test1scores = new double[4];
	
	   test1scores[0]= SelfBaseBalance(this.strandlist.get(r));	
	   test1scores[1] = RestrictedSequences(this.strandlist.get(r));
	
	   SequenceArray[z] = testbase;
	   this.strandlist.get(r).sequence(Arrays.toString(SequenceArray));
	
	   test1scores[2]= SelfBaseBalance(this.strandlist.get(r));	
		test1scores[3] = RestrictedSequences(this.strandlist.get(r));
	
		SequenceArray[z] = originalbase;
		this.strandlist.get(r).sequence(Arrays.toString(SequenceArray));
		
		return test1scores;
  }



/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

STRAND RANDOMIZER METHOD:

** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */


    public boolean StrandRandomizer(int number, int strandposition){
      			Strand x = this.strandlist.get(strandposition);			   						   		
		   		
      			String[] SequenceArray = x.sequence.split("(?!^)");      		
      			int[] baseposition = shuffleBaseArray(x);     			
      			int randomnumbermax = number;
      			
      			//check:randomizing up to max length 
      			if(SequenceArray.length < number)
      				randomnumbermax = SequenceArray.length;
      			
      			//check: number of non permanent bases is = or less than number of bases that will be randomized
      			int nonblueprintcounter = SequenceArray.length;
      			for(int z: baseposition){
      				if(z == -1)
      					nonblueprintcounter --;
      			}			
      			if(nonblueprintcounter < randomnumbermax)
      				randomnumbermax = nonblueprintcounter;   			
      			
   					//make sure base position does not include bases that should not be changed (listed in blueprint)
   					for(int d:baseposition){
   	   					String[] base = shufflebase(); 
   	   					if(d != -1){
   	   						SequenceArray[d] = base[0];			
   	   						x.sequence(Arrays.toString(SequenceArray));	
   	   						randomnumbermax --;
   	   					}
   					}
      	return false;
   }  	
    
    
    
/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

STRAND VS STRAND CHECK METHOD:

** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

//Gets total number of consecutive hits equal or above the mismatch threshold of a strand vs all other strands (if mismatch threshold are different then use the smallest threshold when comparing two strands)
public double maxConsec(int strandposition){

	double total = 0;
	 for(int i = 0; i < this.strandlist.size(); i++) {
		   if (i != strandposition){
			   int consecnum = this.strandlist.get(strandposition).mismatchthreshold;
			   if (consecnum > this.strandlist.get(i).mismatchthreshold){
				   consecnum = this.strandlist.get(i).mismatchthreshold;
			   }
			   
			   if(1 >= this.strandlist.get(strandposition).highestConsecPossible(this.strandlist.get(i), consecnum, this.thermocalc)){
				   total = total + this.strandlist.get(strandposition).highestConsecPossible(this.strandlist.get(i), consecnum, this.thermocalc);				   
			   }
			   
			   if(this.strandlist.get(strandposition).complementexists){
				   if(1 >= this.strandlist.get(strandposition).complement().highestConsecPossible(this.strandlist.get(i), consecnum, this.thermocalc))
					   total = total + this.strandlist.get(strandposition).complement().highestConsecPossible(this.strandlist.get(i), consecnum, this.thermocalc);
			   }
		   }
	 }
	 return total;
}

//
public double consecCheck(int strandposition, int consecnum){	
		double total = 0;
		
		//temporarily change mismatch threshold to consecnum so strandcheck will find worst strand-strand arrangement with respect to consecnum or higher
		int thresholdplaceholder = this.strandlist.get(strandposition).mismatchthreshold;
		this.strandlist.get(strandposition).setmismatchtheshold(consecnum);
		
		 for(int i = 0; i < this.strandlist.size(); i++) {
			   if (i != strandposition){
				   double strandscore = this.strandlist.get(strandposition).maxhitsconsec(this.strandlist.get(i), this.thermocalc, consecnum);
				   total = total + strandscore;
				   if(this.strandlist.get(strandposition).complementexists){
				 			double consecscore = this.strandlist.get(strandposition).complement().maxhitsconsec(this.strandlist.get(i), this.thermocalc, consecnum);
				 			total = total + consecscore; 
				   }
			   }
		 }	
	 	this.strandlist.get(strandposition).setmismatchtheshold(thresholdplaceholder); 
	 	return total;
}  	
/** returns average scores of strand and complement compared to all other strands=[0], maxscore=[1]  	
*/
public double[] strandcheck(int s){
 double position = -1;
 double lowestscore = 10;
 for(int i = 0; i < this.strandlist.size(); i++) {
	   if (i != s){	  
		   double score = Double.parseDouble(this.strandlist.get(s).lowestFreeEnergy(this.strandlist.get(i), this.thermocalc)[0]);		//   Calculate maxhitscore of Two Strands			
		   if (score < lowestscore)										//   IF larger than maxscore,
			   lowestscore = score;										//          THEN set new maxscore   	
		   if(this.strandlist.get(s).complementexists == true){
			   Strand comp = this.strandlist.get(s).complement();
			   double score2 = Double.parseDouble(comp.lowestFreeEnergy(this.strandlist.get(i),this.thermocalc)[0]);	//   Calculate maxhitscore of Two Strands
			   if (score2 < lowestscore)								//   IF larger than maxscore,
				   lowestscore = score2;								//       	THEN set new maxscore
			}
	   	}
 }
 double[] returnArray = {lowestscore,position};
 return returnArray;
}


 /** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
  
    
/** Return restricted sequence score ( takes into account GGG, quadruple repeats and possible hairpining)
*/ 
   public double RestrictedSequences(Strand currentstrand){
   	
	String[] CurrentStrand = currentstrand.sequence.split("(?!^)");
    double counter =  - 100 * currentstrand.highestConsecPossible(currentstrand,currentstrand.hairpinthreshold,this.thermocalc) - 1000*currentstrand.consecmismatch(this.thermocalc, 5);
    for (int z = 0; z < CurrentStrand.length-3; z++){ 
    	String[] baselist = {CurrentStrand[z],CurrentStrand[z+1],CurrentStrand[z+2],CurrentStrand[z+3]};		
    	if(baselist[0].equals(baselist[1])&&(baselist[1].equals(baselist[2]))&&(baselist[2].equals(baselist[3])))
			counter = counter - 1000;
    }
    for (int z = 0; z < CurrentStrand.length-2; z++){ 
    	String x1 = CurrentStrand[z]+ CurrentStrand[z+1] + CurrentStrand[z+2];
		if(x1.equals("GGG") || x1.equals("CCC"))
			counter = counter - 1000;
    }
   	return counter;
   }
   /** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

   MELTING POINT METHOD:

   ** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */


	public double meltingPointDifference(Strand x){
		if(x.DesiredMeltingPoint == -1000)
			return 0;
		double TmDifference = java.lang.Math.abs(x.DesiredMeltingPoint-this.thermocalc.temperatureCalculator(x));
		if(TmDifference <3)
			return 0;
		return TmDifference;
	}
	
	
/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

UTILITY METHODS:

** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  /** Return .500 - percentage of A and T in sequence (closer to 0 the better)
    */
   public static double SelfBaseBalance(Strand currentstrand){
   	String[] CurrentStrand = currentstrand.sequence.split("(?!^)");
   	double c;
   	int AT = 0;
   	int CG = 0;
    for (int z = 0; z < CurrentStrand.length; z++){ 
    	String x = new String(CurrentStrand[z]);
    	if(x.equals("A")|| x.equals("T"))
    		AT ++;
    	else{
    		CG ++;
    	}
    }
    int total = AT + CG;
    c = (double)AT/(double)total;     //percentage of AT in strand
    c = (double).5000-c;				// .5 (desired percentage) = actualpercentage + difference   ==> desiredpercentage - actualpercentage = difference
    c = Math.abs(c);
    return c; 		
   }
   /** Return randomized array of possible bases (A T C G)
    */
   public static String[] shufflebase() {
	   
	   String[] array= {"G","A","T","C"};
       for (int i = array.length - 1; i > 0; i--) {
           int j = (int)Math.floor(Math.random() * (i + 1));
           String temp = array[i];
           array[i] = array[j];
           array[j] = temp;
       }
       return array;
   }
   /** Return randomized array of possible strand positions (0 to strandlist.size()-1)
    */
   public int[] shuffleStrandOrder() {
	   ArrayList<Integer> arraylis = new ArrayList<Integer>();
		for (int d = 0; d < this.strandlist.size();d++){
	   		if(!checkpoint2(d))
	   			arraylis.add(d);
	   	}
	   int[] array =  arraylis.stream().mapToInt(i -> i).toArray();
       for (int i = array.length - 1; i > 0; i--) {
            int j = (int)Math.floor(Math.random() * (i + 1));
           int temp = array[i];
           array[i] = array[j];
           array[j] = temp;   
       }

       return array;
   }
   /** Return randomized array of possible base positions (0 to strand.length-1) if blueprint exists, then do not include position of bases that can not be changed)
    */
   public int[] shuffleBaseArray(Strand x) {
		  int[] baseposition = new int[x.length];	  
		  if(x.blueprintexists == false){
			  for (int f = 0; f < x.length; f++){ 
				  baseposition[f] = f;
		  		}
		  }
		  else{
			 for (int f = 0; f < x.length; f++){
				if(x.blueprint[f].equals("o"))
					baseposition[f] = f;
				else{
					baseposition[f] = -1;
				}
			 }
		  }
		  return baseposition;
   }
   
}