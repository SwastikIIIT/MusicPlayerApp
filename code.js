const musicImage=document.querySelector(".central img");
const musicName=document.querySelector(".central .songName");
const artistName=document.querySelector(".central .artistName");
const audioTrack=document.querySelector(".central #audioTrack");
const playPause=document.querySelector(".controls .play i");
const prevBtn=document.querySelector(".controls .back");
const nextBtn=document.querySelector(".controls .next");
const progressBar=document.querySelector("input");
const totalTime=document.querySelector(".timer .maxDuration");
const realTime=document.querySelector(".timer .startTime");
const repeatBtn=document.querySelector(".controls .repeat");
const moreSongs=document.querySelector(".controls .moreSongs");
const moreSongsList=document.querySelector(".musicList");
const closeBtn=document.querySelector(".musicList .cross");
const queue=document.querySelector("ul");

let musicIndex=1;
//Important stuff need to understand it
window.addEventListener("load",()=>{
      loadMusic(musicIndex);
      songInQueue();
})

const loadMusic=(musicIndex)=>{
      musicName.textContent=myMusic[musicIndex-1].name;
      artistName.textContent=myMusic[musicIndex-1].artist;
      musicImage.src=`./images/${myMusic[musicIndex-1].img}`;
      audioTrack.src=`./songs/${myMusic[musicIndex-1].src}`;
}

const playMusic=()=>{
    audioTrack.play();
    musicImage.classList.add("rotate");
    playPause.classList.remove("fa-play");
    playPause.classList.add("fa-pause");
}

const pauseMusic=()=>{
    audioTrack.pause();
    musicImage.classList.remove("rotate");
    playPause.classList.remove("fa-pause");
    playPause.classList.add("fa-play");
}

playPause.addEventListener("click",()=>{
        if(playPause.classList.contains("fa-play"))
        playMusic();
        else
        pauseMusic();
})

const nextMusic=()=>{
    musicIndex++;
    musicIndex>myMusic.length?musicIndex=1:musicIndex=musicIndex;
    loadMusic(musicIndex);
    playMusic();
};

nextBtn.addEventListener("click",()=>{
    nextMusic();
})

const prevMusic=()=>{
    musicIndex--;
    musicIndex<1?musicIndex=myMusic.length:musicIndex=musicIndex;
    loadMusic(musicIndex);
    playMusic();
}

prevBtn.addEventListener("click",()=>{
    prevMusic();
})

audioTrack.addEventListener("loadedmetadata",(e)=>{
    progressBar.max=audioTrack.duration;
    // progressBar.value=audioTrack.currentTime;
    let min=Math.floor(audioTrack.duration/60);
    if(min<10)
    min=`0${min}`;
    let sec=Math.floor(audioTrack.duration%60);
    if(sec<10)
    sec=`0${sec}`;
    totalTime.textContent=`${min}:${sec}`;
})

if(audioTrack.play())
{
    setInterval(()=>{
     progressBar.value=audioTrack.currentTime;
     let val =audioTrack.currentTime;
     let min=Math.floor(val/60);
     if(min<10)
     min=`0${min}`;

     let sec=Math.floor(val%60);
     if(sec<10)
     sec=`0${sec}`;
    realTime.textContent=`${min}:${sec}`;
    },400);
}

progressBar.addEventListener("change",()=>{
    audioTrack.currentTime=progressBar.value;
    playMusic();
    let val=progressBar.value;
    let min=Math.floor(val/60);
    if(min<10)
    min=`0${min}`;

    let sec=Math.floor(val%60);
    if(sec<10)
    sec=`0${sec}`;
    realTime.textContent=`${min}:${sec}`;
})

const repeatMusic=()=>{
    let text=repeatBtn.textContent;
    if(text==="repeat")
    repeatBtn.textContent="repeat_one";

    else if(text==="repeat_one")
    repeatBtn.textContent="shuffle";

    else
    repeatBtn.textContent="repeat";
}

repeatBtn.addEventListener("click",()=>{
    repeatMusic();
})

audioTrack.addEventListener("ended",()=>{
    let text=repeatBtn.textContent;
    if(text==="repeat"){
        nextMusic();
    }
   
    
    else if(text==="repeat_one"){
        audioTrack.currentTime=0;
        loadMusic(musicIndex);
        playMusic();
    }
    
    else{
            let randomIndex=Math.floor(Math.random()*myMusic.length)+1;
            while(randomIndex==musicIndex)
            {
                randomIndex=Math.floor(Math.random()*myMusic.length)+1; 
            }
            loadMusic(randomIndex);
            playMusic();
    }
})

let k=1;
myMusic.forEach(ele => {
   let li=document.createElement("li");
   li.setAttribute("li-index",k);
   li.innerHTML=`<div class="musicName">
                     <span>${ele.name}</span>
                     <p>${ele.artist}</p>
                     <audio src="./songs/${ele.src}" id="music-${k}"></audio>
                </div>
                <div class="music${k}"></div>`;
    queue.append(li);

    let audioTag=document.querySelector(`#music-${k}`);
    let durationTag=document.querySelector(`.music${k}`);

    audioTag.addEventListener("loadedmetadata",()=>{
        let min=Math.floor(audioTag.duration/60);
        if(min<10)
        min=`0${min}`;
        let sec=Math.floor(audioTag.duration%60);
        if(sec<10)
        sec=`0${sec}`;
        durationTag.textContent=`${min}:${sec}`;
    })
    k++;
});

moreSongs.addEventListener("click",()=>{
    moreSongsList.classList.toggle("show");
})

closeBtn.addEventListener("click",()=>{
    moreSongsList.classList.remove("show");
})

const allli=document.querySelectorAll("li");

function songInQueue(){
allli.forEach(litag=>{
     if(litag.classList.contains("currentSongPlaying"))
     litag.classList.remove("currentSongPlaying");

     if(litag.getAttribute("li-index")==musicIndex)
     litag.classList.add("currentSongPlaying");
    
     litag.addEventListener("click",()=>{
        playingQueueMusic(litag);
    })
})}


const playingQueueMusic=(li)=>{
      let index=li.getAttribute("li-index");
      musicIndex=index;
      loadMusic(index);
      playMusic();
      songInQueue();//recursive calling to ensure the new song is highlighted
}