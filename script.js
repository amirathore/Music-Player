var arr = [
    { songName: "Jale 2", url: "./songs/Jale 2.mp3", img: "./images/jale.jpg" },
    { songName: "Pehle Bhi main", url: "./songs/Pehle Bhi Main.mp3", img: "./images/animal.jpg" },
    { songName: "Ram siya ram", url: "./songs/Ram Siya Ram.mp3", img: "./images/ram.jpg" },
    { songName: "Arjan Valley", url: "./songs/Arjan Vailly Ne.mp3", img: "./images/animal.jpg" },
    { songName: "Faded", url: "./songs/Alan Walker - Faded.mp3", img: "https://images.unsplash.com/photo-1526925210199-6db37fd596af?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { songName: "Believer", url: "./songs/Imagine Dragons - Believer.mp3", img: "https://i1.sndcdn.com/artworks-000552637998-0cysco-t500x500.jpg" },
    { songName: "On my way", url: "./songs/On My Way - Alan Walker_320(Pagalworld-Mp3.com).mp3", img: "https://i.pinimg.com/736x/f9/40/64/f94064af87d1a35a6c29c38207586381.jpg" },
    { songName: "Let Me Love you", url: "./songs/DJ Snake - Let Me Love You ft. Justin Bieber (Official Video).mp3", img: "https://images.unsplash.com/photo-1516980907201-943c13a8d03c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }


]
var allsong = document.querySelector("#all-song");
var poster = document.querySelector("#overlay");
var backward = document.querySelector("#backward");
var play = document.querySelector("#play");
var forward = document.querySelector("#forward");
var currentTimeDisplay = document.getElementById("current-time");
var totalDurationDisplay = document.getElementById("total-duration");

var audio = new Audio();
var selectedSong = 0;
var isPlaying = false; // Track whether audio is playing or not

function mainFunction() {
    var clutter = "";
    arr.forEach(function (elem, index) {
        var audioElement = new Audio(elem.url);
        audioElement.addEventListener('loadedmetadata', function () {
            var minutes = Math.floor(audioElement.duration / 60);
            var seconds = Math.floor(audioElement.duration - minutes * 60);
            var durationString = pad(minutes, 2) + ':' + pad(seconds, 2);
            document.getElementById(index).querySelector('h4').innerText = durationString;
        });

        clutter += `<div class="song-card" id=${index}>
            <div class="part1">
                <img src="${elem.img}" alt="">
                <h2>${elem.songName}</h2>
            </div>
            <h4>00:00</h4>
        </div>`;
    });
    allsong.innerHTML = clutter;
    audio.src = arr[selectedSong].url;
    poster.style.backgroundImage = `url(${arr[selectedSong].img})`;
}

mainFunction();

allsong.addEventListener("click", function (dets) {
    selectedSong = dets.target.id;
    play.innerHTML = `<i class="ri-pause-mini-fill"></i>`;
    mainFunction();
    audio.play();
    isPlaying = true;
});

play.addEventListener("click", function () {
    if (!isPlaying) {
        play.innerHTML = `<i class="ri-pause-mini-fill"></i>`;
        audio.play();
        isPlaying = true;
    } else {
        play.innerHTML = `<i class="ri-play-mini-fill"></i>`;
        audio.pause();
        isPlaying = false;
    }
});

forward.addEventListener("click", function () {
    if (selectedSong < arr.length - 1) {
        selectedSong++;
        mainFunction();
        audio.play();
        isPlaying = true;
    } else {
        forward.style.opacity = 0.4;
    }
});

backward.addEventListener("click", function () {
    if (selectedSong > 0) {
        selectedSong--;
        mainFunction();
        audio.play();
        isPlaying = true;
    } else {
        backward.style.opacity = 0.4;
    }
});

audio.addEventListener('timeupdate', function () {
    var currentMinutes = Math.floor(audio.currentTime / 60);
    var currentSeconds = Math.floor(audio.currentTime - currentMinutes * 60);
    currentTimeDisplay.innerText = pad(currentMinutes, 2) + ':' + pad(currentSeconds, 2);

    var percentage = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = percentage + "%";
});

audio.addEventListener('loadedmetadata', function () {
    var minutes = Math.floor(audio.duration / 60);
    var seconds = Math.floor(audio.duration - minutes * 60);
    totalDurationDisplay.innerText = pad(minutes, 2) + ':' + pad(seconds, 2);
});

audio.addEventListener('ended', function () {
    if (selectedSong < arr.length - 1) {
        selectedSong++;
        audio.src = arr[selectedSong].url;
        poster.style.backgroundImage = `url(${arr[selectedSong].img})`;
        audio.play();
        isPlaying = true;
    } else {
        audio.pause();
        isPlaying = false;
    }
});

function pad(num, size) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}
