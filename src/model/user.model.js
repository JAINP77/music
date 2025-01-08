import { name } from "ejs";

export default class userModel {
    constructor(id,name,password,email) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.email = email;
    }

    static add(name,password,email){
        let newUser = new userModel(
            users.length+1,
            name,
            password,
            email,
        )
        users.push(newUser);
    }
    static isValidUser(email,password){
        let result =  users.find((u)=>{
            return u.email==email && u.password==password;
        });
        return result;
    }
}


var users = [
    {
        id:1,
        name:'Abhishek Jain',
        email:'abhiprince.512@gmail.com',
        password:1234
    }
];