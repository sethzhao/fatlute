class GameMap extends egret.DisplayObjectContainer{
    public places: Place[][];
    private placeLayer: egret.DisplayObjectContainer;
    private heroLayer: egret.DisplayObjectContainer;
    private oilLayer: egret.DisplayObjectContainer;
    private fatluteLayer: egret.DisplayObjectContainer;
    public roadPlaces: Place[];
    
    public constructor(mapId:number) {
        super();
        
        this.createViews(mapId);
        this.parsePlaces(mapId);
        
        this.placeLayer = new egret.DisplayObjectContainer();
        this.placeLayer.x = 60;
        this.placeLayer.y = 118;
        this.addChild(this.placeLayer);
        
        this.heroLayer = new egret.DisplayObjectContainer();
        this.oilLayer = new egret.DisplayObjectContainer();
        this.fatluteLayer = new egret.DisplayObjectContainer();
        this.placeLayer.addChild(this.fatluteLayer);
        this.placeLayer.addChild(this.oilLayer);
        this.placeLayer.addChild(this.heroLayer);
	}
	
    private createViews(mapId: number){
        var mapBitmap = Utils.createBitmap('map' + mapId);
        this.addChild(mapBitmap);
	}
	
    private parsePlaces(mapId: number){
        var maps = RES.getRes('maps');
        var map = maps['map'+mapId];
        this.places = [];
        this.roadPlaces = [];
        for(var i = 0;i < map.length;i++) {
            var placesLine = [];
            this.places.push(placesLine);
            for(var j = 0;j < map[i].length;j++) {
                var place = new Place(i,j);
                if(map[i][j] != 0) {
                    place.isBlock = true;
                } else {
                    place.isBlock = false;
                    this.roadPlaces.push(place);
                }
                placesLine.push(place);
            }
        }
    }
    
    public addChildInPlace(child: egret.DisplayObject,place:Place){
        var point = place.getPxPoint();
        child.x = point.x + 35;
        child.y = point.y + 35;
        if(egret.is(child, 'Hero')){
            this.heroLayer.addChild(child);
        } else if(egret.is(child,'Oil')){
            this.oilLayer.addChild(child);
        } else if(egret.is(child,'Fatlute')){
            this.fatluteLayer.addChild(child);
        }else{
            this.placeLayer.addChild(child);
        }
    }
    
    public addChildInPlaceByYX(child: egret.DisplayObject,y:number, x:number){
        var place = this.places[y][x];
        this.addChildInPlace(child,place);
    }
    
    public findPlace(y: number,x: number): Place {
        if(y < 0 || y > 14 || x < 0 || x > 9) {
            return null;
        }
        return this.places[y][x];
    }
    
    public findPlaceByPx(pxY: number,pxX: number): Place{
        var y = Math.floor(pxY / 70);
        var x = Math.floor(pxX / 70);
        if(y < 0 || y > 14 || x < 0 || x > 9){
            return null;
        }
        return this.places[y][x];
    }
    
    public findBlock(pxY: number,pxX: number): Place {
        var place = this.findPlaceByPx(pxY,pxX);
        if(!place || !place.isBlock){
            return null;
        }
        return place;
    }
    
    public findRoads(y: number,x: number, type: string): Place[] {
        var roads = [];
        
        while(true){
            var place = null;
            if(type == 'up'){
                place = this.findPlace(y - 1 - roads.length,x);
            }
            if(type == 'right') {
                place = this.findPlace(y,x + 1 + roads.length);
            }
            if(type == 'down') {
                place = this.findPlace(y + 1 + roads.length,x);
            }
            if(type == 'left') {
                place = this.findPlace(y,x - 1 - roads.length);
            }
            if(!place || place.isBlock){
                break;
            }
            roads.push(place);
        }
        
        return roads;
    }
    
    public randomSafePlace(heroPlace: Place): Place{
        var safePlaces = [];
        for(var i = 0;i < this.roadPlaces.length;i++){
            var place = this.roadPlaces[i];
            if(Math.abs(place.x - heroPlace.x) > 5 || Math.abs(place.y - heroPlace.y) > 5){
               safePlaces.push(this.roadPlaces[i]); 
            }
        }
        var randomIndex = Math.floor(Math.random() * safePlaces.length);
        return safePlaces[randomIndex];
    }
}
