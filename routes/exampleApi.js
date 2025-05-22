import { Router } from 'express';
import ListExampleController from '../app/Controllers/ModelExample/ListExampleController.js';
import CreateExampleController from '../app/Controllers/ModelExample/CreateExampleController.js';

export default (function () {

    const router = Router();

    // router.metodo("/rota", (request, response) => {...})

    // GET Listar
    router.get('/api/example', ListExampleController);

    // POST Criar
    router.post('/api/example', CreateExampleController);

    return router;

})();