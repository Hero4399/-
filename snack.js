//创建一个工具类对象,存放一些常用的方法
var util = {
	//创建一个二维数组方法
	to2Array :function(arr,len1,len2){
		var temp = [];
		for (var i=0;i<len1;i++){
			temp.push([]);
		}
		for (var j=0; j<arr.length;j++){
			// console.log(arr.length)
			temp[parseInt(j/len1)][ j%len2] = arr[j];
			
		}
		return temp;
	},
	//创建随机数方法
	randomInt : function(from,to){
		return parseInt(Math.random()*(to-from+1) + from);
	}
}
//创建游戏对象
var game = {
	//游戏初始化
	init : function(){
			this.snackBody = [];   //创建数组存储蛇的身体
			this.div = document.getElementById("area");
			this.drawArea();       //调用绘制div方法
			this.initSnackBody();   //调用初始化蛇的身体方法
			this.drawSnackBody();   //调用绘制蛇身体的方法
			this.moveDirection = "right";   //初始化默认方向为右
			document.onkeydown = function(e){
				switch(e.keyCode){
				case 37:
				case 65:
					if(this.moveDirection == "right") return;
					this.moveDirection = "left";
					break;
				case 38:
                case 87:
                    if (this.moveDirection == "down") return;
                    this.moveDirection = "up";
                    break;
                case 39:
                case 68:
                    if (this.moveDirection == "left") return;
                    this.moveDirection = "right";
                    break;
                case 40:
                case 83:
                    if (this.moveDirection == "up") return;
                    this.moveDirection = "down";
                    break;
					
				}
			}.bind(this);   //绑定this,指向对象

	},
	drawArea : function(){
		for (var i=0; i<400; i++){
				var div = document.createElement("div");
				this.div.appendChild(div);
			}
		this.allArea = util.to2Array(this.div.children,20,20);   //获取到每个div的二维数组
	},
	initSnackBody : function(){
		var row = util.randomInt(0,19);
		var col = util.randomInt(2,16);
		this.snackBody.push([row,col]);
		this.snackBody.push([row,col -1]);
		this.snackBody.push([row,col -2]);

		this.putFood();

	},
	drawSnackBody : function(){
		var body = this.snackBody;
		for (var i=0;i<body.length;i++){
			var index1 = body[i][0];
			var index2 = body[i][1];
			this.allArea[index1][index2].style.backgroundColor = "blue"; //给蛇加背景色
		}
	},
	start : function(){
		this.move();     //开始即移动
	},
	move : function(){
		var body = this.snackBody;
		var that = this;   
		setTimeout(function step(){
			var firstPart;
			switch (that.moveDirection){
				case "right":
						firstPart = [body[0][0],body[0][1]+1];
						break;
				case  "left":
						firstPart = [body[0][0],body[0][1]-1];
						break;
				case  "up":
						firstPart = [body[0][0] - 1,body[0][1]];
						break;
				case   "down":
						firstPart = [body[0][0] + 1,body[0][1]];
						break;
			}
			if(that.isGameOver(firstPart)){
				var end = alert("游戏结束"+"您的得分是:"+(that.snackBody.length - 3)+"分");
				return;
			}
			body.unshift(firstPart);
			var poped = body.pop();
			that.allArea[poped[0]][poped[1]].style.backgroundColor = "";
			that.drawSnackBody();   //调用改变身体
			that.eatFood();
			setTimeout(step,1000/that.snackBody.length);
		},500)
	},
	isGameOver : function(firstPart){
		var body = this.snackBody;
		if(firstPart[0]<0 || firstPart[0]>19 || firstPart[1]<0 || firstPart[1]>19){
			return true;
		}
		for (var i=0; i<body.length; i++){
			if(firstPart[0] == body[i][0] && firstPart[1] == body[i][1]){
				return true;
				break;
			}
		}
		return false;
	},
	putFood : function(){
		var body = this.snackBody;

		this.food = [];
		while(true){
			var index1 = util.randomInt(0,19);
			var index2 = util.randomInt(0,19);
			var flag = true;
			for (var i=0;i<body.length;i++){
				if(body[i][0] == index1 && body[i][1] == index2){
					flag = false;
					break;
				}
			}
			if(flag){
				this.food.push(index1);
				this.food.push(index2);
				break;
			}
		}
		this.allArea[this.food[0]][this.food[1]].style.backgroundColor = "yellow";
	},
	eatFood : function(){
		var food = this.food;
		var snackHead = this.snackBody[0];
		if(snackHead[0] == food[0] && snackHead[1] == food[1]){
			this.snackBody.push(food);
			this.putFood();
		}
	}

}
game.init();
game.start();