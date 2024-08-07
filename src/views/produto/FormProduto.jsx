import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import axios from "axios";
import MenuSistema from "../../MenuSistema";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CurrencyInput from 'react-currency-input-field';

export default function FormProduto() {

    const { state } = useLocation();
    const navigate = useNavigate();

    const [idProduto, setIdProduto] = useState();
    const [codigo, setCodigo] = useState();
    const [titulo, setTitulo] = useState();
    const [descricao, setDescricao] = useState();
    const [valorUnitario, setValorUnitario] = useState();
    const [tempoEntregaMinimo, setTempoEntregaMinimo] = useState();
    const [tempoEntregaMaximo, setTempoEntregaMaximo] = useState();
    const [listaCategoria, setListaCategoria] = useState([]);
   const [idCategoria, setIdCategoria] = useState();


    useEffect(() => {
        if (state != null && state.id != null) {
            axios.get("http://localhost:8080/api/produto/" + state.id)
                .then((response) => {
                    setIdProduto(response.data.id)
                    setCodigo(response.data.codigo)
                    setTitulo(response.data.titulo)
                    setDescricao(response.data.descricao)
                    setValorUnitario(response.data.valorUnitario)
                    setTempoEntregaMinimo(response.data.tempoEntregaMinimo)
                    setTempoEntregaMaximo(response.data.tempoEntregaMaximo)
                    setIdCategoria(response.data.categoria.id)

                })
        }

        axios.get("http://localhost:8080/api/categoriaproduto")
        .then((response) => {
            const dropDownCategorias = response.data.map(c => ({ text: c.descricao, value: c.id }));
            setListaCategoria(dropDownCategorias);
        })
 
    }, [state])

    function parseMoney (value){
        value = String(value);

        if (value.startsWith('R$')) {
            value.replace('R$', '').replace('.', '').replace(',', '.')
        }else{
            //transforma em numero e retorna
            return parseFloat(value);
        }
    }


    function salvar() {
        let produtoRequest = {
            idCategoria: idCategoria,
            codigo: codigo,
            titulo: titulo,
            descricao: descricao,
            valorUnitario: parseMoney(valorUnitario),
            tempoEntregaMinimo: tempoEntregaMinimo,
            tempoEntregaMaximo: tempoEntregaMaximo
        }

        if (idProduto != null) {
            axios.put("http://localhost:8080/api/produto/" + idProduto, produtoRequest)
                .then((response) => {
                    console.log(produtoRequest)
                    toast.success('Produto alterado com sucesso.');
                    setTimeout(() => navigate('/list-produto'), 2000);
                })
                .catch((error) => {
                    toast.error('Erro ao alterar o produto.');
                })
        } else {
            axios.post("http://localhost:8080/api/produto", produtoRequest)
                .then((response) => {
                    toast.success('Produto Salvo com sucesso.');
                    setTimeout(() => navigate('/list-produto'), 2000);
                })
                .catch((error) => {
                    toast.error('Erro ao salvar o produto.');
                })
        }
    }

    return (
        <div>
            <MenuSistema tela={'produto'} />
            <div style={{ marginTop: '3%' }}>
                <Container textAlign='justified'>
                <h2>
                        <span style={{ color: 'darkgray' }}>
                            Produto &nbsp;<Icon name='angle double right' size="small" />
                        </span>
                        {idProduto === undefined ? 'Cadastro' : 'Alteração'}
                    </h2>                    <Divider />
                    <div style={{ marginTop: '4%' }}>
                        <Form>
                            <Form.Group>
                                <Form.Input
                                    required
                                    fluid
                                    label='Título'
                                    maxLength="100"
                                    width={12}
                                    value={titulo}
                                    onChange={e => setTitulo(e.target.value)}
                                />
                                <Form.Input
                                    width={6}
                                    required
                                    fluid
                                    label='Código Produto'
                                >
                                    <input
                                        required
                                        value={codigo}
                                        onChange={e => setCodigo(e.target.value)}
                                    />
                                </Form.Input>
                            </Form.Group>
                            <Form.Group>
                            <Form.Select
	                            required
	        fluid
            width={16}
	tabIndex='3'
	placeholder='Selecione'
	label='Categoria'
	options={listaCategoria}
	value={idCategoria}
	onChange={(e,{value}) => {
		setIdCategoria(value)
	}}
/>

                            </Form.Group>
                            <Form.Group>
                                <Form.TextArea
                                    required
                                    fluid
                                    label='Descrição'
                                    maxLength="100"
                                    width={16}
                                    value={descricao}
                                    onChange={e => setDescricao(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Input
                                    fluid
                                    label='Valor Unitário'
                                    width={6}>
                                    <CurrencyInput
                                        prefix="R$ "
                                        decimalSeparator=","
                                        groupSeparator="."
                                        value={valorUnitario}
                                        onValueChange={(value) => setValorUnitario(value)}
                                    />
                                </Form.Input>
                                <Form.Input
                                    fluid
                                    label='Tempo de entrega mínimo em minutos'
                                    width={6}>
                                    <input
                                        placeholder="30"
                                        value={tempoEntregaMinimo}
                                        onChange={e => setTempoEntregaMinimo(e.target.value)}
                                    />
                                </Form.Input>
                                <Form.Input
                                    fluid
                                    label='Tempo de entrega máximo em minutos'
                                    width={6}>
                                    <input
                                        placeholder="40"
                                        value={tempoEntregaMaximo}
                                        onChange={e => setTempoEntregaMaximo(e.target.value)}
                                    />
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
                                as={Link}
                                to='/list-produto'>
                                <Icon name='reply' />
                                Voltar
                            </Button>
                            <Button
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='blue'
                                floated='right'
                                onClick={() => salvar()}>
                                <Icon name='save' />
                                Salvar
                            </Button>
                        </div>
                    </div>
                </Container>
            </div>
            <ToastContainer />
        </div>
    );
}
