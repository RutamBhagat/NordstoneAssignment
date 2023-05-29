type PhotoType = {
  id: string;
  url: string;
  createdAt: string;
  user: {
    id: string;
    email: string;
  };
  updatedAt: string;
  userId: string;
};

type PostType = {
  id: string;
  title: string;
  createdAt: string;
  user: {
    id: string;
    email: string;
  };
  updatedAt: string;
  userId: string;
};
