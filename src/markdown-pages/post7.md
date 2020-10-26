---
slug: "/blog/ui-thread-communications"
date: "2020-10-21"
title: "Effective way to Send data from background thread to Main/UI thread"
author : "Tushar Pingale"
---


While working on android, At any certain point of time you must be stuck while doing heavier operations. Since android by default runs all the code on the main thread and if you do any heavier operation on the main thread, the UI basically skips frames, and you will see a lag in the App. 

<br>Now lets start how can we overcome this issue. There are main effective solution to overcome this, but for now we will go the handler solution.

<br>

**What is a Handler?**

<br>

By Android Developer Documentation, A Handler allows you to send and process Message and Runnable objects associated with a thread's MessageQueue.

<br>

In simple terms it allows you to execute your code (**Message Object**) When a looper (**Responsible to pick message from the queue of messages in FIFO manner and executes them using Handler**) loops into the message queue.

<br>

Let's see some code :P

<br>

**Step 1**

Let's assume you are doing some heavy operation in your thread

<br> 

```kotlin

    Thread{
            val bundle = Bundle()
            for (i in 1..10) {
                bundle.putString(MESSAGE_KEY, "Update on UI $i")
                Message().also {
                    it.data = bundle
                    handler.sendMessage(it)
                }
            }
            bundle.putString(MESSAGE_KEY, "All done!")
            Message().also {
                it.data = bundle
                handler.sendMessage(it)
            }
        }.start()

```
<br> 

**Step 2**

Define a handler in your Activity/Fragment.

<br>

You need to get Looper.getMainLooper() and override handleMessage(msg: Message) where you will get the data from the background thread, and you can update the UI.

<br> 

```kotlin

companion object{
    const val MESSAGE_KEY = "message_key"
}

private val handler = object : Handler(Looper.getMainLooper()) {
        override fun handleMessage(msg: Message) {
            //You will receive data from thread in the form on Message
            //You can pass bundle inside a message object
            val bundle = msg.data
            val message = bundle?.getString(MESSAGE_KEY)
            //Update your UI Here.....
            log(message ?: "message was null")
        }
    }
```

<br>

That's it! Now you can effectively update UI from the Background thread. 



