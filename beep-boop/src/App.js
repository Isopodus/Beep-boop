import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
//import Cookie from 'universal-cookie'

import Header from './components/Header'
import Content from './components/Content'

//const cookies = new Cookie();

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
