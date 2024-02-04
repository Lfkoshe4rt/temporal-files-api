export const convert = () => {
  const convertToUnits  = (bytes: number) : string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + sizes[i];
  };

  const convertToMilliseconds = (time : number) : number => {
    return time * 60 * 1000 || 60000;
  };

  return { convertToUnits, convertToMilliseconds };
};
