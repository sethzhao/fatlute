declare var wx;

class Game extends egret.DisplayObjectContainer {
    
    private countdown: Countdown;
    private gameMap: GameMap;
    private hero: Hero;
    private fatlutes: Fatlute[];
    private controller: Controller;
    private droped = false;
    
    public static GAME_TIME = 60;
    private static SUCCESS_SCORE = 10;
    private static FATLUTE_NUM = 8;
    
    private static STATUS_NORMAL = 0;
    private static STATUS_DEAD = 1;
    private static STATUS_SUCCESS = 2;

    private status = Game.STATUS_NORMAL;
    
    private failurePanel: FailurePanel;
    private successPanel: SuccessPanel;
    private infoPanel: InfoPanel;
    private aboutPanel: AboutPanel;
    private submitSuccessPanel: SubmitSuccessPanel;

    public constructor() {
        super();
        this.createViews();
    }
    
    private addFrameListen(){
        this.addEventListener(egret.Event.ENTER_FRAME,this.gameViewUpdate,this);
    }
    
    private removeFrameListen() {
        this.removeEventListener(egret.Event.ENTER_FRAME,this.gameViewUpdate,this);
    }

    private createViews(): void {
        var bg = Utils.createBitmap('bg');
        this.addChild(bg);
        
        this.addChild(Time.instance());
        Time.instance().addEventListener('timeUp',this.timeUp,this);

        this.addChild(Score.instance());
        
        this.gameMap = new GameMap(Utils.random(1,3));
        this.addChild(this.gameMap);
        
        this.hero = new Hero();
        this.gameMap.addChildInPlaceByYX(this.hero, 1, 1);
        
        this.controller = new Controller();
        this.addChild(this.controller);
        
        this.failurePanel = new FailurePanel();
        this.failurePanel.addEventListener('retry',this.retry,this);
        this.failurePanel.addEventListener('about',this.about,this);
        
        this.successPanel = new SuccessPanel();
        this.successPanel.addEventListener('info',this.info,this);
        this.successPanel.addEventListener('retry',this.retry,this);
        this.successPanel.addEventListener('about',this.about,this);
        
        this.infoPanel = new InfoPanel();
        this.infoPanel.addEventListener('submitSuccess',this.submitSuccess,this);
        this.aboutPanel = new AboutPanel();
        this.submitSuccessPanel = new SubmitSuccessPanel();
        this.submitSuccessPanel.addEventListener('retry',this.retry,this);
        this.submitSuccessPanel.addEventListener('about',this.about,this);
        
        this.countdown = new Countdown();
        this.countdown.addEventListener('start',this.start,this);
        this.addChild(this.countdown);
    }
    
    private addControllerListener(){
        this.controller.addEventListener('upBegin',this.hero.moveUp,this.hero);
        this.controller.addEventListener('rightBegin',this.hero.moveRight,this.hero);
        this.controller.addEventListener('downBegin',this.hero.moveDown,this.hero);
        this.controller.addEventListener('leftBegin',this.hero.moveLeft,this.hero);
        this.controller.addEventListener('end',this.hero.stay,this.hero);
        this.controller.addEventListener('drop',this.drop,this);
        this.addKeyListener();
    }
    
    private removeControllerListener(){
        this.controller.removeEventListener('upBegin',this.hero.moveUp,this.hero);
        this.controller.removeEventListener('rightBegin',this.hero.moveRight,this.hero);
        this.controller.removeEventListener('downBegin',this.hero.moveDown,this.hero);
        this.controller.removeEventListener('leftBegin',this.hero.moveLeft,this.hero);
        this.controller.removeEventListener('end',this.hero.stay,this.hero);
        this.controller.removeEventListener('drop',this.drop,this);
//        this.removeKeyListener();
    }
    
    private start(){
//        var bgm: egret.Sound = RES.getRes("bgm_mp3");
//        bgm.play(0,-1);
        
        this.fatlutes = this.createFatlutes(Game.FATLUTE_NUM);
        this.addControllerListener();
        this.addFrameListen();
        Time.instance().start();
    }
    
    private timeUp(){
        if(Score.instance().getVal() >= Game.SUCCESS_SCORE) {
            this.success();
        }else{
            this.die();
        }
    }
    
    private success(){
        if(this.status != Game.STATUS_NORMAL) {
            return;
        }
        this.status = Game.STATUS_SUCCESS;
        
        this.removeFrameListen();
        this.removeControllerListener();
        Time.instance().stop();
        
        this.addChild(this.successPanel);
    }
    
