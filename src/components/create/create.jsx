import React, {
  Component
} from 'react';
import CreateForm from './createForm/createForm'
import './create.css';

class Create extends Component {
  render() {
    return (
      <div className='createFormWrapper' >
        <CreateForm />
      </div>
    )
  }
}

export default Create