const JavaScriptObfuscator = require('javascript-obfuscator');
const fs = require('fs');
const path = require('path');

// Input file and output directory
const inputFilePath = './src/ld.js';
const outputDirectory = './dist';
const outputFilePath = path.join(outputDirectory, 'ld.min.js');

// Function to clear the output directory
const clearOutputDirectory = (directory) => {
    if (fs.existsSync(directory)) {
        fs.rmSync(directory, { recursive: true, force: true });
        console.log(`Cleared output directory: ${directory}`);
    }
};

// Clear and recreate the output directory
clearOutputDirectory(outputDirectory);
fs.mkdirSync(outputDirectory, { recursive: true });

// Obfuscation options
const obfuscationOptions = {
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 0.75,
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 0.4,
    stringArrayEncoding: ['rc4'],
    stringArrayThreshold: 0.8,
    splitStrings: true,
    splitStringsChunkLength: 3,
    renameGlobals: true,
    selfDefending: true,
    disableConsoleOutput: true
};

// Obfuscate ld.js and output to ld.min.js
const obfuscateFile = (inputPath, outputPath) => {
    try {
        const inputCode = fs.readFileSync(inputPath, 'utf8');
        
        // Obfuscate the code
        const obfuscatedCode = JavaScriptObfuscator.obfuscate(inputCode, obfuscationOptions).getObfuscatedCode();
        
        // Write the obfuscated code to the output file
        fs.writeFileSync(outputPath, obfuscatedCode, 'utf8');
        
        console.log(`Obfuscated: ${inputPath} -> ${outputPath}`);
    } catch (error) {
        console.error(`Error obfuscating file ${inputPath}:`, error);
    }
};

// Run obfuscation on ld.js
obfuscateFile(inputFilePath, outputFilePath);
