import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'isPriorityValid', async: false })
export class IsPriorityValid implements ValidatorConstraintInterface {
    validate(priority: string, args: ValidationArguments) {
        const priorityNumber = parseInt(priority);

        if (isNaN(priorityNumber) || priorityNumber < 1) {
            return false;
        }

        return true;
    }

    defaultMessage(args: ValidationArguments) {
        return 'Priority must be a valid positive integer';
    }
}
