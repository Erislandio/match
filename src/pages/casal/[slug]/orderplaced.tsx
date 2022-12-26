import classNames from "classnames";
import Router from "next/router";
import { useEffect, useMemo, useState } from "react";
import { CHECKOUT_ITEMS_KEY } from "../../../components/productCard/productCard";
import { CartItem } from "./cart";

import s from "./casal.module.css";

export default function Orderplaced() {
  const [items] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      const localStorageItems = localStorage.getItem(CHECKOUT_ITEMS_KEY);

      if (!localStorageItems) {
        return [];
      }

      return JSON.parse(
        localStorage.getItem(CHECKOUT_ITEMS_KEY) ?? "[]"
      ) as CartItem[];
    }

    return [];
  });

  useEffect(() => {
    if (!items.length) {
      Router.push("/casal/eris-jessica");
    }
  }, []);

  const formateditem = useMemo(() => {
    return items.map((item) => (
      <li
        className={classNames(s["cart-item"], "w-full mb-4 relative")}
        key={item.stripeId}
      >
        <div className="flex items-start justify-start w-full">
          <img
            src={item.image}
            alt={item.name}
            title={item.name}
            width={120}
            height={120}
          />
          <div className="p-4">
            <h4 className="font-light text-sm">{item.name}</h4>
            <span className="text-red-400 font-extrabold text-base flex flex-col">
              {item.price.toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
            <span className="font-light text-sm">
              Quantidade: <b>{item.quantity}</b>
            </span>
          </div>
        </div>
      </li>
    ));
  }, [items]);

  const totalItems = useMemo(() => {
    return items.reduce(
      (acc, current) => acc + current.quantity * current.price,
      0
    );
  }, [items]);

  if (!items.length) {
    return <div />;
  }

  return (
    <section className="orderplaced p-4">
      <div className="mt-12">
        <div className="pt-4 pb-4 font-light">
          <h1 className="font-bold text-3xl">Compra confirmada!</h1>
          <h2>Agradeçemos muito sua compra!</h2>
          <p>
            Muito obrigado por nos ajudar com a lista de presentes, ficamos
            muito felizes com sua compra!
          </p>
        </div>
      </div>
      <h1 className="font-bold text-2xl mb-2">Lista de compras</h1>
      <div>
        <ul>{formateditem}</ul>
      </div>
      <div className="text-2xl text-red-400 font-extrabold flex items-center justify-between pt-4 pb-4">
        <span>Total: </span>
        <span>
          {totalItems.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          })}
        </span>
      </div>
      <button
        onClick={() => {
          localStorage.setItem(CHECKOUT_ITEMS_KEY, "[]");
          Router.push("/casal/eris-jessica");
        }}
        className={classNames(s["btn-back"], "text-base font-light")}
      >
        Voltar
      </button>
    </section>
  );
}
