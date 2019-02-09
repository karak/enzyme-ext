/**
 * Create Proxy object with extensions.
 *
 * @template T
 * @param {T} target object
 * @param {Object} args with returnSelf and mixin
 * @return {Proxy<T>} Proxy object
 */
export default function createExtensionProxy(target, args) {
    const { returnSelf, mixin = {}} = args;

    const wrapping = { };
    for (const key of returnSelf) {
        wrapping[key] = wrapSelfReturningFunction(target, key);
    }

    const validator = {
        'get': function (target, key, receiver) {
            // Mixin methods to intercept
            if (mixin.hasOwnProperty(key)) {
                return mixin[key];
            }
            // Self-returning methods to wrap
            if (wrapping.hasOwnProperty(key)) {
                return wrapping[key];
            }
            // the others to pass-through
            const original = Reflect.get(target, key, receiver);
            return original; 
        }
    };

    return new Proxy(target, validator);

    /** Call the original function that returns `this` and wrap the return value */
    function wrapSelfReturningFunction(target, key) {
        const original = target[key]; // bind when setup before proxy applied.
        return function () {
            return new Proxy(original.apply(target, arguments), validator);
        }
    }
}
