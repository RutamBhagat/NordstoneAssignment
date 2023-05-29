import axios from "axios";

export default async function deletePhoto(id: string) {
  try {
    const response = await axios.post("/api/photos/delete", {
      id: id,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
