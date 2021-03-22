"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const typescript_logging_1 = require("typescript-logging");
typescript_logging_1.CategoryServiceFactory.setDefaultConfiguration(new typescript_logging_1.CategoryConfiguration(typescript_logging_1.LogLevel.Info));
exports.logger = new typescript_logging_1.Category("service");
//# sourceMappingURL=logger.js.map