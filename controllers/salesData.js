const Sales = require('../db/sales');
const Logs = require('../db/logs');
const jwt = require('jsonwebtoken');
const User = require('../db/user');

const sendAllData = async (req,res,next) =>{
    try{

        const token = req.headers.token;

        const decodedToken = jwt.verify(token, 'TVSM');

        const user = await User.findAll({where : {email : decodedToken.email}});

        const logResponse = await Logs.create({
            actor_name : user[0].dataValues.name,
            actor_email : decodedToken.email, 
            action_type : 'data.viewed',
            action_description : `${user[0].dataValues.name} viewed the data`
        })

        const data = await Sales.findAll();

        data.sort((a,b) => {
            const dateA = new Date(a.updatedAt);
            const dateB = new Date(b.updatedAt);
            return dateA - dateB;
        })

        return res
        .status(200)
        .json(data)

    }catch(err){
        return res
        .status(400)
        .json({msg : "Unable to Fetch Data!!"})
    }
}

const addData = async (req,res,next) =>{
    try{
        const data = req.body;
        const token = req.headers.token;
        
        const DealerCodeExists = await Sales.findAll({where : { DealerCode : data.DealerCode }})

        if(DealerCodeExists.length === 0){

            const decodedToken = jwt.verify(token, 'TVSM');
            const user = await User.findAll({where : {email : decodedToken.email}});

            const logResponse = await Logs.create({
                actor_name : user[0].dataValues.name,
                actor_email : decodedToken.email, 
                action_type : 'data.added',
                action_description : `${user[0].dataValues.name} added a record with Dealer Code ${data.DealerCode}`
            })

            const response = await Sales.create(data)
            return res
            .status(200)
            .json({msg : "Record Created Succesfully!!"})
        }

        return res.status(409).json({msg : `Dealer Code Already Exists!!`})

    }catch(err){
        return res
        .status(409)
        .json({"error" : "Conflict"})
    }
}

const editData = async (req,res,next) =>{
    try{
        const data = req.body;
        const token = req.headers.token;

        const [updatedRowsCount, updatedRows] = await Sales.update(
            data,
            { where : { DealerCode : data.DealerCode }}
        )

        if(updatedRowsCount > 0){

            const decodedToken = jwt.verify(token, 'TVSM');
            const user = await User.findAll({where : {email : decodedToken.email}});

            const logResponse = await Logs.create({
                actor_name : user[0].dataValues.name,
                actor_email : decodedToken.email, 
                action_type : 'data.edited',
                action_description : `${user[0].dataValues.name} edited a record with Dealer Code ${data.DealerCode}`
            })

            return res 
            .status(200)
            .json({"msg" : "Data Edited Succesfully!!"})
        }

        return res
            .status(404)
            .json({"msg" : "Data Not Found!!"})

    }catch(err){
        return res
            .status(500)
            .json({msg : "Internal Server Error!!"})
    }
}

const deleteData = async (req, res, next) => {
    try {
        const { DealerCode } = req.body;

        const response = await Sales.destroy({
            where: { DealerCode : DealerCode }
        });

        if (response > 0) {
            return res
            .status(200)
            .json({ msg: `The data with Dealer Code ${DealerCode} deleted successfully!!` });
        }

        res
        .status(200)
        .json({ msg: `No rows deleted. Row with Dealer Code ${DealerCode} not found.` });
    } catch (err) {
        return res
        .status(500)
        .json({ msg: "Error in Deleting Row!! Internal Server Error!!" });
    }
}

const sendLogs = async(req,res,next) => {
    try{
        const token = req.headers.token;

        const decodedToken = jwt.verify(token, 'TVSM');

        const user = await User.findAll({where : {email : decodedToken.email}});

        const logResponse = await Logs.create({
            actor_name : user[0].dataValues.name,
            actor_email : decodedToken.email, 
            action_type : 'data.logs',
            action_description : `${user[0].dataValues.name} accessed the logs`
        })

        const logs = await Logs.findAll();

        return res.status(200).json(logs);

    }catch(err){
        return res.status(500).json({msg : 'Internal Server Error', err : err})
    }
}

module.exports = {
    sendAllData,
    addData,
    editData,
    deleteData,
    sendLogs
}