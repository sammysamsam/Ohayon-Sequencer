import java.util.Arrays;
import java.util.ArrayList;
import java.util.concurrent.ThreadLocalRandom;
import java.util.*;


public interface DNAinterface {

    //get random base
    public char randomBase()
    {
        char[] possible = {'A', 'T', 'C', 'G'};
        int num = ThreadLocalRandom.current().nextInt(0,4); 
        return possible[num];
    }

    //get "ratio score" of AT to CG (score of 0 is equal to 50:50)
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


    
    //Return randomized version of array [A, T, C, G]
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
   

   //Return randomized array of possible base positions (0 to strand.length-1) 
   //(if blueprint exists, then do not include position of bases that can not be changed)

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

   // get array of base positions (0 to length) corresponding a strand's sequence (not including blueprint bases)
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

   // get array of edge base positions (0 to 3 and length-4 to length-1) corresponding a strand's sequence (not including blueprint bases)

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


     // Implementing Fisher–Yates shuffle int array
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

    // shuffled array of ints from 0 to range 
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