'use strict';

const {softDelete} = require('../utils/genericMethods');

module.exports = (Combos) => {
  Combos.beforeRemote('create', async (ctx) => {
    const { body } = ctx.req;
    body.status = 'ACTIVO';
    ctx.req.body = body;
  });

  const randomInt = (min, max) => {
    return min + Math.round((max - min) * Math.random());
  };

  Combos.getRandomCombo = async () => {
    let ret;
    const arrayCombos = await Combos.find({include: 'Files'});
    if (arrayCombos.length) {
      const indexCombo = randomInt(0, (arrayCombos.length - 1));
      ret = arrayCombos[indexCombo];
    }
    return ret;
  };

  Combos.remoteMethod('getRandomCombo', {
    http: {
      path: '/getRandomCombo',
      verb: 'get',
    },
    accepts: [],
    returns: {
      type: 'object',
      root: true,
    }
  });

  Combos.featuredCombos = async (filter) => {
    const {skip, limit, ...otherFilters} = filter;
    const arrayCombos = await Combos.find({skip: skip, limit: limit, include: 'Files'});
    return arrayCombos;
  };

  Combos.getFeaturedCombos = async (ctx) => {
    const {query} = ctx.req;
    const {skip = 0, limit = 2} = query;
    const arrayCombos = await Combos.featuredCombos({skip: skip, limit: limit});
    return arrayCombos;
  };

  Combos.remoteMethod('getFeaturedCombos', {
    http: {
      path: '/getFeaturedCombos',
      verb: 'get',
    },
    accepts: [
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
      root: true,
    }
  });

  Combos.softDeleteCombo = async (idParam, ctx) => {
    const {query, params} = ctx.req;
    const id = (query.id) ? query.id : params.id;
    await softDelete(Combos, id);
    return {id, idParam};
  };

  Combos.remoteMethod('softDeleteCombo', {
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

  Combos.getBestSellingCombo = async () => {
    const {ProjectDetails} = Combos.app.models;
    const findAllDetails = await ProjectDetails.find({include: 'Combos'});
    let managedCombosCount = 0;
    let managedCombos = {},
    bestSellingCombo;
    findAllDetails.forEach(detailModel => {
      const detail = {...detailModel}.__data;
      managedCombosCount += detail.cantidad;
      managedCombos[detail.Combos.id] = (managedCombos[detail.Combos.id]) ? (managedCombos[detail.Combos.id] + detail.cantidad) : detail.cantidad;
    });

    const keysCombos = Object.keys(managedCombos);

    for (let i = 0; i < keysCombos.length; i++) {
      const key = keysCombos[i];
      if (bestSellingCombo) {
        bestSellingCombo = (bestSellingCombo.count < managedCombos[key]) ? {id: key, count: managedCombos[key]} : bestSellingCombo;
      } else {
        bestSellingCombo = {
          id: key,
          count: managedCombos[key]
        };
      }
    }

    if (bestSellingCombo) {
      bestSellingCombo = await Combos.findById(bestSellingCombo.id, {include: 'Files'});
    }

    return {managedCombosCount, bestSellingCombo};
  };

  Combos.remoteMethod('getBestSellingCombo', {
    http: {
      path: '/getBestSellingCombo',
      verb: 'get',
    },
    accepts: [],
    returns: {
      type: 'object',
      root: true
    },
  });
};
