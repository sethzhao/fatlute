class Time extends egret.Sprite{
    
    private textField: egret.TextField;
    private timer: egret.Timer;
    private time: number;
    private useTime: number;
    
    public constructor(time: number) {
        super();
        this.time = time;
        this.createViews();
        this.x = 78;
        this.y = 43;
    }
    
    private static _instance: Time;

    public static instance(): Time {
        if(this._instance == null) {
            this._instance = new Time(Game.GAME_TIME);
        }
        return this._instance;
    }
	
	private createViews(){
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
	}
	
    public start() {
        this.useTime = 0;
        this.timer = new egret.Timer(1000,this.time);
        this.timer.addEventListener(egret.TimerEvent.TIMER,this.timerFunc,this);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.timerComFunc,this);
        this.timer.start();
    }

    public restart() {
        this.textField.text = '00:' + (this.time > 9 ? this.time : '0' + this.time);
        this.start();
    }

    public stop() {
        this.timer.stop();
    }

    private timerFunc(event: egret.TimerEvent) {
        var currentCount = (<egret.Timer>event.target).currentCount;
        this.useTime = currentCount;
        var timeLeft = this.time - this.useTime;
        this.textField.text = '00:' + (timeLeft > 9 ? timeLeft : '0' + timeLeft);
    }

    private timerComFunc(event: egret.TimerEvent) {
        this.dispatchEventWith('timeUp');
    }
    
    public getUseTime():number{
        return this.useTime;
    }
}
