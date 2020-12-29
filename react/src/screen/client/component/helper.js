function checkIsImageExist(str) {
  return /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(str);
}
export { checkIsImageExist };
