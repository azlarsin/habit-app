/**
 * @file HabitInfo
 * @author chencheng20
 * @date 16/11/2017
 */

import React from 'react';
import Week from '@/components/Week';

class HabitInfo extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let habit = this.props.habit;

		return (
			<div className="habit-info">
				<div className="left">
					<div className="name">
						{ habit.name }
					</div>

					<div className="total">
						{ habit.createTime }
					</div>
				</div>

				<div className="right operate">

				</div>

				<div className="done-tabs">

				</div>
			</div>
		)
	}
}

export default HabitInfo;