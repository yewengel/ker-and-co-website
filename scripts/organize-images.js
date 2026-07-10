#!/usr/bin/env node

/**
 * Saron Orthopedic Image Organization Helper
 * 
 * This script helps you organize your medical images into the correct folder structure
 * for the website components to display them properly.
 */

const fs = require('fs');
const path = require('path');

// Define the folder structure
const folders = [
  'public/images/procedures/hemiarthroplasty',
  'public/images/procedures/total-hip-replacement',
  'public/images/procedures/prp-injection',
  'public/images/procedures/anesthesia-care',
  'public/images/equipment/digital-xray',
  'public/images/equipment/c-arm-xray',
  'public/images/equipment/xray',
  'public/images/equipment/laboratory',
  'public/images/facility/building',
  'public/images/facility/reception',
  'public/images/facility/surgery-room'
];

// Create folders if they don't exist
function createFolders() {
  console.log('🏗️  Creating folder structure...\n');
  
  folders.forEach(folder => {
    const fullPath = path.join(process.cwd(), folder);
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
      console.log(`✅ Created: ${folder}`);
    } else {
      console.log(`📁 Exists: ${folder}`);
    }
  });
  
  console.log('\n🎉 Folder structure ready!');
}

// Display organization guide
function showGuide() {
  console.log(`
🎯 SARON ORTHOPEDIC IMAGE ORGANIZATION GUIDE
============================================

📁 FOLDER STRUCTURE CREATED:
${folders.map(folder => `   ${folder}`).join('\n')}

🔢 NAMING CONVENTIONS:

For SEQUENCE IMAGES (follow-up images 1, 2, 3, etc.):
   Format: [procedure-name]-[number].jpg
   
   Examples:
   ✅ hemiarthroplasty-1.jpg
   ✅ hemiarthroplasty-2.jpg  
   ✅ hemiarthroplasty-3.jpg
   ✅ total-hip-replacement-1.jpg
   ✅ prp-injection-1.jpg
   ✅ digital-xray-1.jpg

For SINGLE IMAGES:
   Format: [item-name].jpg
   
   Examples:
   ✅ xray.jpg
   ✅ laboratory.jpg

🎨 WHAT TO PUT WHERE:

📋 PROCEDURES (/procedures/):
   • Hemiarthroplasty: Step-by-step surgery images
   • Total Hip Replacement: Complete surgery process
   • PRP Injection: Injection therapy steps
   • Anesthesia Care: Patient monitoring images

🔬 EQUIPMENT (/equipment/):
   • Digital X-ray: Modern imaging equipment
   • C-arm X-ray: Surgical imaging system
   • Laboratory: Testing equipment and processes

🏢 FACILITY (/facility/):
   • Building: Exterior and interior shots
   • Reception: Patient waiting areas
   • Surgery Room: Operating theaters

🚀 NEXT STEPS:
1. Copy your images to the appropriate folders
2. Rename them according to the naming convention
3. The website will automatically display them!

💡 TIP: For best results, use high-quality images (1920x1080 or higher)
`);
}

// Main execution
function main() {
  console.log('🏥 Saron Orthopedic Image Organization Helper\n');
  
  createFolders();
  showGuide();
  
  console.log('\n📸 Ready to add your images! Follow the guide above.\n');
}

// Run the script
main();
