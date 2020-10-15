---
slug: "/blog/post2"
date: "2019-05-04"
title: "RecyclerView tutorial"
author : "donald"
---

# How to use a recyclerview?

Create an adapter and inflate view to use it !!!

```java

 recyclerView = findViewById<RecyclerView>(R.id.my_recycler_view).apply {
            // use this setting to improve performance if you know that changes
            // in content do not change the layout size of the RecyclerView
            setHasFixedSize(true)

            // use a linear layout manager
            layoutManager = viewManager

            // specify an viewAdapter (see also next example)
            adapter = viewAdapter

        }

```