import express from 'express';
import {ApolloServer} from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';
import {createServer} from 'http';
import compression from 'compression';
import cors from 'cors';
import schema from "./schema/schema";
import bodyParser from "body-parser";

const app = express();
const server = new ApolloServer({
    schema,
    validationRules: [depthLimit(7)],
});


const httpServer = createServer(app);
const io = require('socket.io')(httpServer, {
    cors: {
        origin: '*',
    }
});

app.use('*', cors());
app.options('*', cors());

app.use(compression());
app.get('/', (req, res, next) => {
    res.send('APP WORKS');
});

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

const loggingMiddleware = (req, res, next) => {
    console.log('ip:', req.url);
    console.log('body', req.body);
    if (req.url.includes('graphql')) {
        if (req.body.query.includes('blue')) {
            io.emit('blueChecked');
        } else if (req.body.query.includes('orange')) {
            io.emit('orangeChecked');
        }
    }
    next();
};

app.use(loggingMiddleware);
server.applyMiddleware({app, path: '/graphql'});


httpServer.listen(
    {port: 8080},
    (): void => console.log(`GraphQL is now running on http://localhost:8080/graphql`));
