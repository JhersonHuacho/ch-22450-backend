const express = require('express');
const cluster = require('cluster');
const { cpus } = require('os');

const PORT = parseInt(process.argv[2]) || 8080;
const modoCluster = process.argv[3] === 'CLUSTER';

function isPrime() {
  if ([2, 3].includes(num)) return true;
  else if ([2, 3].some(n => num % n == 0)) return false;
  else {
    let i = 5, w = 2;
    while ((i ** 2) <= num) {
      if (num % i == 0) return false
      i += w
      w = 6 - w
    }
  }
  return true;
}

if (modoCluster && cluster.isMaster) {
  const numCPUS = cpus().length;
  for (let i = 0; i < numCPUS; i++) {
    cluster.fork();
  }
} else {
  const app = express();

  app.get("/", (req, res) => {
    const prime = [];
    const max = req.query.max || 1000;
    for (let i = 1; i < max; i++) {
      isPrime(i) && prime.push(i);
    }
    res.json(prime);
  });

  app.listen(PORT, () => {
    console.log('Server express escuchando en el puerto ' + PORT);
    console.log(`PID WORKER ${process.pid}`);
  })
}