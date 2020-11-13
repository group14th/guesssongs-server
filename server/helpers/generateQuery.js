function generateQuery() {
  const query = Math.ceil(Math.random() * 4)
  
  switch (query) {
    case 1:
      return "blackpink"
    case 2:
      return "eminem"
    case 3:
      return "adhitia"
    case 4:
      return "pamungkas"
    default:
      break;
  }
}

module.exports = generateQuery