import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const directoryPath = path.join(__dirname, 'src');

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(file => {
    let fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath, callback);
    } else {
      callback(fullPath);
    }
  });
}

walk(directoryPath, (filePath) => {
  if (filePath.endsWith('.jsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove standalone `import React from 'react';`
    content = content.replace(/^import React from 'react';\r?\n/gm, '');
    
    // Replace `import React, { ... } from 'react';` with `import { ... } from 'react';`
    content = content.replace(/import React,\s*\{(.+?)\}\s*from 'react';/g, "import {$1} from 'react';");
    
    // CRM.jsx unused
    if (filePath.endsWith('CRM.jsx')) {
      content = content.replace(/CheckCircle,\s*/g, '');
    }
    // CaseStudies.jsx unused
    if (filePath.endsWith('CaseStudies.jsx')) {
      content = content.replace(/^import \{ ArrowRight \} from 'lucide-react';\r?\n/gm, '');
      content = content.replace(/^import \{ Link \} from 'react-router-dom';\r?\n/gm, '');
    }
    // Commerce.jsx unused
    if (filePath.endsWith('Commerce.jsx')) {
      content = content.replace(/Check,\s*/g, '');
    }
    // CreatorCommerce.jsx unused
    if (filePath.endsWith('CreatorCommerce.jsx')) {
      content = content.replace(/CheckCircle,\s*/g, '');
    }

    fs.writeFileSync(filePath, content, 'utf8');
  }
});
console.log('Fixed ESLint issues.');
