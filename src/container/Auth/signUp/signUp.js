import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import classes from './signUp.module.css'
import * as actionCreators from '../../../store/actions/auth'
import { connect } from 'react-redux'

class SignUp extends Component{

    state = {
        email : "",
        password : "",
        isSignedIn : false,
        signedInStats : false
    }

    signOut = () => {
        localStorage.removeItem('idToken')
        localStorage.removeItem('expirationTime')
        window.location.reload(false)
    }

    SignIn = () => {
        this.props.history.push('/signin')
    }

    SignUp = () => {
        this.props.onSignUp(this.state.email , this.state.password, this.state.isSignedIn)
        // window.location.reload(false)
    }

    componentDidMount(){
        if(localStorage.getItem('idToken')){
            this.setState({signedInStats : true})
        }else{
            this.setState({signedInStats : false})
        }
    }

    render(){
        return ( 
            <div className={classes.Container}>
                {
                    this.state.signedInStats ? 
                    <div>
                        <p className={classes.signOut}>signed In</p>
                        <button className={classes.SignOutBtn} onClick={this.signOut}>Sign Out</button>
                    </div> :
                    <div>
                        <p className={classes.title}>Sign Up</p>
                        <label for="email">Email</label>
                        <input type="text"  onChange={(e) => this.setState({ email : e.target.value })} name="email" placeholder="enter your email"/>
                        <label for="password">Password</label>
                        <input type="text"  onChange={(e) => this.setState({ password : e.target.value })} name="password" placeholder="enter your password"/>
                        <button className={classes.signInBtn} onClick = {this.SignUp}>Sign Up</button>
                        <p className={classes.signUpOption}>Already have an account?</p>
                        <button  className={classes.signUpBtn} onClick={this.SignIn}>sign in</button>
                    </div>
                }
            </div>
        )
    }
}
const mapDispatchToProps = dispatch => {
    return { 
        onSignUp : (email, password, isSignedIn) => dispatch(actionCreators.auth(email, password, isSignedIn))
    }
}

export default connect(null , mapDispatchToProps)(withRouter(SignUp))