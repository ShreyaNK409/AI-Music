leftWristx = 0;
leftWristy = 0;
rightWristx = 0;
rightWristy = 0;
divino1 = 0;
no1 = 0;
song = "";
song2=""
video = "";
leftWristScore = 0;
rightWristScore = 0;
song1stat=""
song2stat=""

function preload() {
    song = loadSound("music.mp3");
    song2= loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(600, 600);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide()
    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on("pose", gotPoses);
}

function modelLoaded() {
    console.log("model Loaded!!!!!!")
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        leftWristx = results[0].pose.leftWrist.x;
        leftWristy = results[0].pose.leftWrist.y;
        rightWristx = results[0].pose.rightWrist.x;
        rightWristy = results[0].pose.rightWrist.y;
        leftWristScore = results[0].pose.keypoints[9].score;
        rightWristScore = results[0].pose.keypoints[10].score;
    }
}

function draw() {
    image(video, 0, 0, 600, 600);
    song1stat=song.isPlaying();
    song2stat=song2.isPlaying();
    if (leftWristScore > 0.2) {
        fill("#FF0000");
        stroke("#FF0000");
        circle(leftWristx, leftWristy, 20);
       song2.stop();
       if (song1stat==false) {
            song.play();
            document.getElementById("muh").innerHTML="*Playing Harry Potter Theme Song *";
       }
   }

   if (rightWristScore > 0.2) {
    fill("#FF0000");
    stroke("#FF0000");
    circle(rightWristx, rightWristy, 20);
   song1.stop();
   if (song2stat==false) {
        song2.play();
        document.getElementById("muh").innerHTML="Playing Peter Pan Song*";
   }
}

}