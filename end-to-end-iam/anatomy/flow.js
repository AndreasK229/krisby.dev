//#region node_modules/anatomy-figures/dist/chunks/chunk-Y747DWCS.js
var e = Math.PI / 180, t = Math.sqrt(1.6);
function n({ scale: n, azimuth: r = 45, elevation: i = 30 }) {
	let a = r * e, o = i * e;
	return {
		sinA: Math.sin(a),
		cosA: Math.cos(a),
		sinE: Math.sin(o),
		cosE: Math.cos(o),
		k: n * t
	};
}
function r([e, t, r], i) {
	let { origin: a } = i, { sinA: o, cosA: s, sinE: c, cosE: l, k: u } = n(i);
	return [a[0] + (e * o - t * s) * u, a[1] + ((e * s + t * o) * c - r * l) * u];
}
function i(e) {
	let { sinA: t, cosA: r } = n(e);
	return [r, t];
}
function a([e, t, r], i) {
	let { sinA: a, cosA: o, sinE: s, cosE: c } = n(i);
	return (e * o + t * a) * c + r * s;
}
var o = (e) => {
	let t = (Math.round(e * 10) / 10).toFixed(1).replace(/\.0$/, "");
	return t === "-0" ? "0" : t;
};
function s(e, t = !1) {
	return e.length ? e.map(([e, t], n) => `${n ? "L" : "M"}${o(e)} ${o(t)}`).join("") + (t ? "Z" : "") : "";
}
function c(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) {
		let [r, i] = e[n], [a, o] = e[(n + 1) % e.length];
		t += r * o - a * i;
	}
	return t / 2;
}
var l = (e) => c(e) < 0 ? [...e].reverse() : e;
function u(e) {
	let t = [...e].sort((e, t) => e[0] - t[0] || e[1] - t[1]);
	if (t.length < 3) return t;
	let n = (e, t, n) => (t[0] - e[0]) * (n[1] - e[1]) - (t[1] - e[1]) * (n[0] - e[0]), r = [];
	for (let e of t) {
		for (; r.length >= 2 && n(r[r.length - 2], r[r.length - 1], e) <= 0;) r.pop();
		r.push(e);
	}
	let i = [];
	for (let e = t.length - 1; e >= 0; e--) {
		let r = t[e];
		for (; i.length >= 2 && n(i[i.length - 2], i[i.length - 1], r) <= 0;) i.pop();
		i.push(r);
	}
	return [...r.slice(0, -1), ...i.slice(0, -1)];
}
function d(e, t) {
	let n = e.length, r = [], i = e.findIndex((t, r) => t !== e[(r + n - 1) % n]);
	if (i < 0) return e[0] === t ? [Array.from({ length: n + 1 }, (e, t) => t % n)] : [];
	let a = null;
	for (let o = 0; o < n; o++) {
		let s = (i + o) % n;
		e[s] === t ? (a ||= [s], a.push((s + 1) % n)) : a &&= (r.push(a), null);
	}
	return a && r.push(a), r;
}
function f(e, t, a, o, f = {}) {
	let p = f.convex ?? !0, m = e.length, h = c(e) > 0, [g, _] = i(o), { sinA: v, cosA: y } = n(o), b = e.map(([t, n], r) => {
		let [i, a] = e[(r + 1) % m], o = i - t, s = a - n, c = Math.hypot(o, s) || 1;
		return h ? [s / c, -o / c] : [-s / c, o / c];
	}), x = b.map(([e, t]) => e * g + t * _ > 1e-9), S = e.map(([e, n]) => r([
		e,
		n,
		t + a
	], o)), C = e.map(([e, n]) => r([
		e,
		n,
		t
	], o)), w = [], T = [];
	for (let e of d(x, !1)) w.push(s(e.map((e) => S[e])));
	for (let e of d(x, !0)) T.push(s(e.map((e) => S[e]))), a > 0 && w.push(s(e.map((e) => C[e])));
	if (a > 0) for (let e = 0; e < m; e++) x[(e + m - 1) % m] !== x[e] && w.push(s([S[e], C[e]]));
	let E;
	if (p) E = s(u([...S, ...C]), !0);
	else {
		let e = [s(l(S), !0), s(l(C), !0)];
		for (let t = 0; t < m; t++) {
			if (!x[t]) continue;
			let n = (t + 1) % m;
			e.push(s(l([
				S[t],
				S[n],
				C[n],
				C[t]
			]), !0));
		}
		E = e.join("");
	}
	let D = Array.from({ length: 4 }, () => []);
	if (a > 0) {
		let [e, t] = [-v, y];
		for (let n = 0; n < m; n++) {
			if (!x[n]) continue;
			let [r, i] = b[n], a = (r * e + i * t + 1) / 2, o = Math.min(3, Math.max(0, Math.floor(a * 4))), c = (n + 1) % m;
			D[o].push(s(l([
				S[n],
				S[c],
				C[c],
				C[n]
			]), !0));
		}
	}
	let O;
	if (f.bevel && f.bevel > 0) {
		let n = f.bevel, i = e.map(([e, t], r) => {
			let [i, a] = b[(r + m - 1) % m], [o, s] = b[r], c = i + o, l = a + s, u = Math.hypot(c, l) || 1;
			return [e - c / u * n, t - l / u * n];
		}).map(([e, n]) => r([
			e,
			n,
			t + a
		], o));
		O = d(x, !0).map((e) => s([
			S[e[0]],
			...e.slice(1, -1).map((e) => i[e]),
			S[e[e.length - 1]]
		])).join("");
	}
	return {
		fill: E,
		outline: w.join(""),
		crease: T.join(""),
		top: s(l(S), !0),
		shades: D.map((e) => e.join("")),
		bevel: O
	};
}
function p(e, t, n, i = !1) {
	return s(e.map(([e, i]) => r([
		e,
		i,
		t
	], n)), i);
}
var m = (e, t, n, r) => p([e, t], n, r), h = (e, t, n) => s([r(e, n), r(t, n)]);
function g(e, [t, n, i]) {
	let a = r([
		0,
		0,
		0
	], e), o = r([
		t,
		n,
		i
	], e);
	return [o[0] - a[0], o[1] - a[1]];
}
var _ = (e) => Math.round(e * 100) / 100;
function v(e, t) {
	let [n, r] = g(e, t);
	return `translate(${_(n)} ${_(r)})`;
}
//#endregion
//#region node_modules/anatomy-figures/dist/chunks/chunk-QUYXL3AP.js
var y = (e) => String(e).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
function b(e) {
	let t = Object.entries(e.stage.aria ?? {}).map(([e, t]) => ` ${e}="${y(t)}"`).join(""), n = `<div class="iso-plate" data-plate="${e.theme}"><div class="iso-plate-corners" aria-hidden="true"><span class="iso-plate-corner" data-corner="fig"></span><span class="iso-plate-corner" data-corner="title">${y(e.title)}</span><span class="iso-plate-corner" data-corner="hint">${y(e.hint)}</span><span class="iso-plate-corner" data-corner="readout" data-readout="">${y(e.readout)}</span></div><div class="iso-stage" tabindex="0" role="${y(e.stage.role)}" aria-label="${y(e.stage.label)}"${t}>${e.svg}</div><span class="iso-sr" role="status" aria-live="polite" data-status=""></span></div>`;
	return e.theme === "dark" ? `<div class="iso iso-dark" data-theme="dark">${n}</div>` : `<div class="iso" data-theme="light">${n}</div>`;
}
function x(e) {
	let t = /* @__PURE__ */ new WeakMap(), n = /* @__PURE__ */ new WeakMap(), r = /* @__PURE__ */ new WeakMap();
	function i(n) {
		let r = n.defaultView;
		if (!r || !("adoptedStyleSheets" in n) || !("replaceSync" in r.CSSStyleSheet.prototype)) return null;
		let i = t.get(n);
		return i || (i = new r.CSSStyleSheet(), i.replaceSync(e.css), t.set(n, i)), i;
	}
	function a(t) {
		let r = n.get(t);
		return r || (r = t.createElement("template"), r.innerHTML = b(e), n.set(t, r)), r;
	}
	function o(t, n = {}) {
		if (typeof document > "u" || !t) return () => {};
		r.get(t)?.();
		let o = t.ownerDocument, s = t.shadowRoot ?? t.attachShadow({ mode: "open" }), c = i(o), l = a(o).content.cloneNode(!0);
		if (c) s.adoptedStyleSheets.includes(c) || (s.adoptedStyleSheets = [...s.adoptedStyleSheets, c]), s.replaceChildren(l);
		else {
			let t = o.createElement("style");
			t.textContent = e.css, s.replaceChildren(t, l);
		}
		let u = s.querySelector(".iso-plate"), d = u.parentElement, f = n.theme === "dark" || n.theme === "light" ? n.theme : e.theme;
		d.dataset.theme = f, d.classList.toggle("iso-dark", f === "dark"), u.dataset.plate = f;
		for (let [e, t] of Object.entries(n.tokens ?? {})) e.startsWith("--") && t != null && d.style.setProperty(e, String(t));
		u.querySelector("[data-corner=\"fig\"]").textContent = n.fig ?? e.fig;
		let p = /* @__PURE__ */ new Set();
		for (let e of u.querySelectorAll("canvas")) {
			let t = e.getContext;
			e.getContext = function(...e) {
				let n = t.apply(this, e);
				return n && p.add(n), n;
			};
		}
		let m = typeof ResizeObserver > "u" ? null : new ResizeObserver(() => u.toggleAttribute("data-narrow", u.offsetWidth <= 560));
		m?.observe(u);
		let h = e.mount(u, JSON.parse(e.data)), g = () => {
			if (!h) return;
			let e = h;
			h = null, r.delete(t), m?.disconnect(), e();
			for (let e of p) e.getExtension?.("WEBGL_lose_context")?.loseContext();
			s.replaceChildren();
		};
		return r.set(t, g), g;
	}
	function s() {
		return class extends HTMLElement {
			static observedAttributes = ["fig", "theme"];
			#e = null;
			connectedCallback() {
				if (Object.prototype.hasOwnProperty.call(this, "fig")) {
					let e = this.fig;
					delete this.fig, this.fig = e;
				}
				this.#e ||= o(this, {
					fig: this.fig,
					theme: this.getAttribute("theme") ?? void 0
				});
			}
			disconnectedCallback() {
				queueMicrotask(() => {
					this.isConnected || (this.#e?.(), this.#e = null);
				});
			}
			attributeChangedCallback(e) {
				if (e === "theme") {
					this.#e &&= o(this, {
						fig: this.fig,
						theme: this.getAttribute("theme") ?? void 0
					});
					return;
				}
				let t = this.#e ? this.shadowRoot?.querySelector("[data-corner=\"fig\"]") : null;
				t && (t.textContent = this.fig);
			}
			get fig() {
				return this.getAttribute("fig") ?? e.fig;
			}
			set fig(e) {
				e == null ? this.removeAttribute("fig") : this.setAttribute("fig", String(e));
			}
		};
	}
	function c(t = e.tag) {
		typeof customElements > "u" || customElements.get(t) || customElements.define(t, s());
	}
	return {
		render: o,
		define: c
	};
}
//#endregion
//#region node_modules/anatomy-figures/dist/chunks/chunk-5FH6PP3I.js
var S = Object.defineProperty, C = (e, t) => {
	for (var n in t) S(e, n, {
		get: t[n],
		enumerable: !0
	});
}, w = {
	paper: {
		base: "light",
		tokens: {
			"--anatomy-card": "#dfdfd8",
			"--anatomy-paper": "#dfdfd8",
			"--anatomy-face": "#f3f3ee",
			"--anatomy-top": "#f6f6f2",
			"--anatomy-shade-0": "#c6c6be",
			"--anatomy-shade-1": "#d0d0c9",
			"--anatomy-shade-2": "#dadad3",
			"--anatomy-shade-3": "#e4e4de",
			"--anatomy-lit-top": "#fafaf7",
			"--anatomy-lit-shade": "#e6e6e0",
			"--anatomy-hi": "#1f1f1d",
			"--anatomy-mid": "#7c7c75",
			"--anatomy-lo": "#a2a29a",
			"--anatomy-faint": "#c2c2ba",
			"--anatomy-lit": "#000000",
			"--anatomy-text": "#3d3d39",
			"--anatomy-strong": "#1b1b19",
			"--anatomy-muted": "#66665f"
		}
	},
	light: {
		base: "light",
		tokens: {
			"--anatomy-card": "#fbfbfa",
			"--anatomy-paper": "#fbfbfa",
			"--anatomy-face": "#ffffff",
			"--anatomy-top": "#ffffff",
			"--anatomy-shade-0": "#dcdcd9",
			"--anatomy-shade-1": "#e5e5e2",
			"--anatomy-shade-2": "#ededea",
			"--anatomy-shade-3": "#f4f4f1",
			"--anatomy-lit-top": "#ffffff",
			"--anatomy-lit-shade": "#eeeeeb",
			"--anatomy-hi": "#26262a",
			"--anatomy-mid": "#8a8a8f",
			"--anatomy-lo": "#b4b4b8",
			"--anatomy-faint": "#d4d4d6",
			"--anatomy-lit": "#000000",
			"--anatomy-text": "#57575a",
			"--anatomy-strong": "#18181a",
			"--anatomy-muted": "#8c8c90"
		}
	},
	dark: {
		base: "dark",
		tokens: {
			"--anatomy-card": "#131313",
			"--anatomy-paper": "#131313",
			"--anatomy-face": "#1b1b1b",
			"--anatomy-top": "#1c1c1c",
			"--anatomy-shade-0": "#0f0f0f",
			"--anatomy-shade-1": "#121212",
			"--anatomy-shade-2": "#151515",
			"--anatomy-shade-3": "#181818",
			"--anatomy-lit-top": "#262626",
			"--anatomy-lit-shade": "#1d1d1d",
			"--anatomy-hi": "#d4d4d4",
			"--anatomy-mid": "#6a6a6a",
			"--anatomy-lo": "#3e3e3e",
			"--anatomy-faint": "#2a2a2a",
			"--anatomy-lit": "#ffffff",
			"--anatomy-text": "#a3a3a3",
			"--anatomy-strong": "#e6e6e6",
			"--anatomy-muted": "#6e6e6e"
		}
	},
	blueprint: {
		base: "dark",
		tokens: {
			"--anatomy-card": "#1f3f73",
			"--anatomy-paper": "#1f3f73",
			"--anatomy-face": "#26497f",
			"--anatomy-top": "#294d85",
			"--anatomy-shade-0": "#1a3563",
			"--anatomy-shade-1": "#1d3a6b",
			"--anatomy-shade-2": "#204073",
			"--anatomy-shade-3": "#23457b",
			"--anatomy-lit-top": "#335a96",
			"--anatomy-lit-shade": "#2a4f89",
			"--anatomy-hi": "#e8f0ff",
			"--anatomy-mid": "#8fa8d1",
			"--anatomy-lo": "#5a77a6",
			"--anatomy-faint": "#3b5a8a",
			"--anatomy-lit": "#ffffff",
			"--anatomy-text": "#b8c8e6",
			"--anatomy-strong": "#ffffff",
			"--anatomy-muted": "#7f96bf"
		}
	},
	sepia: {
		base: "light",
		tokens: {
			"--anatomy-card": "#efe4cf",
			"--anatomy-paper": "#efe4cf",
			"--anatomy-face": "#faf3e6",
			"--anatomy-top": "#fdf8ee",
			"--anatomy-shade-0": "#d9c7a6",
			"--anatomy-shade-1": "#e2d2b4",
			"--anatomy-shade-2": "#e9dcc2",
			"--anatomy-shade-3": "#f0e6d1",
			"--anatomy-lit-top": "#fffaf0",
			"--anatomy-lit-shade": "#f3ead8",
			"--anatomy-hi": "#3b2a17",
			"--anatomy-mid": "#8c7356",
			"--anatomy-lo": "#b9a17f",
			"--anatomy-faint": "#d8c6a6",
			"--anatomy-lit": "#7a2e0e",
			"--anatomy-text": "#6b5940",
			"--anatomy-strong": "#2b1d0e",
			"--anatomy-muted": "#9a8668"
		}
	}
};
function T(e, t) {
	let n = t && typeof t == "object" ? t : {};
	if (e && typeof e == "object") {
		let t = e.base === "light" ? "light" : "dark", r = e.tokens && typeof e.tokens == "object" ? e.tokens : e, i = Object.fromEntries(Object.entries(r).filter(([e]) => e.startsWith("--")));
		return {
			base: t,
			tokens: {
				...w[t].tokens,
				...i,
				...n
			}
		};
	}
	let r = w[e] ?? w.dark;
	return {
		base: r.base,
		tokens: {
			...r.tokens,
			...n
		}
	};
}
C({}, {
	define: () => er,
	ratio: () => Qn,
	render: () => $n,
	tag: () => Zn
});
var E = .22, D = 26, O = 40, k = 5, A = 1.4, j = 4, M = 2, N = 18, P = (e) => O + (D - e) * E, F = 1 / Math.sqrt(1 + E * E), ee = (e) => {
	let t = N - e * F;
	return [
		t,
		0,
		P(t) + 4.5
	];
}, I = N + 4.5 * F + .3, te = N - 9 / 2 * F, ne = 1.2;
P(I + ne) + .6, P(te) + 4.5 + 2.3;
var re = 9.5, L = 6, R = [-88.5, 0], ie = 8.5;
ie - 1.3;
var ae = R[0] + Math.sqrt(ie ** 2 - k ** 2), oe = P(R[0] + Math.sqrt(ie ** 2 - (k + A) ** 2)), se = oe + j, z = [[-131.4, -9.9], [-78.6, -42.9]], ce = 12.5, le = 82, ue = 4, de = 11, fe = 10, B = 4, pe = le + 4.5, me = se + M, he = 35 * Math.PI / 180, V = [29, 0], H = -2, U = 16.5, ge = .12, _e = (e) => 39.3 - (e - H) * ge, ve = 22, ye = 16, be = 38, xe = 34.6, Se = (e) => xe - (e - ye) * (xe - ve - M) / (be - ye), Ce = 47, we = [
	92,
	46,
	0
].map((e) => e * Math.PI / 180), Te = 25.7, Ee = 9, De = [-90, 43], Oe = 5.5, ke = Ee, Ae = 4, je = 135 * Math.PI / 180, Me = (e, t) => [V[0] + Math.cos(e) * t, V[1] + Math.sin(e) * t], Ne = we.map((e) => Me(e, Ce)), Pe = 58 * Math.PI / 180, Fe = [Math.cos(Pe), Math.sin(Pe)], Ie = 2;
function Le(e) {
	let t = R[0] - e[0], n = R[1] - e[1], r = Math.hypot(t, n);
	return [t / r, n / r];
}
var Re = z.map(Le), ze = Re.map(([e, t]) => Math.atan2(t, e)), Be = (e) => Math.cos(e) * Fe[0] + Math.sin(e) * Fe[1], Ve = ze.map((e) => Be(e + Math.PI / 2) > Be(e - Math.PI / 2) ? -1 : 1), He = (e, t) => ze[e] + Ve[e] * t * (Math.PI / 2), Ue = (e, t) => {
	let [n, r] = z[e];
	return [
		n + Math.cos(t) * fe,
		r + Math.sin(t) * fe,
		pe
	];
}, We = (e, t) => {
	let [n, r] = z[e], [i, a] = Re[e];
	return [n + i * t, r + a * t];
};
ce - 1.5;
var Ge = Math.hypot(R[0] - z[0][0], R[1] - z[0][1]) - ie + 1.2, W = ([e, t], n) => [
	e,
	t,
	n
], Ke = ee(0);
function qe(e) {
	return [
		Ke,
		[
			ae,
			0,
			P(ae) + 4.5
		],
		W(R, oe + 4.5),
		W(We(e, Ge), me + 4.5),
		W(We(e, fe), pe)
	];
}
function Je(e) {
	let t = we[e];
	return [
		Ke,
		[
			D,
			0,
			P(D) + 4.5
		],
		W(V, _e(0) + 4.5),
		W(Me(t, U), _e(U) + 4.5),
		W(Me(t, U + .6), Se(U + .6) + 4.5),
		W(Me(t, be), Se(be) + 4.5),
		W(Ne[e], Te)
	];
}
var Ye = (e) => {
	let t = 0;
	for (let n = 1; n < e.length; n++) {
		let [r, i, a] = e[n - 1], [o, s, c] = e[n];
		t += Math.hypot(o - r, s - i, c - a);
	}
	return t;
}, Xe = (e) => {
	let t = [0];
	for (let n = 1; n < e.length; n++) t.push(Ye(e.slice(0, n + 1)));
	return t;
}, Ze = Ye(qe(0)), Qe = Ye(Je(1)), $e = 5, et = Xe(Je(1))[3] + $e, tt = I + ne + 4.5 + .5, nt = Xe(Je(1)), rt = nt[1] + (tt - D) / (V[0] - D) * (nt[2] - nt[1]), it = 10, at = 2, ot = 3, st = 2, ct = .5, lt = 2, ut = .1, dt = 1.4, ft = .1, pt = .45, mt = .22, ht = .35, gt = .3, _t = .3, G = 200, vt = 90, yt = 6;
function bt(e, t) {
	if (t <= 0) return 0;
	let n = Math.max(0, (vt - e) / G);
	return t <= n ? e * t + .5 * G * t * t : e * n + .5 * G * n * n + vt * (t - n);
}
var xt = (e, t) => Math.min(vt, e + G * Math.max(0, t));
function St(e, t) {
	if (t <= 0) return 0;
	let n = Math.max(0, (vt - e) / G), r = e * n + .5 * G * n * n;
	return t <= r ? (-e + Math.sqrt(e * e + 2 * G * t)) / G : n + (t - r) / vt;
}
var Ct = ft + St(0, Qe), wt = ft + St(0, et), Tt = ft + St(0, rt), Et = Ct + st;
function Dt(e, t) {
	let n = bt(e.v0, t - e.at), r = Math.max(e.to, e.from - n);
	return {
		w: r,
		v: r > e.to ? xt(e.v0, t - e.at) : 0
	};
}
function Ot(e, t) {
	let n = e.shifts[0];
	for (let r of e.shifts) r.at <= t && (n = r);
	return Dt(n, Math.max(t, n.at)).w;
}
var kt = (e) => e.shifts[e.shifts.length - 1].to;
function At(e) {
	let t = e.shifts[e.shifts.length - 1];
	return t.to > 0 ? Infinity : t.at + St(t.v0, t.from);
}
var jt = (e) => 1 / e;
function Mt(e = dt) {
	return {
		t: 0,
		rate: e,
		drop: {
			next: 0,
			turn: 0,
			last: -jt(e)
		},
		producers: Array.from({ length: at }, () => ({
			turns: 0,
			turnedAt: -Infinity,
			waiting: null
		})),
		consumers: Array.from({ length: ot }, () => ({
			active: !0,
			job: null
		})),
		queue: [],
		flight: [],
		spout: {
			from: 0,
			to: 0,
			at: -Infinity
		},
		lastRelease: -Infinity,
		rr: 0,
		acked: 0,
		lastWait: NaN,
		nextId: 0,
		outs: []
	};
}
function Nt(e, t) {
	for (e.push(t); e[0] <= t - yt;) e.shift();
}
function Pt(e, t) {
	let n = 0;
	for (let r of e) {
		let e = t - r;
		e >= 0 && e < yt && (n += 1 - Math.cos(2 * Math.PI * e / yt));
	}
	return n / yt;
}
function Ft(e, t, n, r) {
	let i = e.queue.length;
	t.enqueuedAt = n, t.shifts = [{
		at: r,
		from: Ze,
		to: i * 9,
		v0: 0
	}], e.queue.push(t);
}
function It(e, t, n) {
	let r = e.producers[t], i = {
		id: e.nextId++,
		producer: t,
		triedAt: n,
		enqueuedAt: NaN,
		shifts: [],
		releasedAt: NaN,
		consumer: -1,
		landedAt: NaN,
		ackAt: NaN
	};
	r.turns += 1, r.turnedAt = n, e.queue.length < it ? Ft(e, i, n, n + _t) : r.waiting = i;
}
function Lt(e, t) {
	let n = e.drop.turn;
	e.drop = {
		next: t + jt(e.rate),
		turn: (n + 1) % at,
		last: t
	}, e.producers[n].waiting || It(e, n, t);
}
function Rt(e) {
	for (let t = 0; t < ot; t++) {
		let n = (e.rr + t) % ot, r = e.consumers[n];
		if (r.active && !r.job) return n;
	}
	return -1;
}
function zt(e) {
	let t = -1;
	return e.consumers.forEach((n, r) => {
		!n.active || !n.job || (t < 0 || n.job.ackAt < e.consumers[t].job.ackAt) && (t = r);
	}), t;
}
var Bt = (e) => Math.max(e.lastRelease + wt, e.spout.at + mt);
function Vt(e, t, n) {
	let r = e.queue.shift();
	r.releasedAt = n, r.consumer = t, r.landedAt = n + Ct, r.ackAt = r.landedAt + st, e.consumers[t].job = r, e.rr = (t + 1) % ot, e.lastRelease = n, e.lastWait = n - r.enqueuedAt, e.flight.push(r), Nt(e.outs, n);
	let i = n + ht;
	e.queue.forEach((e, t) => {
		let n = e.shifts[e.shifts.length - 1], r = Math.max(i, n.at), { w: a, v: o } = Dt(n, r);
		e.shifts.push({
			at: r,
			from: a,
			to: t * 9,
			v0: o
		});
	});
	let a = e.producers.map((e, t) => ({
		producer: e,
		index: t
	})).filter(({ producer: e }) => e.waiting).sort((e, t) => e.producer.waiting.triedAt - t.producer.waiting.triedAt);
	for (let { producer: t, index: r } of a) {
		if (e.queue.length >= it) break;
		let i = t.waiting;
		t.waiting = null, Ft(e, i, n, Math.max(n, i.triedAt + _t)), e.drop = {
			next: n + jt(e.rate),
			turn: (r + 1) % at,
			last: n
		};
	}
}
function Ht(e) {
	let t = null, n = (e, n, r) => {
		Number.isFinite(e) && (!t || e < t.t - 1e-9 || Math.abs(e - t.t) <= 1e-9 && n < t.rank) && (t = {
			t: e,
			rank: n,
			run: r
		});
	};
	if (e.consumers.forEach((t) => {
		let r = t.job;
		r && n(r.ackAt, 0, () => {
			t.job = null, e.acked += 1;
		});
	}), e.queue.length) {
		let t = Rt(e), r = t >= 0 ? t : zt(e), i = Bt(e);
		if (r >= 0 && e.spout.to !== r) {
			let t = Math.max(i, e.t);
			n(t, 1, () => {
				e.spout = {
					from: e.spout.to,
					to: r,
					at: t
				};
			});
		} else if (t >= 0) {
			let r = Math.max(At(e.queue[0]), e.lastRelease + pt, i, e.t);
			n(r, 2, () => Vt(e, t, r));
		}
	}
	let r = Math.max(e.drop.next, e.t);
	return n(r, 3, () => Lt(e, r)), t;
}
function Ut(e, t) {
	for (let n = 0; n < 1e4; n++) {
		let n = Ht(e);
		if (!n || n.t > t) break;
		e.t = Math.max(e.t, n.t), n.run();
	}
	e.t = Math.max(e.t, t), e.flight = e.flight.filter((t) => t.ackAt + gt > e.t);
}
function Wt(e, t) {
	let n = Math.round(Math.min(lt, Math.max(ct, t)) * 10) / 10;
	return n === e.rate ? !1 : (e.rate = n, e.drop.next = Math.max(e.t, e.drop.last + jt(n)), !0);
}
function Gt(e, t, n) {
	let r = e.consumers[t];
	return !r || r.active === n ? !1 : (r.active = n, !0);
}
var Kt = (e) => e.consumers.filter((e) => e.active).length, qt = (e) => e.consumers.filter((e) => e.job).length, Jt = (e) => e.consumers.filter((e) => e.active && !e.job).length, Yt = (e) => Kt(e) / Et, Xt = (e) => e.producers.some((e) => e.waiting), Zt = (e) => e.queue.length >= it, Qt = (e) => Pt(e.outs, e.t), $t = (e) => Zt(e) ? Math.min(e.rate, Qt(e)) : e.rate, K = (e) => e.toFixed(1);
function en(e) {
	let t = K($t(e)), n = K(e.rate);
	return `${e.queue.length} queued${Zt(e) ? ", full" : ""} \xB7 in ${t}${t === n ? "" : ` of ${n}`}/s \xB7 out ${K(Qt(e))}/s`;
}
function tn(e) {
	let t = Kt(e), n = [
		`${e.queue.length} of ${it} marbles queued${Xt(e) ? ", the lane is full and a hopper is holding one until there is room" : Zt(e) ? ", the lane is full" : ""}.`,
		`Producers set to ${K(e.rate)} a second; ${K($t(e))} a second getting in now; ${K(Qt(e))} a second left the lane over the last ${yt} seconds.`,
		`${t} of ${ot} consumers on, ${qt(e)} busy; each takes ${K(Ct)} seconds to receive a marble and ${st} seconds to work on it: up to ${K(Yt(e))} a second.`,
		`${e.acked} acknowledged.`
	];
	return Number.isFinite(e.lastWait) && n.push(`The last one waited ${K(e.lastWait)} seconds.`), n.join(" ");
}
function nn(e) {
	let t = Mt();
	return Ut(t, e), t;
}
var rn = (e, t) => [
	e[0] - t[0],
	e[1] - t[1],
	e[2] - t[2]
], q = (e, t) => [
	e[0] + t[0],
	e[1] + t[1],
	e[2] + t[2]
], J = (e, t) => [
	e[0] * t,
	e[1] * t,
	e[2] * t
], an = (e, t) => e[0] * t[0] + e[1] * t[1] + e[2] * t[2], on = (e, t) => [
	e[1] * t[2] - e[2] * t[1],
	e[2] * t[0] - e[0] * t[2],
	e[0] * t[1] - e[1] * t[0]
], Y = (e) => {
	let t = Math.min(1, Math.max(0, e));
	return t * t * (3 - 2 * t);
};
function sn(e) {
	let t = [...e].sort((e, t) => e[0] - t[0] || e[1] - t[1]), n = (e, t, n) => (t[0] - e[0]) * (n[1] - e[1]) - (t[1] - e[1]) * (n[0] - e[0]), r = [];
	for (let e of t) {
		for (; r.length >= 2 && n(r[r.length - 2], r[r.length - 1], e) <= 0;) r.pop();
		r.push(e);
	}
	let i = [];
	for (let e = t.length - 1; e >= 0; e--) {
		let r = t[e];
		for (; i.length >= 2 && n(i[i.length - 2], i[i.length - 1], r) <= 0;) i.pop();
		i.push(r);
	}
	return [...r.slice(0, -1), ...i.slice(0, -1)];
}
var cn = [
	[
		0,
		2,
		6,
		4
	],
	[
		1,
		3,
		7,
		5
	],
	[
		0,
		1,
		5,
		4
	],
	[
		2,
		3,
		7,
		6
	],
	[
		0,
		1,
		3,
		2
	],
	[
		4,
		5,
		7,
		6
	]
];
function ln(e, t, i, a, o) {
	let c = [];
	for (let n of [0, 1]) for (let r of [0, 1]) for (let o of [0, 1]) c.push(q(q(q(e, J(t, o)), J(i, r)), J(a, n)));
	let l = q(e, J(q(q(t, i), a), .5)), { sinA: u, cosA: d, sinE: f, cosE: p } = n(o), m = [
		d * p,
		u * p,
		f
	], h = c.map((e) => r(e, o)), g = [
		[],
		[],
		[],
		[]
	], _ = "", v = null, y = [];
	for (let e of cn) {
		let [t, n, , r] = e, i = on(rn(c[n], c[t]), rn(c[r], c[t])), a = J(e.reduce((e, t) => q(e, c[t]), [
			0,
			0,
			0
		]), .25);
		an(i, rn(a, l)) < 0 && (i = J(i, -1));
		let o = Math.hypot(...i) || 1, f = J(i, 1 / o);
		if (an(f, m) <= 1e-6) continue;
		let p = s(e.map((e) => h[e]), !0);
		if (f[2] > .6) {
			_ = p, v = e;
			continue;
		}
		let b = Math.hypot(f[0], f[1]) || 1, x = ((f[0] * -u + f[1] * d) / b + 1) / 2;
		g[Math.min(3, Math.max(0, Math.floor(x * 4)))].push(p), y.push(e);
	}
	let b = [];
	if (v) for (let e = 0; e < 4; e++) {
		let t = v[e], n = v[(e + 1) % 4];
		y.some((e) => e.includes(t) && e.includes(n)) && b.push(s([h[t], h[n]]));
	}
	let x = sn(h), S = s(x, !0);
	return {
		fill: S,
		outline: S,
		crease: b.join(""),
		top: _,
		shades: g.map((e) => e.join("")),
		hull: x
	};
}
var un = (e, t, n) => (t[0] - e[0]) * (n[1] - e[1]) - (t[1] - e[1]) * (n[0] - e[0]);
function dn(e, t, n) {
	let r = n.reduce((e, t, r) => e + un([0, 0], t, n[(r + 1) % n.length]), 0), i = Math.sign(r) || 1, a = 0, o = 1;
	for (let r = 0; r < n.length; r++) {
		let s = n[r], c = n[(r + 1) % n.length], l = un(s, c, e) * i - 1e-6, u = un(s, c, t) * i - 1e-6;
		if (l <= 0 && u <= 0) return [[0, 1]];
		if (l > 0 && u > 0) continue;
		let d = l / (l - u);
		l <= 0 ? a = Math.max(a, d) : o = Math.min(o, d);
	}
	if (a >= o) return [[0, 1]];
	let s = [];
	return a > 1e-6 && s.push([0, a]), o < .999999 && s.push([o, 1]), s;
}
var fn = (e, t, n) => [e[0] + (t[0] - e[0]) * n, e[1] + (t[1] - e[1]) * n];
function pn(e, t) {
	return e.flatMap((n, r) => {
		let i = [[n, e[(r + 1) % e.length]]];
		for (let e of t) i = i.flatMap(([t, n]) => dn(t, n, e).map(([e, r]) => [fn(t, n, e), fn(t, n, r)]));
		return i.map((e) => s(e));
	});
}
function mn(e, t = "", n = e) {
	return {
		fill: e.map((e) => e.fill).join(""),
		outline: e.flatMap((t) => pn(t.hull, e.filter((e) => e !== t).map((e) => e.hull))).join(""),
		crease: n.map((e) => e.crease).join("") + t,
		top: n.map((e) => e.top).join(""),
		shades: [
			0,
			1,
			2,
			3
		].map((t) => e.map((e) => e.shades[t] ?? "").join(""))
	};
}
function hn(e, t, n, r = j, i = 0) {
	let o = rn(t, e), s = Math.hypot(o[0], o[1]) || 1, c = [
		-o[1] / s,
		o[0] / s,
		0
	], l = [
		0,
		0,
		-M
	], u = [
		0,
		0,
		M + r
	], d = Math.min(.9, i / s), f = q(e, J(o, d)), p = J(o, 1 - d), m = ln(q(q(e, J(c, -k)), l), o, J(c, k * 2), [
		0,
		0,
		M
	], n), g = ln(q(q(f, J(c, -k - A)), l), p, J(c, A), u, n), _ = ln(q(q(f, J(c, k)), l), p, J(c, A), u, n), v = a(c, n) > 0, y = J(c, v ? -k : k), b = h(q(d > 0 ? f : e, y), q(t, y), n);
	return {
		bed: mn([m, v ? g : _], b),
		front: v ? _ : g
	};
}
var gn = (e) => [
	e.fill,
	...e.shades,
	e.top,
	e.crease,
	e.outline
];
function _n(e, t) {
	let [n, r] = z[e], i = 4.8, a = fe, o = [];
	for (let e = 0; e < 72; e++) {
		let s = e / 72 * Math.PI * 2, c = de;
		for (let e = 0; e < B; e++) {
			let n = s - (t + e / B * Math.PI * 2);
			n = Math.atan2(Math.sin(n), Math.cos(n));
			let r = a * Math.sin(n);
			Math.abs(r) < i && Math.cos(n) > 0 && (c = Math.min(c, a * Math.cos(n) - Math.sqrt(i * i - r * r)));
		}
		o.push([n + Math.cos(s) * Math.max(c, 2.6), r + Math.sin(s) * Math.max(c, 2.6)]);
	}
	return o;
}
var vn = (e, t, n, r) => {
	let i = e.producers[t];
	return i.turns - 1 + (r ? 1 : Y((n - i.turnedAt) / _t));
}, yn = (e, t, n, r = !1) => He(t, vn(e, t, n, r)), bn = (e, t, n, r, i = !1) => f(_n(t, yn(e, t, n, i)), le, ue, r, { convex: !1 });
function xn(e, t, n = !1) {
	let { from: r, to: i, at: a } = e.spout, o = we[r], s = we[i];
	return n ? s : o + (s - o) * Y((t - a) / mt);
}
function Sn(e, t) {
	let [n, r] = Me(e, H), [i, a] = Me(e, U);
	return hn([
		n,
		r,
		_e(H)
	], [
		i,
		a,
		_e(U)
	], t, 3.4);
}
function Cn(e, t, n) {
	let [r, i] = Ne[e], a = we[e] + t * Math.PI * 2, o = Math.cos(a), s = Math.sin(a);
	return m([r + o * 6.4, i + s * 6.4], [r + o * 9.1, i + s * 9.1], ve, n);
}
function wn(e, t, n) {
	let r = e.consumers[t].job;
	return r ? Math.min(1, Math.max(0, (n - r.landedAt) / st)) : 0;
}
var Tn = (e) => -je + (e - ct) / (lt - ct) * je * 2;
function En(e, t) {
	let n = Tn(e), [r, i] = De, a = Math.sin(n), o = -Math.cos(n);
	return m([r - a * 1.6, i - o * 1.6], [r + a * (Oe - .9), i + o * (Oe - .9)], ke + Ae, t);
}
var Dn = .1;
function On(e, t, n = !1) {
	if (n) return {
		h: 0,
		s: L
	};
	let r = t - e.lastRelease, i = r < 0 ? 0 : r < ft ? Y(r / ft) : r < Tt ? 1 : 1 - Y((r - Tt) / Dn), a = r < 0 ? 0 : r < .08 ? Y(r / .08) : r < ht - .08 ? 1 : 1 - Y((r - ht + .08) / .08);
	return {
		h: i * re,
		s: (1 - a) * L
	};
}
function kn() {
	return {
		produce: [0, 1].map((e) => {
			let t = qe(e);
			return {
				points: t,
				marks: Xe(t)
			};
		}),
		deliver: [
			0,
			1,
			2
		].map((e) => {
			let t = Je(e);
			return {
				points: t,
				marks: Xe(t)
			};
		})
	};
}
function An({ points: e, marks: t }, n) {
	if (n <= 0) return e[0];
	for (let r = 1; r < e.length; r++) if (n <= t[r] || r === e.length - 1) {
		let i = t[r] - t[r - 1], a = i > 0 ? Math.min(1, (n - t[r - 1]) / i) : 1, o = e[r - 1], s = e[r];
		return [
			o[0] + (s[0] - o[0]) * a,
			o[1] + (s[1] - o[1]) * a,
			o[2] + (s[2] - o[2]) * a
		];
	}
	return e[e.length - 1];
}
var jn = ["feed-0", "feed-1"], Mn = ["front-0", "front-1"], Nn = [
	"chute-0",
	"chute-1",
	"chute-2"
], Pn = [
	"cup-0",
	"cup-1",
	"cup-2"
], Fn = .16, In = 6, Ln = (e, t, n) => t <= 9 / 2 ? "gate" : t <= n[3] ? "lane" : jn[e], Rn = (e, t, n) => t <= n[1] ? "gate" : t <= n[3] + $e ? "spout" : t <= n[5] ? Nn[e] : Pn[e];
function zn(e, t) {
	let n = t - ze[e];
	return Math.abs(Math.atan2(Math.sin(n), Math.cos(n))) < he ? jn[e] : Mn[e];
}
function Bn(e, t, n, r) {
	let i = n ? 1 : Y((t - e.triedAt) / _t), a = He(e.producer, i - 1);
	return {
		id: e.id,
		at: Ue(e.producer, a),
		layer: zn(e.producer, a),
		lit: r
	};
}
function Vn(e, t, n, r = !1) {
	let i = [];
	e.producers.forEach((n, a) => {
		let o = vn(e, a, t, r), s = t - n.turnedAt - _t;
		if (r || s >= 0) {
			let e = ((3 - n.turns) % B + B) % B, t = He(a, o + e), [c, l, u] = Ue(a, t), d = r ? 0 : (1 - Y(s / Fn)) * In;
			i.push({
				id: -1 - (a * B + e),
				at: [
					c,
					l,
					u + d
				],
				layer: zn(a, t),
				lit: !1
			});
		}
		n.waiting && i.push(Bn(n.waiting, t, r, !1));
	});
	let a = -Infinity;
	e.queue.forEach((e, o) => {
		let s = n.produce[e.producer];
		if (!r && t < e.shifts[0].at) {
			i.push(Bn(e, t, r, o === 0)), a = s.marks[s.marks.length - 1];
			return;
		}
		let c = r ? kt(e) : Ot(e, t);
		c <= s.marks[1] + 9 && (c = Math.max(c, a + 9)), a = c, i.push({
			id: e.id,
			at: An(s, c),
			layer: Ln(e.producer, c, s.marks),
			lit: o === 0
		});
	});
	for (let a of e.flight) {
		if (r && t >= a.ackAt) continue;
		let e = n.deliver[a.consumer], o = e.marks[e.marks.length - 1], s = r ? o : Math.min(o, bt(0, t - a.releasedAt - ft)), c = An(e, s);
		if (t >= a.ackAt) {
			let e = Math.min(1, (t - a.ackAt) / gt);
			c = [
				c[0],
				c[1],
				c[2] - e * 10.5
			];
		}
		i.push({
			id: a.id,
			at: c,
			layer: Rn(a.consumer, s, e.marks),
			lit: !1
		});
	}
	return i;
}
var Hn = 250, Un = 6, Wn = .18, Gn = .12, Kn = (e, t, n) => Math.min(n, Math.max(t, e)), qn = (e, t, n, r) => t + (e - t) * Math.exp(-n / r), Jn = (e) => Math.round(Kn(e, ct, lt) * 10) / 10;
function Yn(e) {
	let t = e.querySelector(".iso-stage"), n = t?.querySelector("svg"), r = e.querySelector("[data-readout]"), i = e.querySelector("[data-status]");
	if (!t || !n || !r || !i) return null;
	let a = /* @__PURE__ */ new Map();
	n.querySelectorAll("[data-layer]").forEach((e) => a.set(e.dataset.layer ?? "", e));
	let o = Array.from(n.querySelectorAll("[data-ball]")).sort((e, t) => Number(e.dataset.ball) - Number(t.dataset.ball)), s = (e) => {
		let t = n.querySelector(`[data-solid="${e}"]`);
		return t ? Array.from(t.querySelectorAll("path")) : null;
	}, c = (e) => n.querySelector(`[data-part="${e}"]`), l = [s("wheel-0"), s("wheel-1")], u = [s("spout-bed"), s("spout-front")], d = [
		0,
		1,
		2
	].map((e) => c(`hand-${e}`)), f = [
		0,
		1,
		2
	].map((e) => c(`switch-${e}`)), p = {
		s: c("blade-s"),
		h: c("blade-h")
	}, m = c("knob"), h = a.get("pool");
	return l.some((e) => !e) || u.some((e) => !e) || d.some((e) => !e) || f.some((e) => !e) || !p.s || !p.h || !m || !h ? null : {
		stage: t,
		svg: n,
		readout: r,
		status: i,
		layers: a,
		balls: o,
		pool: h,
		wheels: l,
		spout: u,
		hands: d,
		switches: f,
		blades: p,
		knob: m
	};
}
var Xn = x({
	tag: "anatomy-message-queue",
	ratio: "600 / 400",
	fig: "No. 04",
	title: "Message queue",
	hint: "Drag to set rate · tap a drum",
	readout: "7 queued · in 1.4/s · out 1.0/s",
	stage: {
		role: "slider",
		label: "Message queue marble run. Left and Right change how fast the two producers publish, from 0.5 to 2.0 marbles a second; Home and End jump to the ends. Keys 1 to 3 switch the consumer drums on or off, left to right.",
		aria: {
			"aria-valuemin": .5,
			"aria-valuemax": 2,
			"aria-valuenow": 1.4,
			"aria-valuetext": "7 of 10 marbles queued. Producers set to 1.4 a second; 1.4 a second getting in now; 1.0 a second left the lane over the last 6 seconds. 3 of 3 consumers on, 3 busy; each takes 1.0 seconds to receive a marble and 2 seconds to work on it: up to 1.0 a second. 7 acknowledged. The last one waited 4.8 seconds."
		}
	},
	theme: "dark",
	svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"iso-svg mq-svg\" viewBox=\"0 0 600 400\" role=\"img\" aria-label=\"A message queue built as a marble run. Two hoppers on towers are the producers: each star wheel carries a marble from its hopper round to a chute that drops it into a cup, and the cup empties through a slot in its wall into one sloping lane, the queue, where marbles line up in order against a two-blade escapement and the oldest one is lit. Ten marbles fill the lane; when it is full a hopper holds its next marble until there is room. A swivel spout hands each released marble to whichever of three timer drums is free, the consumers; once the marble lands, the drum works on it for two seconds, its hand sweeping once, then swallows it to acknowledge it.\"><defs><clipPath id=\"message-queue-hopper-0\"><path d=\"M77.6 44.7L77.6 -355.3L232 -354.7L232 45.3L172 45.3L171.8 46.4L171.3 47.5L170.5 48.6L169.4 49.5L168.1 50.5L166.5 51.3L164.8 52L162.9 52.6L160.8 53L158.7 53.4L156.5 53.5L154.2 53.6L152 53.5L149.8 53.2L147.7 52.8L145.7 52.3L143.9 51.6L142.2 50.9L140.8 50L139.6 49L138.7 48L138.1 46.9L137.7 45.8L137.6 44.7Z\"/></clipPath><clipPath id=\"message-queue-hopper-1\"><path d=\"M184.7 44.7L184.7 -355.3L339 -354.7L339 45.3L279 45.3L278.8 46.4L278.3 47.5L277.5 48.5L276.4 49.5L275.1 50.5L273.6 51.3L271.8 52L269.9 52.6L267.9 53L265.7 53.4L263.5 53.5L261.3 53.6L259 53.5L256.8 53.2L254.7 52.8L252.7 52.3L250.9 51.6L249.3 50.8L247.9 50L246.7 49L245.7 48L245.1 46.9L244.7 45.8L244.7 44.7Z\"/></clipPath><clipPath id=\"message-queue-under-0\"><path d=\"M135.9 64.6L136 65.8L136.4 67.1L137.1 68.2L138.1 69.4L139.4 70.4L141 71.4L142.8 72.2L144.8 73L147 73.5L149.3 74L151.7 74.3L154.2 74.4L156.6 74.3L159.1 74.1L161.4 73.8L163.7 73.3L165.8 72.6L167.7 71.9L169.4 71L170.9 69.9L172 68.9L172.9 67.7L173.5 66.5L173.7 65.3L233.7 65.3L233.7 465.3L75.9 464.6L75.9 64.6Z\"/></clipPath><clipPath id=\"message-queue-under-1\"><path d=\"M243 64.6L243 65.8L243.4 67.1L244.1 68.2L245.2 69.4L246.5 70.4L248 71.4L249.8 72.2L251.8 73L254 73.5L256.3 74L258.7 74.3L261.2 74.4L263.7 74.3L266.1 74.1L268.5 73.8L270.7 73.3L272.8 72.6L274.7 71.8L276.4 70.9L277.9 69.9L279.1 68.9L279.9 67.7L280.5 66.5L280.7 65.3L340.7 65.3L340.7 465.3L183 464.6L183 64.6Z\"/></clipPath><clipPath id=\"message-queue-cup-0\"><path d=\"M266.6 280.4L266.6 -119.6L402.4 -119.3L402.4 280.7L342.4 280.7L342.3 281.2L342 281.7L341.6 282.2L341.2 282.6L340.6 283L339.8 283.4L339 283.8L338.2 284L337.2 284.2L336.2 284.4L335.2 284.5L334.2 284.5L333.1 284.4L332.1 284.3L331.2 284.1L330.3 283.9L329.4 283.6L328.7 283.2L328 282.8L327.5 282.4L327 281.9L326.7 281.4L326.6 280.9L326.6 280.4Z\"/></clipPath><clipPath id=\"message-queue-cup-1\"><path d=\"M328.5 286.4L328.5 -113.6L464.3 -113.3L464.3 286.7L404.3 286.7L404.2 287.2L404 287.7L403.6 288.2L403.1 288.7L402.5 289.1L401.8 289.4L401 289.8L400.1 290L399.2 290.3L398.2 290.4L397.2 290.5L396.2 290.5L395.1 290.5L394.1 290.3L393.2 290.2L392.2 289.9L391.4 289.6L390.6 289.3L390 288.9L389.5 288.4L389 287.9L388.7 287.4L388.6 286.9L388.5 286.4Z\"/></clipPath><clipPath id=\"message-queue-cup-2\"><path d=\"M380.2 268.3L380.2 -131.7L516.1 -131.4L516.1 268.6L456.1 268.6L456 269.1L455.7 269.6L455.3 270.1L454.9 270.5L454.3 271L453.5 271.3L452.7 271.7L451.9 271.9L450.9 272.2L449.9 272.3L448.9 272.4L447.9 272.4L446.8 272.3L445.8 272.2L444.9 272L444 271.8L443.1 271.5L442.4 271.1L441.7 270.7L441.2 270.3L440.7 269.8L440.4 269.3L440.3 268.8L440.2 268.3Z\"/></clipPath></defs><path class=\"iso-halo\" d=\"M67.4 244.8L67.6 243.4L68.3 242.1L69.5 240.9L166.1 163.6L167.7 162.6L169.7 161.7L172.1 161L174.6 160.6L177.3 160.4L180 160.5L182.6 160.8L185 161.4L526.1 268L528.3 268.9L530 269.9L531.4 271L532.2 272.3L532.6 273.7L532.6 287L532.4 288.4L531.7 289.7L530.5 290.9L433.9 368.2L432.3 369.2L430.3 370.1L427.9 370.8L425.4 371.2L422.7 371.4L420 371.3L417.4 371L415 370.4L73.9 263.8L71.7 263L70 261.9L68.6 260.8L67.8 259.5L67.4 258.2Z\"/><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M67.4 244.8L67.6 243.4L68.3 242.1L69.5 240.9L166.1 163.6L167.7 162.6L169.7 161.7L172.1 161L174.6 160.6L177.3 160.4L180 160.5L182.6 160.8L185 161.4L526.1 268L528.3 268.9L530 269.9L531.4 271L532.2 272.3L532.6 273.7L532.6 287L532.4 288.4L531.7 289.7L530.5 290.9L433.9 368.2L432.3 369.2L430.3 370.1L427.9 370.8L425.4 371.2L422.7 371.4L420 371.3L417.4 371L415 370.4L73.9 263.8L71.7 263L70 261.9L68.6 260.8L67.8 259.5L67.4 258.2Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M532.6 287L532.4 288.4L532.4 275L532.6 273.7ZM532.4 288.4L531.7 289.7L531.7 276.3L532.4 275ZM531.7 289.7L530.5 290.9L530.5 277.5L531.7 276.3ZM530.5 290.9L433.9 368.2L433.9 354.8L530.5 277.5ZM433.9 368.2L432.3 369.2L432.3 355.8L433.9 354.8ZM432.3 369.2L430.3 370.1L430.3 356.7L432.3 355.8Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M430.3 370.1L427.9 370.8L427.9 357.4L430.3 356.7ZM427.9 370.8L425.4 371.2L425.4 357.8L427.9 357.4ZM425.4 371.2L422.7 371.4L422.7 358L425.4 357.8Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M422.7 371.4L420 371.3L420 357.9L422.7 358ZM420 371.3L417.4 371L417.4 357.6L420 357.9ZM417.4 371L415 370.4L415 357L417.4 357.6Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M415 370.4L73.9 263.8L73.9 250.4L415 357ZM73.9 263.8L71.7 263L71.7 249.6L73.9 250.4ZM71.7 263L70 261.9L70 248.5L71.7 249.6ZM70 261.9L68.6 260.8L68.6 247.4L70 248.5ZM68.6 260.8L67.8 259.5L67.8 246.1L68.6 247.4ZM67.8 259.5L67.4 258.2L67.4 244.8L67.8 246.1Z\"/><path class=\"iso-top\" d=\"M526.1 268L528.3 268.9L530 269.9L531.4 271L532.2 272.3L532.6 273.7L532.4 275L531.7 276.3L530.5 277.5L433.9 354.8L432.3 355.8L430.3 356.7L427.9 357.4L425.4 357.8L422.7 358L420 357.9L417.4 357.6L415 357L73.9 250.4L71.7 249.6L70 248.5L68.6 247.4L67.8 246.1L67.4 244.8L67.6 243.4L68.3 242.1L69.5 240.9L166.1 163.6L167.7 162.6L169.7 161.7L172.1 161L174.6 160.6L177.3 160.4L180 160.5L182.6 160.8L185 161.4Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M532.6 273.7L532.4 275L531.7 276.3L530.5 277.5L433.9 354.8L432.3 355.8L430.3 356.7L427.9 357.4L425.4 357.8L422.7 358L420 357.9L417.4 357.6L415 357L73.9 250.4L71.7 249.6L70 248.5L68.6 247.4L67.8 246.1L67.4 244.8\"/><path class=\"iso-line iso-bevel\" data-tone=\"faint\" d=\"M532.6 273.7L529.7 274.8L529.1 275.8L528.1 276.8L431.7 354L430.3 354.9L428.7 355.6L426.8 356.1L424.8 356.5L422.6 356.6L420.5 356.6L418.4 356.3L416.3 355.8L75.4 249.2L73.6 248.6L72.2 247.7L71.1 246.8L70.4 245.8L67.4 244.8\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M67.4 244.8L67.6 243.4L68.3 242.1L69.5 240.9L166.1 163.6L167.7 162.6L169.7 161.7L172.1 161L174.6 160.6L177.3 160.4L180 160.5L182.6 160.8L185 161.4L526.1 268L528.3 268.9L530 269.9L531.4 271L532.2 272.3L532.6 273.7M532.6 287L532.4 288.4L531.7 289.7L530.5 290.9L433.9 368.2L432.3 369.2L430.3 370.1L427.9 370.8L425.4 371.2L422.7 371.4L420 371.3L417.4 371L415 370.4L73.9 263.8L71.7 263L70 261.9L68.6 260.8L67.8 259.5L67.4 258.2M532.6 273.7L532.6 287M67.4 244.8L67.4 258.2\"/></g><path class=\"iso-line\" data-tone=\"lo\" d=\"M521.6 271.7L522.4 272L523 272.4L523.5 272.8L523.9 273.3L524 273.8L523.9 274.3L523.7 274.8L523.2 275.2L426.7 352.5L426 352.9L425.3 353.2L424.4 353.5L423.4 353.6L422.4 353.7L421.4 353.7L420.5 353.5L419.6 353.3L78.4 246.7L77.6 246.4L77 246L76.5 245.6L76.1 245.1L76 244.6L76.1 244.1L76.3 243.6L76.8 243.2L173.3 165.9L174 165.5L174.7 165.2L175.6 164.9L176.6 164.8L177.6 164.7L178.6 164.7L179.5 164.9L180.4 165.1ZM182 170.6L181 171.2L179.7 171.5L178.2 171.5L176.8 171.3L175.7 170.7L175.1 170.1L175.1 169.3L175.6 168.6L176.6 168.1L178 167.8L179.4 167.8L180.8 168L181.9 168.5L182.5 169.2L182.5 170ZM517.3 275.4L516.3 275.9L515 276.3L513.5 276.3L512.1 276L511 275.5L510.4 274.8L510.4 274.1L510.9 273.4L511.9 272.9L513.3 272.6L514.7 272.5L516.1 272.8L517.2 273.3L517.8 274L517.8 274.7ZM89.1 245L88.1 245.5L86.7 245.8L85.3 245.9L83.9 245.6L82.8 245.1L82.2 244.4L82.2 243.7L82.7 243L83.7 242.5L85 242.2L86.5 242.1L87.9 242.4L89 242.9L89.6 243.6L89.6 244.3ZM424.4 349.8L423.4 350.3L422 350.6L420.6 350.6L419.2 350.4L418.1 349.9L417.5 349.2L417.5 348.4L418 347.8L419 347.2L420.3 346.9L421.8 346.9L423.2 347.2L424.3 347.7L424.9 348.3L424.9 349.1Z\"/><g class=\"iso-dots\" data-tone=\"mid\"><circle cx=\"178.8\" cy=\"169.6\" r=\"0.5\"/><circle cx=\"514.1\" cy=\"274.4\" r=\"0.5\"/><circle cx=\"85.9\" cy=\"244\" r=\"0.5\"/><circle cx=\"421.2\" cy=\"348.8\" r=\"0.5\"/></g><path class=\"iso-halo\" d=\"M132.4 203.5L132.5 203.2L132.7 202.9L132.9 202.6L147.5 190.9L147.9 190.7L148.4 190.4L149 190.3L149.7 190.2L150.3 190.1L151 190.1L151.7 190.2L152.3 190.4L175.6 197.7L176.1 197.9L176.6 198.1L176.9 198.4L177.1 198.7L177.2 199.1L177.2 200.6L177.2 200.9L177 201.2L176.7 201.5L162.1 213.2L161.7 213.4L161.2 213.7L160.6 213.8L160 213.9L159.3 214L158.6 214L158 213.9L157.4 213.7L134 206.4L133.5 206.2L133.1 206L132.7 205.7L132.5 205.4L132.4 205Z\"/><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M132.4 201.9L132.9 201.1L147.5 189.4L148.8 188.8L150.6 188.6L152.3 188.9L175.6 196.2L176.8 196.8L177.2 197.7L177.2 200.7L176.7 201.5L162.1 213.2L160.8 213.8L159.1 214L157.4 213.7L134 206.4L132.8 205.8L132.4 204.9Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M177.2 200.7L176.7 201.5L176.7 198.5L177.2 197.7ZM176.7 201.5L162.1 213.2L162.1 210.2L176.7 198.5ZM162.1 213.2L160.8 213.8L160.8 210.8L162.1 210.2Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M160.8 213.8L159.1 214L159.1 211L160.8 210.8Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M159.1 214L157.4 213.7L157.4 210.8L159.1 211Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M157.4 213.7L134 206.4L134 203.5L157.4 210.8ZM134 206.4L132.8 205.8L132.8 202.8L134 203.5ZM132.8 205.8L132.4 204.9L132.4 201.9L132.8 202.8Z\"/><path class=\"iso-top\" d=\"M175.6 196.2L176.8 196.8L177.2 197.7L176.7 198.5L162.1 210.2L160.8 210.8L159.1 211L157.4 210.8L134 203.5L132.8 202.8L132.4 201.9L132.9 201.1L147.5 189.4L148.8 188.8L150.6 188.6L152.3 188.9Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M177.2 197.7L176.7 198.5L162.1 210.2L160.8 210.8L159.1 211L157.4 210.8L134 203.5L132.8 202.8L132.4 201.9\"/><path class=\"iso-line iso-bevel\" data-tone=\"faint\" d=\"M177.2 197.7L175.9 198.4L161.4 209.9L160.4 210.4L159.1 210.6L157.7 210.4L134.6 203.1L133.6 202.6L132.4 201.9\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M132.4 201.9L132.9 201.1L147.5 189.4L148.8 188.8L150.6 188.6L152.3 188.9L175.6 196.2L176.8 196.8L177.2 197.7M177.2 200.7L176.7 201.5L162.1 213.2L160.8 213.8L159.1 214L157.4 213.7L134 206.4L132.8 205.8L132.4 204.9M177.2 197.7L177.2 200.7M132.4 201.9L132.4 204.9\"/></g><g class=\"iso-dots\" data-tone=\"mid\"><circle cx=\"150.8\" cy=\"191.1\" r=\"0.45\"/><circle cx=\"172.3\" cy=\"197.8\" r=\"0.45\"/><circle cx=\"137.3\" cy=\"201.8\" r=\"0.45\"/><circle cx=\"158.9\" cy=\"208.6\" r=\"0.45\"/></g><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M141.6 84.9L142 84.2L150.2 77.7L151.1 77.2L152.4 77.1L153.7 77.3L166.8 81.4L167.8 81.9L168.1 82.5L168.1 198.6L167.7 199.3L159.5 205.8L158.5 206.3L157.2 206.4L155.9 206.2L142.8 202.1L141.9 201.7L141.6 201Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M168.1 198.6L167.7 199.3L167.7 83.1L168.1 82.5ZM167.7 199.3L159.5 205.8L159.5 89.7L167.7 83.1ZM159.5 205.8L158.5 206.3L158.5 90.2L159.5 89.7Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M158.5 206.3L157.2 206.4L157.2 90.3L158.5 90.2Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M157.2 206.4L155.9 206.2L155.9 90.1L157.2 90.3Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M155.9 206.2L142.8 202.1L142.8 86L155.9 90.1ZM142.8 202.1L141.9 201.7L141.9 85.5L142.8 86ZM141.9 201.7L141.6 201L141.6 84.9L141.9 85.5Z\"/><path class=\"iso-top\" d=\"M166.8 81.4L167.8 81.9L168.1 82.5L167.7 83.1L159.5 89.7L158.5 90.2L157.2 90.3L155.9 90.1L142.8 86L141.9 85.5L141.6 84.9L142 84.2L150.2 77.7L151.1 77.2L152.4 77.1L153.7 77.3Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M168.1 82.5L167.7 83.1L159.5 89.7L158.5 90.2L157.2 90.3L155.9 90.1L142.8 86L141.9 85.5L141.6 84.9\"/><path class=\"iso-line iso-bevel\" data-tone=\"faint\" d=\"M168.1 82.5L166.9 83L158.8 89.4L158.1 89.8L157.2 89.9L156.3 89.7L143.3 85.7L142.6 85.3L141.6 84.9\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M141.6 84.9L142 84.2L150.2 77.7L151.1 77.2L152.4 77.1L153.7 77.3L166.8 81.4L167.8 81.9L168.1 82.5M168.1 198.6L167.7 199.3L159.5 205.8L158.5 206.3L157.2 206.4L155.9 206.2L142.8 202.1L141.9 201.7L141.6 201M168.1 82.5L168.1 198.6M141.6 84.9L141.6 201\"/></g><g class=\"iso-dots\" data-tone=\"mid\"><circle cx=\"149.4\" cy=\"186.3\" r=\"0.45\"/><circle cx=\"149.4\" cy=\"108.9\" r=\"0.45\"/></g><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M133.4 81.5L133.4 79.8L134 78.1L135 76.5L136.6 75L138.6 73.7L141 72.5L143.7 71.5L146.8 70.8L150 70.2L153.3 70L156.7 70L160 70.3L163.2 70.8L166.2 71.6L168.9 72.6L171.3 73.8L173.2 75.2L174.7 76.7L175.8 78.3L176.3 80L176.3 82.9L176.2 84.6L175.7 86.3L174.6 87.9L173 89.4L171 90.7L168.6 91.9L165.9 92.9L162.9 93.7L159.6 94.2L156.3 94.4L152.9 94.4L149.6 94.1L146.4 93.6L143.4 92.8L140.7 91.8L138.4 90.6L136.4 89.2L134.9 87.7L133.9 86.1L133.4 84.4Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M173 89.4L171 90.7L171 87.8L173 86.4ZM171 90.7L168.6 91.9L168.6 88.9L171 87.8ZM168.6 91.9L165.9 92.9L165.9 89.9L168.6 88.9ZM176.3 82.9L176.2 84.6L176.2 81.7L176.3 80ZM176.2 84.6L175.7 86.3L175.7 83.3L176.2 81.7ZM175.7 86.3L174.6 87.9L174.6 84.9L175.7 83.3ZM174.6 87.9L173 89.4L173 86.4L174.6 84.9Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M165.9 92.9L162.9 93.7L162.9 90.7L165.9 89.9ZM162.9 93.7L159.6 94.2L159.6 91.2L162.9 90.7ZM159.6 94.2L156.3 94.4L156.3 91.4L159.6 91.2Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M156.3 94.4L152.9 94.4L152.9 91.4L156.3 91.4ZM152.9 94.4L149.6 94.1L149.6 91.1L152.9 91.4ZM149.6 94.1L146.4 93.6L146.4 90.6L149.6 91.1ZM146.4 93.6L143.4 92.8L143.4 89.8L146.4 90.6Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M143.4 92.8L140.7 91.8L140.7 88.8L143.4 89.8ZM140.7 91.8L138.4 90.6L138.4 87.6L140.7 88.8ZM138.4 90.6L136.4 89.2L136.4 86.3L138.4 87.6ZM136.4 89.2L134.9 87.7L134.9 84.7L136.4 86.3ZM134.9 87.7L133.9 86.1L133.9 83.1L134.9 84.7ZM133.9 86.1L133.4 84.4L133.4 81.5L133.9 83.1Z\"/><path class=\"iso-top\" d=\"M173 86.4L171 87.8L168.6 88.9L165.9 89.9L162.9 90.7L159.6 91.2L156.3 91.4L152.9 91.4L149.6 91.1L146.4 90.6L143.4 89.8L140.7 88.8L138.4 87.6L136.4 86.3L134.9 84.7L133.9 83.1L133.4 81.5L133.4 79.8L134 78.1L135 76.5L136.6 75L138.6 73.7L141 72.5L143.7 71.5L146.8 70.8L150 70.2L153.3 70L156.7 70L160 70.3L163.2 70.8L166.2 71.6L168.9 72.6L171.3 73.8L173.2 75.2L174.7 76.7L175.8 78.3L176.3 80L176.2 81.7L175.7 83.3L174.6 84.9Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M176.3 80L176.2 81.7L175.7 83.3L174.6 84.9L173 86.4L171 87.8L168.6 88.9L165.9 89.9L162.9 90.7L159.6 91.2L156.3 91.4L152.9 91.4L149.6 91.1L146.4 90.6L143.4 89.8L140.7 88.8L138.4 87.6L136.4 86.3L134.9 84.7L133.9 83.1L133.4 81.5\"/><path class=\"iso-line iso-bevel\" data-tone=\"faint\" d=\"M176.3 80L175.5 81.6L175 83.2L174 84.8L172.5 86.2L170.5 87.5L168.2 88.7L165.5 89.6L162.6 90.4L159.5 90.9L156.3 91.1L153 91.1L149.8 90.8L146.7 90.3L143.8 89.5L141.2 88.6L138.9 87.4L137 86.1L135.5 84.6L134.5 83.1L133.4 81.5\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M133.4 81.5L133.4 79.8L134 78.1L135 76.5L136.6 75L138.6 73.7L141 72.5L143.7 71.5L146.8 70.8L150 70.2L153.3 70L156.7 70L160 70.3L163.2 70.8L166.2 71.6L168.9 72.6L171.3 73.8L173.2 75.2L174.7 76.7L175.8 78.3L176.3 80M176.3 82.9L176.2 84.6L175.7 86.3L174.6 87.9L173 89.4L171 90.7L168.6 91.9L165.9 92.9L162.9 93.7L159.6 94.2L156.3 94.4L152.9 94.4L149.6 94.1L146.4 93.6L143.4 92.8L140.7 91.8L138.4 90.6L136.4 89.2L134.9 87.7L133.9 86.1L133.4 84.4M133.4 81.5L133.4 84.4M176.3 80L176.3 82.9\"/></g><g class=\"iso-solid\" data-solid=\"wheel-0\"><path class=\"iso-fill\" data-key=\"fill\" d=\"M162.4 77.1L162 77.5L161.7 77.9L161.4 78.3L161.2 78.8L161.1 79.6L163.7 83.1L162.2 83.5L160.7 83.8L159.1 84L157.4 84.1L155.8 84.2L154.2 84.2L153.4 80.6L152.7 79.8L152 79.4L151.4 79L150.7 78.8L150.1 78.6L149.4 78.4L148.6 78.2L147.8 78.1L146.7 77.9L145.1 77.9L138.1 79.2L137.4 78.5L136.8 77.7L136.4 76.9L136.1 76.1L135.9 75.3L135.9 74.4L143.2 74L144.7 73.7L145.6 73.3L146.2 73L146.8 72.7L147.2 72.4L147.6 72.1L148 71.7L148.2 71.2L148.4 70.7L148.5 69.9L145.9 66.4L147.4 66.1L149 65.8L150.6 65.6L152.2 65.4L153.8 65.3L155.5 65.3L156.2 69L157 69.7L157.6 70.1L158.3 70.5L158.9 70.7L159.6 71L160.2 71.2L161 71.3L161.9 71.5L163 71.6L164.6 71.6L171.5 70.3L172.2 71.1L172.8 71.8L173.2 72.6L173.5 73.4L173.7 74.3L173.7 75.1L166.4 75.5L165 75.8L164.1 76.2L163.4 76.5L162.8 76.8ZM162.4 83.1L162 83.4L161.7 83.8L161.4 84.2L161.2 84.8L161.1 85.6L163.7 89.1L162.2 89.4L160.7 89.7L159.1 89.9L157.4 90.1L155.8 90.2L154.2 90.2L153.4 86.5L152.7 85.8L152 85.3L151.4 85L150.7 84.7L150.1 84.5L149.4 84.3L148.6 84.1L147.8 84L146.7 83.9L145.1 83.9L138.1 85.2L137.4 84.4L136.8 83.6L136.4 82.8L136.1 82L135.9 81.2L135.9 80.4L143.2 80L144.7 79.6L145.6 79.3L146.2 79L146.8 78.7L147.2 78.3L147.6 78L148 77.6L148.2 77.2L148.4 76.6L148.5 75.8L145.9 72.4L147.4 72L149 71.7L150.6 71.5L152.2 71.4L153.8 71.3L155.5 71.3L156.2 74.9L157 75.6L157.6 76.1L158.3 76.4L158.9 76.7L159.6 76.9L160.2 77.1L161 77.3L161.9 77.4L163 77.5L164.6 77.6L171.5 76.3L172.2 77L172.8 77.8L173.2 78.6L173.5 79.4L173.7 80.2L173.7 81L166.4 81.4L165 81.8L164.1 82.1L163.4 82.4L162.8 82.8ZM162.4 83.1L162 83.4L162 77.5L162.4 77.1ZM162 83.4L161.7 83.8L161.7 77.9L162 77.5ZM161.7 83.8L161.4 84.2L161.4 78.3L161.7 77.9ZM161.4 84.2L161.2 84.8L161.2 78.8L161.4 78.3ZM161.2 84.8L161.1 85.6L161.1 79.6L161.2 78.8ZM163.7 89.1L162.2 89.4L162.2 83.5L163.7 83.1ZM162.2 89.4L160.7 89.7L160.7 83.8L162.2 83.5ZM160.7 89.7L159.1 89.9L159.1 84L160.7 83.8ZM159.1 89.9L157.4 90.1L157.4 84.1L159.1 84ZM157.4 90.1L155.8 90.2L155.8 84.2L157.4 84.1ZM155.8 90.2L154.2 90.2L154.2 84.2L155.8 84.2ZM154.2 90.2L153.4 86.5L153.4 80.6L154.2 84.2ZM153.4 86.5L152.7 85.8L152.7 79.8L153.4 80.6ZM152.7 85.8L152 85.3L152 79.4L152.7 79.8ZM152 85.3L151.4 85L151.4 79L152 79.4ZM151.4 85L150.7 84.7L150.7 78.8L151.4 79ZM150.7 84.7L150.1 84.5L150.1 78.6L150.7 78.8ZM150.1 84.5L149.4 84.3L149.4 78.4L150.1 78.6ZM149.4 84.3L148.6 84.1L148.6 78.2L149.4 78.4ZM148.6 84.1L147.8 84L147.8 78.1L148.6 78.2ZM147.8 84L146.7 83.9L146.7 77.9L147.8 78.1ZM146.7 83.9L145.1 83.9L145.1 77.9L146.7 77.9ZM145.1 83.9L138.1 85.2L138.1 79.2L145.1 77.9ZM138.1 85.2L137.4 84.4L137.4 78.5L138.1 79.2ZM137.4 84.4L136.8 83.6L136.8 77.7L137.4 78.5ZM136.8 83.6L136.4 82.8L136.4 76.9L136.8 77.7ZM136.4 82.8L136.1 82L136.1 76.1L136.4 76.9ZM136.1 82L135.9 81.2L135.9 75.3L136.1 76.1ZM135.9 81.2L135.9 80.4L135.9 74.4L135.9 75.3ZM148.5 75.8L145.9 72.4L145.9 66.4L148.5 69.9ZM173.7 81L166.4 81.4L166.4 75.5L173.7 75.1ZM166.4 81.4L165 81.8L165 75.8L166.4 75.5ZM165 81.8L164.1 82.1L164.1 76.2L165 75.8ZM164.1 82.1L163.4 82.4L163.4 76.5L164.1 76.2ZM163.4 82.4L162.8 82.8L162.8 76.8L163.4 76.5ZM162.8 82.8L162.4 83.1L162.4 77.1L162.8 76.8Z\"/><path class=\"iso-shade\" data-shade=\"0\" data-key=\"s0\" d=\"M162.4 83.1L162 83.4L162 77.5L162.4 77.1ZM162 83.4L161.7 83.8L161.7 77.9L162 77.5ZM161.7 83.8L161.4 84.2L161.4 78.3L161.7 77.9ZM161.4 84.2L161.2 84.8L161.2 78.8L161.4 78.3ZM161.2 84.8L161.1 85.6L161.1 79.6L161.2 78.8ZM165 81.8L164.1 82.1L164.1 76.2L165 75.8ZM164.1 82.1L163.4 82.4L163.4 76.5L164.1 76.2ZM163.4 82.4L162.8 82.8L162.8 76.8L163.4 76.5ZM162.8 82.8L162.4 83.1L162.4 77.1L162.8 76.8Z\"/><path class=\"iso-shade\" data-shade=\"1\" data-key=\"s1\" d=\"M163.7 89.1L162.2 89.4L162.2 83.5L163.7 83.1ZM162.2 89.4L160.7 89.7L160.7 83.8L162.2 83.5ZM160.7 89.7L159.1 89.9L159.1 84L160.7 83.8ZM159.1 89.9L157.4 90.1L157.4 84.1L159.1 84ZM157.4 90.1L155.8 90.2L155.8 84.2L157.4 84.1ZM155.8 90.2L154.2 90.2L154.2 84.2L155.8 84.2ZM145.1 83.9L138.1 85.2L138.1 79.2L145.1 77.9ZM173.7 81L166.4 81.4L166.4 75.5L173.7 75.1ZM166.4 81.4L165 81.8L165 75.8L166.4 75.5Z\"/><path class=\"iso-shade\" data-shade=\"2\" data-key=\"s2\" d=\"M150.1 84.5L149.4 84.3L149.4 78.4L150.1 78.6ZM149.4 84.3L148.6 84.1L148.6 78.2L149.4 78.4ZM148.6 84.1L147.8 84L147.8 78.1L148.6 78.2ZM147.8 84L146.7 83.9L146.7 77.9L147.8 78.1ZM146.7 83.9L145.1 83.9L145.1 77.9L146.7 77.9Z\"/><path class=\"iso-shade\" data-shade=\"3\" data-key=\"s3\" d=\"M154.2 90.2L153.4 86.5L153.4 80.6L154.2 84.2ZM153.4 86.5L152.7 85.8L152.7 79.8L153.4 80.6ZM152.7 85.8L152 85.3L152 79.4L152.7 79.8ZM152 85.3L151.4 85L151.4 79L152 79.4ZM151.4 85L150.7 84.7L150.7 78.8L151.4 79ZM150.7 84.7L150.1 84.5L150.1 78.6L150.7 78.8ZM138.1 85.2L137.4 84.4L137.4 78.5L138.1 79.2ZM137.4 84.4L136.8 83.6L136.8 77.7L137.4 78.5ZM136.8 83.6L136.4 82.8L136.4 76.9L136.8 77.7ZM136.4 82.8L136.1 82L136.1 76.1L136.4 76.9ZM136.1 82L135.9 81.2L135.9 75.3L136.1 76.1ZM135.9 81.2L135.9 80.4L135.9 74.4L135.9 75.3ZM148.5 75.8L145.9 72.4L145.9 66.4L148.5 69.9Z\"/><path class=\"iso-top\" data-key=\"top\" d=\"M162.4 77.1L162 77.5L161.7 77.9L161.4 78.3L161.2 78.8L161.1 79.6L163.7 83.1L162.2 83.5L160.7 83.8L159.1 84L157.4 84.1L155.8 84.2L154.2 84.2L153.4 80.6L152.7 79.8L152 79.4L151.4 79L150.7 78.8L150.1 78.6L149.4 78.4L148.6 78.2L147.8 78.1L146.7 77.9L145.1 77.9L138.1 79.2L137.4 78.5L136.8 77.7L136.4 76.9L136.1 76.1L135.9 75.3L135.9 74.4L143.2 74L144.7 73.7L145.6 73.3L146.2 73L146.8 72.7L147.2 72.4L147.6 72.1L148 71.7L148.2 71.2L148.4 70.7L148.5 69.9L145.9 66.4L147.4 66.1L149 65.8L150.6 65.6L152.2 65.4L153.8 65.3L155.5 65.3L156.2 69L157 69.7L157.6 70.1L158.3 70.5L158.9 70.7L159.6 71L160.2 71.2L161 71.3L161.9 71.5L163 71.6L164.6 71.6L171.5 70.3L172.2 71.1L172.8 71.8L173.2 72.6L173.5 73.4L173.7 74.3L173.7 75.1L166.4 75.5L165 75.8L164.1 76.2L163.4 76.5L162.8 76.8Z\"/><path class=\"iso-line\" data-tone=\"faint\" data-key=\"crease\" d=\"M163.7 83.1L162.2 83.5L160.7 83.8L159.1 84L157.4 84.1L155.8 84.2L154.2 84.2L153.4 80.6L152.7 79.8L152 79.4L151.4 79L150.7 78.8L150.1 78.6L149.4 78.4L148.6 78.2L147.8 78.1L146.7 77.9L145.1 77.9L138.1 79.2L137.4 78.5L136.8 77.7L136.4 76.9L136.1 76.1L135.9 75.3L135.9 74.4M148.5 69.9L145.9 66.4M173.7 75.1L166.4 75.5L165 75.8L164.1 76.2L163.4 76.5L162.8 76.8L162.4 77.1L162 77.5L161.7 77.9L161.4 78.3L161.2 78.8L161.1 79.6\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" data-key=\"edge\" d=\"M161.1 79.6L163.7 83.1M135.9 74.4L143.2 74L144.7 73.7L145.6 73.3L146.2 73L146.8 72.7L147.2 72.4L147.6 72.1L148 71.7L148.2 71.2L148.4 70.7L148.5 69.9M145.9 66.4L147.4 66.1L149 65.8L150.6 65.6L152.2 65.4L153.8 65.3L155.5 65.3L156.2 69L157 69.7L157.6 70.1L158.3 70.5L158.9 70.7L159.6 71L160.2 71.2L161 71.3L161.9 71.5L163 71.6L164.6 71.6L171.5 70.3L172.2 71.1L172.8 71.8L173.2 72.6L173.5 73.4L173.7 74.3L173.7 75.1M163.7 89.1L162.2 89.4L160.7 89.7L159.1 89.9L157.4 90.1L155.8 90.2L154.2 90.2L153.4 86.5L152.7 85.8L152 85.3L151.4 85L150.7 84.7L150.1 84.5L149.4 84.3L148.6 84.1L147.8 84L146.7 83.9L145.1 83.9L138.1 85.2L137.4 84.4L136.8 83.6L136.4 82.8L136.1 82L135.9 81.2L135.9 80.4M148.5 75.8L145.9 72.4M173.7 81L166.4 81.4L165 81.8L164.1 82.1L163.4 82.4L162.8 82.8L162.4 83.1L162 83.4L161.7 83.8L161.4 84.2L161.2 84.8L161.1 85.6M161.1 79.6L161.1 85.6M163.7 83.1L163.7 89.1M135.9 74.4L135.9 80.4M148.5 69.9L148.5 75.8M145.9 66.4L145.9 72.4M173.7 75.1L173.7 81\"/></g><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M149.7 64.5L150.4 63.6L151.8 62.8L153.7 62.4L155.7 62.4L157.5 62.8L159 63.4L159.8 64.4L159.9 65.4L159.9 75.2L159.2 76.1L157.8 76.9L156 77.3L154 77.3L152.1 76.9L150.6 76.3L149.8 75.3L149.7 74.3Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M159.2 76.1L157.8 76.9L157.8 67L159.2 66.3ZM159.9 75.2L159.2 76.1L159.2 66.3L159.9 65.4Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M157.8 76.9L156 77.3L156 67.4L157.8 67ZM156 77.3L154 77.3L154 67.5L156 67.4Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M154 77.3L152.1 76.9L152.1 67.1L154 67.5Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M152.1 76.9L150.6 76.3L150.6 66.4L152.1 67.1ZM150.6 76.3L149.8 75.3L149.8 65.5L150.6 66.4ZM149.8 75.3L149.7 74.3L149.7 64.5L149.8 65.5Z\"/><path class=\"iso-top\" d=\"M159.2 66.3L157.8 67L156 67.4L154 67.5L152.1 67.1L150.6 66.4L149.8 65.5L149.7 64.5L150.4 63.6L151.8 62.8L153.7 62.4L155.7 62.4L157.5 62.8L159 63.4L159.8 64.4L159.9 65.4Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M159.9 65.4L159.2 66.3L157.8 67L156 67.4L154 67.5L152.1 67.1L150.6 66.4L149.8 65.5L149.7 64.5\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M149.7 64.5L150.4 63.6L151.8 62.8L153.7 62.4L155.7 62.4L157.5 62.8L159 63.4L159.8 64.4L159.9 65.4M159.9 75.2L159.2 76.1L157.8 76.9L156 77.3L154 77.3L152.1 76.9L150.6 76.3L149.8 75.3L149.7 74.3M149.7 64.5L149.7 74.3M159.9 65.4L159.9 75.2\"/></g><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M136 45.6L136 44.2L136.5 42.7L137.4 41.3L138.8 40L140.5 38.8L142.7 37.7L145.1 36.9L147.7 36.2L150.6 35.8L153.5 35.6L156.5 35.6L159.4 35.8L162.2 36.3L164.8 37L167.2 37.9L169.3 38.9L171 40.1L172.3 41.4L173.2 42.9L173.7 44.3L173.7 64.3L173.7 65.8L173.2 67.2L172.2 68.6L170.9 69.9L169.1 71.1L167 72.2L164.6 73L161.9 73.7L159.1 74.1L156.1 74.4L153.2 74.4L150.2 74.1L147.4 73.6L144.8 73L142.4 72.1L140.3 71L138.6 69.8L137.3 68.5L136.4 67.1L136 65.6Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M170.9 69.9L169.1 71.1L169.1 51.2L170.9 50ZM169.1 71.1L167 72.2L167 52.2L169.1 51.2ZM167 72.2L164.6 73L164.6 53.1L167 52.2ZM173.7 64.3L173.7 65.8L173.7 45.8L173.7 44.3ZM173.7 65.8L173.2 67.2L173.2 47.3L173.7 45.8ZM173.2 67.2L172.2 68.6L172.2 48.7L173.2 47.3ZM172.2 68.6L170.9 69.9L170.9 50L172.2 48.7Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M164.6 73L161.9 73.7L161.9 53.8L164.6 53.1ZM161.9 73.7L159.1 74.1L159.1 54.2L161.9 53.8ZM159.1 74.1L156.1 74.4L156.1 54.4L159.1 54.2Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M156.1 74.4L153.2 74.4L153.2 54.4L156.1 54.4ZM153.2 74.4L150.2 74.1L150.2 54.2L153.2 54.4ZM150.2 74.1L147.4 73.6L147.4 53.7L150.2 54.2ZM147.4 73.6L144.8 73L144.8 53L147.4 53.7Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M144.8 73L142.4 72.1L142.4 52.1L144.8 53ZM142.4 72.1L140.3 71L140.3 51.1L142.4 52.1ZM140.3 71L138.6 69.8L138.6 49.9L140.3 51.1ZM138.6 69.8L137.3 68.5L137.3 48.5L138.6 49.9ZM137.3 68.5L136.4 67.1L136.4 47.1L137.3 48.5ZM136.4 67.1L136 65.6L136 45.6L136.4 47.1Z\"/><path class=\"iso-top\" d=\"M170.9 50L169.1 51.2L167 52.2L164.6 53.1L161.9 53.8L159.1 54.2L156.1 54.4L153.2 54.4L150.2 54.2L147.4 53.7L144.8 53L142.4 52.1L140.3 51.1L138.6 49.9L137.3 48.5L136.4 47.1L136 45.6L136 44.2L136.5 42.7L137.4 41.3L138.8 40L140.5 38.8L142.7 37.7L145.1 36.9L147.7 36.2L150.6 35.8L153.5 35.6L156.5 35.6L159.4 35.8L162.2 36.3L164.8 37L167.2 37.9L169.3 38.9L171 40.1L172.3 41.4L173.2 42.9L173.7 44.3L173.7 45.8L173.2 47.3L172.2 48.7Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M173.7 44.3L173.7 45.8L173.2 47.3L172.2 48.7L170.9 50L169.1 51.2L167 52.2L164.6 53.1L161.9 53.8L159.1 54.2L156.1 54.4L153.2 54.4L150.2 54.2L147.4 53.7L144.8 53L142.4 52.1L140.3 51.1L138.6 49.9L137.3 48.5L136.4 47.1L136 45.6\"/><path class=\"iso-line iso-bevel\" data-tone=\"faint\" d=\"M173.7 44.3L172.6 45.8L172.2 47.2L171.3 48.5L170 49.7L168.3 50.9L166.3 51.8L164 52.7L161.5 53.3L158.8 53.7L156.1 53.9L153.3 53.9L150.5 53.7L147.8 53.2L145.3 52.6L143.1 51.7L141.1 50.7L139.5 49.6L138.2 48.3L137.4 47L136 45.6\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M136 45.6L136 44.2L136.5 42.7L137.4 41.3L138.8 40L140.5 38.8L142.7 37.7L145.1 36.9L147.7 36.2L150.6 35.8L153.5 35.6L156.5 35.6L159.4 35.8L162.2 36.3L164.8 37L167.2 37.9L169.3 38.9L171 40.1L172.3 41.4L173.2 42.9L173.7 44.3M173.7 64.3L173.7 65.8L173.2 67.2L172.2 68.6L170.9 69.9L169.1 71.1L167 72.2L164.6 73L161.9 73.7L159.1 74.1L156.1 74.4L153.2 74.4L150.2 74.1L147.4 73.6L144.8 73L142.4 72.1L140.3 71L138.6 69.8L137.3 68.5L136.4 67.1L136 65.6M136 45.6L136 65.6M173.7 44.3L173.7 64.3\"/></g><path class=\"iso-line\" data-tone=\"faint\" d=\"M144.2 178.8L144.2 113.3M154.5 182L154.5 116.5M173.7 59.9L173.6 60.9L173.3 62L172.7 63L171.9 64L170.8 64.9L169.6 65.8L168.2 66.6L166.6 67.3L164.9 67.9L163 68.4L161.1 68.8L159 69.1L156.9 69.3L154.8 69.3L152.7 69.3L150.6 69.1L148.6 68.8L146.6 68.4L144.8 67.9L143 67.3L141.4 66.6L140 65.8L138.8 64.9L137.8 64L137 63L136.4 62L136 60.9L135.9 59.9M173.7 48.6L173.6 49.6L173.3 50.7L172.7 51.7L171.9 52.7L170.8 53.6L169.6 54.5L168.2 55.2L166.6 56L164.9 56.6L163 57.1L161.1 57.5L159 57.8L156.9 58L154.8 58L152.7 58L150.6 57.8L148.6 57.5L146.6 57.1L144.8 56.6L143 56L141.4 55.2L140 54.5L138.8 53.6L137.8 52.7L137 51.7L136.4 50.7L136 49.6L135.9 48.6\"/><path class=\"iso-line\" data-tone=\"lo\" d=\"M169.4 49.5L167.8 50.6L165.9 51.6L163.7 52.4L161.3 53L158.7 53.4L156 53.6L153.3 53.6L150.7 53.3L148.1 52.9L145.7 52.3L143.5 51.5L141.6 50.5L140.1 49.4L138.9 48.2L138.1 46.9L137.7 45.6L137.7 44.2L138.1 42.9L139 41.6L140.2 40.4L141.8 39.3L143.8 38.4L146 37.6L148.4 37L150.9 36.6L153.6 36.4L156.3 36.4L159 36.6L161.5 37.1L163.9 37.7L166.1 38.5L168 39.5L169.6 40.6L170.8 41.8L171.6 43.1L172 44.4L171.9 45.7L171.5 47.1L170.6 48.3Z\"/><g clip-path=\"url(#message-queue-hopper-0)\"><g class=\"mq-ball\" transform=\"translate(158.58 41.83)\"><circle class=\"mq-ball-body\" r=\"7.74\"/><circle class=\"mq-ball-shine\" cx=\"-2.32\" cy=\"-2.48\" r=\"4.02\"/><circle class=\"mq-ball-edge\" r=\"7.74\"/></g><g class=\"mq-ball\" transform=\"translate(145.91 46.28)\"><circle class=\"mq-ball-body\" r=\"7.74\"/><circle class=\"mq-ball-shine\" cx=\"-2.32\" cy=\"-2.48\" r=\"4.02\"/><circle class=\"mq-ball-edge\" r=\"7.74\"/></g><g class=\"mq-ball\" transform=\"translate(159.95 49.54)\"><circle class=\"mq-ball-body\" r=\"7.74\"/><circle class=\"mq-ball-shine\" cx=\"-2.32\" cy=\"-2.48\" r=\"4.02\"/><circle class=\"mq-ball-edge\" r=\"7.74\"/></g></g><g data-layer=\"front-0\" clip-path=\"url(#message-queue-under-0)\"><g class=\"mq-ball\" data-ball=\"1\" transform=\"translate(145.68 81.30)\"><circle class=\"mq-ball-body\" r=\"7.74\"/><circle class=\"mq-ball-shine\" cx=\"-2.32\" cy=\"-2.48\" r=\"4.02\"/><circle class=\"mq-ball-edge\" r=\"7.74\"/></g></g><path class=\"iso-halo\" d=\"M239.5 203.5L239.5 203.2L239.7 202.9L240 202.6L254.6 190.9L255 190.6L255.5 190.4L256.1 190.3L256.7 190.2L257.4 190.1L258 190.1L258.7 190.2L259.3 190.4L282.6 197.7L283.2 197.9L283.6 198.1L283.9 198.4L284.2 198.7L284.2 199.1L284.2 200.5L284.2 200.9L284 201.2L283.7 201.5L269.1 213.2L268.7 213.4L268.2 213.7L267.6 213.8L267 213.9L266.3 214L265.7 214L265 213.9L264.4 213.7L241.1 206.4L240.5 206.2L240.1 206L239.8 205.7L239.6 205.4L239.5 205Z\"/><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M239.5 201.9L240 201.1L254.6 189.4L255.9 188.8L257.6 188.6L259.3 188.9L282.6 196.2L283.8 196.8L284.2 197.7L284.2 200.7L283.7 201.5L269.1 213.2L267.8 213.8L266.1 214L264.4 213.7L241.1 206.4L239.9 205.8L239.5 204.9Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M284.2 200.7L283.7 201.5L283.7 198.5L284.2 197.7ZM283.7 201.5L269.1 213.2L269.1 210.2L283.7 198.5ZM269.1 213.2L267.8 213.8L267.8 210.8L269.1 210.2Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M267.8 213.8L266.1 214L266.1 211L267.8 210.8Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M266.1 214L264.4 213.7L264.4 210.7L266.1 211Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M264.4 213.7L241.1 206.4L241.1 203.5L264.4 210.7ZM241.1 206.4L239.9 205.8L239.9 202.8L241.1 203.5ZM239.9 205.8L239.5 204.9L239.5 201.9L239.9 202.8Z\"/><path class=\"iso-top\" d=\"M282.6 196.2L283.8 196.8L284.2 197.7L283.7 198.5L269.1 210.2L267.8 210.8L266.1 211L264.4 210.7L241.1 203.5L239.9 202.8L239.5 201.9L240 201.1L254.6 189.4L255.9 188.8L257.6 188.6L259.3 188.9Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M284.2 197.7L283.7 198.5L269.1 210.2L267.8 210.8L266.1 211L264.4 210.7L241.1 203.5L239.9 202.8L239.5 201.9\"/><path class=\"iso-line iso-bevel\" data-tone=\"faint\" d=\"M284.2 197.7L282.9 198.4L268.5 209.9L267.4 210.4L266.1 210.6L264.8 210.4L241.6 203.1L240.6 202.6L239.5 201.9\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M239.5 201.9L240 201.1L254.6 189.4L255.9 188.8L257.6 188.6L259.3 188.9L282.6 196.2L283.8 196.8L284.2 197.7M284.2 200.7L283.7 201.5L269.1 213.2L267.8 213.8L266.1 214L264.4 213.7L241.1 206.4L239.9 205.8L239.5 204.9M284.2 197.7L284.2 200.7M239.5 201.9L239.5 204.9\"/></g><g class=\"iso-dots\" data-tone=\"mid\"><circle cx=\"257.8\" cy=\"191\" r=\"0.45\"/><circle cx=\"279.4\" cy=\"197.8\" r=\"0.45\"/><circle cx=\"244.3\" cy=\"201.8\" r=\"0.45\"/><circle cx=\"265.9\" cy=\"208.6\" r=\"0.45\"/></g><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M248.6 84.9L249 84.2L257.2 77.7L258.2 77.2L259.5 77.1L260.8 77.3L273.9 81.4L274.8 81.9L275.1 82.5L275.1 198.6L274.7 199.3L266.5 205.8L265.5 206.3L264.2 206.4L262.9 206.2L249.8 202.1L248.9 201.6L248.6 201Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M275.1 198.6L274.7 199.3L274.7 83.1L275.1 82.5ZM274.7 199.3L266.5 205.8L266.5 89.7L274.7 83.1ZM266.5 205.8L265.5 206.3L265.5 90.2L266.5 89.7Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M265.5 206.3L264.2 206.4L264.2 90.3L265.5 90.2Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M264.2 206.4L262.9 206.2L262.9 90.1L264.2 90.3Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M262.9 206.2L249.8 202.1L249.8 86L262.9 90.1ZM249.8 202.1L248.9 201.6L248.9 85.5L249.8 86ZM248.9 201.6L248.6 201L248.6 84.9L248.9 85.5Z\"/><path class=\"iso-top\" d=\"M273.9 81.4L274.8 81.9L275.1 82.5L274.7 83.1L266.5 89.7L265.5 90.2L264.2 90.3L262.9 90.1L249.8 86L248.9 85.5L248.6 84.9L249 84.2L257.2 77.7L258.2 77.2L259.5 77.1L260.8 77.3Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M275.1 82.5L274.7 83.1L266.5 89.7L265.5 90.2L264.2 90.3L262.9 90.1L249.8 86L248.9 85.5L248.6 84.9\"/><path class=\"iso-line iso-bevel\" data-tone=\"faint\" d=\"M275.1 82.5L273.9 83L265.8 89.4L265.1 89.8L264.3 89.9L263.3 89.7L250.4 85.7L249.7 85.3L248.6 84.9\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M248.6 84.9L249 84.2L257.2 77.7L258.2 77.2L259.5 77.1L260.8 77.3L273.9 81.4L274.8 81.9L275.1 82.5M275.1 198.6L274.7 199.3L266.5 205.8L265.5 206.3L264.2 206.4L262.9 206.2L249.8 202.1L248.9 201.6L248.6 201M275.1 82.5L275.1 198.6M248.6 84.9L248.6 201\"/></g><g class=\"iso-dots\" data-tone=\"mid\"><circle cx=\"256.4\" cy=\"186.3\" r=\"0.45\"/><circle cx=\"256.4\" cy=\"108.9\" r=\"0.45\"/></g><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M240.4 81.5L240.4 79.8L241 78.1L242.1 76.5L243.6 75L245.6 73.7L248 72.5L250.8 71.5L253.8 70.8L257 70.2L260.4 70L263.7 70L267 70.3L270.2 70.8L273.2 71.6L275.9 72.6L278.3 73.8L280.3 75.2L281.8 76.7L282.8 78.3L283.3 80L283.3 82.9L283.3 84.6L282.7 86.3L281.6 87.9L280.1 89.4L278.1 90.7L275.7 91.9L272.9 92.9L269.9 93.7L266.7 94.2L263.3 94.4L260 94.4L256.7 94.1L253.5 93.6L250.5 92.8L247.8 91.8L245.4 90.6L243.4 89.2L241.9 87.7L240.9 86.1L240.4 84.4Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M280.1 89.4L278.1 90.7L278.1 87.8L280.1 86.4ZM278.1 90.7L275.7 91.9L275.7 88.9L278.1 87.8ZM275.7 91.9L272.9 92.9L272.9 89.9L275.7 88.9ZM283.3 82.9L283.3 84.6L283.3 81.6L283.3 80ZM283.3 84.6L282.7 86.3L282.7 83.3L283.3 81.6ZM282.7 86.3L281.6 87.9L281.6 84.9L282.7 83.3ZM281.6 87.9L280.1 89.4L280.1 86.4L281.6 84.9Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M272.9 92.9L269.9 93.7L269.9 90.7L272.9 89.9ZM269.9 93.7L266.7 94.2L266.7 91.2L269.9 90.7ZM266.7 94.2L263.3 94.4L263.3 91.4L266.7 91.2Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M263.3 94.4L260 94.4L260 91.4L263.3 91.4ZM260 94.4L256.7 94.1L256.7 91.1L260 91.4ZM256.7 94.1L253.5 93.6L253.5 90.6L256.7 91.1ZM253.5 93.6L250.5 92.8L250.5 89.8L253.5 90.6Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M250.5 92.8L247.8 91.8L247.8 88.8L250.5 89.8ZM247.8 91.8L245.4 90.6L245.4 87.6L247.8 88.8ZM245.4 90.6L243.4 89.2L243.4 86.2L245.4 87.6ZM243.4 89.2L241.9 87.7L241.9 84.7L243.4 86.2ZM241.9 87.7L240.9 86.1L240.9 83.1L241.9 84.7ZM240.9 86.1L240.4 84.4L240.4 81.5L240.9 83.1Z\"/><path class=\"iso-top\" d=\"M280.1 86.4L278.1 87.8L275.7 88.9L272.9 89.9L269.9 90.7L266.7 91.2L263.3 91.4L260 91.4L256.7 91.1L253.5 90.6L250.5 89.8L247.8 88.8L245.4 87.6L243.4 86.2L241.9 84.7L240.9 83.1L240.4 81.5L240.4 79.8L241 78.1L242.1 76.5L243.6 75L245.6 73.7L248 72.5L250.8 71.5L253.8 70.8L257 70.2L260.4 70L263.7 70L267 70.3L270.2 70.8L273.2 71.6L275.9 72.6L278.3 73.8L280.3 75.2L281.8 76.7L282.8 78.3L283.3 80L283.3 81.6L282.7 83.3L281.6 84.9Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M283.3 80L283.3 81.6L282.7 83.3L281.6 84.9L280.1 86.4L278.1 87.8L275.7 88.9L272.9 89.9L269.9 90.7L266.7 91.2L263.3 91.4L260 91.4L256.7 91.1L253.5 90.6L250.5 89.8L247.8 88.8L245.4 87.6L243.4 86.2L241.9 84.7L240.9 83.1L240.4 81.5\"/><path class=\"iso-line iso-bevel\" data-tone=\"faint\" d=\"M283.3 80L282.6 81.6L282 83.2L281 84.8L279.5 86.2L277.5 87.5L275.2 88.7L272.6 89.6L269.6 90.4L266.5 90.8L263.3 91.1L260 91.1L256.8 90.8L253.7 90.3L250.8 89.5L248.2 88.6L245.9 87.4L244 86.1L242.6 84.6L241.6 83.1L240.4 81.5\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M240.4 81.5L240.4 79.8L241 78.1L242.1 76.5L243.6 75L245.6 73.7L248 72.5L250.8 71.5L253.8 70.8L257 70.2L260.4 70L263.7 70L267 70.3L270.2 70.8L273.2 71.6L275.9 72.6L278.3 73.8L280.3 75.2L281.8 76.7L282.8 78.3L283.3 80M283.3 82.9L283.3 84.6L282.7 86.3L281.6 87.9L280.1 89.4L278.1 90.7L275.7 91.9L272.9 92.9L269.9 93.7L266.7 94.2L263.3 94.4L260 94.4L256.7 94.1L253.5 93.6L250.5 92.8L247.8 91.8L245.4 90.6L243.4 89.2L241.9 87.7L240.9 86.1L240.4 84.4M240.4 81.5L240.4 84.4M283.3 80L283.3 82.9\"/></g><g class=\"iso-solid\" data-solid=\"wheel-1\"><path class=\"iso-fill\" data-key=\"fill\" d=\"M269.9 77.3L269.1 77.5L268.5 77.8L268 78L267.4 78.3L267 78.7L266.5 79.1L266.1 79.7L265.8 80.8L266.1 84L264.5 84.1L262.8 84.2L261.2 84.2L259.5 84.1L257.9 84L257.9 81.2L257.7 79.9L257.3 79.2L256.8 78.8L256.4 78.4L255.9 78.1L255.3 77.8L254.7 77.6L254 77.3L253.1 77.1L251.9 76.9L249.8 76.7L243.4 76.9L243.1 76.1L243 75.3L243 74.4L243.1 73.6L243.4 72.8L249 72.8L251.6 72.7L252.9 72.5L253.8 72.3L254.6 72L255.2 71.8L255.7 71.5L256.3 71.2L256.7 70.8L257.2 70.4L257.6 69.8L257.9 68.7L257.6 65.5L259.2 65.4L260.9 65.3L262.5 65.3L264.2 65.4L265.8 65.5L265.8 68.3L266 69.6L266.4 70.3L266.9 70.7L267.3 71.1L267.8 71.4L268.4 71.7L269 72L269.7 72.2L270.6 72.4L271.8 72.7L273.9 72.8L280.3 72.6L280.6 73.4L280.7 74.3L280.7 75.1L280.6 75.9L280.3 76.7L274.7 76.7L272.1 76.8L270.8 77ZM269.9 83.2L269.1 83.5L268.5 83.7L268 84L267.4 84.3L267 84.6L266.5 85.1L266.1 85.7L265.8 86.7L266.1 89.9L264.5 90.1L262.8 90.2L261.2 90.2L259.5 90.1L257.9 90L257.9 87.1L257.7 85.8L257.3 85.2L256.8 84.7L256.4 84.4L255.9 84L255.3 83.8L254.7 83.5L254 83.3L253.1 83L251.9 82.8L249.8 82.7L243.4 82.8L243.1 82L243 81.2L243 80.4L243.1 79.6L243.4 78.7L249 78.7L251.6 78.6L252.9 78.4L253.8 78.2L254.6 78L255.2 77.7L255.7 77.4L256.3 77.1L256.7 76.8L257.2 76.3L257.6 75.8L257.9 74.7L257.6 71.5L259.2 71.4L260.9 71.3L262.5 71.3L264.2 71.3L265.8 71.5L265.8 74.3L266 75.6L266.4 76.2L266.9 76.7L267.3 77.1L267.8 77.4L268.4 77.7L269 77.9L269.7 78.2L270.6 78.4L271.8 78.6L273.9 78.8L280.3 78.6L280.6 79.4L280.7 80.2L280.7 81L280.6 81.9L280.3 82.7L274.7 82.7L272.1 82.8L270.8 83ZM269.9 83.2L269.1 83.5L269.1 77.5L269.9 77.3ZM269.1 83.5L268.5 83.7L268.5 77.8L269.1 77.5ZM268.5 83.7L268 84L268 78L268.5 77.8ZM268 84L267.4 84.3L267.4 78.3L268 78ZM267.4 84.3L267 84.6L267 78.7L267.4 78.3ZM267 84.6L266.5 85.1L266.5 79.1L267 78.7ZM266.5 85.1L266.1 85.7L266.1 79.7L266.5 79.1ZM266.1 85.7L265.8 86.7L265.8 80.8L266.1 79.7ZM266.1 89.9L264.5 90.1L264.5 84.1L266.1 84ZM264.5 90.1L262.8 90.2L262.8 84.2L264.5 84.1ZM262.8 90.2L261.2 90.2L261.2 84.2L262.8 84.2ZM261.2 90.2L259.5 90.1L259.5 84.1L261.2 84.2ZM259.5 90.1L257.9 90L257.9 84L259.5 84.1ZM257.9 90L257.9 87.1L257.9 81.2L257.9 84ZM257.9 87.1L257.7 85.8L257.7 79.9L257.9 81.2ZM257.7 85.8L257.3 85.2L257.3 79.2L257.7 79.9ZM257.3 85.2L256.8 84.7L256.8 78.8L257.3 79.2ZM256.8 84.7L256.4 84.4L256.4 78.4L256.8 78.8ZM256.4 84.4L255.9 84L255.9 78.1L256.4 78.4ZM255.9 84L255.3 83.8L255.3 77.8L255.9 78.1ZM255.3 83.8L254.7 83.5L254.7 77.6L255.3 77.8ZM254.7 83.5L254 83.3L254 77.3L254.7 77.6ZM254 83.3L253.1 83L253.1 77.1L254 77.3ZM253.1 83L251.9 82.8L251.9 76.9L253.1 77.1ZM251.9 82.8L249.8 82.7L249.8 76.7L251.9 76.9ZM249.8 82.7L243.4 82.8L243.4 76.9L249.8 76.7ZM243.4 82.8L243.1 82L243.1 76.1L243.4 76.9ZM243.1 82L243 81.2L243 75.3L243.1 76.1ZM243 81.2L243 80.4L243 74.4L243 75.3ZM257.9 74.7L257.6 71.5L257.6 65.5L257.9 68.7ZM280.7 81L280.6 81.9L280.6 75.9L280.7 75.1ZM280.6 81.9L280.3 82.7L280.3 76.7L280.6 75.9ZM280.3 82.7L274.7 82.7L274.7 76.7L280.3 76.7ZM274.7 82.7L272.1 82.8L272.1 76.8L274.7 76.7ZM272.1 82.8L270.8 83L270.8 77L272.1 76.8ZM270.8 83L269.9 83.2L269.9 77.3L270.8 77Z\"/><path class=\"iso-shade\" data-shade=\"0\" data-key=\"s0\" d=\"M269.9 83.2L269.1 83.5L269.1 77.5L269.9 77.3ZM269.1 83.5L268.5 83.7L268.5 77.8L269.1 77.5ZM268.5 83.7L268 84L268 78L268.5 77.8ZM268 84L267.4 84.3L267.4 78.3L268 78ZM267.4 84.3L267 84.6L267 78.7L267.4 78.3ZM267 84.6L266.5 85.1L266.5 79.1L267 78.7ZM266.5 85.1L266.1 85.7L266.1 79.7L266.5 79.1ZM266.1 85.7L265.8 86.7L265.8 80.8L266.1 79.7ZM280.7 81L280.6 81.9L280.6 75.9L280.7 75.1ZM280.6 81.9L280.3 82.7L280.3 76.7L280.6 75.9Z\"/><path class=\"iso-shade\" data-shade=\"1\" data-key=\"s1\" d=\"M266.1 89.9L264.5 90.1L264.5 84.1L266.1 84ZM264.5 90.1L262.8 90.2L262.8 84.2L264.5 84.1ZM262.8 90.2L261.2 90.2L261.2 84.2L262.8 84.2ZM249.8 82.7L243.4 82.8L243.4 76.9L249.8 76.7ZM280.3 82.7L274.7 82.7L274.7 76.7L280.3 76.7ZM274.7 82.7L272.1 82.8L272.1 76.8L274.7 76.7ZM272.1 82.8L270.8 83L270.8 77L272.1 76.8ZM270.8 83L269.9 83.2L269.9 77.3L270.8 77Z\"/><path class=\"iso-shade\" data-shade=\"2\" data-key=\"s2\" d=\"M261.2 90.2L259.5 90.1L259.5 84.1L261.2 84.2ZM259.5 90.1L257.9 90L257.9 84L259.5 84.1ZM254 83.3L253.1 83L253.1 77.1L254 77.3ZM253.1 83L251.9 82.8L251.9 76.9L253.1 77.1ZM251.9 82.8L249.8 82.7L249.8 76.7L251.9 76.9Z\"/><path class=\"iso-shade\" data-shade=\"3\" data-key=\"s3\" d=\"M257.9 90L257.9 87.1L257.9 81.2L257.9 84ZM257.9 87.1L257.7 85.8L257.7 79.9L257.9 81.2ZM257.7 85.8L257.3 85.2L257.3 79.2L257.7 79.9ZM257.3 85.2L256.8 84.7L256.8 78.8L257.3 79.2ZM256.8 84.7L256.4 84.4L256.4 78.4L256.8 78.8ZM256.4 84.4L255.9 84L255.9 78.1L256.4 78.4ZM255.9 84L255.3 83.8L255.3 77.8L255.9 78.1ZM255.3 83.8L254.7 83.5L254.7 77.6L255.3 77.8ZM254.7 83.5L254 83.3L254 77.3L254.7 77.6ZM243.4 82.8L243.1 82L243.1 76.1L243.4 76.9ZM243.1 82L243 81.2L243 75.3L243.1 76.1ZM243 81.2L243 80.4L243 74.4L243 75.3ZM257.9 74.7L257.6 71.5L257.6 65.5L257.9 68.7Z\"/><path class=\"iso-top\" data-key=\"top\" d=\"M269.9 77.3L269.1 77.5L268.5 77.8L268 78L267.4 78.3L267 78.7L266.5 79.1L266.1 79.7L265.8 80.8L266.1 84L264.5 84.1L262.8 84.2L261.2 84.2L259.5 84.1L257.9 84L257.9 81.2L257.7 79.9L257.3 79.2L256.8 78.8L256.4 78.4L255.9 78.1L255.3 77.8L254.7 77.6L254 77.3L253.1 77.1L251.9 76.9L249.8 76.7L243.4 76.9L243.1 76.1L243 75.3L243 74.4L243.1 73.6L243.4 72.8L249 72.8L251.6 72.7L252.9 72.5L253.8 72.3L254.6 72L255.2 71.8L255.7 71.5L256.3 71.2L256.7 70.8L257.2 70.4L257.6 69.8L257.9 68.7L257.6 65.5L259.2 65.4L260.9 65.3L262.5 65.3L264.2 65.4L265.8 65.5L265.8 68.3L266 69.6L266.4 70.3L266.9 70.7L267.3 71.1L267.8 71.4L268.4 71.7L269 72L269.7 72.2L270.6 72.4L271.8 72.7L273.9 72.8L280.3 72.6L280.6 73.4L280.7 74.3L280.7 75.1L280.6 75.9L280.3 76.7L274.7 76.7L272.1 76.8L270.8 77Z\"/><path class=\"iso-line\" data-tone=\"faint\" data-key=\"crease\" d=\"M266.1 84L264.5 84.1L262.8 84.2L261.2 84.2L259.5 84.1L257.9 84L257.9 81.2L257.7 79.9L257.3 79.2L256.8 78.8L256.4 78.4L255.9 78.1L255.3 77.8L254.7 77.6L254 77.3L253.1 77.1L251.9 76.9L249.8 76.7L243.4 76.9L243.1 76.1L243 75.3L243 74.4M257.9 68.7L257.6 65.5M280.7 75.1L280.6 75.9L280.3 76.7L274.7 76.7L272.1 76.8L270.8 77L269.9 77.3L269.1 77.5L268.5 77.8L268 78L267.4 78.3L267 78.7L266.5 79.1L266.1 79.7L265.8 80.8\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" data-key=\"edge\" d=\"M265.8 80.8L266.1 84M243 74.4L243.1 73.6L243.4 72.8L249 72.8L251.6 72.7L252.9 72.5L253.8 72.3L254.6 72L255.2 71.8L255.7 71.5L256.3 71.2L256.7 70.8L257.2 70.4L257.6 69.8L257.9 68.7M257.6 65.5L259.2 65.4L260.9 65.3L262.5 65.3L264.2 65.4L265.8 65.5L265.8 68.3L266 69.6L266.4 70.3L266.9 70.7L267.3 71.1L267.8 71.4L268.4 71.7L269 72L269.7 72.2L270.6 72.4L271.8 72.7L273.9 72.8L280.3 72.6L280.6 73.4L280.7 74.3L280.7 75.1M266.1 89.9L264.5 90.1L262.8 90.2L261.2 90.2L259.5 90.1L257.9 90L257.9 87.1L257.7 85.8L257.3 85.2L256.8 84.7L256.4 84.4L255.9 84L255.3 83.8L254.7 83.5L254 83.3L253.1 83L251.9 82.8L249.8 82.7L243.4 82.8L243.1 82L243 81.2L243 80.4M257.9 74.7L257.6 71.5M280.7 81L280.6 81.9L280.3 82.7L274.7 82.7L272.1 82.8L270.8 83L269.9 83.2L269.1 83.5L268.5 83.7L268 84L267.4 84.3L267 84.6L266.5 85.1L266.1 85.7L265.8 86.7M265.8 80.8L265.8 86.7M266.1 84L266.1 89.9M243 74.4L243 80.4M257.9 68.7L257.9 74.7M257.6 65.5L257.6 71.5M280.7 75.1L280.7 81\"/></g><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M256.8 64.5L257.5 63.6L258.9 62.8L260.7 62.4L262.7 62.4L264.6 62.7L266 63.4L266.9 64.4L266.9 65.4L266.9 75.2L266.2 76.1L264.8 76.9L263 77.3L261 77.3L259.1 76.9L257.7 76.3L256.8 75.3L256.8 74.3Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M266.2 76.1L264.8 76.9L264.8 67L266.2 66.3ZM266.9 75.2L266.2 76.1L266.2 66.3L266.9 65.4Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M264.8 76.9L263 77.3L263 67.4L264.8 67ZM263 77.3L261 77.3L261 67.5L263 67.4Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M261 77.3L259.1 76.9L259.1 67.1L261 67.5Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M259.1 76.9L257.7 76.3L257.7 66.4L259.1 67.1ZM257.7 76.3L256.8 75.3L256.8 65.5L257.7 66.4ZM256.8 75.3L256.8 74.3L256.8 64.5L256.8 65.5Z\"/><path class=\"iso-top\" d=\"M266.2 66.3L264.8 67L263 67.4L261 67.5L259.1 67.1L257.7 66.4L256.8 65.5L256.8 64.5L257.5 63.6L258.9 62.8L260.7 62.4L262.7 62.4L264.6 62.7L266 63.4L266.9 64.4L266.9 65.4Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M266.9 65.4L266.2 66.3L264.8 67L263 67.4L261 67.5L259.1 67.1L257.7 66.4L256.8 65.5L256.8 64.5\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M256.8 64.5L257.5 63.6L258.9 62.8L260.7 62.4L262.7 62.4L264.6 62.7L266 63.4L266.9 64.4L266.9 65.4M266.9 75.2L266.2 76.1L264.8 76.9L263 77.3L261 77.3L259.1 76.9L257.7 76.3L256.8 75.3L256.8 74.3M256.8 64.5L256.8 74.3M266.9 65.4L266.9 75.2\"/></g><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M243 45.6L243 44.2L243.5 42.7L244.4 41.3L245.8 40L247.6 38.8L249.7 37.7L252.1 36.9L254.8 36.2L257.6 35.8L260.5 35.6L263.5 35.6L266.4 35.8L269.2 36.3L271.9 37L274.3 37.8L276.3 38.9L278.1 40.1L279.4 41.4L280.3 42.9L280.7 44.3L280.7 64.3L280.7 65.8L280.2 67.2L279.3 68.6L277.9 69.9L276.1 71.1L274 72.2L271.6 73L268.9 73.7L266.1 74.1L263.2 74.4L260.2 74.4L257.3 74.1L254.5 73.6L251.8 73L249.4 72.1L247.4 71L245.6 69.8L244.3 68.5L243.4 67.1L243 65.6Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M277.9 69.9L276.1 71.1L276.1 51.2L277.9 50ZM276.1 71.1L274 72.2L274 52.2L276.1 51.2ZM274 72.2L271.6 73L271.6 53.1L274 52.2ZM280.7 64.3L280.7 65.8L280.7 45.8L280.7 44.3ZM280.7 65.8L280.2 67.2L280.2 47.3L280.7 45.8ZM280.2 67.2L279.3 68.6L279.3 48.7L280.2 47.3ZM279.3 68.6L277.9 69.9L277.9 50L279.3 48.7Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M271.6 73L268.9 73.7L268.9 53.7L271.6 53.1ZM268.9 73.7L266.1 74.1L266.1 54.2L268.9 53.7ZM266.1 74.1L263.2 74.4L263.2 54.4L266.1 54.2Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M263.2 74.4L260.2 74.4L260.2 54.4L263.2 54.4ZM260.2 74.4L257.3 74.1L257.3 54.2L260.2 54.4ZM257.3 74.1L254.5 73.6L254.5 53.7L257.3 54.2ZM254.5 73.6L251.8 73L251.8 53L254.5 53.7Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M251.8 73L249.4 72.1L249.4 52.1L251.8 53ZM249.4 72.1L247.4 71L247.4 51.1L249.4 52.1ZM247.4 71L245.6 69.8L245.6 49.9L247.4 51.1ZM245.6 69.8L244.3 68.5L244.3 48.5L245.6 49.9ZM244.3 68.5L243.4 67.1L243.4 47.1L244.3 48.5ZM243.4 67.1L243 65.6L243 45.6L243.4 47.1Z\"/><path class=\"iso-top\" d=\"M277.9 50L276.1 51.2L274 52.2L271.6 53.1L268.9 53.7L266.1 54.2L263.2 54.4L260.2 54.4L257.3 54.2L254.5 53.7L251.8 53L249.4 52.1L247.4 51.1L245.6 49.9L244.3 48.5L243.4 47.1L243 45.6L243 44.2L243.5 42.7L244.4 41.3L245.8 40L247.6 38.8L249.7 37.7L252.1 36.9L254.8 36.2L257.6 35.8L260.5 35.6L263.5 35.6L266.4 35.8L269.2 36.3L271.9 37L274.3 37.8L276.3 38.9L278.1 40.1L279.4 41.4L280.3 42.9L280.7 44.3L280.7 45.8L280.2 47.3L279.3 48.7Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M280.7 44.3L280.7 45.8L280.2 47.3L279.3 48.7L277.9 50L276.1 51.2L274 52.2L271.6 53.1L268.9 53.7L266.1 54.2L263.2 54.4L260.2 54.4L257.3 54.2L254.5 53.7L251.8 53L249.4 52.1L247.4 51.1L245.6 49.9L244.3 48.5L243.4 47.1L243 45.6\"/><path class=\"iso-line iso-bevel\" data-tone=\"faint\" d=\"M280.7 44.3L279.7 45.8L279.2 47.1L278.3 48.5L277 49.7L275.3 50.8L273.3 51.8L271.1 52.6L268.5 53.3L265.9 53.7L263.1 53.9L260.3 53.9L257.5 53.7L254.9 53.2L252.4 52.6L250.1 51.7L248.2 50.7L246.5 49.6L245.3 48.3L244.4 47L243 45.6\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M243 45.6L243 44.2L243.5 42.7L244.4 41.3L245.8 40L247.6 38.8L249.7 37.7L252.1 36.9L254.8 36.2L257.6 35.8L260.5 35.6L263.5 35.6L266.4 35.8L269.2 36.3L271.9 37L274.3 37.8L276.3 38.9L278.1 40.1L279.4 41.4L280.3 42.9L280.7 44.3M280.7 64.3L280.7 65.8L280.2 67.2L279.3 68.6L277.9 69.9L276.1 71.1L274 72.2L271.6 73L268.9 73.7L266.1 74.1L263.2 74.4L260.2 74.4L257.3 74.1L254.5 73.6L251.8 73L249.4 72.1L247.4 71L245.6 69.8L244.3 68.5L243.4 67.1L243 65.6M243 45.6L243 65.6M280.7 44.3L280.7 64.3\"/></g><path class=\"iso-line\" data-tone=\"faint\" d=\"M251.3 178.8L251.3 113.3M261.5 182L261.5 116.5M280.8 59.9L280.6 60.9L280.3 62L279.7 63L278.9 64L277.9 64.9L276.6 65.8L275.2 66.6L273.6 67.3L271.9 67.9L270.1 68.4L268.1 68.8L266.1 69.1L264 69.3L261.9 69.3L259.7 69.3L257.6 69.1L255.6 68.8L253.6 68.4L251.8 67.9L250.1 67.3L248.5 66.6L247.1 65.8L245.8 64.9L244.8 64L244 63L243.4 62L243.1 60.9L242.9 59.9M280.8 48.6L280.6 49.6L280.3 50.7L279.7 51.7L278.9 52.7L277.9 53.6L276.6 54.5L275.2 55.2L273.6 55.9L271.9 56.6L270.1 57.1L268.1 57.5L266.1 57.8L264 58L261.9 58L259.7 58L257.6 57.8L255.6 57.5L253.6 57.1L251.8 56.6L250.1 55.9L248.5 55.2L247.1 54.5L245.8 53.6L244.8 52.7L244 51.7L243.4 50.7L243.1 49.6L242.9 48.6\"/><path class=\"iso-line\" data-tone=\"lo\" d=\"M276.4 49.5L274.8 50.6L272.9 51.6L270.7 52.4L268.3 53L265.7 53.4L263.1 53.6L260.4 53.5L257.7 53.3L255.1 52.9L252.7 52.3L250.6 51.5L248.7 50.5L247.1 49.4L245.9 48.2L245.1 46.9L244.7 45.6L244.7 44.2L245.2 42.9L246 41.6L247.3 40.4L248.9 39.3L250.8 38.4L253 37.6L255.4 37L258 36.6L260.7 36.4L263.3 36.4L266 36.6L268.6 37.1L271 37.7L273.1 38.5L275 39.5L276.6 40.6L277.8 41.8L278.6 43L279 44.4L279 45.7L278.5 47.1L277.7 48.3Z\"/><g clip-path=\"url(#message-queue-hopper-1)\"><g class=\"mq-ball\" transform=\"translate(256.37 42.34)\"><circle class=\"mq-ball-body\" r=\"7.74\"/><circle class=\"mq-ball-shine\" cx=\"-2.32\" cy=\"-2.48\" r=\"4.02\"/><circle class=\"mq-ball-edge\" r=\"7.74\"/></g><g class=\"mq-ball\" transform=\"translate(270.71 45.27)\"><circle class=\"mq-ball-body\" r=\"7.74\"/><circle class=\"mq-ball-shine\" cx=\"-2.32\" cy=\"-2.48\" r=\"4.02\"/><circle class=\"mq-ball-edge\" r=\"7.74\"/></g><g class=\"mq-ball\" transform=\"translate(258.47 50.01)\"><circle class=\"mq-ball-body\" r=\"7.74\"/><circle class=\"mq-ball-shine\" cx=\"-2.32\" cy=\"-2.48\" r=\"4.02\"/><circle class=\"mq-ball-edge\" r=\"7.74\"/></g></g><g data-layer=\"front-1\" clip-path=\"url(#message-queue-under-1)\"><g class=\"mq-ball\" data-ball=\"0\" transform=\"translate(274.01 80.09)\"><circle class=\"mq-ball-body\" r=\"7.74\"/><circle class=\"mq-ball-shine\" cx=\"-2.32\" cy=\"-2.48\" r=\"4.02\"/><circle class=\"mq-ball-edge\" r=\"7.74\"/></g></g><path class=\"iso-halo\" d=\"M204 228.1L204.1 227.7L204.3 227.3L204.7 226.9L205.2 226.6L205.8 226.3L206.6 226.1L207.4 226L208.2 225.9L209 225.9L209.9 226.1L210.6 226.2L211.3 226.5L211.8 226.8L212.3 227.2L212.5 227.6L212.6 228L212.6 229.5L212.6 229.9L212.4 230.3L212 230.7L211.5 231L210.8 231.3L210.1 231.5L209.3 231.6L208.5 231.7L207.6 231.7L206.8 231.6L206.1 231.4L205.4 231.1L204.8 230.8L204.4 230.4L204.2 230L204 229.6Z\"/><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M204.3 142.9L204.8 142.2L205.9 141.6L207.4 141.3L209 141.2L210.5 141.5L211.7 142.1L212.4 142.8L212.4 143.6L212.4 229.9L211.8 230.6L210.7 231.2L209.3 231.6L207.7 231.6L206.2 231.3L205 230.7L204.3 230L204.3 229.2Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M211.8 230.6L210.7 231.2L210.7 144.9L211.8 144.4ZM212.4 229.9L211.8 230.6L211.8 144.4L212.4 143.6Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M210.7 231.2L209.3 231.6L209.3 145.3L210.7 144.9ZM209.3 231.6L207.7 231.6L207.7 145.3L209.3 145.3Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M207.7 231.6L206.2 231.3L206.2 145L207.7 145.3Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M206.2 231.3L205 230.7L205 144.5L206.2 145ZM205 230.7L204.3 230L204.3 143.7L205 144.5ZM204.3 230L204.3 229.2L204.3 142.9L204.3 143.7Z\"/><path class=\"iso-top\" d=\"M211.8 144.4L210.7 144.9L209.3 145.3L207.7 145.3L206.2 145L205 144.5L204.3 143.7L204.3 142.9L204.8 142.2L205.9 141.6L207.4 141.3L209 141.2L210.5 141.5L211.7 142.1L212.4 142.8L212.4 143.6Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M212.4 143.6L211.8 144.4L210.7 144.9L209.3 145.3L207.7 145.3L206.2 145L205 144.5L204.3 143.7L204.3 142.9\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M204.3 142.9L204.8 142.2L205.9 141.6L207.4 141.3L209 141.2L210.5 141.5L211.7 142.1L212.4 142.8L212.4 143.6M212.4 229.9L211.8 230.6L210.7 231.2L209.3 231.6L207.7 231.6L206.2 231.3L205 230.7L204.3 230L204.3 229.2M204.3 142.9L204.3 229.2M212.4 143.6L212.4 229.9\"/></g><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M193.8 134.8L193.8 133.7L194.2 132.6L194.9 131.5L195.9 130.5L197.3 129.5L198.9 128.7L200.8 128.1L202.9 127.6L205.1 127.2L207.3 127L209.6 127.1L211.9 127.2L214 127.6L216.1 128.1L217.9 128.8L219.5 129.6L220.9 130.6L221.9 131.6L222.6 132.7L222.9 133.8L222.9 142.8L222.9 143.9L222.5 145L221.8 146.1L220.7 147.1L219.4 148.1L217.7 148.9L215.9 149.5L213.8 150L211.6 150.4L209.4 150.6L207.1 150.5L204.8 150.4L202.6 150L200.6 149.5L198.8 148.8L197.1 148L195.8 147L194.8 146L194.1 144.9L193.8 143.8Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M220.7 147.1L219.4 148.1L219.4 139.1L220.7 138.2ZM219.4 148.1L217.7 148.9L217.7 139.9L219.4 139.1ZM217.7 148.9L215.9 149.5L215.9 140.6L217.7 139.9ZM222.9 142.8L222.9 143.9L222.9 135L222.9 133.8ZM222.9 143.9L222.5 145L222.5 136.1L222.9 135ZM222.5 145L221.8 146.1L221.8 137.2L222.5 136.1ZM221.8 146.1L220.7 147.1L220.7 138.2L221.8 137.2Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M215.9 149.5L213.8 150L213.8 141.1L215.9 140.6ZM213.8 150L211.6 150.4L211.6 141.5L213.8 141.1ZM211.6 150.4L209.4 150.6L209.4 141.6L211.6 141.5Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M209.4 150.6L207.1 150.5L207.1 141.6L209.4 141.6ZM207.1 150.5L204.8 150.4L204.8 141.4L207.1 141.6ZM204.8 150.4L202.6 150L202.6 141.1L204.8 141.4ZM202.6 150L200.6 149.5L200.6 140.5L202.6 141.1Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M200.6 149.5L198.8 148.8L198.8 139.8L200.6 140.5ZM198.8 148.8L197.1 148L197.1 139L198.8 139.8ZM197.1 148L195.8 147L195.8 138.1L197.1 139ZM195.8 147L194.8 146L194.8 137.1L195.8 138.1ZM194.8 146L194.1 144.9L194.1 136L194.8 137.1ZM194.1 144.9L193.8 143.8L193.8 134.8L194.1 136Z\"/><path class=\"iso-top\" d=\"M220.7 138.2L219.4 139.1L217.7 139.9L215.9 140.6L213.8 141.1L211.6 141.5L209.4 141.6L207.1 141.6L204.8 141.4L202.6 141.1L200.6 140.5L198.8 139.8L197.1 139L195.8 138.1L194.8 137.1L194.1 136L193.8 134.8L193.8 133.7L194.2 132.6L194.9 131.5L195.9 130.5L197.3 129.5L198.9 128.7L200.8 128.1L202.9 127.6L205.1 127.2L207.3 127L209.6 127.1L211.9 127.2L214 127.6L216.1 128.1L217.9 128.8L219.5 129.6L220.9 130.6L221.9 131.6L222.6 132.7L222.9 133.8L222.9 135L222.5 136.1L221.8 137.2Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M222.9 133.8L222.9 135L222.5 136.1L221.8 137.2L220.7 138.2L219.4 139.1L217.7 139.9L215.9 140.6L213.8 141.1L211.6 141.5L209.4 141.6L207.1 141.6L204.8 141.4L202.6 141.1L200.6 140.5L198.8 139.8L197.1 139L195.8 138.1L194.8 137.1L194.1 136L193.8 134.8\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M193.8 134.8L193.8 133.7L194.2 132.6L194.9 131.5L195.9 130.5L197.3 129.5L198.9 128.7L200.8 128.1L202.9 127.6L205.1 127.2L207.3 127L209.6 127.1L211.9 127.2L214 127.6L216.1 128.1L217.9 128.8L219.5 129.6L220.9 130.6L221.9 131.6L222.6 132.7L222.9 133.8M222.9 142.8L222.9 143.9L222.5 145L221.8 146.1L220.7 147.1L219.4 148.1L217.7 148.9L215.9 149.5L213.8 150L211.6 150.4L209.4 150.6L207.1 150.5L204.8 150.4L202.6 150L200.6 149.5L198.8 148.8L197.1 148L195.8 147L194.8 146L194.1 144.9L193.8 143.8M193.8 134.8L193.8 143.8M222.9 133.8L222.9 142.8\"/></g><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M193.7 128.4L193.8 127.4L194.2 126.5L194.8 125.6L195.6 124.8L196.6 124L197.8 123.3L199.2 122.7L200.7 122.1L202.4 121.7L204.1 121.4L206 121.2L207.8 121.1L209.7 121.1L211.5 121.2L213.3 121.5L215 121.9L216.6 122.4L218.1 122.9L219.4 123.6L220.5 124.4L221.5 125.2L222.2 126L222.7 126.9L222.9 127.9L220.4 127.1L220 126.4L219.5 125.7L218.7 125L217.8 124.4L216.8 123.9L215.6 123.4L214.3 123L213 122.6L211.5 122.4L210.1 122.2L208.6 122.2L207 122.2L205.6 122.3L204.1 122.6L202.7 122.9L201.4 123.2L200.2 123.7L199.1 124.2L198.2 124.8L197.4 125.5L196.8 126.2L196.3 126.9L196.1 127.6L196 128.4ZM193.7 134.3L193.8 133.4L194.2 132.5L194.8 131.6L195.6 130.8L196.6 130L197.8 129.3L199.2 128.6L200.7 128.1L202.4 127.7L204.1 127.3L206 127.1L207.8 127L209.7 127.1L211.5 127.2L213.3 127.5L215 127.8L216.6 128.3L218.1 128.9L219.4 129.6L220.5 130.3L221.5 131.1L222.2 132L222.7 132.9L222.9 133.8L220.4 133L220 132.3L219.5 131.6L218.7 131L217.8 130.4L216.8 129.8L215.6 129.3L214.3 128.9L213 128.6L211.5 128.4L210.1 128.2L208.6 128.1L207 128.2L205.6 128.3L204.1 128.5L202.7 128.8L201.4 129.2L200.2 129.7L199.1 130.2L198.2 130.8L197.4 131.4L196.8 132.1L196.3 132.8L196.1 133.6L196 134.3ZM222.9 133.8L220.4 133L220.4 127.1L222.9 127.9ZM220.4 133L220 132.3L220 126.4L220.4 127.1ZM220 132.3L219.5 131.6L219.5 125.7L220 126.4ZM219.5 131.6L218.7 131L218.7 125L219.5 125.7ZM218.7 131L217.8 130.4L217.8 124.4L218.7 125ZM217.8 130.4L216.8 129.8L216.8 123.9L217.8 124.4ZM216.8 129.8L215.6 129.3L215.6 123.4L216.8 123.9ZM215.6 129.3L214.3 128.9L214.3 123L215.6 123.4ZM214.3 128.9L213 128.6L213 122.6L214.3 123ZM213 128.6L211.5 128.4L211.5 122.4L213 122.6ZM211.5 128.4L210.1 128.2L210.1 122.2L211.5 122.4ZM210.1 128.2L208.6 128.1L208.6 122.2L210.1 122.2ZM208.6 128.1L207 128.2L207 122.2L208.6 122.2ZM207 128.2L205.6 128.3L205.6 122.3L207 122.2ZM205.6 128.3L204.1 128.5L204.1 122.6L205.6 122.3ZM204.1 128.5L202.7 128.8L202.7 122.9L204.1 122.6ZM202.7 128.8L201.4 129.2L201.4 123.2L202.7 122.9ZM201.4 129.2L200.2 129.7L200.2 123.7L201.4 123.2ZM200.2 129.7L199.1 130.2L199.1 124.2L200.2 123.7ZM199.1 130.2L198.2 130.8L198.2 124.8L199.1 124.2ZM198.2 130.8L197.4 131.4L197.4 125.5L198.2 124.8ZM197.4 131.4L196.8 132.1L196.8 126.2L197.4 125.5ZM196.8 132.1L196.3 132.8L196.3 126.9L196.8 126.2ZM196.3 132.8L196.1 133.6L196.1 127.6L196.3 126.9ZM196.1 133.6L196 134.3L196 128.4L196.1 127.6ZM196 134.3L193.7 134.3L193.7 128.4L196 128.4Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M202.7 128.8L201.4 129.2L201.4 123.2L202.7 122.9ZM201.4 129.2L200.2 129.7L200.2 123.7L201.4 123.2ZM200.2 129.7L199.1 130.2L199.1 124.2L200.2 123.7ZM199.1 130.2L198.2 130.8L198.2 124.8L199.1 124.2ZM198.2 130.8L197.4 131.4L197.4 125.5L198.2 124.8ZM197.4 131.4L196.8 132.1L196.8 126.2L197.4 125.5ZM196.8 132.1L196.3 132.8L196.3 126.9L196.8 126.2ZM196.3 132.8L196.1 133.6L196.1 127.6L196.3 126.9ZM196.1 133.6L196 134.3L196 128.4L196.1 127.6Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M208.6 128.1L207 128.2L207 122.2L208.6 122.2ZM207 128.2L205.6 128.3L205.6 122.3L207 122.2ZM205.6 128.3L204.1 128.5L204.1 122.6L205.6 122.3ZM204.1 128.5L202.7 128.8L202.7 122.9L204.1 122.6Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M214.3 128.9L213 128.6L213 122.6L214.3 123ZM213 128.6L211.5 128.4L211.5 122.4L213 122.6ZM211.5 128.4L210.1 128.2L210.1 122.2L211.5 122.4ZM210.1 128.2L208.6 128.1L208.6 122.2L210.1 122.2ZM196 134.3L193.7 134.3L193.7 128.4L196 128.4Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M222.9 133.8L220.4 133L220.4 127.1L222.9 127.9ZM220.4 133L220 132.3L220 126.4L220.4 127.1ZM220 132.3L219.5 131.6L219.5 125.7L220 126.4ZM219.5 131.6L218.7 131L218.7 125L219.5 125.7ZM218.7 131L217.8 130.4L217.8 124.4L218.7 125ZM217.8 130.4L216.8 129.8L216.8 123.9L217.8 124.4ZM216.8 129.8L215.6 129.3L215.6 123.4L216.8 123.9ZM215.6 129.3L214.3 128.9L214.3 123L215.6 123.4Z\"/><path class=\"iso-top\" d=\"M193.7 128.4L193.8 127.4L194.2 126.5L194.8 125.6L195.6 124.8L196.6 124L197.8 123.3L199.2 122.7L200.7 122.1L202.4 121.7L204.1 121.4L206 121.2L207.8 121.1L209.7 121.1L211.5 121.2L213.3 121.5L215 121.9L216.6 122.4L218.1 122.9L219.4 123.6L220.5 124.4L221.5 125.2L222.2 126L222.7 126.9L222.9 127.9L220.4 127.1L220 126.4L219.5 125.7L218.7 125L217.8 124.4L216.8 123.9L215.6 123.4L214.3 123L213 122.6L211.5 122.4L210.1 122.2L208.6 122.2L207 122.2L205.6 122.3L204.1 122.6L202.7 122.9L201.4 123.2L200.2 123.7L199.1 124.2L198.2 124.8L197.4 125.5L196.8 126.2L196.3 126.9L196.1 127.6L196 128.4Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M222.9 127.9L220.4 127.1L220 126.4L219.5 125.7L218.7 125L217.8 124.4L216.8 123.9L215.6 123.4L214.3 123L213 122.6L211.5 122.4L210.1 122.2L208.6 122.2L207 122.2L205.6 122.3L204.1 122.6L202.7 122.9L201.4 123.2L200.2 123.7L199.1 124.2L198.2 124.8L197.4 125.5L196.8 126.2L196.3 126.9L196.1 127.6L196 128.4L193.7 128.4\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M193.7 128.4L193.8 127.4L194.2 126.5L194.8 125.6L195.6 124.8L196.6 124L197.8 123.3L199.2 122.7L200.7 122.1L202.4 121.7L204.1 121.4L206 121.2L207.8 121.1L209.7 121.1L211.5 121.2L213.3 121.5L215 121.9L216.6 122.4L218.1 122.9L219.4 123.6L220.5 124.4L221.5 125.2L222.2 126L222.7 126.9L222.9 127.9M222.9 133.8L220.4 133L220 132.3L219.5 131.6L218.7 131L217.8 130.4L216.8 129.8L215.6 129.3L214.3 128.9L213 128.6L211.5 128.4L210.1 128.2L208.6 128.1L207 128.2L205.6 128.3L204.1 128.5L202.7 128.8L201.4 129.2L200.2 129.7L199.1 130.2L198.2 130.8L197.4 131.4L196.8 132.1L196.3 132.8L196.1 133.6L196 134.3L193.7 134.3M193.7 128.4L193.7 134.3M222.9 127.9L222.9 133.8\"/></g><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M162.1 90.4L174.3 84.4L205.5 117.9L205.5 120.9L193.4 127L162.1 93.4ZM180.3 84.9L182 84.1L207.2 111.1L207.2 120.1L205.5 120.9L180.3 93.9Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M205.5 120.9L193.4 127L193.4 124L205.5 117.9ZM207.2 120.1L205.5 120.9L205.5 112L207.2 111.1Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M162.1 93.4L193.4 127L193.4 124L162.1 90.4ZM180.3 93.9L205.5 120.9L205.5 112L180.3 84.9Z\"/><path class=\"iso-top\" d=\"M174.3 84.4L205.5 117.9L193.4 124L162.1 90.4ZM182 84.1L207.2 111.1L205.5 112L180.3 84.9Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M205.5 117.9L193.4 124M193.4 124L162.1 90.4M207.2 111.1L205.5 112M205.5 112L180.3 84.9M180.3 90.9L205.5 117.9\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M162.1 90.4L174.3 84.4M174.3 84.4L180.3 90.9M205.5 120.9L193.4 127M193.4 127L162.1 93.4M162.1 93.4L162.1 90.4M180.3 84.9L182 84.1M182 84.1L207.2 111.1M207.2 111.1L207.2 120.1M207.2 120.1L205.5 120.9M180.3 90.9L180.3 84.9\"/></g><g data-layer=\"feed-0\"></g><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M166.5 91.9L168.2 91L193.4 118L193.4 127L191.7 127.8L166.5 100.8Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M193.4 127L191.7 127.8L191.7 118.9L193.4 118Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M166.5 100.8L191.7 127.8L191.7 118.9L166.5 91.9Z\"/><path class=\"iso-top\" d=\"M168.2 91L193.4 118L191.7 118.9L166.5 91.9Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M193.4 118L191.7 118.9M191.7 118.9L166.5 91.9\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M166.5 91.9L168.2 91L193.4 118L193.4 127L191.7 127.8L166.5 100.8Z\"/></g><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M211.1 117.9L242.4 84.4L254.6 90.4L254.6 93.4L223.3 127L211.1 120.9ZM209.4 111.1L234.6 84.1L236.3 84.9L236.3 93.9L211.1 120.9L209.4 120.1Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M254.6 93.4L223.3 127L223.3 124L254.6 90.4ZM236.3 93.9L211.1 120.9L211.1 112L236.3 84.9Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M223.3 127L211.1 120.9L211.1 117.9L223.3 124ZM211.1 120.9L209.4 120.1L209.4 111.1L211.1 112Z\"/><path class=\"iso-top\" d=\"M254.6 90.4L223.3 124L211.1 117.9L242.4 84.4ZM236.3 84.9L211.1 112L209.4 111.1L234.6 84.1Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M254.6 90.4L223.3 124M223.3 124L211.1 117.9M236.3 84.9L211.1 112M211.1 112L209.4 111.1M236.3 90.9L211.1 117.9\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M236.3 90.9L242.4 84.4M242.4 84.4L254.6 90.4M254.6 90.4L254.6 93.4M254.6 93.4L223.3 127M223.3 127L211.1 120.9M209.4 111.1L234.6 84.1M234.6 84.1L236.3 84.9M236.3 84.9L236.3 90.9M211.1 120.9L209.4 120.1M209.4 120.1L209.4 111.1\"/></g><g data-layer=\"feed-1\"><g class=\"mq-ball\" data-ball=\"2\" transform=\"translate(223.69 107.44)\"><circle class=\"mq-ball-body\" r=\"7.74\"/><circle class=\"mq-ball-shine\" cx=\"-2.32\" cy=\"-2.48\" r=\"4.02\"/><circle class=\"mq-ball-edge\" r=\"7.74\"/></g></g><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M223.3 118L248.5 91L250.2 91.9L250.2 100.8L225 127.8L223.3 127Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M250.2 100.8L225 127.8L225 118.9L250.2 91.9Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M225 127.8L223.3 127L223.3 118L225 118.9Z\"/><path class=\"iso-top\" d=\"M250.2 91.9L225 118.9L223.3 118L248.5 91Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M250.2 91.9L225 118.9M225 118.9L223.3 118\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M223.3 118L248.5 91L250.2 91.9L250.2 100.8L225 127.8L223.3 127Z\"/></g><path class=\"iso-halo\" d=\"M260.8 247.1L260.8 247L260.9 246.9L261 246.7L265 243.5L265.2 243.4L265.4 243.3L265.6 243.3L265.9 243.2L266.1 243.2L266.4 243.2L266.7 243.3L266.9 243.3L273.3 245.3L273.5 245.4L273.7 245.5L273.8 245.6L273.9 245.8L274 245.9L274 247.4L273.9 247.5L273.9 247.6L273.8 247.8L269.8 251L269.6 251.1L269.4 251.2L269.1 251.2L268.9 251.3L268.6 251.3L268.4 251.3L268.1 251.2L267.9 251.2L261.4 249.2L261.2 249.1L261 249L260.9 248.9L260.8 248.8L260.8 248.6Z\"/><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M262 169.9L262.2 169.5L265.3 167L265.8 166.8L266.5 166.7L267.2 166.8L272.1 168.4L272.6 168.6L272.8 169L272.8 247.6L272.6 247.9L269.5 250.4L269 250.6L268.3 250.7L267.6 250.6L262.6 249L262.1 248.8L262 248.4Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M272.8 247.6L272.6 247.9L272.6 169.3L272.8 169ZM272.6 247.9L269.5 250.4L269.5 171.8L272.6 169.3ZM269.5 250.4L269 250.6L269 172L269.5 171.8Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M269 250.6L268.3 250.7L268.3 172.1L269 172Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M268.3 250.7L267.6 250.6L267.6 172L268.3 172.1Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M267.6 250.6L262.6 249L262.6 170.5L267.6 172ZM262.6 249L262.1 248.8L262.1 170.2L262.6 170.5ZM262.1 248.8L262 248.4L262 169.9L262.1 170.2Z\"/><path class=\"iso-top\" d=\"M272.1 168.4L272.6 168.6L272.8 169L272.6 169.3L269.5 171.8L269 172L268.3 172.1L267.6 172L262.6 170.5L262.1 170.2L262 169.9L262.2 169.5L265.3 167L265.8 166.8L266.5 166.7L267.2 166.8Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M272.8 169L272.6 169.3L269.5 171.8L269 172L268.3 172.1L267.6 172L262.6 170.5L262.1 170.2L262 169.9\"/><path class=\"iso-line iso-bevel\" data-tone=\"faint\" d=\"M272.8 169L272.1 169.2L269.1 171.6L268.7 171.8L268.3 171.9L267.8 171.8L263 170.3L262.6 170.1L262 169.9\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M262 169.9L262.2 169.5L265.3 167L265.8 166.8L266.5 166.7L267.2 166.8L272.1 168.4L272.6 168.6L272.8 169M272.8 247.6L272.6 247.9L269.5 250.4L269 250.6L268.3 250.7L267.6 250.6L262.6 249L262.1 248.8L262 248.4M272.8 169L272.8 247.6M262 169.9L262 248.4\"/></g><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M253.5 169.5L268.1 157.8L281.2 164.9L281.2 167.1L266.7 178.8L253.5 171.7Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M281.2 167.1L266.7 178.8L266.7 176.5L281.2 164.9Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M253.5 171.7L266.7 178.8L266.7 176.5L253.5 169.5Z\"/><path class=\"iso-top\" d=\"M268.1 157.8L281.2 164.9L266.7 176.5L253.5 169.5Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M281.2 164.9L266.7 176.5M266.7 176.5L253.5 169.5\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M253.5 169.5L268.1 157.8L281.2 164.9L281.2 167.1L266.7 178.8L253.5 171.7Z\"/></g><g class=\"iso-dots\" data-tone=\"mid\"><circle cx=\"262.4\" cy=\"171.2\" r=\"0.45\"/></g><path class=\"iso-halo\" d=\"M319.1 265.4L319.1 265.2L319.2 265.1L319.3 265L323.3 261.8L323.5 261.7L323.7 261.6L323.9 261.5L324.2 261.5L324.4 261.4L324.7 261.4L325 261.5L325.2 261.5L331.6 263.5L331.8 263.6L332 263.7L332.2 263.8L332.2 264L332.3 264.1L332.3 265.6L332.3 265.7L332.2 265.9L332.1 266L328.1 269.2L327.9 269.3L327.7 269.4L327.5 269.4L327.2 269.5L326.9 269.5L326.7 269.5L326.4 269.5L326.2 269.4L319.8 267.4L319.5 267.3L319.4 267.2L319.2 267.1L319.1 267L319.1 266.8Z\"/><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M320.3 201.2L320.5 200.8L323.6 198.4L324.1 198.1L324.8 198L325.5 198.1L330.4 199.7L330.9 200L331.1 200.3L331.1 265.8L330.9 266.1L327.8 268.6L327.3 268.8L326.6 268.9L325.9 268.8L320.9 267.3L320.5 267L320.3 266.7Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M331.1 265.8L330.9 266.1L330.9 200.6L331.1 200.3ZM330.9 266.1L327.8 268.6L327.8 203.1L330.9 200.6ZM327.8 268.6L327.3 268.8L327.3 203.4L327.8 203.1Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M327.3 268.8L326.6 268.9L326.6 203.4L327.3 203.4Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M326.6 268.9L325.9 268.8L325.9 203.3L326.6 203.4Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M325.9 268.8L320.9 267.3L320.9 201.8L325.9 203.3ZM320.9 267.3L320.5 267L320.5 201.5L320.9 201.8ZM320.5 267L320.3 266.7L320.3 201.2L320.5 201.5Z\"/><path class=\"iso-top\" d=\"M330.4 199.7L330.9 200L331.1 200.3L330.9 200.6L327.8 203.1L327.3 203.4L326.6 203.4L325.9 203.3L320.9 201.8L320.5 201.5L320.3 201.2L320.5 200.8L323.6 198.4L324.1 198.1L324.8 198L325.5 198.1Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M331.1 200.3L330.9 200.6L327.8 203.1L327.3 203.4L326.6 203.4L325.9 203.3L320.9 201.8L320.5 201.5L320.3 201.2\"/><path class=\"iso-line iso-bevel\" data-tone=\"faint\" d=\"M331.1 200.3L330.4 200.5L327.4 203L327 203.1L326.6 203.2L326.1 203.1L321.3 201.6L320.9 201.4L320.3 201.2\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M320.3 201.2L320.5 200.8L323.6 198.4L324.1 198.1L324.8 198L325.5 198.1L330.4 199.7L330.9 200L331.1 200.3M331.1 265.8L330.9 266.1L327.8 268.6L327.3 268.8L326.6 268.9L325.9 268.8L320.9 267.3L320.5 267L320.3 266.7M331.1 200.3L331.1 265.8M320.3 201.2L320.3 266.7\"/></g><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M311.8 200.8L326.4 189.2L339.5 196.2L339.5 198.4L325 210.1L311.8 203Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M339.5 198.4L325 210.1L325 207.9L339.5 196.2Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M311.8 203L325 210.1L325 207.9L311.8 200.8Z\"/><path class=\"iso-top\" d=\"M326.4 189.2L339.5 196.2L325 207.9L311.8 200.8Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M339.5 196.2L325 207.9M325 207.9L311.8 200.8\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M311.8 200.8L326.4 189.2L339.5 196.2L339.5 198.4L325 210.1L311.8 203Z\"/></g><g class=\"iso-dots\" data-tone=\"mid\"><circle cx=\"320.7\" cy=\"202.5\" r=\"0.45\"/></g><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M369.9 183.6L370.1 183.3L373.2 180.8L373.7 180.6L374.4 180.5L375.1 180.6L380 182.1L380.5 182.4L380.7 182.8L380.7 269.1L380.5 269.4L377.4 271.9L376.8 272.2L376.1 272.2L375.5 272.1L370.5 270.6L370 270.3L369.9 270Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M380.7 269.1L380.5 269.4L380.5 183.1L380.7 182.8ZM380.5 269.4L377.4 271.9L377.4 185.6L380.5 183.1ZM377.4 271.9L376.8 272.2L376.8 185.8L377.4 185.6Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M376.8 272.2L376.1 272.2L376.1 185.9L376.8 185.8Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M376.1 272.2L375.5 272.1L375.5 185.8L376.1 185.9Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M375.5 272.1L370.5 270.6L370.5 184.2L375.5 185.8ZM370.5 270.6L370 270.3L370 184L370.5 184.2ZM370 270.3L369.9 270L369.9 183.6L370 184Z\"/><path class=\"iso-top\" d=\"M380 182.1L380.5 182.4L380.7 182.8L380.5 183.1L377.4 185.6L376.8 185.8L376.1 185.9L375.5 185.8L370.5 184.2L370 184L369.9 183.6L370.1 183.3L373.2 180.8L373.7 180.6L374.4 180.5L375.1 180.6Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M380.7 182.8L380.5 183.1L377.4 185.6L376.8 185.8L376.1 185.9L375.5 185.8L370.5 184.2L370 184L369.9 183.6\"/><path class=\"iso-line iso-bevel\" data-tone=\"faint\" d=\"M380.7 182.8L379.8 183L376.8 185.4L376.5 185.5L376.2 185.6L375.7 185.5L370.9 184L370.6 183.8L369.9 183.6\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M369.9 183.6L370.1 183.3L373.2 180.8L373.7 180.6L374.4 180.5L375.1 180.6L380 182.1L380.5 182.4L380.7 182.8M380.7 269.1L380.5 269.4L377.4 271.9L376.8 272.2L376.1 272.2L375.5 272.1L370.5 270.6L370 270.3L369.9 270M380.7 182.8L380.7 269.1M369.9 183.6L369.9 270\"/></g><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M353.8 222.8L373.9 206.7L381.2 210.6L381.2 215.1L361 231.2L353.8 227.3Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M381.2 215.1L361 231.2L361 226.8L381.2 210.6Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M353.8 227.3L361 231.2L361 226.8L353.8 222.8Z\"/><path class=\"iso-top\" d=\"M373.9 206.7L381.2 210.6L361 226.8L353.8 222.8Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M381.2 210.6L361 226.8M361 226.8L353.8 222.8\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M353.8 222.8L373.9 206.7L381.2 210.6L381.2 215.1L361 231.2L353.8 227.3Z\"/></g><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M213.8 141.5L222.9 134.2L379.8 218.5L379.8 221.5L370.7 228.8L213.8 144.5ZM221 127.3L222.3 126.3L381.1 211.5L381.1 220.5L379.8 221.5L221 136.2Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M379.8 221.5L370.7 228.8L370.7 225.8L379.8 218.5ZM381.1 220.5L379.8 221.5L379.8 212.6L381.1 211.5Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M213.8 144.5L370.7 228.8L370.7 225.8L213.8 141.5ZM221 136.2L379.8 221.5L379.8 212.6L221 127.3Z\"/><path class=\"iso-top\" d=\"M222.9 134.2L379.8 218.5L370.7 225.8L213.8 141.5ZM222.3 126.3L381.1 211.5L379.8 212.6L221 127.3Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M379.8 218.5L370.7 225.8M370.7 225.8L213.8 141.5M381.1 211.5L379.8 212.6M379.8 212.6L221 127.3M222.9 134.2L379.8 218.5\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M213.8 141.5L221 135.7M379.8 221.5L370.7 228.8M370.7 228.8L213.8 144.5M213.8 144.5L213.8 141.5M221 127.3L222.3 126.3M222.3 126.3L381.1 211.5M381.1 211.5L381.1 220.5M381.1 220.5L379.8 221.5M221 135.7L221 127.3\"/></g><g data-layer=\"lane\"><g class=\"mq-ball\" data-ball=\"3\" transform=\"translate(278.31 163.38)\"><circle class=\"mq-ball-body\" r=\"7.74\"/><circle class=\"mq-ball-shine\" cx=\"-2.32\" cy=\"-2.48\" r=\"4.02\"/><circle class=\"mq-ball-edge\" r=\"7.74\"/></g><g class=\"mq-ball\" data-ball=\"4\" transform=\"translate(312.34 181.66)\"><circle class=\"mq-ball-body\" r=\"7.74\"/><circle class=\"mq-ball-shine\" cx=\"-2.32\" cy=\"-2.48\" r=\"4.02\"/><circle class=\"mq-ball-edge\" r=\"7.74\"/></g><g class=\"mq-ball\" data-ball=\"5\" transform=\"translate(325.16 188.54)\"><circle class=\"mq-ball-body\" r=\"7.74\"/><circle class=\"mq-ball-shine\" cx=\"-2.32\" cy=\"-2.48\" r=\"4.02\"/><circle class=\"mq-ball-edge\" r=\"7.74\"/></g><g class=\"mq-ball\" data-ball=\"6\" transform=\"translate(337.97 195.43)\"><circle class=\"mq-ball-body\" r=\"7.74\"/><circle class=\"mq-ball-shine\" cx=\"-2.32\" cy=\"-2.48\" r=\"4.02\"/><circle class=\"mq-ball-edge\" r=\"7.74\"/></g><g class=\"mq-ball\" data-ball=\"7\" transform=\"translate(350.78 202.31)\" data-lit=\"\"><circle class=\"mq-ball-body\" r=\"7.74\"/><circle class=\"mq-ball-shine\" cx=\"-2.32\" cy=\"-2.48\" r=\"4.02\"/><circle class=\"mq-ball-edge\" r=\"7.74\"/></g></g><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M213.8 135.2L212.7 135.4L211.5 135.5L210.4 135.6L209.2 135.7L208 135.7L206.8 135.6L205.6 135.6L204.5 135.4L203.3 135.2L202.2 135L201.2 134.7L200.2 134.4L199.2 134.1L198.3 133.7L197.5 133.3L196.7 132.8L196 132.3L195.4 131.8L194.9 131.3L194.5 130.7L194.2 130.1L193.9 129.6L193.8 129L193.7 128.4L196 128.4L196 128.8L196.1 129.3L196.3 129.8L196.5 130.2L196.8 130.7L197.2 131.1L197.7 131.5L198.2 131.9L198.7 132.3L199.3 132.6L200 133L200.7 133.3L201.5 133.5L202.3 133.8L203.1 134L204 134.2L204.9 134.3L205.8 134.4L206.7 134.5L207.6 134.6L208.6 134.6L209.5 134.5L210.4 134.5L211.3 134.4ZM213.8 141.1L212.7 141.3L211.5 141.5L210.4 141.6L209.2 141.6L208 141.6L206.8 141.6L205.6 141.5L204.5 141.4L203.3 141.2L202.2 141L201.2 140.7L200.2 140.4L199.2 140L198.3 139.6L197.5 139.2L196.7 138.8L196 138.3L195.4 137.8L194.9 137.2L194.5 136.7L194.2 136.1L193.9 135.5L193.8 134.9L193.7 134.3L196 134.3L196 134.8L196.1 135.3L196.3 135.7L196.5 136.2L196.8 136.6L197.2 137L197.7 137.5L198.2 137.9L198.7 138.2L199.3 138.6L200 138.9L200.7 139.2L201.5 139.5L202.3 139.7L203.1 139.9L204 140.1L204.9 140.3L205.8 140.4L206.7 140.5L207.6 140.5L208.6 140.5L209.5 140.5L210.4 140.4L211.3 140.3ZM213.8 141.1L212.7 141.3L212.7 135.4L213.8 135.2ZM212.7 141.3L211.5 141.5L211.5 135.5L212.7 135.4ZM211.5 141.5L210.4 141.6L210.4 135.6L211.5 135.5ZM210.4 141.6L209.2 141.6L209.2 135.7L210.4 135.6ZM209.2 141.6L208 141.6L208 135.7L209.2 135.7ZM208 141.6L206.8 141.6L206.8 135.6L208 135.7ZM206.8 141.6L205.6 141.5L205.6 135.6L206.8 135.6ZM205.6 141.5L204.5 141.4L204.5 135.4L205.6 135.6ZM204.5 141.4L203.3 141.2L203.3 135.2L204.5 135.4ZM203.3 141.2L202.2 141L202.2 135L203.3 135.2ZM202.2 141L201.2 140.7L201.2 134.7L202.2 135ZM201.2 140.7L200.2 140.4L200.2 134.4L201.2 134.7ZM200.2 140.4L199.2 140L199.2 134.1L200.2 134.4ZM199.2 140L198.3 139.6L198.3 133.7L199.2 134.1ZM198.3 139.6L197.5 139.2L197.5 133.3L198.3 133.7ZM197.5 139.2L196.7 138.8L196.7 132.8L197.5 133.3ZM196.7 138.8L196 138.3L196 132.3L196.7 132.8ZM196 138.3L195.4 137.8L195.4 131.8L196 132.3ZM195.4 137.8L194.9 137.2L194.9 131.3L195.4 131.8ZM194.9 137.2L194.5 136.7L194.5 130.7L194.9 131.3ZM194.5 136.7L194.2 136.1L194.2 130.1L194.5 130.7ZM194.2 136.1L193.9 135.5L193.9 129.6L194.2 130.1ZM193.9 135.5L193.8 134.9L193.8 129L193.9 129.6ZM193.8 134.9L193.7 134.3L193.7 128.4L193.8 129Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M213.8 141.1L212.7 141.3L212.7 135.4L213.8 135.2ZM212.7 141.3L211.5 141.5L211.5 135.5L212.7 135.4ZM211.5 141.5L210.4 141.6L210.4 135.6L211.5 135.5ZM210.4 141.6L209.2 141.6L209.2 135.7L210.4 135.6ZM209.2 141.6L208 141.6L208 135.7L209.2 135.7Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M208 141.6L206.8 141.6L206.8 135.6L208 135.7ZM206.8 141.6L205.6 141.5L205.6 135.6L206.8 135.6ZM205.6 141.5L204.5 141.4L204.5 135.4L205.6 135.6ZM204.5 141.4L203.3 141.2L203.3 135.2L204.5 135.4ZM203.3 141.2L202.2 141L202.2 135L203.3 135.2ZM202.2 141L201.2 140.7L201.2 134.7L202.2 135Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M201.2 140.7L200.2 140.4L200.2 134.4L201.2 134.7ZM200.2 140.4L199.2 140L199.2 134.1L200.2 134.4ZM199.2 140L198.3 139.6L198.3 133.7L199.2 134.1ZM198.3 139.6L197.5 139.2L197.5 133.3L198.3 133.7ZM197.5 139.2L196.7 138.8L196.7 132.8L197.5 133.3ZM196.7 138.8L196 138.3L196 132.3L196.7 132.8ZM196 138.3L195.4 137.8L195.4 131.8L196 132.3ZM195.4 137.8L194.9 137.2L194.9 131.3L195.4 131.8ZM194.9 137.2L194.5 136.7L194.5 130.7L194.9 131.3ZM194.5 136.7L194.2 136.1L194.2 130.1L194.5 130.7ZM194.2 136.1L193.9 135.5L193.9 129.6L194.2 130.1ZM193.9 135.5L193.8 134.9L193.8 129L193.9 129.6ZM193.8 134.9L193.7 134.3L193.7 128.4L193.8 129Z\"/><path class=\"iso-top\" d=\"M213.8 135.2L212.7 135.4L211.5 135.5L210.4 135.6L209.2 135.7L208 135.7L206.8 135.6L205.6 135.6L204.5 135.4L203.3 135.2L202.2 135L201.2 134.7L200.2 134.4L199.2 134.1L198.3 133.7L197.5 133.3L196.7 132.8L196 132.3L195.4 131.8L194.9 131.3L194.5 130.7L194.2 130.1L193.9 129.6L193.8 129L193.7 128.4L196 128.4L196 128.8L196.1 129.3L196.3 129.8L196.5 130.2L196.8 130.7L197.2 131.1L197.7 131.5L198.2 131.9L198.7 132.3L199.3 132.6L200 133L200.7 133.3L201.5 133.5L202.3 133.8L203.1 134L204 134.2L204.9 134.3L205.8 134.4L206.7 134.5L207.6 134.6L208.6 134.6L209.5 134.5L210.4 134.5L211.3 134.4Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M213.8 135.2L212.7 135.4L211.5 135.5L210.4 135.6L209.2 135.7L208 135.7L206.8 135.6L205.6 135.6L204.5 135.4L203.3 135.2L202.2 135L201.2 134.7L200.2 134.4L199.2 134.1L198.3 133.7L197.5 133.3L196.7 132.8L196 132.3L195.4 131.8L194.9 131.3L194.5 130.7L194.2 130.1L193.9 129.6L193.8 129L193.7 128.4\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M193.7 128.4L196 128.4L196 128.8L196.1 129.3L196.3 129.8L196.5 130.2L196.8 130.7L197.2 131.1L197.7 131.5L198.2 131.9L198.7 132.3L199.3 132.6L200 133L200.7 133.3L201.5 133.5L202.3 133.8L203.1 134L204 134.2L204.9 134.3L205.8 134.4L206.7 134.5L207.6 134.6L208.6 134.6L209.5 134.5L210.4 134.5L211.3 134.4L213.8 135.2M213.8 141.1L212.7 141.3L211.5 141.5L210.4 141.6L209.2 141.6L208 141.6L206.8 141.6L205.6 141.5L204.5 141.4L203.3 141.2L202.2 141L201.2 140.7L200.2 140.4L199.2 140L198.3 139.6L197.5 139.2L196.7 138.8L196 138.3L195.4 137.8L194.9 137.2L194.5 136.7L194.2 136.1L193.9 135.5L193.8 134.9L193.7 134.3M213.8 135.2L213.8 141.1M193.7 128.4L193.7 134.3\"/></g><g data-part=\"blade-s\" transform=\"translate(0 0)\"><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M358.8 198.5L359.8 197.7L361.4 198.2L361.4 199.8L360.4 200.6L358.8 200.1ZM353 203.2L354 202.4L355.6 202.9L355.6 204.5L354.6 205.3L353 204.8ZM352.3 201.6L360.3 195.2L362.1 195.7L362.1 197.8L354.1 204.2L352.3 203.7Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M361.4 199.8L360.4 200.6L360.4 199L361.4 198.2ZM355.6 204.5L354.6 205.3L354.6 203.7L355.6 202.9ZM362.1 197.8L354.1 204.2L354.1 202.1L362.1 195.7Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M358.8 200.1L360.4 200.6L360.4 199L358.8 198.5ZM353 204.8L354.6 205.3L354.6 203.7L353 203.2ZM352.3 203.7L354.1 204.2L354.1 202.1L352.3 201.6Z\"/><path class=\"iso-top\" d=\"M360.3 195.2L362.1 195.7L354.1 202.1L352.3 201.6Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M362.1 195.7L354.1 202.1M354.1 202.1L352.3 201.6\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M361.4 198.3L361.4 199.8M361.4 199.8L360.4 200.6M360.4 200.6L359 200.2M355.6 203L355.6 204.5M355.6 204.5L354.6 205.3M354.6 205.3L353 204.8M353 204.8L353 203.9M352.3 201.6L360.3 195.2M360.3 195.2L362.1 195.7M362.1 195.7L362.1 197.8M362.1 197.8L361.4 198.3M359 200.2L355.6 203M353 203.9L352.3 203.7M352.3 203.7L352.3 201.6\"/></g><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M356 180.8L356.2 180.5L356.7 180.2L357.5 180.2L358.1 180.4L358.4 180.7L358.4 198.6L358.2 199L357.6 199.2L356.9 199.2L356.3 199L356 198.7Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M358.2 199L357.6 199.2L357.6 181.3L358.2 181.1ZM358.4 198.6L358.2 199L358.2 181.1L358.4 180.7Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M357.6 199.2L356.9 199.2L356.9 181.4L357.6 181.3Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M356.9 199.2L356.3 199L356.3 181.2L356.9 181.4ZM356.3 199L356 198.7L356 180.8L356.3 181.2Z\"/><path class=\"iso-top\" d=\"M358.2 181.1L357.6 181.3L356.9 181.4L356.3 181.2L356 180.8L356.2 180.5L356.7 180.2L357.5 180.2L358.1 180.4L358.4 180.7Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M358.4 180.7L358.2 181.1L357.6 181.3L356.9 181.4L356.3 181.2L356 180.8\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M356 180.8L356.2 180.5L356.7 180.2L357.5 180.2L358.1 180.4L358.4 180.7M358.4 198.6L358.2 199L357.6 199.2L356.9 199.2L356.3 199L356 198.7M356 180.8L356 198.7M358.4 180.7L358.4 198.6\"/></g></g><g data-layer=\"gate\"><g class=\"mq-ball\" data-ball=\"8\" transform=\"translate(366.30 210.64)\"><circle class=\"mq-ball-body\" r=\"7.74\"/><circle class=\"mq-ball-shine\" cx=\"-2.32\" cy=\"-2.48\" r=\"4.02\"/><circle class=\"mq-ball-edge\" r=\"7.74\"/></g></g><g data-part=\"blade-h\" transform=\"translate(0 -14.14)\"><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M372.9 208.2L373.9 207.4L375.5 207.9L375.5 216.9L374.5 217.7L372.9 217.2ZM367.1 212.8L368.1 212L369.7 212.5L369.7 221.5L368.7 222.3L367.1 221.8ZM366.4 211.2L374.5 204.8L376.2 205.3L376.2 207.4L368.2 213.8L366.4 213.3Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M375.5 216.9L374.5 217.7L374.5 208.7L375.5 207.9ZM369.7 221.5L368.7 222.3L368.7 213.3L369.7 212.5ZM376.2 207.4L368.2 213.8L368.2 211.7L376.2 205.3Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M372.9 217.2L374.5 217.7L374.5 208.7L372.9 208.2ZM367.1 221.8L368.7 222.3L368.7 213.3L367.1 212.8ZM366.4 213.3L368.2 213.8L368.2 211.7L366.4 211.2Z\"/><path class=\"iso-top\" d=\"M374.5 204.8L376.2 205.3L368.2 211.7L366.4 211.2Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M376.2 205.3L368.2 211.7M368.2 211.7L366.4 211.2\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M375.5 207.9L375.5 216.9M375.5 216.9L374.5 217.7M374.5 217.7L372.9 217.2M372.9 217.2L372.9 210M369.7 212.6L369.7 221.5M369.7 221.5L368.7 222.3M368.7 222.3L367.1 221.8M367.1 221.8L367.1 213.5M366.4 211.2L374.5 204.8M374.5 204.8L376.2 205.3M376.2 205.3L376.2 207.4M376.2 207.4L375.5 207.9M372.9 210L369.7 212.6M367.1 213.5L366.4 213.3M366.4 213.3L366.4 211.2\"/></g><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M370.1 189.7L370.3 189.3L370.9 189.1L371.6 189.1L372.2 189.3L372.5 189.6L372.5 208.2L372.3 208.6L371.8 208.8L371 208.9L370.4 208.7L370.1 208.3Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M372.3 208.6L371.8 208.8L371.8 190.2L372.3 190ZM372.5 208.2L372.3 208.6L372.3 190L372.5 189.6Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M371.8 208.8L371 208.9L371 190.2L371.8 190.2Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M371 208.9L370.4 208.7L370.4 190L371 190.2ZM370.4 208.7L370.1 208.3L370.1 189.7L370.4 190Z\"/><path class=\"iso-top\" d=\"M372.3 190L371.8 190.2L371 190.2L370.4 190L370.1 189.7L370.3 189.3L370.9 189.1L371.6 189.1L372.2 189.3L372.5 189.6Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M372.5 189.6L372.3 190L371.8 190.2L371 190.2L370.4 190L370.1 189.7\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M370.1 189.7L370.3 189.3L370.9 189.1L371.6 189.1L372.2 189.3L372.5 189.6M372.5 208.2L372.3 208.6L371.8 208.8L371 208.9L370.4 208.7L370.1 208.3M370.1 189.7L370.1 208.3M372.5 189.6L372.5 208.2\"/></g></g><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M210.7 135.6L211.9 134.6L370.7 219.8L370.7 228.8L369.4 229.8L210.7 144.5Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M370.7 228.8L369.4 229.8L369.4 220.9L370.7 219.8Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M210.7 144.5L369.4 229.8L369.4 220.9L210.7 135.6Z\"/><path class=\"iso-top\" d=\"M211.9 134.6L370.7 219.8L369.4 220.9L210.7 135.6Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M370.7 219.8L369.4 220.9M369.4 220.9L210.7 135.6\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M210.7 135.6L211.9 134.6L370.7 219.8L370.7 228.8L369.4 229.8L210.7 144.5Z\"/></g><path class=\"iso-line\" data-tone=\"lo\" d=\"M351.4 212.3L351.4 215M338.5 205.5L338.5 208.1M325.7 198.6L325.7 201.3M312.9 191.7L312.9 194.4M287.3 177.9L287.3 180.6M274.5 171.1L274.5 173.7M261.7 164.2L261.7 166.9M248.8 157.3L248.8 160\"/><path class=\"iso-line\" data-tone=\"mid\" d=\"M364.2 219.2L364.2 224M300.1 184.8L300.1 189.6M236 150.4L236 155.2\"/><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M347.8 187.1L348.2 186.6L363.8 174.1L364.5 173.8L365.4 173.6L366.4 173.5L367.3 173.7L387.7 180.1L388.5 180.4L388.9 180.9L388.9 181.4L388.9 185.9L388.6 186.3L373 198.8L372.3 199.2L371.4 199.4L370.4 199.4L369.4 199.2L349 192.8L348.3 192.5L347.9 192L347.8 191.5Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M388.9 185.9L388.6 186.3L388.6 181.9L388.9 181.4ZM388.6 186.3L373 198.8L373 194.3L388.6 181.9ZM373 198.8L372.3 199.2L372.3 194.7L373 194.3Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M372.3 199.2L371.4 199.4L371.4 194.9L372.3 194.7ZM371.4 199.4L370.4 199.4L370.4 194.9L371.4 194.9Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M370.4 199.4L369.4 199.2L369.4 194.7L370.4 194.9Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M369.4 199.2L349 192.8L349 188.4L369.4 194.7ZM349 192.8L348.3 192.5L348.3 188L349 188.4ZM348.3 192.5L347.9 192L347.9 187.6L348.3 188ZM347.9 192L347.8 191.5L347.8 187.1L347.9 187.6Z\"/><path class=\"iso-top\" d=\"M387.7 180.1L388.5 180.4L388.9 180.9L388.9 181.4L388.6 181.9L373 194.3L372.3 194.7L371.4 194.9L370.4 194.9L369.4 194.7L349 188.4L348.3 188L347.9 187.6L347.8 187.1L348.2 186.6L363.8 174.1L364.5 173.8L365.4 173.6L366.4 173.5L367.3 173.7Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M388.9 181.4L388.6 181.9L373 194.3L372.3 194.7L371.4 194.9L370.4 194.9L369.4 194.7L349 188.4L348.3 188L347.9 187.6L347.8 187.1\"/><path class=\"iso-line iso-bevel\" data-tone=\"faint\" d=\"M388.9 181.4L387.6 181.6L372.2 194L371.7 194.3L371.1 194.4L370.5 194.4L369.9 194.3L349.7 188L349.1 187.7L348.9 187.4L347.8 187.1\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M347.8 187.1L348.2 186.6L363.8 174.1L364.5 173.8L365.4 173.6L366.4 173.5L367.3 173.7L387.7 180.1L388.5 180.4L388.9 180.9L388.9 181.4M388.9 185.9L388.6 186.3L373 198.8L372.3 199.2L371.4 199.4L370.4 199.4L369.4 199.2L349 192.8L348.3 192.5L347.9 192L347.8 191.5M388.9 181.4L388.9 185.9M347.8 187.1L347.8 191.5\"/></g><g class=\"iso-dots\" data-tone=\"mid\"><circle cx=\"366.3\" cy=\"175.6\" r=\"0.45\"/><circle cx=\"384.7\" cy=\"181.4\" r=\"0.45\"/><circle cx=\"352\" cy=\"187.1\" r=\"0.45\"/><circle cx=\"370.4\" cy=\"192.8\" r=\"0.45\"/></g><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M352.7 177.7L352.9 177.1L353.4 176.6L354.1 176.2L355.1 175.8L356.2 175.6L357.3 175.6L358.5 175.7L359.6 175.9L360.5 176.3L361.1 176.8L361.5 177.3L361.7 177.9L361.7 185.3L361.5 185.9L361 186.4L360.2 186.9L359.3 187.2L358.2 187.4L357 187.5L355.9 187.4L354.8 187.1L353.9 186.8L353.2 186.3L352.8 185.7L352.7 185.2Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M361 186.4L360.2 186.9L360.2 179.4L361 179ZM360.2 186.9L359.3 187.2L359.3 179.8L360.2 179.4ZM361.7 185.3L361.5 185.9L361.5 178.5L361.7 177.9ZM361.5 185.9L361 186.4L361 179L361.5 178.5Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M359.3 187.2L358.2 187.4L358.2 180L359.3 179.8ZM358.2 187.4L357 187.5L357 180L358.2 180Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M357 187.5L355.9 187.4L355.9 179.9L357 180ZM355.9 187.4L354.8 187.1L354.8 179.7L355.9 179.9Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M354.8 187.1L353.9 186.8L353.9 179.3L354.8 179.7ZM353.9 186.8L353.2 186.3L353.2 178.8L353.9 179.3ZM353.2 186.3L352.8 185.7L352.8 178.3L353.2 178.8ZM352.8 185.7L352.7 185.2L352.7 177.7L352.8 178.3Z\"/><path class=\"iso-top\" d=\"M361 179L360.2 179.4L359.3 179.8L358.2 180L357 180L355.9 179.9L354.8 179.7L353.9 179.3L353.2 178.8L352.8 178.3L352.7 177.7L352.9 177.1L353.4 176.6L354.1 176.2L355.1 175.8L356.2 175.6L357.3 175.6L358.5 175.7L359.6 175.9L360.5 176.3L361.1 176.8L361.5 177.3L361.7 177.9L361.5 178.5Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M361.7 177.9L361.5 178.5L361 179L360.2 179.4L359.3 179.8L358.2 180L357 180L355.9 179.9L354.8 179.7L353.9 179.3L353.2 178.8L352.8 178.3L352.7 177.7\"/><path class=\"iso-line iso-bevel\" data-tone=\"faint\" d=\"M361.7 177.9L361 178.4L360.5 178.8L359.9 179.2L359 179.5L358.1 179.7L357.1 179.8L356 179.7L355.1 179.5L354.3 179.1L353.7 178.7L353.3 178.2L352.7 177.7\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M352.7 177.7L352.9 177.1L353.4 176.6L354.1 176.2L355.1 175.8L356.2 175.6L357.3 175.6L358.5 175.7L359.6 175.9L360.5 176.3L361.1 176.8L361.5 177.3L361.7 177.9M361.7 185.3L361.5 185.9L361 186.4L360.2 186.9L359.3 187.2L358.2 187.4L357 187.5L355.9 187.4L354.8 187.1L353.9 186.8L353.2 186.3L352.8 185.7L352.7 185.2M352.7 177.7L352.7 185.2M361.7 177.9L361.7 185.3\"/></g><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M366.9 182.1L367 181.6L367.5 181L368.3 180.6L369.2 180.2L370.3 180L371.5 180L372.6 180.1L373.7 180.3L374.6 180.7L375.3 181.2L375.7 181.7L375.8 182.3L375.8 189.7L375.6 190.3L375.1 190.8L374.4 191.3L373.4 191.6L372.3 191.8L371.2 191.9L370 191.8L368.9 191.6L368 191.2L367.4 190.7L367 190.2L366.9 189.6Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M375.1 190.8L374.4 191.3L374.4 183.8L375.1 183.4ZM374.4 191.3L373.4 191.6L373.4 184.2L374.4 183.8ZM375.8 189.7L375.6 190.3L375.6 182.9L375.8 182.3ZM375.6 190.3L375.1 190.8L375.1 183.4L375.6 182.9Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M373.4 191.6L372.3 191.8L372.3 184.4L373.4 184.2ZM372.3 191.8L371.2 191.9L371.2 184.4L372.3 184.4Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M371.2 191.9L370 191.8L370 184.4L371.2 184.4ZM370 191.8L368.9 191.6L368.9 184.1L370 184.4Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M368.9 191.6L368 191.2L368 183.7L368.9 184.1ZM368 191.2L367.4 190.7L367.4 183.3L368 183.7ZM367.4 190.7L367 190.2L367 182.7L367.4 183.3ZM367 190.2L366.9 189.6L366.9 182.1L367 182.7Z\"/><path class=\"iso-top\" d=\"M375.1 183.4L374.4 183.8L373.4 184.2L372.3 184.4L371.2 184.4L370 184.4L368.9 184.1L368 183.7L367.4 183.3L367 182.7L366.9 182.1L367 181.6L367.5 181L368.3 180.6L369.2 180.2L370.3 180L371.5 180L372.6 180.1L373.7 180.3L374.6 180.7L375.3 181.2L375.7 181.7L375.8 182.3L375.6 182.9Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M375.8 182.3L375.6 182.9L375.1 183.4L374.4 183.8L373.4 184.2L372.3 184.4L371.2 184.4L370 184.4L368.9 184.1L368 183.7L367.4 183.3L367 182.7L366.9 182.1\"/><path class=\"iso-line iso-bevel\" data-tone=\"faint\" d=\"M375.8 182.3L375.1 182.8L374.7 183.3L374 183.7L373.2 184L372.2 184.1L371.2 184.2L370.2 184.1L369.2 183.9L368.4 183.6L367.8 183.1L367.5 182.7L366.9 182.1\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M366.9 182.1L367 181.6L367.5 181L368.3 180.6L369.2 180.2L370.3 180L371.5 180L372.6 180.1L373.7 180.3L374.6 180.7L375.3 181.2L375.7 181.7L375.8 182.3M375.8 189.7L375.6 190.3L375.1 190.8L374.4 191.3L373.4 191.6L372.3 191.8L371.2 191.9L370 191.8L368.9 191.6L368 191.2L367.4 190.7L367 190.2L366.9 189.6M366.9 182.1L366.9 189.6M375.8 182.3L375.8 189.7\"/></g><path class=\"iso-line\" data-tone=\"faint\" d=\"M361.7 182.3L361.6 182.7L361.3 183.1L360.9 183.5L360.4 183.8L359.7 184.1L358.9 184.3L358.1 184.5L357.2 184.5L356.3 184.5L355.5 184.3L354.7 184.1L354 183.8L353.5 183.5L353.1 183.1L352.8 182.7L352.7 182.3M375.8 186.7L375.7 187.1L375.4 187.5L375 187.9L374.5 188.3L373.8 188.5L373 188.7L372.2 188.9L371.3 188.9L370.4 188.9L369.6 188.7L368.8 188.5L368.2 188.3L367.6 187.9L367.2 187.5L366.9 187.1L366.8 186.7\"/><path class=\"iso-line\" data-tone=\"lo\" d=\"M358.9 178.3L358.4 178.6L357.7 178.8L356.9 178.8L356.1 178.7L355.5 178.4L355.2 178L355.2 177.6L355.4 177.3L356 177L356.7 176.8L357.5 176.8L358.3 176.9L358.9 177.2L359.2 177.6L359.2 178ZM373.1 182.8L372.5 183.1L371.8 183.2L371 183.2L370.2 183.1L369.6 182.8L369.3 182.4L369.3 182L369.6 181.7L370.1 181.4L370.9 181.2L371.7 181.2L372.4 181.3L373 181.6L373.3 182L373.4 182.4Z\"/><path class=\"iso-halo\" d=\"M375.3 281.6L375.4 281.2L375.6 280.8L376 280.4L376.5 280.1L377.1 279.8L377.9 279.6L378.7 279.5L379.5 279.4L380.3 279.5L381.2 279.6L381.9 279.8L382.6 280L383.1 280.3L383.6 280.7L383.8 281.1L383.9 281.5L383.9 283L383.9 283.4L383.7 283.8L383.3 284.2L382.8 284.5L382.1 284.8L381.4 285L380.6 285.2L379.8 285.2L378.9 285.2L378.1 285.1L377.4 284.9L376.7 284.6L376.1 284.3L375.7 284L375.4 283.6L375.3 283.1Z\"/><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M375.9 238.8L376.4 238.1L377.4 237.6L378.8 237.3L380.3 237.3L381.6 237.5L382.7 238L383.3 238.7L383.4 239.4L383.4 283.4L382.8 284.1L381.8 284.6L380.5 284.9L379 284.9L377.6 284.7L376.6 284.2L375.9 283.5L375.9 282.8Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M382.8 284.1L381.8 284.6L381.8 240.7L382.8 240.1ZM383.4 283.4L382.8 284.1L382.8 240.1L383.4 239.4Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M381.8 284.6L380.5 284.9L380.5 241L381.8 240.7ZM380.5 284.9L379 284.9L379 241L380.5 241Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M379 284.9L377.6 284.7L377.6 240.7L379 241Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M377.6 284.7L376.6 284.2L376.6 240.2L377.6 240.7ZM376.6 284.2L375.9 283.5L375.9 239.6L376.6 240.2ZM375.9 283.5L375.9 282.8L375.9 238.8L375.9 239.6Z\"/><path class=\"iso-top\" d=\"M382.8 240.1L381.8 240.7L380.5 241L379 241L377.6 240.7L376.6 240.2L375.9 239.6L375.9 238.8L376.4 238.1L377.4 237.6L378.8 237.3L380.3 237.3L381.6 237.5L382.7 238L383.3 238.7L383.4 239.4Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M383.4 239.4L382.8 240.1L381.8 240.7L380.5 241L379 241L377.6 240.7L376.6 240.2L375.9 239.6L375.9 238.8\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M375.9 238.8L376.4 238.1L377.4 237.6L378.8 237.3L380.3 237.3L381.6 237.5L382.7 238L383.3 238.7L383.4 239.4M383.4 283.4L382.8 284.1L381.8 284.6L380.5 284.9L379 284.9L377.6 284.7L376.6 284.2L375.9 283.5L375.9 282.8M375.9 238.8L375.9 282.8M383.4 239.4L383.4 283.4\"/></g><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M368.7 252.9L378.6 234.5L402.5 249.3L402.5 251.4L400.8 252.1L399 252.8L397.1 253.4L395.1 254L393.1 254.5L391 254.9L388.8 255.3L386.6 255.5L384.4 255.7L382.1 255.8L379.8 255.9L377.6 255.9L375.3 255.8L373 255.6L370.8 255.3L368.7 255Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M397.1 251.3L399 250.7L399 252.8L397.1 253.4ZM399 250.7L400.8 250L400.8 252.1L399 252.8ZM400.8 250L402.5 249.3L402.5 251.4L400.8 252.1Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M379.8 253.8L382.1 253.8L382.1 255.8L379.8 255.9ZM382.1 253.8L384.4 253.6L384.4 255.7L382.1 255.8ZM384.4 253.6L386.6 253.4L386.6 255.5L384.4 255.7ZM386.6 253.4L388.8 253.2L388.8 255.3L386.6 255.5ZM388.8 253.2L391 252.8L391 254.9L388.8 255.3ZM391 252.8L393.1 252.4L393.1 254.5L391 254.9ZM393.1 252.4L395.1 251.9L395.1 254L393.1 254.5ZM395.1 251.9L397.1 251.3L397.1 253.4L395.1 254Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M368.7 252.9L370.8 253.2L370.8 255.3L368.7 255ZM370.8 253.2L373 253.5L373 255.6L370.8 255.3ZM373 253.5L375.3 253.7L375.3 255.8L373 255.6ZM375.3 253.7L377.6 253.8L377.6 255.9L375.3 255.8ZM377.6 253.8L379.8 253.8L379.8 255.9L377.6 255.9Z\"/><path class=\"iso-top\" d=\"M402.5 249.3L400.8 250L399 250.7L397.1 251.3L395.1 251.9L393.1 252.4L391 252.8L388.8 253.2L386.6 253.4L384.4 253.6L382.1 253.8L379.8 253.8L377.6 253.8L375.3 253.7L373 253.5L370.8 253.2L368.7 252.9L378.6 234.5Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M368.7 252.9L370.8 253.2L373 253.5L375.3 253.7L377.6 253.8L379.8 253.8L382.1 253.8L384.4 253.6L386.6 253.4L388.8 253.2L391 252.8L393.1 252.4L395.1 251.9L397.1 251.3L399 250.7L400.8 250L402.5 249.3\"/><path class=\"iso-line iso-bevel\" data-tone=\"faint\" d=\"M368.7 252.9L371 252.9L373.2 253.1L375.4 253.3L377.6 253.4L379.8 253.5L382.1 253.4L384.3 253.3L386.5 253.1L388.6 252.8L390.7 252.5L392.8 252.1L394.8 251.6L396.8 251.1L398.6 250.4L400.4 249.8L402.5 249.3\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M402.5 249.3L378.6 234.5L368.7 252.9M368.7 255L370.8 255.3L373 255.6L375.3 255.8L377.6 255.9L379.8 255.9L382.1 255.8L384.4 255.7L386.6 255.5L388.8 255.3L391 254.9L393.1 254.5L395.1 254L397.1 253.4L399 252.8L400.8 252.1L402.5 251.4M368.7 252.9L368.7 255M402.5 249.3L402.5 251.4\"/></g><g class=\"iso-dots\" data-tone=\"mid\"><circle cx=\"361.8\" cy=\"250.3\" r=\"0.4\"/><circle cx=\"386.3\" cy=\"252.7\" r=\"0.4\"/><circle cx=\"406.7\" cy=\"245.5\" r=\"0.4\"/></g><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M367.6 232.9L367.6 231.9L368 231L368.6 230.1L369.4 229.3L370.6 228.5L371.9 227.8L373.4 227.3L375.1 226.9L376.9 226.6L378.8 226.5L380.7 226.5L382.5 226.6L384.3 226.9L386 227.4L387.5 227.9L388.9 228.6L389.9 229.4L390.8 230.2L391.4 231.1L391.6 232L391.6 236.6L391.6 237.6L391.3 238.5L390.7 239.4L389.8 240.2L388.7 241L387.4 241.7L385.8 242.2L384.1 242.6L382.3 242.9L380.5 243L378.6 243L376.7 242.9L374.9 242.6L373.3 242.1L371.7 241.6L370.4 240.9L369.3 240.1L368.5 239.3L367.9 238.4L367.6 237.5Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M389.8 240.2L388.7 241L388.7 236.4L389.8 235.6ZM388.7 241L387.4 241.7L387.4 237.1L388.7 236.4ZM387.4 241.7L385.8 242.2L385.8 237.6L387.4 237.1ZM391.6 236.6L391.6 237.6L391.6 233L391.6 232ZM391.6 237.6L391.3 238.5L391.3 233.9L391.6 233ZM391.3 238.5L390.7 239.4L390.7 234.8L391.3 233.9ZM390.7 239.4L389.8 240.2L389.8 235.6L390.7 234.8Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M385.8 242.2L384.1 242.6L384.1 238L385.8 237.6ZM384.1 242.6L382.3 242.9L382.3 238.3L384.1 238ZM382.3 242.9L380.5 243L380.5 238.5L382.3 238.3Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M380.5 243L378.6 243L378.6 238.4L380.5 238.5ZM378.6 243L376.7 242.9L376.7 238.3L378.6 238.4ZM376.7 242.9L374.9 242.6L374.9 238L376.7 238.3ZM374.9 242.6L373.3 242.1L373.3 237.6L374.9 238Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M373.3 242.1L371.7 241.6L371.7 237L373.3 237.6ZM371.7 241.6L370.4 240.9L370.4 236.3L371.7 237ZM370.4 240.9L369.3 240.1L369.3 235.6L370.4 236.3ZM369.3 240.1L368.5 239.3L368.5 234.7L369.3 235.6ZM368.5 239.3L367.9 238.4L367.9 233.8L368.5 234.7ZM367.9 238.4L367.6 237.5L367.6 232.9L367.9 233.8Z\"/><path class=\"iso-top\" d=\"M389.8 235.6L388.7 236.4L387.4 237.1L385.8 237.6L384.1 238L382.3 238.3L380.5 238.5L378.6 238.4L376.7 238.3L374.9 238L373.3 237.6L371.7 237L370.4 236.3L369.3 235.6L368.5 234.7L367.9 233.8L367.6 232.9L367.6 231.9L368 231L368.6 230.1L369.4 229.3L370.6 228.5L371.9 227.8L373.4 227.3L375.1 226.9L376.9 226.6L378.8 226.5L380.7 226.5L382.5 226.6L384.3 226.9L386 227.4L387.5 227.9L388.9 228.6L389.9 229.4L390.8 230.2L391.4 231.1L391.6 232L391.6 233L391.3 233.9L390.7 234.8Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M391.6 232L391.6 233L391.3 233.9L390.7 234.8L389.8 235.6L388.7 236.4L387.4 237.1L385.8 237.6L384.1 238L382.3 238.3L380.5 238.5L378.6 238.4L376.7 238.3L374.9 238L373.3 237.6L371.7 237L370.4 236.3L369.3 235.6L368.5 234.7L367.9 233.8L367.6 232.9\"/><path class=\"iso-line iso-bevel\" data-tone=\"faint\" d=\"M391.6 232L390.8 232.9L390.5 233.8L389.9 234.6L389.1 235.4L388.1 236.1L386.8 236.7L385.4 237.2L383.8 237.6L382.1 237.9L380.4 238L378.7 238L376.9 237.9L375.3 237.6L373.7 237.2L372.3 236.7L371.1 236L370.1 235.3L369.3 234.5L368.7 233.7L367.6 232.9\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M367.6 232.9L367.6 231.9L368 231L368.6 230.1L369.4 229.3L370.6 228.5L371.9 227.8L373.4 227.3L375.1 226.9L376.9 226.6L378.8 226.5L380.7 226.5L382.5 226.6L384.3 226.9L386 227.4L387.5 227.9L388.9 228.6L389.9 229.4L390.8 230.2L391.4 231.1L391.6 232M391.6 236.6L391.6 237.6L391.3 238.5L390.7 239.4L389.8 240.2L388.7 241L387.4 241.7L385.8 242.2L384.1 242.6L382.3 242.9L380.5 243L378.6 243L376.7 242.9L374.9 242.6L373.3 242.1L371.7 241.6L370.4 240.9L369.3 240.1L368.5 239.3L367.9 238.4L367.6 237.5M367.6 232.9L367.6 237.5M391.6 232L391.6 236.6\"/></g><path class=\"iso-line\" data-tone=\"faint\" d=\"M387.8 235L386.6 235.8L385.2 236.4L383.6 236.8L381.8 237.1L379.9 237.3L378 237.2L376.2 237L374.5 236.5L373 236L371.8 235.2L370.9 234.4L370.3 233.5L370 232.6L370.1 231.7L370.6 230.7L371.5 229.9L372.6 229.2L374 228.5L375.7 228.1L377.5 227.8L379.3 227.6L381.2 227.7L383 228L384.7 228.4L386.2 228.9L387.5 229.7L388.4 230.5L389 231.4L389.3 232.3L389.1 233.2L388.6 234.2Z\"/><path class=\"iso-line\" data-tone=\"mid\" d=\"M374.3 236.4L373.2 237.2M381.6 237.2L382 238.1M387.8 235L389.4 235.5\"/><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M377.2 227.9L377.6 227.3L378.5 226.8L379.7 226.7L380.9 226.9L381.8 227.3L382 227.9L382 232.5L381.7 233.1L380.8 233.5L379.6 233.7L378.4 233.5L377.5 233L377.2 232.4Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M381.7 233.1L380.8 233.5L380.8 229L381.7 228.5ZM382 232.5L381.7 233.1L381.7 228.5L382 227.9Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M380.8 233.5L379.6 233.7L379.6 229.1L380.8 229Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M379.6 233.7L378.4 233.5L378.4 228.9L379.6 229.1Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M378.4 233.5L377.5 233L377.5 228.5L378.4 228.9ZM377.5 233L377.2 232.4L377.2 227.9L377.5 228.5Z\"/><path class=\"iso-top\" d=\"M381.7 228.5L380.8 229L379.6 229.1L378.4 228.9L377.5 228.5L377.2 227.9L377.6 227.3L378.5 226.8L379.7 226.7L380.9 226.9L381.8 227.3L382 227.9Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M382 227.9L381.7 228.5L380.8 229L379.6 229.1L378.4 228.9L377.5 228.5L377.2 227.9\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M377.2 227.9L377.6 227.3L378.5 226.8L379.7 226.7L380.9 226.9L381.8 227.3L382 227.9M382 232.5L381.7 233.1L380.8 233.5L379.6 233.7L378.4 233.5L377.5 233L377.2 232.4M377.2 227.9L377.2 232.4M382 227.9L382 232.5\"/></g><path class=\"iso-halo\" d=\"M431 303.3L431.2 301.6L432.1 299.9L433.6 298.4L435.6 297.1L438.2 296L441.1 295.2L444.3 294.6L447.6 294.4L451 294.5L454.2 295L457.3 295.7L459.9 296.7L462.1 298L463.8 299.5L464.9 301.1L465.3 302.7L465.3 304.2L465.1 305.9L464.2 307.5L462.7 309L460.7 310.4L458.1 311.5L455.2 312.3L452 312.9L448.7 313.1L445.3 313L442.1 312.5L439 311.8L436.4 310.7L434.2 309.5L432.5 308L431.4 306.4L431 304.7Z\"/><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M431 271.8L431.1 270.6L431.6 269.4L432.4 268.3L433.6 267.2L435 266.2L436.7 265.3L438.7 264.6L440.8 264L443.1 263.5L445.5 263.2L447.9 263.1L450.4 263.2L452.8 263.4L455.1 263.9L457.3 264.4L459.2 265.2L461 266L462.5 267L463.7 268.1L464.6 269.2L465.1 270.4L465.3 271.6L465.3 304.4L465.2 305.6L464.7 306.8L463.9 307.9L462.7 309L461.3 310L459.6 310.9L457.6 311.6L455.5 312.2L453.2 312.7L450.8 313L448.4 313.1L445.9 313L443.5 312.8L441.2 312.3L439 311.8L437.1 311L435.3 310.2L433.8 309.2L432.6 308.1L431.7 307L431.2 305.8L431 304.6Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M462.7 309L461.3 310L461.3 277.3L462.7 276.3ZM461.3 310L459.6 310.9L459.6 278.1L461.3 277.3ZM459.6 310.9L457.6 311.6L457.6 278.9L459.6 278.1ZM465.3 304.4L465.2 305.6L465.2 272.8L465.3 271.6ZM465.2 305.6L464.7 306.8L464.7 274L465.2 272.8ZM464.7 306.8L463.9 307.9L463.9 275.2L464.7 274ZM463.9 307.9L462.7 309L462.7 276.3L463.9 275.2Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M457.6 311.6L455.5 312.2L455.5 279.5L457.6 278.9ZM455.5 312.2L453.2 312.7L453.2 279.9L455.5 279.5ZM453.2 312.7L450.8 313L450.8 280.2L453.2 279.9ZM450.8 313L448.4 313.1L448.4 280.3L450.8 280.2Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M448.4 313.1L445.9 313L445.9 280.2L448.4 280.3ZM445.9 313L443.5 312.8L443.5 280L445.9 280.2ZM443.5 312.8L441.2 312.3L441.2 279.6L443.5 280ZM441.2 312.3L439 311.8L439 279L441.2 279.6Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M439 311.8L437.1 311L437.1 278.3L439 279ZM437.1 311L435.3 310.2L435.3 277.4L437.1 278.3ZM435.3 310.2L433.8 309.2L433.8 276.5L435.3 277.4ZM433.8 309.2L432.6 308.1L432.6 275.4L433.8 276.5ZM432.6 308.1L431.7 307L431.7 274.3L432.6 275.4ZM431.7 307L431.2 305.8L431.2 273.1L431.7 274.3ZM431.2 305.8L431 304.6L431 271.8L431.2 273.1Z\"/><path class=\"iso-top\" d=\"M462.7 276.3L461.3 277.3L459.6 278.1L457.6 278.9L455.5 279.5L453.2 279.9L450.8 280.2L448.4 280.3L445.9 280.2L443.5 280L441.2 279.6L439 279L437.1 278.3L435.3 277.4L433.8 276.5L432.6 275.4L431.7 274.3L431.2 273.1L431 271.8L431.1 270.6L431.6 269.4L432.4 268.3L433.6 267.2L435 266.2L436.7 265.3L438.7 264.6L440.8 264L443.1 263.5L445.5 263.2L447.9 263.1L450.4 263.2L452.8 263.4L455.1 263.9L457.3 264.4L459.2 265.2L461 266L462.5 267L463.7 268.1L464.6 269.2L465.1 270.4L465.3 271.6L465.2 272.8L464.7 274L463.9 275.2Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M465.3 271.6L465.2 272.8L464.7 274L463.9 275.2L462.7 276.3L461.3 277.3L459.6 278.1L457.6 278.9L455.5 279.5L453.2 279.9L450.8 280.2L448.4 280.3L445.9 280.2L443.5 280L441.2 279.6L439 279L437.1 278.3L435.3 277.4L433.8 276.5L432.6 275.4L431.7 274.3L431.2 273.1L431 271.8\"/><path class=\"iso-line iso-bevel\" data-tone=\"faint\" d=\"M465.3 271.6L464.2 272.8L463.7 273.9L462.9 275L461.9 276L460.5 276.9L458.9 277.8L457.1 278.5L455.1 279L452.9 279.4L450.7 279.7L448.4 279.8L446.1 279.7L443.8 279.5L441.6 279.1L439.6 278.6L437.7 277.9L436.1 277.1L434.7 276.2L433.5 275.2L432.7 274.1L432.2 273L431 271.8\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M431 271.8L431.1 270.6L431.6 269.4L432.4 268.3L433.6 267.2L435 266.2L436.7 265.3L438.7 264.6L440.8 264L443.1 263.5L445.5 263.2L447.9 263.1L450.4 263.2L452.8 263.4L455.1 263.9L457.3 264.4L459.2 265.2L461 266L462.5 267L463.7 268.1L464.6 269.2L465.1 270.4L465.3 271.6M465.3 304.4L465.2 305.6L464.7 306.8L463.9 307.9L462.7 309L461.3 310L459.6 310.9L457.6 311.6L455.5 312.2L453.2 312.7L450.8 313L448.4 313.1L445.9 313L443.5 312.8L441.2 312.3L439 311.8L437.1 311L435.3 310.2L433.8 309.2L432.6 308.1L431.7 307L431.2 305.8L431 304.6M431 271.8L431 304.6M465.3 271.6L465.3 304.4\"/></g><path class=\"iso-line\" data-tone=\"lo\" d=\"M462.7 280.9L462.7 276.7M461.4 281.8L461.4 277.6M459.9 282.6L459.9 278.5M458.1 283.3L458.1 279.2M456.2 283.9L456.2 279.8M454.2 284.4L454.2 280.2M452 284.7L452 280.5M449.8 284.9L449.8 280.7M447.6 284.9L447.6 280.8M445.3 284.8L445.3 280.6M443.1 284.6L443.1 280.4M441 284.2L441 280M439 283.6L439 279.5M437.2 283L437.2 278.8M435.6 282.2L435.6 278M434.2 281.3L434.2 277.2M433 280.4L433 276.2M432.1 279.3L432.1 275.2M431.4 278.3L431.4 274.1M465.1 277.8L465.1 273.6M464.6 278.9L464.6 274.7M463.8 279.9L463.8 275.7M461.6 275.9L460.2 276.8L458.7 277.6L456.9 278.3L454.9 278.9L452.8 279.3L450.6 279.5L448.4 279.6L446.1 279.6L443.9 279.3L441.8 279L439.8 278.4L437.9 277.8L436.3 277L435 276.1L433.9 275.1L433 274L432.5 272.9L432.3 271.8L432.5 270.7L432.9 269.6L433.7 268.5L434.7 267.5L436.1 266.6L437.6 265.8L439.4 265.1L441.4 264.6L443.5 264.2L445.7 263.9L448 263.8L450.2 263.9L452.4 264.1L454.5 264.5L456.5 265L458.4 265.7L460 266.5L461.3 267.4L462.5 268.3L463.3 269.4L463.8 270.5L464 271.6L463.8 272.8L463.4 273.9L462.6 274.9ZM460.1 268.5L461.5 268.2M461.7 272L463.3 272M454.5 277.7L455.3 278.4M447.7 278.5L447.6 279.3M436.2 274.9L434.8 275.3M434.6 271.5L433 271.5M441.8 265.7L441.1 265M448.6 264.9L448.7 264.2\"/><path class=\"iso-line\" data-tone=\"faint\" d=\"M465.3 276.8L465.2 277.7L464.9 278.7L464.4 279.6L463.6 280.5L462.7 281.4L461.6 282.1L460.3 282.9L458.9 283.5L457.3 284.1L455.6 284.5L453.8 284.9L452 285.2L450.1 285.3L448.2 285.4L446.2 285.3L444.3 285.2L442.5 284.9L440.7 284.5L439 284.1L437.4 283.5L436 282.9L434.7 282.1L433.6 281.4L432.7 280.5L431.9 279.6L431.4 278.7L431.1 277.7L431 276.8M465.3 298.5L465.2 299.5L464.9 300.4L464.4 301.4L463.6 302.3L462.7 303.1L461.6 303.9L460.3 304.6L458.9 305.2L457.3 305.8L455.6 306.3L453.8 306.6L452 306.9L450.1 307.1L448.2 307.1L446.2 307.1L444.3 306.9L442.5 306.6L440.7 306.3L439 305.8L437.4 305.2L436 304.6L434.7 303.9L433.6 303.1L432.7 302.3L431.9 301.4L431.4 300.4L431.1 299.5L431 298.5\"/><path class=\"iso-line\" data-tone=\"mid\" d=\"M448.2 298.8L448.2 287.2M454.6 266.5L456.2 265.3M458.5 275L461 275.7M441.7 276.9L440.1 278.1M437.8 268.5L435.3 267.7\"/><g data-part=\"switch-2\" transform=\"translate(0 -2.98)\"><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M446.1 291.1L450.2 291.1L450.2 295.7L446.1 295.7Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M450.2 295.7L446.1 295.7L446.1 292.5L450.2 292.5Z\"/><path class=\"iso-top\" d=\"M450.2 291.1L450.2 292.5L446.1 292.5L446.1 291.1Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M450.2 292.5L446.1 292.5\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M446.1 291.1L450.2 291.1L450.2 295.7L446.1 295.7Z\"/></g></g><path class=\"iso-line\" data-tone=\"hi\" data-part=\"hand-2\" d=\"M445 277L443.6 279.2\" style=\"stroke-width:1\"/><path class=\"iso-halo\" d=\"M317.3 315.3L317.5 313.7L318.4 312L319.9 310.5L321.9 309.2L324.5 308.1L327.4 307.2L330.6 306.7L333.9 306.5L337.3 306.6L340.5 307L343.6 307.8L346.2 308.8L348.4 310.1L350.1 311.5L351.2 313.1L351.6 314.8L351.6 316.3L351.4 318L350.5 319.6L349 321.1L347 322.4L344.4 323.6L341.5 324.4L338.3 324.9L335 325.2L331.6 325L328.4 324.6L325.3 323.8L322.7 322.8L320.5 321.6L318.8 320.1L317.7 318.5L317.3 316.8Z\"/><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M317.3 283.9L317.4 282.7L317.9 281.5L318.7 280.3L319.9 279.3L321.3 278.3L323 277.4L325 276.6L327.1 276L329.4 275.6L331.8 275.3L334.2 275.2L336.7 275.3L339.1 275.5L341.4 275.9L343.6 276.5L345.5 277.2L347.3 278.1L348.8 279.1L350 280.1L350.9 281.3L351.4 282.5L351.6 283.7L351.6 316.5L351.5 317.7L351 318.9L350.2 320L349 321.1L347.6 322.1L345.9 323L343.9 323.7L341.8 324.3L339.5 324.8L337.1 325.1L334.7 325.2L332.2 325.1L329.8 324.8L327.5 324.4L325.3 323.8L323.4 323.1L321.6 322.3L320.1 321.3L318.9 320.2L318 319.1L317.5 317.9L317.3 316.7Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M349 321.1L347.6 322.1L347.6 289.4L349 288.4ZM347.6 322.1L345.9 323L345.9 290.2L347.6 289.4ZM345.9 323L343.9 323.7L343.9 291L345.9 290.2ZM351.6 316.5L351.5 317.7L351.5 284.9L351.6 283.7ZM351.5 317.7L351 318.9L351 286.1L351.5 284.9ZM351 318.9L350.2 320L350.2 287.3L351 286.1ZM350.2 320L349 321.1L349 288.4L350.2 287.3Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M343.9 323.7L341.8 324.3L341.8 291.6L343.9 291ZM341.8 324.3L339.5 324.8L339.5 292L341.8 291.6ZM339.5 324.8L337.1 325.1L337.1 292.3L339.5 292ZM337.1 325.1L334.7 325.2L334.7 292.4L337.1 292.3Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M334.7 325.2L332.2 325.1L332.2 292.3L334.7 292.4ZM332.2 325.1L329.8 324.8L329.8 292.1L332.2 292.3ZM329.8 324.8L327.5 324.4L327.5 291.7L329.8 292.1ZM327.5 324.4L325.3 323.8L325.3 291.1L327.5 291.7Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M325.3 323.8L323.4 323.1L323.4 290.4L325.3 291.1ZM323.4 323.1L321.6 322.3L321.6 289.5L323.4 290.4ZM321.6 322.3L320.1 321.3L320.1 288.5L321.6 289.5ZM320.1 321.3L318.9 320.2L318.9 287.5L320.1 288.5ZM318.9 320.2L318 319.1L318 286.3L318.9 287.5ZM318 319.1L317.5 317.9L317.5 285.1L318 286.3ZM317.5 317.9L317.3 316.7L317.3 283.9L317.5 285.1Z\"/><path class=\"iso-top\" d=\"M349 288.4L347.6 289.4L345.9 290.2L343.9 291L341.8 291.6L339.5 292L337.1 292.3L334.7 292.4L332.2 292.3L329.8 292.1L327.5 291.7L325.3 291.1L323.4 290.4L321.6 289.5L320.1 288.5L318.9 287.5L318 286.3L317.5 285.1L317.3 283.9L317.4 282.7L317.9 281.5L318.7 280.3L319.9 279.3L321.3 278.3L323 277.4L325 276.6L327.1 276L329.4 275.6L331.8 275.3L334.2 275.2L336.7 275.3L339.1 275.5L341.4 275.9L343.6 276.5L345.5 277.2L347.3 278.1L348.8 279.1L350 280.1L350.9 281.3L351.4 282.5L351.6 283.7L351.5 284.9L351 286.1L350.2 287.3Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M351.6 283.7L351.5 284.9L351 286.1L350.2 287.3L349 288.4L347.6 289.4L345.9 290.2L343.9 291L341.8 291.6L339.5 292L337.1 292.3L334.7 292.4L332.2 292.3L329.8 292.1L327.5 291.7L325.3 291.1L323.4 290.4L321.6 289.5L320.1 288.5L318.9 287.5L318 286.3L317.5 285.1L317.3 283.9\"/><path class=\"iso-line iso-bevel\" data-tone=\"faint\" d=\"M351.6 283.7L350.5 284.9L350 286L349.2 287.1L348.2 288.1L346.8 289L345.2 289.8L343.4 290.5L341.4 291.1L339.2 291.5L337 291.8L334.7 291.9L332.4 291.8L330.1 291.6L327.9 291.2L325.9 290.7L324 290L322.4 289.2L321 288.3L319.8 287.3L319 286.2L318.5 285.1L317.3 283.9\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M317.3 283.9L317.4 282.7L317.9 281.5L318.7 280.3L319.9 279.3L321.3 278.3L323 277.4L325 276.6L327.1 276L329.4 275.6L331.8 275.3L334.2 275.2L336.7 275.3L339.1 275.5L341.4 275.9L343.6 276.5L345.5 277.2L347.3 278.1L348.8 279.1L350 280.1L350.9 281.3L351.4 282.5L351.6 283.7M351.6 316.5L351.5 317.7L351 318.9L350.2 320L349 321.1L347.6 322.1L345.9 323L343.9 323.7L341.8 324.3L339.5 324.8L337.1 325.1L334.7 325.2L332.2 325.1L329.8 324.8L327.5 324.4L325.3 323.8L323.4 323.1L321.6 322.3L320.1 321.3L318.9 320.2L318 319.1L317.5 317.9L317.3 316.7M317.3 283.9L317.3 316.7M351.6 283.7L351.6 316.5\"/></g><path class=\"iso-line\" data-tone=\"lo\" d=\"M349 293L349 288.8M347.7 293.9L347.7 289.7M346.2 294.7L346.2 290.5M344.4 295.4L344.4 291.3M342.5 296L342.5 291.8M340.5 296.5L340.5 292.3M338.3 296.8L338.3 292.6M336.1 297L336.1 292.8M333.9 297L333.9 292.8M331.6 296.9L331.6 292.7M329.4 296.6L329.4 292.5M327.3 296.2L327.3 292.1M325.3 295.7L325.3 291.5M323.5 295.1L323.5 290.9M321.9 294.3L321.9 290.1M320.5 293.4L320.5 289.2M319.3 292.5L319.3 288.3M318.4 291.4L318.4 287.3M317.7 290.4L317.7 286.2M351.4 289.8L351.4 285.7M350.9 290.9L350.9 286.8M350.1 292L350.1 287.8M347.9 288L346.5 288.9L345 289.7L343.2 290.4L341.2 291L339.1 291.4L336.9 291.6L334.7 291.7L332.4 291.6L330.2 291.4L328.1 291L326.1 290.5L324.2 289.8L322.6 289.1L321.3 288.2L320.2 287.2L319.3 286.1L318.8 285L318.6 283.9L318.8 282.8L319.2 281.7L320 280.6L321 279.6L322.4 278.7L323.9 277.9L325.7 277.2L327.7 276.7L329.8 276.3L332 276L334.3 275.9L336.5 276L338.7 276.2L340.8 276.6L342.8 277.1L344.7 277.8L346.3 278.6L347.6 279.4L348.8 280.4L349.6 281.5L350.1 282.6L350.3 283.7L350.1 284.8L349.7 285.9L348.9 287ZM340.4 289.9L341.1 290.6M333.5 290.6L333.4 291.4M322.2 286.8L320.9 287.1M320.9 283.3L319.4 283.3M328.5 277.7L327.8 277M335.4 277L335.5 276.3M346.7 280.8L348.1 280.5M348 284.3L349.5 284.3\"/><path class=\"iso-line\" data-tone=\"faint\" d=\"M351.6 288.9L351.5 289.8L351.2 290.8L350.7 291.7L349.9 292.6L349 293.4L347.9 294.2L346.6 294.9L345.2 295.6L343.6 296.1L341.9 296.6L340.1 297L338.3 297.2L336.4 297.4L334.5 297.5L332.5 297.4L330.6 297.2L328.8 297L327 296.6L325.3 296.1L323.7 295.6L322.3 294.9L321 294.2L319.9 293.4L319 292.6L318.2 291.7L317.7 290.8L317.4 289.8L317.3 288.9M351.6 310.6L351.5 311.6L351.2 312.5L350.7 313.4L349.9 314.3L349 315.2L347.9 316L346.6 316.7L345.2 317.3L343.6 317.9L341.9 318.3L340.1 318.7L338.3 319L336.4 319.1L334.5 319.2L332.5 319.1L330.6 319L328.8 318.7L327 318.3L325.3 317.9L323.7 317.3L322.3 316.7L321 316L319.9 315.2L319 314.3L318.2 313.4L317.7 312.5L317.4 311.6L317.3 310.6\"/><path class=\"iso-line\" data-tone=\"mid\" d=\"M334.5 310.9L334.5 299.3M344.6 287.2L347 288M327.6 288.9L326 290.1M324.3 280.4L321.9 279.6M341.3 278.7L342.9 277.5\"/><g data-part=\"switch-0\" transform=\"translate(0 -2.98)\"><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M332.4 303.2L336.5 303.2L336.5 307.8L332.4 307.8Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M336.5 307.8L332.4 307.8L332.4 304.5L336.5 304.5Z\"/><path class=\"iso-top\" d=\"M336.5 303.2L336.5 304.5L332.4 304.5L332.4 303.2Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M336.5 304.5L332.4 304.5\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M332.4 303.2L336.5 303.2L336.5 307.8L332.4 307.8Z\"/></g></g><path class=\"iso-line\" data-tone=\"hi\" data-part=\"hand-0\" d=\"M328.3 288.4L325.7 290.3\" style=\"stroke-width:1\"/><path class=\"iso-halo\" d=\"M379.2 321.4L379.5 319.7L380.4 318.1L381.9 316.5L383.9 315.2L386.4 314.1L389.4 313.3L392.6 312.7L395.9 312.5L399.3 312.6L402.5 313.1L405.5 313.8L408.2 314.8L410.4 316.1L412.1 317.6L413.2 319.2L413.6 320.8L413.6 322.3L413.4 324L412.5 325.6L411 327.1L409 328.5L406.4 329.6L403.5 330.4L400.3 331L397 331.2L393.6 331.1L390.3 330.6L387.3 329.9L384.7 328.8L382.4 327.6L380.8 326.1L379.7 324.5L379.2 322.8Z\"/><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M379.2 289.9L379.4 288.7L379.9 287.5L380.7 286.4L381.9 285.3L383.3 284.3L385 283.4L387 282.7L389.1 282.1L391.4 281.6L393.8 281.3L396.2 281.2L398.7 281.3L401.1 281.6L403.4 282L405.5 282.5L407.5 283.3L409.3 284.1L410.8 285.1L412 286.2L412.9 287.3L413.4 288.5L413.6 289.7L413.6 322.5L413.5 323.7L413 324.9L412.2 326.1L411 327.1L409.6 328.1L407.9 329L405.9 329.8L403.8 330.4L401.5 330.8L399.1 331.1L396.7 331.2L394.2 331.1L391.8 330.9L389.5 330.4L387.3 329.9L385.3 329.2L383.6 328.3L382.1 327.3L380.9 326.3L380 325.1L379.4 323.9L379.2 322.7Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M411 327.1L409.6 328.1L409.6 295.4L411 294.4ZM409.6 328.1L407.9 329L407.9 296.3L409.6 295.4ZM407.9 329L405.9 329.8L405.9 297L407.9 296.3ZM413.6 322.5L413.5 323.7L413.5 290.9L413.6 289.7ZM413.5 323.7L413 324.9L413 292.1L413.5 290.9ZM413 324.9L412.2 326.1L412.2 293.3L413 292.1ZM412.2 326.1L411 327.1L411 294.4L412.2 293.3Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M405.9 329.8L403.8 330.4L403.8 297.6L405.9 297ZM403.8 330.4L401.5 330.8L401.5 298L403.8 297.6ZM401.5 330.8L399.1 331.1L399.1 298.3L401.5 298ZM399.1 331.1L396.7 331.2L396.7 298.4L399.1 298.3Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M396.7 331.2L394.2 331.1L394.2 298.4L396.7 298.4ZM394.2 331.1L391.8 330.9L391.8 298.1L394.2 298.4ZM391.8 330.9L389.5 330.4L389.5 297.7L391.8 298.1ZM389.5 330.4L387.3 329.9L387.3 297.1L389.5 297.7Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M387.3 329.9L385.3 329.2L385.3 296.4L387.3 297.1ZM385.3 329.2L383.6 328.3L383.6 295.5L385.3 296.4ZM383.6 328.3L382.1 327.3L382.1 294.6L383.6 295.5ZM382.1 327.3L380.9 326.3L380.9 293.5L382.1 294.6ZM380.9 326.3L380 325.1L380 292.4L380.9 293.5ZM380 325.1L379.4 323.9L379.4 291.2L380 292.4ZM379.4 323.9L379.2 322.7L379.2 289.9L379.4 291.2Z\"/><path class=\"iso-top\" d=\"M411 294.4L409.6 295.4L407.9 296.3L405.9 297L403.8 297.6L401.5 298L399.1 298.3L396.7 298.4L394.2 298.4L391.8 298.1L389.5 297.7L387.3 297.1L385.3 296.4L383.6 295.5L382.1 294.6L380.9 293.5L380 292.4L379.4 291.2L379.2 289.9L379.4 288.7L379.9 287.5L380.7 286.4L381.9 285.3L383.3 284.3L385 283.4L387 282.7L389.1 282.1L391.4 281.6L393.8 281.3L396.2 281.2L398.7 281.3L401.1 281.6L403.4 282L405.5 282.5L407.5 283.3L409.3 284.1L410.8 285.1L412 286.2L412.9 287.3L413.4 288.5L413.6 289.7L413.5 290.9L413 292.1L412.2 293.3Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M413.6 289.7L413.5 290.9L413 292.1L412.2 293.3L411 294.4L409.6 295.4L407.9 296.3L405.9 297L403.8 297.6L401.5 298L399.1 298.3L396.7 298.4L394.2 298.4L391.8 298.1L389.5 297.7L387.3 297.1L385.3 296.4L383.6 295.5L382.1 294.6L380.9 293.5L380 292.4L379.4 291.2L379.2 289.9\"/><path class=\"iso-line iso-bevel\" data-tone=\"faint\" d=\"M413.6 289.7L412.5 290.9L412 292L411.2 293.1L410.1 294.1L408.8 295L407.2 295.9L405.3 296.6L403.3 297.1L401.2 297.6L398.9 297.8L396.6 297.9L394.3 297.8L392.1 297.6L389.9 297.2L387.9 296.7L386 296L384.4 295.2L383 294.3L381.8 293.3L381 292.2L380.5 291.1L379.2 289.9\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M379.2 289.9L379.4 288.7L379.9 287.5L380.7 286.4L381.9 285.3L383.3 284.3L385 283.4L387 282.7L389.1 282.1L391.4 281.6L393.8 281.3L396.2 281.2L398.7 281.3L401.1 281.6L403.4 282L405.5 282.5L407.5 283.3L409.3 284.1L410.8 285.1L412 286.2L412.9 287.3L413.4 288.5L413.6 289.7M413.6 322.5L413.5 323.7L413 324.9L412.2 326.1L411 327.1L409.6 328.1L407.9 329L405.9 329.8L403.8 330.4L401.5 330.8L399.1 331.1L396.7 331.2L394.2 331.1L391.8 330.9L389.5 330.4L387.3 329.9L385.3 329.2L383.6 328.3L382.1 327.3L380.9 326.3L380 325.1L379.4 323.9L379.2 322.7M379.2 289.9L379.2 322.7M413.6 289.7L413.6 322.5\"/></g><path class=\"iso-line\" data-tone=\"lo\" d=\"M411 299L411 294.8M409.7 299.9L409.7 295.7M408.2 300.7L408.2 296.6M406.4 301.4L406.4 297.3M404.5 302L404.5 297.9M402.5 302.5L402.5 298.3M400.3 302.8L400.3 298.7M398.1 303L398.1 298.8M395.8 303L395.8 298.9M393.6 302.9L393.6 298.8M391.4 302.7L391.4 298.5M389.3 302.3L389.3 298.1M387.3 301.7L387.3 297.6M385.5 301.1L385.5 296.9M383.9 300.3L383.9 296.1M382.4 299.4L382.4 295.3M381.3 298.5L381.3 294.3M380.3 297.5L380.3 293.3M379.7 296.4L379.7 292.2M413.4 295.9L413.4 291.7M412.9 297L412.9 292.8M412.1 298L412.1 293.8M409.8 294L408.5 294.9L406.9 295.7L405.2 296.4L403.2 297L401.1 297.4L398.9 297.6L396.6 297.7L394.4 297.7L392.2 297.4L390 297.1L388.1 296.5L386.2 295.9L384.6 295.1L383.2 294.2L382.1 293.2L381.3 292.2L380.8 291.1L380.6 289.9L380.8 288.8L381.2 287.7L382 286.6L383 285.6L384.3 284.7L385.9 283.9L387.7 283.2L389.7 282.7L391.8 282.3L394 282L396.2 281.9L398.5 282L400.7 282.2L402.8 282.6L404.8 283.1L406.6 283.8L408.3 284.6L409.6 285.5L410.7 286.5L411.5 287.5L412.1 288.6L412.2 289.7L412.1 290.9L411.7 292L410.9 293ZM409.3 291.9L410.8 292.2M405.5 294.9L406.6 295.5M392.2 296.3L391.8 297M386.3 294.4L385.2 294.9M383.5 287.7L382 287.5M387.3 284.8L386.3 284.2M400.6 283.4L401.1 282.6M406.5 285.3L407.7 284.8\"/><path class=\"iso-line\" data-tone=\"faint\" d=\"M413.6 294.9L413.5 295.9L413.2 296.8L412.7 297.7L411.9 298.6L411 299.5L409.9 300.3L408.6 301L407.2 301.6L405.6 302.2L403.9 302.6L402.1 303L400.3 303.3L398.4 303.4L396.4 303.5L394.5 303.4L392.6 303.3L390.8 303L389 302.6L387.3 302.2L385.7 301.6L384.3 301L383 300.3L381.9 299.5L380.9 298.6L380.2 297.7L379.7 296.8L379.3 295.9L379.2 294.9M413.6 316.6L413.5 317.6L413.2 318.5L412.7 319.5L411.9 320.4L411 321.2L409.9 322L408.6 322.7L407.2 323.3L405.6 323.9L403.9 324.4L402.1 324.7L400.3 325L398.4 325.2L396.4 325.2L394.5 325.2L392.6 325L390.8 324.7L389 324.4L387.3 323.9L385.7 323.3L384.3 322.7L383 322L381.9 321.2L380.9 320.4L380.2 319.5L379.7 318.5L379.3 317.6L379.2 316.6\"/><path class=\"iso-line\" data-tone=\"mid\" d=\"M396.4 316.9L396.4 305.3M408.4 288.6L411.2 288.3M399 295.8L399.6 297.2M384.5 291.1L381.6 291.4M393.9 283.9L393.3 282.4\"/><g data-part=\"switch-1\" transform=\"translate(0 -2.98)\"><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M394.4 309.2L398.5 309.2L398.5 310.6L398.5 313.8L394.4 313.8L394.4 312.5Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M398.5 313.8L394.4 313.8L394.4 310.6L398.5 310.6Z\"/><path class=\"iso-top\" d=\"M398.5 309.2L398.5 310.6L394.4 310.6L394.4 309.2Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M398.5 310.6L394.4 310.6\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M394.4 309.2L398.5 309.2L398.5 310.6L398.5 313.8L394.4 313.8L394.4 312.5Z\"/></g></g><path class=\"iso-line\" data-tone=\"hi\" data-part=\"hand-1\" d=\"M404.5 286.1L407.8 284.5\" style=\"stroke-width:1\"/><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M398.4 242.5L407.5 235.2L439.6 261L439.6 264L430.5 271.3L398.4 245.5ZM411.9 232.8L413.2 231.7L440.9 254L440.9 263L439.6 264L411.9 241.7Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M439.6 264L430.5 271.3L430.5 268.3L439.6 261ZM440.9 263L439.6 264L439.6 255L440.9 254Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M398.4 245.5L430.5 271.3L430.5 268.3L398.4 242.5ZM411.9 241.7L439.6 264L439.6 255L411.9 232.8Z\"/><path class=\"iso-top\" d=\"M407.5 235.2L439.6 261L430.5 268.3L398.4 242.5ZM413.2 231.7L440.9 254L439.6 255L411.9 232.8Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M439.6 261L430.5 268.3M430.5 268.3L398.4 242.5M440.9 254L439.6 255M439.6 255L411.9 232.8M411.9 238.7L439.6 261\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M398.4 242.5L407.5 235.2M407.5 235.2L411.9 238.7M439.6 264L430.5 271.3M430.5 271.3L398.4 245.5M398.4 245.5L398.4 242.5M411.9 232.8L413.2 231.7M413.2 231.7L440.9 254M440.9 254L440.9 263M440.9 263L439.6 264M411.9 238.7L411.9 232.8\"/></g><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M336 272L357.1 240.6L371.4 245.4L371.4 248.3L350.2 279.8L336 275ZM334 265.4L352.2 238.2L354.2 238.9L354.2 247.8L336 275L334 274.3Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M371.4 248.3L350.2 279.8L350.2 276.8L371.4 245.4ZM354.2 247.8L336 275L336 266.1L354.2 238.9Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M350.2 279.8L336 275L336 272L350.2 276.8ZM336 275L334 274.3L334 265.4L336 266.1Z\"/><path class=\"iso-top\" d=\"M371.4 245.4L350.2 276.8L336 272L357.1 240.6ZM354.2 238.9L336 266.1L334 265.4L352.2 238.2Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M371.4 245.4L350.2 276.8M350.2 276.8L336 272M354.2 238.9L336 266.1M336 266.1L334 265.4M354.2 244.8L336 272\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M354.2 244.8L357.1 240.6M357.1 240.6L371.4 245.4M371.4 245.4L371.4 248.3M371.4 248.3L350.2 279.8M350.2 279.8L336 275M334 265.4L352.2 238.2M352.2 238.2L354.2 238.9M354.2 238.9L354.2 244.8M336 275L334 274.3M334 274.3L334 265.4\"/></g><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M376.9 245.9L393.8 244.1L401.6 278.4L401.6 281.4L384.8 283.2L376.9 248.9ZM394.8 242.8L397.2 242.6L404 272.2L404 281.1L401.6 281.4L394.8 251.8Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M401.6 281.4L384.8 283.2L384.8 280.2L401.6 278.4ZM404 281.1L401.6 281.4L401.6 272.4L404 272.2Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M376.9 248.9L384.8 283.2L384.8 280.2L376.9 245.9ZM394.8 251.8L401.6 281.4L401.6 272.4L394.8 242.8Z\"/><path class=\"iso-top\" d=\"M393.8 244.1L401.6 278.4L384.8 280.2L376.9 245.9ZM397.2 242.6L404 272.2L401.6 272.4L394.8 242.8Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M401.6 278.4L384.8 280.2M384.8 280.2L376.9 245.9M404 272.2L401.6 272.4M401.6 272.4L394.8 242.8M394.8 248.8L401.6 278.4\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M376.9 245.9L393.8 244.1M393.8 244.1L394.8 248.8M401.6 281.4L384.8 283.2M384.8 283.2L376.9 248.9M376.9 248.9L376.9 245.9M394.8 242.8L397.2 242.6M397.2 242.6L404 272.2M404 272.2L404 281.1M404 281.1L401.6 281.4M394.8 248.8L394.8 242.8\"/></g><g class=\"iso-solid\" data-solid=\"spout-bed\"><path class=\"iso-fill\" data-key=\"fill\" d=\"M356.6 237.2L374.4 220.7L388.7 225.5L388.7 228.5L370.9 245L356.6 240.2ZM354.7 231.5L372.4 215L374.4 215.7L374.4 223.7L356.6 240.2L354.7 239.5Z\"/><path class=\"iso-shade\" data-shade=\"0\" data-key=\"s0\" d=\"M388.7 228.5L370.9 245L370.9 242L388.7 225.5ZM374.4 223.7L356.6 240.2L356.6 232.2L374.4 215.7Z\"/><path class=\"iso-shade\" data-shade=\"1\" data-key=\"s1\" d=\"\"/><path class=\"iso-shade\" data-shade=\"2\" data-key=\"s2\" d=\"\"/><path class=\"iso-shade\" data-shade=\"3\" data-key=\"s3\" d=\"M370.9 245L356.6 240.2L356.6 237.2L370.9 242ZM356.6 240.2L354.7 239.5L354.7 231.5L356.6 232.2Z\"/><path class=\"iso-top\" data-key=\"top\" d=\"M388.7 225.5L370.9 242L356.6 237.2L374.4 220.7ZM374.4 215.7L356.6 232.2L354.7 231.5L372.4 215Z\"/><path class=\"iso-line\" data-tone=\"faint\" data-key=\"crease\" d=\"M388.7 225.5L370.9 242M370.9 242L356.6 237.2M374.4 215.7L356.6 232.2M356.6 232.2L354.7 231.5M374.4 220.7L356.6 237.2\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" data-key=\"edge\" d=\"M374.4 220.7L388.7 225.5M388.7 225.5L388.7 228.5M388.7 228.5L370.9 245M370.9 245L356.6 240.2M354.7 231.5L372.4 215M372.4 215L374.4 215.7M374.4 215.7L374.4 220.7M356.6 240.2L354.7 239.5M354.7 239.5L354.7 231.5\"/></g><g data-layer=\"spout\"></g><g class=\"iso-solid\" data-solid=\"spout-front\"><path class=\"iso-fill\" data-key=\"fill\" d=\"M370.9 237L388.7 220.5L390.7 221.2L390.7 229.2L372.9 245.7L370.9 245Z\"/><path class=\"iso-shade\" data-shade=\"0\" data-key=\"s0\" d=\"M390.7 229.2L372.9 245.7L372.9 237.6L390.7 221.2Z\"/><path class=\"iso-shade\" data-shade=\"1\" data-key=\"s1\" d=\"\"/><path class=\"iso-shade\" data-shade=\"2\" data-key=\"s2\" d=\"\"/><path class=\"iso-shade\" data-shade=\"3\" data-key=\"s3\" d=\"M372.9 245.7L370.9 245L370.9 237L372.9 237.6Z\"/><path class=\"iso-top\" data-key=\"top\" d=\"M390.7 221.2L372.9 237.6L370.9 237L388.7 220.5Z\"/><path class=\"iso-line\" data-tone=\"faint\" data-key=\"crease\" d=\"M390.7 221.2L372.9 237.6M372.9 237.6L370.9 237\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" data-key=\"edge\" d=\"M370.9 237L388.7 220.5L390.7 221.2L390.7 229.2L372.9 245.7L370.9 245Z\"/></g><g data-layer=\"chute-2\"></g><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M401.5 241.1L402.8 240.1L430.5 262.3L430.5 271.3L429.2 272.3L401.5 250Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M430.5 271.3L429.2 272.3L429.2 263.4L430.5 262.3Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M401.5 250L429.2 272.3L429.2 263.4L401.5 241.1Z\"/><path class=\"iso-top\" d=\"M402.8 240.1L430.5 262.3L429.2 263.4L401.5 241.1Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M430.5 262.3L429.2 263.4M429.2 263.4L401.5 241.1\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M401.5 241.1L402.8 240.1L430.5 262.3L430.5 271.3L429.2 272.3L401.5 250Z\"/></g><g data-layer=\"chute-0\"></g><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M350.2 270.9L368.5 243.7L370.5 244.4L370.5 253.3L352.2 280.5L350.2 279.8Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M370.5 253.3L352.2 280.5L352.2 271.5L370.5 244.4Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M352.2 280.5L350.2 279.8L350.2 270.9L352.2 271.5Z\"/><path class=\"iso-top\" d=\"M370.5 244.4L352.2 271.5L350.2 270.9L368.5 243.7Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M370.5 244.4L352.2 271.5M352.2 271.5L350.2 270.9\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M350.2 270.9L368.5 243.7L370.5 244.4L370.5 253.3L352.2 280.5L350.2 279.8Z\"/></g><g data-layer=\"chute-1\"></g><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M375.7 244.9L378 244.6L384.8 274.2L384.8 283.2L382.5 283.4L375.7 253.8Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M384.8 283.2L382.5 283.4L382.5 274.5L384.8 274.2Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M375.7 253.8L382.5 283.4L382.5 274.5L375.7 244.9Z\"/><path class=\"iso-top\" d=\"M378 244.6L384.8 274.2L382.5 274.5L375.7 244.9Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M384.8 274.2L382.5 274.5M382.5 274.5L375.7 244.9\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M375.7 244.9L378 244.6L384.8 274.2L384.8 283.2L382.5 283.4L375.7 253.8Z\"/></g><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M438.8 267.9L439.2 266.9L440.1 265.9L441.5 265.1L443.1 264.5L445 264L447.1 263.8L449.2 263.8L451.3 264L453.2 264.4L454.8 265.1L456.1 265.9L457.1 266.9L457.5 267.9L457.6 269L457.6 272.2L457.1 273.3L456.2 274.2L454.9 275.1L453.2 275.7L451.3 276.2L449.2 276.4L447.1 276.4L445.1 276.2L443.1 275.7L441.5 275.1L440.2 274.2L439.2 273.3L438.8 272.3L438.8 271.2Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M456.2 274.2L454.9 275.1L454.9 271.8L456.2 271ZM454.9 275.1L453.2 275.7L453.2 272.4L454.9 271.8ZM457.6 272.2L457.1 273.3L457.1 270L457.6 269ZM457.1 273.3L456.2 274.2L456.2 271L457.1 270Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M453.2 275.7L451.3 276.2L451.3 272.9L453.2 272.4ZM451.3 276.2L449.2 276.4L449.2 273.1L451.3 272.9ZM449.2 276.4L447.1 276.4L447.1 273.1L449.2 273.1Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M447.1 276.4L445.1 276.2L445.1 272.9L447.1 273.1ZM445.1 276.2L443.1 275.7L443.1 272.5L445.1 272.9Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M443.1 275.7L441.5 275.1L441.5 271.8L443.1 272.5ZM441.5 275.1L440.2 274.2L440.2 271L441.5 271.8ZM440.2 274.2L439.2 273.3L439.2 270L440.2 271ZM439.2 273.3L438.8 272.3L438.8 269L439.2 270ZM438.8 272.3L438.8 271.2L438.8 267.9L438.8 269Z\"/><path class=\"iso-top\" d=\"M456.2 271L454.9 271.8L453.2 272.4L451.3 272.9L449.2 273.1L447.1 273.1L445.1 272.9L443.1 272.5L441.5 271.8L440.2 271L439.2 270L438.8 269L438.8 267.9L439.2 266.9L440.1 265.9L441.5 265.1L443.1 264.5L445 264L447.1 263.8L449.2 263.8L451.3 264L453.2 264.4L454.8 265.1L456.1 265.9L457.1 266.9L457.5 267.9L457.6 269L457.1 270Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M457.6 269L457.1 270L456.2 271L454.9 271.8L453.2 272.4L451.3 272.9L449.2 273.1L447.1 273.1L445.1 272.9L443.1 272.5L441.5 271.8L440.2 271L439.2 270L438.8 269L438.8 267.9\"/><path class=\"iso-line iso-bevel\" data-tone=\"faint\" d=\"M457.6 269L456.6 269.9L455.7 270.8L454.5 271.6L452.9 272.2L451.1 272.7L449.2 272.9L447.2 272.9L445.2 272.7L443.4 272.2L441.8 271.6L440.6 270.8L439.7 269.9L439.3 269L438.8 267.9\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M438.8 267.9L439.2 266.9L440.1 265.9L441.5 265.1L443.1 264.5L445 264L447.1 263.8L449.2 263.8L451.3 264L453.2 264.4L454.8 265.1L456.1 265.9L457.1 266.9L457.5 267.9L457.6 269M457.6 272.2L457.1 273.3L456.2 274.2L454.9 275.1L453.2 275.7L451.3 276.2L449.2 276.4L447.1 276.4L445.1 276.2L443.1 275.7L441.5 275.1L440.2 274.2L439.2 273.3L438.8 272.3L438.8 271.2M438.8 267.9L438.8 271.2M457.6 269L457.6 272.2\"/></g><path class=\"iso-line\" data-tone=\"lo\" d=\"M454.9 270.5L453.8 271.2L452.4 271.8L450.8 272.2L449.1 272.4L447.3 272.4L445.6 272.2L444 271.8L442.6 271.3L441.5 270.6L440.7 269.8L440.3 268.9L440.3 268L440.7 267.2L441.4 266.4L442.5 265.7L443.9 265.1L445.5 264.7L447.2 264.5L449 264.5L450.7 264.7L452.3 265.1L453.7 265.6L454.8 266.3L455.6 267.1L456 268L456 268.9L455.6 269.7Z\"/><g data-layer=\"cup-2\" clip-path=\"url(#message-queue-cup-2)\"><g class=\"mq-ball\" data-ball=\"9\" transform=\"translate(448.15 266.22)\"><circle class=\"mq-ball-body\" r=\"7.74\"/><circle class=\"mq-ball-shine\" cx=\"-2.32\" cy=\"-2.48\" r=\"4.02\"/><circle class=\"mq-ball-edge\" r=\"7.74\"/></g></g><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M325.1 280L325.5 279L326.4 278L327.8 277.2L329.4 276.5L331.3 276.1L333.4 275.8L335.5 275.8L337.6 276.1L339.5 276.5L341.1 277.2L342.4 278L343.4 279L343.8 280L343.9 281.1L343.9 284.3L343.4 285.4L342.5 286.3L341.2 287.1L339.5 287.8L337.6 288.3L335.5 288.5L333.4 288.5L331.4 288.3L329.4 287.8L327.8 287.2L326.5 286.3L325.5 285.4L325.1 284.3L325.1 283.3Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M342.5 286.3L341.2 287.1L341.2 283.9L342.5 283ZM341.2 287.1L339.5 287.8L339.5 284.5L341.2 283.9ZM343.9 284.3L343.4 285.4L343.4 282.1L343.9 281.1ZM343.4 285.4L342.5 286.3L342.5 283L343.4 282.1Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M339.5 287.8L337.6 288.3L337.6 285L339.5 284.5ZM337.6 288.3L335.5 288.5L335.5 285.2L337.6 285ZM335.5 288.5L333.4 288.5L333.4 285.2L335.5 285.2Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M333.4 288.5L331.4 288.3L331.4 285L333.4 285.2ZM331.4 288.3L329.4 287.8L329.4 284.5L331.4 285Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M329.4 287.8L327.8 287.2L327.8 283.9L329.4 284.5ZM327.8 287.2L326.5 286.3L326.5 283.1L327.8 283.9ZM326.5 286.3L325.5 285.4L325.5 282.1L326.5 283.1ZM325.5 285.4L325.1 284.3L325.1 281.1L325.5 282.1ZM325.1 284.3L325.1 283.3L325.1 280L325.1 281.1Z\"/><path class=\"iso-top\" d=\"M342.5 283L341.2 283.9L339.5 284.5L337.6 285L335.5 285.2L333.4 285.2L331.4 285L329.4 284.5L327.8 283.9L326.5 283.1L325.5 282.1L325.1 281.1L325.1 280L325.5 279L326.4 278L327.8 277.2L329.4 276.5L331.3 276.1L333.4 275.8L335.5 275.8L337.6 276.1L339.5 276.5L341.1 277.2L342.4 278L343.4 279L343.8 280L343.9 281.1L343.4 282.1Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M343.9 281.1L343.4 282.1L342.5 283L341.2 283.9L339.5 284.5L337.6 285L335.5 285.2L333.4 285.2L331.4 285L329.4 284.5L327.8 283.9L326.5 283.1L325.5 282.1L325.1 281.1L325.1 280\"/><path class=\"iso-line iso-bevel\" data-tone=\"faint\" d=\"M343.9 281.1L342.9 282L342 282.9L340.8 283.7L339.2 284.3L337.4 284.7L335.5 285L333.5 285L331.5 284.8L329.7 284.3L328.1 283.7L326.9 282.9L326 282L325.6 281L325.1 280\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M325.1 280L325.5 279L326.4 278L327.8 277.2L329.4 276.5L331.3 276.1L333.4 275.8L335.5 275.8L337.6 276.1L339.5 276.5L341.1 277.2L342.4 278L343.4 279L343.8 280L343.9 281.1M343.9 284.3L343.4 285.4L342.5 286.3L341.2 287.1L339.5 287.8L337.6 288.3L335.5 288.5L333.4 288.5L331.4 288.3L329.4 287.8L327.8 287.2L326.5 286.3L325.5 285.4L325.1 284.3L325.1 283.3M325.1 280L325.1 283.3M343.9 281.1L343.9 284.3\"/></g><path class=\"iso-line\" data-tone=\"lo\" d=\"M341.2 282.6L340.1 283.3L338.7 283.9L337.1 284.3L335.4 284.5L333.6 284.5L331.9 284.3L330.3 283.9L328.9 283.3L327.8 282.6L327 281.8L326.6 281L326.6 280.1L327 279.2L327.7 278.4L328.8 277.7L330.2 277.2L331.8 276.8L333.5 276.6L335.3 276.6L337 276.8L338.6 277.2L340 277.7L341.1 278.4L341.9 279.2L342.3 280.1L342.3 281L341.9 281.8Z\"/><g data-layer=\"cup-0\" clip-path=\"url(#message-queue-cup-0)\"><g class=\"mq-ball\" data-ball=\"10\" transform=\"translate(334.45 290.69)\"><circle class=\"mq-ball-body\" r=\"7.74\"/><circle class=\"mq-ball-shine\" cx=\"-2.32\" cy=\"-2.48\" r=\"4.02\"/><circle class=\"mq-ball-edge\" r=\"7.74\"/></g></g><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M387 286L387.5 285L388.4 284.1L389.7 283.2L391.4 282.6L393.3 282.1L395.4 281.9L397.5 281.9L399.5 282.1L401.4 282.5L403.1 283.2L404.4 284L405.3 285L405.8 286L405.8 287.1L405.8 290.3L405.4 291.4L404.5 292.3L403.1 293.2L401.5 293.8L399.6 294.3L397.5 294.5L395.4 294.5L393.3 294.3L391.4 293.8L389.8 293.2L388.4 292.4L387.5 291.4L387 290.4L387 289.3Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M404.5 292.3L403.1 293.2L403.1 289.9L404.5 289.1ZM403.1 293.2L401.5 293.8L401.5 290.6L403.1 289.9ZM405.8 290.3L405.4 291.4L405.4 288.1L405.8 287.1ZM405.4 291.4L404.5 292.3L404.5 289.1L405.4 288.1Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M401.5 293.8L399.6 294.3L399.6 291L401.5 290.6ZM399.6 294.3L397.5 294.5L397.5 291.3L399.6 291ZM397.5 294.5L395.4 294.5L395.4 291.3L397.5 291.3Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M395.4 294.5L393.3 294.3L393.3 291L395.4 291.3ZM393.3 294.3L391.4 293.8L391.4 290.6L393.3 291Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M391.4 293.8L389.8 293.2L389.8 289.9L391.4 290.6ZM389.8 293.2L388.4 292.4L388.4 289.1L389.8 289.9ZM388.4 292.4L387.5 291.4L387.5 288.1L388.4 289.1ZM387.5 291.4L387 290.4L387 287.1L387.5 288.1ZM387 290.4L387 289.3L387 286L387 287.1Z\"/><path class=\"iso-top\" d=\"M404.5 289.1L403.1 289.9L401.5 290.6L399.6 291L397.5 291.3L395.4 291.3L393.3 291L391.4 290.6L389.8 289.9L388.4 289.1L387.5 288.1L387 287.1L387 286L387.5 285L388.4 284.1L389.7 283.2L391.4 282.6L393.3 282.1L395.4 281.9L397.5 281.9L399.5 282.1L401.4 282.5L403.1 283.2L404.4 284L405.3 285L405.8 286L405.8 287.1L405.4 288.1Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M405.8 287.1L405.4 288.1L404.5 289.1L403.1 289.9L401.5 290.6L399.6 291L397.5 291.3L395.4 291.3L393.3 291L391.4 290.6L389.8 289.9L388.4 289.1L387.5 288.1L387 287.1L387 286\"/><path class=\"iso-line iso-bevel\" data-tone=\"faint\" d=\"M405.8 287.1L404.9 288L404 288.9L402.8 289.7L401.2 290.3L399.4 290.8L397.5 291L395.5 291L393.5 290.8L391.7 290.3L390.1 289.7L388.9 288.9L388 288L387.6 287.1L387 286\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M387 286L387.5 285L388.4 284.1L389.7 283.2L391.4 282.6L393.3 282.1L395.4 281.9L397.5 281.9L399.5 282.1L401.4 282.5L403.1 283.2L404.4 284L405.3 285L405.8 286L405.8 287.1M405.8 290.3L405.4 291.4L404.5 292.3L403.1 293.2L401.5 293.8L399.6 294.3L397.5 294.5L395.4 294.5L393.3 294.3L391.4 293.8L389.8 293.2L388.4 292.4L387.5 291.4L387 290.4L387 289.3M387 286L387 289.3M405.8 287.1L405.8 290.3\"/></g><path class=\"iso-line\" data-tone=\"lo\" d=\"M403.1 288.7L402 289.3L400.7 289.9L399.1 290.3L397.3 290.5L395.6 290.5L393.8 290.3L392.2 289.9L390.9 289.4L389.7 288.7L389 287.9L388.6 287L388.6 286.1L389 285.3L389.7 284.5L390.8 283.8L392.2 283.2L393.8 282.8L395.5 282.6L397.3 282.6L399 282.8L400.6 283.2L402 283.8L403.1 284.4L403.9 285.2L404.3 286.1L404.3 287L403.9 287.9Z\"/><g data-layer=\"cup-1\" clip-path=\"url(#message-queue-cup-1)\"><g class=\"mq-ball\" data-ball=\"11\" transform=\"translate(396.43 284.32)\"><circle class=\"mq-ball-body\" r=\"7.74\"/><circle class=\"mq-ball-shine\" cx=\"-2.32\" cy=\"-2.48\" r=\"4.02\"/><circle class=\"mq-ball-edge\" r=\"7.74\"/></g></g><path class=\"iso-halo\" d=\"M138.2 259.7L138.2 259.3L138.5 258.9L138.8 258.5L154.3 246.1L154.8 245.8L155.5 245.5L156.2 245.3L157 245.2L157.8 245.1L158.7 245.2L159.5 245.3L160.2 245.5L193.8 255.9L194.4 256.2L195 256.5L195.4 256.9L195.7 257.3L195.8 257.7L195.8 259.2L195.7 259.6L195.5 260L195.1 260.4L179.6 272.8L179.1 273.1L178.5 273.4L177.8 273.6L177 273.7L176.1 273.8L175.3 273.8L174.5 273.7L173.7 273.5L140.2 263L139.5 262.7L139 262.4L138.6 262.1L138.3 261.7L138.2 261.2Z\"/><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M138.2 247.4L138.8 246.6L154.3 234.2L155.5 233.6L157 233.3L158.7 233.3L160.2 233.6L193.8 244L195 244.6L195.7 245.4L195.7 246.2L195.7 259.6L195.1 260.4L179.6 272.8L178.5 273.4L177 273.7L175.3 273.8L173.7 273.5L140.2 263L139 262.4L138.3 261.7L138.2 260.8Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M195.7 259.6L195.1 260.4L195.1 247L195.7 246.2ZM195.1 260.4L179.6 272.8L179.6 259.4L195.1 247ZM179.6 272.8L178.5 273.4L178.5 260L179.6 259.4Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M178.5 273.4L177 273.7L177 260.3L178.5 260ZM177 273.7L175.3 273.8L175.3 260.4L177 260.3Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M175.3 273.8L173.7 273.5L173.7 260.1L175.3 260.4Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M173.7 273.5L140.2 263L140.2 249.6L173.7 260.1ZM140.2 263L139 262.4L139 249L140.2 249.6ZM139 262.4L138.3 261.7L138.3 248.3L139 249ZM138.3 261.7L138.2 260.8L138.2 247.4L138.3 248.3Z\"/><path class=\"iso-top\" d=\"M193.8 244L195 244.6L195.7 245.4L195.7 246.2L195.1 247L179.6 259.4L178.5 260L177 260.3L175.3 260.4L173.7 260.1L140.2 249.6L139 249L138.3 248.3L138.2 247.4L138.8 246.6L154.3 234.2L155.5 233.6L157 233.3L158.7 233.3L160.2 233.6Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M195.7 246.2L195.1 247L179.6 259.4L178.5 260L177 260.3L175.3 260.4L173.7 260.1L140.2 249.6L139 249L138.3 248.3L138.2 247.4\"/><path class=\"iso-line iso-bevel\" data-tone=\"faint\" d=\"M195.7 246.2L193.9 246.7L178.6 259L177.7 259.4L176.7 259.7L175.5 259.7L174.3 259.5L141 249L140.1 248.6L139.6 248.1L138.2 247.4\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M138.2 247.4L138.8 246.6L154.3 234.2L155.5 233.6L157 233.3L158.7 233.3L160.2 233.6L193.8 244L195 244.6L195.7 245.4L195.7 246.2M195.7 259.6L195.1 260.4L179.6 272.8L178.5 273.4L177 273.7L175.3 273.8L173.7 273.5L140.2 263L139 262.4L138.3 261.7L138.2 260.8M195.7 246.2L195.7 259.6M138.2 247.4L138.2 260.8\"/></g><path class=\"iso-line\" data-tone=\"faint\" d=\"M192.1 245.3L192.6 245.6L192.7 245.9L192.5 246.2L177 258.6L176.6 258.8L176 258.8L175.4 258.8L141.8 248.3L141.4 248.1L141.3 247.7L141.5 247.5L156.9 235.1L157.4 234.8L158 234.8L158.6 234.9ZM176.7 249.9L175.4 250.8L173.7 251.5L171.7 252.1L169.6 252.4L167.3 252.6L165.1 252.5L162.9 252.2L160.9 251.7L159.1 251L157.6 250.2L156.5 249.2L155.8 248.1L155.5 247L155.6 245.9L156.2 244.8L157.2 243.8L158.6 242.9L160.3 242.1L162.3 241.6L164.4 241.2L166.6 241.1L168.9 241.1L171.1 241.4L173.1 241.9L174.9 242.6L176.4 243.5L177.5 244.4L178.2 245.5L178.5 246.6L178.3 247.8L177.8 248.9Z\"/><g class=\"iso-dots\" data-tone=\"mid\"><circle cx=\"158.3\" cy=\"236.2\" r=\"0.45\"/><circle cx=\"175.6\" cy=\"257.4\" r=\"0.45\"/></g><path class=\"iso-line\" data-tone=\"lo\" d=\"M152.8 246.2L150.9 246.1M153.8 244L152.1 243.7M156.2 242.1L154.8 241.5M159.6 240.7L158.7 239.9M168.2 239.7L168.4 238.8M172.6 240.2L173.3 239.4M176.3 241.4L177.6 240.7M179.2 243.1L180.8 242.7M181.2 247.4L183.1 247.5M180.1 249.6L181.9 250M177.7 251.5L179.2 252.1M174.3 252.9L175.3 253.7\"/><path class=\"iso-line\" data-tone=\"mid\" d=\"M154.8 248.2L151.2 248.6M164.2 240.7L163.3 238.9M179.2 245.4L182.7 245M169.8 252.9L170.6 254.7\"/><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M157.5 240.7L157.7 239.9L158.2 239.1L159 238.4L160 237.7L161.2 237.1L162.5 236.7L164.1 236.4L165.7 236.2L167.3 236.1L168.9 236.2L170.5 236.5L172 236.8L173.3 237.3L174.4 237.9L175.3 238.6L176 239.4L176.3 240.2L176.4 241L176.4 247L176.2 247.8L175.7 248.6L175 249.3L174 250L172.8 250.5L171.4 251L169.9 251.3L168.3 251.5L166.7 251.5L165 251.4L163.4 251.2L162 250.8L160.7 250.3L159.5 249.7L158.6 249L158 248.3L157.6 247.5L157.5 246.6Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M175 249.3L174 250L174 244L175 243.4ZM174 250L172.8 250.5L172.8 244.6L174 244ZM172.8 250.5L171.4 251L171.4 245L172.8 244.6ZM176.4 247L176.2 247.8L176.2 241.8L176.4 241ZM176.2 247.8L175.7 248.6L175.7 242.6L176.2 241.8ZM175.7 248.6L175 249.3L175 243.4L175.7 242.6Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M171.4 251L169.9 251.3L169.9 245.4L171.4 245ZM169.9 251.3L168.3 251.5L168.3 245.5L169.9 245.4ZM168.3 251.5L166.7 251.5L166.7 245.6L168.3 245.5Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M166.7 251.5L165 251.4L165 245.5L166.7 245.6ZM165 251.4L163.4 251.2L163.4 245.2L165 245.5ZM163.4 251.2L162 250.8L162 244.9L163.4 245.2Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M162 250.8L160.7 250.3L160.7 244.4L162 244.9ZM160.7 250.3L159.5 249.7L159.5 243.8L160.7 244.4ZM159.5 249.7L158.6 249L158.6 243.1L159.5 243.8ZM158.6 249L158 248.3L158 242.3L158.6 243.1ZM158 248.3L157.6 247.5L157.6 241.5L158 242.3ZM157.6 247.5L157.5 246.6L157.5 240.7L157.6 241.5Z\"/><path class=\"iso-top\" d=\"M175 243.4L174 244L172.8 244.6L171.4 245L169.9 245.4L168.3 245.5L166.7 245.6L165 245.5L163.4 245.2L162 244.9L160.7 244.4L159.5 243.8L158.6 243.1L158 242.3L157.6 241.5L157.5 240.7L157.7 239.9L158.2 239.1L159 238.4L160 237.7L161.2 237.1L162.5 236.7L164.1 236.4L165.7 236.2L167.3 236.1L168.9 236.2L170.5 236.5L172 236.8L173.3 237.3L174.4 237.9L175.3 238.6L176 239.4L176.3 240.2L176.4 241L176.2 241.8L175.7 242.6Z\"/><path class=\"iso-line iso-crease\" data-tone=\"faint\" d=\"M176.4 241L176.2 241.8L175.7 242.6L175 243.4L174 244L172.8 244.6L171.4 245L169.9 245.4L168.3 245.5L166.7 245.6L165 245.5L163.4 245.2L162 244.9L160.7 244.4L159.5 243.8L158.6 243.1L158 242.3L157.6 241.5L157.5 240.7\"/><path class=\"iso-line iso-bevel\" data-tone=\"faint\" d=\"M176.4 241L175.6 241.8L175.1 242.5L174.4 243.2L173.5 243.8L172.4 244.3L171.1 244.7L169.7 245L168.2 245.2L166.7 245.2L165.2 245.1L163.7 244.9L162.3 244.6L161.1 244.1L160.1 243.6L159.2 242.9L158.6 242.2L158.3 241.5L157.5 240.7\"/><path class=\"iso-line iso-edge\" data-tone=\"mid\" d=\"M157.5 240.7L157.7 239.9L158.2 239.1L159 238.4L160 237.7L161.2 237.1L162.5 236.7L164.1 236.4L165.7 236.2L167.3 236.1L168.9 236.2L170.5 236.5L172 236.8L173.3 237.3L174.4 237.9L175.3 238.6L176 239.4L176.3 240.2L176.4 241M176.4 247L176.2 247.8L175.7 248.6L175 249.3L174 250L172.8 250.5L171.4 251L169.9 251.3L168.3 251.5L166.7 251.5L165 251.4L163.4 251.2L162 250.8L160.7 250.3L159.5 249.7L158.6 249L158 248.3L157.6 247.5L157.5 246.6M157.5 240.7L157.5 246.6M176.4 241L176.4 247\"/></g><path class=\"iso-line\" data-tone=\"lo\" d=\"M175 248.7L175 244M174.1 249.3L174.1 244.6M173.1 249.8L173.1 245.1M171.9 250.3L171.9 245.5M170.5 250.6L170.5 245.8M169.1 250.8L169.1 246.1M167.6 250.9L167.6 246.2M166.2 250.9L166.2 246.2M164.7 250.8L164.7 246M163.3 250.6L163.3 245.8M162 250.2L162 245.5M160.8 249.8L160.8 245M159.7 249.3L159.7 244.5M158.9 248.7L158.9 243.9M158.2 248L158.2 243.2M157.8 247.3L157.8 242.5M176.2 247.4L176.2 242.6M175.7 248.1L175.7 243.3\"/><path class=\"iso-line\" data-tone=\"hi\" data-part=\"knob\" d=\"M164.6 241.6L173.8 238.8\" style=\"stroke-width:1\"/><text class=\"iso-face-text\" data-tone=\"lo\" transform=\"matrix(1.458 0.455 -0.911 0.729 159.329 252.935)\" font-size=\"2.3\" text-anchor=\"middle\">msg/s</text><g class=\"iso-solid\"><path class=\"iso-fill\" d=\"M463.3 268.8L463.7 268.1L471.9 261.6L472.9 261.1L474.2 261L475.5 261.1L506.1 270.7L507 271.2L507.3 271.9L507.3 273L506.9 273.7L498.7 280.2L497.7 280.7L496.4 280.8L495.2 280.6L464.5 271.1L463.6 270.6L463.3 269.9Z\"/><path class=\"iso-shade\" data-shade=\"0\" d=\"M507.3 273L506.9 273.7L506.9 272.5L507.3 271.9ZM506.9 273.7L498.7 280.2L498.7 279L506.9 272.5ZM498.7 280.2L497.7 280.7L497.7 279.5L498.7 279Z\"/><path class=\"iso-shade\" data-shade=\"1\" d=\"M497.7 280.7L496.4 280.8L496.4 279.7L497.7 279.5Z\"/><path class=\"iso-shade\" data-shade=\"2\" d=\"M496.4 280.8L495.2 280.6L495.2 279.5L496.4 279.7Z\"/><path class=\"iso-shade\" data-shade=\"3\" d=\"M495.2 280.6L464.5 271.1L464.5 269.9L495.2 279.5ZM464.5 271.1L463.6 270.6L463.6 269.4L464.5 269.9ZM463.6 270.6L463.3 269.9L463.3 268.8L463.6 269.4Z\"/><path class=\"iso-top\" d=\"M506.1 270.7L507 271.2L507.3 271.9L506.9 272.5L498.7 279L497.7 279.5L496.4 279.7L495.2 279.5L464.5 269.9L463.6 269.4L463.3 268.8L463.7 268.1L471.9 261.6L472.9 261.1L474.2 261L475.5 261.1Z\"/><path class=\"iso-line iso-edge\" data-tone=\"lo\" d=\"M463.3 268.8L463.7 268.1L471.9 261.6L472.9 261.1L474.2 261L475.5 261.1L506.1 270.7L507 271.2L507.3 271.9M507.3 273L506.9 273.7L498.7 280.2L497.7 280.7L496.4 280.8L495.2 280.6L464.5 271.1L463.6 270.6L463.3 269.9M507.3 271.9L507.3 273M463.3 268.8L463.3 269.9\"/></g><path class=\"iso-line\" data-tone=\"faint\" d=\"M504.7 271.8L496.5 278.4L465.9 268.8L474.1 262.2Z\"/><path class=\"iso-line\" data-tone=\"lo\" d=\"M476.6 265.1L499.9 272.4M474.4 266.9L490.4 271.9M472.2 268.6L492.6 275\"/><g class=\"iso-dots\" data-tone=\"mid\"><circle cx=\"471\" cy=\"265.8\" r=\"0.4\"/><circle cx=\"499.6\" cy=\"274.8\" r=\"0.4\"/></g><g data-layer=\"pool\"><g class=\"mq-ball\" data-ball=\"12\" display=\"none\"><circle class=\"mq-ball-body\" r=\"7.74\"/><circle class=\"mq-ball-shine\" cx=\"-2.32\" cy=\"-2.48\" r=\"4.02\"/><circle class=\"mq-ball-edge\" r=\"7.74\"/></g><g class=\"mq-ball\" data-ball=\"13\" display=\"none\"><circle class=\"mq-ball-body\" r=\"7.74\"/><circle class=\"mq-ball-shine\" cx=\"-2.32\" cy=\"-2.48\" r=\"4.02\"/><circle class=\"mq-ball-edge\" r=\"7.74\"/></g><g class=\"mq-ball\" data-ball=\"14\" display=\"none\"><circle class=\"mq-ball-body\" r=\"7.74\"/><circle class=\"mq-ball-shine\" cx=\"-2.32\" cy=\"-2.48\" r=\"4.02\"/><circle class=\"mq-ball-edge\" r=\"7.74\"/></g><g class=\"mq-ball\" data-ball=\"15\" display=\"none\"><circle class=\"mq-ball-body\" r=\"7.74\"/><circle class=\"mq-ball-shine\" cx=\"-2.32\" cy=\"-2.48\" r=\"4.02\"/><circle class=\"mq-ball-edge\" r=\"7.74\"/></g><g class=\"mq-ball\" data-ball=\"16\" display=\"none\"><circle class=\"mq-ball-body\" r=\"7.74\"/><circle class=\"mq-ball-shine\" cx=\"-2.32\" cy=\"-2.48\" r=\"4.02\"/><circle class=\"mq-ball-edge\" r=\"7.74\"/></g><g class=\"mq-ball\" data-ball=\"17\" display=\"none\"><circle class=\"mq-ball-body\" r=\"7.74\"/><circle class=\"mq-ball-shine\" cx=\"-2.32\" cy=\"-2.48\" r=\"4.02\"/><circle class=\"mq-ball-edge\" r=\"7.74\"/></g><g class=\"mq-ball\" data-ball=\"18\" display=\"none\"><circle class=\"mq-ball-body\" r=\"7.74\"/><circle class=\"mq-ball-shine\" cx=\"-2.32\" cy=\"-2.48\" r=\"4.02\"/><circle class=\"mq-ball-edge\" r=\"7.74\"/></g><g class=\"mq-ball\" data-ball=\"19\" display=\"none\"><circle class=\"mq-ball-body\" r=\"7.74\"/><circle class=\"mq-ball-shine\" cx=\"-2.32\" cy=\"-2.48\" r=\"4.02\"/><circle class=\"mq-ball-edge\" r=\"7.74\"/></g><g class=\"mq-ball\" data-ball=\"20\" display=\"none\"><circle class=\"mq-ball-body\" r=\"7.74\"/><circle class=\"mq-ball-shine\" cx=\"-2.32\" cy=\"-2.48\" r=\"4.02\"/><circle class=\"mq-ball-edge\" r=\"7.74\"/></g><g class=\"mq-ball\" data-ball=\"21\" display=\"none\"><circle class=\"mq-ball-body\" r=\"7.74\"/><circle class=\"mq-ball-shine\" cx=\"-2.32\" cy=\"-2.48\" r=\"4.02\"/><circle class=\"mq-ball-edge\" r=\"7.74\"/></g></g></svg>",
	data: "{\"P\":{\"origin\":[337.35681758339877,269.86068334752423],\"scale\":1.3590259111215217,\"azimuth\":58,\"elevation\":30},\"viewBox\":[600,400],\"rb\":7.7357111009932185,\"pool\":22,\"drums\":[[334.45391175694346,283.80843416985596],[396.4322845805086,289.8321218045046],[448.1522365706478,271.72477167483476]],\"drumHit\":24.066656758645568,\"preroll\":11.5,\"settle\":20,\"tour\":{\"delay\":1.4,\"resume\":3.6,\"low\":0.5,\"high\":2,\"hold\":[5,5],\"longest\":[30,26]}}",
	css: ":host{all:initial;display:block;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,sans-serif;font-size:16px;line-height:24px;color:#21201c;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-text-size-adjust:100%;--font-mono:ui-monospace,\"SF Mono\",Menlo,Consolas,monospace;--gray-100: #fdfdfc;--gray-200: #f9f9f8;--gray-300: #f1f0ef;--gray-400: #e9e9e7;--gray-500: #e2e1de;--gray-800: #bcbbb5;--gray-1000: #82827c;--gray-1100: #63635e;--gray-1200: #21201c;--surface: #ffffff;--ring: 0 0 0 1px rgba(0, 0, 0, .08);--shadow-small: 0 0 0 1px rgba(0, 0, 0, .08), 0 2px 2px rgba(0, 0, 0, .04);--inset-ring: inset 0 0 0 1px rgba(0, 0, 0, .08);--focus-ring: 0 0 0 1px rgba(0, 0, 0, .08), 0 0 0 4px rgba(0, 0, 0, .06);--ease: cubic-bezier(.4, 0, .2, 1);--column: 644px;--gutter: 24px;--scrollbar-color: rgba(0, 0, 0, .12);--scrollbar-color-hover: rgba(0, 0, 0, .2);--scrollbar-color-active: rgba(0, 0, 0, .28)}*,*:before,*:after{box-sizing:border-box}.iso{--anatomy-page:#0b0b0b;--anatomy-card:#131313;--anatomy-text:#a3a3a3;--anatomy-strong:#e6e6e6;--anatomy-muted:#6e6e6e;--anatomy-paper:#131313;--anatomy-face:#1b1b1b;--anatomy-top:#1c1c1c;--anatomy-shade-0:#0f0f0f;--anatomy-shade-1:#121212;--anatomy-shade-2:#151515;--anatomy-shade-3:#181818;--anatomy-lit-top:#262626;--anatomy-lit-shade:#1d1d1d;--anatomy-hi:#d4d4d4;--anatomy-mid:#6a6a6a;--anatomy-lo:#3e3e3e;--anatomy-faint:#2a2a2a;--anatomy-lit:#ffffff;--anatomy-halo:#050505;--anatomy-halo-opacity:.9;--anatomy-dot:#e6e6e6;--anatomy-red:#ff6b6b;--anatomy-green:#6be0a0;--anatomy-blue:#6b9bff;--anatomy-weight:.6px;--anatomy-ease:cubic-bezier(.32,.72,0,1);--anatomy-mono:ui-monospace,\"SF Mono\",Menlo,Consolas,monospace;--anatomy-lift:inset 0 1px 0 0 #ffffff0a,inset 0 0 0 1px #ffffff06,0 0 0 1px #00000026,0 1px 1px -.5px #00000014,0 3px 3px -1.5px #00000014,0 6px 6px -3px #00000014,0 12px 12px -6px #00000014}.iso[data-theme=light]{--anatomy-page:#f2f2ef;--anatomy-card:#fbfbfa;--anatomy-text:#57575a;--anatomy-strong:#18181a;--anatomy-muted:#8c8c90;--anatomy-paper:#fbfbfa;--anatomy-face:#ffffff;--anatomy-top:#ffffff;--anatomy-shade-0:#dcdcd9;--anatomy-shade-1:#e5e5e2;--anatomy-shade-2:#ededea;--anatomy-shade-3:#f4f4f1;--anatomy-lit-top:#ffffff;--anatomy-lit-shade:#eeeeeb;--anatomy-hi:#26262a;--anatomy-mid:#8a8a8f;--anatomy-lo:#b4b4b8;--anatomy-faint:#d4d4d6;--anatomy-lit:#000000;--anatomy-halo:#8a8a80;--anatomy-halo-opacity:.32;--anatomy-dot:#3a3a3e;--anatomy-red:#e5484d;--anatomy-green:#30a46c;--anatomy-blue:#3e63dd;--anatomy-lift:inset 0 1px 0 0 #ffffff,0 0 0 1px #0000000f,0 1px 1px -.5px #0000000a,0 3px 3px -1.5px #0000000a,0 6px 6px -3px #0000000a,0 12px 12px -6px #0000000a}.iso-svg{display:block;width:100%;height:auto;overflow:visible}.iso-svg path,.iso-svg circle{vector-effect:non-scaling-stroke}.iso-fill{fill:var(--anatomy-paper);stroke:none}.iso-solid[data-lit]>.iso-fill{fill:var(--anatomy-face)}.iso-shade,.iso-top{stroke:none}.iso-shade[data-shade=\"0\"]{fill:var(--anatomy-shade-0)}.iso-shade[data-shade=\"1\"]{fill:var(--anatomy-shade-1)}.iso-shade[data-shade=\"2\"]{fill:var(--anatomy-shade-2)}.iso-shade[data-shade=\"3\"]{fill:var(--anatomy-shade-3)}.iso-top{fill:var(--anatomy-top)}.iso-solid[data-lit]>.iso-top{fill:var(--anatomy-lit-top)}.iso-solid[data-lit]>.iso-shade{fill:var(--anatomy-lit-shade)}.iso-solid[data-seamless]>.iso-shade,.iso-solid[data-seamless]>.iso-top{stroke-width:.4;stroke-linejoin:round}.iso-solid[data-seamless]>.iso-shade[data-shade=\"0\"]{stroke:var(--anatomy-shade-0)}.iso-solid[data-seamless]>.iso-shade[data-shade=\"1\"]{stroke:var(--anatomy-shade-1)}.iso-solid[data-seamless]>.iso-shade[data-shade=\"2\"]{stroke:var(--anatomy-shade-2)}.iso-solid[data-seamless]>.iso-shade[data-shade=\"3\"]{stroke:var(--anatomy-shade-3)}.iso-solid[data-seamless]>.iso-top{stroke:var(--anatomy-top)}.iso-solid[data-seamless][data-lit]>.iso-top{stroke:var(--anatomy-lit-top)}.iso-solid[data-seamless][data-lit]>.iso-shade{stroke:var(--anatomy-lit-shade)}.iso-solid[data-lit]>.iso-edge{stroke:var(--anatomy-lit)}.iso-halo{fill:var(--anatomy-halo);stroke:none;filter:blur(9px);opacity:var(--anatomy-halo-opacity);transform:translateY(3px)}.iso-line{fill:none;stroke:var(--anatomy-lo);stroke-width:var(--anatomy-weight);stroke-linecap:round;stroke-linejoin:round}.iso-line[data-tone=hi]{stroke:var(--anatomy-hi)}.iso-line[data-tone=mid]{stroke:var(--anatomy-mid)}.iso-line[data-tone=lo]{stroke:var(--anatomy-lo)}.iso-line[data-tone=faint]{stroke:var(--anatomy-faint)}.iso-line[data-tone=lit]{stroke:var(--anatomy-lit)}.iso-line[data-tone=red]{stroke:var(--anatomy-red)}.iso-line[data-tone=green]{stroke:var(--anatomy-green)}.iso-line[data-tone=blue]{stroke:var(--anatomy-blue)}.iso-line[data-dotted]{stroke-dasharray:.01 3.5;stroke-width:1}.iso-line[data-dashed]{stroke-dasharray:3 3}.iso-line[data-flow]{stroke-dasharray:2 6}.iso-wire-end{fill:var(--anatomy-paper);stroke:var(--anatomy-lo);stroke-width:var(--anatomy-weight)}.iso-wire[data-tone=hi] .iso-wire-end{stroke:var(--anatomy-hi)}.iso-wire[data-tone=mid] .iso-wire-end{stroke:var(--anatomy-mid)}.iso-wire[data-tone=faint] .iso-wire-end{stroke:var(--anatomy-faint)}.iso-wire[data-tone=lit] .iso-wire-end{stroke:var(--anatomy-lit)}.iso-dots circle{fill:var(--anatomy-dot);stroke:none;opacity:.32}.iso-dots[data-tone=hi] circle{opacity:.85}.iso-dots[data-tone=mid] circle{opacity:.45}.iso-dots[data-tone=lo] circle{opacity:.22}.iso-dots[data-tone=faint] circle{opacity:.12}.iso-face-text{fill:var(--anatomy-mid);font-family:var(--anatomy-mono);letter-spacing:.04em}.iso-face-text[data-tone=hi]{fill:var(--anatomy-hi)}.iso-face-text[data-tone=lo]{fill:var(--anatomy-lo)}.iso-face-text[data-tone=faint]{fill:var(--anatomy-faint)}.tb-body{fill:var(--anatomy-shade-2);stroke:none}.tb-shine{fill:var(--anatomy-top);stroke:none}.tb-shade{fill:var(--anatomy-shade-0);stroke:none}.tb-ring{fill:none;stroke:var(--anatomy-lo);stroke-width:.45;stroke-linecap:butt;stroke-linejoin:round}.tb-ring[data-tone=mid]{stroke:var(--anatomy-mid)}.tb-ring[data-tone=faint]{stroke:var(--anatomy-faint)}.tb-ring[data-tone=hi]{stroke:var(--anatomy-hi)}@keyframes iso-flow{to{stroke-dashoffset:-32}}@keyframes iso-pulse{0%,to{opacity:.18}12%{opacity:1}40%{opacity:.18}}.iso-line[data-flow]{animation:iso-flow 1.6s linear infinite}.iso-dots circle[data-pulse]{animation:iso-pulse 1.6s steps(1,end) infinite;animation-delay:var(--pulse-at,0ms)}.iso-figure{margin:32px 0 36px}.iso-plate{position:relative;padding:52px 24px;border-radius:0;background:var(--anatomy-card);box-shadow:0 0 0 1px var(--anatomy-mid);--anatomy-paper:var(--anatomy-card)}.iso-plate-corners{position:absolute;inset:18px 20px;pointer-events:none}.iso-plate-corner{position:absolute;color:var(--anatomy-muted);font-family:var(--anatomy-mono);font-size:10.5px;line-height:1;letter-spacing:.04em;white-space:nowrap}.iso-plate-corner[data-corner=fig]{top:0;left:0;color:var(--anatomy-text)}.iso-plate-corner[data-corner=title]{top:0;right:0;text-transform:uppercase;letter-spacing:.1em}.iso-plate-corner[data-corner=hint]{bottom:0;left:0;text-transform:uppercase;letter-spacing:.1em}.iso-plate-corner[data-corner=readout]{right:0;bottom:0;color:var(--anatomy-text);font-variant-numeric:tabular-nums}.iso-plate .iso-svg{margin:0 auto}.iso-legend{display:grid;gap:8px;margin-top:12px;color:var(--anatomy-muted);font-size:13px;line-height:1.55}.iso-keys{display:flex;flex-wrap:wrap;gap:6px 18px}.iso-key{display:inline-flex;align-items:center;gap:7px}.iso-swatch{width:16px;height:10px;flex:none;overflow:visible}.iso-swatch path{fill:none;stroke:var(--anatomy-hi);stroke-width:1;vector-effect:non-scaling-stroke;stroke-linejoin:round;stroke-linecap:round}.iso-swatch[data-mark=raised] path,.iso-swatch[data-mark=flat] path{stroke:var(--anatomy-mid)}.iso-swatch[data-mark=lit] path{stroke:var(--anatomy-lit)}.iso-swatch[data-mark=dim] path{stroke:var(--anatomy-lo)}.iso-swatch[data-mark=dotted] path{stroke-dasharray:.01 3;stroke-width:1.4}.iso-swatch[data-mark=dashed] path{stroke-dasharray:3 2.5}.iso-swatch[data-mark=red] path{stroke:var(--anatomy-red)}.iso-swatch[data-mark=green] path{stroke:var(--anatomy-green)}.iso-swatch[data-mark=blue] path{stroke:var(--anatomy-blue)}.iso-swatch-crease{stroke:var(--anatomy-lo)!important}@media(max-width:560px){.iso-plate{padding:48px 12px 70px}.iso-plate-corner[data-corner=hint]{bottom:18px}}@media(prefers-reduced-motion:reduce){.iso-line[data-flow],.iso-dots circle[data-pulse]{animation:none}}.iso[data-theme=light]{--anatomy-page: var(--gray-100);--anatomy-card: #ffffff;--anatomy-paper: #ffffff;--anatomy-face: #ffffff;--anatomy-top: #ffffff;--anatomy-text: var(--gray-1100);--anatomy-strong: var(--gray-1200);--anatomy-muted: var(--gray-1000);--anatomy-hi: #26251f;--anatomy-mono: var(--font-mono), ui-monospace, \"SF Mono\", Menlo, monospace}.iso .iso-plate{position:relative;padding:52px 24px;border-top:1px solid var(--gray-400);border-bottom:1px solid var(--gray-400);border-radius:0;background:var(--anatomy-card);box-shadow:none;--anatomy-paper: var(--anatomy-card)}@media(min-width:641px){.iso .iso-plate{border:none;border-radius:12px;box-shadow:var(--shadow-small)}}@media(max-width:640px){.iso .iso-plate{margin-left:calc(var(--gutter) * -1);margin-right:calc(var(--gutter) * -1);width:calc(100% + var(--gutter) * 2)}}.iso .iso-plate-corner{font-family:var(--anatomy-mono)}.iso-stage{touch-action:pan-y}.iso-stage:focus{outline:none}.iso-stage:focus-visible{outline:none}.iso-plate:has(.iso-stage:focus-visible){box-shadow:0 0 0 1.5px var(--ink)}.iso-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}.iso[data-theme=dark]{--anatomy-mono: var(--font-mono), ui-monospace, \"SF Mono\", Menlo, monospace;color-scheme:dark}.iso .iso-plate[data-plate=dark]{border-color:var(--anatomy-card);box-shadow:0 0 0 1px #0000000f,0 2px 2px #0000000a,0 8px 24px -12px #00000040}.iso[data-theme=dark] .iso-plate:has(.iso-stage:focus-visible){box-shadow:0 0 0 1.5px var(--anatomy-muted)}.iso-stage{position:relative}.iso-stage:has(>.iso-layer){isolation:isolate}.iso-stage>.iso-layer{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}.iso-stage>canvas.iso-layer{display:block}.iso[data-theme=dark] .iso-stage>[data-blend=screen]{mix-blend-mode:screen}.iso-stage[data-gl] .iso-fallback{display:none}.iso .iso-plate{border:none;border-radius:12px;box-shadow:var(--shadow-small)}@media(max-width:640px){.iso .iso-plate{margin-left:0;margin-right:0;width:auto}}.iso-plate[data-narrow] .iso-plate-corner[data-corner=hint]{bottom:18px}.mq-svg{cursor:ew-resize;user-select:none;-webkit-user-select:none;-webkit-touch-callout:none}.mq-ball-body{fill:var(--anatomy-shade-1);stroke:none}.mq-ball-shine{fill:var(--anatomy-top);stroke:none}.mq-ball-edge{fill:none;stroke:var(--anatomy-hi);stroke-width:var(--anatomy-weight);vector-effect:non-scaling-stroke}.mq-ball[data-lit] .mq-ball-body{fill:var(--anatomy-lit-shade)}.mq-ball[data-lit] .mq-ball-shine{fill:var(--anatomy-lit-top)}.mq-ball[data-lit] .mq-ball-edge{stroke:var(--anatomy-lit);stroke-width:1.2px}@media(max-width:640px){svg.mq-svg.iso-svg{width:114%;max-width:none;margin:-3% -7% -2%}}.iso .iso-plate{border:none;border-radius:0;box-shadow:none;background:var(--anatomy-card)}.iso[data-theme=dark] .iso-plate{box-shadow:none}",
	mount: (e, t) => {
		let n = Yn(e);
		if (!n) return () => {};
		let { stage: i, svg: o, readout: s, status: c, layers: l, balls: u, pool: d, wheels: f, spout: p, hands: m, switches: h, blades: g, knob: _ } = n, { P: y } = t, [b] = t.viewBox, x = matchMedia("(prefers-reduced-motion: reduce)"), S = kn(), C = nn(t.preroll), w = t.preroll, T = x.matches, E = C.rate, D = C.consumers.map((e) => e.active ? Ie : -Ie), O = /* @__PURE__ */ new Map(), k = u.map((e, t) => t), A = /* @__PURE__ */ new Map(), j = {
			active: !1,
			phase: 0,
			time: 0,
			shown: 0
		}, M = null, N = !1, P = !1, F = !1, ee = !1, I = 0, te = 0, ne = -Infinity, re, L;
		function R(e, t, n, r) {
			A.get(t) !== r && (A.set(t, r), e.setAttribute(n, r));
		}
		function ie(e, t, n) {
			gn(n).forEach((n, r) => R(e[r], `${t}-${r}`, "d", n));
		}
		function ae() {
			let e = Vn(C, w, S, T).sort((e, t) => a(e.at, y) - a(t.at, y)), t = new Set(e.map((e) => e.id));
			for (let [e, n] of O) {
				if (t.has(e)) continue;
				O.delete(e), k.push(n);
				let r = u[n];
				R(r, `ball-${n}-display`, "display", "none"), r.parentNode !== d && d.appendChild(r);
			}
			k.sort((e, t) => e - t);
			let n = /* @__PURE__ */ new Map();
			for (let t of e) {
				let e = O.get(t.id);
				if (e === void 0) {
					if (e = k.shift(), e === void 0) continue;
					O.set(t.id, e);
				}
				let i = u[e], [a, o] = r(t.at, y);
				R(i, `ball-${e}-display`, "display", "inline"), R(i, `ball-${e}-at`, "transform", `translate(${a.toFixed(2)} ${o.toFixed(2)})`), t.lit ? R(i, `ball-${e}-lit`, "data-lit", "") : A.get(`ball-${e}-lit`) !== "off" && (A.set(`ball-${e}-lit`, "off"), i.removeAttribute("data-lit"));
				let s = n.get(t.layer) ?? [];
				s.push(i), n.set(t.layer, s);
			}
			for (let [e, t] of n) {
				let n = l.get(e);
				n && t.forEach((e, t) => {
					n.children[t] !== e && n.insertBefore(e, n.children[t] ?? null);
				});
			}
			for (let e of k) {
				let t = u[e];
				R(t, `ball-${e}-display`, "display", "none");
			}
		}
		function oe(e) {
			ae(), f.forEach((e, t) => {
				let n = yn(C, t, w, T).toFixed(4);
				A.get(`wheel-${t}`) !== n && (A.set(`wheel-${t}`, n), ie(e, `wheel-${t}`, bn(C, t, w, y, T)));
			});
			let t = xn(C, w, T).toFixed(4);
			if (A.get("spout") !== t) {
				A.set("spout", t);
				let e = Sn(Number(t), y);
				ie(p[0], "spout-bed", e.bed), ie(p[1], "spout-front", e.front);
			}
			let n = On(C, w, T);
			R(g.s, "blade-s", "transform", v(y, [
				0,
				0,
				n.s
			])), R(g.h, "blade-h", "transform", v(y, [
				0,
				0,
				n.h
			])), m.forEach((e, t) => R(e, `hand-${t}`, "d", Cn(t, wn(C, t, w), y))), h.forEach((e, t) => R(e, `switch-${t}`, "transform", v(y, [
				0,
				0,
				D[t]
			]))), R(_, "knob", "d", En(E, y));
			let r = en(C);
			s.textContent !== r && (s.textContent = r), (T || e - ne >= Hn) && se(e);
		}
		function se(e) {
			ne = e, R(i, "aria-valuenow", "aria-valuenow", K(C.rate)), R(i, "aria-valuetext", "aria-valuetext", tn(C));
		}
		function z(e) {
			E = T ? C.rate : qn(E, C.rate, e, Wn), Math.abs(E - C.rate) < .001 && (E = C.rate), C.consumers.forEach((t, n) => {
				let r = t.active ? Ie : -Ie, i = D[n];
				D[n] = T || Math.abs(i - r) < .01 ? r : qn(i, r, e, Gn);
			});
		}
		function ce(e) {
			j.phase = e, j.time = 0, j.shown = 0, Wt(C, e ? t.tour.high : t.tour.low);
		}
		function le(e) {
			j.active && (j.time += e, (j.phase ? Zt(C) : C.queue.length <= 1 && Jt(C) > 0) && (j.shown += e), (j.shown >= t.tour.hold[j.phase] || j.time >= t.tour.longest[j.phase]) && ce(1 - j.phase));
		}
		function ue(e, t) {
			le(e), w += e, Ut(C, w), z(e), oe(t);
		}
		function de(e) {
			let t = te ? Math.min((e - te) / 1e3, .03333333333333333) : .016666666666666666;
			te = e, I = 0, ue(t, e), F && !T && (I = requestAnimationFrame(de));
		}
		function fe() {
			w += t.settle, Ut(C, w), z(0), oe(performance.now());
		}
		function B() {
			!F || T || I || (te = 0, I = requestAnimationFrame(de));
		}
		function pe() {
			cancelAnimationFrame(I), I = 0;
		}
		function me() {
			T || j.active || (j.active = !0, ce(0), B());
		}
		function he() {
			clearTimeout(re), re = void 0, clearTimeout(L), L = void 0, j.active = !1;
		}
		function V() {
			clearTimeout(L), L = void 0, !(T || j.active) && (L = setTimeout(() => {
				L = void 0, !(N || P || M) && me();
			}, t.tour.resume * 1e3));
		}
		function H(e) {
			Wt(C, Jn(e)) && (T ? fe() : B());
		}
		function U(e) {
			let t = C.consumers[e];
			if (!t) return;
			Gt(C, e, !t.active), Ut(C, w);
			let n = Kt(C), r = e === 0 ? "left" : e === ot - 1 ? "right" : "middle";
			c.textContent = `Consumer ${e + 1}, the ${r} drum, ${t.active ? "on" : "off"}. ${n} of ${ot} on, up to ${K(Yt(C))} a second.`, T ? fe() : B();
		}
		function ge(e) {
			let t = o.getBoundingClientRect(), n = b / t.width;
			return {
				x: (e.clientX - t.left) * n,
				y: (e.clientY - t.top) * n,
				share: (e.clientX - t.left) / t.width
			};
		}
		function _e(e) {
			let { x: n, y: r } = ge(e), i = -1, a = t.drumHit;
			return t.drums.forEach(([e, t], o) => {
				let s = Math.hypot(n - e, (r - t) * 1.6);
				s < a && (a = s, i = o);
			}), i;
		}
		let ve = (e) => ct + Kn((ge(e).share - .12) / .76, 0, 1) * (lt - ct);
		function ye(e) {
			e.pointerType === "mouse" && (N = !0, he());
		}
		function be(e) {
			e.pointerType === "mouse" && (N = !1, M || V());
		}
		function xe(e) {
			if (M || e.pointerType === "mouse" && e.button !== 0) return;
			he();
			let t = _e(e), n = e.pointerType !== "mouse";
			M = {
				id: e.pointerId,
				x0: e.clientX,
				y0: e.clientY,
				drum: t,
				dragging: t < 0 && !n,
				touch: n
			};
			try {
				i.setPointerCapture(e.pointerId);
			} catch {}
			M.dragging && H(ve(e));
		}
		function Se(e) {
			if (!M || e.pointerId !== M.id) return;
			let t = e.clientX - M.x0, n = e.clientY - M.y0;
			!M.dragging && Math.abs(t) > Un && Math.abs(t) > Math.abs(n) && (M.dragging = !0), M.dragging && H(ve(e));
		}
		function Ce(e) {
			if (!M || e.pointerId !== M.id) return;
			let t = M;
			if (M = null, i.hasPointerCapture(e.pointerId) && i.releasePointerCapture(e.pointerId), e.type === "pointerup" && !t.dragging) {
				let n = Math.hypot(e.clientX - t.x0, e.clientY - t.y0);
				t.drum >= 0 && n < Un * 2 && U(t.drum);
			}
			N || V();
		}
		function we(e) {
			if (e.metaKey || e.ctrlKey || e.altKey) return;
			let t = e.key, n = e.shiftKey ? .5 : ut;
			if (t === "ArrowRight" || t === "ArrowUp") H(C.rate + n);
			else if (t === "ArrowLeft" || t === "ArrowDown") H(C.rate - n);
			else if (t === "Home") H(ct);
			else if (t === "End") H(lt);
			else if (t === "1" || t === "2" || t === "3") U(Number(t) - 1);
			else return;
			e.preventDefault(), he(), se(performance.now());
		}
		function Te() {
			P || V();
		}
		function Ee() {
			i.matches(":focus-visible") && (P = !0, he());
		}
		function De() {
			P = !1, V();
		}
		function Oe() {
			if (T = x.matches, pe(), T) {
				he(), z(0), oe(performance.now()), se(performance.now());
				return;
			}
			ee && V(), B();
		}
		let ke = new IntersectionObserver(([e]) => {
			if (F = !!e?.isIntersecting, !F) {
				pe();
				return;
			}
			ee || (ee = !0, T || (re = setTimeout(() => {
				re = void 0, !N && !P && !M && me();
			}, t.tour.delay * 1e3))), B();
		}, { rootMargin: "120px 0px" }), Ae = [
			["pointerenter", ye],
			["pointerleave", be],
			["pointerdown", xe],
			["pointermove", Se],
			["pointerup", Ce],
			["pointercancel", Ce],
			["lostpointercapture", Ce],
			["keydown", we],
			["keyup", Te],
			["focus", Ee],
			["blur", De]
		];
		c.textContent = "", oe(0), T && se(0);
		for (let [e, t] of Ae) i.addEventListener(e, t);
		return x.addEventListener("change", Oe), ke.observe(i), () => {
			pe(), F = !1, clearTimeout(re), clearTimeout(L), ke.disconnect();
			for (let [e, t] of Ae) i.removeEventListener(e, t);
			x.removeEventListener("change", Oe), M && i.hasPointerCapture(M.id) && i.releasePointerCapture(M.id), M = null;
		};
	}
}), Zn = "anatomy-message-queue", Qn = "600 / 400";
function $n(e, t = {}) {
	let n = T(t.theme, t.tokens);
	return Xn.render(e, {
		fig: t.fig,
		theme: n.base,
		tokens: n.tokens
	});
}
function er(e = Zn) {
	if (typeof customElements > "u" || customElements.get(e)) return;
	class t extends HTMLElement {
		static observedAttributes = ["fig", "theme"];
		#e = null;
		connectedCallback() {
			this.#t();
		}
		disconnectedCallback() {
			queueMicrotask(() => {
				this.isConnected || (this.#e?.(), this.#e = null);
			});
		}
		attributeChangedCallback() {
			this.#e && this.#t();
		}
		#t() {
			this.#e = $n(this, {
				fig: this.getAttribute("fig") ?? void 0,
				theme: this.getAttribute("theme") ?? void 0
			});
		}
	}
	customElements.define(e, t);
}
//#endregion
//#region portfolio/flow-source.js
er();
var X = [
	[
		"HR records the departure",
		"The HR operator requests termination for employee E-1005. The next view shows the employee change and outbox event committed atomically in Elytra. There is no Graph call inside this transaction.",
		"Before commit: E-1005 active · next sequence: 129"
	],
	[
		"The outbox keeps the event",
		"Elytra allocates a monotonically increasing sequence and appends employee.terminated with the employee snapshot and occurredAt. Reading the feed does not delete this row. Ascendra can be temporarily unavailable without losing this committed event.",
		"Illustrative event: sequence 129 · employee.terminated · E-1005"
	],
	[
		"Ascendra pulls over HTTP",
		"A one-minute cron reads Ascendra’s saved cursor, then calls Elytra’s public HTTP API with a Bearer integration secret. A cursor of 128 requests later events. The secret authenticates the API request; it does not grant direct access to Elytra’s database.",
		"GET /api/events?since=128&limit=200"
	],
	[
		"Ingest commits its own state",
		"Ascendra normalizes the response and applies valid events in its own Convex mutation. Identity changes, audit rows, cursor progress and scheduled work are committed together. Malformed events are quarantined; an available sequence allows progress past them.",
		"Ascendra DB: identity updated · cursor → 129 · downstream work scheduled"
	],
	[
		"Provisioning runs separately",
		"The scheduled action disables the Entra account through Graph, then calls revokeSignInSessions. Both must succeed before the Access revoked lifecycle step completes. External calls are outside the database transaction. Cursor progress alone proves neither call succeeded.",
		"Two Graph operations: disable account → revoke sign-in sessions"
	],
	[
		"Results and safety nets",
		"Successful disable and session-revocation results are logged separately. Already-issued access tokens may remain valid; this is not an immediate logout guarantee for every app. Account reconciliation runs every 15 minutes; HR snapshot reconciliation every six hours. Neither writes into HR.",
		"Account disabled · session revocation succeeded · results recorded"
	]
], Z = 0, tr = [...document.querySelectorAll("[data-step]")], nr = document.getElementById("machine-packet"), rr = Array.from({ length: 5 }, (e, t) => document.getElementById(`machine-route-${t}`)), ir = document.getElementById("play-flow"), ar = document.getElementById("flow-speed"), Q = document.getElementById("flow-scenario"), or = document.getElementById("recover-flow"), sr = window.matchMedia("(prefers-reduced-motion: reduce)"), cr = !1, lr = 0, ur = null, dr = null;
function fr() {
	return Q.value === "poll-error" && Z === 2 || ["graph-error", "sessions-error"].includes(Q.value) && Z === 4;
}
function pr() {
	let e = 4500 / Number(ar.value), t = sr.matches || fr() ? 0 : Math.max(0, Math.min(1, (lr / e - .65) / .35)), n = rr[Math.min(Z, 4)], r = n.getPointAtLength(n.getTotalLength() * (Z === 5 ? 1 : t));
	nr.setAttribute("transform", `translate(${r.x} ${r.y})`);
}
function $(e) {
	cr = e, document.documentElement.classList.toggle("simulation-playing", e), ir.setAttribute("aria-pressed", String(e)), ir.textContent = e ? "Ⅱ Pause flow" : Z === 5 ? "↻ Replay flow" : "▶ Play flow", document.getElementById("playback-status").textContent = fr() ? "Blocked · recover the integration to continue" : e ? "Playing · illustrative timing" : "Paused · illustrative timing", ur = null, dr !== null && cancelAnimationFrame(dr), dr = e ? requestAnimationFrame(mr) : null;
}
function mr(e) {
	if (cr) {
		if (ur !== null && (lr += Math.min(e - ur, 100)), ur = e, lr >= 4500 / Number(ar.value)) {
			if (fr()) {
				$(!1);
				return;
			}
			if (Z === X.length - 1) {
				$(!1);
				return;
			}
			hr(Z + 1);
		}
		pr(), dr = requestAnimationFrame(mr);
	}
}
function hr(e) {
	if (Q.value === "poll-error" && (e = Math.min(e, 2)), ["graph-error", "sessions-error"].includes(Q.value) && (e = Math.min(e, 4)), Z = e, lr = 0, tr.forEach((t, n) => t.setAttribute("aria-pressed", String(n === e))), document.querySelectorAll("[data-machine-stage]").forEach((t) => t.classList.toggle("machine-active", t.dataset.machineStage.split(" ").includes(String(e)))), document.getElementById("machine-hr-state").textContent = e >= 1 ? "employment: terminated" : "employment: active", document.getElementById("machine-outbox").textContent = e >= 1 ? "127 · 128 · 129 (retained)" : "127 · 128", document.getElementById("machine-iga-state").textContent = e >= 3 ? "identity: deprovisioned" : "identity: active", document.getElementById("machine-cursor").textContent = e >= 3 ? "lastSequence: 129" : "lastSequence: 128", document.getElementById("machine-sync-state").textContent = `Graph sync: ${e === 5 ? "success" : e === 4 ? "sending" : e >= 3 ? "scheduled" : "waiting"}`, document.getElementById("machine-entra-state").textContent = e === 5 || Q.value === "sessions-error" && e === 4 ? "account: disabled" : "account: enabled", document.getElementById("machine-sessions-state").textContent = e === 5 ? "sessions: revoked" : "sessions: not revoked", document.querySelectorAll("[data-stage]").forEach((t) => t.classList.toggle("active", t.dataset.stage.split(" ").includes(String(e)))), document.getElementById("step-title").textContent = `${e + 1}. ${X[e][0]}`, document.getElementById("step-description").textContent = X[e][1], document.getElementById("step-example").textContent = X[e][2], document.getElementById("previous").disabled = e === 0, document.getElementById("next").disabled = e === X.length - 1, document.getElementById("flow-caption").textContent = `${e + 1} / 6 · ${X[e][0]}`, document.getElementById("flow-summary").textContent = X[e][2], or.hidden = !fr(), or.textContent = Q.value === "poll-error" ? "Restore HR connection" : "Retry offboarding step", fr()) {
		let e = Q.value === "poll-error";
		document.getElementById("flow-caption").textContent = e ? "HTTP poll failed · event remains in HR" : "Graph write failed · Entra account is still enabled", document.getElementById("flow-summary").textContent = e ? "HR outbox: 129 retained · IGA cursor: 128 · identity and Entra unchanged" : "IGA cursor: 129 · identity: deprovisioned · Entra: enabled · sync: error", document.getElementById("machine-sync-state").textContent = e ? "HR poll: connection failed" : "Graph sync: error", document.getElementById("step-description").textContent = e ? "The HR mutation has committed, but the HTTP poll failed. Event 129 remains in Elytra’s outbox. Ascendra has not applied it and its cursor is still 128. Restore the connection to consume the retained event." : "Ascendra committed event 129 and advanced its cursor, but Graph failed. The identity is deprovisioned locally while the real target account is still enabled. Retry the scheduled effect and verify the target response.", document.getElementById("step-example").textContent = document.getElementById("flow-summary").textContent, e || (document.getElementById("step-description").textContent += " The regression fix preserves deprovisioned as the access decision; failure is recorded in sync/audit events and the lifecycle step. Retry is operator-triggered, not an automatic Graph backoff loop."), Q.value === "sessions-error" && (document.getElementById("flow-caption").textContent = "Session revocation failed · account disabled, offboarding incomplete", document.getElementById("flow-summary").textContent = "Cursor: 129 · identity: deprovisioned · account: disabled · sessions: not revoked", document.getElementById("machine-sync-state").textContent = "Session revocation: error", document.getElementById("step-description").textContent = "The disable call succeeded, but revokeSignInSessions failed. The Access revoked lifecycle step remains failed. Revocation intent is retained; an operator retries the offboarding step, which runs disable and session revocation again. Existing application tokens are not guaranteed to stop immediately.", document.getElementById("step-example").textContent = document.getElementById("flow-summary").textContent);
	}
	pr();
}
function gr(e) {
	hr(e), $(!1);
}
tr.forEach((e, t) => e.addEventListener("click", () => gr(t))), document.getElementById("previous").addEventListener("click", () => gr(Z - 1)), document.getElementById("next").addEventListener("click", () => gr(Z + 1)), ir.addEventListener("click", () => {
	fr() || (!cr && Z === X.length - 1 && hr(0), $(!cr));
}), ar.addEventListener("change", () => {
	lr = 0, pr();
}), Q.addEventListener("change", () => gr(0)), or.addEventListener("click", () => {
	Q.value = "normal", hr(Z), $(!0);
});
var _r = document.getElementById("hr-computer"), vr = () => {
	hr(0), $(!0);
};
if (_r.addEventListener("click", vr), _r.addEventListener("keydown", (e) => {
	(e.key === "Enter" || e.key === " ") && (e.preventDefault(), vr());
}), document.addEventListener("visibilitychange", () => {
	document.hidden && $(!1);
}), sr.addEventListener("change", () => {
	$(!1), pr();
}), hr(0), window.parent !== window) {
	let e = () => window.parent.postMessage({
		type: "iam-anatomy-height",
		height: document.documentElement.scrollHeight
	}, "*");
	new ResizeObserver(e).observe(document.body), window.addEventListener("load", e), e();
}
//#endregion
