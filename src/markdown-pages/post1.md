---
slug: "/blog/post1"
date: "2019-05-04"
title: "Coroutine introduction"
author : "Sushobh Nadiger"
---


One can think of a coroutine as a light-weight thread. Like threads, coroutines can run in parallel, wait for each other and communicate. The biggest difference is that coroutines are very cheap, almost free: we can create thousands of them, and pay very little in terms of performance. True threads, on the other hand, are expensive to start and keep around. A thousand threads can be a serious challenge for a modern machine.

So, how do we start a coroutine? Let's use the **launch {}** function:

```kotlin
println("Start")

// Start a coroutine
GlobalScope.launch {
    delay(1000)
    println("Hello")
}

Thread.sleep(2000) // wait for 2 seconds
println("Stop")
```
&nbsp;


Here we start a coroutine that waits for 1 second and prints Hello.

We are using the delay() function that's like Thread.sleep(), but better: it doesn't block a thread, but only suspends the coroutine itself. The thread is returned to the pool while the coroutine is waiting, and when the waiting is done, the coroutine resumes on a free thread in the pool.