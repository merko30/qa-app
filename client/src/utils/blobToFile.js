const blobToFile = (blob, fileName, type) => {
  var file = new File([blob], fileName, { type, lastModified: Date.now() });
  return file;
};

export default blobToFile;
