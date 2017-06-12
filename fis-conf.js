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
        nodeS1 : [
            {
                receiver : 'http://10.99.113.15:8999/receiver',
                from : '/public',
                to : '/young/node/qkwx/public',
                subOnly : true
            },
            {
                receiver : 'http://10.99.113.15:8999/receiver',
                from : '/public',
                to : '/young/static/qkwx',
                subOnly : true
            },
            {
                receiver : 'http://10.99.113.15:8999/receiver',
                include : ['/views/**'],
                from : '/views',
                to : '/young/node/qkwx/views',
                subOnly : true,
                replace : {
                    from : 'http://10.99.13.32:8561',
                    to : 'http://act.cnhubei.com/qkwx'
                }
            }
        ],
        node1 : [
            {
                receiver : 'http://10.99.113.15:8999/receiver',
                from : '/public',
                to : '/young/node/qkwx/public',
                subOnly : true
            },
            {
                receiver : 'http://10.99.113.15:8999/receiver',
                from : '/public',
                to : '/young/static/qkwx',
                subOnly : true
            },
            {
                receiver : 'http://10.99.113.15:8999/receiver',
                include : ['/views/**'],
                from : '/views',
                to : '/young/node/qkwx/views',
                subOnly : true,
                replace : {
                    from : 'http://10.99.13.32:8561',
                    to : 'http://act.cnhubei.com/qkwx'
                }
            },
            {
                receiver : 'http://10.99.113.15:8999/receiver',
                include : ['/config/*.js'],
                from : '/config',
                to : '/young/node/qkwx/config',
                subOnly : true
            },
            {
                receiver : 'http://10.99.113.15:8999/receiver',
                include : ['/lib/**'],
                from : '/lib',
                to : '/young/node/qkwx/lib',
                subOnly : true
            },
            {
                receiver : 'http://10.99.113.15:8999/receiver',
                include : ['/routes/*.js'],
                from : '/routes',
                to : '/young/node/qkwx/routes',
                subOnly : true
            },
            {
                receiver : 'http://10.99.113.15:8999/receiver',
                include : ['/models/**'],
                from : '/models',
                to : '/young/node/qkwx/models',
                subOnly : true
            },
            {
                receiver : 'http://10.99.113.15:8999/receiver',
                include : ['app.js'],
                from : '/',
                to : '/young/node/qkwx',
                subOnly : true
            }
            ,
            {
                receiver : 'http://10.99.113.15:8999/receiver',
                include : ['route.js'],
                from : '/',
                to : '/young/node/qkwx',
                subOnly : true
            }
        ]
    }
});