#!/bin/bash
# Bash script example - Gruber Darker theme (comments)

#-------------------------------------------------------------------------------
# Script Name: process_files.sh
# Description: This script processes files in a given directory.
#              It iterates through each file and performs a simple action.
#-------------------------------------------------------------------------------

# --- Configuration section ---
# Define the directory to process
directory="$1"  # Takes the directory as the first command line argument

# Check if a directory argument is provided
if [ -z "$directory" ]; then
  echo "Error: Please provide a directory as an argument."
  echo "Usage: ./process_files.sh <directory_path>"
  exit 1 # Exit with error code
fi

# Check if the provided directory exists and is a directory
if [ ! -d "$directory" ]; then
  echo "Error: Directory '$directory' does not exist or is not a directory."
  exit 1 # Exit with error code
fi

# --- Processing section ---
echo "Processing files in directory: $directory"

# Loop through each file in the specified directory
find "$directory" -maxdepth 1 -type f -print0 | while IFS= read -r -d $'\0' file; do
  # -maxdepth 1:  Only look in the current directory, not subdirectories.
  # -type f:     Only process files (not directories).
  # -print0:    Prints filenames separated by null characters (safer for filenames with spaces).
  # IFS= read -r -d $'\0' file: Reads null-separated filenames into the 'file' variable.

  echo "--- Processing file: '$file' ---"

  # Example action: Print the filename and file size
  filename=$(basename "$file") # Extract filename from path
  filesize=$(stat -c %s "$file") # Get file size in bytes

  echo "  Filename: $filename"
  echo "  Size: $filesize bytes"

  # Add your file processing logic here.
  # For example, you could use commands like:
  # grep, sed, awk, cat, etc.
  # Example: grep "keyword" "$file"

  echo "--- File processing complete ---"
  echo "" # Empty line for separation

done

echo "File processing finished for directory: $directory"

exit 0 # Exit script successfully