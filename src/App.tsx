import * as React from 'react';
import Home from './pages/home';
// import { Router, Route, Switch } from 'react-router-dom';
// const { }
class App extends React.Component {
  componentDidMount() {
   
  }
  public render() {
    return (
      <div style={{height: '100%'}}>
        <Home/>
      </div>
    );
  }
}

export default App;
