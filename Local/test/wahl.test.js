const { advanceTime } = require('ganache-time-traveler');
const WahlCreator = artifacts.require("./WahlCreator.sol");
const Wahl = artifacts.require("./Wahl.sol");
let wahlCreator;
let wahlAddress;
let wahl;

before(async () => {
    wahlCreator = await WahlCreator.new() // Der erste Account ist der Veranstalter

    // Definiere Start- und Enddatum der Wahl
    var startJahr = '2023'
    var startMonat = '7'
    var startTag = '1'

    var endJahr = '2023'
    var endMonat = '7'
    var endTag = '7'

    await wahlCreator.erstelleWahl(startJahr, startMonat, startTag, endJahr, endMonat, endTag)
    wahlAddress = await wahlCreator.getErstellteWahlen.call()
    wahl = await Wahl.at(wahlAddress[0])
});

contract("WahlCreator", accounts => {
    const matrikelnummer1 = 123456;
    const matrikelnummer2 = 234567;
    const matrikelnummer3 = 333333;
    const matrikelnummer4 = 444444;

    // Überprüft, ob die Adresse der erstellten Wahl vorhanden ist
    it("überprüft die Adresse der Wahl", async () => {
        assert.ok(wahlAddress)
    });

    // Überprüft die Berechtigungsprüfung für einen Wähler
    it("überprüft Berechtigungsprüfung", async () => {
        await wahl.berechtigeWaehlerListe([matrikelnummer1], { from: accounts[0] });
        const istBerechtigt = await wahl.pruefeTeilnahmeberechtigung(matrikelnummer1);
        assert.ok(istBerechtigt);
    });

    // Überprüft die Registrierung eines Wählers
    it("überprüft Registrierung von Wähler 2", async () => {
        await wahl.berechtigeWaehlerListe([matrikelnummer2], { from: accounts[0] });
        await wahl.berechtigeWaehlerListe([matrikelnummer4], { from: accounts[0] });
        const istBerechtigt = await wahl.pruefeTeilnahmeberechtigung(matrikelnummer2);
        assert.ok(istBerechtigt);
    });

    // Überprüft das Erstellen von drei Kandidaten
    it("sollte drei Kandidaten erstellen", async () => {
        await wahl.erstelleKandidat("Kandidat 1", { from: accounts[0] });
        await wahl.erstelleKandidat("Kandidat 2", { from: accounts[0] });
        await wahl.erstelleKandidat("Kandidat 3", { from: accounts[0] });

        const kandidat1 = await wahl.kandidaten(0);
        const kandidat2 = await wahl.kandidaten(1);
        const kandidat3 = await wahl.kandidaten(2);

        assert.equal(kandidat1.name, "Kandidat 1");
        assert.equal(kandidat2.name, "Kandidat 2");
        assert.equal(kandidat3.name, "Kandidat 3");
    });

    // Überprüft die Stimmabgabe für Kandidaten
    it("sollte für Kandidaten abstimmen", async () => {
        await wahl.stimmeAb(matrikelnummer2, 0, { from: accounts[3] }); // Wähler 1 stimmt für Kandidat 1
        await wahl.stimmeAb(matrikelnummer4, 1, { from: accounts[4] }); // Wähler 2 stimmt für Kandidat 2

        const kandidat1 = await wahl.kandidaten(0);
        const kandidat2 = await wahl.kandidaten(1);
        const kandidat3 = await wahl.kandidaten(2);

        assert.equal(kandidat1.stimmen.toNumber(), 1);
        assert.equal(kandidat2.stimmen.toNumber(), 1);
        assert.equal(kandidat3.stimmen.toNumber(), 0);
    });

    // Überprüft die Stimmabgabe eines Wählers
    it("überprüft Stimmabgabe", async () => {
        await wahl.stimmeAb(matrikelnummer1, 0, { from: accounts[1] });
        const waehler = await wahl.waehler.call(matrikelnummer1);
        assert.ok(waehler.hatAbgestimmt);
    });

    // Überprüft, ob ein Wähler nur einmal abstimmen kann
    it("überprüft einmalige Stimmabgabe", async () => {
        try {
            await wahl.stimmeAb(matrikelnummer1, 0, { from: accounts[1] }); // Zweite Abstimmung sollte einen Fehler auslösen
            assert.fail('Stimmabgabe sollte fehlschlagen, da der Wähler bereits abgestimmt hat.');
        } catch (err) {
            assert.ok(err.toString().includes('Der Wähler hat bereits abgestimmt.'), err.toString());
        }
    });

    // Überprüft, ob ein nicht berechtigter Wähler nicht abstimmen kann
    it("sollte verhindern, dass ein nicht berechtigter Wähler abstimmt", async () => {
        try {
            await wahl.stimmeAb(matrikelnummer3, 0, { from: accounts[2] }); // Versuchen, als nicht berechtigter Wähler abzustimmen
            assert.fail('Stimmabgabe sollte fehlschlagen, da der Wähler nicht berechtigt ist.');
        } catch (err) {
            assert.ok(err.toString().includes('Der Wähler ist nicht zur Teilnahme berechtigt.'), err.toString());
        }
    });

    // Überprüft, ob keine Stimmen nach Ende der Wahl abgegeben werden können
    it("sollte verhindern, dass Stimmen nach der Wahl abgegeben werden", async () => {
        // Anpassen der Blockchain-Zeit, um den Zeitpunkt nach der Wahl zu simulieren
        await advanceTime(172800); // 172800 Sekunden entsprechen zwei Tagen

        try {
            await wahl.stimmeAb(matrikelnummer2, 0, { from: accounts[3] }); // Versuchen, nach der Wahl abzustimmen
            assert.fail('Stimmabgabe sollte fehlschlagen, da die Wahl bereits geschlossen ist.');
        } catch (err) {
            assert.ok(err.toString().includes('Die Wahl ist nicht geöffnet.'), "Der erwartete Fehler sollte ausgelöst werden.");
        }

        // Zurücksetzen der Blockchain-Zeit
        await advanceTime(-172800); // Zeit zurücksetzen
    });

    // Überprüft, ob keine Stimmen vor Beginn der Wahl abgegeben werden können
    it("sollte verhindern, dass Stimmen vor der Wahl abgegeben werden", async () => {
        // Anpassen der Blockchain-Zeit, um den Zeitpunkt vor der Wahl zu simulieren
        await advanceTime(-172800); // 172800 Sekunden entsprechen zwei Tagen

        try {
            await wahl.stimmeAb(matrikelnummer2, 0, { from: accounts[3] }); // Versuchen, vor der Wahl abzustimmen
            assert.fail('Stimmabgabe sollte fehlschlagen, da die Wahl noch nicht geöffnet ist.');
        } catch (err) {
            assert.ok(err.toString().includes('Die Wahl ist nicht geöffnet.'), "Der erwartete Fehler sollte ausgelöst werden.");
        }

        // Zurücksetzen der Blockchain-Zeit
        await advanceTime(172800); // Zeit zurücksetzen
    });
});
