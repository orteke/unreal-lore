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
  Grid, Image, Segment, Header, Icon, Button, Divider, Search, Container, Rail, Modal, List
} from 'semantic-ui-react'

export default class Board extends React.Component {
  constructor(props) {
    super(props)

    let lores = JSON.parse(localStorage.getItem('lores'));
    if (lores == null) {
      lores = {};
    }

    this.state = {
      lores: lores,
      showModal: false,
    }

    this.handleAddDocument = this.handleAddDocument.bind(this)
    this.handleCreateEmptyBoard = this.handleCreateEmptyBoard.bind(this)
    this.handleStartLore = this.handleStartLore.bind(this)
    this.handleStopLore = this.handleStopLore.bind(this)
    this.handleSelectLore = this.handleSelectLore.bind(this)
  }

  componentDidMount() {
    console.log('componentDidMount() lifecycle', this.state)
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

  handleAddDocument() {
    window.location.href = 'board'
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
          <Grid.Column width={6}>
            <div className='grey-bg gif' >
              <Image src={ozan} />
            </div>
          </Grid.Column>
          <Grid.Column width={10}>
            <Container textAlign='left' className='howto'>
              <Header as='h1' icon textAlign='center'>
                <Image src={logo} size='massive' circular />
                <Header.Content className='white-text'>Unreal Lore</Header.Content><br />
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

                <Modal
                  className='modal'
                  open={this.state.showModal}
                  trigger={
                    <Button className="ui massive button teal-bg" animated='fade' onClick={this.handleStartLore}>
                      <Button.Content visible>Let's Start Your Lore</Button.Content>
                      <Button.Content hidden><Icon name='write' />Ready?</Button.Content>
                    </Button>
                  }
                >
                  <Modal.Content image>
                    <Modal.Description>
                      <Header>History</Header>
                      {this.state.lores.length == 0 ?
                        (<p>Not found</p>) :
                        (<List>

                          {Object.keys(this.state.lores).map((charName, i) =>
                            <List.Item key={this.state.lores[charName].character.name} onClick={() => this.handleSelectLore(this.state.lores[charName])}>
                              <Image avatar src={this.state.lores[charName].character.imageUrl !== '' ? this.state.lores[charName].character.imageUrl : wireframe} />

                              <List.Content>
                                <List.Header as='a'>{this.state.lores[charName].character.name}</List.Header>
                                <List.Description>
                                  {this.state.lores[charName].character.description}
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
                                Upload a document for restore lore
                              </Header>
                              <Button className='teal-bg'>Select Document</Button>
                            </Grid.Column>

                            <Grid.Column>
                              <Header icon>
                                Let's start a new lore
                              </Header>
                              <Button className='teal' onClick={this.handleCreateEmptyBoard}>Create</Button>
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
                </Modal><br /><br />

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
