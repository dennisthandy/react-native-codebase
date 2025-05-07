type LoginResponse = {
  token: string;
  user: {
    id: string;
    email: any;
    name: string;
  };
};
