import java.util.concurrent.ThreadLocalRandom;
import java.util.ArrayList;
import java.util.Arrays;

public class Strand {
	String sequence;
	String name;
	boolean isFivePrime;
    int length;
    
    boolean complementexists = false;
    boolean blueprintexists = false;
    String[] blueprint;    
    
    double CompConcentration = 0;
    double StrandConcentration = 0;
    double DesiredMeltingPoint = -1000;
    
    int mismatchthreshold = 4;
    int hairpinthreshold = 4;
    
	public Strand(String sequence)
	{
		StrandPropertySetter(sequence,true);
        this.length = this.length();
	}
	
	public Strand(String sequence, boolean isFivePrime)
	{
		StrandPropertySetter(sequence,isFivePrime);
	}
	
	public Strand(Base[] f, boolean isFivePrime)
	{
		String seq = "";
		for(int g = 0; g < f.length; g++){
			seq = seq+f[g].base;
		}
		StrandPropertySetter(seq,true);
	}

	
    public Strand(int length, boolean isFivePrime) //Makes a randomly generated strand from an inputted length and polarity.
    {
        char[] strand = new char[length];
        for(int i = 0; i < length; i++)
        {
            strand[i] = randomBase();
        }
    	StrandPropertySetter(String.valueOf(strand),isFivePrime);
    }
    
    
    
    public Strand(Strand[] arr, boolean isFivePrime) // Makes new strand from an array of strands.
    {
        String baseList = "";
        for(int i = 0; i < arr.length; i++)
        {
            baseList += arr[i].sequence;
        }
        StrandPropertySetter(baseList,isFivePrime);
    }

/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

    STRAND PROPERTIES METHOD:

** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */


    private void StrandPropertySetter(String sequence,boolean fiveprime){
		this.sequence(sequence);
		this.isFivePrime = fiveprime;
        this.length = this.length();
        this.setcomp(false);
    }
    
    public void setName(String x){
        name = x;
    }
    
    public void sethairpinthreshold(int i){
		this.hairpinthreshold = i;
	}
	public void setmismatchtheshold(int i){
		this.mismatchthreshold = i;
	}
    public void setblueprint(String[] blueprint){
		this.blueprintexists = true;
		this.blueprint = blueprint;
		if(this.isFivePrime == false){
			this.sequence(this.reverse().sequence);
			this.isFivePrime= !this.isFivePrime;
		}
		String[] SequenceArray = this.sequence.split("(?!^)");
		int counter = 0;
		for(String f:this.blueprint){
			if(f.equalsIgnoreCase("A") ||f.equals("T")||f.equals("C")||f.equals("G")){
				SequenceArray[counter] = f;
			}
			counter ++;
		}		
		this.sequence(Arrays.toString(SequenceArray));		
	}
	public void setcomp(boolean f){
		this.complementexists = f;
		if(f){
		this.CompConcentration = .5000;
		this.StrandConcentration = .5000;
		}
	}
	public boolean setTm(double tm,ThermodynamicsCalculator x){
		String seqtemp = "";
		String seqtemp2 = "";
		for(int i = 0 ;i<length;i++){
			seqtemp = "A";
			seqtemp2 = "C";
		}
		Strand strandtemp = new Strand(seqtemp,true);
		Strand strandtemp2 = new Strand(seqtemp2,true);
		
		double minimumtm = x.temperatureCalculator(strandtemp);
		double maximumtm = x.temperatureCalculator(strandtemp2);
		if(tm >= maximumtm || tm <= minimumtm){
			return false;
		}
		this.DesiredMeltingPoint = tm;
		return true;
	}

	/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

	STRAND MIRROR/COMPLEMENT METHODS:

	** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */


    public Strand complement(){
        String newStrand = "";
		for (int i = 0; i < this.sequence.length(); i++)
		{
			Base A = new Base(sequence.charAt(i));
            newStrand += A.complement();
		}
		Strand f = new Strand(newStrand, !this.isFivePrime);
		f.mismatchthreshold = this.mismatchthreshold;
		f.hairpinthreshold = this.hairpinthreshold;
        return f;
	}
	public Strand reverse() //returns same physical strand in the reverse orientation
	{
        String newStrand = "";
		for (int i = this.sequence.length() - 1; i > - 1; i--)
		{
			Base A = new Base(sequence.charAt(i));
			newStrand += A.base;
		}
		Strand temp = new Strand(newStrand, !this.isFivePrime);
		temp.mismatchthreshold = this.mismatchthreshold;
		temp.hairpinthreshold = this.hairpinthreshold;
		temp.blueprintexists = this.blueprintexists;
	    temp.blueprint = this.blueprint;
		if(this.complementexists == true){
			temp.setcomp(false);
		}
		if(this.DesiredMeltingPoint != -1000){
			temp.DesiredMeltingPoint = this.DesiredMeltingPoint;
		}
        return temp;
	}
	
/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

STRAND PROPERTIES/GETTER METHODS

** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */


