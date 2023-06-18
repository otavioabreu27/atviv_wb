/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from "react";

export default function ListaClientes(props) {
    const [clientes, setClientes] = useState([]);

    useEffect(()=>{
        try {
            fetchClientes()
        } catch(e) {
            console.log(e)
        }
    }, [])

    const removeCliente = async (cliente) => {
      try {
        const response = await fetch("http://localhost:32832/cliente/excluir", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(cliente)
        });
  
        if (response.ok) {
          console.log("Form submitted successfully");
          props.seletorView('Clientes');
        } else {
          console.log("Error submitting form");
        }
      } catch (error) {
        console.log(error);
      }
    }

    function listarClientes(clientes, seletorView, setClienteEd){
        return(
            clientes.map((cliente)=>{
                return (
                    <a key={cliente.id} className="collection-item">
                        <p>{cliente.nome}</p>
                        <button className="btn waves" onClick={(e)=> {
                            seletorView('editarCliente', e)
                            setClienteEd(cliente.id)
                        }}>Editar</button>
                        <button className="btn waves pl-2" onClick={(e)=> {
                            seletorView('Clientes', e)
                            removeCliente(cliente)
                        }}>Excluir</button>
                        </a>
                )
            })
        )
    }

    async function fetchClientes() {
        let resp = await fetch("http://localhost:32832/clientes")
        const resp_json =  await resp.json()
        console.log(resp_json)
        setClientes(resp_json)
    }
    
    
    return (
            <div className="collection">
                {listarClientes(clientes, props.seletorView, props.setClienteEd)}
            </div>
    )
}
