import java.util.ArrayList;

// left to right, letter order =  3 to 5 prime, DNA
//Remember ALL Strands will be read from 5' -----> 3'

public class StackBuilder {
	ArrayList<Strand> strandlist;
	ThermodynamicsCalculator thermocalc;
	
	public static void main(String[] args){
		StackBuilder f = new StackBuilder();
	}


	public StackBuilder(){
		this.strandlist = new ArrayList<Strand>();
	}
	public String[] test(){
		this.strandlist = new ArrayList<Strand>();
		System.out.println("s");
		String[] c = {"sam,15,true,5,5,o-o-o-o-o-o-o-o-o-o-o-o-o-o-o","sam2,15,true,5,5,o-o-o-o-o-o-o-o-o-o-o-o-o-o-o"};
		this.RunAlgorithm("Na","1",c);
		System.out.println("e");
		return this.strandreturner();
	}

	public String[] RunAlgorithm(String a, String b, String[] c){
		System.out.println(a + "  "+ b);
		for(int i = 0; i < c.length;i++){
			System.out.println(c[i]);
		}
		this.conditionsReader(a,b);
		this.strandprocessor(c);
		ExperimentalAlgorithm OHAYON = new ExperimentalAlgorithm(this.strandlist,this.thermocalc);
		OHAYON.minimizeinteractions();
		System.out.println("done");
		this.strandlist = OHAYON.strandlist;
		return this.strandreturner();
	}
	
	private void conditionsReader(String a, String b){
		ThermodynamicsCalculator thermo = new ThermodynamicsCalculator();
		thermo.setConcentration(Double.parseDouble(b));
		thermo.setSalt(a);			
		this.thermocalc = thermo;
	}
	
	/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

	SETTER AND GETTERS METHOD:

	** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
	
	public ArrayList<Strand> getStrandList(){
		return this.strandlist;
	}
	
	/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

	STRAND INPUT/PROJECT FILE READER METHOD:

	** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
	
	public void strandprocessor(String[] a ){
		for(String x: a){
			String[] dataset = x.split(",");
			textToStrand(dataset);
		}
	}

	
	private void textToStrand(String[] dataset){

		// 0 = name, 1 = length, 2 = complement, 3 = mismatch, 4 = hairpin, 5 = blueprint 6 = loopstrand
		
		Strand f = new Strand(Integer.parseInt(dataset[1]),true);			
		f.name = dataset[0].replaceAll("\\s+","");
		
		boolean complement = Boolean.parseBoolean(dataset[2]);
		f.setcomp(complement);

		f.mismatchthreshold= Integer.valueOf(dataset[3]);	
		f.hairpinthreshold =  Integer.valueOf(dataset[4]);		
		f.setblueprint(dataset[5].split("-"));
		strandlist.add(f);
	}	
	
	public String[] strandreturner(){
		String[] list = new String[strandlist.size()];
		for( int i = 0; i < this.strandlist.size();i++){
			Strand temp = strandlist.get(i);
			String sequence = temp.sequence;
			if(!temp.isFivePrime){
				sequence = temp.reverse().sequence;
			}
			list[i] = temp.name+":"+sequence;
		}
		
		return list;
	}
}

