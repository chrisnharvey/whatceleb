import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

export default class Movie extends Component {
  render() {
    let movie = this.props.movie;

    return (
      <View key={movie.title}>
        <View style={styles.row}>
          <Image
            source={{uri: movie.poster}}
            style={styles.cellImage}
            />
            <View style={styles.textContainer}>
            <Text style={styles.movieTitle} numberOfLines={2}>
                {movie.title}
            </Text>
            
            <Text style={styles.movieYear} numberOfLines={1}>
                {movie.year}
            </Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  movieTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  movieYear: {
    color: '#999999',
    fontSize: 12,
  },
  row: {
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 5,
  },
  cellImage: {
    backgroundColor: '#dddddd',
    height: 93,
    marginRight: 10,
    width: 60,
  }
});
  