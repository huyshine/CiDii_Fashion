import axios from "axios";

//Upload image
export const uploadImage = async (fileName: string) => {
  const formData = new FormData();
  formData.append("file", fileName);
  formData.append("upload_preset", "type-scripst");
  const { data } = await axios.post(
    "https://api.cloudinary.com/v1_1/dlqlpxown/image/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  )
  return data.url;

  
};
// Format currency
export const Currency = (currency: number) =>
  currency.toLocaleString("en-US", { style: "currency", currency: "USD" });