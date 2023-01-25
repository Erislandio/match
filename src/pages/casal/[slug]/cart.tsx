import classNames from "classnames";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { CHECKOUT_ITEMS_KEY } from "../../../components/productCard/productCard";

export interface CartItem {
  price: number;
  quantity: number;
  stripeId: string;
  image: string;
  name: string;
}

enum InputStepper {
  minus = "menos",
  plus = "mais",
}

import s from "./casal.module.css";

export default function PreviewPage() {
  const { back } = useRouter();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const localStorageItems = localStorage.getItem(CHECKOUT_ITEMS_KEY);

      if (!localStorageItems) {
        return;
      }

      return setItems(
        JSON.parse(
          localStorage.getItem(CHECKOUT_ITEMS_KEY) ?? "[]"
        ) as CartItem[]
      );
    }

    return setItems([]);
  }, []);

  const handleRemoveProduct = (id: string) => {
    const newProducts = items.filter((item) => item.stripeId !== id);
    localStorage.setItem(CHECKOUT_ITEMS_KEY, JSON.stringify(newProducts));
    setItems(newProducts);
  };

  const handleChangeQuantity = (id: string, type: InputStepper) => {
    const newitems = items.map((item) => {
      if (item.stripeId === id) {
        if (type === InputStepper.minus && item.quantity > 1) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }

        if (type === InputStepper.plus && item.quantity < 10) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
      }

      return item;
    });
    setItems(newitems);
    localStorage.setItem(CHECKOUT_ITEMS_KEY, JSON.stringify(newitems));
  };

  const formateditem = items.map((item) => (
    <li
      className={classNames(s["cart-item"], "w-full mb-4 relative")}
      key={item.stripeId}
    >
      <button
        onClick={() => handleRemoveProduct(item.stripeId)}
        className="bg-transparent botder-none absolute right-2 top-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20">
          <path d="M6.5 17q-.625 0-1.062-.438Q5 16.125 5 15.5v-10H4V4h4V3h4v1h4v1.5h-1v10q0 .625-.438 1.062Q14.125 17 13.5 17Zm7-11.5h-7v10h7ZM8 14h1.5V7H8Zm2.5 0H12V7h-1.5Zm-4-8.5v10Z" />
        </svg>
      </button>
      <div className="flex items-start justify-start w-full">
        <img
          className="p-2"
          src={item.image}
          alt={item.name}
          title={item.name}
          width={120}
          height={120}
        />
        <div className="p-4">
          <h4 className="font-light text-sm">{item.name}</h4>
          <span
            className=" font-extrabold text-base"
            style={{
              color: "#d45824",
            }}
          >
            {item.price.toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
          <div
            className={classNames(
              s["cart-input__stepper"],
              "flex items-center justify-between mt-2 p-1"
            )}
            style={{
              minWidth: "100px",
            }}
          >
            <button
              onClick={() =>
                handleChangeQuantity(item.stripeId, InputStepper.minus)
              }
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20">
                <path d="M5 10.75v-1.5h10v1.5Z" />
              </svg>
            </button>
            <span className="" title={`Quantidade do item ${item.name}`}>
              {item.quantity}
            </span>
            <button
              onClick={() =>
                handleChangeQuantity(item.stripeId, InputStepper.plus)
              }
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20">
                <path d="M9.25 15v-4.25H5v-1.5h4.25V5h1.5v4.25H15v1.5h-4.25V15Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </li>
  ));

  const totalItems = useMemo(() => {
    return items.reduce(
      (acc, current) => acc + current.quantity * current.price,
      0
    );
  }, [items]);

  const handleFinish = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout_sessions", {
        method: "POST",
        body: JSON.stringify(
          items.map((item) => ({
            // price: "price_1MJKijImByRpPslV0mMSkddu",
            price: item.stripeId,
            quantity: item.quantity,
          }))
        ),
      });

      if (res.ok) {
        const data = await res.json();

        if (data.url) {
          window.location.href = data.url;
        } else {
          toast.error(
            `Houve algum problema na finalização do pedido, tente novamente mais tarde!`
          );
        }
      }
    } catch (error) {
      toast.error(`Não foi possílve finalizar a compra :-(`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className={classNames(
        s["cart-container"],
        items.length
          ? `${items.length >= 4 ? "p-4" : "h-screen p-4"}`
          : "p-4 flex flex-col items-center justify-center h-screen",
        "pt-20"
      )}
    >
      <h1 className="text-2xl mt-0 mb-4 text-center">
        Meu carrinho de compras
      </h1>
      {items.length ? (
        <div>
          <ul>{formateditem}</ul>
          <div
            className="text-2xl font-extrabold flex items-center justify-between pt-4 pb-4"
            style={{
              color: "#d45824",
            }}
          >
            <span>Total: </span>
            <span>
              {totalItems.toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </div>
          <button
            onClick={handleFinish}
            disabled={loading}
            className={classNames(
              s["btn-success"],
              "flex items-center justify-center"
            )}
          >
            {loading ? "Finalizando Compra" : "Finalizar compra"}
            <svg
              className="ml-2"
              xmlns="http://www.w3.org/2000/svg"
              height="20"
              width="20"
              fill="#fff"
            >
              <path d="M5.5 18q-.625 0-1.062-.438Q4 17.125 4 16.5t.438-1.062Q4.875 15 5.5 15t1.062.438Q7 15.875 7 16.5t-.438 1.062Q6.125 18 5.5 18Zm9 0q-.625 0-1.062-.438Q13 17.125 13 16.5t.438-1.062Q13.875 15 14.5 15t1.062.438Q16 15.875 16 16.5t-.438 1.062Q15.125 18 14.5 18ZM5.271 5.5 7 9.5h6.271l1.708-4ZM4.625 4H16.5q.292 0 .427.229t.031.479l-2.312 5.375q-.188.417-.552.667-.365.25-.823.25H6.604l-.875 1.5H16V14H5.75q-.896 0-1.323-.75-.427-.75.011-1.5l1.083-1.875L2.792 3.5H1V2h2.771ZM7 9.5h6.271Z" />
            </svg>
          </button>
        </div>
      ) : (
        <div
          className={classNames(
            s["empty-cart"],
            "flex items-center justify-center"
          )}
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48">
            <path d="M11 44q-1.2 0-2.1-.9Q8 42.2 8 41V15q0-1.2.9-2.1.9-.9 2.1-.9h5.5v-.5q0-3.15 2.175-5.325Q20.85 4 24 4q3.15 0 5.325 2.175Q31.5 8.35 31.5 11.5v.5H37q1.2 0 2.1.9.9.9.9 2.1v26q0 1.2-.9 2.1-.9.9-2.1.9Zm0-3h26V15h-5.5v4.5q0 .65-.425 1.075Q30.65 21 30 21q-.65 0-1.075-.425-.425-.425-.425-1.075V15h-9v4.5q0 .65-.425 1.075Q18.65 21 18 21q-.65 0-1.075-.425-.425-.425-.425-1.075V15H11v26Zm8.5-29h9v-.5q0-1.9-1.3-3.2Q25.9 7 24 7q-1.9 0-3.2 1.3-1.3 1.3-1.3 3.2ZM11 41V15v26Z" />
          </svg>
          Seu carrinho está vazio :-(
        </div>
      )}
      <button
        onClick={back}
        className={classNames(s["btn-back"], "text-base font-light")}
      >
        Voltar para lista de produtos
      </button>
    </section>
  );
}
