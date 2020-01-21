import React from 'react';
import Popup from "reactjs-popup";
import { connect } from 'react-redux'

import History from './History'
import introduction from '../img/introduction.png'
import '../style/Introduction.scss'

function Introduction(props) {
    return (
        <div className="introduction">
            <img src={introduction} />
            <div className="wrap">
                <h2>Коротко про правила гри:</h2>
                <div className="rules">
                    blablabla
                </div>
                { props.game
                    ? null
                    : <>
                        <button onClick={props.onStart} className="btn red">Почати гру</button>
                        <div className="divider"/>
                    </>
                }
                <Popup trigger={<button className="btn red">Історія гри</button>} modal>
                    {close => ( <History {...{close: close}}/> )}
                </Popup>
            </div>
        </div>
    )
}

function mapDispatchToProps(dispatch) {
    return {
        onStart: () => dispatch({ type: 'START_GAME' })
    }
}

function mapStateToProps(state) {
    return { game: state.game }
}

export default connect(mapStateToProps, mapDispatchToProps)(Introduction)