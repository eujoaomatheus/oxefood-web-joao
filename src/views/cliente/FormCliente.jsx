import React, { useEffect, useState } from 'react'
import InputMask from 'react-input-mask'
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react'
import MenuSistema from '../MenuSistema'
import { Link, useLocation,useNavigate  } from 'react-router-dom'
import axios from 'axios'



export default function FormCliente() {
  const [nome, setNome] = useState()
  const [cpf, setCPF] = useState()
  const [dataNascimento, setDataNascimento] = useState()
  const [foneCelular, setFoneCelular] = useState()
  const [foneFixo, setFoneFixo] = useState()
  const { state } = useLocation();
  const [idCliente, setIdCliente] = useState();

  const navigate = useNavigate();
  function formatarData(dataParam) {

    if (dataParam === null || dataParam === '' || dataParam === undefined) {
        return ''
    }

    let arrayData = dataParam.split('-');
    return arrayData[2] + '/' + arrayData[1] + '/' + arrayData[0];
}

 useEffect(() => {
        if (state != null && state.id != null) {
            axios.get("http://localhost:8080/api/cliente/" + state.id)
                .then((response) => {
                    setIdCliente(response.data.id)
                    setNome(response.data.nome)
                    setCPF(response.data.cpf)
                    setDataNascimento(formatarData(response.data.dataNascimento))
                    setFoneCelular(response.data.foneCelular)
                    setFoneFixo(response.data.foneFixo)
                })
        }
    }, [state])

function salvar() {

       let clienteRequest = {
           nome: nome,
           cpf: cpf,
           dataNascimento: dataNascimento,
           foneCelular: foneCelular,
           foneFixo: foneFixo
       }
       if (idCliente != null) { //Alteração:
           axios.put("http://localhost:8080/api/cliente/" + idCliente, clienteRequest)
           .then(response => { console.log('Cliente alterado com sucesso.',JSON.stringify(response,null,2))},setTimeout(navigate('/list-cliente'),2000))
           .catch(error => { console.log('Erro ao alterar um cliente.',JSON.stringify(error,null,2)) })
       } else { //Cadastro:
           axios.post("http://localhost:8080/api/cliente", clienteRequest)
           .then((response) => { console.log('Cliente cadastrado com sucesso.',JSON.stringify(response,null,2)) },)
           .catch((error) => { console.log('Erro ao incluir o cliente.',JSON.stringify(error,null,2)) })
       }
}


  return (
    <div>
      <MenuSistema tela={'cliente'} />

      <div style={{ marginTop: '3%' }}>
        <Container textAlign='justified'>
        { idCliente === undefined &&
          <h2> <span style={{color: 'darkgray'}}> Cliente &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
        }
        { idCliente !== undefined &&
          <h2> <span style={{color: 'darkgray'}}> Cliente &nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>
        }


          <Divider />

          <div style={{ marginTop: '4%' }}>
            <Form>
              <Form.Group widths='equal'>
                <Form.Input
                  required
                  fluid
                  label='Nome'
                  maxLength='100'
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />

                <Form.Input
                  required
                  fluid
                  label='CPF'
                >
                  <InputMask
                    required
                    mask='999.999.999-99'
                    value={cpf}
                    onChange={(e)  => setCPF(e.target.value)}
                  />
                </Form.Input>
              </Form.Group>

              <Form.Group>
                <Form.Input
                  fluid
                  label='Fone Celular'
                  width={6}
                >
                  <InputMask mask='(99) 9999.9999' 
                  onChange={(e) => setFoneCelular(e.target.value)}
                  value={foneCelular}/>
                </Form.Input>

                <Form.Input
                  fluid
                  label='Fone Fixo'
                  width={6}
                >
                  <InputMask 
                  onChange={(e) => setFoneFixo(e.target.value)}
                  value={foneFixo}
                  mask='(99) 9999.9999' />
                </Form.Input>

                <Form.Input
                  fluid
                  label='Data Nascimento'
                  width={6}
                >
                  <InputMask
                    mask='99/99/9999'
                    maskChar={null}
                    value={dataNascimento}
                    onChange={(e) => setDataNascimento(e.target.value)}
                    placeholder='Ex: 20/03/1985'
                  />
                </Form.Input>
              </Form.Group>
            </Form>

            <div style={{ marginTop: '4%' }}>
              <Button
                type='button'
                inverted
                circular
                icon
                labelPosition='left'
                color='orange'
              >
                <Icon name='reply' />
                <Link to={'/list-cliente'}>Voltar</Link>
              </Button>

              <Button
                inverted
                circular
                icon
                labelPosition='left'
                color='blue'
                floated='right' onClick={() => salvar()}
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
