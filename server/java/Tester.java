import java.util.ArrayList;

public class Tester
{

	public static void main(String[] args)
    {
		//testConsecPossible();
		//testSelfChecker();
		//testThermoMismatch();
		//testFullAlgorithm();
		testCompAlgorithm();
		//testCompleteAlgorithm();
		//testBaseArrayMismatch();
		//testCompareStrands();
		//testFullStrandMismatch();
	}
	public static void testCompleteAlgorithm()
	{
		ThermodynamicsCalculator x = new ThermodynamicsCalculator();
		Sequencer g = sequencer2Generator();

		g.minimizeInteractions(1000);
		CompareStrands comparer = new CompareStrands(x);
		g.fullStrandOverview(comparer);	
	}
	public static void testFullAlgorithm()
    {
		ThermodynamicsCalculator x = new ThermodynamicsCalculator();
		Sequencer g = sequencerGenerator();

		g.minimizeInteractions(1000);
		CompareStrands comparer = new CompareStrands(x);
		g.fullStrandOverview(comparer);

	}
	public static void testCompAlgorithm()
	{
		//Strand h = new Strand("CGCATAACCACCTTGTTAGAGAGAGAGCCG",true); //30
		//Strand g = new Strand("GTTAGAGAGAGAGCAGTTAGAGAGAGAGCAATCGA",true); //35

		Strand h = new Strand(50,true); //30
		Strand g = new Strand(50,true); //35


		Strand i = new Strand("CATCTGCACGTATGTGAGCTAGCTT",true); //25
		//Strand j = new Strand("TAA",true);  //20

		h.setComplement(true);
		g.setComplement(true);
		i.setComplement(true);
		//j.setComplement(true);
		
		h.name = "compA";
		g.name = "compB";
		i.name = "compC";
		//j.name = "compD";

		ArrayList<Strand> list = new ArrayList<Strand>();
		list.add(h);
		list.add(g);	
		list.add(i);
		//list.add(j);		
		ArrayList<FullStrand> fulllist = new ArrayList<FullStrand>();
		ThermodynamicsCalculator calc = new ThermodynamicsCalculator();	
		CompareStrands comparer = new CompareStrands(calc);			
		Sequencer alg = new Sequencer(list, calc,fulllist);

		alg.minimizeInteractions(1000);
		//System.out.println(alg.fullStrandOverview(comparer));	
	}



////////


	public static void testThermoMismatch()
	{
		ThermodynamicsCalculator x = new ThermodynamicsCalculator();
		Strand h = new Strand("ACAGTATTATCGACTATGTTAGCG", true);
		Strand g = new Strand("GGGTTTGCTGCTCCGTTCGTGTTGGCATCGT", false); 

		h.thermoMismatch(g,x,4);
	}
	public static void testSelfChecker()
	{
		ThermodynamicsCalculator z = new ThermodynamicsCalculator();
		Strand x = new Strand("CGCATAACCACCTTGTTAGAGAGAGAGCCGATATCGATCATCGAGAGCTA",true); //50	
		System.out.println(x.selfvsComplementMismatch(z));
	}
	public static void testFullStrandMismatch()
	{
		Strand h = new Strand("CGCATAACCACCTTGTTAGAGAGAGAGCCG",true); //30
		Strand g = new Strand("GTTAGAGAGAGAGCAGTTAGAGAGAGAGCAATCGA",true); //35
		Strand i = new Strand("CATCTGCACGTATGTGAGCTAGCTT",true); //25
		Strand j = new Strand("ATCATGTGAGTGCACAGATG",true);  //20

		h.name = "compA";
		g.name = "compB";
		i.name = "compC";
		j.name = "compD";

		ArrayList<Strand> list = new ArrayList<Strand>();
		list.add(h);
		list.add(g);	
		list.add(i);
		list.add(j);


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
		FullStrand b = new FullStrand("C'DA",list3,temp3);

		Strand tempA = a.combine(list);
		Strand tempB = b.combine(list);

		a.getComplementShifts(b,list);

		System.out.println(tempA.mismatch2(tempB,5,a.getComplementShifts(b,list) ));  //current slides through while other stays same
  
		//System.out.println(a.mismatch(b,list));  //current slides through while other stays same
 
	}


