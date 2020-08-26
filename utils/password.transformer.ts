import { ValueTransformer } from 'typeorm';
import { CommonService } from '@libs/common';


export class PasswordTransformer implements ValueTransformer {
    to(value) {
        return CommonService.generateHash(value)
    }
    from(value) {
        return value;
    }
}
