import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ListView, RefreshControl } from 'react-native';
import default_themes from '../../themes/themesbase/default';
import { Container, Content, Thumbnail, Text, Button, Grid, Row, Col } from 'native-base';
import styles from './styles';
import Variables from '../../common/variables';
import * as listFilmActions from "../../store/actions/containers/listfilm_actions";
import FilmItem from './film_item';
let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
class index extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: 'Danh sách phim',
    headerLeft: null
  };

  componentDidMount() {
    const { getListFilm } = this.props.listFilmActions;
    getListFilm();
  }

  componentWillUnmount() {

  }

  buildRow(oData, rowID) {
    return (
      <FilmItem oData={oData} rowID={rowID} onListItemClick={(oData)=>this.onListItemClick(oData)} />
    )
  }
  // <Button dark transparent style={styles.item}>
  //       <Grid style={styles.flex}>
  //         <Row style={styles.rowFilm}><Thumbnail style={styles.image} borderRadius={Variables.ThumbnailFilm.borderRadius} source={{ uri: oData.PosterUrl }} /></Row>
  //         <Row style={styles.rowFilm}><Text ellipsizeMode='tail' numberOfLines={Variables.TitleFilm.numberOfLines}>{oData.Name1}</Text></Row>
  //       </Grid>
  //     </Button>
  onListItemClick(oData) {
    const { navigationAction } = this.props.navigation;
    navigationAction.push({ id: "FilmDetail", title: "Film Detail", oFilm: oData });
  }

  _onRefresh() {
    const { isLoading } = this.props.listFilmReducers;
    const { refreshListFilm } = this.props.listFilmActions;
    refreshListFilm();
  }

  render() {
    const { listFilm, isLoading } = this.props.listFilmReducers;
    return (
      <Container>
        <Content
          refreshControl={
            <RefreshControl
              style={{ backgroundColor: '#E0FFFF' }}
              refreshing={isLoading ? true : false}
              onRefresh={() => this._onRefresh()}
              {...default_themes.refreshOption}
            />}
        >
          {
            listFilm ?
              <ListView
                contentContainerStyle={styles.list}
                initialListSize={listFilm.length}
                dataSource={ds.cloneWithRows(listFilm)}
                renderRow={(oData, sectionID, rowID, highlightRow) => this.buildRow(oData, rowID)}
              /> :
              null
          }
        </Content>
      </Container>
    )
  }
}

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

/*<ScrollView style={styles.scroll}
        refreshControl={
          <RefreshControl
            refreshing={isLoading ? true : false}
            onRefresh={() => this._onRefresh()}
            tintColor="#ffffff"
            title="Loading..."
            titleColor="#00ff00"
            colors={['#ff0000', '#00ff00', '#0000ff']}
            progressBackgroundColor="#ffffff"
          />
        }>
        {
          listFilm ?
            <ListView
              contentContainerStyle={styles.list}
              initialListSize={listFilm.length}
              dataSource={ds.cloneWithRows(listFilm)}
              renderRow={(oData, sectionID, rowID, highlightRow) => this.buildRow(oData, rowID)}
            /> :
            null
        }
      </ScrollView>*/