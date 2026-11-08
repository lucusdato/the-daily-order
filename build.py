import re
t=open('_index.tpl').read()
t=t.replace('{{CSS}}',open('_css.txt').read()).replace('{{EXTRA}}',open('_extra.css').read()).replace('{{DEFS}}',open('_defs.txt').read())
open('index.html','w').write(t)
