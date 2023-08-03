var Fatlute = (function (_super) {
    __extends(Fatlute, _super);
    function Fatlute(curPlace, mapPlaces) {
        _super.call(this);
        this.speed = 1000;
        this.lastOrientation = 0;
        this.width = this.height = 70;
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
        this.curPlace = curPlace;
        this.mapPlaces = mapPlaces;
        this.createViews();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
    }
    var d = __define,c=Fatlute,p=c.prototype;
    p.addToStage = function () {
        this.move();
    };
    p.createViews = function () {
        var fatluteBitmap = Utils.createBitmap('fatlute');
        fatluteBitmap.x = (this.width - fatluteBitmap.width) / 2;
        fatluteBitmap.y = (this.height - fatluteBitmap.height) / 2 + 10;
        this.addChild(fatluteBitmap);
    };
    p.move = function () {
        var orientationCanGo = [];
        if (this.curPlace.y > 0 && !this.mapPlaces[this.curPlace.y - 1][this.curPlace.x].isBlock) {
            orientationCanGo.push(Constants.UP);
        }
        if (this.curPlace.x < 8 && !this.mapPlaces[this.curPlace.y][this.curPlace.x + 1].isBlock) {
            orientationCanGo.push(Constants.RIGHT);
        }
        if (this.curPlace.y < 14 && !this.mapPlaces[this.curPlace.y + 1][this.curPlace.x].isBlock) {
            orientationCanGo.push(Constants.DOWN);
        }
        if (this.curPlace.x > 0 && !this.mapPlaces[this.curPlace.y][this.curPlace.x - 1].isBlock) {
            orientationCanGo.push(Constants.LEFT);
        }
        var orientation = -1;
        if (this.lastOrientation == Constants.RIGHT || this.lastOrientation == Constants.LEFT) {
            if (orientationCanGo.length == 2 && orientationCanGo.indexOf(Constants.RIGHT) > -1 && orientationCanGo.indexOf(Constants.LEFT) > -1) {
                orientation = this.lastOrientation;
            }
        }
        if (this.lastOrientation == Constants.UP || this.lastOrientation == Constants.DOWN) {
            if (orientationCanGo.length == 2 && orientationCanGo.indexOf(Constants.UP) > -1 && orientationCanGo.indexOf(Constants.DOWN) > -1) {
                orientation = this.lastOrientation;
            }
        }
        if (orientation == -1) {
            var orientationIndex = Math.floor(Math.random() * orientationCanGo.length);
            orientation = orientationCanGo[orientationIndex];
        }
        switch (orientation) {
            case Constants.UP:
                this.curPlace = this.mapPlaces[this.curPlace.y - 1][this.curPlace.x];
                if (this.lastOrientation == Constants.UP) {
                }
                else if (this.lastOrientation == Constants.RIGHT) {
                    this.rotation -= 90;
                }
                else if (this.lastOrientation == Constants.DOWN) {
                    this.scaleX = -this.scaleX;
                }
                else if (this.lastOrientation == Constants.LEFT) {
                    this.rotation += 90;
                }
                else {
                    this.rotation += 90;
                }
                break;
            case Constants.RIGHT:
                this.curPlace = this.mapPlaces[this.curPlace.y][this.curPlace.x + 1];
                if (this.lastOrientation == Constants.UP) {
                    this.rotation += 90;
                }
                else if (this.lastOrientation == Constants.RIGHT) {
                }
                else if (this.lastOrientation == Constants.DOWN) {
                    this.rotation -= 90;
                }
                else if (this.lastOrientation == Constants.LEFT) {
                    this.scaleX = -this.scaleX;
                }
                else {
                    this.scaleX = -this.scaleX;
                }
                break;
            case Constants.DOWN:
                this.curPlace = this.mapPlaces[this.curPlace.y + 1][this.curPlace.x];
                if (this.lastOrientation == Constants.UP) {
                    this.scaleX = -this.scaleX;
                }
                else if (this.lastOrientation == Constants.RIGHT) {
                    this.rotation += 90;
                }
                else if (this.lastOrientation == Constants.DOWN) {
                }
                else if (this.lastOrientation == Constants.LEFT) {
                    this.rotation -= 90;
                }
                else {
                    this.rotation -= 90;
                }
                break;
            case Constants.LEFT:
                this.curPlace = this.mapPlaces[this.curPlace.y][this.curPlace.x - 1];
                if (this.lastOrientation == Constants.UP) {
                    this.rotation -= 90;
                }
                else if (this.lastOrientation == Constants.RIGHT) {
                    this.scaleX = -this.scaleX;
                }
                else if (this.lastOrientation == Constants.DOWN) {
                    this.rotation += 90;
                }
                else if (this.lastOrientation == Constants.LEFT) {
                }
                else {
                }
                break;
        }
        this.lastOrientation = orientation;
        egret.Tween.get(this).to({ x: this.curPlace.x * 70 + 35, y: this.curPlace.y * 70 + 35 }, this.speed).call(this.move, this);
    };
    return Fatlute;
})(egret.Sprite);
egret.registerClass(Fatlute,'Fatlute');
