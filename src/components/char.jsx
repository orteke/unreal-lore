import '../index.css';
import domuz from '../images/domuz.jpg';
import React from 'react';
import {
    Image, Card, Button, Icon, Sticky, Input, Popup
} from 'semantic-ui-react'


export default class Char extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: props.char.name,
            imageUrl: props.char.imageUrl,
            role: props.char.role,
            description: props.char.description,
            isEditable: false,
        }

        this.toggleInput = this.toggleInput.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleRoleChange = this.handleRoleChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside, true);
    }

    handleClickOutside = event => {
        if (!String(event.target).includes("Input")) {
            this.setState({ ...this.state, isEditable: false });
        }
    }

    toggleInput() {
        this.setState({ ...this.state, isEditable: true });
    }

    handleNameChange(event) {
        this.setState({ ...this.state, name: event.target.value });
    }

    handleRoleChange(event) {
        this.setState({ ...this.state, role: event.target.value });
    }

    handleDescriptionChange(event) {
        this.setState({ ...this.state, description: event.target.value });
    }

    render() {
        return <Sticky>
            <Card>
                <Image src={domuz} wrapped ui={false} />
                <Card.Content>
                    <Card.Header>
                        {this.state.isEditable ? (
                            <Input focus value={this.state.name} onChange={this.handleNameChange} />
                        ) : (
                            <Popup content='Double click for edit' trigger={
                                <p onDoubleClick={this.toggleInput}>
                                    {this.state.name}
                                </p>
                            } />
                        )}
                    </Card.Header>
                    <Card.Meta>
                        <span className='date'>
                            {this.state.isEditable ? (
                                <Input focus value={this.state.role} onChange={this.handleRoleChange} />
                            ) : (
                                <Popup content='Double click for edit' trigger={
                                    <p onDoubleClick={this.toggleInput}>
                                        {this.state.role}
                                    </p>
                                } />
                            )}
                        </span>
                    </Card.Meta>
                    <Card.Description>
                        {this.state.isEditable ? (
                            <Input focus value={this.state.description} onChange={this.handleDescriptionChange} />
                        ) : (
                            <Popup content='Double click for edit' trigger={
                                <p onDoubleClick={this.toggleInput}>
                                    {this.state.description}
                                </p>
                            } />
                        )}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Button icon labelPosition='left' className='feature-button'>
                        <Icon name='plus' />
                        Card
                    </Button>
                    <Button icon labelPosition='left' className='feature-button' onClick={this.props.exportJSON}>
                        <Icon name='download' />
                        JSON
                    </Button>
                    <Button icon labelPosition='left' className='feature-button'>
                        <Icon name='table' />
                        UE-DataTable
                    </Button>
                </Card.Content>
            </Card>
        </Sticky>
    }
}