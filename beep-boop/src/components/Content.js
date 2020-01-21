import React from 'react';
import { connect } from 'react-redux'

import '../style/Content.scss'

import Card from './Card'
import History from './History'
import audio from '../img/audio.png'
import text from '../img/text.png'

const data = [
    {
        title: 'Пошук за допомогою',
        accent: 'запису',
        description: 'Описание тоже на две строчки, потом посмотрим, что там будет',
        imgUrl: audio,
        case: true
    },
    {
        title: 'Пошук за допомогою',
        accent: 'тексту',
        description: 'Описание тоже на две строчки, потом посмотрим, что там будет №2',
        imgUrl: text,
        case: false
    },
]

class Content extends React.Component {
    render() {
        var cards = data.map(record => { return <Card key={record.case} {...record} /> })

        return(
            <>
                <div className="triangle" />
                <div className="game">
                    <p className="title">Title</p>
                    <section style={{ display: this.props.game ? '' : 'none', marginBottom: 0 }}>
                        {cards}
                    </section>
                    <History />
                </div>
            </>
        )
    }
}

function mapStateToProps(state) {
    return { game: state.game }
}

export default connect(mapStateToProps)(Content)