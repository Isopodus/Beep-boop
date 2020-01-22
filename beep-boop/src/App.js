import React from 'react';
import './style/App.scss';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import Header from './components/Header'
import Content from './components/Content'

const initState = {
    blob: null,
    file: null,
    text: "",
    game: true
}

const reducer = (state = initState, action) => {
    switch (action.type) {
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
