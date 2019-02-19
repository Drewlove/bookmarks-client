import React, { Component } from 'react';
import './App.css';
import AddBookmark from './addBookmark/addBookmark';
import BookmarkApp from './bookmarkApp/bookmarkApp';

const API_KEY = '$2a$10$gLfjz6ka3VodRrognEOV5.deyISScrJSHp44JBU.sDrfQW8GTAQau'

//Feedback: 
//cursory overview of mutations and spread operator
//AddBookmark component handleSubmit function 
//uses destructuring, which I don't think has been covered

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      bookmarks: [], 
      showAddForm: false
    }
  }

  addBookmark(bookmark){
    this.setState({
      bookmarks: [...this.state.bookmarks, bookmark],
      showAddForm: false
    })
  }

  setShowAddForm(show){
    this.setState({
      showAddForm: show
    })
  }

  componentDidMount(){
    const url = 'https://tf-ed-bookmarks-api.herokuapp.com/v3/bookmarks'
    const options = {
      method: 'GET', 
      headers: {
        'Authorization' : `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      }
    }   

    fetch(url, options)
    .then(res => {
      if(!res.ok){
        throw new Error('error')
      }
      return res
    })
    .then(res => res.json())
    .then(data => {
      this.setState({
        bookmarks: data, 
        error: null
      })
    })
    .catch(err => {
      this.setState({
        error: err.message
      })
    })
  }


  render() {
    const page = this.state.showAddForm ? 
      <AddBookmark 
      showForm={show => this.setShowAddForm(show)}
      handleAdd={bookmark => this.addBookmark(bookmark)}
      /> 
      : <BookmarkApp 
      bookmarks={this.state.bookmarks}
      showForm={show => this.setShowAddForm(show)}
      />
    return (
      <div className="App">
        {page}
      </div>
    );
  }
}

export default App;
