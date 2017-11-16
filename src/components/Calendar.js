/**
 * @file Calendar
 * @author chencheng20
 * @date 13/11/2017
 */


import React, { Component} from 'react';

import { WEEK, getDatesByMonth } from "@/utils/Utils";

class Calendar extends Component {
    constructor(props) {
        super(props);

        let year = props.year || new Date().getFullYear(),
            month = props.month || (new Date().getMonth() + 1);

        this.state = {
            dates: getDatesByMonth(year, month),
            year: year,
            month: month
        };

        this.handleDateClick = this.handleDateClick.bind(this);
        this.handleDateControlClick = this.handleDateControlClick.bind(this);
    }

    handleDateClick(e) {
        let dom = e.target;

        if(dom.classList.contains("date")) {
            let date = dom.getAttribute("data-date");

            console.log(this.state.year + '-' + this.state.month + '-' + date);
        }
    }

    handleDateControlClick(type = 'next') {
        let year = this.state.year;
        let month = this.state.month;

        if (type === 'next') {
            if(month === 12) {
                year++;
                month = 1;
            }else {
                month++;
            }
        }

        if (type === 'prev') {
            if(month === 1) {
                year--;
                month = 12;
            }else {
                month--;
            }
        }

        this.setState({
            dates: getDatesByMonth(year, month),
            year: year,
            month: month
        });
    }

	handleTransitionEnd(e) {
    	e.stopPropagation();
    	e.preventDefault();
    }

    render() {
        let width = this.props.width || 500;

        return (
            <div className="calendar" style={{ width }} onTransitionEnd={ this.handleTransitionEnd }>
                <section className="year">
                    <div
                        className="control prev"
                        onClick={ this.handleDateControlClick.bind(this, "prev") }
                    >
                        { "<" }
                    </div>

                    <div>
                        { this.state.year + '-' + this.state.month }
                    </div>

                    <div
                        className="control next"
                        onClick={ this.handleDateControlClick.bind(this, "next") }
                    >
                        { ">" }
                    </div>
                </section>

                <section className="week">
                    {
                        WEEK.map((day, index) =>
                            <div className={ "day" } key={ "calendar-day" + index }>
                                { day }
                            </div>
                        )
                    }
                </section>

                <section onClick={ this.handleDateClick }>
                    {
                        this.state.dates.map(detail =>
                            <div
                                key={ "calendar-date-" + detail.fullDate }
                                className={ "date" + (detail.current ? "" : " other")}
                                data-date={ detail.date }
                            >
                                { detail.date }
                            </div>
                        )
                    }
                </section>
            </div>
        )
    }
}


export default Calendar;