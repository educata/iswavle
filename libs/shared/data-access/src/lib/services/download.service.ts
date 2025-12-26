import { Injectable } from '@angular/core';
import { PlaygroundFile } from '@iswavle/shared/utils';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root',
})
export class DownloadService {
  downloadFile(file: PlaygroundFile) {
    const blob = new Blob([file.content], { type: file.contentType });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = file.name;
    link.click();
    window.URL.revokeObjectURL(link.href);
    link.remove();
  }

  downloadFiles(files: PlaygroundFile[], zipName = 'blank') {
    const zip = new JSZip();
    for (const file of files) {
      zip.file(file.name, file.content);
    }
    zip.generateAsync({ type: 'blob' }).then(function (content) {
      saveAs(content, `${zipName}.zip`);
    });
  }
}
