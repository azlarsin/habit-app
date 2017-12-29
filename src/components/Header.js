/**
 * @file Header
 * @author chencheng20
 * @date 16/11/2017
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Affix, Button } from 'antd';

import Week from '@/components/Week';

class Header extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			color: 'blue',
		}
	}

	componentDidMount() {
		// setInterval(() => {
		// 	this.setState({
		// 		color: "#" + (~~(Math.random()*(1<<24))).toString(16)
		// 	}, () => console.log(this.state.color));
		// }, 1000)

	}

	render() {
	    let addHabit = this.context.getEvent("addHabit");

		return (
			<Affix>
				<header className="header">
					<section>
						<h1>Create your habit!</h1>

						<Button
                            onClick={ () => { addHabit() } }
                            type="primary"
                            icon="plus"
                            shape="circle"
                        />
					</section>
					<section>
						<Week />
					</section>
				</header>
			</Affix>
		)
	}
}

Header.contextTypes = {
    config: PropTypes.object,
    getEvent: PropTypes.func
};

export default Header;