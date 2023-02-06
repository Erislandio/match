import { GetStaticPaths, GetStaticProps } from "next";
import { useCallback, useMemo, useState } from "react";
import client from "../../../api/graphcms";
import { GET_PAIR_BY_SLUG } from "../../../api/graphql/query/getPair";
import Pair from "../../../types/pair";

import { ProductCard } from "../../../components/productCard/productCard";

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
    revalidate: 60,
    props: {
      pair,
    },
  };
};

export default function CasalHome({ pair }: { pair: Pair }) {
  const [currentCategory, setCurrentCategory] = useState("Todas");
  const [currentPriceSort, setCurrentPriceSort] = useState("MIN");

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
      (product) => product?.category?.title === currentCategory
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
    <section className="p-4 pt-14">
      <h3 className="text-2xl text-center mb-6">Nossa lista de presentes</h3>
      <div className="flex iitems-center justify-center flex-col">
        <div className=" mb-4 flex items-center justify-between border p-3 border-b border-gray-200 rounded-md">
          <span>Categorias: </span>
          <select
            className="border-none bg-white"
            onChange={(event) => handleChangeCategory(event.target.value)}
            style={{ minWidth: "150px" }}
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
            style={{ minWidth: "150px" }}
          >
            {sortedPriceOptions.map((sortType) => (
              <option key={sortType} value={sortType}>
                {sortType === "MAX" ? "Maior Preço" : "Menor Preço"}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className=" mt-5 grid gap-1 flex-col items-center justify-center grid-cols-2">
        {sortedProducts.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </section>
  );
}
