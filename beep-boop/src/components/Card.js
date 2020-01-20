import React from 'react';
import { ReactMic } from 'react-mic';
import ReactPlayer from 'react-player'
import '../style/Card.scss'

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            record: false,
            url: null,
            playing: false
        }
        this.onStop = this.onStop.bind(this);
        this.startListening = this.startListening.bind(this);
    }

    startListening = () => {
        this.setState({
            playing: !this.state.playing
        });
    }

    startRecording = () => {
        this.setState({
          record: true
        });
    }
     
    stopRecording = () => {
        this.setState({
          record: false
        });
    }
     
    onData(recordedBlob) {
        console.log('chunk of real-time data is: ', recordedBlob);
    }
     
    onStop(recordedBlob) {
        console.log('recordedBlob is: ', recordedBlob);
        this.setState({url: URL.createObjectURL(recordedBlob.blob) })
    }

    render() {
        return(
            <div className='card'>
                <center><img src={this.props.url}/></center>
                <p className="heading">{this.props.title} <br/> <span>{this.props.accent}</span></p>
    
                <div className="description">
                    <div style={{display: this.props.case? '' : 'none' }}>
                        <div className="audio_columns one">
                            Завантажте файл:<br/>
                            <center><label htmlFor="files">Завантажити аудіо</label></center>
                            <input style={{visibility: "hidden", display: "none"}} id="files" type="file" accept="audio/*" name="file"/>
                        </div>
                        <div className="audio_columns two">
                            або зроби запис прямо тут:
                            <ReactMic record={this.state.record} style={{width: '10px'}} className="sound" onStop={this.onStop} />
                            <button onClick={this.startRecording} type="button">Start</button>
                            <button onClick={this.stopRecording} type="button">Stop</button>
                            <button onClick={this.startListening} type="button">Listen</button>
                            <ReactPlayer style={{display: 'none'}} url={this.state.url} playing={this.state.playing} />
                        </div>
                    </div>
    
                    <div style={{display: this.props.case? 'none' : '' }}>
                        <textarea placeholder={"I'm blue da ba dee da ba daa..."} rows={'3'}/>
                    </div>
                </div>
    
                <div className="btn_block">
                    <input className="btn" type="submit" name="submit" value="Надіслати" />
                </div>
            </div>
        )
    }
}

export default Card