const axios=require("axios")
async function uploadImage(image) {
  const key = "2bd48523effd52e3bd31eb0bcb835ec0";
  const url = `https://api.imgbb.com/1/upload?expiration=600&key=${key}`;
  const formData = new FormData();
  formData.append("image", image);
  try {
    const response = await axios.post(url, formData, {
      headers: {
        "Content-Type":
          "multipart/form-data; boundary=---011000010111000001101001",
      },
    });
    console.log(response.data.data.display_url);
    return response.data.data.display_url;
  } catch (error) {
    console.error("erreur lors de l'envoi de l'image " + error);
    return false;
  }
}

module.exports = { uploadImage };
