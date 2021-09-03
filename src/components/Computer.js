import { isNegative } from 'mathjs';
import React from 'react';
import './Computer.scss';
var math = require('mathjs');

class Computer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previousCalculation: '',
      currentCalculation: `Hello ${this.props.userName}`,
      equal: '', 
      isNegative: false,
      higherPrecedenceOpUsed: false,
      endExpression: false,
    }
    this.click = this.click.bind(this);
    this.record = this.record.bind(this);
    this.deleteChar = this.deleteChar.bind(this);
    this.operator = this.operator.bind(this);
    this.translanteExpression = this.translanteExpression.bind(this);
    this.classify = this.classify.bind(this);
    
  }

  record(char){
    if(this.state.currentCalculation.length === 1 && this.state.currentCalculation === '0'){
      this.setState({
        currentCalculation: '',
      })
    }
    if((this.state.currentCalculation.includes('Hello')) ){
      this.setState((state,props)=>{
        return {
          previousCalculation: state.currentCalculation,
          currentCalculation:'',
          endExpression: false,
        }
      })
    }
    if(this.state.endExpression === true){
      this.setState((state,props)=>{
        return {
          equal:'',
          endExpression: false,
        }
      })
    }
    
    this.setState((state,props)=>{
      return{
        currentCalculation: state.currentCalculation + char,
      }
    })
  }
  
  deleteChar(char){
    if(char === 'Del'){
      this.setState((state,props)=>{
        return{
          currentCalculation: state.currentCalculation.slice(0,-1),
        }
      })
    }
    else{
      this.setState((state,props)=>{
        return{
          currentCalculation: '',
        }
      })
    } 
  }
  translanteExpression(){
    this.setState((state,props)=>{
      return{
        currentCalculation: state.currentCalculation.replaceAll('%','*0.01'),
      }
    })
  }
  operator(char){
    if(char === '+/-'){ /* case for +/- */
      if(this.state.isNegative === false){
        this.setState((state,props)=>{
          return{
            isNegative: true,
            currentCalculation: '-' + state.currentCalculation,
          }
        });
      }
      else{
        this.setState((state,props)=>{
          return{
            isNegative: false,
            currentCalculation: state.currentCalculation.slice(1,state.currentCalculation.length),
          }
        });
      }
    }
    else if (char === '%' || char === '*' || char === '/'){
      if(this.state.currentCalculation.slice(-1) !== '+' && this.state.currentCalculation.slice(-1) !== '-' && this.state.currentCalculation.slice(-1) !== '*' && this.state.currentCalculation.slice(-1) !== '/'){
        this.record(char);
      }
      else{
        return;
      }
    }
    else if(char === '='){
      this.translanteExpression();
      if(this.state.currentCalculation === '' || this.state.currentCalculation.includes('Hello')){
        this.setState((state,props)=>{
          return{
          currentCalculation: '0',
          }
        })
      }
      else{
        this.setState((state,props)=>{
          return{
            previousCalculation: state.currentCalculation,
            currentCalculation: `${math.round(math.evaluate(state.currentCalculation),3)}`,
          }
        })
      }
      this.setState((state,props)=>{
        this.setState({
          equal:'=',
          endExpression: true,
        })
      });
    }
    else{
      this.record(char);
    }
  }
  

  classify(character,code){ /* put character to the right proceed function*/ 
    if(code === 1){
      this.record(character);
    }
    else if(code === 2){
      this.deleteChar(character);
    }
    else{
      this.operator(character);
    }
  }

  
  click(e){
    if(e.target.innerHTML.length > 10) {
      return;
    }
    if(!isNaN(parseInt(e.target.innerHTML)) || e.target.innerHTML === '.'){ /* look for number */
      this.classify(e.target.innerHTML,1);  
    }
    else if(e.target.innerHTML === 'C' || e.target.innerHTML === 'Del' ){ /* look for delete character */
      this.classify(e.target.innerHTML,2);  
    }
    else{ /* look for mathematics operator */
      this.classify(e.target.innerHTML,3);  
    }
    

   }
  render(){
    return(
      <section id='computer' onClick = {this.click}>
        <div id='screen'>
          <div id='previousCalc' className='calc'>
            <p>{this.state.previousCalculation}</p>
          </div>
          <div id='currentRow'>
            <p id='equal' className='calc'>{this.state.equal}</p>
            <div  id='currentCalc' className='calc'>
              <p>{this.state.currentCalculation}</p>
            </div>
          </div>
        </div>
        <button className='light'>C</button>
        <button className='light'>+/-</button>
        <button className='light'>%</button>
        <button className='dense'>/</button>
        <button>7</button>
        <button>8</button>
        <button>9</button>
        <button className='dense'>*</button>
        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button className='dense'>-</button>
        <button>3</button>
        <button>2</button>
        <button>1</button>
        <button className='dense'>+</button>
        <button>0</button>
        <button>.</button>
        <button>Del</button>
        <button className='dense'>=</button>
      </section>
    )
  }
}

export default Computer;