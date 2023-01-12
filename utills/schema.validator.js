const Ajv = require('ajv');
const ajv = new Ajv({ allErrors: true });
const addFormat = require("ajv-formats");
require("ajv-errors")(ajv, { singleError: true });
addFormat(ajv);

const schemaValidator = ({ schema }) => {    
    return (req, res, next)=>{        
        const isValid = ajv.validate(schema,req.body);
        const errorsArr =[];
        if(!isValid){
            console.log("isvalid", isValid, ajv.errors);
            
            ajv.errors.map(item=>{
                errorsArr.push(item.message);
            });
            return res.status(400).send({
                status:400,
                message: `${errorsArr[0]}`
            });
        }
        next();
    }
}

module.exports={
    schemaValidator
}