	private int length() 
	{
		return this.sequence.length();
	}
	public char baseAt(int j)
	{
		return this.sequence.charAt(j);
	}
    public char randomBase()
    {
        char[] possible = {'A', 'T', 'C', 'G'};
        int num = ThreadLocalRandom.current().nextInt(0,4); 
        return possible[num];
    }
	public void sequence(String sequence)
	{
	   	sequence = sequence.replace(", ",  "");
		this.sequence = sequence.replaceAll("[^a-zA-Z0-9]", "");
	}
	
	@Override
	public String toString() 
	{
		char[] sequence = new char[this.length()];
		for(int i = 0; i < this.length(); i ++){
			sequence[i] = this.baseAt(i);
		}
		String rawSeq = new String(sequence);
		String finSeq = "";
		if(this.isFivePrime)
            finSeq = "5 " + rawSeq + " 3";
		else
            finSeq = "3 " + rawSeq + " 5";
		return finSeq;
	}
	
	public String ArraytoString(Base[] f)
	{
		String fullstring = "";
		for (int i = 0; i < f.length; i ++){
			String temp = Character.toString(f[i].base);
			if(temp.equals("o"))
				temp = " ";
			fullstring = fullstring + temp;
		}
		return fullstring;
	}
	public double GCcontent(){
		double count = 0;
		for (int i = 0; i < this.sequence.length(); i++){		
			if(sequence.charAt(i)=='G' ||sequence.charAt(i)=='C')
				count ++;
		}
		return count/this.sequence.length();
	}
	
	
/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

	STRAND SELF CHECKER METHOD

** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
	private Base[][] SelfCompShifter(ThermodynamicsCalculator z, int conseclimit)
	{
		Base[] shiftComp = new Base[this.length()+this.length()*2];        
		Base[] shiftThisBEST = new Base[this.length()+this.length()*2];
		double lowestFreeEnergy=1000;

		for(int i = 2; i < this.length()+this.length()-3; i ++){	
			//Shift Bases over for each shift (0) = strand this  (1) = strand b
			if(i != this.length()){
			ArrayList<Base[]> shiftedbasearray = basearraymaker(this.complement(),i);
			
			//Counter-limit disregards consecutive hits smaller than the mismatch threshold
			z.consecutivelimit = conseclimit-1;
			//Find the free energy of this arrangement of strand this and strand b
			double freeEnergy = z.nearestNeighbor(shiftedbasearray.get(0),shiftedbasearray.get(1),this.length(),this.length);		

			// Save Score and Shifted Arrays of Strands (if its lower than current lowest energy score)
			if(lowestFreeEnergy > freeEnergy){
               lowestFreeEnergy = freeEnergy;              
        		for (int w = 0; w < this.length()+this.length()*2; w++){
        			shiftThisBEST = shiftedbasearray.get(0);
        			shiftComp = shiftedbasearray.get(1);
        		}
			}
			}
	}
	//return Base array of Strand This and Strand B in lowest energy arrangement
	Base[][] temp = {shiftThisBEST,shiftComp};
	return temp;
	}
	
	
	public double consecmismatch(ThermodynamicsCalculator z, int maxhitlimit){ //returns the largest hits of all possible orientations			              
		if(!this.isFivePrime)	// 	5  strand this  ooooooooooo ooooooo 3  = shiftb	
			return this.reverse().consecmismatch(z,maxhitlimit);
		Base[][] shiftedsequences = this.SelfCompShifter(z,maxhitlimit);		
		Base[] shiftThis = shiftedsequences[0];
		Base[] shiftB = shiftedsequences[1];		
		double consecCounter = 0;
		double hitscore = 0;
		for(int k = this.length; k < this.length+this.length+1; k ++){
				if(shiftB[k].canPair(shiftThis[k]))    			
	    			consecCounter ++;
				else{
					//Case: If the non-match is surrounded by match and is between consecutive hits ( ::: : = 2 , ::: :: = 3)
					if(shiftB[k+2].canPair(shiftThis[k+2])&&shiftB[k-2].canPair(shiftThis[k-2])&& shiftB[k-1].canPair(shiftThis[k-1]) &&  shiftB[k+1].canPair(shiftThis[k+1]) && consecCounter >0)
						consecCounter --;
					// ::: :: = 4, :::: :: = 5
					
					//Case: if the non-match is not between two matches, then consecCounter returns to 0 
					else{
						if(consecCounter >= maxhitlimit)
							hitscore++;
						if(consecCounter > maxhitlimit)
							hitscore++;
						consecCounter = 0;  	
					}
				}          
			}
		return hitscore;			
	}
/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

