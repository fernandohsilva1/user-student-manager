import { Router } from "express"
import UserController from '../controllers/UserController'
import loginRequired from "../middlewares/loginRequired"

const router = new Router()

router.get('/', loginRequired, UserController.index)
router.get('/:id', loginRequired, UserController.show)
router.post('/', UserController.store)
router.delete('/:id', loginRequired, UserController.delete)
router.put('/:id', loginRequired, UserController.update)

export default router
