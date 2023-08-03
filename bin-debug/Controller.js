var Controller = (function (_super) {
    __extends(Controller, _super);
    function Controller() {
        _super.call(this);
        this.createViews();
        this.addGameEventListener();
        this.y = 883;
    }
    var d = __define,c=Controller,p=c.prototype;
    p.createViews = function () {
        this.upBtn = new egret.Sprite();
        this.upBtn.addChild(Utils.createBitmap('up'));
        this.upBtn.x = 154;
        var upBtnShape = new egret.Shape();
        upBtnShape.graphics.beginFill(0xff0000);
        upBtnShape.graphics.drawCircle(this.upBtn.width / 2, this.upBtn.height / 2, 60);
        upBtnShape.graphics.endFill();
        upBtnShape.alpha = 0;
        this.upBtn.addChild(upBtnShape);
        this.addChild(this.upBtn);
        this.rightBtn = new egret.Sprite();
        this.rightBtn.addChild(Utils.createBitmap('right'));
        this.rightBtn.x = 240;
        this.rightBtn.y = 84;
        var rightBtnShape = new egret.Shape();
        rightBtnShape.graphics.beginFill(0xffff00);
        rightBtnShape.graphics.drawCircle(this.rightBtn.width / 2, this.rightBtn.height / 2, 60);
        rightBtnShape.graphics.endFill();
        rightBtnShape.alpha = 0;
        this.rightBtn.addChild(rightBtnShape);
        this.addChild(this.rightBtn);
        this.downBtn = new egret.Sprite();
        this.downBtn.addChild(Utils.createBitmap('down'));
        this.downBtn.x = 154;
        this.downBtn.y = 169;
        var downBtnShape = new egret.Shape();
        downBtnShape.graphics.beginFill(0xff00ff);
        downBtnShape.graphics.drawCircle(this.downBtn.width / 2, this.downBtn.height / 2, 60);
        downBtnShape.graphics.endFill();
        downBtnShape.alpha = 0;
        this.downBtn.addChild(downBtnShape);
        this.addChild(this.downBtn);
        this.leftBtn = new egret.Sprite();
        this.leftBtn.addChild(Utils.createBitmap('left'));
        this.leftBtn.x = 71;
        this.leftBtn.y = 84;
        var leftBtnShape = new egret.Shape();
        leftBtnShape.graphics.beginFill(0x00ffff);
        leftBtnShape.graphics.drawCircle(this.leftBtn.width / 2, this.leftBtn.height / 2, 60);
        leftBtnShape.graphics.endFill();
        leftBtnShape.alpha = 0;
        this.leftBtn.addChild(leftBtnShape);
        this.addChild(this.leftBtn);
        var center = Utils.createBitmap('center');
        center.x = 154;
        center.y = 84;
        this.addChild(center);
        this.dropBtn = Utils.createBitmap('drop');
        this.dropBtn.x = 502;
        this.dropBtn.y = 43;
        this.addChild(this.dropBtn);
    };
    p.addGameEventListener = function () {
        this.upBtn.touchEnabled = true;
        this.upBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.upBegin, this);
        this.upBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.end, this);
        this.upBtn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.end, this);
        this.rightBtn.touchEnabled = true;
        this.rightBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.rightBegin, this);
        this.rightBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.end, this);
        this.rightBtn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.end, this);
        this.downBtn.touchEnabled = true;
        this.downBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.downBegin, this);
        this.downBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.end, this);
        this.downBtn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.end, this);
        this.leftBtn.touchEnabled = true;
        this.leftBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.leftBegin, this);
        this.leftBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.end, this);
        this.leftBtn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.end, this);
        this.dropBtn.touchEnabled = true;
        this.dropBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.drop, this);
    };
    p.upBegin = function () {
        this.dispatchEventWith('upBegin');
    };
    p.rightBegin = function () {
        this.dispatchEventWith('rightBegin');
    };
    p.downBegin = function () {
        this.dispatchEventWith('downBegin');
    };
    p.leftBegin = function () {
        this.dispatchEventWith('leftBegin');
    };
    p.end = function () {
        this.dispatchEventWith('end');
    };
    p.drop = function () {
        this.dispatchEventWith('drop');
    };
    return Controller;
})(egret.Sprite);
egret.registerClass(Controller,'Controller');
