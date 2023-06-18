import { useState } from "react";
import BarraNavegacao from "./barraNavegacao";
import FormularioCadastroCliente from "./formularioCadastroCliente";
import ListaClientes from "./listaClientes";
import EditaCliente from "./editaCliente";

export default function Roteador() {
    const [tela, setTela] = useState('Clientes')
    const [clienteEd, setClienteEd] = useState('')

    const seletorView = (valor, e) => {
        e.preventDefault()
        setTela(valor)
    }

    const construirView = () => {

        if (tela === 'Clientes') {
            return (
                <>
                    <BarraNavegacao seletorView={seletorView} tema="purple lighten-4" botoes={['Clientes']} />
                    <ListaClientes seletorView={seletorView} setClienteEd={setClienteEd} tema="purple lighten-4" />
                    <button className="btn waves-effect waves-light purple lighten-4" onClick={(e) => {setTela("cadastrarCliente")}}>
                        Cadastrar Cliente
                    </button>
                </>
            )
        } else if (tela === 'cadastrarCliente'){
            return (
                <>
                    <BarraNavegacao seletorView={seletorView} tema="purple lighten-4" botoes={['Clientes']} />
                    <FormularioCadastroCliente tema="purple lighten-4" seletorView={seletorView} />
                </>
            )
        } else if (tela === 'editarCliente'){
            return (
                <>
                    <BarraNavegacao seletorView={seletorView} tema="purple lighten-4" botoes={['Clientes']} />
                    <EditaCliente id={clienteEd} />
                </>
            )
        }
    }

    return (
        construirView()
    )
}