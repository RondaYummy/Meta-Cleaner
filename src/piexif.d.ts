export function load( dataURL: string ): any;
export function dump( exifObject: any ): string;
export function insert( exifData: string, jpegData: string ): string;
export function remove( jpegData: string ): string;
export const ImageIFD: Record<string, any>;
export const ExifIFD: Record<string, any>;
export const GPSIFD: Record<string, any>;
