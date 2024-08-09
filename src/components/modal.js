const closePopupByEsc = (evt) => {
    if (evt.key === 'Escape') {
        const modal = document.querySelector('.popup_is-opened')
        closeModal(modal)
    }
}

export const openModal = (modal) => {
    modal.classList.add('popup_is-opened');
    document.addEventListener('keydown', closePopupByEsc);
}

export const closeModal = (modal) => {
    modal.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closePopupByEsc);
}