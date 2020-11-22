"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const graphql_depth_limit_1 = __importDefault(require("graphql-depth-limit"));
const http_1 = require("http");
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const schema_1 = __importDefault(require("./schema/schema"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = express_1.default();
const server = new apollo_server_express_1.ApolloServer({
    schema: schema_1.default,
    validationRules: [graphql_depth_limit_1.default(7)],
});
const httpServer = http_1.createServer(app);
const io = require('socket.io')(httpServer, {
    cors: {
        origin: '*',
    }
});
app.use('*', cors_1.default());
app.options('*', cors_1.default());
app.use(compression_1.default());
app.get('/', (req, res, next) => {
    res.send('APP WORKS');
});
app.use(body_parser_1.default.json()); // to support JSON-encoded bodies
app.use(body_parser_1.default.urlencoded({
    extended: true
}));
const loggingMiddleware = (req, res, next) => {
    console.log('ip:', req.url);
    console.log('body', req.body);
    if (req.url.includes('graphql')) {
        if (req.body.query.includes('blue')) {
            io.emit('blueChecked');
        }
        else if (req.body.query.includes('orange')) {
            io.emit('orangeChecked');
        }
    }
    next();
};
app.use(loggingMiddleware);
server.applyMiddleware({ app, path: '/graphql' });
httpServer.listen({ port: process.env.PORT || 8080 }, () => console.log(`GraphQL is now running on http://localhost:8080/graphql`));
//# sourceMappingURL=app.js.map