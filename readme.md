# Webkit

Small build system for static websites.

## Install guide

Clone this repository to directory where you want to work. Then you need to install all the node packages.

```
git clone https://github.com/gavlak/webkit.git my_project
cd my_project
npm install
```

After all node packages are installed, you're good to go.

## Available commands

```
gulp          # Compiles styles, scripts and views
gulp server   # Simple server serving content from ./web directory
gulp s        # Shorthand for gulp server
```

Server is usually running at `http://localhost:3000`, watching files for changes and automatically refreshes the browser on change. You can stop it using `Ctrl + C` command.

After you create new files it's necessary to restart the server.

## Directory structure

```
.
├── assets                  # Images, fonts and other assets
├── scripts                 # Javascript scripts
├── styles                  # Stylus styles
|   └── style.styl              # Default style file
├── views                   # Templates and views
│   ├── index.jade              # Sample index page
│   └── layout                  # All layouts
|       └── _page.jade              # Main layout
└── web                     # Generated static website is in this folder
```

Files with `_` (underscore) before name of the file won't compile as standalone files.