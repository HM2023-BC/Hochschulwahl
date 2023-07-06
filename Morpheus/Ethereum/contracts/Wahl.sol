pragma solidity ^0.5.16;

contract Wahl {

    // Struktur zur Speicherung der Informationen über einen Wähler
    struct Waehler {
        bool istBerechtigt; // Gibt an, ob der Wähler zur Teilnahme berechtigt ist
        bool hatAbgestimmt; // Gibt an, ob der Wähler bereits abgestimmt hat
        uint256 kandidatenIndex; // Index des Kandidaten, für den der Wähler gestimmt hat
    }

    // Struktur zur Speicherung der Informationen über einen Kandidaten
    struct Kandidat {
        uint256 id; // Eindeutige ID des Kandidaten
        string name; // Name des Kandidaten
        uint256 stimmen; // Anzahl der erhaltenen Stimmen
    }

    mapping (uint256 => Waehler) public waehler; // Mapping zur Zuordnung der Wähler anhand ihrer Matrikelnummer
    Kandidat[] public kandidaten; // Array zur Speicherung der Kandidaten

    address public veranstalter; // Adresse des Veranstalters der Wahl
    uint256 public startZeit; // Startzeit der Wahl
    uint256 public endZeit; // Endzeit der Wahl

    event Abstimmung(uint256 indexed matrikelnummer, uint256 indexed kandidatenIndex); // Ereignis, das ausgelöst wird, wenn ein Wähler abstimmt
    event KandidatErstellt(uint256 indexed id, string name); // Ereignis, das ausgelöst wird, wenn ein neuer Kandidat erstellt wird

    modifier nurVeranstalter() {
        require(msg.sender == veranstalter, "Nur der Veranstalter darf diese Aktion ausführen."); // Überprüft, ob der Aufrufer der Funktion der Veranstalter ist
        _;
    }

    constructor(address _veranstalter, uint _startZeit, uint _endZeit) public {
        veranstalter = _veranstalter;
        startZeit = _startZeit;
        endZeit = _endZeit;
    }

    // Funktion zum Berechtigen einer Liste von Wählern
    function berechtigeWaehlerListe(uint256[] memory _matrikelnummern) public nurVeranstalter {
        for (uint256 i = 0; i < _matrikelnummern.length; i++) {
            waehler[_matrikelnummern[i]].istBerechtigt = true;
        }
    }

    // Funktion zum Erstellen eines neuen Kandidaten
    function erstelleKandidat(string memory _name) public nurVeranstalter {
        uint256 kandidatId = kandidaten.length;
        Kandidat memory neuerKandidat = Kandidat(kandidatId, _name, 0);
        kandidaten.push(neuerKandidat);

        emit KandidatErstellt(kandidatId, _name); // Löst das Ereignis für die Erstellung eines Kandidaten aus
    }

    // Funktion zum Prüfen der Teilnahmeberechtigung eines Wählers
    function pruefeTeilnahmeberechtigung(uint256 _matrikelnummer) public view returns (bool) {
        return waehler[_matrikelnummer].istBerechtigt;
    }

    // Funktion zum Abstimmen eines Wählers
    function stimmeAb(uint256 _matrikelnummer, uint256 _kandidatenIndex) public {
        require(block.timestamp >= startZeit && block.timestamp <= endZeit, "Die Wahl ist nicht geöffnet."); // Überprüft, ob die Wahl geöffnet ist
        require(waehler[_matrikelnummer].istBerechtigt, "Der Wähler ist nicht zur Teilnahme berechtigt."); // Überprüft, ob der Wähler zur Teilnahme berechtigt ist
        require(!waehler[_matrikelnummer].hatAbgestimmt, "Der Wähler hat bereits abgestimmt."); // Überprüft, ob der Wähler bereits abgestimmt hat
        require(_matrikelnummer > 0, "Ungültige Matrikelnummer."); // Überprüft, ob die Matrikelnummer gültig ist
        require(_kandidatenIndex < kandidaten.length, "Ungültiger Kandidatenindex."); // Überprüft, ob der Kandidatenindex gültig ist

        waehler[_matrikelnummer].hatAbgestimmt = true;
        waehler[_matrikelnummer].kandidatenIndex = _kandidatenIndex;
        kandidaten[_kandidatenIndex].stimmen++;

        emit Abstimmung(_matrikelnummer, _kandidatenIndex); // Löst das Abstimmungsereignis aus
    }

    // Funktion zum Auszählen der Stimmen
    function stimmenAuszaehlen() public view nurVeranstalter returns (uint256[] memory) {
        require(block.timestamp > endZeit, "Die Wahl ist noch nicht beendet."); // Überprüft, ob die Wahl beendet ist

        uint256[] memory ergebnisse = new uint256[](kandidaten.length);

        for (uint256 i = 0; i < kandidaten.length; i++) {
            ergebnisse[i] = kandidaten[i].stimmen;
        }

        return ergebnisse;
    }

}
