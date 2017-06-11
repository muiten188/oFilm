import React, { Component } from 'react';
import { Provider } from 'react-redux';
import storeConfig from './store/store_config';
import App from './containers/App';

import AppLoading from './containers/AppLoading'

export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            store: null
        }
    }

    componentDidMount() {
        storeConfig(store => this.setState({ store }))
    }

    render() {
        const { store } = this.state
        if (!store) {
            return (<AppLoading message="Initializing..." />)
        }
        return (
            <Provider store={this.state.store}>
                <App />
            </Provider>
        );
    }
}
