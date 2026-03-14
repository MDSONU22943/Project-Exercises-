const fs = require("fs")
const path = require("path")
const os = require("os")

// directory path
const directoryPath = path.join(__dirname,"test-folder")
// console.log(directoryPath)

// function to explore the directory
function exploreDirectory(dirPath) {
    // check if directory exists
    if(!fs.existsSync(dirPath)){
        console.log("Directory does not exist.")
        return
    }

    console.log("Exploring", dirPath)
    console.log("--------------------")

    try{
        // read the contents of the directory
        const items = fs.readdirSync(dirPath)
        // console.log(items)
        // console.log(typeof items)
        items.forEach(item => {
            const itemPath = path.join(dirPath, item)
            const stats = fs.statSync(itemPath)
            if(stats.isDirectory()){
                console.log(`[DIR] ${item}`)
            } else {
                console.log(`[FILE] ${item}`)
            }
        })
    }catch(err){
        console.error("Error reading directory:", err)
    }
}

// explore the directory
exploreDirectory(directoryPath)

// optional OS info
console.log("\n🖥 OS Info:", os.platform());