/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from "react";

export default function EditaCliente(props) {
  const [cliente, setCliente] = useState({})
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchCliente(props.id);
  }, []);

  async function fetchCliente(id) {
    try {
      let resp = await fetch(`http://localhost:32832/cliente/${id}`);
      const resp_json = await resp.json();
      resp_json["id"] = id;
      console.log(resp_json);
      setCliente(resp_json);
      setFormData(resp_json);
    } catch (e) {
      console.log(e);
    }
  }

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    try {
      const response = await fetch("http://localhost:32832/cliente/atualizar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        console.log("Form submitted successfully");
      } else {
        console.log("Error submitting form");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (Object.keys(formData).length === 0) {
    return <div>Loading...</div>;
  }
  return (
    <div className="row">
      <form className="col s12" onSubmit={handleSubmit}>
        <h4>Dados Pessoais</h4>
        <div className="row">
          <div className="input-field col s6">
            <input id="first_name" type="text" placeholder="nome" name="nome" defaultValue={formData.nome} className="validate" onChange={handleInputChange} />
          </div>
          <div className="input-field col s6">
            <input id="last_name" type="text" placeholder="sobrenome" name="sobreNome" defaultValue={formData.sobreNome} className="validate" onChange={handleInputChange} />
          </div>
        </div>
        <h4>Endereço</h4>
        <div className="row">
          <div className="input-field col s6">
            <input id="estado" type="text" placeholder="estado" name="endereco.estado" defaultValue={formData.endereco.estado} className="validate" onChange={handleInputChange} />
          </div>
          <div className="input-field col s6">
            <input id="cidade" type="text" placeholder="cidade" name="endereco.cidade" defaultValue={formData.endereco.cidade} className="validate" onChange={handleInputChange} />
          </div>
        </div>
        <div className="row">
          <div className="input-field col s6">
            <input id="bairro" type="text" placeholder="bairro" name="endereco.bairro" defaultValue={formData.endereco.bairro} className="validate" onChange={handleInputChange} />
          </div>
          <div className="input-field col s6">
            <input id="rua" type="text" placeholder="rua" name="endereco.rua" defaultValue={formData.endereco.rua} className="validate" onChange={handleInputChange} />
          </div>
        </div>
        <div className="row">
          <div className="input-field col s6">
            <input id="numero" type="text" placeholder="numero" name="endereco.numero" defaultValue={formData.endereco.numero} className="validate" onChange={handleInputChange} />
          </div>
          <div className="input-field col s6">
            <input id="codigoPostal" type="text" placeholder="codigoPostal" name="endereco.codigoPostal" defaultValue={formData.endereco.codigoPostal} className="validate" onChange={handleInputChange} />
          </div>
        </div>
        <div className="row">
          <div className="input-field col s6">
            <input id="informacoesAdicionais" type="text" placeholder="informacoesAdicionais" name="endereco.informacoesAdicionais" defaultValue={formData.endereco.informacoesAdicionais} className="validate" onChange={handleInputChange} />
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
