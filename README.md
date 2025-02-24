# Divider

Divide string or string[] with multiple number or string.

## 🚀 How to use

```sh
pnpm install @divider
```

```ts
import divider from '@divider';

const helloArray = divider('hello', 1, 3);
// helloArray = ['h', 'el', 'lo']

const [hello1, hello2, ...restHello] = divider('hello', 1, 3, 4);
// hello1 = 'h'
// hello2 = 'el'
// restHello = ['l', 'o']

const divideWithString = divider('hello', 'e');
// divideWithString = ['h', 'llo']

const divideWithMultipleString = divider('hello', 'l');
// divideWithMultipleString = ['he', 'o']
```

## ✨ How to develop

Welcome your commit! If you want to update function or fix problem, feel free to create PR!

### Setup

```sh
pnpm install
```

### Test

```sh
pnpm test
```

### Guide Line

If you add some logics, you should add test code in `tests` directory.

There is no strict rules, so feel free to commit!
