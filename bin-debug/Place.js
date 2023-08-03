var Place = (function () {
    function Place(y, x) {
        this.size = 70;
        this.x = x;
        this.y = y;
    }
    var d = __define,c=Place,p=c.prototype;
    p.getPxPoint = function () {
        return new egret.Point(this.x * this.size, this.y * this.size);
    };
    return Place;
})();
egret.registerClass(Place,'Place');
