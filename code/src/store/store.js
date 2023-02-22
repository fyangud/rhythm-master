import { configureStore } from '@reduxjs/toolkit';

import {
  PLAY,
  STOP,
  SET_TEMPO,
  ADD_BEAT,
  DELETE_BEAT,
  TOGGLE_BEAT,
  ADD_BAR,
  DELETE_BAR,
  CHANGE_SOUND,
  SET_CURRENT_INDEX,
} from "./actions";


// Define the initial state of the store
const initialState = {
  playing: false,
  tempo: 120,
  beats: [[{ soundID: 0, active: false }, { soundID: 0, active: false }, { soundID: 0, active: false }, { soundID: 0, active: false }]],
};



// Define the reducer function
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case PLAY:
      var currentArray = [];
      for (let i=0; i < action.barNum; i++){
        currentArray.push(0);
      }
      return { ...state, playing: true, currentIndex: currentArray};
    
    case STOP:
      return { ...state, playing: false, currentIndex: null};
    
    case SET_TEMPO:
      return { ...state, tempo: action.tempo };
    
    case ADD_BEAT:
      return { 
        ...state, 
        beats: [...state.beats.slice(0, action.barID), [...state.beats[action.barID], { soundID: action.soundID, active: false }], ...state.beats.slice(action.barID + 1)] 
      };
    
    case DELETE_BEAT:
      return { 
        ...state, 
        beats: [...state.beats.slice(0, action.barID), state.beats[action.barID].slice(0, -1), ...state.beats.slice(action.barID + 1)] 
      };
    
    case TOGGLE_BEAT:
      return {
        ...state,
        beats: [...state.beats.slice(0, action.barID), state.beats[action.barID].map((beat, index) => {
          if (index === action.beatID) {
            return { ...beat, active: !beat.active };
          } else {
            return beat;
          }}), ...state.beats.slice(action.barID + 1)
        ],
      };

    case ADD_BAR:
      return {
        ...state, 
        beats: [...state.beats.slice(0, action.barID + 1), [{ soundID: 0, active: false }, { soundID: 0, active: false }, { soundID: 0, active: false }, { soundID: 0, active: false }], ...state.beats.slice(action.barID + 1)] 
      };

    case DELETE_BAR:
      return {
        ...state, 
        beats: [...state.beats.slice(0, action.barID), ...state.beats.slice(action.barID + 1)] 
      };
    
    case CHANGE_SOUND:
      return {
        ...state,
        beats: [
          ...state.beats.slice(0, action.barID), 
          state.beats[action.barID].map((beat) => {
            return {...beat, soundID: action.sound}
          }), 
          ...state.beats.slice(action.barID + 1)
        ],
      }
    
    case SET_CURRENT_INDEX:
      var currentArray = [];
      for (let i=0; i < action.currentIndex.length; i++){
        currentArray[i] = (action.currentIndex[i] + 1) % action.beats[i].length;
      }
      return {
        ...state,
        currentIndex: currentArray,
      }
    default:
      return state;
  }
};

// Create the store
const store = configureStore({ reducer });

export default store;