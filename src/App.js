import './App.scss';
import React from 'react';
import Computer from './components/Computer';

class App extends React.Component {
  constructor(prop){
    super(prop)
    this.userName = 'sss';
  }
  componentWillMount(){
    this.userName = prompt('Enter your name');
    console.log(this.userName);
  }
  render(){
    return (
      <div className="App">
        <header>Calculator</header>
        <Computer userName = {this.userName}/>
        <div id='watermark'>
          <span>made by </span>
          <span id='HXN'>HXN</span>
        </div>
      </div>
    );
  }
}

export default App;
