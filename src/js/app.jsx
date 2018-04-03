import React from 'react';
import ReactDOM from 'react-dom';
import { Header, Button, Input, Container } from 'semantic-ui-react'

class App extends React.Component {
  constructor(props) {
    super(props);      
    this.state = {
      web3Provider: null,
      contracts: {},
      web3: null,
      messages: [],
      input: '',
    }
    
  }

  componentDidMount() {
    this.initWeb3().then(result => {
      return this.initContract();
    }).then(result => {
      return this.getMessages()
    })
    
  }

  initWeb3() {
    return new Promise((resolve, reject) => {
      console.log('Web3: ', web3);
      if (typeof web3 !== 'undefined') {
        this.setState({web3Provider:web3.currentProvider}, () => {
          console.log('Using current web provider: ',this.state.web3Provider);
          web3 = new Web3(web3.currentProvider);
          this.setState({web3: web3});
          resolve(web3);
        });
      } else {
        // If no injected web3 instance is detected, fall back to Ganache
        this.setState({web3Provider: new Web3.providers.HttpProvider('http://localhost:7545')}, () => {
          console.log('New web provider: ', this.state.web3Provider); 
          web3 = new Web3(web3.currentProvider);
          this.setState({web3: web3});
          resolve(web3);
        });
      }
      resolve(web3);
    })
  }

  initContract() {
    return new Promise ((resolve, reject) => {
      fetch('contracts/MessageStore.json')
      .then (response => {
        return response.json();
      })
      .then( data => {
        // console.log('Contract Data: ', data);
        // Get the necessary contract artifact file and instantiate it with truffle-contract
        var MessageStoreData = data;
        var MessageStore = TruffleContract(MessageStoreData);
        console.log(MessageStore);
        this.setState(prevState => ({
          contracts: {
            ...prevState.jasper,
            MessageStore: MessageStore,
          }
        }));
        // Set the provider for our contract
        this.state.contracts.MessageStore.setProvider(this.state.web3Provider);
        resolve();
        // Use our contract to retrieve and mark the adopted pets
        // return App.markAdopted();
      }).catch(err => console.log(err));

      
    })
    // return App.bindEvents();
  }

  getMessages() {
    return new Promise ((resolve, reject) => {
      var messageInstance;
      this.state.contracts.MessageStore.deployed().then((instance) => {
        messageInstance = instance;
        return messageInstance.getAvailableMsgDates.call();
      }).then((messageDates) => {
        this.setState({messages: messageDates})
        resolve();
      }).catch(err => console.log(err));
    })
  }

  storeMessage() {
    var messageInstance;
    this.state.web3.eth.getAccounts((error, accounts) => {
      if (error) console.log(error);

      var account = accounts[0];
      this.state.contracts.MessageStore.deployed().then(instance => {
        messageInstance = instance;
        var time = Date.now();

        //storeMsg(bytes32 mail, uint date, address recipient)
        return messageInstance.storeMsg(this.state.input, time, account, {from:account});
      }).then(result =>{
        return  this.getMessages();
      }).catch(err => console.log(err));
    })
  }

  test() {
    var messageInstance;
    this.state.web3.eth.getAccounts((error, accounts) => {
      if (error) console.log(error);

      var account = accounts[0];
      this.state.contracts.MessageStore.deployed().then(instance => {
        messageInstance = instance;
        var time = Date.now();

        
        return messageInstance.test.call();
      }).then(result =>{
        console.log('Test Result: ', result);
        return  this.getMessages();
      }).catch(err => console.log(err));
    })
  }

  //handling state for input 
  handleInput(event) {
    this.setState({input:event.target.value});
  }

  render () {
      return (
        <div>
          <Header as='h1'>Time Capsule</Header>
          <Input className='textInput' type='text' value={this.state.input} onChange={this.handleInput.bind(this)} />
          <Button onClick={this.test.bind(this)} >Mail Message </Button>
          {this.state.messages.map(function(date) {
            return <Container> {date} </Container>
          })}
        </div>
      )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));