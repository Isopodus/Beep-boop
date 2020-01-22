import React from 'react';
import { connect } from 'react-redux'
import { ReactMic } from 'react-mic'
import ReactPlayer from 'react-player'
import api from '../api'
import '../style/Card.scss'

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            record: false,
            playing: false
        }

        this.startRecording = this.startRecording.bind(this);
        this.stopRecording = this.stopRecording.bind(this);
        this.toggleListening = this.toggleListening.bind(this);
        this.handleFile = this.handleFile.bind(this);
        this.handleText = this.handleText.bind(this);
        this.sendAudio = this.sendAudio.bind(this);
        this.sendText = this.sendText.bind(this);
    }

    toggleListening() {
        this.setState({
            playing: !this.state.playing
        });
    }

    startRecording() {
        this.props.updateFile(null)
        this.setState({
            record: true
        });
    }

    stopRecording() {
        this.setState({
            record: false
        });
    }

    handleFile(e) {
        this.props.updateFile(e.target.files[0])
        this.props.updateBlob(null)
    }

    handleText(e) {
        this.props.updateText(e.target.value)
    }

    sendAudio() {
        var file = this.props.file
        if (!file) {
            file = new File([this.props.blob.blob], "record.mp3", { lastModified: new Date(), type: 'audio/mp3' });
        }
        var formData = new FormData();
        formData.append("record", file);
        api.sendAudio(formData)
            .then((response) => {
                if (response.status === 200 && response.data.status === "success") {
                    this.props.updateGame({
                        ...this.props.currentGame,
                        possibleSong: response.data.result[0]
                    })
                    console.log(this.props.currentGame)
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    sendText() {
        api.sendText(this.props.text)
            .then((response) => {
                if (response.status === 200 && response.data.status === "success") {
                    this.props.updateGame({
                        ...this.props.currentGame,
                        possibleSong: response.data.result[0]
                    })
                    console.log(this.props.currentGame)
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }


    render() {
        return (
            <div className='card'>
                <center><img src={this.props.imgUrl} alt="" /></center>
                <p className="heading">{this.props.title} <br /> <span>{this.props.accent}</span></p>

                <div className="description">
                    {this.props.case ? (
                        <div>
                            <table>
                                <tbody>
                                    {this.props.file ? (<>
                                        <tr><td>Ваш файл:</td></tr>
                                        <tr><td>{this.props.file ? this.props.file.name : "Error"}</td></tr>
                                        <tr><td>
                                            <button
                                                onClick={() => this.props.updateFile(null)}
                                                type="button"
                                                className="btn red"
                                            >Назад</button>
                                        </td></tr>
                                    </>) : (this.props.blob ? (<>
                                        <tr>
                                            <td colSpan="2">
                                                Ваш запис:
                                                <ReactPlayer
                                                    width="0"
                                                    height="0"
                                                    className="player"
                                                    url={this.props.blob.blobURL}
                                                    playing={this.state.playing}
                                                    onEnded={() => this.setState({ playing: false })} />
                                            </td>
                                        </tr>
                                        <tr style={{ marginBottom: 20 }}><td>
                                            <button
                                                onClick={this.toggleListening}
                                                type="button"
                                                className="btn red"
                                            >{this.state.playing ? 'Стоп' : 'Прослухати'}</button>
                                        </td></tr>
                                        <tr><td>
                                            <button
                                                onClick={() => this.props.updateBlob(null)}
                                                type="button"
                                                className="btn red"
                                            >Назад</button>
                                        </td></tr>
                                    </>) : (<>
                                        <tr>
                                            <td>Завантаж файл:</td>
                                            <td>Або зроби аудiозапис:</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label className="btn red" htmlFor="files">Завантажити</label>
                                                <input
                                                    style={{ visibility: "hidden", display: "none" }}
                                                    id="files"
                                                    type="file"
                                                    accept="audio/*"
                                                    name="file"
                                                    onChange={this.handleFile}
                                                />
                                            </td>
                                            <td>
                                                <ReactMic
                                                    record={this.state.record}
                                                    className="sound"
                                                    onStop={(blob) => this.props.updateBlob(blob)}
                                                    width={0} height={0} />
                                                <button
                                                    onClick={this.state.record ? this.stopRecording : this.startRecording}
                                                    type="button"
                                                    className={this.state.record ? "btn red_blinking" : "btn red"}
                                                >
                                                    {this.state.record ? 'Стоп' : 'Почати запис'}
                                                </button>
                                                <div className="divider" />
                                            </td>
                                        </tr>
                                    </>))}
                                </tbody>
                            </table>
                        </div>)
                        : (
                            <div>
                                <textarea onChange={this.handleText} placeholder={"I'm blue da ba dee da ba daa..."} rows={'3'} />
                            </div>
                        )}
                </div>

                <div className="btn_block">
                    <input className="btn blue" type="submit" name="submit" value="Надіслати"
                        onClick={this.props.case ? this.sendAudio : this.sendText} />
                </div>
            </div >
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateBlob: (blob) => dispatch({ type: 'UPDATE_BLOB', blob: blob }),
        updateFile: (file) => dispatch({ type: 'UPDATE_FILE', file: file }),
        updateText: (text) => dispatch({ type: 'UPDATE_TEXT', text: text }),
        updateGame: (game) => dispatch({ type: 'UPDATE_GAME', game: game }),
    }
}

function mapStateToProps(state) {
    return {
        blob: state.blob,
        file: state.file,
        text: state.text,
        currentGame: state.currentGame 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Card)