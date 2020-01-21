import React from 'react';

import '../style/History.scss'

function History(props) {
    return (
        <div className="history">
            <a className="close" onClick={props.close}>{String.fromCharCode(215)}</a>
            <h1>Історія ігор</h1>
            <table>
                <thead>
                    <th>Номер гри</th>
                    <th>Композиція</th>
                    <th>Результат</th>
                </thead>
            </table>
        </div>
    )
}

export default History