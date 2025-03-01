const express = require('express');
let router = express.Router();
// const checkAuth = require('../middleware/check-auth');
const upload = require('../middleware/upload');

const {
  HandleAddEmployee,
  HandleDeleteEmployeeById,
  HandleGetAllEmployee,
  HandleGetEmployeeById,
  HandlePatchEmployeeById,
  HandleSearchEmployee,
  HandleUpdateEmployeeById,
} = require('../controller/employee');

// router.route('/getAllEmployee').get(HandleControllerOne).post(HandleControllerTwo);
router.post('/addEmployee', upload.single('avatar'), HandleAddEmployee);
router.get('/getAllEmployee', HandleGetAllEmployee);
router.get('/getEmployeeById/:id', HandleGetEmployeeById);
router.put('/updateEmployeeById/:id', HandleUpdateEmployeeById);
router.patch('/patchEmployeeById/:id', HandlePatchEmployeeById);
router.delete('/deleteEmployeeById/:id', HandleDeleteEmployeeById);
router.get('/search/:key', HandleSearchEmployee);

// Product API find
// router.post('/post/date', (req,res)=>{
//     let startDate = req.body.startDate;
//     let endDate = req.body.endDate;

//     Product.find({
//         createdOn : {
//             $gte:startDate,
//             $lte:endDate
//         }

//     }).then((data)=>{
//         res.status(202).json({
//             Products:data
//         })
//     })
// })

module.exports = router;
