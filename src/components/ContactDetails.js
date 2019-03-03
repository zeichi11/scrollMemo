import React from 'react';

class ContactDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEdit: false,
            name: '',
            phone: ''
        };

        this.handleToggle = this.handleToggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleKeyPress = this.handleKeyPress(this);
    }

    /**
     * Edit 버튼의 toggle값을 설정한다.
     */
    handleToggle() {
        if (!this.state.isEdit) {
            this.setState({
                name: this.props.contact.name,
                phone: this.props.contact.phone
            });
        } else {
            this.handleEdit();
        }

        this.setState({
            isEdit: !this.state.isEdit,
        });

    }

    /**
     * input의 값 변경 시 state를 설정한다.
     * @param e
     */
    handleChange(e) {
        let newState = {};
        // 이벤트 target의 name 속성을 프로퍼티로 갖는 값을 추가한다.
        newState[e.target.name] = e.target.value;
        this.setState(newState);
    }

    /**
     * props의 onEdit 함수를 통해 내용을 업데이트 한다.
     */
    handleEdit() {
        this.props.onEdit(this.state.name, this.state.phone)
    }

    handleKeyPress(e) {
        if (e.charCode === 13) {
            this.handleToggle();
        }
    }

    render() {
        const details = (
            <div>
                <p>{this.props.contact.name}</p>
                <p>{this.props.contact.phone}</p>
            </div>
        );
        const blank = (<div>Not Selected.</div>);
        const editInput = (
            <div>
                <p><input type="text"
                          name="name"
                          placeholder="name"
                          value={this.state.name}
                          onChange={this.handleChange}/>
                </p>
                <p>
                    <input type="text"
                           name="phone"
                           placeholder="phone"
                           value={this.state.phone}
                           onChange={this.handleChange}
                           onKeyPress={this.handleKeyPress}/>
                </p>
            </div>
        );
        const editView = this.state.isEdit ? editInput : details;

        return (
            <div>
                <h2>Details</h2>
                {this.props.isSelected ? editView : blank}
                <p>
                    <button disabled={this.props.isSelected ? false : true}
                            onClick={this.state.isEdit ? this.handleEdit : this.handleToggle}>
                        {this.state.isEdit ? "OK" : "Edit"}
                    </button>
                    <button disabled={this.props.isSelected ? false : true}
                            onClick={this.props.onRemove}>
                        Remove
                    </button>
                </p>
            </div>
        );
    }
}

ContactDetails.defaultProps = {
    contact: {
        name: '',
        phone: ''
    },
    onRemove: () => { console.error("onRemove not defined"); },
    onEdit: () => { console.error("onEdit not defined"); }
};

export default ContactDetails;