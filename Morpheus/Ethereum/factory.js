import web3 from './web3';
import WahlFactory from './build/contracts/WahlCreator.json';
const wahlFactoryAddress = "0xE9b25d8d77a782991E49dAe73FCFBC00679fb77e";

const instance = new web3.eth.Contract(WahlFactory.abi, wahlFactoryAddress);

export default instance;