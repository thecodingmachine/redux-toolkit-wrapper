export default (scope?: string) => {
  if (scope) {
    return {
      [scope]: { loading: false, error: null },
    }
  }
  return {
    loading: false, error: null,
  }
}
