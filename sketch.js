let classifier;
let video;
let label = "Loading...";
let modelURL = "https://teachablemachine.withgoogle.com/models/ffJFsz9nG/"; // Replace with your model ID

function preload() {
  classifier = ml5.imageClassifier(modelURL + "model.json", () => {
    console.log("Model loaded!");
    classifyVideo();
  });
}

function setup() {
  const canvas = createCanvas(320, 240);
  canvas.parent("canvas-container");
  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();
}

function draw() {
  background(0);
  image(video, 0, 0); 
  fill(255);
  textSize(20);
  textAlign(CENTER, CENTER);
  text(label, width / 2, height - 10);
}

function classifyVideo() {
  classifier.classify(video, gotResult);
}

function gotResult(error, results) {
  if (error) {
    console.error(error);
    return; 
  }           
  label = results[0].label;

  // Map gesture label to music control
  switch (label) {
    case "Thumbs Up":
      playSong();
      break;
    case "Thumbs Down":
      pauseSong();
      break;
    case "Point Right":
      nextSong();
      break;
    case "Point Left":
      prevSong();
      break;
    case "Open Palm":
      volumeUp();
      break;
    case "Fist":
      volumeDown();
      break;
  }

  setTimeout(classifyVideo, 1000); // Re-classify after 1 second
}
