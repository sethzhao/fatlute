class Countdown extends egret.Sprite {

    
    private timer: egret.Timer;
    private time: egret.Bitmap;

    public constructor() {
        super();
        this.createView();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.addToStage,this);
    }
    
    private addToStage(){
        this.createTimer();
        var sound: egret.Sound = RES.getRes("countTime_mp3");
        var channel: egret.SoundChannel = sound.play(0, 1);
        channel.addEventListener(egret.Event.SOUND_COMPLETE,function(){
            var goSound: egret.Sound = RES.getRes("begin_mp3");
            goSound.play(0, 1);
        },this);
    }
    
    private createView(): void {
        this.time = new egret.Bitmap();
        this.time.texture = RES.getRes('countdown3');
        this.addChild(this.time);
        
        var w = egret.MainContext.instance.stage.stageWidth;
        var h = egret.MainContext.instance.stage.stageHeight;

        this.x = (w - this.width) / 2;
        this.y = (h - this.height) / 2;
    }
    
    private createTimer(){
        this.timer = new egret.Timer(1000,4);
        this.timer.addEventListener(egret.TimerEvent.TIMER,this.timerFunc,this);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.timerComFunc,this);
        this.timer.start();
    }
    

    private timerFunc(event: egret.TimerEvent) {
        var currentCount = (<egret.Timer>event.target).currentCount;
        if(currentCount < 4){
            this.time.texture = RES.getRes('countdown' + (3 - currentCount));
        }
    }

    private timerComFunc(event: egret.TimerEvent) {
        this.parent.removeChild(this);
        this.dispatchEventWith('start');
    }
}
