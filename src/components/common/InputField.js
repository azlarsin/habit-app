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

        this.state = {
            focused: false
        };
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        let { value, onChange, holder, placeHolder, select, options } = this.props;
        holder = holder || placeHolder || "";
        options = is(options, Array) ? options : [];

        return (
            <div className='input-field' ref="root">
                <input
                    value={ value }
                    onChange={ onChange }
                    onFocus={ () => {
                        this.setState({ focused: true })
                    } }
                    onBlur={ () => {
                        this.setState({ focused: false })
                    } }
                />
                <div className={ 'holder' + ((this.state.focused || !!value.trim()) ? ' active' : "")}>
                    { holder }
                </div>

                {
                    select ?
                        <Popup
                            getRootDOMNode={ () => findDOMNode(this) }
                            className={ "select-list"}
                            visible={ !!this.state.focused }
                        >
                            {
                                options && options.map(option =>
                                    <div
                                        key={ 'input-field-selector-option-' + uuid() }
                                        className={ value === option ? "selected" : "" }
                                    >
                                        { option }
                                    </div>
                                )
                            }
                        </Popup>
                        :
                        null
                }
            </div>
        )
    }
}

export default InputField;