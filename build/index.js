"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("./db/data-source");
data_source_1.AppDataSource.initialize()
    .then(() => {
    console.log("Database rodando");
})
    .catch((error) => console.log(error));
