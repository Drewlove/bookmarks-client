import React, {Component} from 'react' 
import config from './config' 
const API_KEY = "Bearer apiToken123"
//testing

class EditBookmark extends Component{
    constructor(props){
        super(props)

        this.state = {
            bookmark: {
                description: "", 
                rating: 1, 
                title: "", 
                url: "",
                id: null 
            }
        }
    }
    componentDidMount(){
        const bookmark_id= this.props.match.params.bookmark_id
        const url =  `${config.API_ENDPOINT}/${bookmark_id}`
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
                throw new Error('error, failure to fetch')
            }
            return res.json()
        })
        .then(resJSON => this.setState({bookmark:resJSON}))
        .catch(err => {
            this.setState({error: err.message})
        })
    }

    handleChange = (e) => {
        const {name, value} = e.target
        this.setState({bookmark: {...this.state.bookmark, [name]:value}})
    }
    
    handleSubmit = e => {
        e.preventDefault()
        const { bookmark_id } = this.props.match.params
        const { id, title, url, description, rating } = this.state.bookmark
        const newBookmark = { id, title, url, description, rating }
        fetch(config.API_ENDPOINT + `/${bookmark_id}`, {
          method: 'PATCH',
          body: JSON.stringify(newBookmark),
          headers: {
            'content-type': 'application/json',
            'authorization': API_KEY
          },
        })
          .then(res => {
            if (!res.ok)
              return res.json().then(error => Promise.reject(error))
          })
          .catch(error => {
            console.error(error)
            this.setState({ error })
          })
      }

    render(){
        const {description, rating, title, url} = this.state.bookmark
        return(
            <div>
            <h1>Edit</h1>
                <form type='submit'>
                        <label htmlFor='title'>Title:</label>
                        <input type='text' name='title' value={title} 
                        onChange={(e) => this.handleChange(e)}/>
                        <br></br>

                        <label htmlFor='description'>Description:</label>
                        <input type='text' name='description' value={description} 
                        onChange={(e) => this.handleChange(e)}/>
                        <br></br>

                        <label htmlFor='rating'>Rating:</label>
                        <input type='text' name='rating' value={rating} 
                        onChange={(e) => this.handleChange(e)}/>
                        <br></br>

                        <label htmlFor='url'>Url:</label>
                        <input type='text' name='url' value={url} 
                        onChange={(e) => this.handleChange(e)}/>
                        <br></br>

                        <button onClick={(e)=>this.handleSubmit(e)}>Submit</button>
                </form>
            </div>
        )
    }
}

export default EditBookmark