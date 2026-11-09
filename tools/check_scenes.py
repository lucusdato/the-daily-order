"""Run the scene checker over every mystery battle (or the numbers given) and print a report.
Usage: python3 tools/check_scenes.py [--strict] [n ...]   (from the repo root; needs Playwright + Chrome)
Exit code 1 if any errors (or, with --strict, any warnings)."""
import asyncio, sys, os, json
from playwright.async_api import async_playwright
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
async def main():
    args=[a for a in sys.argv[1:] if not a.startswith('--')]; strict='--strict' in sys.argv
    async with async_playwright() as p:
        exe=next((x for x in ['/usr/bin/google-chrome','/usr/bin/chromium'] if os.path.exists(x)),None)
        b=await p.chromium.launch(executable_path=exe,args=['--no-sandbox','--allow-file-access-from-files'])
        pg=await b.new_page(viewport={'width':390,'height':844})
        errs=[]; pg.on('pageerror',lambda e:errs.append(str(e)))
        await pg.goto('file://'+ROOT+'/index.html'); await pg.wait_for_function('PGD.ready',timeout=15000)
        await pg.add_script_tag(path=ROOT+'/tools/scenecheck.js')
        ns=[int(a) for a in args] or await pg.evaluate("Object.values(PGD.byN).filter(s=>s.m).map(s=>s.n)")
        bad=0
        for n in ns:
            r=await pg.evaluate(f"sceneCheck({n})")
            f=r['findings']; e=[x for x in f if x['lvl']=='error']; w=[x for x in f if x['lvl']=='warn']; i=[x for x in f if x['lvl']=='info']
            print(f"\n#{n} {r['name']}: {len(e)} errors, {len(w)} warnings, {len(i)} notes")
            for x in e+w+i: print(f"  [{x['lvl']}] {x['where']}: {x['msg']}")
            bad+=len(e)+(len(w) if strict else 0)
        if errs: print('\nPAGE ERRORS',errs); bad+=1
        await b.close()
    sys.exit(1 if bad else 0)
asyncio.run(main())
