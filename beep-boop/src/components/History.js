import React from 'react';
import Cookie from 'universal-cookie'
import { connect } from 'react-redux'

import '../style/History.scss'

const cookies = new Cookie();

class History extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        // var games = cookies.get('history').map(game => {
        //     return null
        // })
        return (
            <div className="history">
                <div className="close" onClick={this.props.close}>{String.fromCharCode(215)}</div>
                <h1>Історія ігор</h1>
                {
                    !cookies.get('history')
                    ?
                        <>
                            <h1 className="empty_history">Здається, у вас ще не було проведено жодної гри!</h1>
                            <button className="btn red" onClick={() => {
                                this.props.close();
                                this.props.onStart();
                            }}>
                                Почати гру
                            </button>
                        </>
                    :
                        <table>
                            <thead>
                                <tr>
                                    <th>Номер гри</th>
                                    <th>Композиція</th>
                                    <th>Результат</th>
                                </tr>
                            </thead>
                        </table>
                }
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onStart: () => dispatch({ type: 'START_GAME' })
    }
}

export default connect(null, mapDispatchToProps)(History)