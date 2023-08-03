var AboutPanel = (function (_super) {
    __extends(AboutPanel, _super);
    function AboutPanel() {
        _super.call(this);
        this.createView();
    }
    var d = __define,c=AboutPanel,p=c.prototype;
    p.createView = function () {
        var w = egret.MainContext.instance.stage.stageWidth;
        var h = egret.MainContext.instance.stage.stageHeight;
        var bgBmp = Utils.createBitmap("about-bg");
        this.addChild(bgBmp);
        var exml = "<e:Group xmlns:e=\"http://ns.egret.com/eui\">\n                <e:Scroller height=\"1032\">\n                    <e:Skin>\n                        <e:VScrollBar id=\"verticalScrollBar\" width=\"13\" height=\"100%\" right=\"15\" autoVisibility = \"false\">\n                            <e:Skin>\n                                <e:Image id=\"thumb\" width=\"13\" height=\"767\" source=\"resource/assets/thumb.png\" />\n                            </e:Skin>\n                        </e:VScrollBar>\n                    </e:Skin>\n                    <e:Group>\n                        <e:Image width=\"100%\" height=\"1683\" source=\"resource/assets/about.png\" />\n                    </e:Group>\n                </e:Scroller>\n            </e:Group>";
        var clazz = EXML.parse(exml);
        var scroller = new clazz();
        this.addChild(scroller);
        var backBtn = new egret.Sprite();
        var backBtnBmp = Utils.createBitmap("back-btn");
        backBtn.addChild(backBtnBmp);
        backBtn.x = 150;
        backBtn.y = 1060;
        backBtn.touchEnabled = true;
        backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.back, this);
        this.addChild(backBtn);
        var shareBtn = new egret.Sprite();
        var shareBtnBmp = Utils.createBitmap("share-btn");
        shareBtn.addChild(shareBtnBmp);
        shareBtn.x = 395;
        shareBtn.y = 1060;
        shareBtn.touchEnabled = true;
        shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.share, this);
        this.addChild(shareBtn);
        this.sharePanel = new SharePanel();
        this.touchEnabled = true;
    };
    p.back = function () {
        this.close();
    };
    p.share = function () {
        this.addChild(this.sharePanel);
    };
    p.close = function () {
        this.parent.removeChild(this);
    };
    return AboutPanel;
})(egret.Sprite);
egret.registerClass(AboutPanel,'AboutPanel');
