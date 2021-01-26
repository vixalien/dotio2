# vixalien.io (2)

vixalien.io is my personal site, built with JSX (not react), compiled with [explosiv] and hosted on [vercel], but most importantly, built from scratch.

> This site is a rewrite of [dotio], which was built with react and rollup and whatnot, rendering it very unstable and imperformant. By rewriting it in [explosiv], not only was it faster, more performant, but also relatively more stable. And most importantly, the JSX syntax was preserved! Thanks for [kartiknair] for creating [dhow], on which [explosiv] is based! 😲😲

## links

- source code: [github]
- web site: [click]

## installation

> Before running please set the environment variable `URL` or else it wil crash. If deploying locally, you can do that by creating a `.env` file at the root and adding `URL=http://localhost:3000`.

vixalien.io is a custom-made site, yet running is very easy

```bash
npm run build
```

> If all goes well, you will see the generated static site at `_static`. That command also built `js` files and `stylus` files before building with explosiv.

If you want to see the results live, run

```bash
npm run dev
```

The site will go live at [localhost].

## contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## license

- source: [mit]  copy, distribute and mess with source freely
- content: [mpl] aka mozilla public license which means it is copyrighted and requires attribution.

[click]: https://dotio2.vercel.app/
[localhost]: https://localhost:3000
[dotio]: https://github.com/vixalien/dotio
[github]: https://github.com/vixalien/dotio2
[explosiv]: https://github.com/vixalien/explosiv
[rollup]: https://rollupjs.org/guide/en/
[vercel]: https://vercel.com/
[mit]: https://choosealicense.com/licenses/mit/
[mpl]: https://choosealicense.com/licenses/mpl-2.0/

[kartiknair]: https://github.com/kartiknair
[dhow]: https://github.com/kartiknair/dhow