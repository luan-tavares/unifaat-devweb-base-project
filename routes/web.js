import { Router } from 'express';
import express from 'express';
import path, { join } from 'path';
import { readdir } from 'fs';

import exampleModelApi from "./exampleApi.js";

export default (function () {

    const router = Router();

    /** Usado para servir json */
    router.use(express.json());

    /** Servir o public estaticamente, tanto para arquivos como para os assets de frontend */
    // NÃO SERÁ CHAMADO CASO TENHA A CAMADA DE NGINX COM ARQUIVOS ESTÁTICOS
    router.use(express.static(path.join(CONSTANTS.DIR, 'public')));

    // Rota para listar arquivos na pasta 'public'
    // NÃO SERÁ CHAMADO CASO TENHA A CAMADA DE NGINX COM ARQUIVOS ESTÁTICOS
    router.get('/', (req, res) => {
        const dirPath = join(CONSTANTS.DIR, 'public');

        readdir(dirPath, (err, files) => {
            if (err) {
                return res.status(CONSTANTS.HTTP.SERVER_ERROR).send('Erro ao ler o diretório');
            }

            const fileList = files.map(file => {
                return `<li><a href="/${file}">${file}</a></li>`;
            }).join('');

            res.send(`
            <html>
                <head><title>Lista de Arquivos</title></head>
                <body>
                    <h2>Lista de Arquivos</h2>
                    <ul>${fileList}</ul>
                </body>
            </html>
        `);
        });
    });

    // example model routes
    router.use('/', exampleModelApi);

    /** Se nenhuma rota for encontrada, 404 neles! */
    router.use((req, res) => {
        res.status(CONSTANTS.HTTP.NOT_FOUND).json({ error: "Not found" });
    });

    return router;

})();
