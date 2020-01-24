import React from 'react';
import { connect } from 'react-redux'

import '../style/Result.scss'

class Result extends React.Component {
    constructor(props) {
        super(props);this.state = {
            playing: false
        }

        this.toggleListening = this.toggleListening.bind(this);
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
                        <th colSpan="3">Поточний рахунок:</th>
                    </thead>
                    <tbody>
                        <tr>
                            <span>гість</span><span className="curr_score">0:0</span><span>додаток</span>
                        </tr>
                    </tbody>
                </table>
                <button className="btn red" onClick={this.props.close}>Закрити</button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        computerWon: state.computerWon,
        userWon: state.userWon,
        playList: state.attempts
    }
}

export default connect(mapStateToProps)(Result)