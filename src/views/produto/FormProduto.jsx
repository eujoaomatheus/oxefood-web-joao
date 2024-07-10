import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom/dist";
import { Button, Container, Divider, Form, FormTextArea, Icon } from 'semantic-ui-react';

import axios from "axios";
import MenuSistema from "../MenuSistema";

export default function FormProduto() {

    const { state } = useLocation();
    const [idProduto, setIdProduto] = useState();
    const [titulo, setTitulo] = useState();
    const [codigoProduto, setCodigoProduto] = useState();
    const [descricao, setDescricao] = useState();
    const [valorUnitario, setValorUnitario] = useState();
    const [tempoMinimo, setTempoMinimo] = useState();
    const [tempoMaximo, setTempoMaximo] = useState();

    function salvar() {

        let produtoRequest = {
            titulo: titulo,
            codigoProduto: codigoProduto,
            descricao: descricao,
            valorUnitario: valorUnitario,
            tempoMinimo: tempoMinimo,
            tempoMaximo: tempoMaximo    
        }
        if (idProduto != null) { //Alteração:
            axios.put("http://localhost:8080/api/produto/" + idProduto, produtoRequest)
                .then((response) => { console.log('Produto alterado com sucesso.') })
                .catch((error) => { console.log('Erro ao alter um produto.') })
        } else { //Cadastro:
            axios.post("http://localhost:8080/api/produto", produtoRequest)
                .then((response) => { console.log('Produto cadastrado com sucesso.') })
                .catch((error) => { console.log('Erro ao incluir o produto.') })
        }
        
    }



    useEffect(() => {
        if (state != null && state.id != null) {
            axios.get("http://localhost:8080/api/produto/" + state.id)
                .then((response) => {
                    setIdProduto(response.data.id)
                    setTitulo(response.data.titulo)
                    setCodigoProduto(response.data.codigoProduto)
                    setDescricao(response.data.descricao)
                    setValorUnitario(response.data.valorUnitario)
                    setTempoMinimo(response.data.tempoMinimo)
                    setTempoMaximo(response.data.tempoMaximo)
                    
                })
        }
    }, [state])


    return (

        <div>

            <MenuSistema tela={'produto'} />

            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >

                    <h2> <span style={{ color: 'darkgray' }}> Produto &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro </h2>

                    <Divider />

                    <div style={{ marginTop: '4%' }}>

                        <Form>

                            <Form.Group widths='equal'>

                                <Form.Input
                                    required
                                    fluid
                                    label='Título'
                                    maxLength="100"
                                    placeholder='Informe o título do produto'
                                    value={titulo}
                                    onChange={e => setTitulo(e.target.value)}
                                />

                                <Form.Input
                                    required
                                    fluid
                                    label='Código do Produto'
                                    placeholder='Informe o código do produto'
                                    value={codigoProduto}
                                    onChange={e => setCodigoProduto(e.target.value)}
                                >

                                </Form.Input>

                            </Form.Group>

                            <FormTextArea label='Descrição' placeholder='Informe a descrição do produto' value={descricao}
                                onChange={e => setDescricao(e.target.value)} />


                            <Form.Group>

                                <Form.Input
                                    required
                                    fluid
                                    label='Valor Unitário'
                                    width={6}
                                    value={valorUnitario}
                                    onChange={e => setValorUnitario(e.target.value)}
                                >

                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Tempo de Entrega Mínimo em Minutos'
                                    width={6}
                                    placeholder='30'
                                    value={tempoMinimo}
                                    onChange={e => setTempoMinimo(e.target.value)}
                                >

                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Tempo de Entrega Máximo em Minutos'
                                    width={6}
                                    placeholder='40'
                                    value={tempoMaximo}
                                    onChange={e => setTempoMaximo(e.target.value)}
                                >
                                </Form.Input>

                            </Form.Group>

                        </Form>

                        <div style={{ marginTop: '4%' }}>

                            <Button
                                type="button"
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='orange'
                            >
                                <Icon name='reply' />
                                <Link to={'/list-produto'}>Voltar</Link>
                            </Button>

                            <Button
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='blue'
                                floated='right'
                                onClick={() => salvar()}
                            >
                                <Icon name='save' />
                                Salvar
                            </Button>

                        </div>

                    </div>

                </Container>
            </div>
        </div>


    )
}