import { AppDataSource } from "../db/data-source";
import { Filme } from "../models/filme";

class FilmeRepository {
    filmeRepository = AppDataSource.getRepository(Filme);

    async criar(filme: Filme): Promise<Filme> {
        try {
            this.filmeRepository.save(filme);
            return filme;
        } catch (err) {
            throw new Error("Falha ao criar o filme!");
        }
    }

    

    async buscarAll(): Promise<Array<Filme>> {
        try {
            return this.filmeRepository.find();
        } catch (error) {
            throw new Error("Falha ao retornar os filmes!");
        }
    }

    async buscarById(filmeId: number): Promise<Filme | null> {
        try {
            return this.filmeRepository.findOneBy({
                idFilme: filmeId,
            });
        } catch (error) {
            throw new Error("Falha ao buscar o gênero por ID!");
        }
    }

    /*async buscarByNome(nome: string): Promise<Filme | null> {
        try {
            return this.filmeRepository.findOneBy({
                nome: nome,
            });
        } catch (error) {
            throw new Error("Falha ao buscar o gênero!");
        }
    }*/

    async update(filme: Filme) {
        const { idFilme, tituloOriginal, tituloPT, preco, duracao, ano, faixaEtaria, generos } = filme;
        try {
            this.filmeRepository.save(filme);
        } catch (error) {
            throw new Error("Falha ao atualizar o filme!");
        }
    }

    async delete(filmeId: number): Promise<number> {
        try {
            const filmeEncontrado = await this.filmeRepository.findOneBy({
                idFilme: filmeId,
            });
            if (filmeEncontrado) {
                this.filmeRepository.remove(filmeEncontrado);
                return 1;
            }
            return 0;
        } catch (error) {
            throw new Error("Falha ao deletar o gênero!");
        }
    }

    async deleteAll(): Promise<number> {
        try {
        // Executa a query para contar os registros antes da deleção
        const result = await this.filmeRepository.query("select count(idFilme) as total from Filme;");
        this.filmeRepository.query("delete from Filme;");
        const num = result[0]?.total || 0; 

        return num;
        } catch (error) {
            throw new Error("Falha ao deletar todos os Filmes!");
        }
    }
}

export default new FilmeRepository();