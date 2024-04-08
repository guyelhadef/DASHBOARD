import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from "helmet";
import morgan from "morgan";
import clientRoutes from "./routes/client.js"
import generalRoutes from "./routes/general.js"
import managementRoutes from "./routes/management.js"
import salesRoutes from "./routes/sales.js"

//data models imports
import User from "./models/User.js";
import Product from "./models/Product.js";
import ProductStat from "./models/ProductStat.js";
import Transaction from "./models/Transaction.js";
import OverallStat from "./models/OverallStat.js";
import AffiliateStat from "./models/AffiliateStat.js";

import {
  dataUser,
  dataProduct,
  dataProductStat,
  dataTransaction,
  dataOverallStat,
  dataAffiliateStat,
} from "./data/index.js";



/* CONFIGURATION*/
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false}));
app.use(cors());

/* ROUTES (for api's) */ 

app.use("/client", clientRoutes);           /* client : (4 pages --> products, customers, transactions, geography) */
app.use("/general", generalRoutes);         /* general: getting the useres and the dashboard*/
app.use("/management", managementRoutes);   /* management : admin, preformance*/
app.use("/sales", salesRoutes);             /* sales : (4 pages --> overview, daily, monthly, breakdown) */

/* MONGOOSE SETUP */ 
//const MONGO_URL='mongodb+srv://guyelhadef:Tivon2024@guydev.bplfvlr.mongodb.net/';
//const MONGO_URL='mongodb://localhost:27017/';


const PORT =process.env.PORT || 9000;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
   })
    .then(() => {
        app.listen(PORT, () => console.log(`Server Port: ${PORT}`))

        /**ONLY ADD DATA ONE TIME */
        //User.insertMany(dataUser);
       // Product.insertMany(dataProduct);
        //ProductStat.insertMany(dataProductStat);
        //Transaction.insertMany(dataTransaction);
       // OverallStat.insertMany(dataOverallStat);
      //AffiliateStat.insertMany(dataAffiliateStat);


   })
   .catch((error) => console.log(`${error} did not connect`));


