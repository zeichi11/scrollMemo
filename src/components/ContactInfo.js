import React from 'react';

class ContactInfo extends React.Component {
    render() {
        return (
            // props는 객체 형태로 받아와서 사용 가능
            <div onClick={this.props.onClick}>{this.props.contact.name}</div>
        );
    }
}

export default ContactInfo;