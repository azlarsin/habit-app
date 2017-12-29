/**
 * @file Week
 * @author chencheng20
 * @date 16/11/2017
 */

import React from 'react';
import PropTypes from 'prop-types';

import { WEEK, getDatesByWeek, uuid } from "@/utils/Utils";

class Week extends React.Component {
	constructor(props) {
		super(props);

		let d = new Date();
        d.setHours(0,0,0,0); // last midnight

		this.state = {
			dates: getDatesByWeek(),
			today: d
		};

		this.toggleClassTimeout = null;

		this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
	}

    handleMouseEnter(e) {
	    if(!this.props.date) {
			clearTimeout(this.toggleClassTimeout);
            e.currentTarget.classList.add('show-date');
        }
    }

    handleMouseLeave(e) {
        e.persist();
        if(!this.props.date) {
            let target = e.currentTarget;
            this.toggleClassTimeout = setTimeout(() => {
                target.classList.remove('show-date');
            }, 500);
        }
    }

	render() {
	    const showDate = this.props.showDate || false;
		const disableHover = this.props.disableHover;
		const customDates = this.props.customDates || [];

		return (
			<div
                className={ "current-week" + (showDate ? " show-date" : "") }
                onMouseEnter={ disableHover ? () => {} : this.handleMouseEnter }
                onMouseLeave={ disableHover ? () => {} : this.handleMouseLeave }
            >
				{
					WEEK.map((day, index) =>
						<div
							key={ "week-tab-" + uuid() }
							className={
								new Date(this.state.dates[index].fullDate) < this.state.today ?
									"passed"
									:
									(this.state.dates[index].date === this.state.today.getDate() ? "current" : "")
							}
						>
							<div>{ day }</div>
							<div>{ this.state.dates[index].date }</div>
						</div>
					)
				}
			</div>

		)
	}
}

Week.contextTypes = {
    config: PropTypes.object
};

Week.propTypes = {
    showDate: PropTypes.bool
};

export default Week;