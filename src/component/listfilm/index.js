import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  AppRegistry,
  StyleSheet,
  Navigator,
  Text,
  View,
  ListView,
  ScrollView,
  Image,
  TouchableOpacity,
  Button,
  RefreshControl,
  BackAndroid,
  ToastAndroid
} from 'react-native';
import * as utility from "../../common/utility";
import * as listFilmActions from "../../actions/component/listfilm_actions";

let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
class index extends Component {
  constructor(props) {
    super(props);

  }

  static navigationOptions = {
    title: 'Danh sách phim',
    headerLeft:null
  };

  componentDidMount() {
    const { getListFilm } = this.props.listFilmActions;
    getListFilm();
  }

  componentWillUnmount() {
    
  }

  buildRow(oData) {
    return (
      <TouchableOpacity onPress={(e)=>this.onListItemClick(oData)}>
        <View style={styles.item}>
          <Image style={{ width: 100, height: 60 }} source={{ uri: oData.PosterUrl }} />
          <Text ellipsizeMode='tail' numberOfLines={2}>{oData.Name1}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  onListItemClick(oData) {
    const { navigationAction } = this.props.navigation;
    navigationAction.push({ id: "FilmDetail", title: "Film Detail", oFilm: oData });
    // props.navigator.push({ id: "FilmDetail", oFilm: oData });
  }

  _onRefresh() {
    const { isLoading } = this.props.listFilmReducers;
    const { refreshListFilm } = this.props.listFilmActions;
    refreshListFilm();
  }

  render() {
    const { listFilm, isLoading } = this.props.listFilmReducers;
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
          />
        }>
        {
          listFilm ?
            <ListView
              contentContainerStyle={styles.list}
              initialListSize={listFilm.length}
              dataSource={ds.cloneWithRows(listFilm)}
              renderRow={(oData) => this.buildRow(oData)}
            /> :
            null
        }
      </ScrollView>
    )
  }
}
var styles = StyleSheet.create({
  scroll: {
    margin: 10
  },
  list: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap'
  },
  item: {
    margin: 5,
    width: 100,
    height: 95,
    flexDirection: 'column'
  }
});

function mapStateToProps(state, props) {
  return {
    listFilmReducers: state.listFilmReducers,
  }
};
function mapToDispatch(dispatch) {
  return {
    listFilmActions: bindActionCreators(listFilmActions, dispatch),
  }
}

export default connect(mapStateToProps, mapToDispatch)(index);