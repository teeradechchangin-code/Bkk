#!/usr/bin/env python3
"""Assemble the State Tower world: base shell + shared defs/kit + crew meshes + placements + lights.

Usage: python3 statetower/tools/assemble_world.py  ->  statetower/world/STATETOWER_world.weave
"""
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
COMPONENTS = ["ST_Podium", "ST_TowerMain", "ST_TowerWing", "ST_Crown"]


def read(rel):
    with open(os.path.join(ROOT, rel)) as f:
        return f.read().rstrip() + "\n"


def main():
    parts = [read("world/00_base.weave"), read("src/ST_defs.weave"), read("src/ST_kit.weave")]
    placed = []
    for c in COMPONENTS:
        path = os.path.join(ROOT, "src", c + ".weave")
        if os.path.exists(path):
            parts.append(read("src/" + c + ".weave"))
            placed.append(c)
    parts.append("// ===== Placements (Management) =====\n" + "".join(
        f'object {c} {{ model = "mesh.{c}" position = (0, 0, 0) collision = mesh }}\n' for c in placed))
    if os.path.exists(os.path.join(ROOT, "world/10_lights.weave")):
        parts.append(read("world/10_lights.weave"))
    out = os.path.join(ROOT, "world", "STATETOWER_world.weave")
    with open(out, "w") as f:
        f.write("\n".join(parts))
    print(out, "components:", ", ".join(placed) or "(none)")


if __name__ == "__main__":
    main()
