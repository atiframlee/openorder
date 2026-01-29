#!/usr/bin/env node

/**
 * Fix Imports Script
 * Automatically updates import paths when files are moved
 * 
 * Usage: node fix-imports.js
 */

const fs = require('fs');
const path = require('path');

// Configuration
const SRC_DIR = path.join(__dirname, 'src');
const EXTENSIONS = ['.js', '.jsx', '.ts', '.tsx'];

// Find all source files
function findFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      findFiles(filePath, fileList);
    } else if (EXTENSIONS.includes(path.extname(file))) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Fix imports in a file
function fixImportsInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // Fix common import issues
  const fixes = [
    // Fix double slashes in paths
    { pattern: /from ['"](.*)\/\/(.*)['"];/g, replace: "from '$1/$2';" },
    
    // Fix incorrect relative paths (e.g., ../Page/Search.css when file is in Page/Search/)
    { pattern: /from ['"]\.\.\/Page\//g, replace: "from './" },
    
    // Fix Assets path (should be ../Assets from components)
    { pattern: /from ['"]\.\.\/\.\.\/assets\//g, replace: "from '../Assets/" },
    { pattern: /from ['"]\.\.\/\.\.\/Assets\//g, replace: "from '../Assets/" },
  ];
  
  fixes.forEach(({ pattern, replace }) => {
    if (pattern.test(content)) {
      content = content.replace(pattern, replace);
      modified = true;
    }
  });
  
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Fixed imports in: ${path.relative(SRC_DIR, filePath)}`);
    return true;
  }
  
  return false;
}

// Main execution
console.log('🔍 Scanning for broken imports...\n');

const files = findFiles(SRC_DIR);
let fixedCount = 0;

files.forEach(file => {
  if (fixImportsInFile(file)) {
    fixedCount++;
  }
});

console.log(`\n✨ Fixed ${fixedCount} file(s)`);
