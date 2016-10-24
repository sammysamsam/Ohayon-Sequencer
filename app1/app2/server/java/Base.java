public class Base {
    char base;
    boolean inPair;

    public Base (char base)
    {
        this.base = base;  
        this.inPair = false;
    }
    public boolean nonbase()
    {
    	if(this.base == ('o')){
    		return true;
    	}
    	return false;
    }
    public boolean canPair(Base b)
    {
        if(this.base == 'A' && b.base == 'T')
        {
            return true;
        }
        if(this.base == 'T' && b.base == 'A')
        {
            return true;
        }
        if(this.base == 'G' && b.base == 'C')
        {
            return true;
        }
        if(this.base == 'C' && b.base == 'G')
        {
            return true;
        }
        return false;
    }
    public boolean pairWith (Base b)
    {
        if (this.canPair(b) == true)
        {
            this.inPair = true;
            b.inPair = true;
            return true;
        }
        return false;	
    }
    public char complement()
    {
        if(this.base == 'A')
            return 'T';
        if(this.base == 'C')
            return 'G';
        if(this.base == 'G')
            return 'C';
        if(this.base == 'T')
            return 'A';
        else
            return '.';
    }
    @Override
    public String toString()
    {
        if(this instanceof Base)
        {
            if(this.inPair)
            {
                return this.base + "\n" + ":" + "\n" + this.complement();
            }
            return this.base + "";
        }
        else
        {
            return "Error, not a base";
        }
    }
    public double weight()
    {
        if (this.base == 'A'){
                return 135.13;
        }
        if (this.base == 'T'){
            return 126.11;
        }
        if (this.base == 'C'){
            return 111.1;
        }
        if (this.base == 'G'){
            return 151.13;
        }
        else return 0.0;	
    }
}
