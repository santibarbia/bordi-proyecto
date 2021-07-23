'use strict';

const moment = require('moment');

module.exports = (Files) => {
  Files.uploaded = async (dataFile) => {
    const file = dataFile;
    let name = file.name;
    const urlBase = `${process.env.URL_STORAGE}/${file.bucket}`;
    const url = `${urlBase}/${name}`;

    const tipo = file.fields.tipo[0];
    const idTipo = parseInt(file.fields.id[0]);

    const fileToSave = {
      originalName: file.name,
      name: name,
      type: file.contentType.split('/').shift(),
      container: file.bucket,
      size: file.size,
      urlBase: urlBase,
      url: url,
      dateUpload: moment().format('YYYY-MM-DDThh:mm:ss'),
      description: ""
    };

    if (tipo === 'Combo') {
      const findCombo = await Files.findOne({
        where: {
          and: [
            {comboFK: idTipo},
            {principal: true}
          ]
        }
      });
      fileToSave.comboFK = idTipo;
      if (!findCombo) {
        fileToSave.principal = true;
      } else {
        fileToSave.principal = false;
      }
    } else if (tipo === 'Histories') {
      const findHistory = await Files.findOne({
        where: {
          and: [
            {historyFK: idTipo},
            {principal: true}
          ]
        }
      });
      fileToSave.historyFK = idTipo;
      if (!findHistory) {
        fileToSave.principal = true;
      } else {
        fileToSave.principal = false;
      }
    }

    const resultFile = await Files.create(fileToSave);

    return resultFile;
  };
};
