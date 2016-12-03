import java.util.ArrayList;
public class CompareStrands {
	String shiftprint  = "";
	ThermodynamicsCalculator thermocalc;
	public CompareStrands(){

	}
	public String StrandvsSelf(String salt, String conc, String name1, String seq1){
		this.thermocalc = new ThermodynamicsCalculator();
		//this.thermocalc.setConcentration(Double.parseDouble(conc));
		//this.thermocalc.setSalt(salt);			

		Strand a = new Strand(seq1,true);
		a.name = name1;
		return self(a,this.thermocalc);

	}
	public String StrandvsStrand(String salt, String conc, String name1, String seq1, String name2, String seq2){
		this.thermocalc = new ThermodynamicsCalculator();
		//this.thermocalc.setConcentration(Double.parseDouble(conc));
		//this.thermocalc.setSalt(salt);			

		Strand a = new Strand(seq1,true);
		a.name = name1;
		Strand b = new Strand(seq2,true);
		b.name = name2;

		return Consec(a,b,this.thermocalc);
	}



	public String self(Strand a, ThermodynamicsCalculator x){
		return a.name + " vs " + a.name+"*" + this.maxhitsconsecPrint(a, a,x,2) + "*" + this.shiftprint;
	}
	public String Consec(Strand a, Strand b, ThermodynamicsCalculator x){
		return a.name + " vs " + b.name+"*"+ this.maxhitsconsecPrint(a, b,x,2)+"*"+this.shiftprint;
	}


	private String lowestenergyconsec(Strand a, Strand b, ThermodynamicsCalculator x){
		if(a.complementexists){
			return a.name + " vs " + b.name+"*"+ this.maxhitsconsecPrint(a, b,x,2)+"*"+this.shiftprint+ "*"+a.name + " Complement vs " + b.name+"\n"+ this.highestConsecPossiblePrint(a.complement(), b,2,x)+"*"+this.shiftprint;

		}
		else if(b.complementexists){
			return a.name + " vs " + b.name+"*"+ this.maxhitsconsecPrint(a, b,x,2)+"*"+this.shiftprint+ "*"+a.name + " vs " + b.name+" Complement *"+ this.highestConsecPossiblePrint(a.complement(), b,2,x)+"*"+this.shiftprint;
		}
		else{
			return a.name + " vs " + b.name+"*"+ this.maxhitsconsecPrint(a, b,x,2)+"*"+this.shiftprint;
		}
	}
	

	
	private String bestHitStringMaker(Strand a,Strand b,Base[] thisShift, Base[] bShift)
	{	
		String hitmarker = "";
		String seq1 = "";
		String seq2 = "";
		for(int k = a.length; k < (a.length+b.length); k ++){
    		seq2 = seq2+bShift[k];   		
    		//Case: if Base Array of Strand This is a base instead of 'o'
			if(!thisShift[k].nonbase()){
    			seq1 = seq1+thisShift[k];
    			if( bShift[k].canPair(thisShift[k]))
    				hitmarker = hitmarker + ":";
    			else{
      				hitmarker = hitmarker + " ";
    			}
			}
			else{
				seq1 = seq1+" ";
				hitmarker = hitmarker + " ";
			}
		}		
		return " 5 "+seq1+" 3 " +"\n   "+hitmarker + "\n 3 "+seq2+" 5 ";		
	}
	
	
	
	private ArrayList<Base[]> basearraymaker(Strand a, Strand b, int shiftlength){
		Base[] shift1 = new Base[a.length+b.length*2];   // o this sequence oooooooooo  oooooooooo
        Base[] shift2 = new Base[a.length+b.length*2];   // oooooooooo   b sequence  oooooooooo
        
        //shift1 (this sequence oooooooooo  oooooooooo)
        for (int w = 0; w < a.length+b.length*2 ; w++){
			if(w < shiftlength)
				shift1[w] = new Base('o');
			else if(w >=shiftlength && w < a.length+shiftlength)
				shift1[w] = new Base(a.sequence.charAt(w-shiftlength));
			else
				shift1[w]= new Base('o');
		}
		
		//shift2 (oooooooooo   b sequence  oooooooooo)
		for(int i = 0; i < a.length; i++){
            shift2[i] = new Base('o');
        }		
        for(int i = a.length; i < b.length+a.length; i++){
        	shift2[i] = new Base(b.sequence.charAt(i-a.length));
        }	       
        for(int i = b.length+a.length; i < shift2.length; i++){
        	shift2[i] = new Base('o');
        }		   

        ArrayList<Base[]> f = new ArrayList<Base[]>();
        f.add(shift1);
        f.add(shift2);
        return f;
	}
	
