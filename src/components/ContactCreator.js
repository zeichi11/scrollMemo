import React from 'react';

class ContactCreator extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            name: '',
            phone: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    /**
     * input의 value 변경 시 state 값을 업데이트.
     * @param {object} e
     */
    handleChange(e) {
        let newState = {};
        // 이벤트 target의 name 속성을 프로퍼티로 갖는 값을 추가한다.
        newState[e.target.name] = e.target.value;
        this.setState(newState);
    }

    /**
     * create 버튼 클릭 시 state 정보를 onCreate 함수를 통해 추가.
     */
    handleClick() {
        const contact = {
            name: this.state.name,
            phone: this.state.phone
        };

        // 생성한 contact 객체를 onCreate 함수인자로 전달
        this.props.onCreate(contact);

        // state 초기화
        this.setState({
            name: '',
            phone: ''
        });

        this.nameInput.focus();
    }

    /**
     * key 입력에 대한 이벤트를 처리함
     * @param e
     */
    handleKeyPress(e) {
        if (e.charCode === 13) {
            this.handleClick();
        }
    }

    render() {
        return (
            <div>
                <h2>Create Contact</h2>
                <p>
                    <input
                        type="text"
                        name="name"
                        placeholder="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                        ref={(ref) => {this.nameInput = ref}}
                    />
                    <input
                        type="text"
                        name="phone"
                        placeholder="phone"
                        value={this.state.phone}
                        onChange={this.handleChange}
                        onKeyPress={this.handleKeyPress}
                    />
                </p>
                <button onClick={this.handleClick}>Create</button>
            </div>
        )
    }
}

ContactCreator.defaultProps = {
    onCreate: () => {console.error("onCreate not defined");}
};

export default ContactCreator;