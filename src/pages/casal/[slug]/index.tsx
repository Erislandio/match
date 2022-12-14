import classNames from "classnames";
import { GetStaticPaths, GetStaticProps } from "next";
import { useMemo } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import client from "../../../api/graphcms";
import { GET_PAIR_BY_SLUG } from "../../../api/graphql/query/getPair";
import Banner from "../../../components/banner/banner";
import Pair from "../../../types/pair";

import s from "./casal.module.css";

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const { pair } = await client.request<{ pair: Pair }>(GET_PAIR_BY_SLUG, {
    pairName: slug,
  });

  return {
    props: {
      pair,
    },
  };
};

export default function CasalPage({ pair }: { pair: Pair }) {
  const topBanner = useMemo(() => {
    const topBanner = pair?.banners.find((banner) => banner.position === "TOP");

    if (!topBanner || !pair) {
      return {
        url: `https://via.placeholder.com/350x500?text=${pair?.coulpeName}`,
        id: "12344",
      };
    }

    return {
      url: topBanner.image[0].url,
      id: topBanner.image[0].id,
    };
  }, [pair]);

  if (!pair) {
    return <span>carregando</span>;
  }

  return (
    <div className="container w-screen">
      <Banner
        alt={pair.coulpeName}
        url={topBanner.url}
        id={topBanner.id}
        date={pair.date}
        slug={pair.pairName}
      />
      <section className="about p-5">
        <ReactMarkdown className={classNames(s["markdown-container"])}>
          {pair.about}
        </ReactMarkdown>
      </section>
    </div>
  );
}
