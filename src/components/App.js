import React from 'react';
import { Container } from 'reactstrap';
import BeerList from './BeerList';

class App extends React.Component{
  render() {
    return (
      <Container className="App my-4">
        <BeerList />
      </Container>
    );
  }
}

export default App;
