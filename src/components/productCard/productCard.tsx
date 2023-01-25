import { FC } from "react";
import { Product } from "../../types/product";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export const CHECKOUT_ITEMS_KEY = "checkout-items";

export const ProductCard: FC<{ product: Product }> = ({ product }) => {
  const proudctImage =
    product.image[0]?.url ??
    `https://via.placeholder.com/500x500?text=${product.title}`;
  const router = useRouter();

  const handleClick = async () => {
    try {
      const cartItems = localStorage.getItem(CHECKOUT_ITEMS_KEY);

      if (!product.strapiProductId) {
        return toast.error(
          `Não foi possílvel adicionar o produto: ${product.title} ao carrinho :-(`
        );
      }

      if (!cartItems) {
        localStorage.setItem(
          CHECKOUT_ITEMS_KEY,
          JSON.stringify([
            {
              stripeId: product.strapiProductId,
              quantity: 1,
              image: proudctImage,
              name: product.title,
              price: product.price,
            },
          ])
        );
      } else {
        let items: Array<{
          stripeId: string;
          quantity: number;
          image: string;
          name: string;
          price: number;
        }> = JSON.parse(
          localStorage.getItem(CHECKOUT_ITEMS_KEY ?? "[]") as string
        );

        if (items.find((item) => item.stripeId === product.strapiProductId)) {
          items.forEach((element) => {
            element.quantity += 1;
          });
        } else {
          items.push({
            stripeId: product.strapiProductId,
            quantity: 1,
            image: proudctImage,
            name: product.title,
            price: product.price,
          });
        }

        localStorage.setItem(CHECKOUT_ITEMS_KEY, JSON.stringify(items));
      }

      toast.success(`${product.title} foi adicionado ao carrinho!`);
      router.push(`/casal/${router.query.slug}/cart`);
    } catch (error) {
      toast.error(
        `Nào foi possível adicionar o produto ${product.title} ao carrinho!`
      );
    }
  };

  return (
    <div
      className="card flex min-h-[300px] flex-col items-center justify-center border border-gray-200 p-2"
      key={product.id}
    >
      <img
        src={proudctImage}
        className="w-full h-full max-h-72 border-gray-200 border-solid border-b object-contain"
        alt={product.title}
        height={150}
        width={150}
        style={{
          minHeight: 150,
          maxHeight: 150,
        }}
      />
      <h5
        className="text-gray-800 text-sm mt-5 text-center overflow-hidden text-ellipsis font-light"
        style={{
          minHeight: 40,
        }}
      >
        {product.title}
      </h5>
      <div className="price">
        <span
          className=" text-lg font-bold"
          style={{
            color: "#d45824",
          }}
        >
          {product.price.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          })}
        </span>
      </div>
      <button
        onClick={handleClick}
        className="w-full uppercase p-1 text-base mt-2 text-white"
        style={{
          background: "#d45824",
        }}
      >
        Presentear
      </button>
    </div>
  );
};
