import User from '../models/user'
import jwt from 'jsonwebtoken'

class TokenController {
  async store(req, res) {
    const { email = '', password = '' } = req.body

    if (!email || !password) {
      return res.status(401).json({
        errors: ['Credenciais inválidas'],
      })
    }

    const user = await User.findOne({ where: { email } })
    const { id } = user

    if (!user) {
      return res.status(401).json({
        errors: ['Usuário não existe'],
      })
    }

    if (!(await user.passwordValidated(password))) {
      return res.status(401).json({
        errors: ['Senha inválida'],
      })
    }

    const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    })

    return res.json(token)
  }
}

export default new TokenController()
