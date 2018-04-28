import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

// Step 0. Create the App itself. App is the only thing that is rendered below by React.DOM
// so all the pieces have to be inside it 
// but normally you would separate each component (like PostForm) into it's own .js file 
// but for in-class purposes we're doing this all in one file so it's actually a bit more confusing then normal
// tldr define all pieces below in App, which is called by React.DOM

class App extends Component {
	constructor (props) {
		super(props)
    this.state = {
      posts: []
    }
	}

// Step 2. Send the state from PostForm.js to our global "posts" variable that all these functions are using
// this was explained in class but I have no idea what it means 

addPost = (post) => {
  this.setState((prevState) => {
    return {
      posts: [...prevState.posts, post]
    }
  })
}

render() {
	return (
		<div> 
			<h1>Example Blog</h1> 
      <PostForm addPost={this.addPost}/>
      <ShowPosts posts={this.state.posts} />
		</div> 
			)
    }
  }

  const ShowPosts = (props) => {
    const postsHTML = props.posts.map(elem => {
      return (
        <div>
        <hr />
        <h3>{elem.title} by {elem.author}</h3>
        <p>{elem.body}</p> 
      </div>
      )
    })
    return (
      <div>
        {postsHTML}
      </div>
    )
  }

// Step 1. Pretend this is PostForm.js 
// Create a form to intake the data
// afterward we want to pass the data to our array of arrays at Posts 

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author: '',
      title: '',
      body: ''
    };
  }

  handleAuthorChange = (event) => {
    this.setState({author: event.target.value});
  }

  handleTitleChange = (event) => {
    this.setState({title: event.target.value});
  }

  handleBodyChange = (event) => {
    this.setState({body: event.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
    this.props.addPost(this.state);
  }

  render() {
    return (
      <div>
      <form onSubmit={this.handleSubmit}>
        <label>
          Author: <input name="author" type="text" value={this.state.author} onChange={this.handleAuthorChange} />
        </label>
        <br />
        <label>
          Title: <input name="title" type="text" value={this.state.title} onChange={this.handleTitleChange} />
        </label>
        <br />
        <label>
          Body: <input name="body" type="text" value={this.state.body} onChange={this.handleBodyChange} />
        </label>
        <input type="submit" /> 
      </form>
      </div>
    );
  }
}

// Final Step, which renders the above

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();


