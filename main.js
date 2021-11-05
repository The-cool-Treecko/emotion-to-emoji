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
    utterThis = new SpeechSynthesisUtterance(speech_data1 + speech_data2);
    synth.speak(utterThis);
}