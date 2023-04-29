export const emailValidation = (value: any) => {
  return /\S+@\S+\.\S+/.test(value);
};

export const validateString = (str: any) => {
  return /^[a-zA-Z0-9_ ]*$/.test(str);
};

export const getFormData = (data: any) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });
  return formData;
};
