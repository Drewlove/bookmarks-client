import React, { Component } from 'react';
import {Link} from 'react-router-dom'; 
import './fab.css';

class Fab extends Component {
  render() {
    return (
      <div className="fab">
        <Link to='/bookmarks/add'>&#43;</Link>
      </div>
    );
  }
}

export default Fab;