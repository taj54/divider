// @ts-expect-error: import will be resolved at runtime via built output
import { divider } from '@nyaomaru/divider';

const result = divider('hello world', ' ');
console.log(result);

// 簡単なアサーション代わり
if (JSON.stringify(result) !== JSON.stringify(['hello', 'world'])) {
  throw new Error('Integration test failed');
}
