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
exports.Filme = void 0;
const typeorm_1 = require("typeorm");
const genero_1 = require("./genero");
let Filme = class Filme {
    constructor(tituloOriginal, preco, duracao, ano, faixaEtaria, tituloPT) {
        this.tituloOriginal = tituloOriginal;
        this.preco = preco;
        this.duracao = duracao;
        this.ano = ano;
        this.faixaEtaria = faixaEtaria;
        this.tituloPT = tituloPT;
    }
};
exports.Filme = Filme;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int" }),
    __metadata("design:type", Number)
], Filme.prototype, "idFilme", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 80 }),
    __metadata("design:type", String)
], Filme.prototype, "tituloOriginal", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 80, nullable: true }),
    __metadata("design:type", String)
], Filme.prototype, "tituloPT", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 3, scale: 2 }),
    __metadata("design:type", Number)
], Filme.prototype, "preco", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'time' }),
    __metadata("design:type", String)
], Filme.prototype, "duracao", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'year' }),
    __metadata("design:type", Number)
], Filme.prototype, "ano", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 5 }),
    __metadata("design:type", String)
], Filme.prototype, "faixaEtaria", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => genero_1.Genero),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Filme.prototype, "generos", void 0);
exports.Filme = Filme = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [String, Number, String, Number, String, String])
], Filme);
