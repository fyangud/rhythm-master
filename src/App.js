import React, { useEffect } from 'react';
import { Provider, connect } from 'react-redux';

import './styles/App.css';
import {
  startPlaying, stopPlaying, setTempo, addBeat, deleteBeat, toggleBeat, addBar, deleteBar, changeSound, setCurrentIndex, sounds
} from "./store/actions";
import store from './store/store';
import Bar from './components/bar'

//rhythm component
const Rhythm = ({playing, tempo, beats, currentIndex, startPlaying, stopPlaying, setTempo, addBeat, deleteBeat, toggleBeat, addBar, deleteBar, changeSound, setCurrentIndex}) => {
  
  const handlePlay = (barNum) => {
    startPlaying(barNum);
  };

  const handleStop = () => {
    stopPlaying();
  };

  const handleSetTempo = (event) => {
    const newTempo = parseInt(event.target.value);
    setTempo(newTempo);
  };

  const handleSetCurrentIndex = (beats, currentIndex) => {
    setCurrentIndex(beats, currentIndex);
  };


  useEffect(() => {
    let intervalId;
    const playAudio = (beats, currentIndex) => {
      for(let i=0; i < beats.length; i++){
        const beat = beats[i][currentIndex[i]];
        //console.log(beat);

        if (beat.active) {
          const audio = new Audio(sounds[beat.soundID].sound);
          audio.play();
        }
      }
    };

    if (playing) {
      playAudio(beats, currentIndex);
      intervalId = setInterval(() => {
        handleSetCurrentIndex(beats, currentIndex);
      }, (60 / tempo / 4) * 1000); // set the interval of updating current beat index
    }

    return () => clearInterval(intervalId);
  }, [beats, currentIndex, playing]);


  return (
    <div className='app'>
      <div className='control'>
        <div className='playControl'>
          <button onClick={() => handlePlay(beats.length)} disabled={playing}>
            Play
          </button>
          <button onClick={handleStop} disabled={!playing}>
            Stop
          </button>        
        </div>
        <div className="slideContainer">
          <p>Tempo {tempo.toString()} bpm</p>
          <input type="range" min="30" max="240" defaultValue="120" className="slider" onChange={handleSetTempo} step="1" />
        </div>
      </div>
      <div className='barInterface'>
        {beats.map((barBeats, barID) => {
          return (
            <Bar 
              key = {barID} 
              playing = {playing}
              barID = {barID}
              beats = {beats}
              addBeat = {addBeat} 
              deleteBeat = {deleteBeat} 
              toggleBeat = {toggleBeat} 
              addBar = {addBar} 
              deleteBar = {deleteBar} 
              changeSound = {changeSound} 
              currentIndex = {currentIndex? currentIndex[barID]:""}
            />
          )
        })}
      </div>
    </div>
  );
};


const mapStateToProps = (state) => {
  return {
    playing: state.playing,
    tempo: state.tempo,
    beats: state.beats,
    currentIndex: state.currentIndex,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    startPlaying: (barNum) => {dispatch(startPlaying(barNum))},
    stopPlaying: () => {dispatch(stopPlaying())},
    setTempo: (tempo) => {dispatch(setTempo(tempo))},
    addBeat: (barID, soundID)=> {dispatch(addBeat(barID, soundID))},
    deleteBeat: (barID)=> {dispatch(deleteBeat(barID))},
    toggleBeat: (barID, beatID) => {dispatch(toggleBeat(barID, beatID))},
    addBar: (barID) => {dispatch(addBar(barID))},
    deleteBar: (barID) => {dispatch(deleteBar(barID))},
    changeSound: (barID, soundID, direction) => {dispatch(changeSound(barID, soundID, direction))},
    setCurrentIndex: (beats, currentIndex) => {dispatch(setCurrentIndex(beats, currentIndex))},
  };
};


const Container = connect(mapStateToProps, mapDispatchToProps)(Rhythm);

function App() {
  return (
    <Provider store = {store} >
      <Container />
    </Provider>
  );
}

export default App;
