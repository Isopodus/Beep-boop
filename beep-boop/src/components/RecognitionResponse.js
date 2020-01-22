import React from 'react';
import { connect } from 'react-redux'

import '../style/RecognitionResponse.scss'

function RecognitionResponse(props) {
    return (
        <div className="response">
            <div className="close" onClick={props.close}>{String.fromCharCode(215)}</div>
            {
                props.currentGame.possibleSong === false
                ?
                    <div className="not_found_sound">
                        <h1>Нажаль, нічого не було знайдено!</h1>
                        <p>
                            Здається, додаток не зміг розпізнати пісню. Можливо, це вдасться при наступній раз. Спробуйте покращити якість запису, поточнити текст пісні або загадати іншу.
                        </p>
                        <button className="btn red" onClick={props.close}>Продовжити гру</button>
                    </div>
                : <></>
            }
        </div>
    )
}

function mapDispatchToProps(dispatch) {
    return {
        // updateGame: (game) => dispatch({ type: 'UPDATE_GAME', game: game })
    }
}

function mapStateToProps(state) {
    return {
        currentGame: state.currentGame 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecognitionResponse)