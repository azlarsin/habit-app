/**
 * @file List
 * @author chencheng20
 * @date 13/11/2017
 */


import React, { Component } from 'react';

import Calendar  from "@/components/Calendar";
import { getToday } from "@/utils/Utils";

class List extends Component {
    constructor(props) {
        super(props);

        this.state = {
            habits: [],
            loading: true
        };

        this.handleAddHabit = this.handleAddHabit.bind(this);

        this.saveState = this.saveState.bind(this);
		this.__saveData = this.__saveData.bind(this);
    }

    componentWillMount() {
        // todo: fetch habits

        let { habitAppData } = localStorage;

		this.setState({
			habits: habitAppData ? JSON.parse(habitAppData) : [],
			loading: false
        })
    }

    saveState(state) {
        this.setState(state, this.__saveData)
    }

	__saveData() {
        let state = this.state;

        let { habits } = state;

        localStorage.habitAppData = JSON.stringify(habits);
    }

    handleAddHabit() {
        let newHabit = {
            id: "habit-" + Date.now(),
            name: '',
            createDate: getToday()
        };

        let habits = this.state.habits;
        habits.push(newHabit);

        this.saveState({
            habits: habits
        });
    }

    toggleHabitBox(e) {
        if(e.target.classList.contains("habit-info")) {
            let box = e.target.nextSibling;

            box.classList.toggle("open");
        }
    }

    render() {
        if(this.state.loading) {
            return (
                <div>
                    Loading...
                </div>
            )
        }

        return (
            <div className="list">
                <div className="control">
                    <div
                        className="add-habit"
                        onClick={ this.handleAddHabit }
                    >
                        + Add habit
                    </div>
                </div>


                <div
                    className="habits"
                    onClick={ this.toggleHabitBox }
                >
                    {
                        this.state.habits.map(habit =>
                            <div key={ 'habit-list-' + habit.id }>
                                <div className="habit-info">
                                    {
                                        habit.id + '  ' + habit.createDate
                                    }
                                </div>

                                <div className={ "habit-box" }>
                                    <Calendar selectedDates={ [] }  />
                                </div>

                            </div>
                        )
                    }
                </div>
            </div>
        )
    }
}


export default List;