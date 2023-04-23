function debounce(fn, delay) {
  let timeout = null
  return function(e) {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      fn.apply(this, arguments)
    }, delay)
  }
}

export default debounce