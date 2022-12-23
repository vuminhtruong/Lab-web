var slides = document.querySelectorAll('.slide');
var btns = document.querySelectorAll('.btn');
let currentSlide = 1;

var manualNavigation = function (manual){
    slides.forEach((slide) => {
        slide.classList.remove('active');
        btns.forEach((btn) => {
           btn.classList.remove('active');
        });
    })
    slides[manual].classList.add('active');
    btns[manual].classList.add('active');
}

btns.forEach((btn,i) => {
    btn.addEventListener("click",() => {
        manualNavigation(i);
        currentSlide = i;
    })
})

var autoPlay = function (activeClass){
    let actice = document.getElementsByClassName('active');
    let i=1;

    var play = () => {
        setTimeout(function (){
            [...actice].forEach((activeSlide) => {
                activeSlide.classList.remove('active');
            })
            slides[currentSlide].classList.add('active');
            btns[currentSlide].classList.add('active');
            currentSlide++;

            if(currentSlide === slides.length){
                currentSlide = 0;
            }
            if (currentSlide >= slides.length){
                return;
            }
            play();
        },3000);
    }
    play();
}
autoPlay();

const btnPlay = document.querySelector(".play-song");
const btnBack = document.querySelector(".back");
const btnForward = document.querySelector(".forward");
const nameSong = document.querySelector(".info-song .song-name");
const singer = document.querySelector(".info-song .singer");
const musicContent = document.querySelector(".music-content");
var audio = document.getElementById("audio");
var songIndex = 2;
const listMusic = [
    { song: "Fur_Elise", singer: "Beethoven" },
    { song: "Requiem_In_Dmoll_Lacrimosa", singer: "Mozart" },
    { song: "River_Flows_In_You", singer: "Yiruma" }
];

function loadSong(music){
    audio.src = `music/${music.song}.mp3`;
    nameSong.textContent = music.song.replaceAll('_',' ');
    singer.textContent = "Musician: " + music.singer;
}
loadSong(listMusic[songIndex]);

function playSong(){
    musicContent.classList.add("playing");
    btnPlay.querySelector(".fas").classList.remove("fa-play");
    btnPlay.querySelector(".fas").classList.add("fa-pause");
    audio.play();
}

function pauseSong(){
    musicContent.classList.remove("playing");
    btnPlay.querySelector(".fas").classList.add("fa-play");
    btnPlay.querySelector(".fas").classList.remove("fa-pause");
    audio.pause();
}

function prevSong(){
    songIndex --;
    if(songIndex < 0)
        songIndex = listMusic.length-1;
    loadSong(listMusic[songIndex]);
    playSong();
}

function nextSong(){
    songIndex++;
    if(songIndex > listMusic.length -1)
        songIndex = 0;
    loadSong(listMusic[songIndex]);
    playSong()
}

btnPlay.addEventListener("click",function (){
    if(musicContent.classList.contains("playing"))
        pauseSong();
    else
        playSong();
});

btnBack.addEventListener("click",prevSong);
btnForward.addEventListener("click",nextSong);
audio.addEventListener("ended",nextSong);


var soundClass,num,array,width,context,logo,myElement,analyser,stream,src,height;

soundClass = document.querySelector('.music-content');

process = true ;
num = 32;
flag = 1;
array = new Uint8Array(num*2);
width = 10;
btnPlay.addEventListener("click",function (){
    if(process){
        for(var i = 0;i < num;i++){
            logo = document.createElement('div');
            logo.className = 'logo';
            logo.style.background = 'red';
            logo.style.minWidth = width + 'px';
            soundClass.appendChild(logo);
        }
        myElement = document.getElementsByClassName('logo');
        stream = document.getElementById("audio")
        context = new AudioContext();

        src = context.createMediaElementSource(stream);
        analyser = context.createAnalyser();
        src.connect(analyser);
        analyser.connect(context.destination);
        process = false;
    }
    trans();
});

const loop = () => {
    window.requestAnimationFrame(loop);
    analyser.getByteFrequencyData(array);
    for (var i = 0;i<num;i++){
        height = array[i+num];
        myElement[i].style.minHeight = height + 'px';
        myElement[i].style.opacity = 0.008 * height;
    }
}

const trans = () => {
    if(flag === 1){
        context.resume();
        stream.play().then(() => {
            loop();
            });
    }else
        context.suspend();
    flag = 1 - flag;
}