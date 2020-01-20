import React from 'react';
import './style/App.scss';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import Header from './components/Header'
import Content from './components/Content'

const initState = {
  currState: true
}
const reducer = (state = initState) => {
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
