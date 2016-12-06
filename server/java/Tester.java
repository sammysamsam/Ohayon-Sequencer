import java.util.ArrayList;

public class Tester
{
	public static void main(String[] args)
    {
		testCompareStrands();
		//testAlgorithm();
	}

	private static Sequencer sequencerGenerator()
    {
		Strand h = new Strand("CGCATAACCACCTT",true);
		Strand g = new Strand("GTTAGAGAGAGAGCA",true); 
		Strand i = new Strand("CATCTGCACGTATGTGAGCTAG",true); 
		Strand j = new Strand("ATCATGTGAGTGCACAGATGCTAG",true); 
		h.setComplement(true);
		g.setComplement(true);
		i.setComplement(true);
		j.setComplement(true);
		
		h.setMismatchThreshold(5);
		g.setMismatchThreshold(5);
		i.setMismatchThreshold(5);
		j.setMismatchThreshold(5);
		
		h.setHairpinThreshold(4);
		g.setHairpinThreshold(4);
		i.setHairpinThreshold(4);
		j.setHairpinThreshold(4);
		ArrayList<Strand> list = new ArrayList<Strand>();
		list.add(h);
		list.add(g);
		list.add(i);
		list.add(j);
		ThermodynamicsCalculator x = new ThermodynamicsCalculator();
		Sequencer alg = new Sequencer(list, x);
		return alg;
	}

	public static void testAlgorithm()
    {
		ThermodynamicsCalculator x = new ThermodynamicsCalculator();
		Sequencer g = sequencerGenerator();
		g.minimizeInteractions();
		System.out.println("most consecutive hits for stand 0: " + g.totalConsecutiveMatches(0));
		System.out.println("most consecutive hits for stand 1: " + g.totalConsecutiveMatches(1));
		System.out.println("most consecutive hits for stand 2: " + g.totalConsecutiveMatches(2));
		System.out.println("most consecutive hits for stand 3: " + g.totalConsecutiveMatches(3));
		CompareStrands comparer = new CompareStrands(x);
	}

	public static void testCompareStrands()
    {
		ThermodynamicsCalculator x = new ThermodynamicsCalculator();
		Strand h = new Strand("ACTATGTTAGCG", true);
		Strand g = new Strand("GGGTTTGCTGCTCCGTTCGTGTTGGCATCGT", false); 

		CompareStrands comparer = new CompareStrands(x);
		System.out.println(comparer.compareTwo(h,g)[2]);
	}
}
