export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  alt: string;
  category: "tree" | "ornament" | "amigurumi";
  sold?: boolean;
}

export interface NavItem {
  label: string;
  href: string;
}
