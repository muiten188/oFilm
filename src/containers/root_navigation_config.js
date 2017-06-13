import ListFilm from './ListFilm';
import FilmDetail from './FilmDetail';
//import WatchFilm from './WatchFilmScreen';
import {
    addNavigationHelpers,
    StackNavigator,
} from 'react-navigation';

const stackNavigatorConfiguration = {
    initialRouteName: 'ListFilm'
}

export const RootNavigationContainer = StackNavigator({
    ListFilm: { screen: ListFilm },
    FilmDetail: { screen: FilmDetail }
}, stackNavigatorConfiguration)
//    WatchFilm: { screen: WatchFilm }