/**
 * @file CreateHabit
 * @author chencheng20
 * @date 22/11/2017
 */

import React from 'react';
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
            'endDate',
            'note'
        ];

        let val = this.state[fields[this.state.current]];

        return !val;
    }

    setValue(type, e) {
        this.setState({
            [type]: e.target.value.trim()
        });
    }

    getContents() {
        return [
            <div>
                <h3>
                    为你的习惯选取一个好名字
                </h3>

                <InputField
                    value={ this.state.name }
                    onChange={ this.setValue.bind(this, "name") }
                    holder={ "请输入 40 字以内" }
                />
            </div>,
            <div>
                <h3>
                    为它设置一些其他属性
                </h3>
            </div>,
            <div>
                <h3>
                    说一句鼓励自己的话
                </h3>
            </div>,
            <div>
                <h3>
                    最后，立一个预计的目标吧
                </h3>
            </div>
        ];
    }

    render() {
        const { current } = this.state;
        const contents = this.getContents();

        return (
            <div className="create-habit">
                <div>
                    <Steps current={current} direction={'vertical'}>
                        {
                            new Array(4).fill(null).map((v, index) => <Step key={ 'create-habit-step-title-' + index } title={ 'Step ' + (index + 1) } />)
                        }
                    </Steps>
                    <div className="steps-content">{ contents[current] }</div>
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
                        <Button type="primary" onClick={() => alert('Processing complete!')}>Done</Button>
                    }
                </div>
            </div>
        );
    }
}

export default CreateHabit;