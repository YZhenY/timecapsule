import React from 'react';
import ReactDOM from 'react-dom';

App = {
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
    
        return App.initContract();
    },
}