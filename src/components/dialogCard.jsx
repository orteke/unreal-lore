import domuz from '../images/domuz.jpg';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Grid, Image, Card, Label, Input, Popup, Button, Icon } from 'semantic-ui-react'
import Draggable from 'react-draggable'; // The default
import DrawLeaderLine from "../components/leaderline";
import Option from './option';
import { useState } from "react";


export default class DialogCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: props.card.text,
            isEditable: false,
            isDisabledDraggable: false,
            dragging: false
        }

        this.id = props.id;

        this.toggleInput = this.toggleInput.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.startingDrag = this.startingDrag.bind(this);
        this.duringDrag = this.duringDrag.bind(this);
        this.endDrag = this.endDrag.bind(this);
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside, true);
    }

    handleClickOutside = event => {
        if (!String(event.target).includes("Input")) {
            this.setState({ ...this.state, isEditable: false, isDisabledDraggable: false });
        }
    }

    toggleInput() {
        this.setState({ ...this.state, isEditable: true, isDisabledDraggable: true });
    }

    startingDrag() {
        console.log("update");
        this.setState({ ...this.state, dragging: true });
    }

    duringDrag() {
        console.log("update");
        this.setState({ ...this.state, dragging: true });
    }

    endDrag() {
        console.log("update");
        this.setState({ ...this.state, dragging: false });
    }

    handleChange(event) {
        this.setState({ ...this.state, text: event.target.value });
        this.props.onChange()
    }

    render() {
        return <Draggable
            disabled={this.state.isDisabledDraggable}
            onStart={this.startingDrag}
            onDrag={this.duringDrag}
            onStop={this.endDrag}
        >
            <Card id={this.props.id}>
                <Card.Content>
                    {this.state.isEditable ? (
                        <Input focus value={this.state.text} onChange={this.handleChange} />
                    ) : (
                        <Popup content={'Double click for edit'} trigger={<p onDoubleClick={this.toggleInput}>{this.state.text}</p>} />
                    )}
                </Card.Content>
                {this.props.card.options.map((opt, i) =>
                    <Option key={i} id={opt.id} dialogId={this.props.id} option={opt} dragging={this.state.dragging}>
                    </Option>)}
                <Card.Content extra>
                    <div className='ui two buttons'>
                        <Button icon labelPosition='left'>
                            <Icon name='plus' />
                            Option
                        </Button>
                        <Button icon labelPosition='right'>
                            Remove
                            <Icon name='trash' />
                        </Button>
                    </div>
                </Card.Content>
            </Card>
        </Draggable>
    }
}