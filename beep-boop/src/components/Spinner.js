import React from 'react'
import { connect } from 'react-redux';

import '../style/Spinner.scss'

function Spinner(props) {
    return(
        <div className="wrapper" style={{display: props.spinner ? '' : 'none' }}>
            <div className="cssload-loading">
                <i></i>
                <i></i>
                <i></i>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return { 
        spinner: state.spinner
    }
}

export default connect(mapStateToProps)(Spinner)