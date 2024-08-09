import './pages/index.css';
import {createCard, deleteCard, likeCard} from './components/card';
import {openModal, closeModal} from './components/modal';
import {clearValidation, enableValidation} from "./components/validation";
import {AvatarEditApi, createCardApi, editProfileApi, initialApp} from "./components/api";

export const placesList = document.querySelector('.places__list')

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

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
const avatar = document.querySelector('.profile__image')

const popupImage = document.querySelector('.popup_type_image')
const closePopupImage = popupImage.querySelector('.popup__close')
const popupImagePic = popupImage.querySelector('.popup__image')
const popupImageDesc = popupImage.querySelector('.popup__caption')

const formEditAvatar = document.forms['avatar']
const popupAvatar = document.querySelector('.popup_type_avatar')
const popupAvatarClose = popupAvatar.querySelector('.popup__close')
const popupAvatarContent = popupAvatar.querySelector('.popup__content')

const handlerPopupAvatar = (data) => {
    openModal(popupAvatar)
    formEditAvatar.avatar.value = data.target.style.backgroundImage.split("\"")[1]
    clearValidation(formEditAvatar, validationConfig)
}

avatar.addEventListener('click', handlerPopupAvatar)

popupAvatar.addEventListener('click', () => {
    closeModal(popupAvatar)
})
popupAvatarClose.addEventListener('click',() => {
    closeModal(popupAvatar)
})
popupAvatarContent.addEventListener('click',(evt) => {
    evt.stopPropagation()
})


// Открытия попапа изображения
const handlerPopupImage = (data) => {
    openModal(popupImage)
    popupImagePic.src = data.link
    popupImagePic.alt = data.name
    popupImageDesc.textContent = data.name
}

popupImagePic.addEventListener('click', (evt) => {
    evt.stopPropagation()
})
// Закрытие попапа изображения через кнопку
closePopupImage.addEventListener('click', () => {
    closeModal(popupImage)
})
// Закрытие попапа изображения через overlay
popupImage.addEventListener('click', () => {
    closeModal(popupImage)
})

// Открытие попапа редактирования профиля
buttonEditProfile.addEventListener('click', () => {
    openModal(popupEditProfile)
    formEditProfile.name.value = profileTitle.textContent
    formEditProfile.description.value = profileDescription.textContent
    clearValidation(formEditProfile, validationConfig)
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
const workApi = (api, success, formElement,...args) => {
    formElement.querySelector('.popup__button').textContent = 'Сохранение...'
    api(...args).then((response) => {success(response)}).catch(error => {
        console.error(`Ошибка ${error}`)
    }).finally(() => {
        formElement.querySelector('.popup__button').textContent = 'Сохранить'
    })
}

function handleFormSubmitEditProfile(evt) {
    evt.preventDefault();
    const success = updatedProfile => {
        profileTitle.textContent = updatedProfile.name
        profileDescription.textContent = updatedProfile.about
        closeModal(popupEditProfile)
    }
    workApi(editProfileApi, success, formEditProfile, formEditProfile.name.value, formEditProfile.description.value)
}

function handleFormSubmitNewCard(evt) {
    evt.preventDefault();
    const success = card => {
        placesList.prepend(createCard(card.owner['_id'], card, deleteCard, likeCard, handlerPopupImage))
        formNewCard.reset()
        clearValidation(formNewCard, validationConfig)
        closeModal(popupNewCard)
    }
    workApi(createCardApi, success, formNewCard, formNewCard['place-name'].value, formNewCard.link.value)
}

function handleFormSubmitAvatar(evt) {
    evt.preventDefault();
    const success = res => {
        avatar.style.backgroundImage = `url(${res.avatar})`
        closeModal(popupAvatar)
    }
    workApi(AvatarEditApi, success, formEditAvatar, formEditAvatar.avatar.value)
}


formEditProfile.addEventListener('submit', handleFormSubmitEditProfile)
formNewCard.addEventListener('submit', handleFormSubmitNewCard)
formEditAvatar.addEventListener('submit', handleFormSubmitAvatar)


enableValidation(validationConfig)

/* API */

initialApp().then(res => {
    const meInfo = res[0]
    const cardList = res[1]

    profileTitle.textContent = meInfo.name
    profileDescription.textContent = meInfo.about
    avatar.style.backgroundImage = `url(${meInfo.avatar})`

    cardList.forEach((card) => {
        placesList.append(createCard(meInfo['_id'], card, deleteCard, likeCard, handlerPopupImage))
    })
}).catch(error => {
    console.error(`Ошибка ${error}`)
})