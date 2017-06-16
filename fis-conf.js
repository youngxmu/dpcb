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
        dpcbS : [
            {
                receiver : 'http://123.206.194.194:8999/receiver',
                from : '/public',
                to : 'E:/dpcb/nodeapp/dpcb/public',
                subOnly : true
            },
            {
                receiver : 'http://123.206.194.194:8999/receiver',
                include : ['/views/**'],
                from : '/views',
                to : 'E:/dpcb/nodeapp/dpcb/views',
                subOnly : true,
                replace : {
                    from : 'http://localhost:8889',
                    to : 'http://www.viscloud.cn/dpcb'
                }
            }
        ],
        dpcb : [
            {
                receiver : 'http://123.206.194.194:8999/receiver',
                from : '/public',
                to : 'E:/dpcb/nodeapp/dpcb/public',
                subOnly : true
            },
            {
                receiver : 'http://123.206.194.194:8999/receiver',
                include : ['/views/**'],
                from : '/views',
                to : 'E:/dpcb/nodeapp/dpcb/views',
                subOnly : true,
                replace : {
                    from : 'http://localhost:8889',
                    to : 'http://www.viscloud.cn/dpcb'
                }
            },
            {
                receiver : 'http://123.206.194.194:8999/receiver',
                include : ['/config/*.js'],
                from : '/config',
                to : 'E:/dpcb/nodeapp/dpcb/config',
                subOnly : true
            },
            {
                receiver : 'http://123.206.194.194:8999/receiver',
                include : ['/lib/**'],
                from : '/lib',
                to : 'E:/dpcb/nodeapp/dpcb/lib',
                subOnly : true
            },
            {
                receiver : 'http://123.206.194.194:8999/receiver',
                include : ['/routes/*.js'],
                from : '/routes',
                to : 'E:/dpcb/nodeapp/dpcb/routes',
                subOnly : true
            },
            {
                receiver : 'http://123.206.194.194:8999/receiver',
                include : ['/models/**'],
                from : '/models',
                to : 'E:/dpcb/nodeapp/dpcb/models',
                subOnly : true
            },
            {
                receiver : 'http://123.206.194.194:8999/receiver',
                include : ['app.js'],
                from : '/',
                to : 'E:/dpcb/nodeapp/dpcb',
                subOnly : true
            }
            ,
            {
                receiver : 'http://123.206.194.194:8999/receiver',
                include : ['route.js'],
                from : '/',
                to : 'E:/dpcb/nodeapp/dpcb',
                subOnly : true
            }
        ],   
        youngS : [
            {
                receiver : 'http://jnly.me/rec/receiver',
                from : '/public',
                to : '/young/node/dpcb/public',
                subOnly : true
            },
            {
                receiver : 'http://jnly.me/rec/receiver',
                from : '/public',
                to : '/young/static/dpcb',
                subOnly : true
            },
            {
                receiver : 'http://jnly.me/rec/receiver',
                include : ['/views/**'],
                from : '/views',
                to : '/young/node/dpcb/views',
                subOnly : true,
                replace : {
                    from : 'http://localhost:8889',
                    to : 'http://jnly.me/dpcb'
                }
            }
        ],
        young : [
            {
                receiver : 'http://jnly.me/rec/receiver',
                from : '/public',
                to : '/young/node/dpcb/public',
                subOnly : true
            },
            {
                receiver : 'http://jnly.me/rec/receiver',
                from : '/public',
                to : '/young/static/dpcb',
                subOnly : true
            },
            {
                receiver : 'http://jnly.me/rec/receiver',
                include : ['/views/**'],
                from : '/views',
                to : '/young/node/dpcb/views',
                subOnly : true,
                replace : {
                    from : 'http://localhost:8889',
                    to : 'http://jnly.me/dpcb'
                }
            },
            {
                receiver : 'http://jnly.me/rec/receiver',
                include : ['/config/*.js'],
                from : '/config',
                to : '/young/node/dpcb/config',
                subOnly : true
            },
            {
                receiver : 'http://jnly.me/rec/receiver',
                include : ['/lib/**'],
                from : '/lib',
                to : '/young/node/dpcb/lib',
                subOnly : true
            },
            {
                receiver : 'http://jnly.me/rec/receiver',
                include : ['/routes/*.js'],
                from : '/routes',
                to : '/young/node/dpcb/routes',
                subOnly : true
            },
            {
                receiver : 'http://jnly.me/rec/receiver',
                include : ['/models/**'],
                from : '/models',
                to : '/young/node/dpcb/models',
                subOnly : true
            },
            {
                receiver : 'http://jnly.me/rec/receiver',
                include : ['app.js'],
                from : '/',
                to : '/young/node/dpcb',
                subOnly : true
            }
            ,
            {
                receiver : 'http://jnly.me/rec/receiver',
                include : ['route.js'],
                from : '/',
                to : '/young/node/dpcb',
                subOnly : true
            }
        ]
    }
});