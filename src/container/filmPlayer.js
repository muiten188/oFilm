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
  Slider,
  StatusBar
} from 'react-native';
import Marquee from '@remobile/react-native-marquee';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/Ionicons';
import ModalDropdown from 'react-native-modal-dropdown';

const iconWidth = 60;
class FilmPlayer extends Component {
  constructor (props){
    super(props);
    this.state = {
      paused : this.props.paused?this.props.paused:false,
      coverFade: new Animated.Value(1),  // opacity 0
      videoWidth:this.props.videoWidth?this.props.videoWidth:0,
      videoHeight:this.props.videoHeight?this.props.videoHeight:0
    }
  }

  setDuration(oDuration){
    // this.setState({duration:oDuration.duration})
  }
  setTime(oProgressing){
    // var current=Math.floor(oProgressing.currentTime)
    // this.setState({currentTime: current})
    // console.log(oProgressing);
  }

  componentDidMount() {
    this.setFadeCover();
  }
  componentWillReceiveProps(nextProps) {
    this.setSizeVideo(nextProps);
  }
  componentWillUpdate(nextProps, nextState) {
    this.setFadeCover(nextState);
  }
  setSizeVideo(props){
    this.setState({
      videoWidth:props.videoWidth?props.videoWidth:0,
      videoHeight:props.videoHeight?props.videoHeight:0
    })
  }
  setFadeCover(state){
    let _state=this.state;
    if (state) {
      _state=state;
    }
    if(!_state.paused){
      Animated.timing(       // Uses easing functions
           this.state.coverFade, // The value to drive
           {
             toValue: 0,        // Target
             duration: 3500,    // Configuration
           },
         ).start();
    }
    else{
      this.state.coverFade.setValue(1)
    }
  }
  render (){
    const { row } = this.props;
    return(
      <View style={{flex:1}}>
        <StatusBar
          hidden={true}
          showHideTransition={'fade'}
          animated={true}
        />
      <TouchableOpacity style={{position:'relative',alignItems:'center'}} onPress={()=>this.setState({paused:!this.state.paused})}>
          <Image style={{width:this.state.videoWidth,height:this.state.videoHeight}} source={{uri: 'http://phim14.info/data/images/film/do-bong-soon-strong-woman-do-bong-soon-2017.jpg'}} >
          <Video
                 ref={(ref) => {
                         this.player = ref
                       }}
                 source={require('../video/clip.mp4')}/**/
                 style={{flex:1}}
                 rate={1.0}
                 volume={1.0}
                 muted={this.state.paused}
                 paused={this.state.paused}
                 resizeMode="cover"
                 repeat={false}
                 onLoad={this.setDuration.bind(this)}
                 onProgress={this.setTime.bind(this)}
                 playInBackground={false}
                 playWhenInactive={false}
                 onEnd={() => { console.log('done') }}/>
            </Image>
            {
              this.renderCoverPlayer()
            }
      </TouchableOpacity>
      </View>
    )
  }
  renderCoverPlayer(){
      return (
        <Animated.View style={[styles.wapper,{opacity:this.state.coverFade}]}>
          <View style={{flex:1}}>
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
              {
                  this.state.paused?<Icon
                  name='ios-pause'
                  size={iconWidth}
                  color='#000'
                  style={[styles.stopIcon,{top:this.state.videoHeight/2,left:this.state.videoWidth/2}]}
                />:<Icon
                  name='md-arrow-dropright-circle'
                  size={iconWidth}
                  color='#000'
                  style={[styles.stopIcon,{top:this.state.videoHeight/2,left:this.state.videoWidth/2}]}/*styles.stopIcon*/
                />
              }
              <Slider maximumValue={this.state.duration?this.state.duration:0} value={this.state.currentTime} minimumValue={0} step={1} style={styles.sliderTime}
              onValueChange={(value) => this.player.seek(value)}>
              </Slider>
          </View>
        </Animated.View>
      )
  }
}

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
    position: 'absolute',
    top:0,
    left:0,
    right:0,
    bottom:0
  },
  stopIcon : {
    position: 'absolute',
    marginLeft:-iconWidth/3,
    marginTop:-iconWidth/3
  },
  sliderTime:{
    position: 'absolute',
    bottom : 0,
    left : 0,
    right:0,
    marginLeft : 5,
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
