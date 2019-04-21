
import Vue from 'vue';
import VeeValidate, { Validator } from 'vee-validate';

Vue.use(VeeValidate);

Validator.extend('larule', {
  getMessage: (field, args, data) => (data && data.message && data.message.replace('validate value', field)) || 'Something went wrong',
  validate: (value, args) => {
    return new Promise(resolve => {
      let data = {
        validate_value: value,
        validate_rule: args.join('|'),
      };
      axios.post('/api/validation', data)
      .then(response => {
        resolve(true);
      })
      .catch((error) => {
        resolve({
          valid: false,
          data: {
            message: error.response.data.errors.validate_value[0],
          }
        });
      });
    });
  },
});