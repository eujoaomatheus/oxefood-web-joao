import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Container, Divider, Header, Icon, Modal, Table } from 'semantic-ui-react'
import MenuSistema from '../MenuSistema'

export default function ListEntregador() {
  const [lista, setLista] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [idRemover, setIdRemover] = useState();

  useEffect(() => {
    carregarentregador()
  }, [])

  function carregarentregador() {
    axios.get('http://localhost:8080/api/entregador').then((response) => {
      console.log(response.data)
      setLista(response.data)
    })
  }
  function formatarData(dataParam) {
    if (dataParam === null || dataParam === '' || dataParam === undefined) {
      return ''
    }

    let arrayData = dataParam.split('-')
    return arrayData[2] + '/' + arrayData[1] + '/' + arrayData[0]
  }
  function confirmaRemover(id) {
        setOpenModal(true)
        setIdRemover(id)
    }
    async function remover() {

        await axios.delete('http://localhost:8080/api/entregador/' + idRemover)
        .then((response) => {

            console.log('Entregador removido com sucesso.')

            axios.get("http://localhost:8080/api/entregador")
            .then((response) => {
                setLista(response.data)
            })
        })
        .catch((error) => {
            console.log('Erro ao remover um entregador.')
        })
        setOpenModal(false)
    }

  return (
    <div>
      <MenuSistema />
      <div style={{ marginTop: '3%' }}>
        <Container textAlign='justified'>
          <h2> Entregador </h2>
          <Divider />

          <div style={{ marginTop: '4%' }}>
            <Button
              label='Novo'
              circular
              color='orange'
              icon='clipboard outline'
              floated='right'
              as={Link}
              to='/form-entregador'
            />
            <br />
            <br />
            <br />

            <Table
              color='orange'
              sortable
              celled
            >
                <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Nome</Table.HeaderCell>
                                    <Table.HeaderCell>CPF</Table.HeaderCell>
                                    <Table.HeaderCell>Data de Nascimento</Table.HeaderCell>
                                    <Table.HeaderCell>Fone Celular</Table.HeaderCell>
                                    <Table.HeaderCell>Fone Fixo</Table.HeaderCell>
                                    <Table.HeaderCell>Qtd entregas</Table.HeaderCell>
                                    <Table.HeaderCell>Valor Frete</Table.HeaderCell>
                                    <Table.HeaderCell>Rua</Table.HeaderCell>
                                    <Table.HeaderCell>Número</Table.HeaderCell>
                                    <Table.HeaderCell>Bairro</Table.HeaderCell>
                                    <Table.HeaderCell>Cidade</Table.HeaderCell>
                                    <Table.HeaderCell>CEP</Table.HeaderCell>
                                    <Table.HeaderCell>UF</Table.HeaderCell>
                                    <Table.HeaderCell>Comlemento</Table.HeaderCell>
                                    <Table.HeaderCell textAlign='center'>Ações</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>

                                {lista.map(entregador => (

                                    <Table.Row key={entregador.id}>
                                        <Table.Cell>{entregador.nome}</Table.Cell>
                                        <Table.Cell>{entregador.cpf}</Table.Cell>
                                        <Table.Cell>{formatarData(entregador.dataNascimento)}</Table.Cell>
                                        <Table.Cell>{entregador.foneCelular}</Table.Cell>
                                        <Table.Cell>{entregador.foneFixo}</Table.Cell>
                                        <Table.Cell>{entregador.qtdEntregasRealizadas}</Table.Cell>
                                        <Table.Cell>{entregador.valorFrete}</Table.Cell>
                                        <Table.Cell>{entregador.rua}</Table.Cell>
                                        <Table.Cell>{entregador.numeroRua}</Table.Cell>
                                        <Table.Cell>{entregador.bairro}</Table.Cell>
                                        <Table.Cell>{entregador.cidade}</Table.Cell>
                                        <Table.Cell>{entregador.cep}</Table.Cell>
                                        <Table.Cell>{entregador.uf}</Table.Cell>
                                        <Table.Cell>{entregador.complemento}</Table.Cell>
                                        <Table.Cell textAlign='center'>

                                          <Button
                                                inverted
                                                circular
                                                color='green'
                                                title='Clique aqui para editar os dados deste entregador'
                                                icon>
                                                <Link to="/form-entregador" state={{id: entregador.id}} style={{color: 'green'}}> <Icon name='edit' /> </Link>
                                            </Button> &nbsp;

                                            <Button
                                                inverted
                                                circular
                                                color='red'
                                                title='Clique aqui para remover este entregador'
                                                onClick={e => confirmaRemover(entregador.id)}
                                                icon>
                                                <Icon name='trash' />
                                            </Button>

                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </Container>
      </div>
      <div>
            <Modal
                        basic
                        onClose={() => setOpenModal(false)}
                        onOpen={() => setOpenModal(true)}
                        open={openModal}
                    >
                        <Header icon>
                            <Icon name='trash' />
                            <div style={{marginTop: '5%'}}> Tem certeza que deseja remover esse registro? 
                            </div>
                        </Header>
                        <Modal.Actions>
                            <Button basic color='red' inverted onClick={() => setOpenModal(false)}>
                                <Icon name='remove' /> Não
                            </Button>
                            <Button color='green' inverted onClick={() => remover()}>
                                <Icon name='checkmark' /> Sim
                            </Button>
                        </Modal.Actions>
                    </Modal>

            </div>
    </div>
  )
}
