class AboutPanel extends egret.Sprite {
    
    private sharePanel: SharePanel;

    public constructor() {
        super();
        this.createView();
    }

    private createView() {
        var w = egret.MainContext.instance.stage.stageWidth;
        var h = egret.MainContext.instance.stage.stageHeight;

        var bgBmp: egret.Bitmap = Utils.createBitmap("about-bg");
        this.addChild(bgBmp);


        var exml =
            `<e:Group xmlns:e="http://ns.egret.com/eui">
                <e:Scroller height="1032">
                    <e:Skin>
                        <e:VScrollBar id="verticalScrollBar" width="13" height="100%" right="15" autoVisibility = "false">
                            <e:Skin>
                                <e:Image id="thumb" width="13" height="767" source="resource/assets/thumb.png" />
                            </e:Skin>
                        </e:VScrollBar>
                    </e:Skin>
                    <e:Group>
                        <e:Image width="100%" height="1683" source="resource/assets/about.png" />
                    </e:Group>
                </e:Scroller>
            </e:Group>`;

        var clazz = EXML.parse(exml);
        var scroller = new clazz();
        this.addChild(scroller);
        
        var backBtn: egret.Sprite= new egret.Sprite();
        var backBtnBmp: egret.Bitmap = Utils.createBitmap("back-btn");
        backBtn.addChild(backBtnBmp);
        backBtn.x = 150;
        backBtn.y = 1060;
        backBtn.touchEnabled = true;
        backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.back,this);

        this.addChild(backBtn);


        var shareBtn: egret.Sprite= new egret.Sprite();
        var shareBtnBmp: egret.Bitmap = Utils.createBitmap("share-btn");
        shareBtn.addChild(shareBtnBmp);
        shareBtn.x = 395;
        shareBtn.y = 1060;
        shareBtn.touchEnabled = true;
        shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.share,this);
        this.addChild(shareBtn);
        
        this.sharePanel = new SharePanel();
        
        this.touchEnabled = true;
    }

    private back() {
        this.close();
    }
    
    private share() {
        this.addChild(this.sharePanel);
    }
    
    private close() {
        this.parent.removeChild(this);
    }
}
