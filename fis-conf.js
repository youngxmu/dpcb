fis.config.set('modules.postpackager', 'simple');
fis.config.set('settings.spriter.csssprites.margin', 20);
fis.config.set('roadmap.path', [{
    reg: '**.css',
    useSprite: true,
    useStandard : false
}]);


fis.config.merge({
    roadmap : {
        path : [
            {
                reg : /\/public\/css\/(.*\.css)/i,
                release : '/public/css/$1'
            },
            {
                reg : /\/public\/js\/(.*\.js)/i,
                release : '/public/js/$1'
            },
            {  
                reg : /\/public\/img\/(.*\.((jpg)|(png)|(gif)|(ico)))/i,
                release : '/public/img/$1'
            },
            {
                reg : /\/views\//i,
                useStandard : true
            },
            {
                reg : /\/(logs|test|node_modules)\//i,
                release : false
            },
            {
                reg : '**',
                useStandard : false,
                useOptimizer : false,
            }
        ]
    },
    deploy : {
        youngS : [
            {
                receiver : 'http://139.199.57.52:8999',
                from : '/public',
                to : '/young/node/dpcb/public',
                subOnly : true
            },
            {
                receiver : 'http://139.199.57.52:8999',
                from : '/public',
                to : '/young/static/dpcb',
                subOnly : true
            },
            {
                receiver : 'http://139.199.57.52:8999',
                include : ['/views/**'],
                from : '/views',
                to : '/young/node/dpcb/views',
                subOnly : true,
                replace : {
                    from : 'http://10.99.13.32:8889',
                    to : 'http://jnly.me/dpcb'
                }
            }
        ],
        young : [
            {
                receiver : 'http://jnly.me/rec',
                from : '/public',
                to : '/young/node/dpcb/public',
                subOnly : true
            },
            {
                receiver : 'http://jnly.me/rec',
                from : '/public',
                to : '/young/static/dpcb',
                subOnly : true
            },
            {
                receiver : 'http://jnly.me/rec',
                include : ['/views/**'],
                from : '/views',
                to : '/young/node/dpcb/views',
                subOnly : true,
                replace : {
                    from : 'http://10.99.13.32:8889',
                    to : 'http://jnly.me/dpcb'
                }
            },
            {
                receiver : 'http://jnly.me/rec',
                include : ['/config/*.js'],
                from : '/config',
                to : '/young/node/dpcb/config',
                subOnly : true
            },
            {
                receiver : 'http://jnly.me/rec',
                include : ['/lib/**'],
                from : '/lib',
                to : '/young/node/dpcb/lib',
                subOnly : true
            },
            {
                receiver : 'http://jnly.me/rec',
                include : ['/routes/*.js'],
                from : '/routes',
                to : '/young/node/dpcb/routes',
                subOnly : true
            },
            {
                receiver : 'http://jnly.me/rec',
                include : ['/models/**'],
                from : '/models',
                to : '/young/node/dpcb/models',
                subOnly : true
            },
            {
                receiver : 'http://jnly.me/rec',
                include : ['app.js'],
                from : '/',
                to : '/young/node/dpcb',
                subOnly : true
            }
            ,
            {
                receiver : 'http://jnly.me/rec',
                include : ['route.js'],
                from : '/',
                to : '/young/node/dpcb',
                subOnly : true
            }
        ]
    }
});