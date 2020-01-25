import React from 'react';
import Cookie from 'universal-cookie'
import { connect } from 'react-redux'
import ReactPlayer from 'react-player'

import '../style/History.scss'

const cookies = new Cookie();

class History extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playing: false,
            url: null
        }
    }
    render() {
        let songs = cookies.get('history');
        var games = null 
        if(songs) {
            games = songs.slice(0).reverse().map((sound, index) => {
                let currentSongPlaying = false;
                if (sound && sound.media.length > 0 && this.state.url === sound.media[0].url) {
                    currentSongPlaying = true
                } 
                return <tr key={index}>
                    <td>{songs.length - index}</td>
                    <td className="song_cell" style={{ textAlign: "left" }}>{sound && sound.media.length > 0 && sound.media[0].provider === "youtube" ? 
                    <div className="play" onClick={() => {
                            this.setState({
                                playing: !this.state.playing
                            });
                            this.setState({url: sound.media[0].url})
                        }} className="play">
                            { currentSongPlaying && this.state.playing ? String.fromCharCode(9209) : String.fromCharCode(9654) }
                        </div>
                        :
                        <span style={{ color: "white", paddingRight: 10 }}>{String.fromCharCode(9654)}</span>
                        }
                        { sound ? 
                            <p style={{ display: 'inline-block', margin: 0 }}>
                                { sound && sound.artist ? sound.artist : "Невiдомий"} - {sound && sound.title ? sound.title : "-"}
                            </p>
                            :
                            <p style={{ display: 'inline-block', margin: 0}}>
                                Невiдома
                            </p>
                        }
                    </td>
                    <td className="disabled_on_mobile">
                        {sound ? "Перемiг комп'ютер" : "Перемiг гiсть"}
                    </td>
                </tr>
            })
        }
        return (
            <div className="history">
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

                <div className="close" onClick={this.props.close}>{String.fromCharCode(215)}</div>
                <h1>Історія ігор</h1>
                {
                    !cookies.get('history')
                    ?
                        <>
                            <h1 className="empty_history">Здається, у вас ще не було проведено жодної гри!</h1>
                            <button className="btn red" onClick={() => {
                                this.props.close();
                                this.props.onStart();
                            }}>
                                Почати гру
                            </button>
                        </>
                    :
                    <div className="table_wrap">
                        <table>
                            <thead>
                                <tr>
                                    <th className="disabled_on_mobile">Номер гри</th>
                                    <th className="enabled_on_mobile">№</th>
                                    <th>Композиція</th>
                                    <th className="disabled_on_mobile">Результат</th>
                                </tr>
                            </thead>
                            <tbody>
                                {games}
                            </tbody>
                        </table>
                    </div>
                }
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onStart: () => dispatch({ type: 'START_GAME' })
    }
}

export default connect(null, mapDispatchToProps)(History)