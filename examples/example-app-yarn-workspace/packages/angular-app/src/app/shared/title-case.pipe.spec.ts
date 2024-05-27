import { TitleCasePipe } from './title-case.pipe';

describe('TitleCasePipe', () => {
    const pipe = new TitleCasePipe();

    it('transforms "abc" to "Abc"', () => {
        expect(pipe.transform('abc')).toBe('Abc');
    });

    it('transforms "abc def" to "Abc Def"', () => {
        expect(pipe.transform('abc def')).toBe('Abc Def');
    });

    it('leaves "Abc Def" unchanged', () => {
        expect(pipe.transform('Abc Def')).toBe('Abc Def');
    });

    it('transforms "abc-def" to "Abc-def"', () => {
        expect(pipe.transform('abc-def')).toBe('Abc-def');
    });

    it('transforms "   abc   def" to "   Abc   Def" (preserves spaces)', () => {
        expect(pipe.transform('   abc   def')).toBe('   Abc   Def');
    });
});
