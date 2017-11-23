/**
 * @file main
 * @author chencheng20
 * @date 13/11/2017
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader'

import App from "@/App";

require("@/styles/main.scss");

const render = Component => {

    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        document.getElementById('qwe'),
    )
};

render(App);

// Webpack Hot Module Replacement API
if (module.hot) {
    module.hot.accept()
}