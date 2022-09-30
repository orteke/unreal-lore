import '../index.css';
import React from 'react';
import { Card, Input, Popup, Button, Icon } from 'semantic-ui-react'
import Draggable from 'react-draggable'; // The default
import Option from './option';


export default class DialogCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hint: props.card.hint,
            isEditable: false,
            isDisabledDraggable: false,
            dragging: false,
            x: props.card.position.x,
            y: props.card.position.y,
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

    duringDrag(e, data) {
        console.log("update");
        this.setState({ ...this.state, dragging: true });
        this.props.onChange("drag", {
            "id": this.props.id, "position": { x: data.lastX, y: data.lastY },
        })
    }

    endDrag(e, data) {
        console.log("update", data);
        this.setState({ ...this.state, dragging: false });
        this.props.onChange("drag", {
            "id": this.props.id, "position": { x: data.lastX, y: data.lastY },
        })
    }

    handleChange(event) {
        this.setState({ ...this.state, hint: event.target.value });
        this.props.onChange("input", {
            "type": "card", "id": this.props.id, "hint": event.target.value,
        })
    }

    render() {
        return <Draggable
            disabled={this.state.isDisabledDraggable}
            onStart={this.startingDrag}
            onDrag={this.duringDrag}
            onStop={this.endDrag}
            positionOffset={{ x: this.props.position.x, y: this.props.position.y }}
        >
            <Card id={this.props.id}>
                <Card.Content>
                    <br></br>
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
                <Card.Content>
                    {this.state.isEditable ? (
                        <Input focus value={this.state.hint} onChange={this.handleChange} />
                    ) : (
                        <Popup content={'Double click for edit'} trigger={<p onDoubleClick={this.toggleInput}>{this.state.hint}</p>} />
                    )}
                </Card.Content>
                {this.props.card.ops.map((op, i) =>
                    <Option
                        key={i}
                        id={op.id}
                        dialogId={this.props.id}
                        option={op}
                        dragging={this.state.dragging}
                        onChange={this.props.onChange.bind(this)}
                        addLine={this.props.addLine.bind(this)}
                        removeLine={this.props.removeLine.bind(this)}
                    >
                    </Option>)}
            </Card>
        </Draggable >
    }
}