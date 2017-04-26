import React , { Component } from 'react';
import  {
  Animated,
	PropTypes,
	View,
	StyleSheet,
	Text,
	Dimensions,
  TouchableOpacity,
	Image,
  Slider
} from 'react-native';
import Marquee from '@remobile/react-native-marquee';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/Ionicons';
import ModalDropdown from 'react-native-modal-dropdown';
class FilmPlayer extends Component {

  constructor (props){
    super(props);
    this.state = {
      paused : false,
      fadeAnim: new Animated.Value(1),  // opacity 0
    }
  }

  renderStopIcon (){
    this.state.fadeAnim.setValue(1)
    Animated.timing(       // Uses easing functions
           this.state.fadeAnim, // The value to drive
           {
             toValue: 0,        // Target
             duration: 3500,    // Configuration
           },
         ).start();
      return (
        <Animated.View   // Special animatable View
              style={[styles.stopIcon,{
                opacity: this.state.fadeAnim,  // Binds
              }]}>
            <Icon
              name='ios-pause'
              size={iconWidth}
              color='#000'
            />
        </Animated.View>
      )
  }
  renderStartIcon (){
      return (
        <View style={styles.wapper}>
          <View style={[styles.head,{backgroundColor:'#ccc',opacity:0.6}]}>
          <TouchableOpacity style={{width:22,marginLeft:4}} onPress={()=>alert('back')}>
            <Icon
              name='md-arrow-back'
              size={22}
              color='#373737'
            />
          </TouchableOpacity>
          <Marquee style={{fontSize:14,flex:1,width:  100,color:'white'}}>
                    bui dinh bach bui id bach
          </Marquee>
          <ModalDropdown defaultValue="HQ" dropdownStyle={{width:50}} style={{width:30,backgroundColor:'#FFFFFF'}} options={['720p', '360p','240p']}/>
          </View>
          <Icon
            name='md-arrow-dropright-circle'
            size={iconWidth}
            color='#000'
            style={styles.stopIcon}/*styles.stopIcon*/
          />
          <Slider maximumValue={this.state.duration?this.state.duration:0} value={this.state.currentTime} minimumValue={0} step={1} style={styles.sliderTime}
           onValueChange={(value) => this.player.seek(value)}>
           </Slider>
        </View>
      )
  }
  setDuration(oDuration){
    this.setState({duration:oDuration.duration})
  }
  setTime(oProgressing){
    var current=Math.floor(oProgressing.currentTime)
    this.setState({currentTime: current})
    console.log(oProgressing);
  }
  render (){
    const { row } = this.props;
    return(
      <TouchableOpacity style={styles.backgroundVideo} onPress={() => {this.setState({paused: !this.state.paused})}}>
          <Image style={styles.backgroundVideo} source={{uri: 'http://phim14.info/data/images/film/do-bong-soon-strong-woman-do-bong-soon-2017.jpg'}} >
          <Video
                ref={(ref) => {
                         this.player = ref
                       }}
                source={require('../video/clip.mp4')}/**/
                 rate={1.0}
                 volume={1.0}
                 muted={this.state.paused}
                 paused={false}
                 resizeMode="cover"
                 repeat={false}
                 onLoad={this.setDuration.bind(this)}
                 onProgress={this.setTime.bind(this)}
                 playInBackground={false}
                 playWhenInactive={false}
                 style={styles.backgroundVideo}
                 onEnd={() => { console.log('done') }}
           />
  				 </Image>
           {
              this.state.paused ?
              this.renderStartIcon() :
              this.renderStopIcon()
           }
      </TouchableOpacity>
    )
  }
}
const { width , height } = Dimensions.get('window');
const iconWidth = 40;
const paddingW = 20;

const styles = StyleSheet.create({
  head:{
    flexDirection: 'row'
  },
  wapper:{
    position: 'absolute',
    top:0,
    left:0,
    right:0,
    bottom:0
  },
  backgroundVideo : {
    width : width - paddingW ,
    height : 200,
    position : 'relative',
    alignItems : 'center'
  },
  stopIcon : {
    position: 'absolute',
    top : 200/2,
    left : width/2 -paddingW/2,
    marginTop : -iconWidth/2,
    marginLeft : -iconWidth/2,
    opacity: 1
  },
  sliderTime:{
    position: 'absolute',
    bottom : 0,
    left : 0,
    right:0,
    marginLeft : 5,
    opacity: 1
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
})
export default FilmPlayer;
