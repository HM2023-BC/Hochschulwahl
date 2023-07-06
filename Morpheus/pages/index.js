import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';
import Header from '../components/Header.js';
import factory from '../Ethereum/factory.js';
import { Link } from '../routes';

class WahlIndex extends Component {
  static async getInitialProps() {
    const wahlen = await factory.methods.getErstellteWahlen().call();
    console.log(wahlen)
    return { wahlen };
   }

  renderWahlen() {
    const items = this.props.wahlen.map(address => {
      return {
        header:address,
        description: (
        <Link route={`/wahlen/${address}`}>
        <a>View Campaign</a>
      </Link>),
      fluid: true
      };
    });

    return <Card.Group items={items} />;
  }

  render() {
    return (
      
        <div>
          <Header/>
          <Link route="/wahlen/new">
              <Button
                floated="right"
                content="Create Objekt"
                icon="add circle"
                primary
              />
            
          </Link>
          {this.renderWahlen()}
        </div>
    );
  }
}

export default WahlIndex;
