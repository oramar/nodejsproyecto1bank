const express = require('express');
class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT || 9000
        this.paths={
            
        }
        
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log(`Server listening on port ${this.port}`)

        })
    }
}
module.exports = Server;