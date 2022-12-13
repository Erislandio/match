import { FC } from "react";
import { Product } from "../../types/product";

export const ProductCard: FC<{ product: Product }> = ({ product }) => {
  const proudctImage =
    product.image[0]?.url ??
    `https://via.placeholder.com/500x500?text=${product.title}`;

  return (
    <div
      className="card flex min-h-[300px] flex-col items-center justify-center border rounded-md border-gray-200 p-2"
      key={product.id}
    >
      <img
        src={proudctImage}
        className="w-full h-full max-h-72 border-gray-200 border-solid border-b "
        alt={product.title}
        height={150}
        width={150}
        style={{
          minHeight: 150,
          maxHeight: 150,
        }}
      />
      <h5
        className="text-gray-800 text-sm mt-5 text-center overflow-hidden text-ellipsis"
        style={{
          minHeight: 40,
        }}
      >
        {product.title}
      </h5>
      <div className="price">
        <span className="text-red-400 text-lg font-bold">
          {product.price.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          })}
        </span>
      </div>
      <button className="w-full uppercase p-1 rounded-md text-base bg-red-400 mt-6 text-white">
        Presentear
      </button>
    </div>
  );
};
