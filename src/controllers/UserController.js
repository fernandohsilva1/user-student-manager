import User from '../models/user'

class UserController {
  async index(req, res) {
    try {
      const users = await User.findAll({ attributes: ['id', 'nome', 'email'] })
      return res.json(users)
    } catch (e) {
      return res.status(500).json({
        errors: ['Erro ao buscar usuário'],
      })
    }
  }

  async store(req, res) {
    try {
      const novoUser = await User.create(req.body)
      const { id, nome, email } = novoUser

      return res.status(201).json({ id, nome, email })
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      })
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params
      const user = await User.findByPk(id)

      const { nome, email, created_at, updated_at } = user
      return res.json({ id, nome, email, created_at, updated_at })
    } catch (e) {
      return res.status(500).json({
        errors: ['Erro ao buscar usuário'],
      })
    }
  }

  async delete(req, res) {
    try {

      const user = await User.findByPk(req.userId)

      if (!user) {
        return res.status(404).json({
          errors: ['Usuário não encontrado'],
        })
      }

      await user.destroy()

      return res.json(user)
    } catch (e) {
      return res.json(null)
    }
  }

  async update(req, res) {
    try {
      const user = await User.findByPk(req.userId)

      if (!user) {
        return res.status(400).json({
          errors: ['Usuário não encontrado'],
        })
      }

      await user.update(req.body)

      return res.json(user)
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      })
    }
  }
}

export default new UserController()
