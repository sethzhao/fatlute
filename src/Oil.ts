class Oil extends egret.Sprite{
    
    private oilBitmap: egret.Bitmap;
    private oilBodyLayer: egret.Sprite;
    private isBodyFadeOut = false;
    
	public constructor() {
        super();
        this.width = this.height = 70;
        this.createViews();
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
        this.oilBodyLayer = new egret.Sprite();
        this.addChild(this.oilBodyLayer);
	}
	
    public explode(upRoadCount: number,rightRoadCount: number,downRoadCount: number,leftRoadCount: number){
        this.removeChild(this.oilBitmap);
        
        var center:egret.Bitmap = null;
        if(upRoadCount > 0 && rightRoadCount > 0 && downRoadCount > 0 && leftRoadCount > 0){
            center = Utils.createBitmap("oil5");
        } else if(upRoadCount > 0 && rightRoadCount > 0 && downRoadCount > 0){
            center = Utils.createBitmap("oil4");
            center.rotation = -90;
        } else if(rightRoadCount > 0 && downRoadCount > 0 && leftRoadCount > 0) {
            center = Utils.createBitmap("oil4");
        } else if(downRoadCount > 0 && leftRoadCount > 0 && upRoadCount > 0) {
            center = Utils.createBitmap("oil4");
            center.rotation = 90;
        } else if(leftRoadCount > 0 && upRoadCount > 0 && rightRoadCount > 0) {
            center = Utils.createBitmap("oil4");
            center.rotation = 180;
        } else if(upRoadCount > 0 && rightRoadCount > 0) {
            center = Utils.createBitmap("oil3");
            center.rotation = -90;
        } else if(rightRoadCount > 0 && downRoadCount > 0) {
            center = Utils.createBitmap("oil3");
        } else if(downRoadCount > 0 && leftRoadCount > 0) {
            center = Utils.createBitmap("oil3");
            center.rotation = 90;
        } else if(leftRoadCount > 0 && upRoadCount > 0) {
            center = Utils.createBitmap("oil3");
            center.rotation = 180;
        } else if(upRoadCount > 0 && downRoadCount > 0) {
            center = Utils.createBitmap("oil2");
        } else if(rightRoadCount > 0 && leftRoadCount > 0) {
            center = Utils.createBitmap("oil1");
        } else if(rightRoadCount > 0 || leftRoadCount > 0) {
            center = Utils.createBitmap("oil1");
        } else if(upRoadCount > 0 || downRoadCount > 0) {
            center = Utils.createBitmap("oil2");
        }
        
        center.anchorOffsetX = center.width / 2;
        center.anchorOffsetY = center.height / 2;
        center.x = 35;
        center.y = 35;
        this.oilBodyLayer.addChild(center);
        
        for(let i = 1;i <= upRoadCount;i++){
            if(i==upRoadCount){
                var end = this.makeEnd('up');
                end.y -= i * 70;
                this.addChild(end);
                end.play();
            } else {
                var upOil = Utils.createBitmap('oil2');
                upOil.y = - (i * 70);
                this.oilBodyLayer.addChild(upOil);
            }
        }
        for(let i = 1;i <= rightRoadCount;i++) {
            if(i == rightRoadCount) {
                var end = this.makeEnd('right');
                end.x += i * 70;
                this.addChild(end);
                end.play();
            } else {
                var rightOil = Utils.createBitmap('oil1');
                rightOil.x = i * 70;
                this.oilBodyLayer.addChild(rightOil);
            }
        }
        for(let i = 1;i <= downRoadCount;i++) {
            if(i == downRoadCount) {
                var end = this.makeEnd('down');
                end.y += i * 70;
                this.addChild(end);
                end.play();
            } else {
                var downOil = Utils.createBitmap('oil2');
                downOil.y = i * 70;
                this.oilBodyLayer.addChild(downOil);
            }
        }
        for(let i = 1;i <= leftRoadCount;i++) {
            if(i == leftRoadCount) {
                var end = this.makeEnd('left');
                end.x -= i * 70;
                this.addChild(end);
                end.play();
            }else{
                var leftOil = Utils.createBitmap('oil1');
                leftOil.x = - (i * 70);
                this.oilBodyLayer.addChild(leftOil);
            }
        }
        
        var explodeSound: egret.Sound = RES.getRes("explode_mp3");
        explodeSound.play(0,1);
    }
	
	private createViews(){
	    this.oilBitmap = Utils.createBitmap('oil');
	    this.oilBitmap.x = -17;
	    this.oilBitmap.y = -17;
        this.addChild(this.oilBitmap);
	}
	
    private bodyFadeOut(){
        this.removeChild(this.oilBodyLayer);
    }
	
	private makeEnd(type:string):egret.MovieClip{
	    var data = RES.getRes('oilEnd_data');
        var textrue = RES.getRes('oilEnd_textrue');
        var mcDataFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data,textrue);
        var mc: egret.MovieClip = new egret.MovieClip(mcDataFactory.generateMovieClipData("oilEnd"));
        
        mc.addEventListener(egret.MovieClipEvent.FRAME_LABEL,(e:egret.MovieClipEvent)=>{
            if(!this.isBodyFadeOut){
                this.isBodyFadeOut = true;
                this.bodyFadeOut();
            }
        },this);
        mc.addEventListener(egret.Event.COMPLETE,(e: egret.Event) => {
            this.removeChild(mc);
            if(!this.numChildren && this.parent){
                this.parent.removeChild(this);
            }
        },this);
        mc.frameRate = 15;
        mc.anchorOffsetX = 48;
        mc.anchorOffsetY = 35;
        mc.x = 35;
        mc.y = 35;
        if(type=='up'){
            mc.rotation = 180;
        } else if(type == 'right') {
            mc.rotation = -90;
        } else if(type == 'left'){
            mc.rotation = 90;
        }
        return mc;
	}
}
