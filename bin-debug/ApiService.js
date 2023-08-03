var ApiService = (function () {
    function ApiService() {
        this.urlloader = new egret.URLLoader();
        this.urlloader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadError, this);
    }
    var d = __define,c=ApiService,p=c.prototype;
    p.onLoadError = function (evt) {
        alert("出现错误，请稍后再试");
        egret.MainContext.instance.stage.removeChild(Spinner.instance());
    };
    ApiService.instance = function () {
        if (this._instance == null) {
            this._instance = new ApiService();
        }
        return this._instance;
    };
    p.post = function (url, data, callback) {
        if (data === void 0) { data = {}; }
        if (callback === void 0) { callback = null; }
        egret.MainContext.instance.stage.addChild(Spinner.instance());
        var urlreq = new egret.URLRequest();
        urlreq.method = egret.URLRequestMethod.POST;
        var variables = [];
        for (var key in data) {
            variables.push(key + '=' + data[key]);
        }
        if (variables.length) {
            urlreq.data = new egret.URLVariables(variables.join('&'));
        }
        urlreq.url = url + '?_r=' + Math.random();
        this.urlloader.load(urlreq);
        var complete = function () {
            egret.MainContext.instance.stage.removeChild(Spinner.instance());
            var result = JSON.parse(this.urlloader.data);
            if (callback) {
                callback(result);
            }
            this.urlloader.removeEventListener(egret.Event.COMPLETE, complete, this);
        };
        this.urlloader.addEventListener(egret.Event.COMPLETE, complete, this);
    };
    return ApiService;
})();
egret.registerClass(ApiService,'ApiService');
