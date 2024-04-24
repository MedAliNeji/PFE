const express = require('express')
const app = express()

// Node JS API initialising
app.use(express.json())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Replace * with the appropriate origin
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200); // Respond to preflight requests
  }
  next();
});
const port = 3000
////-----------------------------------------------



// Routes
const auth = require('./src/auth/login')
const sign = require('./src/auth/signup')
const controle = require('./src/auth/controler')
const etudiant = require('./src/Data/etudiant')
const entreprise = require('./src/Data/entreprise')
const offre = require('./src/Data/offre')
////-----------------------------------------------


// API request
app.post('/login', auth.login)
app.post('/register', sign.signup)
app.post('/controle', controle.verifyToken)

app.get('/etudiants', etudiant.getEtudiants)
app.get('/entreprises', entreprise.getEntreprises)
app.get('/offres', offre.getOffres)

app.post('/signup', sign.signup)

app.post('/etudiant', etudiant.getEtudiant)
app.post('/entreprise', entreprise.getEntreprise)

// MOD Entreprise
app.post('/addEntreprise', entreprise.addEntreprise)
app.post('/editEntreprise', entreprise.updateEntreprise);
app.delete('/entreprise', entreprise.deleteEntreprise);

// Entreprise Ajout Offre
app.post('/addOffre', offre.addOffre)
/*
// hash code
const bcrypt = require('bcrypt');
const saltRounds = 10;

app.post('/hash', async (req, res) => {
  const hash = await bcrypt.hash(req.body.c, saltRounds);
  console.log(hash);
  res.status(201).send('User registered successfully');
})

app.post('/compare', async (req, res) => {
  try {
    if( await bcrypt.compare(req.body.c, "$2b$10$pc/EyY9lbkR.8LcBCPLI4eVbVXJjcYMnK69ozV/eWm0GNoPRaGlt2"))
  {
    console.log('match');
    res.status(201).send('User registered successfully');
  }
  else
  {
    console.log('not match');
    res.status(401).send('User not registered successfully');
  }
  }
  catch(err) {
    console.log('not match' + err);
    res.status(401).send('User registered successfully');
  }

})




// API Endpoints
app.get('/', function (req, res) {
  // testing if there is a connection or not
  res.send('Hello')
  console.log("there is a connection from " + req.ip);
})

app.post('/test', function (req, res) {
  // req.body contains the parsed body of the request
     r = req.body.nom
     res.status(301).json({message: "Data Received", data: r , date : new Date()})
  })


  app.get('/entreprise', function (req, res) {
    connection.query('SELECT * FROM entreprise', (err, rows) => {
        if (err) throw err
        console.log('Data received from Db:')
        console.log(rows)
        res.send(rows)
    }
    )
  })
*/



//   Launch Server
// ng serve --host 0.0.0.0 --port 4200
app.listen(port, () => {
  console.log(`Server Start with URL : http://localhost:${port}/`);

})
////-----------------------------------------------


