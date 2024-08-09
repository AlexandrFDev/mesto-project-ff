const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-19',
    headers: {
        authorization: '8664af42-679d-4145-b6a3-4f993e57c866',
        'Content-Type': 'application/json'
    }
}

const getResponseData = (res) => {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
}

export const getMeInfo = () => {
    return fetch(`${config.baseUrl}/users/me`,{
        headers: config.headers
    }).then(getResponseData)
}

export const getAllCards = () => {
    return fetch(`${config.baseUrl}/cards`,{
        headers: config.headers
    }).then(getResponseData)
}

export const initialApp = () => {
    return Promise.all([getMeInfo(), getAllCards()])
}

export const editProfileApi = (name, about) => {
    return fetch(`${config.baseUrl}/users/me`,{
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name,
            about
        })
    }).then(getResponseData)
}

export const createCardApi = (name, link) => {
    return fetch(`${config.baseUrl}/cards`,{
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name,
            link
        })
    }).then(getResponseData)
}

export const deleteCardApi = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`,{
        method: 'DELETE',
        headers: config.headers
    }).then(getResponseData)
}

export const likeCardApi = (cardId, isDelete = false) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`,{
        method: isDelete ? 'DELETE' : 'PUT',
        headers: config.headers,
    }).then(getResponseData)
}

export const AvatarEditApi = (avatar) => {
    return fetch(`${config.baseUrl}/users/me/avatar`,{
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar
        })
    }).then(getResponseData)
}

