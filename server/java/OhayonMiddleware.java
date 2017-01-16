import java.util.ArrayList;


import java.util.concurrent.*;


public class OhayonMiddleware{
	ArrayList<Strand> componentList;
	ArrayList<FullStrand> fullStrandList;
	ThermodynamicsCalculator thermoCalc;
	CompareStrands comparer;

	public OhayonMiddleware()
	{
		this.componentList = new ArrayList<Strand>();
		this.fullStrandList =  new ArrayList<FullStrand>();
		this.thermoCalc = new ThermodynamicsCalculator();
		this.comparer = new CompareStrands(this.thermoCalc);
	}

	/*
	public OhayonMiddleware(String salt, String concentration, String[][] unparsedComponentsList , String[][][] unparsedFullStrandList)
	{
		this.componentList = new ArrayList<Strand>();
		this.fullStrandList =  new ArrayList<FullStrand>();
		this.thermoCalc = new ThermodynamicsCalculator();
		this.setAllProperties(salt , concentration , unparsedComponentsList, unparsedFullStrandList);
	}	
	*/

	/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

	SETTER AND GETTERS METHOD:

	** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
	
	
	private void setAllProperties(String salt, String concentration,  ArrayList<String[]> unparsedComponentsList,ArrayList<String[]> unparsedFullStrandList)
	{
		this.processConditions( salt , concentration );
		this.buildComponents( unparsedComponentsList );
		if(unparsedFullStrandList.size() > 0)
			this.buildFullStrandList( unparsedFullStrandList );
	}

	private String[] getParsedData()
	{
		String[] parsedComponentData = new String[this.componentList.size()+1];
		for( int i = 0; i < this.componentList.size();i++)
		{
			Strand temp = this.componentList.get(i);
			String sequence = temp.sequence;
			parsedComponentData[i] = temp.name+":"+sequence;
		}
		return parsedComponentData;
	}


	/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

	SEQUENCING/COMPARING METHODS:

	** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
	public String[] sequenceStrands(int timelimit, String salt, String concentration, ArrayList<String[]> unparsedComponentsList,ArrayList<String[]> unparsedFullStrandList )
	{
        this.setAllProperties(salt,concentration,unparsedComponentsList,unparsedFullStrandList);
		
		//****
		Sequencer OHAYON = new Sequencer(this.componentList , this.thermoCalc,this.fullStrandList);		
		//****

		boolean success = OHAYON.minimizeInteractions(timelimit);
		String[] results = {""};
		if(!success)
			return results;
		else 
			return this.getParsedData();
	}

	public String[] compareStrands(String seq1, boolean loop1, String seq2, boolean loop2)
	{
		Strand a = new Strand(seq1,true);
		Strand b = new Strand(seq2,true);
		return this.comparer.compareTwo(a,loop1,b,loop2);

	}
	public String[][] compareAll(ArrayList<String[]> unparsedComponentsList,ArrayList<String[]> unparsedFullStrandList )
	{
		this.buildComponents(unparsedComponentsList);
		this.buildFullStrandList(unparsedFullStrandList);
		String[][] results = this.comparer.compareAll(this.componentList,this.fullStrandList);
		return results;
	}


	/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

	PARSING METHODS:

	** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */


	private void processConditions(String salt, String concentration)
	{
		ThermodynamicsCalculator thermo = new ThermodynamicsCalculator();
		//thermo.setConcentration(Double.parseDouble(concentration)); // M
		//thermo.setSalt(salt);			// Na of Mg
		this.thermoCalc = thermo;
	}
	

	private void buildComponents(ArrayList<String[]> unparsedComponents )
	{
		for(int i = 0; i < unparsedComponents.size();i++)
		{			
			String[] parameters = unparsedComponents.get(i);
			Strand component = new Strand( Integer.parseInt(parameters[1]) , true);		//length, complementexists
			
			component.setName(parameters[0]);											//name
			component.setComplement( Boolean.parseBoolean(parameters[2]) );				//complement
			component.setMismatchThreshold( Integer.valueOf(parameters[3]) );			//mismatch
			component.setHairpinThreshold( Integer.valueOf(parameters[4]) );			//hairpin
			component.setSequence(parameters[5]);
			component.setBlueprint(parameters[6]);										//blueprint
			
			//f.setTm( Float.valueOf(parameters[7]) , this.thermoCalc );				//meltingpoint
			this.componentList.add(component);											//add strandlist
		}
	}


	// full strand: [0] = NAME [1] = compA - compB - compC

	private void buildFullStrandList(ArrayList<String[]> unparsedFullStrandList )
	{
		this.fullStrandList.clear();

		for(int y = 0; y < unparsedFullStrandList.size();y++)
		{	
			String[] parameters = unparsedFullStrandList.get(y);
			
			//strandname
			String strandname = parameters[parameters.length-2];

			//build list of components that make this strand
			String[] strandRecipe = new String[parameters.length-2];
			for(int x = 0; x < parameters.length-2;x++)
			{
				strandRecipe[x] = parameters[x];
			}

			//build fullstrand componentslist
			ArrayList<Strand> orderedComponents = new ArrayList<Strand>();			
			for(String compName: strandRecipe )
			{
				for(int z = 0; z < this.componentList.size(); z++)
				{
					Strand tempcomp = this.componentList.get(z);
					if(compName.equals(tempcomp.name) || compName.equals(tempcomp.name+"'"))
					{
						orderedComponents.add(tempcomp);
						break;
					}
				}
			}

			System.out.println("direction "+parameters[parameters.length-1]);
			System.out.println("name "+parameters[parameters.length-2]);		
			
			// if Full Strand is Loop DNA
			if(parameters[parameters.length-1].equals("loop"))
			{
				LoopDNA fullstrand = new LoopDNA(strandname , orderedComponents , strandRecipe);
				this.fullStrandList.add(fullstrand);
			}
			// if Full Strand is not Loop DNA
			else
			{
				FullStrand fullstrand = new FullStrand(	strandname , orderedComponents , strandRecipe);
				this.fullStrandList.add(fullstrand);
			}
		}
	}
}

