song="";
leftWristX="";
leftWristY="";
rightWristX="";
rightWristY="";
leftWristY_score="";
rightWristY_score="";

function preload(){
    song= loadSound("Lalisa.mp3");
}

function setup(){
    canvas=createCanvas(550,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide()

    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function modelLoaded(){
    console.log("PoseNet is Initialized");
}
function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;

        console.log("leftwrist X ="+leftWristX+"leftWrist Y ="+leftWristY+"rightWrist X ="+rightWristX+"rightWrist Y ="+rightWristY);
        
        leftWristY_score=results[0].pose.keypoints[9].score;
        console.log(leftWristY_score);
    }
}

function draw(){
    image(video,0,0,550,500);
    fill("#ffffff");
    stroke("#000000");
    
    if(rightWristY_score>0.2){
      circle(rightWristX,rightWristY,15);

    if(rightWristY>0 && rightWristY<=100){
        document.getElementById("speed_result").innerHTML="Speed = 0.5x";
        song.rate(0.5);
    }
    else if(rightWristY>0 && rightWristY<=200){
        document.getElementById("speed_result").innerHTML="Speed = 1x";
        song.rate(1);
    }
    else if(rightWristY>0 && rightWristY<=300){
        document.getElementById("speed_result").innerHTML="Speed = 1.5x";
        song.rate(1.5);
    }
    else if(rightWristY>0 && rightWristY<=400){
        document.getElementById("speed_result").innerHTML="Speed = 2x";
        song.rate(2);
    }
    else if(rightWristY>0 && rightWristY<=500){
        document.getElementById("speed_result").innerHTML="Speed = 2.5x";
        song.rate(2.5);
    }
}

    if(leftWristY_score > 0.02){
        console.log("I am in if condition");
        circle(leftWristX,leftWristY,15);

        leftWristY_no=Number(leftWristY);
        leftWristY_no=floor(leftWristY_no);
        volume_control= leftWristY_no/500;
        document.getElementById("volume_result").innerHTML="Volume = "+volume_control;
        song.setVolume(volume_control);
    }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}