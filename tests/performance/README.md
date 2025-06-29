# 🚀 Performance Tests

This directory contains performance tests for the divider library to ensure optimal performance across different use cases.

## 🔍 Overview

The performance tests are designed to:

- Measure execution time of different divider functions
- Compare performance between different approaches
- Ensure performance doesn't regress over time
- Identify potential bottlenecks
- Test memory usage with large inputs

## 🧱 Test Structure

### 🛠️ Benchmark Utility (`benchmark.ts`)

A comprehensive benchmarking utility that provides:

- **Accurate timing**: Uses `performance.now()` for high-precision measurements
- **Warmup phase**: Eliminates JIT compilation effects
- **Statistical analysis**: Calculates min, max, average times and operations per second
- **Comparison tools**: Compare multiple implementations
- **Assertion helpers**: Ensure performance meets requirements

### 🧪 Test Categories

1. **divider.performance.test.ts**

   - Main `divider` function performance tests
   - String and array input performance
   - Different separator types (numeric, string, mixed)
   - Options performance (flatten, trim, exclude)
   - Edge cases performance

2. **divider-functions.performance.test.ts**
   - `dividerFirst`, `dividerLast`, `dividerLoop`, `dividerNumberString` performance
   - Function comparison tests
   - Memory usage tests
   - Large input handling

## ▶️ Running Performance Tests

### Run all performance tests

```bash
pnpm test:performance
```

### Run specific performance test

```bash
pnpm test tests/performance/divider.performance.test.ts
```

### Run with verbose output

```bash
pnpm test tests/performance --verbose
```

## 📊 Performance Benchmarks

### 🎯 Expected Performance Targets

| Test Category | Input Size  | Max Average Time | Min Ops/sec |
| ------------- | ----------- | ---------------- | ----------- |
| Small string  | 100 chars   | 1ms              | 1000        |
| Medium string | 1000 chars  | 2ms              | 500         |
| Large string  | 10000 chars | 10ms             | 100         |
| Small array   | 10 items    | 2ms              | 500         |
| Medium array  | 100 items   | 10ms             | 100         |
| Large array   | 1000 items  | 100ms            | 10          |

### 💾 Memory Usage Targets

- Large array (1000 items): < 50ms
- Very large string (10000 chars): < 20ms

## 📈 Interpreting Results

### Benchmark Output Format

```sh
test name:
  Iterations: 1000
  Total Time: 150.25ms
  Average Time: 0.150ms
  Min Time: 0.120ms
  Max Time: 0.180ms
  Operations/sec: 6667
```

### What to Look For

1. **Consistent Performance**: Results should be consistent across runs
2. **No Regressions**: New commits shouldn't significantly slow down functions
3. **Memory Efficiency**: Large inputs should complete without memory issues
4. **Scalability**: Performance should scale reasonably with input size

## 🧪 Adding New Performance Tests

### 1. Create Test Data

```typescript
const generateTestData = (size: number) => {
  // Generate appropriate test data
  return 'a'.repeat(size) + 'b'.repeat(size);
};
```

### 2. Write Benchmark Test

```typescript
test('my performance test', () => {
  const testData = generateTestData(1000);
  const result = benchmark('my test', () => myFunction(testData));

  console.log(formatBenchmarkResult(result));
  assertBenchmark(result, 5.0, 200); // 5ms max, 200 ops/sec min
});
```

### 3. Add Comparison Test (Optional)

```typescript
test('compare implementations', () => {
  const { results, fastest } = compareBenchmarks([
    { name: 'implementation A', fn: () => implementationA() },
    { name: 'implementation B', fn: () => implementationB() },
  ]);

  results.forEach((result) => {
    assertBenchmark(result, 10.0, 100);
  });
});
```

## 🔍 Performance Monitoring

### 🤖 CI Integration

Performance tests are run in CI to catch regressions. If a test fails:

1. Check if the performance regression is expected
2. Update the benchmark thresholds if necessary
3. Investigate the cause of the regression
4. Optimize the code if needed

### 📆 Regular Monitoring

- Run performance tests before major releases
- Monitor performance trends over time
- Update benchmarks based on real-world usage patterns

## 🛠️ Troubleshooting

### Tests Running Too Slowly

- Check if the system is under heavy load
- Ensure Node.js version is up to date
- Verify no other processes are consuming resources

### Inconsistent Results

- Increase the number of iterations
- Add more warmup iterations
- Check for system resource contention

### Memory Issues

- Reduce test data size
- Check for memory leaks in the implementation
- Monitor garbage collection behavior

## ✅ Best Practices

1. **Realistic Test Data**: Use data that represents real-world usage
2. **Appropriate Thresholds**: Set realistic performance expectations
3. **Regular Updates**: Update benchmarks as the codebase evolves
4. **Documentation**: Document any performance characteristics or limitations
5. **Monitoring**: Track performance trends over time
