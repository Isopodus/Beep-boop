import React from 'react';
import './style/App.scss';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import Header from './components/Header'
import Content from './components/Content'

const initState = {
  url: null,
  game: false,
  popUp: false
}
const reducer = (state = initState, action) => {
  switch(action.type) {
    case 'ON_STOP': {
      return { ...state, url: action.newState.blobURL }
    }
    case 'START_GAME': {
      console.log(state.game)
      return { ...state, game: true }
    }
  }

  return state
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
