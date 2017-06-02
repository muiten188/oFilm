import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    Button,
    StyleSheet,
    View,
    Text,
    ScrollView,
    RefreshControl,
    Image,
    TouchableOpacity
} from 'react-native';
import * as navigationAction from '../../actions/root_navigation/root_navigation_actions';
const defaultImageFilm = require('../../resources/image/default.jpeg');
class DrawerMenuItem extends React.Component {
    constructor(props) {
        super(props);
    }

    onItemDrawerMenuClick(e, data) {
        debugger;
        const { navigationAction } = this.props;
        navigationAction.push({ id: "ListFilm", title: "ListFilm", oFilmServer: data });
    }

    render() {
        return (
            <ScrollView style={styles.scroll}>
                <View style={styles.container}>
                    {
                        this.props.ListServer ? this.props.ListServer.map((data, index) => (
                            <TouchableOpacity key={index} onPress={(e) => this.onItemDrawerMenuClick(e, data)}>
                                <View style={styles.ItemDrawer}>
                                    <Image style={styles.itemImage} source={data.Logo ? { uri: data.Logo } : defaultImageFilm} />
                                    <Text style={styles.itemText}>{data.Name}</Text>
                                </View>
                            </TouchableOpacity>
                        )) : null
                    }
                </View>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    ItemDrawer: {
        flex: 1,
        flexDirection: 'row',
        height: 60,
        paddingTop: 10,
        paddingBottom: 10,
    },
    itemImage: {
        height: 50,
        width: 80,
        resizeMode: 'contain',
    },
    itemText: {
        flex: 1,
        lineHeight: 30,
        paddingLeft: 5,
        textAlign: 'left',
        fontSize: 15,
        fontWeight: '400'
    }
});
function mapStateToProps(state, props) {
    return {
        drawerNavigationReducer: state.drawerNavigationReducer,
        navigationReducer: state.navigationReducer,
    }
};
function mapToDispatch(dispatch) {
    return {
        drawerNavigationAction: bindActionCreators(drawerNavigationAction, dispatch),
        navigationAction: bindActionCreators(navigationAction, dispatch),
    }
}

export default connect(mapStateToProps, mapToDispatch)(DrawerMenuItem);