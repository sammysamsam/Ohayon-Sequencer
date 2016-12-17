import java.util.ArrayList;
public class CompareStrands {
	String shiftPrint  = "";
	ThermodynamicsCalculator thermocalc;
	public CompareStrands(ThermodynamicsCalculator a)
    {
    	this.thermocalc = a;
	}

	public String[] compareTwo(Strand a, Strand b)
    {
		String[] result = new String[2];
		result[0] = this.mismatchPrint(a, b, 2);
		result[1] = this.shiftPrint;
		return result;
	}
	/*
	public void lowestEnergyConsec(Strand a, Strand b, ThermodynamicsCalculator x)
    {
		if(a.complementExists)
        {
			System.out.println(a.name + " vs " + b.name + "\n" 
                    + this.ThermoMismatchPrint(a, b, 2) + "\n" 
                    + this.shiftPrint + "\n" 
                    + a.name + " Complement vs " + b.name + "\n"
                    + this.mismatchPrint(a.complement(), b,2,x) + "\n"
                    + this.shiftPrint);

		}
		else if(b.complementExists)
        {
			System.out.println(a.name + " vs " + b.name  + "\n" 
                    + this.ThermoMismatchPrint(a, b, 2) + "\n" 
                    + this.shiftPrint + "\n" 
                    + a.name + " vs " + b.name + " Complement \n" 
                    + this.mismatchPrint(a.complement(), b, 2, x) + "\n" 
                    + this.shiftPrint);
		}
		else
        {
			System.out.println(a.name + " vs " + b.name + "\n" 
                    + this.ThermoMismatchPrint(a, b, 2) + "\n" 
                    + this.shiftPrint);
		}
	}
	*/

	private ArrayList<Base[]> baseArrayMaker(Strand a, Strand b, int shiftLength)
    {
		Base[] shift1 = new Base[a.length + b.length*2];   // o this sequence oooooooooo  oooooooooo
        Base[] shift2 = new Base[a.length + b.length*2];   // oooooooooo   b sequence  oooooooooo
        
        for (int w = 0; w < a.length + b.length*2 ; w++)
        {
			if(w < shiftLength)
            {
				shift1[w] = new Base('o');
            }
			else if(w >= shiftLength && w < a.length + shiftLength)
            {
				shift1[w] = new Base(a.sequence.charAt(w - shiftLength));
            }
			else
            {
				shift1[w]= new Base('o');
            }
		}

		for(int i = 0; i < a.length; i++)
		{
            shift2[i] = new Base('o');
        }		
        for(int i = a.length; i < b.length + a.length; i++)
        {
        	shift2[i] = new Base(b.sequence.charAt(i - a.length));
        }
        for(int i = b.length + a.length; i < shift2.length; i++)
        {
        	shift2[i] = new Base('o');
        }

        ArrayList<Base[]> f = new ArrayList<Base[]>();
        f.add(shift1);
        f.add(shift2);
        return f;
	}
	
	private String bestHitStringMaker(Strand a,Strand b,Base[] thisShift, Base[] bShift)
	{	
		String hitMarker = "";
		String seq1 = "";
		String seq2 = "";
		for(int k = a.length; k < (a.length + b.length); k++)
        {
    		seq2 = seq2 + bShift[k];   		
    		//Case: if Base Array of Strand This is a base instead of 'o'
			if(!thisShift[k].nonbase())
            {
    			seq1 = seq1 + thisShift[k];
    			if(bShift[k].canPair(thisShift[k]))
                {
    				hitMarker = hitMarker + ":";
                }
    			else
                {
      				hitMarker = hitMarker + " ";
    			}
			}
			else
            {
				seq1 = seq1 + " ";
				hitMarker = hitMarker + " ";
			}
		}		
		return " 5 " + seq1 + " 3 " + "\n   "
            + hitMarker + "\n 3 "
            + seq2 + " 5 ";
	}
	
	private String[] bestHitStringMakerPrint(Strand a, Strand b, Base[] thisShift, Base[] bShift)
	{
		String hitMarker = "";
		String seq1 = "";
		String seq2 = "";
		for(int k = 0; k < (a.length + b.length*2); k++)
		{
			if(!bShift[k].nonbase())
            {
    			seq2 = seq2 + bShift[k];
            }
			else 
            {
				seq2 = seq2 + " ";
            }

    		//Case: if Base Array of Strand This is a base instead of 'o'
			if(!thisShift[k].nonbase())
            {
    			seq1 = seq1 + thisShift[k];
    			
                if(bShift[k].canPair(thisShift[k]))
                {
    				hitMarker = hitMarker + ":";
                }
                else
                {
      				hitMarker = hitMarker + " ";
    			}
			}
			else{
				seq1 = seq1 + " ";
				hitMarker = hitMarker + " ";
			}
		}		
		String[] shiftedResult = {seq1, hitMarker, seq2};
		return shiftedResult; 
	}
	
