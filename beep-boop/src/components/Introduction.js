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
                    <ul>
                        <li>
                            Гість має загадати будь-яку пісню, а потім заспівати/програти/ввети будь-яку її частину;
                        </li>
                        <li>
                            Додаток намагатиметься відгадати цю пісню та надаватиме користувачеві варіанти своїх відповідей протягом 5-ти спроб;
                        </li>
                        <li>
                            Якщо правильна відповідь не була надана, перемогу одержує гість (користувач має змогу підтверджувати правильніть відповіді), у протилежному випадку - додаток.
                        </li>
                    </ul>
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