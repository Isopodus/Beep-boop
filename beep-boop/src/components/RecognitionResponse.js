import React from 'react';
import { connect } from 'react-redux'
import Cookie from 'universal-cookie'

import '../style/RecognitionResponse.scss'

class RecognitionResponse extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const cookies = new Cookie();
        if (cookies.get('attempts')) {
            var bufCookie = cookies.get('attempts');
            bufCookie.push(this.props.currentGame.possibleSong == false ? null : this.props.currentGame.possibleSong);
            cookies.set('attempts', bufCookie);
        }
        else {
            cookies.set('attempts', [this.props.currentGame.possibleSong == false ? null : this.props.currentGame.possibleSong])
        }
    }
    render() {
        return (
            <div className="response">
                <div className="close" onClick={this.props.close}>{String.fromCharCode(215)}</div>
                {
                    this.props.currentGame.possibleSong === false
                    ?
                        <div className="not_found_sound">
                            <h1>Нажаль, нічого не було знайдено!</h1>
                            <p>
                                Здається, додаток не зміг розпізнати пісню. Можливо, це вдасться при наступній раз. Спробуйте покращити якість запису або поточнити текст пісні.
                            </p>
                            <button className="btn red" onClick={(e) => { return this.props.onClick; this.props.close() }}>
                                Продовжити гру
                            </button>
                        </div>
                    : <></>
                }
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onClick: () => dispatch({ type: 'WRONG_ANSWER' })
    }
}

function mapStateToProps(state) {
    return {
        currentGame: state.currentGame 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecognitionResponse)