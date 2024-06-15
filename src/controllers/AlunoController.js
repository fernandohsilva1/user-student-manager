import Aluno from '../models/Aluno'
import Foto from '../models/Foto'

class AlunoController {
  async index(req, res) {
    const alunos = await Aluno.findAll({
      attributes: ['id', 'nome', 'sobrenome', 'idade', 'email', 'peso', 'altura'],
      order: [['id', 'DESC'], [Foto, 'id', 'DESC']],
      include: {
        model: Foto,
        attributes: ['url', 'filename'],
      }
    })
    return res.json(alunos)
  }

  async store(req, res) {
    try {
      const newStudents = await Aluno.create(req.body)
      const { id, nome, sobrenome, email, idade, peso, altura } = newStudents

      return res.status(201).json({ id, nome, sobrenome, email, idade, peso, altura })
    } catch(e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      })
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params

      if (!id) {
        return res.status(400).json({
          errors: ['Precisa do ID'],
        })
      }

      const student = await Aluno.findByPk(id, {
        attributes: ['id', 'nome', 'sobrenome', 'idade', 'email', 'peso', 'altura'],
        order: [['id', 'DESC'], [Foto, 'id', 'DESC']],
        include: {
          model: Foto,
          attributes: ['url', 'filename'],
        }
      })

      if (!student) {
        return res.status(400).json({
          errors: ['Aluno não encontrado']
        })
      }

      return res.status(201).json(student)
    } catch(e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      })
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params

      if (!id) {
        return res.status(400).json({
          errors: ['Precisa do ID'],
        })
      }

      const student = await Aluno.findByPk(id)

      if (!student) {
        return res.status(400).json({
          errors: ['Aluno não encontrado'],
        })
      }

      await student.destroy()

      return res.status(201).json(student)
    } catch(e) {

    }
  }

  async update(req, res) {
    try {
      const { id } = req.params

      if (!id) {
        return res.status(400).json({
          errors: ['Precisa do ID'],
        })
      }

      const student = await Aluno.findByPk(id)

      if (!student) {
        return res.status(400).json({
          errors: ['Aluno não encontrado'],
        })
      }

      await student.update(req.body)

      return res.status(201).json(student)
    } catch(e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      })
    }
  }
}

export default new AlunoController()
