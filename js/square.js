var Square = function () {
	//方块数据
	this.data = [
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0]
	];
	//原点
	this.origin = {
		x: 0,
		y: 0
	}
	//方向
	this.dir = 0;
}
Square.prototype.canRotate = function(isValid){//是否可以旋转
	var d = (this.dir + 1) % 4;
	var test = [
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0]
		];
	for (var i = 0; i < this.data.length; i++) {
		for (var j = 0; j < this.data.length; j++) {
			test[i][j] = this.rotates[d][i][j];
		}
	}
	return isValid(this.origin, test);
}
Square.prototype.rotate = function(num){//旋转
	if(!num) num = 1;
	this.dir = (this.dir + num) % 4;
	for (var i = 0; i < this.data.length; i++) {
		for (var j = 0; j < this.data.length; j++) {
			this.data[i][j] = this.rotates[this.dir][i][j];
		}
	}
}
Square.prototype.canDown = function(isValid){//是否可以下降
	var test = {};
	test.x = this.origin.x + 1;
	test.y = this.origin.y;
	return isValid(test, this.data);
}
Square.prototype.down = function(){
	this.origin.x = this.origin.x + 1;
}
Square.prototype.canLeft = function(isValid){//是否可以向左
	var test = {};
	test.x = this.origin.x;
	test.y = this.origin.y - 1;
	return isValid(test, this.data);
}
Square.prototype.left = function(){//向左移动
	this.origin.y = this.origin.y - 1;
}
Square.prototype.canRight = function(isValid){//是否可以向右
	var test = {};
	test.x = this.origin.x;
	test.y = this.origin.y + 1;
	return isValid(test, this.data);
}
Square.prototype.right = function(){//向右移动
	this.origin.y = this.origin.y + 1;
}