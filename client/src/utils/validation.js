const formValidationUtil = {
    firstName: {
      minLength: 2,
      maxLength: 20,
      errorMessage: 'First name should be between 2 and 20 characters'
    },
    lastName: {
      minLength: 2,
      maxLength: 20,
      errorMessage: 'Last name should be between 2 and 20 characters'
    },
    country: {
      minLength: 2,
      errorMessage: 'Country should be at least 2 characters long!'
    },
    city: {
      minLength: 3,
      errorMessage: 'City should be at least 3 characters long!'
    },
    street: {
      minLength: 3,
      errorMessage: 'Street should be at least 3 characters long!'
    },
    streetNumber: {
      min: 1,
      errorMessage: 'Street number should be a positive number!'
    },
    email: {
      validate: (value) => {
        const regex = /^[A-Za-z0-9_.]+@[A-Za-z]+\.[A-Za-z]{2,3}$/;
        return regex.test(value);
      },
      errorMessage: 'Email is not valid!'
    },
    phoneNumber: {
      validate: (value) => {
        const regex = /^0[1-9]{1}[0-9]{8}$/;
        return regex.test(value);
      },
      errorMessage: 'Phone number is not valid!'
    },
    imageUrl: {
      validate: (value) => {
        const regex = /^https?:\/\/.+/;
        return regex.test(value);
      },
      errorMessage: 'ImageUrl is not valid!'
    },
  };
  
  export default formValidationUtil;