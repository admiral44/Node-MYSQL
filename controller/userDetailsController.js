import { executeQuery, generateRandomString } from "../common_methods/executeQuery.js";
import bcrypt from "bcrypt";

class userDetailsController {

    static registerUser = async (req, res) => {
        const { name, number, password } = req.body;

        if (!name || !number || !password) {return res.status(400).send({ message: "All fields are required", data: null });}
        if (number.length !== 10) {return res.status(400).send({ message: "Invalid Phone Number", data: null });}

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const u_id = generateRandomString();
        let createdDate = new Date();
        await executeQuery("CALL RegisterUser(?,?,?,?,?)", [u_id, name, number, hashPassword, createdDate]).then((results) => {
            if (results.status === 200) {
                return res.status(200).send({ message: "User Registered Successfully", data: results.data[0] });
            } else {
                return res.status(500).send({ message: results.message, data: null });
            }
        })
    }

    static loginUser = async (req, res) => {
        const { number, password } = req.body;
        if (!number || !password) {return res.status(400).send({ message: "All fields are required", data: null });}

        await executeQuery("CALL LoginUser(?)", [number]).then(async (results) => {
            if (results.status === 200) {
                const passStatus = await bcrypt.compare(password, results.data[0][0].user_pass).then((passRes) => {return passRes;});
                if (!passStatus) { return res.status(400).send({ message: "Incorrect credentials!!", data: null });}
                res.status(200).send({ message: "User Logged In Successfully", data: { id: results.data[0][0].user_id, name: results.data[0][0].user_name } });
            } else {
                res.status(400).send({ message: results.message, data: null });
            }
        })
    }
}

export default userDetailsController;