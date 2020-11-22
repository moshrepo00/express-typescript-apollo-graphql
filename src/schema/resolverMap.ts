// resolverMap.ts
import { IResolvers } from 'graphql-tools';
const resolverMap: IResolvers = {
    Query: {
        blue(_: void, args: void): string {
            return `blueChecked`;
        },
        orange(_: void, args: void): string {
            return `orangeChecked`;
        },
    },
};
export default resolverMap;
