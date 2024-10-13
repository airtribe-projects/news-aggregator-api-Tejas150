const userProvider = require('../providers/userProvider')

module.exports = {
    register : async (req, res) => {
        try {
            await userProvider.createUser(req.body)
            res.status(200).json({ message: 'User registered successfully' })
        } catch (error) {
            console.log(error)
            const { status = 500, message = 'Unexpected error: User registration failed' } = error
            res.status(status).json({ message })
        }
    },

    login : async (req, res) => {
        try {
            const token = await userProvider.authenticateUser(req.body)
            res.status(200).json({ token })
        } catch (error) {
            const { status = 500, message = 'Unexpected error: User login failed' } = error
            res.status(status).json({ message })
        }
    },

    getUserPreferences: async (req, res) => {
        try {
            const userId = req.user.id
            const preferences = await userProvider.getUserPreferences(userId)
            res.status(200).json({ preferences })
        } catch (error) {
            const { status = 500, message = 'Unexpected error: Could not retrieve preferences' } = error
            res.status(status).json({ message })
        }
    },

    updateUserPreferences: async (req, res) => {
        const { preferences } = req.body
        try {
            const userId = req.user.id
            const updatedPreferences = await userProvider.updateUserPreferences(userId, preferences)
            res.status(200).json(updatedPreferences)
        } catch (error) {
            const { status = 500, message = 'Unexpected error: Could not update preferences' } = error
            res.status(status).json({ message })
        }
    },

}
