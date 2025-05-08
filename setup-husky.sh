#!/bin/bash
# Save this script as setup-husky.sh and run it from your project root

echo "===== Setting up Husky and lint-staged ====="

# Install necessary packages
echo "Installing dependencies..."
npm install --save-dev husky lint-staged prettier eslint

# Initialize Husky
echo "Initializing Husky..."
npx husky init

# Create the pre-commit hook
echo "Creating pre-commit hook..."
cat > .husky/pre-commit << 'EOF'
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
EOF

# Make sure the hook is executable
chmod +x .husky/pre-commit

# Create lint-staged configuration
echo "Creating lint-staged configuration..."
cat > .lintstagedrc.json << 'EOF'
{
  "*.{js,jsx,ts,tsx}": [
    "eslint --fix",
    "prettier --write"
  ],
  "*.{json,md}": [
    "prettier --write"
  ]
}
EOF

# Create or update package.json scripts
echo "Updating package.json scripts..."
# This is a hacky way to do it - ideally you'd use jq, but this is more portable
TEMP_FILE=$(mktemp)
jq '.scripts["lint"] = "eslint . --ext .js,.jsx,.ts,.tsx"' package.json > "$TEMP_FILE" && mv "$TEMP_FILE" package.json
jq '.scripts["format"] = "prettier --write \"./**/*.{js,jsx,ts,tsx,json,md}\""' package.json > "$TEMP_FILE" && mv "$TEMP_FILE" package.json

# Create prettier config if it doesn't exist
if [ ! -f .prettierrc ]; then
  echo "Creating Prettier configuration..."
  cat > .prettierrc << 'EOF'
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100,
  "tabWidth": 2
}
EOF
fi

# Create ESLint config if not present
if [ ! -f .eslintrc.js ] && [ ! -f .eslintrc.json ]; then
  echo "Creating ESLint configuration..."
  cat > .eslintrc.js << 'EOF'
module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    '@react-native-community',
    'prettier'
  ],
  rules: {
    'prettier/prettier': 'error',
  },
  plugins: ['prettier'],
};
EOF

  # Install additional ESLint dependencies
  echo "Installing additional ESLint dependencies..."
  npm install --save-dev eslint-plugin-prettier eslint-config-prettier @react-native-community/eslint-config
fi

echo "✅ Husky and lint-staged setup complete!"
echo ""
echo "Next steps:"
echo "1. Commit these changes: git add . && git commit -m \"Add Husky and lint-staged\""
echo "2. Test the pre-commit hook by making and staging a change, then trying to commit"