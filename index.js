const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;
const jobListing = require('./model/joblisting.json');
const jobListingPg2 = require('./model/joblistingpg2.json');
const jobDetails = require('./model/jobdetails.json');

const allowOrigin = 'http://localhost:3000';

app.use((req, res, next) => {
  setTimeout(next, Math.floor(Math.random() * 3000));
});

app.use(cors({ origin: allowOrigin }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/positions/4926de97-addf-4f0e-afde-44b83dad5d73.json', (req, res) => {
  res.send(jobDetails);
});

app.get('/positions.json', (req, res) => {
  const page = (req && req.query && req.query.page) || 0;
  console.log(page);
  if (page) {
    if (page === '2') {
      res.send(jobListingPg2);
    } else if (page === '1') {
      res.send(jobListing);
    } else {
      res.send('[]');
    }
  } else {
    res.send(jobListing);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
