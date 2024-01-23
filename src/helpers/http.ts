import axios from "axios";

export async function fetchImage(url: string) {
  const image = await axios.get(url, {
    responseType: "arraybuffer",
  });
  return image.data;
}
