import * as Validation from '../helper/validation';

export function AddValidator(value) {
  return {
    name: Validation.isNullValidation(value.name),
    avatar: Validation.isNullValidation(value.avatar),
    job: Validation.isNullValidation(value.job),
    description: Validation.isNullValidation(value.description),
  };
}
