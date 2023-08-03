class Spinner extends egret.Sprite {

    private _mc: egret.MovieClip;
    
    public constructor() {
        super();
        this.create();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.show,this);
    }

    private static _instance: Spinner;
    
    public static instance(): Spinner {
        if(this._instance == null) {
            this._instance = new Spinner();
        }
        return this._instance;
    }
    
    private create() {
        var w = egret.MainContext.instance.stage.stageWidth;
        var h = egret.MainContext.instance.stage.stageHeight;
        
        var data = RES.getRes("spinner_data");
        var txtr = RES.getRes("spinner_texture");
        var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( data, txtr );
        
        this._mc = new egret.MovieClip( mcFactory.generateMovieClipData( "spinner" ) );
        this._mc.x = (w - this._mc.width) / 2;
        this._mc.y = (h - this._mc.height) / 2;;
        this.addChild(this._mc);

        this.graphics.beginFill(0x000000,0.8);
        this.graphics.drawRect(0,0,w,h);
        this.graphics.endFill();
        this.touchEnabled = true;
    }

    private show(){
        this._mc.play(-1);
    }
}
