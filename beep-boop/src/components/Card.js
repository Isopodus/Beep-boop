import React from 'react';
import { connect } from 'react-redux'
import { ReactMic } from 'react-mic';
import ReactPlayer from 'react-player'

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
    }

    toggleListening() {
        this.setState({
            playing: !this.state.playing
        });
    }

    startRecording() {
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
                                    </>) : (this.props.blobUrl ? (<>
                                        <tr>
                                            <td colSpan="2">
                                                Ваш запис:
                                                <ReactPlayer
                                                    width="0"
                                                    height="0"
                                                    className="player"
                                                    url={this.props.blobUrl}
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
                                                    onStop={(blob) => this.props.updateBlob(blob.blobURL)}
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
                                <textarea placeholder={"I'm blue da ba dee da ba daa..."} rows={'3'} />
                            </div>
                        )}
                </div>

                <div className="btn_block">
                    <input className="btn blue" type="submit" name="submit" value="Надіслати" />
                </div>
            </div >
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateBlob: (blobUrl) => dispatch({ type: 'UPDATE_BLOB', blobUrl: blobUrl }),
        updateFile: (file) => dispatch({ type: 'UPDATE_FILE', file: file }),
    }
}

function mapStateToProps(state) {
    return {
        blobUrl: state.blobUrl,
        file: state.file
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Card)