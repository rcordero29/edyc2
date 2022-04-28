const {createPool}= require('mysql')

class Connection {
  constructor(){
    if (!this.pool){
      console.log('creating Connection...');
      this.pool=createPool({
        connectionLimit:10, 
        host:process.env.DB_HOST,
        user:process.env.DB_USERNAME,
        password:process.env.DB_PASSWORD,
        database:process.env.DB_DATABASE

      })
      return this.pool
    }
    return this.pool
  }
}
const pool = new Connection()

module.exports=pool
