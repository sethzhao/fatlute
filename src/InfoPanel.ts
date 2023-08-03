class InfoPanel extends egret.Sprite {

    private _panel: egret.Sprite;
    private nameField: egret.TextField;
    private phoneField: egret.TextField;

    public constructor() {
        super();
        this.createView();
    }

    private createView() {
        var w = egret.MainContext.instance.stage.stageWidth;
        var h = egret.MainContext.instance.stage.stageHeight;

        this._panel = new egret.Sprite();
        var bgBmp: egret.Bitmap = Utils.createBitmap("info-panel");
        this._panel.addChild(bgBmp);
        this._panel.x = 68;
        this._panel.y = 178;
        this.addChild(this._panel);
        
        var oil = Utils.createBitmap('info-oil');
        oil.x = 272;
        oil.y = 752;
        this.addChild(oil);

        this.graphics.beginFill(0x000000,0.8);
        this.graphics.drawRect(0,0,w,h);
        this.graphics.endFill();
        
        this.nameField = new egret.TextField();
        this.nameField.bold = true;
        this.nameField.textColor = 0x222222;
        this.nameField.size = 34;
        this.nameField.type = egret.TextFieldType.INPUT;
        this.nameField.x = 190;
        this.nameField.y = 172;
        this.nameField.width = 319;
        this.nameField.height = 63;
        this.nameField.verticalAlign = 'middle';
        this._panel.addChild(this.nameField);
        
        this.phoneField = new egret.TextField();
        this.phoneField.bold = true;
        this.phoneField.textColor = 0x222222;
        this.phoneField.size = 34;
        this.phoneField.type = egret.TextFieldType.INPUT;
        this.phoneField.x = 190;
        this.phoneField.y = 275;
        this.phoneField.width = 319;
        this.phoneField.height = 63;
        this.phoneField.verticalAlign = 'middle';
        this._panel.addChild(this.phoneField);

        var submitBtn: egret.Sprite= new egret.Sprite();
        var submitBtnBmp: egret.Bitmap = Utils.createBitmap("submit-btn");
        submitBtn.addChild(submitBtnBmp);
        submitBtn.x = 156;
        submitBtn.y = 373;
        submitBtn.touchEnabled = true;
        submitBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.submit,this);

        this._panel.addChild(submitBtn);

        this.touchEnabled = true;
        
        
    }

    private submit() {
        var name = this.nameField.text.trim();
        var phone = this.phoneField.text.trim();
        if(!name){
            alert('请输入姓名');
            return;
        }
        if(!phone) {
            alert('请输入电话');
            return;
        }
        if(!/^\d{11}$/.test(phone)) {
            alert('请输入正确的电话');
            return;
        }
        var  self = this;
        ApiService.instance().post('/core/api.php',{ name: name,phone: phone,time: Score.instance().getVal()}, function(res){
            if(res.error != 0){
                alert(res.message);
            }else{
                self.success();
            }
        })
    }
    
    private success(){
        this.close();
        this.dispatchEventWith('submitSuccess');
    }
    
    
    private close() {
        this.parent.removeChild(this);
    }
}
