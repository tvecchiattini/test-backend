"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TUser = void 0;
const typebox_1 = require("@sinclair/typebox");
exports.TUser = typebox_1.Type.Object({
    _id: typebox_1.Type.Optional(typebox_1.Type.String()),
    firstname: typebox_1.Type.String(),
    lastname: typebox_1.Type.String(),
    email: typebox_1.Type.String(),
    country: typebox_1.Type.String(),
    state: typebox_1.Type.String(),
});
//# sourceMappingURL=user.js.map