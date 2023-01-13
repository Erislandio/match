import classNames from "classnames";
import { GetStaticPaths, GetStaticProps } from "next";
import { useMemo } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import client from "../../../api/graphcms";
import { GET_PAIR_BY_SLUG } from "../../../api/graphql/query/getPair";
import Banner from "../../../components/banner/banner";
import Pair from "../../../types/pair";

import ReactCountDown, { CountdownRenderProps } from "react-countdown";

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

const renderCountDown = (props: CountdownRenderProps) => {
  const { days, hours, minutes, seconds } = props;

  return (
    <div className="text-black text-2xl flex flex-row justify-between">
      <CountItem value={days} label="Dia" />
      <CountItem value={hours} label="Hora" />
      <CountItem value={minutes} label="Minuto" />
      <CountItem value={seconds} label="Segundo" />
    </div>
  );
};

const CountItem = ({ value, label }: { value: number; label: string }) => {
  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{
        background: "#d45824",
        color: "#fff",
        minWidth: "75px",
        minHeight: "75px",
        borderRadius: "50%",
        padding: "1rem",
        width: "65px",
        height: "65px",
      }}
    >
      <span className="text-2xl">{value}</span>
      <span className="text-base block mx-2">
        {value > 1 ? `${label}s` : label}
      </span>
    </div>
  );
};

const formateDate = (date: string): Date => {
  const [year, month, day] = date.split("-");

  return new Date(`${month}/${day}/${year}`);
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
        <h4 className={s["count-down-title"]}>
          A contagem regressiva já começou e aguardamos ansiosos!
        </h4>
        <ReactCountDown
          renderer={renderCountDown}
          date={formateDate(pair.date)}
        />
      </section>
    </div>
  );
}
