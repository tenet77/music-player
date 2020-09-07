const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Songs
let currSong = 0;
const songs = [
    {
        name: 'jacinto-1',
        displayName: 'Electric',
        artist: 'Jasinto design 1',
    },

    {
        name: 'jacinto-2',
        displayName: 'Electric 2',
        artist: 'Jasinto design 2',
    },

    {
        name: 'jacinto-3',
        displayName: 'Electric 3',
        artist: 'Jasinto design 3',
    },
    {
        name: 'metric-1',
        displayName: 'Electric 4',
        artist: 'Jasinto design 4',
    },
];


// Check is playing
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        music.pause();
        playBtn.classList.replace('fa-pause', 'fa-play');
    } else {
        music.play();
        playBtn.classList.replace('fa-play', 'fa-pause');
    }

    isPlaying = !isPlaying;
}

function driftSong(pos) {
    currSong = currSong + pos;
    if (currSong<0) {
        currSong = songs.length-1;
    } else if (currSong==songs.length) {
        currSong = 0;
    }

    loadSong(songs[currSong]);
    if (isPlaying) {
        music.play();
    }
}

function updateProgressBar(e) {
    if (isPlaying) {
        const {duration, currentTime} = e.srcElement;
        const progressPercentage = (currentTime / duration) * 100;
        progress.style.width = '${pr}%'.replace('${pr}', progressPercentage);
        const durationMinute = Math.floor(duration / 60);
        const durationSec = Math.floor(duration % 60);
        if (durationSec) {
            durationEl.textContent = (durationSec<10 ? '${m}:0${s}' : '${m}:${s}')
            .replace('${m}', durationMinute)
            .replace('${s}', durationSec);
        }

        const currMinute = Math.floor(currentTime / 60);
        const currSec = Math.floor(currentTime % 60);
        if (currSec) {
            currTimeEl.textContent = (currSec<10 ? '${m}:0${s}' : '${m}:${s}')
            .replace('${m}', currMinute)
            .replace('${s}', currSec);
        }
    }
}

function setProgressBar(e) {
    const progressPercentage = (e.offsetX / this.clientWidth) * 100;
    progress.style.width = '${pr}%'.replace('${pr}', progressPercentage);
    
    const { duration } = music;
    music.currentTime = progressPercentage * duration / 100;
}

playBtn.addEventListener('click', () => (togglePlay()));
prevBtn.addEventListener('click', () => (driftSong(-1)));
nextBtn.addEventListener('click', () => (driftSong(1)));
music.addEventListener('timeupdate', updateProgressBar);
music.addEventListener('ended', () => (driftSong(1)));
progressContainer.addEventListener('click', setProgressBar);

// Update DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = './music/${songName}.mp3'.replace('${songName}', song.name);
    image.src = './img/${songName}.jpg'.replace('${songName}', song.name);
}

loadSong(songs[currSong]);