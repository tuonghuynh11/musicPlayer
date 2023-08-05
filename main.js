const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const playlist = $(".playlist");
const cd = $(".cd");

const PlAYER_STORAGE_KEY = "F8_PLAYER";

const songs = [
  {
    name: "Hãy Yêu Tôi Bây Giờ",
    singer: "HURRYKNG",
    path: "./assets/song1.mp3",
    image:
      "https://i.ytimg.com/vi/2aoDd9DPaoA/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLD2JZrlpAYu-3cs4sKjmCRqiOosFw",
  },
  {
    name: "Nothin' On Me",
    singer: "Leah Marie Perez",
    path: "./assets/song2.mp3",
    image:
      "https://i.ytimg.com/vi/yd9nabzlM4Q/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGHIgVSg7MA8=&rs=AOn4CLDPv3wZEFNZoJ3ubHigN0ufImsxAA",
  },
  {
    name: "We Go Hard",
    singer: "Suboi, JustaTee, Karik, Thái VG, BigDaddy, Andree, B Ray",
    path: "./assets/song3.mp3",
    image:
      "https://i.ytimg.com/vi/xiAcFjb-L2c/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDfInBPbj0Lc8xZD-z70EpmezlwLA",
  },
  {
    name: "Nàng",
    singer: "Ogenus",
    path: "./assets/song4.mp3",
    image:
      "https://i.ytimg.com/vi/8hoQzK1yBDc/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAYBj-MJ-dQpWcevPlJ8JsSjsfgfQ",
  },
  {
    name: "Tệ Thật, Anh Nhớ Em",
    singer: "Orange",
    path: "./assets/song5.mp3",
    image:
      "https://i.ytimg.com/vi/5yjrKvSYCo8/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAtVO6oSmM3VRADmkz32__YIRQXtA",
  },
  {
    name: "Để Anh Một Mình",
    singer: "Rhyder",
    path: "./assets/song6.mp3",
    image:
      "https://i.ytimg.com/vi/sgpaHhEt5b0/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBkG_b7djdCkdt9u7mJ5ey7pC9DGQ",
  },
  {
    name: "I need your love",
    singer: " Madilyn Bailey & Jake Coco",
    path: "./assets/song7.mp3",
    image:
      "https://i.ytimg.com/vi/4GIGEEVsAOk/hq720.jpg?sqp=-oaymwE2CNAFEJQDSFXyq4qpAygIARUAAIhCGAFwAcABBvABAfgB_gmAAtAFigIMCAAQARhyIDgoNzAP&rs=AOn4CLAIRsg43d00BxDXSzEmsG4pkgdSbg",
  },
];
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");

const playBtn = $(".btn-toggle-play");
const nextBtn = $(".btn-next");
const preBtn = $(".btn-prev");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const player = $(".player");

