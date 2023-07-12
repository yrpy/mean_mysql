import express from 'express'
import cors from 'cors'
import mysql from 'mysql2'

const app = express()
const db = mysql.createConnection({ host: 'localhost', user: 'root', password: 'Apple1$1', database: 'p01_patients_db'})

const  PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => res.json('Hello World'))

app.get('/patients', (req, res) => {
    const q = 'SELECT * FROM tbl_patients'
    db.query(q, (err, data) => {
        if(err){ return res.json(err)}
        return res.json(data)
    })
})

app.post('/patients', (req, res) =>{
    const q = "INSERT INTO tbl_patients(`name`, `age`, `purpose`, `fee`) VALUES (?)"
    const values = [req.body.name, req.body.age, req.body.purpose, req.body.fee]
    db.query(q, [values], (err, data) => {
        if(err){ return res.send(err)}
        return res.json("Patient has beed added successfully!")
    })
})

app.delete('/patients/:id', (req, res) =>{
    const patientId = req.params.id
    const q = "DELETE FROM tbl_patients WHERE id=?"
    db.query(q, [patientId], (err, data) => {
        if(err){ return res.send(err)}
        return res.json('Patient has been deleted successfully!')
    })
})

app.put("/patients/:id", (req, res) => {
    const patientId = req.params.id;
    const q = "UPDATE tbl_patients SET `name`= ?, `age`= ?, `purpose`= ?, `fee`= ? WHERE id = ?";
  
    const values = [ req.body.name, req.body.age, req.body.purpose, req.body.fee,];
  
    db.query(q, [...values, patientId], (err, data) => {
      if (err) return res.send(err);
      return res.json(`Patient Id number ${patientId} has been successfully updated!`);
    });
  });

  app.get('/patients/:id', (req, res) =>{
    const patientId = req.params.id
    const q = "SELECT * FROM tbl_patients WHERE id=?"
    db.query(q, [patientId], (err, data) => {
        if(err) return res.send(err)
        return res.json(data)
    })
  })


app.listen(PORT, () => console.log(`Server running at ${PORT}`))