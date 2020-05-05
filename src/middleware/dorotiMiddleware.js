 var mid = {};           




        mid.max_request = function (req,res,next) {
                console.log(req);
                next();
        }

        
module.exports = mid;

