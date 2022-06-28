import db from '../models/index';
import CRUDService from '../services/CRUDService';

let getHomePage = async (req, res) => {

    try {
        let data = await db.User.findAll();
        return res.render("homepage.ejs", {
            data: JSON.stringify(data)
        });
    } catch (error) {
        console.log(error);
    }

}
let getCRUD = (req, res) => {
    res.render('CRUD.ejs');
}
let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    console.log(message);
    res.send('hello POSTCRUD');
}
let displayCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser();
    console.log(data);
    res.render('displayCRUD.ejs', {
        data: JSON.stringify(data)
    });
}

module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayCRUD: displayCRUD,
}