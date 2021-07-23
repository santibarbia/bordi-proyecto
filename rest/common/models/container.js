'use strict';

module.exports = (Containers) => {
  Containers.afterRemote('upload', async (ctx, instance) => {
    const {files, fields} = instance.result;
    const dataImage = {...files.imagen[0]};
    const data = {
      ...dataImage.providerResponse.metadata,
      fields
    }
    const result = await Containers.app.models.Files.uploaded(data);
    ctx.result = result;
  });
};
