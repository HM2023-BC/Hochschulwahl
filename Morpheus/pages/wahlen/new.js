import React, { Component } from 'react';
import { Form, Button, Input, Message, Segment, Grid } from 'semantic-ui-react';
import Header from '../../components/Header.js';
import web3 from '../../Ethereum/web3';
import factory from '../../Ethereum/factory';

class WahlNew extends Component {
  state = {
    startJahr: '',
    startMonat: '',
    startTag: '',
    endJahr: '',
    endMonat: '',
    endTag: '',
    value:'',
    errorMessage: '',
    loading: false
  };

  onSubmit = async (event) => {
    event.preventDefault();

    this.setState({ loading: true, errorMessage: '' });

    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods.erstelleWahl(
        this.state.startJahr,
        this.state.startMonat,
        this.state.startTag,
        this.state.endJahr,
        this.state.endMonat,
        this.state.endTag,
        this.state.value
      )
      .send({
       from: accounts[0]
      })
      ;

     
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
  }

  render() {
    return (
      <>
      <Header/>
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
  <Grid style={{ height: '100vh' }}>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Segment textAlign='center' style={{ backgroundColor: '#196491', color: '#fff' }}>
        <h2>Erstelle eine neue Wahl</h2>
      </Segment>
      <Segment style={{ backgroundColor: '#f2f2f2', borderRadius: '10px', marginTop: '20px', padding: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h3 style={{ textAlign: 'center' }}>Start Datum</h3>
          <Form.Field>
            <label>Jahr</label>
            <Input 
              value={this.state.startJahr}
              onChange={event => this.setState({ startJahr: event.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Monat</label>
            <Input 
              value={this.state.startMonat}
              onChange={event => this.setState({ startMonat: event.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Tag</label>
            <Input 
              value={this.state.startTag}
              onChange={event => this.setState({ startTag: event.target.value })}
            />
          </Form.Field>
        </div>
        <div>
          <h3 style={{ textAlign: 'center' }}>End Datum</h3>
          <Form.Field>
            <label>Jahr</label>
            <Input 
              value={this.state.endJahr}
              onChange={event => this.setState({ endJahr: event.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Monat</label>
            <Input 
              value={this.state.endMonat}
              onChange={event => this.setState({ endMonat: event.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Tag</label>
            <Input 
              value={this.state.endTag}
              onChange={event => this.setState({ endTag: event.target.value })}
            />
          </Form.Field>
        </div>
        <Form.Field>
            <label>Value</label>
            <Input 
              value={this.state.value}
              onChange={event => this.setState({ endTag: event.target.value })}
            />
          </Form.Field>
      </Segment>
      
      <Message error header='' content={this.state.errorMessage} style={{ marginTop: '20px' }} />
      <Button loading={this.state.loading} primary fluid size='large' style={{ marginTop: '20px' }}>Create!</Button>
    </Grid.Column>
  </Grid>
</Form>

      </>
    );
  }  
}

export default WahlNew;

