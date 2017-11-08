import React, { Component } from 'react';
import Config from 'react-native-config'
import { AdMobBanner } from 'react-native-admob'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  Image
} from 'react-native';

export default class Welcome extends Component {
  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <View style={styles.backgroundImageWrapper}>
          <Image source={require('../../assets/splash.png')} style={styles.backgroundImage} />
        </View>

        <Text style={styles.instructions}>
          Tap the button below to take a photo of a celebrity that you want to identifty.
        </Text>

        <Button
          onPress={() => navigate('TakePhoto')}
          title="Take Photo"
          accessibilityLabel="Learn more about this purple button"
        />

        <View style={styles.adContainer}>
          <AdMobBanner
            style={styles.ad}
            adSize="banner"
            adUnitID={Config.AD_UNIT_ID}
            testDevices={[AdMobBanner.simulatorId]}
            onAdFailedToLoad={error => console.error(error)}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  adContainer: {
    backgroundColor: '#000',
    position: 'absolute',
    bottom: 0
  },
  ad: {
    backgroundColor: '#000'
  },
  backgroundImageWrapper: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  instructions: {
    textAlign: 'center',
    color: '#fff',
    marginBottom: 15,
    width: 330
  },
});
