import domuz from '../images/domuz.jpg';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Grid, Image, Card, Label, Input, Popup, Button, Icon } from 'semantic-ui-react'
import Draggable from 'react-draggable'; // The default
import DrawLeaderLine from "../components/leaderline";

export default class Option extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: props.option.text,
            isEditable: false,
            lines: []
        }

        this.id = props.id;

        this.toggleInput = this.toggleInput.bind(this);
        this.handleChange = this.handleChange.bind(this);

        console.log(props.dragging);
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside, true);
        this.props.addLine(DrawLeaderLine({ startId: this.props.id, endId: "c2" }))
    }

    componentDidUpdate(prevProps, prevState) {
    }

    handleClickOutside = event => {
        if (!String(event.target).includes("Input")) {
            this.setState({ ...this.state, isEditable: false });
        }
    }

    toggleInput() {
        this.setState({ ...this.state, isEditable: true });
    }

    handleChange(event) {
        this.setState({ ...this.state, text: event.target.value });
    }

    render() {
        return <Card.Content extra id={this.props.id}>
            {this.state.isEditable ? (
                <Input focus value={this.state.text} onChange={this.handleChange} />
            ) : (
                <Popup content='Double click for edit' trigger={<p onDoubleClick={this.toggleInput}>{this.state.text}</p>} />
            )}
        </Card.Content>
    }
}