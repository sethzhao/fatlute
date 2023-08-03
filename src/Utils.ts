class Utils {
    
    public constructor() {
    }

    public static createBitmap(name: string): egret.Bitmap {
        var result: egret.Bitmap = new egret.Bitmap();
        result.texture = RES.getRes(name);
        return result;
    }

    public static random(min: number,max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    public static hitTest(obj1: egret.DisplayObject,obj2: egret.DisplayObject): boolean {
        var rect1: egret.Rectangle = obj1.getBounds();
        var rect2: egret.Rectangle = obj2.getBounds();
        
        var point1:egret.Point = obj1.localToGlobal(0, 0);
        rect1.x = point1.x;
        rect1.y = point1.y;
        
        var point2:egret.Point = obj2.localToGlobal(0, 0);
        rect2.x = point2.x;
        rect2.y = point2.y;
            
        return rect1.intersects(rect2);
    }
}
