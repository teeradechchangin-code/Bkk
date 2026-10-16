#!/usr/bin/env python3
"""Management-owned engine lights for the night look of client photo 1 -> statetower/world/10_lights.weave.

Values are world cm and mirror src/ST_defs.weave (keep in sync when the defs change).
"""
import math
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

DOME_C = (-348, -2104)
DOME_R = 1420
LED_BAND_TOP = 23300
DOME_TOP = 24240

# North strip (STRIP210_FP) north face, west and east segments (CCW order, outside on the right).
STRIP_N = [((1253, 21), (-1970, 1376)), ((3439, -897), (1253, 21))]
WING170_TOP = 17000
STRIP210_TOP = 21000

# Wing pediment fronts on the west face (u along WEST_DIR from WEST_SW), apex heights from the photos.
WEST_SW = (-3879, -3107)
WEST_DIR = (0.3920, 0.9200)
WEST_OUT = (-0.9200, 0.3920)
PEDIMENTS = [(5460, 17600), (6180, 16600), (7200, 15600)]  # (u centre, z)


def fmt(v):
    return str(int(round(v)))


def point(name, p, radius, intensity, color, shadow=False):
    s = "pointLight %s { position = (%s, %s, %s) radius = %d intensity = %s color = %s" % (
        name, fmt(p[0]), fmt(p[1]), fmt(p[2]), radius, intensity, color)
    if not shadow:
        s += " cast_shadow = false"
    return s + " }"


def main():
    out = ["// ===== Engine lights (Management, tools/gen_lights.py) - night look of client photo 1 ====="]
    # (a) Gold dome wash: warm ring just outside the LED band, plus two higher lights on the photo side (NW).
    out.append("// Dome: floodlit gold from the drum cornice (photo 1: bright orange-gold dome)")
    n = 8
    for i in range(n):
        a = math.radians(22.5 + i * 360 / n)
        r = DOME_R + 650
        out.append(point("L_Dome%d" % i, (DOME_C[0] + r * math.cos(a), DOME_C[1] + r * math.sin(a), LED_BAND_TOP + 250),
                         2600, 600, "#ffa940"))
    for i, az in enumerate([125, 155]):
        a = math.radians(az)
        r = DOME_R + 1200
        out.append(point("L_DomeHi%d" % i, (DOME_C[0] + r * math.cos(a), DOME_C[1] + r * math.sin(a), DOME_TOP - 300),
                         2600, 380, "#ffb850"))
    # (b) Violet-blue wash on the north faces above the stepped wing (photo 1 upper-left section).
    out.append("// North faces above the wing: violet-blue floodlight (photo 1 upper-left)")
    k = 0
    for (a, b) in STRIP_N:
        dx, dy = b[0] - a[0], b[1] - a[1]
        L = math.hypot(dx, dy)
        nx, ny = dy / L, -dx / L  # outward (right-hand side)
        for t in (0.2, 0.5, 0.8):
            for z in (WING170_TOP + 1800, STRIP210_TOP - 600):
                p = (a[0] + dx * t + nx * 900, a[1] + dy * t + ny * 900, z)
                out.append(point("L_Violet%d" % k, p, 2200, 260, "#8a74ff"))
                k += 1
    # (c) Pediments: soft white light on the three west-facing gables.
    # D1: the gables face NORTH (+WEST_DIR); light them from 14 m in front of their north faces (a 7 m west light glared).
    out.append("// Wing pediments (north-facing, D1): soft white wash from the north-west")
    for i, (u, z) in enumerate(PEDIMENTS):
        p = (WEST_SW[0] + WEST_DIR[0] * (u + 1400) + WEST_OUT[0] * 600, WEST_SW[1] + WEST_DIR[1] * (u + 1400) + WEST_OUT[1] * 600, z)
        out.append(point("L_Pediment%d" % i, p, 2200, 10, "#e8e4ff"))
    path = os.path.join(ROOT, "world", "10_lights.weave")
    with open(path, "w") as f:
        f.write("\n".join(out) + "\n")
    print(path, len(out) - 4, "lights")


if __name__ == "__main__":
    main()
