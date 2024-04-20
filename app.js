import express from "express";
import router from "./routes/webRoutes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router)

app.listen(8898, () => {
    console.log("+-------------------------------------------+");
    console.log(`| Server listen at -> http://localhost:${8898} |`);
    console.log("+-------------------------------------------+");
})
