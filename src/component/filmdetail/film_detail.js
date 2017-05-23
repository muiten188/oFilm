import React, { Component } from 'react';
import {
  StyleSheet,
  Navigator,
  Text,
  View,
  ListView,
  ScrollView,
  Image,
  TouchableHighlight,
  Button,
  BackAndroid,
  Platform,
  ToastAndroid,
  RefreshControl
} from 'react-native';
import * as utility from "../../common/utility";
import Orientation from 'react-native-orientation';
let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
class FilmDetail extends Component {
  constructor(props) {
    super(props);
    this._handleBackButton = this.handleBackButton.bind(this);
  }

  _back() {
    this.props.navigator.pop();
  }

  componentDidMount() {
    BackAndroid.removeEventListener('hardwareBackPress');
    BackAndroid.addEventListener('hardwareBackPress', this._handleBackButton);
    const { getFilmDetail } = this.props.filmDetailActions;
    getFilmDetail(this.props.film);
    utility.timerMark();
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this._handleBackButton);
  }

  handleBackButton() {
    ToastAndroid.show('Back button is pressed from film detail', ToastAndroid.SHORT);
    this._back();
    return true;
  }

  watchFilm(_this, episode) {
    const { filmDetail } = this.props.filmDetailReducers;
    _this.props.navigator.push({
      id: "WatchFilm",
      episode: episode,
      filmDetail: filmDetail,
      popCallBack: () => {
        const { getFilmDetail } = this.props.filmDetailActions;
        //getFilmDetail(this.props.film);
      }
    })
  }

  buildRowEpisode(episode) {
    return (
      <View style={{ marginBottom: 5 }}>
        <Button
          onPress={() => this.watchFilm(this, episode)}
          title={episode.Episode.toString()}
          color="#555"
          accessibilityLabel="Learn more about purple"
        />
      </View>
    )
  }

  buildRowSeparator(a) {
    return (
      <Text style={{ marginRight: 10 }}></Text>
    )
  }

  renderServerFilm(serverFilm, index) {
    return (
      <View style={{ flexDirection: 'column', marginTop: 4, marginBottom: 4 }} key={index}>
        <Text style={[styles.fullWidthItem, styles.itemMargin]}>{serverFilm.Server}</Text>
        <ListView
          contentContainerStyle={styles.listEpisode}
          initialListSize={serverFilm.ListFilm.length}
          dataSource={ds.cloneWithRows(serverFilm.ListFilm)}
          renderSeparator={(a) => this.buildRowSeparator(a)}
          renderRow={(episode) => this.buildRowEpisode(episode)}
        />
      </View>
    )
  }

  _onRefresh() {
    const { isLoading } = this.props.filmDetailReducers;
    const { getFilmDetail } = this.props.filmDetailActions;
    getFilmDetail(this.props.film);
  }

  render() {
    const { filmDetail, isLoading } = this.props.filmDetailReducers;
    return (
      <ScrollView style={styles.scroll}
        refreshControl={
          <RefreshControl
            refreshing={isLoading ? true : false}
            onRefresh={() => this._onRefresh()}
            tintColor="#ff0000"
            title="Loading..."
            titleColor="#00ff00"
            colors={['#ff0000', '#00ff00', '#0000ff']}
            progressBackgroundColor="#ffff00"
          />}>
        <View pointerEvents={isLoading ? "none" : "auto"} style={{ flexDirection: 'column', flex: 1 }}>
          <Image style={[styles.fullWidthItem, styles.filmImage, styles.itemMargin]} source={{ uri: filmDetail ? filmDetail.Thumbnail : null }} />
          <Text style={[styles.fullWidthItem, styles.itemMargin]}>Phim: {filmDetail ? filmDetail.Name : null}</Text>
          <Text style={[styles.fullWidthItem, styles.itemMargin]}>Mô tả: {filmDetail ? filmDetail.Description : null}</Text>
          {
            filmDetail ?
              filmDetail.ListServerFilm.map(this.renderServerFilm.bind(this))
              : null
          }
        </View>
      </ScrollView>
    )
  }
}
export default FilmDetail;

var styles = StyleSheet.create({
  itemMargin: {
    margin: 5
  },
  fullWidthItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  filmImage: {
    height: 220
  },
  listEpisode: {
    margin: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  itemEpisode: {
    margin: 25,
    width: 30,
    height: 15,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'blue'
  }
});
