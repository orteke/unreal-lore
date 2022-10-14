import '../index.css'
import * as cardUtils from '../utils/card.js'
import * as optionUtils from '../utils/option.js'
import * as lineUtils from '../utils/line.js'
import * as loreUtils from '../utils/lore.js'
import React from 'react'
import { Grid } from 'semantic-ui-react'
import { nanoid } from 'nanoid'
import DialogCard from '../components/dialogCard'
import Char from '../components/char'

export default class Board extends React.Component {
  constructor(props) {
    super(props)

    this.state = { ...loreUtils.getLore(), lines: {}, selected: '', isConnectable: false }
  }

  componentDidMount() {
    console.log('componentDidMount() lifecycle', this.state)
  }

  onChange(action, data) {
    console.log('action', action)

    let character = this.state.character
    let cards = this.state.cards
    let lines = this.state.lines
    let selected = this.state.selected

    switch (action) {
      case 'input':
        switch (data.type) {
          case 'character':
            loreUtils.removeLore(character.name);
            character = data.character

            break
          case 'card':
            cards[cardUtils.cardIndexFromId(data.id)].hint = data.hint;

            break
          case 'option':
            cards[cardUtils.cardIndexFromId(data.id)].ops[optionUtils.optionIndexFromId(data.id)].text = data.text;

            break
          default:
            break
        }

        break
      case 'drag':
        lines = lineUtils.updatePositions(lines, cards, data.id);
        cards[cardUtils.cardIndexFromId(data.id)].position = data.position;

        break
      case 'add':
        switch (data.type) {
          case 'card':
            cards = cardUtils.addedEmptyCardArray(cards);

            break
          case 'option':
            cards[cardUtils.cardIndexFromId(data.id)].ops = optionUtils.addedEmptyOptionArray(
              cards[cardUtils.cardIndexFromId(data.id)].ops, data.id);

            break
          case 'line':
            cards[cardUtils.cardIndexFromId(data.id)].ops[optionUtils.optionIndexFromId(data.id)].next = data.next;

            break
          default:
            break
        }

        break
      case 'remove':
        switch (data.type) {
          case 'card':
            lines = lineUtils.removedLinesArray(lines);
            cards = cardUtils.removedCardByIdArray(cards, data.id);

            break
          case 'option':
            lines = lineUtils.removedLineByOptionIdArray(lines, data.id);
            cards[cardUtils.cardIndexFromId(data.id)].ops = optionUtils.removedOptionByIdArray(
              cards[cardUtils.cardIndexFromId(data.id)].ops, data.id);

            break
          default:
            break
        }

        break
      case 'select':
        switch (data.type) {
          case 'card':
            if (this.state.selected !== '') {
              lines = lineUtils.removedGivenLineByIdArray(lines, selected);

              let cardId = cardUtils.cardIndexFromId(selected);
              let opId = optionUtils.optionIndexFromId(selected);

              cards[cardId].ops[opId].next = data.id;
              cards[cardId].ops[opId].token = nanoid();
              selected = '';
            }

            break
          case 'option':
            selected = data.id;

            break
          default:
            break
        }

        break
      case 'unselect':
        selected = '';

        break
      case 'cut':
        cards[cardUtils.cardIndexFromId(data.id)].ops[optionUtils.optionIndexFromId(data.id)].next = '0';
        cards[cardUtils.cardIndexFromId(data.id)].ops[optionUtils.optionIndexFromId(data.id)].token = nanoid();
        lines = lineUtils.removedGivenLineByIdArray(lines, data.id);

        break
      default:
        break
    }

    loreUtils.updateLore(cards, character);
    this.setState({ ...this.state, lines: lines, cards: cards, selected: selected });
  }

  handleExportJSON() {
    loreUtils.exportJSON(this.state, this.state.character.name);
  }

  handleExportUEDataTable() {
    loreUtils.exportUEDatatable(this.state, this.state.character.name);
  }

  addLine(opId, line) {
    let lines = this.state.lines;
    lines[opId] = line;
    this.setState({ ...this.state, lines: lines });
  }

  removeLine(opId) {
    this.setState({ ...this.state, lines: lineUtils.removedGivenLineByIdArray(this.state.lines, opId) });
  }

  render() {
    return (
      <div>
        <Grid>
          <Grid.Column width={2}>
            <Char
              char={this.state.character}
              handleExportJSON={this.handleExportJSON.bind(this)}
              handleExportUEDataTable={this.handleExportUEDataTable.bind(this)}
              onChange={this.onChange.bind(this)}
            />
          </Grid.Column>
          <Grid.Column width={14}>
            {this.state.cards.map(card =>
              <DialogCard
                key={card.token}
                id={card.id}
                card={card}
                onChange={this.onChange.bind(this)}
                addLine={this.addLine.bind(this)}
                removeLine={this.removeLine.bind(this)}
                position={card.position}
                isConnectable={this.state.selected !== ''}
              />
            )}
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}
