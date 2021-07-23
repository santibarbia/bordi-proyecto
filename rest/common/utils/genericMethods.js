'use strict';

const softDelete = async (model, id) => {
  const findElement = await model.findById(id);
  if (findElement) {
    findElement.status = 'BORRADO';
    const result = await model.upsert(findElement);
    return result;
  }

  const err = new Error();
  err.statusCode = 500;
  err.code = `ERROR_${model.definition.name}CAN_NOT_DELETE`;
  err.name = `ERROR_${model.definition.name}CAN_NOT_DELETE`;
  err.message = `ERROR AL APLICAR SOFTDELETE EN EL MODELO ${model.definition.name}`;
  throw err;
};

module.exports = {
  softDelete
};