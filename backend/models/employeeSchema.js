import mongoose from 'mongoose'

const excelSchema =mongoose.Schema({
    }
    employeeName:{
        type:String
    },

    email:{
        type:email
    },

    dateOfJoin:{
        type:Date
    },

    passWord:{
        type:password
    },


})

module.exports = mongoose.model('employeeSchema',excelSchema)