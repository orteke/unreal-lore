import '../index.css'
import React from 'react'
import { Grid } from 'semantic-ui-react'
import DialogCard from '../components/dialogCard'
import Char from '../components/char'
import lore from '../peder.json'

export default class Board extends React.Component {
  constructor (props) {
    super(props)
    this.state = { ...lore, lines: [] }
  }

  componentDidMount () {
    console.log('componentDidMount() lifecycle', this.state)
  }

  onChange (action, data) {
    console.log('action', action)

    let cards = []
    let lines = []
    let isDone

    switch (action) {
      case 'input':
        switch (data.type) {
          case 'character':
            this.setState({ ...this.state, character: data.character })

            break
          case 'card':
            cards = this.state.cards
            for (let i = 0; i < cards.length; i++) {
              if (cards[i].id === data.id) {
                cards[i].hint = data.hint
                isDone = true

                break
              }

              if (isDone) {
                break
              }
            }

            this.setState({ ...this.state, cards })

            break
          case 'option':
            cards = this.state.cards
            for (let i = 0; i < cards.length; i++) {
              for (let i = 0; i < cards[i].ops.length; i++) {
                if (cards[i].ops[i].id === data.id) {
                  cards[i].ops[i].text = data.text
                  isDone = true

                  break
                }
              }

              if (isDone) {
                break
              }
            }

            this.setState({ ...this.state, cards })
        }

        break
      case 'drag':
        lines = this.state.lines
        for (let i = 0; i < lines.length; i++) {
          lines[i].position()
        }

        cards = this.state.cards
        for (let i = 0; i < cards.length; i++) {
          if (cards[i].id === data.id) {
            cards[i].position = data.position

            break
          }
        }

        this.setState({ ...this.state, lines, cards })

        break
      case 'add': {
        cards = this.state.cards
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
              if (cards[i].id === data.id) {
                cards[i].ops.push({
                  id: data.id + 'o' + cards[i].ops.length.toString(),
                  text: 'text',
                  next: 0
                })

                break
              }
            }
        }

        this.setState({ ...this.state, lines, cards })
      }
    }
  }

  handleExportJSON () {
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

  addLine (line) {
    const lines = this.state.lines
    lines.push(line)
    this.setState({ ...this.state, lines })
  }

  removeLine (i) {
    const lines = this.state.lines
    lines.splice(i, 1)
    this.setState({ ...this.state, lines })
  }

  render () {
    return (
      <div>
        <Grid>
          <Grid.Column width={2}>
            <Char
              char={this.state.character}
              exportJSON={this.handleExportJSON.bind(this)}
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
