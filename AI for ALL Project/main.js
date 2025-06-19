const audioUpload = document.getElementById("audioUpload");
const player = document.getElementById("player");
const volumeControl = document.getElementById("volume");
const songListElement = document.getElementById("songList");
let songList = [];
let currentSongIndex = 0;

audioUpload.addEventListener("change", function (event) {
  const file = event.target.files[0];
  if (file) {
    const songURL = URL.createObjectURL(file);
    const songName = file.name;
    songList.push({ name: songName, url: songURL });
    currentSongIndex = songList.length - 1;
    displaySongList();
    playSong();
  }
});

volumeControl.addEventListener("input", () => {
  player.volume = volumeControl.value;
});

function displaySongList() {
  songListElement.innerHTML = "";
  songList.forEach((song, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = song.name;
    listItem.onclick = () => playSong(index);
    songListElement.appendChild(listItem);
  });
}

function playSong(index = currentSongIndex) {
  if (songList.length > 0) {
    currentSongIndex = index;
    player.src = songList[currentSongIndex].url;
    player.play().catch(error => console.log("Autoplay failed:", error));
  }
}

function pauseSong() {
  player.pause();
}

function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songList.length;
  playSong();
}

function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + songList.length) % songList.length;
  playSong();
}

function volumeUp() {
  player.volume = Math.min(player.volume + 0.1, 1);
  volumeControl.value = player.volume;
}

function volumeDown() {
  player.volume = Math.max(player.volume - 0.1, 0);
  volumeControl.value = player.volume;
}
