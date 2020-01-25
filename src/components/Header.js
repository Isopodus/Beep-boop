import React from 'react';

import redVinul from '../img/red_vinyl.png'
import yellowVinyl from '../img/yellow_vinyl.png'
import blueVinyl from '../img/blue_vinyl.png'
import '../style/Header.scss'

const vinyls = [redVinul, yellowVinyl, blueVinyl];
function compareRandom() {
    return Math.random() - 0.5;
}
vinyls.sort(compareRandom);

function Header() {
    return (
        <div className="header">
            <img className="left_img" src={vinyls[0]} alt="" />
            <img className="main_img" src={vinyls[1]} alt="" />
            <img className="right_img" src={vinyls[2]} alt="" />
            <p>Beep-boop</p>
        </div>
    )
}

export default Header