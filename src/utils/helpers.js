const getAuthorizationHeader = () => {
  return {
    Authorization: `Bearer ${ process.env.ACCESS_TOKEN }`
  }
}

const getDate = () => {
  const dateToday = new Date();
  return dateToday.toLocaleDateString();
}

module.exports = { getAuthorizationHeader, getDate }