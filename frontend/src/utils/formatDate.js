const formatDate = (value) => {
  if (!value) return 'Not available'
  return new Date(value).toLocaleString()
}

export default formatDate
