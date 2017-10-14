/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator
} from 'react-native';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';

export default class Profile extends Component<{}> {
  render() {
    const { navigate } = this.props.navigation;

    return (
        <HeaderImageScrollView
      maxHeight={200}
      minHeight={MIN_HEIGHT}
      renderHeader={() => (
        <Image source={require('../assets/NZ.jpg')} style={styles.image} />
      )}
    >
      <View style={{ height: 1000 }}>
        <TriggeringView onHide={() => console.log('text hidden')} >
          <Text>Scroll Me!</Text>
        </TriggeringView>
      </View>
    </HeaderImageScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 15,
  },
});
