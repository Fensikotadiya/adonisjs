import User from '#models/user'
import { cuid } from '@adonisjs/core/helpers'
import { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'

export default class RegistersController {
  async register({ request, response }: HttpContext) {
    try {
      // Extract user data from request body
      const userData = request.only(['fullName', 'email', 'password'])

      console.log('Received user data:', userData)

      // Check if a user with the same email already exists
      const existingUser = await User.findBy('email', userData.email)
      if (existingUser) {
        return response
          .status(200)
          .json({ error: 'User with this email already exists', success: false })
      }

      let profilePicUrl =
        'https://raw.githubusercontent.com/rbonweb/rbonweb-assets/main/2024/05/top-10-javascript-gems-1.png' // Default profile picture URL

      // Handle profile picture upload
      // const profilePic = request.file('profilePic', {
      //   extnames: ['jpg', 'png', 'jpeg'],
      // })

      // console.log('Profile:.......', profilePic)
      // if (profilePic) {
      //   if (!profilePic.isValid) {
      //     console.error('Profile picture is not valid:', profilePic.errors)
      //     return response.badRequest({ errors: profilePic.errors })
      //   }

      //   // Generate a unique file name using cuid
      //   const uniqueFileName = `${cuid()}.${profilePic.extname}`
      //   const uploadPath = app.makePath('uploads')

      //   console.log('Moving file to:', uploadPath)

      //   // Move the profile picture to the public/uploads directory
      //   await profilePic.move(app.publicPath('uploads'), {
      //     name: uniqueFileName,
      //     overwrite: true, // Overwrite if file with the same name exists
      //   })

      //   // Generate a URL for the profile picture
      //   profilePicUrl = `${request.protocol()}://${request.hostname()}/uploads/${uniqueFileName}`
      //   console.log('Profile picture uploaded, URL:', profilePicUrl)
      // }

      // Create a new user record with profilePic URL
      const user = await User.create({
        ...userData,
        profilePic: profilePicUrl, // Assign profilePicUrl here
      })

      console.log('User created successfully:', user)

      const userResponse = {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        profilePic: user.profilePic,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      }

      return response
        .status(201)
        .json({ message: 'User registered successfully', user: userResponse, success: true })
    } catch (error) {
      console.error('Registration error:', error)
      return response.status(500).json({ error: 'Internal server error', success: false })
    }
  }
}
