#!/usr/bin/env python3
"""Assemble the State Tower world: base shell + shared defs/kit + crew meshes + placements + lights.

Usage: python3 statetower/tools/assemble_world.py  ->  statetower/world/STATETOWER_world.weave
"""
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
COMPONENTS = ["ST_Podium", "ST_TowerMain", "ST_TowerWing", "ST_Crown"]


def read(rel):
    with open(os.path.join(ROOT, rel)) as f:
        return f.read().rstrip() + "\n"


def rename_for_integration(text, comp):
    """Management integration checks stage COPIES while crews are still previewing their own names:
    rename the #mesh and the crew's #meshpart declarations (whole words only) to an IT_ prefix."""
    names = re.findall(r"^#meshpart\s+(\w+)", text, flags=re.M)
    for n in sorted(set(names), key=len, reverse=True):
        text = re.sub(r"\b%s\b" % re.escape(n), "IT" + n, text)
    return re.sub(r"\b%s\b" % re.escape(comp), "IT" + comp[2:], text)


def main():
    integration = "--integration" in sys.argv
    parts = [read("world/00_base.weave"), read("src/ST_defs.weave"), read("src/ST_kit.weave")]
    placed = []
    for c in COMPONENTS:
        path = os.path.join(ROOT, "src", c + ".weave")
        if os.path.exists(path):
            text = read("src/" + c + ".weave")
            if integration:
                text = rename_for_integration(text, c)
                c = "IT" + c[2:]
            parts.append(text)
            placed.append(c)
    parts.append("// ===== Placements (Management) =====\n" + "".join(
        f'object {c} {{ model = "mesh.{c}" position = (0, 0, 0) collision = mesh }}\n' for c in placed))
    if os.path.exists(os.path.join(ROOT, "world/10_lights.weave")):
        parts.append(read("world/10_lights.weave"))
    out = os.path.join(ROOT, "world", "STATETOWER_integration.weave" if integration else "STATETOWER_world.weave")
    with open(out, "w") as f:
        f.write("\n".join(parts))
    print(out, "components:", ", ".join(placed) or "(none)")


if __name__ == "__main__":
    main()
