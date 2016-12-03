import java.util.ArrayList;
public class Tester {
	public static void main(String[] args){
		Strand h = new Strand("CGCAT",true);
		Strand g = new Strand("GTTAGAGA",true); 
		Strand i = new Strand("CATCTGCACGTATGT",true); 
		Strand j = new Strand("ATCATGTGAGTGCAC",true); 
		h.setcomp(true);
		g.setcomp(true);
		i.setcomp(true);
		j.setcomp(true);
		
		
		CompareStrands f = new CompareStrands();
		ThermodynamicsCalculator ff = new ThermodynamicsCalculator();
		System.out.print(f.self(h, ff));
	}
	
	private static ExperimentalAlgorithm experimentalalgINIT(){		
		Strand h = new Strand("CGCATAACCACCTTA",true);
		Strand g = new Strand("GTTAGAGAGAGAGCG",true); 
		Strand i = new Strand("CATCTGCACGTATGT",true); 
		Strand j = new Strand("ATCATGTGAGTGCAC",true); 
		h.setcomp(true);
		g.setcomp(true);
		i.setcomp(true);
		j.setcomp(true);
		h.setmismatchtheshold(2);
		i.sethairpinthreshold(2);
		ArrayList<Strand> list = new ArrayList<Strand>();
		list.add(h);
		list.add(g);
		list.add(i);
		list.add(j);
		ThermodynamicsCalculator x = new ThermodynamicsCalculator();
		ExperimentalAlgorithm alg = new ExperimentalAlgorithm(list,x);
		return alg;
	}

	public static void testalgorithm1(){
		ExperimentalAlgorithm g = experimentalalgINIT();
		System.out.print("most consecutive hits for stand 0:"+g.consecCheck(0,3));
	}
	public static void testalgorithm2(){
		ExperimentalAlgorithm g = experimentalalgINIT();
		System.out.print("most consecutive hits for stand 0:"+g.strandcheck(0));
	}

	public static void testDifConsec(){
		ThermodynamicsCalculator x = new ThermodynamicsCalculator();
		Strand h = new Strand("ATCGCATAACCAAAACCACCCTATAG",true);
		Strand g = new Strand("TAGTTAGTGGAAAAAGAGAGAGATC",false); 
		h.mismatchthreshold = 3;
		h.maxhitsconsec(g,x,5);
		h.maxhitsconsec(g,x,4);
		h.maxhitsconsec(g,x,3);
		System.out.println("\n||||");
		h.highestConsecPossible(g,5,x);
		h.highestConsecPossible(g,4,x);
		h.highestConsecPossible(g,3,x);
	}
	public static void testConsecPossible(){
		ThermodynamicsCalculator x = new ThermodynamicsCalculator();
		Strand h = new Strand("ACTATGTTAGCG",true);
		Strand g = new Strand("GGGTTTGCTGCTCCGTTCGTGTTGGCATCGT",false); 
		h.mismatchthreshold = 4;
		
		h.consecmismatch(x, 2);
		CompareStrands lolz = new CompareStrands()
	}

}
