import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;
import java.util.HashMap;
import java.util.ArrayList;
public class ThermodynamicsCalculator
{
	public int consecutiveLimit = 2;
	private double SaltCt = 1.00;
	private String Salt = "Na";
	final double R = 1.987; // ideal gas constant (cal.K^-1.mol^-1)
	HashMap<String, ThermodynamicParameter> hmap = new HashMap<String, ThermodynamicParameter>(); //hmap is not a descriptive variable name
	
	public ThermodynamicsCalculator()
    {
		processdata("NearestNeighborUnified.txt");
	}
	public void setConcentration(double c)
    {
		this.SaltCt = c;
	}
	public void setSalt(String c)
    {
		this.Salt = c;
	}
	
	public void setcounter(int i)
    {
		
	}
	
	/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

	Melting Point Calculator (delta H and delta S)

	** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

	protected double temperatureCalculator(Strand a)
    {
		double[] values = nearestNeighborTm(a);
		double deltaH = values[0];
		double deltaS = values[1];
			
		double Ct = 0;
		if(a.strandConcentration != a.compConcentration)
        {
			Ct = Math.abs(a.strandConcentration - a.compConcentration)/2;
		}
		else
        {
			Ct = a.strandConcentration;
		}
		
		// two strand concentrations -> effective concentration 
		Ct = java.lang.Math.log(Ct);
		double Tm = (deltaH)/(deltaS + R*(Ct));
		//System.out.println(Tm);
		Tm = saltCorrection(Tm, a);
		return Tm - 273.15;	//kelvin to celcius
	}
	private double saltCorrection(double Tm, Strand a) //Needs description
    {
		if(this.Salt.equalsIgnoreCase("Mg"))
        {
			Tm = (1/Tm) + .0000392 + (-.00000911*java.lang.Math.log(this.SaltCt));
			Tm = Tm + a.GCcontent()*(.0000626 + (.0000142*java.lang.Math.log(this.SaltCt)));
			Tm = Tm + (1/(2*(a.length - 1)))*(-.000482 
                        + (.000525*java.lang.Math.log(this.SaltCt)) 
                        + (.0000831*java.lang.Math.log(this.SaltCt)*java.lang.Math.log(this.SaltCt))); //Maybe break down into more named terms/variables?
			return 1/Tm;
		}
		else
        {
			return Tm;
		}
	}
	
	private double[] inits(String first)
    {
		double totalH = 0;
		double totalS = 0;
		if(first.equals("T")||first.equals("A"))
        {
			String temp = "A/T";
			totalH = totalH + hmap.get(temp).DeltaH;
			totalS = totalS + hmap.get(temp).DeltaS;
		}
		else
        {
			String temp = "G/C";
			totalH = totalH + hmap.get(temp).DeltaH;
			totalS = totalS + hmap.get(temp).DeltaS;
		}
		double[] returnthis = {totalH,totalS};
		return returnthis;
	}
	protected double[] nearestNeighborTm(Strand a)
    {
		if(!a.isFivePrime)
        {
			Strand b = a.reverse();
			return nearestNeighborTm(b);
		}	
		
		Strand complement= a.complement();
		String nearestNeighbor = "";
		
		//Initiation:
		double[] first = inits(Character.toString((a.baseAt(0))));//first
		double[] last = inits(Character.toString((a.baseAt(a.length-1))));//last

		double totalH= first[0] + last[0];
		double totalS= first[1]+last[1];
		
		for(int i = 1; i < a.length; i++)
        {
			// 5  A  B   3
			// 3  A2 B2  5
			Base baseB = new Base(a.baseAt(i));
			Base baseB2 = new Base(complement.baseAt(i));
			Base baseA = new Base(a.baseAt(i - 1));
			Base baseA2 = new Base(complement.baseAt(i - 1));
			
			if(baseA.canPair(baseA2) && baseB.canPair(baseB2))
            {
				nearestNeighbor = baseA.toString()+baseB.toString()+"/"+baseA2.toString()+baseB2.toString();
				if(hmap.get(nearestNeighbor) == null){
					// 5  B2  A2   3
					// 3  B  A  5
					nearestNeighbor = baseB2.toString()+baseA2.toString()+"/"+baseB.toString()+baseA.toString();
				}
            }
			if(!(baseB.canPair(baseB2)))
            {
				if(baseB.equals(baseB2))
                {
					nearestNeighbor = baseA.toString()+baseB.toString()+"/"+baseA2.toString()+baseB2.toString();
				}
				else
                {
					Base baseC = new Base(a.baseAt(i + 1));
					Base baseC2 = new Base(complement.baseAt(i + 1));
					// 5  A  B   C   3
					// 3  A2 B2  C2  5
					nearestNeighbor = baseA.toString() + baseB.toString() + baseC.toString() + "/" + baseA2.toString() + baseB2.toString() + baseC2.toString();
					if(hmap.get(nearestNeighbor) == null)
                    {
						// 5  C2 B2  A2   3
						// 3  C  B   A    5
						nearestNeighbor = baseC2.toString() + baseB2.toString() + baseA2.toString() + "/" + baseC.toString() + baseB.toString() + baseA.toString();						
					}
				}
			}
			totalH = totalH + hmap.get(nearestNeighbor).DeltaH;
			totalS = totalS + hmap.get(nearestNeighbor).DeltaS;
		}
		double[] temp2 = {totalH,totalS};
		return temp2;
	}
	/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

