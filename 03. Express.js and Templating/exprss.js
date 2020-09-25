const http = require('http');
const url = require('url');

module.exports = function(){    
    const handlers = {
        get: {},
        post: {},
        delete: {},
        put: {},
    };
    

    const server = http.createServer(function(req,res){
        const { path, query} = url.parse(req.url, true);
        const method = req.method.toLowerCase();
        const reqHandler = handlers[method][path];
        
        if(!reqHandler){
            res.end(`Route ${method} ${path} not found!`);
            return;
        }

        reqHandler(req, res);
    });

    return{
        listen: server.listen.bind(server),
        get(path, handler){
            handlers.get[path] = handler;
        }
    }
};