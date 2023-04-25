const CONFIG = require('../../../../config/index.js');

const ajaxObj = {
    axios: () => require('./axios.js')
};

ajaxObj[CONFIG.ajax]();
