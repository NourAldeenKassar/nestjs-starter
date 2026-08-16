#!/bin/sh

# Pre-push hook: runs tests before allowing push to main
# Install: cp scripts/pre-push.sh .git/hooks/pre-push && chmod +x .git/hooks/pre-push

BRANCH=$(git rev-parse --abbrev-ref HEAD)

if [ "$BRANCH" != "main" ]; then
  exit 0
fi

echo "Pushing to main — running tests first..."
echo ""
echo "=== Tests ==="
npx jest --forceExit
RESULT=$?

if [ $RESULT -ne 0 ]; then
  echo ""
  echo "Tests failed — push blocked."
  exit 1
fi

echo ""
echo "All tests passed — pushing."
