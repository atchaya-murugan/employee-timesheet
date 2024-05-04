

const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createPool({
    host: "localhost",
    port: 4306,
    user: 'root',
    password: '',
    database:'timesheet'
})
const db1 = mysql.createPool({
    host: "localhost",
    port: 4306,
    user: 'root',
    password: '',
    database:'summa'
})

app.get('/timetracker', (req, res) => {
    const { currentDate } = req.query;
    const { proj_name } = req.query;

    // SQL query to fetch data for the current week
    if(currentDate){
        const sql = "SELECT * FROM timetracker WHERE DATE_FORMAT(STR_TO_DATE(date, '%d-%m-%Y'), '%Y-%m-%d') BETWEEN DATE_FORMAT(DATE_SUB(NOW(), INTERVAL WEEKDAY(NOW()) DAY), '%Y-%m-%d') AND DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 6 - WEEKDAY(NOW()) DAY), '%Y-%m-%d')";

    db.query(sql, (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Internal server error"});
        }
        return res.json(data); 
    });
    }else if(proj_name){
            const sql = "SELECT project_name FROM timetracker;";
                db.query(sql, (err, data)=>{
                    if(err) return res.json({message: "Error Inside the Server"});
                    return res.json(data);
                })   
        
    }else{
        const sql = "SELECT * FROM timetracker;";
        db.query(sql, (err, data)=>{
            if(err) return res.json({message: "Error Inside the Server"});
            return res.json(data);
        })  
    }
});

app.get('/users', (req, res)=>{
    const sql = "SELECT * FROM users";
    db.query(sql, (err, data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})
app.get('/', (req, res)=>{
    const sql = "SELECT * FROM user_det";
    db.query(sql, (err, data)=>{
        if(err) return res.json({message: "Error Inside the Server"});
        return res.json(data);
    })
})

app.post('/timetracker', (req, res) => {
    const { formattedDate, selectedValue, projectName, seconds, minutes, hours, dayName, mem_name} = req.body;
    
    // Log the received data for debugging
    console.log("Received data:", req.body);

    const sql = "INSERT INTO timetracker (mem_name, project_name, sub_feild, time, hour, minutes, seconds, date, day) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    
    // Execute the SQL query
    db.query(sql, [mem_name, projectName, selectedValue, hours + 'h'+ minutes + 'm' + seconds + 's', hours, minutes, seconds, formattedDate, dayName], (err, result) => {
        if (err) {
            // Log the exact error message from the database
            console.error("Database error:", err.message);
            
            // Send a 500 Internal Server Error response with the error message
            return res.status(500).json({ error: "Internal server error" });
        }
        
        // Send a 200 OK response with a success message
        return res.status(200).json({ message: "User registered successfully" });
    });
});


app.post('/users', (req, res) => {
    const { name, email, number, password } = req.body;
    const sql = "INSERT INTO users (name, email, number, password) VALUES (?, ?, ?, ?)";
    db.query(sql, [name, email, number, password], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Internal server error" });
        }
        return res.status(200).json({ message: "User registered successfully" });
    });
});


app.post('/team', (req, res) => {
    const { teamName, email, billableRate, role, group } = req.body;
    const sql = "INSERT INTO team (name, email, billable_rate, role, `group`) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [teamName, email, billableRate, role, group], (err, result) => {
        if (err) {
            console.error("Database error:", err.message);
            return res.status(500).json({ error: "Internal server error" });
        }
        return res.status(200).json({ message: "User registered successfully" });
    });
});


app.post('/group', (req, res) => {
        const { grpName, acess } = req.body;
        
        const sql = "INSERT INTO `group` (name, acess) VALUES (?, ?)";
        db.query(sql, [grpName, acess], (err, result) => {
            if (err) {
                console.error("Database error:", err.message);
                return res.status(500).json({ error: "Internal server error" });
            }
            return res.status(200).json({ message: "User registered successfully" });
        });
    });

app.post('/reminder', (req, res) => {
            const { reminder } = req.body;
            const sql = "INSERT INTO reminder (reminder) VALUES (?)";
            db.query(sql, [reminder], (err, result) => {
                if (err) {
                    console.error("Database error:", err.message);
                    return res.status(500).json({ error: "Internal server error" });
                }
                return res.status(200).json({ message: "User registered successfully" });
            });
        });
    
        app.post('/project', (req, res) => {
            const { projName, client, amount, progress, acess } = req.body;
            
            const sql = "INSERT INTO project (`name`, `client`, `amount`, `progress`, `acess`) VALUES (?, ?, ?, ?, ?)";
            db.query(sql, [projName, client, amount, progress, acess], (err, result) => {
                if (err) {
                    console.error("Database error:", err.message);
                    return res.status(500).json({ error: "Internal server error" });
                }
                return res.status(200).json({ message: "User registered successfully" });
            });
        });
   
        app.get('/project', (req, res) => {
            const sql = "SELECT * FROM project";
            db.query(sql, (err, data)=>{
                if(err) return res.json({message: "Error Inside the Server"});
                return res.json(data);
            });
           
        });
