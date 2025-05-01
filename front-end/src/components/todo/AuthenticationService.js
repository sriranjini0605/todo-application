import axios from "axios";
import { API_URL } from "../../Constants";

export const USERNAME_NAME_SESSION_ATTRIBUTE_NAME = "authenticatedUser"
export const JWT_TOKEN = "jwtToken"

class AuthenticationService {

    createBasicAuthToken(username, password) {
        return 'Basic ' + window.btoa(username + ":" + password)
    }

    createJwtToken(token) {
        return 'Bearer ' + token
    }

    executeBasicAuthenticationService(username, password) {
        return axios.get(`${API_URL}/basicauth`, {headers: {authorization: this.createBasicAuthToken(username, password)}})
    }

    executeJwtAuthenticationService(username, password) {
        return axios.post(`${API_URL}/authenticate`, {
            username,
            password
        })
    }

    registerSuccessfulLogin(username, password) {
        sessionStorage.setItem(USERNAME_NAME_SESSION_ATTRIBUTE_NAME, username);
        this.setupAxiosInterceptors(this.createBasicAuthToken(username, password))
    }

    registerSuccessfulLoginForJwt(username, token) {
        sessionStorage.setItem(USERNAME_NAME_SESSION_ATTRIBUTE_NAME, username);
        sessionStorage.setItem(JWT_TOKEN, token)
        this.setupAxiosInterceptors(this.createJwtToken(token))
    }

    logout() {
        sessionStorage.removeItem(USERNAME_NAME_SESSION_ATTRIBUTE_NAME)
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem(USERNAME_NAME_SESSION_ATTRIBUTE_NAME)
        let token = sessionStorage.getItem(USERNAME_NAME_SESSION_ATTRIBUTE_NAME)

        if(user===null || token===null) return false
        return true
    }

    getLoggedInUsername() {
        let user = sessionStorage.getItem(USERNAME_NAME_SESSION_ATTRIBUTE_NAME)
        if(user===null) return ''
        return user
    }

    setupAxiosInterceptors(token) {
        axios.interceptors.request.use(
            (config) => {
                if(this.isUserLoggedIn()) {
                    config.headers.authorization = token
                }
                return config
            },
            (err) => {
                return Promise.reject(err);
             }
        )
    }
}

export default new AuthenticationService()
