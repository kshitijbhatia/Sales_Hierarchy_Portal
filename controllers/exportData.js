const Sales = require('../db/sales');
const excel = require('exceljs');
const User = require('../db/user');
const Logs = require('../db/logs');
const jwt = require('jsonwebtoken');

const exportData = async (req,res,next) => {
    try{
        const sales = await Sales.findAll();
        
        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('Sales Data');

        worksheet.columns = [
            { header: 'Dealer Code', key: 'DealerCode', width: 25 },
            { header: 'Dealer Name', key: 'DealerName', width: 25 },
            { header: 'Dealer Email Address', key: 'DealerEmailAddress', width: 25 },
            { header: 'Dealer Contact Number', key: 'DealerContactNumber', width: 25 },
            { header: 'TM Role', key: 'TMRole', width: 25 },
            { header: 'TM Name', key: 'TMName', width: 25 },
            { header: 'TM Email Address', key: 'TMEmailAddress', width: 25 },
            { header: 'TM Phone Number', key: 'TMPhoneNumber', width: 25 },
            { header: 'TM User Name', key: 'TMUserName', width: 25 },
            { header: 'AM Role', key: 'AMRole', width: 25 },
            { header: 'AM Name', key: 'AMName', width: 25 },
            { header: 'AM Email Address', key: 'AMEmailAddress', width: 25 },
            { header: 'AM Phone Number', key: 'AMPhoneNumber', width: 25 },
            { header: 'AM User Name', key: 'AMUserName', width: 25 },
            { header: 'NSM Role', key: 'NSMRole', width: 25 },
            { header: 'NSM Name', key: 'NSMName', width: 25 },
            { header: 'NSM Email Address', key: 'NSMEmailAddress', width: 25 },
            { header: 'NSM Phone Number', key: 'NSMPhoneNumber', width: 25 },
            { header: 'NSM User Name', key: 'NSMUserName', width: 25 },
            { header: 'NSM1 Name', key: 'NSM1Name', width: 25 },
            { header: 'NSM1 Email Address', key: 'NSM1EmailAddress', width: 25 },
            { header: 'NSM1 Phone Number', key: 'NSM1PhoneNumber', width: 25 },
            { header: 'NSM1 User Name', key: 'NSM1UserName', width: 25 },
            { header: 'VP Role', key: 'VPRole', width: 25 },
            { header: 'VP Name', key: 'VPName', width: 25 },
            { header: 'VP Email Address', key: 'VPEmailAddress', width: 25 },
            { header: 'VP Phone Number', key: 'VPPhoneNumber', width: 25 },
            { header: 'VP User Name', key: 'VPUserName', width: 25 },
            { header: 'VP1 Name', key: 'VP1Name', width: 25 },
            { header: 'VP1 Email Address', key: 'VP1EmailAddress', width: 25 },
            { header: 'VP1 Phone Number', key: 'VP1PhoneNumber', width: 25 },
            { header: 'VP1 User Name', key: 'VP1UserName', width: 25 },
            { header: 'VP2 Name', key: 'VP2Name', width: 25 },
            { header: 'VP2 Email Address', key: 'VP2EmailAddress', width: 25 },
            { header: 'VP2 Phone Number', key: 'VP2PhoneNumber', width: 25 },
            { header: 'VP2 User Name', key: 'VP2UserName', width: 25 },
            { header: 'HO Role', key: 'HORole', width: 25 },
            { header: 'HO Name', key: 'HOName', width: 25 },
            { header: 'HO Email Address', key: 'HOEmailAddress', width: 25 },
            { header: 'HO Phone Number', key: 'HOPhoneNumber', width: 25 },
            { header: 'HO User Name', key: 'HOUserName', width: 25 }
        ];

        sales.forEach(sale => {
            worksheet.addRow({
                DealerCode: sale.DealerCode,
                DealerName: sale.DealerName,
                DealerEmailAddress: sale.DealerEmailAddress,
                DealerContactNumber: sale.DealerContactNumber,
                TMRole: sale.TMRole,
                TMName: sale.TMName,
                TMEmailAddress: sale.TMEmailAddress,
                TMPhoneNumber: sale.TMPhoneNumber,
                TMUserName: sale.TMUserName,
                AMRole: sale.AMRole,
                AMName: sale.AMName,
                AMEmailAddress: sale.AMEmailAddress,
                AMPhoneNumber: sale.AMPhoneNumber,
                AMUserName: sale.AMUserName,
                NSMRole: sale.NSMRole,
                NSMName: sale.NSMName,
                NSMEmailAddress: sale.NSMEmailAddress,
                NSMPhoneNumber: sale.NSMPhoneNumber,
                NSMUserName: sale.NSMUserName,
                NSM1Name: sale.NSM1Name,
                NSM1EmailAddress: sale.NSM1EmailAddress,
                NSM1PhoneNumber: sale.NSM1PhoneNumber,
                NSM1UserName: sale.NSM1UserName,
                VPRole: sale.VPRole,
                VPName: sale.VPName,
                VPEmailAddress: sale.VPEmailAddress,
                VPPhoneNumber: sale.VPPhoneNumber,
                VPUserName: sale.VPUserName,
                VP1Name: sale.VP1Name,
                VP1EmailAddress: sale.VP1EmailAddress,
                VP1PhoneNumber: sale.VP1PhoneNumber,
                VP1UserName: sale.VP1UserName,
                VP2Name: sale.VP2Name,
                VP2EmailAddress: sale.VP2EmailAddress,
                VP2PhoneNumber: sale.VP2PhoneNumber,
                VP2UserName: sale.VP2UserName,
                HORole: sale.HORole,
                HOName: sale.HOName,
                HOEmailAddress: sale.HOEmailAddress,
                HOPhoneNumber: sale.HOPhoneNumber,
                HOUserName: sale.HOUserName
            });
        });

        worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
            row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
                cell.alignment = { vertical: 'middle', horizontal: 'left' }; // Set horizontal alignment to left
            });
        });
        
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename="sales.xlsx"');

        const decodedToken = jwt.verify(token, 'TVSM');
            const user = await User.findAll({where : {email : decodedToken.email}});

            const logResponse = await Logs.create({
                actor_name : user[0].dataValues.name,
                actor_email : decodedToken.email, 
                action_type : 'data.export',
                action_description : `Data exported by ${user[0].dataValues.name}`
            })

        await workbook.xlsx.write(res);
        res.end();
    }catch(err){
        res.status(500).send('Error exporting data');
    }
}

module.exports = {
    exportData
}