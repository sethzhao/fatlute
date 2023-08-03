class SubmitSuccessPanel extends egret.Sprite {

    private _panel: egret.Sprite;
    private nameField: egret.TextField;
    private phoneField: egret.TextField;

    public constructor() {
        super();
        this.createView();
    }

    private createView() {
        var w = egret.MainContext.instance.stage.stageWidth;
        var h = egret.MainContext.instance.stage.stageHeight;

        this._panel = new egret.Sprite();
        var bgBmp: egret.Bitmap = Utils.createBitmap("submit-success-panel");
        this._panel.addChild(bgBmp);
        this._panel.x = 69;
        this._panel.y = 195;
        this.addChild(this._panel);
        
        this.graphics.beginFill(0x000000,0.8);
        this.graphics.drawRect(0,0,w,h);
        this.graphics.endFill();
        
        var retryBtn: egret.Sprite = new egret.Sprite();
        var retryBtnBmp: egret.Bitmap = Utils.createBitmap("retry-btn");
        retryBtn.addChild(retryBtnBmp);
        retryBtn.x = 149;
        retryBtn.y = 322;
        retryBtn.touchEnabled = true;
        retryBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.retry,this);

        this._panel.addChild(retryBtn);


        var aboutBtn: egret.Sprite = new egret.Sprite();
        var aboutBtnBmp: egret.Bitmap = Utils.createBitmap("about-btn");
        aboutBtn.addChild(aboutBtnBmp);
        aboutBtn.x = 149;
        aboutBtn.y = 421;
        aboutBtn.touchEnabled = true;
        aboutBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.about,this);
        this._panel.addChild(aboutBtn);
        
        this.touchEnabled = true;
    }

    private retry() {
        this.close();
        this.dispatchEventWith('retry');
    }

    private about() {
        this.dispatchEventWith('about');
    }

    private close() {
        this.parent.removeChild(this);
    }
}
