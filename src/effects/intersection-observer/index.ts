import { useEffect, useRef, useState } from 'react';

const useIntersectionObserver = (options: IntersectionObserverInit = {}) => {
	const [elements, setElements] = useState<Element[]>([]);
	const [entries, setEntries] = useState<IntersectionObserverEntry[]>([]);

	const observer = useRef<IntersectionObserver | null>(null);

	useEffect(() => {
		if (elements.length > 0) {
			console.log('connect');
			observer.current = new IntersectionObserver(entries => setEntries(entries), options);
			elements.forEach(element => observer.current!.observe(element));
		}

		return () => {
			if (observer.current) {
				console.log('disconnect');
				observer.current.disconnect();
			}
		};
	}, [elements, options.root, options.rootMargin, options.threshold]);

	return [observer.current, setElements, entries];
}

export default useIntersectionObserver;
