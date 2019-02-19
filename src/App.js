import React, {
  Component
} from 'react';
import { Login } from './components/index'
import axios from 'axios'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userRole: 'loading'
    }
    this.verifyUser = this.verifyUser.bind(this)
  }

  async verifyUser() {
    try {
      //this login stuff will be handled on the login screen at a later point
      let dataJSON = {
        "user": {
          "username": "newnew",
          "password": "password"
        }
      }
      // console.log(await axios.get(process.env.REACT_APP_SERVER_URL + '/api/v1.0.0/testApi'))
      await axios.post(process.env.REACT_APP_SERVER_URL + '/api/v1.0.0/user/login', dataJSON, {
        withCredentials: true
      })
      let result = await axios.get(process.env.REACT_APP_SERVER_URL + '/api/v1.0.0/user/verify', {
        withCredentials: true
      })
      this.setState({ userRole: result.data.role })
    } catch (err) {
      this.setState({ userRole: 'none' })
      console.log(err)
    }
  }

  componentDidMount() {
    this.setState({
      userRole: 'loading'
    })
    this.verifyUser()
  }

  render() {
    const rolesWithPermissions = ['user', 'admin']
    if (this.state.userRole === 'loading') {
      return (
        <div>
          loading
        </div>
      )
    } else if (rolesWithPermissions.includes(this.state.userRole)) {
      return (<div>
        home
      </div>
      )
    } else {
      return (
        <Login />
      )
    }
  }
}

export default App;