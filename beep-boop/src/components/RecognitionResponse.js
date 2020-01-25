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
        let playButton = null
        let endUrl = null
        if (this.props.possibleSong &&
            this.props.possibleSong.media.length > 0 && 
            this.props.possibleSong.media[0].provider === "youtube") {
                endUrl = this.props.possibleSong.media[0].url
                playButton = <div onClick={this.toggleListening} className="play">
                    { this.state.playing ? String.fromCharCode(9209) : String.fromCharCode(9654) }
                </div>
            }
        return (
            <div className="response">
                <>
                    {
                        this.props.possibleSong === false
                        ?
                        <div className="not_found_sound">
                            <h1>Нажаль, нічого не було знайдено!</h1>
                            <p>
                                Здається, додаток не зміг розпізнати пісню. Спробуйте покращити якість запису або поточнити текст пісні.
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
                                {playButton}
                                <p style={{ display: 'inline-block', margin: 0 }}>
                                    {this.props.possibleSong.artist} - {this.props.possibleSong.title}
                                </p>
                                <ReactPlayer
                                    width="0"
                                    height="0"
                                    style={{display: "inline-block"}}
                                    className="player"
                                    url={endUrl}
                                    playing={this.state.playing}
                                    onEnded={() => this.setState({ playing: false })} 
                                    config={{
                                        youtube: {
                                        playerVars: { showinfo: 1 }
                                        }
                                    }}/>
                            </>
                            <div className="buttons">
                                <button className="btn red" onClick={() => {
                                    this.props.rightAnswer(this.props.possibleSong);
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
                    <img src={search} alt="" />
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