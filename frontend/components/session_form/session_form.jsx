import React from 'react';
import NavBar from './nav_bar'
import { Link, withRouter } from 'react-router-dom';
import { render } from 'react-dom';
import { REMOVE_SESSION_ERROR } from '../../actions/session_actions';
//import image from '../../../app/assets/images/jog1.jpg'

let num = Math.floor(Math.random() * 5);
class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password:''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.renderErrors = this.renderErrors.bind(this)
  }


  componentWillUnmount(){
    this.props.removeErrors(); // clear errors
  }

  handleSubmit(e){
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user)
  }

  handleChange(field){
    return e => {
      this.setState({[field]: e.target.value})
    }
  }


  renderErrors() {
    return (
      <ul>
        {this.props.errors.map((error, i) => (
          <li key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  render(){
    const errors = this.props.errors.map(error => {
      return (<li>{error}</li>) 
    })

    const showErrors = this.props.errors.length ? <ul >{errors}</ul> : null
    let buttonName;
    if (this.props.formType === 'login') {
      buttonName = 'Log In'
    } else {
      buttonName = "Sign Up"
    }

    let formName = () =>{
      if (this.props.formType === 'login'){
        return <p>Log In</p>
      } else {
        return  <p> Join Trace today,<br/> it's Free.</p>
      }
    }
    // if (this.props.formType === 'login'){
    //   formName = 'Log In'
    // } else {
    //   formName =
    // }

    let OrSwitch;
    if(this.props.formType === 'login'){
      OrSwitch = 'Or log in with email'
    } else {
      OrSwitch = 'or sign up with your email address'
    }

    let finePrint;
    if (this.props.formType === 'signup') {
      finePrint = 'By signing up for Trace, you agree to the.Terms of Service.View our Privacy Policy'
    } 

    return (
      <div className="session_form">
        <NavBar/>
        <div className="background_image" style={{backgroundImage: `url(jog${num}.jpg)`}} >
          <div className="form_background">
            <div className="form_container">
            <div className="form_title">
              <h1 >{formName()}</h1>  
            </div>
            <section className='error_message'>{showErrors}</section>
            <form className="session_form" onSubmit={this.handleSubmit}>
              <br/>
              <div className="form_body">
                <span className="session_form_lines" id="session_form_demo" 
                onClick={() => { this.props.login({ email: 'guest', password:'password'})}}> Demo User </span> 
                <br/>
                <section className="orSwitch">{OrSwitch}</section>    
                <br/> 
                <input className="session_form_lines form_input" type="email" 
                value={this.state.email} onChange={this.handleChange('email')}  placeholder={'     Your Email'}/>  
                <input className="session_form_lines form_input" type="password" 
                value={this.state.password} onChange={this.handleChange('password')}  placeholder={'     Password'}/>
                <br/>
                <button className="session_form_lines" id="session_button">{buttonName}</button>
              </div>  
              <p className='session_fine_print'>{finePrint}</p>
            </form>    
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SessionForm;