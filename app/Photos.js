import React, { Component } from 'react';
import Gallery from 'react-native-image-gallery';

export default class Photos extends Component<{}> {    
  render() {
    const {state} = this.props.navigation;

    let images = [];

    for (var image of state.params.images) {
        images.push({
            source: {
                uri: image
            }
        })
    }

    return (
      <Gallery
        style={{ flex: 1, backgroundColor: 'black' }}
        images={images}
        initialPage={state.params.selectedImage}
      />
    );
  }
}