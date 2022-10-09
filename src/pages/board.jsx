import '../index.css'
import React from 'react'
import { Grid } from 'semantic-ui-react'
import { nanoid } from 'nanoid'
import DialogCard from '../components/dialogCard'
import Char from '../components/char'
import loreJSON from '../peder.json'

export default class Board extends React.Component {
  constructor(props) {
    super(props)

    let lore = JSON.parse(localStorage.getItem('lore'));
    if (lore == null) {
      lore = loreJSON;
      localStorage.setItem('lore', JSON.stringify(lore));
    }

    // for (let i = 0; i < lore.cards.length; i++) {
    //   lore.cards[i].token = nanoid()
    //   for (let j = 0; j < lore.cards[i].ops.length; j++) {
    //     lore.cards[i].ops[j].token = nanoid()
    //   }
    // }

    this.state = { ...lore, lines: {}, selected: '' }
  }

  componentDidMount() {
    console.log('componentDidMount() lifecycle', this.state)
  }

  onChange(action, data) {
    console.log('action', action)

    let cards = this.state.cards
    let lines = this.state.lines
    let isDone
    let selected = this.state.selected

    switch (action) {
      case 'input':
        switch (data.type) {
          case 'character':
            this.setState({ ...this.state, character: data.character })

            return
          case 'card':
            for (let i = 0; i < cards.length; i++) {
              if (cards[i].id != data.id) {
                continue
              }

              cards[i].hint = data.hint

              break
            }

            break
          case 'option':
            const cardId = data.id.split('o')[0]
            for (let i = 0; i < cards.length; i++) {
              if (cards[i].id != cardId) {
                continue
              }

              for (let j = 0; j < cards[i].ops.length; j++) {
                if (cards[i].ops[j].id != data.id) {
                  continue
                }

                cards[i].ops[j].text = data.text
                isDone = true

                break
              }

              if (isDone) {
                break
              }
            }

            break
        }

        break
      case 'drag':
        Object.keys(lines).forEach(function (key, index) {
          try {
            lines[key].position();
          }
          catch (err) {
            delete lines[key];
          }
        });

        for (let i = 0; i < cards.length; i++) {
          if (cards[i].id != data.id) {
            continue
          }

          cards[i].position = data.position

          break
        }

        break
      case 'add':
        switch (data.type) {
          case 'card':
            cards.push({
              id: 'c' + (cards.length + 1).toString(),
              token: nanoid(),
              hint: 'input text',
              position: { x: 0, y: 0 },
              ops: []
            })

            break
          case 'option':
            for (let i = 0; i < cards.length; i++) {
              if (cards[i].id != data.id) {
                continue
              }

              cards[i].ops.push({
                id: data.id + 'o' + (cards[i].ops.length + 1).toString(),
                token: nanoid(),
                text: 'input text',
                next: 0
              })

              break
            }
          case 'line':
            const cardId = data.id.split('o')[0]
            isDone = false
            for (let i = 0; i < cards.length; i++) {
              if (cards[i].id != cardId) {
                continue
              }

              for (let j = 0; j < cards[i].ops.length; j++) {
                if (cards[i].ops[j].id != data.id) {
                  continue
                }

                cards[i].ops[j].next = data.next
                isDone = true

                break
              }

              if (isDone) {
                break
              }
            }
        }

        break
      case 'remove':
        switch (data.type) {
          case 'card':
            let cardId = parseInt(data.id.substring(1)) - 1;
            cards.splice(cardId, 1);

            for (let i = 0; i < cards.length; i++) {
              cards[i].id = 'c' + (i + 1).toString();
              for (let j = 0; j < cards[i].ops.length; j++) {
                cards[i].ops[j].id = cards[i].id + 'o' + (j + 1).toString()
                if (cards[i].ops[j].next == data.id) {
                  cards[i].ops[j].next = '0';
                  lines[cards[i].ops[j].id].remove();
                  delete lines[cards[i].ops[j].id];
                } else if (i >= cardId) {
                  if (cards[i].ops[j].next == '0') {
                    continue
                  }

                  let nextCardId = parseInt(cards[i].ops[j].next.substring(1)) - 1;
                  cards[i].ops[j].next = 'c' + nextCardId.toString();
                }
              }
            }

            break
          case 'option':
            cardId = parseInt(data.id.split('o')[0].substring(1)) - 1;
            let opId = parseInt(data.id.split('o')[1]) - 1;

            lines[cards[cardId].ops[opId].id].remove();
            delete lines[cards[cardId].ops[opId].id];

            cards[cardId].ops.splice(opId, 1);
            for (let i = 0; i < cards[cardId].ops.length; i++) {
              cards[cardId].ops[i].id = cards[cardId].id + 'o' + (i + 1).toString()
            }

            break
        }

        break
      case 'select':
        switch (data.type) {
          case 'card':
            if (this.state.selected != '') {
              let cardId = parseInt(this.state.selected.split('o')[0].substring(1)) - 1;
              console.log(this.state.selected);
              let opId = parseInt(this.state.selected.split('o')[1]) - 1;

              cards[cardId].ops[opId].next = data.id
              cards[cardId].ops[opId].token = nanoid();
              selected = ''
            }

            break
          case 'option':
            selected = data.id

            break
        }

        break
      case 'unselect':
        selected = ''

        break
      case 'cut':
        let cardId = parseInt(data.id.split('o')[0].substring(1)) - 1;
        let opId = parseInt(data.id.split('o')[1]) - 1;
        cards[cardId].ops[opId].next = '0';
        lines[data.id].remove();
        delete lines[data.id];

        break
    }

    let lore = JSON.parse(localStorage.getItem('lore'));
    lore.cards = cards;
    localStorage.setItem('lore', JSON.stringify(lore));

    this.setState({ ...this.state, lines: lines, cards: cards, selected: selected });
  }

  handleExportJSON() {
    const json = JSON.stringify(this.state, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const href = URL.createObjectURL(blob)

    // create "a" HTLM element with href to file
    const link = document.createElement('a')
    link.href = href
    link.download = this.state.character.name + '.json'
    document.body.appendChild(link)
    link.click()

    // clean up "a" element & remove ObjectURL
    document.body.removeChild(link)
    URL.revokeObjectURL(href)
  }

  addLine(opId, line) {
    let lines = this.state.lines
    lines[opId] = line
    this.setState({ ...this.state, lines })
  }

  removeLine(opId) {
    let lines = this.state.lines
    delete lines[opId]
    this.setState({ ...this.state, lines })
  }

  render() {
    return (
      <div>
        <Grid>
          <Grid.Column width={2}>
            <Char
              char={this.state.character}
              handleExportJSON={this.handleExportJSON.bind(this)}
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
              />
            )}
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}
