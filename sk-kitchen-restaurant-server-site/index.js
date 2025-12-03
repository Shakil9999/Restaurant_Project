const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const { default: axios } = require("axios");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

// Optional: Logger for debugging
app.use((req, res, next) => {
  // console.log(`${req.method} ${req.originalUrl}`);
  next();
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.d86wd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});


// JWT middleware
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).send({ message: "forbidden access" });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(401).send({ message: "forbidden access" });
    req.decoded = decoded;
    next();
  });
};

async function run() {
  try {
    // await client.connect();

    const db = client.db("SK_Kitchen_Restaurant_DB");
    const userCollection = db.collection("users");
    const menuCollection = db.collection("Menu");
    const reviewsCollection = db.collection("Reviews");
    const cartCollection = db.collection("carts");
    const paymentCollection = db.collection("payments");
    const messageCollection = db.collection("messages");

    // Verify admin middleware
    const verifyAdmin = async (req, res, next) => {
      const email = req.decoded.email;
      const user = await userCollection.findOne({ email });
      if (user?.role !== "admin") {
        return res.status(403).send({ message: "forbidden access" });
      }
      next();
    };

    // JWT route
    app.post("/jwt", async (req, res) => {
      const token = jwt.sign(req.body, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "5h",
      });
      res.send({ token });
    });

    // User routes
    app.get("/users", verifyToken, verifyAdmin, async (req, res) => {
      const users = await userCollection.find().toArray();
      res.send(users);
    });

    app.post("/users", async (req, res) => {
      const user = req.body;
      const existing = await userCollection.findOne({ email: user.email });
      if (existing) {
        return res.send({ message: "user already exists", insertedId: null });
      }
      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    app.get("/users/admin/:email", verifyToken, async (req, res) => {
      if (req.params.email !== req.decoded.email) {
        return res.status(403).send({ message: "unauthorized access" });
      }
      const user = await userCollection.findOne({ email: req.params.email });
      res.send({ admin: user?.role === "admin" });
    });

    app.patch(
      "/users/admin/:id",
      verifyToken,
      verifyAdmin,
      async (req, res) => {
        const filter = { _id: new ObjectId(req.params.id) };
        const result = await userCollection.updateOne(filter, {
          $set: { role: "admin" },
        });
        res.send(result);
      }
    );

    app.delete("/users/:id", verifyToken, verifyAdmin, async (req, res) => {
      const result = await userCollection.deleteOne({
        _id: new ObjectId(req.params.id),
      });
      res.send(result);
    });

    // Menu routes
    app.get("/menu", async (req, res) => {
      const result = await menuCollection.find().toArray();
      res.send(result);
    });

    app.get("/menu/:id", async (req, res) => {
      try {
        const id = new ObjectId(req.params.id);
        const result = await menuCollection.findOne({ _id: id });
        if (!result) return res.status(404).send({ message: "Item not found" });
        res.send(result);
      } catch {
        res.status(400).send({ message: "Invalid ID format" });
      }
    });

    app.post("/menu", verifyToken, verifyAdmin, async (req, res) => {
      const result = await menuCollection.insertOne(req.body);
      res.send(result);
    });

    app.patch("/menu/:id", verifyToken, verifyAdmin, async (req, res) => {
      try {
        const id = new ObjectId(req.params.id);
        const updatedDoc = {
          $set: {
            name: req.body.name,
            category: req.body.category,
            price: req.body.price,
            recipe: req.body.recipe,
            image: req.body.image,
          },
        };
        const result = await menuCollection.updateOne({ _id: id }, updatedDoc);
        res.send(result);
      } catch {
        res.status(400).send({ message: "Invalid ID format" });
      }
    });

    app.delete("/menu/:id", verifyToken, verifyAdmin, async (req, res) => {
      try {
        const id = new ObjectId(req.params.id);
        const result = await menuCollection.deleteOne({ _id: id });
        res.send(result);
      } catch {
        res.status(400).send({ message: "Invalid ID format" });
      }
    });

    // Reviews
    app.get("/reviews", async (req, res) => {
      const result = await reviewsCollection.find().toArray();
      res.send(result);
    });

    // Cart routes
    app.get("/carts", verifyToken, async (req, res) => {
      const email = req.query.email;
      if (email !== req.decoded.email) {
        return res.status(403).send({ message: "forbidden access" });
      }
      const result = await cartCollection.find({ email }).toArray();
      res.send(result);
    });

    app.post("/carts", verifyToken, async (req, res) => {
      const result = await cartCollection.insertOne(req.body);
      res.send(result);
    });

    app.delete("/carts/:id", verifyToken, async (req, res) => {
      try {
        const id = new ObjectId(req.params.id);
        const result = await cartCollection.deleteOne({ _id: id });
        res.send(result);
      } catch {
        res.status(400).send({ message: "Invalid ID format" });
      }
    });

    // Messages routes

    app.get('/contact', async(req, res)=>{
      const result = await messageCollection.find().toArray();
      res.send(result);
    })

    app.post("/contact", async (req, res) => {
      const message = req.body;
      const result = await messageCollection.insertOne(message);
      res.send(result);
    });

    app.delete("/contact/:id", async(req, res)=>{
      const id =req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await messageCollection.deleteOne(query)
      res.send(result)
    })

    // Stripe payment intent
    app.post("/create-payment-intent", verifyToken, async (req, res) => {
      const { price } = req.body;
      const amount = Math.round(price * 100);
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "usd",
        payment_method_types: ["card"],
      });
      res.send({ clientSecret: paymentIntent.client_secret });
    });

    // Payments
    app.get("/payment/:email", verifyToken, async (req, res) => {
      if (req.params.email !== req.decoded.email) {
        return res.status(403).send({ message: "forbidden access" });
      }
      const result = await paymentCollection
        .find({ email: req.params.email })
        .toArray();
      res.send(result);
    });

    app.post("/payments", verifyToken, async (req, res) => {
      const payment = req.body;
      const paymentResult = await paymentCollection.insertOne(payment);
      const deleteResult = await cartCollection.deleteMany({
        _id: { $in: payment.cartIds.map((id) => new ObjectId(id)) },
      });
      res.send({ paymentResult, deleteResult });
    });

    app.post("/success_payment", async (req, res) => {
      const paymentSuccess = req.body;
      // console.log("payment success details", paymentSuccess);
      const {data} = await axios.get(
        `https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php?val_id=${paymentSuccess.val_id}&store_id=skkit687ca6d95c320&store_passwd=skkit687ca6d95c320@ssl`
      );
      if(data.status !== "VALID"){
        return res.send({message: "Invalid Payment"})
      }

      const payment = await paymentCollection.findOne({transactionId: data.tran_id})
      const updatePayment = await paymentCollection.updateOne({transactionId: data.tran_id}, {
        $set:{
          status: "success"
        }
      })
      const query = {
        _id: {
          $in: payment.cartIds.map((id)=> new ObjectId(id))
        }
      }
      const deleteResult = await cartCollection.deleteOne(query)
      console.log(deleteResult)

      res.redirect('http://localhost:5173/success')
      // console.log("update payment", updatePayment)
      // console.log("isValidPayment", data)
    });

    app.post("/create-ssl-payment", async (req, res) => {
      const payment = req.body;
      // console.log("payment details", payment)
      const trnId = new ObjectId().toString();

      const data = {
        store_id: "skkit687ca6d95c320",
        store_passwd: "skkit687ca6d95c320@ssl",
        total_amount: payment.price,
        currency: "BDT",
        tran_id: trnId, // use unique tran_id for each api call
        success_url: "http://localhost:5000/success_payment",
        fail_url: "http://localhost:5173/fail",
        cancel_url: "http://localhost:5173/cancel",
        ipn_url: "http://localhost:5000/ipn_success_payment",
        shipping_method: "Courier",
        product_name: "Computer.",
        product_category: "Electronic",
        product_profile: "general",
        cus_name: "Customer Name",
        cus_email: "customer@example.com",
        cus_add1: "Dhaka",
        cus_add2: "Dhaka",
        cus_city: "Dhaka",
        cus_state: "Dhaka",
        cus_postcode: "1000",
        cus_country: "Bangladesh",
        cus_phone: "01711111111",
        cus_fax: "01711111111",
        ship_name: "Customer Name",
        ship_add1: "Dhaka",
        ship_add2: "Dhaka",
        ship_city: "Dhaka",
        ship_state: "Dhaka",
        ship_postcode: 1000,
        ship_country: "Bangladesh",
      };
      const qs = require("qs");

      const response = await axios.post(
        "https://sandbox.sslcommerz.com/gwprocess/v4/api.php",
        qs.stringify(data), 
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );
      const gatewayURL = response?.data?.GatewayPageURL;
      // console.log(gatewayURL);

      payment.transactionId = trnId;

      const result = await paymentCollection.insertOne(payment);
      res.send({ gatewayURL });
    });

    //stats or analytics
    app.get("/admin-stats", verifyToken, verifyAdmin, async (req, res) => {
      const users = await userCollection.estimatedDocumentCount();
      const menuItems = await menuCollection.estimatedDocumentCount();
      const orders = await paymentCollection.estimatedDocumentCount();

      const result = await paymentCollection
        .aggregate([
          {
            $group: {
              _id: null,
              totalRevenue: {
                $sum: "$price",
              },
            },
          },
        ])
        .toArray();

      const revenue = result.length > 0 ? result[0].totalRevenue : 0;

      res.send({ users, menuItems, orders, revenue });
    });

    //using aggregate pipeline
    app.get("/order-stats", verifyToken, verifyAdmin, async (req, res) => {
      const result = await paymentCollection
        .aggregate([
          {
            $unwind: "$menuItemIds",
          },
          {
            $lookup: {
              from: "Menu",
              localField: "menuItemIds",
              foreignField: "_id",
              as: "menuItems",
            },
          },
          {
            $unwind: "$menuItems",
          },
          {
            $group: {
              _id: "$menuItems.category",
              quantity: { $sum: 1 },
              revenue: { $sum: "$menuItems.price" },
            },
          },
          {
            $project: {
              _id: 0,
              category: "$_id",
              quantity: "$quantity",
              revenue: "$revenue",
            },
          },
        ])
        .toArray();

      res.send(result);
    });

    // Connection test
    await client.db("admin").command({ ping: 1 });
    console.log("Connected to MongoDB!");
  } finally {
    // await client.close(); // Keep it open for server
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("SK Kitchen Restaurant rannaghor Server is Running");
});

app.listen(port, () => {
  console.log(`SK Kitchen  Restaurant Server running on port ${port}`);
});
