// resolverMap.ts
import { IResolvers } from 'graphql-tools';
const resolverMap: IResolvers = {
    Query: {
        helloWorld(_: void, args: void): string {
            return `testing`;
        },
        blue(_: void, args: void): string {
            return `blueChecked`;
        },
    },
};
export default resolverMap;
