/**
 * @file App
 * @author chencheng20
 * @date 22/11/2017
 */

import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import { message as MSG } from 'antd';

import List from "@/pages/List";
import Header from "@/components/Header";
import CreateHabit from "@/components/CreateHabit";
import { getToday, uuid } from "@/utils/Utils";

const config = require("@/const/config.json");

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            habits: [],
            loading: true,
            creating: false
        };

        this.addHabit = this.addHabit.bind(this);
        this.saveState = this.saveState.bind(this);
        this.__saveData = this.__saveData.bind(this);
        this.getEvent = this.getEvent.bind(this);
    }

    componentWillMount() {
        // todo: fetch habits from db
        let { habitAppData } = localStorage;
        let habits = habitAppData ? JSON.parse(habitAppData) :[];

        this.setState({
            habits: habits,
            loading: false,
            creating: habits.length === 0
        });
    }

    getChildContext() {
        return {
            config,
            getEvent: this.getEvent
        };
    }

    saveState(state, cb) {
        this.setState(state, this.__saveData.bind(this, cb));
    }

    __saveData(cb) {
        let state = this.state;

        let { habits } = state;
        console.log(habits);

        localStorage.habitAppData = JSON.stringify(habits);

        if (cb && typeof cb === 'function') {
            cb();
        }
    }

    getEvent(eventName) {
        const events = {
            addHabit: this.addHabit
        };

        return events[eventName];
    }

    addHabit(habit = null) {
        if (habit) {
            let newHabit = {
                id: "habit-" + uuid(),
                name: '',
                createDate: getToday(),
                dates: [],
                ...habit
            };

            let habits = this.state.habits;
            habits.push(newHabit);

            this.saveState({
                habits: habits,
                creating: false
            }, () => {
                MSG.success('创建成功!', 3);
            });
        }

        this.setState({
            creating: !habit
        });
    }

    render() {
        return (
            <div className="root">
                <Header />

                <div className="wrapper">
                    {
                        this.state.habits.length > 0 ?
                            <List habits={ this.state.habits } />
                            :
                            null
                    }

                    {
                        this.state.creating ? 
                            <CreateHabit close={ () => {
                                this.setState({creating: !this.state.creating})
                            } }/>
                            :
                            null
                    }
                </div>
            </div>
        )
    }
}

App.childContextTypes = {
    config: PropTypes.object,
    getEvent: PropTypes.func
};

export default App;