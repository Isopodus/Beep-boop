import React from 'react';
import { connect } from 'react-redux'
import Cookie from 'universal-cookie'
import ReactPlayer from 'react-player'

import '../style/Result.scss'

class Result extends React.Component {
    constructor(props) {
        super(props);this.state = {
            playing: false,
            url: null,
            userScore: 0,
            computerScore: 0
        }

        this.toggleListening = this.toggleListening.bind(this);
    }

    componentDidMount() {
        const cookies = new Cookie();
        var bufCookie = null;
        if (this.props.computerWon) {
            if (cookies.get('history')) {
                bufCookie = cookies.get('history');
                if (bufCookie >= 30) {
                    bufCookie.shift();
                }
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
                if (bufCookie >= 30) {
                    bufCookie.shift();
                }
                bufCookie.push(null);
                cookies.set('history', bufCookie);
            }
            else {
                cookies.set('history', [ null ]);
            }
        }
        cookies.remove('attempts');

        if (cookies.get('history')) {
            cookies.get('history').forEach(game => {
                if (!game) {
                    this.setState(prevState => {
                         return { userScore: prevState.userScore + 1 }
                    })
                }
                else {
                    this.setState((prevState) => {
                        return { computerScore: prevState.computerScore + 1 }
                    })
                }
            })
        }
    }

    toggleListening() {
        this.setState({
            playing: !this.state.playing
        });
    }

    render() {
        var sounds = null;
        if (!this.props.playList.every((sound) => { return sound == null })) {
            sounds = this.props.playList.map((sound, index) => {
                if (sound) {
                    let playing = false;
                    if (sound.media.length > 0 && this.state.url === sound.media[0].url) {
                        playing = true
                    } 
                    return <div key={index}>
                                { sound.media.length > 0 && sound.media[0].provider === "youtube" && <div style={{display: "inline-block"}} onClick={() => {
                                    this.toggleListening()
                                    this.setState({url: sound.media[0].url})
                                }} className="play_yellow">
                                    { playing && this.state.playing ? String.fromCharCode(9209) : String.fromCharCode(9654) }
                                </div>}
                                <p style={{ display: 'inline-block', margin: 0 }} className="result_title">
                                    {sound.artist ? sound.artist : "Невiдомий"} - {sound.title}
                                </p>
                        </div>
                }
            })
        }

        return (
            <div className="result">
                <ReactPlayer
                    width="0"
                    height="0"
                    style={{display: "inline-block"}}
                    className="player"
                    url={this.state.url}
                    playing={this.state.playing}
                    onEnded={() => this.setState({ playing: false })} 
                    config={{
                        youtube: {
                          playerVars: { showinfo: 1 }
                        }
                    }}/>

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
                                <span>гість</span>
                                <span className="curr_score">
                                    {this.state.userScore}:{this.state.computerScore}
                                </span>
                                <span>додаток</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
                {sounds}
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