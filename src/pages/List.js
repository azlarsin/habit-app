/**
 * @file List
 * @author chencheng20
 * @date 13/11/2017
 */

import React, { Component } from 'react';
import { Row, Col } from 'antd';

import Calendar  from "@/components/Calendar";

class List extends Component {
    constructor(props) {
        super(props);

        this.state = {
            habits: this.props.habits
        };
    }

    toggleHabitBox(e) {
        if(e.target.classList.contains("habit-info")) {
            let box = e.target.nextSibling;

            box.classList.toggle("open");
        }
    }

    render() {
        if(!this.props.habits) {
            return (
                <div>
                    Loading...
                </div>
            )
        }

        return (
            <div className="list">
                <Row
                    className="habits"
                    onClick={ this.toggleHabitBox }
                >
                    {
                        this.state.habits.map(habit =>
                            <Col key={ 'habit-list-' + habit.id }>
                                <div className="habit-info">
                                    {
                                        habit.id + '  ' + habit.createDate
                                    }
                                </div>

                                <div className={ "habit-box" }>
                                    <Calendar selectedDates={ [] } />
                                </div>

                            </Col>
                        )
                    }
                </Row>
            </div>
        )
    }
}


export default List;