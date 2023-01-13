import { tariffCodeToIconNamePipe } from './tariffCodeToIconName.pipe';

describe('IconPipe', () => {
  it('create an instance', () => {
    const pipe = new tariffCodeToIconNamePipe();
    expect(pipe).toBeTruthy();
  });
});
