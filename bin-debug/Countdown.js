var Countdown = (function (_super) {
    __extends(Countdown, _super);
    function Countdown() {
        _super.call(this);
        this.createView();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
    }
    var d = __define,c=Countdown,p=c.prototype;
    p.addToStage = function () {
        this.createTimer();
        var sound = RES.getRes("countTime_mp3");
        var channel = sound.play(0, 1);
        channel.addEventListener(egret.Event.SOUND_COMPLETE, function () {
            var goSound = RES.getRes("begin_mp3");
            goSound.play(0, 1);
        }, this);
    };
    p.createView = function () {
        this.time = new egret.Bitmap();
        this.time.texture = RES.getRes('countdown3');
        this.addChild(this.time);
        var w = egret.MainContext.instance.stage.stageWidth;
        var h = egret.MainContext.instance.stage.stageHeight;
        this.x = (w - this.width) / 2;
        this.y = (h - this.height) / 2;
    };
    p.createTimer = function () {
        this.timer = new egret.Timer(1000, 4);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFunc, this);
        this.timer.start();
    };
    p.timerFunc = function (event) {
        var currentCount = event.target.currentCount;
        if (currentCount < 4) {
            this.time.texture = RES.getRes('countdown' + (3 - currentCount));
        }
    };
    p.timerComFunc = function (event) {
        this.parent.removeChild(this);
        this.dispatchEventWith('start');
    };
    return Countdown;
})(egret.Sprite);
egret.registerClass(Countdown,'Countdown');
