import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Input } from 'semantic-ui-react'

window.AppRoot = {
    web3Provider: null,
    contracts: {},
    initWeb3: function() {
        if (typeof web3 !== 'undefined') {
          App.web3Provider = web3.currentProvider;
        } else {
          // If no injected web3 instance is detected, fall back to Ganache
          App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
        }
        web3 = new Web3(App.web3Provider);
    },
}

class App extends React.Component {
  constructor(props) {
    super(props);      
    this.state = {
      web3Provider: null,
      contracts: {},
    }
    this.initWeb3();
  }

  initWeb3() {
    if (typeof web3 !== 'undefined') {
      this.setState({web3Provider:web3.currentProvider});
    } else {
      // If no injected web3 instance is detected, fall back to Ganache
      this.setState({web3Provider: new Web3.providers.HttpProvider('http://localhost:7545')}) 
    }
    web3 = new Web3(App.web3Provider);
  }

  //sticky items can be configured later
  render () {
      return (
        <div>
          <Input className='textInput' type='text' />
          <Button>Mail Message </Button>
        </div>
      )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));