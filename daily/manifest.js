/* Daily battle files, loaded in order. Daily #1 is 8 November 2026.
   PGD_RELEASE is the release schedule: day k plays scenario PGD_RELEASE[k-1]. Only battles in the
   new format that pass tools/check_scenes.py go on it. A day past the end shows "next order coming soon". */
const PGD_FILES = ['batch-01.js','batch-02.js','batch-03.js','quick-01.js','mystery-01.js'];
const PGD_RELEASE = [1,14];
