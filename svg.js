/**
 *
 */

class SVG {
	constructor(ele,height,width){
		this.ele = ele;
		this.height = height;
		this.width = width;
		this._init(ele);
	}
	_init(ele) {
		this._initSvg();
		this._initTools();
	}
	_initSvg() {
		this.svgContainer = $("<div style='position: absolute;width:100%;height:100%;overflow:hidden;'></div>");
		this.svgContainer.on('mousewheel DOMMouseScroll',(e) => {
			e.preventDefault();
			var wheel = e.originalEvent.wheelDelta || -e.originalEvent.detail;
	        var delta = Math.max(-1, Math.min(1, wheel) );
	        if(delta<0){//向下滚动
	        	this.zoomout();
	        } else {//向上滚动
	        	this.zoomin();
	        }
		})
		this.ele.append(this.svgContainer);
	}
	_initTools() {
		let tools = $('<div id="div-switch-btn-left" class="noprint" style="margin:2px;position: absolute;z-index: 10;"></div>');
		tools.append(this._ToggleEle());
		tools.append(this._ButtonGroups());
		var self = this;
		window.onresize = function () {
			self._toggleFullScreen();
		}
		this.ele.append(tools);
	}
	_ToggleEle() {
		let toggleDiv = $('<div id="div-switch-btn-left" style="float:left;"></div>');
		let toggleButton = $('<button type="button" class="btn btn-default" style="padding:0;margin:0;height:60px;font-size: 18px">'
			+ '</button>');
		var chevronLeft = $('<span class="glyphicon glyphicon-chevron-left" id="span-glyphicon-chevron-left" style="display:none;"></span>');
		toggleButton.append(chevronLeft);
		var chevronRight = $('<span class="glyphicon glyphicon-chevron-right" id="span-glyphicon-chevron-right" ></span>');
		toggleButton.append(chevronRight);
		toggleButton.click((e) => {
			chevronLeft.toggle();
			chevronRight.toggle();
			this.buttonsGroups.toggle();
		});
		toggleDiv.append(toggleButton);
		return toggleDiv;
	}
	_ButtonGroups(){
		let buttonsGroups = $('<div id="div-switch-btn" style="float: left; height: 60px; margin-left: 5px; display: none;"></div>');
		buttonsGroups.append(this._ZoominButton());
		buttonsGroups.append(this._ZoomoutButton());
		buttonsGroups.append(this._RepeatButton());
		buttonsGroups.append(this._FullScreenButton());
		buttonsGroups.append(this._ExitFullScreenButton());
		this.buttonsGroups = buttonsGroups;
		return buttonsGroups;
	}
	_ZoominButton() {
		let zoomin = $('<button type="button" class="btn btn-default" style="padding:5px 5px;margin:0 2px;height:60px;">'
		        + '<span class="glyphicon glyphicon-zoom-in" style="font-size: 25px"></span>'
		        + '</br>图形放大'
		        + '</button>');
		zoomin.click((e) => {
			this.zoomin();
		})
		return zoomin;
	}
	_ZoomoutButton() {
		let zoomout = $('<button type="button" class="btn btn-default" style="padding:5px 5px;margin:0 2px;height:60px;">'
		        + '<span class="glyphicon glyphicon-zoom-out" style="font-size: 25px"></span>'
		        + '</br>图形缩小'
		        + '</button>');
		zoomout.click((e) => {
			this.zoomout();
		})
		return zoomout;
	}
	_RepeatButton() {
		let repeat = $('<button type="button" class="btn btn-default" style="padding:5px 5px;margin:0 2px;height:60px;">'
		        + '<span class="glyphicon glyphicon-repeat" style="font-size: 25px"></span>'
		        + '</br>原始尺寸'
		        + '</button>');
		repeat.click((e) => {
			this.repeat();
		})
		return repeat;
	}
	_FullScreenButton() {
		let fullScreenButton = $('<button type="button" class="btn btn-default" style="padding:5px 5px;margin:0 2px;height:60px;">'
		        + '<span class="glyphicon glyphicon-resize-full" style="font-size: 25px"></span>'
		        + '</br>全屏查看'
		        + '</button>');
		fullScreenButton.click((e) => {
			this.fullScreen();
		})
		this.fullScreenButton = fullScreenButton;
		return fullScreenButton;
	}
	fullScreen(){
		var elem = this.ele[0];
		if (elem.webkitRequestFullScreen) {
	        elem.webkitRequestFullScreen();
	    } else if (elem.mozRequestFullScreen) {
	        elem.mozRequestFullScreen();
	    } else if (elem.requestFullScreen) {
	        elem.requestFullscreen();
	    }
	}
	_toggleFullScreen(){
		this.fullScreenButton.toggle();
		this.exitFullScreenButton.toggle();
		this.resetSize();
	}
	exitFullScreen(){
		var elem = document;
		if (elem.webkitCancelFullScreen) { //Chrome等
	        elem.webkitCancelFullScreen();
	    } else if (elem.mozCancelFullScreen) { //FireFox
	        elem.mozCancelFullScreen();
	    } else if (elem.cancelFullScreen) {
	        elem.cancelFullScreen();
	    } else if (elem.exitFullscreen) { //W3C
	        elem.exitFullscreen();
	    }
	}
	_ExitFullScreenButton() {
		let exitFullScreenButton = $('<button type="button" class="btn btn-default" style="display:none;padding:5px 5px;margin:0 2px;height:60px;">'
		        + '<span class="glyphicon glyphicon-resize-small" style="font-size: 25px"></span>'
		        + '</br>退出全屏'
		        + '</button>');
		exitFullScreenButton.click((e) => {
			this.exitFullScreen();
		})
		this.exitFullScreenButton = exitFullScreenButton;
		return exitFullScreenButton;
	}
	load(svg,callback){
		this.svgContainer.load(svg,()=>{
			this.svgContainer.find('svg').mousedown((e) => {
			    // e.pageX
				if(e.button==0){
				    //alert(distenceX)
				    // alert(positionDiv.left);
					this.svgContainer.find('svg').css({
			        	'cursor':'pointer'
			        })
					console.log(this.svgContainer.find('svg').offset().left + "   " + this.svgContainer.find('svg').css('left'));
					let left = this.svgContainer.find('svg').css('left');
					let top = this.svgContainer.find('svg').css('top');

				    var distenceX = e.clientX - left.substr(0,left.length - 2);
				    var distenceY = e.clientY - top.substr(0,top.length - 2);
				    this.svgContainer.find('svg').mousemove((e) => {
				        var x = e.clientX - distenceX;
				        var y = e.clientY - distenceY;
				        let leftFlag = this.svgContainer.find('svg').css('left');
						let topFlag = this.svgContainer.find('svg').css('top');
				        if(x > 0 || (x + this.svgContainer.find('svg').width()) < this.svgContainer.width()){
				        	x = leftFlag;
				        }
				        if(y > 0 || (y + this.svgContainer.find('svg').height()) < this.svgContainer.height()){
				        	y = topFlag;
				        }
				        this.svgContainer.find('svg').css({
				        	'left':x,
				        	'top':y,
				        	'position':'absolute'
				        })
				    });
				    this.svgContainer.find('svg').mouseup((e) => {
				    	this.svgContainer.find('svg').unbind('mousemove');
				    	this.svgContainer.find('svg').unbind('mouseup');
				    	this.svgContainer.find('svg').css({
				        	'cursor':'default'
				        })
				    });
				}
			});
			if(callback)
				callback();
		});
	}
	resetSize(){
		this.svgContainer.find('svg').height("100%");
		this.svgContainer.find('svg').width("100%");
		this.svgContainer.find('svg').css({
        	'left':0,
        	'top':0,
        	'position':'absolute'
        })
	}
	zoomin(X,Y) {
		this.setSvgSize(1.1);
		this.setSvgCoordinate(X,Y);
	}
	setSvgCoordinate(X,Y){
		const svgheight = this.svgContainer.find('svg').height();
		const svgwidth = this.svgContainer.find('svg').width();
		const containerheight = this.svgContainer.height();
		const containerwidth = this.svgContainer.width();
		var x,y;
		if(X&&Y){
			x = X * ( 1 - svgwidth / containerwidth);
			y = Y * (1 - svgheight / containerheight);
		} else {
			x = (containerwidth - svgwidth)/2;
			y = (containerheight - svgheight)/2;
		}
		this.svgContainer.find('svg').css({
        	'left':x,
        	'top':y,
        	'position':'absolute'
        })
	}
	setSvgSize(num){
		let height = this.svgContainer.find('svg').height();
		let width = this.svgContainer.find('svg').width();
		this.svgContainer.find('svg').height(Number.parseInt(height*num));
		this.svgContainer.find('svg').width(Number.parseInt(width*num));
	}
	zoomout(X,Y) {
		if(this.svgContainer.width()/this.svgContainer.find('svg').width() > 2)
			return;
		this.setSvgSize(0.95);
		this.setSvgCoordinate(X,Y);
	}
	repeat(X,Y) {
		this.resetSize();
		//this.setSvgCoordinate(X,Y);
	}
}

export { SVG }
