import React, { FC, useEffect, useState } from 'react';
import classnames from 'classnames';
import styles from './image.module.scss';
import useInViewport from 'effects/viewport';

interface Props {
	/** The image `src` attr. */
  src: string | Promise<string>;
	/** The image `alt` attr. */
	alt?: string;
	/** The image width. */
	width?: number;
	/** The image height. */
	height?: number;
	/** Whether or not the image should be lazy loaded. */
	lazy?: boolean;
	/** The class name. */
	className?: string;
}

interface State {
	/** The image source. */
	src: string | undefined;
	/** Whether or not loading has errored. */
	error: boolean;
	/** Whether or not loading has completed. */
  complete: boolean;
}

/** Represents an image component. */
const Image: FC<Props> = ({ src, alt, lazy, className, width, height, ...otherProps }) => {
	const [state, setState] = useState<State>({ src: undefined, error: false, complete: false });

  const onLoad = (): void => {
    setState(state => ({ ...state, complete: true, error: false }));
  };

  const onError = (): void => {
    setState(state => ({ ...state, complete: false, error: true }));
  };

  useEffect(() => {
		const srcPromise = (typeof src === 'string' ? Promise.resolve(src) : src); 

		srcPromise
			.then(src => setState(state => ({ ...state, src })))
			.catch(() => setState(state => ({ ...state, error: true })))
			.catch(error => console.warn(`Error reading src in '${Image.name}' component`, error))
	}, [src]);
	
	const { ref, inViewport } = useInViewport();
  const rootClass = classnames({
      [styles.image]: true,
      [styles.error]: state.error,
      [styles.complete]: state.complete,
		}, className
	);

  return (
		<div ref={ref}
			className={rootClass}
			style={{ width: width, height: height }}>
		{ !lazy || (lazy && inViewport)
			? <img
					{...otherProps}
					onError={onError}
					onLoad={onLoad}
					src={state.src}
					alt={alt}/>
			: null
		}	
		</div>
  );
};

export default Image;
