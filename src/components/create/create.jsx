import React, {
  Component
} from 'react'
import axios from 'axios'
import { getUserConditionally } from '../../actions/user'
import CreateForm from './createForm/createForm'
import './create.css'
import { connect } from 'react-redux'

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

  async validateFieldsAndSubmit() {
    const validateEmail = () => {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(this.state.email).toLowerCase());
    }

    const checkUsernameAvailable = async () => {
      let available = await axios.post(process.env.REACT_APP_SERVER_URL + '/api/v1.0.0/user/available', { user: { username: this.state.username } }, {
        withCredentials: true,
      })
      return available.data.available
    }

    console.log(await !checkUsernameAvailable)

    let message = ''
    if (!this.state.username) {
      message += 'Enter a username \n'
    } else if (! await checkUsernameAvailable()) {
      message += 'Username not available \n'
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
      }, () => {
        const displayNameVar = this.state.displayName.length > 0 ? this.state.displayName : this.state.username
        axios.post(process.env.REACT_APP_SERVER_URL + '/api/v1.0.0/user/create', {
          user: {
            username: this.state.username,
            displayName: displayNameVar,
            email: this.state.email,
            password: this.state.password
          }
        }, { withCredentials: true }).then(() => { this.props.getUserConditionally() }).then(() => {
          this.props.history.push('/home')
        })
      })
      //pass the submit user function ^here
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

const mapDispatchToProps = dispatch => ({
  getUserConditionally: () => dispatch(getUserConditionally())
})

export default connect(null, mapDispatchToProps)(Create)