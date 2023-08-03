var Score = (function (_super) {
    __extends(Score, _super);
    function Score() {
        _super.call(this);
        this.score = 0;
        this.createViews();
        this.x = 382;
        this.y = 43;
    }
    var d = __define,c=Score,p=c.prototype;
    Score.instance = function () {
        if (this._instance == null) {
            this._instance = new Score();
        }
        return this._instance;
    };
    p.createViews = function () {
        var bg = Utils.createBitmap('score');
        this.addChild(bg);
        this.textField = new egret.TextField();
        this.textField.text = '' + (this.score > 9 ? this.score : '0' + this.score);
        this.textField.bold = true;
        this.textField.textColor = 0x23ffdd;
        this.textField.size = 34;
        this.textField.x = 165;
        this.textField.y = 19;
        this.addChild(this.textField);
    };
    p.update = function () {
        this.textField.text = '' + (this.score > 9 ? this.score : '0' + this.score);
    };
    p.add = function () {
        this.score++;
        this.update();
    };
    p.reset = function () {
        this.score = 0;
        this.update();
    };
    p.getVal = function () {
        return this.score;
    };
    return Score;
})(egret.Sprite);
egret.registerClass(Score,'Score');
