#!/bin/bash

echo "🧼 Deep cleaning Replit references..."

# 1. Delete .replit and replit.nix
find . -name ".replit" -exec rm -f {} +
find . -name "replit.nix" -exec rm -f {} +

# 2. Remove pasted prompts and screenshots
find . -name "Pasted-*.txt" -delete
find . -name "Screenshot*.png" -delete

# 3. Strip @replit from config files
find . -type f \( -name "vite.config.ts" -o -name "vite.config.ts.save" -o -name "package.json" \) -exec sed -i '' '/@replit/d' {} +

# 4. Remove node_modules and lock files
rm -rf node_modules
rm -f package-lock.json yarn.lock

# 5. Reinstall clean dependencies
if [ -f "yarn.lock" ]; then
  yarn install
else
  npm install
fi

echo "✅ Replit references removed and dependencies reinstalled."

