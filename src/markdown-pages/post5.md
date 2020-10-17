---
slug: "/blog/coroutines-sense"
date: "2019-12-28"
title: "How i made sense of coroutines - Part 1"
author : "sushobh"
---

No, this article is not going to describe what co routines are and what suspend functions are. Nor will it add a bunch of co routine code samples that you can find elsewhere on the internet. What this is about however is my crude journey into understanding how actually co routines make things so simple, what exactly happens when you call a **suspend** function and what exactly the Oft repeated phrases _stopping and resuming_ a **suspend** function mean.
<br/>
<br/>
Trying to make code look simple while executing background threads has been a favorite pastime of mine. When i started building Android apps , the first way of executing work on background threads that i came across was that of [**AsyncTask**](https://developer.android.com/reference/android/os/AsyncTask). In **AsyncTask** you had to implement multiple methods in order to switch between the background thread and the main thread. In case you have forgotten here is what it looked like,
<br/>
<br/>
```java

 private class DownloadFilesTask extends AsyncTask<URL, Integer, Long> {
     protected Long doInBackground(URL... urls) {
         return 0;
     }

     protected void onProgressUpdate(Integer... progress) {
         setProgressPercent(progress[0]);
     }

     protected void onPostExecute(Long result) {
        
     }
 }

```
<br/>
<br/>


As you can see it clearly is not something that is easy on the eye. Just a little thing though , save a snapshot of the above code sample in your mind and later on in the article you will see how co routines actually accomplish something similar under the hood.
<br/>
<br/>
About a year and a half ago , i started to work with RXJava. I had known of RXJava from the very beginning of my Software career (around 2016) but i had always hesitated to use it because of how alien its code samples looked like. **FlatMap, Single, Flowable, Zip**  and other obscure terms had then played a vital role in preventing me from actually using it. But then, when you have nothing better to do , you end up tackling previously ignored challenges and thats exactly what i did. I started working with RXJava, used it in my projects and sort of become an evangelist for its use.
<br/>
<br/>
At present , i have no plans of stopping the use of RXJava and instead intend to learn about the RX operators that i have not used yet and introduce them into my code. However when you are a Software developer , you always have to keep updating your arsenal of skills and in the process you end up learning new things without actually trying to and it so happened that i started learning Kotlin just because it was what everyone was doing.
<br/>
<br/>
Ok hold on , i resent where this article is going and i will no longer recount what happened in the past. Lets just dive right into what i learned over the past few days (Trust me Dear reader, newbie to newbie, what i learned is quite simple to understand but is very enlightening). The below piece of code starts a blocking co routine which will wait till all of the co routines it has launched end. In the **backgroundStuff** method , we start a thread , sleep for two seconds and call the **resumeWith** method with a message which then takes us back to the main thread where we print the message.
<br/>
<br/>
```kotlin
fun main() = runBlocking{
    launch {
        val message = backgroundStuff()
        println("Back Inside Main Thread and obtained a message => "+message)
    }
    println("Inside Main Thread ")
}

suspend fun backgroundStuff() = suspendCoroutine<String> {
    Thread {
        Thread.sleep(2000)
        println("Inside a background Thread "+Thread.currentThread().name)
        it.resumeWith(Result.success("Hello from a different thread"))
    }.start()
}

/*
  Inside Main Thread 
  Inside a background Thread Thread-0
  Back Inside Main Thread and obtained a message => Hello from a different thread
*/
```
<br/>
<br/>


If you are me three or four days ago , you would be nodding your head because its quite apparent whats happening when you look at the code. Basic Co routine stuff right? Yeah maybe with a niggling caveat. What is a [suspendCoroutine](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.coroutines.experimental/suspend-coroutine.html) by the way? And what is the **cont** object here that you are calling the **resumeWith()** method on? Most examples online don't mention it so why would i choose it to get started with? Its probably because it reminds me of JavaScript [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) and i didn't have a pretty tough time understanding them.
<br/>
<br/>
Lets go through the documentation for [suspendCoroutine](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.coroutines.experimental/suspend-coroutine.html) first and see what it has to say. There is a little more on the documentation site but this should be enough for now.

<br/>

**Statement 1**

> Obtains the current continuation instance inside suspend functions and suspends currently running 
  coroutine.

  So what is continuation and what is the currently running co routine? To get the official view on the
   matter lets check out the documentation for [Continuation](https://kotlinlang.org/api/latest/jvm/stdlib/
   kotlin.coroutines.experimental/-continuation/index.html)

<br/>

**Statement 2**

> interface Continuation<in T>
> 
> Interface representing a continuation after a suspension point that returns value of type T

<br/>

Now lets try to map the two statements to our code snippet. In statement one there is mention of _current continuation_ , think of it like a remote control to a **{set of code statements}** which is under the ownership of a thread. There is also the mention of _currently running coroutine_ , think of it like the one among many sets of **{set of code statements}** that a thread owns a remote control for. Lets see how that works using this snippet.
<br/>
<br/>
When we call **_backgroundStuff()_**, which happens to be a [suspendCoroutine](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.coroutines.experimental/suspend-coroutine.html), we are effectively losing the remote control to the **partial set** of coding statements that follow **_backgroundStuff() ,_** i.e **{line3}.** We lose the remote control and the suspend function takes control of it.
<br/>
<br/>


```kotlin
 launch {
        val message = backgroundStuff()
        println("Back Inside Main Thread and obtained a message => "+message)
 }
 println("Inside Main Thread ")
```
<br/>
<br/>

In here , our dear friend who now has the remote control, decides to chill for two seconds then cede control of the remote back to our Thread by calling the **resumeWith()** method with a message. We can think of _cont_ aka _continuation as_ the object that's passed to suspendCoroutine so that it has a means of communicating its end to its original owner.

<br/>
<br/>

```kotlin
suspend fun backgroundStuff() = suspendCoroutine<String> { cont ->
    Thread {
        Thread.sleep(2000)
        println("Inside a background Thread "+Thread.currentThread().name)
        cont.resumeWith(Result.success("Hello from a different thread"))
    }.start()
}

```

<br/>
<br/>

This back and forth explains, why the main thread goes on to print


> println(Inside Main Thread )

without having to wait for **_backgroundStuff()._** Its because **it never lost control over the “set” or “sets” outside of the coroutine** It only lost control over the **partial set** that immediately follows the invocation of a _suspendCoroutine_.
<br/>
<br/>
Now go through **Statement 1** and **Statement 2 ,** they now actually do make sense.
<br/>
<br/>

**Statement 1 :** It says , the suspendingCoroutine, grabs the remote control from its owner and prevents it from executing the statements that immediately (i.e a **partial set)** follow the invocation of suspendingCoroutine.
<br/>
<br/>

**Statement 2 :** It says , that the Continuation interface represents the remote control to the set of statements that follow suspension point. The suspension point being the line where the suspendingCoroutine was invoked.
<br/>
<br/>

One more thing , if we are using the suspend keyword for the **_backgroundStuff()_** method but actually suspending a coroutine elsewhere whats the point of suspend? The coroutine block (which is basically a function) that we suspended and resumed later itself is earmarked as **suspend,** take a look at the source code of launch. You can see that launch is a higher order function that takes a function as a parameter for the parameter named block, the function being the co routine.
<br/>
<br/>

```kotlin
public fun CoroutineScope.launch(
    context: CoroutineContext = EmptyCoroutineContext,
    start: CoroutineStart = CoroutineStart.DEFAULT,
    block: suspend CoroutineScope.() -> Unit //This right here!
): Job {
    val newContext = newCoroutineContext(context)
    val coroutine = if (start.isLazy)
        LazyStandaloneCoroutine(newContext, block) else
        StandaloneCoroutine(newContext, active = true)
    coroutine.start(start, coroutine, block)
    return coroutine
}

```
<br/>
<br/>


What if we had not used a **_suspendCoroutine_** , and instead used a plain function? That's a logical question since we aren't actually suspending the **_backgroundStuff()_** method right? Something like this maybe?

<br/>
<br/>

```kotlin
suspend fun backgroundStuff() {
    Thread {
        Thread.sleep(2000)
        println("Inside a background Thread "+Thread.currentThread().name)
       // it.resumeWith(Result.success("Hello from a different thread"))
    }.start()
}

```

<br/>
<br/>

If we run this we get this output.

> Inside Main Thread  
> Back Inside Main Thread and obtained a message => kotlin.Unit  
> Inside a background Thread Thread-0

<br/>
<br/>

The main thread no longer waits for the function to execute and instead carries on with its duties. That is not what we want and does not meet our requirements. You would probably have to pass a callback to the **_backgroundStuff()_** method and kick start another ugly callback hell.
<br/>
<br/>

That's pretty much how i imagine promises to work and suspendCoroutines work in the same manner. So that was quite easy for me to understand , but we don't often come across suspendCoroutines do we? What about **suspend** functions and all of its convoluted friends that keep popping up whenever you venture to read about co routines? Do they work in the same manner? Yes. With a lot of assistance from the Kotlin compiler though and thatΓÇÖs what makes they seem like unfriendly aliens that do not want you to use them. We will see how they work in the next part of the series. In the next part i will unpack the rest of the stuff that i have learnt and will attempt to come up with cool diagrams that will assist us in getting rid of any remaining ambiguity that we may have on co routines.
<br/>
<br/>
**Thanks for reading** and let me know if you have anything to say or point out!
<br/>
<br/>
