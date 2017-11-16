/**
 * @file HabitInfo
 * @author chencheng20
 * @date 16/11/2017
 */

import React from 'react';



class HabitInfo extends React.Component {
	constructor(props) {
		super(props);

	}

	render() {
		let habit = this.props.habit;

		return (
			<div className="habit-info">

				<div className="info">
					<div className="">
						{ habit.name }
					</div>
				</div>
				<div className="done-tabs">

				</div>
			</div>
		)
	}
}

export default