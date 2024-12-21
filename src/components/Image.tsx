import React from "react";

interface ImageProps {
    className?: string;
    src: string;
    alt: string;
}

export default function Image({ className = "", src, alt, ...rest }: ImageProps): React.JSX.Element {
    return (
        <picture>
            <source type="image/webp" />
            <img className={className} loading="lazy" src={src} alt={alt} {...rest} />
        </picture>
    );
}
