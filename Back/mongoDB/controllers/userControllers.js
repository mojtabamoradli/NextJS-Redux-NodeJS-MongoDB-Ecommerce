import { User } from "../models/userModel.js";

// get all users
const getUsers = async (request, response) => {
    const users = await User.find({});
    response.status(200).json(users)
}

// signup a new google user
const signupGoogleUser = async (request, response) => {
    const {fullName, email} = request.body

    try {
        const user = await User.create({fullName, email, password: "passwordless", emailVerified: true})
        response.status(200).json(user)
    } catch (error) {
        response.status(400).json({error: error.message})
    }
}

// signup a new user
const signupUser = async (request, response) => {
    const {fullName, email, password} = request.body

    try {
        const user = await User.create({fullName, email, password})
        response.status(200).json(user)
    } catch (error) {
        response.status(400).json({error: error.message})
    }
}

// alter a user
const alterUser = async (request, response) => {
    const {id} = request.params

    const user = await User.findOneAndUpdate({_id: id}, {
        ...request.body
    })
    response.status(200).json(user)
}



export {getUsers, signupUser, alterUser, signupGoogleUser}