	private Base[][] lowestEnergyOrientationPrint(Strand a, Strand b, int consecLimit)
	{
		Base[] shiftB = new Base[a.length + b.length*2];        
		Base[] shiftA = new Base[a.length + b.length*2];
		double lowestFreeEnergy=1000;

		for(int i = 0; i < b.length + a.length; i++)
		{	
			ArrayList<Base[]> shiftedBaseArray = baseArrayMaker(a,b,i);
			this.thermocalc.consecutiveLimit = consecLimit - 1;
			
			String[] temp = bestHitStringMakerPrint(a, b, shiftedBaseArray.get(0), shiftedBaseArray.get(1));
			
			double freeEnergy = this.thermocalc.nearestNeighbor(shiftedBaseArray.get(0), shiftedBaseArray.get(1), b.length, a.length);		

			//save the shifted bases for printing
			this.shiftPrint = this.shiftPrint + temp[0] + "\n" + temp[1] + "\n" + temp[2] + "\n";

			if(lowestFreeEnergy > freeEnergy)
			{
	           lowestFreeEnergy = freeEnergy;              
	    		for (int w = 0; w < a.length + b.length*2; w++)
	    		{
	    			shiftA = shiftedBaseArray.get(0);
	    			shiftB = shiftedBaseArray.get(1);
	    		}
			}
		}
		//return Base array of Strand This and Strand B in lowest energy arrangement
		Base[][] temp = {shiftA,shiftB};
		return temp;
	}

	private String lowestFreeEnergyPrint(Strand a, Strand b)
    { //returns the largest hits of all possible orientations			
        if(!a.isFivePrime)	// 	5  strand this  ooooooooooo ooooooo 3  = shiftA
            return lowestFreeEnergyPrint(a, b);
        if(b.isFivePrime)		  
            b = b.reverse(); 	//  3  ooooooooooooo   strand b ooooooo 5  = shiftB
        
        //Finds the lowest energy arrangement of Strand This and Strand B and returns the Base[] of Strand This and Strand B
        Base[][] shiftedsequences = lowestEnergyOrientationPrint(a, b, a.mismatchThreshold);		
        Base[] shiftA = shiftedsequences[0];
        Base[] shiftB = shiftedsequences[1];

       	this.thermocalc.consecutiveLimit = a.mismatchThreshold - 1;
        double freeEnergy = this.thermocalc.nearestNeighbor(shiftA, shiftB, b.length, a.length);		

        return (bestHitStringMaker(a, b, shiftA, shiftB)  + "\n" + freeEnergy);
	}

	private String ThermoMismatchPrint(Strand a,Strand b,int maxhitlimit)
    { //returns the largest hits of all possible orientations			              
		if(!a.isFivePrime)	// 	5  strand this  ooooooooooo ooooooo 3  = shiftb	
			return ThermoMismatchPrint(a.reverse(), b,maxhitlimit);
		if(b.isFivePrime)		  
			return ThermoMismatchPrint(a, b.reverse(),maxhitlimit);
        
        Base[][] shiftedsequences = lowestEnergyOrientationPrint(a, b, maxhitlimit);		
        Base[] shiftA = shiftedsequences[0];
        Base[] shiftB = shiftedsequences[1];		

        double consecCounter = 0;
        double hitScore = 0;
        
        for(int k = a.length; k < b.length + a.length + 1; k++)
        {
            if(shiftB[k].canPair(shiftA[k]))
                consecCounter++;
            else{
                //Case: If the non - match is surrounded by match and is between consecutive hits ( ::: : = 2 , ::: :: = 3)
                if(shiftB[k + 2].canPair(shiftA[k + 2]) 
                        && shiftB[k - 2].canPair(shiftA[k - 2]) 
                        && shiftB[k - 1].canPair(shiftA[k - 1]) 
                        && shiftB[k + 1].canPair(shiftA[k + 1]) 
                        && consecCounter > 0)					
                    consecCounter--;
                else{
                    if(consecCounter >= maxhitlimit)
                        hitScore++;
                    if(consecCounter > maxhitlimit)
                        hitScore = hitScore + (consecCounter - maxhitlimit);	
                    consecCounter = 0;  	
                }
            }          
        }
        return bestHitStringMaker(a, b, shiftA, shiftB) + "\nconsec score:" + hitScore;
	}

