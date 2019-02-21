import React, {
  Component
} from 'react';
import { connect } from 'react-redux'
import { Login } from './components/index'
import { getUserConditonally } from './actions/user';
import axios from 'axios'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    // this.state = {
    //   userRole: 'user'
    // }
    // this.verifyUser = this.verifyUser.bind(this)
  }

  componentDidMount() {
    // this.setState({
    //   userRole: 'loading'
    // })
    // this.verifyUser()
  }

  simpleActionSequel = (event) => {
    console.log(this.props)
    console.log(this.props.simpleAction)
    this.props.simpleAction()
  }

  render() {
    return (
      <div>
        <pre>
          {
            JSON.stringify(this.props)
          }
        </pre>
        <button onClick={() => this.props.getUserConditonally()}>Test redux action</button>
        loading
      </div>
    )
    //   const rolesWithPermissions = ['user', 'admin']
    //   if (true) {
    //     return (
    //       <div>
    //         <button onClick={this.simpleActionSequel}>Test redux action</button>
    //         loading
    //       </div>
    //     )
    //   } else if (rolesWithPermissions.includes(this.state.userRole)) {
    //     return (<div>
    //       <button onClick={this.simpleActionSequel}>Test redux action</button>
    //       home
    //     </div>
    //     )
    //   } else {
    //     return (
    //       <Login />
    //     )
    //   }
    // }
  }
}

const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = dispatch => ({
  getUserConditonally: () => dispatch(getUserConditonally())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);