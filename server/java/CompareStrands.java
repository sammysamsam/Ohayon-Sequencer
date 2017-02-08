import java.util.ArrayList;
public class CompareStrands {
	String shiftPrint  = "";
	ThermodynamicsCalculator thermocalc;
	public CompareStrands(ThermodynamicsCalculator a)
    {
    	this.thermocalc = a;
	}
	public void bestArrangement(Strand a, Strand b){
		System.out.println(a.name + " vs " + b.name);
		System.out.println(this.mismatchPrint(a, b, 4) + "\n");
		System.out.println(a.name + "' vs " + b.name);
		System.out.println(this.mismatchPrint(a.complement(), b, 4) + "\n");
		//System.out.println(a.name + "' vs " + b.name);
		//System.out.println(this.mismatchPrint(a.complement(), b, 5) + "\n");
	}
	public void bestArrangementFull(Strand a, Strand b,int[] restrictedshifts){
				System.out.println(a.name + " vs " + b.name + "\n" 
                        + this.mismatch2Print(a, b, 2,restrictedshifts) + "\n");
	}


	public String[][] compareAll(ArrayList<Strand> componentList,ArrayList<FullStrand> fullStrandList )
	{
		
		int size = componentList.size();
		size = (size*size + size)/2;
	
		//component vs component
		String[] componentResult = new String[size];
		int index = 0;
		for(int x = 0; x < componentList.size(); x++)
		{
			for(int y = x; y < componentList.size(); y++)
			{
                componentResult[index] = componentList.get(x).name + " vs " + componentList.get(y).name + "\n\n";
                System.out.println(componentResult[index]);
				componentResult[index] = componentResult[index] + this.mismatchPrint(componentList.get(x) , componentList.get(y) , 3);
				index++;
			}		
		}
        
		//full strand vs full strand
		size = fullStrandList.size();
		size = (size*size + size)/2;
		String[] fullStrandResult = new String[size];
		index = 0;
		for(int x = 0; x < fullStrandList.size(); x++)
		{
			
			Strand current = fullStrandList.get(x).combine(componentList);
			if(fullStrandList.get(x) instanceof LoopDNA && current.length > 4)
        			current.setSequence(current.sequence + current.sequence.substring(0, 4));

			for(int y = x; y < fullStrandList.size(); y++)
			{
				fullStrandResult[index] = fullStrandList.get(x).name + " vs " + fullStrandList.get(y).name+"\n\n";

				Strand other = fullStrandList.get(y).combine(componentList);
				if(fullStrandList.get(y) instanceof LoopDNA && other.length > 4)
	        			other.setSequence(other.sequence + other.sequence.substring(0, 4));

				int[] ignoreShifts = fullStrandList.get(x).getComplementShifts(fullStrandList.get(y),componentList);

				if (ignoreShifts.length == 0)
					fullStrandResult[index] = fullStrandResult[index]+ this.mismatchPrint(current , other, 4);
				else
					fullStrandResult[index] = fullStrandResult[index]+ this.mismatch2Print(current, other , 4 , ignoreShifts);
				index++;
			}		
		}
		String[][] temp = {componentResult,fullStrandResult};
		return temp;
	}



	public String[] compareTwo(Strand a, boolean loopA, Strand b,boolean loopB)
    {
		
		String[] result = new String[2];
		
		if(loopA)
		{
			a = new Strand(a.sequence + a.sequence,true);
		}
		if(loopB)
		{
            b = new Strand(b.sequence+b.sequence,true);
		}
		result[0] = this.mismatchPrint(a, b, 2);
		result[1] = this.shiftPrint;	
		return result;
	}

	private Base[][] baseArrayMaker(Strand a, Strand b, int shiftlength)
    {
		Base[] shift1 = new Base[a.length+b.length*2];   // 3 b sequence ->  oooooooo  oooooooooooooo 5
        Base[] shift2 = new Base[a.length+b.length*2];   // 5 oooooooooo    a sequence  oooooooooo 3
       
        for (int w = 0; w < shift1.length; w++)
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
        for(int i = b.length; i < a.length+b.length; i++)
        {
        	shift2[i] = new Base(a.sequence.charAt(i-b.length));
        }	       
        for(int i = a.length+b.length; i < shift2.length ; i++)
        {
        	shift2[i] = new Base('o');
        }		   
        Base[][] result = {shift1,shift2};
        return result;
	}
	
