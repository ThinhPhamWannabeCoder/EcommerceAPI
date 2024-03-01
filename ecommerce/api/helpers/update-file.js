const fs = require('fs');

module.exports = {


  friendlyName: 'Updatefile',


  description: 'Updatefile something.',


  inputs: {
    file:{
      type: 'ref',
      required: true
    },
    oldUrl:{
      type: 'string',
      required: true,
    },
    destination:{
      type: 'string',
      required: true,
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs, exits) {
    try {
      const {file, oldUrl, destination} = inputs;
      // DELETE OLD FILE
      fs.unlinkSync(oldUrl)
      // UPLOAD
      file.upload(
        {
          dirname: require('path').resolve(sails.config.appPath, destination),
          maxBytes: 10000000
        },
        (err, uploadedFiles) => {
          if (err) {
            sails.log.error('Error in file upload:', err);
            return exits.error(new CustomError(500, 'Internal Server Error'));
          } else {
            if (uploadedFiles && uploadedFiles.length > 0) {
              let url = uploadedFiles[0].fd;
              return exits.success(url);
            } else {
              sails.log.error('No files were uploaded');
              return exits.error(new CustomError(500, 'Internal Server Error'));
            }
          }
        }
      );
    } catch (err) {
      sails.log.error('Unhandled error:', error);
      return exits.error(new CustomError(500, 'Internal Server Error'));
    }
  }


};

