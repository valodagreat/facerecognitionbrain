import React, { Component } from 'react'

class Register extends Component {
    state = {
        firstName : '',
        email : '',
        password : ''
    }

    handleChange = (event) => {
        const {name, value} = event.target
        this.setState({ 
            [name] : value
        })
    }

    onSubmit = (event) => {
        event.preventDefault()
        fetch('https://tranquil-citadel-68333.herokuapp.com/register', {
            method : 'POST',
            headers : { 'Content-Type' : 'application/json'},
            body : JSON.stringify({
                name : this.state.name,
                email : this.state.email,
                password : this.state.password
            })
        })
        .then(response => response.json())
        .then(user => {
            if(user.id){
                this.props.loadUser(user)
                this.props.onRouteChange('home')
            }
        })
        
    }

    render() {
        return (
            <div>
                <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <form className="measure" >
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f3 fw6 ph0 mh0">Sign Up</legend>
                            <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                    <input onChange={this.handleChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name" />
                                </div>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                    <input onChange={this.handleChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email"  id="email-address" />
                                </div>
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                    <input onChange={this.handleChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
                                </div>
                                    {/*<label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox" /> Remember me</label>*/}
                        </fieldset>
                        <div className="">
                        <button 
                        onClick={this.onSubmit}
                        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                        >Register</button>
                        </div>
                    </form>
                </main>
                </article>
            </div>
        )
    }
}

export default Register
