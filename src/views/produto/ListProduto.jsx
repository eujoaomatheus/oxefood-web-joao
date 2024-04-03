import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Container, Divider, Icon, Table } from 'semantic-ui-react'
import MenuSistema from '../MenuSistema'

export default function ListProduto() {
  const [lista, setLista] = useState([])

  useEffect(() => {
    carregarLista()
  }, [])

  function carregarLista() {
    axios.get('http://localhost:8080/api/produto').then((response) => {
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
  return (
    <div>
      <MenuSistema />
      <div style={{ marginTop: '3%' }}>
        <Container textAlign='justified'>
          <h2> Produto </h2>
          <Divider />

          <div style={{ marginTop: '4%' }}>
            <Button
              label='Novo'
              circular
              color='orange'
              icon='clipboard outline'
              floated='right'
              as={Link}
              to='/form-produto'
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
                  <Table.HeaderCell>Código</Table.HeaderCell>
                  <Table.HeaderCell>Título</Table.HeaderCell>
                  <Table.HeaderCell>Descrição</Table.HeaderCell>
                  <Table.HeaderCell>Valor Unitario</Table.HeaderCell>
                  <Table.HeaderCell>Tempo Entrega Mínimo</Table.HeaderCell>
                  <Table.HeaderCell textAlign='center'>
                    tempoEntregaMaximo
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {lista.map((produto) => (
                  <Table.Row key={produto}>
                    <Table.Cell>{produto.codigo}</Table.Cell>
                    <Table.Cell>{produto.titulo}</Table.Cell>
                    <Table.Cell>{produto.descricao}</Table.Cell>
                    <Table.Cell>
                      R$ {produto.valorUnitario.toFixed(2)}
                    </Table.Cell>
                    <Table.Cell>{produto.tempoEntregaMinimo}</Table.Cell>
                    <Table.Cell textAlign='center'>
                      <Button
                        inverted
                        circular
                        color='green'
                        title='Clique aqui para editar os dados deste produto'
                        icon
                      >
                        <Icon name='edit' />
                      </Button>{' '}
                      &nbsp;
                      <Button
                        inverted
                        circular
                        color='red'
                        title='Clique aqui para remover este produto'
                        icon
                      >
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
    </div>
  )
}
