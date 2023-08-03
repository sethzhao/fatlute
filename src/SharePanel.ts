class SharePanel extends egret.Sprite {

    private _panel: egret.Sprite;

    public constructor() {
        super();
        this.createView();
    }

    private createView() {
        var w = egret.MainContext.instance.stage.stageWidth;
        var h = egret.MainContext.instance.stage.stageHeight;

        this._panel = new egret.Sprite();
        var bgBmp: egret.Bitmap = Utils.createBitmap("share");
        this._panel.addChild(bgBmp);
        this._panel.x = 392;
        this._panel.y = 35;
        this.addChild(this._panel);

        this.graphics.beginFill(0x000000,0.8);
        this.graphics.drawRect(0,0,w,h);
        this.graphics.endFill();
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.close,this);
    }

    private close() {
        this.parent.removeChild(this);
    }
}
