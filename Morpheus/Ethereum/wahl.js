import web3 from './web3';
import Wahl from './build/contracts/Wahl.json';

export default address=> {
    return new web3.eth.Contract(Wahl.abi, address);
};