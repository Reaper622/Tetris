var Local = function(){
	//游戏对象
	var game;
	//时间间隔
	var INTERVAL = 300;
	//定时器
	var timer = null;
	//计时器
	var timeCount = 0;
	//时间
	var time = 0;
	//绑定键盘事件
	var bindKeyEvent = function(){
		document.onkeydown = function(e){  //onkeydown  按下键盘后发生的事件
			if (e.keyCode == 38) {//使用e.KeyCode 取回按下的字符
				// up to spin
				game.rotate();
			} else if (e.keyCode == 39) {
				// to right
				game.right();
			} else if (e.keyCode == 40) {
				// to down
				game.down();
			} else if (e.keyCode == 37) {
				// to left
				game.left();
			} else if (e.keyCode == 32){
				//space
				game.fall();
				document.getElementById('landsound').src="sound/land.ogg";
			}
		}
	}
	//移动
	var move = function(){
		timeAdd();
		if(!game.down()){
		game.fixed();
		var lineX = game.checkClear();
		if(lineX){
			game.addScore(lineX);
		}
		var result = game.checkGameOver();
		if(result){
			document.getElementById('gameover').src="sound/gameover.mp3";
			alert("Game Over！当前分数：" + score.innerHTML);
			stop();
		} else {
			game.performNext(generateType(), generateDir()); //随机生成下一个新方块
			}
		}
	}
	//计时函数
	var timeAdd = function(){
		timeCount = timeCount + 1;
		if (timeCount == 5) {
			timeCount = 0;
			time = time + 1;
			game.setTime(time);
		}
	}
	//随机生成方块类
	var generateType = function(){
		return Math.ceil(Math.random() * 7) - 1;
	}
	//随机生成一个旋转次数
	var generateDir = function(){
		return Math.ceil(Math.random() * 4) - 1;
	}
	// 开始
	var start = function(){
		var doms = {
			gameDiv:document.getElementById('game'),
			nextDiv:document.getElementById('next'),
			timeDiv:document.getElementById('time'),
			scoreDiv:document.getElementById('score')
		}
		game = new Game();
		game.init(doms, generateType(), generateDir());
		bindKeyEvent();
		game.performNext(generateType(), generateDir());
		timer = setInterval(move, INTERVAL);
	}
	//结束
	var stop = function(){
		if(timer) {
			clearInterval(timer);  //关闭定时器
			timer = null;
		}
		document.onkeydown = null;
	}
	//导出函数
	this.start = start;
}