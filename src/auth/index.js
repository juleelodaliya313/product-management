export const isLoggin = () => {
  const token = localStorage.getItem("token");
  return token !== null;
};
