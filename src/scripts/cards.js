import {placesList} from "../index";


export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

export const likeCard = (evt) => {
    evt.target.classList.toggle('card__like-button_is-active');
}


export const createCard = (data, deleteCard,likeCard, handlerPopupImage) => {
    const templateCard = document.querySelector('#card-template').content;
    const card = templateCard.querySelector('.card').cloneNode(true)

    card.querySelector('.card__image').src = data.link
    card.querySelector('.card__image').alt = data.name
    card.querySelector('.card__title').textContent = data.name

    card.querySelector('.card__delete-button').addEventListener('click', () => deleteCard(card))
    card.querySelector('.card__like-button').addEventListener('click', likeCard)
    card.querySelector('.card__image').addEventListener('click', () => handlerPopupImage(data))

    return card
}

export const deleteCard = (card) => {
    placesList.removeChild(card)
}