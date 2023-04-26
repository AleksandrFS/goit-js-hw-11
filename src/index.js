import LoadPictures, { totalHitsValue } from './partials/get_images';
import { markupPictures } from './partials/markup';
import { createOnScreen } from './partials/create_on_screen';
import { count } from './partials/get_images';

const inputRef = document.getElementById('search-form');
const observerIs = document.querySelector('.observer');
const galleryRef = document.querySelector('.gallery');

const loadPhotos = new LoadPictures();

inputRef.addEventListener('submit', onSearchBtnClick);

function onSearchBtnClick(e) {
  e.preventDefault();

  if (e.target.elements.searchQuery.value === '') {
    return;
  }

  galleryRef.innerHTML = '';
  loadPhotos.hits = 0;
  loadPhotos.page = 1;
  loadPhotos.searchQuery = e.target.elements.searchQuery.value.trim();
  loadPhotos.getImages().then(markupPictures).then(createOnScreen);
}

function LoadMorePictures() {
  loadPhotos.page += 1;

  loadPhotos
    .getImages()
    .then(markupPictures)
    .then(createOnScreen)
    .catch(error => console.log(error));
}

const onEntry = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && count > totalHitsValue) {
      return;
    } else if (
      entry.isIntersecting &&
      loadPhotos.searchQuery !== '' &&
      count !== totalHitsValue
    ) {
      LoadMorePictures();
    }
  });
};

const options = {
  rootMargin: '250px',
};

const observer = new IntersectionObserver(onEntry, options);

observer.observe(observerIs);
