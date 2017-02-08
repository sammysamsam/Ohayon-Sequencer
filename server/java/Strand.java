import java.util.concurrent.ThreadLocalRandom;
import java.util.ArrayList;
import java.util.Arrays;

public class Strand 
{
	String sequence;
	String name;
	boolean isFivePrime;
    int length;
    
    boolean complementExists = false;
    boolean blueprintExists = false;
    char[] blueprint;    
    
    double compConcentration = 0;
    double strandConcentration = 0;
    double desiredMeltingPoint = -1000;
    
    int mismatchThreshold = 5;
    int hairpinThreshold = 5;
    
	public Strand(String sequence)
	{
		strandPropertySetter(sequence,true);
	}
	
	public Strand(String sequence, boolean isFivePrime)
	{
		strandPropertySetter(sequence,isFivePrime);
	}
	
	public Strand(Base[] f, boolean isFivePrime)
	{
		String seq = "";
		for(int g = 0; g < f.length; g++)
        {
			seq = seq + f[g].base;
		}
		strandPropertySetter(seq, true);
	}
	
    public Strand(int length, boolean isFivePrime) //Makes a randomly generated strand from an inputted length and polarity.
    {
        char[] strand = new char[length];
        for(int i = 0; i < length; i++)
        {
            strand[i] = randomBase();
        }
    	strandPropertySetter(String.valueOf(strand), isFivePrime);
    }
    
    public Strand(Strand[] arr, boolean isFivePrime) // Makes new strand from an array of strands. (Strand parts)
    {
        String baseList = "";
        for(int i = 0; i < arr.length; i++)
        {
            if(arr[i].isFivePrime == isFivePrime)
                baseList += arr[i].sequence;
            else
                baseList += arr[i].reverse().sequence;
        }
        strandPropertySetter(baseList, isFivePrime);
    }

/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

    STRAND PROPERTIES METHOD:

** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */


    private void strandPropertySetter(String sequence, boolean fiveprime)
    {
		this.setSequence(sequence);
		this.isFivePrime = fiveprime;
        this.length = this.sequence.length();
        this.setComplement(false);
    }
    
    public void setName(String x)
    {
        name = x;
    }
    
    public void setHairpinThreshold(int i)
    {
		this.hairpinThreshold = i;
	}
	public void setMismatchThreshold(int i)
    {
		this.mismatchThreshold = i;
	}
	public void setSequence(String sequence)
	{
		this.sequence = sequence;
        this.length = this.sequence.length();
	}
    public void setBlueprint(String blueprint)
    {
		this.blueprintExists = true;
		this.blueprint = blueprint.toCharArray();
		if(this.isFivePrime == false)
        {
			this.setSequence(this.reverse().sequence);
			this.isFivePrime= !this.isFivePrime;
		}
		char[] sequenceArray = this.sequence.toCharArray();
		int counter = 0;
		for(char f:this.blueprint)
        {
			if(f == 'A'||f == 'T'||f == 'C'||f == 'G')
            {
				sequenceArray[counter] = f;
			}
			counter ++;
		}		
		this.setSequence(String.valueOf(sequenceArray));		
	}
	public void setComplement(boolean f)
    {
		this.complementExists = f;
		if(f)
        {
		    this.compConcentration = .5000;
		    this.strandConcentration = .5000;
		}
	}
	public boolean setTm(double tm, ThermodynamicsCalculator x){
		String seqTemp = "";
		String seqTemp2 = "";
		for(int i = 0 ; i < length; i++)
        {
			seqTemp = "A";
			seqTemp2 = "C";
		}
		Strand strandTemp = new Strand(seqTemp, true);
		Strand strandTemp2 = new Strand(seqTemp2, true);
		
		double minimumtm = x.temperatureCalculator(strandTemp);
		double maximumtm = x.temperatureCalculator(strandTemp2);
		if(tm >= maximumtm || tm <= minimumtm)
        {
			return false;
		}
		this.desiredMeltingPoint = tm;
		return true;
	}

	/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

	STRAND MIRROR/COMPLEMENT METHODS:

	** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    public Strand complement()
    {
        String newStrand = "";
		for (int i = 0; i < this.sequence.length(); i++)
		{
			Base A = new Base(sequence.charAt(i));
            newStrand += A.complement();
		}
		Strand f = new Strand(newStrand, !this.isFivePrime);
		f.mismatchThreshold = this.mismatchThreshold;
		f.hairpinThreshold = this.hairpinThreshold;
        return f;
	}

