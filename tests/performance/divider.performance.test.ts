/// <reference types="jest" />
import { divider } from '../../src/index';
import {
  benchmark,
  assertBenchmark,
  compareBenchmarks,
  formatBenchmarkResult,
} from './benchmark';

describe('divider performance tests', () => {
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

  describe('string input performance', () => {
    test('small string division (100 chars)', () => {
      const smallString = generateLargeString(33);
      const result = benchmark('small string division', () =>
        divider(smallString, 10, 20, 30, 40, 50)
      );

      console.log(formatBenchmarkResult(result));

      // Should complete in less than 1ms on average
      assertBenchmark(result, 1.0, 1000);
    });

    test('medium string division (1000 chars)', () => {
      const mediumString = generateLargeString(333);
      const result = benchmark('medium string division', () =>
        divider(mediumString, 100, 200, 300, 400, 500)
      );

      console.log(formatBenchmarkResult(result));

      // Should complete in less than 2ms on average
      assertBenchmark(result, 2.0, 500);
    });

    test('large string division (10000 chars)', () => {
      const largeString = generateLargeString(3333);
      const result = benchmark('large string division', () =>
        divider(largeString, 1000, 2000, 3000, 4000, 5000)
      );

      console.log(formatBenchmarkResult(result));

      // Should complete in less than 10ms on average
      assertBenchmark(result, 10.0, 100);
    });

    test('string with many separators', () => {
      const testString = 'a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z';
      const result = benchmark('string with many separators', () =>
        divider(testString, ',')
      );

      console.log(formatBenchmarkResult(result));

      // Should complete in less than 1ms on average
      assertBenchmark(result, 1.0, 1000);
    });

    test('mixed separators performance', () => {
      const testString = 'hello123world456test789final';
      const result = benchmark('mixed separators', () =>
        divider(testString, 5, '1', 10, '4', 15, '7')
      );

      console.log(formatBenchmarkResult(result));

      // Should complete in less than 1ms on average
      assertBenchmark(result, 1.0, 1000);
    });
  });

  describe('array input performance', () => {
    test('small array division (10 items)', () => {
      const smallArray = generateLargeArray(10, 50);
      const result = benchmark('small array division', () =>
        divider(smallArray, 10, 20, 30)
      );

      console.log(formatBenchmarkResult(result));

      // Should complete in less than 2ms on average
      assertBenchmark(result, 2.0, 500);
    });

    test('medium array division (100 items)', () => {
      const mediumArray = generateLargeArray(100, 50);
      const result = benchmark('medium array division', () =>
        divider(mediumArray, 10, 20, 30)
      );

      console.log(formatBenchmarkResult(result));

      // Should complete in less than 10ms on average
      assertBenchmark(result, 10.0, 100);
    });

    test('large array division (1000 items)', () => {
      const largeArray = generateLargeArray(1000, 50);
      const result = benchmark('large array division', () =>
        divider(largeArray, 10, 20, 30)
      );

      console.log(formatBenchmarkResult(result));

      // Should complete in less than 100ms on average
      assertBenchmark(result, 100.0, 10);
    });

    test('array with flatten option', () => {
      const testArray = generateLargeArray(100, 20);
      const result = benchmark('array with flatten', () =>
        divider(testArray, 5, 10, 15, { flatten: true })
      );

      console.log(formatBenchmarkResult(result));

      // Should complete in less than 15ms on average
      assertBenchmark(result, 15.0, 66);
    });
  });

  describe('options performance', () => {
    test('trim option performance', () => {
      const testString = '  hello  world  test  ';
      const result = benchmark('trim option', () =>
        divider(testString, ' ', { trim: true })
      );

      console.log(formatBenchmarkResult(result));

      // Should complete in less than 1ms on average
      assertBenchmark(result, 1.0, 1000);
    });

    test('exclude option performance', () => {
      const testString = 'a,,b, ,c,  ,d';
      const result = benchmark('exclude option', () =>
        divider(testString, ',', { exclude: 'whitespace' })
      );

      console.log(formatBenchmarkResult(result));

      // Should complete in less than 1ms on average
      assertBenchmark(result, 1.0, 1000);
    });

    test('multiple options performance', () => {
      const testString = '  a  ,  b  ,  c  ';
      const result = benchmark('multiple options', () =>
        divider(testString, ',', {
          trim: true,
          exclude: 'whitespace',
          flatten: true,
        })
      );

      console.log(formatBenchmarkResult(result));

      // Should complete in less than 1ms on average
      assertBenchmark(result, 1.0, 1000);
    });
  });

  describe('edge cases performance', () => {
    test('empty string performance', () => {
      const result = benchmark('empty string', () =>
        divider('', 'a', 'b', 'c')
      );

      console.log(formatBenchmarkResult(result));

      // Should complete in less than 0.5ms on average
      assertBenchmark(result, 0.5, 2000);
    });

    test('empty array performance', () => {
      const result = benchmark('empty array', () => divider([], 'a', 'b', 'c'));

      console.log(formatBenchmarkResult(result));

      // Should complete in less than 0.5ms on average
      assertBenchmark(result, 0.5, 2000);
    });

    test('no separators performance', () => {
      const testString = 'hello world';
      const result = benchmark('no separators', () => divider(testString));

      console.log(formatBenchmarkResult(result));

      // Should complete in less than 0.5ms on average
      assertBenchmark(result, 0.5, 2000);
    });

    test('invalid separators performance', () => {
      const testString = 'hello world';
      const result = benchmark('invalid separators', () =>
        divider(testString, 1000, 'nonexistent')
      );

      console.log(formatBenchmarkResult(result));

      // Should complete in less than 1ms on average
      assertBenchmark(result, 1.0, 1000);
    });
  });

  describe('comparison tests', () => {
    test('compare different separator types', () => {
      const testString = 'hello123world456test789';

      const { results, fastest } = compareBenchmarks(
        [
          {
            name: 'numeric separators',
            fn: () => divider(testString, 5, 10, 15),
          },
          {
            name: 'string separators',
            fn: () => divider(testString, '1', '4', '7'),
          },
          {
            name: 'mixed separators',
            fn: () => divider(testString, 5, '1', 10, '4'),
          },
        ],
        { iterations: 500 }
      );

      console.log('\nComparison Results:');
      results.forEach((result) => {
        console.log(formatBenchmarkResult(result));
      });
      console.log(`\nFastest: ${fastest.name}`);

      // All should complete in reasonable time
      results.forEach((result) => {
        assertBenchmark(result, 5.0, 200);
      });
    });

    test('compare input types', () => {
      const testString = 'hello world test final';
      const testArray = ['hello', 'world', 'test', 'final'];

      const { results, fastest } = compareBenchmarks(
        [
          { name: 'string input', fn: () => divider(testString, ' ') },
          { name: 'array input', fn: () => divider(testArray, 2) },
          {
            name: 'array with flatten',
            fn: () => divider(testArray, 2, { flatten: true }),
          },
        ] as const,
        { iterations: 500 }
      );

      console.log('\nInput Type Comparison:');
      results.forEach((result) => {
        console.log(formatBenchmarkResult(result));
      });
      console.log(`\nFastest: ${fastest.name}`);

      // All should complete in reasonable time
      results.forEach((result) => {
        assertBenchmark(result, 3.0, 300);
      });
    });
  });
});