	FREE ENERGY CALCULATOR (DELTA G)

	** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

	protected double nearestNeighbor(Base[] shift3to5,Base[] shift5to3,  int blength, int thislength){	
// 3 b sequence ->  oooooooo  oooooooooooooo 5
// 5 oooooooooo    this.sequence  oooooooooo 3

			// Trim and put sequence of bases into an ArrayList for nearest neighbor calculations
			int starter = blength - 1;
			int end = thislength + blength + 1;
			
			//System.out.println("\n"+a+"\n"+b);
			boolean firstinitiation = false;
			int secondinitiation = 0;		
			double totalenergy = 0;
			
			double sum = 0;
			int counter =0;
			for(int l = blength-1; l < thislength+blength+2; l++)
            {	
				String x = Character.toString(shift5to3[l].base);
				double value = freeEnergyValue(l, shift5to3, shift3to5);//Nearest Neighbor Value 
				
				sum = sum + value;
				if(value != 0)
					counter++;
				
				if(value == 0 || l == shift5to3.length - 1)
                {
					// Case: previous was internal mismatch, than move to next base to test for nearest neighbor match
					if(freeEnergyMismatch(l - 1, shift5to3, shift3to5) != 0)
						continue;
					
					//Case: consecutive hits (and internal mismatches) is larger can consecutive limit
					if(counter >= this.consecutiveLimit)
                    {
						//Add first initation nearest neighbor value to total energy
						if (firstinitiation == false)
                        {		 
							firstinitiation = true;
							totalenergy = totalenergy + initiation(l - 1, shift5to3, shift3to5, 1);
						}
						totalenergy = totalenergy + sum;
						secondinitiation = l;
					}
					
					//Case: consecutive hits is not larger than consecutive limit, don't add to total energy and reset counter and sum variables
					sum = 0;
					counter = 0;
				}
			}

			//initiation2 value
			totalenergy = totalenergy + initiation(secondinitiation, shift5to3, shift3to5, 2);
			if (totalenergy == 0)
				totalenergy = 100;
			return totalenergy;
		}

	private double initiation(int l, Base[] seq5to3, Base[] seq3to5, int phase)
    {
		if(l != 0)
        {
			int position = l;
			
			if(phase == 1 && !seq3to5[l].canPair(seq5to3[l]) && seq3to5[l - 1].canPair(seq5to3[l - 1]))
				position = l - 1;
			if(phase == 2  && l + 1 < seq5to3.length && !seq3to5[l].canPair(seq5to3[l])&& seq3to5[l + 1].canPair(seq5to3[l + 1]))
				position = l + 1;
			else if(phase == 2 && !seq3to5[l].canPair(seq5to3[l]) && seq3to5[l - 1].canPair(seq5to3[l - 1]))
				position = l - 1;
			
			String w = Character.toString(seq3to5[position].base); 
			String y = Character.toString(seq5to3[position].base);		
			
			String finaltemp = y + "/" + w;
			if (hmap.get(finaltemp) == null){
				finaltemp = w + "/" + y;
			}
			if (hmap.get(finaltemp) != null){
				return hmap.get(finaltemp).DeltaG;
			}
		}
		return 0;
	}
	
	private void danglingEnds(int l,Base[] seqone,Base[] seqtwo,boolean end)
    {
	
	}

