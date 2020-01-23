// TODO прокрутка в case 'START_GAME'

import React from 'react';
import { connect } from 'react-redux';

import Header from './components/Header'
import Content from './components/Content'

class App extends React.Component {
    constructor(props) {
        super(props);
    }
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
        game: state.game, 
        currentGame: state.currentGame 
    }
}

export default connect(mapStateToProps)(App);
