import app from "./app"
require("dotenv").config();
const port = process.env.PORT 
const db_url = process.env.DATABASE_URL
import mongoose from "mongoose";
async function main() {
    try{

        await mongoose.connect(db_url as string);
    
    //my server
   app.listen(port
        , () => {
            console.log(`Example app listening on port ${port
            }`)
          })
    }
    catch(error){
        console.log(error)
    }
    
  
  }

main()




