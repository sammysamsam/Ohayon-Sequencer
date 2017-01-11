import java.util.ArrayList;
import java.lang.*;
public class FullStrand
{
	String name;
	ArrayList<Strand> componentsList;
	String[] componentNames;
	int size;
	
	public FullStrand(String name, ArrayList<Strand> parts, String[] listOfNames)
    {
    	this.setComponentsList(parts);
    	this.setName(name);
    	this.setComponentsNames(listOfNames);
	}

	public FullStrand(ArrayList<Strand> parts, String[] listOfNames)
    {
    	this.setComponentsList(parts);
    	this.setComponentsNames(listOfNames);
	}

	public FullStrand(ArrayList<Strand> parts)
    {
    	this.setComponentsList(parts);
	}

	public FullStrand(Strand component) //Starts building a FullStrand from one component
    {
        ArrayList<Strand> parts = new ArrayList<Strand>();
        parts.add(component);
    	this.setComponentsList(parts);
    }

	public FullStrand() //Starts building a FullStrand 
    {
	}

	/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	SETTER AND GETTERS METHOD:
	** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
	
	public void setName(String name)
	{
		this.name = name;
	}

	public void setComponentsList(ArrayList<Strand> comp)		//components added in order 5-3 prime
	{
		this.componentsList = comp;
		this.size = componentsList.size();
	}

	public void setComponentsNames(String[] listOfNames)
	{
		this.componentNames = listOfNames;
	}

	public int mismatch(FullStrand other,ArrayList<Strand> componentsAvailable)
	{

		//check: fullstrand other is LoopDNA
		if(other instanceof LoopDNA)
			return other.mismatch(this, componentsAvailable);
		//

		Strand thisStrand = this.combine(componentsAvailable);
		Strand otherStrand = other.combine(componentsAvailable);
		int[] complementShifts = this.getComplementShifts(other,componentsAvailable);
        if(complementShifts.length == 0)
        {
            //System.out.println(this.name+" "+otherStrand.mismatch(thisStrand,5));
            return otherStrand.mismatch(thisStrand,5);
        }
        else
        {
           //System.out.println(other.name+" "+thisStrand.mismatch2(otherStrand,5,complementShifts));
           return otherStrand.mismatch2(thisStrand,5,complementShifts); 
        }
	}

	/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	OTHER METHODs:
     	
	** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */  

    public int[] getComplementShifts(FullStrand other, ArrayList<Strand> componentsAvailable)
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


// Components will always be 5' to 3'

	public void add(Strand a)
    {
		componentsList.add(a);
		this.size++;
	}

	//create strand from components available in componentsAvailable list (if component DNE then add ooooo as filler bases)
	public Strand combine(ArrayList<Strand> componentsAvailable)
	{
		String fullSeq = "";
		for(String name: this.componentNames)
		{
			boolean strandExists = false;
			for(int index = 0; index < componentsAvailable.size();index ++)
			{
				Strand component = componentsAvailable.get(index);
				if(component.name.equals(name))
				{
					strandExists = true;
					fullSeq = fullSeq + component.sequence;
					break;
				}
				if((component.name+"'").equals(name))
				{
					strandExists = true;
					fullSeq = fullSeq + component.complement().reverse().sequence;
					break;
				}
			}	
			if(!strandExists)
			{
				fullSeq = fullSeq+"ooooo";
			}
		}
		Strand finalStrand = new Strand(fullSeq, true);
		finalStrand.setName(name);
		return finalStrand;
	}

	/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	CONTAIN METHODs:
     	
	** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */


	//if component exists in componentsAvailable list
	public boolean contains(String componentName)
	{
        for(String compInStrand: this.componentNames)
        {
            if(compInStrand.equals(componentName) || compInStrand.equals(componentName+"'"))
            	return true;
        }
        return false;
	}
	//if component exists in componentsAvailable list
	private boolean componentExistsInComponentList(String componentName, ArrayList<Strand> componentsAvailable)
	{
		for(int index = 0; index < componentsAvailable.size();index++)
		{
			if(componentsAvailable.get(index).name.equals(componentName) || (componentsAvailable.get(index).name+"'").equals(componentName) )
				return true;
		}
		return false;
	}
}