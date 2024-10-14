"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../db/data-source");
const genero_1 = require("../models/genero");
class GeneroRepository {
    constructor() {
        this.generoRepository = data_source_1.AppDataSource.getRepository(genero_1.Genero);
    }
    criar(genero) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.generoRepository.save(genero);
                return genero;
            }
            catch (err) {
                throw new Error("Falha ao criar o genero!");
            }
        });
    }
    buscarAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.generoRepository.find();
            }
            catch (error) {
                throw new Error("Falha ao retornar os gêneros!");
            }
        });
    }
    buscarByNome(nome) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.generoRepository.findOneBy({
                    nome: nome,
                });
            }
            catch (error) {
                throw new Error("Falha ao buscar o gênero!");
            }
        });
    }
    update(genero) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idGenero, nome } = genero;
            try {
                this.generoRepository.save(genero);
            }
            catch (error) {
                throw new Error("Falha ao atualizar o gênero!");
            }
        });
    }
    delete(generoId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const generoEncontrado = yield this.generoRepository.findOneBy({
                    idGenero: generoId,
                });
                if (generoEncontrado) {
                    this.generoRepository.remove(generoEncontrado);
                    return 1;
                }
                return 0;
            }
            catch (error) {
                throw new Error("Falha ao deletar o gênero!");
            }
        });
    }
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let num = this.generoRepository.query("select count(idGenero) from genero;");
                this.generoRepository.query("delete from genero;");
                return num;
            }
            catch (error) {
                throw new Error("Falha ao deletar todos os gêneros!");
            }
        });
    }
}
exports.default = new GeneroRepository();
