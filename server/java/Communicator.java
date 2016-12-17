import java.util.ArrayList;

public class Communicator{
	ArrayList<Strand> componentsList;
	ArrayList<FullStrand> fullStrandList;
	ThermodynamicsCalculator thermoCalc;

	public Communicator()
	{
		this.componentsList = new ArrayList<Strand>();
		this.fullStrandList =  new ArrayList<FullStrand>();
		this.thermoCalc = new ThermodynamicsCalculator();
	}

	public Communicator(String salt, String concentration, String[] unparsedComponentsList , String[] unparsedFullStrandList)
	{
		this.componentsList = new ArrayList<Strand>();
		this.fullStrandList =  new ArrayList<FullStrand>();
		this.thermoCalc = new ThermodynamicsCalculator();
		this.setAllProperties(salt , concentration , unparsedComponentsList, unparsedFullStrandList);
	}	

	/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

	SETTER AND GETTERS METHOD:

	** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
	
	public void setAllProperties(String salt, String concentration, String[] unparsedComponentsList , String[] unparsedFullStrandList)
	{
		this.processConditions( salt , concentration );
		this.buildComponents( unparsedComponentsList );
		this.buildFullStrandList( unparsedFullStrandList );
	}


	public String[] getParsedData()
	{
		String[] parsedComponentData = new String[this.componentsList.size()];
		
		for( int i = 0; i < this.componentsList.size();i++)
		{
			Strand temp = this.componentsList.get(i);
			String sequence = temp.sequence;
			if(!temp.isFivePrime)
			{
				sequence = temp.reverse().sequence;
			}
			parsedComponentData[i] = temp.name+":"+sequence;
		}
		
		return parsedComponentData;
	}


	/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

	STRAND INPUT/PROJECT FILE READER METHOD:

	** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
	
	
	public void runAlgorithm()
	{
		
		//****

		Sequencer OHAYON = new Sequencer(this.componentsList , this.thermoCalc);
		
		//****

		OHAYON.minimizeInteractions();
	}

	private void processConditions(String salt, String concentration)
	{
		ThermodynamicsCalculator thermo = new ThermodynamicsCalculator();
		//thermo.setConcentration(Double.parseDouble(concentration)); // M
		//thermo.setSalt(salt);			// Na of Mg
		this.thermoCalc = thermo;
	}
	

	private void buildComponents(String[] unparsedComponents )
	{
		for(String compdata: unparsedComponents)
		{
			String[] parameters = compdata.split(",");
			
			Strand component = new Strand( Integer.parseInt(parameters[1]) , true);	//length, complementexists
			component.setName(parameters[0]);											//name
			
			component.setComplement( Boolean.parseBoolean(parameters[2]) );			//complement
			
			component.setMismatchThreshold( Integer.valueOf(parameters[3]) );			//mismatch
			component.setHairpinThreshold( Integer.valueOf(parameters[4]) );			//hairpin
			
			component.setBlueprint(parameters[5].split("-"));							//blueprint
			
			//f.setTm( Float.valueOf(parameters[6]) , this.thermoCalc );		//meltingpoint
			this.componentsList.add(component);										//add strandlist
		}
	}


	// full strandlist example: NAME: compA-compB-compC

	private void buildFullStrandList(String[] unparsedFullStrandList )
	{
		for(String fullStrandData: unparsedFullStrandList)
		{

			ArrayList<Strand> orderedComponents = new ArrayList<Strand>();
			
			//get componentNames
			String[] strandRecipe = fullStrandData.split(":")[1].split("-");
			
			//build fullstrand componentslist			
			for(String compName: strandRecipe )
			{
				for(int i = 0; i < this.componentsList.size(); i++)
				{
					Strand tempcomp = this.componentsList.get(i);
					if(compName.equals(tempcomp.name) || compName.equals(tempcomp.name+"'"))
					{
						orderedComponents.add(tempcomp);
						break;
					}
				}
			}
			//set name
			String name = fullStrandData.split(":")[0];

			FullStrand fullstrand = new FullStrand(	name , orderedComponents , strandRecipe);
			fullstrand.setComponentsNames(strandRecipe);
			this.fullStrandList.add(fullstrand);
		}
	}
	
}

