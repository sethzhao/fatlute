var loader = new PxLoader();
var preload = new life.myPlugin({
	// 加载时传出百分比
	onLoad : function(percentage){
		$(".loadingMode .count").text(percentage+"%");
		$(".wheelUp").animate({left: 252*percentage/100},10);
	},
	// 加载完成后执行的函数
	loadCompleteAmi : function(){
		$(".loadingMode").hide();
	},
	// 分享成功后执行的函数
	wxShareSuccess : function(){
		alert('分享成功');
	},	
	viewDirection : "vertical",
	playBgMusic : false,
	wxOpened : true,
	loadOptions : {
		loadImgAssets : [loadImgAssets1,loadImgAssets2], //加载的图片数组
		loadMusicAssets : loadMusicAssets, //加载的音乐数组
		loadMusicSrc : "assets/images/",
		loadImgSrc : "assets/images/"
	},
	wxOptions : {
		wxToken : "orlab",
		wxTitle1 : "油泥大战",
		wxTitle2 : "油泥大战",
		wxDesc : "体验斯柯达原装附件黑钻机油，清除油泥，畅享澎湃动力！", // 分享给朋友的描述
	}
});
preload.init();



