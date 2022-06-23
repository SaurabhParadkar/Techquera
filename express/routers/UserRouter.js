const express = require('express')

const userModel = require('../models/UserModel')
const queryModel = require('../models/QueryModel')

const router = express.Router()

router.post('/sendans',(request,response)=>
{
    var data = request.body
    var id = request.session.user._id;
    data.user = id
    queryModel.saveAns(data,(result)=>
    {
        response.json({status:result})
    })
})

router.get('/loadotherquery',(request,response)=>
{
    var id = request.session.user._id;
    queryModel.loadOtherQuery(id,(result)=>
    {
        response.json(result)
    })
})

router.get('/loadquery',(request,response)=>
{
    var id = request.session.user._id;
    queryModel.loadQuery(id,(result)=>
    {
        response.json(result)
    })
})

router.post('/ask',(request,response)=>
{
    var data = request.body
    data.user = request.session.user._id
    data.send_date = new Date().toDateString()

    queryModel.saveQuery(data,(result)=>
    {
        response.json({status:result})
    })
});

router.post("/saveuser",(request,response)=>
{
    console.log(request.body)
    userModel.saveUser(request.body,(result)=>
    {
        response.json({status:result})
    })
})

router.post("/loginuser",(request,response)=>
{    
    userModel.loginUser(request.body,(result)=>
    {
        if(result)
        {
            request.session.user = result
            response.json({status:true})
        }
        else    
            response.json({status:false})
    })
})

router.get("/logout",(request,response)=>
{
    request.session.destroy()
    response.json({status:true})
});

router.get("/checksession",(request,response)=>
{
    if(request.session.user==undefined)
        response.json({status:false})
    else
        response.json({status:true})    
})

module.exports = router