const mongo = require('./mongo')

const user = function()
{
    this.saveUser = function(data,callback)
    {
        mongo((status,db,client)=>
        {
            if(status)
            {
                db.collection('user').insertOne(data,(err)=>
                {
                    client.close()
                    if(err)
                        callback(false)
                    else
                        callback(true)                        
                });
            }else{
                callback(false)
            }
        })
    }


    this.loginUser = function(data,callback)
    {
        mongo((status,db,client)=>
        {
            if(status)
            {                
                db.collection('user').findOne(data,(err,ob)=>
                {
                    //console.log(ob)
                    client.close()
                    if(err || ob==null)
                        callback(false)
                    else
                        callback(ob)                    
                });
            }else{
                callback(false)
            }
        })
    }
}

module.exports = new user()