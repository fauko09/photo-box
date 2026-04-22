const { execFileSync, spawn } = require('node:child_process');
const path = require('node:path');

const rootDir = path.resolve(__dirname, '..');
const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const viteBin = path.join(rootDir, 'node_modules', 'vite', 'bin', 'vite.js');

execFileSync(npmCommand, ['run', 'build'], {
  cwd: rootDir,
  stdio: 'inherit',
});

const preview = spawn(process.execPath, [viteBin, 'preview', '--host', '0.0.0.0', '--port', '4173'], {
  cwd: rootDir,
  stdio: 'inherit',
  env: {
    ...process.env,
    NODE_ENV: 'production',
  },
});

preview.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});