    private die() {
        if(this.status != Game.STATUS_NORMAL){
            return;
        }
        this.status = Game.STATUS_DEAD;
        
        this.removeFrameListen();
        this.removeControllerListener();
        Time.instance().stop();
        
        this.addChild(this.failurePanel);
    }
    
    private retry(){
        this.removeChild(this.gameMap);
        egret.Tween.removeAllTweens();
        this.gameMap = new GameMap(Utils.random(1,3));
        this.addChildAt(this.gameMap,this.getChildIndex(this.controller));//放到控制器之前
        this.hero.reset();
        this.gameMap.addChildInPlaceByYX(this.hero,1,1);
        this.fatlutes = this.createFatlutes(Game.FATLUTE_NUM);
        this.addControllerListener();
        this.addFrameListen();
        Score.instance().reset();
        Time.instance().restart();
        this.status = Game.STATUS_NORMAL;
    }
    
    private submitSuccess(){
        this.addChild(this.submitSuccessPanel);
    }
    
    private info(){
        this.addChild(this.infoPanel);
    }
    
    private about(){
        this.addChild(this.aboutPanel);
    }
    
    private createFatlutes(num:number):Fatlute[]{
        var fatlutes = [];
        for(var i = 0;i < num;i++) {
            var heroPlace: Place = this.gameMap.findPlaceByPx(this.hero.y,this.hero.x);

            var place = this.gameMap.randomSafePlace(heroPlace);
            
            var fatlute = new Fatlute(place,this.gameMap.places);
            fatlutes.push(fatlute);
            this.gameMap.addChildInPlace(fatlute,place);
        }
        return fatlutes;
    }
    
    private drop(){
        if(this.droped){
            return;
        }
        this.droped = true;
        
        var place: Place = this.gameMap.findPlaceByPx(this.hero.y,this.hero.x);

        var oil: Oil = new Oil();
        this.gameMap.addChildInPlace(oil, place);
        
        var dropSound: egret.Sound = RES.getRes("drop_mp3");
        dropSound.play(0,1);
        
        egret.setTimeout(function(){
            var upRoads = this.gameMap.findRoads(place.y,place.x,'up');
            var rightRoads = this.gameMap.findRoads(place.y,place.x,'right');
            var downRoads = this.gameMap.findRoads(place.y,place.x,'down');
            var leftRoads = this.gameMap.findRoads(place.y,place.x,'left');
            
            oil.explode(upRoads.length,rightRoads.length,downRoads.length,leftRoads.length);
            
            var allRoads = upRoads.concat(rightRoads).concat(downRoads).concat(leftRoads).concat(place);
            this.hitFatlute(allRoads);
            this.droped = false;
        },this,1000);
    }
    
    private hitFatlute(roads:Place[]){
        for(var i = 0;i < this.fatlutes.length;i++){
            var fatlute = this.fatlutes[i];
            var place = this.gameMap.findPlaceByPx(fatlute.y,fatlute.x);
            if(roads.indexOf(place) != -1){
                egret.Tween.removeTweens(fatlute);
                fatlute.parent.removeChild(fatlute);
                this.fatlutes.splice(this.fatlutes.indexOf(fatlute),1);
                this.fatlutes = this.fatlutes.concat(this.createFatlutes(1));
                i--;
                var hitSound: egret.Sound = RES.getRes("hit_mp3");
                hitSound.play(0,1);
                if(this.status == Game.STATUS_NORMAL) {
                    Score.instance().add();
                }
            }
        }
    }
    
    private touchFatlute() {
        for(var i = 0;i < this.fatlutes.length;i++) {
            var fatlute = this.fatlutes[i];
            
            var point = fatlute.localToGlobal(35,35);
            if(this.hero.hitTestPoint(point.x,point.y,false)){
                var dieSound: egret.Sound = RES.getRes("die_mp3");
                dieSound.play(0,1);
                
                this.die();
                break;
            }
        }
    }
    
    private addKeyListener() {
        var self = this;
        document.addEventListener("keydown",function(event: KeyboardEvent) {
            switch(event.keyCode) {
                case 87: self.hero.status = Constants.UP; break;
                case 68: self.hero.status = Constants.RIGHT; break;
                case 83: self.hero.status = Constants.DOWN; break;
                case 65: self.hero.status = Constants.LEFT; break;
                case 73: self.drop(); break;
            }
        });
        document.addEventListener("keyup",function(event: KeyboardEvent) {
            self.hero.status = Constants.STAY;
        });
    }
    
    private _lastTime: number = egret.getTimer();

    private speedOffset(): number {
        var nowTime: number = egret.getTimer();
        var fps: number = 1000 / (nowTime - this._lastTime);
        this._lastTime = nowTime;
        return 30 / fps;
    }

