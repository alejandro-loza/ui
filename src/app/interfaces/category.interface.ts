export interface Category {
  id?: string;
  color?: string;
  name?: string;
  textColor?: string;
  subCategories?: Category[];
  parent?: { id: string };
  userId?: string;
  user?: {
    id: string;
  };
}
