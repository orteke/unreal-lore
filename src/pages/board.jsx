import '../index.css'
import React from 'react'
import { Grid } from 'semantic-ui-react'
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

    this.state = { ...lore, lines: [] }
  }

  componentDidMount() {
    console.log('componentDidMount() lifecycle', this.state)
  }

  onChange(action, data) {
    console.log('action', action)

    let cards = this.state.cards
    let lines = this.state.lines
    let isDone
    let needsRefresh

    this.setState({ ...this.state, 'lines': lines, 'cards': [] })

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
        for (let i = 0; i < lines.length; i++) {
          lines[i].position()
        }

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
              id: 'c' + cards.length.toString(),
              hint: 'text',
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
                id: data.id + 'o' + cards[i].ops.length.toString(),
                text: 'text',
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
        needsRefresh = true;
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
            cards[cardId].ops.splice(opId, 1);
            for (let i = 0; i < cards[cardId].ops.length; i++) {
              cards[cardId].ops[i].id = cards[cardId].ops[i].id + 'o' + (i + 1).toString()
            }
        }
    }

    let lore = JSON.parse(localStorage.getItem('lore'));
    lore.cards = cards;
    localStorage.setItem('lore', JSON.stringify(lore));

    if (needsRefresh) {
      window.location.reload(false);
    } else {
      this.setState({ ...this.state, lines, cards });
    }
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

  addLine(line) {
    const lines = this.state.lines
    lines.push(line)
    this.setState({ ...this.state, lines })
  }

  removeLine(i) {
    const lines = this.state.lines
    lines.splice(i, 1)
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
            {this.state.cards.map((card, i) =>
              <DialogCard
                key={i}
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
