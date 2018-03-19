import React, {Component} from 'react';
import './App.css';

const code = `
import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';

class App extends Component {
  render() {
    return (
      <View style={{flex: 1, flexDirection: '%flexDirection%', justifyContent: '%justifyContent%', alignItems: '%alignItems%'}}>
        <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
        <View style={{width: 50, height: 50, backgroundColor: 'skyblue'}} />
        <View style={{width: 50, height: 50, backgroundColor: 'steelblue'}} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  flex: 1,
  backgroundColor: 'red'
});

export default App;
`;


class App extends Component {
  state = {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  };

  setValue = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  getCode = () => {
    const mapObj = {
      '%flexDirection%': this.state.flexDirection,
      '%justifyContent%': this.state.justifyContent,
      '%alignItems%': this.state.alignItems
    };

    const regexp = new RegExp(Object.keys(mapObj).join("|"), "gi");

    let replacedCode = code.replace(regexp, function (matched) {
      return mapObj[matched];
    });

    return encodeURIComponent(replacedCode);
  };

  render() {
    return (
      <div className="App">
        <div className="options">
          <label>
            flexDirection:
            <select value={this.state.flexDirection} onChange={this.setValue} name="flexDirection">
              <option value="row">row</option>
              <option value="column">column</option>
            </select>
          </label>
          <label>
            justifyContent:
            <select value={this.state.justifyContent} onChange={this.setValue} name="justifyContent">
              <option value="flex-start">flex-start</option>
              <option value="center">center</option>
              <option value="flex-end">flex-end</option>
              <option value="space-around">space-around</option>
              <option value="space-between">space-between</option>
              <option value="space-evenly">space-evenly</option>
            </select>
          </label>
          <label>
            alignItems:
            <select value={this.state.alignItems} onChange={this.setValue} name="alignItems">
              <option value="flex-start">flex-start</option>
              <option value="center">center</option>
              <option value="flex-end">flex-end</option>
              <option value="space-around">stretch</option>
            </select>
          </label>
        </div>
        <div className="player">
          <iframe
            frameBorder="0" height="500" title="codePlayer"
            src={`//cdn.rawgit.com/dabbott/react-native-web-player/gh-v1.10.0/index.html#panes=${encodeURIComponent('["player"]')}&code=${this.getCode()}`}/>
        </div>
      </div>
    );
  }
}

export default App;
