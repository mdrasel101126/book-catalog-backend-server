export type IFilterableFields = {
  title?: string;
  author?: string;
  genre?: string;
};

export type IFilterOptions = {
  minPrice?: number;
  maxPrice?: number;
  category?: string;
  search?: string;
};
