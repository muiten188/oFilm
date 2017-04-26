import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Navigator,
  Text,
  View,
  ListView,
  ScrollView,
  Image,
  TouchableHighlight,
  Button,
  RefreshControl
} from 'react-native';
let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
export default class index extends Component{
  constructor(props){
    super(props);
  }
  componentWillMount() {
    const { getListFilm } = this.props.listFilmActions;
    getListFilm();
  }
  getListFilm(){
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    // var data = Array.apply(null, {length: 120}).map(Number.call, Number);
    var data = require('../../mockData/listFilm.json');
    return ds.cloneWithRows(data);
  }
  buildRow(oData){
      return(
        <TouchableHighlight onPress={()=>this.onListItemClick(this.props, oData)}>
          <View style={styles.item}>
              <Image style={{width: 100, height: 60}} source={{uri:oData.PosterImageUrl}}/>
              <Text ellipsizeMode='tail' numberOfLines={2}>{oData.FilmName}</Text>
          </View>
        </TouchableHighlight>
      )
  }
  onListItemClick(props,oData){
    props.navigator.push({id:"FilmDetail",oFilm: oData});
  }
  _onRefresh() {
    const { isLoading }=this.props.listFilmReducers;
    const { refreshListFilm }=this.props.listFilmActions;
    refreshListFilm();
  }
  render(){
    const { listFilm, isLoading }=this.props.listFilmReducers;
    return(
      <ScrollView style={styles.scroll}
        refreshControl={
          <RefreshControl
            refreshing={isLoading?true:false}
            onRefresh={()=>this._onRefresh()}
            tintColor="#ff0000"
            title="Loading..."
            titleColor="#00ff00"
            colors={['#ff0000', '#00ff00', '#0000ff']}
            progressBackgroundColor="#ffff00"
          />
        }>
        {
          listFilm?
          <ListView
              contentContainerStyle={styles.list}
              initialListSize={listFilm.length}
              dataSource={ds.cloneWithRows(listFilm)}
              renderRow={(oData)=>this.buildRow(oData)}
            />:
            null
        }
      </ScrollView>
    )
  }
}
var styles = StyleSheet.create({
    scroll:{
        margin:10
    },
    list: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    item: {
        margin: 5,
        width: 100,
        height:95,
        flexDirection: 'column'
    }
});
