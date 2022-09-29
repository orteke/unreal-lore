import '../index.css';
import React from 'react';
import { Grid } from 'semantic-ui-react'
import DialogCard from '../components/dialogCard';
import Char from '../components/char';
import lore from '../peder.json';


export default class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ...lore, lines: [] };
    }

    componentDidMount() {
        console.log('componentDidMount() lifecycle', this.state);
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

    exportJSON() {
        const json = JSON.stringify(this.state, null, 2);
        const blob = new Blob([json], { type: "application/json" });
        const href = URL.createObjectURL(blob);

        // create "a" HTLM element with href to file
        const link = document.createElement("a");
        link.href = href;
        link.download = this.state.character.name + ".json";
        document.body.appendChild(link);
        link.click();

        // clean up "a" element & remove ObjectURL
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
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
        return <div>
            <Grid>
                <Grid.Column width={2}>
                    <Char
                        char={this.state.character}
                        exportJSON={this.exportJSON.bind(this)}
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
        </div>
    }
}