import './pages/index.css';
import {createCard, deleteCard, likeCard} from './scripts/card';
import {openModal, closeModal} from './scripts/components/modal';
import {initialCards} from "./scripts/cards";

export const placesList = document.querySelector('.places__list')

const popupNewCard= document.querySelector('.popup_type_new-card')
const closePopupNewCard = popupNewCard.querySelector('.popup__close')
const buttonNewCard = document.querySelector('.profile__add-button')
const contentNewCard = popupNewCard.querySelector('.popup__content')

const formNewCard = document.forms['new-place']

const popupEditProfile= document.querySelector('.popup_type_edit')
const closePopupEditProfile = popupEditProfile.querySelector('.popup__close')
const buttonEditProfile = document.querySelector('.profile__edit-button')
const contentEditProfile = popupEditProfile.querySelector('.popup__content')

const formEditProfile = document.forms['edit-profile']
const profileTitle = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')

const popupImage = document.querySelector('.popup_type_image')
const closePopupImage = popupImage.querySelector('.popup__close')
const popupImagePic = popupImage.querySelector('.popup__image')
const popupImageDesc = popupImage.querySelector('.popup__caption')

// Открытия попапа изображения
const handlerPopupImage = (data) => {
    openModal(popupImage)
    popupImagePic.src = data.link
    popupImagePic.alt = data.name
    popupImageDesc.textContent = data.name
}
// Закрытие попапа изображения через кнопку
closePopupImage.addEventListener('click', () => {
    closeModal(popupImage)
})
// Закрытие попапа изображения через overlay
popupImage.addEventListener('click', () => {
    closeModal(popupImage)
})


initialCards.forEach((data) => {
    placesList.append(createCard(data, deleteCard, likeCard, handlerPopupImage))
})


// Открытие попапа редактирования профиля
buttonEditProfile.addEventListener('click', () => {
    openModal(popupEditProfile)
    formEditProfile.name.value = profileTitle.textContent
    formEditProfile.description.value = profileDescription.textContent
})
// Закрытие попапа профиля через кнопку
closePopupEditProfile.addEventListener('click', () => {
    closeModal(popupEditProfile)
})
// Закрытие попапа профиля через overlay
popupEditProfile.addEventListener('click', () => {
    closeModal(popupEditProfile)
})
// Отмена всплытия
contentEditProfile.addEventListener('click', (evt) => {
    evt.stopPropagation()
})


// Открытие попапа карточек
buttonNewCard.addEventListener('click', () => {
    openModal(popupNewCard)
})
// Закрытие попапа карточек через кнопку
closePopupNewCard.addEventListener('click', () => {
    closeModal(popupNewCard)
})
// Закрытие попапа карточек через overlay
popupNewCard.addEventListener('click', () => {
    closeModal(popupNewCard)
})
// Отмена всплытия
contentNewCard.addEventListener('click', (evt) => {
    evt.stopPropagation();
})


/* Работа с form */
function handleFormSubmitEditProfile(evt) {
    evt.preventDefault();
    profileTitle.textContent = formEditProfile.name.value
    profileDescription.textContent = formEditProfile.description.value
    closeModal(popupEditProfile)
}

function handleFormSubmitNewCard(evt) {
    evt.preventDefault();
    const data = {link: formNewCard.link.value, name: formNewCard['place-name'].value}
    placesList.prepend(createCard(data, deleteCard, likeCard, handlerPopupImage))
    formNewCard.reset()
    closeModal(popupNewCard)
}

formEditProfile.addEventListener('submit', handleFormSubmitEditProfile)

formNewCard.addEventListener('submit', handleFormSubmitNewCard)