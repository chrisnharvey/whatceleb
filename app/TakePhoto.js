'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast'
import Spinner from 'react-native-loading-spinner-overlay';
import Camera from 'react-native-camera';

export default class TakePhoto extends Component {
  constructor(props) {
    super();
    this.state = {
      loading: false
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          captureQuality="480p"
          aspect={Camera.constants.Aspect.fill}>
          <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[WHO IS THIS]</Text>
        </Camera>
        <Toast
          ref="toast"
          style={{backgroundColor:'red'}}
          position='top'
        />
        <Spinner overlayColor="rgba(0, 0, 0, 0.9)" visible={this.state.loading} textStyle={{color: '#FFF'}} />
      </View>
    );
  }

  takePicture() {
    const options = {};
    //options.location = ...
    this.camera.capture({metadata: options})
      .then((data) => {
        this.setState(() => {
          return {
            loading: true
          }
        })
      })
      .catch(err => console.error(err));
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});
