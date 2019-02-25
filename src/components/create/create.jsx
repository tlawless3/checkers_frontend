import React, {
  Component
} from 'react';
import CreateForm from './createForm/createForm'
import './create.css';

class Create extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      displayName: '',
      email: '',
      password: '',
      passwordConfirm: '',
      error: false,
      errorMessage: '',
    }
    this.handleCreate = this.handleCreate.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  validateFieldsAndSubmit() {
    const validateEmail = () => {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(this.state.email).toLowerCase());
    }

    let message = ''
    if (!this.state.username) {
      message += 'Enter a username \n'
    }
    if (!this.state.password) {
      message += 'Enter a password \n'
    }
    if (!this.state.passwordConfirm) {
      message += 'Confirm your password \n'
    }
    if (this.state.password !== this.state.passwordConfirm) {
      message += 'Passwords do not match \n'
    }
    if (this.state.email && !validateEmail()) {
      message += 'Enter a valid email \n'
    }
    if (message.length > 0) {
      this.setState({
        error: true,
        errorMessage: message
      })
    } else {
      this.setState({
        error: false,
        errorMessage: ''
      })
      //pass the submit user function here
    }
  }

  handleChange(event) {
    const key = event.target.name
    const value = event.target.value
    const stateObj = {}
    stateObj[key] = value
    this.setState(stateObj)
  }

  handleCreate(event) {
    event.preventDefault()
    this.validateFieldsAndSubmit()
  }

  render() {
    return (
      <div className='createFormWrapper' >
        <CreateForm handleCreate={this.handleCreate} handleChange={this.handleChange} error={this.state.error} errorMessage={this.state.errorMessage} />
      </div>
    )
  }
}

export default Create