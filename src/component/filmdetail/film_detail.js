import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import {
  StyleSheet,
  Navigator,
  Text,
  View,
  ListView,
  ScrollView,
  Image,
  TouchableOpacity,
  Button,
  BackAndroid,
  Platform,
  ToastAndroid,
  RefreshControl
} from 'react-native';
import * as utility from "../../common/utility";
import Orientation from 'react-native-orientation';
import * as filmDetailActions from "../../actions/component/film_detail_actions";
let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

class FilmDetail extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: `Giới thiệu phim ${navigation.state.params.oFilm.Name1}`,
    headerLeft: <TouchableOpacity style={{ width: 30, marginLeft: 10 }} onPress={() => { navigation.navigationAction.pop() }}>
      <FontAwesome>{Icons.chevronLeft}</FontAwesome>
    </TouchableOpacity>
  });
  //vong doi component 
  constructor(props) {
    super(props);
    this.isFirstLoading = true;
  }

  componentDidMount() {
    this.getFilmDetail();
    this.isFirstLoading = false;
  }

  componentWillUnmount() {
  }
  //component function
  watchFilm(_this, episode) {
    const { filmDetail } = this.props.filmDetailReducers;
    const { navigationAction } = this.props.navigation;
    navigationAction.push({ id: "WatchFilm", title: "WatchFilm", episode: episode, filmDetail: filmDetail });
  }

  _onRefresh() {
    this.getFilmDetail();
  }
  //fetch Data
  getFilmDetail() {
    const { oFilm } = this.props.navigation.state.params;
    const { getFilmDetail } = this.props.filmDetailActions;
    getFilmDetail(oFilm);
    utility.timerMark();
  }
  //renders...
  buildRowEpisode(episode) {
    return (
      <View style={{ marginBottom: 5 }}>
        <TouchableOpacity style={{
          height: 33,
          backgroundColor: '#8c1b0a',
          padding: 6,
          borderRadius: 3
        }} onPress={() => this.watchFilm(this, episode)}>
          <Text style={{ color: '#ccc' }}>{episode.Episode.toString()}</Text>
        </TouchableOpacity>
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

  render() {
    const { filmDetail, isLoading } = this.props.filmDetailReducers;
    return (
      <ScrollView style={styles.scroll}
        refreshControl={
          <RefreshControl
            refreshing={isLoading || this.isFirstLoading ? true : false}
            onRefresh={() => this._onRefresh()}
            tintColor="#ff0000"
            title="Loading..."
            titleColor="#00ff00"
            colors={['#ff0000', '#00ff00', '#0000ff']}
            progressBackgroundColor="#ffff00"
          />}>
        <View pointerEvents={isLoading || this.isFirstLoading ? "none" : "auto"} style={{ flexDirection: 'column', flex: 1 }}>
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
    height: 450,
    resizeMode:'contain'
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
function mapStateToProps(state, props) {
  return {
    filmDetailReducers: state.filmDetailReducers,
  }
};
function mapToDispatch(dispatch) {
  return {
    filmDetailActions: bindActionCreators(filmDetailActions, dispatch),
  }
}

export default connect(mapStateToProps, mapToDispatch)(FilmDetail);