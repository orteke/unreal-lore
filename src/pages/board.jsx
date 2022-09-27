import domuz from '../images/domuz.jpg';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Grid, Image, Card, Label, Input, Popup, Button, Icon, Sticky } from 'semantic-ui-react'
import Draggable from 'react-draggable'; // The default
import DrawLeaderLine from "../components/leaderline";
import DialogCard from '../components/dialogCard';
import '../index.css';

export default class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lines: [], cards: []
        };
    }

    componentDidMount() {
        console.log('componentDidMount() lifecycle', this.state);
        this.setState({
            cards: [
                {
                    id: "c1",
                    text: "deneme",
                    options: [
                        {
                            id: "c1o1",
                            text: "op"

                        },
                        {
                            id: "c1o2",
                            text: "op2"
                        },
                    ]
                },
                {
                    id: "c2",
                    text: "deneme2",
                    options: [{
                        id: "c2o1",
                        text: "op2"
                    }]
                }
            ],
            lines: []
        });
    }


    onChange(action) {
        console.log("action", action);
        switch (action) {
            case "input":
                // code block
                break;
            case "drag":
                let lines = this.state.lines;
                for (let i = 0; i < lines.length; i++) {
                    lines[i].position();
                }
                this.setState({ ...this.state, lines: lines });
        }
    }

    addLine(line) {
        let lines = this.state.lines;
        lines.push(line);
        this.setState({ ...this.state, lines: lines });
    }

    removeLine(i) {
        let lines = this.state.lines;
        lines.splice(i, 1);
        this.setState({ ...this.state, lines: lines });
    }

    render() {
        return <Grid>
            <Grid.Column width={2}>
                <Sticky>
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
                        <Card.Content extra>
                            <Button icon labelPosition='left' className='feature-button'>
                                <Icon name='plus' />
                                Card
                            </Button>
                            <Button icon labelPosition='left' className='feature-button'>
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
            </Grid.Column>
            <Grid.Column width={14}>
                {this.state.cards.map((card, i) =>
                    <DialogCard
                        key={i}
                        id={card.id}
                        card={card}
                        onChange={this.onChange.bind(this)}
                        addLine={this.addLine.bind(this)}
                        removeLine={this.removeLine.bind(this)}
                    />
                )}
            </Grid.Column>
        </Grid >
    }
}