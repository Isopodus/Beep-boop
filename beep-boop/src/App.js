import React from 'react';
import './style/App.scss';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import Header from './components/Header'
import Content from './components/Content'

const initState = {
    blobUrl: null,
    file: null,
    game: true
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case 'UPDATE_BLOB': {
            return {
                ...state,
                blobUrl: action.blobUrl
            }
        }
        case 'UPDATE_FILE': {
            return {
                ...state,
                file: action.file
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
