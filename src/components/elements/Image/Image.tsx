import fp from 'lodash/fp';
import { ReactEventHandler, SyntheticEvent, useEffect, useState } from 'react';
import { IPropsOf } from 'types.d';

export type IImageEvent = SyntheticEvent<HTMLImageElement, Event>;

export interface IImageProps extends IPropsOf<'img'> {
  /**
   * Fallback element to show if image is loading.
   */
  fallback?: React.ReactElement;
  /**
   * Fallback `src` to show if image fails.
   */
  fallbackSrc?: string;
  /**
   * Loading strategy.
   */
  loading?: 'eager' | 'lazy';
  /**
   * A callback for when there was an error loading the image `src`.
   */
  onError?: ReactEventHandler<HTMLImageElement>;
  /**
   * A callback for when the image `src` has been loaded.
   */
  onLoad?: ReactEventHandler<HTMLImageElement>;
}

export const Img: React.FC<IImageProps> = ({
  alt,
  className,
  height,
  fallback,
  fallbackSrc,
  loading = 'lazy',
  onError,
  onLoad,
  src,
  width,
  ...rest
}): JSX.Element | null => {
  const [image, setImage] = useState<string | undefined>(fallbackSrc);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const img = new Image();
    img.src = src as string;
    img.onerror = (event) => {
      if (!fp.isNil(onError)) onError(event as unknown as IImageEvent);
      setIsLoading(false);
    };
    img.onload = (event) => {
      if (!fp.isNil(onLoad)) onLoad(event as unknown as IImageEvent);
      setImage(src);
      setIsLoading(false);
    };
  }, [src]);

  if (isLoading && !fp.isNil(fallback)) return fallback;

  return (
    <img
      alt={alt}
      className={className}
      height={height}
      loading={loading}
      src={image}
      style={{ height, width }}
      width={width}
      {...rest}
    />
  );
};
