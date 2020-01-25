import React from 'react';
import Cookie from 'universal-cookie'
import { connect } from 'react-redux'

import '../style/History.scss'

class History extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="history">
                <div className="close" onClick={this.props.close}>{String.fromCharCode(215)}</div>
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
}

export default History