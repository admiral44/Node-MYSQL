import auth from "../Auth/auth.js";
import { executeQuery, generateRandomString } from "../common_methods/executeQuery.js";
import bcrypt from "bcrypt";

class userDetailsController {

    static registerUser = async (req, res) => {
        const { name, number, password } = req.body;

        if (!name || !number || !password) { 
            return res.send({ status: "400", statusMessage: "Failed", message: "All fields are required", data: null }); 
        }
        
        if (number.length !== 10) { 
            return res.send({ status: "401", statusMessage: "Failed", message: "Invalid Phone Number", data: null }); 
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const u_id = generateRandomString();
        let createdDate = new Date();
        await executeQuery("CALL RegisterUser(?,?,?,?,?)", [u_id, name, number, hashPassword, createdDate]).then((results) => {
            if (results.status === 200) {
                return res.send({ status: "200", statusMessage: "Success", message: "User Registered Successfully", data: results.data[0] });
            } else {
                return res.send({ status: "400", statusMessage: "Failed", message: results.message, data: null });
            }
        })
    }

    static loginUser = async (req, res) => {
        const { number, password } = req.body;
        if (!number || !password) {
            return res.send({ status: "400", statusMessage: "Failed", message: "All fields are required" });
        }

        if (number.length !== 10) {
            return res.send({ status: "400", statusMessage: "Failed", message: "Invalid Phone Number" });
        }

        await executeQuery("CALL LoginUser(?)", [number]).then(async (results) => {
            if (results.status === 200) {
                const passStatus = await bcrypt.compare(password, results.data[0][0].user_pass).then((passRes) => { return passRes; });
                if (!passStatus) {
                    return res.send({ status: "401", statusMessage: "Failed", message: "Incorrect credentials!!", data: null });
                }

                const token = await auth.AuthTokenGenerator(results.data[0][0].user_id, results.data[0][0].user_name);
                return res.send({ status: "200", statusMessage: "Success", message: "User Logged In Successfully", data: { id: results.data[0][0].user_id, name: results.data[0][0].user_name, token: token } });
            } else {
                res.send({ code: "404", statusMessage: "Failed", message: results.message, data: [] });
            }
        })
    }
}

export default userDetailsController;