	private String[] bestHitStringMakerPrint(Strand a,Strand b,Base[] thisShift, Base[] bShift)
	{	
		String hitmarker = "";
		String seq1 = "";
		String seq2 = "";
		for(int k = 0; k < (a.length+b.length*2); k ++){
			if(!bShift[k].nonbase()){
    			seq2 = seq2+bShift[k];
			}
			else{
				seq2 = seq2+" ";
			}
    		//Case: if Base Array of Strand This is a base instead of 'o'
			if(!thisShift[k].nonbase()){
    			seq1 = seq1+thisShift[k];
    			if( bShift[k].canPair(thisShift[k]))
    				hitmarker = hitmarker + ":";
    			else{
      				hitmarker = hitmarker + " ";
    			}
			}
			else{
				seq1 = seq1+" ";
				hitmarker = hitmarker + " ";
			}
		}		
		String[] f = {seq1,hitmarker,seq2};
		return f;
	}
	/*
	
	private String[] bestHitStringMakerPrint(Strand a,Strand b,Base[] thisShift, Base[] bShift)
	{	
		String hitmarker = "";
		String seq1 = "";
		String seq2 = "";
		for(int k = a.length; k < (a.length+b.length); k ++){
    		seq2 = seq2+bShift[k];   		
    		//Case: if Base Array of Strand This is a base instead of 'o'
			if(!thisShift[k].nonbase()){
    			seq1 = seq1+thisShift[k];
    			if( bShift[k].canPair(thisShift[k]))
    				hitmarker = hitmarker + ":";
    			else{
      				hitmarker = hitmarker + " ";
    			}
			}
			else{
				seq1 = seq1+" ";
				hitmarker = hitmarker + " ";
			}
		}		
		String[] f = {seq1,hitmarker,seq2};
		return f;
	}
	*/
	
	
	private Base[][] lowestEnergyShifterPrint(Strand a, Strand b,ThermodynamicsCalculator z, int conseclimit)
	{
		Base[] shiftB = new Base[a.length+b.length*2];        
		Base[] shiftThisBEST = new Base[a.length+b.length*2];
		double lowestFreeEnergy=1000;
		
		String top = "";
		String middle = "";
		String bottom = "";

		for(int i = 2; i < b.length+a.length-3; i ++){	
			ArrayList<Base[]> shiftedbasearray = basearraymaker(a,b,i);
			z.consecutivelimit = conseclimit-1;
			String[] temp = bestHitStringMakerPrint(a,b,shiftedbasearray.get(0), shiftedbasearray.get(1));
			double freeEnergy = z.nearestNeighbor(shiftedbasearray.get(0),shiftedbasearray.get(1),b.length,a.length);		
				

			this.shiftprint = this.shiftprint + temp[0]+"\n"+temp[1]+"\n"+temp[2]+"\n$$$";

			// Save Score and Shifted Arrays of Strands (if its lower than current lowest energy score)
			if(lowestFreeEnergy > freeEnergy ){
               lowestFreeEnergy = freeEnergy;              
        		for (int w = 0; w < a.length+b.length*2; w++){
        			shiftThisBEST = shiftedbasearray.get(0);
        			shiftB = shiftedbasearray.get(1);
        		}
			}
	}



	//return Base array of Strand This and Strand B in lowest energy arrangement
	Base[][] temp = {shiftThisBEST,shiftB};
	return temp;
	}
	private String lowestFreeEnergyPrint(Strand a,Strand b,ThermodynamicsCalculator z){ //returns the largest hits of all possible orientations			
			if(!a.isFivePrime)	// 	5  strand this  ooooooooooo ooooooo 3  = shiftThis
				return lowestFreeEnergyPrint(a,b, z);
			if(b.isFivePrime)		  
				b = b.reverse(); 	//  3  ooooooooooooo   strand b ooooooo 5  = shiftB
			
			//Finds the lowest energy arrangement of Strand This and Strand B and returns the Base[] of Strand This and Strand B
			Base[][] shiftedsequences = lowestEnergyShifterPrint(a,b,z,a.mismatchthreshold);		
			Base[] shiftThis = shiftedsequences[0];
			Base[] shiftB = shiftedsequences[1];
			

			z.consecutivelimit = a.mismatchthreshold-1;
			double freeEnergy = z.nearestNeighbor(shiftThis,shiftB,b.length,a.length);		

			return (bestHitStringMaker(a,b,shiftThis, shiftB) +"\n"+freeEnergy);
	}


