import axios from 'axios'
import { axiosApiInstance } from './instance';
import { authenticateUser, dataUser, setAdmin, isAdmin as isAdminAuthenticatedAuth, isUserAuthenticated as isUserAuthenticatedAuth, getUser as getUserAuthenticatedAuth, deauthenticateUser as deauthenticateUserAuthenticatedAuth } from '../utils/localstorage';


export default class Users {

    async getUsers() {
        try {
            const response = await axiosApiInstance.get(`/users`);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async login(email, password) {
        try {
            var data = JSON.stringify({ "email": email, "password": password });
            const response = await axios.post(`${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_BASE_URL}/login`, data,
                { headers: { 'Content-Type': 'application/json' } })

            console.log(response)
            authenticateUser(response.data.user.token);
            dataUser(response.data.user.name, response.data.user.name);
            if (response.data.user.role !== undefined && response.data.user.role === "ADMIN") {
                setAdmin(true);
            }
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async deleteUserById(id) {
        try {
            console.log("Delete " + id)
            await axiosApiInstance.delete(`/delete-item/${id}`)
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }

    }

    loginValidate(user, setError) {
        if (user.email !== 'admin') {
            if (user.email === '') {
                setError({ severity: 'warning', message: "Debe ingresar su email" })
                return false;
            }
            if (user.email.indexOf('@') === -1) {
                setError({ severity: 'warning', message: "Debe ingresar un email valido" })
                return false;
            }
            if (user.password === '') {
                setError({ severity: 'warning', message: "Debe ingresar su contraseña" })
                return false;
            }
            if (user.password.length < 7) {
                setError({ severity: 'warning', message: "Contraseña incorrecta" })
                return false;
            }
        }
        return true;
    }

    signUpValidate(user, setError) {
        if (user.name === '') {
            setError({ severity: 'warning', message: "Debe ingresar el nombre" })
            return false;
        }
        if (user.surname === '') {
            setError({ severity: 'warning', message: "Debe ingresar el apellido" })
            return false;
        }
        if (user.business === '') {
            setError({ severity: 'warning', message: "Debe ingresar la unidad de negocio" })
            return false;
        }
        if (user.departament === '') {
            setError({ severity: 'warning', message: "Debe ingresar el sector" })
            return false;
        }
        if (user.email === '') {
            setError({ severity: 'warning', message: "Debe ingresar el email" })
            return false;
        }
        if (user.email.indexOf('@') === -1) {
            setError({ severity: 'warning', message: "Debe ingresar un email valido" })
            return false;
        }
        if (user.telephone === '') {
            setError({ severity: 'warning', message: "Debe ingresar el telefono" })
            return false;
        }
        return true;
    }

    async addNewItem(newItem) {
        try {
            var data = JSON.stringify({ "name": newItem.name, "price": newItem.price, "package": newItem.package, "cat": newItem.cat });
            await axiosApiInstance.post(`/new-item`, data);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async modifyItem(item) {
        try {
            var data = JSON.stringify({ "name": item.name, "price": item.price, "weight": item.weight, "cat": item.cat });
            await axiosApiInstance.post(`/modify-item`, data);
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

    async newBox(newBox) {
        try {
            const response = await axiosApiInstance.post("/new-box", JSON.stringify({ name: newBox.name, price: newBox.price }));
            return response.data.item;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async getBoxes() {
        try {
            const response = await axios.get(`${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_BASE_URL}/boxes`);
            return response.data.boxes;
        } catch (error) {
            return false;
        }
    }

    async deleteBox(id) {
        try {
            const response = await axiosApiInstance.delete("/delete-box/" + id);
            return response.data;
        } catch (error) {
            return false;
        }
    }

    async addItemInnerBox(order) {
        try {
            var data = JSON.stringify({ order });
            const response = await axiosApiInstance.post("/add-item-inner-box", data);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    async removeItemInBox(boxId, itemId) {
        try {
            var data = JSON.stringify({ boxId, itemId });
            const response = await axiosApiInstance.post("/remove-item-inner-box", data);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    async submitOrder(order) {
        try {
            var data = JSON.stringify(order);
            await axios.post(`${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_BASE_URL}/add-order`, data,
                { headers: { 'Content-Type': 'application/json' } });
            return true;
        } catch (error) {
            console.error(error);
        }
    }

    async getOrders() {
        try {
            const response = await axiosApiInstance.get("/orders");
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    async getOrderById(id) {
        try {
            const response = await axiosApiInstance.get("/order/" + id);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    async cleanOrders(orders) {
        try {
            var data = JSON.stringify(orders);
            const response = await axiosApiInstance.post("/clean-orders", data);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
    
    async cleanOrder(orderID) {
        try {
            const response = await axiosApiInstance.post("/delete-order/" + orderID );
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }


    prueba() {
        console.log("prueba")
    }

    isUserAuthenticated() {
        return isUserAuthenticatedAuth();
    }

    isAdmin() {
        return isAdminAuthenticatedAuth();
    }

    getUser() {
        return getUserAuthenticatedAuth();
    }

    deauthenticateUser() {
        return deauthenticateUserAuthenticatedAuth();
    }

}