import { Request, Response } from "express";
import { Filme } from "../models/filme";
import filmeRepository from "../repositories/filme.repository"; 
import { Genero } from "../models/genero";
import generoRepository from "../repositories/genero.repository";

export default class FilmeController {

    async create(req: Request, res: Response) {
        if (!req.body.tituloOriginal) {
            res.status(400).send({
                message: "Não pode ser vazio o filme!"
            });
            return;
        }

        try {
            const filme: Filme = new Filme(
                req.body.tituloOriginal,
                req.body.preco,
                req.body.duracao,
                req.body.faixaEtaria,
                req.body.tituloPT,
                req.body.ano
            );

            filme.generos = []; 

            
            if (req.body.generos && Array.isArray(req.body.generos)) {
                for (const generoId of req.body.generos) {
                    const genero = await generoRepository.buscarById(generoId);
                    if (genero) {
                        filme.generos.push(genero);
                    }
                }
            }

            const savedFilme = await filmeRepository.criar(filme);
            res.status(201).send(savedFilme);
        } catch (err) {
            console.error(err); 
            res.status(500).send({
                message: "Erro ao tentar salvar um filme."
            });
        }
    }


    
    

    async findAll(req: Request, res: Response) {
        try {
            const filmes = await filmeRepository.buscarAll(); 
            res.status(200).send(filmes);
        } catch (err) {
            res.status(500).send({
                message: "Erro ao buscar todos os Filmes." 
            });
        }
    }

    async findOne(req: Request, res: Response) {
        const id: number = parseInt(req.params.id);

        try {
            const filme = await filmeRepository.buscarById(id); 
            if (filme) res.status(200).send(filme);
            else res.status(404).send({ message: `Filme com id=${id} não encontrado.` });
        } catch (err) {
            res.status(500).send({ message: `Erro ao buscar o Filme com id=${id}.` });
        }
    }

    /*async findName(req: Request, res: Response) {
        const nome: string = req.params.nome;

        try {
            const filme = await filmeRepository.buscarByNome(nome); // Usar a instância do repositório
            if (filme) res.status(200).send(filme);
            else res.status(404).send({ message: Filme com nome=${nome} não encontrado. });
        } catch (err) {
            res.status(500).send({ message: Erro ao buscar o Filme com nome=${nome} });
        }
    }*/

    async update(req: Request, res: Response) {
        let filme: Filme = req.body;
        filme.idFilme = parseInt(req.params.id);        
        try {
            await filmeRepository.update(filme); // Usar a instância do repositório
            res.send({ message: `Filme ${filme.tituloOriginal} atualizado com sucesso!` });
        } catch (err) {
            res.status(500).send({ message: `Erro ao atualizar o Filme com id=${filme.idFilme}.` });
        }
    }

    async delete(req: Request, res: Response) {
        const id: number = parseInt(req.params.id);

        try {
            const num = await filmeRepository.delete(id); // Usar a instância do repositório

            if (num === 1) {
                res.send({ message: "Filme deletado com sucesso!" });
            } else {
                res.send({ message: `Não foi possível deletar o Filme com id=${id}. O Filme não foi encontrado.` });
            }
        } catch (err) {
            res.status(500).send({ message: `Erro ao deletar o Filme com id=${id}.` });
        }
    }

    async deleteAll(req: Request, res: Response) {
        try {
            const num = await filmeRepository.deleteAll(); // Usar a instância do repositório
            res.send({ message: `${num} Filmes foram deletados com sucesso!` });
        } catch (err) {
            res.status(500).send({ message: "Erro ao deletar todos os Filmes." });
        }
    }
}