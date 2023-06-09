import axios from "axios";
import { useContext } from "react";
import { AuthenticationContext } from "@/app/context/AuthContext";

// WARNING: This hook is not suppose to be used
// NOTE: Do not use this hook it causes problems with the React Query when refreshing the page
export default function useData() {
  const auth = useContext(AuthenticationContext);

  const getPhotos = async () => {
    // @ts-ignore
    if (!auth.data?.email) {
      throw new Error("User not found");
    }
    const response = await axios.post("/api/photos/getPhotos", { email: auth.data!.email! });
    return response.data;
  };

  const getPosts = async () => {
    // @ts-ignore
    if (!auth.data?.email) {
      throw new Error("User not found");
    }
    const response = await axios.post("/api/posts/getPosts", { email: auth.data!.email! });
    return response.data;
  };

  return { getPhotos, getPosts };
}
