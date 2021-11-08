//https://teachablemachine.withgoogle.com/models/PrdblJpys/

var prediction1;
var prediction2;

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'jpeg',
    jpeg_quality: 90
})

Webcam.attach(document.getElementById("camera"));

function takePic() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="resultimg" src="' + data_uri + '">'
    })
}
console.log(ml5.version)

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/PrdblJpys/model.json', modelLoaded);

function modelLoaded() {
    console.log("ml5 version: " + ml5.version);
}

function speak() {
    synth = window.speechSynthesis;
    speech_data1 = "The first prediction is " + prediction1;
    speech_data2 = "The second prediction is " + prediction2;
    utterThis = new SpeechSynthesisUtterance(speech_data1 + " and " + speech_data2);
    synth.speak(utterThis);
}

function toEmoji() {
    classifier.classify(document.getElementById("resultimg"), function (error, results) {
        if (error) {
            console.log(error);
        } else {
            console.log(results);
            prediction1 = results[0].label;
            prediction2 = results[1].label;
            speak()
            document.getElementById("result_emotion_name").innerHTML = prediction1
            document.getElementById("result_emotion_name2").innerHTML = prediction2
            if (prediction1 == "Angry") {
                document.getElementById("emoji1").innerHTML = "&#128545"
            } else if (prediction1 == "Happy") {
                document.getElementById("emoji1").innerHTML = "&#128512"
            } else if (prediction1 == "Sad") {
                document.getElementById("emoji1").innerHTML = "&#128532"
            }
            if (prediction2 == "Angry") {
                document.getElementById("emoji2").innerHTML = "&#128545"
            } else if (prediction2 == "Happy") {
                document.getElementById("emoji2").innerHTML = "&#128512"
            } else if (prediction2 == "Sad") {
                document.getElementById("emoji2").innerHTML = "&#128532"
            }
        }
    })
}