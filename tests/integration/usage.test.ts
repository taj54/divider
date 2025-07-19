import { divider } from '@nyaomaru/divider';

const result = divider('hello world', ' ');
console.log(result);

if (JSON.stringify(result) !== JSON.stringify(['hello', 'world'])) {
  throw new Error('Integration test failed');
}
