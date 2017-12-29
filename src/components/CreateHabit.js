/**
 * @file CreateHabit
 * @author chencheng20
 * @date 22/11/2017
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Steps, Button, Input } from 'antd';

import InputField from '@/components/common/InputField';

const Step = Steps.Step;
const steps = [
    {
        title: '为你的习惯选取一个好名字',
    },
    {
        title: '为它设置一些其他属性',
    },
    {
        title: '说一句鼓励自己的话',
    },
    {
        title: '最后，立一个预计的目标吧',
    }
];

class CreateHabit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            current: 0,
            name: '',
            label: '',
            // reminder: null,
            // repeat: null,
            endDate: null,
            note: ''
        };

        this.saveData = this.saveData.bind(this);
    }
    next() {
        const current = this.state.current + 1;
        this.setState({ current });
    }
    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }

    validate() {
        let fields = [
            'name',
            'label',
            'note',
            'endDate'
        ];

        let val = this.state[fields[this.state.current]];

        return !val;
    }

    setValue(type, value) {
        this.setState({
            [type]: value
        });
    }

    saveData() {
        let addHabit = this.context.getEvent("addHabit");

        addHabit && addHabit({...this.state})
    }

    getContents() {
        return [
            <div>
                <h3>
                    为你的习惯选取一个好名字
                </h3>

                <div>
                    <InputField
                        value={ this.state.name }
                        onChange={ this.setValue.bind(this, "name") }
                        holder={ "请输入 40 字以内" }
                    />
                </div>
            </div>,
            <div>
                <h3>
                    为它设置一些其他属性
                </h3>

                <div>
                    <InputField
                        value={ this.state.label }
                        onChange={ this.setValue.bind(this, "label") }
                        holder={ "选择或输入一个" }
                        options={ ['锻炼', '生活', '人生', 'Something else...', '锻炼1', '生活1', '人生1', 'Something else...1', '锻炼2', '生活2', '人生2', 'Something else...2'] }
                        select
                    />
                </div>
            </div>,
            <div>
                <h3>
                    说一句鼓励自己的话
                </h3>

                <InputField
                    value={ this.state.note }
                    onChange={ this.setValue.bind(this, "note") }
                    holder={ "请输入 40 字以内" }
                />
            </div>,
            <div>
                <h3>
                    最后，立一个预计的目标吧
                </h3>

                <InputField
                    value={ this.state.note }
                    onChange={ this.setValue.bind(this, "note") }
                    holder={ "请输入 40 字以内" }
                />
            </div>
        ];
    }

    render() {
        const { current } = this.state;
        const contents = this.getContents();
        
        return (
            <div className="create-habit">
                <Button className="close" onClick={() => { this.props.close() }}>
                    <svg width="15" height="15" viewBox="0 0 20 20">
                        <path d="M0 0 L20 20 M20 0 L0 20" stroke="rgba(0,0, 255, .3)" fill="none" />
                    </svg>
                </Button>
                <div>
                    <Steps current={current} direction={'vertical'}>
                        {
                            new Array(4).fill(null).map((v, index) => <Step key={ 'create-habit-step-title-' + index } title={ 'Step ' + (index + 1) } />)
                        }
                    </Steps>
                    <div className="steps-content" key={ 'create-habit-step-content-' + current }>{ contents[current] }</div>
                </div>
                <div className="steps-action">
                    {
                        <Button onClick={() => this.prev()} disabled={ this.state.current <= 0 } >
                            Previous
                        </Button>
                    }
                    {
                        this.state.current < steps.length - 1
                        &&
                        <Button type="primary" disabled={ this.validate() } onClick={() => this.next()}>Next</Button>
                    }
                    {
                        this.state.current === steps.length - 1
                        &&
                        <Button type="primary" onClick={this.saveData}>Done</Button>
                    }
                </div>
            </div>
        );
    }
}

CreateHabit.contextTypes = {
    getEvent: PropTypes.func
};

export default CreateHabit;