	ARRAY MAKER/SHIFTER METHOD (Used in strand comparision methods)

** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

	
	private ArrayList<Base[]> basearraymaker(Strand b, int shiftlength){
		Base[] shift1 = new Base[this.length()+b.length()*2];   // o this sequence oooooooooo  oooooooooo
        Base[] shift2 = new Base[this.length()+b.length()*2];   // oooooooooo   b sequence  oooooooooo
        
        //shift1 (this sequence oooooooooo  oooooooooo)
        for (int w = 0; w < this.length()+b.length()*2 ; w++){
			if(w < shiftlength)
				shift1[w] = new Base('o');
			else if(w >=shiftlength && w < this.length()+shiftlength)
				shift1[w] = new Base(this.sequence.charAt(w-shiftlength));
			else
				shift1[w]= new Base('o');
		}
		//shift2 (oooooooooo   b sequence  oooooooooo)
		for(int i = 0; i < this.length(); i++){
            shift2[i] = new Base('o');
        }		
        for(int i = this.length(); i < b.length()+this.length(); i++){
        	shift2[i] = new Base(b.sequence.charAt(i-this.length()));
        }	       
        for(int i = b.length()+this.length(); i < shift2.length; i++){
        	shift2[i] = new Base('o');
        }		   

        ArrayList<Base[]> f = new ArrayList<Base[]>();
        f.add(shift1);
        f.add(shift2);
        return f;
	}
	
	
	
	private Base[][] lowestEnergyShifter(Strand b,ThermodynamicsCalculator z, int conseclimit)
	{
		Base[] shiftB = new Base[this.length()+b.length()*2];        
		Base[] shiftThisBEST = new Base[this.length()+b.length()*2];
		double lowestFreeEnergy=1000;

		for(int i = 2; i < b.length()+this.length()-3; i ++){	
			//Shift Bases over for each shift (0) = strand this  (1) = strand b
			ArrayList<Base[]> shiftedbasearray = basearraymaker(b,i);
			
			//Counter-limit disregards consecutive hits smaller than the mismatch threshold
			z.consecutivelimit = conseclimit-1;
			//Find the free energy of this arrangement of strand this and strand b
			double freeEnergy = z.nearestNeighbor(shiftedbasearray.get(0),shiftedbasearray.get(1),b.length(),this.length);		

			// Save Score and Shifted Arrays of Strands (if its lower than current lowest energy score)
			if(lowestFreeEnergy > freeEnergy){
               lowestFreeEnergy = freeEnergy;              
        		for (int w = 0; w < this.length()+b.length()*2; w++){
        			shiftThisBEST = shiftedbasearray.get(0);
        			shiftB = shiftedbasearray.get(1);
        		}
			}
	}
	//return Base array of Strand This and Strand B in lowest energy arrangement
	Base[][] temp = {shiftThisBEST,shiftB};
	return temp;
	}
	
	
	private String bestHitStringMaker(Strand b,Base[] thisShift, Base[] bShift)
	{	
		String hitmarker = "";
		String seq1 = "";
		String seq2 = "";
		for(int k = this.length; k < (this.length+b.length); k ++){
    		seq2 = seq2+bShift[k];   		
    		//Case: if Base Array of Strand This is a base instead of 'o'
			if(!thisShift[k].nonbase()){
    			seq1 = seq1+thisShift[k];
    			if( bShift[k].canPair(thisShift[k]))
    				hitmarker = hitmarker + ":";
    			else
      				hitmarker = hitmarker + " ";
			}
			else{
				seq1 = seq1+" ";
				hitmarker = hitmarker + " ";
			}
		}		
		return " 5 "+seq1+" 3 " +"\n   "+hitmarker + "\n 3 "+seq2+" 5 ";		
	}
	
	/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

	STRAND COMPARISION (Thermodynamics/consecutive matches) METHOD

** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

	
	public String[] lowestFreeEnergy(Strand b,ThermodynamicsCalculator z){ //returns the largest hits of all possible orientations			
			if(!this.isFivePrime)	// 	5  strand this  ooooooooooo ooooooo 3  = shiftThis
				return this.reverse().lowestFreeEnergy(b, z);
			if(b.isFivePrime)		  
				b = b.reverse(); 	//  3  ooooooooooooo   strand b ooooooo 5  = shiftB
				
			//Finds the lowest energy arrangement of Strand This and Strand B and returns the Base[] of Strand This and Strand B
			Base[][] shiftedsequences = this.lowestEnergyShifter(b,z,this.mismatchthreshold);		
			Base[] shiftThis = shiftedsequences[0];
			Base[] shiftB = shiftedsequences[1];			
			
			z.consecutivelimit = this.mismatchthreshold-1;
			double freeEnergy = z.nearestNeighbor(shiftThis,shiftB,b.length(),this.length);		
			String[] temp = {Double.toString(freeEnergy)  ,    bestHitStringMaker(b,shiftThis, shiftB)};
			return temp;
	}


