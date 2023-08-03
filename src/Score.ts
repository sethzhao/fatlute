class Score extends egret.Sprite{
    
    private score: number = 0;
    private textField: egret.TextField;
    
    public constructor() {
        super();
        this.createViews();
        this.x = 382;
        this.y = 43;
    }
    
    private static _instance: Score;

    public static instance(): Score {
        if(this._instance == null) {
            this._instance = new Score();
        }
        return this._instance;
    }

    private createViews() {
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
    }
    
    private update() {
        this.textField.text = '' + (this.score > 9 ? this.score : '0' + this.score);
    }

    public add() {
        this.score++;
        this.update();
    }

    public reset() {
        this.score = 0;
        this.update();
    }

    public getVal() {
        return this.score;
    }
}
