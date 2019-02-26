import React, {
  Component
} from 'react';
import { connect } from 'react-redux'
import { Login, Create } from './components/index'
import { getUserConditionally } from './actions/user';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if (!this.props.user) {
      this.props.getUserConditionally(this.props.user)
    }
  }

  render() {
    if (this.props.userReducer.isFetching) {
      return (<div>
        Loading
      </div>)
    } else if (this.props.userReducer.user) {
      return (
        <div>
          <pre>
            {
              JSON.stringify(this.props)
            }
          </pre>
          <button onClick={() => this.props.getUserConditionally(this.props.userReducer)}>Test redux action</button>
          loading
        </div>
      )
    } else {
      return (
        <div>
          <Switch>
            <Route path='/create' component={Create} />
            <Route path='/login' component={Login} />
            <Redirect from='/' to='/login' />
          </Switch>
        </div>
      )
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