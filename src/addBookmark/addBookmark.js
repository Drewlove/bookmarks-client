import React, { Component } from  'react';
import {Link} from 'react-router-dom'
import config from '../config'
import './addBookmark.css';

const API_KEY = "Bearer apiToken123"

class AddBookmark extends Component {
  constructor(props){
    super(props)

    this.state={
      title: '', 
      url: '', 
      description: '', 
      rating: 1,
      id: null
    }
  }

  updateTitle(title){
    this.setState({
      title
    })
  }


  updateUrl(url){
    this.setState({
      url
    })
  }


  updateDescription(description){
    this.setState({
      description
    })
  }


  updateRating(rating){
    let numRating = parseInt(rating)
    this.setState({
      rating: numRating
    })
  }

  

  handleSubmit(e){
    console.log('submit')
    e.preventDefault(); 
    const bookmark = (({title, url, description, rating}) => ({title, url, description, rating}))(this.state);
    const url = `${config.API_ENDPOINT}`
    const options = {
      method: 'POST', 
      body: JSON.stringify(bookmark), 
      headers: {
        'Content-Type': 'application/json', 
        'Authorization': API_KEY
      }
    }

    fetch(url, options)
    .then(res => {
      if(!res.ok){
        throw new Error('error occurred')
      }
      return res.json()
    })
    .then(data => {
      this.setState({
        title: '', 
        url: '', 
        description: '', 
        rating: 1
      })
    })
    .catch(err => {
      this.setState({
        error: err.message
      })
    })
  }

  render() {
    const error = this.state.error ?
    <div className='error'>Error: {this.state.error}</div>
    : ''

    return (
      <div className="addbookmark">
        <h2>Add Bookmark</h2>
        <form className="addbookmark__form" onSubmit={e=>this.handleSubmit(e)}>
          <label htmlFor="title">Title:</label>
          <input type="text" 
          name="title" 
          id="title" 
          placeholder="Title"
          value={this.state.title}
          onChange={e => this.updateTitle(e.target.value)}
          />
          <label htmlFor="url">Url:</label>
          <input 
          type="text" 
          name="url" 
          id="url" 
          placeholder="url"
          value={this.state.url}
          onChange={e => this.updateUrl(e.target.value)}
          />
          <label htmlFor="description">Description:</label>
          <textarea 
          name="description" 
          id="description" 
          placeholder="description"
          value={this.state.description}
          onChange={e => this.updateDescription(e.target.value)}
          />
          <label htmlFor="rating">Rating: </label>
          <input 
            type="number" 
            name="rating" 
            id="rating" 
            min="1"
            max="5"
            value={this.state.rating}
            onChange={e => this.updateRating(e.target.value)}
            />

          <div className="addbookmark__buttons">
            <Link to='/'><button>Cancel</button></Link>
            <button type="submit"> Save</button>
          </div>  
        </form>
      </div>
    );
  }
}

export default AddBookmark;