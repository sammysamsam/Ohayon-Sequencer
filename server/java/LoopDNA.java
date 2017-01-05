import java.util.ArrayList;
import java.lang.*;

public class LoopDNA extends FullStrand
{

	public int mismatch(FullStrand other,ArrayList<Strand> componentsAvailable)
	{

	}
	public int mismatch(LoopDNA other,ArrayList<Strand> componentsAvailable)
	{

	}

/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
OTHER METHODs:
 	
** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */  

	
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
					//System.out.println(otherComponentName);
	                
	               	if(otherComponentExist)
	                    basesShiftedOther = basesShiftedOther + other.componentsList.get(otherIndex).length;
	                else
	                    basesShiftedOther = basesShiftedOther + 5;


	                if(otherComponentName.equals(thisComponentName+"'") || (otherComponentName+"'").equals(thisComponentName))
	                {
	                     //  other      CBA   ->      ABC                      
	                    // this       A'B  ->            A'B    
	                    //System.out.println("\n\n\n"+basesShiftedOther+"||" +basesShiftedThis)  ;
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
         //   System.out.println("shift AT "+restrictedShifts.get(i).intValue());
            finalarray[i] = restrictedShifts.get(i).intValue();
        }
        return finalarray;
    }



}