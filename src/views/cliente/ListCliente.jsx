import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Icon, Table, Modal, Header, Form, Input, List } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';
import InputMask from 'react-input-mask';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ListCliente() {
    const [lista, setLista] = useState([]);
    const [openRemoveModal, setOpenRemoveModal] = useState(false);
    const [openAddressModal, setOpenAddressModal] = useState(false);
    const [idRemover, setIdRemover] = useState();
    const [enderecos, setEnderecos] = useState([]);
    const [endereco, setEndereco] = useState({
        rua: '',
        numero: '',
        bairro: '',
        cep: '',
        cidade: '',
        estado: '',
        complemento: ''
    });
    const [selectedClienteId, setSelectedClienteId] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [selectedEnderecoId, setSelectedEnderecoId] = useState(null);

    function confirmaRemover(id) {
        setOpenRemoveModal(true);
        setIdRemover(id);
    }

    async function remover() {
        await axios.delete('http://localhost:8080/api/cliente/' + idRemover)
            .then((response) => {
                toast.success('Cliente removido com sucesso.');
                carregarLista();
            })
            .catch((error) => {
                toast.error('Erro ao remover cliente.');
            });
        setOpenRemoveModal(false);
    }

    useEffect(() => {
        carregarLista();
    }, []);

    function carregarLista() {
        axios.get("http://localhost:8080/api/cliente")
            .then((response) => {
                setLista(response.data);
            });
    }

    function formatarData(dataParam) {
        if (dataParam === null || dataParam === '' || dataParam === undefined) {
            return '';
        }
        let arrayData = dataParam.split('-');
        return arrayData[2] + '/' + arrayData[1] + '/' + arrayData[0];
    }

    async function carregarEnderecos(clienteId) {
        await axios.get(`http://localhost:8080/api/cliente/${clienteId}/enderecos`)
            .then((response) => {
                setEnderecos(response.data);
            })
            .catch((error) => {
                toast.error('Erro ao carregar endereços.');
            });
    }

    function abrirModalEnderecos(clienteId) {
        setSelectedClienteId(clienteId);
        carregarEnderecos(clienteId);
        setOpenAddressModal(true);
        setIsEditing(false);
        setIsAdding(false);
    }

    function abrirFormularioAdicionar() {
        setEndereco({
            rua: '',
            numero: '',
            bairro: '',
            cep: '',
            cidade: '',
            estado: '',
            complemento: ''
        });
        setIsEditing(false);
        setIsAdding(true);
    }

    function abrirFormularioEditar(endereco) {
        setEndereco(endereco);
        setSelectedEnderecoId(endereco.id);
        setIsAdding(false);
        setIsEditing(true);
    }

    async function adicionarOuEditarEndereco() {
        if (isEditing) {
            await axios.put(`http://localhost:8080/api/cliente/endereco/${selectedEnderecoId}`, endereco)
                .then((response) => {
                    toast.success('Endereço atualizado com sucesso.');
                    carregarEnderecos(selectedClienteId);
                    setIsEditing(false);
                })
                .catch((error) => {
                    toast.error('Erro ao atualizar endereço.');
                });
        } else {
            await axios.post(`http://localhost:8080/api/cliente/endereco/${selectedClienteId}`, endereco)
                .then((response) => {
                    toast.success('Endereço adicionado com sucesso.');
                    carregarEnderecos(selectedClienteId);
                    setIsAdding(false);
                })
                .catch((error) => {
                    toast.error('Erro ao adicionar endereço.');
                });
        }
        setEndereco({
            rua: '',
            numero: '',
            bairro: '',
            cep: '',
            cidade: '',
            estado: '',
            complemento: ''
        });
    }

    async function removerEndereco(enderecoId) {
        await axios.delete(`http://localhost:8080/api/cliente/endereco/${enderecoId}`)
            .then((response) => {
                toast.success('Endereço removido com sucesso.');
                carregarEnderecos(selectedClienteId);
            })
            .catch((error) => {
                toast.error('Erro ao remover endereço.');
            });
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEndereco({ ...endereco, [name]: value });
    };

    return (
        <div>
            <MenuSistema />
            <div style={{ marginTop: '3%' }}>
                <Container textAlign='justified'>
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
                                    <Table.HeaderCell>Nome</Table.HeaderCell>
                                    <Table.HeaderCell>CPF</Table.HeaderCell>
                                    <Table.HeaderCell>Data de Nascimento</Table.HeaderCell>
                                    <Table.HeaderCell>Fone Celular</Table.HeaderCell>
                                    <Table.HeaderCell>Fone Fixo</Table.HeaderCell>
                                    <Table.HeaderCell textAlign='center'>Ações</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {lista.map(cliente => (
                                    <Table.Row key={cliente.id}>
                                        <Table.Cell>{cliente.nome}</Table.Cell>
                                        <Table.Cell>{cliente.cpf}</Table.Cell>
                                        <Table.Cell>{formatarData(cliente.dataNascimento)}</Table.Cell>
                                        <Table.Cell>{cliente.foneCelular}</Table.Cell>
                                        <Table.Cell>{cliente.foneFixo}</Table.Cell>
                                        <Table.Cell textAlign='center'>
                                            <Button
                                                inverted
                                                circular
                                                color='green'
                                                title='Clique aqui para editar os dados deste cliente'
                                                icon
                                            >
                                                <Link to="/form-cliente" state={{ id: cliente.id }} style={{ color: 'green' }}> <Icon name='edit' /> </Link>
                                            </Button> &nbsp;
                                            <Button
                                                inverted
                                                circular
                                                color='red'
                                                title='Clique aqui para remover este cliente'
                                                icon
                                                onClick={() => confirmaRemover(cliente.id)}
                                            >
                                                <Icon name='trash' />
                                            </Button> &nbsp;
                                            <Button
                                                inverted
                                                circular
                                                color='blue'
                                                title='Gerenciar endereços deste cliente'
                                                icon
                                                onClick={() => abrirModalEnderecos(cliente.id)}
                                            >
                                                <Icon name='address book' />
                                            </Button>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </div>
                </Container>
            </div>
            <Modal
                basic
                onClose={() => setOpenRemoveModal(false)}
                onOpen={() => setOpenRemoveModal(true)}
                open={openRemoveModal}
            >
                <Header icon>
                    <Icon name='trash' />
                    <div style={{ marginTop: '5%' }}> Tem certeza que deseja remover esse registro? </div>
                </Header>
                <Modal.Actions>
                    <Button basic color='red' inverted onClick={() => setOpenRemoveModal(false)}>
                        <Icon name='remove' /> Não
                    </Button>
                    <Button color='green' inverted onClick={() => remover()}>
                        <Icon name='checkmark' /> Sim
                    </Button>
                </Modal.Actions>
            </Modal>
            <Modal
                onClose={() => setOpenAddressModal(false)}
                onOpen={() => setOpenAddressModal(true)}
                open={openAddressModal}
            >
                <Header icon>
                    <Icon name='address book' />
                    Gerenciar Endereços
                </Header>
                <Modal.Content>
                    {(!isEditing && !isAdding) ? (
                        <div>
                             
                            <Button
                                label='Adicionar Endereço'
                                color='green'
                                circular
                                icon='plus'
                                onClick={() => abrirFormularioAdicionar()}
                            />
                                
                           
                            <List divided relaxed>
                                {enderecos.map(endereco => (
                                    <List.Item key={endereco.id}>
                                        <List.Content floated='right'>
                                            <Button
                                                circular
                                                inverted
                                                color='blue'
                                                icon
                                                onClick={() => abrirFormularioEditar(endereco)}
                                            >
                                                <Icon name='edit' />
                                            </Button>
                                            <Button
                                                circular
                                                inverted
                                                color='red'
                                                icon
                                                onClick={() => removerEndereco(endereco.id)}
                                            >
                                                <Icon name='trash' />
                                            </Button>
                                        </List.Content>
                                        <List.Content>
                                            <List.Header as='a'>{endereco.rua}, {endereco.numero}</List.Header>
                                            <List.Description>{endereco.bairro}, {endereco.cidade} - {endereco.estado}</List.Description>
                                        </List.Content>
                                    </List.Item>
                                ))}
                            </List>
                        </div>
                    ) : (
                        <Form>
                            <Form.Group widths='equal'>
                                <Form.Field
                                    control={Input}
                                    label='Rua'
                                    name='rua'
                                    value={endereco.rua}
                                    onChange={handleInputChange}
                                />
                                <Form.Field
                                    control={Input}
                                    label='Número'
                                    name='numero'
                                    value={endereco.numero}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Field
                                    control={Input}
                                    label='Bairro'
                                    name='bairro'
                                    value={endereco.bairro}
                                    onChange={handleInputChange}
                                />
                                <Form.Field
                                    control={InputMask}
                                    mask='99999-999'
                                    label='CEP'
                                    name='cep'
                                    value={endereco.cep}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Field
                                    control={Input}
                                    label='Cidade'
                                    name='cidade'
                                    value={endereco.cidade}
                                    onChange={handleInputChange}
                                />
                                <Form.Field
                                    control={Input}
                                    label='Estado'
                                    name='estado'
                                    value={endereco.estado}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Field
                                control={Input}
                                label='Complemento'
                                name='complemento'
                                value={endereco.complemento}
                                onChange={handleInputChange}
                            />

                            <div  style={{ marginTop: '4%' }}>
                            <Button
                                type="button"
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='orange'
                                onClick={() => abrirModalEnderecos(selectedClienteId)}
                                
                            >
                                <Icon name='reply' />
                                Voltar
                            </Button>
                            
                            <Button
                                inverted
                                circular
                                color='blue'
                                onClick={() => adicionarOuEditarEndereco()}
                            >
                                <Icon name='save' /> Salvar
                            </Button>
                            </div>
                           
                        </Form>
                    )}
                </Modal.Content>
                <Modal.Actions>
                
                    <Button color='red' onClick={() => setOpenAddressModal(false)}>
                        <Icon name='remove' /> Fechar
                    </Button>
                </Modal.Actions>
            </Modal>
            <ToastContainer />
        </div>
    );
}