    public boolean isComplementary(Strand otherStrand)
    {
        if(this.isFivePrime != otherStrand.isFivePrime)
            return this.isComplementary(otherStrand.reverse());
        if(this.sequence.equals(otherStrand.complement().sequence))
            return true;
        else
            return false;
    }

	public Strand reverse() //returns same physical strand in the reverse orientation
	{
        String newStrand = "";
		for (int i = this.sequence.length() - 1; i > - 1; i--) //Reverse the bases of the strand
		{
			Base A = new Base(sequence.charAt(i));
			newStrand += A.base;
		}
		Strand temp = new Strand(newStrand, !this.isFivePrime);
		temp.mismatchThreshold = this.mismatchThreshold;
		temp.hairpinThreshold = this.hairpinThreshold;
		temp.blueprintExists = this.blueprintExists;
	    temp.blueprint = this.blueprint;
		if(this.complementExists == true)
        {
			temp.setComplement(false);
		}
		if(this.desiredMeltingPoint != -1000)
        {
			temp.desiredMeltingPoint = this.desiredMeltingPoint;
		}
        return temp;
	}
	
/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

STRAND PROPERTIES/GETTER METHODS

** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

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

	
	@Override
	public String toString() 
	{
		char[] sequence = new char[this.length];
		for(int i = 0; i < this.length; i ++){
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
		for (int i = 0; i < f.length; i ++)
        {
			String temp = Character.toString(f[i].base);
			if(temp.equals("o"))
				temp = " ";
			fullstring = fullstring + temp;
		}
		return fullstring;
	}
	public double GCcontent(){
		double count = 0;
		for (int i = 0; i < this.sequence.length(); i++)
        {		
			if(sequence.charAt(i)=='G' ||sequence.charAt(i)=='C')
				count ++;
		}
		return count/this.sequence.length();
	}
	
	
/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

	STRAND VS COMPLEMENT SELF CHECKER METHOD

** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

	
	
	public int selfvsComplementMismatch(ThermodynamicsCalculator z)
    { //returns the largest hits of all possible orientations of strand vs itself	

		if(!this.isFivePrime)
			return this.reverse().selfvsComplementMismatch(z);

		int maxhitlimit = this.hairpinThreshold;
		Strand complement = this.complement();
		int[] ignoreShift = {this.length};
		return this.mismatch2(complement,maxhitlimit,ignoreShift);
		
	}

/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

	ARRAY MAKER/SHIFTER METHOD (Used in strand comparision methods)

** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

	
	private Base[][] baseArrayMaker(Strand b, int shiftlength)
    {
		Base[] shift1 = new Base[this.length+b.length*2];   // 3 b sequence ->  oooooooooo  oooooooooooooo 5
        Base[] shift2 = new Base[this.length+b.length*2];   // 5 oooooooooo    this.sequence  oooooooooo 3
       
        for (int w = 0; w < this.length+b.length*2 ; w++)
        {
			if(w < shiftlength)
				shift1[w] = new Base('o');
			else if(w >=shiftlength && w < b.length+shiftlength)
				shift1[w] = new Base(b.sequence.charAt(w-shiftlength));
			else
				shift1[w]= new Base('o');
		}
		for(int i = 0; i < b.length; i++)
        {
            shift2[i] = new Base('o');
        }		
        for(int i = b.length; i < this.length+b.length; i++)
        {
        	shift2[i] = new Base(this.sequence.charAt(i-b.length));
        }	       
        for(int i = this.length+b.length; i < shift2.length; i++)
        {
        	shift2[i] = new Base('o');
        }		   
        Base[][] result = {shift1,shift2};
        return result;
	}
	
	
	
	private Base[][] lowestEnergyOrientation(Strand b,ThermodynamicsCalculator z, int conseclimit)
	{
	
		Base[] shiftedB = new Base[this.length+b.length*2];       // 3 b sequence ->  oooooooo  oooooooooooooo 5
		Base[] shiftedThis = new Base[this.length+b.length*2];	  // 5 oooooooooo    this.sequence  oooooooooo 3
		double lowestFreeEnergy=1000;

		for(int i = 1; i < b.length+this.length; i ++)
        {
			//Shift Bases over for each shift (0) = strand this  (1) = strand b
			Base[][] shiftedBaseArray = baseArrayMaker(b,i);
			
			//Counter-limit disregards consecutive hits smaller than the mismatch threshold
			z.consecutiveLimit = conseclimit-1;
			
			//Find the free energy of this arrangement of strand this [0] and strand b [1]
			double freeEnergy = z.nearestNeighbor(shiftedBaseArray[0] , shiftedBaseArray[1] , b.length , this.length);		
			
			System.out.println(bestHitStringMaker(b,shiftedBaseArray[1],shiftedBaseArray[0]));
			
			System.out.println(freeEnergy);
			// Save Score and Shifted Arrays of Strands (if its lower than current lowest energy score)
			if(lowestFreeEnergy > freeEnergy)
            {
               lowestFreeEnergy = freeEnergy;              
        		for (int w = 0; w < this.length+b.length*2; w++)
                {
        			shiftedB = shiftedBaseArray[0];
        			shiftedThis = shiftedBaseArray[1];
        		}
			}
	    }
        //return Base array of Strand This and Strand B in lowest energy arrangement
        Base[][] temp = {shiftedB,shiftedThis};
        return temp;
	}
	
	
	private String bestHitStringMaker(Strand b, Base[] thisShift, Base[] bShift)
	{	
		String hitmarker = "";
		String seq1 = "";
		String seq2 = "";
		for(int k = b.length; k < (this.length+b.length); k ++)
        {
    		seq2 = seq2+thisShift[k];   		

    		//Case: if Base Array of Strand This is a base instead of 'o'
			if(!bShift[k].nonbase())
            {
    			seq1 = seq1+bShift[k];
    			if( bShift[k].canPair(thisShift[k]))
    				hitmarker = hitmarker + ":";
    			else
      				hitmarker = hitmarker + " ";
			}

			else
            {
				seq1 = seq1+" ";
				hitmarker = hitmarker + " ";
			}
		}		
		return " 5 "+seq1+" 3 " +"\n   "+hitmarker + "\n 3 "+seq2+" 5 ";		
	}
	
	/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

	STRAND COMPARISION (Thermodynamics/consecutive matches) METHOD

** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

	// Thermo Mismatch: lowest energy configuration (nearest neighbor) and return consec score

	public double thermoMismatch(Strand b, ThermodynamicsCalculator z, int maxhitlimit)
    {
		if(!this.isFivePrime)	 // 	5  strand this  ooooooooooo ooooooo 3  = shiftedB	
			return this.reverse().thermoMismatch(b, z, maxhitlimit);
		if(b.isFivePrime)
			b = b.reverse(); 	 //  3  oooooooooo   	strand b   ooooooo 5  = shiftedThis
			
        Base[][] shiftedSequences = this.lowestEnergyOrientation(b, z, maxhitlimit);
        Base[] shiftedB = shiftedSequences[0];
        Base[] shiftedThis = shiftedSequences[1];

        double consecCounter = 0;
        double hitScore = 0;
        for(int k = b.length; k < b.length + this.length + 1; k ++)
        {
            if(shiftedB[k].canPair(shiftedThis[k]))
                consecCounter++;
            else
            {
                //Case: If the non-match is surrounded by match and is between consecutive hits ( ::: : = 2 , ::: :: = 3)
                if(k+2 < shiftedB.length && k -2 >= 0
                		&& shiftedB[k - 2].canPair(shiftedThis[k - 2])
                        && shiftedB[k+1].canPair(shiftedThis[k+2])
                        && shiftedB[k-1].canPair(shiftedThis[k-1])
                        && shiftedB[k+1].canPair(shiftedThis[k+1]) && consecCounter > 0)
                {
                    consecCounter = consecCounter - 1;
                }
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

        //this accounts for if there are consec hits in the very end (dont delete this)
		if(consecCounter >= maxhitlimit) 
			hitScore++;
		if(consecCounter > maxhitlimit)
			hitScore = hitScore + (consecCounter - maxhitlimit);


        return hitScore;
	}

//Mismatch: most consecutive hits of maxhitlimit and above (no nearest neighbor)
	public int mismatch(Strand b, int maxhitlimit)
    {
		if(!this.isFivePrime)
			return this.reverse().mismatch(b, maxhitlimit);
		if(b.isFivePrime)
			b = b.reverse();

		Base[] shiftedThis = new Base[this.length + b.length*2];
		Base[] shiftedB = new Base[this.length + b.length*2];
		int highestScore = 0;

		for(int i = 1; i < b.length + this.length; i++)
        {
			//Shift Bases over for each shift (0) = strand this  (1) = strand b
			Base[][] shiftedBaseArray = baseArrayMaker(b, i);			
			shiftedThis = shiftedBaseArray[0];
			shiftedB = shiftedBaseArray[1];
			
			int consecCounter = 0;
			int hitScore = 0;

			boolean singleMismatch = false;
			for(int k = b.length; k < b.length + this.length+1; k++)
            {
				if(shiftedB[k].canPair(shiftedThis[k]))
	    			consecCounter++;
				else
                {
					//Case: If the non-match is surrounded by match and is between consecutive hits ( ::: : = 2 , ::: :: = 3)
					if( 	singleMismatch == false &&
							k+2 < shiftedB.length && k -2 >= 0 && 
							shiftedB[k - 2].canPair(shiftedThis[k - 2]) && 
                            shiftedB[k + 2].canPair(shiftedThis[k + 2]) && 
                            shiftedB[k - 1].canPair(shiftedThis[k - 1]) && 
                            shiftedB[k + 1].canPair(shiftedThis[k + 1]) && 
                            consecCounter > 0)
						singleMismatch = true;

					//Case: if the non-match is not between two matches, then consecCounter returns to 0 
					else
                    {
						if(singleMismatch)
						{
							consecCounter = consecCounter - 1;
							singleMismatch = false;
						}
						if(consecCounter >= maxhitlimit) // :: :: = 3   ::: :: = 4   ::: ::: = 5  :::: :: = 5   :::: ::: = 6
							hitScore++;
						if(consecCounter > maxhitlimit)
							hitScore = hitScore + (consecCounter - maxhitlimit);
						consecCounter = 0;  	
					}      
				}
			}

			if(singleMismatch)
			{
				consecCounter = consecCounter/2 + 1;
				singleMismatch = false;
			}
			//this accounts for if there are consec hits in the very end (dont delete this)
			if(consecCounter >= maxhitlimit) // :: :: = 3   ::: :: = 4   ::: ::: = 5  :::: :: = 5   :::: ::: = 6
				hitScore++;
			if(consecCounter > maxhitlimit)
				hitScore = hitScore + (consecCounter - maxhitlimit);


			//System.out.println(bestHitStringMaker(b,shiftedBaseArray[1],shiftedBaseArray[0]));
			if(highestScore < hitScore)
				highestScore = hitScore;
		}
		return highestScore;
    }


//Mismatch2: most consecutive hits of maxhitlimit and above AND ignores shifts in ignoreShifts array 
 //(case: wanting to ignore shifts that would compare parts of strand designed to be complementary)
    
    public int mismatch2(Strand b, int maxhitlimit, int[] ignoreShifts)
    {
		if(!this.isFivePrime)
			return this.reverse().mismatch2(b, maxhitlimit,ignoreShifts);
		if(b.isFivePrime)
			b = b.reverse();

		Base[] shiftedThis = new Base[this.length + b.length*2];
		Base[] shiftedB = new Base[this.length + b.length*2];
		int highestScore = 0;

		for(int i = 1; i < b.length + this.length; i++)
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
				Base[][] shiftedBaseArray = baseArrayMaker(b, i);			
				shiftedThis = shiftedBaseArray[0];
				shiftedB = shiftedBaseArray[1];
				
				int consecCounter = 0;
				int hitScore = 0;

				boolean singleMismatch = false;
				for(int k = b.length; k < b.length + this.length+1; k++)
	            {
					if(shiftedB[k].canPair(shiftedThis[k]))
		    			consecCounter++;
					else
	                {
						//Case: If the non-match is surrounded by match and is between consecutive hits ( ::: : = 2 , ::: :: = 3)
						if( 	singleMismatch == false &&
								k+2 < shiftedB.length && k -2 >= 0 && 
								shiftedB[k - 2].canPair(shiftedThis[k - 2]) && 
	                            shiftedB[k + 2].canPair(shiftedThis[k + 2]) && 
	                            shiftedB[k - 1].canPair(shiftedThis[k - 1]) && 
	                            shiftedB[k + 1].canPair(shiftedThis[k + 1]) && 
	                            consecCounter > 0)
							singleMismatch = true;

						//Case: if the non-match is not between two matches, then consecCounter returns to 0 
						else
	                    {
							if(singleMismatch)
							{
								consecCounter = consecCounter - 1;
								singleMismatch = false;
							}
							if(consecCounter >= maxhitlimit) 
								hitScore++;
							if(consecCounter > maxhitlimit)
								hitScore = hitScore + (consecCounter - maxhitlimit);
							consecCounter = 0;  	
						}      
					}
				}

				/*
				this accounts for if there are consec hits in the very end (dont delete this)
				*/
				if(singleMismatch)
				{
					consecCounter = consecCounter - 1;
					singleMismatch = false;
				}
				if(consecCounter >= maxhitlimit)
					hitScore++;
				if(consecCounter > maxhitlimit)
					hitScore = hitScore + (consecCounter - maxhitlimit);


				if(highestScore < hitScore){
					highestScore = hitScore;
				}
				//System.out.println("\n"+highestScore+"  "+hitScore + " / "+i);
				//System.out.println("\n"+bestHitStringMaker(b,shiftedBaseArray[1],shiftedBaseArray[0]));
			}

		}
		return highestScore;
    }
    

    //baseArrayMismatch: returns worst base positions

	public ArrayList<Integer> baseArrayMismatch(Strand b, int maxhitlimit)
    {
		if(!this.isFivePrime)
        {
			ArrayList<Integer> reversedBaseArrayMismatch = this.reverse().baseArrayMismatch(b, maxhitlimit);
            ArrayList<Integer> worstBasePositions = new ArrayList<Integer>();
            for(Integer basePosition: reversedBaseArrayMismatch)
            {
                worstBasePositions.add(this.length - basePosition);
            }
            return worstBasePositions;
        }
		if(b.isFivePrime)
			b = b.reverse();


		Base[] shiftedThis = new Base[this.length + b.length*2];
		Base[] shiftedB = new Base[this.length + b.length*2];
        ArrayList<Integer> worstBasePositions = new ArrayList<Integer>();
		int highestScore = 0;


		for(int i = 1; i < b.length + this.length; i++)
        {
			//Shift Bases over for each shift (0) = strand this  (1) = strand b
			Base[][] shiftedBaseArray = baseArrayMaker(b, i);
            ArrayList<Integer> badBasePositions = new ArrayList<Integer>();
			shiftedThis = shiftedBaseArray[0];
			shiftedB = shiftedBaseArray[1];
			
			int consecCounter = 0;
			int hitScore = 0;
	
			boolean singleMismatch = false;		
			for(int k = b.length; k < b.length + this.length; k++)
            {
				if(shiftedB[k].canPair(shiftedThis[k]))
                {
	    			consecCounter++;
                    if(consecCounter > maxhitlimit)
                    {
                        badBasePositions.add(k - b.length);
                    }
                }
				else
                {
					//*
					//Case: If the non-match is surrounded by match and is between consecutive hits ( ::: : = 2 , ::: :: = 3)
					if( 	singleMismatch == false &&
								k+2 < shiftedB.length && k -2 >= 0 && 
								shiftedB[k - 2].canPair(shiftedThis[k - 2]) && 
	                            shiftedB[k + 2].canPair(shiftedThis[k + 2]) && 
	                            shiftedB[k - 1].canPair(shiftedThis[k - 1]) && 
	                            shiftedB[k + 1].canPair(shiftedThis[k + 1]) && 
	                            consecCounter > 0)
							singleMismatch = true;


					//*
					//Case: if the non-match is not between two matches, then consecCounter returns to 0 
					else// :: :: = 3   ::: :: = 4   ::: ::: = 5  :::: :: = 5   :::: ::: = 6
                    {
						if(singleMismatch)
						{
							consecCounter = consecCounter - 1;
							singleMismatch = false;
						}
						if(consecCounter >= maxhitlimit)
                        {
							hitScore++;
                            badBasePositions.add(k - b.length);
                        }
						if(consecCounter > maxhitlimit)
							hitScore = hitScore + (consecCounter - maxhitlimit);
						consecCounter = 0;
					}
					//
				}
			}

			//*
			//this accounts for if there are consec hits in the very end (dont delete this)
			if(singleMismatch)
			{
				consecCounter = consecCounter/2 + 1;
				singleMismatch = false;
			}
			if(consecCounter >= maxhitlimit)
				hitScore++;
			if(consecCounter > maxhitlimit)
				hitScore = hitScore + (consecCounter - maxhitlimit);
			//

			if(highestScore < hitScore)
            {
				highestScore = hitScore;
                worstBasePositions = badBasePositions;
            }    
		}
        return worstBasePositions;
    }

}
