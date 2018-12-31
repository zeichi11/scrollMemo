import React from 'react';
import ContactInfo from './ContactInfo';
import ContactDetails from './ContactDetails';

class Contact extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            selectedKey: -1,
            keyword: '',
            contactData: [
                {name: 'Abet', phone: '010-0000-0001'},
                {name: 'Betty', phone: '010-0000-0002'},
                {name: 'Charlie', phone: '010-0000-0003'},
                {name: 'David', phone: '010-0000-0004'}
            ]
        };

        this.handleSearchValueChange = this.handleSearchValueChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleSearchValueChange(e) {
        this.setState({
            keyword: e.target.value
        });
    }

    handleClick(key) {
        this.setState({
            selectedKey: key
        });
    }

    render() {
        const mapToComponent = (data) => {
            // data 정렬
            data.sort();
            data = data.filter(
                (contact) => {
                    return contact.name.indexOf(this.state.keyword) > -1;
                }
            );
            // data 정보를 map 함수로 처리한 결과를 반환한다.
            return data.map((contact, i) => {
                // map의 callback 함수의 parameter는
                // currentValue : 현재 처리되고 있는 요소 (contact)
                // Index : 현재 처리되고 있는 요소의 index 값 (i)
                // Array : 메소드가 불려진 배열
                // ContactInfo 컴포넌트의 props에 contact와 key를 설정함
                return (<ContactInfo
                    contact={contact}
                    key={i}
                    onClick={() => this.handleClick(i)}/>
                );
            })
        };

        return (
            <div>
                <h1>Contacts</h1>
                <input
                    name="keyword"
                    placeholder="search"
                    value={this.state.keyword}
                    onChange={this.handleSearchValueChange}
                />

                <div>{mapToComponent(this.state.contactData)}</div>
                <ContactDetails
                    isSelected={this.state.selectedKey != -1}
                    contact={this.state.contactData[this.state.selectedKey]}
                />
            </div>
        )
    }
}

export default Contact;