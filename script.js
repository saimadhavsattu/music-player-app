// script.js
const audioPlayer = document.getElementById("audio-player");
const playPauseBtn = document.getElementById("play-pause-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const progressBar = document.getElementById("progress-bar");
const volumeSlider = document.getElementById("volume-slider");
const playlistElement = document.getElementById("playlist");
const trackTitle = document.getElementById("track-title");
const artistName = document.getElementById("artist-name");

const tracks = [
  { title: "guzaarish", artist: "A.R.rahman,SonuNigam", src: "guzaarish.mp3" },
  { title: "Gaaju Bomma", artist: "Hesham Abdulla", src: "[iSongs.info] 03 - Gaaju Bomma.mp3" },
  { title: "Not A Teaser", artist: "Jakes bejoy", src: "[iSongs.info] 05 - Not A Teaser.mp3" },
];

let currentTrackIndex = 0;

// Load the current track
function loadTrack(index) {
  const track = tracks[index];
  trackTitle.textContent = track.title;
  artistName.textContent = track.artist;
  audioPlayer.src = track.src;
}

// Play or pause the audio
function togglePlayPause() {
  if (audioPlayer.paused) {
    audioPlayer.play();
    playPauseBtn.textContent = "⏸️";
  } else {
    audioPlayer.pause();
    playPauseBtn.textContent = "▶️";
  }
}

// Play the next track
function playNext() {
  currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
  loadTrack(currentTrackIndex);
  audioPlayer.play();
  playPauseBtn.textContent = "⏸️";
}

// Play the previous track
function playPrevious() {
  currentTrackIndex =
    (currentTrackIndex - 1 + tracks.length) % tracks.length;
  loadTrack(currentTrackIndex);
  audioPlayer.play();
  playPauseBtn.textContent = "⏸️";
}

// Update the progress bar
function updateProgress() {
  const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
  progressBar.value = progress || 0;
}

// Seek the track
function seekTrack(event) {
  const newTime = (event.target.value / 100) * audioPlayer.duration;
  audioPlayer.currentTime = newTime;
}

// Change the volume
function changeVolume(event) {
  audioPlayer.volume = event.target.value;
}

// Generate the playlist dynamically
function loadPlaylist() {
  playlistElement.innerHTML = "";
  tracks.forEach((track, index) => {
    const li = document.createElement("li");
    li.textContent = `${track.title} - ${track.artist}`;
    li.addEventListener("click", () => {
      currentTrackIndex = index;
      loadTrack(index);
      audioPlayer.play();
      playPauseBtn.textContent = "⏸️";
    });
    playlistElement.appendChild(li);
  });
}

// Event listeners
playPauseBtn.addEventListener("click", togglePlayPause);
nextBtn.addEventListener("click", playNext);
prevBtn.addEventListener("click", playPrevious);
audioPlayer.addEventListener("timeupdate", updateProgress);
progressBar.addEventListener("input", seekTrack);
volumeSlider.addEventListener("input", changeVolume);

// Initialize
loadTrack(currentTrackIndex);
loadPlaylist();