app.get('/team', (req, res) => {
    const sql = "SELECT * FROM team";
    db.query(sql, (err, data)=>{
        if(err) return res.json({message: "Error Inside the Server"});
        return res.json(data);
    });
   
});

app.get('/group', (req, res)=>{
    const sql = "SELECT * FROM `group`";
    db.query(sql, (err, data)=>{
        if(err) return res.json({message: "Error Inside the Server"});
        return res.json(data);
    });
});

app.get('/reminder', (req, res)=>{
    const sql = "SELECT * FROM reminder";
    db.query(sql, (err, data)=>{
        if(err) return res.json({message: "Error Inside the Server"});
        return res.json(data);
    })
})


app.get('/timeoff', (req, res) => {
    const { user_name } = req.query; // Use req.query instead of req.body
    const sql = "SELECT * FROM timeoff where name = ?";
    db.query(sql, [user_name], (err, data) => {
        if (err) {
            console.error("Database error:", err.message);
            return res.status(500).json({ error: "Internal server error" });
        }
        return res.json(data);
    });
});



app.post('/user_det', (req, res) => {
    const { name, email, number, password } = req.body;
    const sql = "INSERT INTO user_det (name, email, number, password) VALUES (?, ?, ?, ?)";
    db.query(sql, [name, email, number, password], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Internal server error" });
        }
        return res.status(200).json({ message: "User registered successfully" });
    });
});

app.get('/user_det', (req, res) => {
    const { email, password } = req.query; // Use req.query instead of req.body
    const sql = "SELECT * FROM user_det WHERE email = ? AND password = ?";
    db.query(sql, [email, password], (err, result) => {
        if (err) {
            console.error("Error fetching data:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        return res.status(200).json(result);
    });
});

app.post('/timeoff', (req, res) => {
    const { user_name, leaveType } = req.query;
    
    let updateSql;

    // Determine the update SQL query based on the leave type
    if (leaveType === 'Sick Leave') {
        updateSql = "UPDATE timeoff SET sick_leave = sick_leave - 1 WHERE name = ?";
    } else if (leaveType === 'Annual Leave') {
        updateSql = "UPDATE timeoff SET annual_leave = annual_leave - 1 WHERE name = ?";
    } else if (leaveType === 'Casual Leave') {
        updateSql = "UPDATE timeoff SET casual_leave = casual_leave - 1 WHERE name = ?";
    }

    // Execute the update SQL query
    db.query(updateSql, [user_name], (err, updateResult) => {
        if (err) {
            console.error("Error updating leave_days:", err);
            return res.status(500).json({ error: "Internal update server error" });
        }

        // If the update was successful, fetch the updated time-off information
        const checkSql = "SELECT * FROM timeoff WHERE name = ?";
        db.query(checkSql, [user_name], (err, result) => {
            if (err) {
                console.error("Error checking leave_days:", err);
                return res.status(500).json({ error: "Internal select server error" });
            }

            // Return the updated time-off information in the response
            return res.status(200).json(result[0]); // Assuming there's only one row for the user
        });
    });
});




app.get('/ts', (req, res)=>{
    const sql = "SELECT * FROM ts";
    db.query(sql, (err, data)=>{
        if(err) return res.json({message: "Error Inside the Server"});
        return res.json(data);
    })
})
app.get('/members', (req, res) => {
    const projName = req.query.proj_name; 
    const sql = "SELECT * FROM members WHERE proj_name = ?";
    db.query(sql, [projName], (err, result) => {
        if (err) {
            console.error("Error fetching data:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        return res.status(200).json(result);
    });
});


app.post('/ts', (req, res) => {
    const {projectName, wholeTot } = req.body;
    const sql = "INSERT INTO ts (project_name, total_hours) VALUES (?, ?)";
    db.query(sql, [projectName, wholeTot ], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Internal server error" });
        }
        return res.status(200).json({ message: "User registered successfully" });
    });
});





app.listen(8081, ()=> {
    console.log("Server Started");
})