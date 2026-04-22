module.exports = {
  apps: [
    {
      name: 'potobox',
      script: './scripts/pm2-start.cjs',
      cwd: __dirname,
      env: {
        NODE_ENV: 'production',
      },
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
    },
  ],
};