	private String mismatchPrint(Strand a, Strand b, int maxhitlimit)
    {
		if(!a.isFivePrime)	// 	5  strand this  ooooooooooo ooooooo 3  = shiftb	
			return mismatchPrint(a.reverse(), b, maxhitlimit);
		if(b.isFivePrime)		  
			b = b.reverse(); 	//  3  ooooooooooooo   strand b ooooooo 5  = shiftA
		
		Base[] shiftA_best = new Base[a.length + b.length*2];
		Base[] shiftB = new Base[a.length + b.length*2];        

		//-1 so no scores of 0 will be saved in shifted base arrays
		double highestscore =  - 1;
		
		for(int i = 0; i < b.length + a.length; i++)
        {	
			ArrayList<Base[]> shiftedBaseArray = baseArrayMaker(a, b, i);
			
			Base[] shiftA = shiftedBaseArray.get(0);
			shiftB = shiftedBaseArray.get(1);
			
			double consecCounter = 0;
			double hitScore = 0;

			for(int k = a.length; k < b.length + a.length + 1; k++)
            {
				if(shiftB[k].canPair(shiftA[k]))    			
	    			consecCounter++;
				else
                {
					//Case: If the non - match is surrounded by match and is between consecutive hits ( ::: : = 2 , ::: :: = 3)
					if(shiftB[k - 2].canPair(shiftA[k - 2]) && 
							shiftB[k + 2].canPair(shiftA[k + 2]) && 
					 		shiftB[k - 1].canPair(shiftA[k - 1]) && 
					 		shiftB[k + 1].canPair(shiftA[k + 1]) && consecCounter >0)
                    {
						consecCounter--;
					}
					//Case: if the non - match is not between two matches, then consecCounter returns to 0 
					else
                    {
						if(consecCounter >= maxhitlimit)
							hitScore++;
						if(consecCounter > maxhitlimit)
							hitScore = hitScore + (consecCounter - maxhitlimit);
						consecCounter = 0;  	
					}        			
				}       
			}
			
			String[] temp = bestHitStringMakerPrint(a,b,shiftedBaseArray.get(0), shiftedBaseArray.get(1));
			this.shiftPrint = this.shiftPrint + temp[0] + "\n" + temp[1] + "\n" + temp[2] + "$$$";

			if(highestscore < hitScore)
            {
				highestscore = hitScore;
				shiftA_best = shiftA;
			}
		}	
		return (bestHitStringMaker(a,b,shiftA_best, shiftB) + "\nconsec score:" + highestscore);
	}



    public String mismatch2Print(Strand a,Strand b, int maxhitlimit, int[] ignoreShifts)
    {
		if(!a.isFivePrime)
			return mismatch2Print(a.reverse(),b, maxhitlimit,ignoreShifts);
		if(b.isFivePrime)
			return mismatch2Print(a,b.reverse(), maxhitlimit,ignoreShifts);

		Base[] shiftedA_Best = new Base[a.length + b.length*2];
		Base[] shiftedB = new Base[a.length + b.length*2];
		int highestScore = -1;

		for(int i = 1; i < b.length + a.length; i++)
        {
			boolean skipShift = false;
			for(int ignoreShiftIndex = 0; ignoreShiftIndex < ignoreShifts.length;ignoreShiftIndex++)
			{
				if(i == ignoreShifts[ignoreShiftIndex])
					skipShift = true;
			}
			if(!skipShift)
			{
				//Shift Bases over for each shift (0) = strand this  (1) = strand b
				ArrayList<Base[]> shiftedBaseArray = baseArrayMaker(a,b, i);			
				Base[] shiftedA = shiftedBaseArray.get(0);
				shiftedB = shiftedBaseArray.get(1);
				
				int consecCounter = 0;
				int hitScore = 0;
				
				for(int k = a.length; k < b.length + a.length+1; k++)
	            {
					if(shiftedB[k].canPair(shiftedA[k]))
		    			consecCounter++;
					else
	                {
						//Case: If the non-match is surrounded by match and is between consecutive hits ( ::: : = 2 , ::: :: = 3)
						if(shiftedB[k - 2].canPair(shiftedA[k - 2]) && 
	                            shiftedB[k + 2].canPair(shiftedA[k + 2]) && 
	                            shiftedB[k - 1].canPair(shiftedA[k - 1]) && 
	                            shiftedB[k + 1].canPair(shiftedA[k + 1]) && consecCounter > 0)
							consecCounter--;
						//Case: if the non-match is not between two matches, then consecCounter returns to 0 
						else
	                    {
							if(consecCounter >= maxhitlimit)
								hitScore++;
							if(consecCounter > maxhitlimit)
								hitScore = hitScore + (consecCounter - maxhitlimit);
							consecCounter = 0;  	
						}      
						// :: :: = 3   ::: :: = 4   ::: ::: = 5  :::: :: = 5   :::: ::: = 6
					}
				}
				String[] temp = bestHitStringMakerPrint(a,b,shiftedBaseArray.get(0), shiftedBaseArray.get(1));
				this.shiftPrint = this.shiftPrint + temp[0] + "\n" + temp[1] + "\n" + temp[2] + "\n";

				if(highestScore < hitScore){
					highestScore = hitScore;
					shiftedA_Best = shiftedA;
				}

			}
		}
		return (bestHitStringMaker(a,b,shiftedA_Best, shiftedB) + "\nconsec score:" + highestScore);

    }
}
