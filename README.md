# EduVote

## Blockchain-basierte DApp für Hochschulwahlen

EduVote ist eine dezentralisierte Anwendung (DApp), entwickelt um ein sicheres, transparentes und einfaches System für Hochschulwahlen zu bieten. Basierend auf der Ethereum-Blockchain und unter Nutzung von Smart Contracts, bietet es die Möglichkeit, Wahlprozesse zu automatisieren und die Auszählung sowie Veröffentlichung der Wahlergebnisse in Echtzeit durchzuführen. Diese innovative Anwendung revolutioniert die Art und Weise, wie Abstimmungen durchgeführt werden, indem sie die Vorteile der Blockchain-Technologie nutzt, um Manipulationen zu verhindern und die Anonymität zu wahren.

## Funktionsweise

Unsere DApp ermöglicht es den Hochschulen, Wahlen zu erstellen und zu verwalten. Nach der Erstellung der Wahl können Studierende ihre Stimmen abgeben, indem sie eine Transaktion auf der Ethereum-Blockchain durchführen. Dank der Solidity Smart Contracts werden die Stimmen automatisch ausgezählt und die Ergebnisse werden in Echtzeit auf der Blockchain veröffentlicht, was eine hohe Transparenz und Vertrauenswürdigkeit gewährleistet. Alle Transaktionen und Ergebnisse sind unveränderlich und nachprüfbar, was Betrug oder Manipulationen ausschließt.

## Verwendung

Ordner Local für Lokale Anwendung zur Ausführung der Tests
Ordner Morpheus für Server Anwendung

Zunächst muss die DApp installiert und korrekt konfiguriert werden, wie in den Abschnitten "Installation und Konfiguration" beschrieben. Sobald die Anwendung eingerichtet ist, kann eine Hochschule eine neue Wahl erstellen, indem sie die entsprechenden Details in die DApp eingibt. Nachdem die Wahl erstellt wurde, können die Studierenden ihre Stimmen abgeben, indem sie ihre Wallet-Software verwenden und eine Transaktion an den entsprechenden Smart Contract senden. Die Stimmen werden dann automatisch ausgezählt und veröffentlicht.

## Installation und Konfiguration

Um mit EduVote zu interagieren, benötigen Sie eine Ethereum-kompatible Wallet-Software wie MetaMask. Sie können die Anwendung entweder lokal mithilfe von Ganache deployen oder auf einem Proof of Authority (POA) Netzwerk. Zusätzlich werden Node, npm und das Truffle-Framework benötigt.

Führen Sie die folgenden Schritte aus, um EduVote zu installieren und zu konfigurieren:

1. Klonen Sie das Repository: `git clone <repository_url>`
2. Wechseln Sie in das Verzeichnis: `cd HochschulWahl/Morpheus/Ethereum`
3. Installieren Sie die benötigten Abhängigkeiten mittels npm: `npm install`
4. Konfigurieren Sie die truffle.js Datei:
    - Geben Sie den privaten Schlüssel (`<const key>`) Ihres Blockchain-Netzwerks ein
    - Geben Sie die URL (`<const url>`) Ihres Blockchain-Netzwerks ein
    - Geben Sie die ChainId Ihres Blockchain-Netzwerks ein
    - Für die lokale Entwicklung konfigurieren Sie das Netzwerk wie folgt:
        ```
        development: {
          host: "127.0.0.1",
          port: 9545,
          network_id: "*"
        }
        ```
    - Für die Nutzung eines POA-Netzwerks konfigurieren Sie das Netzwerk wie folgt:
        ```
        private_poa: { 
          provider: function () {
            return new HDWalletProvider({
              privateKeys: privateKeys,
              providerOrUrl: network,
              chainId: chainId
            })
          },
          network_id: "*",
          gas: 6000000,
          gasPrice: gasPrice
        }
        ```
    - Führen Sie anschließend das Truffle-Migrationskommando für das jeweilige Netzwerk aus: `truffle migrate --network private_poa`
5. Konfigurieren Sie die web3.js Datei:
    - Geben Sie die RPC-URL (`<const network>`) Ihres Blockchain-Netzwerks ein
