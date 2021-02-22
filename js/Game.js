class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,300);
    car2 = createSprite(300,300);
    car3 = createSprite(500,300);
    car4 = createSprite(700,300);
    cars = [car1, car2, car3, car4];

    car1.addImage(c1)
    car2.addImage(c2)
    car3.addImage(c3)
    car4.addImage(c4)

  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    player.getCarsAtEnd()
    if(allPlayers !== undefined){
      //var display_position = 100;
      background("black")
      image(track,0,-displayHeight*4,displayWidth,displayHeight*5)
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 200;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 250;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          stroke(5)
          fill("green")
          ellipse(x,y+60,30,30)
          //cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y

        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    if(player.distance>4200){
      //gameState = 2
     // player.rank+=1
     // Player.updateCarsAtEnd(player.rank)
      Player.updateFinishedPlayers()
      player.rank = finishedPlayers;
      player.update()
    }

    drawSprites();


  }

  displayRanks(){
    camera.position.x = 0
    camera.position.y=0

    imageMode(CENTER)
    Player.getPlayerInfo()

    image(bronze_img,displayWidth/-4,displayHeight/9-100,200,240)
    image(silver_img,displayWidth/4,displayHeight/10-100,225,270)
    image(gold_img,0,-100,250,280)
    textAlign(CENTER)
    textSize(50)
    for(var plr in allPlayers){
     if( allPlayers[plr].rank===1){
      text("First: "+ allPlayers[plr].name,0,85)
     } 
     else if(allPlayers[plr].rank===2){
      text("Second: "+ allPlayers[plr].name,displayWidth/4,displayHeight/9+70)

     }
     else if(allPlayers[plr].rank===3){
      text("Third: "+ allPlayers[plr].name,displayWidth/-4,displayHeight/10+70)

     }

     else{
       textSize(30)
       text("Thanks for participating"+allPlayers[plr].name,0,225)
     }

     
    }

  }

 
  }
