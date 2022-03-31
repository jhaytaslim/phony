const { account, phone_number, sequelize } = require('../database/models')

class Services {
  validateUser = async (username, password) => {
    try {
      let user = await account.findOne({
        where: {
          username,
          auth_id: password
        },
        raw: true
      })
      return user
    } catch (err) {
      console.error(err)
    }
  }
  retrievePhone = async id => {
    try {
      let phone = await phone_number.findAll({
        where: {
          account_id: id
        },
        raw: true
      })
      return phone
    } catch (err) {
      console.error(err)
    }
  }
}
module.exports = Services