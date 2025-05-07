type Meta = {
  page: number;
  size: number;
  totalData: number;
  totalPage: number;
  totalDatPerPage: number;
};

type ApiResponse<T> = {
  data: T;
  message: string;
  code: number;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  meta?: Meta;
};
