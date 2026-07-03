import java.util.concurrent.atomic.AtomicInteger

@Volatile
var counter = AtomicInteger()

fun main() {
    val workers = List(3) { id ->
        Thread {
            repeat(5) {
                counter.incrementAndGet()
                println("worker=$id counter=${counter.get()}")
            }
        }
    }

    workers.forEach { it.start() }
    workers.forEach { it.join() }

    check(counter.get() == 15) {
        "Unexpected total: ${counter.get()}"
    }

    println("Done: ${counter.get()}")
}
