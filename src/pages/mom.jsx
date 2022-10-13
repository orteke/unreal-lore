import '../index.css'
import ozan from '../images/ozan.gif'
import logo from '../images/logo512.png'
import orteke from '../images/orteke.jpg'
import React from 'react'
import { useNavigate } from "react-router-dom";
import {
  Grid, Image, Segment, Header, Icon, Button, Divider, Search, Container, Rail, Modal
} from 'semantic-ui-react'

export default class Board extends React.Component {
  constructor(props) {
    super(props)

    let lores = JSON.parse(localStorage.getItem('lores'));
    if (lores == null) {
      lores = [];
    }

    this.state = {
      lores: lores,
      showModal: false,
    }

    this.handleAddDocument = this.handleAddDocument.bind(this)
    this.handleCreateEmptyBoard = this.handleCreateEmptyBoard.bind(this)
    this.handleStartLore = this.handleStartLore.bind(this)
    this.handleStopLore = this.handleStopLore.bind(this)
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

  handleAddDocument() {
    window.location.href = 'board'
  }

  handleCreateEmptyBoard() {
    localStorage.setItem('lore', JSON.stringify({
      "character": {
        "name": 'new char_' + this.state.lores.length.toString(),
        "imageUrl": "",
        "role": "define a role",
        "description": "input a description"
      },
      "cards": []
    }));
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
                <Header.Content className='white-text'>Unreal Lore</Header.Content>
              </Header>
              <div>
                <p className='description'>
                  <Image src='https://res.cloudinary.com/dukp6c7f7/image/upload/f_auto,fl_lossy,q_auto/s3-ghost//2019/02/Settings-Sync.gif' size='massive' />

                  UL özellikle rpg oyunları gibi karmaşık ve alternatif seçenekli diyalogları yazmak için geliştirilmiştir.
                  Oyun senaryosunu yazarken diyalogların nasıl ilerleyeceğini görsel olarak görebilirsiniz.
                  Aşırı kısa veya aşırı uzun diyalog akışlarını tespit edebilirsiniz.
                  Her bir karakter için ayrı bir diyalog boardu oluşturursunuz ve kolayca aklınızda olan
                  hikayeyi yazmaya başlarsınız.
                </p>
              </div>


              <Modal
                open={this.state.showModal}
                trigger={<Button className="ui massive button teal-bg" onClick={this.handleStartLore}>Let's Start Your Lore</Button>}
              >
                <Modal.Header>Select a Photo</Modal.Header>
                <Modal.Content image>
                  <Image size='medium' src='/images/avatar/large/rachel.png' wrapped />
                  <Modal.Description>
                    <Header>Default Profile Image</Header>
                    <p>
                      We've found the following gravatar image associated with your e-mail
                      address.
                    </p>
                    <p>Is it okay to use this photo?</p>
                  </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                  <Button color='black' onClick={this.handleStopLore}>
                    Nope
                  </Button>
                  <Button
                    content="Yep, that's me"
                    labelPosition='right'
                    icon='checkmark'
                    positive
                    onClick={this.handleStopLore}
                  />
                </Modal.Actions>
              </Modal>

              {/* <Segment placeholder className='grey-bg'>
              </Segment> */}

              <div>
                <Header as='h2' className='white-text'>Unreal Engine Entegrasyonu</Header>
                <p>
                  Dialog boardunda bulunan UE export seçeneği ile dialog'u export edebilirsiniz.
                  Ardından aşağıda linkleri bulunan unreal engine ile uyumlu data table dosyalarını kullanarak
                  oyun projenize ekleyebilirsiniz. Oyun içinde nasıl kullanacağınıza kendiniz karar vermelisiniz.
                </p>
                <Header as='h2' className='white-text'>Dialog Kartları</Header>
                <p>
                  Oyuncunun konuşabilieceği her karak ter için bir karakter boardu oluşturulur.
                  Dialog boardlarında kartlar bulunur. Kartların hint bölümü oyuncunun konuşacağı karakterin söyleyeceği sözü içerir.
                  Her kartta istediğiniz kadar seçenek ekleyebilirsiniz. Bu seçenekleri diğer kartlara bağlayarak akışı oluşturursunuz.
                  Json formatında yada diğer export seçenekleri ile istediğiniz gibi kullanabilirsiniz.
                </p>
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
