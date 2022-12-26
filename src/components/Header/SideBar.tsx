import classNames from "classnames";
import Link from "next/link";
import {
  CartIcon,
  CloseButton,
  ConfirmePresencaIcon,
  InícioIcon,
  MapIcon,
  ProductListIcon,
} from "../../icons/icons";
import s from "./header.module.css";
import { useRouter } from "next/router";

export default function SideBar({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (param: boolean) => any;
}) {
  const router = useRouter();

  return (
    <aside
      className={classNames(
        s["header__sidebar"],
        open ? s["opened"] : s["closed"],
        "fixed top-0 left-0"
      )}
    >
      <button
        className="bg-transparent border-none absolute right-2 top-2"
        onClick={() => setOpen(false)}
      >
        <CloseButton />
      </button>
      <ul className="mt-14">
        <li
          onClick={() => setOpen(false)}
          className="text-white flex items-center justify-between"
        >
          <Link href={{ pathname: `/casal/${router.query.slug}/` }}>
            <span className="flex items-center justify-between w-full px-4 py-2">
              Início
              <InícioIcon />
            </span>
          </Link>
        </li>
        <li
          onClick={() => setOpen(false)}
          className="text-white flex items-center justify-between"
        >
          <Link
            href={{
              pathname: `/casal/${router.query.slug}/produtos`,
            }}
            passHref
            replace
          >
            <span className="flex items-center justify-between w-full px-4 py-2">
              Lista de presentes
              <ProductListIcon />
            </span>
          </Link>
        </li>
        <li
          onClick={() => setOpen(false)}
          className="text-white flex items-center justify-between"
        >
          <Link
            href={{
              pathname: `/casal/${router.query.slug}/produtos`,
            }}
            passHref
            replace
          >
            <span className="flex items-center justify-between w-full px-4 py-2">
              Local do casamento
              <MapIcon />
            </span>
          </Link>
        </li>
        <li
          onClick={() => setOpen(false)}
          className="text-white flex items-center justify-between"
        >
          <Link
            href={{
              pathname: `/casal/${router.query.slug}/produtos`,
            }}
            passHref
            replace
          >
            <span className="flex items-center justify-between w-full px-4 py-2">
              Confirme sua presença
              <ConfirmePresencaIcon />
            </span>
          </Link>
        </li>
        <li
          onClick={() => setOpen(false)}
          className="text-white flex items-center justify-between"
        >
          <Link
            href={{
              pathname: `/casal/${router.query.slug}/cart`,
            }}
            passHref
            replace
          >
            <span className="flex items-center justify-between w-full px-4 py-2 relative">
              Meu carrinho de presentes
              <CartIcon />
            </span>
          </Link>
        </li>
      </ul>
    </aside>
  );
}
