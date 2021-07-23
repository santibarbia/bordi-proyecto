'use strict';
const moment = require('moment');

const {softDelete} = require('../utils/genericMethods');

module.exports = (Project) => {
  Project.saveDetail = async (arrayDetails, ctx) => {
    const {ProjectDetails, Users, CombosForProjects} = Project.app.models;
    const ret = [];
    let findProject;
    for (let i = 0; i < arrayDetails.length; i++) {
      const detail = arrayDetails[i];
      const dateCreate = moment().format('YYYY-MM-DDThh:mm:ss');
      const dateModified = moment().format('YYYY-MM-DDThh:mm:ss');
      const {project_id, seller_id, combo_id, cantidad} = detail;
      try {
        findProject = await Project.findById(project_id);
        if (findProject.finaly){
          const error = new Error();
          error.code = 'PORJECT_ERROR_FINALy_PROJECT';
          error.name = '_FINALY_PROJECT_ERROR';
          error.statusCode = 500;
          error.menssage = 'proyecto ya finalizado';
          throw error;
        }
      } catch (error) {
        console.log(error);
        throw(error);
      }
      const findSeller = await Users.findById(seller_id);
      const sellerName = (findSeller) ? findSeller.realm : null;
      const findCombo = await CombosForProjects.findById(combo_id);
      const comboPrice = (findCombo) ? findCombo.price : null;
      const subTotal = comboPrice * cantidad;

      const detailToSave = {
        dateCreate,
        dateModified,
        projectId: project_id,
        seller: seller_id,
        sellerName,
        comboProjectId: combo_id,
        cantidad,
        subTotal
      };

      const resultSaveDetail = await ProjectDetails.create(detailToSave);
      ret.push(resultSaveDetail);
    }
    if(ret.length && findProject) {
      findProject.checked = false;
      await Project.upsert(findProject);
    }
    return ret;
  };

  Project.remoteMethod('saveDetail', {
    http: {
      path: '/saveDetail',
      verb: 'post',
    },
    accepts: [
      {
        arg: 'projectDetails',
        type: 'array',
        http: {source: 'body'},
        description: `accept:\n
        [
          {
            "sellerId": "type number",
            "comboId": "type string",
            "quantity": "type number"
          }
        ]`,
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
      type: 'array',
      root: true,
      description: `
      [
        {
          "sellerId": "type number",
          "comboId": "type string",
          "quantity": "type number"
        }
      ]`,
    },
  });

  Project.saveChangesDetails = async (projectDetail, ctx) => {
    const {ProjectDetails, Users, CombosForProjects} = Project.app.models;
    const detail = projectDetail;
    const dateModified = moment().format('YYYY-MM-DDThh:mm:ss');
    const {detail_id, seller_id, combo_id, cantidad} = detail;
    const findSeller = await Users.findById(seller_id);
    const sellerName = (findSeller) ? findSeller.realm : null;
    const findCombo = await CombosForProjects.findById(combo_id);
    const comboPrice = (findCombo) ? findCombo.price : null;
    const subTotal = comboPrice * cantidad;

    const detailToSave = {
      id: detail_id,
      dateModified,
      seller: seller_id,
      sellerName,
      comboProjectId: combo_id,
      cantidad,
      subTotal
    };

    const resultSaveDetail = await ProjectDetails.upsert(detailToSave);

    return resultSaveDetail;
  };

  Project.remoteMethod('saveChangesDetails', {
    http: {
      path: '/saveChangesDetails',
      verb: 'patch',
    },
    accepts: [
      {
        arg: 'projectDetails',
        type: 'object',
        http: {source: 'body'},
        description: `accept:\n
          {
            "sellerId": "type number",
            "comboId": "type string",
            "quantity": "type number"
          }
        `,
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
      root: true,
      description: `
        {
          "sellerId": "type number",
          "comboId": "type string",
          "quantity": "type number"
        }
      `,
    },
  });

  Project.getProjectDetails = async (ctx) => {
    const {query} = ctx.req;
    const {sellerId, projectId} = query;
    let arrayProjectDetails;
    if (projectId) {
      if (sellerId) {
        arrayProjectDetails = await Project.find({
          where: {id: projectId},
          include: {
            relation: 'Details',
            scope: {
              where: {seller: sellerId},
              include: {
                relation: 'Combos',
              }
            }
          }
        });
      } else {
        arrayProjectDetails = await Project.find({
          where: {id: projectId},
          include: {
            relation: 'Details',
            scope: {
              include: {
                relation: 'Combos',
              }
            }
          }
        });
      }
    } else {
      const error = new Error();
      error.code = 'PORJECT_ERROR_NOT_FOUND_PROJECTID';
      error.name = 'PROJECTID_ERROR';
      error.statusCode = 400;
      error.menssage = 'projectId no encontrado';
      throw error;
    }
    return arrayProjectDetails;
  };

  Project.remoteMethod('getProjectDetails', {
    http: {
      path: '/getProjectDetails',
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

  const calculateSalesForSeller = async (projectId, sellerId) => {
    let totalSell = 0;
    let resumeTotalObject = {};
    let retCombos = [];
    let seller;
    let sales;
    const findedProject = await Project.findOne({
      where: {
        id: projectId
      },
      include: {
        relation: 'Details',
        scope: {
          where: {seller: sellerId},
          include: {
            relation: 'Combos',
          }
        }
      }
    });

    if (findedProject) {
      const newObjectProject = {...findedProject}.__data;
      const {Details, sellers} = newObjectProject;
      seller = sellers.find(el => parseInt(el.id) === parseInt(sellerId));
      sales = Details.length;
      for (let index = 0; index < Details.length; index++) {
        const detail = {...Details[index]}.__data;
        totalSell += detail.subTotal;
        const combosDetails = {...detail.Combos}.__data;

        if (resumeTotalObject[combosDetails.id]) {
          resumeTotalObject[combosDetails.id].count += detail.cantidad;
          resumeTotalObject[combosDetails.id].subTotal += combosDetails.subTotal;
        } else {
          resumeTotalObject[combosDetails.id] = {...combosDetails, count: detail.cantidad};
        }
      }

      const pairs = Object.entries(resumeTotalObject);
      retCombos = pairs.map(([key, value]) => value);
    }

    return {
      seller: seller,
      sales: sales,
      countCombosForType: retCombos,
      totalSell: totalSell
    };
  };

  Project.getSellerSummary = async (idParam, ctx) => {
    const {query} = ctx.req;
    let id, sellerIdSend, idQuery;
    if (query) {
      const {sellerId, projectId} = query;
      sellerIdSend = sellerId;
      idQuery = projectId;
    }
    id = idParam || idQuery;
    let ret = [];
    if (id) {
      if (sellerIdSend) {
        const toSave = await calculateSalesForSeller(id, sellerIdSend);
        ret = [...ret, toSave];
      } else {
        const projectFinded = await Project.findById(id);
        if (projectFinded) {
          const {sellers} = projectFinded;
          for (let index = 0; index < sellers.length; index++) {
            const seller = sellers[index];
            const toSave = await calculateSalesForSeller(id, seller.id);
            ret = [...ret, toSave];
          }
        }
      }
    }
    return ret;
  };

  Project.remoteMethod('getSellerSummary', {
    http: {
      path: '/getSellerSummary',
      verb: 'get',
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
      type: 'array',
      root: true,
    }
  });

  Project.registryNewProject = async (data) => {
    let ret;
    try {
      await Project.app.dataSources.mySqlDS.transaction(async models => {
        const {CombosForProjects, Users, Emails} = models;

        let {project, institution, referent, availabitiesCombos} = parseData(data);

        const sellersFinded = await Users.findOrCreateSellers(project.nameSellers);
        project.sellers = sellersFinded;

        const userIns = await Users.findOrCreateInst(institution);
        project.userInstId = userIns.id;

        const userReferent = await Users.findOrCreateReferent(referent, institution);
        project.userClientId = userReferent.id;

        const userProject = await Users.createUserProject();
        project.userProjectId = userProject.id;

        const resulCreateProject = await Project.createNewProject(project, institution);

        const dataProject = {...resulCreateProject}.__data;

        const resultCreateCombos = await CombosForProjects.createCombosForProjects({availabitiesCombos, dataProject});

        await Emails.sendUsers(userReferent, userProject);

        ret = shiftParseData({
          project: dataProject,
          referent: userReferent,
          institution: userIns,
          availabitiesCombos: resultCreateCombos
        });
      });
    } catch (error) {
      console.log(error);
      throw error
    }
    return data;
  };

  const parseData = (data) => {
    const toDay = moment().format('YYYY-MM-DDThh:mm:ss');
    const project = {
      dateCreate: toDay,
      dateModified: toDay,
      dateToClose: data.fechaHoraCierre,
      dateLimit: data.fechaLimite,
      name: data.nameProject,
      objective: data.objetivoConv,
      amount: data.importe,
      typeProject: data.tipoConvocatoria,
      placeOfDelivery: data.lugarEntrega,
      nameSellers: data.nombreVend,
      sellers: null,
      userClientId: null,
      userProjectId: null,
      userInstId: null,
      userColaboradorId: data.colaborador.id
    };

    const institution = {
      realm: data.nombreIns,
      address: data.domicilioIns,
      mail: data.correoIns,
      phone: data.telefonoIns,
    }

    const referent = {
      realm: data.nombreRef,
      address: data.domicilioRef,
      mail: data.correoRef,
      phone: data.telefonoRef,
      dni_cuil: data.dniRef
    };

    const availabitiesCombos = data.combosHab.map( ({id: comboId, ...otherProperties} = combo) => {return {comboId, ...otherProperties}});

    return {
      project,
      referent,
      institution,
      availabitiesCombos
    }
  }

  const shiftParseData = (data) => {
    const {project, referent, institution, availabitiesCombos} = data;
    let dataToReturn = {};

    if(project) {
      dataToReturn = {
        dateCreate: project.dateCreate,
        dateModified: project.dateModified,
        fechaHoraCierre: project.dateToClose,
        fechaLimite: project.dateLimit,
        nameProject: project.name,
        objetivoConv: project.objective,
        importe: project.amount,
        tipoConvocatoria: project.typeProject,
        lugarEntrega: project.placeOfDelivery,
        nombreVend: project.nameSellers,
        colaborador: {
          id: project.userColaboradorId
        }
      };
    }

    if (institution) {
      dataToReturn = {
        ...dataToReturn,
        nombreIns: institution.realm,
        domicilioIns: institution.address,
        correoIns: institution.correo,
        telefonoIns: institution.phone,
      };
    }

    if (referent) {
      dataToReturn = {
        ...dataToReturn,
        nombreRef: referent.realm,
        domicilioRef: referent.address,
        correoRef: referent.correo,
        telefonoRef: referent.phone,
        dniRef: referent.dni_cuil,
      };
    }

    if (availabitiesCombos) {
      dataToReturn = {
        ...dataToReturn,
        combosHab: availabitiesCombos
      };
    }

    return dataToReturn;
  };

  Project.createNewProject = async (data, institution) => {
    const countProjects = await Project.count();
    const nameInstution = institution.realm || '';
    const nameInstitutionParsed = nameInstution.replace(' ', '-');
    data.name = `${nameInstitutionParsed}-Tutti-${countProjects + 1}`;
    data.status = 'ACTIVO';
    return await Project.create(data);
  };

  Project.remoteMethod('registryNewProject', {
    http: {
      path: '/registryNewProject',
      verb: 'post',
    },
    accepts: [
      {
        arg: 'dataProject',
        type: 'object',
        http: {source: 'body'},
        description: `accept:\n
          {
            "project": "type project",
            "referent": "type user",
            "availabitiesCombos": "[] of combo"
          }
        `,
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
      root: true,
      description: `
      {
        "project": "type project",
        "referent": "type user",
        "availabitiesCombos": "[] of combo"
      }
      `,
    },
  });

  Project.registryChangesProject = async (data) => {
    const {CombosForProjects, Users} = Project.app.models;

    let {project, institution, referent, availabitiesCombos} = parseData(data);

    const userIns = await Users.findOrCreateInst(institution);
    if (userIns) {
      userIns.mail = referent.mail;
      userIns.phone = referent.phone;
      userIns.realm = referent.realm;
      await Users.upsert(userIns);
    }

    project.userInstId = userIns.id;

    const userReferent = await Users.findOrCreateReferent(referent, institution);
    if (userReferent) {
      userReferent.mail = referent.mail;
      userReferent.phone = referent.phone;
      userReferent.realm = referent.realm;
      userReferent.dni_cuil = referent.dni_cuil;
      await Users.upsert(userReferent);
    }

    await Project.upsert(project);

    await CombosForProjects.upsert(availabitiesCombos);

    return data;
  };

  Project.remoteMethod('registryChangesProject', {
    http: {
      path: '/registryChangesProject',
      verb: 'patch',
    },
    accepts: [
      {
        arg: 'dataProject',
        type: 'object',
        http: {source: 'body'},
        description: `accept:\n
          {
            "project": "type project",
            "referent": "type user",
            "availabitiesCombos": "[] of combo"
          }
        `,
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
      root: true,
      description: `
      {
        "project": "type project",
        "referent": "type user",
        "availabitiesCombos": "[] of combo"
      }
      `,
    },
  });

  Project.getProjectToModal = async (idParam, ctx) => {
    const {query, params} = ctx.req;
    const id = query.id || params.id || idParam;
    let resultShiftParseData;

    const resultFindProject = await Project.findOne({
      where: {id: id},
      // include: ['UserClientProjects', 'UserInstProject', 'UserColaboradorProject', 'AvailabilityCombos']
      include: [
        {
          relation: 'UserClientProjects',
          scope: {
            include: {
              relation: 'contacts',
              scope: {
                where: {typeContact: 'TEL'},
              }
            }
          }
        },
        {
          relation: 'UserInstProject',
          scope: {
            include: {
              relation: 'contacts',
              scope: {
                where: {typeContact: 'TEL'},
              }
            }
          }
        },
        {
          relation: 'UserColaboradorProject',
          scope: {
            include: {
              relation: 'contacts',
              scope: {
                where: {typeContact: 'TEL'},
              }
            }
          }
        },
        {
          relation: 'AvailabilityCombos'
        }
      ]
    });

    if (resultFindProject) {
      let project = {...resultFindProject}.__data;
      let {
        UserInstProject,
        UserClientProjects,
        AvailabilityCombos: availabitiesCombosData,
        ...projectData
      } = project;

      const {contacts: instContacts, ...institutionData} = {...UserInstProject}.__data;
      const {contacts: clientContacts, ...referentData} = {...UserClientProjects}.__data;

      institutionData.phone = instContacts[0].valueContact;
      referentData.phone = clientContacts[0].valueContact;

      resultShiftParseData = shiftParseData({project: projectData, institution: institutionData, referent: referentData, availabitiesCombos: availabitiesCombosData});
    }

    return resultShiftParseData;
  };

  Project.remoteMethod('getProjectToModal', {
    http: {
      path: '/getProjectToModal/:id',
      verb: 'get',
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

  Project.getStatistics = async () => {
    const {Combos} = Project.app.models;
    const {managedCombosCount, bestSellingCombo} = await Combos.getBestSellingCombo();
    const combosGestionados = managedCombosCount;
    const comboMasVendido = bestSellingCombo;
    const proyectosActivos = await Project.count({status: 'ACTIVO'});
    const proyectosTerminados = await Project.count({status: 'FINALIZADO'});
    return {combosGestionados, comboMasVendido, proyectosActivos, proyectosTerminados};
  };

  Project.remoteMethod('getStatistics', {
    http: {
      path: '/getStatistics',
      verb: 'get',
    },
    accepts: [],
    returns: {
      type: 'object',
      root: true
    },
  });

  Project.getMeta = async (ctx) => {
    const {query} = ctx.req;
    const {projectId} = query;
    if (projectId) {
      const resulDumaryProject = await Project.getSellerSummary(projectId, ctx);
      const projectFinded = await Project.findById(projectId);
      let amountSells = 0;
      if (resulDumaryProject.length) {
        for (let index = 0; index < resulDumaryProject.length; index++) {
          const element = resulDumaryProject[index];
          const amount = element.totalSell || 0;
          amountSells += amount;
        }
      }
      const montoColectado = amountSells;
      const meta = (projectFinded) ? projectFinded.amount : 0;;
      const montoFaltante = (projectFinded) ? ((meta - amountSells) > 0) ? (meta - amountSells) : 0 : 0;
      const ret = {montoColectado, montoFaltante, meta};
      return ret;
    } else {
      const error = new Error();
      throw error;
    }
  };

  Project.remoteMethod('getMeta', {
    http: {
      path: '/getMeta',
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
      root: true
    },
  });

  Project.softDeleteProject = async (idParam, ctx) => {
    const {query, params} = ctx.req;
    const id = query.id || params.id || idParam;
    await softDelete(Project, id);
    return {id, idParam};
  };

  Project.remoteMethod('softDeleteProject', {
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

  Project.checkProject = async (idParam, ctx) => {
    const findProject = await Project.findById(idParam);
    findProject.checked = true;
    let result = await Project.upsert(findProject);
    return result;
  };

  Project.remoteMethod('checkProject', {
    http: {
      path: '/checkProject/:id',
      verb: 'patch',
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

  Project.tuttiListo = async (idParam, ctx) => {
    const {query, params} = ctx.req;
    const id = (query.id) ? query.id : params.id;
    await Project.sendControlMail(id, ctx);
    const projectFinded = await Project.findById(id);
    projectFinded.finaly = true;
    projectFinded.status = 'FINALIZADO';
    return await Project.upsert(projectFinded);
  };

  Project.remoteMethod('tuttiListo', {
    http: {
      path: '/tuttiListo/:id',
      verb: 'patch',
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

  Project.sendControlMail = async (idParam, ctx) => {
    const {query, params} = ctx.req;
    const id = query.id || params.id || idParam;
    const {Emails} = Project.app.models;
    const resulSumary = await Project.getSellerSummary(id, ctx);
    const dataParsed = getStructureData(resulSumary);
    const projectFinded = await Project.findOne({
      where: {id: id},
      include: {
        relation: 'UserClientProjects',
        scope: {
          where: {
            typeContact: 'EMAIL'
          },
          include: {
            relation: 'contacts',
          }
        }
      }
    });

    const newProjectData = {...projectFinded}.__data;
    const mail = newProjectData.UserClientProjects.correo;
    const mailAdministracion = 'informacionbordi@gmail.com';
    await Emails.sendTest(dataParsed, mail, ctx);
    await Emails.sendTest(dataParsed, mailAdministracion, ctx);
    return {result: true};
  };

  const getStructureData = (data) => {
    const dataParsed = {
      resumeTotal: {
        resumeCombos: [],
        total: 0
      },
      resumeSellers: []
    };

    for (let index = 0; index < data.length; index++) {
      const sellerData = data[index];
      const sellerSend = {
        seller: sellerData.seller.name,
        resumeCombos: sellerData.countCombosForType.map(el => {
          const ret = {
            id: el.comboId,
            combo: el.name,
            cantidad: el.count,
            subTotal: (parseInt(el.price) * parseInt(el.count))
          };
          return ret;
        }),
        total: sellerData.totalSell,
      }
      dataParsed.resumeSellers.push(sellerSend);
      dataParsed.resumeTotal.resumeCombos = [...dataParsed.resumeTotal.resumeCombos, ...sellerSend.resumeCombos];
    }

    dataParsed.resumeTotal.total = dataParsed.resumeSellers.reduce((a, b) => a.total + b.total);

    let resumeTotalObject = {};

    dataParsed.resumeTotal.resumeCombos.forEach(element => {
      if (resumeTotalObject[element.id]) {
        resumeTotalObject[element.id].cantidad += element.cantidad;
        resumeTotalObject[element.id].subTotal += element.subTotal;
      } else {
        resumeTotalObject[element.id] = {...element};
      }
    });

    const pairs = Object.entries(resumeTotalObject);

    const arrayResumenCombos = pairs.map(([key, value]) => value);

    dataParsed.resumeTotal.resumeCombos = arrayResumenCombos;

    return dataParsed;
  };

  // const keyBy = (arr, key) => arr.reduce((acc, el) => {
  //   acc[el[key]] = el
  //   return acc
  // }, {});

  Project.remoteMethod('sendControlMail', {
    http: {
      path: '/sendControlMail/:id',
      verb: 'post',
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
