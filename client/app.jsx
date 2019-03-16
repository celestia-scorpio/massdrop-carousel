import React from "react";
import Modal from './modal';
import axios from 'axios';
import { Route, Link } from 'react-router-dom';
import "./style.css"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      urls: [],
      isMassdropMade: null,
      path: this.props.location.pathname/*.substring(10)*/
    }
    this.getImageUrls = this.getImageUrls.bind(this);
  }

  componentDidMount() {
    this.getImageUrls();
    // this.getItemInfo();
  }

  getImageUrls() {
    // axios.get(`/${this.state.path}/`)
    axios.get(`http://localhost:3007/api/item${this.state.path}/`)
      .then((response) => {
        this.setState({ urls: response.data[0].urls })
      })
  }

  getItemInfo() {
    axios.get(`http://ec2-18-219-151-193.us-east-2.compute.amazonaws.com:3007/api/info${this.state.path}/`)
    // axios.get(`http://localhost:3007/api/info/${this.state.path}/`)
      .then((response) => {
        this.setState({ isMassdropMade: !!response.data[0].isMassdropMade})
      });
  }

  render() {
    return (
      <>
          {this.state.path === null ? <span>wait...</span> : <Modal urls={this.state.urls}/>}
          {/* <Modal urls={this.state.urls}/> */}
          {this.state.isMassdropMade === true ? <div className="massdrop-made-message">IN STOCK: <span className="massdrop-made-submessage">This product is ready to ship in 1 business day.</span></div> : <></>}
      </>
    )
  }
}

// ReactDOM.render(<App />, document.getElementById("carousel"));
export default App;