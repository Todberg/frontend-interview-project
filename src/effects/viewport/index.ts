import { useRef, useState, useCallback } from 'react';
import { observe } from 'infrastructure/intersection-observer';

/**
 * A custom hook that detects when an element enters the viewport.
 * @param options The intersection observer init.
 */
const useInViewport = (options: IntersectionObserverInit = {}) => {
	const unobserve = useRef<Function | undefined>();
	const [inViewport, setInViewport] = useState<boolean>(false);

	return {
		inViewport,
		ref: useCallback(element => {
			if (unobserve.current) {
				unobserve.current();
				unobserve.current = undefined;
			}
	
			if (element) {
				unobserve.current = observe(element, intersecting => {
					setInViewport(intersecting);
	
					if (unobserve.current && intersecting) {
						unobserve.current();
						unobserve.current = undefined;
					}
				}, options);
			}
		}, [options])
	};
}

export default useInViewport;