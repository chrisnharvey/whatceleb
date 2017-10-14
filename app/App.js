import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import Welcome from './Welcome';
import TakePhoto from './TakePhoto';

const WhatCeleb = StackNavigator({
  Welcome: { screen: Welcome },
  TakePhoto: { screen: TakePhoto }
}, {
  headerMode: 'none'
});

export default class App extends Component<{}> {
  render() {
    return <WhatCeleb />;
  }
}