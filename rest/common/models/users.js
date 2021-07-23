'use strict';

const { User } = require('loopback');
const {softDelete} = require('../utils/genericMethods');

module.exports = function (Users) {
  Users.beforeRemote('login', async (ctx) => {
    const { body } = ctx.req;
    body.ttl = 3600;
  });

  Users.afterRemote('login', async (ctx) => {
    const { result } = ctx;
    if (result) {
      const userFind = await Users.findById(result.userId);
      Users.app.token = result.id;
      Users.app.currentUser = userFind;

      if (userFind.typeRole.toLowerCase() === 'proyecto') {
        const projectFinded = await Users.app.models.Projects.findOne({ where: { userProjectId: userFind.id } });
        if (projectFinded) {
          ctx.result.projectId = projectFinded.id;
          const { sellers } = projectFinded;
          const mapSellers = sellers.map(el => {
            const { id, name } = el;
            return { id, name };
          });
          ctx.result.sellers = mapSellers;
        }
      } else if (userFind.typeRole.toLowerCase() === 'cliente') {
        const projectFinded = await Users.app.models.Projects.findOne({ where: { userClientId: userFind.id } });
        if (projectFinded) {
          ctx.result.projectId = projectFinded.id;
        }
      }
      const { username, typeRole } = userFind;
      const currentUser = { username, typeRole };
      ctx.result.currentUser = currentUser;
    }
  });

  Users.beforeRemote('logout', async (ctx) => {
    const { AccessToken } = Users.app.models;
    const token =
      ctx.req.headers.Authorization ||
      ctx.req.headers.authorization ||
      ctx.req.headers.Token ||
      ctx.req.headers.token ||
      ctx.req.headers.access_token ||
      ctx.req.access_token ||
      ctx.req.query.access_token;

    ctx.req['accessToken'] = token;
    ctx.args.access_token = token;
    ctx.req.params = {
      ...ctx.req.params,
      accessToken: token
    }

    const findToken = await AccessToken.findById(token);
    if (!findToken) {
      const err = new Error();
      err.statusCode = 500;
      err.code = 'ERROR_TOKEN_NOT_FOUND';
      err.name = 'ERROR_TOKEN_NOT_FOUND';
      err.message = 'NO SE ENCONTRO TOKEN PARA DESLOGUEO';
      throw err;
    }
  });

  Users.afterRemote('logout', async (ctx) => {
    ctx.result = { result: 200 };
  });

  Users.beforeRemote('create', async (ctx) => {
    const {body} = ctx.req;
    body.password = generatePassword();
    body.status = 'ACTIVO';
    body.correo = `${body.email}`
    body.email = null;
  });

  Users.afterRemote('create', async (ctx) => {
    const {Emails} = Users.app.models;
    const {body} = ctx.req;
    const {typeRole} = body;
    if (typeRole === 'ADMIN') {
      await Emails.sendUsersAdmin(body);
    } else if (typeRole === 'COLABORADOR') {
      await Emails.sendUsersColaborador(body);
    }
  });

  Users.findOrCreateSellers = async (data) => {
    let sellers = [];
    let sellersToCreate = [];
    // const findSellers = await Users.find({
    //   where: {
    //     and: [
    //       { realm: { inq: data } },
    //       { typeRole: 'VENDEDOR' }
    //     ]
    //   }
    // });
    // if (findSellers && findSellers.length) {
    //   if (data.length > findSellers.length) {
    //     data.forEach(name => {
    //       const sellerFinded = findSellers.find(seller => seller.realm === name);
    //       if (sellerFinded) {
    //         const userToReturn = {
    //           id: sellerFinded.id,
    //           name: sellerFinded.realm
    //         }
    //         sellers.push(userToReturn);
    //       } else {
    //         sellersToCreate = [...sellersToCreate, name];
    //       }
    //     });

    //   }
    // } else {
    // }
    sellersToCreate = data;
    for (let index = 0; index < sellersToCreate.length; index++) {
      const name = sellersToCreate[index];
      const userToSave = {
        realm: name,
        typeRole: 'VENDEDOR',
        status: 'ACTIVO'
      };
      const resulCreate = await Users.create(userToSave);
      const userToReturn = {
        id: resulCreate.id,
        name: resulCreate.realm
      }
      sellers.push(userToReturn);
    }
    return sellers;
  };

  Users.findOrCreateInst = async (data) => {
    let instToReturn;
    const {mail, phone, realm} = data;
    const {Contacts} = Users.app.models;
    const instFinded = await Users.findOne({
      where: {
        and: [
          { realm: realm },
          { typeRole: 'INSTITUCION' }
        ]
      }
    });

    if (instFinded) {
      const mailFinded = await Contacts.findOne({
        where: {
          and: [
            { valueContact: mail },
            { typeContact: 'EMAIL' }
          ]
        }
      });

      if (!mailFinded) {
        const toCreate = {
          nameContact: realm,
          valueContact: mail,
          typeContact: 'EMAIL',
          userFk: instFinded.id
        }
        await Contacts.create(toCreate);
      }

      const phoneFinded = await Contacts.findOne({
        where: {
          and: [
            { valueContact: phone },
            { typeContact: 'TEL' }
          ]
        }
      });

      if (!phoneFinded) {
        const toCreate = {
          nameContact: realm,
          valueContact: phone,
          typeContact: 'TEL',
          userFk: instFinded.id
        }
        await Contacts.create(toCreate);
      }

      instToReturn = instFinded;
    } else {
      const instToCreate = {
        realm: realm,
        address: data.address,
        correo: data.mail,
        typeRole: 'INSTITUCION'
      }

      const resultCreateUser = await Users.create(instToCreate);

      const toCreate = [
        {
          nameContact: realm,
          valueContact: mail,
          typeContact: 'EMAIL',
          userFk: resultCreateUser.id
        },
        {
          nameContact: realm,
          valueContact: phone,
          typeContact: 'TEL',
          userFk: resultCreateUser.id
        }
      ]

      await Contacts.create(toCreate);

      instToReturn = resultCreateUser;
    }

    return instToReturn;
  };

  Users.findOrCreateReferent = async (referent, institution) => {
    let refToReturn;
    const {mail, phone, realm, dni_cuil} = referent;
    const { Contacts } = Users.app.models;
    // const refFinded = await Users.findOne({
    //   where: {
    //     and: [
    //       { dni_cuil: dni_cuil },
    //       { typeRole: 'CLIENTE' }
    //     ]
    //   }
    // });

    // if (refFinded) {
    //   const mailFinded = await Contacts.findOne({
    //     where: {
    //       and: [
    //         { valueContact: mail },
    //         { typeContact: 'EMAIL' }
    //       ]
    //     }
    //   });

    //   if (!mailFinded) {
    //     const toCreate = {
    //       nameContact: realm,
    //       valueContact: mail,
    //       typeContact: 'EMAIL',
    //       userFk: refFinded.id
    //     }
    //     await Contacts.create(toCreate);
    //   }

    //   const phoneFinded = await Contacts.findOne({
    //     where: {
    //       and: [
    //         { valueContact: phone },
    //         { typeContact: 'TEL' }
    //       ]
    //     }
    //   });

    //   if (!phoneFinded) {
    //     const toCreate = {
    //       nameContact: realm,
    //       valueContact: phone,
    //       typeContact: 'TEL',
    //       userFk: refFinded.id
    //     }
    //     await Contacts.create(toCreate);
    //   }

    //   const refToUpdate = {...refFinded}.__referent;

    //   const newpassword = generatePassword();

    //   const newpasswordCrypted = Users.hashPassword(newpassword)

    //   refToUpdate.password = newpassword;

    //   await Users.forceChangedPassword({id: refToUpdate.id, password: newpasswordCrypted});

    //   refToReturn = refToUpdate;
    // } else {
      const countUsers = await Users.count();
      const username = (institution) ? `${institution.realm}-ref-${countUsers}` : `${referent.realm}-${countUsers}`;
      const password = generatePassword();
      const refToCreate = {
        realm: realm,
        address: referent.address,
        dni_cuil: referent.dni_cuil,
        correo: referent.mail,
        typeRole: 'CLIENTE',
        status: 'ACTIVO',
        username: username,
        password: password
      }

      const resultCreateUser = await Users.create(refToCreate);

      refToCreate.id = resultCreateUser.id;

      const toCreate = [
        {
          nameContact: realm,
          valueContact: mail,
          typeContact: 'EMAIL',
          userFk: resultCreateUser.id
        },
        {
          nameContact: realm,
          valueContact: phone,
          typeContact: 'TEL',
          userFk: resultCreateUser.id
        }
      ]

      await Contacts.create(toCreate);

      refToReturn = refToCreate;
    // }

    return refToReturn;
  };

  Users.createUserProject = async () => {
    const countUsers = await Users.count();
    const username = `tutti${countUsers+1}`;
    const password = generatePassword();
    let projToCreate = {
      realm: username,
      typeRole: 'PROYECTO',
      status: 'ACTIVO',
      username: username,
      password: password
    }

    let resultCreateUser = await Users.create(projToCreate);

    projToCreate.id = resultCreateUser.id;

    return projToCreate;
  };

  const generatePassword = () => {
    let length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }

  Users.softDeleteUsers = async (idParam, ctx) => {
    const {query, params} = ctx.req;
    const id = (query.id) ? query.id : params.id;
    await softDelete(Users, id);
    return {id, idParam};
  };

  Users.remoteMethod('softDeleteUsers', {
    http: {
      path: '/softDelete/:id',
      verb: 'delete',
    },
    accepts: [
      {
        arg: 'id',
        type: 'number'
      },
      {
        arg: "ctx",
        type: "object",
        http: {
          source: "context"
        }
      }
    ],
    returns: {
      type: 'object',
      root: true
    },
  });

  Users.forceChangedPassword = async (user) => {
    const sql = `UPDATE Users set password = "${user.password}" where id = ${user.id}`;
    const resultUpdate = await Users.executeSql(sql);
    return resultUpdate;
  }

  Users.executeSql = (sql) => {
    return new Promise((resolve, reject) => {
      const ds = Users.dataSource;
      ds.connector.query(sql, null, (err, data) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  };
};
