function userAdmin (req, res, next){

    res.locals.isAdmin = false;

    if (req.session.userLogged){
        
        let user = req.session.userLogged

        if (user.rol_id == 2) {
            
            res.locals.isAdmin = true;

        }
        
    }

    next();

} 

module.exports = userAdmin;