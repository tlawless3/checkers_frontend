import React, {
  Component
} from 'react';
import { connect } from 'react-redux'
import { Login, Create, Home, Friends, Profile, CreateGame } from './components/index'
import { getUserConditionally } from './actions/user';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import './App.css';
import { socket } from './index'

class App extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if (!this.props.user) {
      this.props.getUserConditionally(this.props.user)
    }
  }

  componentDidUpdate() {
    if (this.props.userReducer.user) {
      socket.emit('login', this.props.userReducer.user.userId)
    }
  }

  render() {
    if (this.props.userReducer.user) {
      return (
        <div>
          <Switch>
            <Route path='/friends' component={Friends} />
            <Route path='/profile' component={Profile} />
            <Route path='/createGame' component={CreateGame} />
            <Route path='/home' component={Home} />
            <Redirect from='/' to='/home' />
          </Switch>
        </div>
      )
    } else if (this.props.userReducer.isFetching === false && !this.props.userReducer.user) {
      return (
        <div>
          <Switch>
            <Route path='/create' component={Create} />
            <Route path='/login' component={Login} />
            <Redirect from='/' to='/login' />
          </Switch>
        </div>
      )
    } else {
      return (<div>
        Loading
      </div>)
    }
  }
}

const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = dispatch => ({
  getUserConditionally: () => dispatch(getUserConditionally())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));