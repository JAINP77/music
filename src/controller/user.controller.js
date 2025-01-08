import userModel from "../model/user.model.js";
import productModel from "../model/model.js";

export default class userController{
    getRegisterForm(req,res){
        res.render('register',{userEmail:req.session.userEmail});
    }
    getLoginForm(req,res){
        res.render('login', { errormessage: null,
            userEmail:req.session.userEmail});
    }
    postRegister(req,res){       
        const{name,password,email} = req.body;
        userModel.add(name,password,email);

        res.render('login',{ errormessage : null,
            userEmail:req.session.userEmail});
    }
    postLogin(req, res) {
        const { email, password } = req.body;
        const result = userModel.isValidUser(email, password);
    
        if (!result) {
            return res.render('login', { errormessage: "Invalid Credentials!", userEmail: req.session.userEmail });
        }        
        else{
            req.session.userEmail = email;
            let products = productModel.get();            
            return res.render('index', { products, userEmail: req.session.userEmail });
        }
    }

    logoutUser(req,res){
        //session deletion/destroy
        req.session.destroy((error)=>{
            if (error) {
                console.log(error);                
            }else{
                res.render('login',{ errormessage: null })                
            }
        });
        // clear cookies
        res.clearCookie('lastVisited');

    }
}