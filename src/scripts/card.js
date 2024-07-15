import {placesList} from "../index";

export const likeCard = (evt) => {
    evt.target.classList.toggle('card__like-button_is-active');
}


export const createCard = (data, deleteCard,likeCard, handlerPopupImage) => {
    const templateCard = document.querySelector('#card-template').content;
    const card = templateCard.querySelector('.card').cloneNode(true)
    const img =  card.querySelector('.card__image')

    img.src = data.link
    img.alt = data.name
    card.querySelector('.card__title').textContent = data.name

    card.querySelector('.card__delete-button').addEventListener('click', () => deleteCard(card))
    card.querySelector('.card__like-button').addEventListener('click', likeCard)
    img.addEventListener('click', () => handlerPopupImage(data))

    return card
}

export const deleteCard = (card) => {
    placesList.removeChild(card)
}