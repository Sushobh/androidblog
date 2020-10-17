---
slug: "/blog/detect-memory-leak"
date: "2019-02-18"
title: "Detecting Memory Leaks in Android Studio using the Android Profiler."
author : "sushobh"
---


<br/>
<br/>
<p align="center">
  <img src="https://miro.medium.com/max/700/1*fxupsmj_jD1PE3QJpfZJ8Q.png" />
</p>
<br/>
<br/>

In this article i will be discussing memory leaks in Android and how you can detect them easily using the Android profiler which will help you find objects in memory.
I think of Memory leaks as the presence of useless objects which continue to exist despite there being no need for them.
But before we begin here is what **Shallow Size** and **Retained Sizes** mean
<br/>
<br/>
**Shallow size** of an object is the amount of memory allocated to store the object itself, not taking into account the referenced objects.
<br/>
<br/>
**Retained size** of an object is its shallow size plus the shallow sizes of the objects that are accessible, directly or indirectly, **only** from this object.
<br/>
<br/>

Lets take a simple example. We have two activities , in the first activity there is an **AsyncTask** which is started in the **onCreate** method. When a button is clicked the first activity is finished and a new activity is opened.

<br/>
<br/>

```java
public class FirstActivity extends AppCompatActivity {


    StupidAsyncTask stupidAsyncTask;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_first);

        stupidAsyncTask = new StupidAsyncTask(this);
        stupidAsyncTask.execute();
    }

    public void goToSecondActivity(View view) {
       // stupidAsyncTask.cancel(true);
        startActivity(new Intent(this,SecondActvity.class));
        finish();
    }
}
```
<br/>
<br/>

Here is the **AsyncTask**

<br/>
<br/>

```java
public class StupidAsyncTask extends AsyncTask<Void,Void,Void> {

    public static final int SECONDS_TO_RUN = 500;
    Context mContext;

    public StupidAsyncTask(Context mContext) {
        this.mContext = mContext;
    }

    @Override
    protected Void doInBackground(Void... voids) {

       try{
           for(int i = 0;i<SECONDS_TO_RUN;i++){
               Log.i("StupidAsyncTask","Have ran for "+i+" so far");
               Thread.sleep(1000);
           }
       }
       catch(InterruptedException e){
           e.printStackTrace();
       }

        return null;
    }
}
```

<br/>
<br/>

The **AsyncTask** mimics the behaviour of a long running task. On click of a button , the second activity is started. You may have noticed that i have commented the line which would have cancelled the AsyncTask. I have done this to cause a memory leak. Here is the memory dump when we are in the first activity
<br/>
<br/>
<p align="center">
  <img src="https://miro.medium.com/max/700/1*yuuIyRtvhfmNjmvBayyQEQ.png" />
</p>
<br/>
<br/>

and here is the memory dump after the second activity is started. Remember that we did not cancel the **AsyncTask**.

<br/>
<br/>
<p align="center">
  <img src="https://miro.medium.com/max/700/1*p_6s882XCdCmJv3OTTCnAA.png" />
</p>
<br/>
<br/> 

As you can see the , the First Activity continues to exist and its **retained size** has actually increased because we failed to cancel the async task. Now if we uncomment the line which cancels the async task before we start the s**econd activity** we get this memory dump.
<br/>
<br/>

<p align="center">
  <img src="https://miro.medium.com/max/700/1*uoTYjYK3GNg46D4cxXCiSQ.png" />
</p>
<br/>
<br/>


The retained size is negligible in this case. Cancelling the **AsyncTask** saves the memory leak because the **AsyncTask** no longer has access to the **context i.e.** the **Activity.**
<br/>
<br/>
That is it for this article. Thanks for reading and do not forget to post a comment if you want to give feedback.
