const isInvalidHobbies = value => {
    if (!Array.isArray(value)) {
      return true; 
    }
  
    const hasInvalidType = value.some(item => typeof item !== 'string');
  
    return hasInvalidType;
  };

module.exports = isInvalidHobbies;
