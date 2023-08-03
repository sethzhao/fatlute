class Hero extends egret.Sprite{
    
    public _status;
    private _beforeStatus;
    private mc: egret.MovieClip;
    private stayBitmap: egret.Bitmap;
    
    public constructor() {
        super();
        this.createViews();

        this.width = 63;
        this.height = 139;
        this.anchorOffsetX = 33;
        this.anchorOffsetY = 80;
	}
	
	private createViews(){
	    this.stayBitmap = Utils.createBitmap('hero');
        this.stayBitmap.x = 8;
        this.stayBitmap.y = -10;
	    this.addChild(this.stayBitmap);
	    
        var data = RES.getRes('walk_data');
        var textrue = RES.getRes('walk_textrue');
        //创建动画工厂
        var mcDataFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data,textrue);
        //创建 MovieClip，将工厂生成的 MovieClipData 传入参数
        this.mc = new egret.MovieClip(mcDataFactory.generateMovieClipData("walk"));
        this.mc.x = -42;
        this.mc.y = -25;
	}
	
    public reset(){
        this._beforeStatus = null;
        this.status = Constants.STAY;
	}
	
	public get status():number{
	    return this._status;
	}
	
	public set status(status:number){
    	  this._beforeStatus = this._status;
	    this._status = status;
	    if(this._status != Constants.STAY){
            if(this.contains(this.stayBitmap)){
                this.removeChild(this.stayBitmap);
    	      }
    	      if(!this.contains(this.mc)){
                  this.addChild(this.mc);
                  this.mc.play(-1);
    	      }
    	      
    	      if(this._status == Constants.RIGHT){
                  this.mc.scaleX = -1;
                  this.mc.x = 106
    	      }
    	      if(this._status == Constants.LEFT) {
                  this.mc.scaleX = 1;
                  this.mc.x = -42
            }
	    }else{
            if(this.contains(this.mc)) {
                this.mc.stop();
                this.removeChild(this.mc);
            }
            if(!this.contains(this.stayBitmap)) {
                this.addChild(this.stayBitmap);
            }
            
            if(this._beforeStatus == Constants.RIGHT) {
                this.stayBitmap.scaleX = -1;
                this.stayBitmap.x = 56
            }
            if(this._beforeStatus == Constants.LEFT) {
                this.stayBitmap.scaleX = 1;
                this.stayBitmap.x = 8
            }
	    }
	}
	
	public moveUp(){
        this.status = Constants.UP;
	}
	
    public moveRight() {
        this.status = Constants.RIGHT;
    }
    
    public moveDown() {
        this.status = Constants.DOWN;
    }
    
    public moveLeft() {
        this.status = Constants.LEFT;
    }
    
    public stay(){
        this.status = Constants.STAY;
    }
	
}
