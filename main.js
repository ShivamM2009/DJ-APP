song = ""; 
leftwristx = 0;
rigthwristx = 0;
leftwristy = 0;
rigthwristy = 0;
leftwristscore = 0;
rightwristscore = 0;
function preload() { song = loadSound("music.mp3"); }

function setup() { canvas = createCanvas(600, 500);

    canvas.center(); video = createCapture(VIDEO);

    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded); 
    poseNet.on('pose', gotPoses); }
    
    function play() {
        song.play();
        song.rate(1);
        song.setVolume(1);

    }

    function modelLoaded(){
     console.log("Model Is Loaded")
    }

    function gotPoses(result){
    if(result.length > 0){
        console.log(result);
        leftwristscore = result[0].pose.keypoints[9].score;
        rightwristscore = result[0].pose.keypoints[10].score;
        leftwristx = result[0].pose.leftWrist.x;
        leftwristy = result[0].pose.leftWrist.y;
        rigthwristx = result[0].pose.rightWrist.x;
        rigthwristy = result[0].pose.rightWrist.y;
    } 
    }
    function draw() 
    { image(video, 0, 0, 600, 500);
      fill("blue");
      stroke("blue");
      if(rightwristscore > 0.2){
          circle(rigthwristx,rigthwristy,30);
          if(rigthwristy > 0 && rigthwristy <= 100)
          {
             document.getElementById("speed").innerHTML  = "Speed = 0.5x";
             song.rate(0.5);
             
          }
          else if(rigthwristy > 100 && rigthwristy <= 200)
          {
             document.getElementById("speed").innerHTML  = "Speed = 1x";
             song.rate(1);
             
          }
          else if(rigthwristy > 200 && rigthwristy <= 300)
          {
             document.getElementById("speed").innerHTML  = "Speed = 1.5x";
             song.rate(1.5);
             
          }
          else if(rigthwristy > 300 && rigthwristy <= 400)
          {
             document.getElementById("speed").innerHTML  = "Speed = 2x";
             song.rate(2);
             
          }
          else if(rigthwristy > 400 && rigthwristy <= 500)
          {
             document.getElementById("speed").innerHTML  = "Speed = 2.5x";
             song.rate(2.5);
             
          }
      }    
    if(leftwristscore > 0.2)
    {
        circle(leftwristx,leftwristy,30);
        InNumberleftWristY = Number(leftWristY); 
        remove_decimals = floor(InNumberleftWristY); 
        volume = remove_decimals/500; 
        document.getElementById("volume").innerHTML = "Volume = " + volume; 
        song.setVolume(volume);
    }
    
    }