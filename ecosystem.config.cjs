module.exports = {
  apps: [
    {
      name: 'potobox',
      script: 'sh',
      args: '-c "npm run build && npm run preview -- --host 0.0.0.0 --port 4173"',
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
