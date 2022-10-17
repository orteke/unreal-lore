import '../index.css'
import logo from '../images/logo512.png'
import wireframe from '../images/wireframe.png'
import orteke from '../images/orteke.jpg'
import sop from '../images/sop.png'
import sdialog from '../images/sdialog.png'
import * as loreUtils from '../utils/lore.mjs'
import React from 'react'
import {
  Grid, Image, Segment, Header, Icon, Button, Divider, Container, Modal, List, Popup, Label, Sticky
} from 'semantic-ui-react'

export default class Board extends React.Component {
  constructor(props) {
    super(props)

    let lores = loreUtils.getLores();

    this.state = {
      lores: lores,
      showModal: false,
    }

    this.handleCreateEmptyBoard = this.handleCreateEmptyBoard.bind(this)
    this.handleStartLore = this.handleStartLore.bind(this)
    this.handleStopLore = this.handleStopLore.bind(this)
    this.handleSelectLore = this.handleSelectLore.bind(this)
    this.onChangeFile = this.onChangeFile.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }

  componentDidMount() {
    console.log('componentDidMount() lifecycle', this.state)
  }

  onChangeFile(event) {
    event.stopPropagation();
    event.preventDefault();
    var file = event.target.files[0];
    if (file.type !== 'application/json') {
      alert('you could restore only json file');
    }

    let read = new FileReader();
    read.readAsText(file);
    read.onloadend = function () {
      let lore = JSON.parse(read.result);
      if (!lore.hasOwnProperty("character") || !lore.hasOwnProperty("cards")) {
        alert('file is not a fit lore schema!');
      }

      loreUtils.appendLore(lore);
      window.location.href = 'board';
    }
  }

  handleRemove(loreName) {
    loreUtils.removeLore(loreName);
    this.setState({ ...this.state, lores: loreUtils.getLores() });
  }

  handleStartLore() {
    this.setState({ ...this.state, showModal: true });
  }

  handleStopLore() {
    this.setState({ ...this.state, showModal: false });
  }

  handleSelectLore(lore) {
    localStorage.setItem('lore', JSON.stringify(lore));
    window.location.href = 'board';
  }

  handleCreateEmptyBoard() {
    let lore = loreUtils.emptyLore(Object.keys(this.state.lores).length);
    let lores = this.state.lores;
    lores[lore.character.name] = lore;

    localStorage.setItem('lore', JSON.stringify(lore));
    localStorage.setItem('lores', JSON.stringify(lores));

    window.location.href = 'board'
  }

