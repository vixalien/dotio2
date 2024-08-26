---
title: Workbench + TypeScript
description: Quickly prototyping and iterating on typesafe GNOME apps.
publish_date: 2024-08-26
tags: [linux]
---

## Prologue

When I started writing [GTK] apps (GTK is a cross-platform toolkit for creating
graphical user interfaces. Particularly common with Linux app developers), I
noticed that writing apps was noticeably more difficult.

From the perspective of a web developer: Writing desktop apps is hard. Not
entirely because the languages used in writing desktop apps are harder, but I'd
argue that it's because of the accomodations and tools web developers have at
their disposal.

### TypeScript

One of such tools that help massively with developer experience in the web
development world is [TypeScript]. It's a programming language introduced by
Microsoft in 2012. It's a superset of JavaScript, but adds static types with
optional type annotations.

This means at a basic level it's just JavaScript, with the added possibility of
adding types to your variables and parameters. So if you had code like this

```js
function sayHello(name) {
  console.log(`Hello ${name}. Your name is ${name.length} characters long.`);
}
```

It would instead become:

```ts
// Notice the `: string`
function sayHello(name: string) {
  console.log(`Hello ${name}. Your name is ${name.length} characters long.`);
}
```

For platform developers, this looks seemingly normal, as most of the languages
they use are probably already typed (C, C++, Rust, and more). But for JavaScript
developers, this was a very novel idea and as you can probably guess, it reduces
the bugs you write in the first place by a huge margin.

In the example above, in the JavaScript code you could pass a number instead of
a string to the `sayHello` function. JavaScript will happily execute that, but
then you will run into bugs sooner or later.

```js
sayHello(12);
// Hello 12. Your name is undefined characters long.
```

TypeScript will easily catch these errors, though:

```ts
sayHello(12);
// ts: Argument of type 'number' is not assignable to parameter of type 'string'.
```

This is just the surface of what's available with TypeScript, but at this point
I think you and me both can see how it massively improves the developer's
experience.

### Developing Desktop apps is hard

Now writing desktop apps is hard. Usually, developers use languages like C to
write apps. One of the first shortcomings I found is that when you are writing
apps this way, you first need to write the desired changes, compile your app and
then run the app to see your changes. This is in sharp contrast with the way web
development works. There is a neat feature called
[Hot Module Replacement][hmr] where the compiler will replace the changed modules in your
code while the application is running, without reloading anything. We don't
(AFAIK) have this feature in GTK app development yet (this was actually supposed
to be my other proposal) but we can achieve something similar with a neat little
app called [Workbench].

### Workbench

