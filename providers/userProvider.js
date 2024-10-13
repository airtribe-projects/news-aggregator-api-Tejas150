const axios = require('axios')
const UserModel = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
    createUser: async (userData = {}) => {
        try {
            const hashedPassword = await bcrypt.hash(userData.password, 10)
            const user = new UserModel({ ...userData, password: hashedPassword })
            return await user.save()
        } catch (error) {
            throw {
                status: 500,
                message: error.message || 'Failed to create user. Internal server error.'
            }
        }
    },

    authenticateUser: async (userData = {}) => {
        try {
            const { email, password } = userData

            if (!email || !password) {
                throw {
                    status: 400,
                    message: 'Email and password are required for authentication.'
                }
            }

            const user = await UserModel.findOne({ email })
            if (!user) throw { status: 401, message: 'User not found' }

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) throw { status: 401, message: 'Invalid credentials' }

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' })
            return token
        } catch (error) {
            const { status = 500, message = 'Failed to authenticate user. Internal server error.' } = error
            throw { status, message }
        }
    },

    getUserPreferences: async (userId) => {
        try {
            if (!userId) {
                throw {
                    status: 400,
                    message: 'User ID is required to fetch preferences.'
                }
            }

            const user = await UserModel.findById(userId).select('preferences')
            if (!user) throw { status: 404, message: 'User not found' }

            return user.preferences
        } catch (error) {
            const { status = 500, message = 'Failed to fetch user preferences. Internal server error.' } = error
            throw { status, message }
        }
    },

    updateUserPreferences: async (userId, preferences = []) => {
        try {
            if (!userId) {
                throw {
                    status: 400,
                    message: 'User ID is required to update preferences.'
                }
            }

            if (!Array.isArray(preferences) || preferences.length === 0) {
                throw {
                    status: 400,
                    message: 'Preferences must be a non-empty array.'
                }
            }

            const user = await UserModel.findByIdAndUpdate(
                userId,
                { preferences },
                { new: true, select: 'preferences' }
            )

            if (!user) throw { status: 404, message: 'User not found' }

            return user.preferences
        } catch (error) {
            const { status = 500, message = 'Failed to update preferences. Internal server error.' } = error
            throw { status, message }
        }
    }
}