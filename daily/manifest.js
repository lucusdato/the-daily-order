/* Daily battle files, loaded in order. Daily #1 is 8 November 2026; a new order goes out at 4 AM local time.
   PGD_RELEASE is the release schedule: day k plays scenario PGD_RELEASE[k-1]. Only battles in the
   new format that pass tools/check_scenes.py go on it. A day past the end shows "next order coming soon".
   PGD_PLAN is the order to convert and release the rest: famous battles first, mixed eras. */
const PGD_FILES = ['batch-01.js','batch-02.js','batch-03.js','quick-01.js','mystery-01.js','mystery-02.js','mystery-03.js','mystery-04.js'];
const PGD_RELEASE = [1,14,28,4,17,8,9,13,29,23,2,24,19,27];
const PGD_PLAN = [4,17,8,9,13,29,23,2,24,19,27,10,12,18,21,20,15,3,5,6,7,11,16,22,25,26,30];
