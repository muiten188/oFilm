import React, { Component } from 'react'
import { Container, Spinner, Text } from 'native-base'
import default_themes from '../../themes/themesbase/default';
import styles from './styles'
export default class extends Component {

    render() {
        const { message = 'Application Loading...' } = this.props
        return (
            <Container style={styles.container}>
                <Text>{message}</Text>
                <Spinner color={default_themes.tabBarActiveTextColor} />
            </Container>
        )
    }
}