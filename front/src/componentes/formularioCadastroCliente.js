import { useEffect, useState } from "react";

export default function FormularioCadastroCliente(props) {
  const [formData, setFormData] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    try {
      const response = await fetch("http://localhost:32832/cliente/cadastrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        console.log("Form submitted successfully");
        props.seletorView('Clientes', event)
      } else {
        console.log("Error submitting form");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name.includes(".")) {
      const [objectKey, nestedKey] = name.split(".");
      setFormData((prevState) => ({
        ...prevState,
        [objectKey]: {
          ...prevState[objectKey],
          [nestedKey]: value
        }
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  return (
    <div className="row">
      <form className="col s12" onSubmit={handleSubmit}>
        <h4>Dados Pessoais</h4>
        <div className="row">
          <div className="input-field col s6">
            <input id="first_name" type="text" placeholder="nome" name="nome" className="validate" onChange={handleInputChange} />
          </div>
          <div className="input-field col s6">
            <input id="last_name" type="text" placeholder="sobrenome" name="sobreNome" className="validate" onChange={handleInputChange} />
          </div>
        </div>
        <h4>Endereço</h4>
        <div className="row">
          <div className="input-field col s6">
            <input id="estado" type="text" placeholder="estado" name="endereco.estado" className="validate" onChange={handleInputChange} />
          </div>
          <div className="input-field col s6">
            <input id="cidade" type="text" placeholder="cidade" name="endereco.cidade" className="validate" onChange={handleInputChange} />
          </div>
        </div>
        <div className="row">
          <div className="input-field col s6">
            <input id="bairro" type="text" placeholder="bairro" name="endereco.bairro" className="validate" onChange={handleInputChange} />
          </div>
          <div className="input-field col s6">
            <input id="rua" type="text" placeholder="rua" name="endereco.rua" className="validate" onChange={handleInputChange} />
          </div>
        </div>
        <div className="row">
          <div className="input-field col s6">
            <input id="numero" type="text" placeholder="numero" name="endereco.numero" className="validate" onChange={handleInputChange} />
          </div>
          <div className="input-field col s6">
            <input id="codigoPostal" type="text" placeholder="codigoPostal" name="endereco.codigoPostal" className="validate" onChange={handleInputChange} />
          </div>
        </div>
        <div className="row">
          <div className="input-field col s6">
            <input id="informacoesAdicionais" type="text" placeholder="informacoesAdicionais" name="endereco.informacoesAdicionais" className="validate" onChange={handleInputChange} />
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            <button className='btn' type="submit" name="action">Submit
              <i className="material-icons right">send</i>
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}