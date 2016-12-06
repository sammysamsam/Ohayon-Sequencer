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
    	String names = a.name + " vs " + b.name;

		String[] results =  { names , this.ThermoMismatchPrint(a, b, 3), this.shiftPrint };
		return results;
	}

	private ArrayList<Base[]> baseArray(Strand a, Strand b, int shiftlength)
    {
		Base[] shift1 = new Base[a.length+b.length*2];   // a sequence ->  oooooooo  oooooooooo
        Base[] shift2 = new Base[a.length+b.length*2];   // oooooooooo      b sequence  oooooooooo
        
        for (int w = 0; w < a.length+b.length*2 ; w++)
        {
			if(w < shiftlength)
				shift1[w] = new Base('o');
			else if(w >=shiftlength && w < a.length+shiftlength)
				shift1[w] = new Base(a.sequence.charAt(w-shiftlength));
			else
				shift1[w]= new Base('o');
		}
		for(int i = 0; i < a.length; i++)
        {
            shift2[i] = new Base('o');
        }		
        for(int i = a.length; i < b.length+a.length; i++)
        {
        	shift2[i] = new Base(b.sequence.charAt(i-a.length));
        }	       
        for(int i = b.length+a.length; i < shift2.length; i++)
        {
        	shift2[i] = new Base('o');
        }		   

        ArrayList<Base[]> f = new ArrayList<Base[]>();
        f.add(shift1);
        f.add(shift2);
        return f;
	}


	//


	private String hitsArray(Strand a,Strand b,Base[] aShift, Base[] bShift)
	{	
		String hitMarker = "";
		String seq1 = "";
		String seq2 = "";
		for(int k = a.length-1; k < (a.length + b.length)+1; k++)
        {
    		if(!(bShift[k].base == 'o'))
    		{
      			seq2 = seq2 + bShift[k];    			
    		}else
    		{
    			seq2 = seq2 + " ";  
    		}

 	    	if(!(aShift[k].base == 'o'))
    		{
    			seq1 = seq1 + aShift[k];	  			
    		}else
    		{
    			seq1 = seq1 + " ";  
    		}

			if(bShift[k].canPair(aShift[k]))
            {
				hitMarker = hitMarker + ":";
            }
			else
            {
  				hitMarker = hitMarker + " ";
			}
		}		

		String result = (" 5 " + seq1 + " 3 " + "\n   "
            + hitMarker + "\n 3 "
            + seq2 + " 5 \n");

		return result;
	}



	private String ThermoMismatchPrint(Strand a,Strand b,int maxhitlimit)
    { //returns the largest hits of all possible orientations			              
		if(!a.isFivePrime)	// 	5  strand this  ooooooooooo ooooooo 3  = shiftb	
			return ThermoMismatchPrint(a.reverse(), b,maxhitlimit);
		if(b.isFivePrime)		  
			b = b.reverse(); 	//  3  ooooooooooooo   strand b ooooooo 5  = shiftA
        

		Base[] shiftedA = new Base[a.length+b.length*2];
		Base[] shiftedB = new Base[a.length+b.length*2];  
		double lowestFreeEnergy=1000;

		for(int i = 1; i < b.length+a.length; i ++)
        {
			ArrayList<Base[]> shiftedBaseArray = baseArray(a,b,i);

			//Find the free energy of this arrangement of strand this and strand b
			double freeEnergy = this.thermocalc.nearestNeighbor(shiftedBaseArray.get(0),shiftedBaseArray.get(1),b.length,a.length);		

			// Save Score and Shifted Arrays of Strands (if its lower than current lowest energy score)
			if(lowestFreeEnergy > freeEnergy)
            {
               lowestFreeEnergy = freeEnergy;              
        		for (int w = 0; w < a.length+b.length*2; w++)
                {
        			shiftedA = shiftedBaseArray.get(0);	//best
        			shiftedB = shiftedBaseArray.get(1); //best
        		}
			}
			this.shiftPrint = this.shiftPrint + hitsArray(a,b,shiftedBaseArray.get(0),shiftedBaseArray.get(1)) + "$$$";
	    }

	    String bestFreeEnergy =  Double.toString(this.thermocalc.nearestNeighbor(shiftedA,shiftedB,b.length,a.length));
        return (hitsArray(a,b,shiftedA,shiftedB)+"\nNearest Neighbor Free Energy Total: "+bestFreeEnergy);
	}



//*********************************


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
			
			this.shiftPrint = this.shiftPrint + hitsArray(a,b,shiftedBaseArray.get(0),shiftedBaseArray.get(1));
	

			if(highestscore < hitScore)
            {
				highestscore = hitScore;
				shiftA_best = shiftA;
			}
		}	
		return (hitsArray(a,b,shiftA_best,shiftB) + "\nconsec score:" + highestscore);
	}
	

}
