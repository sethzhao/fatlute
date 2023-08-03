class FailurePanel extends egret.Sprite {

    private _panel: egret.Sprite;
    private textField: egret.TextField;

    public constructor() {
        super();
        this.createView();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.addToStage,this);
    }
    
    private addToStage() {
        this.textField.text = '共计消灭' + Score.instance().getVal() + '个油泥';
    }

    private createView() {
        var w = egret.MainContext.instance.stage.stageWidth;
        var h = egret.MainContext.instance.stage.stageHeight;

        this._panel = new egret.Sprite();
        var bgBmp: egret.Bitmap = Utils.createBitmap("result-panel");
        this._panel.addChild(bgBmp);
        this._panel.x = 69;
        this._panel.y = 188;
        this.addChild(this._panel);

        var failureWord = Utils.createBitmap('failure-word');
        failureWord.x = 96;
        failureWord.y = 163;
        this._panel.addChild(failureWord);
        
        this.textField = new egret.TextField();
        this.textField.bold = true;
        this.textField.textColor = 0xfee790;
        this.textField.size = 40;
        this.textField.x = 50;
        this.textField.y = 425;
        this.textField.width = 517;
        this.textField.textAlign = 'center';
        this.textField.fontFamily = "'Microsoft YaHei', Arial, sans-serif";
        this._panel.addChild(this.textField);
        
        this.graphics.beginFill(0x000000,0.8);
        this.graphics.drawRect(0,0,w,h);
        this.graphics.endFill();

        var retryBtn: egret.Sprite= new egret.Sprite();
        var retryBtnBmp: egret.Bitmap = Utils.createBitmap("retry-btn");
        retryBtn.addChild(retryBtnBmp);
        retryBtn.x = 149;
        retryBtn.y = 555;
        retryBtn.touchEnabled = true;
        retryBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.retry,this);

        this._panel.addChild(retryBtn);


        var aboutBtn: egret.Sprite= new egret.Sprite();
        var aboutBtnBmp: egret.Bitmap = Utils.createBitmap("about-btn");
        aboutBtn.addChild(aboutBtnBmp);
        aboutBtn.x = 149;
        aboutBtn.y = 653;
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
