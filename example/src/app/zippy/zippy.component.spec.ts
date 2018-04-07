import { ZippyComponent } from './zippy.component';
import { createHostComponentFactory, SpectatorWithHost } from '@netbasal/spectator';

describe('ZippyComponent', () => {
  let host: SpectatorWithHost<ZippyComponent>;

  const createHost = createHostComponentFactory(ZippyComponent);

  it('should display the content', () => {
    host = createHost(`<zippy title="Zippy title">Zippy content</zippy>`);

    host.click('.zippy__title');

    expect(host.query('.zippy__content')).toHaveText('Zippy content');
  });

  it('should display the "Open" word if closed', () => {
    host = createHost(`<zippy title="Zippy title">Zippy content</zippy>`);

    expect(host.query('.arrow')).toHaveText('Open');
    expect(host.query('.arrow')).not.toHaveText('Close');
  });

  it('should display the "Close" word if open', () => {
      host = createHost(`<zippy title="Zippy title">Zippy content</zippy>`);

      host.click('.zippy__title');

      expect(host.query('.arrow')).toHaveText('Close');
      expect(host.query('.arrow')).not.toHaveText('Open');
    }
  );

  it('should be closed by default', () => {
    host = createHost(`<zippy title="Zippy title"></zippy>`);

    expect('.zippy__content').not.toExist();
  });

  it('should toggle the content', () => {
    host = createHost(`<zippy title="Zippy title"></zippy>`);

    host.click('.zippy__title');
    expect(host.query('.zippy__content')).toExist();

    host.click('.zippy__title');
    expect('.zippy__content').not.toExist();
  });
});
