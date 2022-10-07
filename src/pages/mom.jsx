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

    this.handleToBoard = this.handleToBoard.bind(this)
  }

  componentDidMount() {
    console.log('componentDidMount() lifecycle', this.state)
  }

  handleToBoard() {
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
            <Container textAlign='center'>
              <Header as='h1' icon textAlign='center'>
                <Image src={logo} size='massive' circular />
                <Header.Content className='white-text'>Unreal Lore</Header.Content>
              </Header>
              <div>
                <Header as='h2' className='white-text'>Header</Header>
                <p>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
                  ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus et
                  magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis,
                  ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa
                  quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget,
                  arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.
                  Nullam dictum felis eu pede link mollis pretium. Integer tincidunt. Cras
                  dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.
                  Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.
                  Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus
                  viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet.
                  Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
                  ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus et
                  magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis,
                  ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa
                  quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget,
                  arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.
                  Nullam dictum felis eu pede link mollis pretium. Integer tincidunt. Cras
                  dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.
                  Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.
                  Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus
                  viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet.
                  Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.
                </p>
              </div>

              <Segment placeholder className='grey-bg'>
                <Grid columns={2} stackable textAlign='center'>
                  <Divider vertical>Or</Divider>

                  <Grid.Row verticalAlign='middle'>
                    <Grid.Column>
                      <Header icon>
                        <Icon name='pdf file outline' />
                        No documents are listed for this customer.
                      </Header>
                      <Button className='teal-bg'>Add Document</Button>
                    </Grid.Column>

                    <Grid.Column>
                      <Header icon>
                        <Icon name='world' />
                        Let's start a new lore
                      </Header>
                      <Button className='teal-bg' onClick={this.handleToBoard}>Create</Button>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>

              <div>
                <Header as='h2' className='white-text'>Header</Header>
                <p>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
                  ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus et
                  magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis,
                  ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa
                  quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget,
                  arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.
                  Nullam dictum felis eu pede link mollis pretium. Integer tincidunt. Cras
                  dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.
                  Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.
                  Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus
                  viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet.
                  Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
                  ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus et
                  magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis,
                  ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa
                  quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget,
                  arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.
                  Nullam dictum felis eu pede link mollis pretium. Integer tincidunt. Cras
                  dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.
                  Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.
                  Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus
                  viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet.
                  Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.
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
