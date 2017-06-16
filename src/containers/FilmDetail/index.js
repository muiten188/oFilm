import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Navigator,
  View,
  ListView,
  ScrollView,
  Image,
  TouchableOpacity,
  BackAndroid,
  Platform,
  ToastAndroid,
  RefreshControl
} from 'react-native';
import { Container, Content, Thumbnail, Text, Button } from 'native-base';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import * as filmDetailActions from "../../store/actions/containers/film_detail_actions";
import styles from './styles';
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
  }
  //renders...
  buildRowEpisode(episode, rowID) {
    return (
      <View key={rowID} style={{ marginBottom: 5 }}>
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

  buildRowSeparator(a, index) {
    return (
      <Text key={index} style={{ marginRight: 10 }}></Text>
    )
  }

  renderServerFilm(serverFilm, index) {
    return (
      <View style={{ flexDirection: 'column', marginTop: 4, marginBottom: 4 }} key={index}>
        <Text style={Object.assign(styles.fullWidthItem, styles.itemMargin)}>{serverFilm.Server}</Text>
        <ListView
          contentContainerStyle={styles.listEpisode}
          initialListSize={serverFilm.ListFilm.length}
          dataSource={ds.cloneWithRows(serverFilm.ListFilm)}
          renderSeparator={(a, index) => this.buildRowSeparator(a, index)}
          renderRow={(episode, sectionID, rowID, highlightRow) => this.buildRowEpisode(episode, rowID)}
        />
      </View>
    )
  }

  render() {
    const { filmDetail, isLoading } = this.props.filmDetailReducers;
    return (
      <Container>
        <Content pointerEvents={isLoading || this.isFirstLoading ? "none" : "auto"} style={styles.contentDetail}>
          <Image style={Object.assign({}, styles.fullWidthItem, styles.filmImage, styles.itemMargin)} source={{ uri: filmDetail ? filmDetail.Thumbnail : null }} />
          <Text style={Object.assign({}, styles.fullWidthItem, styles.itemMargin)}>Phim: {filmDetail ? filmDetail.Name : null}</Text>
          <Text style={Object.assign({}, styles.fullWidthItem, styles.itemMargin)}>Mô tả: {filmDetail ? filmDetail.Description : null}</Text>
          {
            filmDetail ?
              filmDetail.ListServerFilm.map(this.renderServerFilm.bind(this))
              : null
          }
        </Content>
      </Container>
    )
  }
}

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
/*<ScrollView style={styles.scroll}
        refreshControl={
          <RefreshControl
            refreshing={isLoading || this.isFirstLoading ? true : false}
            onRefresh={() => this._onRefresh()}
            tintColor="#ff0000"
            title="Loading..."
            titleColor="#00ff00"
            colors={['#ff0000', '#00ff00', '#0000ff']}
            progressBackgroundColor="#ffffff"
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
      </ScrollView>*/