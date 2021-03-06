"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const diagnoses_1 = __importDefault(require("./routers/diagnoses"));
const patientRouter_1 = __importDefault(require("./routers/patientRouter"));
const app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
app.use("/api/diagnoses", diagnoses_1.default);
app.use("/api/patients", patientRouter_1.default);
const PORT = 3000;
app.listen(PORT, () => {
    console.log("Listening port: ", PORT);
});
