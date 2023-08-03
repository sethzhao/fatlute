var Utils = (function () {
    function Utils() {
    }
    var d = __define,c=Utils,p=c.prototype;
    Utils.createBitmap = function (name) {
        var result = new egret.Bitmap();
        result.texture = RES.getRes(name);
        return result;
    };
    Utils.random = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    Utils.hitTest = function (obj1, obj2) {
        var rect1 = obj1.getBounds();
        var rect2 = obj2.getBounds();
        var point1 = obj1.localToGlobal(0, 0);
        rect1.x = point1.x;
        rect1.y = point1.y;
        var point2 = obj2.localToGlobal(0, 0);
        rect2.x = point2.x;
        rect2.y = point2.y;
        return rect1.intersects(rect2);
    };
    return Utils;
})();
egret.registerClass(Utils,'Utils');
