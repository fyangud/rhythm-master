let tracks = document.getElementsByClassName("beats");
console.log(tracks);
for(let beats in tracks){
    beats.map((beat, i)=>{
        beat.innerHTML = '<audio id="audio-player" controls="controls" src="public/sound/Clap.wav" type="audio/mpeg">';
    });
}