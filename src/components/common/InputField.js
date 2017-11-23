/**
 * @file InputField
 * @author chencheng20
 * @date 23/11/2017
 */

import React from 'react';

class InputField extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            focused: false
        };
    }

    render() {
        let { value, onChange, holder, placeHolder } = this.props;
        holder = holder || placeHolder || "";

        return (
            <div className='input-field'>
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
            </div>
        )
    }
}

export default InputField;