var SharePanel = (function (_super) {
    __extends(SharePanel, _super);
    function SharePanel() {
        _super.call(this);
        this.createView();
    }
    var d = __define,c=SharePanel,p=c.prototype;
    p.createView = function () {
        var w = egret.MainContext.instance.stage.stageWidth;
        var h = egret.MainContext.instance.stage.stageHeight;
        this._panel = new egret.Sprite();
        var bgBmp = Utils.createBitmap("share");
        this._panel.addChild(bgBmp);
        this._panel.x = 392;
        this._panel.y = 35;
        this.addChild(this._panel);
        this.graphics.beginFill(0x000000, 0.8);
        this.graphics.drawRect(0, 0, w, h);
        this.graphics.endFill();
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
    };
    p.close = function () {
        this.parent.removeChild(this);
    };
    return SharePanel;
})(egret.Sprite);
egret.registerClass(SharePanel,'SharePanel');