![Workbench's main window](/images/posts/workbench-typescript/workbench-main-window.png)

[Workbench] is an app that simply allows you to write the UI interface of your
app, write some accompanying behavior code and with a simple click of the "Run"
button, the UI you are iterating on becomes readily available. When you are done
working on this particular piece of UI, you are supposed to copy the code you've
written into your application, knowing the code will work and hence skipping the
complex iteration loops.

I've used Workbench quite consistently while working on my GTK applications. GTK
(and the underlying libraries) are quite awesome because they allow you to write
apps in a number of different languages (called language bindings). And you can write GTK
apps using your favourite language, whether it's JavaScript, Rust, C, C++,
Python and more. Since I was coming from web development, I chose to use
JavaScript for writing GTK apps as it was quite familiar to me already.

### TypeScript with GTK

But in the GTK app development ecosystem,
[there was a growing interest to write
apps in TypeScript instead of JavaScript][chris-ts-blog] where possible, and I
was intrigued as well. I started using TypeScript instead of JavaScript for my
apps, and loved it. There was one piece missing however, Workbench, the code
playground, still did not support TypeScript. To make my TypeScript code work in
Workbench, I used to compile the TypeScript code into JavaScript, put it in
Workbench, then rewrite the code back into TypeScript for my app. Very
inconvinient.

At some time, I began talking with [Sonny Piers][sonny], and we began talking
about possibly adding TypeScript support to Workbench, to allow developers to
use the language rapidly gaining foothold in the GNOME/GTK app development
arena. This would also help welcome new developers into GNOME, as more and more
web developers are familiar with TypeScript and would provide a familiar
platform language to them.

## GSoC

With that in mind, I wrote a [Google Summer of Code][gsoc] proposal titled "Add
TypeScript Support to Workbench". As early as hitting the "Send" button, I
started working on the project.

### Adding the TypeScript View to Workbench

The first task I ever did was to
[add an option for "TypeScript" in the Workbench app][pr-1]. This was relatively
simple enough in the sense that all it did was add an option to the dropdown at
the top allowing the user to select "TypeScript" as their preferred language.

I used the pre-existing [TypeScript SDK Extension][typescript-sdk] written
Christopher Davis. This SDK Extension provided the `tsc` (TypeScript Compiler)
and `typescript-language-server` executables to the Flatpak environment
Workbench works in.

### Compiling the TypeScript to JavaScript

Even though there was a TypeScript View, the TypeScript code you entered was
simply interpreted as Javascript. This means that you were not able to use
TypeScript language features just yet, and hence the next step to implement
would be to
[compile TypeScript into JavaScript and then
execute the JavaScript code](https://github.com/workbenchdev/Workbench/pull/941)
when you clicked the "Run" button.

This was all trivial thanks to the aforementioned TypeScript SDK Extension. All
we had to do was:

1. Write the TypeScript code into a `main.ts` file.
2. Compile the TypeScript code into a `main.js` file using `tsc`.
3. Import the `main.js` file and then execute it.

With this in place, we had real support for running TypeScript in Workbench.

![TypeScript code running in Workbench](/images/posts/workbench-typescript/typescript-in-workbench.png "Source --- https://floss.social/@sonny/112436298323911287")

### Adding GObject modules types

With that set in place, there was still an issue, and that, the types of
[GObject] modules.

[GObject], or the GLib Object System is is a library providing a portable object
system and transparent cross-language interoperability.
[GObject Introspection][gi] (GI or GIR) is a related library providing access to
typelibs and introspection data which describes C APIs.

Essentialy, this system provides a way to import and use "modules" in many
languages. [Gtk] and many other related libraries like GLib, Pango, Gio are all
GI modules and you import them to use them. For example, here is how you create
a Gtk Label in GJS (GNOME JavaScript):

```js
import Gtk from "gi://Gtk?version=4.0";

const label = new Gtk.Label({
  label: "Hello, World!",
});

// present the label
```

For TypeScript to be useful, we need to provide "TypeScript definition files"
(`.d.ts`) that will essentially tell us the type of the `gi://Gtk?version=4.0`
and other imports. Because these files must be statically available, we need a
way to source them.

#### `gi.ts`

Thankfully for us, there was a project named [gi.ts] by Evan Welsh that did
exactly that. It was a binary that you would execute and point it to a GIR file,
say `/usr/share/gir-1.0/Gtk-4.0.gir` and then it would generate the TypeScript
definition files (`gtk4.d.ts`) and all their dependencies as we needed.

#### `gi-typescript-definitions`

Christopher Davis then created a repository called
[gi-typescript-definitions](https://gitlab.gnome.org/BrainBlasted/gi-typescript-definitions)
where they would regenerate the typescript definition files regularly, and we
would consume the definition files instead of regenerating them ourselves.

#### Adding the TypeScript generation files to Workbench

I hence added `gi-typescript-definitions` as a submodule in Workbench, and
pointed the typescript compiler to these definition files. And with everything
all together, [we now had Typechecking in Workbench][pr-3] and as a side effect,
we had diagnostics and completions too!!

![Type diagnostics and completions in Workbench](/images/posts/workbench-typescript/typechecking-in-workbench.png "Source --- https://floss.social/@sonny/112786875907926117")

### Typechecking with JavaScript??

As it turns out, we could use the new features (diagnostics and completions)
from TypeScript in JavaScript! This is by using a special `jsconfig.json` file
and using the aforementioned `typescript-language-server` for JavaScript files
too, which it supports.

This means
[we got similar diagnostics and completions even for JavaScript!!][pr-4]

![Typechecking Javascript? Heck yeah!!](/images/posts/workbench-typescript/typechecking-javascript.png)

### `ts-for-gir`

Remember the tool named [gi.ts] used to generate typescript definition files I
talked about earlier, turns out there is an exceedingly similar tool named
[ts-for-gir] by Pascal Garber that does the same thing!!

After the developers of both tools noticed the other one, they started working
on [marrying the two projects together][ts-for-gir-gi.ts-marriage] and called
the resulting project `ts-for-gir` v4, which is still in beta at the time of
writing.

I knew that I had to start working on a way to use types generated by this new
version of `ts-for-gir` instead of relying on `gi.ts`, which has now been
archived and hence not receiving updates. So I now have a
[draft PR that switches from `gi.ts` to `ts-for-gir`][pr-5], but the question of
[how we generate the typescript definition files is still unsolved][question-1]
because if you remember correctly, we were using pregenerated typescript
definition files from `gi-typescript-definitions` and now we will need to
generate them ourselves in Workbench. Unfortunately,
[there is currently an issue blocking this][issue-1], but hopefully it will be
resolved soon.

### Porting the demos

Workbench has a huge library of demos, which I would also like to recommend the next
time you need to familiarise yourself with how a certain platform feature works.
The [demos library][demos] has different code samples in various languages:
JavaScript, Vala, Rust and Python.

![Workbench demos library](/images/posts/workbench-typescript/demos.png)

My work would hence be incomplete without
[porting all the JavaScript demos to TypeScript][pr-6], a noticeably complex
task that is currently ongoing.

Because TypeScript compiles into JavaScript, we chose to remove all JavaScript
demos and instead add TypeScript demos, and this way we can compile all the
TypeScript demos into JavaScript at build time, and this way we get both TS and
JS demos for the price of one. Pretty cool, right?

## Wrapping up

I hope you enjoy the TypeScript support in Workbench that will hopefully be
available in the next release, and start writing GNOME apps!! I also hope you liked
this write-up I made about all this and don't hesitate to reach out to me if you
have any questions or feedback.

### Acknowledgements

I would like to thank [Google Summer of Code][gsoc] for providing me with the
opportunity of working on this, and the [GNOME Foundation][gnome] which
administered the programme.

I would like to thank my mentors, Sonny Piers and Andy Holmes for providing me
with unceasing feedback and guidance, I really appreaciate them!!

I would also like to thank Christopher Davis, for their early experimentations
on working with TypeScript on GNOME, `gi-typescript-definitions`, the TypeScript
SDK Extension and many many more. You're awesome!

I would also like to extend my thanks to Pascal Garber, for working on
`ts-for-gir`, their feedback and putting up with me on my wild feature requests
😅.

Finally, let me thank all the other people that helped me in the internship,
from Bharat, a fellow GSoCer to the whole GNOME community for helping me out
when stuck.

Thank you everyone!

[gtk]: https://www.gtk.org/
[typescript]: https://www.typescriptlang.org/
[hmr]: https://webpack.js.org/concepts/hot-module-replacement/
[workbench]: https://apps.gnome.org/Workbench/
[chris-ts-blog]: https://blogs.gnome.org/christopherdavis/2022/08/25/trying-typescript-for-gnome-apps/
[sonny]: https://sonny.re
[gsoc]: https://summerofcode.withgoogle.com/
[typescript-sdk]: https://github.com/flathub/org.freedesktop.Sdk.Extension.typescript
[gobject]: https://docs.gtk.org/gobject/
[gi]: https://docs.gtk.org/girepository/
[gi.ts]: https://github.com/gjsify/gi.ts
[gi-typescript-definitions]: https://gitlab.gnome.org/BrainBlasted/gi-typescript-definitions
[ts-for-gir]: https://github.com/gjsify/ts-for-gir
[ts-for-gir-gi.ts-marriage]: https://github.com/gjsify/ts-for-gir/issues/120
[gnome]: https://gnome.org
[demos]: https://github.com/workbenchdev/demos
[pr-1]: https://github.com/workbenchdev/Workbench/pull/938
[pr-2]: https://github.com/workbenchdev/Workbench/pull/941
[pr-3]: https://github.com/workbenchdev/Workbench/pull/946
[pr-4]: https://github.com/workbenchdev/Workbench/pull/972
[pr-5]: https://github.com/workbenchdev/Workbench/pull/979
[pr-6]: https://github.com/workbenchdev/demos/pull/201
[question-1]: https://github.com/workbenchdev/Workbench/pull/979#issuecomment-2299187978
[issue-1]: https://github.com/workbenchdev/Workbench/issues/980
