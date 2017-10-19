import React, { Component } from 'react';
import Config from 'react-native-config'
import {AdMobBanner} from 'react-native-admob'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  Linking
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import ReadMore from '@expo/react-native-read-more-text';

export default class Profile extends Component<{}> {
  render() {
    const { navigate } = this.props.navigation;
    const {state} = this.props.navigation;

    let movies = [];

    for (var movie of state.params.known_for) {
      movies.push(
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

    return (
      <View style={{ flex: 1 }}>
        <HeaderImageScrollView
          maxHeight={300}
          minHeight={65}
          renderHeader={() => (
            <Image source={{uri: state.params.profile_image}} style={styles.image} />
          )}
          renderFixedForeground={() =>
            <Animatable.View
              style={styles.navTitleView}
              ref={navTitleView => {
                this.navTitleView = navTitleView;
              }}
            >
              <Text style={styles.navTitle}>
                {state.params.name}
              </Text>
            </Animatable.View>
          }
        >
          <TriggeringView
            style={styles.section}
            onHide={() => this.navTitleView.fadeInUp(200)}
            onDisplay={() => this.navTitleView.fadeOut(100)}
          >
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.title}>
                <Text style={styles.name}>{state.params.name}</Text>
              </Text>

              <Button title="IMDb" onPress={() => Linking.openURL(state.params.imdb_url)} />
            </View>
          </TriggeringView>

          <View style={styles.section}>
              <Text style={styles.sectionTitle}>Biography</Text>
            
              <ReadMore
                numberOfLines={3}
                renderTruncatedFooter={this._renderTruncatedFooter}
                renderRevealedFooter={this._renderRevealedFooter}
                onReady={this._handleTextReady}
              >
                <Text style={styles.sectionContent}>
                  {state.params.bio}
                </Text>
              </ReadMore>
          </View>

          <View style={styles.section}>
              <Text style={styles.sectionTitle}>Known For</Text>
              {movies}
          </View>
        </HeaderImageScrollView>

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
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  ad: {
    backgroundColor: '#fff'
  },
  textContainer: {
    flex: 1,
  },
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
  },
  cellBorder: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: StyleSheet.hairlineWidth,
    marginLeft: 4,
},
  navTitleView: {
    height: 65,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 16,
    opacity: 0,
  },
  navTitle: {
    color: 'white',
    fontSize: 18,
    backgroundColor: 'transparent',
  },
  image: {
    height: 300,
    width: Dimensions.get('window').width,
    alignSelf: 'stretch',
    resizeMode: 'cover'
  },
  title: {
    fontSize: 20,
  },
  name: {
    fontWeight: 'bold',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    backgroundColor: 'white',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionContent: {
    fontSize: 16,
    textAlign: 'justify',
  },
  titleContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageTitle: {
    color: 'white',
    backgroundColor: 'transparent',
    fontSize: 24,
  }
});
