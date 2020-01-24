// TODO прокрутка в case 'START_GAME'

import React from 'react';
import { connect } from 'react-redux';

import Header from './components/Header'
import Content from './components/Content'

class App extends React.Component {
    render() {
        return (
            <>
                <Header />
                <Content />
            </>
        );
    }
}

function mapStateToProps(state) {
    return { 
        game: state.game
    }
}

export default connect(mapStateToProps)(App);
