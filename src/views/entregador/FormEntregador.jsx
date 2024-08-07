import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import InputMask from 'react-input-mask';
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import axios from "axios";
import MenuSistema from "../../MenuSistema";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CurrencyInput from 'react-currency-input-field';


const options = [
    { key: 'AC', text: 'Acre', value: 'AC' },
    { key: 'AL', text: 'Alagoas', value: 'AL' },
    { key: 'AP', text: 'Amapá', value: 'AP' },
    { key: 'AM', text: 'Amazonas', value: 'AM' },
    { key: 'BA', text: 'Bahia', value: 'BA' },
    { key: 'CE', text: 'Ceará', value: 'CE' },
    { key: 'DF', text: 'Distrito Federal', value: 'DF' },
    { key: 'ES', text: 'Espírito Santo', value: 'ES' },
    { key: 'GO', text: 'Goiás', value: 'GO' },
    { key: 'MA', text: 'Maranhão', value: 'MA' },
    { key: 'MT', text: 'Mato Grosso', value: 'MT' },
    { key: 'MS', text: 'Mato Grosso do Sul', value: 'MS' },
    { key: 'MG', text: 'Minas Gerais', value: 'MG' },
    { key: 'PA', text: 'Pará', value: 'PA' },
    { key: 'PB', text: 'Paraíba', value: 'PB' },
    { key: 'PR', text: 'Paraná', value: 'PR' },
    { key: 'PE', text: 'Pernambuco', value: 'PE' },
    { key: 'PI', text: 'Piauí', value: 'PI' },
    { key: 'RJ', text: 'Rio de Janeiro', value: 'RJ' },
    { key: 'RN', text: 'Rio Grande do Norte', value: 'RN' },
    { key: 'RS', text: 'Rio Grande do Sul', value: 'RS' },
    { key: 'RO', text: 'Rondônia', value: 'RO' },
    { key: 'RR', text: 'Roraima', value: 'RR' },
    { key: 'SC', text: 'Santa Catarina', value: 'SC' },
    { key: 'SP', text: 'São Paulo', value: 'SP' },
    { key: 'SE', text: 'Sergipe', value: 'SE' },
    { key: 'TO', text: 'Tocantins', value: 'TO' },
];

