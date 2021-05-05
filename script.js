const musicContainer = document.querySelector('.music-container');
const playBtn = document.querySelector('#play');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const audio = document.querySelector('#audio');
const cover = document.querySelector('#cover');
const title = document.querySelector('#title');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');

const songs = {
    0 : {
        title: 'Instant Crush',
        image: './img/Random_Access_Memories.jpg',
        audio: './music/Instant_Crush.mp3'
    },
    1 : {
        title: 'Sanctuary',
        image: './img/Sanctuary.png',
        audio: './music/Sanctuary.mp3'
    },
    2 : {
        title: 'Sunflower',
        image: './img/Spider_Verse.jpg',
        audio: './music/Sunflower.mp3'
    }
}

var songIndex = 0;

loadSong(songs[songIndex]);

function loadSong(song){
    title.textContent = song['title'];
    audio.src = song['audio'];
    cover.src = song['image'];
}

playBtn.addEventListener('click', function(){
    if(!musicContainer.classList.contains('play')){
        playSong();
    } else{
        pauseSong();
    }
})

function playSong(){
    musicContainer.classList.add('play');
    playBtn.innerHTML = '<i class="fas fa-pause"></i>'
    audio.play();
}

function pauseSong(){
    musicContainer.classList.remove('play');
    playBtn.innerHTML = '<i class="fas fa-play"></i>'
    audio.pause();
}

prevBtn.addEventListener('click', prevSong)

function prevSong(){
    songIndex--;
    
    if (songIndex < 0){
        songIndex = Object.keys(songs).length - 1;
    }

    loadSong(songs[songIndex]);

    playSong();
}

nextBtn.addEventListener('click', nextSong);

function nextSong(){
    songIndex++;
    
    if (songIndex > Object.keys(songs).length - 1){
        songIndex = 0;
    }

    loadSong(songs[songIndex]);

    playSong();
}

audio.addEventListener('timeupdate', updateProgress);

function updateProgress(e){
    const {duration, currentTime} = e.srcElement;
    const progressCount = (currentTime / duration) * 100;
    progress.style.width = `${progressCount}%`;
}

progressContainer.addEventListener('click', setProgress);

function setProgress(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

audio.addEventListener('ended', nextSong);