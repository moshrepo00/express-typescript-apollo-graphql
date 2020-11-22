"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resolverMap = {
    Query: {
        helloWorld(_, args) {
            return `testing`;
        },
        blue(_, args) {
            return `blueChecked`;
        },
    },
};
exports.default = resolverMap;
//# sourceMappingURL=resolverMap.js.map