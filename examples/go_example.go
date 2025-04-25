package main

import (
	"fmt"
	"time"
)

// Worker represents a task processor
type Worker struct {
	id      int
	jobs    chan int
	results chan int
}

// NewWorker creates a new worker
func NewWorker(id int, jobs chan int, results chan int) *Worker {
	return &Worker{
		id:      id,
		jobs:    jobs,
		results: results,
	}
}

// Start begins processing jobs
func (w *Worker) Start() {
	go func() {
		for job := range w.jobs {
			fmt.Printf("Worker %d processing job %d\n", w.id, job)
			time.Sleep(100 * time.Millisecond) // Simulate work
			w.results <- job * 2
		}
	}()
}

func main() {
	const numJobs = 5
	const numWorkers = 3

	jobs := make(chan int, numJobs)
	results := make(chan int, numJobs)

	// Start workers
	for i := 1; i <= numWorkers; i++ {
		worker := NewWorker(i, jobs, results)
		worker.Start()
	}

	// Send jobs
	for i := 1; i <= numJobs; i++ {
		jobs <- i
	}
	close(jobs)

	// Collect results
	for i := 1; i <= numJobs; i++ {
		result := <-results
		fmt.Printf("Result: %d\n", result)
	}
}