export default function FormEntregador() {

    const { state } = useLocation();
    const navigate = useNavigate();
    const [idEntregador, setIdEntregador] = useState();
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [rg, setRg] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [foneCelular, setFoneCelular] = useState('');
    const [foneFixo, setFoneFixo] = useState('');
    const [qtdEntregasRealizadas, setQtdEntregasRealizadas] = useState('');
    const [valorFrete, setValorFrete] = useState('');
    const [enderecoRua, setEnderecoRua] = useState('');
    const [enderecoNumero, setEnderecoNumero] = useState('');
    const [enderecoBairro, setEnderecoBairro] = useState('');
    const [enderecoCidade, setEnderecoCidade] = useState('');
    const [enderecoUf, setEnderecoUf] = useState('');
    const [enderecoCep, setEnderecoCep] = useState('');
    const [enderecoComplemento, setEnderecoComplemento] = useState('');
    const [ativo, setAtivo] = useState('');

    function formatarData(dataParam) {

        if (dataParam === null || dataParam === '' || dataParam === undefined) {
            return ''
        }
    
        let arrayData = dataParam.split('-');
        
        return arrayData[2] + '/' + arrayData[1] + '/' + arrayData[0];
    }

    useEffect(() => {
        if (state != null && state.id != null) {
            axios.get(`http://localhost:8080/api/entregador/${state.id}`)
                .then((response) => {
                    const data = response.data;
                    setIdEntregador(data.id);
                    setNome(data.nome);
                    setCpf(data.cpf);
                    setRg(data.rg);
                    setDataNascimento(data.dataNascimento);
                    setFoneCelular(data.foneCelular);
                    setFoneFixo(data.foneFixo);
                    setQtdEntregasRealizadas(data.qtdEntregasRealizadas);
                    setValorFrete(data.valorFrete);
                    setEnderecoRua(data.enderecoRua);
                    setEnderecoNumero(data.enderecoNumero);
                    setEnderecoBairro(data.enderecoBairro);
                    setEnderecoCidade(data.enderecoCidade);
                    setEnderecoUf(data.enderecoUf);
                    setEnderecoCep(data.enderecoCep);
                    setEnderecoComplemento(data.enderecoComplemento);
                    setAtivo(data.ativo ? '1' : '0');
                })
                .catch((error) => {
                    toast.error('Erro ao carregar os dados do entregador.');
                });
        }
    }, [state]);

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
        
        let entregadorRequest = {
            nome: nome,
            cpf: cpf,
            rg: rg,
            dataNascimento: formatarData(dataNascimento),
            foneCelular: foneCelular,
            foneFixo: foneFixo,
            qtdEntregasRealizadas: qtdEntregasRealizadas,
            valorFrete: parseMoney(valorFrete),
            enderecoRua: enderecoRua,
            enderecoNumero: enderecoNumero,
            enderecoBairro: enderecoBairro,
            enderecoCidade: enderecoCidade,
            enderecoUf: enderecoUf,
            enderecoCep: enderecoCep,
            enderecoComplemento: enderecoComplemento,
            ativo: ativo === '1'
        };

        const axiosRequest = idEntregador != null 
            ? axios.put(`http://localhost:8080/api/entregador/${idEntregador}`, entregadorRequest)
            : axios.post("http://localhost:8080/api/entregador", entregadorRequest);

        axiosRequest.then((response) => {
            toast.success('Entregador salvo com sucesso.');
            setTimeout(() => navigate('/list-entregador'), 2000);
        }).catch((error) => {
            toast.error('Erro ao salvar o entregador.');
        });
    }

    const handleRadioChange = (e, { value }) => {
        setAtivo(value);
    };

    return (
        <div>
            <MenuSistema tela={'entregador'} />
            <div style={{ marginTop: '3%' }}>
                <Container textAlign='justified'>
                    <h2>
                        <span style={{ color: 'darkgray' }}>
                            Entregador &nbsp;<Icon name='angle double right' size="small" />
                        </span>
                        {idEntregador === undefined ? 'Cadastro' : 'Alteração'}
                    </h2>
                    <Divider />
                    <div style={{ marginTop: '4%' }}>
                        <Form>
                            <Form.Group>
                                <Form.Input
                                    required
                                    fluid
                                    label='Nome'
                                    maxLength="100"
                                    width={8}
                                    value={nome}
                                    onChange={e => setNome(e.target.value)}
                                />
                                <Form.Input
                                    required
                                    fluid
                                    width={4}
                                    label='CPF'>
                                    <InputMask
                                        required
                                        mask="999.999.999-99"
                                        value={cpf}
                                        onChange={e => setCpf(e.target.value)}
                                    />
                                </Form.Input>
                                <Form.Input
                                    required
                                    fluid
                                    width={4}
                                    label='RG'
                                    maxLength="10"
                                    value={rg}
                                    onChange={e => setRg(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group widths={"equal"}>
                                <Form.Input
                                    required
                                    fluid
                                    label='Data de Nascimento'
                                    value={dataNascimento}
                                    onChange={e => setDataNascimento(e.target.value)}
                                />
                                <Form.Input
                                    required
                                    fluid
                                    label='Fone Celular'>
                                    <InputMask
                                        required
                                        mask="(99) 9999.9999"
                                        value={foneCelular}
                                        onChange={e => setFoneCelular(e.target.value)}
                                    />
                                </Form.Input>
                                <Form.Input
                                    required
                                    fluid
                                    label='Fone Fixo'>
                                    <InputMask
                                        required
                                        mask="(99) 9999.9999"
                                        value={foneFixo}
                                        onChange={e => setFoneFixo(e.target.value)}
                                    />
                                </Form.Input>
                                <Form.Input
                                    fluid
                                    label='Quantidade de Entregas Realizadas'
                                    value={qtdEntregasRealizadas}
                                    onChange={e => setQtdEntregasRealizadas(e.target.value)}
                                />
                                <Form.Input
                                    fluid
                                    label='Valor Por Frete'>
                                    <CurrencyInput
                                        prefix="R$ "
                                        decimalSeparator=","
                                        groupSeparator="."
                                        value={valorFrete}
                                        onValueChange={(value) => setValorFrete(value)}
                                    />
                                </Form.Input>
                            </Form.Group>
                            <Form.Group>
                                <Form.Input
                                    fluid
                                    label='Rua'
                                    width={16}
                                    value={enderecoRua}
                                    onChange={e => setEnderecoRua(e.target.value)}
                                />
                                <Form.Input
                                    fluid
                                    label='Número'
                                    width={4}
                                    value={enderecoNumero}
                                    onChange={e => setEnderecoNumero(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Input
                                    fluid
                                    label='Bairro'
                                    width={7}
                                    value={enderecoBairro}
                                    onChange={e => setEnderecoBairro(e.target.value)}
                                />
                                <Form.Input
                                    fluid
                                    label='Cidade'
                                    width={7}
                                    value={enderecoCidade}
                                    onChange={e => setEnderecoCidade(e.target.value)}
                                />
                                <Form.Input
                                    required
                                    fluid
                                    width={3}
                                    label='CEP'>
                                    <InputMask
                                        required
                                        mask="99 999-999"
                                        value={enderecoCep}
                                        onChange={e => setEnderecoCep(e.target.value)}
                                    />
                                </Form.Input>
                            </Form.Group>
                            <Form.Group>
                                <Form.Select
                                    label='UF'
                                    width={16}
                                    placeholder="Selecione"
                                    options={options}
                                    value={enderecoUf}
                                    onChange={(e, { value }) => setEnderecoUf(value)}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Input
                                    fluid
                                    label='Complemento'
                                    width={16}
                                    value={enderecoComplemento}
                                    onChange={e => setEnderecoComplemento(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Field>
                                    <label style={{ fontWeight: "bold" }}>Ativo: </label>
                                </Form.Field>
                                <Form.Radio
                                    label='Sim'
                                    value='1'
                                    name="ativo"
                                    checked={ativo === '1'}
                                    onChange={handleRadioChange}
                                />
                                <Form.Radio
                                    name="ativo"
                                    label='Não'
                                    value='0'
                                    checked={ativo === '0'}
                                    onChange={handleRadioChange}
                                />
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
                                to='/list-entregador'
                            >
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