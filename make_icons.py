import math, struct, zlib

def make_png(path, size):
    rows = bytearray()
    c = size / 2
    for y in range(size):
        rows.append(0)
        for x in range(size):
            dx, dy = (x - c) / size, (y - c) / size
            d = math.sqrt(dx * dx + dy * dy)
            glow = max(0.0, 1 - d * 2.4)
            r, g, b = int(12 + 50 * glow), int(18 + 120 * glow), int(40 + 200 * glow)
            if abs(d - 0.30) < 0.03:
                r, g, b = 124, 245, 255
            rows += bytes((r, g, b, 255))

    def chunk(tag, data):
        return struct.pack('>I', len(data)) + tag + data + struct.pack('>I', zlib.crc32(tag + data) & 0xFFFFFFFF)

    header = struct.pack('>IIBBBBB', size, size, 8, 6, 0, 0, 0)
    png = (b'\x89PNG\r\n\x1a\n' + chunk(b'IHDR', header) +
           chunk(b'IDAT', zlib.compress(bytes(rows), 9)) + chunk(b'IEND', b''))
    with open(path, 'wb') as f:
        f.write(png)

make_png('icon.png', 80)
make_png('largeIcon.png', 130)
print('Created icon.png and largeIcon.png')

