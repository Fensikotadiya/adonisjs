import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'

export default class AuthController {
  async login({ request, response }: HttpContext) {
    try {
      const { email, password } = request.only(['email', 'password'])

      // Find the user by email
      const user = await User.findBy('email', email)

      // If user not found, return 404 Not Found
      if (!user) {
        return response.status(404).json({ error: 'User not found', success: false })
      }

      // Check if the password matches
      const isPasswordValid = await hash.verify(user.password, password)
      if (!isPasswordValid) {
        return response.status(401).json({ error: 'Invalid credentials' })
      }

      // Create access token for the user
      const token = await User.accessTokens.create(user)

      // Return the access token
      return {
        token: token,
        success: true,
      }
    } catch (error) {
      console.error(error)
      return response.status(500).json({ error: 'Internal server error', success: false })
    }
  }

  async checkEmail({ request, response }: HttpContext) {
    try {
      const { email } = request.only(['email'])

      // Find the user by email
      const user = await User.findBy('email', email)

      // If user is found, return success: true, otherwise success: false
      if (user) {
        return response.json({ success: true })
      } else {
        return response.json({ success: false })
      }
    } catch (error) {
      console.error(error)
      return response.status(500).json({ error: 'Internal server error', success: false })
    }
  }
}
