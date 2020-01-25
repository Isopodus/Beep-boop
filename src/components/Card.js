import React from 'react';
import { connect } from 'react-redux'
import Popup from "reactjs-popup";
import { ReactMic } from 'react-mic'
import ReactPlayer from 'react-player'
import api from '../api'
import '../style/Card.scss'

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            record: false,
            playing: false,
            popUp: false
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
        setTimeout(function(){
            this.stopRecording();
        }.bind(this), 20000);
    }

    stopRecording() {
        this.setState({
            record: false
        });
    }

    handleFile(e) {
        if (e.target.files[0].size > 10485760) {
            e.target.value = null
            this.props.updateFile(false)
            this.props.updateBlob(null)
            this.setState({ popUp: true })
        }
        else {
            this.props.updateFile(e.target.files[0])
            this.props.updateBlob(null)
        }
    }

    handleText(e) {
        this.props.updateText(e.target.value)
    }

    sendAudio() {
        var file = this.props.file
        if (!file && this.props.blob) {
            file = new File([this.props.blob.blob], "record.mp3", { lastModified: new Date(), type: 'audio/mp3' });
        }
        if (!this.props.blob && !this.props.file) {
            return;
        }
        var formData = new FormData();
        formData.append("file", file);
        this.props.toggleSpinner();
        api.sendAudio(formData)
            .then((response) => {
                if (response.status === 200 && response.data.status === "success") {
                    let generalized = api.generalizeResponse(response.data)
                    this.props.updateSong(generalized.result && generalized.result.length > 0 ? generalized.result[0] : false)
                    this.props.toggleSpinner();
                } else {
                    this.setState({ popUp: true })
                    this.props.toggleSpinner();
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    sendText() {
        if (this.props.text !== "") {
            this.props.toggleSpinner();
            api.sendText(this.props.text)
                .then((response) => {
                    if (response.status === 200 && response.data.status === "success") {
                        let generalized = api.generalizeResponse(response.data)
                        this.props.updateSong(generalized.result && generalized.result.length > 0 ? generalized.result[0] : false)
                        this.props.toggleSpinner();
                    }
                    else {
                        this.setState({ popUp: true })
                        this.props.toggleSpinner();
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }


    render() {
        return (
            <div className='card'>
                <img src={this.props.imgUrl} alt="" />
                <p className="heading">{this.props.title} <br /> <span>{this.props.accent}</span></p>

                <div className="description">
                    {this.props.case ? (
                        <div>
                            <table>
                                <tbody>
                                    {this.props.file != null ? (<>
                                        <tr><td>Ваш файл:</td></tr>
                                        <tr>
                                            <td className="audio_file">
                                                {this.props.file ? this.props.file.name : "Сталася помилка, спробуйте ще раз!"}
                                                <div
                                                onClick={() => this.props.updateFile(null)}
                                                className="delete"
                                                >
                                                    {String.fromCharCode(215)}
                                                </div>
                                            </td>
                                        </tr>
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
                                            <div onClick={this.toggleListening} className="play">
                                                { this.state.playing ? String.fromCharCode(9209) : String.fromCharCode(9654) }
                                            </div>
                                            <p style={{ display: 'inline-block', margin: 0 }}>Голосовий запис</p>
                                            <div onClick={() => this.props.updateBlob(null)} className="delete">
                                                {String.fromCharCode(215)}
                                            </div>
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
                        <Popup open={this.state.popUp} modal>
                            {close => (
                                <>
                                    <h1>Сталася помилка! Можливо, ваш файл занадто малий або великий.</h1>
                                    <button className="btn red" onClick={() => {
                                        close();
                                        this.setState({ popUp: false })
                                    }}>
                                        Зрозумiло
                                    </button>
                                </> 
                            )}
                        </Popup>
                        </div>)
                        : (
                            <div>
                                <textarea id="song_text" onChange={this.handleText} placeholder={"I'm blue da ba dee da ba daa..."} rows={'3'} />
                        <Popup open={this.state.popUp} modal>
                            {close => (
                                <>
                                    <h1>Сталася помилка! Повторiть спробу.</h1>
                                    <button className="btn red" onClick={() => {
                                        close();
                                        this.setState({ popUp: false })
                                    }}>
                                        Зрозумiло
                                    </button>
                                </>
                            )}
                        </Popup>
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
        updateSong: (song) => dispatch({ type: 'UPDATE_SONG', song: song }),
        toggleSpinner: () => dispatch({ type: 'TOGGLE_SPINNER' })
    }
}

function mapStateToProps(state) {
    return {
        blob: state.blob,
        file: state.file,
        text: state.text,
        possibleSong: state.possibleSong
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Card)