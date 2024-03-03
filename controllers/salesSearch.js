const Logs = require('../db/logs');
const Sales = require('../db/sales');
const User = require('../db/user');
const jwt = require('jsonwebtoken');
 
const searchFunction = async (inputData) => {
    const salesData = await Sales.findAll();
 
    let matchingValues = new Map();
 
    for (let i = 0; i < salesData.length; i++) {
        const sale = salesData[i].dataValues;
 
        for (const key in sale) {

            if(sale[key] == null){
                continue;
            }

            let lowerInputData = inputData.toLowerCase();
            let stringSale = sale[key].toString().toLowerCase();
            stringSaleArray = stringSale.split(" ");
            
            for(let i = 0;i < stringSaleArray.length;i++){
                if (stringSaleArray[i] === lowerInputData) {
                    matchingValues.set(sale.DealerCode, sale);
                    break;
                }
            }
        }
    }
 
    return matchingValues;
}
 
const searchSalesData = async (req, res, next) => {
    try {
        const { inputData } = req.body;
        const token = req.headers.token;
 
        const inputArray = inputData.split(" ");
        inputArray.push(inputData);
        console.log(inputArray);
        let outputMap = new Map();
 
        for (let i = 0; i < inputArray.length; i++) {
            let matchingSales = await searchFunction(inputArray[i]);
            matchingSales.forEach((sale, DealerCode) => outputMap.set(DealerCode, sale));
        }
 
        const outputArray = Array.from(outputMap.values());
 
        if(outputArray.length === 0){
            return res
                .status(404)
                .json({msg : "No Record Found!!"})
        }
        
        const decodedToken = jwt.verify(token, 'TVSM');
        const user = await User.findAll({where : {email : decodedToken.email}});

        const logResponse = await Logs.create({
            actor_name : user[0].dataValues.name,
            actor_email : decodedToken.email, 
            action_type : 'data.searched',
            action_description : `${user[0].dataValues.name} used search function`
        })

        return res
        .status(200)
        .json(outputArray);
 
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Internal server error' });
    }
}
 
module.exports = {
    searchSalesData
};