const validationRequest = (req,res,next)=>{
    // check the data validation
        let errors = [];
        const {name,price,imageUrl} = req.body;
        if (!name || name.trim()==='') {
            errors.push('Please Enter a Valid Name!');
        }
        if (!price || price < 1) {
            errors.push('Please Enter a Valid Price!');
        }
        // try {
        //     const validUrl = new URL(imageUrl);
        // } catch (error) {
        //     errors.push('please Enter a Valid Url!')
        // }
        
        if (errors.length > 0) {
            return res.render('new-product',{errormessage:errors[0]});            
        }
        next();
}

export default validationRequest;