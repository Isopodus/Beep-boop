import React from 'react';
import { connect } from 'react-redux'

import history from '../img/history.png'
import '../style/History.scss'

function History() {
    return (
        <center>
            <div className="history">
                <img src={history} />
            </div>
        </center>
    )
}

export default History