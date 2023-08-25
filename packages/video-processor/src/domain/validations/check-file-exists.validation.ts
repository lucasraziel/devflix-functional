import { asyncPredicateToPassThrough, CheckFileExists } from '@fvsystem/commom';

export function checkFileExistsValidation(checkFunction: CheckFileExists) {
  return asyncPredicateToPassThrough('File Does not Exist')(checkFunction);
}
