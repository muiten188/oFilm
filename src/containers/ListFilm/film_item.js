import React, { Component } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Thumbnail, Text } from 'native-base';
import Variables from '../../common/variables';
import styles from './styles';
export default class extends Component {
    render() {
        let { oData, rowID, onListItemClick } = this.props;
        return (
            <TouchableOpacity style={styles.itemContainer} key={rowID} onPress={(e) => onListItemClick(oData)}>
                <View style={styles.item}>
                    <Thumbnail style={styles.image} borderRadius={Variables.ThumbnailFilm.borderRadius} source={{ uri: oData.PosterUrl }} />
                    <Text style={styles.textRow} ellipsizeMode='tail' numberOfLines={Variables.TitleFilm.numberOfLines}>{oData.Name1}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}