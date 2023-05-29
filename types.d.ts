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

type User = {
  id: string;
  email: string;
  posts: any[];
};

type State = {
  loading: boolean;
  data: User | null;
  error: string | null;
};

//this extends the State type with the setAuthState function
type AuthenticationContextType = State & {
  setAuthState: React.Dispatch<React.SetStateAction<State>>;
};
