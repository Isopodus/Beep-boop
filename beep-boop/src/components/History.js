import React from 'react';

import '../style/History.scss'

function History(props) {
    return (
        <div className="history">
            <div className="close" onClick={props.close}>{String.fromCharCode(215)}</div>
            <h1>Історія ігор</h1>
            <table>
                <thead>
                    <tr>
                        <th>Номер гри</th>
                        <th>Композиція</th>
                        <th>Результат</th>
                    </tr>
                </thead>
            </table>
        </div>
    )
}

export default History