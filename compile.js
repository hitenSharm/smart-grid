const path=require('path');
const fs=require('fs');
const solc=require('solc');

const meter= path.resolve(__dirname , 'contracts' , 'meter.sol');
//gets path
const source = fs.readFileSync(meter, 'utf8');
//gets code

module.exports=solc.compile(source,1).contracts[':Smartmeter'];