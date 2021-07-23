'use strict';

const {softDelete} = require('../utils/genericMethods');

module.exports = (Histories) => {
  Histories.beforeRemote('create', async (ctx) => {
    const { body } = ctx.req;
    body.status = 'ACTIVO';
    ctx.req.body = body;
  });

  Histories.softDeleteHistories = async (idParam, ctx) => {
    const {query, params} = ctx.req;
    const id = (query.id) ? query.id : params.id;
    await softDelete(Histories, id);
    return {id, idParam};
  };

  Histories.remoteMethod('softDeleteHistories', {
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
};
