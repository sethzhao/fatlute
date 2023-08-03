class Place {
    public x;
    public y;
    private size = 70;
    public isBlock:boolean;
    
    public constructor(y: number, x:number) {
    	this.x = x;
    	this.y = y;
	}
	
	public getPxPoint(): egret.Point{
	    return new egret.Point(this.x * this.size, this.y * this.size);
	}
}
