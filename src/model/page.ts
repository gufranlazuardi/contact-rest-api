export type Paging = {
  size: number;
  totalPage: number;
  currentPage: number;
};

// dibikin generic karena datanya berubah-ubah
export type Pageable<T> = {
  data: Array<T>;
  paging: Paging;
};
