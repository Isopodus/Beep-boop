import React from 'react';
import { connect } from 'react-redux'
import Popup from "reactjs-popup";
import Slider from "react-slick";
import Cookie from 'universal-cookie'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../style/Content.scss'

import Card from './Card'
import Introduction from './Introduction'
import RecognitionResponse from './RecognitionResponse'
import Result from './Result'
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
    constructor(props) {
        super(props);
        this.state = {
            userScore: 0,
            computerScore: 0
        }

        this.reloadScore = this.reloadScore.bind(this)
    }

    componentDidMount() {
        this.reloadScore();
    }

    reloadScore() {
        this.setState({
            userScore: 0,
            computerScore: 0
        })
        const cookies = new Cookie();
        if (cookies.get('history')) {
            cookies.get('history').forEach(game => {
                if (!game) {
                    this.setState(prevState => {
                         return { userScore: prevState.userScore + 1 }
                    })
                }
                else {
                    this.setState((prevState) => {
                        return { computerScore: prevState.computerScore + 1 }
                    })
                }
            })
        }
    }

    render() {
        var cards = data.map(record => { return <Card key={record.case} {...record} /> })
        var settings = {
            arrows: false,
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
        };

        return (
            <>
                <div className="triangle" />
                <div className="game">
                    <p className="title">Музичний акiнатор</p>
                    <p className="introductory_description">
                        <span>Beep-boop</span> - це музичний акінатор, тобто гра, в якiй комп'ютер повинен вiдгадати пiсню, що ви загадали,
                        і до того ж надасть вам можливість прослухати та насолодитись нею.

                    </p>

                    <Introduction />
                    { this.props.userWon === true || this.props.computerWon === true
                        ? <Popup open={true} modal>{close => ( <Result {...{close: close}} reloadScore={this.reloadScore} /> )}</Popup>
                        : null
                    }
                    <section style={{ display: this.props.game ? '' : 'none', marginBottom: 0 }}>
                        <div className="game_data">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Залишилось спроб:</th>
                                        <th>Поточний рахунок:</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="attempts">
                                            {   this.props.attempts ? 
                                                5 - this.props.attempts.length
                                                : null
                                            }
                                        </td>
                                        <td className="score">{this.state.userScore}:{this.state.computerScore}</td>
                                    </tr>
                                    <tr className="delimiter">
                                        <td></td>
                                        <td><span>гість</span><span>додаток</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="cards">
                            {cards}
                        </div>
                        <Slider {...settings} className="cards_slider">
                            {cards}
                        </Slider>
                        { this.props.possibleSong === null
                            ? null
                            : <Popup open={true} modal>{close => (<RecognitionResponse {...{ close: close }} />)}</Popup>
                        }
                    </section>
                </div>
            </>
        )
    }
}

function mapStateToProps(state) {
    return {
        attempts: state.attempts,
        game: state.game,
        possibleSong: state.possibleSong,
        computerWon: state.computerWon,
        userWon: state.userWon
    }
}

export default connect(mapStateToProps)(Content)