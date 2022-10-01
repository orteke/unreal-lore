import '../index.css'
import React from 'react'
import { Card, Input, Popup, Icon } from 'semantic-ui-react'
import DrawLeaderLine from '../components/leaderline'

export default class Option extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      text: props.option.text,
      next: props.option.next,
      isEditable: false,
      lines: []
    }

    this.id = props.id

    this.handleToggleInput = this.toggleInput.bind(this)
    this.handleChange = this.handleChange.bind(this)

    console.log(props.dragging)
  }

  componentDidMount () {
    document.addEventListener('click', this.handleClickOutside, true)
    console.log(this.props.id, this.state.next)
    if (this.state.next != '0') {
      this.props.addLine(DrawLeaderLine({ startId: this.props.id, endId: this.state.next }))
    }
  }

  componentDidUpdate (prevProps, prevState) {
  }

  handleClickOutside = event => {
    if (!String(event.target).includes('Input')) {
      this.setState({ ...this.state, isEditable: false })
    }
  }

  toggleInput () {
    this.setState({ ...this.state, isEditable: true })
  }

  handleChange (event) {
    this.setState({ ...this.state, text: event.target.value })
    this.props.onChange('input', {
      type: 'option', id: this.props.id, text: event.target.value
    })
  }

  render () {
    return (
      <Card.Content extra id={this.props.id}>
        {this.state.isEditable
          ? (
            <Input focus value={this.state.text} onChange={this.handleChange} />
            )
          : (
            <Popup
              content='Double click for edit' trigger={
                <p onDoubleClick={this.handleToggleInput}>
                  {this.state.text}
                  <Icon link name='cut' color='black' className='op-icon' />
                  <Icon link name='delete' color='red' className='op-icon' />
                </p>
                }
            />
            )}
      </Card.Content>
    )
  }
}
