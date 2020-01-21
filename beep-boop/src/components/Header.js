import React from 'react';
import vinyl from '../img/vinyl.png'
import '../style/Header.scss'

function Header() {
    return (
        <div className="header">
            <center>
                <img src={vinyl} alt=""/>
                <p>Beep-boop</p>
            </center>
        </div>
    )
}

export default Header