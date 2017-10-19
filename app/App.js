import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import Welcome from './Welcome';
import TakePhoto from './TakePhoto';
import Profile from './Profile';
import Photos from './Photos';
import Orientation from 'react-native-orientation';

const WhatCeleb = StackNavigator({
  Welcome: { screen: Welcome },
  TakePhoto: { screen: TakePhoto },
  Profile: { screen: Profile },
  Photos: { screen: Photos }
}, {
  headerMode: 'none'
});

export default class App extends Component<{}> {
  render() {
    return <WhatCeleb />;
  }

  componentDidMount() {
    Orientation.lockToPortrait();
  }
}