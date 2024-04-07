import { conn } from "../connection/conn.js";

class studentInfoController {

    getStudentInfo(req, res) {
        



        conn.connect((err) => {
            if (err) {
                console.log("############################################");
                console.error('Error connecting to MySQL:', err);
                console.log("############################################");
                return;
            }
            console.log('Connected to MySQL successfully!');

            // conn.query('SELECT * FROM studinfo', (err, results, fields) => {
            //     if (err) {
            //         console.log("############################################");
            //         console.error('Error executing query:', err);
            //         console.log("############################################");
            //         return;
            //     }

            //     // console.log('Results:', results);
            //     res.send({ status: 200, message: "Success", data: results });
            // })

            // here is Stored Procedure for get user details.
            
            const getUserDetails = 'CALL getStudentsInfo();';
            conn.query(getUserDetails, (err, results, fields) => {
                if (err) {
                    console.log("############################################");
                    console.error('Error executing query:', err);
                    console.log("############################################");
                    return;
                }
                res.send({ status: 200, message: "Success", data: results });
            })

            conn.end((err) => {
                if (err) {
                    console.log("############################################");
                    console.error('Error disconnecting from MySQL:', err);
                    console.log("############################################");
                    return;
                }
                console.log('Disconnected from MySQL successfully!');
            })
        });
    }
    addStudentInfo(req, res) {
        res.send("Add Student Info");
    }
    updateStudentInfo(req, res) {
        res.send("Update Student Info");
    }
    deleteStudentInfo(req, res) {
        res.send("Delete Student Info");
    }
}

export default new studentInfoController;