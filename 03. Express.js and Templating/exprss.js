const http = require('http');
const url = require('url');

function methodHandlerFactory(handlers, method){
    return function(path, ...fns){
        // const handler = fns[fns.length-1];
        handlers[method][path] = fns;
    }
}

function iterateAndExecuteHandlers(req, res, handlersArray, done){
    const fn = handlersArray[0];
    if(!fn){done(req,res); return;}
    fn(Req, res, function(err){
        if(err){console.error(err); return;}
        iterateAndExecuteHandlers(req, res, handlersArray.slice(1));
    });
}

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
        const reqHandlers = handlers[method][path];

        if(!reqHandlers){
            res.end(`Route ${req.method} ${path} not found!`);
            return;
        }

        const originalEnd = res.end.bind(res);
        res.end = function(data){
            if(typeof data === 'object'){
                data = JSON.stringify(data);
            }
            originalEnd(data);
        }

        iterateAndExecuteHandlers(req, res, reqHandlers);

        // reqHandlers.forEach(fn => fn(req,res));
     
    });

    return{
        listen: server.listen.bind(server),
        get: methodHandlerFactory(handlers, 'get'),
        post: methodHandlerFactory(handlers, 'post'),
        // get(path, handler){
        //     handlers.get[path] = handler;
        // },
        // post(path, handler){
        //     handlers.post[path] = handler;
        // }
    };
};