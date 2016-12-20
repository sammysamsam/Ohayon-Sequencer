import java.util.ArrayList;

public class Tester
{
	public static void main(String[] args)
    {
		//testConsecPossible();
		//testCompAlgorithm();
		testFullAlgorithm();
	}
//
	private static Sequencer sequencerCompGenerator()
	{
		Strand h = new Strand("CGCATAACCACCTTGTTAGAGAGAGAGCCG",true); //30
		Strand g = new Strand("GTTAGAGAGAGAGCAGTTAGAGAGAGAGCAATCGA",true); //35
		Strand i = new Strand("CATCTGCACGTATGTGAGCTAGCTT",true); //25
		Strand j = new Strand("ATCATGTGAGTGCACAGATG",true);  //20
		Strand x = new Strand("CGCATAACCACCTTGTTAGAGAGAGAGCCGATATCGATCATCGAGAGCTA",true); //50
		x.setComplement(true);
		h.setComplement(true);
		g.setComplement(true);
		i.setComplement(true);
		j.setComplement(true);
		
		x.setMismatchThreshold(5);
		h.setMismatchThreshold(5);
		g.setMismatchThreshold(5);
		i.setMismatchThreshold(5);
		j.setMismatchThreshold(5);
		
		x.setHairpinThreshold(5);
		h.setHairpinThreshold(5);
		g.setHairpinThreshold(5);
		i.setHairpinThreshold(5);
		j.setHairpinThreshold(5);

		h.name = "compA";
		g.name = "compB";
		i.name = "compC";
		j.name = "compD";
		x.name = "compE";

		ArrayList<Strand> list = new ArrayList<Strand>();
		list.add(h);
		list.add(g);	
		list.add(i);
		list.add(j);
		list.add(x);
		ArrayList<FullStrand> fulllist = new ArrayList<FullStrand>();
		ThermodynamicsCalculator calc = new ThermodynamicsCalculator();
		Sequencer alg = new Sequencer(list, calc,fulllist);
		return alg;
	}

	public static void testCompAlgorithm()
    {
		ThermodynamicsCalculator x = new ThermodynamicsCalculator();
		Sequencer g = sequencerCompGenerator();
		g.minimizeInteractions();
		CompareStrands comparer = new CompareStrands(x);
		g.fullStrandOverview();

	}

//

	private static Sequencer sequencerFullGenerator()
    {
		
		Strand h = new Strand("CGCATAACCACCTTGTTAGAGAGAGAGCCG",true); //30
		Strand g = new Strand("GTTAGAGAGAGAGCAGTTAGAGAGAGAGCAATCGA",true); //35
		Strand i = new Strand("CATCTGCACGTATGTGAGCTAGCTT",true); //25
		Strand j = new Strand("ATCATGTGAGTGCACAGATG",true);  //20
		Strand x = new Strand("CGCATAACCACCTTGTTAGAGAGAGAGCCGATATCGATCATCGAGAGCTA",true); //50
		x.setComplement(true);
		h.setComplement(true);
		g.setComplement(true);
		i.setComplement(true);
		j.setComplement(true);
		
		x.setMismatchThreshold(5);
		h.setMismatchThreshold(5);
		g.setMismatchThreshold(5);
		i.setMismatchThreshold(5);
		j.setMismatchThreshold(5);
		
		x.setHairpinThreshold(5);
		h.setHairpinThreshold(5);
		g.setHairpinThreshold(5);
		i.setHairpinThreshold(5);
		j.setHairpinThreshold(5);

		h.name = "compA";
		g.name = "compB";
		i.name = "compC";
		j.name = "compD";
		x.name = "compE";

		ArrayList<Strand> list = new ArrayList<Strand>();
		list.add(h);
		list.add(g);	
		list.add(i);
		list.add(j);
		list.add(x);

//

		String[] temp = {"compA" , "compB" , "compC'" , "compD","compE"};
		FullStrand b = new FullStrand("ABC'DE",list,temp); 

		
		ArrayList<Strand> list2 = new ArrayList<Strand>();
		String[] temp2 = {"compA'","compB'"};
		list2.add(h);
		list2.add(g);
		FullStrand a = new FullStrand("A'B'",list2,temp2);

		ArrayList<Strand> list3 = new ArrayList<Strand>();
		list3.add(i);
		list3.add(j);
		list3.add(h);
		String[] temp3 = {"compC'","compD","compA"};
		FullStrand c = new FullStrand("C'DA",list3,temp3);


		ArrayList<Strand> list4 = new ArrayList<Strand>();
		list4.add(j);
		list4.add(i);
		list4.add(g);
		String[] temp4 = {"compD","compC","compB'"};
		FullStrand d = new FullStrand("DCB'",list4,temp4);  
		
		ArrayList<Strand> list5 = new ArrayList<Strand>();
		list5.add(x);
		list5.add(i);
		list5.add(h);
		list5.add(g);
		String[] temp5 = {"compE'","compC","compA'","compB"};
		FullStrand e = new FullStrand("E'CA'B",list5,temp5);  
		

		ArrayList<FullStrand> fulllist = new ArrayList<FullStrand>();
		fulllist.add(a);
		fulllist.add(b);
		fulllist.add(c);
		fulllist.add(d);
		fulllist.add(e);

		ThermodynamicsCalculator calc = new ThermodynamicsCalculator();
		Sequencer alg = new Sequencer(list, calc,fulllist);


		return alg;
	}

	public static void testFullAlgorithm()
    {
		ThermodynamicsCalculator x = new ThermodynamicsCalculator();
		Sequencer g = sequencerFullGenerator();

		g.minimizeInteractions();
		//System.out.println("most consecutive hits for stand 0: " + g.totalConsecutiveMatches(0));
		//System.out.println("most consecutive hits for stand 1: " + g.totalConsecutiveMatches(1));
		//System.out.println("most consecutive hits for stand 2: " + g.totalConsecutiveMatches(2));
		//System.out.println("most consecutive hits for stand 3: " + g.totalConsecutiveMatches(3));
		CompareStrands comparer = new CompareStrands(x);
		g.fullStrandOverview();

	}
	public static void testConsecPossible()
    {
		ThermodynamicsCalculator x = new ThermodynamicsCalculator();
		Strand h = new Strand("ACTATGTTAGCG", true);
		Strand g = new Strand("GGGTTTGCTGCTCCGTTCGTGTTGGCATCGT", false); 

		CompareStrands comparer = new CompareStrands(x);
		comparer.compareTwo(h,g);
	}
}
