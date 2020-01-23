import React from 'react';
import { connect } from 'react-redux'
import Popup from "reactjs-popup";

import '../style/Content.scss'

import Card from './Card'
import Introduction from './Introduction'
import RecognitionResponse from './RecognitionResponse'
import audio from '../img/audio.png'
import text from '../img/text.png'

const data = [
    {
        title: 'Пошук за допомогою',
        accent: 'запису',
        description: 'Описание тоже на две строчки, потом посмотрим, что там будет',
        imgUrl: audio,
        case: true
    },
    {
        title: 'Пошук за допомогою',
        accent: 'тексту',
        description: 'Описание тоже на две строчки, потом посмотрим, что там будет №2',
        imgUrl: text,
        case: false
    },
]

class Content extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        var cards = data.map(record => { return <Card key={record.case} {...record} /> })

        return(
            <>
                <div className="triangle" />
                <div className="game">
                    <p className="title">Title</p>
                    <Introduction />
                    <section style={{ display: this.props.game ? '' : 'none', marginBottom: 0 }}>
                        <div className="game_data">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Залишилось спроб:</th>
                                        <th>Поточний рахунок:</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="attempts">
                                            { this.props.currentGame.attempts != undefined
                                                ? 5 - this.props.currentGame.attempts.length
                                                : null
                                            }
                                        </td>
                                        <td className="score"><span>гість</span>0:0<span>додаток</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        {cards}
                        { this.props.currentGame.possibleSong === null
                            ? null
                            : <Popup open={true} modal>{close => ( <RecognitionResponse {...{close: close}}/> )}</Popup> }
                    </section>
                </div>
            </>
        )
    }
}

function mapStateToProps(state) {
    return { 
        game: state.game, 
        currentGame: state.currentGame 
    }
}

export default connect(mapStateToProps)(Content)