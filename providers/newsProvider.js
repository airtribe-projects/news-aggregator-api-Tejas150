const axios = require('axios')

module.exports = {
    fetchNews: async (preferences, language = 'en', maxResults = 10) => {
        try {
            const apiKey = process.env.NEWS_API_KEY
            if (!apiKey) {
                throw {
                    status: 500,
                    message: 'API key not found'
                }
            }

            const params = {
                q: preferences.join(' '),
                lang: language,
                token: apiKey,
                max: maxResults
            }

            const response = await axios.get(`https://gnews.io/api/v4/search`, { params })
            if (response.data && response.data.articles) {
                return response.data.articles
            } else {
                throw {
                    status: 404,
                    message: 'No articles found based on the given preferences.'
                }
            }
        } catch (error) {
            if (error.response) {
                const { status = 500, data } = error.response
                throw {
                    status: status,
                    message: data?.message || 'An error occurred with the news API.'
                }
            } else if (error.request) {
                throw {
                    status: 503,
                    message: 'No response from the news service. Please try again later.'
                }
            } else {
                const { status = 500, message = 'An unknown error occurred while fetching news' } = error
                throw {
                    status: status,
                    message: message
                }
            }
        }
    }
}
