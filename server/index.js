const express = require ('express')
const db = require('./db')
const app = express()
app.use(express.json())

app.post('/api/customers', async (req, res, next) => {
    const result = await db.createCustomer(req.body.name)
    res.send(result)
 })

 app.get('/api/customers', async(req, res, next)=> {
    try {
      res.send(await db.fetchCustomers());
    }
    catch(ex){
      next(ex);
    }
  });

  app.get('/api/restaurants', async(req, res, next)=> {
    try {
      res.send(await db.fetchRestaurants());
    }
    catch(ex){
      next(ex);
    }
  });

  app.get('/api/reservations', async(req, res, next)=> {
    try {
      res.send(await db.fetchReservations());
    }
    catch(ex){
      next(ex);
    }
  });

  app.post('/api/customers/:id/reservations',  async(req, res, next)=> {
    try {
        res.status(201).send(await db.createReservation({ customerName: req.body.customer_name, restaurantId: req.body.restaurant_id, date: req.body.date, partyCount: req.body.party_count}));
    }
    catch(ex){
        next(ex);
    }
});

const init = async () => {
 await db.init()
 app.listen(3000, () => {console.log("listening on port 3000")})   
}

init()