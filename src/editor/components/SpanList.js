import React from 'react';
import Span from './Span';

const SpanList = ({style, content}) => {
	let renderSpan = (formatList, content) => {
		if (typeof formatList !== 'undefined') {
			return formatList.map((format, i) => {
				//{style: ["bold"], offset:[2, 4]}
				let style = format.style,
					offset = format.offset,
					spanContent = content.substring(offset[0], offset[1]);

				return <Span key={i}
							 content={spanContent}
						/>
			})
		}

		return <Span content={content}/>


	};
	return (
		renderSpan(style.format, content)
	);
};

export default SpanList;