const newsProvider = require('../providers/newsProvider')
const { getUserPreferences } = require('../providers/userProvider')

module.exports = {
    getNews: async (req, res) => {
        try {
            const userId = req.user.id
            const userPreferences = await getUserPreferences(userId)

            const news = await newsProvider.fetchNews(userPreferences)
            console.log("🚀 ~ getNews: ~ news:", news[0])
            res.status(200).json({ news })
        } catch (error) {
            const { status = 500, message = 'Failed to fetch news' } = error
            res.status(status).json({ message })
        }
    }
}