  render() {
    return (
      <div className='orteke'>
        <Grid>
          <Grid.Column width={6} className='grey-bg'>
            <div className='gif magic-button ozan' >
              <Modal
                className='modal'
                open={this.state.showModal}
                trigger={
                  <Sticky>
                    <Button className="ui massive button teal-bg" animated='fade' onClick={this.handleStartLore}>
                      <Button.Content visible>Let's Start Your Lore</Button.Content>
                      <Button.Content hidden>Ready?</Button.Content>
                    </Button>
                  </Sticky>

                }
              >
                <Modal.Content image>
                  <Modal.Description>
                    <Header>History</Header>
                    {this.state.lores.length === 0 ?
                      (<p>Not found</p>) :
                      (<List>
                        {Object.keys(this.state.lores).map((charName, i) =>
                          <List.Item key={this.state.lores[charName].character.name}>
                            <Image avatar src={this.state.lores[charName].character.imageUrl !== '' ? this.state.lores[charName].character.imageUrl : wireframe} />

                            <List.Content>
                              <List.Header as='a' onClick={() => this.handleSelectLore(this.state.lores[charName])}>
                                {this.state.lores[charName].character.name}
                              </List.Header>
                              <List.Description>
                                {this.state.lores[charName].character.description}
                              </List.Description>
                              <List.Description>
                                <Icon link name='delete' color='red' onClick={() => this.handleRemove(charName)} />
                              </List.Description>
                            </List.Content>
                          </List.Item>
                        )}
                      </List>)
                    }

                  </Modal.Description>
                  <Modal.Description>
                    <Segment placeholder>
                      <Grid columns={2} stackable textAlign='center'>
                        <Divider vertical>Or</Divider>

                        <Grid.Row verticalAlign='middle'>
                          <Grid.Column>
                            <Header icon>
                              Restore a document
                            </Header>
                            <Button className='teal-bg' onClick={() => { this.upload.click() }}>Upload</Button>
                            <input id="myInput"
                              type="file"
                              ref={(ref) => this.upload = ref}
                              style={{ display: 'none' }}
                              onChange={this.onChangeFile.bind(this)}
                            />
                          </Grid.Column>

                          <Grid.Column>
                            <Header icon>
                              Let's start a new lore
                            </Header>
                            <Button className='teal-bg' onClick={this.handleCreateEmptyBoard}>Create</Button>
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    </Segment>
                  </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                  <Button color='black' onClick={this.handleStopLore}>
                    Close
                  </Button>
                </Modal.Actions>
              </Modal>
            </div>
          </Grid.Column>
          <Grid.Column width={10}>
            <Container textAlign='left' className='howto'>
              <Header as='h1' icon textAlign='center'>
                <Image src={logo} size='massive' circular />
                <Header.Content className='white-text'>Unreal Lore(Alpha v0.876)</Header.Content><br />
              </Header>
              <div className='hidden-scroll'>
                <div>
                  <p className='description'>
                    <Image src='https://iili.io/tKaTEN.gif' size='massive' />
                    <br />

                    UL developing specifically for writing long, optional and non-deterministic dialogues in game projects such as rpg games.<br /><br />
                    - While writing the game scenario, you can visually see how the dialogues will progress. <br />
                    - You can detect excessively short or excessively long dialogue streams.<br />
                    - You create a separate dialogue board for each character and you can easily start to write the story.<br />
                  </p>
                </div><br />

                <div>
                  <Header as='h2' className='white-text'>Use with Unreal Engine</Header><br />
                  <Image src={sop} size='massive' /><br />
                  <Image src={sdialog} size='massive' /><br />
                  <p>
                    Unreal Engine plugin status is active development. We will set production soon as possible.<br />
                    You can export the dialog with the UE datatable export option on the dialog board.
                    You could create 'ue structure' and bind exported file.
                    You have to decide for yourself how you will use it in the game.<br /> <br />

                  </p>
                  <Header as='h2' className='white-text'>How It Works?</Header>
                  <p>
                    A character board is created for each character the player can talk to.
                    Then you can export this dialog file and use it as you wish.
                    All the boards you create are stored in the browser. Naturally, you may lose this board information.
                    Don't worry, you can save the files you exported, restore them whenever you need, and continue where you left off for the board.
                  </p>
                  <Header as='h4' className='white-text'>Cards</Header>
                  <p>The part of the cards called hint contains the word or question that the character will say to the player.
                    The cards are in order, and the order is updated each time a card is deleted.</p>
                  <Header as='h4' className='white-text'>Options</Header>
                  <p>Options contain the player's response to the character. You can create any number of cards in each card.
                    Each option is connected to a card, thus providing a flow of dialogue. Not every option has to be tied to a card.
                    In this case, the dialog is over. With this feature, you can create multiple dialog flows within a board.
                    The next value of the option that is not connected to a card will be '0'.</p>
                  <Header as='h4' className='white-text'>Lines</Header>
                  <p>Lines connect an option to a board. they can be disconnected and reconnected to other cards.</p>
                  <Header as='h2' className='white-text'>Upcoming Features</Header>
                  <p>Remember, we will always have the free version. We are game developers and we want help other game developers.
                    In this way, you can use this project with peace of mind.<br /><br />
                    - Unreal Engine Plugin and useful funcs<br />
                    - Cloud Store<br />
                    - Google Drive Store<br />
                    - UI/UX Improvements<br />
                  </p>
                  <Header as='h2' className='white-text'>Donate us</Header>
                  <p> Unreal lore is started hobby project.
                    But we have some expenses. We have to pay bills sended from NameCheap and Netlify.
                    If you join us, you will be a great support. But we ask you to donate if there is a lot of money.</p>
                  <List>
                    <List.Item as='a' onClick={() => { navigator.clipboard.writeText('32mLAFhCJ8m75jsGtdwWK6B4ScKtKn6Avb') }}>
                      <List.Content>
                        <Popup
                          content='copy to clipboard' trigger={
                            <Label>
                              <Icon name='bitcoin' />
                              &nbsp;bitcoin
                              <Label.Detail>32mLAFhCJ8m75jsGtdwWK6B4ScKtKn6Avb</Label.Detail>
                            </Label>
                          }
                        />
                      </List.Content>
                    </List.Item>
                    <List.Item as='a' onClick={() => { navigator.clipboard.writeText('0x8172Dd888EcBC9eBAF7dB95dB4e4b1Dc601E4B81') }}>
                      <List.Content>
                        <Popup
                          content='copy to clipboard' trigger={
                            <Label>
                              <Icon name='ethereum' />
                              &nbsp;ethereum
                              <Label.Detail>0x8172Dd888EcBC9eBAF7dB95dB4e4b1Dc601E4B81</Label.Detail>
                            </Label>
                          }
                        />
                      </List.Content>
                    </List.Item>
                    <List.Item as='a' onClick={() => { navigator.clipboard.writeText('FMAIJ6XMJSCXNAN3UKJP5K34LW436ZMHYGWCFMCBLZWWIYMMV6V5SULX6A') }}>
                      <List.Content>
                        <Popup
                          content='copy to clipboard' trigger={
                            <Label>
                              <Icon name='tablet' />
                              &nbsp;algorand
                              <Label.Detail>FMAIJ6XMJSCXNAN3UKJP5K34LW436ZMHYGWCFMCBLZWWIYMMV6V5SULX6A</Label.Detail>
                            </Label>
                          }
                        />
                      </List.Content>
                    </List.Item>
                    <List.Item as='a' onClick={() => { navigator.clipboard.writeText('GDQP2KPQGKIHYJGXNUIYOMHARUARCA7DJT5FO2FFOOKY3B2WSQHG4W37:::ucl:::362767634') }}>
                      <List.Content>
                        <Popup
                          content='copy to clipboard' trigger={
                            <Label>
                              <Icon name='tablet' />
                              &nbsp;stellar lumens
                              <Label.Detail>GDQP2KPQGKIHYJGXNUIYOMHARUARCA7DJT5FO2FFOOKY3B2WSQHG4W37:::ucl:::362767634</Label.Detail>
                            </Label>
                          }
                        />
                      </List.Content>
                    </List.Item>
                  </List><br />
                </div>
              </div>
              <Segment className='orteke'>
                <p>
                  <Image src={orteke} size='small' spaced />This project supported by <strong>ORTEKE</strong> studio and making for studio game projects.
                </p>
              </Segment>

            </Container>
          </Grid.Column>
        </Grid >
      </div >
    )
  }
}
