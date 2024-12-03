const testFunction = async () => {
    const { camelCase } = await import('lodash-es');
    camelCase('FooBar');
};

describe('Performance Measurement', () => {
    it('should complete expensive operation within acceptable performance', async () => {
        const runs = 5;
        const times: number[] = [];

        for (let i = 0; i < runs; i++) {
            const start = performance.now();
            await testFunction();
            const end = performance.now();
            times.push(end - start);
        }

        const average = times.reduce((a, b) => a + b, 0) / runs;
        const min = Math.min(...times);
        const max = Math.max(...times);
        const standardDeviation = Math.sqrt(times.reduce((sq, n) => sq + Math.pow(n - average, 2), 0) / runs);

        console.log('Performance Metrics:', {
            average: `${average.toFixed(2)}ms`,
            min: `${min.toFixed(2)}ms`,
            max: `${max.toFixed(2)}ms`,
            standardDeviation: `${standardDeviation.toFixed(2)}ms`,
        });

        const acceptableThresholds = {
            averageMax: 700,
            standardDeviationMax: 1500,
            absoluteMax: 3300,
        };

        expect(average).toBeLessThan(acceptableThresholds.averageMax);
        expect(standardDeviation).toBeLessThan(acceptableThresholds.standardDeviationMax);
        expect(max).toBeLessThan(acceptableThresholds.absoluteMax);
    });
});
