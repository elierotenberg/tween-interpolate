const { describe, it } = global;
import should from 'should/as-function';
import tweenInterpolate from '../../';

describe('tween-interpolate', () => {
  it('exports an object', () =>
    should(tweenInterpolate).be.an.Object()
  );
  it('exports interpolate', () =>
    should(tweenInterpolate).have.property('interpolate').which.is.a.Function()
  );
  it('exports ease', () =>
    should(tweenInterpolate).have.property('ease').which.is.a.Function()
  );
  it('interpolates numbers', () =>
    should(tweenInterpolate.interpolate(0, 5)(0.5)).be.exactly(2.5)
  );
  it('interpolates colors', () =>
    should(tweenInterpolate.interpolate('steelblue', '#f00')(0.2)).be.exactly('#6b6890')
  );
  it('supports cubic easing', () =>
    should(tweenInterpolate.ease('cubic')(0.5)).be.approximately(0.125, 1e-6)
  );
});
