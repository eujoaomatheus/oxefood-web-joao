import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Icon, Table } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';

export default function ListEntregador() {

    const [lista, setLista] = useState([]);

    useEffect(() => {
        carregarLista();
    }, [])

    function carregarLista() {

        axios.get("http://localhost:8080/api/entregador")
            .then((response) => {
                setLista(response.data)
            })
    }

    function mostrarStatus(status) {
        if (status) {
            return "ATIVO"
        } else {
            return "INATIVO"
        }
    }

    function formatarData(dataParam) {

        if (dataParam === null || dataParam === '' || dataParam === undefined) {
            return ''
        }

        let arrayData = dataParam.split('-');
        return arrayData[2] + '/' + arrayData[1] + '/' + arrayData[0];
    }
    return (
        <div>
            <MenuSistema />
            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >

                    <h2> Cliente </h2>
                    <Divider />

                    <div style={{ marginTop: '4%' }}>
                        <Button
                            label='Novo'
                            circular
                            color='orange'
                            icon='clipboard outline'
                            floated='right'
                            as={Link}
                            to='/form-cliente'
                        />
                        <br /><br /><br />

                        <Table color='orange' sortable celled>

                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>VALOR FRETE</Table.HeaderCell>
                                    <Table.HeaderCell>RUA</Table.HeaderCell>
                                    <Table.HeaderCell>NÚMERO</Table.HeaderCell>
                                    <Table.HeaderCell>BAIRRO</Table.HeaderCell>
                                    <Table.HeaderCell>CIDADE</Table.HeaderCell>
                                    <Table.HeaderCell>CEP</Table.HeaderCell>
                                    <Table.HeaderCell>UF</Table.HeaderCell>
                                    <Table.HeaderCell>COMPLEMENTO</Table.HeaderCell>
                                    <Table.HeaderCell>ATIVO</Table.HeaderCell>
                                    <Table.HeaderCell textAlign='center'>Ações</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>

                                {lista.map(entregador => (

                                    <Table.Row key={entregador.id}>
                                        <Table.Cell>{entregador.valorFrete}</Table.Cell>
                                        <Table.Cell>{entregador.enderecoRua}</Table.Cell>
                                        <Table.Cell>{entregador.endercoNumero}</Table.Cell>
                                        <Table.Cell>{entregador.enderecoBairro}</Table.Cell>
                                        <Table.Cell>{entregador.enderecoCidade}</Table.Cell>
                                        <Table.Cell>{entregador.enderecoCep}</Table.Cell>
                                        <Table.Cell>{entregador.enderecoUf}</Table.Cell>
                                        <Table.Cell>{entregador.enderecoComplemento}</Table.Cell>
                                        <Table.Cell>{mostrarStatus(entregador.ativo)}</Table.Cell>
                                        <Table.Cell textAlign='center'>

                                            <Button
                                                inverted
                                                circular
                                                color='green'
                                                title='Clique aqui para editar os dados deste cliente'
                                                icon>
                                                <Icon name='edit' />
                                            </Button> &nbsp;
                                            <Button
                                                inverted
                                                circular
                                                color='red'
                                                title='Clique aqui para remover este cliente'
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

        </div>
    )
}
