import express from require('express');
var router = express.Router()
import bcrypt from'bcryptjs'
import jsonwt from 'jsonwebtoken'
import passport from 'passport'
import apikey from '../../setup/api.js'

// Sub routes after login 


//@type       GET
//@route      /api/auth
//@desc       just for testing
//@access     PUBLIC

router.get('/',(req,res)=> res.json({test:"auth is succesful"}))




//@type       POST
//@route      /api/auth/login
//@desc       route for login of users
//@access     PUBLIC
router.post('/login',(req,res) =>{
    const email = req.body.email;
    const password= req.body.password;

excelSchema.findOne({email})
    .then(person => {
        if(!person)
        {
            return res
            .status(404)
            .json({emailerror:'usernotfound'})
        }
        bcrypt
        .compare(password,person.password)
        .then(isCorrect =>{
            if(isCorrect){
               // res.json({success:'user is able to login sucessfully'})
                //use payload and create token for user

                const payload={
                    id:person.id,
                    employeeName:person.name,
                    email:person.email,
                    dateOfJoin:person.dateOfJoin
                }
                jsonwt.sign(payload,
                    key.secret,
                    {expiresIn:3600},
                    (err,token)=> {
                        res.json({success:true,
                        token:"Bearer " +token})
                    }
            )
                }else{
                res.status(400).json({passworderr:"password is not correct"})
            }


    })  
        .catch(err => console.log(err))
        
    })
    .catch(err => console.log(err))
})

//@type       GET
//@route      /profile
//@desc       route for user profile
//@access     PRIVATE

router.get('/profile',passport.authenticate('jwt',{session:false}),(req,res) =>
{
    //console.log(req);
    res.json({
        id:req.user.id,
        emplyeeName:req.user.employeeName,
        email:req.user.email,
        dateOfJoin:req.user.dateOfJoin
    })
})


//@type       DELETE
//@route      /-id/w_id
//@desc       route for deleting a specific workrole of user 
//@access     PRIVATE
router.delete('/_id/:w_id',passport.authenticate('jwt',{session: false}),(req,res) =>{
   
    excelSchema.findOne({user:req.user.id})
        .then(employeeName =>{
            if(JSON.Stringify(user.auth ) === 'admin'){

            const removethis = employeeName._id
            .map(item =>item.id)
            .indexOf(req.params._id)
            employeeName._id.splice(removethis,1);
            employeeName
              .save()
              .then(employeeName =>res.json(employeeName))
              .catch(err =>console.log(err))
        }

        })
    })
        .catch(err=>console.log(err))
    


module.exports = router;

