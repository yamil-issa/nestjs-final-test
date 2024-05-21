import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'isPriorityValid', async: false })
export class IsPriorityValid implements ValidatorConstraintInterface {
    validate(priority: string, args: ValidationArguments) {
        const priorityNumber = parseInt(priority);

        // Check if the priority is NaN (not a number) or less than 1
        if (isNaN(priorityNumber) || priorityNumber < 1) {
            return false;
        }

        return true;
    }

    defaultMessage(args: ValidationArguments) {
        return 'Priority must be a valid positive integer';
    }
}
