import ListFilm from '../component/listfilm/index';
import FilmDetail from '../component/filmdetail/film_detail';
import WatchFilm from '../component/filmdetail/watch_screen';
import {
    addNavigationHelpers,
    StackNavigator,
} from 'react-navigation';

const stackNavigatorConfiguration = {
    initialRouteName: 'ListFilm'
}

export const RootRouterContainer = StackNavigator({
    ListFilm: { screen: ListFilm },
    FilmDetail: { screen: FilmDetail },
    WatchFilm: { screen: WatchFilm }
}, stackNavigatorConfiguration)