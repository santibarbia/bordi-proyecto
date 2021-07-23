'use strict';

const loopback = require('loopback');
const path = require('path');
const mockdata = require('../mocks/dataMailControl');

module.exports = function(Emails) {
  Emails.sendEmail = async (adress, menssage) => {
    try {
      return await Emails.send({
        from: `"Tutti Con Vos - NO-REPLY" <${process.env.EMAIL_USER}>`,
        to: adress,
        subject: 'Notificacion',
        html: menssage,
      });
    } catch (error) {
      console.log('emails line 17', error);
      throw error;
    }
  };

  Emails.sendEmailcontact = async (data) => {
    const {nameContact, adress, menssage} = data;
    let options = {nameContact, menssage}, templateName;
    if (data.tel) {
      options['tel'] = data.tel;
      templateName = 'contactWithTel';
    } else {
      templateName = 'contactNotTel';
    }
    let templateToresolve = loopback.template(path.resolve(__dirname, `../templates/${templateName}.ejs`));
    let templateResolved = templateToresolve(options);
    try {
      let ret;
      const result = await Emails.sendEmail(adress, templateResolved);
      if (!result) {
        ret = true;
      } else {
        ret = false;
      }
      return ret;
    } catch (error) {
      console.log('emails 42', error);
      return false;
    }
  };

  Emails.sendTest = async (data, mail, ctx) => {
    // const {Projects} = Emails.app.models;
    // const {idProject} = ctx.req.query;
    // const resultResumeMail = await Projects.getResumeToMail(idProject);
    data = data || mockdata // || resultResumeMail;

    let templateToresolve = loopback.template(path.resolve(__dirname, `../templates/resumeSells.ejs`));
    let templateResolved = templateToresolve(data);

    try {
      let ret;
      const result = await Emails.sendEmail(mail, templateResolved);
      if (!result) {
        ret = true;
      } else {
        ret = false;
      }
      return ret;
    } catch (error) {
      console.log('emails 42', error);
      return false;
    }
  };

  Emails.remoteMethod('sendTest', {
    http: {
      path: '/sendTest',
      verb: 'get',
    },
    accepts: [
      {
        arg: "data",
        type: "object",
        http: {
          source: "body"
        }
      },
      {
        arg: "mail",
        type: "string",
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

  Emails.sendUsers = async (userReferent, userProject) => {
    const data = {
      referente: {...userReferent},
      proyecto: {...userProject}
    };

    let templateToresolve = loopback.template(path.resolve(__dirname, `../templates/sendUsers.ejs`));
    let templateResolved = templateToresolve(data);

    try {
      let ret;
      const result = await Emails.sendEmail(userReferent.correo, templateResolved);
      if (!result) {
        ret = false;
      } else {
        ret = true;
      }
      return ret;
    } catch (error) {
      console.log('emails 42', error);
      return false;
    }
  }

  Emails.sendUsersAdmin = async (data) => {
    let templateToresolve = loopback.template(path.resolve(__dirname, `../templates/sendUsersAdmin.ejs`));
    let templateResolved = templateToresolve(data);

    try {
      let ret;
      const result = await Emails.sendEmail(data.correo, templateResolved);
      if (!result) {
        ret = false;
      } else {
        ret = true;
      }
      return ret;
    } catch (error) {
      console.log('emails 141', error);
      return false;
    }
  }

  Emails.sendUsersColaborador = async (data) => {
    let templateToresolve = loopback.template(path.resolve(__dirname, `../templates/sendUsersColaborador.ejs`));
    let templateResolved = templateToresolve(data);

    try {
      let ret;
      const result = await Emails.sendEmail(data.correo, templateResolved);
      if (!result) {
        ret = false;
      } else {
        ret = true;
      }
      return ret;
    } catch (error) {
      console.log('emails 160', error);
      return false;
    }
  }
};
