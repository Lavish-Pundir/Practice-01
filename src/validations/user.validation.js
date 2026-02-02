import Joi from 'joi';

export const signupSchema = Joi.object({
    body: Joi.object({
        name: Joi.string()
            .min(2)
            .max(50)
            .trim()
            .required()
            .messages({
                'any.required': 'Name is required',
                'string.empty': 'Name cannot be empty',
                'string.min': 'Name should have at least 2 characters',
                'string.max': 'Name cannot exceed 50 characters',
                'string.base': 'Name must be a string',
                'string.trim': 'Name cannot contain leading or trailing spaces'
            }),

        email: Joi.string()
            .email({ minDomainSegments: 2 })
            .lowercase()
            .trim()
            .required()
            .messages({
                'any.required': 'Email is required',
                'string.empty': 'Email cannot be empty',
                'string.email': 'Please enter a valid email address',
                'string.base': 'Email must be a string',
                'string.trim': 'Email cannot contain leading or trailing spaces'
            }),

        password: Joi.string()
            .min(8)
            // .max(30)
            .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'))
            .required()
            .messages({
                'any.required': 'Password is required',
                'string.empty': 'Password cannot be empty',
                'string.min': 'Password must be at least 8 characters long',
                // 'string.max': 'Password cannot exceed 30 characters',
                'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
                'string.base': 'Password must be a string'
            })
    }),
    params: Joi.object().optional(),
    query: Joi.object().optional()
});


export const loginSchema = Joi.object({
    body: Joi.object({
        email: Joi.string()
            .email({ minDomainSegments: 2 })
            .lowercase()
            .trim()
            .required()
            .messages({
                'any.required': 'Email is required',
                'string.empty': 'Email cannot be empty',
                'string.email': 'Please enter a valid email address',
                'string.base': 'Email must be a string'
            }),

        password: Joi.string()
            .required()
            .messages({
                'any.required': 'Password is required',
                'string.empty': 'Password cannot be empty',
                // 'string.base': 'Password must be a string'
            })
    }),
    params: Joi.object().optional(),
    query: Joi.object().optional()
});