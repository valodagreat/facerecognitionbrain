import React, { Component } from 'react'
import './FaceRecognition.css'

class FaceRecognition extends Component {
    render() {
        const{pics,box} = this.props
        const bords = box.map(user => (<div key={user.topRow} className='bounding-box' style={{top:user.topRow, right:user.rightCol , bottom:user.bottomRow, left:user.leftCol}}></div>))
        const fac = box.length -1 > 0 ? 'faces' : 'face'
        const cac = box.length -1 < 0 ? null : `${box.length} ${fac} detected`
        return (
            <div className='flex justify-around'>
            <div className='center ma flex flex-column justify-between items-center '>
                <div className='absolute mt2'>
                    <img id='inputimage' className='tc' alt='' src={pics} width='500px' height='auto'/>
                            {bords}
                </div>
            </div>
                <div className='pt5 tc f2'>
                    {cac}
                </div>
            </div>
        )
    } 
}

export default FaceRecognition
