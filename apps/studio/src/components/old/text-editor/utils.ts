export function isValidUrl(url: string) {
  const urlPattern = /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/;
  return urlPattern.test(url);
}