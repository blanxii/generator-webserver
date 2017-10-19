![](https://raw.githubusercontent.com/yeoman/media/master/optimized/yeoman-masthead.png)

# 💂 Yeoman generator to create NodeJS web server scaffolding using express-js

## Requirements

- [NodeJS](https://nodejs.org/en/)
- [Yeoman](http://yeoman.io)
- [Generator-Webserver](https://github.com/blanxii/generator-webserver)

```
npm install -g yo
npm install -g generator-webserver
```

## Use

Before running the generator you will need to **create a folder** for your project where the generator will create all the project files and directories.

Once you have, **NodeJS**, **Yeoman**, **generator-webserver** installed and your project folder created you can run the generator using:

```
mkdir project
cd project
yo webserver
npm start
```

Webserver options are:

- **Project name** Used for .env
- **Template engine** We currently only support nunjucks. Use it if you want frontend in you webserver.
- **PM2** Recommended `Production Process Manager for Node.js`
- **Database driver** We currently support mysql (build with [sequelize](http://docs.sequelizejs.com/)) | mongodb (build with [mongoose](http://mongoosejs.com/))

## Scaffolding details
Inside server we can find:

`middleware.js` Here we can set up our default middlewares like user auth, or whatever.
`container.js` Register everthing inside **providers** folder using [blister](https://www.npmjs.com/package/blister).

Use providers to inject models (for instance) to our controllers. And avoid bad practices (direct imports inside controllers).

## License
This project is released under the [WTFPL LICENSE](http://www.wtfpl.net/ "WTFPL LICENSE").