	private double freeEnergyValue(int l, Base[] seqone,Base[] seqtwo)
    {
		double matchvalue = freeEnergyMatch(l,seqone,seqtwo);
	
		if(matchvalue !=1000)
        {
			return matchvalue;
		}
	
		if((l+2 < seqone.length) && (freeEnergyMatch(l+2,seqone,seqtwo)!=1000)&&(freeEnergyMatch(l-1,seqone,seqtwo)!=1000))
        {
			return freeEnergyMismatch(l,seqone,seqtwo);
		}
		return 0;
	}
	
    private double freeEnergyMatch(int l, Base[] seqone, Base[] seqtwo)
    {
		String w = Character.toString(seqone[l - 1].base); 
		String x = Character.toString(seqone[l].base);
		String y = Character.toString(seqtwo[l - 1].base);
		String z = Character.toString(seqtwo[l].base);

		//		A  T   /  T  A
		if(seqone[l].canPair(seqtwo[l]) && seqone[l-1].canPair(seqtwo[l-1]))
        {
			String finaltemp = w+x+"/"+y+z;
			
			if (hmap.get(finaltemp) == null)
            {            
				finaltemp = z + y + "/" + x + w;
            }
			if (hmap.get(finaltemp) != null)
            {	
				return hmap.get(finaltemp).DeltaG;
			}
		}
	    return 1000;
	}
	private double freeEnergyMismatch(int l, Base[] seqone, Base[] seqtwo)
    {
		String w = Character.toString(seqone[l-1].base); 
		String x = Character.toString(seqone[l].base);
		String y = Character.toString(seqtwo[l-1].base);
		String z = Character.toString(seqtwo[l].base);

		if(!seqone[l].canPair(seqtwo[l]) && seqone[l-1].canPair(seqtwo[l-1]))
        {
			//      X T  / X' T
			if(seqone[l].base == seqtwo[l].base)
            {	
				String finaltemp = w + x + "/" + y + z;					
				if (hmap.get(finaltemp) != null)
                {	
					return hmap.get(finaltemp).DeltaG;
				}
			}		
			//      X C Y  / X' T Y'
			else if((l + 1 < seqone.length) && seqone[l + 1].canPair(seqtwo[l + 1]))
            {
				String xnext = Character.toString(seqone[l + 1].base);
				String znext = Character.toString(seqtwo[l + 1].base);
			
				String finaltemp = w + x + xnext + "/" + y + z + znext;
				if (hmap.get(finaltemp) == null)
					finaltemp = znext + z + y + "/" + xnext + x + w;
				//      X C  / X' T 
				if(hmap.get(finaltemp) == null)
					finaltemp = w + x + "/" + y + z;						
				if (hmap.get(finaltemp) != null)
                {		
					return hmap.get(finaltemp).DeltaG;
				}
			}
		}
	    return 0;
    }


	
	/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

	THERMODYNAMIC PARAMETER OBJECTS ( sequence, delta H, delta S, delta G)

	** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

	public class ThermodynamicParameter
    {
		String Sequence;
		double DeltaH;  // kcal/mol 
		double DeltaS;	// cal/k*mol
		double DeltaG;	// kcal/mol

		protected ThermodynamicParameter(String seq, double H, double S, double G)
        {
			Sequence = seq;
			DeltaH = H;
			DeltaS = S;
			DeltaG = G;
		}
	}

	
	/** Designed to get thermodynamic parameters from NearestNeighborUnified.txt 
	 *  and make them into Thermodynamic Parameters
	 * 
	 * @param filename
	 */
	private void processdata(String filename)
    {
		File file1 = new File(filename);
		boolean checkpoint1 = true;
		while (checkpoint1 == true)
        {
            if (!file1.canRead())
            {
                System.err.printf("Error: cannot read from file %s\n.",
                file1.getAbsolutePath());
		    }
		    checkpoint1 = false;
		}
		Scanner dataInput = null;
		try 
        {
			dataInput = new Scanner(file1);
		}
		catch (FileNotFoundException e)
        {
			System.err.printf("Error: cannot open file %s for reading\n.",file1.getAbsolutePath());
			System.exit(0);
		}	
		String condition = dataInput.nextLine();
		dataInput.nextLine();
		while (dataInput.hasNextLine()) 
        {
			String textLine = dataInput.nextLine();
			String[] dataset = textLine.split(",");
			ThermodynamicParameter g = new ThermodynamicParameter(dataset[0],Double.parseDouble(dataset[1]),Double.parseDouble(dataset[2]),Double.parseDouble(dataset[3]));
			hmap.put(dataset[0], g);
			//System.out.println(dataset[0]);
		}
		
	}
	

}
