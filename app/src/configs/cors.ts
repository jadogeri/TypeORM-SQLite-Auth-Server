/**
 * @author      Joseph Adogeri
 * @since       24-AUG-2025
 * @version     1.0
 * @description configuration setting for cors
 *  
 */

export const corsOptions = {
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
    methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
}

