import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import { gbApi } from "./AxiosService.js"

const quotaReached = false

class GoogleBooksService {
  createImageURL(volumeId, width = 400, height = 600) {
    return `https://books.google.com/books/publisher/content/images/frontcover/${volumeId}?fife=w${width}-h${height}&source=gbs_api`
  }

  async search(params) {
    if (quotaReached) { return }
    const queryParams = { q: '', startIndex: 0, maxResults: 40, langRestrict: 'en', printType: 'books', orderBy: 'newest' }
    for (const key of Object.keys(queryParams)) {
      queryParams[key] = key in params ? params[key] : queryParams[key]
    }
    const res = await gbApi.get('volumes', { params: queryParams })
    const volumes = res.data.items
    return volumes
  }

  async searchByCode(isbnCode) {
    const res = await gbApi.get('volumes', {
      params: {
        q: `+isbn:${isbnCode}`
      }
    })
    logger.log('[GOT GOOGLE BOOK BY ISBN CODE]', res.data)

    let gbId = null

    if (res.data.totalItems == 0) {

      Pop.error('This New York Times Book has no Google Book equivalent')

    } else (gbId = res.data.items[0].id)

    return gbId
  }

  async getVolumeById(volumeId) {
    if (quotaReached) { return }

    const res = await gbApi.get(`volumes/${volumeId}`)
    const volume = res.data
    // console.log('GOOGLE BOOKS VOLUME BY ID:', volume)
    return volume
  }
}

export const googleBooksService = new GoogleBooksService()