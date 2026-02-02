#!/bin/bash
# Build script for testikuva index.html
# Combines testcard.svg, template.html, and script.js into index.html

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

# Build index.html by reading template and inserting content at placeholders
{
    while IFS= read -r line; do
        case "$line" in
            *'{{SVG_CONTENT}}'*)
                # Insert SVG content (strip XML declaration only)
                sed '1{/^<?xml/d;}' testcard.svg
                ;;
            *'{{JS_CONTENT}}'*)
                # Insert JavaScript content
                cat script.js
                ;;
            *)
                echo "$line"
                ;;
        esac
    done < template.html
} > index.html

echo "Generated index.html"
