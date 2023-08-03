class ApiService {

    private urlloader: egret.URLLoader;

    public constructor() {
        this.urlloader = new egret.URLLoader();
        this.urlloader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadError, this);
    }
    
    private onLoadError(evt: egret.Event):void {
        alert("出现错误，请稍后再试");
        egret.MainContext.instance.stage.removeChild(Spinner.instance());
    }

    private static _instance: ApiService;

    public static instance(): ApiService {
        if(this._instance == null) {
            this._instance = new ApiService();
        }
        return this._instance;
    }

    public post(url:string, data:any = {}, callback:Function = null) {
        egret.MainContext.instance.stage.addChild(Spinner.instance());
        var urlreq: egret.URLRequest = new egret.URLRequest();
        urlreq.method = egret.URLRequestMethod.POST;
        var variables = [];
        for(var key in data){
            variables.push(key+'=' + data[key]);
        }
        if(variables.length){
            urlreq.data = new egret.URLVariables(variables.join('&'));
        }
        urlreq.url = url+'?_r='+Math.random();
        this.urlloader.load(urlreq);
        var complete = function() {
            egret.MainContext.instance.stage.removeChild(Spinner.instance());

            var result = JSON.parse(this.urlloader.data);
            if(callback){
                callback(result);
            }
                
            this.urlloader.removeEventListener(egret.Event.COMPLETE,complete,this);
        };
        
        this.urlloader.addEventListener(egret.Event.COMPLETE,complete,this);
    }


}
