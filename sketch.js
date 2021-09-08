var arr = [1,2,3];
console.log(arr);
console.log(arr[1]);
console.log(arr[0]);

arr.push(90);
console.log(arr);

var arr1 = ['Snehal',1,true];
console.log(arr1);
console.log(arr1[2]);

arr1.pop();
console.log(arr1);


var arr2 = [[1,2],[3,5],[7,9]];
console.log(arr2);
console.log(arr2[2]);
console.log(arr2[2][1]);



const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world;
var canvas, angle, tower, ground, cannon;
var cannonBall;
var balls = [];
var boat;
var boats = [];



function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");

}

function setup() {
  canvas = createCanvas(1200,600);
  engine = Engine.create();
  world = engine.world;
  angle = -PI / 4;
  ground = new Ground(0, height - 1, width * 2, 1);
  tower = new Tower(150, 350, 160, 310);
  cannon = new Cannon(180, 110, 100, 50, angle);

}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);

  

  Engine.update(engine);
  ground.display();
  
  cannon.display();
  tower.display();

  for(var i = 0; i<balls.length ; i++){
    showCannonBalls(balls[i],i);
    collisionWithBoat(i);
   
  }
 
  showBoats();
}


function keyPressed(){
  if(keyCode === DOWN_ARROW){
    cannonBall = new CannonBall(cannon.x, cannon.y);
    balls.push(cannonBall);
  }
}

function showCannonBalls(ball,index){
  ball.display();

  if(ball.body.position.x >= width || ball.body.position.y >=height-50){
    ball.remove(index);
  }
}

function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    balls[balls.length-1].shoot();
  }
}

function showBoats(){
  if (boats.length>0){
    if (boats[boats.length-1] === undefined || boats[boats.length-1].body.position.x<width-300){
      var positions = [-130, -100, -120, -80];
      var position = random(positions);
      var boat = new Boat (width, height-100, 200, 200, position);
      boats.push(boat);
    }
    
    for (var i = 0; i<boats.length; i++){

      Matter.Body.setVelocity(boats[i].body, {
        x : -0.9, 
        y : 0
      })
    
      boats[i].display();
    }
  }
  else {
    var boat = new Boat (width, height-100, 200, 200, position);
    boats.push(boat);
  }
} 

function collisionWithBoat(index){
  for (var i = 0; i<boats.length; i++){
    if(balls[index] !== undefined && boats[i] !== undefined){
     var collision = Matter.Sat.collides(balls[index].body, boats[i].body);
     if (collision.collided){
       boats[i].remove[i];
       
       Matter.World.remove(World, balls[index].body);
       delete balls(index);
     }
    }
  }

}