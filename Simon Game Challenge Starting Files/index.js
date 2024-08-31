var buttoncolours=["red","blue","green","yellow"];


var gamepattern=[];
var userclickpattern=[];

var started=false;
var level=0;

$(document).keypress(function () { 
    if(!started){
        $("#level-title").text("Level"+level);
        nextsequence();
        started=true;
    }

});


$(".btn").click(function(){
    var userchosencolour = $(this).attr("id");
    userclickpattern.push(userchosencolour);
    // console.log(userclickpattern);
    playsound(userchosencolour);
    animatepress(userchosencolour);

    checkanswer(userclickpattern.length-1);
})

function checkanswer(currentlevel){
    if(gamepattern[currentlevel]===userclickpattern[currentlevel]){
      console.log("success");
  
      if(gamepattern.length===userclickpattern.length){
          setTimeout(function(){
              nextsequence();
          },1000);
      }
    }
    else{
      console.log("wrong");
      playsound("wrong");
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },200);

      $("#level-title").text("GameOver, Press any key to restart");
      restart();
    }
    
  }

function nextsequence(){
    userclickpattern=[];
    level++;

    $("#level-title").text("Level "+level);

    var newrandomnumber=Math.floor(Math.random()*4);
   
    var randomchosencolour=buttoncolours[newrandomnumber];
    
        
    gamepattern.push(randomchosencolour);
    $("#"+ randomchosencolour).fadeIn(100).fadeOut(100).fadeIn(100);

    playsound(randomchosencolour);
}

function playsound(name){
    var audio=new Audio("sounds/"+ name +".mp3");
    audio.play();
    
}

function animatepress(currentcolour){
   $("#"+currentcolour).addClass("pressed");

   setTimeout(function(){
    $("#" + currentcolour).removeClass("pressed");
   },100);
}

function restart(){
    level=0;
    gamepattern=[];
    started=false;
}

