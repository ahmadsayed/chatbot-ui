
import React, { Component } from 'react';
import Conversation from '../services/conversation';
import ParkCard from '../components/ParkCard';
import AnimalsCard from '../components/AnimalsCard';
import PlantsCard from '../components/PlantsCard';
import WeatherCard from '../components/WeatherCard';
//import './App.css';
//Custom files
import './Custom/libs/bootstrap/css/bootstrap.min.css';
import './Custom/css/style.css';
 
class App extends Component {
  constructor() {
    super();
    this.state = {
      conversationHistory: []
    };
  }
  componentDidMount() {
    this.sendMessage('')
  }
  render() {
      
        
   return (
<div className="app">
    <div className="row page-container no-margin">
     <div className="col-xs-12 no-padding">
        <div className="col-xs-12 content-container no-padding">
                <div className="col-xs-12 right-pannel-container no-padding">
                    <div className="col-xs-12  chatbot-container no-padding">
                        <div className="col-xs-12 image-container-16x9 whatson-logo">
                                <img className="whatson-img" alt="whatson-img" src={require('./Custom/images/header3.jpg')}></img>
                        </div>
                        <div id="scroll" className="col-xs-12 chatbox" ref="main">           
                           { this.state.conversationHistory.map((h,i) => this.renderExchange(h, i)) }
                        </div>    
                        <div className="col-xs-12 input-field-container">
                             { this.renderInputView()}
                        </div>
                </div>
            </div>
        </div>
     </div>
    </div>
</div>
   );
  }
  renderExchange(exchange, key) {
    return !!exchange.output.cardType
      ? this.renderCard(exchange, key)
      : this.renderText(exchange, key);
  }
  renderCard(exchange, key) {
    switch(exchange.output.cardType) {
      case 'park':
        return (
          <div key={key} className="exchange">
            { exchange.input.text ? <div className="user-msg">{exchange.input.text}</div> : null }
            <div className="watson-msg"><ParkCard park={exchange.output.park}/></div>
          </div>);
      case 'animals':
        return (
          <div key={key} className="exchange">
            { exchange.input.text ? <div className="user-msg">{exchange.input.text}</div> : null }
            <div className="watson-msg"><AnimalsCard park={exchange.output.park}/></div>
          </div>);
      case 'plants':
        return (
          <div key={key} className="exchange">
            { exchange.input.text ? <div className="user-msg">{exchange.input.text}</div> : null }
            <div className="watson-msg"><PlantsCard park={exchange.output.park}/></div>
          </div>);
      case 'weather':
        return (
          <div key={key} className="exchange">
            { exchange.input.text ? <div className="user-msg">{exchange.input.text}</div> : null }
            <div className="watson-msg"><WeatherCard weather={exchange.output.weather}/></div>
          </div>);
      case 'close':
        window.close();
      default:
        this.renderText(exchange,key);
    }
  }
  renderText(exchange, key) {
    return (
      <div key={key} className="exchange">
         {exchange.input.text ?
        <div className="segments load col-xs-12 no-padding newline-dialog">
             <div className="user-image-container">
                  <img className="chat-user" alt="whatson-logo" src={require('./Custom/images/humanicon2.png')}></img>
             </div>
             <div className="from-user top">
                  <div className="message-inner">
                       <p>{ exchange.input.text ? <div>{exchange.input.text}</div> :null }</p>
                  </div>
              </div>
                                        
         </div> : null }
        <div className=" segments load col-xs-12 no-padding newline-dialog">
             <div className="whatson-image-container">
                   <img className="chat-whatson" alt="whatson-logo" src={require('./Custom/images/whatsonicon.png')}></img>
             </div>
             <div className=" from-watson top">
                 <div className="message-inner">
                      <p> { exchange.output.text.map((t, i) => <div key={i}>{t}</div>) }</p>
                  </div>
             </div>
            
        </div>
       
      </div>
    );
  }
  renderInputView() {
    return (
        <input type="text" className="chat-input" autoComplete="off" placeholder='Type something'
                  onKeyUp={e => this.onInputKeyUp(e)}/>);
  }
  onInputKeyUp(e) {
    switch (e.which) {
      case 0x0d:
        this.sendMessage(e.target.value);
        e.target.value = '';
        break;
      default:
        break;
    }
  }
  sendMessage(text) {
    Conversation.message({
      text
    }).then(r => {
      this.state.conversationHistory.push(r);
      this.setState({
        conversationHistory: this.state.conversationHistory
      })
    });
  }
  componentDidUpdate() {
    const scrollTo = (element, to, duration) => {
      if (duration <= 0) return;
      const difference = to - element.scrollTop;
      const perTick = difference / duration * 10;
      setTimeout(function () {
        element.scrollTop += perTick;
        if (element.scrollTop === to) return;
        scrollTo(element, to, duration - 10);
      }, 10);
    };
    const node = this.refs.main;
    scrollTo(node, node.scrollHeight, 300);
  }
}
export default App;