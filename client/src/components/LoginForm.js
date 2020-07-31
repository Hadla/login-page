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

  setInputValue(property, val) {
    val = val.trim();
    if (val.length > 12) {
      return;
    }
    this.setState({
      [property]: val,
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
    return <div className='login-form'>Login Form</div>;
  }
}

export default Loginform;
