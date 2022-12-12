import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from '../exceptions/validation.exception';

const resolveErr = (err) => ({
  field: err.property,
  errors: Object.values(err.constraints),
});

const handleErrors = (errors) => {
  return errors.map((err) => {
    if (err.constraints) return resolveErr(err);

    return {
      field: err.property,
      data: handleErrors(err.children),
    };
  });
};

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    if (!String(metadata.metatype).startsWith('class')) return value;
    const obj = plainToClass(metadata.metatype, value);
    const errors = await validate(obj);

    if (errors.length) {
      throw new ValidationException({
        status: false,
        data: handleErrors(errors),
      });
    }
    return obj;
  }
}
