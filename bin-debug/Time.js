var Time = (function (_super) {
    __extends(Time, _super);
    function Time(time) {
        _super.call(this);
        this.time = time;
        this.createViews();
        this.x = 78;
        this.y = 43;
    }
    var d = __define,c=Time,p=c.prototype;
    Time.instance = function () {
        if (this._instance == null) {
            this._instance = new Time(Game.GAME_TIME);
        }
        return this._instance;
    };
    p.createViews = function () {
        var bg = Utils.createBitmap('score');
        this.addChild(bg);
        this.textField = new egret.TextField();
        this.textField.bold = true;
        this.textField.textColor = 0xffca28;
        this.textField.size = 34;
        this.textField.text = '00:' + (this.time > 9 ? this.time : '0' + this.time);
        this.textField.x = 140;
        this.textField.y = 19;
        this.addChild(this.textField);
    };
    p.start = function () {
        this.useTime = 0;
        this.timer = new egret.Timer(1000, this.time);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFunc, this);
        this.timer.start();
    };
    p.restart = function () {
        this.textField.text = '00:' + (this.time > 9 ? this.time : '0' + this.time);
        this.start();
    };
    p.stop = function () {
        this.timer.stop();
    };
    p.timerFunc = function (event) {
        var currentCount = event.target.currentCount;
        this.useTime = currentCount;
        var timeLeft = this.time - this.useTime;
        this.textField.text = '00:' + (timeLeft > 9 ? timeLeft : '0' + timeLeft);
    };
    p.timerComFunc = function (event) {
        this.dispatchEventWith('timeUp');
    };
    p.getUseTime = function () {
        return this.useTime;
    };
    return Time;
})(egret.Sprite);
egret.registerClass(Time,'Time');
