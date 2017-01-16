import java.util.ArrayList;
import java.lang.*;

public class LoopDNA extends FullStrand
{
	 public LoopDNA(String name, ArrayList<Strand> parts, String[] listOfNames)
	 {
	    super(name, parts, listOfNames);
	 }    

	public int mismatch(FullStrand other, ArrayList<Strand> componentsAvailable)
	{
        Strand loopStrandForm = this.combine(componentsAvailable);
        Strand otherStrandForm = other.combine(componentsAvailable); 

        if(other instanceof LoopDNA) // If the other strand is also LoopDNA
        {
            String thisSeq = loopStrandForm.sequence;

            if(thisSeq.length() > 4)
            {
                String thisAddedBases = thisSeq.substring(0, 4);
                loopStrandForm.setSequence(loopStrandForm.sequence + thisAddedBases); 
            }
            else
                loopStrandForm.setSequence(loopStrandForm.sequence + loopStrandForm.sequence); 
        
            String otherSeq = otherStrandForm.sequence;

            if(otherSeq.length() > 4)
            {
                String otherAddedBases = otherSeq.substring(0, 4);
                otherStrandForm.setSequence(otherStrandForm.sequence + otherAddedBases);
            }
            else
                   otherStrandForm.setSequence(otherStrandForm.sequence + otherStrandForm.sequence);
             
            int[] complementShifts = this.getComplementShifts(other, componentsAvailable);
            int score = loopStrandForm.mismatch2(otherStrandForm, 5, complementShifts);

            return score;
        }
        else // If the other strand is a FullStrand
        {
            // case: full strand is longer than loop strand or loop strand length is less than 4

            if((otherStrandForm.length > loopStrandForm.length) || (loopStrandForm.length < 4))
            {
                String thisSeq = loopStrandForm.sequence;
                if(thisSeq.length() > 4)
                {
                    String thisAddedBases = thisSeq.substring(0, 4);
                    loopStrandForm.setSequence(loopStrandForm.sequence + thisAddedBases); 
                }
                else
                    loopStrandForm.setSequence(loopStrandForm.sequence + loopStrandForm.sequence); 
                    
                int[] complementShifts = this.getComplementShifts(other, componentsAvailable);
                int score = loopStrandForm.mismatch2(otherStrandForm, 5,complementShifts);
                return score;
            }

            //  case: loop strand is longer than full strand

            String thisSeq = loopStrandForm.sequence;
            String addedBases = thisSeq.substring(0, 4);
            loopStrandForm.setSequence(loopStrandForm.sequence + addedBases);

            int[] complementShifts = this.getComplementShifts(other, componentsAvailable);
            int score = loopStrandForm.mismatch2(otherStrandForm, 5, complementShifts);

            return score;
        }
	}	



/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
OTHER METHODs:
 	
** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */  
/*
    public int[] getComplementShifts(LoopDNA other, ArrayList<Strand> componentsAvailable)
    {
        ArrayList<Integer> restrictedShifts = new ArrayList<Integer>();
        int basesShiftedThis = 0;
        int basesShiftedOther = 0;

        for(int thisIndex = 0; thisIndex <this.componentsList.size(); thisIndex++)
        {
         	//if component in fullstrand exists in componentsAvailable list
            String thisComponentName = this.componentNames[thisIndex];  
            boolean componentExist = this.componentExistsInComponentList(thisComponentName,componentsAvailable);
            if(componentExist)
            {
	            basesShiftedOther = 0;

	            for(int otherIndex = 0; otherIndex <other.componentsList.size() ; otherIndex++)
	            {
	             	//if other component in other fullstrand in componentsAvailable list
	                String otherComponentName = other.componentNames[otherIndex];   
	                boolean otherComponentExist = this.componentExistsInComponentList(otherComponentName,componentsAvailable);

	               	if(otherComponentExist)
	                    basesShiftedOther = basesShiftedOther + other.componentsList.get(otherIndex).length;
	                else
	                    basesShiftedOther = basesShiftedOther + 5;


	                if(otherComponentName.equals(thisComponentName+"'") || (otherComponentName+"'").equals(thisComponentName))
	                {
	                     //  other      CBA   ->      ABC                      
	                    // this         A'B  ->            A'B    
	                    int shift = basesShiftedOther+basesShiftedThis;
	                    restrictedShifts.add(shift);
	                }
	            }

	            basesShiftedThis = basesShiftedThis + this.componentsList.get(thisIndex).length;
            }
            else
                basesShiftedThis = basesShiftedThis + 5;
        }

        int[] finalarray = new int[restrictedShifts.size()];
        for (int i=0; i < finalarray.length; i++)
        {
            finalarray[i] = restrictedShifts.get(i).intValue();
        }
        return finalarray;
    }
*/
}
