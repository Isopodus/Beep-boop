import React from 'react';
import '../style/Content.scss'

import Card from './Card'
import audio from '../img/audio.png'
import text from '../img/text.png'

const data = [
    {
        title: 'Пошук за допомогою',
        accent: 'запису',
        description: 'Описание тоже на две строчки, потом посмотрим, что там будет',
        url: audio,
        case: true
    },
    {
        title: 'Пошук за допомогою',
        accent: 'тексту',
        description: 'Описание тоже на две строчки, потом посмотрим, что там будет №2',
        url: text,
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
                    <section>
                        {cards}
                    </section>
                </div>
            </>
        )
    }
}

export default Content