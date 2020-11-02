export default (scope) => {
  if (scope) {
    return {
      [scope]: { loading: false, error: null },
    }
  }
  return {
    loading: false, error: null,
  }
}