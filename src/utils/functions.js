export const getSumm = (prodArr) => {
  if (!prodArr.length) {
    return null;
  }

  return prodArr.reduce((acc, item) => acc + item.price, 0);
}