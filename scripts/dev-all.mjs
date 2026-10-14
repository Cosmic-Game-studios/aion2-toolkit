// Starts the community API server and the Vite dev server together (Ctrl+C stops both).
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const procs = [
  ['api', [join(root, 'server', 'index.mjs')]],
  ['web', [join(root, 'node_modules', 'vite', 'bin', 'vite.js'), ...process.argv.slice(2)]],
].map(([name, args]) => {
  const p = spawn(process.execPath, args, { cwd: root, stdio: ['inherit', 'pipe', 'pipe'], env: process.env });
  const tag = (s) => s.toString().split(/\r?\n/).filter(Boolean).map((l) => `[${name}] ${l}`).join('\n') + '\n';
  p.stdout.on('data', (d) => process.stdout.write(tag(d)));
  p.stderr.on('data', (d) => process.stderr.write(tag(d)));
  p.on('exit', (code) => { console.log(`[${name}] exited with ${code}`); stop(code ?? 0); });
  return p;
});

let stopping = false;
function stop(code) {
  if (stopping) return;
  stopping = true;
  for (const p of procs) if (p.exitCode == null) p.kill();
  setTimeout(() => process.exit(code), 300);
}
process.on('SIGINT', () => stop(0));
process.on('SIGTERM', () => stop(0));
