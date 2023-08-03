var SubmitSuccessPanel = (function (_super) {
    __extends(SubmitSuccessPanel, _super);
    function SubmitSuccessPanel() {
        _super.call(this);
        this.createView();
    }
    var d = __define,c=SubmitSuccessPanel,p=c.prototype;
    p.createView = function () {
        var w = egret.MainContext.instance.stage.stageWidth;
        var h = egret.MainContext.instance.stage.stageHeight;
        this._panel = new egret.Sprite();
        var bgBmp = Utils.createBitmap("submit-success-panel");
        this._panel.addChild(bgBmp);
        this._panel.x = 69;
        this._panel.y = 195;
        this.addChild(this._panel);
        this.graphics.beginFill(0x000000, 0.8);
        this.graphics.drawRect(0, 0, w, h);
        this.graphics.endFill();
        var retryBtn = new egret.Sprite();
        var retryBtnBmp = Utils.createBitmap("retry-btn");
        retryBtn.addChild(retryBtnBmp);
        retryBtn.x = 149;
        retryBtn.y = 322;
        retryBtn.touchEnabled = true;
        retryBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.retry, this);
        this._panel.addChild(retryBtn);
        var aboutBtn = new egret.Sprite();
        var aboutBtnBmp = Utils.createBitmap("about-btn");
        aboutBtn.addChild(aboutBtnBmp);
        aboutBtn.x = 149;
        aboutBtn.y = 421;
        aboutBtn.touchEnabled = true;
        aboutBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.about, this);
        this._panel.addChild(aboutBtn);
        this.touchEnabled = true;
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
    return SubmitSuccessPanel;
})(egret.Sprite);
egret.registerClass(SubmitSuccessPanel,'SubmitSuccessPanel');
