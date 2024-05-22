// ProfileController.ts
// import { Hash } from '@adonisjs/core/hash'
import { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'

export default class ProfileController {
  async getProfile({ auth, response }: HttpContext) {
    try {
      const user = auth.user
      if (!user) {
        return response.status(404).json({ success: false, message: 'User not found' })
      }
      return response.status(200).json({ success: true, user })
    } catch (error) {
      console.error(error)
      return response.status(500).json({ error: 'Internal server error' })
    }
  }

  async updateProfile({ request, auth, response }: HttpContext) {
    try {
      const { fullName, email } = request.body()
      const user = auth.user
      if (!user) {
        return response.status(404).json({ success: false, message: 'User not found' })
      }
      user.merge({ fullName, email })
      await user.save()
      return response.status(200).json({ success: true, user })
    } catch (error) {
      console.error(error)
      return response.status(500).json({ error: 'Internal server error' })
    }
  }

  async changePassword({ request, auth, response }: HttpContext) {
    try {
      const { oldPassword, newPassword, confirmPassword } = request.body()
      const user = auth.user

      if (!user) {
        return response.status(404).json({ success: false, message: 'User not found' })
      }

      const isOldPasswordValid = await hash.verify(user.password, oldPassword) // Use Hash.verify instead of hash.verify
      if (!isOldPasswordValid) {
        return response.status(400).json({ success: false, message: 'Old password is incorrect' })
      }

      if (newPassword !== confirmPassword) {
        return response.status(400).json({ success: false, message: 'New passwords do not match' })
      }

      user.password = newPassword
      await user.save()

      return response.status(200).json({ success: true, message: 'Password updated successfully' })
    } catch (error) {
      console.error(error)
      return response.status(500).json({ error: 'Internal server error' })
    }
  }
}
