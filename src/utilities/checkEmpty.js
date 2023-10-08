// Helper function to check if an object or array is empty
  // obj (required): the object to check
  // falsyReturnTrue (optional): whether a falsy value should evaluate the same as an empty object or array
    // default: false (meaning the function only cares about arrays and objects)
export default function checkEmpty(obj, falsyReturnTrue) {
    // Check for user preference on handling falsy values
    let falsyCheck = false
    if (falsyReturnTrue) {
        falsyCheck = true
    } 
    
    // If object is falsy and user wants falsy to evaluate false
    if (!obj && !falsyCheck) {
        return false;
    } else if (!obj && falsyCheck) {
        // If object is falsy and user wants falsy to evaluate true
        return true;
    }
    
    // If data is an empty array, return true
    if (obj.length === 0) {
        return true;
    }
    
    // If data is an empty object, return true
    if (Object.keys(obj).length === 0) {
        return true;
    }
    
    // If no conditions are met, return false (meaning the object is not empty)
    return false
    }