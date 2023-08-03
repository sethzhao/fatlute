class LoadingUI extends egret.Sprite {
    
    private fatlute: egret.Bitmap;
    private textField: egret.TextField;
    
    public constructor() {
        super();
        this.createView();
    }

    private createView():void {
        var bg: egret.Bitmap = Utils.createBitmap('bg');
        this.addChild(bg);
        
        this.fatlute = Utils.createBitmap('fatlute');
        this.fatlute.x = 225;
        this.fatlute.y = 473;
        this.fatlute.scaleX = -1;
        this.addChild(this.fatlute);
        
        this.textField = new egret.TextField();
        this.textField.x = 225;
        this.textField.y = 600;
        this.textField.width= 300;
        this.textField.textAlign = 'center';
        this.textField.text = '0%';
        this.textField.bold = true;
        this.textField.italic = true;
        this.textField.textColor = 0xffca28;
        this.textField.size = 40;
        this.addChild(this.textField);
    }

    public setProgress(current, total):void {
        var distance = 423;
        var startX = 225;
        this.fatlute.x = startX + distance * (current / total);
        this.textField.text = Math.floor(current / total * 100 ) +'%';
    }
}
