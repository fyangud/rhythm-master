import clap from "../sounds/Clap.wav";
import hihat from "../sounds/HiHat.wav";
import kick from "../sounds/Kick.wav";
import rim from "../sounds/Rim.wav";
import snare from "../sounds/Snare.wav";


//types of sounds
export const sounds = [
    {id: 0, name:"Clap", sound: clap}, 
    {id: 1, name:"Hihat", sound: hihat}, 
    {id: 2, name:"Kick", sound: kick}, 
    {id: 3, name:"Rim", sound: rim}, 
    {id: 4, name:"Snare", sound: snare}, 
];
  

// Define the actions that can be dispatched
export const PLAY = "PLAY";
export const STOP = "STOP";
export const SET_TEMPO = "SET_TEMPO";
export const ADD_BEAT = "ADD_BEAT";
export const DELETE_BEAT = "DELETE_BEAT";
export const TOGGLE_BEAT = "TOGGLE_BEAT";
export const ADD_BAR = "ADD_BAR";
export const DELETE_BAR = "DELETE_BAR";
export const CHANGE_SOUND = "CHANGE_SOUND";
export const SET_CURRENT_INDEX = "SET_CURRENT_INDEX";


// action creators
export const startPlaying = (barNum) => {
    return {
        type: PLAY,
        barNum: barNum,
    };
};

export const stopPlaying = () => {
    return {
        type: STOP,
    };
};

export const setTempo = (tempo) => {
    return {
        type: SET_TEMPO,
        tempo: tempo,
    };
};
  
export const addBeat = (barID, soundID) => {
    return {
        type: ADD_BEAT,
        barID: barID,
        soundID: soundID
    };
};

export const deleteBeat = (barID) => {
    return {
        type: DELETE_BEAT,
        barID: barID
    };
};

export const toggleBeat = (barID, beatID) => {
    return {
      type: TOGGLE_BEAT,
      barID: barID,
      beatID: beatID,
    };
};

export const addBar = (barID) => {
    return {
        type: ADD_BAR,
        barID: barID,
    }
}

export const deleteBar = (barID) => {
    return {
        type: DELETE_BAR,
        barID: barID,
    }
}

export const changeSound = (barID, soundID, direction) => {
    let newSoundID = 0;
    if(direction === "right" ){
        if(soundID < sounds.length-1){
            newSoundID = soundID + 1;
        }
    }else{
        if(soundID >= 1){
            newSoundID = soundID - 1
          }else{
            newSoundID = sounds.length - 1
        }
    }
    return {
      type: CHANGE_SOUND,
      sound: newSoundID,
      barID: barID,
    };
};

export const setCurrentIndex = (beats, currentIndex) => {
    return {
        type: SET_CURRENT_INDEX,
        beats: beats,
        currentIndex: currentIndex,
    };
};