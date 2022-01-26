import { GetStaticPaths, GetStaticProps } from "next";
import { useCallback, useMemo, useState } from "react";
import client from "../../api/graphcms";
import { GET_PAIR_BY_SLUG } from "../../api/graphql/query/getPair";
import Banner from "../../components/banner/banner";
import Pair from "../../types/pair";
import ReactMarkdown from "react-markdown";
import classNames from "classnames";

import s from "./casal.module.css";
import { ProductCard } from "../../components/productCard/productCard";

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

  console.log(pair);

  return {
    props: {
      pair,
    },
  };
};

export default function CasalHome({ pair }: { pair: Pair }) {
  const [currentCategory, setCurrentCategory] = useState("Todas");
  const [currentPriceSort, setCurrentPriceSort] = useState("MIN");

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

  const handleChangeCategory = useCallback((newCategory: string) => {
    setCurrentCategory(newCategory);
  }, []);

  const handleChangePriceSort = useCallback((sort: string) => {
    setCurrentPriceSort(sort);
  }, []);

  const categoriesOptions = useMemo(() => {
    const categories = pair?.categories.map((category) => ({
      title: category.title,
    }));

    if (!categories || !categories.length) {
      return [
        {
          title: "Todas",
        },
      ];
    }

    return [
      {
        title: "Todas",
      },
      ...categories,
    ];
  }, [pair]);

  const products = useMemo(() => {
    if (currentCategory === "Todas") {
      return pair?.products;
    }

    return pair?.products.filter(
      (product) => product.category.title === currentCategory
    );
  }, [pair, currentCategory]);

  const sortedProducts = useMemo(() => {
    if (currentPriceSort === "MAX") {
      return products?.sort(
        (product1, product2) => product2.price - product1.price
      );
    }

    return products?.sort(
      (product1, product2) => product1.price - product2.price
    );
  }, [products, currentPriceSort]);

  const sortedPriceOptions = useMemo(() => {
    return ["MIN", "MAX"];
  }, []);

  if (!pair) {
    return <span>carregando</span>;
  }

  return (
    <div className="container w-screen h-screen">
      <Banner alt={pair.coulpeName} url={topBanner.url} id={topBanner.id} />
      <section className="about p-5">
        <ReactMarkdown className={classNames(s["markdown-container"])}>
          {pair.about}
        </ReactMarkdown>
      </section>
      <section className="p-5">
        <h3 className="text-2xl text-center mb-6">Nossa lista de presentes</h3>
        <div className="flex iitems-center justify-center flex-col">
          <div className=" mb-4 flex items-center justify-between border p-3 border-b border-gray-200 rounded-md">
            <span>Categorias: </span>
            <select
              className="border-none bg-white"
              onChange={(event) => handleChangeCategory(event.target.value)}
            >
              {categoriesOptions.map((category) => (
                <option key={category.title} value={category.title}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center justify-between border p-3 border-b border-gray-200 rounded-md">
            <span>Preco: </span>
            <select
              className="border-none bg-white"
              onChange={(event) => handleChangePriceSort(event.target.value)}
            >
              {sortedPriceOptions.map((sortType) => (
                <option key={sortType} value={sortType}>
                  {sortType === "MAX" ? "Maior Preço" : "Menor Preço"}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center ">
          {sortedProducts.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </section>
    </div>
  );
}
