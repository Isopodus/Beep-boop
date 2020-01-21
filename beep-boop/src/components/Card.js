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
        this.startListening = this.startListening.bind(this);
    }

    startListening() {
        this.setState({ playing: !this.state.playing });
    }
    startRecording() {
        this.setState({ record: true });
    }
    stopRecording() {
        this.setState({ record: false });
    }

    render() {
        return(
            <div className='card'>
                <center><img src={this.props.imgUrl}/></center>
                <p className="heading">{this.props.title} <br/> <span>{this.props.accent}</span></p>
    
                <div className="description">
                    {this.props.case ? (
                    <div>
                        <table>
                            <tr>
                                <td>Завантаж файл:</td>
                                <td>або зроби запис прямо тут:</td>
                            </tr>
                            <tr>
                                <td>
                                    <center><label className="btn red" htmlFor="files">Завантажити</label></center>
                                    <input
                                        style={{visibility: "hidden", display: "none"}}
                                        id="files"
                                        type="file"
                                        accept="audio/*"
                                        name="file"
                                    />
                                </td>
                                <td>
                                    <ReactMic record={this.state.record} className="sound" onStop={this.props.onStop} width={0} height={0} />
                                    <button
                                        onClick={this.state.record ? this.stopRecording : this.startRecording }
                                        type="button"
                                        className="btn red"
                                    >
                                        {this.state.record ? 'Стоп' : 'Почати запис'}
                                    </button>
                                    {/* <button onClick={this.startListening} type="button" className="btn red">Прослухати</button>
                                    <ReactPlayer style={{display: 'none'}} url={this.props.url} playing={this.state.playing} /> */}
                                </td>
                            </tr>
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
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onStop: (newState) => dispatch({ type: 'ON_STOP', newState })
    }
}

function mapStateToProps(state) {
    return { url: state.url }
}

export default connect(mapStateToProps, mapDispatchToProps)(Card)