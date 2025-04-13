import { isString, isNumber } from '@/utils/is';

export function classifySeparators(args: (string | number)[]) {
  return args.reduce(
    (acc, arg) => {
      if (isNumber(arg)) acc.numSeparators.push(arg);
      else if (isString(arg)) acc.strSeparators.push(arg);
      return acc;
    },
    { numSeparators: [] as number[], strSeparators: [] as string[] }
  );
}
