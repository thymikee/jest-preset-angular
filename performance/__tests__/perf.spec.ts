const testFunction = async () => {
    const { camelCase } = await import('lodash-es');
    camelCase('FooBar');
};

describe('Performance Measurement', () => {
    it('should complete expensive operation within acceptable performance', async () => {
        const runs = 5;
        const warmupRuns = 2;
        const testTimes: number[] = [];

        // Warmup runs for more consistent measurements
        for (let i = 0; i < warmupRuns; i++) {
            await testFunction();
        }

        // Actual performance measurement
        for (let i = 0; i < runs; i++) {
            // Measure test operation
            const testStart = performance.now();
            await testFunction();
            const testEnd = performance.now();
            testTimes.push(testEnd - testStart);
        }

        const avgTestTime = testTimes.reduce((a, b) => a + b, 0) / runs;
        const testStdDev = Math.sqrt(testTimes.reduce((sq, n) => sq + Math.pow(n - avgTestTime, 2), 0) / runs);

        console.log('Performance Metrics:', {
            avgTestTime: `${avgTestTime.toFixed(2)}ms`,
        });

        const acceptableThresholds = {
            // Test should be max 10x slower than baseline
            maxRelativePerformance: 10,
            // Coefficient of variation (stddev/mean) should be reasonable
            maxVariationCoefficient: 1.2,
        };

        expect(testStdDev / avgTestTime).toBeLessThan(acceptableThresholds.maxVariationCoefficient);
    });
});
