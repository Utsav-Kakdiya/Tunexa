// Variable Declaration

let main = document.querySelector(".main");
document.querySelector(".btn").addEventListener("click", search);
let heading = document.createElement("h1");
let nfound = document.createElement("h1");
let list = document.querySelector(".list");
let flag = 0;
let found = 0;


// A Function that retrieve data from API
function search() {
    const input = document.querySelector("input").value;

    fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(input)}&entity=song&limit=200`)
        .then(response => {
            console.log(response.status)
            return response.json()
        })

        .then(song => {
            if (song.resultCount == 0) {
                notfound();
                hideHero();
            }
            else {
                hideHero();
                enjoy();
                showSong(song.results);
            }
        })

        .catch(error => {
            console.error(error);
        })
}

//To hide the hero section when song is searched.
function hideHero() {
    document.querySelector(".hero").style = " display : none "
}

//To add the additional text when song is searched.
function enjoy() {
    nfound.style.display = "none";
    if (flag == 0) {
        heading.innerText = " Enjoy the Songs... ";
        heading.classList.add("enjoy");
        main.before(heading);
        flag = 1;
    }

    // Make the heading visible again.
    heading.style.display = "block";
}

//To add the songs in the page which are retrieved from the API.
function showSong(songs) {
    list.innerHTML = " ";
    let song = songs;
    songs.forEach(song => {

        let Artist = song.artistName;
        let audio = song.previewUrl;
        let sName = song.collectionCensoredName;
        let image = song.artworkUrl100;


        let div = document.createElement("div");
        div.classList.add("realSong");
        div.innerHTML = `
        <img src="${image}" alt="Song Image">
        <div class="sideSong">
            <h2>${sName}</h2>
            <p>${Artist}</p>
            <audio src="${audio}" class="audio" controls></audio>
        </div>`

        list.append(div);
    });

//To add the feature that ensures only one song is playing at a time.
    let audios = document.querySelectorAll("audio");
    audios.forEach(audio => {
        audio.addEventListener("play", () => {
            audios.forEach(otherAudio => {
                if (otherAudio !== audio) {
                    otherAudio.pause();
                }
            });
        });
    });
}

//To add the additional text when song is searched but the song is not availabel.
function notfound() {
    if (found == 0) {
        nfound.innerText = " Sorry, Song not found... ";
        nfound.classList.add("enjoy");
        main.before(nfound);
        heading.style.display = "none";
        nfound.style.display = "block";
        list.innerHTML = " ";
        found = 1;
    }

    // Make the nfound visible again.
    heading.style.display = "none";
    nfound.style.display = "block";
    list.innerHTML = "";
}


