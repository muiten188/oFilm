import React, { Component } from 'react';
import { View } from 'react-native';
import { Text } from 'native-base';
export default class extends Component {
    render() {
        return (
            <View style={{ flexDirection: 'column', marginTop: 4, marginBottom: 4 }} key={index}>
                <Text style={Object.assign(styles.fullWidthItem, styles.itemMargin)}>{serverFilm.Server}</Text>
                <ListView
                    contentContainerStyle={styles.listEpisode}
                    initialListSize={serverFilm.ListFilm.length}
                    dataSource={ds.cloneWithRows(serverFilm.ListFilm)}
                    renderSeparator={(a, index) => this.buildRowSeparator(a, index)}
                    renderRow={(episode, sectionID, rowID, highlightRow) => this.buildRowEpisode(episode, rowID)}
                />
            </View>
        )
    }
}