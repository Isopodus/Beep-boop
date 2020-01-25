import React from 'react';
import { connect } from 'react-redux'
import Cookie from 'universal-cookie'

import '../style/Result.scss'

class Result extends React.Component {
    constructor(props) {
        super(props);this.state = {
            playing: false
        }

        this.toggleListening = this.toggleListening.bind(this);
    }

    componentDidMount() {
        // TODO test it
        const cookies = new Cookie();
        var bufCookie = null;
        if (this.props.computerWon) {
            if (cookies.get('history')) {
                bufCookie = cookies.get('history');
                bufCookie.push(cookies.get('attempts')[cookies.get('attempts').length - 1]);
                cookies.set('history', bufCookie);
            }
            else {
                cookies.set('history', [ cookies.get('attempts')[cookies.get('attempts').length - 1] ]);
            }
        }
        else {
            if (cookies.get('history')) {
                bufCookie = cookies.get('history');
                bufCookie.push(null);
                cookies.set('history', bufCookie);
            }
            else {
                cookies.set('history', [ null ]);
            }
        }
        cookies.remove('attempts');
    }

    toggleListening() {
        this.setState({
            playing: !this.state.playing
        });
    }

    render() {
        // TODO playlist
        // TODO score
        var sounds;
        if (this.props.playList.every(function(sound) { return sound == null })) {
            sounds = <p>Нажаль, не було знайдено жодної схожої пісні.</p>
        }
        else {
            sounds = this.props.playList.map(sound => {
                if (sound) {
                    return null
                }
            })
        }

        return (
            <div className="result">
                <div className="close" onClick={this.props.close}>{String.fromCharCode(215)}</div>
                <h1>{this.props.computerWon ? 'Додаток виграв!' : 'Ви виграли!'}</h1>
                <table>
                    <thead>
                        <tr>
                            <th colSpan="3">Поточний рахунок:</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <span>гість</span><span className="curr_score">0:0</span><span>додаток</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button className="btn red" onClick={() => {
                    this.props.close();
                    this.props.finishGame();
                }}>
                    Закрити
                </button>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        finishGame: () => dispatch({ type: 'FINISH_GAME' })
    }
}

function mapStateToProps(state) {
    return {
        computerWon: state.computerWon,
        userWon: state.userWon,
        playList: state.attempts
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Result)