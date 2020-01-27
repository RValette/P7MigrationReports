# P7MigrationReports
This package is used to check a codebase before PHP7 migration.
It is using PHP7CC and PHAN reports, and combine them to show only files and lines that have to be changed.
It displays the results using jsoneditor.

# Requirement
- Node Js
- Composer
- PHP 7.X.X
- Php-ast extension

# Get Started
- Install php-ast extension (https://github.com/nikic/php-ast)
- Run composer install
- Run npm install
- Put your code into the folder : *codebase*
- Run *npm run start:dev*
- Access the page through localhost:8080