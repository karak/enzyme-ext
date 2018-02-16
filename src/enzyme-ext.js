import Enzyme from 'enzyme';
import createExtensionProxy from './createExtensionProxy';

/** Mixin-methods holder */
class ReactWrapperMixin {
    /** shorthand to @see {Enzyme.ReactWrapper.click} */
    click() {
        this.simulate('click', ...arguments);
    }

    /** shorthand to @see {Enzyme.ReactWrapper.change} */
    change() {
        this.simulate('change', ...arguments);
    }
}

/** wrapper of @see {Enzyme.ReactWrapper} */
function createReactWrapperProxy(wrapper) {
    return createExtensionProxy(wrapper, {
        // Custom functions.
        mixin: ReactWrapperMixin.prototype,
        // Self-returning functions to wrap.
        // TODO: Enumerate all of them.
        returnSelf: ['find']
    });
}

/** wrapper of @see {Enzyme.mount} */
export function mount() {
    const result = Enzyme.mount.apply(this, arguments);
    return createReactWrapperProxy(result);
}
