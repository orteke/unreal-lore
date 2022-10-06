import '../index.css'
import React from 'react'
import { Card, Input, Popup, Icon } from 'semantic-ui-react'
import DrawLeaderLine from '../components/leaderline'

export default class Option extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      text: props.option.text,
      next: props.option.next,
      isEditable: false,
      lines: [],
      selected: false
    }

    this.id = props.id

    this.handleToggleInput = this.toggleInput.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleCut = this.handleCut.bind(this)
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside, true)
    if (this.state.next != '0') {
      this.props.addLine(DrawLeaderLine({ startId: this.props.id, endId: this.state.next }))
    }
  }

  componentDidUpdate(prevProps, prevState) {
  }

  handleClickOutside = event => {
    if (!String(event.target).includes('Input')) {
      this.setState({ ...this.state, isEditable: false })
    }
  }

  toggleInput() {
    this.setState({ ...this.state, isEditable: true })
  }

  handleChange(event) {
    this.setState({ ...this.state, text: event.target.value })
    this.props.onChange('input', {
      type: 'option', id: this.props.id, text: event.target.value
    })
  }

  handleRemove() {
    this.props.onChange('remove', {
      type: 'option', id: this.props.id
    })
  }

  handleCut() {
    this.props.onChange('cut', {
      type: 'option', id: this.props.id
    })
  }

  handleSelect() {
    let selected = !this.state.selected
    this.setState({ ...this.state, selected: !this.state.selected })
    if (selected) {
      this.props.onChange('select', {
        type: 'option', id: this.props.id
      })
    } else {
      this.props.onChange('unselect', {
        type: 'option', id: this.props.id
      })
    }
  }

  render() {
    return (
      <Card.Content extra id={this.props.id} onClick={this.handleSelect} className={this.state.selected ? 'teal-bg' : ''}>
        {this.state.isEditable
          ? (
            <Input focus value={this.state.text} onChange={this.handleChange} />
          )
          : (
            <Popup
              content='Double click for edit' trigger={
                <p onDoubleClick={this.handleToggleInput}>
                  {this.state.text}
                  {this.state.next != '0' ? <Icon link name='cut' color='black' className='op-icon' onClick={this.handleCut} /> : false}
                  <Icon link name='delete' color='red' className='op-icon' onClick={this.handleRemove} />
                </p>
              }
            />
          )}
      </Card.Content>
    )
  }
}
