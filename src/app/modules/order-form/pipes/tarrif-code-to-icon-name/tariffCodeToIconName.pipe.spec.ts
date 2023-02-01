import { TariffCodeToIconNamePipe } from './tariffCodeToIconName.pipe';

describe('IconPipe', () => {
  it('create an instance', () => {
    const pipe = new TariffCodeToIconNamePipe();
    expect(pipe).toBeTruthy();
  });
});
