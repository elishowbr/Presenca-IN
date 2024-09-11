const fs = require('fs');
const path = require('path');

const packageJson = require('./package.json');
const dependencies = packageJson.dependencies || {};

let requirements = '';

for (const [pkg, version] of Object.entries(dependencies)) {
    requirements += `${pkg}@${version}\n`;
}

fs.writeFileSync(path.join(__dirname, 'requirements.txt'), requirements);
console.log('requirements.txt gerado com sucesso!');
