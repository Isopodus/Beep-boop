import React from 'react';
import vinyl from '../img/vinyl.png'
import '../style/Header.scss'

function Header() {
    return (
        <div className="header">
            <img src={vinyl} alt=""/>
            <p>Beep-boop</p>
        </div>
    )
}

export default Header