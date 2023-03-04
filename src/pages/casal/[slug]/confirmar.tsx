import { gql } from "graphql-request";
import { useState } from "react";
import { toast } from "react-toastify";
import client from "../../../api/graphcms";

const CRATE_CONVIDADO = gql`
  mutation CriarConvidado($name: String!) {
    createConvidado(data: { name: $name }) {
      name
    }
  }
`;
const BUSCAR_CONVIDADO = gql`
  query BuscarConvidado($name: String!) {
    convidado(where: { name: $name }) {
      id
    }
  }
`;

const PUBLICAR_CONVIDADO = gql`
  mutation PublishConvidado($name: String) {
    publishConvidado(where: { name: $name }) {
      id
    }
  }
`;

export interface Convidado {
  id: string;
}

export interface ConvidadoResponse {
  convidado: Convidado;
}

export default function Confirmar() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);

      const exists = await client.request<ConvidadoResponse, { name: string }>(
        BUSCAR_CONVIDADO,
        {
          name: name.toUpperCase(),
        }
      );

      if (exists?.convidado?.id) {
        return toast.warn(`${name} Já está está com a presença confirmada!`);
      }

      await client.request(CRATE_CONVIDADO, {
        name: name.toUpperCase(),
      });

      await client.request(PUBLICAR_CONVIDADO, {
        name: name.toUpperCase(),
      });

      setName("");

      return toast.success(`${name} sua presença foi confirmada! `);
    } catch (error) {
      console.log(error);
      toast.error("Não foi possílve confimar sua presença no momento!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="confirmar h-screen flex items-center justify-center p-4 flex-col">
      <h1 className="text-2xl mb-4">Ops! a confirmação está indisponível...</h1>
      <form
        className="flex flex-col justify-between items-center p-4 w-full"
        style={{
          border: "1px solid #dedede",
        }}
      >
        <input
          value={name.toUpperCase()}
          className="p-2 w-full"
          style={{
            border: "1px solid #dedede",
          }}
          disabled
          onChange={(event) => setName(event.target.value)}
          placeholder="Nome"
        />
        <button
          className=" mt-2 w-full text-white p-2"
          disabled
          onClick={handleClick}
          style={{
            background: "#d45824",
          }}
        >
          Indisponível
        </button>
      </form>
    </section>
  );
}