	public double maxhitsconsec(Strand b,ThermodynamicsCalculator z, int maxhitlimit){ //returns the largest hits of all possible orientations			              
		if(!this.isFivePrime)	// 	5  strand this  ooooooooooo ooooooo 3  = shiftb	
			return this.reverse().maxhitsconsec(b, z,maxhitlimit);
		if(b.isFivePrime)		  
			b = b.reverse(); 	//  3  ooooooooooooo   strand b ooooooo 5  = shiftThis
			
			Base[][] shiftedsequences = this.lowestEnergyShifter(b,z,maxhitlimit);		
			Base[] shiftThis = shiftedsequences[0];
			Base[] shiftB = shiftedsequences[1];		

			double consecCounter = 0;
			double hitscore = 0;
			for(int k = this.length; k < b.length+this.length+1; k ++){
				if(shiftB[k].canPair(shiftThis[k]))    			
	    			consecCounter ++;
				else{
					//Case: If the non-match is surrounded by match and is between consecutive hits ( ::: : = 2 , ::: :: = 3)
					if(shiftB[k-2].canPair(shiftThis[k-2]) &&  shiftB[k+1].canPair(shiftThis[k+2]) && shiftB[k-1].canPair(shiftThis[k-1]) &&  shiftB[k+1].canPair(shiftThis[k+1]) && consecCounter >0){
						consecCounter =consecCounter - 1;
					}
					//Case: if the non-match is not between two matches, then consecCounter returns to 0 
					else{
						if(consecCounter >= maxhitlimit)
							hitscore++;
						if(consecCounter > maxhitlimit)
							hitscore = hitscore + (consecCounter - maxhitlimit);	
						consecCounter = 0;  	
					}
					// :: :: = 3   ::: :: = 4   ::: ::: = 5  :::: :: = 5   :::: ::: = 6					
				}          
			}
			return hitscore;			
	}

	
	public double highestConsecPossible(Strand b,int maxhitlimit,ThermodynamicsCalculator z){
		if(!this.isFivePrime)	// 	5  strand this  ooooooooooo ooooooooooo 3  = shiftb	
			return this.reverse().highestConsecPossible(b, maxhitlimit,z);
		if(b.isFivePrime)		  
			b = b.reverse(); 	//  3  ooooooooooooo   strand b oooooooooo 5  = shiftThis

		Base[] shiftB = new Base[this.length()+b.length()*2];        
		Base[] shiftThisBEST = new Base[this.length()+b.length()*2];
		double highestscore = 0;

		for(int i = 3; i < b.length()+this.length()-4; i ++){	
			//Shift Bases over for each shift (0) = strand this  (1) = strand b
			ArrayList<Base[]> shiftedbasearray = basearraymaker(b,i);			
			Base[] shiftThis = shiftedbasearray.get(0);
			shiftB = shiftedbasearray.get(1);
			
			double consecCounter = 0;
			double hitscore = 0;
			
			for(int k = this.length; k < b.length+this.length+1; k ++){
				if(shiftB[k].canPair(shiftThis[k]))    			
	    			consecCounter ++;
				else{
					//Case: If the non-match is surrounded by match and is between consecutive hits ( ::: : = 2 , ::: :: = 3)
					if(shiftB[k-2].canPair(shiftThis[k-2]) &&  shiftB[k+2].canPair(shiftThis[k+2]) && shiftB[k-1].canPair(shiftThis[k-1]) &&  shiftB[k+1].canPair(shiftThis[k+1]) && consecCounter >0)
						consecCounter --;
					//Case: if the non-match is not between two matches, then consecCounter returns to 0 
					else{
						if(consecCounter >= maxhitlimit)
							hitscore++;
						if(consecCounter > maxhitlimit)
							hitscore = hitscore + (consecCounter - maxhitlimit);	
						consecCounter = 0;  	
					}      
					// :: :: = 3   ::: :: = 4   ::: ::: = 5  :::: :: = 5   :::: ::: = 6
					
				}
			}
			if(highestscore < hitscore)
				highestscore = hitscore;
		}
		return highestscore;
}
	
}