import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()

class auth {
    //Method to generate JWT Token.
    static AuthTokenGenerator = async (user_ID, name) => {
        const data = ({ user_ID, name })
        const token = jwt.sign(
            { data },
            process.env.JWT_TOKEN_KEY,
            { expiresIn: "2h", }
        );
        return token;
    }

    //Method to validate JWT Token.
    static AuthTokenValidator = async (token) => {
        // console.log("In auth token val", token)
        var result;
        jwt.verify(token, process.env.JWT_TOKEN_KEY, (err, authData) => {

            try {
                if (err) {
                    // result = { "status": "failed" }
                    // console.log("Error shubham:", err)
                    result = "failed"
                } else {
                    // result = { "status": "success" }
                    // console.log("authData", authData)
                    result = "success";
                }
            } catch (e) {
                console.log("E : ", e)
            }

        })
        // console.log("Result: ",result)
        return result;
    }
}

export default auth