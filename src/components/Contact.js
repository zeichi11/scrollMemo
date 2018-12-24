import React from 'react';

class Contacts extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            contactData: [
                {name: 'Abet', phone: '010-0000-0001'},
                {name: 'Betty', phone: '010-0000-0002'},
                {name: 'Charlie', phone: '010-0000-0003'},
                {name: 'David', phone: '010-0000-0004'}
            ]
        };
    }

    render() {
        const mapToComponent = (data) => {
            return data.map((contact, i) => {
                // map의 callback 함수의 parameter는
                // currentValue : 현재 처리되고 있는 요소 (contact)
                // Index : 현재 처리되고 있는 요소의 index 값 (i)
                // Array : 메소드가 불려진 배열
                // ContactInfo 컴포넌트의 props에 contact와 key를 설정함
                return (<ContactInfo contact={contact} key={i}/>);
            })
        };

        return (
            <div>
                {mapToComponent(this.state.contactData)}
            </div>
        )
    }
}