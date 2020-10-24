const { homeController } = require('../controllers');

module.exports = (router) => {
    router.get('/', (req,res, next)=> {
        res.locals.name = 'Name !!!';
        next();
    }, homeController.get.home);

    return router;
};