const progress = $("#progress");
const app = {
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  config: JSON.parse(localStorage.getItem(PlAYER_STORAGE_KEY)) || {},
  songs: songs,
  songsPlayOneTime: [],
  setConfig: function (key, value) {
    this.config[key] = value;
    localStorage.setItem(PlAYER_STORAGE_KEY, JSON.stringify(this.config));
  },
  loadConfig: function () {
    this.isRandom = this.config.isRandom;
    this.isRepeat = this.config.isRepeat;
  },
  render: function () {
    const _this = this;
    var htmlPLayList = this.songs
      .map(function (song, index) {
        return `
        <div class="song ${
          index === _this.currentIndex ? "active" : ""
        }" data-index = "${index}">
        <div
          class="thumb"
          style="background-image: url(${song.image});"
        ></div>
        <div class="body">
          <h3 class="title">${song.name}</h3>
          <p class="author">${song.singer}</p>
        </div>
        <div class="option">
          <i class="fas fa-ellipsis-h"></i>
        </div>
      </div>
        `;
      })
      .join("");
    playlist.innerHTML = htmlPLayList;
  },
  handleEvent: function () {
    const _this = this;
    //Xử lý cd play
    var cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
      duration: 10000,
      iterations: Infinity,
    });
    cdThumbAnimate.pause();
    //Scroll play list
    const cdWidth = cd.offsetWidth;
    document.onscroll = function (e) {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      var newWidth = cdWidth - scrollTop;

      cd.style.width = newWidth > 0 ? newWidth + "px" : 0;
      cd.style.opacity = newWidth / cdWidth;
    };
    //Play
    playBtn.onclick = function () {
      if (!_this.isPlaying) {
        audio.play();
        cdThumbAnimate.play();
      } else {
        audio.pause();
        cdThumbAnimate.pause();
      }
    };
    //When play
    audio.onplay = function () {
      _this.isPlaying = true;
      player.classList.add("playing");
    };
    //When pause
    audio.onpause = function () {
      _this.isPlaying = false;
      player.classList.remove("playing");
    };

    // Khi tiến độ bài hát thay đổi
    audio.ontimeupdate = function (a) {
      if (audio.duration) {
        const progressPercent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        progress.value = progressPercent;
      }
    };
    audio.onended = function () {
      if (_this.isRepeat) {
        audio.play();
      } else if (_this.isRandom) {
        _this.playRandom();
        audio.play();
      } else {
        _this.nextSong();
      }
    };

    //lister event from play list
    playlist.onclick = function (e) {
      const songNode = e.target.closest(".song:not(.active)");
      //Xử lý khi click vào song
      if (songNode || e.target.closest(".option")) {
        if (e.target.closest(".song:not(.active)")) {
          const index = Number(songNode.dataset.index);
          _this.currentIndex = index;
          _this.loadCurrentSong();
          audio.play();
          _this.render();
        }
      }
    };
    ///Next songs
    nextBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandom();
        audio.play();
      } else {
        _this.nextSong();
      }
    };

    //Previous songs
    preBtn.onclick = function () {
      _this.prevSong();
    };

    //Random songs

    randomBtn.onclick = function () {
      _this.randomSong();
      _this.setConfig("isRandom", _this.isRandom);
    };

    //Repeat songs
    repeatBtn.onclick = function () {
      _this.repeatSong();
      _this.setConfig("isRepeat", _this.isRepeat);
    };
  },
  defineProperty: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },
  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;
  },

  playRandom: function () {
    const randomIndex = Math.floor(Math.random() * this.songs.length);
    if (this.songsPlayOneTime.length === this.songs.length) {
      this.songsPlayOneTime = [];
    } else {
      setTimeout(() => {
        while (this.songsPlayOneTime.includes(this.songs[randomIndex].name)) {
          randomIndex = Math.floor(Math.random() * this.songs.length);
        }
      }, 100);
    }
    this.songsPlayOneTime.push(this.songs[randomIndex].name);
    this.currentIndex = randomIndex;
    this.loadCurrentSong();
    this.render();
    this.scrollToActiveSong();
  },
  randomSong: function () {
    this.isRandom = !this.isRandom;
    if (this.isRandom) {
      randomBtn.classList.add("active");
      console.log("Random");
    } else {
      randomBtn.classList.remove("active");
      console.log("No Random");
    }
  },
  scrollToActiveSong: function () {
    setTimeout(function () {
      const activeSong = $(".song.active");
      activeSong.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 100);
  },
  repeatSong: function () {
    this.isRepeat = !this.isRepeat;
    if (this.isRepeat) {
      repeatBtn.classList.add("active");
      console.log("Repeat");
    } else {
      repeatBtn.classList.remove("active");
      console.log("No Repeat");
    }
  },
  nextSong: function () {
    audio.pause();
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
    audio.play();
    this.render();
    this.scrollToActiveSong();
  },
  prevSong: function () {
    audio.pause();
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
    audio.play();
    this.render();
    this.scrollToActiveSong();
  },
  start: function () {
    //Assign config from local and assign to element
    this.loadConfig();
    //Define properties for object
    this.defineProperty();
    // Event Listener
    this.handleEvent();
    //Render Playlist
    this.render();

    //Load first song for first run
    this.loadCurrentSong();

    // Tua Sound
    progress.onchange = function (e) {
      const currentTimeOnSong = Math.floor(
        (progress.value / 100) * audio.duration
      );

      audio.currentTime = currentTimeOnSong;
    };

    //Hiển thị trạng thái ban đầu của random and repeat

    //classList.toggle("class" , boolean)
    //Nếu boolean = true thì add class, còn không thì thôi
    randomBtn.classList.toggle("active", this.isRandom);
    repeatBtn.classList.toggle("active", this.isRepeat);
  },
};
app.start();
