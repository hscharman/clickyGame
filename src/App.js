import React, { Component } from "react";
import Card from "./components/Card";
import Wrapper from "./components/Wrapper";
import Score from "./components/Score";
import fruit from "./cards.json";
import "./App.css";

class App extends Component {
  //Setting this.state to the fruit cards. 
  state = {
    fruit,
    clickedFruitIds: [],
    score: 0,
    goal: 8,
    status: ""
  };

  //When user clicks, cards are shuffled. 
  shuffleScoreCard = id => {
    let clickedFruitIds = this.state.clickedFruitIds;

    if(clickedFruitIds.includes(id)){
      this.setState({ clickedFruitIds: [], score: 0, status:  "Sorry, game over! Click to play again." });
      return;
    }else{
      clickedFruitIds.push(id)

      if(clickedFruitIds.length === 8){
        this.setState({score: 8, status: "Congratulations, winner! Click to play again!", clickedFruitIds: []});
        console.log('You Win');
        return;
      }

      this.setState({ fruit, clickedFruitIds, score: clickedFruitIds.length, status: " " });

      for (let i = fruit.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [fruit[i], fruit[j]] = [fruit[j], fruit[i]];
      }
    }
  }

  //Map over this.state.cards and render a fruit Card for each. 
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title"><strong>CLICKY GAME</strong></h1>
          <p className="App-intro"><strong>
            The object: Don't click the same fruit twice!
          </strong></p>
        </header>
        <br></br>
        <Score total={this.state.score}
               goal={8}
               status={this.state.status}
               />
        <br></br>
        <Wrapper>
          {this.state.fruit.map(fruits => (
            <Card
              shuffleScoreCard={this.shuffleScoreCard}
              id={fruits.id}
              key={fruits.id}
              image={fruits.image}
            />
          ))}
        </Wrapper>
        <footer>
          
        </footer>
    </div>
    );
  }
}

export default App;
