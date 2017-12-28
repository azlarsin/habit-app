/**
 * @file Popup
 * @author chencheng20
 * @date 24/11/2017
 */

import React from 'react';
import Proptypes from 'prop-types';
import { createPortal, findDOMNode, render }  from 'react-dom';
import { Transition } from 'react-transition-group';


const defaultStyle = {
    transition: `all 200ms`,
    transformOrigin: '0 0 0',
    opacity: 0,
    // height: 0,
    visibility: 'hidden',
    overflow: 'hidden'
};

const transitionStyles = {
    entering: { opacity: 0, transform: 'scaleY(.8)', visibility: 'hidden', overflow: 'hidden'},
    entered: { opacity: 1, transform: 'none', visibility: 'visible', overflow: 'auto'},
    exiting: { opacity: 1, transform: 'scaleY(1)', visibility: 'visible', overflow: 'auto', transitionDelay: '100ms'},
    exited: { opacity: 0, transform: 'scaleY(.8)', visibility: 'hidden', overflow: 'hidden'},
};

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

        this.setState({
            style: {
                ...this.state.style,
                top: rect.top + rect.height,
                left: rect.left,
                width: rect.width,
                maxHeight: 300
            }
        });
    }

    render() {
        let { children, mountDom, visible, className, overlayClick } = this.props;
        mountDom = mountDom || document.body;
        overlayClick = overlayClick || (() => {});

        // if(!visible) {
        //     return null;
        // }

        let style = this.state.style;

        return createPortal(
            <Transition in={visible} timeout={300} >
                {(state) => (
                    <div
                        className={ "popup " + className }
                        style={{
                            ...style,
                            ...defaultStyle,
                            ...transitionStyles[state]
                        }}
                    >
                        <div className={ 'overlay' } onClick={ overlayClick } />
                        { children }
                    </div>
                )}
            </Transition>,
        mountDom);
    }
}

Popup.propTypes = {
    getRootDOMNode: Proptypes.func,
    children: Proptypes.any,
    visible: Proptypes.bool
};

export default Popup;