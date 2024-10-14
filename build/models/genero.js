"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Genero = void 0;
const typeorm_1 = require("typeorm");
const filme_1 = require("./filme");
let Genero = class Genero {
    constructor(nome) {
        this.nome = nome;
    }
};
exports.Genero = Genero;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int" }),
    __metadata("design:type", Number)
], Genero.prototype, "idGenero", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 45, nullable: false }),
    __metadata("design:type", String)
], Genero.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => filme_1.Filme, filme => filme.generos),
    __metadata("design:type", Array)
], Genero.prototype, "filmes", void 0);
exports.Genero = Genero = __decorate([
    (0, typeorm_1.Entity)({ name: 'Genero' }),
    __metadata("design:paramtypes", [String])
], Genero);
