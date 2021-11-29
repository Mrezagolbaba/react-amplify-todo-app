export const getUri = (Platform, uri) => {
  if (uri) {
    return Platform.OS === 'android' ? uri : uri.replace('file://', '');
  }
  return null;
};
