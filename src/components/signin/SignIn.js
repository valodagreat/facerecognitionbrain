import React, { Component } from 'react'

class SignIn extends Component {
    state = {
        email : '',
        password : ''
    }


    handleEmailChange = e => {
        this.setState({ email: e.target.value})
    }

    onPasswordChange = e => {
        this.setState({ password: e.target.value})
    }

    onSubmitSignIn = e => {
        fetch('http://localhost:3001/signin', {
            method : 'POST',
            headers : { 'Content-Type' : 'application/json'},
            body : JSON.stringify({
                email : this.state.email,
                password : this.state.password
            })
        })
        .then(response => response.json())
        .then(data => {
            if(data.id){
                this.props.loadUser(data)
                this.props.onRouteChange('home')
            }
        })
    }
    
    render() {
        return (
            <div>
                <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <form className="measure" method='POST' action='localhost:3001/signin'>
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f3 fw6 ph0 mh0">Sign In</legend>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                    <input onChange={this.handleEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email"  id="email-address" />
                                </div>
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                    <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
                                </div>
                                    {/*<label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox" /> Remember me</label>*/}
                        </fieldset>
                        <div className="">
                        <button 
                        onClick={this.onSubmitSignIn}
                        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                        value="Sign in" >Sign in</button>
                        </div>
                        <div className="lh-copy mt3">
                        <p onClick={()=> this.props.onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
                        {/*<a href="#0" className="f6 link dim black db">Forgot your password?</a>*/}
                        </div>
                    </form>
                </main>
                </article>
            </div>
        )
    }
}

export default SignIn
