require("dotenv").config();


const configCors = (app) => {
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', process.env.REACT_URL);
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.setHeader('Access-Control-Allow-Credentials', true);
        // res.header('Access-Control-Allow-Credentials', true);
        return next();
      });
}

export default configCors