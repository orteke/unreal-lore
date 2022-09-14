import domuz from '../images/domuz.jpg';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Grid, Image, Card, Label, Input, Popup, Button, Icon } from 'semantic-ui-react'
import Draggable from 'react-draggable'; // The default
import DrawLeaderLine from "../components/leaderline";

export default class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lines: []
        };
        this.updateLinePositions = this.updateLinePositions.bind(this);
        this.removeLines = this.removeLines.bind(this);
        this.toggleInput = this.toggleInput.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        console.log('componentDidMount() lifecycle', this.state);
        document.addEventListener('click', this.handleClickOutside, true);
        this.removeLines()
        this.setState({
            disableDraggable: false,
            toggle: true,
            text: "deneme",
            lines: [
                DrawLeaderLine({ startId: "c1o1", endId: "c2" })
            ]
        });
    }

    handleClickOutside = event => {
        if (!String(event.target).includes("Input")) {
            this.setState({ ...this.state, toggle: true, disableDraggable: false });
        }
    }

    updateLinePositions() {
        console.log("asdasd", this.state);
        for (var i = 0; i < this.state.lines.length; i++) {
            this.state.lines[i].position()
        }
    }

    removeLines() {
        console.log("asdasd", this.state);
        for (var i = 0; i < this.state.lines.length; i++) {
            this.state.lines[i].remove()
        }
    }

    toggleInput() {
        this.setState({ ...this.state, toggle: false, disableDraggable: true });
    }

    handleChange(event) {
        this.setState({ ...this.state, text: event.target.value });
    }

    render() {
        return <Grid>
            <Grid.Column width={2}>
                <Card>
                    <Image src={domuz} wrapped ui={false} />
                    <Card.Content>
                        <Card.Header>Domuz Usta</Card.Header>
                        <Card.Meta>
                            <span className='date'>Ana karakter</span>
                        </Card.Meta>
                        <Card.Description>
                            Domuz adam sinirli bir ustadır.
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <Label as='a'>
                            Action
                        </Label>
                        <Label as='a'>
                            Magic
                        </Label>
                        <Label as='a'>
                            Luck
                        </Label>
                    </Card.Content>
                </Card>
            </Grid.Column>
            <Grid.Column width={14}>
                <Draggable
                    disabled={this.state.disableDraggable}
                    onStart={this.updateLinePositions}
                    onDrag={this.updateLinePositions}
                    onStop={this.updateLinePositions}>
                    <Card id='c1'>
                        <Card.Content>
                            <Card.Description>
                                Lorem ipsum doler.
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra id='c1o1'>
                            Opt 1
                        </Card.Content>
                        <Card.Content extra id='c1o2'>
                            Opt 2
                        </Card.Content>
                    </Card>
                </Draggable>
                <Draggable
                    disabled={this.state.disableDraggable}
                    onStart={this.updateLinePositions}
                    onDrag={this.updateLinePositions}
                    onStop={this.updateLinePositions}>
                    <Card id='c2'>
                        <Card.Content>
                            <Card.Description>
                                {this.state.toggle ? (
                                    <Popup content='Double click for edit' trigger={<p onDoubleClick={this.toggleInput}>{this.state.text}</p>} />
                                ) : (
                                    <Input focus value={this.state.text} onChange={this.handleChange} />
                                )}
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra id='c2o1'>
                            Opt 1
                        </Card.Content>
                        <Card.Content extra id='c2o2'>
                            Opt 2
                        </Card.Content>
                        <Card.Content extra>
                            <div className='ui two buttons'>
                                <Button icon labelPosition='left'>
                                    <Icon name='plus' />
                                    Answer
                                </Button>
                                <Button icon labelPosition='right'>
                                    Remove
                                    <Icon name='trash' />
                                </Button>
                            </div>
                        </Card.Content>
                    </Card>
                </Draggable>

            </Grid.Column>
        </Grid>
    }
}