export type ItemType = {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ListType = {
  id: string;
  title: string;
  items: ItemType[];
};
