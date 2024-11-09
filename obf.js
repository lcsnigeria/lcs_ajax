const JavaScriptObfuscator = require('javascript-obfuscator');
const fs = require('fs');
const path = require('path');

// Directory containing the JavaScript files to obfuscate
const inputDirectory = './src';
// Directory to save the obfuscated files
const outputDirectory = './dist';

// Function to remove all files and subdirectories from the output directory
const clearOutputDirectory = (directory) => {
    if (fs.existsSync(directory)) {
        fs.rmSync(directory, { recursive: true, force: true });
        console.log(`Cleared output directory: ${directory}`);
    }
};

// Clear and recreate the output directory
clearOutputDirectory(outputDirectory);
fs.mkdirSync(outputDirectory, { recursive: true });

// Obfuscation options (customize as needed)
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

// Function to obfuscate a single file
const obfuscateFile = (filePath, outputFilePath) => {
    try {
        const inputCode = fs.readFileSync(filePath, 'utf8');
        
        // Obfuscate the code
        const obfuscatedCode = JavaScriptObfuscator.obfuscate(inputCode, obfuscationOptions).getObfuscatedCode();
        
        // Write the obfuscated code to the output file
        fs.writeFileSync(outputFilePath, obfuscatedCode, 'utf8');
        
        console.log(`Obfuscated: ${filePath} -> ${outputFilePath}`);
    } catch (error) {
        console.error(`Error obfuscating file ${filePath}:`, error);
    }
};

// Function to obfuscate all JavaScript files in a directory
const obfuscateDirectory = (inputDir, outputDir) => {
    fs.readdirSync(inputDir).forEach(file => {
        const filePath = path.join(inputDir, file);
        // If the file is ld.js, set the output to ld.min.js
        const outputFilePath = file === 'ld.js' 
            ? path.join(outputDir, 'ld.min.js') 
            : path.join(outputDir, file);

        // Check if the current path is a directory
        if (fs.statSync(filePath).isDirectory()) {
            // Recursively obfuscate files in subdirectories
            if (!fs.existsSync(outputFilePath)) {
                fs.mkdirSync(outputFilePath);
            }
            obfuscateDirectory(filePath, outputFilePath);
        } else if (path.extname(file) === '.js') {
            // Only obfuscate JavaScript files
            obfuscateFile(filePath, outputFilePath);
        }
    });
};

// Start obfuscating the directory
obfuscateDirectory(inputDirectory, outputDirectory);
