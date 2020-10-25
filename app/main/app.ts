import * as WebSocket from 'ws';
import * as os from 'os';
import * as pty from 'node-pty';

const shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash';

const wss = new WebSocket.Server({ port: 6789 });

const ptyProcess = (pty as any).spawn(shell, [], {
  name: 'xterm-color',
  cols: 80,
  rows: 30,
  cwd: process.env.HOME,
  env: process.env,
});

wss.on('connection', function connection(ws: any) {
  ws.on('message', function incoming(message: any) {
    console.log('received: %s', message);
  });

  ptyProcess.on('data', function (data: any) {
    process.stdout.write(data);
    ws.send(data);
  });

  ptyProcess.write('ls\r');
  ptyProcess.resize(100, 40);

  //   setTimeout(() => {
  //     ptyProcess.write('pico minicom.log\r');
  //   }, 3000);

  // setInterval(() => {
  //   console.log("something");
  //   ws.send("something");
  // }, 3000);
});
