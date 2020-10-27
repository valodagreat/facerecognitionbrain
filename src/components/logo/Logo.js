import React, { Component } from 'react'
//import Tilt from 'react-tilt'
import './logo.css'
import brain from './brain.png'

class Logo extends Component {
    render() {
        return (
            <div className='ma4 mt0 Tilt br2 shadow-2 w4 h4'>
                <div className="Tilt-inner pt2"><img src={brain} alt="logo" /></div>
            </div>
        )
    }
}

export default Logo
