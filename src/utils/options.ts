import type { DividerOptions } from '@/core/types';
import { isString, isNumber, isOptions } from '@/utils/is';

export function extractOptions<F extends boolean>(
  args: (string | number | DividerOptions<F>)[]
): {
  cleanedArgs: (string | number)[];
  options: DividerOptions<F>;
} {
  const clonedArgs = [...args];
  const lastArg = clonedArgs.at(-1);

  const options = isOptions(lastArg)
    ? (clonedArgs.pop(), lastArg as DividerOptions<F>)
    : {};

  const cleanedArgs = clonedArgs.filter(
    (arg): arg is string | number => isString(arg) || isNumber(arg)
  );

  return {
    cleanedArgs,
    options,
  };
}
