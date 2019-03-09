import React from 'react';
import update from 'react-addons-update';
import ContactInfo from './ContactInfo';
import ContactDetails from './ContactDetails';
import ContactCreator from './ContactCreator';

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

        this.handleSearch = this.handleSearch.bind(this);
        this.handleClick = this.handleClick.bind(this);

        this.handleCreate = this.handleCreate.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    /**
     * component 마운트 전 처리
     */
    componentWillMount() {
        const contactData = localStorage.contactData;

        if (contactData) {
            this.setState({
                contactData: JSON.parse(contactData)
            });
        }
    }

    /**
     * component 업데이트 후 처리
     * @param prevProps
     * @param prevState
     */
    componentDidUpdate(prevProps, prevState) {
        if (JSON.stringify(prevState.contactData) != JSON.stringify(this.state.contactData)) {
            localStorage.contactData = JSON.stringify(this.state.contactData);
        }
    }

    /**
     * 검색 처리
     * @param e
     */
    handleSearch(e) {
        this.setState({
            keyword: e.target.value
        });
    }

    /**
     * click 이벤트 처리(contact selection)
     * @param {number} key
     */
    handleClick(key) {
        this.setState({
            selectedKey: key
        });
    }

    /**
     * contact를 contactData에 추가.
     * @param {object} contact
     */
    handleCreate(contact) {
        this.setState({
            contactData: update(this.state.contactData,
                {$push: [contact]}
            )
        });
    }

    /**
     * select된 contact를 삭제하고 selectedKey를 초기화.
     */
    handleRemove() {
        // select된 contact가 없는 경우 return
        if (this.state.selectedKey < 0) {
            return;
        }

        this.setState({
            contactData: update(this.state.contactData,
                { $splice: [[this.state.selectedKey, 1]] }
            ),
            selectedKey: -1
        });
    }

    /**
     * 전달받은 name, phone 정보로 선택된 contact를 수정.
     * @param {string} name
     * @param {string} phone
     */
    handleEdit(name, phone) {
        this.setState({
            contactData: update(this.state.contactData, {
                [this.state.selectedKey]: {
                    name: { $set: name },
                    phone: { $set: phone }
                }
            })
        })
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
                    onChange={this.handleSearch}
                />

                <div>{mapToComponent(this.state.contactData)}</div>

                <ContactDetails
                    isSelected={this.state.selectedKey != -1}
                    contact={this.state.contactData[this.state.selectedKey]}
                    onRemove={this.handleRemove}
                    onEdit={this.handleEdit}
                />

                <ContactCreator
                    onCreate={this.handleCreate}
                />
            </div>
        )
    }
}

export default Contact;