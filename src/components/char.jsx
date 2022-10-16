import '../index.css'
import wireframe from '../images/wireframe.png'
import React from 'react'
import {
  Image, Card, Button, Icon, Sticky, Input, Popup
} from 'semantic-ui-react'
import * as loreUtils from '../utils/lore.mjs'

export default class Char extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: props.char.name,
      imageUrl: props.char.imageUrl,
      role: props.char.role,
      description: props.char.description,
      isEditable: false
    }

    this.handleToggleInput = this.toggleInput.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleRoleChange = this.handleRoleChange.bind(this)
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
    this.handleAddCard = this.addCard.bind(this)
    this.onImageClick = this.onImageClick.bind(this)
    this.onChangeFile = this.onChangeFile.bind(this)
    this.handleBack = this.handleBack.bind(this)
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside, true)
  }

  handleClickOutside = event => {
    if (!String(event.target).includes('Input')) {
      this.setState({ ...this.state, isEditable: false })
    }
  }

  toggleInput() {
    this.setState({ ...this.state, isEditable: true })
  }

  addCard() {
    this.props.onChange('add', {
      type: 'card'
    })
  }

  handleBack() {
    window.location.href = '/'
  }

  handleNameChange(event) {
    this.setState({ ...this.state, name: event.target.value })
    this.props.onChange('input', {
      type: 'character',
      field: 'name',
      before: this.state.name,
      character: {
        name: event.target.value,
        role: this.state.role,
        description: this.state.description,
        imageUrl: this.state.imageUrl,
      }
    })
  }

  handleRoleChange(event) {
    this.setState({ ...this.state, role: event.target.value })
    this.props.onChange('input', {
      type: 'character',
      field: 'role',
      character: {
        name: this.state.name,
        role: event.target.value,
        description: this.state.description,
        imageUrl: this.state.imageUrl,
      }
    })
  }

  handleImageChange(base64Text) {
    this.setState({ ...this.state, imageUrl: base64Text })
    this.props.onChange('input', {
      type: 'character',
      field: 'image',
      character: {
        name: this.state.name,
        role: this.state.role,
        description: this.state.description,
        imageUrl: base64Text,
      }
    })
  }

  handleDescriptionChange(event) {
    this.setState({ ...this.state, description: event.target.value })
    this.props.onChange('input', {
      type: 'character',
      field: 'description',
      character: {
        name: this.state.name,
        role: this.state.role,
        description: event.target.value,
        imageUrl: this.state.imageUrl,
      }
    })
  }

  onImageClick() {
    // `current` points to the mounted file input element
    this.inputFile.current.click();
  }

  onChangeFile(event) {
    event.stopPropagation();
    event.preventDefault();
    var file = event.target.files[0];
    console.log(file);
    loreUtils.getBase64(file).then(
      data => this.handleImageChange(data)
    );
  }

  render() {
    return (
      <Sticky>
        <Card>
          <Image src={this.state.imageUrl !== '' ? this.state.imageUrl : wireframe} wrapped ui={false}
            onClick={() => { this.upload.click() }} />

          <input id="myInput"
            type="file"
            ref={(ref) => this.upload = ref}
            style={{ display: 'none' }}
            onChange={this.onChangeFile.bind(this)}
          />
          <Card.Content>
            <Card.Header>
              {this.state.isEditable
                ? (
                  <Input focus value={this.state.name} onChange={this.handleNameChange} />
                )
                : (
                  <Popup
                    content='Double click for edit' trigger={
                      <p onDoubleClick={this.handleToggleInput}>
                        {this.state.name}
                      </p>
                    }
                  />
                )}
            </Card.Header>
            <Card.Meta>
              <span className='date'>
                {this.state.isEditable
                  ? (
                    <Input focus value={this.state.role} onChange={this.handleRoleChange} />
                  )
                  : (
                    <Popup
                      content='Double click for edit' trigger={
                        <p onDoubleClick={this.handleToggleInput}>
                          {this.state.role}
                        </p>
                      }
                    />
                  )}
              </span>
            </Card.Meta>
            <Card.Description>
              {this.state.isEditable
                ? (
                  <Input focus value={this.state.description} onChange={this.handleDescriptionChange} />
                )
                : (
                  <Popup
                    content='Double click for edit' trigger={
                      <p onDoubleClick={this.handleToggleInput}>
                        {this.state.description}
                      </p>
                    }
                  />
                )}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Button icon labelPosition='left' className='feature-button' color='teal' onClick={this.handleBack}>
              <Icon name='arrow alternate circle left' />
              Back
            </Button>
            <Button icon labelPosition='left' className='feature-button' color='blue' onClick={this.handleAddCard}>
              <Icon name='plus' />
              Card
            </Button>
            <Button icon labelPosition='left' className='feature-button' color='olive' onClick={this.props.handleExportJSON}>
              <Icon name='download' />
              JSON
            </Button>
            <Button icon labelPosition='left' className='feature-button' color='black' onClick={this.props.handleExportUEDataTable}>
              <Icon name='table' />
              UE-DataTable
            </Button>
          </Card.Content>
        </Card>
      </Sticky>
    )
  }
}
