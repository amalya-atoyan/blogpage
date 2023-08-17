export const convertImageToBase64 = (imageFile) => {
  return new Promise((res, rej) => {
    const reader = new FileReader();

    reader.readAsDataURL(imageFile);

    reader.onload = () => {
      const base64String = reader.result;
      res(base64String);
    };

    reader.onerror = (err) => {
      rej(err);
    };
  });
};
