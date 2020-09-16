import React from 'react';
import Image from '../components/image';

export const regular: React.FC = () => (
  <div>
    <Image
			width={400}
			height={400}
			lazy
			src="https://global-uploads.webflow.com/5873645dcda6383b06dc220a/5b9a825ea6ef6021d01d6774_DIXA-426-2.jpg" />
    <br />
    <Image
			width={400}
			height={400}
			lazy
			src="https://global-uploads.webflow.com/5873645dcda6383b06dc220a/5b645adbc899f51886b6f1dd_DSC_4137.jpg" />
  </div>
);

export default {
  title: 'Image'
};
