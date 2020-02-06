import { Transformer } from '@jest/transform';

const loadHtmlTransformer: Partial<Transformer> = {
  process(src: string) {
    return `module.exports=`+JSON.stringify(src);
  }
};

export = loadHtmlTransformer;

