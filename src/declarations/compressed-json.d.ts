declare module 'compressed-json' {
	declare export function compress(v: Record<string, any>): Record<string, any>;
	declare export function decompress(v: Record<string, any>): Record<string, any>;
}
