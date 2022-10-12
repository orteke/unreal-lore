import '../index.css'
import React from 'react'
import { Card, Input, Popup, Icon } from 'semantic-ui-react'
import DrawLeaderLine from '../components/leaderline'

export default class Option extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      id: props.id,
      text: props.option.text,
      next: props.option.next,
      isEditable: false,
      line: null,
      selected: false
    }

    this.handleToggleInput = this.toggleInput.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleCut = this.handleCut.bind(this)
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside, true);
    if (this.state.next != '0') {
      let line = DrawLeaderLine({ startId: this.props.id, endId: this.state.next })
      this.props.addLine(this.state.id, line);
      this.setState({ ...this.state, line: line });
    }
  }

  handleClickOutside = event => {
    if (this.state.selected && !event.target.className.includes('chain')) {
      this.props.onChange('unselect', {
        type: 'option', id: this.props.id
      })
    }

    if (!String(event.target).includes('Input')) {
      this.setState({ ...this.state, isEditable: false, selected: false });
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
      <Card.Content extra id={this.props.id} className={this.state.selected ? 'teal-bg' : ''}>
        {this.state.isEditable
          ? (
            <Input focus value={this.state.text} onChange={this.handleChange} />
          )
          : (
            <Popup
              content='Double click for edit' trigger={
                <p onDoubleClick={this.handleToggleInput}>
                  {this.state.text}
                  <Icon link name='delete' color='red' className='op-icon' onClick={this.handleRemove} />
                  <Icon link name='chain' color='teal' className='op-icon' onClick={this.handleSelect} />
                  {this.state.next != '0' ? <Icon link name='cut' color='black' className='op-icon' onClick={this.handleCut} /> : false}
                </p>
              }
            />
          )}
      </Card.Content>
    )
  }
}
