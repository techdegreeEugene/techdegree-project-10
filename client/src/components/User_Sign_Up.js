import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Form from './Form';

export default class User_Sign_Up extends Component {
  state = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    confirmPass:'',
    errors: [],
  }

  
  change = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  submit = () => {
    const {context} = this.props;
    const {
    firstName,
    lastName,
    emailAddress,
    password,
    confirmPass,
    } = this.state;

    // Create user
    const user = {
      firstName,
      lastName,
      emailAddress,
      password,
    };

    if ( password !== confirmPass) {
     
        this.setState(() => {
          return {errors: ['PW must match']}})
      } else {

     
    context.data.createUser(user)
      .then( errors => {
        if (errors.length) {
          this.setState({errors});
        } else {
          context.actions.signIn(emailAddress, password)
            .then(() => {
              this.props.history.push('/authenticated');    
            });
        }
      })
      .catch((err) => {
        console.log(err);
        this.props.history.push('/error');
      });
    }
  }

  cancel = () => {
   this.props.history.push('/');
  }
  render() {
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPass,
      errors
    } = this.state;

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <div>
            <Form 
              cancel={this.cancel}
              errors={errors}
              submit={this.submit}
              submitButtonText="Sign Up"
              elements={() => (
                <React.Fragment>
                  <input 
                    id="firstName" 
                    name="firstName" 
                    type="text"
                    value={firstName} 
                    onChange={this.change} 
                    placeholder="First Name" />
                  <input 
                    id="lastName" 
                    name="lastName" 
                    type="text"
                    value={lastName} 
                    onChange={this.change} 
                    placeholder="Last Name" />
                  <input 
                    id="emailAddress" 
                    name="emailAddress" 
                    type="text"
                    value={emailAddress} 
                    onChange={this.change} 
                    placeholder="Email" />
                  <input 
                    id="password" 
                    name="password" 
                    type="password"
                    value={password} 
                    onChange={this.change} 
                    placeholder="Password" />
                  <input 
                    id="confirmPass" 
                    name="confirmPass" 
                    type="password"
                    value={confirmPass} 
                    onChange={this.change} 
                    placeholder="Confirm Pass" />
              </React.Fragment>
            )} />
          <p>
            Already have a user account? 
            <Link to="/signin">Click here</Link> to sign in!
          </p>
        </div>
      </div>
    </div>
    )
  }

}
