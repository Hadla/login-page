import React from 'react';
import InputField from './InputField';
import UserStore from '../stores/UserStore';
import SubmitButton from './SubmitButton';

class Loginform extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      buttonDisabled: false,
    };
  }

  //The value can't be more than X characters.
  setInputValue(prop, val, limit) {
    val = val.trim();
    if (val.length > limit) {
      return;
    }
    this.setState({
      [prop]: val,
    });
  }

  async doLogin() {
    if (!this.state.username) {
      return;
    }
    if (!this.state.password) {
      return;
    }
    this.setState({
      buttonDisabled: true,
    });
    try {
      let res = await fetch('/login', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        }),
      });
      let result = await res.json();
      if (result && result.success) {
        UserStore.isLoggedIn = true;
        UserStore.username = result.username;
      } else if (result && result.success === false) {
        this.resetForm();
        alert(result.msg);
      }
    } catch (e) {
      console.log(e);
      this.resetForm();
    }
  }

  resetForm() {
    this.setState({
      username: '',
      password: '',
      buttonDisabled: false,
    });
  }

  render() {
    return (
      <div className='login-form'>
        Log in
        <InputField
          type='text'
          placeholder='Username'
          value={this.state.username ? this.state.username : ''}
          onChange={(val) => this.setInputValue('username', val, 12)}
        />
        <InputField
          type='password'
          placeholder='Password'
          value={this.state.password ? this.state.password : ''}
          onChange={(val) => this.setInputValue('password', val, 15)}
        />
        <SubmitButton text='Login' disabled={this.state.buttonDisabled} onClick={() => this.doLogin()} />
      </div>
    );
  }
}

export default Loginform;
