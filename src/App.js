import React, { Component } from 'react';
import './App.css';
import AddBookmark from './addBookmark/addBookmark';
import BookmarkApp from './bookmarkApp/bookmarkApp';
import EditBookmark from './EditBookmark'; 
import {Route, Switch} from 'react-router-dom'
import config from './config'


const API_KEY = "Bearer apiToken123"

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
    const url = config.API_ENDPOINT
    const options = {
      method: 'GET', 
      headers: {
        'Authorization' : API_KEY,
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
    console.log(API_KEY)
    return (
      <div className="App">
      <Route exact path='/' render={props => 
       <BookmarkApp bookmarks={this.state.bookmarks}/>}
      />
      <Switch>
      <Route path='/bookmarks/add' component={AddBookmark}/>
      <Route path ='/bookmarks/:bookmark_id' component={EditBookmark}/>
      </Switch>
      </div>
    );
  }
}

export default App;
