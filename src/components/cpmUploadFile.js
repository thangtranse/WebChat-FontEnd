import React, { Component } from "react";
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";
const config = {
  apiKey: "AIzaSyCDp93JTc75sIZhgx4KLYFjryiYdDzPTdk",
  authDomain: "ten-lua.firebaseapp.com",
  databaseURL: "https://ten-lua.firebaseio.com",
  storageBucket: "ten-lua.appspot.com"
};
firebase.initializeApp(config);

class ProfilePage extends Component {

  state = {
    username: "",
    avatar: "",
    isUploading: false,
    progress: 0,
    avatarURL: ""
  };

  // handleChangeUsername = event =>
  //   this.setState({ username: event.target.value });

  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  
  handleProgress = progress => this.setState({ progress });
  
  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };
  
  handleUploadSuccess = filename => {
    this.setState({ avatar: filename, progress: 100, isUploading: false });
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({ avatarURL: url }));
  };

  render() {
    return (
      <div>
        <form>
          <label>Username:</label>
          <input
            type="text"
            value={this.state.username}
            name="username"
            onChange={this.handleChangeUsername}
          />
          <label>Avatar:</label>
          {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
          {this.state.avatarURL && <img src={this.state.avatarURL} />}
          <FileUploader
            accept="image/*"
            name="avatar"
            randomizeFilename
            storageRef={firebase.storage().ref("images")}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
            onProgress={this.handleProgress}
          />
        </form>
      </div>
    );
  }
}

export default ProfilePage;