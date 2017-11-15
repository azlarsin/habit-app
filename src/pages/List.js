/**
 * @file List
 * @author chencheng20
 * @date 13/11/2017
 */


import React, { Component} from 'react';

import { getToday } from "@/utils/Utils";

class List extends Component {
    constructor(props) {
        super(props);

        this.state = {
            habits: []
        };

        this.handleAddHabit = this.handleAddHabit.bind(this);
    }

    componentWillMount() {
        // todo: fetch habits

    }

    handleAddHabit() {
        let newHabit = {
            id: "habit-" + Date.now(),
            name: '',
            createDate: getToday()
        };

        let habits = this.state.habits;
        habits.push(newHabit);

        this.setState({
            habits: habits
        });
    }

    render() {
        console.log(this.state.habits);

        return (
            <div>
                <div className="control">
                    <div
                        className="add-habit"
                        onClick={ this.handleAddHabit }
                    >
                        +
                    </div>
                </div>


                <div className="habits">
                    {
                        this.state.habits.map(habit =>
                            <div key={ 'habit-list-' + habit.id }>
                                {
                                    habit.id + '  ' + habit.createDate
                                }
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }
}


export default List;