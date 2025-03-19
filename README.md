# Divider

<p align="center">
    <img src="https://raw.githubusercontent.com/nyaomaru/divider/main/logo.svg" width="200px" align="center" alt="Divider logo" />
</p>

<p align="center">
    <a href="https://www.npmjs.com/package/@nyaomaru/divider">
        <img src="https://img.shields.io/npm/v/@nyaomaru/divider.svg?sanitize=true" alt="npm version">
    </a>
    <a href="https://github.com/nyaomaru/divider/blob/main/LICENSE">
        <img src="https://img.shields.io/npm/l/@nyaomaru/divider.svg?sanitize=true" alt="License">
    </a>
    <a href="https://www.npmjs.com/package/@nyaomaru/divider">
        <img src="https://img.shields.io/npm/dt/@nyaomaru/divider.svg" alt="npm downloads">
    </a>
    <a href="https://github.com/nyaomaru/divider/actions">
        <img src="https://github.com/nyaomaru/divider/actions/workflows/release.yml/badge.svg" alt="Build Status">
    </a>
</p>

A simple utility to divide a `string` or `string[]` based on given indexes or delimiters.

## 🚀 Installation

You can install `@nyaomaru/divider` using your favorite package manager:

```sh
# Using pnpm (recommended)
pnpm install @nyaomaru/divider

# Using npm
npm install @nyaomaru/divider

# Using bun
bun add @nyaomaru/divider

# Using yarn
yarn add @nyaomaru/divider
```

## 📖 Usage

👉 [Check out the full documentation here!](https://divider-docs.vercel.app/)

`divider` allows you to split a string or an array of strings using index positions or delimiters.

### 📌 Basic Usage

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

### 📌 Advanced Usage

```ts
// Mixed usage of indexes and characters
const complexDivide = divider('hello world', 3, 'o');
// ['hel', 'l', ' w', 'rld']

// Nested array handling
const nestedArray = divider(['hello', 'new world'], ' ', 2);
// [['he', 'llo'], ['ne', 'w wor', 'ld']]

// Flatten option to get a single array
const flatArray = divider(['hello', 'new world'], ' ', 2, { flatten: true });
// ['he', 'llo', 'ne', 'w', 'wor', 'ld']
```

### 📌 `dividerFirst()` Usage

`dividerFirst()` returns only the first divided element from the result.

```ts
import { dividerFirst } from '@nyaomaru/divider';

const firstElement = dividerFirst('hello world', ' ');
// 'hello'

const firstArrayElement = dividerFirst(['hello', 'world'], 2);
// 'he'
```

## 🎯 Options

| Option    | Type      | Default | Description                                                               |
| --------- | --------- | ------- | ------------------------------------------------------------------------- |
| `flatten` | `boolean` | `false` | If `true`, the resulting nested arrays are flattened into a single array. |

### `flatten` (default: `false`)

```ts
const words = ['hello', 'world'];
const result1 = divider(words, 2);
// [['he', 'llo'], ['wo', 'rld']]

const result2 = divider(words, 2, { flatten: true });
// ['he', 'llo', 'wo', 'rld']
```

## 💡 Features

- Supports both `index-based` and `string-based` division
- Works with both `strings` and `arrays of strings`
- Supports `multiple separators` (mixing indexes and characters).
- Provides an `optional flattening` feature for array results.
- **Get only the first divided element using `dividerFirst()`**

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
