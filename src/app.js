import {readTextFile} from "./readTextFile.js"


// create the editor
const container = document.getElementById("jsoneditor")
const options = {}
const editor = new JSONEditor(container, options)

var result = {}

// Read the JSON reports
readTextFile("../reports/php7cc.json", function(text){
    var php7cc = JSON.parse(text);

    readTextFile("../reports/phan.json", function(text){
        var phan = JSON.parse(text);
        parseJson(php7cc, phan)
        loadSummary()
    });

});

function loadSummary(){
    let uniqueErrors = []
    let totalLines = 0
    let totalFiles = 0

    Object.entries(result).forEach(file => {
        let errors = file[1]
        totalFiles++
        errors.forEach(error => {
            totalLines++
            if(!uniqueErrors.includes(error.text)){
                uniqueErrors.push(error.text)
            }
        })
    })

    const DOMuniqueError = document.getElementById("unique-error")
    const DOMtotalLines = document.getElementById("total-lines")
    const DOMtotalFiles = document.getElementById("total-files")
    
    DOMuniqueError.getElementsByClassName("summary-item-number")[0].innerHTML = uniqueErrors.length
    DOMtotalLines.getElementsByClassName("summary-item-number")[0].innerHTML = totalLines
    DOMtotalFiles.getElementsByClassName("summary-item-number")[0].innerHTML = totalFiles

    const DOMListeUniqueError = document.getElementById("liste-errors-uniques")

    uniqueErrors.forEach(error => {
        DOMListeUniqueError.innerHTML += '<li>'+ error +'</li>'
    })
}

function parseJson(php7cc, phan){

    parsePhp7cc(php7cc);
    parsePhan(phan);
    
    editor.set(result)

}

function parsePhp7cc(php7cc){
    php7cc.files.forEach(file => {
        let name = file.name.split("codebase\\")[1]
        let errors = []

        if(Object.keys(file.errors).length !== 0){
            file.errors.forEach(error => {
                errors.push(error)
            });
        }

        if(Object.keys(file.warnings).length !== 0){
            file.warnings.forEach(warning => {
                errors.push(warning)
            });
        }

        result[name] = errors
    });

}

function parsePhan(phan){
    phan.forEach(error => {
        let name = error.location.path.split("codebase\\")[1]
        let line = error.location.lines.begin
        
        if(result[name] !== undefined){
            var sameError = result[name].filter(function(error){
                return error.line = line
            })
            if(sameError.length === 0){
                result[name].errors.push({
                    line: line,
                    text: error.description
                })
            }
        }else{
            result[name] = [
                {
                    line: line,
                    text: error.description
                }
            ]
        }
    })
    
}
