import userService from '../services/userService';

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'missing input parameter'
        })
    }

    let userData = await userService.handleUserLogin(email, password);
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}

let handleGetAllUsers = async (req, res) => {
    let id = req.query.id;// lay tat ca ng dung hoac lay 1;
    let users = await userService.getAllUsers(id);
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'missing parameter id',
            users: []

        })
    }
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        users

    })
}
let handleCreateNewUser = async (req, res) => {
    let message = await userService.createNewUser(req.body)

    return res.status(200).json(message)
}
let handleDeleteUser = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'missing parameter id'
        })
    }
    let message = await userService.deleteUser(req.body.id)

    return res.status(200).json(message)
}

let handleEditUser = async (req, res) => {
    let data = req.body;
    let message = await userService.updateUserData(data);
    return res.status(200).json(message);
}

let getAllCode = async (req, res) => {
    try {
        let data = await userService.getAllCodeService(req.query.type);
        return res.status(200).json(data)
    } catch (error) {
        console.log('get allcode error', error)
        return res.status(200).json({
            errCode: -1,
            errMessage: "error from server"
        })
    }
}

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleEditUser: handleEditUser,
    handleDeleteUser: handleDeleteUser,
    getAllCode: getAllCode
}