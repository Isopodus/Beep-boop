import React from 'react';
import { connect } from 'react-redux'
import Cookie from 'universal-cookie'
import ReactPlayer from 'react-player'

import search from '../img/search.png'
import '../style/RecognitionResponse.scss'

class RecognitionResponse extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            playing: false
        }

        this.toggleListening = this.toggleListening.bind(this);
    }

    componentDidMount() {
        const cookies = new Cookie();
        if (cookies.get('attempts')) {
            var bufCookie = cookies.get('attempts');
            bufCookie.push(this.props.possibleSong === false ? null : this.props.possibleSong);
            cookies.set('attempts', bufCookie);
        }
        else {
            cookies.set('attempts', [this.props.possibleSong === false ? null : this.props.possibleSong])
        }
    }

    toggleListening() {
        this.setState({
            playing: !this.state.playing
        });
    }

    render() {
        return (
            <div className="response">
                <div className="close" onClick={this.props.close}>{String.fromCharCode(215)}</div>
                <>
                    {
                        this.props.possibleSong === false
                        ?
                        <div className="not_found_sound">
                            <h1>Нажаль, нічого не було знайдено!</h1>
                            <p>
                                Здається, додаток не зміг розпізнати пісню. Можливо, це вдасться в наступній раз. Спробуйте покращити якість запису або поточнити текст пісні.
                            </p>
                            <button className="btn red" onClick={() => { 
                                this.props.close();
                                this.props.wrongAnswer(null);
                            }}>
                                Продовжити гру
                            </button>
                        </div>
                        :
                        <div className="found_song">
                            <h1>Ми знайшли!</h1>
                            <>
                                <div onClick={this.toggleListening} className="play">
                                    { this.state.playing ? String.fromCharCode(9209) : String.fromCharCode(9654) }
                                </div>
                                <p style={{ display: 'inline-block', margin: 0 }}>
                                    {this.props.possibleSong.artist} - {this.props.possibleSong.title}
                                    <ReactPlayer
                                        width="0"
                                        height="0"
                                        className="player"
                                        url={this.props.possibleSong.media['youtube']}
                                        playing={this.state.playing}
                                        onEnded={() => this.setState({ playing: false })} />
                                    {/* TODO сделать на разные ресурсы ссылку */}
                                </p>
                            </>
                            <div className="buttons">
                                <button className="btn red" onClick={() => {
                                    this.props.rightAnswer();
                                    this.props.close();
                                }}>
                                    Так, це воно!
                                </button>
                                <div className="divider" />
                                <button className="btn red" onClick={() => {
                                    this.props.wrongAnswer(this.props.possibleSong);
                                    this.props.close();
                                }}>
                                    Ні, це не воно!
                                </button>
                            </div>
                        </div>
                    }
                    <img src={search} />
                </>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        wrongAnswer: (song) => dispatch({ type: 'WRONG_ANSWER', song: song }),
        rightAnswer: (song) => dispatch({ type: 'RIGHT_ANSWER', song: song })
    }
}

function mapStateToProps(state) {
    return {
        possibleSong: state.possibleSong 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecognitionResponse)