import React from 'react';
import './style/App.scss';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import $ from "jquery";

import Header from './components/Header'
import Content from './components/Content'

const initState = {
    blob: null,
    file: null,
    text: "",
    game: false,
    currentGame: {
        attempts: 0,
        possibleSong: null,
        computerWon: false
    }
}

function f() {
    window.scrollBy(0, document.getElementById('game').offsetHeight);
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case 'START_GAME': {
            return {
                ...state,
                game: true
            }
            f()
        }
        case 'UPDATE_GAME': {
            return {
                ...state,
                currentGame: action.game
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
        default: {
            return state
        }
    }
}
const store = createStore(reducer);

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Header />
                <Content />
            </Provider>
        );
    }
}

export default App;
