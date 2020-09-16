/** Represents a callback function for the `IntersectionObserver`. */
export type IntersectionObserverCallback = (
	intersecting: boolean
) => void; 

/**
 * Observes an element using the `IntersectionObserver` API.
 * @param element The element to observe.
 * @param callback The intersection observer callback.
 * @param options The intersection observer init.
 */
export function observe(
	element: Element,
	callback: IntersectionObserverCallback,
	options: IntersectionObserverInit = {}
) {
	const { observer, callbacksByElement} = create(options);

	const callbacks = callbacksByElement.get(element) || [];
	if (!callbacksByElement.has(element)) {
		callbacksByElement.set(element, callbacks);
  }

	callbacks.push(callback);
	observer.observe(element);	

	return () => {
		callbacks.splice(callbacks.indexOf(callback), 1);

		if (callbacks.length === 0) {
      callbacksByElement.delete(element);
      observer.unobserve(element);
    }

    if (callbacksByElement.size === 0) {
      observer.disconnect();
    }
	};
}

/**
 * Creates a new intersection observer.
 * TODO: Reuse the same instance if the options have been seen before.
 * @param options The intersection observer options.
 */
function create(options: IntersectionObserverInit) {
	// The observed elements along with their registered callbacks.
	const callbacksByElement = new Map<Element, IntersectionObserverCallback[]>();
	
	const observer = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			const callbacks = callbacksByElement.get(entry.target) || [];
			callbacks.forEach(callback => callback(entry.isIntersecting));
		});
	}, options);

	return { observer, callbacksByElement }
}
