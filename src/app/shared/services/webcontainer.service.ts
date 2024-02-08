import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { WebContainer } from '@webcontainer/api';
import { FileSystemTree } from '@webcontainer/api';

export const codeFiles: FileSystemTree = {
  'index.js': {
    file: {
      contents: `
            import express from 'express';
            const app = express();
            const port = 3111;
            
            app.get('/', (req, res) => {
              res.send('Welcome to a WebContainers app! 🥳');
            });
            
            app.listen(port, () => {
              console.log(\`App is live at http://localhost:\${port}\`);
            }); 
            `,
    },
  },
  'package.json': {
    file: {
      contents: `
            {
              "name": "example-app",
              "type": "module",
              "dependencies": {
                "express": "latest",
                "nodemon": "latest"
              },
              "scripts": {
                "start": "nodemon --watch './' index.js"
              }
            } 
            `,
    },
  },
};

// TODO: implement WebcontainerState interface for injection tokens
@Injectable({ providedIn: 'root' })
export class WebContainerService {
  platform = inject(PLATFORM_ID);
  webcontainerInstance: WebContainer | undefined;

  async init() {
    if (isPlatformBrowser(this.platform)) {
      const webcontainerInstance = await WebContainer.boot();
      this.webcontainerInstance = webcontainerInstance;
      this.webcontainerInstance.mount(codeFiles);

      const packageJSON = await this.webcontainerInstance.fs.readFile(
        'package.json',
        'utf-8',
      );
      console.log(packageJSON);
    }
  }

  writeFile(path: string, data: string) {
    this.webcontainerInstance?.fs.writeFile(path, data);
  }
}
