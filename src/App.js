import React from 'react';
import './App.css';
import Clarifai from 'clarifai';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import Rank from './components/rank/Rank'
import ImageLinkForm from './components/imagelinkform/ImageLinkForm';
import FaceRecognition from './components/facerecognition/FaceRecognition';
import SignIn from './components/signin/SignIn'
import Register from './components/register/Register';


const app = new Clarifai.App({
  apiKey: 'fc37bf02ab694d2caabe5abe393b12fb'
});

const initialState = {
  input : '',
  imageUrl : '',
  box : [],
  route : 'signin',
  isSignedIn : false,
  users : {
      id : '',
      name : '',
      email : '',
      password : '',
      entries : '',
      joined : ''
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = initialState
  }

  loadUser = (data) =>{
    this.setState({
      users : {
        id : data.id,
        name : data.name ,
        email : data.email ,
        password : data.password ,
        entries : data.entries ,
        joined : data.joined
      }
    })
  }

/*componentDidMount() {
  fetch('http://localhost:3001').then((response) => response.json() ).then(data => console.log(data))
}*/

  handleChange = (e) => {
    this.setState({input : e.target.value})
  }

  calculateFaceLocation = (info) => {
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    const clarifaiFace = info.outputs[0].data.regions.filter(region => region.region_info.bounding_box.top_row).map((user)  =>{
      return({
        topRow : user.region_info.bounding_box.top_row * height,
        bottomRow : height - (user.region_info.bounding_box.bottom_row * height),
        leftCol : user.region_info.bounding_box.left_col * width,
        rightCol : width - (user.region_info.bounding_box.right_col* width)
      })
    })
    //console.log(clarifaiFace)
    return (clarifaiFace)
      /*leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)*/
      
  }

  displayFaceBox = (box) =>{
    this.setState({box: box})
  }
  
  handleSubmit = (e) => {
    this.setState({imageUrl: this.state.input});
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        this.state.input)
      .then(response =>{
        if(response){
          fetch('http://localhost:3001/image',{
            method : 'PUT',
            headers : {'Content-Type': 'application/json'},
            body : JSON.stringify({
              id : this.state.users.id
            })
          })
          .then(res => res.json())
          .then( info => this.setState(Object.assign(this.state.users,{entries : info})))
        }
        this.displayFaceBox(this.calculateFaceLocation(response))})
      .catch(err => console.log(err));
  }
  
  handleRouteChange = (route) => {
    if(route ==='signout'){
      this.setState(initialState)
    }else if(route ==='home'){
      this.setState({isSignedIn : true})
    }
    this.setState({ route: route });
  }
  render() {
      return (
        <div className="App">
          {<Navigation onRouteChange = { this.handleRouteChange } isSignedIn={this.state.isSignedIn} />}
          {this.state.route ==='home' ?
            <div>
                <Logo />
                <Rank name = {this.state.users.name} entries = {this.state.users.entries} />
                <ImageLinkForm handleChange= {this.handleChange} handleSubmit={this.handleSubmit} />
                <FaceRecognition pics={this.state.imageUrl} box={this.state.box} /> 
          </div>: this.state.route ==='signin' ?
              <SignIn loadUser={this.loadUser} onRouteChange={this.handleRouteChange} /> : 
              <Register loadUser={this.loadUser} onRouteChange={this.handleRouteChange} />
          }
          
        </div>
      );
    }
}

export default App;
