import {placesList} from "../index";
import {deleteCardApi, likeCardApi} from "./api";

export const likeCard = (evt, data, idMe, countLikes) => {
    if (data.likes.filter(user => user['_id'] === idMe).length > 0) {
        likeCardApi(data['_id'], true).then((res) => {
            console.log(res,'add')
            evt.target.classList.toggle('card__like-button_is-active');
            countLikes.textContent = res.likes.length;
        }).catch(e => console.log(e));
    } else {
        likeCardApi(data['_id']).then((res) => {
            console.log(res,'del')
            evt.target.classList.toggle('card__like-button_is-active');
            countLikes.textContent = res.likes.length;
        }).catch(e => console.log(e));
    }
}


export const createCard = (idMe, data, deleteCard,likeCard, handlerPopupImage) => {
    const templateCard = document.querySelector('#card-template').content;
    const card = templateCard.querySelector('.card').cloneNode(true)
    const img =  card.querySelector('.card__image')

    img.src = data.link
    img.alt = data.name
    card.querySelector('.card__title').textContent = data.name

    const buttonDelete = card.querySelector('.card__delete-button')
    const like = card.querySelector('.card__like-button')
    const countLikes = card.querySelector('.card__like-p')

    if (idMe === data.owner['_id']) {
        buttonDelete.addEventListener('click', () => deleteCard(card, data))
    } else {
        buttonDelete.style.display = 'none'
    }

    if (data.likes.filter(user => user['_id'] === idMe).length > 0) {
        like.classList.add('card__like-button_is-active')
    }

    like.addEventListener('click', (evt) => likeCard(evt, data, idMe, countLikes))
    img.addEventListener('click', () => handlerPopupImage(data))

    countLikes.textContent = data.likes.length

    return card
}

export const deleteCard = (card, data) => {
    deleteCardApi(data['_id']).then(() => {
        placesList.removeChild(card)
    }).catch(error => {
        console.error(error)
    })
}