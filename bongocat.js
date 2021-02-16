var _a, _b;
// Bongo Cat originally created by @StrayRogue and @DitzyFlama
const ID = &quot;bongo-cat&quot;;
const s = (selector) => `#${ID} ${selector}`;
const notes = document.querySelectorAll(&quot;.note&quot;);
for (let note of notes) {
(_a = note === null || note === void 0 ? void 0 : note.parentElement) === null || _a === void 0 ? void 0 : _a.appendChild(note.cloneNode(true));
(_b = note === null || note === void 0 ? void 0 : note.parentElement) === null || _b === void 0 ? void 0 : _b.appendChild(note.cloneNode(true));
}
const music = { note: s(&quot;.music .note&quot;) };
const cat = {
pawRight: {
up: s(&quot;.paw-right .up&quot;),
down: s(&quot;.paw-right .down&quot;),
},
pawLeft: {
up: s(&quot;.paw-left .up&quot;),
down: s(&quot;.paw-left .down&quot;),
},
};
const style = getComputedStyle(document.documentElement);
const green = style.getPropertyValue(&quot;--green&quot;);
const pink = style.getPropertyValue(&quot;--pink&quot;);
const blue = style.getPropertyValue(&quot;--blue&quot;);
const orange = style.getPropertyValue(&quot;--orange&quot;);
const cyan = style.getPropertyValue(&quot;--cyan&quot;);
gsap.set(music.note, { scale: 0, autoAlpha: 1 });
const animatePawState = (selector) => gsap.fromTo(selector, { autoAlpha: 0 }, {
autoAlpha: 1,
duration: 0.01,
repeatDelay: 0.19,
yoyo: true,
repeat: -1,
});
const tl = gsap.timeline();
tl.add(animatePawState(cat.pawLeft.up), &quot;start&quot;)
.add(animatePawState(cat.pawRight.down), &quot;start&quot;)
.add(animatePawState(cat.pawLeft.down), &quot;start+=0.19&quot;)
.add(animatePawState(cat.pawRight.up), &quot;start+=0.19&quot;)
.timeScale(1.6);
gsap.from(&quot;.terminal-code line&quot;, {
drawSVG: &quot;0%&quot;,
duration: 0.1,
stagger: 0.1,
ease: &quot;none&quot;,
repeat: -1,
});
// typing for pipe function doesn't seem to be working for usage when partially applied?
const noteElFn = gsap.utils.pipe(gsap.utils.toArray, gsap.utils.shuffle);
const noteEls = noteElFn(music.note);
const numNotes = noteEls.length / 3;
const notesG1 = noteEls.splice(0, numNotes);
const notesG2 = noteEls.splice(0, numNotes);
const notesG3 = noteEls;
const colorizer = gsap.utils.random([green, pink, blue, orange, cyan, &quot;#a3a4ec&quot;, &quot;#67b5c0&quot;, &quot;#fd7c6e&quot;], true);
const rotator = gsap.utils.random(-50, 50, 1, true);
const dir = (amt) => `${gsap.utils.random([&quot;-&quot;, &quot;+&quot;])}=${amt}`;
const animateNotes = (els) => {
els.forEach((el) => {
gsap.set(el, {
stroke: colorizer(),
rotation: rotator(),
x: gsap.utils.random(-25, 25, 1),
});
});
return gsap.fromTo(els, {
autoAlpha: 1,
y: 0,
scale: 0,
}, {
duration: 2,
autoAlpha: 0,
scale: 1,
ease: &quot;none&quot;,
stagger: {
from: &quot;random&quot;,
each: 0.5,
},
rotation: dir(gsap.utils.random(20, 30, 1)),
x: dir(gsap.utils.random(40, 60, 1)),
y: gsap.utils.random(-200, -220, 1),
onComplete: () => animateNotes(els),
});
};
tl.add(animateNotes(notesG1)).add(animateNotes(notesG2), &quot;>0.05&quot;).add(animateNotes(notesG3), &quot;>0.25&quot;);