import React, { Component } from 'react'

class Navigation extends Component {
    render() {
        return (
            <div>
                { this.props.isSignedIn ?
                <nav className='flex justify-end'>
                    <p onClick={() => this.props.onRouteChange('signout')} className='f3 link dim black pa3 pointer'>
                        Sign-Out
                    </p>
                </nav> : 
                <nav className='flex justify-end'>
                        <p onClick={() => this.props.onRouteChange('signin')} className='f3 link dim black pa3 pointer'>Sign In</p>
                        <p onClick={() => this.props.onRouteChange('register')} className='f3 link dim black pa3 pointer'>Register</p>
                </nav>
                }
            </div>
        )
    }
}

export default Navigation
