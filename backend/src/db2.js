const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: '187.108.198.6',
    user: 'blutecno_ricardo',
    password: 'Perl1551@@@',
    database: 'blutecno_layaradb'
})

connection.connect((error) =>{
    if(error) throw error;
    console.log(`Conectado ao Banco de Dados2: ${process.env.DB_API}`)
})

module.exports = connection