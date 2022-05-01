import React, { Component } from 'react';
import axios from "axios"
import './App.css';

class App extends Component {

  state = {
    email: '',
    name: '',
    tel: '',
    msg: '',
    emailError: '',
    msgError: '',
    telError: '',
    nameError: '',
    sentMessage: ''
  }

  handleChange = (event) => {
    event.preventDefault()
    if(event.target.name === 'tel') {
      if( !isNaN(event.target.value)) {
        this.setState({
          [event.target.name]: event.target.value
        })
      }
      if (event.target.value.length === 0) 
        this.setState({telError : 'Field should not be empty', tel : event.target.value})
    } else if(event.target.name === 'email') {
      if (event.target.value.length === 0) 
        this.setState({emailError : 'Field should not be empty', email : event.target.value})
      else if (event.target.value.length < 10) 
        this.setState({emailError : 'Email length more than 10 chars', email : event.target.value })
      else 
        this.setState({email : event.target.value, emailError: ''}) 
    } else if (event.target.name === 'name') {
      if (event.target.value.length === 0) 
        this.setState({nameError : 'Field should not be empty', name : event.target.value})
      else {
        this.setState({
          [event.target.name]: event.target.value
        })
      }
    } else {
      if (event.target.value.length === 0) 
        this.setState({msgError : 'Field should not be empty', msg : event.target.value})
      else {
        this.setState({
          [event.target.name]: event.target.value
        })
      }
    }
    
  }

  handleSubmit = () => {
    if(this.state.emailError === '' && this.state.telError === '' & this.state.nameError === '' && this.state.msgError === '') {
      this.sumbitRequest()
      
    }
  }

  sumbitRequest = async () => {
    try {
      const response = await axios.post('https://node-react-medgo.herokuapp.com/api/request',{
        email: this.state.email,
        name: this.state.name,
        tel: this.state.tel,
        msg: this.state.msg
      })
        this.state.sentMessage = "You're request has been sent!";
        console.log(response.data);
    } catch (error) {
      console.log('error : ',error)
    } 
  }

  getRequest = async () => {
    try {
      const response = await axios.get('https://node-react-medgo.herokuapp.com/api/request')
      console.log(response.data)
    } catch (error) {
      console.log('error : ',error)
    } 
  }

  render() {

    const {email, name, tel, msg, emailError, msgError, telError, nameError, sentMessage} = this.state
    return (
      <div className="App">
        <header className="App-header">
          
          <div class="container">
            <div class="row">
              <div class="col-25">
                <label for="lname">Name</label>
              </div>
              <div class="col-75">
                <input type="text" onChange={this.handleChange} value={name} name="name" placeholder="Name" />
                {nameError && <p className='errorMessage' >{nameError}</p> }
              </div>
            </div>

            <div class="row">
              <div class="col-25">
                <label for="lname">E-Mail</label>
              </div>
              <div class="col-75">
                <input type="text" className={emailError ? 'inputError' : ''} onChange={this.handleChange} value={email} name="email" placeholder="E-Mail" />
                {emailError && <p className='errorMessage' >{emailError}</p> }
              </div>
            </div>

            <div class="row">
              <div class="col-25">
                <label for="lname">Telephone</label>
              </div>
              <div class="col-75">
                <input type="text" onChange={this.handleChange} value={tel} name="tel" placeholder="Telephone" />
                {telError && <p className='errorMessage' >{telError}</p> }
              </div>
            </div>
            <div class="row">
              <div class="col-25">
                <label for="subject">Subject</label>
              </div>
              <div class="col-75">
                <textarea onChange={this.handleChange} value={msg} name="msg" placeholder="Your request here..."></textarea>
                {msgError && <p className='errorMessage' >{msgError}</p> }
              </div>
            </div>
            <div class="row">
              <button type="submit" onClick={this.handleSubmit} >Submit form</button>
              <p>{sentMessage}</p>
            </div>
          </div>
          
        </header>
      </div>
    );
  }
}

export default App;