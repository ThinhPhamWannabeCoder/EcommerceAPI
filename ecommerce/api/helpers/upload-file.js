module.exports = {


  friendlyName: 'Upload file',


  description: '',


  inputs: {
    destination:{
      type: 'string',
      required: true,
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    const {destination} = inputs;
    const uploadedFiles = await new Promise((resolve, reject) => {
      req.file('avatar').upload({
        dirname: require('path').resolve(sails.config.appPath, 'assets/images/avatar'),
        maxBytes: 10000000
      }, (err, uploadedFile) => {
        if (err) {
          reject(new CustomError(500, 'Internal Server Error'));
        } else {
          resolve(uploadedFile);
        }
      });
    });

    // Check if files were uploaded
    if (uploadedFiles.length !== 0) {
      url = uploadedFiles[0].fd;
    }

      

  }


};

