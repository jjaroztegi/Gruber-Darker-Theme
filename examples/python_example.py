#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import sys
from typing import List, Dict, Optional, Union, Tuple
import numpy as np
import pandas as pd
from dataclasses import dataclass

# Constants
MAX_ATTEMPTS = 3
DEFAULT_TIMEOUT = 30.0
SUPPORTED_FORMATS = ["json", "csv", "xml"]

# Class definition
class DataProcessor:
    """
    A class for processing different types of data.
    
    Attributes:
        data_path (str): Path to the data file
        verbose (bool): Whether to print verbose output
    """
    
    def __init__(self, data_path: str, verbose: bool = False):
        self.data_path = data_path
        self.verbose = verbose
        self._data = None
        self._processed = False
    
    @property
    def data(self) -> Union[pd.DataFrame, None]:
        """Get the processed data."""
        if not self._processed:
            self.process_data()
        return self._data
    
    def process_data(self) -> None:
        """Process the data from the specified file."""
        if self.verbose:
            print(f"Processing data from {self.data_path}")
        
        file_ext = os.path.splitext(self.data_path)[1][1:].lower()
        
        if file_ext not in SUPPORTED_FORMATS:
            raise ValueError(f"Unsupported file format: {file_ext}")
        
        try:
            if file_ext == "csv":
                self._data = pd.read_csv(self.data_path)
            elif file_ext == "json":
                self._data = pd.read_json(self.data_path)
            else:  # xml
                self._data = pd.read_xml(self.data_path)
            
            self._processed = True
            
        except Exception as e:
            print(f"Error processing data: {e}")
            raise
    
    def filter_data(self, conditions: Dict) -> pd.DataFrame:
        """
        Filter data based on specified conditions.
        
        Args:
            conditions: Dictionary of column-value pairs for filtering
            
        Returns:
            Filtered DataFrame
        """
        if self.data is None:
            return None
        
        filtered_data = self.data.copy()
        
        for column, value in conditions.items():
            if column in filtered_data.columns:
                filtered_data = filtered_data[filtered_data[column] == value]
        
        return filtered_data

    def __str__(self) -> str:
        """String representation of the DataProcessor."""
        status = "Processed" if self._processed else "Not processed"
        return f"DataProcessor({self.data_path}, {status})"


# Dataclass example
@dataclass
class AnalysisResult:
    mean: float
    median: float
    std_dev: float
    sample_size: int
    outliers: List[float]


# Function with type hints
def analyze_numeric_data(data: List[float], 
                        remove_outliers: bool = False) -> AnalysisResult:
    """
    Analyze numeric data and return statistics.
    
    Args:
        data: List of numeric values
        remove_outliers: Whether to remove outliers before analysis
        
    Returns:
        AnalysisResult with statistics
    """
    if not data:
        return AnalysisResult(0.0, 0.0, 0.0, 0, [])
    
    # Convert to numpy array for analysis
    np_data = np.array(data)
    
    # Identify outliers (values > 3 std devs from mean)
    mean = np.mean(np_data)
    std_dev = np.std(np_data)
    outlier_threshold = 3 * std_dev
    outliers = [x for x in data if abs(x - mean) > outlier_threshold]
    
    # Remove outliers if requested
    if remove_outliers and outliers:
        clean_data = [x for x in data if x not in outliers]
        np_data = np.array(clean_data)
        mean = np.mean(np_data)
        std_dev = np.std(np_data)
    
    return AnalysisResult(
        mean=float(mean),
        median=float(np.median(np_data)),
        std_dev=float(std_dev),
        sample_size=len(np_data),
        outliers=outliers
    )


# Conditional and loop examples
def process_multiple_files(directory: str) -> Dict[str, AnalysisResult]:
    """Process all supported files in a directory."""
    results = {}
    
    if not os.path.isdir(directory):
        raise ValueError(f"Not a valid directory: {directory}")
    
    for filename in os.listdir(directory):
        file_path = os.path.join(directory, filename)
        
        # Skip directories and unsupported files
        if os.path.isdir(file_path):
            continue
            
        ext = os.path.splitext(filename)[1][1:].lower()
        
        if ext not in SUPPORTED_FORMATS:
            continue
        
        try:
            processor = DataProcessor(file_path)
            processor.process_data()
            
            if processor.data is not None and 'value' in processor.data.columns:
                values = processor.data['value'].dropna().tolist()
                results[filename] = analyze_numeric_data(values)
                
        except Exception as e:
            print(f"Error processing {filename}: {e}")
    
    return results


# Main function
def main():
    """Main entry point for the script."""
    if len(sys.argv) < 2:
        print("Usage: python script.py <data_directory>")
        sys.exit(1)
    
    data_dir = sys.argv[1]
    
    try:
        results = process_multiple_files(data_dir)
        
        for filename, result in results.items():
            print(f"\nResults for {filename}:")
            print(f"  Mean: {result.mean:.2f}")
            print(f"  Median: {result.median:.2f}")
            print(f"  Standard Deviation: {result.std_dev:.2f}")
            print(f"  Sample Size: {result.sample_size}")
            print(f"  Outliers: {result.outliers}")
            
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()