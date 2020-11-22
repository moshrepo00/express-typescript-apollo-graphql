import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';
import { createServer } from 'http';
import compression from 'compression';
import cors from 'cors';
import schema from "./schema/schema";
import bodyParser from "body-parser";
const app = express();
const server = new ApolloServer({
    schema,
    validationRules: [depthLimit(7)],
});


app.use('*', cors());
app.use(compression());
app.get('/', (req, res) => {
    res.send('APP WORKS');
});

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

const loggingMiddleware = (req, res, next) => {
    console.log('ip:', req.body);
    next();
}

app.use(loggingMiddleware);
server.applyMiddleware({ app, path: '/graphql' });
const httpServer = createServer(app);
httpServer.listen(
    { port: 8080 },
    (): void => console.log(`GraphQL is now running on http://localhost:8080/graphql`));
