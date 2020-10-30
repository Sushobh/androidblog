---
slug: "/blog/jetpack-compose"
date: "2020-10-30"
title: "RecyclerView in Jetpack Compose"
author : "raj"
---


<br/>
<br/>
<p align="center">
  <img src="/images/post8/image1.jpeg" style="height : 500px ; width : 800px"/>
</p>


<br/>
<br/>

Right from it's inception <a href="https://developer.android.com/jetpack/compose">**Jetpack Compose**</a> has received a lot of attention. Every Android Developer is hooked to it's advancement and why not? The way **Google's** promoting it, no doubt they're aiming for **Compose** to become a defacto standard in native Android UI development.


<br/>
<br/>



**Jetpack Compose** is a next generation UI toolkit written entirely in **Kotlin**. It promotes the principle of declarative UI model over the imperative one. Since it provides a new way of creating UI, some of the most used classes from Android world are missing from it. e.x `RecyclerView`. 


<br/>

# What? how in the world am I supposed to create it then?

<br/>

Don't worry, in this article we'll create our very own `RecyclerView` with **Compose**, right from scratch that too in just half the amount of lines that it used to take for the non-compose one.

<br/>

# Prerequisites
<br/>

Before moving ahead, make sure the environment is setup for Compose. Just follow the steps provided below

[JetPack Compose Setup](https://developer.android.com/jetpack/compose/setup)
<br/>


Once we are all done with setup for Compose, we are ready to rock n roll. We will create a very simple `RecyclerView` which displays a list of User.
<br/>
<br/>

# Step 1: Creating the Row Item Card

<br/>

Our Row Item Card would be a simple one. It would have an `Image` for profile picture of the User and two `Text` to display username and some relevant info respectively. Let's see the code for it.

<br/>

```java
@Composable
private fun UserRow(user: String) {

    Card(
        shape = RoundedCornerShape(8.dp),
        backgroundColor = MaterialTheme.colors.surface,
        modifier = Modifier.padding(8.dp),
        elevation = 4.dp
    ) {
        Row(
            modifier = Modifier.fillMaxWidth().padding(8.dp).height(60.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {

            val imageModifier = Modifier.padding(start = 8.dp).preferredSize(50.dp).clip(shape = CircleShape)
            val image = loadImageResource(id = R.drawable.header)

            image.resource.resource?.let { img ->
                Image(
                    asset = img,
                    modifier = imageModifier,
                    contentScale = ContentScale.Crop
                )
            }

            Column(modifier = Modifier.padding(start = 16.dp)) {
                Text(
                    text = user,
                    fontWeight = FontWeight.SemiBold,
                    style = MaterialTheme.typography.h6,
                    fontSize = 16.sp
                )
                
                Text(
                    text = user,
                    style = MaterialTheme.typography.body2,
                    maxLines = 1
                )
            }

        }
    }
}
``` 
</p>
<br/>
<br/>

## Let me walk you through this code

<br/>


1. `UserRow()` is a normal kotlin function responsible for creating the UI elements of the Row Item Card. It accepts a `User` as parameter and returns `Unit`. We annotate this function with `@Composable` just to tell Compose compiler that this function will create UI. Every function which is intended for creation of UI must be annotated with `@Composable`. Furthermore, a composable function can only be called from another composable function.

<br/>

2. `Card()` again is just a composable function provided by the Compose. The `Card()` is responsible for creating an UI element which resembles `CardView`. Although most of the function parameters are self explanatory, the <a href="https://developer.android.com/jetpack/compose/layout#modifiers">`modifier`</a> is a special one, it allows you to decide how your UI element would be presented. You can control elements height, width, position, appearance, make it clickable, draggable, etc with the help of `Modifier`.

<br/>

3. <a href="https://developer.android.com/reference/kotlin/androidx/compose/foundation/layout/package-summary#row">`Row`</a> is a composable layout that places its children in a horizontal sequence. It's much like a `LinearLayout` with `orientation = horizontal`.With `verticalAlignment = Alignment.CenterVertically` we make sure that all the childrens inside `Row` are vertically central.

<br/>

4. `Image()` is compose way of creating an `ImageView`. I'm loading an `R.drawable.header` image file, which is already stored in my drawable folder, you can add any random image to your drawable folder and import it here. `loadImageResource()` is an predefined async way of loading `ImageAsset`, make sure to load your images in an async fashion or else you'll be left with a jittery and lagging UI.

<br/>

5. <a href="https://developer.android.com/reference/kotlin/androidx/compose/foundation/layout/package-summary#column">`Column`</a> is again a composable layout that places its children in a vertical sequence. It's similar to `LinearLayout` with `orientation = vertical`.

<br/>

6. `Text()` is compose way of creating an `TextView`. For brevity I'm displaying the same information in both the `Text()`,but you can easily swap the content to display any other text.

<br/>


<br/>
<br/>

# Step 2: Creating the RecyclerView

<br/>


 Since we are done with creating the Row Item Card, we are only left with populating our `RecyclerView` with our Row Item. Here's the code for it,

 <br/>

 ```java
@Preview
@Composable
private fun UserList() {
    val userList = listOf("Ronaldhino","Ronaldo","Messi","DeBruyne","Sunil Chhetri","Ozil","Modric","Alves","Marcelo","Maldini","Bonucci","Neuer")
    LazyColumnFor(items = userList) { user ->
        UserRow(user = user)
    }
}
 ```


<br/>
<br/>

Yes, that's it, this is all you need to populate your `RecyclerView`. No complex `Adapter` or extra setup. Let's see quickly whats happening

<br/>



1. The function `UserList()` is annotated with `@Compose` as it is a composable function, but it is also annotated with <a href="https://developer.android.com/jetpack/compose/preview">`@Preview`</a>. What `@Preview` does is, it previews your UI right inside the Android Studio, everytime you tweak some UI changes inside this, Compose will rebuild and preview the changes in Android Studio. 

 <br/>

2. `LazyColumnFor()` is the Compose version of a `RecyclerView`. The lambda passed is similar to a `RecyclerView.ViewHolder`. In the parameter we pass the list of `Users` which we wanna display, and inside the lambda we pass the `UserRow` Row Item Card which we created in Step 1.

 <br/>

<br/>
<br/>

# Step 3: The Final Call

<br/>



All we are left with is calling this `UserList()` function from our **onCreate** of `MainActivity` and hurray!!, we have created a beautiful `RecyclerView` in **Compose**. Here's the final setup,

<br/>


```java
override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MyExampleAppTheme(darkTheme = false) {
                Surface(color = Color.White) {
                    Scaffold(
                        topBar = {
                            TopAppBar(
                                title = {
                                    Text(
                                        text = "MyExampleApp",
                                        fontSize = 24.sp
                                    )
                                },
                                backgroundColor = purple700,
                                elevation = 12.dp
                            )
                        },
                        bodyContent = { UserList() } 
                    )
                }
            }
        }
    }
```

<br/>
<br/>

Now, wasn't that easy? just imagine the amount of code and all the trouble we used to bear while creating an `RecyclerView` the old way. **Jetpack Compose** is breathe of fresh air in Android UI development, although still in alpha stage, it promises to hold a lot of potential. For further reference please visit the offical docs of [**Jetapck Compose**](https://developer.android.com/jetpack/compose).

That's it for today, I'll keep on bringing new stuff every now and then, until then *Alvida*.

<br/>
<br/>

