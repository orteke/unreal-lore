import '../index.css'
import ozan from '../images/ozan.gif'
import logo from '../images/logo512.png'
import orteke from '../images/orteke.jpg'
import React from 'react'
import { useNavigate } from "react-router-dom";
import {
  Grid, Image, Segment, Header, Icon, Button, Divider, Search, Container, Rail
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
    }

    this.handleAddDocument = this.handleAddDocument.bind(this)
    this.handleCreateEmptyBoard = this.handleCreateEmptyBoard.bind(this)
  }

  componentDidMount() {
    console.log('componentDidMount() lifecycle', this.state)
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
                  UL özellikle rpg oyunları gibi karmaşık ve alternatif seçenekli diyalogları yazmak için geliştirilmiştir.
                  Oyun senaryosunu yazarken diyalogların nasıl ilerleyeceğini görsel olarak görebilirsiniz.
                  Aşırı kısa veya aşırı uzun diyalog akışlarını tespit edebilirsiniz.
                  Her bir karakter için ayrı bir diyalog boardu oluşturursunuz ve kolayca aklınızda olan
                  hikayeyi yazmaya başlarsınız.
                </p>
              </div>

              <Segment placeholder className='grey-bg'>
                <Grid columns={2} stackable textAlign='center'>
                  <Divider vertical>Or</Divider>

                  <Grid.Row verticalAlign='middle'>
                    <Grid.Column>
                      <Header icon>
                        <Icon name='upload' />
                        Upload a lore file
                      </Header>
                      <Button className='teal-bg' onClick={this.handleAddDocument}>Add Document</Button>
                    </Grid.Column>

                    <Grid.Column>
                      <Header icon>
                        <Icon name='pin' />
                        Let's start a new lore
                      </Header>
                      <Button className='teal-bg' onClick={this.handleCreateEmptyBoard}>Create Empty Board</Button>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>

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
        </Grid>
      </div>
    )
  }
}
