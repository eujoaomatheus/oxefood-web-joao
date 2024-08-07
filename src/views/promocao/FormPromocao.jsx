import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputMask from 'react-input-mask';
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import axios from "axios";
import MenuSistema from "../../MenuSistema";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CurrencyInput from 'react-currency-input-field';


export default function FormPromocao() {

    const navigate = useNavigate();
    const [titulo, setTitulo] = useState();
    const [regra, setRegra] = useState();
    const [valorDesconto, setValorDesconto] = useState();
    const [dataInicio, setDataInicio] = useState();
    const [dataFim, setDataFim] = useState();




    function salvar() {
        let promocaoRequest = {
            titulo: titulo,
            regra: regra,
            valorDesconto: valorDesconto,
            dataInicio: dataInicio,
            dataFim: dataFim
        }

            console.log(promocaoRequest.valorDesconto)
            axios.post("http://localhost:8080/api/promocao", promocaoRequest)
                .then((response) => {
                    toast.success('Promoção cadastrada com sucesso.');
                    setTimeout(() => navigate('/list-promocao'), 2000);
                })
                .catch((error) => {
                    toast.error('Erro ao incluir o Promoção.');
                })
        
    }




    return (
        <div>
            <MenuSistema tela={'promocao'} />
            <div style={{ marginTop: '3%' }}>
                <Container textAlign='justified' >
                    
                        <h2> <span style={{ color: 'darkgray' }}> Promoção &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
                    
                                    
                    <Divider />
                    <div style={{ marginTop: '4%' }}>
                        <Form>
                        <Form.Group widths='equal'>
                                <Form.Input
                                    required
                                    fluid
                                    label='Título'
                                    maxLength="100"
                                    value={titulo}
                                    onChange={e => setTitulo(e.target.value)}
                                />
                                
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.TextArea
                                    
                                    fluid
                                    label='Regra'
                                    maxLength="500"
                                    value={regra}
                                    onChange={e => setRegra(e.target.value)}
                                />
                                
                            </Form.Group>
                            <Form.Group>
                            <Form.Input
                                    fluid
                                    label='Valor Desconto (R$)'
                                    width={6}>
                                    <CurrencyInput
                                        prefix="R$ "
                                        decimalSeparator=","
                                        groupSeparator="."
                                        value={valorDesconto}
                                        onValueChange={(value) => setValorDesconto(value)}
                                    />
                                </Form.Input>
                                <Form.Input
                                    required
                                    fluid
                                    label='A partir de'
                                    width={6}
                                >
                                    <InputMask
                                        mask="99/99/9999"
                                        maskChar={null}
                                        placeholder="Ex: 20/03/1985"
                                        value={dataInicio}
                                        onChange={e => setDataInicio(e.target.value)}
                                    />
                                </Form.Input>
                                <Form.Input
                                    required
                                    fluid
                                    label='Terminando em'
                                    width={6}
                                >
                                    <InputMask
                                        mask="99/99/9999"
                                        maskChar={null}
                                        placeholder="Ex: 20/03/1985"
                                        value={dataFim}
                                        onChange={e => setDataFim(e.target.value)}
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
                                to='/list-promocao'
                            >
                                <Icon name='reply' />
                                Listar
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
            <ToastContainer />
        </div>
    );
}
