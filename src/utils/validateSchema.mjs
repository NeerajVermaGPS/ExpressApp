export const validateUserSchema = {
    username: {
        isString: {
            errorMessage: "Username should be a string!"
        },
        isLength: {
            options: {
                min: 5,
                max: 32
            },
            errorMessage: "Username limit is: 5-32 characters!"
        },
        notEmpty: {
            errorMessage: "Username can not be empty!"
        }
    },
    displayname: {
        isString: {
            errorMessage: "Display Name should be a string!"
        },
        isLength: {
            options: {
                min: 5,
                max: 32
            },
            errorMessage: "Display Name limit is: 5-32 characters!"
        },
        notEmpty: {
            errorMessage: "Display Name can not be empty!"
        }
    },
    password: {
        isString: {
            errorMessage: "Password should be a string!"
        },
        isLength: {
            options: {
                min: 7,
                max: 36
            },
            errorMessage: "Password length should be between 7-36"
        }
    }
}

export const validateQuerySchema = {
    filter: {
        isString: {
            errorMessage: "`filter` query should be a string!"
        },
        isLength: {
            options: {
                min: 1,
                max: 10
            },
            errorMessage: "`filter` value should be between 1-10 character!"
        },
        notEmpty: {
            errorMessage: "`filter` should not be empty!"
        }
    },
    value: {
        isString: {
            errorMessage: "`value` query should be a string!"
        },
        isLength: {
            options: {
                min: 1,
                max: 10
            },
            errorMessage: "`value` value should be between 1-10 character!"
        },
        notEmpty: {
            errorMessage: "`value` should not be empty!"
        }
    }
}

export const validatAuthSchema = {
    username: {
        isString: {
            errorMessage: "username should be a valid string!"
        },
        isLength: {
            options: {
                min: 5,
                max: 32
            },
            errorMessage: "username should be between 5-32 characters!"
        }
    },
    password: {
        isLength: {
            options: {
                min: 5,
                max: 32
            },
            errorMessage: "password should be between 5-32 characters!"
        }
    }
}

export const validateCartSchema = {
    item_name : {
        isString: {
            errorMessage: "Item name should be a string!"
        }, 
        isLength: {
            options: {
                min: 1,
                max: 50
            },
            errorMessage: "Item name should be between 1-50 characters!"
        }
    },
    item_price: {
        isFloat: {
            options: {
                min: 1,
                max: 100
            },
            errorMessage: "Item price should be between $1-$100"
        }
    }
}