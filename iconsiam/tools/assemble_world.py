#!/usr/bin/env python3
"""Assemble the full ICONSIAM Oriverse world from the component files.

world/00_base.weave  (grid, adjuster, imported library textures, material palette)
+ src/ICS_defs.weave (shared #meshdefs)
+ src/ICS_*.weave    (component #meshpart/#mesh blocks, one file per crew)
+ placement objects  (every component at position (0,0,0), mesh collision)
-> world/ICONSIAM_world.weave
"""
import pathlib, sys
root = pathlib.Path(__file__).resolve().parents[1]
order = ["ICS_Site", "ICS_MallMain", "ICS_MallRiverfront", "ICS_Crown", "ICS_TowerMagnolias", "ICS_TowerMandarin"]
only = sys.argv[1:] or order
parts = [(root / "world/00_base.weave").read_text().rstrip() + "\n"]
parts.append((root / "src/ICS_defs.weave").read_text().rstrip() + "\n")
objs = []
for name in order:
    if name not in only:
        continue
    f = root / "src" / f"{name}.weave"
    if not f.exists():
        print(f"skip {name}: missing", file=sys.stderr)
        continue
    parts.append(f"// ===== {name} (src/{name}.weave) =====\n" + f.read_text().rstrip() + "\n")
    objs.append(f"object {name} {{\n    model = \"mesh.{name}\"\n    position = (0, 0, 0)\n    collision = mesh\n}}")
parts.append("// ===== Placement: whole complex at world (0,0,0) =====\n" + "\n".join(objs) + "\n")
for extra in ("world/10_lights.weave", "world/20_context.weave"):   # Management-owned: engine lights (D9), context land (D14)
    f = root / extra
    if f.exists():
        parts.append(f.read_text().rstrip() + "\n")
out = root / "world/ICONSIAM_world.weave"
out.write_text("\n".join(parts))
print(out, out.stat().st_size, "bytes,", len(objs), "components")
