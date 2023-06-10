export const RestURL = "http://localhost:9000/api"
export let RestService = {
    async signup(body) {
        let headers = { 'Content-Type': 'application/json'}
        return fetch(RestURL + "/user/new", {
            method: "POST", 
            headers,
            body: JSON.stringify(body)
        }).then(res => res.json())
    },
    async login(body) {
        let headers = { 'Content-Type': 'application/json'}
        return fetch(RestURL + "/user/login", {
            method: "POST", 
            headers,
            body: JSON.stringify(body)
        }).then(res => res.json())
    },
    async getAccount(userId, token) {
        let headers = { 'Content-Type': 'application/json', 'access-token':token }
        return fetch(RestURL + `/account/get/${userId}`, {
            method: "GET", 
            headers,
        }).then(res => res.json())
    },
    async getAllTransactions(body, token) {
        let headers = { 'Content-Type': 'application/json', 'access-token':token }
        return fetch(RestURL + `/account/transaction/all?${body}`, {
            method: "GET", 
            headers,
        }).then(res => res.json())
    },
    async deposit(body, token) {
        let headers = { 'Content-Type': 'application/json', 'access-token':token }
        return fetch(RestURL + "/account/deposit", {
            method: "PUT", 
            headers,
            body: JSON.stringify(body)
        }).then(res => res.json())
    },
    async withdraw(body, token) {
        let headers = { 'Content-Type': 'application/json', 'access-token':token }
        return fetch(RestURL + "/account/withdraw", {
            method: "PUT", 
            headers,
            body: JSON.stringify(body)
        }).then(res => res.json())
    },
    async transfer(body, token) {
        let headers = { 'Content-Type': 'application/json', 'access-token':token }
        return fetch(RestURL + "/account/transfer", {
            method: "PUT", 
            headers,
            body: JSON.stringify(body)
        }).then(res => res.json())
    },
    
}