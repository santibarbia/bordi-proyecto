'use strict';

module.exports = (ToContacts) => {
  const searchOrCreateContact = async (data) => {
    const {Contacts, ContactsToContacts} = ToContacts.app.models;
    let contact, contactToContact;
    if (data) {
      const {nameContact, typeContact, valueContact, toContact} = data;
      contact = await Contacts.findOne({
        where: {
          and: [
            {typeContact},
            {valueContact}
          ]
        }
      });
      if (!contact) {
        const toSave = {
          nameContact,
          typeContact,
          valueContact
        };
        contact = await Contacts.create(toSave);
      }
      if (contact) {
        const toSave = {
          contactId: contact.id,
          toContactId: toContact.id,
          contactedStatus: 'PENDING_SEND',
        }
        contactToContact = await ContactsToContacts.create(toSave);
      }
    }
    return {contact, contactToContact};
  };

  const sendEmailMenssage = async (data) => {
    const {Emails, ContactsToContacts} = ToContacts.app.models;
    if (data) {
      const {contact, contactToContact, nameContact, menssage} = data;
      const {valueContact} = contact;
      const toSend = {
        nameContact,
        menssage,
        adress: valueContact,
      };
      const resultSendEmail = await Emails.sendEmailcontact(toSend);
      if (resultSendEmail) {
        contactToContact.contactedStatus = 'SENDED';
        await ContactsToContacts.upsert(contactToContact);
      }
    }
  };

  ToContacts.registeryMenssage = async (data, ctx) => {
    try {
      const {nameContact, contacts, menssage} = data;
      let contactEmail, contactTel;
  
      const toContact = await ToContacts.create({menssage});
  
      if (contacts.email) {
        const {email} = contacts;
        contactEmail = await searchOrCreateContact({...email, nameContact, toContact});
      }
  
      if (contacts.tel) {
        const {tel} = contacts;
        contactTel = await searchOrCreateContact({...tel, nameContact, toContact});
      }
  
      if (contactEmail) {
        const data = {...contactEmail, nameContact, menssage};
        await sendEmailMenssage(data);
      }
  
      return {menssage: 'Se registro el contacto con exito'};
    } catch (error) {
      console.log('toContacts 79', error);
      const err = new Error();
      err.statusCode = 500;
      err.code = 'ERROR_REGISTRY_CONTACT';
      err.name = 'ERROR_REGISTRY_CONTACT';
      err.message = 'ERROR AL REGISTRAR CONTACT O MANDAR UN EMAIL';
      throw err;
    }
  };

  ToContacts.remoteMethod('registeryMenssage', {
    http: {
      path: '/registeryMenssage',
      verb: 'post',
    },
    accepts: [
      {
        arg: 'dataContact',
        type: 'object',
        http: {source: 'body'},
        description: `accept:\n
        {
          nameContact: "type string",
          menssage: "type string",
          contacts: {
            email: {
              typeContact: "email",
              valueContact: "test@gmail.com"
            },
            tel: {
              typeContact: "tel",
              valueContact: 3516123456
            }
          }
        }`,
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
      {\n
        campaign: {object type campaign},\n
        groupers: [array of {objecto type grouper}],\n
        rules: [array of {object type rule}],\n
        campaingGroupers: [array of {object type CampaignGroupers}]\n
      }`,
    },
  });
};
