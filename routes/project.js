const express = require('express');
let router = express.Router();
// const checkAuth = require('../middleware/check-auth');
const upload = require('../middleware/upload');

const {
    getAllProjects,
    getProjectById,
    getProjectsByUserEmail,
    getProjectsByUserId,
    leaveProject,
    createProject
} = require('../controller/project');
const { addGroupToProject } = require('../controller/group');



// router.route('/getAllEmployee').get(HandleControllerOne).post(HandleControllerTwo);
// router.post('/addEmployee', upload.single('avatar'), HandleAddEmployee);
router.get('/', getAllProjects);
router.post('/', createProject);
router.get('/:id', getProjectById);
router.get('/email/:email', getProjectsByUserEmail);
router.get('/:uid', getProjectsByUserId);
router.post('/group', addGroupToProject);
router.delete('/user/leave', leaveProject)
// router.put('/updateEmployeeById/:id', HandleUpdateEmployeeById);
// router.patch('/patchEmployeeById/:id', HandlePatchEmployeeById);
// router.delete('/deleteEmployeeById/:id', HandleDeleteEmployeeById);
// router.get('/search/:key', HandleSearchEmployee);


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

module.exports=router;