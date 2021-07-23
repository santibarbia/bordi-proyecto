'use strict';

require('dotenv').config();
const { v5: uuidv5,  v1: uuidv1} = require('uuid'); // For version 5
// re run pipes

module.exports = function(server) {

  server.dataSources.storage.connector.getFilename = function(file, req, res) {
    // se almacena en name el nombre del archivo quitando la extencion y reemplazandola por _
    let name = file.name.replace(`.${file.type.split('/').pop()}`, '_');
    // se reemplanzan los espacion y - por _ tambien se agrega un timestamp y la extencion del tipo de archivo
    name = name.replace(new RegExp(/(\s|-)/, 'gi'), '_').toLowerCase() + new Date().valueOf() + `.${file.type.split('/').pop()}`;
    // se retorna el nuevo nombre del archivpo
    return name;
  };

  server.remotes().phases.addBefore('auth', 'validationRole')
  .use(async function before(ctx, next) {
    // console.log(ctx.req.url);
    // console.log(ctx.req.method);
    // console.log(ctx.methodString);
    let err = null;
    if (server.needCheckMethod) {
      const user = server.currentUser;
      if (user.typeRole !== 'ADMIN') {
        try {
          const findRole = await server.models.Roles.findOne({
            where: {
              name: user.typeRole
            }
          });
          if (findRole) {
            const arrayMethods = findRole.methodNames;
            if (!arrayMethods.some((method) => ctx.methodString === method)) {
              err = new Error();
              err.statusCode = 500;
              err.code = 'UNAUTHORIZED';
              err.name = 'no permitido';
              err.message = 'accion no permmitida';
            }
          } else {
            const error = new Error();
            error.statusCode = 500;
            error.code = 'ROLE INVALID';
            error.name = 'role not exist';
            error.message = 'rol no existente';
            throw error;
          }
        } catch (error) {
          err = error;
        }
      }
    }
    console.log({err});
    err = null;
    next(err);
  });

  server.remotes().after('**', async (ctx) => {
    ctx.res.set('Authorization', server.token);
    try {
      const {username, typeRole} = server.currentUser;
      const currentUser = {username, typeRole};
      const currentUserToString = JSON.stringify(currentUser)
      ctx.res.set('currentUser', currentUserToString);
    } catch (error) {
      console.log(error);
      ctx.res.set('currentUser', undefined);
    }
  });

  server.remotes().before('*.create', async (ctx) => {
    const iduuidv5 = uuidv5(`${process.env.URL_UUID}`, uuidv5.DNS);
    const iduuidv1 = uuidv1();
    const id = uuidv5(iduuidv1, iduuidv5);
    // const model = ctx.methodString.split('.').shift();
    // console.log(ctx.methodString.split('.'));
    // console.log('post');
    // console.log(ctx.req.body);
    // console.log(ctx.req.body);
    // console.log('iduuidv5', iduuidv5);
    // console.log('iduuidv1', iduuidv1);
    // console.log('id', id);
  });
};
