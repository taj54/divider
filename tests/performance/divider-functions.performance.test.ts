import {
  divider,
  dividerFirst,
  dividerLast,
  dividerLoop,
  dividerNumberString,
} from '../../src/index';
import {
  benchmark,
  assertBenchmark,
  compareBenchmarks,
  formatBenchmarkResult,
} from './benchmark';

describe('divider functions performance tests', () => {
  // Test data generators
  const generateLargeString = (size: number): string => {
    return 'a'.repeat(size) + 'b'.repeat(size) + 'c'.repeat(size);
  };

  const generateLargeArray = (size: number, stringLength: number): string[] => {
    return Array.from(
      { length: size },
      (_, i) => `string${i}_${'x'.repeat(stringLength)}`
    );
  };

  describe('dividerFirst performance', () => {
    test('small string first element', () => {
      const testString = 'hello world test';
      const result = benchmark('dividerFirst small string', () =>
        dividerFirst(testString, ' ')
      );

      console.log(formatBenchmarkResult(result));

      // Should complete in less than 0.5ms on average
      assertBenchmark(result, 0.5, 2000);
    });

    test('large string first element', () => {
      const largeString = generateLargeString(1000);
      const result = benchmark('dividerFirst large string', () =>
        dividerFirst(largeString, 'b')
      );

      console.log(formatBenchmarkResult(result));

      // Should complete in less than 1ms on average
      assertBenchmark(result, 1.0, 1000);
    });

    test('array first element', () => {
      const testArray = generateLargeArray(100, 20);
      const result = benchmark('dividerFirst array', () =>
        dividerFirst(testArray, 5)
      );

      console.log(formatBenchmarkResult(result));

      // Should complete in less than 2ms on average
      assertBenchmark(result, 2.0, 500);
    });
  });

  describe('dividerLast performance', () => {
    test('small string last element', () => {
      const testString = 'hello world test';
      const result = benchmark('dividerLast small string', () =>
        dividerLast(testString, ' ')
      );

      console.log(formatBenchmarkResult(result));

      // Should complete in less than 0.5ms on average
      assertBenchmark(result, 0.5, 2000);
    });

    test('large string last element', () => {
      const largeString = generateLargeString(1000);
      const result = benchmark('dividerLast large string', () =>
        dividerLast(largeString, 'b')
      );

      console.log(formatBenchmarkResult(result));

      // Should complete in less than 1ms on average
      assertBenchmark(result, 1.0, 1000);
    });

    test('array last element', () => {
      const testArray = generateLargeArray(100, 20);
      const result = benchmark('dividerLast array', () =>
        dividerLast(testArray, 5)
      );

      console.log(formatBenchmarkResult(result));

      // Should complete in less than 2ms on average
      assertBenchmark(result, 2.0, 500);
    });
  });

  describe('dividerLoop performance', () => {
    test('small string loop', () => {
      const testString = generateLargeString(100);
      const result = benchmark('dividerLoop small string', () =>
        dividerLoop(testString, 10)
      );

      console.log(formatBenchmarkResult(result));

      // Should complete in less than 1ms on average
      assertBenchmark(result, 1.0, 1000);
    });

    test('medium string loop', () => {
      const testString = generateLargeString(1000);
      const result = benchmark('dividerLoop medium string', () =>
        dividerLoop(testString, 50)
      );

      console.log(formatBenchmarkResult(result));

      // Should complete in less than 2ms on average
      assertBenchmark(result, 2.0, 500);
    });

    test('large string loop', () => {
      const testString = generateLargeString(5000);
      const result = benchmark('dividerLoop large string', () =>
        dividerLoop(testString, 100)
      );

      console.log(formatBenchmarkResult(result));

      // Should complete in less than 10ms on average
      assertBenchmark(result, 10.0, 100);
    });

    test('array loop with flatten', () => {
      const testArray = generateLargeArray(100, 20);
      const result = benchmark('dividerLoop array with flatten', () =>
        dividerLoop(testArray, 5, { flatten: true })
      );

      console.log(formatBenchmarkResult(result));

      // Should complete in less than 5ms on average
      assertBenchmark(result, 5.0, 200);
    });

    test('loop with startOffset', () => {
      const testString = generateLargeString(1000);
      const result = benchmark('dividerLoop with startOffset', () =>
        dividerLoop(testString, 20, { startOffset: 100 })
      );

      console.log(formatBenchmarkResult(result));

      // Should complete in less than 2ms on average
      assertBenchmark(result, 2.0, 500);
    });

    test('loop with maxChunks', () => {
      const testString = generateLargeString(1000);
      const result = benchmark('dividerLoop with maxChunks', () =>
        dividerLoop(testString, 10, { maxChunks: 5 })
      );

      console.log(formatBenchmarkResult(result));

      // Should complete in less than 2ms on average
      assertBenchmark(result, 2.0, 500);
    });
  });

  describe('dividerNumberString performance', () => {
    test('small mixed string', () => {
      const testString = 'abc123def456ghi789';
      const result = benchmark('dividerNumberString small', () =>
        dividerNumberString(testString)
      );

      console.log(formatBenchmarkResult(result));

      // Should complete in less than 1ms on average
      assertBenchmark(result, 1.0, 1000);
    });

    test('medium mixed string', () => {
      const testString = 'abc123def456ghi789'.repeat(50);
      const result = benchmark('dividerNumberString medium', () =>
        dividerNumberString(testString)
      );

      console.log(formatBenchmarkResult(result));

      // Should complete in less than 2ms on average
      assertBenchmark(result, 2.0, 500);
    });

    test('large mixed string', () => {
      const testString = 'abc123def456ghi789'.repeat(200);
      const result = benchmark('dividerNumberString large', () =>
        dividerNumberString(testString)
      );

      console.log(formatBenchmarkResult(result));

      // Should complete in less than 10ms on average
      assertBenchmark(result, 10.0, 100);
    });

    test('array of mixed strings', () => {
      const testArray = Array.from(
        { length: 100 },
        (_, i) => `string${i}123number${i}456`
      );
      const result = benchmark('dividerNumberString array', () =>
        dividerNumberString(testArray)
      );

      console.log(formatBenchmarkResult(result));

      // Should complete in less than 10ms on average
      assertBenchmark(result, 10.0, 100);
    });

    test('array with flatten', () => {
      const testArray = Array.from(
        { length: 50 },
        (_, i) => `string${i}123number${i}456`
      );
      const result = benchmark('dividerNumberString array with flatten', () =>
        dividerNumberString(testArray, { flatten: true })
      );

      console.log(formatBenchmarkResult(result));

      // Should complete in less than 5ms on average
      assertBenchmark(result, 5.0, 200);
    });
  });

  describe('function comparison tests', () => {
    test('compare first vs last performance', () => {
      const testString = generateLargeString(500);

      const { results, fastest } = compareBenchmarks(
        [
          { name: 'dividerFirst', fn: () => dividerFirst(testString, 'b') },
          { name: 'dividerLast', fn: () => dividerLast(testString, 'b') },
        ],
        { iterations: 500 }
      );

      console.log('\nFirst vs Last Comparison:');
      results.forEach((result) => {
        console.log(formatBenchmarkResult(result));
      });
      console.log(`\nFastest: ${fastest.name}`);

      // Both should complete in reasonable time
      results.forEach((result) => {
        assertBenchmark(result, 2.0, 500);
      });
    });

    test('compare loop vs regular divider', () => {
      const testString = generateLargeString(1000);

      const { results, fastest } = compareBenchmarks(
        [
          { name: 'dividerLoop', fn: () => dividerLoop(testString, 100) },
          {
            name: 'divider with multiple positions',
            fn: () =>
              divider(testString, 100, 200, 300, 400, 500, 600, 700, 800, 900),
          },
        ],
        { iterations: 300 }
      );

      console.log('\nLoop vs Regular Comparison:');
      results.forEach((result) => {
        console.log(formatBenchmarkResult(result));
      });
      console.log(`\nFastest: ${fastest.name}`);

      // Both should complete in reasonable time
      results.forEach((result) => {
        assertBenchmark(result, 5.0, 200);
      });
    });

    test('compare number string vs regex', () => {
      const testString = 'abc123def456ghi789'.repeat(50);

      const { results, fastest } = compareBenchmarks(
        [
          {
            name: 'dividerNumberString',
            fn: () => dividerNumberString(testString),
          },
          {
            name: 'manual regex split',
            fn: () => testString.split(/(\d+)/).filter(Boolean),
          },
        ],
        { iterations: 500 }
      );

      console.log('\nNumber String vs Regex Comparison:');
      results.forEach((result) => {
        console.log(formatBenchmarkResult(result));
      });
      console.log(`\nFastest: ${fastest.name}`);

      // Both should complete in reasonable time
      results.forEach((result) => {
        assertBenchmark(result, 3.0, 300);
      });
    });
  });

  describe('memory usage tests', () => {
    test('large array memory usage', () => {
      const largeArray = generateLargeArray(1000, 100);

      const result = benchmark('large array memory test', () =>
        dividerLoop(largeArray, 10, { flatten: true })
      );

      console.log(formatBenchmarkResult(result));

      // Should complete in reasonable time without memory issues
      assertBenchmark(result, 50.0, 20);
    });

    test('very large string memory usage', () => {
      const veryLargeString = generateLargeString(10000);

      const result = benchmark('very large string memory test', () =>
        dividerLoop(veryLargeString, 100)
      );

      console.log(formatBenchmarkResult(result));

      // Should complete in reasonable time without memory issues
      assertBenchmark(result, 20.0, 50);
    });
  });
});
