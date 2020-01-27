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
    });

});

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
                    name: name
                })
            }
        }else{
            result[name] = [
                {
                    line: line,
                    name: name
                }
            ]
        }
    })
    
}