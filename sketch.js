var backG, backImage;
var windowDoorImage, windowClimberImage;
var ghost, ghostImage;
var gameState;
const PLAY=0;
const END=1;
var windowDoorGroup, windowClimberGroup, windowBaseGroup;

function preload(){
  backImage=loadImage("tower.png");
  windowDoorImage=loadImage("door.png");
  windowClimberImage=loadImage("climber.png");
  ghostImage=loadImage("ghost-standing.png");
}

function setup(){
  createCanvas(600, 600);
  
  background=createSprite(300,350,20,20);
  background.addImage(backImage);

  ghost=createSprite(200,300,100,50);
  ghost.addImage(ghostImage);
  ghost.scale=0.4;
  
  windowDoorGroup=new Group();
  windowClimberGroup=new Group();
  windowBaseGroup=new Group();
  
  gameState=PLAY;
  
}


function windowImage(){
  
  if(gameState===PLAY){
  
  if(frameCount%240==0){
    var x=Math.round(random(110, 490));
  var windowDoor=createSprite(x, 0, 50, 30);
  windowDoor.addImage(windowDoorImage);
  windowDoor.velocityY=1;
    windowDoor.depth=ghost.depth-10;
    windowDoor.lifeTime=600;
    
    windowDoorGroup.add(windowDoor);
    
    var windowClimber=createSprite(x,48, 20, 30);
    windowClimber.addImage(windowClimberImage);
    windowClimber.velocityY=1;
        windowClimber.lifeTime=600;
    
    windowClimberGroup.add(windowClimber);
    
    var windowBase=createSprite(x, 59, 100, 7);
    windowBase.velocityY=1;
    windowBase.shapeColor="red";
        windowBase.lifeTime=600;
    
    windowBaseGroup.add(windowBase);
    
  }
}
  

  
}

function draw(){
  
  
 
  
  if(gameState===PLAY){
    ghost.visible=true;

    background.velocityY=1;
  
  if(background.y>600){
    background.y=height/2;
  }
  

  windowImage();
  
  if(keyDown("space")){
      ghost.velocityY = -10;
    }
    
    ghost.velocityY = ghost.velocityY + 0.8;
    
     if(keyDown("left_arrow")){
      ghost.x = ghost.x - 3;
    }
    
    if(keyDown("right_arrow")){
      ghost.x = ghost.x + 3;
    }
     if(windowClimberGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }
    ghost.depth +=1;
    
    if(windowBaseGroup.isTouching(ghost)||ghost.y>600){
     ghost.visible=false;
      windowBaseGroup.destroyEach();
      windowDoorGroup.destroyEach();
      windowClimberGroup.destroyEach();
  //  background.destroy(); 
    //  ghost.y=300;
      gameState=END;
      
    }
    
     drawSprites();
    console.log(gameState);
  } else  if(gameState===END){

    
    fill("yellow");
    text("Game Over", 230,250,textSize(20));
      text("Press R To restart", 230, 300, textSize(20));
      
    
      if(keyDown("r")){
       
   
    console.log("restart");
        
    
         
        // ghost.velocityY=0;
         gameState=PLAY;
        ghost.y=300;
  }
      
      console.log(gameState);
      
    }
  
}
