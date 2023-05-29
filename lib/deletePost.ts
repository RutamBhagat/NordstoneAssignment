import axios from "axios";

export default async function deletePost(id: string) {
  try {
    const response = await axios.post("/api/posts/deletePost", {
      id: id,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