	public static void testBaseArrayMismatch()
	{
		Strand h = new Strand("ACTATGTTAGCG", true);
		Strand g = new Strand("GGGTTTGCTGCTCCGTTCGTGTTGGCATCGT", false); 
		//ArrayList<Integer> x =h.baseArrayMismatch(g,5);
		g.mismatch(h,5);
		int[] temparray = {2};
		h.mismatch2(g,5,temparray);
	}

//////

	

	public static void testCompareStrands()
	{
		ThermodynamicsCalculator x = new ThermodynamicsCalculator();	
		Sequencer g = sequencerGenerator();
		CompareStrands comparer = new CompareStrands(x);
		comparer.compareAll(g.componentList,g.fullStrandList);
	}
	public static void testConsecPossible()
    {
		ThermodynamicsCalculator x = new ThermodynamicsCalculator();
		Strand h = new Strand("ACTATGTTAGCG", true);
		Strand g = new Strand("GGGTTTGCTGCTCCGTTCGTGTTGGCATCGT", false); 

		CompareStrands comparer = new CompareStrands(x);
		comparer.compareTwo(h,false,g,false);
	}


//

private static Sequencer sequencer2Generator()
    {
		
		Strand h = new Strand("CGCATAACCACCTTGTTAGAGAGAGAGCCG",true); //30
		Strand g = new Strand("GTTAGAGAGAGAGCAGTTAGAGAGAGAGCAATCGA",true); //35
		Strand i = new Strand("CATCTGCACGTATGTGAGCTAGCTT",true); //25
		Strand j = new Strand("ATCATGTGAGTGCACAGATG",true);  //20
		Strand x = new Strand("ATCGTCGCAAA",true);  //20

		h.setComplement(true);
		g.setComplement(true);
		i.setComplement(true);
		j.setComplement(true);
		

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

		// ABC'DE , A'B', C'DA , DCB' , E'CA'B

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
		LoopDNA c = new LoopDNA("C'DA",list3,temp3);


		ArrayList<Strand> list4 = new ArrayList<Strand>();
		list4.add(j);
		list4.add(i);
		list4.add(g);
		String[] temp4 = {"compD","compC","compB'"};
		FullStrand d = new FullStrand("DCB'",list4,temp4);  
		
		ArrayList<Strand> list5 = new ArrayList<Strand>();
		list5.add(i);
		list5.add(h);
		list5.add(g);
		String[] temp5 = {"compC","compA'","compB"};
		LoopDNA e = new LoopDNA("CA'B",list5,temp5);  
		

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

	private static Sequencer sequencerGenerator()
    {
		
		Strand h = new Strand("CGCATAACCACCTTGTTAGAGAGAGAGCCG",true); //30
		Strand g = new Strand("GTTAGAGAGAGAGCAGTTAGAGAGAGAGCAATCGA",true); //35
		Strand i = new Strand("CATCTGCACGTATGTGAGCTAGCTT",true); //25
		Strand j = new Strand("ATCATGTGAGTGCACAGATG",true);  //20

		h.setComplement(true);
		g.setComplement(true);
		i.setComplement(true);
		j.setComplement(true);
		

		h.setMismatchThreshold(5);
		g.setMismatchThreshold(5);
		i.setMismatchThreshold(5);
		j.setMismatchThreshold(5);
		
		h.setHairpinThreshold(5);
		g.setHairpinThreshold(5);
		i.setHairpinThreshold(5);
		j.setHairpinThreshold(5);

		h.name = "compA";
		g.name = "compB";
		i.name = "compC";
		j.name = "compD";

		ArrayList<Strand> list = new ArrayList<Strand>();
		list.add(h);
		list.add(g);	
		list.add(i);
		list.add(j);

		// ABC'DE , A'B', C'DA , DCB' , E'CA'B

		String[] temp = {"compA" , "compB" , "compC'" , "compD"};
		FullStrand b = new FullStrand("ABC'D",list,temp); 

		
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
		list5.add(i);
		list5.add(h);
		list5.add(g);
		String[] temp5 = {"compC","compA'","compB"};
		FullStrand e = new FullStrand("CA'B",list5,temp5);  
		

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
}
