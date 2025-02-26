# Divider

A simple utility to divide a `string` or `string[]` based on given indexes or delimiters.

## 🚀 Installation

```sh
pnpm install @nyaomaru/divider
```

## 📖 Usage

```ts
import { divider } from '@nyaomaru/divider';

// Divide a string by index positions
const helloArray = divider('hello', 1, 3);
// ['h', 'el', 'lo']

const [hello1, hello2, ...restHello] = divider('hello', 1, 3, 4);
// hello1 = 'h'
// hello2 = 'el'
// restHello = ['l', 'o']

// Divide a string using a character separator
const divideWithString = divider('hello', 'e');
// ['h', 'llo']

const divideWithMultipleString = divider('hello', 'l');
// ['he', 'o']

// Divide an array of strings
const words = ['hello', 'world'];
const dividedWords = divider(words, 2);
// [['he', 'llo'], ['wo', 'rld']]
const dividedWordsWithFlattenOption = divider(words, 2, { flatten: true });
// ['he', 'llo', 'wo', 'rld']
```

## 💡 Features

- Supports both `index-based` and `string-based` division
- Works with both `strings` and `arrays of strings`
- Optional `flattening` for array results

## 🛠 Contributing

Welcome your contributions! If you want to add features or fix issues, feel free to submit a PR!

### Setup

```sh
pnpm install
```

### Test

```sh
pnpm test
```

### Contribution Guidelines

- If you add new functions, please add corresponding tests in the `tests` directory.
- No strict rules—just keep it clean and readable!
- Thank you for your contribution. 😺
