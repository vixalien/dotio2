---
title: Visit to Burundi
description: Me and my family went to visit Burundi. Here's my impressions.
publish_date: 2023-06-18
og:image: /images/posts/burundi/flags.webp
tags: travel
---

So yea, all is in the title.

Since Burundi is a neighbor to Rwanda, which is where I live, my family figured we could go visit, especially also since many people say it's a country similar to Rwanda in many ways since they are almost the same size, about equal population and a bit of a common history.

We actually visited back in April, but now I want to start a picture blog, hugely inspired by https://www.tema.ru/eng/travel/.

## Day 1

### Entry

We entered via the border in Bugesera, and checking in was very easy and seamless. The border is on the Rwandan side and had a lot of people trying to cross through. Didn't take many pictures here.

![The flag on the left is Burundi's, the other was mysterious and we found out the meaning later so you'll have to wait too!](/images/posts/burundi/bugesera.webp)

### Ngozi

We slept at Ngozi, since we slacked a bit at the road and couldn't reach Gitega on time, which was where we wanted to go.

![We stayed at a nice little hotel which had some barbed wire fence ?? a tall guard post and some other fortifications ??? It looked like it was a former mansion for some person of high status, but I didn't ask.](/images/posts/burundi/ngozi.webp)

## Day 2

### Journey to Bujumbura

Was time to head south right to Bujumbura. We decided to skip Gitega because it was too far.

There were a lot of insignia on the road and flags with eagles, which I learnt were the insignia of the ruling party, which won a recent civil war recently.

### The city of Bujumbura

Bujumbura was previously known as "Usumbura" and used to be the capital of "Ruanda-Urundi" which the name of the Belgian colony that existed before 1962. It was the capital of Burundi after independence, but was moved to Gitega in 2018.

![We arrived to Bujumbura after a few hours, and it's in a swamp which is weird because it's flat and admittely most of Rwanda is hilly](/images/posts/burundi/bujumbura-view.webp)

The first thing I noticed off the bat is that Bujumbura has quite a lot of rubble and empty buildings, which is admittely because it is no longer the capital (Gitega is now) so all the government buildings had to migrate. I noticed it right away because Rwanda is so obssesed with cleanliness lol :\)

![One of the numerous "squares" in Bujumbura. Most of them have the country's past rulers' sculptures or just a stone block, like this one](/images/posts/burundi/bujumbura-square.webp)

![A broken down car in the middle of the city](/images/posts/burundi/broken-down-car.webp)

![Burundians love their flags and love to display them](/images/posts/burundi/flags.webp)

The flags in order: 

1. The flag of the Unity of (the 3 ethnicities) of Burundians.
2. The flag of the East African Community (Jumuiya ya Afrika Mashariki)
3. The flag of Burundi
4. The flag of the Holy See

> Note: Rwanda has the same ethnicites (Hutu, Tutsi and Twa) but they have been abolished and now everyone is Rwandan instead (because of the 1994 Genocide against the Tutsi)

### The Tanganyika

Tanganyika is a huge lake that borders Burundi, Tanzania and the DRC. It's important to Burundi as there are some fish that people say are tasty (not for me, though).

![There are a few beaches and there is way too much sand because the lake had a tide](/images/posts/burundi/beach.webp)

![Tanganyika was quite angry that day, and it was dirty because of a nearby river (Rusizi) that was flooded](/images/posts/burundi/tanganyika.webp)

## Day 3

### Museé Vivant

We visited the "Museé Vivant" which is a fancy name for a zoo. They had a lot of animals back there and it was interesting since in Rwanda we don't have any zoos.

![A leopard that was way more peaceful than I expected, we even touched her](/images/posts/burundi/leopard.webp)

![There was a lot of crocodiles](/images/posts/burundi/croc.webp)

![Some snakes](/images/posts/burundi/snake.webp)

![5 chimpanzees, of which 2 were babies](/images/posts/burundi/chippy.webp)

![And a huge planted by the king in 1846, near where he used to live](/images/posts/burundi/tree.webp)

### Rusizi national park

We visited the park, cause why not. To be honest, I was a little bit dissapointed because this was more like a reserve for the delta of the synonymous river than the huge parks I've come to expect from Rwanda.

![The map of the park](/images/posts/burundi/park-map.webp)

![A huge bridge, said to be built by the Italians above the Rusizi river which was flooded](/images/posts/burundi/rusizi.webp)

![From the boat tour, we could see the swamp, some birds and the huge Congolese mountains tearing up the clouds](/images/posts/burundi/mountains.webp)

Yeaa, this one was a bit dissapointing, all the animals seemed to be hiding (except a few hippos) since they usually come out at night. We couldn't even reach the proper delta where the river meets Tanganyika because the river was too flooded, the weather windy and the waves enormous.

## Day 4

### The return

It was time to head back to Rwanda. We saw a huge (I mean really huge) palm tree plantation on the road but I didn't take pictures and they wouldn't do it justice anyway.

We also bought a few souvenirs such as a big azz drum, some woven baskets and encountered a few policemen who were very nice and always stopped us to "greet their Rwandan brothers". Everyone was so hospitable and nice, and it's a shame that Burundi had to go through a civil war.

### Border

We entered via the border at Akanyaru, which despite being smaller and less modern, was definitely more busy with coaches and people crossing.

![On the Burundian side, Primus welcomes "Bienvenue au Burundi"](/images/posts/burundi/burundi.webp)

![The Rwandan side](/images/posts/burundi/rwanda.webp)

I'm sorry I didn't take a lot of pictures, but I really enjoyed it and look forward to returning!!

<details>
<summary>Commands used</summary>

<br/>

1. Add watermark

```bash
ls -1 *.jpg \
    | awk -F\/ '{print "composite -gravity SouthEast -geometry +30+30 /home/alien/Pictures/watermark.png ./"$(NF)" ./watermarked/"$(NF)}' \
    | sh
```

2. Convert to webp

```bash
for i in *.jpg;\
  do cwebp "${i%.*}.jpg" -preset picture -o "${i%.*}.webp" -metadata all;\
done
```

These are meant to be used by me, so nevermind these

</details>

&nbsp;
