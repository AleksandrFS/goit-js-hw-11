import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// Notify.init({
//   info: {
//     background: '#26c0d3',
//     textColor: '#fff',
//     childClassName: 'notiflix-notify-info',
//     notiflixIconColor: 'rgba(0,0,0,0.2)',
//     fontAwesomeClassName: 'fas fa-info-circle',
//     fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
//     backOverlayColor: 'rgba(38,192,211,0.2)',
//     pauseOnHover: true,
//     position: 'right-bottom',
//   },
// });

const API_KEY = '35672310-4fd2f94d19936bfbbb81d2e8c';
const BASE_URL = 'https://pixabay.com/api/';

export let count = null;
export let totalHitsValue = null;

export default class LoadPictures {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.hits = 0;
  }

  async getImages() {
    const params = new URLSearchParams({
      key: API_KEY,
      q: this.searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: this.page,
      per_page: 40,
    });

    const url = `${BASE_URL}?${params}`;

    try {
      const response = await axios.get(url);

      count = this.hits += response.data.hits.length;
      totalHitsValue = response.data.totalHits;

      console.log(count);

      if (response.data.total === 0) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else if (this.page === 1) {
        Notify.success(`Hooray! We found ${response.data.totalHits} images.`);
      }
      if (
        count > response.data.totalHits ||
        count === response.data.totalHits
      ) {
        Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
      }

      return response?.data.hits;
    } catch (error) {
      Notify.failure(error.message);
    }
  }
}
