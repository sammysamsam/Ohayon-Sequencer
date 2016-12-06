import java.util.ArrayList;
import java.lang.*;
public class FullStrand
{
	String name;
	ArrayList<Strand> componentsList;
	String[] componentNames;
	int size;
	
	public FullStrand(String name,ArrayList<Strand> parts, String[] listOfNames)
    {
    	this.setComponentsList(parts);
    	this.setName(name);
    	this.setComponentsNames(listOfNames);
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


	/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

	OTHER METHODs:

	** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
	



    public boolean containsComplement(FullStrand other)
    {
        for(Strand component: componentsList)
        {
            for(Strand comparedComponent: other.componentsList)
            {
                if(component.isComplementary(comparedComponent))
                    return true;
            }
        }
        return false;
    }

// Components will always be 5' to 3'

	public void add(Strand a)
    {
		componentsList.add(a);
		this.size++;
	}

	
	public Strand combine()
    {
		String fullSeq = "";
		String[] nameList = this.componentNames;

		int counter = 0;
		for(String name: nameList)
		{
			if(name.contains("'"))
			{
				Strand a = componentsList.get(counter).complement();
				fullSeq = fullSeq + a.reverse().sequence;
			} 
			else
			{
				Strand a = componentsList.get(counter);
				fullSeq = fullSeq + a.sequence;
			}
			counter ++;
		}

		
		Strand finalStrand = new Strand(fullSeq, true);
		finalStrand.setName(name);
		return finalStrand;
	}
}