6. Konfigurieren Sie die factory.js Datei:
    - Geben Sie die Vertragsadresse (`<const wahlFactoryaddress>`) aus der WahlCreator.json Datei nach dem Deployen ein



### Auf Morpheus

Um das Projekt zu starten, führen Sie den Befehl `node server.js` aus. Dieser Befehl startet den Server auf ihrer Entwicklungsumgebung und läuft auf dem Port 3000. Sie können Ihren Server beispielsweise in Morpheus Labs unter CDE Services – node öffnen.

### Lokal für Tests

Um das Projekt lokal zu testen, müssen sowohl `ganache-cli` als auch `truffle develop` in separaten Terminals ausgeführt werden.

## Tests
Wechseln Sie in das Verzeichnis: `cd Local`
Die bereitgestellten Tests können mit dem Befehl `truffle test` ausgeführt werden.

## Abhängigkeiten

Dieses Projekt nutzt die folgenden Hauptabhängigkeiten:

- `@truffle/hdwallet-provider`: Diese Bibliothek ermöglicht es Truffle, Transaktionen durch eine hierarchische deterministische Wallet zu signieren.
- `next`: Ein Framework für serverseitiges Rendering und statische Webseiten für Projekte mit React.
- `next-routes`: Eine kleine Layer-Erweiterung für Next.js, die serverseitiges Routing ermöglicht.
- `react` und `react-dom`: Eine JavaScript-Bibliothek zum Erstellen von Benutzeroberflächen.
- `semantic-ui-react`: Die offizielle React-Integration für Semantic UI, ein Entwicklungsframework, das dabei hilft, schöne, responsive Layouts mit benutzerfreundlicher HTML-Syntax zu erstellen.
- `truffle-artifactor`: Eine Bibliothek zur Generierung von Contract Artifacts, die von Truffle genutzt wird.
- `truffle-privatekey-provider`: Eine Bibliothek, die Truffle ermöglicht, Transaktionen mit einem privaten Schlüssel zu signieren.
- `truffle-wallet-provider`: Eine Bibliothek, die Truffle ermöglicht, Transaktionen mit einer Ethereum-Wallet zu signieren.
- `web3`: Eine Bibliothek, die die Interaktion mit einer lokalen oder remote Ethereum-Blockchain ermöglicht.
- `ganache-time-traveler`: Eine Bibliothek, die für die Tests wichtig ist um das Ende einer Wahl zu überprüfen.

Diese Bibliotheken werden automatisch installiert, wenn Sie `npm install` in Ihrem Projektverzeichnis ausführen. Stellen Sie sicher, dass Sie die richtige Version dieser Bibliotheken verwenden, wie in der Datei `package.json` Ihres Projekts angegeben.

## Demos und Prototyp

[Blockchain Show Case](https://1drv.ms/v/s!Aq44rLifzynUxS5ch5QJ3Jr55_ZU?e=7SFu43)
[Prototyp](https://www.figma.com/file/WwJsdOIbPN0WwmUemF0c8L/Hochschulwahl?type=design&node-id=0%3A1&mode=design&t=X8DiRjt2rzAuwmxt-1)
[GitHub](https://github.com/HM2023-BC/Hochschulwahl.git)
[Präsentation](https://1drv.ms/p/s!Aq44rLifzynUxCpnW163opB2pa0x?e=BXjPan)
[Whitepaper](https://1drv.ms/b/s!Aq44rLifzynUxSfUC0wwXqDJ6M2S?e=oPUP7B)

## Versionshinweise

    "@truffle/hdwallet-provider": "^2.1.12",
    "ganache-time-traveler": "^1.0.16",
    "next": "^13.4.7",
    "next-routes": "^1.4.2",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "semantic-ui-react": "^2.1.4",
    "truffle-artifactor": "^4.0.30",
    "truffle-privatekey-provider": "^1.5.0",
    "truffle-wallet-provider": "0.0.5",
    "web3": "^4.0.1"

## Autoren und Mitwirkende

Dieses Projekt wurde von Agostino Luggo, Anila Lela, Carina Schillinger und Nico Neuhauss im Rahmen der Veranstaltung "Blockchains mit Ethereum & Solidity" erstellt.

