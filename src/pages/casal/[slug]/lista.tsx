import { GetStaticPaths, GetStaticProps } from "next";
import client from "../../../api/graphcms";
import { GET_CONVIDADOS } from "../../../api/graphql/query/getPair";

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const { convidados } = await client.request<{
    convidados: Array<{ name: string }>;
  }>(GET_CONVIDADOS, {
    pairName: slug,
  });

  return {
    revalidate: 60,
    props: {
      convidados,
    },
  };
};

import s from "./casal.module.css";

export default function Lista({
  convidados,
}: {
  convidados: Array<{ name: string }>;
}) {
  return (
    <section className="p-4 relative top-16 pb-20">
      <table className={s["table"]}>
        <tr>
          <th>Posição</th>
          <th>Nome</th>
        </tr>
        {convidados
          ?.filter((item) => item.name)
          .map((item, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{item.name}</td>
            </tr>
          ))}
      </table>
    </section>
  );
}
