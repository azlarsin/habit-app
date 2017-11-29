/**
 * @file InputField
 * @author chencheng20
 * @date 23/11/2017
 */

import React from 'react';
import { createPortal, findDOMNode, render }  from 'react-dom';

import Popup from '@/components/common/Popup';
import { is, uuid } from '@/utils/Utils';

class InputField extends React.Component {
    constructor(props) {
        super(props);

        let { options } = this.props;

        this.state = {
            focused: false,
            options: is(options, Array) ? options : [],
            targetLiIndex: 0,
            showSelect: true
        };

        this.options = this.state.options;

        this.handleListClick = this.handleListClick.bind(this);
        this.handleListHover = this.handleListHover.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    handleListClick(e) {
        // e.preventDefault();
        if(e.target.tagName === 'LI') {

            this.handleInputChange(e.target.innerText || '', true);
        }
    }

    handleListHover(e) {
        if(e.target.tagName === 'LI') {
            this.setState({
                targetLiIndex: parseInt(e.target.getAttribute('data-index'))
            });
        }
    }

    handleKeyDown(e) {
        if (this.state.focused && this.props.select) {
            let keyCode = e.keyCode;
            let currentIndex = this.state.targetLiIndex;

            if ((keyCode === 40 || keyCode === 38)) {
                e.preventDefault();

                keyCode === 40 ? currentIndex++ : currentIndex--;

                currentIndex = currentIndex >= this.state.options.length ? 0 : (currentIndex <= -1 ? (this.state.options.length - 1) : currentIndex);

                this.setState({
                    targetLiIndex: currentIndex
                });
            }

            if (keyCode === 13) {
                this.handleInputChange(this.state.options[currentIndex] || '', true);
            }
        }
    }


    handleInputChange(value, clear = false) {
        let { onChange } = this.props;

        // console.log(value);

        let newOptions = this.options.filter(option => {
            return option.indexOf(value) !== -1;
            // return new RegExp(value).test(option);   // '.' may failed
        });

        onChange(value);
        this.setState({
            options: newOptions,
            showSelect: !clear,
            targetLiIndex: clear ? 0 : this.state.targetLiIndex
        });
    }

    render() {
        let { value, holder, placeHolder, select } = this.props;
        holder = holder || placeHolder || "";

        return (
            <div className='input-field' ref='root'>
                <input
                    value={ value }
                    onChange={ e => { this.handleInputChange(e.target.value.trim()) } }
                    onFocus={ () => {
                        this.setState({ focused: true }, () => {
                            this.handleInputChange(value)
                        })
                    } }
                    onBlur={ () => {
                        this.setState({ focused: false })
                    } }
                    onKeyDown={ this.handleKeyDown }
                />
                <div className={ 'holder' + ((this.state.focused || !!value.trim()) ? ' active' : "")}>
                    { holder }
                </div>

                {
                    select ?
                        <Popup
                            getRootDOMNode={ () => findDOMNode(this) }
                            className={ 'select-list'}
                            visible={ this.state.focused && this.state.showSelect }
                        >
                            <ul
                                onMouseDown={ this.handleListClick }
                                onMouseOver={ this.handleListHover }
                            >
                            {
                                this.state.options.map((option, index) =>
                                    <li
                                        key={ 'input-field-selector-option-' + uuid() }
                                        className={ value === option ? 'selected' : (this.state.targetLiIndex === index ? ' hovered' : "") }
                                        data-index={ index }
                                    >
                                        { option }
                                    </li>
                                )
                            }
                            </ul>
                        </Popup>
                        :
                        null
                }
            </div>
        )
    }
}

export default InputField;