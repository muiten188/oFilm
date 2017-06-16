import color from 'color';
import { Platform, Dimensions, PixelRatio } from 'react-native';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const platform = Platform.Android;
const platformStyle = 'default';
export default {
    platformStyle,
    platform,
    // Font
    fontFamily: 'Roboto',
    fontSizeBase: 15,
    // Footer
    footerHeight: 55,
    footerDefaultBg: '#FFF',
    // FooterTab
    tabBarActiveTextColor: (platform === 'ios') ? '#007aff' : 'red',
    //refresh control
    refreshOption: {
        tintColor: "#ffffff",
        title: "Loading...",
        titleColor: "#00ff00",
        progressBackgroundColor: "#ffffff",
        colors:['#ff0000', '#00ff00', '#0000ff']
    },
    //spin 
    spinOption:{
        colors:['#ff0000', '#00ff00', '#0000ff']
    }
}