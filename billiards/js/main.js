void function(window,undefined){
	
    //创建世界 设定规则
    var createWorld = function(){
        var worldAABB = new b2AABB();
        worldAABB.minVertex.Set(-1000, -1000);     //最小顶点
        worldAABB.maxVertex.Set(1000, 1000);       //最大顶点
        var gravity = new b2Vec2(0, 0);            //重力
        var doSleep = true;
        var world = new b2World(worldAABB, gravity, doSleep);
        return world;
    };
    
    //创建Box
    var createBox = function(world, x, y, width, height, fixed){
        if (typeof(fixed) == 'undefined')
            fixed = false;
        var boxSd = new b2BoxDef();
        if (fixed) boxSd.density = 1;   //密度
        boxSd.extents.Set(width, height);
        boxSd.restitution =0.8;    //弹性
        boxSd.friction =1;        //摩擦力

        var boxBd = new b2BodyDef();
        boxBd.AddShape(boxSd);
        boxBd.position.Set(x, y);

        var obj = world.CreateBody(boxBd);
        return obj;
    };
    
    //创建球
    var createBall = function(world, v, r, d){
        var ballSd = new b2CircleDef();
        ballSd.radius = r;
        ballSd.density = d;
        ballSd.restitution = 0.9;
        ballSd.friction = 0.1;

        var ballBd = new b2BodyDef();
        ballBd.position.set(v);
        ballBd.AddShape(ballSd);

        var obj = world.CreateBody(ballBd);
        obj.m_linearDamping =0.99;
        obj.m_angularDamping =0.995;
        return obj;
    };
    
    //时间步
    var step = function(){
        var timeStep = 1.0 / 60;
        var iteration = 10;
        world.Step(timeStep, iteration);
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        drawWorld(world, ctx);
        setTimeout(step, 10);  //采用setTimeout调用自身  相当于setInterval  即每10ms调用一次step
    };
    
    
    //画全世界
    var drawWorld = function draw(world, context){
    	
        //画box和ball
        for (var b = world.m_bodyList; b; b = b.m_next) {
            for (var s = b.GetShapeList(); s!= null; s = s.GetNext()) {
                drawShape(s, context);
                if(s.m_type==b2Shape.e_circleShape && isout(s.m_position)==1 && s.m_radius==15)
                {
                	world.DestroyBody(b);
                }
                if(s.m_type==b2Shape.e_circleShape  && s.m_radius==15.000000001 && b.m_next.m_mass == 0)
                {
                	var r=confirm("你赢了！！！");
                	if(r==ture)
                	{
                		location.reload();
                	}else{
                		window.close();
                		window.open=null;
                	}
                	
                }
                    
            }
        }
        //画球杆
        if(isStriking){
            ctx.beginPath();
            ctx.moveTo(ballArm.tail.x,ballArm.tail.y);
            ctx.lineTo(ballArm.head.x,ballArm.head.y);
            ctx.lineWidth = 8;
            ctx.stroke();
            ctx.lineWidth = 1;
        }
    };
    
    //判断球是否被打出界（即打进）
    var isout = function(pos){
    	if(pos.x>30 && pos.x<770 && pos.y>30 && pos.y<370)
    	   return 0;
    	return 1;
    }
    
    //画各物体
    var drawShape = function(shape, context){
        context.strokeStyle = '#000';     
        context.beginPath();
        switch (shape.m_type) {
            case b2Shape.e_circleShape:{
            	  //画ball
                var circle = shape;
                var pos = circle.m_position;
                var r = circle.m_radius;
                var segments = 16.0;
                var theta = 0.0;
                //var dtheta = 2.0 * Math.PI / segments;
                 
                // draw circle
                context.arc(pos.x, pos.y, r, 0, Math.PI * 2, false);
					      //var bg=new Image();
	               // bg.src='img/ball_bg.jpg';
	                //bg.onload=function(){
		            //    context.fillStyle=context.createPattern(bg,"repeat");
		            // }
					      if(shape.m_radius==15.000000001){
						       context.fillStyle="#fff";
					      }
					      else{
						       context.fillStyle = '#da2e06';
						    }		
					      context.fill();
                //draw radius
                context.moveTo(pos.x, pos.y);
                var ax = circle.m_R.col1;
                var pos2 = new b2Vec2(pos.x + r * ax.x, pos.y + r * ax.y);
                context.lineTo(pos2.x, pos2.y);
				
            }
                break;
            case b2Shape.e_polyShape:{
            	  //画box
                var poly = shape;
                var tV = b2Math.AddVV(poly.m_position, b2Math.b2MulMV(poly.m_R, poly.m_vertices[0]));
                context.moveTo(tV.x, tV.y);
                for(var i = 0; i < poly.m_vertexCount; i++) {
                    var v = b2Math.AddVV(poly.m_position, b2Math.b2MulMV(poly.m_R, poly.m_vertices[i]));
                    context.lineTo(v.x, v.y);
                }
                context.lineTo(tV.x, tV.y);
				        context.fillStyle ='#5d4000'; 
				        context.fill();
            }
                break;
        }
        context.stroke();
    };
    
    //定义用到的变量
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var world = createWorld();
    var canvasWidth = parseInt(canvas.width);
    var canvasHeight = parseInt(canvas.height);
    var canvasTop = parseInt(canvas.offsetTop);
    var canvasLeft = parseInt(canvas.offsetLeft);
    var player;                       //主球
    var isStriking = false;           //是否正在击打（决定是否画球杆）
    var ballArm = { 
        head:{
            x:null,
            y:null
        },
        tail:{
            x:null,
            y:null
        }
    };                                //球杆  由头尾两点组成
    //球杆移动
    var ballArmMove = function(e){
        var pt = new b2Vec2(e.clientX - canvasLeft, e.clientY - canvasTop);//点击位置
        var pp = player.m_position.clone();//白球位置
        var pd = pt.clone().sub(pp).norm();//斜率
        var pb = pd.clone().scale(-220).add(pp);
        var ph = pd.clone().scale(-20).add(pp);
        ballArm.head = ph;
        ballArm.tail = pb;
    };
    
    //程序入口函数
    var init = function(window,undefined){
    	

        //创建球
        createBall(world, new b2Vec2(520, 180), 15,1);

        createBall(world, new b2Vec2(540, 170), 15,1);
        createBall(world, new b2Vec2(540, 190), 15,1);

        createBall(world, new b2Vec2(560, 160), 15,1);
        createBall(world, new b2Vec2(560, 180), 15,1);
        createBall(world, new b2Vec2(560, 200), 15,1);

        createBall(world, new b2Vec2(580, 150), 15,1);
        createBall(world, new b2Vec2(580, 170), 15,1);
        createBall(world, new b2Vec2(580, 190), 15,1);
        createBall(world, new b2Vec2(580, 210), 15,1);

        createBall(world, new b2Vec2(600, 140), 15,1);
        createBall(world, new b2Vec2(600, 160), 15,1);
        createBall(world, new b2Vec2(600, 180), 15,1);
        createBall(world, new b2Vec2(600, 200), 15,1);
        createBall(world, new b2Vec2(600, 220), 15,1);
        
        //创建白球
        player = createBall(world, new b2Vec2(200, 180), 15.000000001,1);
        player.m_linearVelocity = new b2Vec2(0, 0);       //设置线速度
        
         //创建box
        createBox(world, 220, 0, 160, 30);
        createBox(world, 220, 400, 160, 30);
        createBox(world, 0, 200, 30, 150);

        createBox(world, 800, 200, 30, 150);
        createBox(world, 580, 0, 160, 30);
        createBox(world, 580, 400, 160, 30);

        

        //鼠标按下监听
        canvas.addEventListener("mousedown", function(e) {
            ballArmMove(e);
            isStriking = true;
            canvas.addEventListener("mousemove", ballArmMove, true);
        }, true);
        
        //鼠标弹起监听
        canvas.addEventListener("mouseup", function(e) {
            var pt = new b2Vec2(e.clientX - canvasLeft, e.clientY - canvasTop);//点击位置
            var pp = player.m_position.clone();   //白球位置
            var pd = pt.clone().sub(pp).norm();   //斜率
            var pb = pd.clone().scale(15).add(pp);

            player.WakeUp();
            player.m_position = pb;
            player.SetLinearVelocity(pd.scale(1000));
            player.m_rotation = pd.theta();

            canvas.removeEventListener("mousemove", ballArmMove, true);
            isStriking = false;
        }, true);
        
        //启动时间步
        step();
    }(window);
}(window);