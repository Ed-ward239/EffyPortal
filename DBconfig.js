const sql = require('mssql');

const config = {
    server: 'effysql1.cudlgss5lr6m.us-east-2.rds.amazonaws.com',
    database: 'EffyShipAcctPortalDevDB',
    user: 'shipacctportaldev',
    password: 'BFXTczfjG+TbeG%!',
    options:{
        encrypt: true
    }
};

sql.connect(config).then(() => {
    console.log('Connected to the DB :)');
    // DB operations here
    const query = 'SELECT * FROM [dbo].[Carnival]';

    sql.query(query).then((result) => {
        console.log('Query result:', result.recordset);
    })
    .catch((err) => {
        console.error('Error executing query:', err);
    });
    sql.close();
})
.catch((err) => {
    console.error('Error connecting... :(', err);
});


