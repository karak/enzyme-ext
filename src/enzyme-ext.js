import Enzyme from 'enzyme';

/** wrapper of @see {Enzyme.ReactWrapper} */
function createReactWrapperProxy(wrapper) {
    return new Proxy(wrapper, {
        'get': function (target, key) {
            switch(key) {
            // Custom functions.
            case 'click':
                return click;
            case 'change':
                return change;
            // Wrap self-returning functions.
            // TODO: Enumerate all of them.
            case 'find':
                return wrapSelfReturningFunction(target, key);
            // the others
            default:
                return target[key]; 
            }
        }
    });

    /** shorthand to @see {Enzyme.ReactWrapper.click} */
    function click() {
        this.simulate('click', ...arguments);
    }

    /** shorthand to @see {Enzyme.ReactWrapper.change} */
    function change() {
        this.simulate('change', ...arguments);
    }

    /** Call the original function that returns `this` and wrap the return value */
    function wrapSelfReturningFunction(target, key) {
        return function () {
            return createReactWrapperProxy(target[key].apply(target, arguments));
        }
    }
}

/** wrapper of @see {Enzyme.mount} */
export function mount() {
    const result = Enzyme.mount.apply(this, arguments);
    return createReactWrapperProxy(result);
}
