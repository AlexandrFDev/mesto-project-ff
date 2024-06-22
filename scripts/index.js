const placesList = document.querySelector('.places__list')

const createCard = (data, deleteCard) => {
    const templateCard = document.querySelector('#card-template').content;
    const card = templateCard.querySelector('.card').cloneNode(true)

    card.querySelector('.card__image').src = data.link
    card.querySelector('.card__title').textContent = data.name

    card.querySelector('.card__delete-button').addEventListener('click', () => deleteCard(card))

    return card
}

const deleteCard = (card) => {
    placesList.removeChild(card)
}

initialCards.forEach((data) => {
    placesList.append(createCard(data, deleteCard))
})

