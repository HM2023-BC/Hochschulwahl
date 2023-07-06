pragma solidity ^0.5.16;

import "./Wahl.sol";
import "./DateTimeLibrary.sol";

contract WahlCreator {

    using DateTimeLibrary for uint;

    address[] public wahlen; // Array zur Speicherung der erstellten Wahlen
    address public veranstalter; // Adresse des Veranstalters

    constructor() public {
        veranstalter = msg.sender;
    }

    /**
     * Erstellt eine neue Wahl mit den angegebenen Start- und Endzeitpunkten.
     * Nur der Veranstalter kann eine Wahl erstellen.
     */
    function erstelleWahl(uint _startJahr, uint _startMonat, uint _startTag, uint _endJahr, uint _endMonat, uint _endTag) public {
        require(msg.sender == veranstalter, "Nur der Veranstalter kann eine Wahl erstellen.");
        uint startZeit = DateTimeLibrary.timestampFromDate(_startJahr, _startMonat, _startTag);
        uint endZeit = DateTimeLibrary.timestampFromDate(_endJahr, _endMonat, _endTag);
     
        address neueWahl = address(new Wahl(veranstalter, startZeit, endZeit));
        wahlen.push(neueWahl);
    }

    /**
     * Gibt eine Liste der erstellten Wahlen zurück.
     */
    function getErstellteWahlen() public view returns(address[] memory) {
        return wahlen;
    }
}