	private String maxhitsconsecPrint(Strand a,Strand b,ThermodynamicsCalculator z, int maxhitlimit){ //returns the largest hits of all possible orientations			              
		if(!a.isFivePrime)	// 	5  strand this  ooooooooooo ooooooo 3  = shiftb	
			return maxhitsconsecPrint(a.reverse(),b, z,maxhitlimit);
		if(b.isFivePrime)		  
			b = b.reverse(); 	//  3  ooooooooooooo   strand b ooooooo 5  = shiftThis
			
			Base[][] shiftedsequences = lowestEnergyShifterPrint(a,b,z,maxhitlimit);		
			Base[] shiftThis = shiftedsequences[0];
			Base[] shiftB = shiftedsequences[1];		

			double consecCounter = 0;
			double hitscore = 0;
			
			for(int k = a.length; k < b.length+a.length+1; k ++){
				if(shiftB[k].canPair(shiftThis[k]))    			
	    			consecCounter ++;
				else{
					//Case: If the non-match is surrounded by match and is between consecutive hits ( ::: : = 2 , ::: :: = 3)
					if( shiftB[k+2].canPair(shiftThis[k+2]) && shiftB[k-2].canPair(shiftThis[k-2]) &&shiftB[k-1].canPair(shiftThis[k-1]) &&  shiftB[k+1].canPair(shiftThis[k+1]) && consecCounter >0)					
						consecCounter --;
					else{
						if(consecCounter >= maxhitlimit)
							hitscore++;
						if(consecCounter > maxhitlimit)
							hitscore = hitscore + (consecCounter - maxhitlimit);	
						consecCounter = 0;  	
					}
				}          
			}		
			return bestHitStringMaker(a,b,shiftThis, shiftB)+"\nconsec score:"+hitscore;
	}

	
	private String highestConsecPossiblePrint(Strand a,Strand b,int maxhitlimit,ThermodynamicsCalculator z){
		if(!a.isFivePrime)	// 	5  strand this  ooooooooooo ooooooo 3  = shiftb	
			return highestConsecPossiblePrint(a.reverse(),b, maxhitlimit,z);
		if(b.isFivePrime)		  
			b = b.reverse(); 	//  3  ooooooooooooo   strand b ooooooo 5  = shiftThis

		Base[] shiftB = new Base[a.length+b.length*2];        
		Base[] shiftThisBEST = new Base[a.length+b.length*2];
		double highestscore = -1;
		String top = "";
		String middle = "";
		String bottom = "";
		
		for(int i = 2; i < b.length+a.length-3; i ++){	
			ArrayList<Base[]> shiftedbasearray = basearraymaker(a,b,i);
			
			Base[] shiftThis = shiftedbasearray.get(0);
			shiftB = shiftedbasearray.get(1);
			double consecCounter = 0;
			double hitscore = 0;


			for(int k = a.length; k < b.length+a.length+1; k ++){
				if(shiftB[k].canPair(shiftThis[k]))    			
	    			consecCounter ++;
				else{
					//Case: If the non-match is surrounded by match and is between consecutive hits ( ::: : = 2 , ::: :: = 3)
					if(shiftB[k-2].canPair(shiftThis[k-2]) &&  shiftB[k+2].canPair(shiftThis[k+2]) && shiftB[k-1].canPair(shiftThis[k-1]) &&  shiftB[k+1].canPair(shiftThis[k+1]) && consecCounter >0){
						consecCounter --;
					}
					//Case: if the non-match is not between two matches, then consecCounter returns to 0 
					else{
						if(consecCounter >= maxhitlimit)
							hitscore++;
						if(consecCounter > maxhitlimit)
							hitscore = hitscore + (consecCounter - maxhitlimit);
						consecCounter = 0;  	
					}        			
				}       
			}
			
			String[] temp = bestHitStringMakerPrint(a,b,shiftedbasearray.get(0), shiftedbasearray.get(1));
			this.shiftprint = this.shiftprint + temp[0]+"\n"+temp[1]+"\n"+temp[2]+"\n$$$";

			if(highestscore < hitscore){
				highestscore = hitscore;
				shiftThisBEST = shiftThis;
			}
		}	
		return (bestHitStringMaker(a,b,shiftThisBEST, shiftB)+"\nconsec score:"+highestscore);
	}
	

	
	private Base[][] SelfCompShifter(Strand a,ThermodynamicsCalculator z, int conseclimit)
	{
		Base[] shiftComp = new Base[a.length+a.length*2];        
		Base[] shiftThisBEST = new Base[a.length+a.length*2];
		double lowestFreeEnergy=1000;
		String top = "";
		String middle = "";
		String bottom = "";
		
		for(int i = 2; i < a.length+a.length-3; i ++){	
			//Shift Bases over for each shift (0) = strand this  (1) = strand b
			if(i != a.length){
				ArrayList<Base[]> shiftedbasearray = basearraymaker(a,a.complement(),i);		
				String[] temp = bestHitStringMakerPrint(a,a,shiftedbasearray.get(0), shiftedbasearray.get(1));
				
				this.shiftprint = this.shiftprint + temp[0]+"\n"+temp[1]+"\n"+temp[2]+"\n$$$";
				
				z.consecutivelimit = conseclimit-1;
				double freeEnergy = z.nearestNeighbor(shiftedbasearray.get(0),shiftedbasearray.get(1),a.length,a.length);		
				if(lowestFreeEnergy > freeEnergy){
					lowestFreeEnergy = freeEnergy;              
					for (int w = 0; w < a.length+a.length*2; w++){
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
	
	
	private double consecmismatch(Strand a,ThermodynamicsCalculator z, int maxhitlimit){ //returns the largest hits of all possible orientations			              
		if(!a.isFivePrime)	// 	5  strand this  ooooooooooo ooooooo 3  = shiftb	
			return a.reverse().consecmismatch(z,maxhitlimit);
		Base[][] shiftedsequences = SelfCompShifter(a,z,maxhitlimit);		
		Base[] shiftThis = shiftedsequences[0];
		Base[] shiftB = shiftedsequences[1];		
		double consecCounter = 0;
		double hitscore = 0;
		for(int k = a.length; k < a.length+a.length+1; k ++){
				if(shiftB[k].canPair(shiftThis[k]))    			
	    			consecCounter ++;
				else{
					//Case: If the non-match is surrounded by match and is between consecutive hits ( ::: : = 2 , ::: :: = 3)
					if(shiftB[k-1].canPair(shiftThis[k-1]) &&  shiftB[k+1].canPair(shiftThis[k+1]) && consecCounter >0){
						consecCounter --;
					}
					//Case: if the non-match is not between two matches, then consecCounter returns to 0 
					else{
						if(consecCounter == maxhitlimit)
							hitscore++;
						if(consecCounter > maxhitlimit)
							hitscore++;
						consecCounter = 0;  	
					}
				}          
			}
			
			System.out.println("\n=======\n\nmax hits consec Arrangement\n"+bestHitStringMaker(a,a.complement(),shiftThis, shiftB)+"\n"+maxhitlimit+"consec score:"+hitscore);
			return hitscore;			
	}

	
	
	
	
	
}
