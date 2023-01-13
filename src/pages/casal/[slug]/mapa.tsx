import { GetStaticPaths, GetStaticProps } from "next";
import client from "../../../api/graphcms";
import { GET_MAPS_QUERY } from "../../../api/graphql/query/getMapas";

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};

interface MapaResponse {
  localizacao: string;
  iframe: string;
  descricao: string;
  imagens: any[];
}

import s from "./casal.module.css";

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const content = await client.request<{ mapas: MapaResponse[] }>(
    GET_MAPS_QUERY
  );

  return {
    props: {
      map: content?.mapas?.length ? content.mapas[0] : null,
    },
  };
};

export default function Mapa({ map }: { map: MapaResponse }) {
  if (!map) {
    return <div />;
  }

  return (
    <section id="map-section" className={s["map-section"]}>
      <h1>{map.localizacao}</h1>
      <div className={s["map-imagem"]}>
        <img src={map.imagens[0].url} />
      </div>
      <div className={s["map-description"]}>
        <p>{map.descricao}</p>
      </div>
      <div
        className={s["map-iframe"]}
        dangerouslySetInnerHTML={{
          __html: map.iframe,
        }}
      ></div>
    </section>
  );
}
