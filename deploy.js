// const ganache = require('ganache-cli');
// const Web3 = require('web3');
// const web3 = new Web3(ganache.provider());

// const {interface,bytecode} = require('./compile');

// const deploy = async ()=>{
//     accounts = await web3.eth.getAccounts();
    
//     console.log("deploying from account: ",accounts[0]);

//     const result = await new web3.eth.Contract(JSON.parse(interface))
//      .deploy({data: '0x' + bytecode}) // add 0x bytecode
//      .send({from: accounts[0]}); // remove 'gas'
//     console.log("deployed to address ",result.options.address);
//     console.log(interface);    
// }

// deploy();