//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView:LoadingUI;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        var imgLoader:egret.ImageLoader = new egret.ImageLoader;
      //  imgLoader.once( egret.Event.COMPLETE, this.imgLoadHandler, this );

        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event:RES.ResourceEvent):void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event:RES.ResourceEvent):void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    private textfield:egret.TextField;
    private _touchStatus:boolean = false;              //当前触摸状态，按下时，值为true
    private _distance:egret.Point = new egret.Point();
    private _vcLocation:Array<egret.Point>;
    private _idxCurrLocation:number;
    private Cage_c:egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
    private Cage_b:egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
    private Cage_a:egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
    private pa=1;
    //
   /*     private imgLoadHandler( evt:egret.Event ):void
    {

        this.Cage_c.touchEnabled = true;
        this.Cage_c.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDown, this);
        this.Cage_c.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);
    }*/

    private mouseDown(evt:egret.TouchEvent)
    {
        console.log("Mouse Down.");
        this._touchStatus = true;
        this._distance.x = evt.stageX - this.Cage_c.x;
       // this._distance.y = evt.stageY - this.Cage_c.y;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);

    }

    private mouseMove(evt:egret.TouchEvent)
    {
        if( this._touchStatus )
        {   
            
            this.Cage_c.x = evt.stageX - this._distance.x;
            if(this.Cage_c.x<-100&&this.Cage_c.x>-350){
                egret.Tween.get( this.Cage_c ).to( {x:-this.stage.stageWidth,y:0}, 300, egret.Ease.sineIn );
               
            }
            if(this.Cage_c.x>0&&this.Cage_c.x<350){
                egret.Tween.get( this.Cage_c ).to( {x:0,y:0}, 300, egret.Ease.sineIn );
               
            }
            
            if( this.Cage_c.x>-540&&this.Cage_c.x<-400){
               
                egret.Tween.get( this.Cage_c ).to( {x:0,y:0}, 300, egret.Ease.sineIn );
                 
            }
            if(this.Cage_c.x<-this.stage.stageWidth){
                egret.Tween.get( this.Cage_c ).to( {x:-this.stage.stageWidth,y:0}, 300, egret.Ease.sineIn );
               
            }
           // this.Cage_c.y = evt.stageY - this._distance.y;
        }
       
    }

    private mouseUp(evt:egret.TouchEvent)
    {
        console.log("Mouse Up.");
        this._touchStatus = false;
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
    }
    //
    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene():void {
       
        this.Cage_a = new egret.DisplayObjectContainer();
        this.addChild(this.Cage_a);
        //
        var sky:egret.Bitmap = this.createBitmapByName("useone_jpg");
        //this.addChild(sky);
        var stageW:number = this.stage.stageWidth;
        var stageH:number = this.stage.stageHeight;
        sky.width = stageW;
        sky.height = stageH;

        var topMask = new egret.Shape();
        topMask.graphics.beginFill(0x666666, 0.5);
        topMask.graphics.drawRect(0, 0, stageW, 172);
        topMask.graphics.endFill();
        topMask.y = 33;
        //this.addChild(topMask);//heikuang

        var icon:egret.Bitmap = this.createBitmapByName("txa_png");
        //this.addChild(icon);
        icon.x = 26;
        icon.y = 33;
        //touxiang

        /*var line = new egret.Shape();
        line.graphics.lineStyle(2,0xffffff);
        line.graphics.moveTo(0,0);
        line.graphics.lineTo(0,117);
        line.graphics.endFill();
        line.x = 172;
        line.y = 61;
        this.addChild(line);*/


        var colorLabel = new egret.TextField();
        colorLabel.textColor = 0xffffff;
        colorLabel.width = stageW - 172;
       // colorLabel.textAlign = "center";
        colorLabel.text = "闫云龙";
        colorLabel.size = 28;
        colorLabel.x = 172;
        colorLabel.y = 80;
        //this.addChild(colorLabel);

        var textfield = new egret.TextField();
        //this.addChild(textfield);
        textfield.alpha = 0;
        textfield.width = stageW - 172;
        //textfield.textAlign = egret.HorizontalAlign.CENTER;
        textfield.size = 24;
        textfield.textColor = 0xffffff;
        textfield.x = 172;
        textfield.y = 135;
        this.textfield = textfield;
        //

        var label:egret.TextField = new egret.TextField();
        //this.addChild( label );
        label.width = 720;
        label.height = 1440;
        label.text = "拖动页面滑动到下一页→";
        label.textAlign = egret.HorizontalAlign.CENTER;
        label.verticalAlign = egret.VerticalAlign.MIDDLE;
        //
        this.Cage_a.addChild(sky);
        this.Cage_a.addChild(topMask);
        this.Cage_a.addChild(icon);
        this.Cage_a.addChild(colorLabel);
        this.Cage_a.addChild(textfield);
        this.Cage_a.addChild( label );
        //
        this.Cage_b = new egret.DisplayObjectContainer();
        var sky_b:egret.Bitmap = this.createBitmapByName("useb_jpg");
        //this.addChild(sky);
        var stageW:number = this.stage.stageWidth;
        var stageH:number = this.stage.stageHeight;
        sky_b.width = stageW;
        sky_b.height = stageH;
        this.Cage_b.addChild(sky_b);
        //
        var label_b:egret.TextField = new egret.TextField();
        label_b.width = 720;
        label_b.height = 860;
        label_b.verticalAlign = egret.VerticalAlign.MIDDLE;
        label_b.text = "没什么好写的，写写这个作业了。。\n刚开始留作业的时候感觉挺简单\n做的时候发现被老师骗了\n从教学上copy了许多代码\n其中好多都不懂。。。\n比如我直接拷贝用发现用不了\n但是我室友告诉我\n把imgLoadHandler里的代码粘到创建场景里\n就都好了\n可是这样不会出问题么。。\n缓动教学里splice是啥。。\n虽然不懂但还是用了。。。。。\n";
        this.Cage_b.addChild(label_b);
        label_b.textColor = 0xffff00;

        this.Cage_a.x = 0;
        this.Cage_a.y = 0;
        this.Cage_b.x = stageW;
        this.Cage_b.y = 0;
        //
        this.Cage_c = new egret.DisplayObjectContainer();
        this.Cage_c.addChild(this.Cage_a);
        this.Cage_c.addChild(this.Cage_b);
        this.addChild(this.Cage_c);
        this.Cage_c.touchEnabled = true;
        this.Cage_c.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDown, this);
        this.Cage_c.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);
        //
        /*       this._vcLocation = [
            new egret.Point( 0, 0 )
            ,new egret.Point( -stageW , 0 )
        ];
        
            this.stage.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
                this.launchTween();
            }, this );
        */
        //
        this._idxCurrLocation = -1;
        //


        //根据name关键字，异步获取一个json配置文件，name属性请参考resources/resource.json配置文件的内容。
        // Get asynchronously a json configuration file according to name keyword. As for the property of name please refer to the configuration file of resources/resource.json.
        RES.getResAsync("description_json", this.startAnimation, this)
    }
    /*private imgLoadHandler( evt:egret.Event ):void{
              
        /// 设计几个位置便于运动
        this._vcLocation = [
            new egret.Point( 0, 0 )
            ,new egret.Point( 888888 , 0 )
        ];
        this.stage.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
            this.launchTween();
        }, this );
    }*/
    private updateRdmLocation( bApply:boolean = false ):egret.Point {
        var vcIdxLocation = [0,1];
        if( this._idxCurrLocation != -1 ){     /// 避免与之前选择雷同
            vcIdxLocation.splice( this._idxCurrLocation, 1 );
        }
        var loc:egret.Point = this._vcLocation[ this._idxCurrLocation = vcIdxLocation[ Math.floor( Math.random()*vcIdxLocation.length ) ] ];
        if( bApply ){
            this.Cage_c.x = loc.x;
            this.Cage_c.y = loc.y;
        }
        return loc;
    }
   /* private launchTween(){
        var loc:egret.Point = this.updateRdmLocation();
        
        if(this._distance.x>0){
        egret.Tween.get( this.Cage_c ).to( {x:-this.stage.stageWidth,y:0}, 300, egret.Ease.sineIn );
        }
        if(this._distance.x<0){
        egret.Tween.get( this.Cage_c ).to( {x:this.stage.stageWidth,y:0}, 300, egret.Ease.sineIn );
        }
        
    }*/

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name:string):egret.Bitmap {
        var result = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    private startAnimation(result:Array<any>):void {
        var self:any = this;

        var parser = new egret.HtmlTextParser();
        var textflowArr:Array<Array<egret.ITextElement>> = [];
        for (var i:number = 0; i < result.length; i++) {
            textflowArr.push(parser.parser(result[i]));
        }

        var textfield = self.textfield;
        var count = -1;
        var change:Function = function () {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            var lineArr = textflowArr[count];

            self.changeDescription(textfield, lineArr);

            var tw = egret.Tween.get(textfield);
            tw.to({"alpha": 1}, 200);
            tw.wait(2000);
            tw.to({"alpha": 0}, 200);
            tw.call(change, self);
        };

        change();
    }

    /**
     * 切换描述内容
     * Switch to described content
     */
    private changeDescription(textfield:egret.TextField, textFlow:Array<egret.ITextElement>):void {
        textfield.textFlow = textFlow;
    }
}


