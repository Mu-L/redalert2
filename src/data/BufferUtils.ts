export function toArrayBuffer(buffer: ArrayBufferLike, byteOffset: number = 0, byteLength: number = buffer.byteLength - byteOffset): ArrayBuffer {
    if (buffer instanceof ArrayBuffer && byteOffset === 0 && byteLength === buffer.byteLength) {
        return buffer;
    }
    const view = new Uint8Array(buffer, byteOffset, byteLength);
    const copy = new Uint8Array(byteLength);
    copy.set(view);
    return copy.buffer;
}
export function toOwnedUint8Array(data: ArrayBufferView | ArrayLike<number>): Uint8Array<ArrayBuffer> {
    if (ArrayBuffer.isView(data)) {
        const copy = new Uint8Array(data.byteLength);
        copy.set(new Uint8Array(data.buffer, data.byteOffset, data.byteLength));
        return copy;
    }
    return Uint8Array.from(data);
}
