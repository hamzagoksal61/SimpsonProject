export function isNullValidation(value) {
    if (value === undefined || value === null || value === '') {
      return true;
    }
  
    if (value && value.substring(0, 1) === ' ') {
      return true;
    }
    return false;
  }