'use strict'

module.exports = (TuttiEvents) => {
  TuttiEvents.beforeRemote('create', async (ctx) => {
    const {body} = ctx.req;
    body.id = null;
  })
};
