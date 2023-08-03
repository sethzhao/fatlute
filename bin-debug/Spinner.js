var Spinner = (function (_super) {
    __extends(Spinner, _super);
    function Spinner() {
        _super.call(this);
        this.create();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.show, this);
    }
    var d = __define,c=Spinner,p=c.prototype;
    Spinner.instance = function () {
        if (this._instance == null) {
            this._instance = new Spinner();
        }
        return this._instance;
    };
    p.create = function () {
        var w = egret.MainContext.instance.stage.stageWidth;
        var h = egret.MainContext.instance.stage.stageHeight;
        var data = RES.getRes("spinner_data");
        var txtr = RES.getRes("spinner_texture");
        var mcFactory = new egret.MovieClipDataFactory(data, txtr);
        this._mc = new egret.MovieClip(mcFactory.generateMovieClipData("spinner"));
        this._mc.x = (w - this._mc.width) / 2;
        this._mc.y = (h - this._mc.height) / 2;
        ;
        this.addChild(this._mc);
        this.graphics.beginFill(0x000000, 0.8);
        this.graphics.drawRect(0, 0, w, h);
        this.graphics.endFill();
        this.touchEnabled = true;
    };
    p.show = function () {
        this._mc.play(-1);
    };
    return Spinner;
})(egret.Sprite);
egret.registerClass(Spinner,'Spinner');
