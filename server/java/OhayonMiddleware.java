import java.util.ArrayList;

public class OhayonMiddleware{
	ArrayList<Strand> componentsList;
	ArrayList<FullStrand> fullStrandList;
	ThermodynamicsCalculator thermoCalc;
	CompareStrands comparer;
	
/*
	public static void main(String[] args){
		//String[] c = {"sam,15,true,5,5,o-o-o-o-o-o-o-o-o-o-o-o-o-o-o","sam2,15,true,5,5,o-o-o-o-o-o-o-o-o-o-o-o-o-o-o"};
		OhayonMiddleware sdfs = new OhayonMiddleware();		
		//String[] results = sdfs.processStrands("Na","1",c);
		System.out.println(sdfs.compareStrands("sam","AGTCAGCATCGAT","mao","AGCTAGCTACGA")[1]);
	}
*/

	public OhayonMiddleware()
	{
		this.componentsList = new ArrayList<Strand>();
		this.fullStrandList =  new ArrayList<FullStrand>();
		this.thermoCalc = new ThermodynamicsCalculator();
		this.comparer = new CompareStrands(this.thermoCalc);
	}
	public OhayonMiddleware(String salt, String concentration, String[] unparsedComponentsList)
	{
		this.componentsList = new ArrayList<Strand>();
		this.fullStrandList =  new ArrayList<FullStrand>();
		this.thermoCalc = new ThermodynamicsCalculator();
		this.comparer = new CompareStrands(this.thermoCalc);
		this.setAllProperties(salt , concentration , unparsedComponentsList);
	}	

	/*
	public OhayonMiddleware(String salt, String concentration, String[] unparsedComponentsList , String[] unparsedFullStrandList)
	{
		this.componentsList = new ArrayList<Strand>();
		this.fullStrandList =  new ArrayList<FullStrand>();
		this.thermoCalc = new ThermodynamicsCalculator();
		this.setAllProperties(salt , concentration , unparsedComponentsList, unparsedFullStrandList);
	}	
	*/

	/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

	SETTER AND GETTERS METHOD:

	** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
	
	/*
	public void setAllProperties(String salt, String concentration, String[] unparsedComponentsList , String[] unparsedFullStrandList)
	{
		this.processConditions( salt , concentration );
		this.buildComponents( unparsedComponentsList );
		this.buildFullStrandList( unparsedFullStrandList );
	}
	*/

	public void setAllProperties(String salt, String concentration, String[] unparsedComponentsList )
	{
		this.processConditions( salt , concentration );
		this.buildComponents( unparsedComponentsList );
	}

	public String[] getParsedData()
	{
		String[] parsedComponentData = new String[this.componentsList.size()];
		
		for( int i = 0; i < this.componentsList.size();i++)
		{
			Strand temp = this.componentsList.get(i);
			String sequence = temp.sequence;
			parsedComponentData[i] = temp.name+":"+sequence;
		}
		
		return parsedComponentData;
	}


	/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

	STRAND INPUT/PROJECT FILE READER METHOD:

	** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
	
	public String[] processStrands(String salt, String concentration, String[] unparsedComponentsList )
	{
		this.setAllProperties(salt,concentration,unparsedComponentsList);
		
		this.runAlgorithm();

		//System.out.println("done");

		String[] results = this.getParsedData();
		return results;
	}

	public String[] compareStrands(String name1, String seq1, String name2,String seq2)
	{
		Strand a = new Strand(seq1,true);
		Strand b = new Strand(seq2,true);
		a.setName(name1);
		b.setName(name2);
		return this.comparer.compareTwo(a,b);

	}


	
	private void runAlgorithm()
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

