export const authenticateUser = (token) => {
    localStorage.setItem('token', token)
}

export const dataUser = (name, surname) => {
    localStorage.setItem('user', JSON.stringify(`${name} ${surname}`))
}

export const isUserAuthenticated = () => {
    return localStorage.getItem('token') !== null
}

export const deauthenticateUser= () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('isAdmin')
}


export const getToken = () => {
    return localStorage.getItem('token')
}


export const getUser = () => {
    return localStorage.getItem('user').replace(/['"]+/g, '') 
}

export const setAdmin = (boolean) => {
    localStorage.setItem('isAdmin', JSON.stringify(boolean))
}

export const isAdmin = () => {
    return localStorage.getItem('isAdmin') !== null
}
