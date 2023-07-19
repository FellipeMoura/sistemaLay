const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: '187.108.198.6',
    user: 'blutecno_ricardo',
    password: 'Perl1551@@@',
    database: 'blutecno_bueno'
})

connection.connect((error) =>{
    if(error) throw error;
    console.log(`Conectado ao Banco de Dados: ${process.env.DB_NAME1}`)
})

module.exports = connection