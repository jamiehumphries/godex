set /p commit_hash=<pogo_assets_commit_hash.txt
cd ..\pogo_assets
git pull
git diff %commit_hash% HEAD --name-only -- ".\Images\Pokemon - 256x256" | xargs --delimiter="\n" --no-run-if-empty cp --target-directory="..\godex\images\"
cd ..\godex
git rev-parse HEAD > pogo_assets_commit_hash.txt
git add images
git status
