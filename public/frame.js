(function  (window,jQuery,undefined {

//构造函数
function getIframe(newSetting){
this.setting={
iframeUrl:"",
iframeId:"",
iframeClass:"",
iframeEle:""
};
this.init(newSetting)
};
//初始化
getIframe.prototype.init=function(newSetting){
$.extend(this.setting,newSetting);
this.create();
};
    //动态创建
getIframe.prototype.create=function(){
   var iframeUrl=this.getUrl();
var iframeId=this.getId();
var iframeClass=this.getClass();
var iframeEle=this.getEle();
var myIframe='<iframe src="'+iframeUrl+'"id="'+iframeId+'"class="'+iframeClass+'"iframe>'
$(iframeEle).append(myIframe)
};
//设置数据
getIframe.prototype.getUrl=function(){
return this.setting.iframeUrl
};
getIframe.prototype.getClass=function(){
return this.setting.iframeClass
};
getIframe.prototype.getId=function(){
return this.setting.iframeId
};
getIframe.prototype.getEle=function(){
return this.setting.iframeEle
};
window.getIframe=getIframe;


})(window,jQuery)

//调用

var newSetting={
            iframeUrl:"https://",
iframeId:"1",
iframeClass:"1",
iframeEle:"body"
};
var newIframe=new getIframe(newSetting);