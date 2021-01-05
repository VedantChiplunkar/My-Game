var bg;
var player,pr;
var shoot;
var bullet;
var c;
var bulletg;
var e;
var area;
var a1,a2,a3,a4;
var  enemyg;
var whealth;
var PLAY=1;
var END = 0;
var gameState=PLAY;
var gameover,restart;



function preload(){
bg = loadImage("images/Background.png")
pr = loadAnimation("images/SO_1.png","images/SO_2.png","images/SO_4.png")
shoot = loadAnimation("images/SFO-2.png")
e = loadAnimation("images/E1-removebg-preview.png","images/E2-removebg-preview.png","images/E3-removebg-preview.png","images/E4-removebg-preview.png","images/E5-removebg-preview.png","images/E6-removebg-preview.png","images/E7-removebg-preview.png","images/E8-removebg-preview.png")
}

function setup() {
  
  createCanvas(1200,800);
 // area=createSprite(745,400,160,160)
  a1=createSprite(835,400,10,160);
  a2=createSprite(650,400,10,160);
  a3=createSprite(745,320,160,10);
  a4=createSprite(745,480,160,10);
  c=0
  whealth=100;
  gameover=createSprite(600,400,50,50)
  restart = createSprite(600,500,50,50)
  gameover.visible=false
  restart.visible=false
  player=createSprite(740, 400, 20, 50);
  player.addAnimation("standing",pr)
  player.addAnimation("shooting",shoot)
  bulletg= new Group ();
  enemyg = new Group ();
edges = createEdgeSprites();
 // player.shapeColor="white"
 // player.rotation=180;
}

function draw() {
  background(bg);
  player.collide(a1)
  player.collide(a2)
  player.collide(a3)
  player.collide(a4)

  drawSprites();
  text("WALL HEALTH: "+ whealth+"/100",40,40)
  spawnenemy();

  if (enemyg.isTouching(a1)||enemyg.isTouching(a2)||enemyg.isTouching(a3)||enemyg.isTouching(a4)){
    
whealth=whealth-1


  }
if (whealth===0){
a1.visible=false
a2.visible=false
a3.visible=false
a4.visible=false

}
if (player.isTouching(enemyg)&&whealth<=0){
gameState=END;

}

  if (keyDown(UP_ARROW)){
   player.y=player.y-2
  player.rotation=0;
  c=1;
}
if (keyDown(DOWN_ARROW)){
  player.y=player.y+2
 player.rotation=180;
 c=2;
}
if (keyDown(LEFT_ARROW)){
  player.x=player.x-2
 player.rotation=270;
 c=3;
}
if (keyDown(RIGHT_ARROW)){
  player.x=player.x+2
player.rotation=90;
  c=4;
}
if (keyDown("space")&&c===1){
  player.changeAnimation("shooting",shoot)
 spawnbullet();
 bulletg.setSpeedAndDirectionEach(8,270)
 if (bulletg.isTouching(enemyg)){
  enemyg.destroyEach();
  }
 bulletg.remove(bullet)
}
if (keyDown("space")&&c===2){
  player.changeAnimation("shooting",shoot)
 spawnbullet();
 bulletg.setSpeedAndDirectionEach(8,90)
 if (bulletg.isTouching(enemyg)){
  enemyg.destroyEach();
  }
 bulletg.remove(bullet)
}
if (keyDown("space")&&c===3){
  player.changeAnimation("shooting",shoot)
 spawnbullet();
 bulletg.setSpeedAndDirectionEach(8,180)
 if (bulletg.isTouching(enemyg)){
  enemyg.destroyEach();
  }
bulletg.remove(bullet)
}
if (keyDown("space")&&c===4){
  player.changeAnimation("shooting",shoot)
 spawnbullet();
 bulletg.setSpeedAndDirectionEach(8,0)
 if (bulletg.isTouching(enemyg)){
  enemyg.destroyEach();
  }
 bulletg.remove(bullet)
}
if (gameState===END){
  enemyg.destroyEach();
  //player.changeAnimation()
  gameover.visible=true
  restart.visible=true
}
}

function spawnbullet(){
  
  bullet=createSprite(740,400,8,8)
  bullet.shapeColor="red"
  bullet.x=player.x
  bullet.x=bullet.x+8
  bullet.y=player.y
 // bullet.rotation=player.rotation
  bullet.lifetime=50;
  bulletg.add(bullet)

}

function spawnenemy(){
  if (frameCount%80===0){
    var enemy = createSprite(0,400,30,40)
    enemy.addAnimation("walking",e)
    var rand=Math.round(random(1,4))
    if (rand===1){
      enemy.x=0;
      enemy.y=random(330,480)
      enemy.velocityX=3;
      enemy.rotation=270;
    }
    if (rand===2){
      enemy.x=1200;
      enemy.y=random(330,480)
      enemy.velocityX=-3
      enemy.rotation=90;
    }
    if (rand===3){
      enemy.x=random(680,780);
      enemy.y=0;
      enemy.velocityY=3;
      enemy.rotation=0
    }
    if (rand===4){
      enemy.x=random(680,780);
      enemy.y=800;
      enemy.velocityY=-3
      enemy.rotation=180
    }
    

    enemyg.add(enemy);
  }
  
}



