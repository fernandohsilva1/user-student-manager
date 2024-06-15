import Sequelize, { Model } from 'sequelize'
import bycryptjs from 'bcryptjs'

export default class User extends Model {
  static init(sequelize) {
    super.init({
      nome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validated: {
          len: {
            args: [3, 255],
            msg: 'O campo nome deve conter entre 3 a 255 caracteres',
          },
        },
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: {
          msg: "Email precisa ser único",
        },
        validate: {
          isEmail: {
            msg: 'Email inválido',
          },
        },
      },
      password_hash: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      password: {
        type: Sequelize.VIRTUAL,
        defaultValue: '',
        validate: {
          len: {
            args: [5, 25],
            msg: 'A senha precisa ter entre 5 a 25 caracteres',
          },
        },
      },
    }, { sequelize })

    this.addHook('beforeSave', async (user) => {
      if (!user.password) return

      user.password_hash = await bycryptjs.hash(user.password, 8)
    })
    return this
  }

  passwordValidated(password) {
    return bycryptjs.compare(password, this.password_hash)
  }

}
