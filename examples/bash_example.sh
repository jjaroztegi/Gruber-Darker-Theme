#!/bin/bash

# Function to display usage information
usage() {
    echo "Usage: $0 [-d directory] [-e extension] [-v]"
    echo "  -d: Directory to scan (default: current directory)"
    echo "  -e: File extension to filter (default: all files)"
    echo "  -v: Verbose output"
    exit 1
}

# Default values
directory="."
extension="*"
verbose=false

# Parse command line arguments
while getopts "d:e:vh" opt; do
    case $opt in
        d) directory="$OPTARG" ;;
        e) extension="$OPTARG" ;;
        v) verbose=true ;;
        h) usage ;;
        \?) usage ;;
    esac
done

# Check if directory exists
if [ ! -d "$directory" ]; then
    echo "Error: Directory '$directory' does not exist"
    exit 1
fi

# Initialize arrays and counters
declare -A file_stats
declare -A extension_stats
total_files=0
total_lines=0

# Process files
echo "Scanning directory: $directory"
echo "Looking for files with extension: $extension"
echo "----------------------------------------"

# Find and process files
find "$directory" -type f -name "*.$extension" 2>/dev/null | while read -r file; do
    if [ -f "$file" ]; then
        # Get file statistics
        lines=$(wc -l < "$file")
        size=$(stat -f %z "$file" 2>/dev/null || stat -c %s "$file" 2>/dev/null)
        ext="${file##*.}"
        
        # Update statistics
        file_stats["$file"]=$lines
        extension_stats["$ext"]=$((extension_stats["$ext"] + 1))
        total_files=$((total_files + 1))
        total_lines=$((total_lines + lines))
        
        # Display verbose information
        if [ "$verbose" = true ]; then
            echo "Processing: $file"
            echo "  Lines: $lines"
            echo "  Size: $size bytes"
            echo "  Extension: $ext"
            echo "----------------------------------------"
        fi
    fi
done

# Print summary
echo -e "\nSummary:"
echo "----------------------------------------"
echo "Total files processed: $total_files"
echo "Total lines: $total_lines"
echo "Average lines per file: $((total_lines / total_files))"
echo -e "\nFiles by extension:"
for ext in "${!extension_stats[@]}"; do
    echo "$ext: ${extension_stats[$ext]} files"
done

echo -e "\nTop 5 largest files by line count:"
for file in "${!file_stats[@]}"; do
    echo "$file: ${file_stats[$file]} lines"
done | sort -rn -k2 | head -n 5

# Check for errors
if [ $total_files -eq 0 ]; then
    echo "Warning: No files were processed"
    exit 1
fi 