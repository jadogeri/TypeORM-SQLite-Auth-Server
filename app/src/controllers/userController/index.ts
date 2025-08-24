/**
 * @author Joseph Adogeri
 * @version 1.0
 * @since 24-AUG-2025
 * @description Single export for all user controller functions
 */

import { registerUser }  from "./registerUser";
import { loginUser } from "./loginUser";
import { logoutUser }  from "./logoutUser"
import { resetUser }  from "./resetUser"
import { forgotUser }  from "./forgotUser"
import { currentUser}  from "./currentUser"
import { deactivateUser } from "./deactivateUser"


export { registerUser, loginUser, logoutUser, currentUser, forgotUser, resetUser, deactivateUser }