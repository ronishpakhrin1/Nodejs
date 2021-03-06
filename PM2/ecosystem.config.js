module.exports = {
  apps : [{
    name: 'server',
    script: './server.js',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: 'one two',
    instances: 1,
    exec_mode:'cluster',
    autorestart: true,
    watch: true,
    ignore_watch:'node_modules',
    max_memory_restart: '1G',
    out_file:'/home/rahaman/.pm2/logs/server-out.log',
    output:'/home/rahaman/.pm2/logs/server-out.log',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy : {
    production : {
      user : 'node',
      host : '212.83.163.1',
      ref  : 'origin/master',
      repo : 'git@github.com:repo.git',
      path : '/var/www/production',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};