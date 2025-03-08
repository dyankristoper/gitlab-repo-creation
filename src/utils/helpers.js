const getAuthorizationHeader = () => {
  return {
    Authorization: `Bearer ${ process.env.ACCESS_TOKEN }`
  }
}

module.exports = { getAuthorizationHeader }