    private gameViewUpdate() {
        this.updateHero(Math.floor(Constants.SPEED * this.speedOffset()));
        this.touchFatlute();
    }
    
    public updateHero(speed: number) {
        switch(this.hero.status) {
            case Constants.UP:
                var placeLeft: Place = this.gameMap.findPlaceByPx(this.hero.y - 35 - speed,this.hero.x - 35);
                var placeRight: Place = this.gameMap.findPlaceByPx(this.hero.y - 35 - speed,this.hero.x + 34);

                if(!placeLeft && !placeRight) {
                    break;
                }

                if(placeLeft.isBlock && placeRight.isBlock) {
                    break;
                }

                if(placeLeft && placeLeft.isBlock) {
                    if(this.hero.x > (placeLeft.getPxPoint().x + 69)) {
                        var distance = this.hero.x - (placeLeft.getPxPoint().x + 69);
                        this.hero.x += 35 - distance > speed ? speed : 1;
                    }
                    break;
                }
                if(placeRight && placeRight.isBlock) {
                    if(this.hero.x < placeRight.getPxPoint().x) {
                        var distance = placeRight.getPxPoint().x - this.hero.x;
                        this.hero.x -= 35 - distance > speed ? speed : 1;
                    }
                    break;
                }

                this.hero.y -= speed;
                break;
            case Constants.RIGHT:
                var placeTop: Place = this.gameMap.findPlaceByPx(this.hero.y - 35,this.hero.x + 34 + speed);
                var placeBottom: Place = this.gameMap.findPlaceByPx(this.hero.y + 34,this.hero.x + 34 + speed);

                if(!placeTop && !placeBottom) {
                    break;
                }

                if(placeTop.isBlock && placeBottom.isBlock) {
                    break;
                }

                if(placeTop && placeTop.isBlock) {
                    if(this.hero.y > (placeTop.getPxPoint().y + 69)) {
                        var distance = this.hero.y - (placeTop.getPxPoint().y + 69);
                        this.hero.y += 35 - distance > speed ? speed : 1;
                    }
                    break;
                }
                if(placeBottom && placeBottom.isBlock) {
                    if(this.hero.y < placeBottom.getPxPoint().y) {
                        var distance = placeBottom.getPxPoint().y - this.hero.y;
                        this.hero.y -= 35 - distance > speed ? speed : 1;
                    }
                    break;
                }

                this.hero.x += speed;
                break;
            case Constants.DOWN:
                var placeLeft: Place = this.gameMap.findPlaceByPx(this.hero.y + 34 + speed,this.hero.x - 35);
                var placeRight: Place = this.gameMap.findPlaceByPx(this.hero.y + 34 + speed,this.hero.x + 34);

                if(!placeLeft && !placeRight) {
                    break;
                }
                
                if(placeLeft.isBlock && placeRight.isBlock) {
                    break;
                }

                if(placeLeft && placeLeft.isBlock) {
                    if(this.hero.x > (placeLeft.getPxPoint().x + 69)) {
                        var distance = this.hero.x - (placeLeft.getPxPoint().x + 69);
                        this.hero.x += 35 - distance > speed ? speed : 1;
                    }
                    break;
                }
                if(placeRight && placeRight.isBlock) {
                    if(this.hero.x < placeRight.getPxPoint().x) {
                        var distance = placeRight.getPxPoint().x - this.hero.x;
                        this.hero.x -= 35 - distance > speed ? speed : 1;
                    }
                    break;
                }

                this.hero.y += speed;
                break;
            case Constants.LEFT:
                var placeTop: Place = this.gameMap.findPlaceByPx(this.hero.y - 35,this.hero.x - 35 - speed);
                var placeBottom: Place = this.gameMap.findPlaceByPx(this.hero.y + 34,this.hero.x - 35 - speed);
                
                if(!placeTop && !placeBottom) {
                    break;
                }

                if(placeTop.isBlock && placeBottom.isBlock) {
                    break;
                }

                if(placeTop && placeTop.isBlock) {
                    if(this.hero.y > (placeTop.getPxPoint().y + 69)) {
                        var distance = this.hero.y - (placeTop.getPxPoint().y + 69);
                        this.hero.y += 35 - distance > speed ? speed : 1;
                    }
                    break;
                }
                if(placeBottom && placeBottom.isBlock) {
                    if(this.hero.y < placeBottom.getPxPoint().y) {
                        var distance = placeBottom.getPxPoint().y - this.hero.y;
                        this.hero.y -= 35 - distance > speed ? speed : 1;
                    }
                    break;
                }

                this.hero.x -= speed;
                break;
        }

    }
}
