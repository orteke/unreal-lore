import '../index.css';
import React from 'react';
import { Grid } from 'semantic-ui-react'
import DialogCard from '../components/dialogCard';
import Char from '../components/char';


export default class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lines: [], cards: [], char: {
                name: "Domuz Usta",
                role: "Ana karakter",
                description: "çok sinirilidir"
            },
        };
    }

    componentDidMount() {
        console.log('componentDidMount() lifecycle', this.state);
        this.setState({
            char: {
                name: "Domuz Usta",
                role: "Ana karakter",
                description: "çok sinirilidir"
            },
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
                <Char
                    char={this.state.char}
                />
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