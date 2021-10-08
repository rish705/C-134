song = "";
objects = [];
status = "";

function preload() { song = loadSound("iphone_alarm.mp3"); }

function setup() {
    canvas = createCanvas(380, 380)
    canvas.center()
    video = createCapture(VIDEO)
    video.hide()
    video.size(380, 380)
    objectDetector = ml5.objectDetector("cocossd", modelLoaded)
    document.getElementById("status").innerHTML = "Status: Detecting Human"
}

function gotResults(error, results) {
    if (error) {
        console.error(error)
    }
    console.log(results)
    objects = results
}

function modelLoaded() {
    console.log("Model is Loaded")
    status = true
}

function draw() {
    image(video, 0, 0, 380, 380)
    if (status != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResults)
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Human Detected"
            document.getElementById("number_of_objects").innerHTML = "Number Of Humans Dected: " + objects.length
            fill(r, g, b)
            percent = floor(objects[i].confidence * 100)
            text(objects[i].label + "" + percent + "%", objects[i].x, objects[i].y + 15)
            stroke(r, g, b)
            noFill()
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height - 50)
            if (objects[i].label == "person") {
                document.getElementById("number_of_objects").innerHTML = "Baby found"
                song.stop()
            } else {
                document.getElementById("number_of_objects").innerHTML = "Baby not found"
                song.play()
            }
        }
        if (objects.length == 0) {
            document.getElementById("number_of_objects").innerHTML = "Baby not found"
            song.play()
        }
    }
}