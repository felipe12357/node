*** Comandos
    node => inicia la terminal interactiva de node (similar a la del navegador web)
    node nombreArchivo => ejecuta un archivo javascript

    npm init => permite crear el archivo de node packages
    npm start => ejecuta el comando start q tengamos instanciado en el package.json
    npm run dev => cualquiera otra palabra q no sea start, necesita la palabra run
                    con la configuracion actual ejecuta :nodemon

            para que el debugger funcione se debe ejecutar el programa desde el archivo package.json, y no mediante el comando

*** Extensiones VS Code

    Live Server: servidor web
    ThunderClient : como un postman
    GitLens: Deja ver cosas de git
    JsonTool: Ctrl(Cmd)+Alt+M for JSON pretty.

    MaterialIcon Theme

*** nvm

    Instalacion:
        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

        También fue necesario actualizar el archivo: .zprofile (esta en la carpeta home) y agregar:
        
        export NVM_DIR="$HOME/.nvm"
        [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
        [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
    
    comandos:
        nvm ls-remote = lista las versiones disponibles para instalar
        nvm install version = instala una version de node
        Nvm install 14 = instala la version 14

        Nvm use 14… hace q use la version 14
        Nvm ls = lista las version instaladas de node

** Paquetes
    npm install --save-dev nodemon