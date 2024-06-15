import multer from 'multer'
import multerConfig from '../config/multer'
import Foto from '../models/Foto'

const upload = multer(multerConfig).single('photo')

class PhotoController {
  store(req, res) {
    return upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          errors: [err.code],
        })
      }

      try {

        const { originalname, filename } = req.file
        const { aluno_id } = req.body
        const photo = await Foto.create({ originalname, filename, aluno_id })
        const { id, url } = photo

        return res.json({ originalname, filename, aluno_id, id, url })
      } catch (e) {
        return res.status(400).json({
          errors: ['Aluno não encontrado'],
        })
      }
    })
  }
}

export default new PhotoController()
