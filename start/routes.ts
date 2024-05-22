const RegistersController = () => import('#controllers/registers_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const AuthController = () => import('#controllers/auth_controller')
const ProfileController = () => import('#controllers/profiles_controller')

router.get('/', function () {
  return 'ffdFFF'
})

router.post('/check-email', [AuthController, 'checkEmail'])
router.post('/login', [AuthController, 'login'])
router.post('/register', [RegistersController, 'register'])
router.get('/profile', [ProfileController, 'getProfile']).use([middleware.auth()])
router.put('/edit_profile', [ProfileController, 'updateProfile']).use([middleware.auth()])
router.post('/change_password', [ProfileController, 'changePassword']).use([middleware.auth()])
