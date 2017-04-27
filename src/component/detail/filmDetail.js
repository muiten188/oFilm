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
  ToastAndroid
} from 'react-native';
import Orientation from 'react-native-orientation';
let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
class FilmDetail extends Component{
  constructor(props){
    super(props);
  }
  componentWillMount() {
    const { getFilmDetail } = this.props.filmDetailActions;
    getFilmDetail(this.props.film);
  }
  back(props){
    props.navigator.pop();
  }
  
  componentDidMount() {
      if (Platform.OS == "android") {
        BackAndroid.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
      }
   }
  componentWillUnmount() {
     if (Platform.OS == "android") {
       BackAndroid.removeEventListener('hardwareBackPress', this.handleBackButton.bind(this));
     }
  }
   handleBackButton() {
       ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
       this.props.navigator.pop();
       return true;
   }
   shouldComponentUpdate(nextProps, nextState) {
     return true;
   }
   watchFilm(_this, episode){
     const {filmDetail} =this.props.filmDetailReducers;
     _this.props.navigator.push({id:"WatchFilm", episode: episode, filmDetail:filmDetail})
   }
   buildRowEpisode(episode){
     return(
       <View>
            <Button
            onPress={()=>this.watchFilm(this,episode)}
            title={episode.Episode.toString()}
            color="#555"
            accessibilityLabel="Learn more about purple"
          />
       </View>
     )
   }
   buildRowSeparator(a){
     return(
       <Text style={{marginRight:10}}></Text>
     )
   }
  render(){
    const {filmDetail} =this.props.filmDetailReducers;
    return(
      <View style={{flexDirection: 'column',flex: 1}}>
        <Image style={[styles.fullWidthItem, styles.filmImage,styles.itemMargin]} source={{uri: filmDetail?filmDetail.PosterImageUrl:null}}/>
        <Text style={[styles.fullWidthItem,styles.itemMargin]}>Phim: {filmDetail?filmDetail.FilmName:null}</Text>
        <Text style={[styles.fullWidthItem,styles.itemMargin]}>Mô tả: {filmDetail?filmDetail.Description:null}</Text>
        <View style={{flexDirection: 'row'}}>
        <Text style={[styles.fullWidthItem,styles.itemMargin]}>Tập Phim:</Text>
        {
          filmDetail?
          <ListView
              contentContainerStyle={styles.listEpisode}
              initialListSize={4}
              dataSource={ds.cloneWithRows(filmDetail.Episode)}
              renderSeparator={(a)=>this.buildRowSeparator(a)}
              renderRow={(episode)=>this.buildRowEpisode(episode)}
            />:
            null
        }
        </View>
      </View>
    )
  }
}
export default FilmDetail;

var styles = StyleSheet.create({
  itemMargin:{
    margin:5
  },
    fullWidthItem:{
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    filmImage:{
      height:220
    },
    listEpisode: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
    },
    itemEpisode: {
        margin: 25,
        width: 30,
        height:15,
        textAlign: 'center',
        borderWidth: 1,
        borderColor: 'blue'
    }
});
