import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Image,  
  TouchableHighlight,
  View
} from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast'
import Spinner from 'react-native-loading-spinner-overlay';
import Camera from 'react-native-camera';
import Config from 'react-native-config'

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
          captureQuality="720p"
          aspect={Camera.constants.Aspect.fill}>
          <TouchableHighlight
            onPress={this.takePicture.bind(this)}
          >
            <Image
              source={require('../assets/takephoto.png')}
              style={styles.capture}
            />
          </TouchableHighlight>
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
    const { navigate } = this.props.navigation;    

    this.setState(() => {
      return {
        loading: true
      }
    })

    this.camera.capture({metadata: options})
      .then((data) => {
        let form = new FormData;
        form.append('photo', {
          uri: data.path,
          name: 'photo.jpg',
          type: 'image/jpg'
        })

        fetch(Config.API_URL + '/find', {
          method: 'POST',
          body: form,
          headers: {
            'Content-Type': 'multipart/form-data',
            'X-WhatCeleb-Auth': Config.API_TOKEN
          }
        })
        .then(response => {
          this.setState(() => {
            return {
              loading: false
            }
          })

          if (response.status != 200) {
            this.refs.toast.show('Sorry, not sure who that is.', DURATION.LENGTH_LONG);
          } else {
            response.json().then(json => navigate('Profile', json.profile));
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
    width: 100,
    height: 100,
    resizeMode: 'cover'
  }
});
