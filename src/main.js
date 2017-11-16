/**
 * @file main
 * @author chencheng20
 * @date 13/11/2017
 */

import React from 'react';
import ReactDom from 'react-dom';

import List from "@/pages/List";
import Calendar from "@/components/Calendar";

const App = () => {
    return (
        <div className="root">

            <List />
        </div>
    )
};


require("@/styles/main.scss");

ReactDom.render(<App/>, document.getElementById("qwe"));