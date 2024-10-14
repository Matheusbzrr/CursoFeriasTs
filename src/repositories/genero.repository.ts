import { AppDataSource } from "../db/data-source";
import { Genero } from "../models/genero";

class GeneroRepository {
    generoRepository = AppDataSource.getRepository(Genero);

    async criar(genero: Genero): Promise<Genero> {
        try{
            this.generoRepository.save(genero);
            return genero;
        } catch(err){
            throw new Error("Falha ao criar o genero!");
        }
    }

    async buscarAll(): Promise<Array<Genero>> {
        try {
            return this.generoRepository.find();
        } catch (error) {
            throw new Error("Falha ao retornar os gêneros!");
        }
    }

    async buscarById(generoId: number): Promise<Genero | null> {
        try {
            const genero = await this.generoRepository.findOneBy({
                idGenero: generoId,
            });
            return genero || null; // Retorna null se o gênero não for encontrado
        } catch (error) {
            throw new Error("Falha ao buscar o gênero por ID!");
        }
    }
    

    async buscarByNome(nome: string): Promise<Genero | null> {
        try {
            return this.generoRepository.findOneBy({
                nome: nome,
            });
        } catch (error) {
            throw new Error("Falha ao buscar o gênero!");
        }
    }

    async update(genero: Genero) {
        const { idGenero, nome } = genero;
        try {
            this.generoRepository.save(genero);
        } catch (error) {
            throw new Error("Falha ao atualizar o gênero!");
        }
    }

    async delete(generoId: number): Promise<number> {
        try {
            const generoEncontrado = await this.generoRepository.findOneBy({
                idGenero: generoId,
            });
            if (generoEncontrado) {
                this.generoRepository.remove(generoEncontrado);
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
        const result = await this.generoRepository.query("select count(idGenero) as total from genero;");
        this.generoRepository.query("delete from genero;");
        const num = result[0]?.total || 0; 

        return num;
        } catch (error) {
            throw new Error("Falha ao deletar todos os gêneros!");
        }
    }
}

export default new GeneroRepository();