	private String bestHitStringMaker(Strand a, Strand b, Base[] thisShift, Base[] bShift)
	{	
		String hitmarker = "";
		String seq1 = "";
		String seq2 = "";
		for(int k = b.length*3/4; k < (a.length+b.length + b.length/4); k ++)
        {
   			if(!thisShift[k].nonbase()) 		
    			seq2 = seq2 + thisShift[k];   	
    		else
    			seq2 = seq2 + " ";	

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
		
		for(int i = 1; i < b.length + a.length; i++)
        {	
			Base[][] shiftedBaseArray = baseArrayMaker(a, b, i);
			Base[] shiftA = shiftedBaseArray[0];
			shiftB = shiftedBaseArray[1];
			
			double consecCounter = 0;
			double hitScore = 0;


			boolean singleMismatch = false;
			for(int k = b.length; k < b.length + a.length + 1; k++)
            {
				if(shiftB[k].canPair(shiftA[k]))    			
	    			consecCounter++;
				else
                {
					//Case: If the non - match is surrounded by match and is between consecutive hits ( ::: : = 2 , ::: :: = 3)
					

					if( 	singleMismatch == false &&
							k+2 < shiftB.length && k -2 >= 0 && 
							shiftB[k - 2].canPair(shiftA[k - 2]) && 
                            shiftB[k + 2].canPair(shiftA[k + 2]) && 
                            shiftB[k - 1].canPair(shiftA[k - 1]) && 
                            shiftB[k + 1].canPair(shiftA[k + 1]) && 
                            consecCounter > 0)
						singleMismatch = true;

					//Case: if the non - match is not between two matches, then consecCounter returns to 0 
					else
                    {
						if(singleMismatch)
						{
							consecCounter = consecCounter --;
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
			if(singleMismatch)
			{
				consecCounter = consecCounter --;
				singleMismatch = false;
			}
			//this accounts for if there are consec hits in the very end (dont delete this)
			if(consecCounter >= maxhitlimit) // :: :: = 3   ::: :: = 4   ::: ::: = 5  :::: :: = 5   :::: ::: = 6
				hitScore++;
			if(consecCounter > maxhitlimit)
				hitScore = hitScore + (consecCounter - maxhitlimit);

			this.shiftPrint = this.shiftPrint + bestHitStringMaker(a,b,shiftedBaseArray[0], shiftedBaseArray[1]) + "$$$";
			
			//System.out.println("shift: "+ i+"\n\n"+bestHitStringMaker(a,b,shiftedBaseArray[0], shiftedBaseArray[1]));

			if(highestscore < hitScore)
            {
				highestscore = hitScore;
				shiftA_best = shiftA;
			}
			if( highestscore==-1 && i == b.length)
				shiftA_best = shiftA;
		}	
		return (bestHitStringMaker(a,b,shiftA_best, shiftB));
	}



    public String mismatch2Print(Strand a,Strand b, int maxhitlimit, int[] ignoreShifts)
    {
		if(!a.isFivePrime)
			return mismatch2Print(a.reverse(),b, maxhitlimit,ignoreShifts);
		if(b.isFivePrime)
			return mismatch2Print(a,b.reverse(), maxhitlimit,ignoreShifts);

		Base[] shiftedA_Best = new Base[a.length + b.length*2];
		Base[] shiftB = new Base[a.length + b.length*2];
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
				Base[][] shiftedBaseArray = baseArrayMaker(a,b, i);			
				Base[] shiftA = shiftedBaseArray[0];
				shiftB = shiftedBaseArray[1];
				
				int consecCounter = 0;
				int hitScore = 0;
				
				boolean singleMismatch = false;				
				for(int k = b.length; k < b.length + a.length+1; k++)
	            {
					if(shiftB[k].canPair(shiftA[k]))
		    			consecCounter++;
					else
	                {
						//Case: If the non-match is surrounded by match and is between consecutive hits ( ::: : = 2 , ::: :: = 3)
						if( singleMismatch == false &&
							k + 2 < shiftB.length && k - 2 >= 0 && 
							shiftB[k - 2].canPair(shiftA[k - 2]) && 
                            shiftB[k + 2].canPair(shiftA[k + 2]) && 
                            shiftB[k - 1].canPair(shiftA[k - 1]) && 
                            shiftB[k + 1].canPair(shiftA[k + 1]) && 
                            consecCounter > 0)
						singleMismatch = true;

						//Case: if the non-match is not between two matches, then consecCounter returns to 0 
						else
	                    {
							if(singleMismatch)
							{
								consecCounter = consecCounter --;
								singleMismatch = false;
							}
							if(consecCounter >= maxhitlimit)
								hitScore++;
							if(consecCounter > maxhitlimit)
								hitScore = hitScore + (consecCounter - maxhitlimit);
							consecCounter = 0;  	
						}      
						// :: :: = 3   ::: :: = 4   ::: ::: = 5  :::: :: = 5   :::: ::: = 6
					}
				}
				this.shiftPrint = this.shiftPrint + bestHitStringMaker(a,b,shiftedBaseArray[0], shiftedBaseArray[1]) + "\n";

				if(singleMismatch)
				{
					hitScore = hitScore/2 + 1;
					singleMismatch = false;
				}
				//this accounts for if there are consec hits in the very end (dont delete this)
				if(consecCounter >= maxhitlimit) // :: :: = 3   ::: :: = 4   ::: ::: = 5  :::: :: = 5   :::: ::: = 6
					hitScore++;
				if(consecCounter > maxhitlimit)
				hitScore = hitScore + (consecCounter - maxhitlimit);

				

				if(highestScore < hitScore)
				{
					highestScore = hitScore;
					shiftedA_Best = shiftA;
				}
				if(highestScore == -1 && i == b.length)
					shiftedA_Best = shiftA;
			}
		}
		return (bestHitStringMaker(a,b,shiftedA_Best, shiftB));
    }
}
