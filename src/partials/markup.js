export function markupPictures(responseArray) {
  return responseArray.reduce((acc, item) => {
    acc += `
<div class="gallery__item items">
  <a class="gallery__link" href="${item?.largeImageURL}">
  <img class="gallery__image" src="${item?.webformatURL}" alt="${item?.tags}" loading="lazy" width="288"
            height="200"/></a>
  <div class="info">
    <p class="info-item">
      <b>Likes ${item?.likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${item?.views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${item?.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${item?.downloads}</b>
    </p>
  </div>
</div>`;
    return acc;
  }, '');
}

// webformatURL - ссылка на маленькое изображение для списка карточек.
// largeImageURL - ссылка на большое изображение.
// tags - строка с описанием изображения. Подойдет для атрибута alt.
// likes - количество лайков.
// views - количество просмотров.
// comments - количество комментариев.
// downloads - количество загрузок.
