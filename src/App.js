import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      post: "",
      posts: []
    }
  }

  splitMessage = (post) => {
    //use regular expression to replace "enter characters" for " "
    post = post.replace(/(\r\n|\n|\r)/gm, " ");

    //split all the words into an array
    let arrayWords = post.split(" ");

    //check if there is any element over 50 characters in the array
    for (let i=0; i<arrayWords.length; i++){
      if (arrayWords[i].length > 50){
        alert("Can't split this post as there is a word over 50 characters");
        return [];
      }
    }

    //check if the post is less than or equal 50 characters
    if (post.length <= 50){
      return [post];
    }

    //codes below are for splitting long message into chunks
    let listOfSplittedPost, currentPost;
    let estimatePostNumber = Math.ceil(post.length / 50) - 1;
    do {
      estimatePostNumber++;
      listOfSplittedPost = [];
      currentPost = "1/" + estimatePostNumber;
      for (let i = 0; i < arrayWords.length; i++) {
        if ((currentPost.length + 1 + arrayWords[i].length) <= 50) {
          currentPost += " " + arrayWords[i];
        } else {
          listOfSplittedPost.push(currentPost);
          currentPost = listOfSplittedPost.length + 1 + "/" + estimatePostNumber + " " + arrayWords[i]
        }
      }
      listOfSplittedPost.push(currentPost);
    } while (estimatePostNumber !== listOfSplittedPost.length) //loop until my estimated posts is correct
    return listOfSplittedPost
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e) => {
    debugger;
    e.preventDefault();
    if (this.state.post !== "") {
      let newPost = this.splitMessage(this.state.post);
      let newListOfPosts = [ ...newPost, ...this.state.posts];
      this.setState({
        post: "",
        posts: newListOfPosts
      });
      document.getElementById("post").value = "";
    } else {
      alert("Please input something in the field")
    }
  }

  render() {
    const listOfPosts = this.state.posts.map((post, key) => {
      return (
        <div key={key} className="card Status">
          <div className="card-body">
            <p>{post}</p>
          </div>
        </div>
      )
    })

    const checkOver50 = this.state.post.length > 50 ?  
        <div className="alert alert-warning">
          <strong>Warning!</strong> Message is too long, it will be splitted.
        </div> : "";

    return (
      <div className="App container">
        <div className="row">
          <div className="col-lg-3"></div>
          <div className="col-lg-6">
            <p></p>
            <h1><i className="fab fa-twitter"></i> Twitter Premium</h1>
            <p>Write status without being worry about words limited...</p>
            <form onSubmit={this.handleSubmit} >
              <div className="form-group">
                <label htmlFor="post"><i className="fas fa-hashtag"></i> What's happening today? </label>
                <textarea rows="4" className="form-control" type="text" id="post" onChange={this.handleChange}></textarea>
              </div>
              <button className="btn btn-primary MyButton">Post</button>
              <p className="MyMessage">Numbers of characters: {this.state.post.length}</p>
              <p className="ClearBoth"></p>
              {checkOver50}
            </form>
            <p></p>
            <p><i className="fas fa-hashtag"></i> Posts go below</p>
            {/* <p>Numers of status: {this.state.posts.length}</p> */}
            <div>{listOfPosts} <br/></div>
          </div>
        </div>
        <div className="col-lg-3"></div>
      </div>
    );
  }
}

export default App;
