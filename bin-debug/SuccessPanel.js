var SuccessPanel = (function (_super) {
    __extends(SuccessPanel, _super);
    function SuccessPanel() {
        _super.call(this);
        this.createView();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
    }
    var d = __define,c=SuccessPanel,p=c.prototype;
    p.addToStage = function () {
        this.textField.text = '共计消灭' + Score.instance().getVal() + '个油泥';
    };
    p.createView = function () {
        var w = egret.MainContext.instance.stage.stageWidth;
        var h = egret.MainContext.instance.stage.stageHeight;
        this._panel = new egret.Sprite();
        var bgBmp = Utils.createBitmap("result-panel");
        this._panel.addChild(bgBmp);
        this._panel.x = 69;
        this._panel.y = 188;
        this.addChild(this._panel);
        var failureWord = Utils.createBitmap('success-word');
        failureWord.x = 141;
        failureWord.y = 123;
        this._panel.addChild(failureWord);
        this.textField = new egret.TextField();
        this.textField.bold = true;
        this.textField.textColor = 0xfee790;
        this.textField.size = 40;
        this.textField.x = 50;
        this.textField.y = 375;
        this.textField.width = 517;
        this.textField.textAlign = 'center';
        this.textField.fontFamily = "'Microsoft YaHei', Arial, sans-serif";
        this._panel.addChild(this.textField);
        this.graphics.beginFill(0x000000, 0.8);
        this.graphics.drawRect(0, 0, w, h);
        this.graphics.endFill();
        var infoBtn = new egret.Sprite();
        var infoBtnBmp = Utils.createBitmap("info-btn");
        infoBtn.addChild(infoBtnBmp);
        infoBtn.x = 149;
        infoBtn.y = 479;
        infoBtn.touchEnabled = true;
        infoBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.info, this);
        this._panel.addChild(infoBtn);
        var retryBtn = new egret.Sprite();
        var retryBtnBmp = Utils.createBitmap("retry-btn");
        retryBtn.addChild(retryBtnBmp);
        retryBtn.x = 149;
        retryBtn.y = 579;
        retryBtn.touchEnabled = true;
        retryBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.retry, this);
        this._panel.addChild(retryBtn);
        var aboutBtn = new egret.Sprite();
        var aboutBtnBmp = Utils.createBitmap("about-btn");
        aboutBtn.addChild(aboutBtnBmp);
        aboutBtn.x = 149;
        aboutBtn.y = 678;
        aboutBtn.touchEnabled = true;
        aboutBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.about, this);
        this._panel.addChild(aboutBtn);
        this.touchEnabled = true;
    };
    p.info = function () {
        this.close();
        this.dispatchEventWith('info');
    };
    p.retry = function () {
        this.close();
        this.dispatchEventWith('retry');
    };
    p.about = function () {
        this.dispatchEventWith('about');
    };
    p.close = function () {
        this.parent.removeChild(this);
    };
    return SuccessPanel;
})(egret.Sprite);
egret.registerClass(SuccessPanel,'SuccessPanel');
