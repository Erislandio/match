import { Category } from "./category";
import { Product } from "./product";

export default interface Pair {
  date: string;
  pairName: string;
  coulpeName: string;
  about: string;
  categories: Category[];
  products: Product[];
  banners: PairBanners[];
}

export interface PairBanners {
  position: BannerPosition;
  image: BannerImage[];
}

export interface BannerImage {
  url: string;
  id: string;
}

export enum BannerPosition {
  TOP = "TOP",
  CARROSSEL = "CARROSSEL",
  FOOTER = "FOOTER",
  TOP_DESCRIPTION = "TOP_DESCRIPTION",
}
