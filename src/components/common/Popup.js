/**
 * @file Popup
 * @author chencheng20
 * @date 24/11/2017
 */

import React from 'react';
import Proptypes from 'prop-types';
import { createPortal, findDOMNode, render }  from 'react-dom';

class Popup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            style: {
                position: 'absolute',
                top: 0,
                left: 0
            }
        };
    }

    componentDidMount() {
        let dom = this.props.getRootDOMNode();
        let rect = dom.getBoundingClientRect();

        console.log(rect);

        this.setState({
            style: {
                ...this.state.style,
                top: rect.top + rect.height,
                left: rect.left
            }
        });
    }

    render() {
        let { children, mountDom, visible, className } = this.props;
        mountDom = mountDom || document.body;

        if(!visible) {
            return null;
        }

        return createPortal(<div className={ "popup " + className } style={ this.state.style }>{ children }</div>, mountDom)
    }
}

Popup.propTypes = {
    getRootDOMNode: Proptypes.func,
    children: Proptypes.any,
    visible: Proptypes.bool
};

export default Popup;