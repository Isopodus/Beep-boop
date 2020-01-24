import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Cookie from 'universal-cookie'

import './style/index.scss';
import App from './App';

const cookies = new Cookie();

const initState = {
    blob: null,
    file: null,
    text: "",
    game: !cookies.get('attempts') ? false : true,
    attempts: !cookies.get('attempts') ? [] : cookies.get('attempts'),
    possibleSong: null,
    computerWon: false,
    userWon: false
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case 'START_GAME': {
            setTimeout(() => {
                window.scrollBy({top: document.getElementById('introduction').offsetHeight, behavior: 'smooth'});
            }, 100);

            return {
                ...state,
                game: true
            }
        }
        case 'UPDATE_SONG': {
            return {
                ...state,
                possibleSong: action.song
            }
        }
        case 'UPDATE_BLOB': {
            return {
                ...state,
                blob: action.blob
            }
        }
        case 'UPDATE_FILE': {
            return {
                ...state,
                file: action.file
            }
        }
        case 'UPDATE_TEXT': {
            return {
                ...state,
                text: action.text
            }
        }
        case 'WRONG_ANSWER': {
            let temp = [...state.attempts]
            temp.push(action.song);
            return {
                ...state,
                attempts: temp,
                possibleSong: null,
                userWon: state.attempts.length == 5 ? true : false
            }
        }
        case 'RIGHT_ANSWER': {
            let temp = [...state.attempts]
            temp.push(action.song);
            return {
                ...state,
                game: false,
                attempts: temp,
                possibleSong: null,
                computerWon: true
            }
        }
        default: {
            return state
        }
    }
}
const store = createStore(reducer);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));