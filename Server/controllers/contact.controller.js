const Contact = require('../models/Contact.model');

const sendMessage = async(req,res,next) => {
    try {
        const messages = await new Contact(req.body);
        await messages.save();
        res.status(201).json({message: "Message Send Successfully, We will contact you soon"});
    } catch (err) {
        next(err);
    }
};

const deleteMessage = async(req,res,next) => {
    try {
        const findMessage = await Contact.findById(req.params.id);
        if(!findMessage) return res.status(404).json({message: "Message Not Found"});
        await findMessage.remove();
        res.status(200).json({message: "Message Deleted Successfully"});
    } catch (err) {
        next(err);
    }
};

const allMessages = async(req,res,next) => {
    try {
        const allMessage = await Contact.find();
        if(!allMessage) return res.status(200).json({message: "Not Message Found"});
        res.status(200).json(allMessage);
    } catch (err) {
        next(err);
    }
}

const oneMessage = async (req,res,next) => {
    try {
        const oneMessage = await Contact.findById(req.params.id);
        if(!oneMessage) return res.status().json({message: "Message Not Found"});
        res.status(200).json(oneMessage);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    sendMessage,
    deleteMessage,
    allMessages,
    oneMessage
};