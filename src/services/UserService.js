import axios from 'axios'
import { axiosApiInstance } from './instance';
import { authenticateUser, dataUser, setAdmin, isAdmin as isAdminAuthenticatedAuth, isUserAuthenticated as isUserAuthenticatedAuth, getUser as getUserAuthenticatedAuth,  deauthenticateUser as deauthenticateUserAuthenticatedAuth } from '../utils/localstorage';


export default class Users {
    
    async getUsers() {
        try {
            const response = await axiosApiInstance.get(`/users`);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async signUp(name, surname, departament, business, telephone, email, isAdmin) {
        try {
            var data = JSON.stringify({name, surname, departament, business, telephone, email, role: isAdmin ? "ADMIN" : "STANDARD"});
            await axiosApiInstance.post(`${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_BASE_URL}/register`, data, 
            {headers: {'Content-Type': 'application/json'}})
            return true
        } catch (error) {
           return false
        }
    }

    async updateById(name, surname, departament, business, telephone, email, isAdmin, id) {
        try {
            var data = JSON.stringify({name, surname, departament, business, telephone, email, role: isAdmin ? "ADMIN" : "STANDARD"});
            await axiosApiInstance.post(`${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_BASE_URL}/user/${id}`, data, 
            {headers: {'Content-Type': 'application/json'}})
            return true
        } catch (error) {
           return false
        }
    }

    async login(email, password) {
        try {
            var data = JSON.stringify({"email": email,"password" : password});
            const response = await axios.post(`${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_BASE_URL}/login`, data, 
            {headers: {'Content-Type': 'application/json'}})
            authenticateUser(response.data.user.token);
            dataUser(response.data.user.name, response.data.user.name);
            if (response.data.user.role !== undefined && response.data.user.role === "ADMIN"){
                setAdmin(true);
            }
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async getUserInfoById(id){
        try {
            const response = await axiosApiInstance.get(`/user/${id}`) 
            return response.data.user;
        } catch (error) {
            console.log(error);
            return false;
        }
        
    }

    async deleteUserById(id){
        try {
            console.log("Delete " + id)
            await axiosApiInstance.delete(`/user/${id}`) 
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
        
    }

    loginValidate(user, setError) {
        if (user.email !== 'admin') {
            if ( user.email === '' ) {
                setError({severity : 'warning', message: "Debe ingresar su email"})
                return false;
            }
            if ( user.email.indexOf('@') === -1) {
                setError({severity : 'warning', message: "Debe ingresar un email valido"})
                return false;
            }
            if ( user.password === '' ) {
                setError({severity : 'warning', message: "Debe ingresar su contraseña"})
                return false;
            }
            if ( user.password.length < 7 ) {
                setError({severity : 'warning', message: "Contraseña incorrecta"})
                return false;
            }
        }
        return true;
    }

    signUpValidate(user, setError) {
        if ( user.name === '' ) {
            setError({severity : 'warning', message: "Debe ingresar el nombre"})
            return false;
        }
        if ( user.surname === '' ) {
            setError({severity : 'warning', message: "Debe ingresar el apellido"})
            return false;
        }
        if ( user.business === '' ) {
            setError({severity : 'warning', message: "Debe ingresar la unidad de negocio"})
            return false;
        }
        if ( user.departament === '' ) {
            setError({severity : 'warning', message: "Debe ingresar el sector"})
            return false;
        }
        if ( user.email === '' ) {
            setError({severity : 'warning', message: "Debe ingresar el email"})
            return false;
        }
        if ( user.email.indexOf('@') === -1) {
            setError({severity : 'warning', message: "Debe ingresar un email valido"})
            return false;
        }
        if ( user.telephone === '' ) {
            setError({severity : 'warning', message: "Debe ingresar el telefono"})
            return false;
        }
        return true;
    }

    async addNewItem(newItem) {
        try {
            var data = JSON.stringify({"name": newItem.name,"price" : newItem.price, "weight": newItem.weight, "cat": newItem.cat});
            await axiosApiInstance.post(`/newitem`, data);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async getItems() {
        try {
            return await axios.get(`${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_BASE_URL}/items`);
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    
    isUserAuthenticated() {
        return isUserAuthenticatedAuth();
    }

    isAdmin() {
        return isAdminAuthenticatedAuth();
    }

    getUser(){
        return getUserAuthenticatedAuth();
    }

    deauthenticateUser(){
        return deauthenticateUserAuthenticatedAuth();
    }

}