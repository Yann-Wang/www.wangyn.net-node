/**
 * Created by spray on 16-8-22.
 */
//logger format
exports.format = function () {
    if(process.env.NODE_ENV === "development"){
        return "dev";
    }

    return "combined";
};