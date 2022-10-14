import '../index.css'
import ozan from '../images/ozan.gif'
import logo from '../images/logo512.png'
import wireframe from '../images/wireframe.png'
import bp from '../images/bp.jpg'
import orteke from '../images/orteke.jpg'
import * as loreUtils from '../utils/lore.js'
import React from 'react'
import { useNavigate } from "react-router-dom";
import {
  Grid, Image, Segment, Header, Icon, Button, Divider, Search, Container, Rail, Modal, List, Popup, Label, Sticky
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
      if (lore.hasOwnProperty("character") && lore.hasOwnProperty("cards")) {
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
                    {this.state.lores.length == 0 ?
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
                    <Image src='https://res.cloudinary.com/dukp6c7f7/image/upload/f_auto,fl_lossy,q_auto/s3-ghost//2019/02/Settings-Sync.gif' size='massive' />
                    <br />

                    UL özellikle rpg oyunları gibi uzun ve alternatif seçenekli diyalogları yazmak için geliştirilmiştir.<br /><br />
                    - Oyun senaryosunu yazarken diyalogların nasıl ilerleyeceğini görsel olarak görebilirsiniz. <br />
                    - Aşırı kısa veya aşırı uzun diyalog akışlarını tespit edebilirsiniz.<br />
                    - Her bir karakter için ayrı bir diyalog boardu oluşturursunuz ve kolayca aklınızda olan
                    hikayeyi yazmaya başlarsınız.<br />
                  </p>
                </div><br />

                <div>
                  <Header as='h2' className='white-text'>Unreal Engine ile Kullanım</Header><br />
                  <Image src={bp} size='massive' /><br />
                  <p>
                    Dialog boardunda bulunan UE datatable export seçeneği ile dialog'u export edebilirsiniz.
                    Ardından aşağıda linkleri bulunan unreal engine ile uyumlu data table dosyalarını kullanarak
                    oyun projenize ekleyebilirsiniz. Oyun içinde nasıl kullanacağınıza kendiniz karar vermelisiniz.<br /> <br />
                    <a href='' className='teal'>- Example BP </a><br />
                    <a href='' className='teal'>- Card Data Table </a><br />
                    <a href='' className='teal'>- Option Data Table</a> <br />
                  </p>
                  <Header as='h2' className='white-text'>How it works?</Header>
                  <p>
                    Oyuncunun konuşabilieceği her karakter için bir karakter boardu oluşturulur.
                    Daha sonra bu fiyalog dosyasını export ederek istediğiniz gibi kullanabilirsiniz.
                    Olluşturduğunuz tüm boardlar browserda saklanır. Doğal olarak bu board bilgilerini kaybedebilirsiniz.
                    Endişelenmeyin, export ettiğiniz dosyaları saklayarak ihtiyaç duyduğunuzda geri yükleyip board için kaldığınız yerden devam edebilirsiniz.
                  </p>
                  <Header as='h4' className='white-text'>Cards</Header>
                  <p>Cardların hint denilen bölümü karakterin oyuncuya söyleyeceği sözü yada soruyu içerir.
                    Kartlar sıralıdır ve her bir kart silindiğinde sıra güncellenir.</p>
                  <Header as='h4' className='white-text'>Options</Header>
                  <p>Optionlar oyuncunun karaktere vereceği cevabı içerir. Her kart içerisinde istediğiniz sayıda oluşturabilirsiniz.
                    Her option bir karta bağlanır ve bu sayede diyalog akışı sağlanır. Her optionın bir karta bağlanması zorunlu değildir.
                    Bu durumda diyalog bitti demektir. Bu özellikle bir board içerisinde birden fazla diyalog akışı oluşturabilirsiniz.
                    Bir karta bağlanmayan option'ın next değeri '0' olur.</p>
                  <Header as='h4' className='white-text'>Lines</Header>
                  <p>Linelar bir optionı bir karta bağlar. kesilebilir ve tekrar başka kartlara bağlanabilirler.</p>
                  <Header as='h2' className='white-text'>Upcoming Features</Header>
                  <p>Unutma, her zaman ücretsiz sürümümüz olacaktır. Bu sayede gönül rahatlığıyla bu projeyi kullanabilirsin.<br /><br />
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
