/**
 * @file Note
 * @author chencheng20
 * @date 15/11/2017
 */

import React from 'react';

class Note extends React.Component {
    constructor(props) {
        super(props);

        this.handleBlue = this.handleBlue.bind(this);
    }

    handleBlue(e) {
        let note = e.target.value.trim();

        let { id, saveNote } = this.props;

        saveNote(id, note);
    }

    render() {
        let { msg } = this.props;

        return (
            <div className="note">
                <section>
                    { msg }
                </section>

                <section>
                    <input placeholder="输入笔记" onBlur={ this.handleBlue } />
                </section>
            </div>
        )
    }
}

export default Note;
