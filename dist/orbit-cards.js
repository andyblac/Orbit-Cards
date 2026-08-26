//#region src/version.js
var e = "1.1.0", t = {
	area: "1.0.0",
	status: "1.0.0",
	action: "1.0.0",
	deck: "1.0.0",
	statusBadge: "0.5.0"
}, n = "color: #ffffff; font-weight: 700; background: #6a6a6a; padding: 2px 8px; border-radius: 999px 0 0 999px;", r = "color: #ffffff; font-weight: 700; background: #d88989; padding: 2px 8px; border-radius: 0 999px 999px 0;";
function i(e, t) {
	console.info(`%c ${e} %c v${t} `, n, r);
}
//#endregion
//#region node_modules/@lit/reactive-element/css-tag.js
var a = globalThis, o = a.ShadowRoot && (a.ShadyCSS === void 0 || a.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, s = Symbol(), c = /* @__PURE__ */ new WeakMap(), l = class {
	constructor(e, t, n) {
		if (this._$cssResult$ = !0, n !== s) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
		this.cssText = e, this.t = t;
	}
	get styleSheet() {
		let e = this.o, t = this.t;
		if (o && e === void 0) {
			let n = t !== void 0 && t.length === 1;
			n && (e = c.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), n && c.set(t, e));
		}
		return e;
	}
	toString() {
		return this.cssText;
	}
}, u = (e) => new l(typeof e == "string" ? e : e + "", void 0, s), d = (e, ...t) => new l(e.length === 1 ? e[0] : t.reduce((t, n, r) => t + ((e) => {
	if (!0 === e._$cssResult$) return e.cssText;
	if (typeof e == "number") return e;
	throw Error("Value passed to 'css' function must be a 'css' function result: " + e + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
})(n) + e[r + 1], e[0]), e, s), f = (e, t) => {
	if (o) e.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
	else for (let n of t) {
		let t = document.createElement("style"), r = a.litNonce;
		r !== void 0 && t.setAttribute("nonce", r), t.textContent = n.cssText, e.appendChild(t);
	}
}, p = o ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((e) => {
	let t = "";
	for (let n of e.cssRules) t += n.cssText;
	return u(t);
})(e) : e, { is: m, defineProperty: h, getOwnPropertyDescriptor: g, getOwnPropertyNames: _, getOwnPropertySymbols: v, getPrototypeOf: ee } = Object, y = globalThis, b = y.trustedTypes, x = b ? b.emptyScript : "", te = y.reactiveElementPolyfillSupport, S = (e, t) => e, ne = {
	toAttribute(e, t) {
		switch (t) {
			case Boolean:
				e = e ? x : null;
				break;
			case Object:
			case Array: e = e == null ? e : JSON.stringify(e);
		}
		return e;
	},
	fromAttribute(e, t) {
		let n = e;
		switch (t) {
			case Boolean:
				n = e !== null;
				break;
			case Number:
				n = e === null ? null : Number(e);
				break;
			case Object:
			case Array: try {
				n = JSON.parse(e);
			} catch {
				n = null;
			}
		}
		return n;
	}
}, re = (e, t) => !m(e, t), ie = {
	attribute: !0,
	type: String,
	converter: ne,
	reflect: !1,
	useDefault: !1,
	hasChanged: re
};
Symbol.metadata ??= Symbol("metadata"), y.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
var C = class extends HTMLElement {
	static addInitializer(e) {
		this._$Ei(), (this.l ??= []).push(e);
	}
	static get observedAttributes() {
		return this.finalize(), this._$Eh && [...this._$Eh.keys()];
	}
	static createProperty(e, t = ie) {
		if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
			let n = Symbol(), r = this.getPropertyDescriptor(e, n, t);
			r !== void 0 && h(this.prototype, e, r);
		}
	}
	static getPropertyDescriptor(e, t, n) {
		let { get: r, set: i } = g(this.prototype, e) ?? {
			get() {
				return this[t];
			},
			set(e) {
				this[t] = e;
			}
		};
		return {
			get: r,
			set(t) {
				let a = r?.call(this);
				i?.call(this, t), this.requestUpdate(e, a, n);
			},
			configurable: !0,
			enumerable: !0
		};
	}
	static getPropertyOptions(e) {
		return this.elementProperties.get(e) ?? ie;
	}
	static _$Ei() {
		if (this.hasOwnProperty(S("elementProperties"))) return;
		let e = ee(this);
		e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
	}
	static finalize() {
		if (this.hasOwnProperty(S("finalized"))) return;
		if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(S("properties"))) {
			let e = this.properties, t = [..._(e), ...v(e)];
			for (let n of t) this.createProperty(n, e[n]);
		}
		let e = this[Symbol.metadata];
		if (e !== null) {
			let t = litPropertyMetadata.get(e);
			if (t !== void 0) for (let [e, n] of t) this.elementProperties.set(e, n);
		}
		this._$Eh = /* @__PURE__ */ new Map();
		for (let [e, t] of this.elementProperties) {
			let n = this._$Eu(e, t);
			n !== void 0 && this._$Eh.set(n, e);
		}
		this.elementStyles = this.finalizeStyles(this.styles);
	}
	static finalizeStyles(e) {
		let t = [];
		if (Array.isArray(e)) {
			let n = new Set(e.flat(Infinity).reverse());
			for (let e of n) t.unshift(p(e));
		} else e !== void 0 && t.push(p(e));
		return t;
	}
	static _$Eu(e, t) {
		let n = t.attribute;
		return !1 === n ? void 0 : typeof n == "string" ? n : typeof e == "string" ? e.toLowerCase() : void 0;
	}
	constructor() {
		super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
	}
	_$Ev() {
		this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((e) => e(this));
	}
	addController(e) {
		(this._$EO ??= /* @__PURE__ */ new Set()).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
	}
	removeController(e) {
		this._$EO?.delete(e);
	}
	_$E_() {
		let e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
		for (let n of t.keys()) this.hasOwnProperty(n) && (e.set(n, this[n]), delete this[n]);
		e.size > 0 && (this._$Ep = e);
	}
	createRenderRoot() {
		let e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
		return f(e, this.constructor.elementStyles), e;
	}
	connectedCallback() {
		this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
	}
	enableUpdating(e) {}
	disconnectedCallback() {
		this._$EO?.forEach((e) => e.hostDisconnected?.());
	}
	attributeChangedCallback(e, t, n) {
		this._$AK(e, n);
	}
	_$ET(e, t) {
		let n = this.constructor.elementProperties.get(e), r = this.constructor._$Eu(e, n);
		if (r !== void 0 && !0 === n.reflect) {
			let i = (n.converter?.toAttribute === void 0 ? ne : n.converter).toAttribute(t, n.type);
			this._$Em = e, i == null ? this.removeAttribute(r) : this.setAttribute(r, i), this._$Em = null;
		}
	}
	_$AK(e, t) {
		let n = this.constructor, r = n._$Eh.get(e);
		if (r !== void 0 && this._$Em !== r) {
			let e = n.getPropertyOptions(r), i = typeof e.converter == "function" ? { fromAttribute: e.converter } : e.converter?.fromAttribute === void 0 ? ne : e.converter;
			this._$Em = r;
			let a = i.fromAttribute(t, e.type);
			this[r] = a ?? this._$Ej?.get(r) ?? a, this._$Em = null;
		}
	}
	requestUpdate(e, t, n, r = !1, i) {
		if (e !== void 0) {
			let a = this.constructor;
			if (!1 === r && (i = this[e]), n ??= a.getPropertyOptions(e), !((n.hasChanged ?? re)(i, t) || n.useDefault && n.reflect && i === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, n)))) return;
			this.C(e, t, n);
		}
		!1 === this.isUpdatePending && (this._$ES = this._$EP());
	}
	C(e, t, { useDefault: n, reflect: r, wrapped: i }, a) {
		n && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, a ?? t ?? this[e]), !0 !== i || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || n || (t = void 0), this._$AL.set(e, t)), !0 === r && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
	}
	async _$EP() {
		this.isUpdatePending = !0;
		try {
			await this._$ES;
		} catch (e) {
			Promise.reject(e);
		}
		let e = this.scheduleUpdate();
		return e != null && await e, !this.isUpdatePending;
	}
	scheduleUpdate() {
		return this.performUpdate();
	}
	performUpdate() {
		if (!this.isUpdatePending) return;
		if (!this.hasUpdated) {
			if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
				for (let [e, t] of this._$Ep) this[e] = t;
				this._$Ep = void 0;
			}
			let e = this.constructor.elementProperties;
			if (e.size > 0) for (let [t, n] of e) {
				let { wrapped: e } = n, r = this[t];
				!0 !== e || this._$AL.has(t) || r === void 0 || this.C(t, void 0, n, r);
			}
		}
		let e = !1, t = this._$AL;
		try {
			e = this.shouldUpdate(t), e ? (this.willUpdate(t), this._$EO?.forEach((e) => e.hostUpdate?.()), this.update(t)) : this._$EM();
		} catch (t) {
			throw e = !1, this._$EM(), t;
		}
		e && this._$AE(t);
	}
	willUpdate(e) {}
	_$AE(e) {
		this._$EO?.forEach((e) => e.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
	}
	_$EM() {
		this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
	}
	get updateComplete() {
		return this.getUpdateComplete();
	}
	getUpdateComplete() {
		return this._$ES;
	}
	shouldUpdate(e) {
		return !0;
	}
	update(e) {
		this._$Eq &&= this._$Eq.forEach((e) => this._$ET(e, this[e])), this._$EM();
	}
	updated(e) {}
	firstUpdated(e) {}
};
C.elementStyles = [], C.shadowRootOptions = { mode: "open" }, C[S("elementProperties")] = /* @__PURE__ */ new Map(), C[S("finalized")] = /* @__PURE__ */ new Map(), te?.({ ReactiveElement: C }), (y.reactiveElementVersions ??= []).push("2.1.2");
//#endregion
//#region node_modules/lit-html/lit-html.js
var w = globalThis, ae = (e) => e, oe = w.trustedTypes, se = oe ? oe.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, ce = "$lit$", T = `lit$${Math.random().toFixed(9).slice(2)}$`, le = "?" + T, ue = `<${le}>`, de = document, fe = () => de.createComment(""), pe = (e) => e === null || typeof e != "object" && typeof e != "function", me = Array.isArray, he = (e) => me(e) || typeof e?.[Symbol.iterator] == "function", ge = "[ 	\n\f\r]", _e = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ve = /-->/g, ye = />/g, be = RegExp(`>|${ge}(?:([^\\s"'>=/]+)(${ge}*=${ge}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), xe = /'/g, Se = /"/g, Ce = /^(?:script|style|textarea|title)$/i, E = ((e) => (t, ...n) => ({
	_$litType$: e,
	strings: t,
	values: n
}))(1), D = Symbol.for("lit-noChange"), O = Symbol.for("lit-nothing"), we = /* @__PURE__ */ new WeakMap(), k = de.createTreeWalker(de, 129);
function Te(e, t) {
	if (!me(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
	return se === void 0 ? t : se.createHTML(t);
}
var Ee = (e, t) => {
	let n = e.length - 1, r = [], i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = _e;
	for (let t = 0; t < n; t++) {
		let n = e[t], s, c, l = -1, u = 0;
		for (; u < n.length && (o.lastIndex = u, c = o.exec(n), c !== null);) u = o.lastIndex, o === _e ? c[1] === "!--" ? o = ve : c[1] === void 0 ? c[2] === void 0 ? c[3] !== void 0 && (o = be) : (Ce.test(c[2]) && (i = RegExp("</" + c[2], "g")), o = be) : o = ye : o === be ? c[0] === ">" ? (o = i ?? _e, l = -1) : c[1] === void 0 ? l = -2 : (l = o.lastIndex - c[2].length, s = c[1], o = c[3] === void 0 ? be : c[3] === "\"" ? Se : xe) : o === Se || o === xe ? o = be : o === ve || o === ye ? o = _e : (o = be, i = void 0);
		let d = o === be && e[t + 1].startsWith("/>") ? " " : "";
		a += o === _e ? n + ue : l >= 0 ? (r.push(s), n.slice(0, l) + ce + n.slice(l) + T + d) : n + T + (l === -2 ? t : d);
	}
	return [Te(e, a + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
}, De = class e {
	constructor({ strings: t, _$litType$: n }, r) {
		let i;
		this.parts = [];
		let a = 0, o = 0, s = t.length - 1, c = this.parts, [l, u] = Ee(t, n);
		if (this.el = e.createElement(l, r), k.currentNode = this.el.content, n === 2 || n === 3) {
			let e = this.el.content.firstChild;
			e.replaceWith(...e.childNodes);
		}
		for (; (i = k.nextNode()) !== null && c.length < s;) {
			if (i.nodeType === 1) {
				if (i.hasAttributes()) for (let e of i.getAttributeNames()) if (e.endsWith(ce)) {
					let t = u[o++], n = i.getAttribute(e).split(T), r = /([.?@])?(.*)/.exec(t);
					c.push({
						type: 1,
						index: a,
						name: r[2],
						strings: n,
						ctor: r[1] === "." ? je : r[1] === "?" ? Me : r[1] === "@" ? Ne : Ae
					}), i.removeAttribute(e);
				} else e.startsWith(T) && (c.push({
					type: 6,
					index: a
				}), i.removeAttribute(e));
				if (Ce.test(i.tagName)) {
					let e = i.textContent.split(T), t = e.length - 1;
					if (t > 0) {
						i.textContent = oe ? oe.emptyScript : "";
						for (let n = 0; n < t; n++) i.append(e[n], fe()), k.nextNode(), c.push({
							type: 2,
							index: ++a
						});
						i.append(e[t], fe());
					}
				}
			} else if (i.nodeType === 8) if (i.data === le) c.push({
				type: 2,
				index: a
			});
			else {
				let e = -1;
				for (; (e = i.data.indexOf(T, e + 1)) !== -1;) c.push({
					type: 7,
					index: a
				}), e += T.length - 1;
			}
			a++;
		}
	}
	static createElement(e, t) {
		let n = de.createElement("template");
		return n.innerHTML = e, n;
	}
};
function A(e, t, n = e, r) {
	if (t === D) return t;
	let i = r === void 0 ? n._$Cl : n._$Co?.[r], a = pe(t) ? void 0 : t._$litDirective$;
	return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(e), i._$AT(e, n, r)), r === void 0 ? n._$Cl = i : (n._$Co ??= [])[r] = i), i !== void 0 && (t = A(e, i._$AS(e, t.values), i, r)), t;
}
var Oe = class {
	constructor(e, t) {
		this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
	}
	get parentNode() {
		return this._$AM.parentNode;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	u(e) {
		let { el: { content: t }, parts: n } = this._$AD, r = (e?.creationScope ?? de).importNode(t, !0);
		k.currentNode = r;
		let i = k.nextNode(), a = 0, o = 0, s = n[0];
		for (; s !== void 0;) {
			if (a === s.index) {
				let t;
				s.type === 2 ? t = new ke(i, i.nextSibling, this, e) : s.type === 1 ? t = new s.ctor(i, s.name, s.strings, this, e) : s.type === 6 && (t = new Pe(i, this, e)), this._$AV.push(t), s = n[++o];
			}
			a !== s?.index && (i = k.nextNode(), a++);
		}
		return k.currentNode = de, r;
	}
	p(e) {
		let t = 0;
		for (let n of this._$AV) n !== void 0 && (n.strings === void 0 ? n._$AI(e[t]) : (n._$AI(e, n, t), t += n.strings.length - 2)), t++;
	}
}, ke = class e {
	get _$AU() {
		return this._$AM?._$AU ?? this._$Cv;
	}
	constructor(e, t, n, r) {
		this.type = 2, this._$AH = O, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = n, this.options = r, this._$Cv = r?.isConnected ?? !0;
	}
	get parentNode() {
		let e = this._$AA.parentNode, t = this._$AM;
		return t !== void 0 && e?.nodeType === 11 && (e = t.parentNode), e;
	}
	get startNode() {
		return this._$AA;
	}
	get endNode() {
		return this._$AB;
	}
	_$AI(e, t = this) {
		e = A(this, e, t), pe(e) ? e === O || e == null || e === "" ? (this._$AH !== O && this._$AR(), this._$AH = O) : e !== this._$AH && e !== D && this._(e) : e._$litType$ === void 0 ? e.nodeType === void 0 ? he(e) ? this.k(e) : this._(e) : this.T(e) : this.$(e);
	}
	O(e) {
		return this._$AA.parentNode.insertBefore(e, this._$AB);
	}
	T(e) {
		this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
	}
	_(e) {
		this._$AH !== O && pe(this._$AH) ? this._$AA.nextSibling.data = e : this.T(de.createTextNode(e)), this._$AH = e;
	}
	$(e) {
		let { values: t, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = De.createElement(Te(n.h, n.h[0]), this.options)), n);
		if (this._$AH?._$AD === r) this._$AH.p(t);
		else {
			let e = new Oe(r, this), n = e.u(this.options);
			e.p(t), this.T(n), this._$AH = e;
		}
	}
	_$AC(e) {
		let t = we.get(e.strings);
		return t === void 0 && we.set(e.strings, t = new De(e)), t;
	}
	k(t) {
		me(this._$AH) || (this._$AH = [], this._$AR());
		let n = this._$AH, r, i = 0;
		for (let a of t) i === n.length ? n.push(r = new e(this.O(fe()), this.O(fe()), this, this.options)) : r = n[i], r._$AI(a), i++;
		i < n.length && (this._$AR(r && r._$AB.nextSibling, i), n.length = i);
	}
	_$AR(e = this._$AA.nextSibling, t) {
		for (this._$AP?.(!1, !0, t); e !== this._$AB;) {
			let t = ae(e).nextSibling;
			ae(e).remove(), e = t;
		}
	}
	setConnected(e) {
		this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
	}
}, Ae = class {
	get tagName() {
		return this.element.tagName;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	constructor(e, t, n, r, i) {
		this.type = 1, this._$AH = O, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = i, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(/* @__PURE__ */ new String()), this.strings = n) : this._$AH = O;
	}
	_$AI(e, t = this, n, r) {
		let i = this.strings, a = !1;
		if (i === void 0) e = A(this, e, t, 0), a = !pe(e) || e !== this._$AH && e !== D, a && (this._$AH = e);
		else {
			let r = e, o, s;
			for (e = i[0], o = 0; o < i.length - 1; o++) s = A(this, r[n + o], t, o), s === D && (s = this._$AH[o]), a ||= !pe(s) || s !== this._$AH[o], s === O ? e = O : e !== O && (e += (s ?? "") + i[o + 1]), this._$AH[o] = s;
		}
		a && !r && this.j(e);
	}
	j(e) {
		e === O ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
	}
}, je = class extends Ae {
	constructor() {
		super(...arguments), this.type = 3;
	}
	j(e) {
		this.element[this.name] = e === O ? void 0 : e;
	}
}, Me = class extends Ae {
	constructor() {
		super(...arguments), this.type = 4;
	}
	j(e) {
		this.element.toggleAttribute(this.name, !!e && e !== O);
	}
}, Ne = class extends Ae {
	constructor(e, t, n, r, i) {
		super(e, t, n, r, i), this.type = 5;
	}
	_$AI(e, t = this) {
		if ((e = A(this, e, t, 0) ?? O) === D) return;
		let n = this._$AH, r = e === O && n !== O || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, i = e !== O && (n === O || r);
		r && this.element.removeEventListener(this.name, this, n), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
	}
	handleEvent(e) {
		typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
	}
}, Pe = class {
	constructor(e, t, n) {
		this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = n;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AI(e) {
		A(this, e);
	}
}, Fe = {
	M: ce,
	P: T,
	A: le,
	C: 1,
	L: Ee,
	R: Oe,
	D: he,
	V: A,
	I: ke,
	H: Ae,
	N: Me,
	U: Ne,
	B: je,
	F: Pe
}, Ie = w.litHtmlPolyfillSupport;
Ie?.(De, ke), (w.litHtmlVersions ??= []).push("3.3.3");
var Le = (e, t, n) => {
	let r = n?.renderBefore ?? t, i = r._$litPart$;
	if (i === void 0) {
		let e = n?.renderBefore ?? null;
		r._$litPart$ = i = new ke(t.insertBefore(fe(), e), e, void 0, n ?? {});
	}
	return i._$AI(e), i;
}, Re = globalThis, j = class extends C {
	constructor() {
		super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
	}
	createRenderRoot() {
		let e = super.createRenderRoot();
		return this.renderOptions.renderBefore ??= e.firstChild, e;
	}
	update(e) {
		let t = this.render();
		this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Le(t, this.renderRoot, this.renderOptions);
	}
	connectedCallback() {
		super.connectedCallback(), this._$Do?.setConnected(!0);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this._$Do?.setConnected(!1);
	}
	render() {
		return D;
	}
};
j._$litElement$ = !0, j.finalized = !0, Re.litElementHydrateSupport?.({ LitElement: j });
var ze = Re.litElementPolyfillSupport;
ze?.({ LitElement: j }), (Re.litElementVersions ??= []).push("4.2.2");
//#endregion
//#region src/common/helpers/actions.js
function Be(e, t = null) {
	if (!(!e || !this.hass)) switch (e.action || "toggle") {
		case "toggle": {
			if (!t) return;
			let e = t.split(".")[0];
			this.hass.callService(e, "toggle", { entity_id: t });
			break;
		}
		case "more-info": {
			let n = e.entity || e.entity_id || t;
			this.dispatchEvent(new CustomEvent("hass-more-info", {
				detail: { entityId: n },
				bubbles: !0,
				composed: !0
			}));
			break;
		}
		case "navigate":
			this._navigate(e.navigation_path);
			break;
		case "url":
			if (!e.url_path) return;
			window.open(e.url_path, "_blank", "noopener,noreferrer");
			break;
		case "perform-action":
		case "call-service": {
			let [t, n] = (e.perform_action || e.service || "").split(".");
			if (!t || !n) return;
			this.hass.callService(t, n, e.data || e.service_data || {}, e.target);
			break;
		}
		case "fire-dom-event":
			this.dispatchEvent(new CustomEvent("ll-custom", {
				detail: { browser_mod: e.browser_mod },
				bubbles: !0,
				composed: !0
			}));
			break;
		case "popup": {
			let t = e.popup_title || e.title || " ", n = e.popup_content || e.content;
			if (!n) return;
			let r = Ue(e, t, n);
			this.dispatchEvent(new CustomEvent("ll-custom", {
				detail: { browser_mod: {
					service: "browser_mod.popup",
					data: r
				} },
				bubbles: !0,
				composed: !0
			}));
			break;
		}
		default: break;
	}
}
function M(e) {
	return !!(e?.action && e.action !== "none");
}
function N(e) {
	let t = e;
	for (; t;) {
		let e = t.localName || "";
		if (e === "hui-card-picker" || e === "hui-dialog-add-card" || e === "hui-card-picker-card") return !0;
		let n = t.getRootNode?.();
		t = t.parentElement || (n instanceof ShadowRoot ? n.host : null);
	}
	return !1;
}
function P(e, t, n, r) {
	if (!N(this)) {
		if (He(e), this._clearDoubleTapTimer?.(), M(r)) {
			this._doubleTapTimer = setTimeout(() => {
				this._doubleTapTimer = null, this._handleAction(n, t);
			}, 250);
			return;
		}
		this._handleAction(n, t);
	}
}
function F(e, t, n) {
	N(this) || (He(e), this._clearDoubleTapTimer?.(), M(n) && this._handleAction(n, t));
}
function Ve() {
	this._doubleTapTimer &&= (clearTimeout(this._doubleTapTimer), null);
}
function He(e) {
	e?.preventDefault?.(), e?.stopPropagation?.(), e?.stopImmediatePropagation && e.stopImmediatePropagation();
}
function Ue(e, t, n) {
	let { action: r, popup_title: i, popup_content: a, popup_options: o, title: s, content: c, ...l } = e;
	return {
		...l,
		...o || {},
		title: t,
		content: n
	};
}
function We(e) {
	e && (history.pushState(null, "", e), window.dispatchEvent(new CustomEvent("location-changed", { detail: { replace: !1 } })));
}
function Ge(e, t, n = null) {
	t.stopPropagation(), this._handleAction(n || { action: "toggle" }, e);
}
function Ke(e) {
	let t = e.currentTarget.dataEntity, n = e.currentTarget.dataAction, r = e.currentTarget.dataDoubleAction;
	P.call(this, e, t, n, r);
}
function qe(e) {
	F.call(this, e, e.currentTarget.dataEntity, e.currentTarget.dataDoubleAction);
}
function Je(e) {
	if (this._longPressTriggered) {
		this._longPressTriggered = !1;
		return;
	}
	let t = e.currentTarget.dataEntity, n = e.currentTarget.dataAction, r = e.currentTarget.dataDoubleAction;
	P.call(this, e, t, n, r);
}
function Ye(e) {
	F.call(this, e, e.currentTarget.dataEntity, e.currentTarget.dataDoubleAction);
}
function Xe(e) {
	if (!N(this)) {
		if (this._longPressTriggered) {
			this._longPressTriggered = !1;
			return;
		}
		if (e.composedPath().some((e) => e?.classList && e.classList.contains("circle"))) return Qe.call(this, e);
		P.call(this, e, this._config.main_entity || this._config.entity, et(this._config), this._config.double_tap_action);
	}
}
function Ze(e) {
	if (!N(this)) {
		if (e.composedPath().some((e) => e?.classList && e.classList.contains("circle"))) return $e.call(this, e);
		F.call(this, e, this._config.main_entity || this._config.entity, this._config.double_tap_action);
	}
}
function Qe(e) {
	if (this._longPressTriggered) {
		this._longPressTriggered = !1;
		return;
	}
	let t = this._config.main_entity || this._config.entity;
	if (!t) {
		P.call(this, e, null, et(this._config), this._config.double_tap_action);
		return;
	}
	P.call(this, e, t, tt(this._config), this._config.main_entity_double_tap_action);
}
function $e(e) {
	let t = this._config.main_entity || this._config.entity;
	if (!t) {
		F.call(this, e, null, this._config.double_tap_action);
		return;
	}
	F.call(this, e, t, this._config.main_entity_double_tap_action);
}
function et(e = {}) {
	return e.tap_action?.action ? e.tap_action : {
		action: "navigate",
		navigation_path: e.navigate?.navigation_path || e.navigation_path || "/lovelace/home"
	};
}
function tt(e = {}) {
	return e.main_entity_tap_action?.action === "none" ? et(e) : e.main_entity_tap_action || { action: "more-info" };
}
//#endregion
//#region src/common/helpers/entities.js
function nt(e) {
	let t = e.attributes.unit_of_measurement || "", n = e.state;
	return t ? `${n}${t}` : n === "on" || n === "off" ? n.toUpperCase() : n;
}
function rt(e) {
	if (!e) return !1;
	let t = e.entity_id.split(".")[0];
	return it(e.state, t);
}
function it(e, t = "") {
	let n = String(e ?? "").trim().toLowerCase();
	if (!n) return !1;
	if (!t) return !ot.has(n);
	if (at.has(t)) return n !== "unavailable";
	if (["unavailable", "unknown"].includes(n) || n === "off" && t !== "alert") return !1;
	switch (t) {
		case "alarm_control_panel": return n !== "disarmed";
		case "alert": return n !== "idle";
		case "cover":
		case "valve": return n !== "closed";
		case "device_tracker":
		case "person": return n !== "not_home";
		case "lawn_mower": return !["docked", "paused"].includes(n);
		case "lock": return n !== "locked";
		case "media_player": return n !== "standby";
		case "vacuum": return ![
			"idle",
			"docked",
			"paused"
		].includes(n);
		case "plant": return n === "problem";
		case "group": return [
			"on",
			"home",
			"open",
			"locked",
			"problem"
		].includes(n);
		case "timer": return n === "active";
		case "camera": return ["streaming", "recording"].includes(n);
		default: return !0;
	}
}
var at = new Set([
	"ai_task",
	"button",
	"conversation",
	"datetime",
	"event",
	"image",
	"infrared",
	"input_button",
	"notify",
	"radio_frequency",
	"scene",
	"stt",
	"tag",
	"tts",
	"wake_word"
]), ot = new Set([
	"",
	"false",
	"off",
	"no",
	"none",
	"null",
	"unknown",
	"unavailable",
	"closed",
	"closing",
	"locked",
	"locking",
	"unlocking",
	"jammed",
	"not_home",
	"idle",
	"standby",
	"docked",
	"disarmed",
	"below_horizon"
]);
function st(e) {
	return e?.state?.toString().toLowerCase() === "unavailable";
}
//#endregion
//#region src/common/helpers/templates.js
var ct = "__ORBIT_TEMPLATE_RESULT_START_8C4F2A__", lt = "__ORBIT_TEMPLATE_RESULT_END_8C4F2A__";
function ut(e) {
	if (typeof e != "string") return e;
	let t = e.trim();
	return !t || I(t) ? e : `{{ ${t} }}`;
}
function I(e) {
	return /{{|{%|{#/.test(e || "");
}
function dt(e = []) {
	let t = this.hass?.connection;
	if (!this.isConnected || !t?.subscribeMessage) {
		ft.call(this);
		return;
	}
	let n = St(this), r = Tt(this._config || {}), i = /* @__PURE__ */ new Map();
	for (let t of e) {
		let e = ut(t?.template || "")?.trim();
		if (!e) continue;
		let n = t?.entityId || "", a = Ct(e, n);
		i.set(a, {
			id: a,
			template: e,
			entityId: n,
			configSignature: r
		});
	}
	for (let [e, t] of n) {
		let r = i.get(e);
		(!r || r.configSignature !== t.configSignature) && (wt(t), n.delete(e));
	}
	for (let e of i.values()) n.has(e.id) || bt.call(this, e);
}
function ft() {
	let e = this.__orbitTemplateSubscriptions;
	if (e) {
		for (let t of e.values()) wt(t);
		e.clear();
	}
}
function L(e, t = "") {
	if (!e) return null;
	let n = ut(e)?.trim(), r = this.__orbitTemplateSubscriptions;
	return (r?.get(Ct(n, t)) || [...r?.values() || []].find((e) => e.template === n))?.result ?? null;
}
function pt(e, t = "") {
	if (!e) return "";
	let n = ut(e)?.trim();
	return this.__orbitTemplateSubscriptions?.get(Ct(n, t))?.error || "";
}
function mt(e, t = "") {
	let n = String(e ?? "").trim().toLowerCase(), r = Number(n);
	return n && Number.isFinite(r) ? r !== 0 : ["true", "yes"].includes(n) ? !0 : ["false", "no"].includes(n) ? !1 : it(n, t);
}
function ht(e) {
	let t = String(e ?? "").trim();
	return t.includes("_") ? t.replace(/_+/g, " ").replace(/\b\p{L}/gu, (e) => e.toLocaleUpperCase()) : t;
}
function gt(e) {
	let t = /* @__PURE__ */ new Map();
	return vt(e, t), [...t.values()];
}
function _t(e) {
	let t = /* @__PURE__ */ new Map();
	return yt(e, t), [...t.values()];
}
function vt(e, t, n = "", r = "") {
	if (Array.isArray(e)) {
		e.forEach((e) => vt(e, t, "", r));
		return;
	}
	if (!e || typeof e != "object") {
		if (typeof e == "string" && (n === "color" || n.endsWith("_color")) && I(e)) {
			let n = Ct(e, r);
			t.set(n, {
				template: e,
				entityId: r
			});
		}
		return;
	}
	let i = e.entity || e.main_entity || r;
	Object.entries(e).forEach(([e, n]) => vt(n, t, e, i));
}
function yt(e, t, n = "", r = "") {
	if (Array.isArray(e)) {
		e.forEach((e) => yt(e, t, "", r));
		return;
	}
	if (!e || typeof e != "object") {
		if (typeof e == "string" && (/(^|_)icon$/.test(n) || n === "icon_template" || n.endsWith("_icon_template")) && I(e)) {
			let n = Ct(e, r);
			t.set(n, {
				template: e,
				entityId: r
			});
		}
		return;
	}
	let i = e.entity || e.main_entity || r;
	Object.entries(e).forEach(([n, r]) => {
		let a = n.match(/^(.*)_icon(?:_template)?$/)?.[1];
		yt(r, t, n, a === void 0 ? i : e[a] || i);
	});
}
function bt(e) {
	let t = St(this), { id: n, template: r, entityId: i, configSignature: a } = e, o = {
		configSignature: a,
		template: r,
		entityId: i,
		result: null,
		error: "",
		subscription: void 0
	};
	t.set(n, o);
	let s = [
		"{% set entity = states[orbit_entity_id] if orbit_entity_id else none %}",
		ct,
		r,
		lt
	].join(""), c = this.hass.connection.subscribeMessage((e) => {
		t.get(n) === o && ("error" in e ? (o.error = Et(e.error), o.result = null) : (o.error = "", o.result = xt(e.result)), this._templateRevision = (this._templateRevision || 0) + 1);
	}, {
		type: "render_template",
		template: s,
		variables: {
			config: this._config || {},
			orbit_entity_id: i
		},
		strict: !0,
		report_errors: !0
	});
	o.subscription = c, c.catch((e) => {
		t.get(n) === o && (o.subscription = void 0, o.error = Et(e), o.result = null, this._templateRevision = (this._templateRevision || 0) + 1);
	});
}
function xt(e) {
	let t = String(e ?? ""), n = t.indexOf(ct), r = t.lastIndexOf(lt);
	return n !== -1 && r > n ? t.slice(n + 38, r).trim() : t.trim();
}
function St(e) {
	return e.__orbitTemplateSubscriptions ||= /* @__PURE__ */ new Map(), e.__orbitTemplateSubscriptions;
}
function Ct(e, t) {
	return JSON.stringify([e || "", t || ""]);
}
function wt(e) {
	e.subscription?.then((e) => e()).catch(() => {});
}
function Tt(e) {
	try {
		return JSON.stringify(e);
	} catch {
		return "";
	}
}
function Et(e) {
	if (!e) return "Template rendering failed";
	if (typeof e == "string") return e;
	if (e.message) return e.message;
	try {
		return JSON.stringify(e);
	} catch {
		return String(e);
	}
}
//#endregion
//#region src/common/helpers/colors.js
function Dt(e) {
	if (e = R.call(this, e), !e) return "rgb(var(--color-theme))";
	let t = e.toString().trim();
	return Bt(t) ? t : jt(t);
}
function Ot(e) {
	if (e = R.call(this, e), !e) return "rgba(var(--color-theme), 0.3)";
	let t = e.toString().trim();
	return t === "theme" ? "rgba(var(--color-theme), 0.3)" : zt.call(this, t, 70);
}
function kt(e) {
	if (e = R.call(this, e), !e) return "rgba(var(--color-theme), 0.2)";
	let t = e.toString().trim();
	return t === "theme" ? "rgba(var(--color-theme), 0.05)" : zt.call(this, t, 20);
}
function At(e) {
	if (e = R.call(this, e), !e) return "rgba(var(--color-theme), 0.25)";
	let t = e.toString().trim();
	return zt.call(this, t, 25);
}
function jt(e) {
	let t = Vt(e);
	if (!t) return "rgb(var(--color-theme))";
	if (t === "light") return "var(--state-light-active-color, var(--state-active-color, rgb(var(--color-theme))))";
	let n = Ft(t);
	return Mt(t) ? n ? `rgb(var(--${n}))` : `var(--${t}-color, var(--${t}, rgb(var(--color-theme))))` : t.startsWith("color-") ? `rgb(var(--${t}))` : `var(--${t}, rgb(var(--color-${t}, var(--color-theme))))`;
}
function Mt(e) {
	return Nt.has(Vt(e));
}
var Nt = new Set([
	"red",
	"pink",
	"purple",
	"deep-purple",
	"indigo",
	"blue",
	"light-blue",
	"cyan",
	"teal",
	"green",
	"light-green",
	"lime",
	"yellow",
	"amber",
	"orange",
	"deep-orange",
	"brown",
	"light-grey",
	"grey",
	"dark-grey",
	"blue-grey",
	"black",
	"white",
	"disabled"
]);
function Pt(e) {
	return !!Ft(e);
}
function Ft(e) {
	let t = Vt(e);
	return t && It(t).find(Rt) || "";
}
function It(e) {
	let t = e.startsWith("color-") ? e.slice(6) : e, n = Lt[t] || [];
	return [`color-${t}`, ...n.map((e) => `color-${e}`)];
}
var Lt = {
	"blue-grey": ["bluegrey"],
	"dark-grey": ["darkgrey"],
	"deep-orange": ["deeporange"],
	"deep-purple": ["deeppurple"],
	"light-blue": ["lightblue"],
	"light-green": ["lightgreen"],
	"light-grey": ["lightgrey"]
};
function Rt(e) {
	return typeof document > "u" ? !1 : [document.documentElement, document.body].filter(Boolean).some((t) => getComputedStyle(t).getPropertyValue(`--${e}`).trim());
}
function zt(e, t) {
	if (e = R.call(this, e), !e) return "transparent";
	let n = e.toString().trim();
	return `color-mix(in srgb, transparent, ${Bt(n) ? n : jt(n)} ${t}%)`;
}
function R(e) {
	if (!I(e)) return e;
	let t = this?._orbitColorTemplateEntityId || "";
	return L.call(this, e, t) || "";
}
function Bt(e) {
	let t = e.toString().trim();
	return t.startsWith("rgb") || t.startsWith("hsl") || t.startsWith("#");
}
function Vt(e) {
	return e.toString().trim().toLowerCase().replace(/[^a-z0-9-_]/g, "");
}
//#endregion
//#region src/common/helpers/card-name.js
function Ht(e, t, n = "Card") {
	if (e.name) return e.name;
	if (e.card_name) return e.card_name;
	if (e.area_name) return Ut(e.area_name, e, t, n);
	if (e.room_name) return Ut(e.room_name, e, t, n);
	let r = e.area;
	return r && t?.areas?.[r] && t.areas[r].name || n;
}
function Ut(e, t, n, r = "") {
	return typeof e == "string" ? e : (Array.isArray(e) ? e : [e]).map((e) => Wt(e, t, n, r)).filter(Boolean).join(" ");
}
function Wt(e, t, n, r) {
	if (!e) return "";
	if (typeof e == "string") return e;
	if (e.type === "text") return e.text || "";
	if (e.type === "area") return Gt(t, n) || "";
	if (e.type === "floor") return Kt(t, n) || "";
	if (e.type === "device_class") return (Array.isArray(t.device_class) ? t.device_class : [t.device_class]).filter((e) => typeof e == "string" && e.trim()).map((e) => e.trim().replaceAll("_", " ").replace(/\b\w/g, (e) => e.toUpperCase())).join(", ");
	let i = qt(t, n);
	return i && typeof n?.formatEntityName == "function" ? n.formatEntityName(i, { type: e.type }) || "" : e.type === "entity" && (i?.attributes?.friendly_name || i?.entity_id) || "";
}
function Gt(e, t) {
	let n = e.area;
	if (n && t?.areas?.[n]) return t.areas[n].name || "";
	let r = qt(e, t);
	return r && typeof t?.formatEntityName == "function" ? t.formatEntityName(r, { type: "area" }) : "";
}
function Kt(e, t) {
	let n = e.area, r = n && t?.areas?.[n] ? t.areas[n].floor_id : "";
	if (r && t?.floors?.[r]) return t.floors[r].name || "";
	let i = qt(e, t);
	return i && typeof t?.formatEntityName == "function" ? t.formatEntityName(i, { type: "floor" }) : "";
}
function qt(e, t) {
	let n = e.main_entity || e.entity || "";
	return n && t?.states ? t.states[n] : null;
}
//#endregion
//#region src/common/helpers/documentation.js
var Jt = "https://github.com/andyblac/Orbit-Cards/wiki", Yt = {
	"orbit-area-card": {
		default: "Area-Card",
		card: "Area-Card#main-layout",
		status: "Area-Card#status-row",
		buttons: "Area-Card#side-buttons",
		curve: "Area-Card#curved-buttons",
		action: "Area-Card#action-button"
	},
	"orbit-room-card": {
		default: "Area-Card",
		card: "Area-Card#main-layout",
		status: "Area-Card#status-row",
		buttons: "Area-Card#side-buttons",
		curve: "Area-Card#curved-buttons",
		action: "Area-Card#action-button"
	},
	"orbit-status-card": { default: "Status-Card" },
	"orbit-action-card": { default: "Action-Card" },
	"orbit-deck-card": {
		default: "Deck-Card",
		"setup-wrap": "Deck-Card#wrap-layout",
		"setup-tabs": "Deck-Card#tabs-layout",
		"setup-overlay": "Deck-Card#overlay-layout",
		card: "Deck-Card#deck-items"
	}
};
function Xt(e = "") {
	return e.replace(/^custom:/, "");
}
function Zt(e, t = "default") {
	let n = Yt[Xt(e)], r = n?.[t] || n?.default;
	return r ? `${Jt}/${r}` : `${Jt}`;
}
function Qt(e, t, n = "default") {
	let r = Zt(t, n);
	queueMicrotask(() => {
		let t = $t(e, "hui-dialog-edit-card") || $t(e, "hui-dialog-edit-badge");
		!t || t._documentationURL === r || (t._documentationURL = r, t.requestUpdate?.());
	});
}
function $t(e, t) {
	let n = e;
	for (; n;) {
		if (n.localName === t) return n;
		let e = n.getRootNode?.();
		n = n.parentElement || e?.host || null;
	}
	return null;
}
//#endregion
//#region src/common/helpers/card-registration.js
function en({ tag: e, cardClass: t, name: n, description: r, version: a, getEntitySuggestion: o, documentationURL: s, aliases: c = [] }) {
	customElements.get(e) || customElements.define(e, t), c.forEach((e) => {
		customElements.get(e.tag) || customElements.define(e.tag, e.cardClass || t);
	});
	let l = new Set([e, ...c.map((e) => e.tag)]);
	window.customCards = window.customCards || [];
	for (let e = window.customCards.length - 1; e >= 0; --e) l.has(window.customCards[e].type) && window.customCards.splice(e, 1);
	window.customCards.push({
		type: e,
		name: n,
		description: r,
		preview: !0,
		version: a,
		documentationURL: s || Zt(e),
		getEntitySuggestion: o
	}), i(n, a);
}
//#endregion
//#region src/common/helpers/config-migration.js
function tn(e = {}) {
	let t = { ...e || {} }, n = !1;
	return t.type === "custom:orbit-room-card" && (t.type = "custom:orbit-area-card", n = !0), Object.prototype.hasOwnProperty.call(t, "room_name") && (t.area_name === void 0 && t.room_name !== void 0 && t.room_name !== "" && (t.area_name = t.room_name), delete t.room_name, n = !0), n = vn(t) || n, n = un(t) || n, {
		config: n ? t : e,
		migrated: n
	};
}
function nn(e = {}) {
	let t = { ...e || {} }, n = vn(t);
	if (n = ln(t) || n, Array.isArray(t.entities)) {
		let e = t.entities.map((e) => {
			if (!e || typeof e == "string") return e;
			let t = { ...e }, r = vn(t), i = ln(t), a = r || i;
			return n ||= a, a ? t : e;
		});
		n && (t.entities = e);
	}
	return {
		config: n ? t : e,
		migrated: n
	};
}
function rn(e = {}) {
	let t = { ...e || {} }, n = vn(t);
	return n = dn(t) || n, n = fn(t) || n, {
		config: n ? t : e,
		migrated: n
	};
}
function an(e = {}) {
	if (!Array.isArray(e?.decks)) return {
		config: e,
		migrated: !1
	};
	let t = !1, n = e.decks.map((e) => {
		if (!e?.card || typeof e.card != "object") return e;
		let n = on(e.card);
		return n.migrated ? (t = !0, {
			...e,
			card: n.config
		}) : e;
	});
	return t ? {
		config: {
			...e,
			decks: n
		},
		migrated: t
	} : {
		config: e,
		migrated: t
	};
}
function on(e) {
	return sn(e, "orbit-status-card") ? cn(e) : sn(e, "orbit-area-card") || sn(e, "orbit-room-card") ? tn(e) : sn(e, "orbit-action-card") ? nn(e) : sn(e, "orbit-deck-card") ? an(e) : {
		config: e,
		migrated: !1
	};
}
function sn(e, t) {
	return e?.type === `custom:${t}` || e?.type === `custom:${t}-dev`;
}
function cn(e = {}) {
	let t = { ...e || {} }, n = vn(t);
	if (n = gn(t) || n, t.mode !== "person" && (n = _n(t) || n), n = hn(t) || n, n = mn(t) || n, n = dn(t) || n, Object.prototype.hasOwnProperty.call(t, "main_entity") && (t.entity === void 0 && t.main_entity !== void 0 && t.main_entity !== "" && (t.entity = t.main_entity), delete t.main_entity, n = !0), Array.isArray(t.entities)) {
		let e = t.entities.map((e) => {
			if (!e || typeof e == "string") return e;
			let t = { ...e }, r = vn(t), i = gn(t), a = _n(t), o = hn(t), s = mn(t), c = dn(t), l = r || i || a || o || s || c;
			return n ||= l, l ? t : e;
		});
		n && (t.entities = e);
	}
	return {
		config: n ? t : e,
		migrated: n
	};
}
function ln(e) {
	let t = !1;
	return t = z(e, "accent_color", "color") || t, t = pn(e, "main_entity_") || t, t;
}
function un(e) {
	let t = !1;
	t = z(e, "accent_color", "color") || t, t = pn(e, "main_entity_") || t, t = z(e, "main_entity_state_template", "state_template") || t;
	for (let n of [
		"status1",
		"status2",
		"status3",
		"button1",
		"button2",
		"button3",
		"button4",
		"curve_button1",
		"curve_button2",
		"curve_button3",
		"curve_button4",
		"curve_button5",
		"curve_button6",
		"action_button"
	]) {
		let r = `${n}_icon_template`;
		Object.prototype.hasOwnProperty.call(e, r) && ((e[`${n}_icon_source`] === "template" && e[r] !== void 0 || e[`${n}_icon`] === void 0) && (e[`${n}_icon`] = e[r]), delete e[r], t = !0), t = z(e, `${n}_on_color`, `${n}_color_on`) || t, t = z(e, `${n}_off_color`, `${n}_color_off`) || t;
	}
	return t;
}
function dn(e) {
	let t = !1;
	return t = z(e, "accent_color_source", "color_source") || t, t = z(e, "accent_color", "color") || t, t = z(e, "accent_on_color", "color_on") || t, t = z(e, "accent_off_color", "color_off") || t, t;
}
function fn(e) {
	return Object.prototype.hasOwnProperty.call(e, "icon_template") ? ((e.icon_source === "template" && e.icon_template !== void 0 || e.icon === void 0) && (e.icon = e.icon_template), delete e.icon_template, !0) : !1;
}
function pn(e, t) {
	let n = !1;
	for (let r of [
		"icon_source",
		"icon_template",
		"icon",
		"icon_on",
		"icon_off",
		"icon_svg_color_override",
		"icon_on_svg_color_override",
		"icon_off_svg_color_override"
	]) {
		let i = r === "icon_template" ? "icon" : r;
		n = z(e, `${t}${r}`, i) || n;
	}
	return n;
}
function z(e, t, n) {
	return Object.prototype.hasOwnProperty.call(e, t) ? (e[n] === void 0 && e[t] !== void 0 && (e[n] = e[t]), delete e[t], !0) : !1;
}
function mn(e) {
	let t = pn(e, "entity_");
	return t = pn(e, "main_entity_") || t, t = fn(e) || t, t;
}
function hn(e) {
	let t = [
		"tap_action",
		"hold_action",
		"double_tap_action"
	], n = !1;
	for (let r of t) {
		let t = `main_entity_${r}`, i = `entity_${r}`;
		Object.prototype.hasOwnProperty.call(e, t) && (e[i] === void 0 && e[t] !== void 0 && (e[i] = e[t]), delete e[t], n = !0);
	}
	return n;
}
function gn(e) {
	return Object.prototype.hasOwnProperty.call(e, "status_name") ? (e.name === void 0 && e.status_name !== void 0 && e.status_name !== "" && (e.name = e.status_name), delete e.status_name, !0) : !1;
}
function _n(e) {
	let t = e.state_template !== void 0 && e.state_template !== "", n = e.label_template !== void 0 && e.label_template !== "";
	return !t && !n || e.state_source === "template" || e.state_source === "area_count" ? !1 : (e.state_source = "template", !0);
}
function vn(e) {
	let t = !1;
	for (let n of Object.keys(e || {})) {
		if (!n.endsWith("_template")) continue;
		let r = ut(e[n]);
		r !== e[n] && (e[n] = r, t = !0);
	}
	return t;
}
//#endregion
//#region src/icons/fan.svg?raw
var yn = "<svg xmlns=\"http://www.w3.org/2000/svg\"\n     width=\"120\"\n     height=\"120\"\n     viewBox=\"0 0 24 24\"\n     fill=\"none\">\n\n  <style>\n    .spinner {\n      transform-origin: center;\n      animation: spin 1.2s linear infinite;\n    }\n\n    @keyframes spin {\n      100% {\n        transform: rotate(360deg);\n      }\n    }\n  </style>\n\n  <g class=\"spinner\">\n    <path\n      fill=\"black\"\n      d=\"M12,11A1,1 0 0,0 11,12A1,1 0 0,0 12,13A1,1 0 0,0 13,12A1,1 0 0,0 12,11M12.5,2C17,2 17.11,5.57 14.75,6.75C13.76,7.24 13.32,8.29 13.13,9.22C13.61,9.42 14.03,9.73 14.35,10.13C18.05,8.13 22.03,8.92 22.03,12.5C22.03,17 18.46,17.1 17.28,14.73C16.78,13.74 15.72,13.3 14.79,13.11C14.59,13.59 14.28,14 13.88,14.34C15.87,18.03 15.08,22 11.5,22C7,22 6.91,18.42 9.27,17.24C10.25,16.75 10.69,15.71 10.89,14.79C10.4,14.59 9.97,14.27 9.65,13.87C5.96,15.85 2,15.07 2,11.5C2,7 5.56,6.89 6.74,9.26C7.24,10.25 8.29,10.68 9.22,10.87C9.41,10.39 9.73,9.97 10.14,9.65C8.15,5.96 8.94,2 12.5,2Z\"\n    />\n  </g>\n\n</svg>", bn = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\">\n  <title>garage-fixed</title>\n\n  <!-- Frame -->\n  <path d=\"M22 9V20H20V11H4V20H2V9L12 5L22 9\" fill=\"currentColor\"/>\n\n  <clipPath id=\"doorClip\">\n    <rect x=\"4\" y=\"11\" width=\"16\" height=\"9\" />\n  </clipPath>\n\n  <g clip-path=\"url(#doorClip)\">\n\n    <!-- Animated group (NO base transform!) -->\n    <g>\n\n      <!-- Door panels -->\n      <path d=\"M19 12H5V14H19V12Z\" fill=\"currentColor\"/>\n      <path d=\"M19 15H5V17H19V15Z\" fill=\"currentColor\"/>\n      <path d=\"M19 18H5V20H19V18Z\" fill=\"currentColor\"/>\n\n      <!-- Start OPEN via animation itself -->\n      <animateTransform\n        attributeName=\"transform\"\n        type=\"translate\"\n        from=\"0 -10\"\n        to=\"0 0\"\n        dur=\"1.5s\"\n        begin=\"0s\"\n        fill=\"freeze\"\n      />\n\n    </g>\n  </g>\n</svg>", xn = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\">\n  <title>garage-variant-open</title>\n\n  <!-- Frame / roof -->\n  <path d=\"M22 9V20H20V11H4V20H2V9L12 5L22 9\" fill=\"currentColor\"/>\n\n  <!-- Clip area -->\n  <clipPath id=\"doorClip\">\n    <rect x=\"4\" y=\"11\" width=\"16\" height=\"9\" />\n  </clipPath>\n\n  <g clip-path=\"url(#doorClip)\">\n\n    <!-- Door group (FINAL STATE is open) -->\n    <g class=\"door\" transform=\"translate(0 -10)\">\n\n      <!-- Door panels -->\n      <path d=\"M19 12H5V14H19V12Z\" fill=\"currentColor\"/>\n      <path d=\"M19 15H5V17H19V15Z\" fill=\"currentColor\"/>\n      <path d=\"M19 18H5V20H19V18Z\" fill=\"currentColor\"/>\n\n      <!-- Optional SMIL animation (safe fallback style) -->\n      <animateTransform\n        attributeName=\"transform\"\n        type=\"translate\"\n        from=\"0 0\"\n        to=\"0 -10\"\n        dur=\"1.5s\"\n        begin=\"0s\"\n        fill=\"freeze\"\n      />\n    </g>\n\n  </g>\n</svg>", Sn = "<svg xmlns=\"http://www.w3.org/2000/svg\"\n     viewBox=\"0 0 24 24\">\n\n  <style>\n    .arc {\n      opacity: 0;\n      animation-duration: 2s;\n      animation-iteration-count: infinite;\n    }\n\n    /* arc 1 appears first and stays on */\n    .a1 {\n      animation-name: arc1;\n    }\n\n    /* arc 2 appears second and stays on */\n    .a2 {\n      animation-name: arc2;\n    }\n\n    /* arc 3 appears third and stays on */\n    .a3 {\n      animation-name: arc3;\n    }\n\n    @keyframes arc1 {\n      0%   { opacity: 0; }\n      10%  { opacity: 1; }\n      75%  { opacity: 1; }\n      100% { opacity: 0; }\n    }\n\n    @keyframes arc2 {\n      0%   { opacity: 0; }\n      25%  { opacity: 0; }\n      35%  { opacity: 1; }\n      75%  { opacity: 1; }\n      100% { opacity: 0; }\n    }\n\n    @keyframes arc3 {\n      0%   { opacity: 0; }\n      50%  { opacity: 0; }\n      60%  { opacity: 1; }\n      75%  { opacity: 1; }\n      100% { opacity: 0; }\n    }\n  </style>\n\n  <!-- RADAR ARCS -->\n  <path class=\"arc a1\" fill=\"currentColor\"\n    d=\"M21,1A2,2 0 0,0 23,3V1H21\"/>\n\n  <path class=\"arc a2\" fill=\"currentColor\"\n    d=\"M18.33,1C18.33,3.58 20.42,5.67 23,5.67V4.33C21.16,4.33 19.67,2.84 19.67,1H18.33\"/>\n\n  <path class=\"arc a3\" fill=\"currentColor\"\n    d=\"M15.67,1A7.33,7.33 0 0,0 23,8.33V7A6,6 0 0,1 17,1H15.67\"/>\n\n  <!-- MAIN ICON -->\n  <path fill=\"currentColor\"\n    d=\"M10,0.2C9,0.2 8.2,1 8.2,2C8.2,3 9,3.8 10,3.8C11,3.8 11.8,3 11.8,2C11.8,1 11,0.2 10,0.2M7.92,4.03C7.75,4.03 7.58,4.06 7.42,4.11L2,5.8V11H3.8V7.33L5.91,6.67L2,22H3.8L6.67,13.89L9,17V22H10.8V15.59L8.31,11.05L9.04,8.18L10.12,10H15V8.2H11.38L9.38,4.87C9.08,4.37 8.54,4.03 7.92,4.03Z\"\n  />\n</svg>", Cn = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" style=\"color: inherit;\">\n  <g class=\"start\">\n    <path\n      fill=\"currentColor\"\n      d=\"M10,0.2C9,0.2 8.2,1 8.2,2C8.2,3 9,3.8 10,3.8C11,3.8 11.8,3 11.8,2C11.8,1 11,0.2 10,0.2M7.92,4.03C7.75,4.03 7.58,4.06 7.42,4.11L2,5.8V11H3.8V7.33L5.91,6.67L2,22H3.8L6.67,13.89L9,17V22H10.8V15.59L8.31,11.05L9.04,8.18L10.12,10H15V8.2H11.38L9.38,4.87C9.08,4.37 8.54,4.03 7.92,4.03Z\"/>\n  </g>\n</svg>", wn = "<svg xmlns=\"http://www.w3.org/2000/svg\"\n     viewBox=\"0 0 24 24\">\n\n  <style>\n    .arc {\n      opacity: 0;\n      animation-duration: 2s;\n      animation-iteration-count: infinite;\n    }\n\n    /* arc 1 appears first and stays on */\n    .a1 {\n      animation-name: arc1;\n    }\n\n    /* arc 2 appears second and stays on */\n    .a2 {\n      animation-name: arc2;\n    }\n\n    /* arc 3 appears third and stays on */\n    .a3 {\n      animation-name: arc3;\n    }\n\n    @keyframes arc1 {\n      0%   { opacity: 0; }\n      10%  { opacity: 1; }\n      75%  { opacity: 1; }\n      100% { opacity: 0; }\n    }\n\n    @keyframes arc2 {\n      0%   { opacity: 0; }\n      25%  { opacity: 0; }\n      35%  { opacity: 1; }\n      75%  { opacity: 1; }\n      100% { opacity: 0; }\n    }\n\n    @keyframes arc3 {\n      0%   { opacity: 0; }\n      50%  { opacity: 0; }\n      60%  { opacity: 1; }\n      75%  { opacity: 1; }\n      100% { opacity: 0; }\n    }\n  </style>\n\n  <!-- RADAR ARCS -->\n  <path class=\"arc a1\" fill=\"currentColor\"\n    d=\"M21,1A2,2 0 0,0 23,3V1H21\"/>\n\n  <path class=\"arc a2\" fill=\"currentColor\"\n    d=\"M18.33,1C18.33,3.58 20.42,5.67 23,5.67V4.33C21.16,4.33 19.67,2.84 19.67,1H18.33\"/>\n\n  <path class=\"arc a3\" fill=\"currentColor\"\n    d=\"M15.67,1A7.33,7.33 0 0,0 23,8.33V7A6,6 0 0,1 17,1H15.67\"/>\n\n  <!-- MAIN ICON -->\n  <path fill=\"currentColor\"\n    d=\"M10,0.2C9,0.2 8.2,1 8.2,2C8.2,3 9,3.8 10,3.8C11,3.8 11.8,3 11.8,2C11.8,1 11,0.2 10,0.2M7.92,4.03C7.75,4.03 7.58,4.06 7.42,4.11L2,5.8V11H3.8V7.33L5.91,6.67L2,22H3.8L6.67,13.89L9,17V22H10.8V15.59L8.31,11.05L9.04,8.18L10.12,10H15V8.2H11.38L9.38,4.87C9.08,4.37 8.54,4.03 7.92,4.03Z\"\n  />\n</svg>", Tn = "<?xml version=\"1.0\" encoding=\"utf-8\"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->\r\n<svg fill=\"#000000\" width=\"800px\" height=\"800px\" viewBox=\"0 0 50 50\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"><path d=\"M22 0L22 7.28125C22.972656 7.109375 23.972656 7 25 7C26.027344 7 27.027344 7.109375 28 7.28125L28 0 Z M 25 9C18.394531 9 12.871094 13.273438 11.40625 19L38.59375 19C37.128906 13.273438 31.605469 9 25 9 Z M 10 21C8.347656 21 7 22.347656 7 24C7 25.652344 8.347656 27 10 27L40 27C41.652344 27 43 25.652344 43 24C43 22.347656 41.652344 21 40 21 Z M 17 30C15.894531 30 15 30.894531 15 32C15 33.105469 15.894531 34 17 34C18.105469 34 19 33.105469 19 32C19 30.894531 18.105469 30 17 30 Z M 25 30C23.894531 30 23 30.894531 23 32C23 33.105469 23.894531 34 25 34C26.105469 34 27 33.105469 27 32C27 30.894531 26.105469 30 25 30 Z M 33 30C31.894531 30 31 30.894531 31 32C31 33.105469 31.894531 34 33 34C34.105469 34 35 33.105469 35 32C35 30.894531 34.105469 30 33 30 Z M 13 38C11.894531 38 11 38.894531 11 40C11 41.105469 11.894531 42 13 42C14.105469 42 15 41.105469 15 40C15 38.894531 14.105469 38 13 38 Z M 21 38C19.894531 38 19 38.894531 19 40C19 41.105469 19.894531 42 21 42C22.105469 42 23 41.105469 23 40C23 38.894531 22.105469 38 21 38 Z M 29 38C27.894531 38 27 38.894531 27 40C27 41.105469 27.894531 42 29 42C30.105469 42 31 41.105469 31 40C31 38.894531 30.105469 38 29 38 Z M 37 38C35.894531 38 35 38.894531 35 40C35 41.105469 35.894531 42 37 42C38.105469 42 39 41.105469 39 40C39 38.894531 38.105469 38 37 38 Z M 9 46C7.894531 46 7 46.894531 7 48C7 49.105469 7.894531 50 9 50C10.105469 50 11 49.105469 11 48C11 46.894531 10.105469 46 9 46 Z M 17 46C15.894531 46 15 46.894531 15 48C15 49.105469 15.894531 50 17 50C18.105469 50 19 49.105469 19 48C19 46.894531 18.105469 46 17 46 Z M 25 46C23.894531 46 23 46.894531 23 48C23 49.105469 23.894531 50 25 50C26.105469 50 27 49.105469 27 48C27 46.894531 26.105469 46 25 46 Z M 33 46C31.894531 46 31 46.894531 31 48C31 49.105469 31.894531 50 33 50C34.105469 50 35 49.105469 35 48C35 46.894531 34.105469 46 33 46 Z M 41 46C39.894531 46 39 46.894531 39 48C39 49.105469 39.894531 50 41 50C42.105469 50 43 49.105469 43 48C43 46.894531 42.105469 46 41 46Z\"/></svg>", En = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<svg width=\"800px\" height=\"800px\" viewBox=\"0 0 50 50\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-labelledby=\"title desc\">\n  <title id=\"title\">Animated shower</title>\n  <desc id=\"desc\">A shower head icon with animated falling water droplets.</desc>\n  <style>\n    .fixture {\n      fill: #111111;\n    }\n\n    .drop {\n      fill: #1597d3;\n      opacity: 0;\n      transform-box: fill-box;\n      transform-origin: center;\n      animation: fall 1.35s linear infinite;\n    }\n\n    .drop:nth-child(1) { animation-delay: 0s; }\n    .drop:nth-child(2) { animation-delay: .18s; }\n    .drop:nth-child(3) { animation-delay: .36s; }\n    .drop:nth-child(4) { animation-delay: .54s; }\n    .drop:nth-child(5) { animation-delay: .72s; }\n    .drop:nth-child(6) { animation-delay: .9s; }\n    .drop:nth-child(7) { animation-delay: 1.08s; }\n    .drop:nth-child(8) { animation-delay: .12s; }\n    .drop:nth-child(9) { animation-delay: .3s; }\n    .drop:nth-child(10) { animation-delay: .48s; }\n    .drop:nth-child(11) { animation-delay: .66s; }\n    .drop:nth-child(12) { animation-delay: .84s; }\n\n    @keyframes fall {\n      0% {\n        opacity: 0;\n        transform: translateY(-8px) scale(.72);\n      }\n      18% {\n        opacity: 1;\n      }\n      72% {\n        opacity: .95;\n      }\n      100% {\n        opacity: 0;\n        transform: translateY(8px) scale(1);\n      }\n    }\n\n    @media (prefers-reduced-motion: reduce) {\n      .drop {\n        opacity: 1;\n        animation: none;\n      }\n    }\n  </style>\n\n  <path class=\"fixture\" d=\"M22 0L22 7.28125C22.972656 7.109375 23.972656 7 25 7C26.027344 7 27.027344 7.109375 28 7.28125L28 0 Z M25 9C18.394531 9 12.871094 13.273438 11.40625 19L38.59375 19C37.128906 13.273438 31.605469 9 25 9 Z M10 21C8.347656 21 7 22.347656 7 24C7 25.652344 8.347656 27 10 27L40 27C41.652344 27 43 25.652344 43 24C43 22.347656 41.652344 21 40 21 Z\"/>\n\n  <g id=\"water\">\n    <circle class=\"drop\" cx=\"17\" cy=\"32\" r=\"2\"/>\n    <circle class=\"drop\" cx=\"25\" cy=\"32\" r=\"2\"/>\n    <circle class=\"drop\" cx=\"33\" cy=\"32\" r=\"2\"/>\n    <circle class=\"drop\" cx=\"13\" cy=\"40\" r=\"2\"/>\n    <circle class=\"drop\" cx=\"21\" cy=\"40\" r=\"2\"/>\n    <circle class=\"drop\" cx=\"29\" cy=\"40\" r=\"2\"/>\n    <circle class=\"drop\" cx=\"37\" cy=\"40\" r=\"2\"/>\n    <circle class=\"drop\" cx=\"9\" cy=\"48\" r=\"2\"/>\n    <circle class=\"drop\" cx=\"17\" cy=\"48\" r=\"2\"/>\n    <circle class=\"drop\" cx=\"25\" cy=\"48\" r=\"2\"/>\n    <circle class=\"drop\" cx=\"33\" cy=\"48\" r=\"2\"/>\n    <circle class=\"drop\" cx=\"41\" cy=\"48\" r=\"2\"/>\n  </g>\n</svg>\n", Dn = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" style=\"color: inherit;\" role=\"img\" aria-labelledby=\"title desc\">\n  <title id=\"title\">Closing shutter</title>\n  <desc id=\"desc\">A blue shutter smoothly closes from twenty percent closed to fully closed.</desc>\n  <style>\n    .shade-closing {\n      transform-box: view-box;\n      transform-origin: 0 4.021px;\n      transform: scaleY(3.943322);\n    }\n\n    .rail-closing {\n      transform: translateY(12.827px);\n    }\n\n    svg[data-orbit-animate=\"true\"] .shade-closing {\n      animation: shade-closing 5s cubic-bezier(0.4, 0, 0.2, 1) forwards;\n    }\n\n    svg[data-orbit-animate=\"true\"] .rail-closing {\n      animation: rail-closing 5s cubic-bezier(0.4, 0, 0.2, 1) forwards;\n    }\n\n    @keyframes shade-closing {\n      from { transform: scaleY(1); }\n      to   { transform: scaleY(3.943322); }\n    }\n\n    @keyframes rail-closing {\n      from { transform: translateY(0); }\n      to   { transform: translateY(12.827px); }\n    }\n  </style>\n\n  <g fill=\"currentColor\" shape-rendering=\"geometricPrecision\">\n    <!-- Top housing -->\n    <path fill-rule=\"evenodd\"\n      d=\"M2.42 2H21.58V3.707H2.42Z M2.991 2.273H6.173V3.359H2.991Z M3.194 2.476H5.97V3.157H3.194Z\"/>\n\n    <!-- Fabric/shade -->\n    <rect class=\"shade-closing\" x=\"2.651\" y=\"4.021\" width=\"18.698\" height=\"4.358\"/>\n\n    <!-- Bottom rail -->\n    <rect class=\"rail-closing\" x=\"2.42\" y=\"8.694\" width=\"19.16\" height=\"0.479\"/>\n  </g>\n</svg>\n", On = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" style=\"color: inherit;\" role=\"img\" aria-labelledby=\"title desc\">\n  <title id=\"title\">Opening shutter</title>\n  <desc id=\"desc\">A blue shutter smoothly opens from fully closed to twenty percent closed.</desc>\n  <style>\n    .shade-opening {\n      transform-box: view-box;\n      transform-origin: 0 4.021px;\n      transform: scaleY(0.253593);\n    }\n\n    .rail-opening {\n      transform: translateY(-12.827px);\n    }\n\n    svg[data-orbit-animate=\"true\"] .shade-opening {\n      animation: shade-opening 5s cubic-bezier(0.4, 0, 0.2, 1) forwards;\n    }\n\n    svg[data-orbit-animate=\"true\"] .rail-opening {\n      animation: rail-opening 5s cubic-bezier(0.4, 0, 0.2, 1) forwards;\n    }\n\n    @keyframes shade-opening {\n      from { transform: scaleY(1); }\n      to   { transform: scaleY(0.253593); }\n    }\n\n    @keyframes rail-opening {\n      from { transform: translateY(0); }\n      to   { transform: translateY(-12.827px); }\n    }\n  </style>\n\n  <g fill=\"currentColor\" shape-rendering=\"geometricPrecision\">\n    <!-- Top housing -->\n    <path fill-rule=\"evenodd\"\n      d=\"M2.42 2H21.58V3.707H2.42Z M2.991 2.273H6.173V3.359H2.991Z M3.194 2.476H5.97V3.157H3.194Z\"/>\n\n    <!-- Fabric/shade -->\n    <rect class=\"shade-opening\" x=\"2.651\" y=\"4.021\" width=\"18.698\" height=\"17.185\"/>\n\n    <!-- Bottom rail -->\n    <rect class=\"rail-opening\" x=\"2.42\" y=\"21.521\" width=\"19.16\" height=\"0.479\"/>\n  </g>\n</svg>\n", kn = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"120\" height=\"120\" fill=\"currentColor\">\n\n  <style>\n    .swirl {\n      transform-origin: 12px 14px;\n      animation: wash 1.5s ease-in-out infinite;\n    }\n\n    @keyframes wash {\n      0%,100% { transform: rotate(0deg); }\n      25%     { transform: rotate(-20deg); }\n      75%     { transform: rotate(20deg); }\n    }\n  </style>\n\n  <!-- machine -->\n  <path\n    fill=\"currentColor\"\n    d=\"M6,2H18A2,2 0 0,1 20,4V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V4A2,2 0 0,1 6,2\n       M7,4A1,1 0 0,0 6,5A1,1 0 0,0 7,6A1,1 0 0,0 8,5A1,1 0 0,0 7,4\n       M10,4A1,1 0 0,0 9,5A1,1 0 0,0 10,6A1,1 0 0,0 11,5A1,1 0 0,0 10,4\n       M12,8A6,6 0 0,0 6,14A6,6 0 0,0 12,20A6,6 0 0,0 18,14A6,6 0 0,0 12,8Z\" />\n\n  <!-- animated inner swirl -->\n  <path\n    class=\"swirl\"\n    fill=\"currentColor\"\n    d=\"M14.83,11.17\n       C16.39,12.73 16.39,15.27 14.83,16.83\n       C13.27,18.39 10.73,18.39 9.17,16.83\n       L14.83,11.17\" />\n</svg>", An = [
	{
		name: "Fan",
		file: "fan.svg",
		tags: ["bathroom", "fan"]
	},
	{
		name: "Garage Door Closed",
		file: "garage-door_closed.svg",
		tags: ["garage", "door"]
	},
	{
		name: "Garage Door Open",
		file: "garage-door_open.svg",
		tags: ["garage", "door"]
	},
	{
		name: "Motion Detected",
		file: "motion_detected.svg",
		tags: ["motion", "sensor"]
	},
	{
		name: "No Motion",
		file: "motion_off.svg",
		tags: ["motion", "sensor"]
	},
	{
		name: "Shutter Opening",
		file: "shutter-opening.svg",
		revision: "3bfde376",
		tags: [
			"cover",
			"shade",
			"shutter",
			"opening"
		]
	},
	{
		name: "Shutter Closing",
		file: "shutter-closing.svg",
		revision: "458fb44b",
		tags: [
			"cover",
			"shade",
			"shutter",
			"closing"
		]
	},
	{
		name: "Shower On",
		file: "shower_on.svg",
		tags: ["bathroom", "water"]
	},
	{
		name: "Shower Off",
		file: "shower_off.svg",
		tags: ["bathroom", "water"]
	},
	{
		name: "Washing Machine Running",
		file: "washing-machine-running.svg",
		tags: ["kitchen", "washing"]
	}
], jn = Object.freeze({
	"fan.svg": yn,
	"garage-door_closed.svg": bn,
	"garage-door_open.svg": xn,
	"motion_detected.svg": Sn,
	"motion_off.svg": Cn,
	"motion_on.svg": wn,
	"shower_off.svg": Tn,
	"shower_on.svg": En,
	"shutter-closing.svg": Dn,
	"shutter-opening.svg": On,
	"washing-machine-running.svg": kn
});
function Mn(e) {
	return e?.startsWith("orbit:") && jn[decodeURIComponent(e.slice(6).split("?")[0])] || "";
}
//#endregion
//#region src/common/helpers/icons.js
function Nn(e, t = "") {
	return I(e) ? L.call(this, e, t) || "" : e || "";
}
function Pn(e, t) {
	let n = R.call(this, this._config.color || "theme");
	return t ? n === "light" ? this._getEntityColor(e) || this._computeFullColor("theme") : this._computeFullColor(n) : this._computeIconColor(n);
}
function Fn(e) {
	if (!e) return null;
	let t = e.entity_id?.split(".")[0], n = e.attributes || {};
	if (t === "light") {
		if (Array.isArray(n.rgb_color)) {
			let [e, t, r] = n.rgb_color;
			return `rgb(${e}, ${t}, ${r})`;
		}
		if (Array.isArray(n.hs_color)) {
			let [e, t] = n.hs_color;
			return `hsl(${e}, ${t}%, 50%)`;
		}
	}
	return null;
}
function In(e) {
	if (!e) return !1;
	let t = e.split("?")[0].toLowerCase();
	return t.endsWith(".svg") || t.endsWith(".png") || t.endsWith(".webp") || t.endsWith(".gif");
}
function Ln(e) {
	return e ? e.startsWith("orbit:") ? e : e.startsWith("local:") ? `/local/icons/${e.slice(6)}` : e.startsWith("/") || e.startsWith("http") ? e : `/local/icons/${e}` : "";
}
function B(e, t = {}) {
	if (!e) return "";
	let n = t.forceColor !== !1, r = t.animate === !0, i = [
		e,
		n ? "forced" : "auto",
		r ? "animated" : "static"
	].join("::"), a = this.constructor.svgCache, o = a[i];
	if (typeof o == "string" && o !== "loading") return o;
	if (o === "loading") return Vn(i, this), "";
	let s = Mn(e);
	if (s) {
		let e = zn(s, n, r);
		return a[i] = e, e;
	}
	return a[i] = "loading", Vn(i, this), Un(e).then((e) => {
		if (!e.ok) throw Error(`HTTP ${e.status}`);
		return e.text();
	}).then((e) => {
		e = zn(e, n, r), a[i] = e, Hn(i);
	}).catch((t) => {
		console.error("SVG load failed:", e, t), delete a[i], Hn(i);
	}), "";
}
function Rn(e, t) {
	return !e || !t ? !0 : e[`${t}_svg_color_override`] !== !1;
}
function zn(e, t, n = !1) {
	let r = e.replace(/<svg\b[^>]*>/i, (e) => {
		let t = e.replace(/\swidth="[^"]*"/i, " width=\"100%\"").replace(/\sheight="[^"]*"/i, " height=\"100%\"");
		return n && (t = t.replace(/^<svg\b/i, "<svg data-orbit-animate=\"true\"")), t;
	});
	return t ? r.replace(/fill="(?!none|transparent|currentColor|inherit|initial|unset|url\()[^"]*"/gi, "fill=\"currentColor\"").replace(/stroke="(?!none|transparent|currentColor|inherit|initial|unset|url\()[^"]*"/gi, "stroke=\"currentColor\"").replace(/fill:\s*(?!none|transparent|currentColor|inherit|initial|unset|url\()[^;"]+/gi, "fill:currentColor").replace(/stroke:\s*(?!none|transparent|currentColor|inherit|initial|unset|url\()[^;"]+/gi, "stroke:currentColor") : r;
}
var Bn = {};
function Vn(e, t) {
	t && (Bn[e] = Bn[e] || /* @__PURE__ */ new Set(), Bn[e].add(t));
}
function Hn(e) {
	let t = Bn[e];
	t && (delete Bn[e], requestAnimationFrame(() => {
		t.forEach((e) => {
			e.isConnected && e.requestUpdate();
		});
	}));
}
function Un(e) {
	return fetch(e).then((t) => t.ok ? t : fetch(e, { cache: "reload" }));
}
//#endregion
//#region src/common/helpers/long-press.js
function Wn(e, t, n) {
	n && (e.stopPropagation(), this._cancelLongPress(), this._longPressTriggered = !1, this._longPressTimer = setTimeout(() => {
		this._longPressTriggered = !0, this._handleAction(n, t);
	}, this._LONG_PRESS_DELAY));
}
function Gn() {
	this._longPressTimer &&= (clearTimeout(this._longPressTimer), null);
}
function Kn(e) {
	return this._cancelLongPress(), this._longPressTriggered ? (e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation && e.stopImmediatePropagation(), !0) : !1;
}
//#endregion
//#region src/common/helpers/updates.js
function qn(e, t, n = {}) {
	if (!e.has("hass") || e.has("_config") || [...e.keys()].some((e) => e !== "hass") || n.hasTemplates) return !0;
	let r = e.get("hass"), i = this.hass;
	if (!r || !i) return !0;
	let a = [...new Set(t.filter(Boolean))];
	return !a.length && !n.includeZones ? !1 : a.some((e) => r.states?.[e] !== i.states?.[e]) ? !0 : n.includeZones ? Yn(r, i) : !1;
}
function Jn(e) {
	return Object.entries(e || {}).some(([e, t]) => e.endsWith("_template") ? !0 : typeof t == "string" ? I(t) : t && typeof t == "object" ? Jn(t) : !1);
}
function Yn(e, t) {
	return [...new Set([...Object.keys(e.states || {}), ...Object.keys(t.states || {})].filter((e) => e.startsWith("zone.")))].some((n) => e.states?.[n] !== t.states?.[n]);
}
//#endregion
//#region src/common/helpers/suggestions.js
function Xn(e = "") {
	return e.split(".")[0] || "";
}
function Zn(e, t) {
	let n = e?.entities?.[t];
	if (n?.area_id) return n.area_id;
	let r = n?.device_id;
	return r && e?.devices?.[r]?.area_id || "";
}
function Qn(e, t) {
	let n = e?.states?.[t]?.state;
	return n !== "" && Number.isFinite(Number(n));
}
//#endregion
//#region src/common/helpers/svg-cache.js
var V = {}, $n = {
	automation: "automation.trigger",
	button: "button.press",
	input_button: "input_button.press",
	scene: "scene.turn_on",
	script: "script.turn_on"
}, er = new Set([
	"alarm_control_panel",
	"climate",
	"cover",
	"fan",
	"humidifier",
	"input_boolean",
	"light",
	"lock",
	"media_player",
	"remote",
	"siren",
	"switch",
	"vacuum",
	"water_heater"
]);
function tr(e, t = "more-info") {
	let n = e?.split(".")[0];
	if (!n) return { action: t };
	let r = $n[n];
	return r ? {
		action: "call-service",
		service: r,
		service_data: { entity_id: e }
	} : er.has(n) ? { action: "toggle" } : { action: t };
}
//#endregion
//#region src/cards/area/helpers/lifecycle.js
function nr(e) {
	if (!e.has("_config") && !e.has("hass") && !e.has("_templateRevision")) return;
	this._cardName = this._getCardName("");
	let t = this._config.main_entity || this._config.entity, n = this._config.area, r = t && this.hass ? this.hass.states[t] : null, i = this._config?.state_template, a = this._evaluateStateTemplate(i, t), o = i ? mt(a, t?.split(".")[0] || "") : r ? this._getEntityActiveState(r) : !1;
	this._iconColor = this._getMainIconColor(r, o);
	let s = this._config.icon_on, c = this._config.icon_off, l = Cr(this._config, n, t), u = Nn.call(this, this._config.icon, t), d = ["custom", "template"].includes(l), f = n && this.hass?.areas?.[n] && this.hass.areas[n].icon || "mdi:sofa", p = l === "template" ? u : d && ((o ? s : c) || u) || "";
	this._mainStateObj = r, this._useNativeMainIcon = !!r && l !== "area" && l !== "template" && !p;
	let m = l === "template" && u ? "icon" : d && o && s ? "icon_on" : d && !o && c ? "icon_off" : d && u ? "icon" : "";
	this._icon = p || f, this._iconSvgForceColor = m ? this._getSvgColorOverride(m) : !0, this._statusItems = rr.call(this), this._buttonModels = sr.call(this), this._curveButtonModels = cr.call(this), this._actionButtonModel = lr.call(this);
}
function rr() {
	return [
		1,
		2,
		3
	].map((e) => {
		let t = this._config[`status${e}`];
		if (!t) return null;
		let n = this.hass?.states[t], r = `status${e}`, i = ar.call(this, r, t), a = Nn.call(this, this._config[`${r}_icon`], t), o = ["custom", "template"].includes(i) ? a : "";
		return {
			entityId: t,
			stateObj: n,
			useStateIcon: i === "entity" && !!n,
			text: or.call(this, n, this._config[`status${e}_decimal_places`]),
			icon: o,
			iconPath: this._isImageIcon(o) ? this._resolveIconPath(o) : "",
			isImage: this._isImageIcon(o),
			isHaIcon: ir(o)
		};
	}).filter(Boolean);
}
function ir(e) {
	return /^[a-z0-9_-]+:/i.test(e || "");
}
function ar(e, t = "") {
	let n = this._config?.[`${e}_icon_source`], r = !!(t || this._config?.[e]);
	return n === "custom" ? "custom" : n === "template" ? "template" : n === "none" ? "none" : n === "entity" && r ? "entity" : this._config?.[`${e}_icon`] ? "custom" : "none";
}
function or(e, t) {
	if (!e) return "—";
	if (t === void 0 || t === "") return this.formatState(e);
	let n = Number(t), r = Number(e.state);
	if (!Number.isFinite(n) || !Number.isFinite(r)) return this.formatState(e);
	let i = e.attributes.unit_of_measurement || "";
	return `${r.toFixed(Math.max(0, n))}${i}`;
}
function sr() {
	return [
		this._config.button1,
		this._config.button2,
		this._config.button3,
		this._config.button4
	].filter(Boolean).map((e, t) => ur.call(this, "button", e, t, {
		defaultAction: { action: "toggle" },
		defaultHoldAction: { action: "more-info" },
		getIconColor: gr,
		getBackgroundColor: hr
	})).filter(Boolean);
}
function cr() {
	let e = this._config?.curve_buttons_lock_position ?? !1, t = [
		this._config.curve_button1,
		this._config.curve_button2,
		this._config.curve_button3,
		this._config.curve_button4,
		this._config.curve_button5,
		this._config.curve_button6
	], n = t.filter(Boolean);
	return t.map((t, r) => {
		if (!e && !t) return null;
		if (e && !t) return {
			empty: !0,
			position: r
		};
		let i = ur.call(this, "curve_button", t, r, {
			defaultAction: { action: "more-info" },
			defaultHoldAction: null,
			getIconColor: yr,
			getBackgroundColor: null
		});
		return i ? (i.position = e ? r : n.indexOf(t), i) : null;
	}).filter(Boolean);
}
function lr() {
	let e = this._config.action_button;
	return e ? ur.call(this, "action_button", e, 0, {
		key: "action_button",
		defaultAction: tr(e),
		defaultHoldAction: null,
		getIconColor: br,
		getBackgroundColor: null
	}) : null;
}
function ur(e, t, n, r) {
	let i = this.hass?.states[t];
	if (!i) return null;
	let a = r.key || `${e}${n + 1}`, o = this._config?.[`${a}_state_template`], s = this._evaluateStateTemplate(o, t), c = t.split(".")[0], l = o ? mt(s, c) : dr.has(c) ? !1 : this._getEntityActiveState(i), u = mr.call(this, a, t), d = pr.call(this, a, l), f = this._isImageIcon(d), p = this._buttonIconStates?.get(a), m = !!(p && p.entityId === t && p.isOn !== l);
	return this._buttonIconStates ||= /* @__PURE__ */ new Map(), this._buttonIconStates.set(a, {
		entityId: t,
		isOn: l
	}), {
		entityId: t,
		stateObj: i,
		useStateIcon: !!i && (u === "entity" || u !== "template" && !d),
		holdAction: this._config?.[`${a}_hold_action`] || r.defaultHoldAction,
		doubleTapAction: this._config?.[`${a}_double_tap_action`] || null,
		tapAction: this._config?.[`${a}_tap_action`] || r.defaultAction,
		backgroundColor: r.getBackgroundColor ? r.getBackgroundColor.call(this, a, i, l) : "",
		icon: d,
		iconColor: r.getIconColor.call(this, a, i, l),
		iconPath: f ? this._resolveIconPath(d) : "",
		svgForceColor: fr.call(this, a, l),
		animateIcon: m,
		isImage: f
	};
}
var dr = new Set(/* @__PURE__ */ "ai_task.button.conversation.date.datetime.event.image.infrared.input_button.input_datetime.input_number.input_select.input_text.notify.number.radio_frequency.scene.select.sensor.stt.tag.text.time.tts.wake_word.weather".split("."));
function fr(e, t) {
	let n = mr.call(this, e);
	if (!["custom", "template"].includes(n)) return !0;
	let r = this._config?.[`${e}_icon`], i = n === "template" ? r ? `${e}_icon` : "" : t && this._config?.[`${e}_icon_on`] ? `${e}_icon_on` : !t && this._config?.[`${e}_icon_off`] ? `${e}_icon_off` : r ? `${e}_icon` : "";
	return i ? this._getSvgColorOverride(i) : !0;
}
function pr(e, t) {
	let n = this._config?.[`${e}_icon_on`], r = this._config?.[`${e}_icon_off`], i = mr.call(this, e), a = Nn.call(this, this._config?.[`${e}_icon`], this._config?.[e] || "");
	return i === "entity" ? "" : i === "template" ? a : (t ? n : r) || a || "";
}
function mr(e, t = "") {
	let n = this._config?.[`${e}_icon_source`], r = !!(t || this._config?.[e]);
	return n === "custom" ? "custom" : n === "template" ? "template" : n === "entity" && r ? "entity" : this._config?.[`${e}_icon`] || this._config?.[`${e}_icon_on`] || this._config?.[`${e}_icon_off`] ? "custom" : "entity";
}
function hr(e, t, n) {
	if (n) return this._computeButtonBackground(_r.call(this, e, t));
	let r = R.call(this, xr.call(this, e, !1));
	return !r || r === "theme" ? "rgba(var(--color-theme),0.05)" : zt.call(this, r, 10);
}
function gr(e, t, n) {
	if (n) return this._computeFullColor(_r.call(this, e, t));
	let r = R.call(this, xr.call(this, e, !1));
	return r.startsWith("rgba(") ? r : this._computeIconColor(r);
}
function _r(e, t) {
	let n = R.call(this, xr.call(this, e, !0));
	return n === "light" ? this._getEntityColor(t) || this._config.color || "theme" : n;
}
function vr(e, t, n) {
	let r = R.call(this, this._config.color || "theme");
	return r === "theme" ? n ? "rgba(var(--color-theme),0.7)" : "rgba(var(--color-theme),0.2)" : n ? this._computeFullColor(r) : zt.call(this, r, 40);
}
function yr(e, t, n) {
	let r = xr.call(this, e, n, ""), i = R.call(this, r);
	return i && i !== "theme" ? Sr.call(this, e, t, n, i) : vr.call(this, e, t, n);
}
function br(e, t, n) {
	let r = xr.call(this, e, n, ""), i = R.call(this, r);
	return i && i !== "theme" ? Sr.call(this, e, t, n, i) : vr.call(this, e, t, n);
}
function xr(e, t, n = "theme") {
	return this._config?.[`${e}_color_source`] === "template" ? this._config?.[`${e}_color`] || n : this._config?.[`${e}_color_${t ? "on" : "off"}`] || n;
}
function Sr(e, t, n, r) {
	return n ? gr.call(this, e, t, !0) : r.startsWith("rgba(") ? r : zt.call(this, r, 40);
}
function Cr(e = {}, t, n) {
	let r = e.icon_source, i = !!t, a = !!n;
	return r === "custom" ? r : r === "template" ? "template" : r === "area" && i ? "area" : r === "entity" && a ? "entity" : i ? "area" : a ? "entity" : "area";
}
//#endregion
//#region node_modules/lit-html/directive.js
var wr = {
	ATTRIBUTE: 1,
	CHILD: 2,
	PROPERTY: 3,
	BOOLEAN_ATTRIBUTE: 4,
	EVENT: 5,
	ELEMENT: 6
}, Tr = (e) => (...t) => ({
	_$litDirective$: e,
	values: t
}), Er = class {
	constructor(e) {}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AT(e, t, n) {
		this._$Ct = e, this._$AM = t, this._$Ci = n;
	}
	_$AS(e, t) {
		return this.update(e, t);
	}
	update(e, t) {
		return this.render(...t);
	}
}, Dr = class extends Er {
	constructor(e) {
		if (super(e), this.it = O, e.type !== wr.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
	}
	render(e) {
		if (e === O || e == null) return this._t = void 0, this.it = e;
		if (e === D) return e;
		if (typeof e != "string") throw Error(this.constructor.directiveName + "() called with a non-string value");
		if (e === this.it) return this._t;
		this.it = e;
		let t = [e];
		return t.raw = t, this._t = {
			_$litType$: this.constructor.resultType,
			strings: t,
			values: []
		};
	}
};
Dr.directiveName = "unsafeHTML", Dr.resultType = 1;
var H = Tr(Dr);
//#endregion
//#region src/cards/area/renders/buttons.js
function Or(e) {
	return e ? E`
      <button
        class="entity-button"
        style="background:${e.backgroundColor};"
        @click=${this._handleButtonClick}
        @dblclick=${this._handleButtonDoubleClick}

        @pointerdown=${this._handleButtonPointerDown}

        @pointerup=${this._finishLongPress}
        @pointerleave=${this._cancelLongPress}
        @pointercancel=${this._cancelLongPress}

        .dataEntity=${e.entityId}
        .dataAction=${e.tapAction}
        .dataHoldAction=${e.holdAction}
        .dataDoubleAction=${e.doubleTapAction}
      >
        ${e.isImage ? E`
              <div
                class="button-image-icon"
                style="color:${e.iconColor};"
              >
                ${e.iconPath ? H(this._getInlineSvg(e.iconPath, e.svgForceColor, e.animateIcon)) : ""}
              </div>
            ` : e.useStateIcon && e.stateObj ? E`
                <ha-state-icon
                  .stateObj=${e.stateObj}
                  style="color:${e.iconColor};"
                ></ha-state-icon>
              ` : E`
              <ha-icon
                .icon=${e.icon}
                style="color:${e.iconColor};"
              ></ha-icon>
            `}
        ${st(e.stateObj) ? E`
              <ha-tile-badge
                class="entity-unavailable-badge"
                title=${this._t("Unavailable")}
                aria-label=${this._t("Unavailable")}
              >
                <ha-icon .icon=${"mdi:exclamation-thick"}></ha-icon>
              </ha-tile-badge>
            ` : ""}
      </button>
    ` : null;
}
//#endregion
//#region src/cards/area/renders/area-card.js
function kr() {
	let e = this._buttonModels || [], t = this._isImageIcon(this._icon) ? this._resolveIconPath(this._icon) : "", n = t ? this._getInlineSvg(t, this._iconSvgForceColor) : "";
	return E`
    <ha-card
      tabindex="0"
      @click=${this._handleTap}
      @dblclick=${this._handleCardDoubleTap}
      @pointerdown=${this._handleCardPointerDown}
      @pointerup=${this._finishLongPress}
      @pointerleave=${this._cancelLongPress}
      @pointercancel=${this._cancelLongPress}
    >
      <div class="container">
        <div class="content">

            <div class="header ${e.length >= 3 ? "compressed" : ""}">
              <div class="card-name" style="color:${this._areaColor}">
                ${this._cardName}
            </div>

            <div class="status" style="color:${this._statusColor}">
              ${Ar.call(this)}
            </div>
          </div>

          ${e.length ? E`
                <div class="button-column" style="--button-count:${e.length}">
                  ${e.map((e) => this._renderButtons(e))}
                </div>
              ` : ""}

        </div>

        <div
          class="circle"
          style="background:${this._circleColor}"

          @pointerdown=${this._handleMainEntityPointerDown}

          @pointerup=${this._finishLongPress}
          @pointerleave=${this._cancelLongPress}
          @pointercancel=${this._cancelLongPress}
        >

          ${this._renderCurveButtons()}

          <div class="main-icon-badge-anchor">
            ${this._isImageIcon(this._icon) ? E`
                  <div
                    class="main-image-icon"
                    style="color:${this._iconColor};"
                  >
                    ${n ? H(n) : E`<img src=${t} alt="" />`}
                  </div>
                ` : this._useNativeMainIcon && this._mainStateObj ? E`
                    <ha-state-icon
                      class="main-icon"
                      .stateObj=${this._mainStateObj}
                      style="color:${this._iconColor}"
                    ></ha-state-icon>
                  ` : E`
                  <ha-icon
                    class="main-icon"
                    .icon=${this._icon}
                    style="color:${this._iconColor}"
                  ></ha-icon>
                `}

            ${st(this._mainStateObj) ? E`
                  <ha-tile-badge
                    class="entity-unavailable-badge"
                    title=${this._t("Unavailable")}
                    aria-label=${this._t("Unavailable")}
                  >
                    <ha-icon .icon=${"mdi:exclamation-thick"}></ha-icon>
                  </ha-tile-badge>
                ` : ""}
          </div>

        </div>

      </div>
    </ha-card>
  `;
}
function Ar() {
	let e = this._statusItems || [];
	if (!e.length) return this._statusText || "";
	let t = this._config?.status_separator || "|";
	return e.map((e, n) => E`
    ${n > 0 ? E`
          <span class="status-separator">
            ${t}
          </span>
        ` : ""}
    <span class="status-item">
      ${jr.call(this, e)}
      <span>${e.text}</span>
    </span>
  `);
}
function jr(e) {
	return !e.icon && !e.useStateIcon ? "" : e.isImage ? E`
      <span class="status-prefix-icon status-prefix-image">
        ${e.iconPath ? H(this._getInlineSvg(e.iconPath, !0)) : ""}
      </span>
    ` : e.useStateIcon && e.stateObj ? E`
      <ha-state-icon
        class="status-prefix-icon"
        .stateObj=${e.stateObj}
      ></ha-state-icon>
    ` : e.isHaIcon ? E`
      <ha-icon
        class="status-prefix-icon"
        .icon=${e.icon}
      ></ha-icon>
    ` : E`
    <span class="status-prefix-text">
      ${e.icon}
    </span>
  `;
}
//#endregion
//#region node_modules/lit-html/directive-helpers.js
var { I: Mr } = Fe, Nr = (e) => e, Pr = () => document.createComment(""), Fr = (e, t, n) => {
	let r = e._$AA.parentNode, i = t === void 0 ? e._$AB : t._$AA;
	if (n === void 0) n = new Mr(r.insertBefore(Pr(), i), r.insertBefore(Pr(), i), e, e.options);
	else {
		let t = n._$AB.nextSibling, a = n._$AM, o = a !== e;
		if (o) {
			let t;
			n._$AQ?.(e), n._$AM = e, n._$AP !== void 0 && (t = e._$AU) !== a._$AU && n._$AP(t);
		}
		if (t !== i || o) {
			let e = n._$AA;
			for (; e !== t;) {
				let t = Nr(e).nextSibling;
				Nr(r).insertBefore(e, i), e = t;
			}
		}
	}
	return n;
}, Ir = (e, t, n = e) => (e._$AI(t, n), e), Lr = {}, Rr = (e, t = Lr) => e._$AH = t, zr = (e) => e._$AH, Br = (e) => {
	e._$AR(), e._$AA.remove();
}, Vr = (e, t, n) => {
	let r = /* @__PURE__ */ new Map();
	for (let i = t; i <= n; i++) r.set(e[i], i);
	return r;
}, Hr = Tr(class extends Er {
	constructor(e) {
		if (super(e), e.type !== wr.CHILD) throw Error("repeat() can only be used in text expressions");
	}
	dt(e, t, n) {
		let r;
		n === void 0 ? n = t : t !== void 0 && (r = t);
		let i = [], a = [], o = 0;
		for (let t of e) i[o] = r ? r(t, o) : o, a[o] = n(t, o), o++;
		return {
			values: a,
			keys: i
		};
	}
	render(e, t, n) {
		return this.dt(e, t, n).values;
	}
	update(e, [t, n, r]) {
		let i = zr(e), { values: a, keys: o } = this.dt(t, n, r);
		if (!Array.isArray(i)) return this.ut = o, a;
		let s = this.ut ??= [], c = [], l, u, d = 0, f = i.length - 1, p = 0, m = a.length - 1;
		for (; d <= f && p <= m;) if (i[d] === null) d++;
		else if (i[f] === null) f--;
		else if (s[d] === o[p]) c[p] = Ir(i[d], a[p]), d++, p++;
		else if (s[f] === o[m]) c[m] = Ir(i[f], a[m]), f--, m--;
		else if (s[d] === o[m]) c[m] = Ir(i[d], a[m]), Fr(e, c[m + 1], i[d]), d++, m--;
		else if (s[f] === o[p]) c[p] = Ir(i[f], a[p]), Fr(e, i[d], i[f]), f--, p++;
		else if (l === void 0 && (l = Vr(o, p, m), u = Vr(s, d, f)), l.has(s[d])) if (l.has(s[f])) {
			let t = u.get(o[p]), n = t === void 0 ? null : i[t];
			if (n === null) {
				let t = Fr(e, i[d]);
				Ir(t, a[p]), c[p] = t;
			} else c[p] = Ir(n, a[p]), Fr(e, i[d], n), i[t] = null;
			p++;
		} else Br(i[f]), f--;
		else Br(i[d]), d++;
		for (; p <= m;) {
			let t = Fr(e, c[m + 1]);
			Ir(t, a[p]), c[p++] = t;
		}
		for (; d <= f;) {
			let e = i[d++];
			e !== null && Br(e);
		}
		return this.ut = o, Rr(e, c), D;
	}
});
//#endregion
//#region src/cards/area/renders/curve-buttons.js
function Ur() {
	let e = this._curveButtonModels || [], t = this._actionButtonModel;
	return E`
      <div class="curve-buttons">

        ${Hr(e, (e, t) => t, (e) => e.empty ? E`
              <div class="curve-button pos-${e.position}"></div>
            ` : E`
            <button
              class="curve-button pos-${e.position}"
                @click=${this._handleCurveButtonClick}
                @dblclick=${this._handleCurveButtonDoubleClick}
                @pointerdown=${this._handleButtonPointerDown}

                @pointerup=${this._finishLongPress}
                @pointerleave=${this._cancelLongPress}
                @pointercancel=${this._cancelLongPress}

                .dataEntity=${e.entityId}
                .dataAction=${e.tapAction}
                .dataHoldAction=${e.holdAction}
                .dataDoubleAction=${e.doubleTapAction}
            >
              ${e.isImage ? E`
                    <div
                      class="curve-image-icon"
                      style="color:${e.iconColor};"
                    >
                      ${H(this._getInlineSvg(e.iconPath, e.svgForceColor, e.animateIcon))}
                    </div>
                  ` : e.useStateIcon && e.stateObj ? E`
                      <ha-state-icon
                        .stateObj=${e.stateObj}
                        style="color:${e.iconColor};"
                      ></ha-state-icon>
                    ` : E`
                    <ha-icon
                      .icon=${e.icon}
                      style="color:${e.iconColor};"
                    ></ha-icon>
                  `}
              ${Gr.call(this, e.stateObj)}
            </button>
          `)}

      ${t ? Wr.call(this, t) : ""}

      </div>
    `;
}
function Wr(e) {
	return E`
    <button
      class="curve-button action-button"
        @click=${this._handleCurveButtonClick}
        @dblclick=${this._handleCurveButtonDoubleClick}
        @pointerdown=${this._handleButtonPointerDown}

        @pointerup=${this._finishLongPress}
        @pointerleave=${this._cancelLongPress}
        @pointercancel=${this._cancelLongPress}

        .dataEntity=${e.entityId}
        .dataAction=${e.tapAction}
        .dataHoldAction=${e.holdAction}
        .dataDoubleAction=${e.doubleTapAction}
    >
      ${e.isImage ? E`
            <div
              class="curve-image-icon"
              style="color:${e.iconColor};"
            >
              ${H(this._getInlineSvg(e.iconPath, e.svgForceColor, e.animateIcon))}
            </div>
          ` : e.useStateIcon && e.stateObj ? E`
              <ha-state-icon
                .stateObj=${e.stateObj}
                style="color:${e.iconColor};"
              ></ha-state-icon>
            ` : E`
            <ha-icon
              .icon=${e.icon}
              style="color:${e.iconColor};"
            ></ha-icon>
          `}
      ${Gr.call(this, e.stateObj)}
    </button>
  `;
}
function Gr(e) {
	return st(e) ? E`
        <ha-tile-badge
          class="entity-unavailable-badge"
          title=${this._t("Unavailable")}
          aria-label=${this._t("Unavailable")}
        >
          <ha-icon .icon=${"mdi:exclamation-thick"}></ha-icon>
        </ha-tile-badge>
      ` : "";
}
//#endregion
//#region src/common/styles/header.js
var Kr = d`
  .header {
    width: 100%;
  }

  .card-name {
    font-size: clamp(18px, 9cqw, 34px);
    font-weight: bold;
    line-height: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .status {
    font-size: clamp(13px, 6.7cqw, 26px);
    font-weight: bold;
    opacity: 0.4;
    line-height: 1.1;
    margin-top: clamp(6px, 1.8cqw, 28px);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`, qr = d`
  :host {
    display: block;
  }

  ha-card {
    display: block;
    width: 100%;
    box-sizing: border-box;
    background: var(--ha-card-background, var(--card-background-color, #1a1a1a));
    border-radius: 18px;
    overflow: hidden;
    position: relative;
    cursor: pointer;
    transition: transform 0.2s ease;
    container-type: size;
  }

  ha-card:active {
    transform: scale(0.98);
  }

  .container {
    padding: clamp(14px, 2cqw, 24px);
    height: 100%;
    box-sizing: border-box;
    position: relative;
  }

  .content {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    height: 100%;
  }
`, Jr = d`
  .main-icon {
    --orbit-main-icon-size: 45%;
    --mdc-icon-size: var(--orbit-main-icon-size);
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
  }

  ha-state-icon.main-icon {
    width: var(--orbit-main-icon-size);
    height: var(--orbit-main-icon-size);
    --mdc-icon-size: 100%;
  }

  .main-image-icon {
    width: 45%;
    height: 45%;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    user-select: none;
    position: relative;
  }

  .main-image-icon svg,
  .main-image-icon img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }

  .main-image-icon img {
    object-fit: contain;
    filter: brightness(0) invert(1);
    opacity: 0.8;
  }

  .main-icon-badge-anchor {
    position: relative;
    width: 45%;
    height: 45%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .main-icon-badge-anchor .main-icon {
    --orbit-main-icon-size: 100%;
  }

  .main-icon-badge-anchor ha-state-icon.main-icon,
  .main-icon-badge-anchor .main-image-icon {
    width: 100%;
    height: 100%;
  }

  .entity-unavailable-badge {
    --tile-badge-background-color: var(--orange-color);
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(22%, -22%);
    pointer-events: none;
    z-index: 10;
  }
`, Yr = d`
  .status {
    display: flex;
    align-items: center;
    min-width: 0;
  }

  .status-item {
    display: inline-flex;
    align-items: center;
    min-width: 0;
  }

  .status-separator {
    padding: 0 0.35em;
  }

  .status-prefix-icon {
    --mdc-icon-size: 0.9em;
    width: 0.9em;
    height: 0.9em;
    margin-right: 0.15em;
    flex: none;
  }

  ha-state-icon.status-prefix-icon {
    --mdc-icon-size: 100%;
  }

  .status-prefix-image {
    display: inline-flex;
    color: currentColor;
  }

  .status-prefix-image svg,
  .status-prefix-image img {
    width: 100%;
    height: 100%;
    display: block;
  }

  .status-prefix-text {
    margin-right: 0.15em;
    flex: none;
  }

  .header.compressed {
    width: calc(100% - (var(--button-area-width) - 5px));
  }

  .button-column[style*="--button-count:4"] ~ .header.compressed {
    width: calc(100% - (var(--button-area-width) - 18px));
  }
`, Xr = d`
  ha-card {
    aspect-ratio: 1 / 1;
  }

  .container {
    --button-area-width: clamp(46px, 23.5cqw, 210px);
  }
`, Zr = d`
  .curve-button {
    position: absolute;
    width: 22%;
    border: none;
    outline: none;
    padding: 0;
    margin: 0;
    background: transparent !important;
    box-shadow: none !important;

    display: flex;
    align-items: center;
    justify-content: center;

    pointer-events: auto;
    cursor: pointer;
    z-index: 5;

    transition: transform 0.2s ease;
  }

  .curve-button:hover {
    transform: scale(1.12);
  }

  .curve-button:active {
    transform: scale(0.92);
  }
`, Qr = d`
  .curve-buttons {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 4;
  }
`, $r = d`
  .curve-button ha-icon,
  .curve-button ha-state-icon {
    width: clamp(24px, 13cqw, 78px);
    height: clamp(24px, 13cqw, 78px);
    --mdc-icon-size: 100%;
  }

  .curve-image-icon {
    width: clamp(24px, 13cqw, 78px);
    height: clamp(24px, 13cqw, 78px);

    display: flex;
    align-items: center;
    justify-content: center;

    pointer-events: none;
    user-select: none;
  }

  .curve-image-icon svg {
    width: 100%;
    height: 100%;
  }

  .curve-button.action-button ha-icon,
  .curve-button.action-button ha-state-icon,
  .curve-button.action-button .curve-image-icon {
    width: clamp(30px, 16cqw, 96px);
    height: clamp(30px, 16cqw, 96px);
  }
`, ei = d`
  .curve-button.pos-0 {
    top: 7%;
    left: 17%;
  }

  .curve-button.pos-1 {
    top: 2%;
    left: 37%;
  }

  .curve-button.pos-2 {
    top: 6%;
    right: 20%;
  }

  .curve-button.pos-3 {
    top: 22%;
    right: 4%;
  }

  .curve-button.pos-4 {
    bottom: 38%;
    right: 0%;
  }

  .curve-button.pos-5 {
    bottom: 16%;
    right: 7%;
  }

  .curve-button.action-button {
    top: -12%;
    right: 0%;
    width: 27%;
  }
`, ti = d`
  .entity-button {
    width: min(
      clamp(44px, 26cqw, 250px),
      calc(
        (100cqh - (var(--button-count, 4) - 1) * clamp(10px, 2cqw, 22px)) /
          var(--button-count, 4)
      )
    );

    aspect-ratio: 1 / 1;
    border: none;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: transform 0.2s ease, background 0.2s ease;
    position: relative;
    overflow: visible;
  }

  .entity-button:hover {
    transform: scale(1.05);
  }

  .entity-button:active {
    transform: scale(0.95);
  }

  .entity-button ha-icon {
    --mdc-icon-size: 54%;
  }

  .entity-button ha-state-icon {
    width: 54%;
    height: 54%;
    --mdc-icon-size: 100%;
  }

  .button-image-icon {
    width: 54%;
    height: 54%;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    user-select: none;
  }

  .button-image-icon svg {
    width: 100%;
    height: 100%;
  }
`, ni = d`
  .button-column {
    position: absolute;
    right: -2cqw;
    top: 0;
    bottom: -2cqw;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: var(--button-area-width);
  }

  .button-column[style*="--button-count:1"] {
    justify-content: center;
  }

  .button-column[style*="--button-count:2"] {
    justify-content: space-between;
    padding-top: 35%;
  }

  .button-column[style*="--button-count:3"],
  .button-column[style*="--button-count:4"] {
    justify-content: space-between;
  }
`, ri = [
	qr,
	Kr,
	Jr,
	Xr,
	Yr,
	d`
  .circle {
    position: absolute;
    bottom: -12%;
    left: -12%;
    width: 75%;
    aspect-ratio: 1 / 1;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: visible;
    z-index: 3;
  }
`,
	ti,
	ni,
	Zr,
	Qr,
	$r,
	ei
];
//#endregion
//#region src/common/editor/helpers/icon.js
function U(e, t) {
	return Array.isArray(t) ? ii(e, t.map((t) => U(e, t))) : e._t ? e._t(t) : t;
}
function ii(e, t) {
	return (e?.hass?.locale?.language || e?.hass?.language || "en").toLowerCase().startsWith("en") ? t.map((e, t) => t === 0 ? e : ai(e)).join(" ") : t.join(" ");
}
function ai(e = "") {
	return e.replace(/^(\p{L})/u, (e) => e.toLocaleLowerCase());
}
function oi(e) {
	if (!e) return !1;
	let t = e.split("?")[0].toLowerCase();
	return t.endsWith(".svg") || t.endsWith(".png") || t.endsWith(".gif") || t.endsWith(".webp");
}
function si(e) {
	return e ? e.startsWith("orbit:") ? e : e.startsWith("local:") ? `/local/icons/${e.slice(6)}` : e.startsWith("/") || e.startsWith("http") ? e : `/local/icons/${e}` : "";
}
function ci(e, t, n) {
	let r = this._config?.[t] || "", i = `${this._iconPickerPrefix || "icon"}-${t}`, a = r && this._isImageIcon(r) ? "files" : "ha", o = this._iconPickerKey === i && this._iconPickerTab || a;
	return o === "files" && !this._orbitIconFilesLoading && !this._localIconFilesLoading && !(this._orbitIconFiles || []).length && !(this._localIconFiles || []).length && queueMicrotask(() => this._loadLocalIconFiles?.(r)), E`
    <div class="field">
      ${e ? E`<label>${U(this, e)}</label>` : ""}

      <div
        class="icon-picker-panel"
        @click=${(e) => e.stopPropagation()}
      >
        <div class="icon-tabs">
          <button
            type="button"
            class=${o === "ha" ? "active" : ""}
            aria-label=${U(this, "Icons")}
            title=${U(this, "Icons")}
            @click=${() => {
		this._iconPickerKey = i, this._iconPickerTab = "ha";
	}}
          >
            ${U(this, "Icons")}
          </button>
          <button
            type="button"
            class=${o === "files" ? "active" : ""}
            aria-label=${U(this, "Files")}
            title=${U(this, "Files")}
            @click=${() => {
		this._iconPickerKey = i, this._iconPickerTab = "files", this._loadLocalIconFiles?.(r);
	}}
          >
            ${U(this, "Files")}
          </button>
        </div>

        ${o === "files" ? pi.call(this, t, r) : fi.call(this, t, r)}
      </div>
    </div>
  `;
}
function li({ label: e = "Icon", sourceKey: t = "main_entity_icon_source", entityKey: n = "main_entity", defaultSource: r = "entity", defaultSourceLabel: i = "Entity", areaKey: a = "area", allowArea: o = !1, allowNone: s = !1, customIconKeys: c = [], templateKey: l, legacySourceKey: u, legacyTemplateKeys: d = [], renderCustom: f } = {}) {
	let p = ui(u && this._config?.[t] == null ? {
		...this._config,
		[t]: this._config?.[u]
	} : this._config, {
		sourceKey: t,
		entityKey: n,
		defaultSource: r,
		areaKey: a,
		allowArea: o,
		allowNone: s,
		customIconKeys: c
	}), m = p === "custom", h = p === "template", g = c[0] || "icon", _ = l || `${g}_template`, v = I(this._config?.[g]) ? this._config[g] : "", ee = this._config?.[_] || d.map((e) => this._config?.[e]).find(Boolean) || v, y = [
		s ? {
			label: U(this, "None"),
			value: "none"
		} : null,
		o ? {
			label: U(this, "Area"),
			value: "area"
		} : null,
		{
			label: U(this, i),
			value: r
		},
		{
			label: U(this, "Custom"),
			value: "custom"
		},
		{
			label: U(this, "Template"),
			value: "template"
		}
	].filter(Boolean);
	return E`
    <div class="field main-entity-icon-source-field">
      <div class="field-header">
        <label>${U(this, e)}</label>

        <ha-selector
          class="main-entity-icon-source-selector"
          .hass=${this.hass}
          .selector=${{ button_toggle: { options: y } }}
          .value=${p}
          @value-changed=${(e) => {
		let n = e.detail.value || (s ? "none" : "custom");
		_ === g && p !== n && [p, n].includes("template") && this._handleConfigUpdate(g, ""), _ !== g && p === "template" && n !== "template" && v && (this._handleConfigUpdate(_, v), this._handleConfigUpdate(g, "")), this._handleConfigUpdate(t, n);
	}}
        ></ha-selector>
      </div>

      ${m && f ? f.call(this) : ""}
      ${h ? E`
            <div class="field icon-source-template-field">
              <ha-selector
                .hass=${this.hass}
                .selector=${{ template: {} }}
                .value=${ee}
                @value-changed=${(e) => {
		v && this._handleConfigUpdate(g, ""), this._handleConfigUpdate(_, e.detail.value || "");
	}}
              ></ha-selector>
            </div>
          ` : ""}
    </div>
  `;
}
function ui(e = {}, { sourceKey: t = "main_entity_icon_source", entityKey: n = "main_entity", defaultSource: r = "entity", areaKey: i = "area", allowArea: a = !1, allowNone: o = !1, customIconKeys: s = [] } = {}) {
	let c = e[t], l = a && !!e[i], u = !!(e[n] || e.entity), d = r === "domain" ? !!e.domain : u, f = s.some((t) => !!e[t]);
	if (c === "custom") return "custom";
	if (c === "template") return "template";
	if (c === "none" && o) return "none";
	if (c === "area" && l) return "area";
	if (c === r && d) return r;
	if (a) {
		if (l) return "area";
		if (u) return "entity";
	}
	return f ? "custom" : o ? "none" : d ? r : a ? "area" : r;
}
async function di(e = "") {
	let t = Mi(e);
	this._localIconFilesLoading = !0, this._orbitIconFilesLoading = !0, this.requestUpdate();
	let [n, r] = await Promise.all([Ti(), Ei()]);
	this._orbitIconFiles = Pi(n), this._localIconFiles = Pi([t?.source === "local" || !t?.source ? t : null, ...r]), this._orbitIconFilesLoading = !1, this._localIconFilesLoading = !1, this.requestUpdate();
}
function fi(e, t) {
	return E`
    <ha-icon-picker
      .hass=${this.hass}
      .value=${t && !this._isImageIcon(t) ? t : ""}
      @value-changed=${(t) => {
		this._handleConfigUpdate(e, t.detail.value || "");
	}}
    ></ha-icon-picker>
  `;
}
function pi(e, t) {
	let n = this._orbitIconFiles || [], r = this._localIconFiles || [], i = mi([...n, ...r]);
	return this._orbitIconFilesLoading || this._localIconFilesLoading ? E`
      <div class="icon-picker-note">${U(this, "Loading files...")}</div>
    ` : !n.length && !r.length ? E`
      <div class="icon-picker-note">
        ${U(this, "No files found. Add a local icon manifest at /local/icons/manifest.json or type the filename manually.")}
      </div>
    ` : E`
    <ha-generic-picker
      .value=${t && this._isImageIcon(t) ? t : ""}
      .getItems=${(e) => gi(i, e)}
      .rowRenderer=${(e) => _i.call(this, e)}
      .valueRenderer=${(e) => vi.call(this, i.find((t) => t.id === e))}
      .notFoundLabel=${U(this, "No matching files")}
      .emptyLabel=${""}
      .noSort=${!0}
      @value-changed=${(t) => {
		t.stopPropagation(), this._handleConfigUpdate(e, t.detail.value || "");
	}}
    ></ha-generic-picker>
  `;
}
function mi(e) {
	return Pi(e).map((e) => {
		let t = Ni(e), n = hi(e);
		return {
			id: t,
			primary: n,
			sorting_label: n,
			iconFile: e,
			search_labels: {
				label: n,
				file: e.file || "",
				name: e.name || "",
				value: t
			}
		};
	});
}
function hi(e) {
	return `${e.source ? `${e.source}:` : ""}${(e.name || e.file || "").trim().replace(/\s+/g, "-")}`;
}
function gi(e, t = "") {
	let n = t.trim().toLowerCase();
	return n ? e.filter((e) => Object.values(e.search_labels || {}).some((e) => String(e).toLowerCase().includes(n))) : e;
}
function _i(e) {
	return E`
    <ha-combo-box-item type="button" compact>
      ${yi.call(this, e)}
      <span slot="headline">${e.primary}</span>
    </ha-combo-box-item>
  `;
}
function vi(e) {
	return e ? E`
    ${yi.call(this, e)}
    <span slot="headline">${e.primary}</span>
  ` : "";
}
function yi(e) {
	return e?.iconFile ? E`
    <span
      slot="start"
      class="file-picker-preview"
      style=${xi()}
    >
      ${bi.call(this, e.iconFile)}
    </span>
  ` : "";
}
function bi(e) {
	let t = Ni(e), n = this._resolveIconPath(t);
	if (!n) return E``;
	let r = this._getInlineSvg ? this._getInlineSvg(n) : "", i = this.hass?.themes?.darkMode ?? this.hass?.selectedTheme?.dark ?? !1, a = xi(), o = Si(i);
	return E`
    <span
      class="file-picker-preview-inner"
      style=${a}
    >
      ${r ? E`${H(Ci(r))}` : E`
            <img
              class=${i ? "dark" : ""}
              src=${n}
              alt=""
              width="24"
              height="24"
              style=${o}
              loading="eager"
              decoding="sync"
              fetchpriority="high"
            />
          `}
    </span>
  `;
}
function xi() {
	return [
		"display:inline-flex",
		"flex:0 0 24px",
		"width:24px !important",
		"height:24px !important",
		"min-width:24px !important",
		"min-height:24px !important",
		"max-width:24px !important",
		"max-height:24px !important",
		"align-items:center",
		"justify-content:center",
		"overflow:hidden",
		"line-height:0",
		"box-sizing:border-box",
		"contain:layout paint",
		"color:var(--secondary-text-color)"
	].join(";");
}
function Si(e) {
	return [
		"display:block",
		"flex:none",
		"width:24px !important",
		"height:24px !important",
		"min-width:24px !important",
		"min-height:24px !important",
		"max-width:24px !important",
		"max-height:24px !important",
		"object-fit:contain",
		"box-sizing:border-box",
		"overflow:hidden",
		e ? "filter:brightness(0) invert(72%)" : "filter:brightness(0) opacity(72%)"
	].join(";");
}
function Ci(e) {
	if (!e) return "";
	let t = wi(e.replace(/<\?xml[^>]*>/gi, "").trim()), n = t.match(/<svg\b[^>]*>/i)?.[0];
	if (!n) return t;
	let r = [
		"display:block",
		"flex:none",
		"width:24px !important",
		"height:24px !important",
		"min-width:24px !important",
		"min-height:24px !important",
		"max-width:24px !important",
		"max-height:24px !important",
		"overflow:hidden",
		"box-sizing:border-box",
		"color:var(--secondary-text-color)",
		"vertical-align:middle",
		"pointer-events:none"
	].join(";"), i = n.replace(/\swidth=(["'])[^"']*\1/gi, "").replace(/\sheight=(["'])[^"']*\1/gi, "").replace(/\sstyle=(["'])[^"']*\1/gi, "").replace(/\spreserveAspectRatio=(["'])[^"']*\1/gi, "");
	return i = i.replace(/^<svg\b/i, `<svg width="24" height="24" preserveAspectRatio="xMidYMid meet" focusable="false" aria-hidden="true" style="${r}"`), t.replace(n, i);
}
function wi(e) {
	let t = "(?!none\\b|currentColor\\b|transparent\\b|inherit\\b|url\\()(?:rgb\\([^)]*\\)|rgba\\([^)]*\\)|hsl\\([^)]*\\)|hsla\\([^)]*\\)|[^\"';)]+)";
	return e.replace(RegExp(`\\s(fill|stroke)=(["'])${t}\\2`, "gi"), (e, t) => ` ${t}="currentColor"`).replace(RegExp(`(fill|stroke)\\s*:\\s*${t}`, "gi"), (e, t) => `${t}:currentColor`);
}
async function Ti() {
	return An.filter(Ai).map((e) => ji(e, "orbit"));
}
async function Ei() {
	let e = Array.isArray(window.ORBIT_ICON_FILES) ? window.ORBIT_ICON_FILES : [], t = await Di([
		"/local/icons/manifest.json",
		"/local/icons/orbit-icons.json",
		"/local/icons/icons.json"
	]), n = await Oi();
	return [
		...e,
		...t,
		...n
	].filter(Ai).map((e) => ji(e, "local"));
}
async function Di(e) {
	for (let t of e) try {
		let e = await fetch(t, { cache: "no-store" });
		if (!e.ok) continue;
		let n = await e.json(), r = Array.isArray(n) ? n : n.files;
		if (Array.isArray(r)) return r.filter(Ai).map((e) => ji(e));
	} catch {}
	return [];
}
async function Oi() {
	try {
		let e = await fetch("/local/icons/", { cache: "no-store" });
		return e.ok ? [...(await e.text()).matchAll(/href=["']([^"']+)["']/gi)].map((e) => e[1]) : [];
	} catch {
		return [];
	}
}
function ki(e) {
	return e ? (typeof e == "object" ? e.file : e).toString().split("?")[0].split("/").pop() : "";
}
function Ai(e) {
	return oi(ki(e));
}
function ji(e, t = "") {
	let n = ki(e);
	return n ? {
		file: n,
		name: typeof e == "object" && e.name || n,
		tags: Array.isArray(e?.tags) ? e.tags : [],
		source: e?.source || t
	} : null;
}
function Mi(e) {
	if (!e || !Ai(e)) return null;
	let t = ki(e);
	return t ? {
		file: t,
		name: t,
		tags: [],
		source: e?.toString().startsWith("orbit:") ? "orbit" : e?.toString().startsWith("local:") ? "local" : ""
	} : null;
}
function Ni(e) {
	return e.source === "orbit" ? `orbit:${e.file}` : e.source === "local" ? `local:${e.file}` : e.file;
}
function Pi(e) {
	let t = /* @__PURE__ */ new Set();
	return e.filter(Boolean).filter((e) => {
		let n = `${e.source || ""}:${e.file}`;
		return t.has(n) ? !1 : (t.add(n), !0);
	}).sort((e, t) => (e.name || e.file).localeCompare(t.name || t.file));
}
//#endregion
//#region src/common/editor/helpers/inputs.js
function Fi(e, t) {
	return Array.isArray(t) ? Ii(e, t.map((t) => Fi(e, t))) : e._t ? e._t(t) : t;
}
function Ii(e, t) {
	return (e?.hass?.locale?.language || e?.hass?.language || "en").toLowerCase().startsWith("en") ? t.map((e, t) => t === 0 ? e : Li(e)).join(" ") : t.join(" ");
}
function Li(e = "") {
	return e.replace(/^(\p{L})/u, (e) => e.toLocaleLowerCase());
}
function Ri(e, t, n, r = {}) {
	let i = r.externalLabel === !0, a = r.value ?? this._config?.[t] ?? "", o = r.onValueChanged || ((e) => this._handleConfigUpdate(t, e));
	return E`
      <div class="field">
        ${i ? E`<label>${Fi(this, e)}</label>` : ""}

        <ha-selector
          .hass=${this.hass}
          .label=${i ? "" : Fi(this, e)}
          .selector=${{ text: {} }}
          .value=${a}
          .placeholder=${n}
          @value-changed=${(e) => o(e.detail.value || "")}
        ></ha-selector>
      </div>
    `;
}
function zi(e, t, n = {}) {
	let r = n.value ?? this._config?.[t] ?? "", i = n.hideLabel === !0, a = n.required !== !1, o = n.onValueChanged || ((e) => this._handleConfigUpdate(t, e));
	return E`
      <div class="field">
        <ha-selector
          .hass=${this.hass}
          .label=${i ? "" : Fi(this, e)}
          .selector=${{ template: {} }}
          .required=${a}
          .value=${r}
          @value-changed=${(e) => o(e.detail.value || "")}
        ></ha-selector>
      </div>
    `;
}
function Bi(e, t, n = {}) {
	let r = n.value ?? this._config?.[t] ?? "", i = n.min ?? 0, a = n.step ?? 1, o = n.onValueChanged || ((e) => this._handleConfigUpdate(t, e));
	return E`
    <div class="field">
      <ha-selector
        .hass=${this.hass}
        .label=${Fi(this, e)}
        .selector=${{ number: {
		min: i,
		step: a,
		mode: "box"
	} }}
        .value=${r}
        @value-changed=${(e) => o(e.detail.value)}
      ></ha-selector>
    </div>
  `;
}
//#endregion
//#region src/common/editor/helpers/config.js
function Vi(e, t) {
	let n = {
		...e || {},
		...t
	};
	return Object.keys(n).forEach((e) => {
		n[e] === void 0 && delete n[e];
	}), n;
}
function W(e, t = {}) {
	let n = { ...t };
	return e.forEach((e) => {
		n[e] = void 0;
	}), n;
}
function G(e, t = []) {
	return W([e, ...t]);
}
function Hi(e, t = []) {
	return W([e, ...t.map((t) => `${e}${t}`)]);
}
//#endregion
//#region src/common/editor/helpers/labels.js
function K(e, t, n) {
	return Array.isArray(t) ? Ui(e, t.map((t) => K(e, t, n))) : e._t ? e._t(t, n) : t;
}
function Ui(e, t) {
	return (e?.hass?.locale?.language || e?.hass?.language || "en").toLowerCase().startsWith("en") ? t.map((e, t) => t === 0 ? e : Wi(e)).join(" ") : t.join(" ");
}
function Wi(e = "") {
	return e.replace(/^(\p{L})/u, (e) => e.toLocaleLowerCase());
}
//#endregion
//#region src/common/editor/helpers/color-picker.js
function Gi(e, t, n) {
	let r = this._config?.[t] || "";
	return Ki.call(this, e, t, r, (e) => this._handleConfigUpdate(t, e), n);
}
function Ki(e, t, n, r, i, a = !0) {
	oa.call(this);
	let o = !a && I(n) ? "" : n, s = Yi.call(this, o, i), c = Da(o || s), l = this._colorPickerKey === t && this._colorPickerTab || c, u = !a && l === "template" ? Da(s) === "template" ? "theme" : Da(s) : l;
	return E`
    <div class="field">
      <div class="color-row">
        <div
          class="color-popover"
          @click=${(e) => e.stopPropagation()}
        >
          <div class="color-tabs">
            <button
              type="button"
              class=${u === "picker" ? "active" : ""}
              aria-label=${K(this, "Picker")}
              title=${K(this, "Picker")}
              @click=${() => {
		this._colorPickerKey = t, this._colorPickerTab = "picker", this._themeColorPickerOpen = !1;
		let e = o || s;
		if (e && !Oa(e)) {
			let t = this._getColorPickerValue(e);
			t && r(t);
		}
	}}
            >
              <ha-icon icon="mdi:eyedropper"></ha-icon>
            </button>
            <button
              type="button"
              class=${u === "theme" ? "active" : ""}
              aria-label=${K(this, "Theme")}
              title=${K(this, "Theme")}
              @click=${() => {
		this._colorPickerKey = t, this._colorPickerTab = "theme", this._themeColorPickerOpen = !1, this._themeColorSearch = "";
	}}
            >
              <ha-icon icon="mdi:palette-swatch"></ha-icon>
            </button>
            ${a ? E`
                  <button
                    type="button"
                    class=${u === "template" ? "active" : ""}
                    aria-label=${K(this, "Template")}
                    title=${K(this, "Template")}
                    @click=${() => {
		this._colorPickerKey = t, this._colorPickerTab = "template", this._themeColorPickerOpen = !1;
	}}
                  >
                    <ha-icon icon="mdi:code-braces"></ha-icon>
                  </button>
                ` : ""}
          </div>

          ${u === "template" ? Ji.call(this, e, o, r) : u === "theme" ? E`
                ${Zi.call(this, e, o, r, s, t)}
              ` : E`
                ${Xi.call(this, e, o, r, s)}
              `}
        </div>
      </div>
    </div>
  `;
}
function qi({ label: e = "Color", onLabel: t = ["Active", "Color"], offLabel: n = ["Inactive", "Color"], onKey: r, offKey: i, sourceKey: a, templateKey: o, legacySourceKey: s, legacyTemplateKey: c, config: l = this._config || {}, onUpdate: u = (e, t) => this._handleConfigUpdate(e, t), onPreviewValue: d, offPreviewValue: f, pickerPrefix: p = "" } = {}) {
	let m = r?.replace(/(?:_on_color|_color_on)$/, "") || "color", h = a || `${m}_color_source`, g = o || `${m}_color`, _ = l[h] ?? (s ? l[s] : void 0), v = l[g] ?? (c ? l[c] : void 0), ee = _ === "template";
	return E`
    <div class="color-pair-control">
      <div class="field-header color-pair-source-header">
        <label>${K(this, e)}</label>
        <ha-selector
          class="color-pair-source-selector"
          .hass=${this.hass}
          .selector=${{ button_toggle: { options: [{
		label: K(this, "Custom"),
		value: "custom"
	}, {
		label: K(this, "Template"),
		value: "template"
	}] } }}
          .value=${ee ? "template" : "custom"}
          @value-changed=${(e) => {
		let t = e.detail.value === "template" ? "template" : "custom";
		t === "custom" && (I(l[r]) && u(r, void 0), I(l[i]) && u(i, void 0)), u(h, t);
	}}
        ></ha-selector>
      </div>

      ${ee ? E`
            <div class="field color-source-template-field">
              <ha-selector
                .hass=${this.hass}
                .selector=${{ template: {} }}
                .value=${v || ""}
                @value-changed=${(e) => u(g, e.detail.value || "")}
              ></ha-selector>
            </div>
          ` : E`
            <div class="color-pair">
              ${Ki.call(this, t, `${p}${r}`, l[r] || "", (e) => u(r, e), d, !1)}
              ${Ki.call(this, n, `${p}${i}`, l[i] || "", (e) => u(i, e), f, !1)}
            </div>
          `}
    </div>
  `;
}
function Ji(e, t, n) {
	return E`
    <div class="color-template-input">
      <ha-selector
        .hass=${this.hass}
        .label=${e ? K(this, e) : K(this, "Template")}
        .selector=${{ template: {} }}
        .value=${I(t) ? t : ""}
        @value-changed=${(e) => n(e.detail.value || "")}
      ></ha-selector>
    </div>
  `;
}
function Yi(e, t) {
	return t || e || "theme";
}
function Xi(e, t, n, r = t) {
	let i = Oa(t) ? this._getColorPickerValue(t) : "", a = i || (Oa(t) ? this._getColorPickerValue(t) : this._getColorPickerValue(t || r)) || "#000000";
	return E`
    <div
      class="native-color-picker-field ${i ? "has-value" : ""}"
      @click=${(e) => e.stopPropagation()}
    >
      <input
        class="native-color-picker-input"
        type="color"
        .value=${a}
        @input=${(e) => n(e.target.value)}
        @change=${(e) => n(e.target.value)}
      />

      ${i ? E`
            <span
              class="native-color-picker-swatch"
              style=${`background-color:${i};`}
            ></span>
            <span class="native-color-picker-text">
              ${e ? E`
                    <span class="native-color-picker-label">
                      ${K(this, e)}
                    </span>
                  ` : ""}
              <span class="native-color-picker-value">
                ${i.toUpperCase()}
              </span>
            </span>
          ` : E`
            <span class="native-color-picker-empty-swatch"></span>
            <span class="native-color-picker-text">
              ${e ? E`
                    <span class="native-color-picker-label">
                      ${K(this, e)}
                    </span>
                  ` : ""}
              <span class="native-color-picker-value empty"></span>
            </span>
          `}

      ${i ? E`
            <button
              type="button"
              class="native-color-picker-clear"
              aria-label=${K(this, "Clear")}
              @click=${(e) => {
		e.preventDefault(), e.stopPropagation(), n("");
	}}
            >
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          ` : ""}

      <ha-icon
        class="native-color-picker-arrow"
        icon="mdi:menu-down"
      ></ha-icon>
    </div>
  `;
}
function Zi(e, t, n, r = t, i = "") {
	let a = t || r, o = Da(a) === "theme" ? ua(a) || "theme" : "", s = aa.call(this), c = Qi.call(this, s, o);
	return E`
    <div
      class="theme-color-picker"
      @click=${(e) => e.stopPropagation()}
    >
      <ha-generic-picker
        .getItems=${$i.call(this, i, c)}
        .label=${e ? K(this, e) : ""}
        .value=${o}
        .rowRenderer=${(e) => ea.call(this, e)}
        .valueRenderer=${(e) => ta.call(this, c.find((t) => t.id === e))}
        .notFoundLabel=${K(this, "No matching colors")}
        .emptyLabel=${""}
        .noSort=${!0}
        @value-changed=${(e) => {
		e.stopPropagation(), n(e.detail.value || "");
	}}
      ></ha-generic-picker>
    </div>
  `;
}
function Qi(e, t) {
	return !t || e.some((e) => e.id === t) ? e : [...e, ca.call(this, {
		id: t,
		source: "theme"
	})];
}
function $i(e, t) {
	this._themeColorItemGetters ||= /* @__PURE__ */ new Map();
	let n = this._themeColorItemGetters.get(e);
	return n ? n.items = t : (n = {
		items: t,
		getItems: () => n.items
	}, this._themeColorItemGetters.set(e, n)), n.getItems;
}
function ea(e) {
	return E`
    <ha-combo-box-item type="button" compact>
      ${na.call(this, e)}
      <span slot="headline">${e.primary}</span>
      ${ra.call(this, e)}
    </ha-combo-box-item>
  `;
}
function ta(e) {
	return e ? E`
    ${na.call(this, e)}
    <span slot="headline">${e.primary}</span>
    ${ra.call(this, e)}
  ` : "";
}
function na(e) {
	return e.id === "theme" ? E`
      <ha-icon
        slot="start"
        class="theme-color-default-icon"
        icon="mdi:palette"
      ></ha-icon>
    ` : E`
    <span
      slot="start"
      class="theme-color-swatch"
      style=${`
        ${this._getColorStyle(e.id)}
        display: block;
        width: 20px;
        height: 20px;
        border-radius: var(--ha-border-radius-pill, 999px);
        border: 1px solid var(--outline-color, var(--divider-color));
        box-sizing: border-box;
      `}
    ></span>
  `;
}
function ra(e) {
	return e.isThemeColor ? E`
      <span
        slot="end"
        class="theme-source-badge theme-source-badge-theme"
        aria-label=${K(this, "Theme")}
      >T</span>
    ` : e.isStandardFallback ? E`
        <span
          slot="end"
          class="theme-source-badge theme-source-badge-standard"
          aria-label=${K(this, "Standard")}
        >S</span>
      ` : "";
}
function ia() {
	let e = [], t = /* @__PURE__ */ new Set();
	for (let n of Ea) {
		let r = ca.call(this, n);
		!r || t.has(r.id) || (t.add(r.id), e.push(r));
	}
	for (let n of da.call(this)) {
		let r = ca.call(this, n);
		!r || t.has(r.id) || (t.add(r.id), e.push(r));
	}
	return e;
}
function aa() {
	let e = sa.call(this);
	if (this._themeColorItemsCache && this._themeColorItemsCacheKey === e) return this._themeColorItemsCache;
	let t = ia.call(this);
	return this._themeColorItemsCache = t, this._themeColorItemsCacheKey = e, t;
}
function oa() {
	let e = sa.call(this);
	if (this._themeColorItemsCacheKey === e || this._themeColorWarmupScheduled === e) return;
	this._themeColorWarmupScheduled = e;
	let t = () => {
		this._themeColorWarmupScheduled === e && (aa.call(this), this._themeColorWarmupScheduled = "");
	};
	if (window.requestIdleCallback) {
		window.requestIdleCallback(t, { timeout: 500 });
		return;
	}
	window.setTimeout(t, 0);
}
function sa() {
	return `${this?.hass?.locale?.language || this?.hass?.language || ""}|${this?.hass?.selectedTheme?.theme || this?.hass?.themes?.theme || ""}|${this?.hass?.themes?.darkMode ?? this?.hass?.selectedTheme?.dark ?? ""}|${fa.call(this)}`;
}
function ca(e) {
	let t = la(typeof e == "string" ? { id: e } : e), n = Sa(t.id), r = n && Ca(t.id), i = !r && (t.source === "theme" || ba.call(this, t.id)), a = t.label ? K(this, t.label) : wa.call(this, t.id);
	return {
		id: t.id,
		primary: a,
		secondary: n ? K(this, "Color") : K(this, "Theme"),
		sorting_label: a,
		isStandardFallback: r,
		isThemeColor: i,
		search_labels: {
			color: t.id,
			label: a,
			source: r ? "standard" : i ? "theme" : "color"
		}
	};
}
function la(e) {
	return {
		...e,
		id: ua(e.id),
		label: e.label || null
	};
}
function ua(e) {
	if (!e) return "";
	let t = e.toString().trim().toLowerCase().replace(/[^a-z0-9-_]/g, ""), n = t.startsWith("color-") ? t.slice(6) : t;
	return Ta[n] || n;
}
function da() {
	return pa.call(this).map((e) => ga(e)).filter(_a).map((e) => ({
		id: e,
		source: "theme"
	})).sort((e, t) => wa.call(this, e.id).localeCompare(wa.call(this, t.id), this?.hass?.locale?.language || this?.hass?.language || void 0, { sensitivity: "base" }));
}
function fa() {
	return ma.call(this).map(([e, t]) => `${e}:${t}`).join(",");
}
function pa() {
	return ma.call(this).map(([e]) => e).sort();
}
function ma() {
	let e = /* @__PURE__ */ new Set(), t = [], n = ha.call(this);
	for (let [r, i] of Object.entries(n)) {
		let n = r.toLowerCase();
		va(n, i) && (e.has(n) || (e.add(n), t.push([n, i])));
	}
	return t.sort(([e], [t]) => e.localeCompare(t));
}
function ha() {
	let e = this?.hass?.selectedTheme?.theme || this?.hass?.themes?.theme || "", t = e ? this?.hass?.themes?.themes?.[e] : null;
	if (!t) return {};
	let { modes: n, ...r } = t, i = this?.hass?.themes?.darkMode ?? this?.hass?.selectedTheme?.dark ?? !1 ? n?.dark : n?.light;
	return {
		...r,
		...i || {}
	};
}
function ga(e) {
	return e.startsWith("color-") ? e.slice(6) : e;
}
function _a(e) {
	return !!e && !/^\d+$/.test(e);
}
function va(e, t) {
	return !e || !(e.startsWith("color-") || e.startsWith("google-") || e.endsWith("-color") || e.includes("-color-")) ? !1 : ya(t);
}
function ya(e) {
	let t = e == null ? "" : e.toString().trim();
	return t ? /^#[0-9a-f]{3,8}$/i.test(t) || /^(rgb|rgba|hsl|hsla)\(/i.test(t) || /^var\(\s*--[a-z0-9-_]*color[a-z0-9-_]*/i.test(t) || /^\d+\s*,\s*\d+\s*,\s*\d+/.test(t) : !1;
}
function ba(e) {
	let t = new Set(pa.call(this));
	return xa(e).some((e) => t.has(e));
}
function xa(e) {
	let t = ua(e);
	if (!t) return [];
	let n = t.startsWith("color-") ? t : `color-${t}`;
	return t.endsWith("-color") ? [t, n] : [n, t];
}
function Sa(e) {
	return e === "theme" || e === "primary-color" || e === "accent-color" || Mt(e);
}
function Ca(e) {
	return Mt(e) && !Pt(e);
}
function wa(e) {
	return e === "theme" ? K(this, "State color (default)") : e === "light" ? K(this, "State light color") : e === "primary-color" ? K(this, "Primary") : e === "primary-text-color" ? K(this, "Primary text color") : e === "card-background-color" ? K(this, "Card background") : e === "secondary-background-color" ? K(this, "Secondary background color") : e === "accent-color" ? K(this, "Accent") : e.replaceAll("-", " ").replace(/\b\w/g, (e) => e.toUpperCase());
}
var Ta = {
	bluegrey: "blue-grey",
	darkgrey: "dark-grey",
	deeporange: "deep-orange",
	deeppurple: "deep-purple",
	lightblue: "light-blue",
	lightgreen: "light-green",
	lightgrey: "light-grey"
}, Ea = [
	{
		id: "theme",
		label: "State color (default)"
	},
	{
		id: "light",
		label: "State light color"
	},
	"primary-color",
	"card-background-color",
	"accent-color",
	"red",
	"pink",
	"purple",
	"deep-purple",
	"indigo",
	"blue",
	"light-blue",
	"cyan",
	"teal",
	"green",
	"light-green",
	"lime",
	"yellow",
	"amber",
	"orange",
	"deep-orange",
	"brown",
	"light-grey",
	"grey",
	"dark-grey",
	"blue-grey",
	"black",
	"white",
	"disabled",
	"state-icon-color",
	"state-inactive-color",
	"state-light-active-color",
	"gold",
	"violet",
	"google-red",
	"google-green",
	"google-yellow",
	"google-blue",
	"google-violet",
	"google-grey",
	"color-red",
	"color-green",
	"color-yellow",
	"color-amber",
	"color-blue",
	"color-purple",
	"color-violet",
	"color-grey",
	"color-darkgrey",
	"color-pink",
	"color-orange",
	"color-gold",
	"color-brown"
];
function Da(e) {
	let t = e?.toString().trim();
	return t ? I(t) ? "template" : Oa(t) ? "picker" : "theme" : "theme";
}
function Oa(e) {
	let t = e?.toString().trim().toLowerCase();
	return !!(t && (t.startsWith("#") || t.startsWith("rgb") || t.startsWith("hsl")));
}
//#endregion
//#region src/common/editor/helpers/actions.js
function ka(e, t) {
	return Aa(e?.hass, t) || ja[t] || t;
}
function Aa(e, t) {
	if (!e?.localize || !t) return null;
	let n = [t, t.replaceAll("-", "_")].flatMap((e) => [
		`ui.panel.lovelace.editor.action-editor.actions.${e}`,
		`ui.panel.lovelace.editor.card.generic.action.actions.${e}`,
		`ui.panel.lovelace.editor.card.generic.action.${e}`,
		`ui.panel.lovelace.editor.card.config.action.actions.${e}`,
		`ui.panel.lovelace.editor.card.config.action.${e}`,
		`ui.components.action-input.editor.action.${e}`
	]);
	for (let r of n) {
		let n = e.localize(r);
		if (n && n !== r && n !== t) return n;
	}
	return null;
}
var ja = {
	"Current state": "Current state",
	"call-service": "Perform action",
	"more-info": "More info",
	navigate: "Navigate",
	none: "Nothing",
	popup: "Popup",
	"perform-action": "Perform action",
	toggle: "Toggle",
	url: "URL"
};
function q({ interactions: e = [], title: t = "Interactions", expanded: n = !1, context: r = {}, config: i = this._config, onChange: a } = {}) {
	let o = e.filter(Boolean);
	if (!o.length) return "";
	let s = o.filter((e) => Ma(i, e)), c = o.filter((e) => !s.includes(e)), l = [{
		name: "interactions",
		type: "expandable",
		flatten: !0,
		expanded: n,
		icon: "mdi:gesture-tap-button",
		schema: [...s.map((e) => Na(e, r, i, this)), {
			name: "",
			type: "optional_actions",
			flatten: !0,
			schema: c.map((e) => Na(e, r, i, this))
		}]
	}], u = Pa(i, o);
	return E`
    <ha-form
      class="interactions-form"
      .hass=${this.hass}
      .data=${u}
      .schema=${l}
      .computeLabel=${(e) => La(this, e, o, t)}
      @value-changed=${(e) => {
		e.stopPropagation();
		let t = Fa(e.detail.value || {}, o, i);
		a ? a(t) : this._updateConfig(t), this.requestUpdate?.();
	}}
    ></ha-form>
  `;
}
function Ma(e = {}, t) {
	return t.defaultVisible && !za(e?.[t.key]);
}
function Na(e, t, n, r) {
	let i = Ra(e.defaultAction), a = n?.[e.key];
	if (e.customDefaultLabel && !a) {
		let t = Ba(i);
		return {
			name: e.formKey || e.key,
			selector: { select: {
				mode: "dropdown",
				options: [{
					value: "__default__",
					label: `${K(r, "Default")} (${K(r, e.customDefaultLabel)})`
				}, ...t.map((e) => ({
					value: e,
					label: ka(r, e)
				}))]
			} }
		};
	}
	return {
		name: e.formKey || e.key,
		selector: { ui_action: {
			actions: Ba(i),
			default_action: i
		} },
		...t ? { context: t } : {}
	};
}
function Pa(e = {}, t) {
	return t.reduce((t, n) => {
		let r = n.formKey || n.key;
		if (n.customDefaultLabel && !e?.[n.key]) return t[r] = "__default__", t;
		let i = e?.[n.key] || (n.displayDefaultValue ? Va(n.defaultAction) : void 0);
		return i && typeof i == "object" && i.action !== "popup" && (!za(i) || Ra(n.defaultAction) !== "none") && (t[r] = Ha(i)), t;
	}, {});
}
function Fa(e, t, n = {}) {
	return t.reduce((t, r) => {
		let i = r.formKey || r.key;
		if (r.customDefaultLabel && typeof e[i] == "string") return t[r.key] = e[i] === "__default__" ? void 0 : { action: e[i] }, t;
		let a = n?.[r.key], o = Ua(Ia(e[i], a), r.defaultAction);
		return t[r.key] = n?.[r.key]?.action === "popup" && !(i in e) ? n[r.key] : o, t;
	}, {});
}
function Ia(e, t) {
	if (!e || typeof e != "object" || e.action !== "more-info" || e.entity || e.entity_id || t?.action !== "more-info") return e;
	let n = t.entity || t.entity_id;
	return n ? {
		...e,
		entity: n
	} : e;
}
function La(e, t, n, r) {
	return t.name === "interactions" ? K(e, r) : K(e, n.find((e) => (e.formKey || e.key) === t.name)?.label || t.name);
}
function Ra(e) {
	let t = typeof e == "string" ? e : e?.action || "none";
	return t === "call-service" ? "perform-action" : t;
}
function za(e) {
	return e?.action === "none";
}
function Ba(e) {
	let t = [
		"more-info",
		"toggle",
		"navigate",
		"url",
		"perform-action",
		"assist"
	];
	return e && e !== "none" && !t.includes(e) && t.unshift(e), e === "none" ? t : [...t, "none"];
}
function Va(e) {
	return typeof e == "string" ? { action: e } : e || { action: "none" };
}
function Ha(e) {
	if (!e || typeof e != "object") return e;
	let t = e.action === "call-service" ? "perform-action" : e.action;
	if (t !== "perform-action") return {
		...e,
		action: t
	};
	let n = {
		...e,
		action: t,
		perform_action: e.perform_action || e.service || ""
	};
	return e.service_data && !e.data && (n.data = e.service_data), delete n.service, delete n.service_data, n;
}
function Ua(e, t) {
	if (!(!e || typeof e != "object") && !(e.action === "none" && Ra(t) === "none")) {
		if (e.action === "perform-action") {
			let t = {
				...e,
				action: "call-service",
				service: e.perform_action || e.service || ""
			};
			return e.data && !e.service_data && (t.service_data = e.data), delete t.perform_action, delete t.data, Wa(t);
		}
		return Wa(e);
	}
}
function Wa(e) {
	let t = e?.action === "perform-action" ? "call-service" : e?.action || "none", n = { action: t };
	if (t === "navigate") return n.navigation_path = e.navigation_path || "", n;
	if (t === "more-info") {
		let t = e.entity || e.entity_id;
		return t && (n.entity = t), n;
	}
	return t === "call-service" ? (n.service = e.service || e.perform_action || "", (e.service_data || e.data) && (n.service_data = { ...e.service_data || e.data }), e.target && (n.target = { ...e.target }), n) : t === "url" ? (n.url_path = e.url_path || "", n) : t === "popup" ? (n.popup_title = e.popup_title || "", n.popup_content = e.popup_content || "", e.style && (n.style = e.style), e.card_mod && (n.card_mod = e.card_mod), n) : n;
}
//#endregion
//#region src/common/editor/helpers/renders.js
function Ga({ value: e = "", includeDomains: t, excludeDomains: n, multiple: r = !1, onValueChanged: i, filterOptions: a, activeFilter: o = "all", className: s = "entity-picker" } = {}) {
	let c = a?.length ? a.map((e) => ({
		...e,
		label: Ka.call(this, e)
	})) : null, l = c ? Ja(c) : t;
	return r ? E`
      <ha-selector
        class=${s}
        .hass=${this.hass}
        .selector=${{ entity: {
		...l?.length ? { filter: { domain: l } } : {},
		...n?.length ? { exclude_domains: n } : {},
		multiple: !0
	} }}
        .value=${e || ""}
        @value-changed=${(e) => i?.(e.detail.value || "")}
      ></ha-selector>
    ` : c?.length ? Xa.call(this, {
		value: e,
		includeDomains: t,
		excludeDomains: n,
		filters: c,
		activeFilter: o,
		className: s,
		onValueChanged: i
	}) : E`
    <ha-entity-picker
      class=${s}
      .hass=${this.hass}
      .includeDomains=${l}
      .excludeDomains=${n}
      .value=${e || ""}
      @value-changed=${(e) => i?.(e.detail.value || "")}
    ></ha-entity-picker>
  `;
}
function Ka(e) {
	if (e.haDomains?.length) {
		let t = e.haDomains.map((e) => qa(this?.hass, e)).filter(Boolean);
		if (t.length) return t.join(" / ");
	}
	return K(this, e.label);
}
function qa(e, t) {
	if (!e?.localize || !t) return null;
	let n = [`component.${t}.entity_component._.name_plural`, `component.${t}.entity_component._.name`];
	for (let t of n) {
		let n = e.localize(t);
		if (n && n !== t) return n;
	}
	return null;
}
function Ja(e = []) {
	if (e.some((e) => e.value === "all" && (!e.domains || e.domains.length === 0))) return;
	let t = /* @__PURE__ */ new Set();
	return e.forEach((e) => e.domains?.forEach((e) => t.add(e))), [...t];
}
var Ya = !1;
function Xa({ value: e, includeDomains: t, excludeDomains: n, filters: r, activeFilter: i, className: a, onValueChanged: o }) {
	so();
	let s = r.map((e) => ({
		id: e.value,
		label: e.label
	}));
	return E`
    <ha-generic-picker
      class=${a}
      .hass=${this.hass}
      .value=${e || ""}
      .placeholder=${"Entity"}
      .getItems=${(e, i) => Za.call(this, {
		search: e,
		section: i,
		filters: r,
		includeDomains: t,
		excludeDomains: n
	})}
      .valueRenderer=${(e) => $a.call(this, e)}
      .rowRenderer=${eo}
      .sections=${s}
      .selectedSection=${i || r[0]?.value || "all"}
      @picker-opened=${(e) => {
		e.currentTarget.__orbitSuppressSectionScroll = !0;
	}}
      @value-changed=${(e) => o?.(e.detail.value || "")}
    ></ha-generic-picker>
  `;
}
function Za({ search: e, section: t, filters: n, includeDomains: r, excludeDomains: i }) {
	let a = n.find((e) => e.value === (t || "all"))?.domains, o = a?.length ? a : r, s = new Set(i || []), c = (e || "").trim().toLowerCase();
	return Object.values(this.hass?.states || {}).filter((e) => {
		let t = ao(e.entity_id);
		return o?.length && !o.includes(t) ? !1 : !s.has(t);
	}).map((e) => Qa.call(this, e)).filter((e) => to(e, c)).sort(no);
}
function Qa(e) {
	let t = ro(e), n = ao(e.entity_id), r = io(this.hass, e);
	return {
		id: e.entity_id,
		primary: t,
		secondary: r,
		sorting_label: `${t}_${e.entity_id}`,
		stateObj: e,
		domain: n,
		domainLabel: oo(n),
		searchText: [
			t,
			e.entity_id,
			n,
			oo(n),
			r,
			e.attributes?.device_class
		].filter(Boolean).join(" ").toLowerCase()
	};
}
function $a(e) {
	let t = this.hass?.states?.[e], n = t ? ro(t) : e, r = t ? io(this.hass, t) : void 0;
	return E`
    ${t ? E`<state-badge slot="start" .stateObj=${t}></state-badge>` : ""}
    <span slot="headline">${n}</span>
    ${r ? E`<span slot="supporting-text">${r}</span>` : ""}
  `;
}
function eo(e, t) {
	return E`
    <ha-combo-box-item
      type="button"
      compact
      .borderTop=${t !== 0}
    >
      <state-badge slot="start" .stateObj=${e.stateObj}></state-badge>
      <span slot="headline">${e.primary}</span>
      ${e.secondary ? E`<span slot="supporting-text">${e.secondary}</span>` : ""}
      <div slot="trailing-supporting-text" class="domain">
        ${e.domainLabel}
      </div>
    </ha-combo-box-item>
  `;
}
function to(e, t) {
	return t ? t.split(/\s+/).every((t) => e.searchText.includes(t)) : !0;
}
function no(e, t) {
	return e.sorting_label.localeCompare(t.sorting_label, void 0, { sensitivity: "base" });
}
function ro(e) {
	return e.attributes?.friendly_name || e.entity_id;
}
function io(e, t) {
	let n = e?.entities?.[t.entity_id], r = n?.device_id ? e?.devices?.[n.device_id] : void 0, i = n?.area_id || r?.area_id || t.attributes?.area_id;
	return i ? e?.areas?.[i]?.name : void 0;
}
function ao(e = "") {
	return e.split(".")[0] || "";
}
function oo(e = "") {
	return e.split("_").filter(Boolean).map((e) => e[0]?.toUpperCase() + e.slice(1)).join(" ");
}
function so() {
	if (Ya) return;
	let e = Element.prototype.scrollIntoView;
	Element.prototype.scrollIntoView = function(...t) {
		if (lo(this)) {
			co(this);
			return;
		}
		return e.apply(this, t);
	}, Ya = !0;
}
function co(e) {
	let t = e;
	for (; t;) {
		if (t.tagName?.toLowerCase?.() === "lit-virtualizer") {
			t.scrollTop = 0;
			return;
		}
		let e = t.getRootNode?.();
		if (e?.host && e.host !== t) {
			t = e.host;
			continue;
		}
		t = t.parentNode || t.host;
	}
}
function lo(e) {
	let t = e;
	for (; t;) {
		if (t.__orbitSuppressSectionScroll) return !0;
		let e = t.getRootNode?.();
		if (e?.host && e.host !== t) {
			t = e.host;
			continue;
		}
		t = t.parentNode || t.host;
	}
	return !1;
}
function uo({ value: e = "", onValueChanged: t, className: n = "entity-picker" } = {}) {
	return E`
    <ha-generic-picker
      class=${n}
      .hass=${this.hass}
      .value=${e || ""}
      .placeholder=${"Area"}
      .getItems=${() => fo.call(this)}
      .valueRenderer=${(e) => mo.call(this, e)}
      .rowRenderer=${ho}
      @value-changed=${(e) => t?.(e.detail.value || "")}
    ></ha-generic-picker>
  `;
}
function fo() {
	return Object.values(this.hass?.areas || {}).map((e) => po.call(this, e)).sort(_o);
}
function po(e) {
	let t = e.name || e.area_id, n = go(this.hass, e);
	return {
		id: e.area_id,
		primary: t,
		secondary: n,
		sorting_label: t,
		icon: e.icon || "mdi:texture-box"
	};
}
function mo(e) {
	let t = this.hass?.areas?.[e], n = t ? po.call(this, t) : {
		id: e,
		primary: e,
		icon: "mdi:texture-box"
	};
	return E`
    <ha-icon slot="start" .icon=${n.icon}></ha-icon>
    <span slot="headline">${n.primary}</span>
    ${n.secondary ? E`<span slot="supporting-text">${n.secondary}</span>` : ""}
  `;
}
function ho(e, t) {
	return E`
    <ha-combo-box-item
      type="button"
      compact
      .borderTop=${t !== 0}
    >
      <ha-icon slot="start" .icon=${e.icon}></ha-icon>
      <span slot="headline">${e.primary}</span>
      ${e.secondary ? E`<span slot="supporting-text">${e.secondary}</span>` : ""}
    </ha-combo-box-item>
  `;
}
function go(e, t) {
	let n = t.floor_id;
	return n ? e?.floors?.[n]?.name : void 0;
}
function _o(e, t) {
	return e.sorting_label.localeCompare(t.sorting_label, void 0, { sensitivity: "base" });
}
function vo(e, t, n) {
	return E`
    <div class="field">
      <label>${K(this, e, n)}</label>

      ${Ga.call(this, {
		value: this._config?.[t] || "",
		onValueChanged: (e) => this._handleEntityUpdate ? this._handleEntityUpdate(t, e) : this._handleConfigUpdate(t, e)
	})}
    </div>
  `;
}
function yo(e, t) {
	return E`
    <div class="field">
      ${uo.call(this, {
		value: this._config?.[t] || "",
		onValueChanged: (e) => this._handleConfigUpdate ? this._handleConfigUpdate(t, e) : this._updateConfig({ [t]: e })
	})}
    </div>
  `;
}
//#endregion
//#region src/common/editor/helpers/helpers.js
function bo(e) {
	e._editorPopoverCloseHandler || (e._editorPopoverCloseHandler = (t) => {
		!e._iconPickerKey && !e._colorPickerKey || So(t.composedPath?.() || []) || (e._iconPickerKey = "", e._colorPickerKey = "", e._iconFilePickerOpen = !1, e._iconFileSearch = "", e._themeColorPickerOpen = !1, e._themeColorSearch = "", e.requestUpdate?.());
	}, document.addEventListener("pointerdown", e._editorPopoverCloseHandler, !0), e.addEventListener("pointerdown", e._editorPopoverCloseHandler, !0));
}
function xo(e) {
	e._editorPopoverCloseHandler &&= (document.removeEventListener("pointerdown", e._editorPopoverCloseHandler, !0), e.removeEventListener("pointerdown", e._editorPopoverCloseHandler, !0), null);
}
function So(e) {
	return e.some((e) => {
		let t = e?.classList, n = e?.tagName?.toLowerCase?.();
		return t?.contains("icon-popover") || t?.contains("color-popover") || t?.contains("icon-preview") || t?.contains("color-preview") || t?.contains("color-control-button") || t?.contains("mdc-menu-surface") || n === "ha-generic-picker" || n === "ha-icon-picker" || n === "ha-combo-box" || n === "ha-combo-box-item" || n === "mwc-list" || n === "mwc-list-item";
	});
}
function Co(e) {
	if (!e) return "background-color: rgb(var(--color-theme));";
	let t = e.toString().trim().toLowerCase();
	if (t.startsWith("#") || t.startsWith("rgb(") || t.startsWith("hsl(")) return `background-color:${t};`;
	let n = t.replace(/[^a-z0-9-_]/g, "");
	return n ? `background-color: ${jt(n)};` : "background-color: rgb(var(--color-theme));";
}
function wo(e) {
	let t = e?.toString().trim();
	return t && (Oo(t) || ko(t) || To(t)) || "#ffffff";
}
function To(e, t = /* @__PURE__ */ new Set()) {
	let n = e?.toString().trim().toLowerCase().replace(/[^a-z0-9-_]/g, "");
	if (!n || t.has(n)) return "";
	t.add(n);
	let r = Ft(n), i = Pt(n) ? Do(r) : "", a = Mt(n) ? Do(`${n}-color`) : "", o = Do(n), s = n.startsWith("color-") ? "" : Do(`color-${n}`);
	return Eo(i, t) || Eo(a, t) || Eo(o, t) || Eo(s, t) || "";
}
function Eo(e, t) {
	let n = e?.trim();
	if (!n) return "";
	let r = Oo(n);
	if (r) return r;
	let i = ko(n);
	if (i) return i;
	let a = n.match(/^var\(\s*--([^),\s]+)\s*\)$/i);
	return a ? To(a[1], t) : "";
}
function Do(e) {
	let t = `--${e}`, n = [document.documentElement, document.body].filter(Boolean);
	for (let e of n) {
		let n = getComputedStyle(e).getPropertyValue(t).trim();
		if (n) return n;
	}
	return "";
}
function Oo(e) {
	return /^#[0-9a-f]{6}$/i.test(e) ? e : /^#[0-9a-f]{3}$/i.test(e) ? `#${e[1]}${e[1]}${e[2]}${e[2]}${e[3]}${e[3]}` : "";
}
function ko(e) {
	let t = e.match(/^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})/i);
	if (t) return Ao(Number(t[1]), Number(t[2]), Number(t[3]));
	let n = e.match(/^\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*$/i);
	return n ? Ao(Number(n[1]), Number(n[2]), Number(n[3])) : "";
}
function Ao(e, t, n) {
	return `#${jo(e)}${jo(t)}${jo(n)}`;
}
function jo(e) {
	return Math.max(0, Math.min(255, e || 0)).toString(16).padStart(2, "0");
}
//#endregion
//#region src/common/editor/helpers/name-picker.js
function Mo({ label: e = "Name", valueKey: t, legacyValueKey: n = "", entityKey: r = "main_entity", areaKey: i = "area", deviceClassKey: a = "device_class", defaultType: o = "", defaultMode: s = "composed", modeKey: c = t, templateKey: l = "", templateLabel: u = "Template" } = {}) {
	return No.call(this), l || !customElements.get("ha-entity-name-picker") ? Po.call(this, {
		label: e,
		valueKey: t,
		entityKey: r,
		areaKey: i,
		deviceClassKey: a,
		defaultType: o,
		defaultMode: s,
		modeKey: c,
		templateKey: l,
		templateLabel: u
	}) : E`
    <div class="field name-picker-field">
      <ha-entity-name-picker
        .hass=${this.hass}
        .label=${this._t(e)}
        .entityId=${ts.call(this, {
		entityKey: r,
		areaKey: i
	})}
        .value=${Ko(this._config, {
		valueKey: t,
		legacyValueKey: n,
		entityKey: r,
		areaKey: i,
		defaultType: o
	})}
        @value-changed=${(e) => {
		e.stopPropagation(), Yo.call(this, {
			valueKey: t,
			legacyValueKey: n,
			value: Xo(e.detail.value, this._config, {
				entityKey: r,
				areaKey: i,
				defaultType: o
			})
		});
	}}
      ></ha-entity-name-picker>
    </div>
  `;
}
function No() {
	customElements.get("ha-entity-name-picker") || this._namePickerRenderQueued || (this._namePickerRenderQueued = !0, customElements.whenDefined("ha-entity-name-picker").then(() => {
		this._namePickerRenderQueued = !1, this.requestUpdate?.();
	}));
}
function Po(e) {
	let t = zo(this._config, Bo(this, e.modeKey), e);
	return E`
    <div class="field name-picker-field name-picker-fallback">
      <div class="field-header">
        <label>${this._t(e.label)}</label>

        <ha-selector
          class="editor-header-button-toggle name-picker-mode-selector"
          .hass=${this.hass}
          .selector=${{ button_toggle: { options: [
		{
			label: as(this, "composed"),
			value: "composed"
		},
		{
			label: as(this, "custom"),
			value: "custom"
		},
		...e.templateKey ? [{
			label: this._t("Template"),
			value: "template"
		}] : []
	] } }}
          .value=${t}
          @value-changed=${(t) => {
		t.stopPropagation();
		let n = t.detail.value || "composed";
		if (Vo(this, e.modeKey, n), !(e.templateKey && (this._updateConfig({
			[e.valueKey]: void 0,
			...e.legacyValueKey ? { [e.legacyValueKey]: void 0 } : {},
			[e.templateKey]: n === "template" ? this._config?.[e.templateKey] : void 0
		}), n === "template" || n === "composed"))) {
			if (n === "composed") {
				Yo.call(this, {
					valueKey: e.valueKey,
					legacyValueKey: e.legacyValueKey,
					value: void 0
				});
				return;
			}
			if (typeof Jo(this._config, e) != "string") {
				Yo.call(this, {
					valueKey: e.valueKey,
					legacyValueKey: e.legacyValueKey,
					value: void 0
				});
				return;
			}
			this.requestUpdate?.();
		}
	}}
        ></ha-selector>
      </div>

      ${t === "template" ? this._renderTemplateInput(e.templateLabel, e.templateKey, { hideLabel: !0 }) : t === "custom" ? Fo.call(this, e) : Io.call(this, e)}
    </div>
  `;
}
function Fo(e) {
	return E`
    <ha-selector
      class="name-picker-custom-input"
      .hass=${this.hass}
      .selector=${{ text: {} }}
      .value=${typeof Jo(this._config, e) == "string" ? Jo(this._config, e) : ""}
      @value-changed=${(t) => {
		t.stopPropagation(), Yo.call(this, {
			valueKey: e.valueKey,
			legacyValueKey: e.legacyValueKey,
			value: t.detail.value || void 0
		});
	}}
    ></ha-selector>
  `;
}
function Io(e) {
	let t = Ho(this._config, e), n = Wo.call(this, t, e);
	return E`
    <ha-generic-picker
      class="name-picker-composed-picker"
      .hass=${this.hass}
      .value=${""}
      .placeholder=${this._t(e.label)}
      .getItems=${() => n}
      allow-custom-value
      .customValueLabel=${cs(this)}
      .rowRenderer=${(e) => E`
        <ha-combo-box-item type="button" compact>
          <span slot="headline">${e.primary}</span>
          ${e.secondary ? E`<span slot="supporting-text">${e.secondary}</span>` : ""}
        </ha-combo-box-item>
      `}
      .noSort=${!0}
      .searchLabel=${ss(this)}
      @value-changed=${(n) => {
		n.stopPropagation();
		let r = Go(n.detail.value);
		r && (Vo(this, e.modeKey, "composed"), Yo.call(this, {
			valueKey: e.valueKey,
			legacyValueKey: e.legacyValueKey,
			value: Xo([...t, r], this._config, e)
		}));
	}}
    >
      <div slot="field" class="name-picker-composed-field">
        ${t.map((n, r) => Lo.call(this, n, r, t, e))}

        <button
          type="button"
          class="name-picker-add-chip"
          @click=${(e) => Ro(e)}
        >
          <ha-icon icon="mdi:plus"></ha-icon>
          <span>${os(this)}</span>
        </button>
      </div>
    </ha-generic-picker>
  `;
}
function Lo(e, t, n, r) {
	return E`
    <button
      type="button"
      class="name-picker-chip"
      @click=${(e) => Ro(e)}
    >
      <ha-icon icon="mdi:drag-horizontal-variant"></ha-icon>
      <span>${Uo.call(this, e, r)}</span>
      <ha-icon
        class="name-picker-chip-remove"
        icon="mdi:close"
        @click=${(e) => {
		e.preventDefault(), e.stopPropagation();
		let i = n.filter((e, n) => n !== t);
		Yo.call(this, {
			valueKey: r.valueKey,
			legacyValueKey: r.legacyValueKey,
			value: Xo(i, this._config, r)
		});
	}}
      ></ha-icon>
    </button>
  `;
}
function Ro(e) {
	e.preventDefault(), e.stopPropagation(), e.currentTarget?.closest("ha-generic-picker")?.open?.();
}
function zo(e = {}, t, n) {
	if (n.templateKey && qo(e, n.templateKey)) return "template";
	let r = Jo(e, n);
	return typeof r == "string" ? "custom" : r ? "composed" : t || n.defaultMode || "composed";
}
function Bo(e, t) {
	return e._namePickerModes?.[t];
}
function Vo(e, t, n) {
	e._namePickerModes = {
		...e._namePickerModes,
		[t]: n
	};
}
function Ho(e = {}, t) {
	let n = Ko(e, t);
	return !n || typeof n == "string" ? [] : Array.isArray(n) ? n : [n];
}
function Uo(e, t) {
	return e ? e.type === "text" ? `"${e.text || ""}"` : e.type === "area" ? this._t("Area") : e.type === "entity" ? this._t("Entity") : e.type === "device_class" ? this._t("Device class") : ls(this, e.type) : "";
}
function Wo(e = [], t) {
	let n = [], r = new Set(e.filter((e) => e?.type && e.type !== "text").map((e) => e.type)), i = t.areaKey && this._config?.[t.areaKey] ? this.hass?.areas?.[this._config[t.areaKey]] : null, a = ts.call(this, t), o = a ? this.hass?.states?.[a] : null, s = $o(this._config, t);
	if (s && !r.has("device_class") && n.push({
		id: "device_class",
		primary: this._t("Device class"),
		secondary: s
	}), i && !r.has("area")) n.push({
		id: "area",
		primary: this._t("Area"),
		secondary: i.name || ""
	});
	else if (o && !r.has("area")) {
		let e = rs(this.hass, o, "area");
		e && n.push({
			id: "area",
			primary: this._t("Area"),
			secondary: e
		});
	}
	if (o) {
		r.has("entity") || n.push({
			id: "entity",
			primary: this._t("Entity"),
			secondary: rs(this.hass, o, "entity")
		});
		let e = rs(this.hass, o, "device");
		e && !r.has("device") && n.push({
			id: "device",
			primary: ls(this, "device"),
			secondary: e
		});
		let i = is(this.hass, this._config?.[t.areaKey]) || rs(this.hass, o, "floor");
		i && !r.has("floor") && n.push({
			id: "floor",
			primary: ls(this, "floor"),
			secondary: i
		});
	}
	return n;
}
function Go(e) {
	if (e) return [
		"area",
		"device",
		"device_class",
		"entity",
		"floor"
	].includes(e) ? { type: e } : {
		type: "text",
		text: e
	};
}
function Ko(e = {}, t) {
	let n = Jo(e, t);
	if (n !== void 0) return n;
	if (t.defaultType === "area" && e[t.areaKey]) return { type: "area" };
	if (t.defaultType === "entity" && (e[t.entityKey] || e.entity)) return { type: "entity" };
	if (t.defaultType === "device_class" && Qo(e, t).length) return { type: "device_class" };
}
function qo(e = {}, t) {
	return Object.prototype.hasOwnProperty.call(e, t) && e[t] !== void 0 && e[t] !== "";
}
function Jo(e = {}, t) {
	if (qo(e, t.valueKey)) return e[t.valueKey];
	if (t.legacyValueKey && qo(e, t.legacyValueKey)) return e[t.legacyValueKey];
}
function Yo({ valueKey: e, legacyValueKey: t, value: n }) {
	if (t && typeof this._updateConfig == "function") {
		this._updateConfig({
			[e]: n,
			[t]: void 0
		});
		return;
	}
	this._handleConfigUpdate(e, n);
}
function Xo(e, t = {}, n) {
	if (!(Array.isArray(e) && e.length === 0) && e && !(n.defaultType && Zo(t, n) && es(e, n.defaultType))) return e;
}
function Zo(e = {}, t) {
	return t.defaultType === "area" ? !!e[t.areaKey] : t.defaultType === "entity" ? !!(e[t.entityKey] || e.entity) : t.defaultType === "device_class" ? Qo(e, t).length > 0 : !1;
}
function Qo(e = {}, t = {}) {
	let n = e?.[t.deviceClassKey || "device_class"];
	return (Array.isArray(n) ? n : [n]).filter((e) => typeof e == "string").map((e) => e.trim()).filter(Boolean);
}
function $o(e = {}, t = {}) {
	return Qo(e, t).map((e) => e.replaceAll("_", " ").replace(/\b\w/g, (e) => e.toUpperCase())).join(", ");
}
function es(e, t) {
	let n = Array.isArray(e) ? e : [e];
	return n.length === 1 && n[0] && typeof n[0] == "object" && n[0].type === t;
}
function ts(e) {
	return this._config?.[e.entityKey] || this._config?.entity || ns(this.hass, this._config?.[e.areaKey]);
}
function ns(e, t) {
	if (!e || !t) return "";
	let n = e.entities || {}, r = e.devices || {};
	for (let i of Object.keys(e.states || {})) {
		let e = n[i];
		if (e?.area_id === t || e?.device_id && r[e.device_id]?.area_id === t) return i;
	}
	return "";
}
function rs(e, t, n) {
	return !t || typeof e?.formatEntityName != "function" ? n === "entity" && (t?.attributes?.friendly_name || t?.entity_id) || "" : e.formatEntityName(t, { type: n }) || "";
}
function is(e, t) {
	let n = t && e?.areas?.[t] ? e.areas[t].floor_id : "";
	return n && e?.floors?.[n] && e.floors[n].name || "";
}
function as(e, t) {
	let n = `ui.components.entity.entity-name-picker.mode_${t}`, r = e.hass?.localize?.(n);
	return r && r !== n ? r : t === "custom" ? e._t("Custom") : "Composed";
}
function os(e) {
	let t = "ui.components.entity.entity-name-picker.add", n = e.hass?.localize?.(t);
	return n && n !== t ? n : e._t("Add");
}
function ss(e) {
	let t = "ui.components.entity.entity-name-picker.search", n = e.hass?.localize?.(t);
	return n && n !== t ? n : e._t("Search");
}
function cs(e) {
	let t = "ui.components.entity.entity-name-picker.custom_name", n = e.hass?.localize?.(t);
	return n && n !== t ? n : e._t("Name");
}
function ls(e, t) {
	let n = `ui.components.entity.entity-name-picker.types.${t}`, r = e.hass?.localize?.(n);
	return r && r !== n ? r : t;
}
//#endregion
//#region src/editors/area/sections/area.js
function us() {
	return E`
    <div class="section">
      ${fs.call(this)}

      ${this._renderArea("Area", "area")}

      ${this._renderColor("Color", "color")}

      ${this._renderEntity("Main entity", "main_entity")}
      ${ps.call(this)}
      ${this._config?.main_entity ? this._renderTemplateInput("State template", "state_template") : ""}

      ${q.call(this, {
		interactions: [
			{
				key: "tap_action",
				formKey: "tap_action",
				label: "Tap behavior",
				defaultAction: ds(this._config),
				defaultVisible: !0,
				displayDefaultValue: !0
			},
			{
				key: "hold_action",
				formKey: "hold_action",
				label: "Hold behavior",
				defaultAction: "none"
			},
			{
				key: "double_tap_action",
				formKey: "double_tap_action",
				label: "Double tap behavior",
				defaultAction: "none"
			},
			this._config?.main_entity ? {
				key: "main_entity_tap_action",
				formKey: "icon_tap_action",
				label: "Icon tap behavior",
				defaultAction: "more-info",
				defaultVisible: !0
			} : null,
			this._config?.main_entity ? {
				key: "main_entity_hold_action",
				formKey: "icon_hold_action",
				label: "Icon hold behavior",
				defaultAction: "none"
			} : null,
			this._config?.main_entity ? {
				key: "main_entity_double_tap_action",
				formKey: "icon_double_tap_action",
				label: "Icon double tap behavior",
				defaultAction: "none"
			} : null
		],
		context: {
			entity_id: this._config?.main_entity,
			area_id: this._config?.area
		}
	})}
    </div>
  `;
}
function ds(e = {}) {
	return {
		action: "navigate",
		navigation_path: e.tap_action?.navigation_path || e.navigate?.navigation_path || e.navigation_path || "/lovelace/home"
	};
}
function fs() {
	return Mo.call(this, {
		label: "Name",
		valueKey: "area_name",
		legacyValueKey: "room_name",
		entityKey: "main_entity",
		areaKey: "area",
		defaultType: "area"
	});
}
function ps() {
	return li.call(this, {
		label: "Icon",
		sourceKey: "icon_source",
		templateKey: "icon",
		entityKey: "main_entity",
		areaKey: "area",
		allowArea: !0,
		customIconKeys: [
			"icon",
			"icon_on",
			"icon_off"
		],
		renderCustom() {
			return E`
        ${this._renderIconInput("", "icon")}

        <div class="icon-pair">
          ${this._renderIconInput(["Active", "Icon"], "icon_on")}
          ${this._renderIconInput(["Inactive", "Icon"], "icon_off")}
        </div>
      `;
		}
	});
}
//#endregion
//#region src/editors/area/sections/buttons.js
function ms() {
	let e = this._selectedButtonIndex || 1;
	return E`
    <div class="section">
      ${hs.call(this, [
		1,
		2,
		3,
		4
	], e, (e) => {
		this._selectedButtonIndex = e;
	})}

      ${gs.call(this, e)}
    </div>
  `;
}
function hs(e, t, n) {
	return E`
    <div
      class="editor-segment-menu"
      style="--editor-segment-columns: 4;"
    >
      ${e.map((e) => E`
        <button
          type="button"
          class="editor-segment-item ${t === e ? "active" : ""}"
          @click=${() => n(e)}
        >
          ${this._t("Button {index}", { index: e })}
        </button>
      `)}
    </div>
  `;
}
function gs(e) {
	let t = `button${e}`, n = this._areaButtonDomainFilter || "all";
	return E`
    <div class="sub-section selected-button-section">
      <div class="field">
        <label>${this._t("Entity")}</label>

        ${Ga.call(this, {
		value: this._config?.[t] || "",
		filterOptions: _s,
		activeFilter: n,
		onValueChanged: (e) => this._handleEntityUpdate ? this._handleEntityUpdate(t, e) : this._handleConfigUpdate(t, e)
	})}
      </div>

      ${this._renderColorPair({
		label: "Color",
		onKey: `${t}_color_on`,
		offKey: `${t}_color_off`,
		onPreviewValue: "theme",
		offPreviewValue: "theme"
	})}

      ${li.call(this, {
		label: "Icon",
		sourceKey: `${t}_icon_source`,
		templateKey: `${t}_icon`,
		entityKey: t,
		customIconKeys: [
			`${t}_icon`,
			`${t}_icon_on`,
			`${t}_icon_off`
		],
		renderCustom() {
			return E`
            ${this._renderIconInput("", `${t}_icon`)}
            <div class="icon-pair">
              ${this._renderIconInput(["Active", "Icon"], `${t}_icon_on`)}
              ${this._renderIconInput(["Inactive", "Icon"], `${t}_icon_off`)}
            </div>
          `;
		}
	})}

      ${this._renderTemplateInput("State template", `${t}_state_template`)}

      ${q.call(this, {
		interactions: [
			{
				key: `${t}_tap_action`,
				formKey: "tap_action",
				label: "Tap behavior",
				defaultAction: "toggle",
				defaultVisible: !0
			},
			{
				key: `${t}_hold_action`,
				formKey: "hold_action",
				label: "Hold behavior",
				defaultAction: "more-info"
			},
			{
				key: `${t}_double_tap_action`,
				formKey: "double_tap_action",
				label: "Double tap behavior",
				defaultAction: "none"
			}
		],
		context: {
			entity_id: this._config?.[t],
			area_id: this._config?.area
		}
	})}
    </div>
  `;
}
var _s = [
	{
		label: "All",
		value: "all",
		domains: null
	},
	{
		label: "Lights",
		haDomains: ["light"],
		value: "light",
		domains: ["light"]
	},
	{
		label: "Switches",
		haDomains: ["switch"],
		value: "switch",
		domains: ["switch"]
	}
];
//#endregion
//#region src/editors/area/sections/curve-buttons.js
function vs() {
	let e = this._selectedCurveButtonIndex || 1;
	return E`
    <div class="section">
      <label class="editor-toggle-row">
        <span>${this._t("Lock curve button positions")}</span>
        <ha-switch
          .checked=${!!this._config?.curve_buttons_lock_position}
          @change=${(e) => this._updateConfig({ curve_buttons_lock_position: e.target.checked })}
        ></ha-switch>
      </label>

      <div class="curve-divider"></div>

      ${bs.call(this, [
		1,
		2,
		3,
		4,
		5,
		6
	], e, (e) => {
		this._selectedCurveButtonIndex = e;
	})}

      ${xs.call(this, `curve_button${e}`, "", "more-info", { index: e }, {
		showColors: !0,
		filteredEntity: !0,
		filterKey: "_areaCurveButtonDomainFilter",
		filters: Cs
	})}
    </div>
  `;
}
function ys() {
	let e = tr(this._config?.action_button);
	return E`
    <div class="section">
      ${xs.call(this, "action_button", "", e, {}, {
		showColors: !0,
		filteredEntity: !0
	})}
    </div>
  `;
}
function bs(e, t, n) {
	return E`
    <div class="editor-segment-menu">
      ${e.map((e) => E`
        <button
          type="button"
          class="editor-segment-item ${t === e ? "active" : ""}"
          @click=${() => n(e)}
        >
          ${this._t("Button {index}", { index: e })}
        </button>
      `)}
    </div>
  `;
}
function xs(e, t, n, r = {}, i = {}) {
	let a = this._config?.[e];
	return E`
    <div class="sub-section selected-button-section">
      ${t ? E`
            <div class="sub-section-title">
              ${this._t(t, r)}
            </div>
          ` : ""}

      ${i.filteredEntity ? ws.call(this, "Entity", e, i) : this._renderEntity("Entity", e)}

      ${i.showColors ? this._renderColorPair({
		label: "Color",
		onKey: `${e}_color_on`,
		offKey: `${e}_color_off`,
		onPreviewValue: this._config?.color || "theme",
		offPreviewValue: this._config?.color || "theme"
	}) : ""}

      ${li.call(this, {
		label: "Icon",
		sourceKey: `${e}_icon_source`,
		templateKey: `${e}_icon`,
		entityKey: e,
		customIconKeys: [
			`${e}_icon`,
			`${e}_icon_on`,
			`${e}_icon_off`
		],
		renderCustom() {
			return E`
            ${this._renderIconInput("", `${e}_icon`)}
            <div class="icon-pair">
              ${this._renderIconInput(["Active", "Icon"], `${e}_icon_on`)}
              ${this._renderIconInput(["Inactive", "Icon"], `${e}_icon_off`)}
            </div>
          `;
		}
	})}

      ${this._renderTemplateInput("State template", `${e}_state_template`)}

      ${q.call(this, {
		interactions: [
			{
				key: `${e}_tap_action`,
				formKey: "tap_action",
				label: "Tap behavior",
				defaultAction: n,
				defaultVisible: !0
			},
			{
				key: `${e}_hold_action`,
				formKey: "hold_action",
				label: "Hold behavior",
				defaultAction: "none"
			},
			{
				key: `${e}_double_tap_action`,
				formKey: "double_tap_action",
				label: "Double tap behavior",
				defaultAction: "none"
			}
		],
		context: {
			entity_id: a,
			area_id: this._config?.area
		}
	})}
    </div>
  `;
}
var Ss = [
	{
		label: "All",
		value: "all",
		domains: null
	},
	{
		label: "Automations",
		haDomains: ["automation"],
		value: "automation",
		domains: ["automation"]
	},
	{
		label: "Buttons",
		haDomains: ["button"],
		value: "button",
		domains: [
			"button",
			"input_button",
			"input_boolean"
		]
	},
	{
		label: "Cameras",
		haDomains: ["camera"],
		value: "camera",
		domains: ["camera"]
	},
	{
		label: "Scenes",
		haDomains: ["scene"],
		value: "scene",
		domains: ["scene"]
	},
	{
		label: "Scripts",
		haDomains: ["script"],
		value: "script",
		domains: ["script"]
	}
], Cs = [
	{
		label: "All",
		value: "all",
		domains: null
	},
	{
		label: "Covers",
		haDomains: ["cover"],
		value: "cover",
		domains: ["cover"]
	},
	{
		label: "Lights",
		haDomains: ["light"],
		value: "light",
		domains: ["light"]
	},
	{
		label: "Sensors",
		haDomains: ["sensor"],
		value: "sensor",
		domains: ["sensor", "binary_sensor"]
	},
	{
		label: "Switches",
		haDomains: ["switch"],
		value: "switch",
		domains: ["switch"]
	}
];
function ws(e, t, n = {}) {
	let r = this[n.filterKey || "_areaActionButtonDomainFilter"] || "all", i = n.filters || Ss;
	return E`
    <div class="field">
      <label>${this._t(e)}</label>

      ${Ga.call(this, {
		value: this._config?.[t] || "",
		filterOptions: i,
		activeFilter: r,
		onValueChanged: (e) => this._handleEntityUpdate ? this._handleEntityUpdate(t, e) : this._handleConfigUpdate(t, e)
	})}
    </div>
  `;
}
//#endregion
//#region src/common/editor/styles/editor-styles.js
var Ts = [
	d`
:host {
  display: block;
  font-family: var(--ha-font-family-body, var(--mdc-typography-font-family, Roboto, Noto, sans-serif));
  font-size: var(--ha-font-size-m, 14px);
  font-weight: var(--ha-font-weight-normal, 400);
  line-height: var(--ha-line-height-normal, 20px);
  color: var(--primary-text-color);

  --orbit-editor-surface: color-mix(
    in srgb,
    var(--card-background-color, var(--secondary-background-color)) 96%,
    var(--primary-text-color, #fff) 4%
  );
  --orbit-editor-control: var(
    --input-fill-color,
    var(
      --mdc-text-field-fill-color,
      color-mix(
        in srgb,
        var(--card-background-color, var(--secondary-background-color)) 88%,
        var(--primary-text-color, #fff) 12%
      )
    )
  );
  --orbit-editor-control-hover: color-mix(
    in srgb,
    var(--orbit-editor-control) 86%,
    var(--primary-text-color, #fff) 14%
  );
  --orbit-editor-border: var(--outline-color, var(--divider-color));
  --orbit-editor-popover: color-mix(
    in srgb,
    var(--card-background-color, var(--secondary-background-color)) 94%,
    var(--primary-text-color, #fff) 6%
  );
  --orbit-editor-active: color-mix(
    in srgb,
    var(--primary-color) 20%,
    transparent
  );
}

.wrapper {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
`,
	d`
.section {
  display: flex;
  flex-direction: column;
  gap: 12px;

  padding: 0;

  border: none;
  border-radius: 0;

  background: transparent;
}

.sub-section {
  display: flex;
  flex-direction: column;
  gap: 8px;

  padding-bottom: 12px;
  margin-bottom: 12px;

  border-bottom: 1px solid var(--orbit-editor-border);
}

.sub-section:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.curve-divider {
  height: 1px;

  margin: 4px 0 6px 0;

  background: var(--orbit-editor-border);
}
`,
	d`
.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  cursor: pointer;

  user-select: none;

  font-size: var(--ha-font-size-m, 14px);
  font-weight: var(--ha-font-weight-medium, 500);
  line-height: var(--ha-line-height-normal, 20px);

  opacity: 0.75;

  transition: opacity 0.2s ease;
}

.section-header:hover {
  opacity: 1;
}

.sub-section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  cursor: pointer;

  user-select: none;

  font-size: var(--ha-font-size-m, 14px);
  font-weight: var(--ha-font-weight-medium, 500);
  line-height: var(--ha-line-height-normal, 20px);

  opacity: 0.72;

  padding-bottom: 6px;

  transition: opacity 0.2s ease;
}

.sub-section-header:hover {
  opacity: 1;
}

.collapse-icon {
  font-size: 18px;
  line-height: 1;
}
`,
	d`
.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field > label {
  color: var(--primary-text-color);
  font-size: var(--ha-font-size-m, 14px);
  font-weight: var(--ha-font-weight-medium, 500);
  line-height: var(--ha-line-height-condensed, 20px);
}

.field-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.field-header > label {
  color: var(--primary-text-color);
  font-size: var(--ha-font-size-m, 14px);
  font-weight: var(--ha-font-weight-medium, 500);
  line-height: var(--ha-line-height-condensed, 20px);
}

.editor-header-button-toggle,
.main-entity-icon-source-selector,
.name-picker-mode-selector,
.color-pair-source-selector {
  flex: 0 1 auto;
  width: auto;
  max-width: 100%;
}

.editor-button-toggle-field .field-header,
.main-entity-icon-source-field .field-header,
.name-picker-fallback .field-header {
  min-height: 40px;
}

.color-pair-control {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  min-width: 0;
}

.color-pair-source-header {
  min-height: 40px;
}

.color-pair-source-header > label {
  flex: 0 0 auto;
  white-space: nowrap;
}

.name-picker-field ha-entity-name-picker,
.name-picker-custom-input,
.name-picker-composed-picker {
  display: block;
  width: 100%;
}

.name-picker-composed-picker {
  --ha-generic-picker-width: min(360px, calc(100vw - 48px));
  --ha-generic-picker-max-width: min(360px, calc(100vw - 48px));
}

.name-picker-composed-field {
  min-height: 56px;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  padding: 12px 24px;
  border-radius: 4px 4px 0 0;
  border-bottom: 1px solid var(--input-ink-color, var(--secondary-text-color));
  background: var(--orbit-editor-control);
  box-sizing: border-box;
}

.name-picker-composed-field:focus-within {
  border-bottom-color: var(--primary-color);
  box-shadow: inset 0 -1px 0 var(--primary-color);
}

.name-picker-chip,
.name-picker-add-chip {
  min-height: 32px;
  border: 1px solid var(--orbit-editor-border);
  border-radius: var(--ha-border-radius-pill, 999px);
  background: color-mix(
    in srgb,
    var(--primary-text-color) 10%,
    transparent
  );
  color: var(--primary-text-color);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0 12px;
  font: inherit;
  font-size: var(--ha-font-size-m, 14px);
  line-height: var(--ha-line-height-normal, 20px);
  cursor: pointer;
}

.name-picker-add-chip {
  background: transparent;
}

.name-picker-chip ha-icon,
.name-picker-add-chip ha-icon {
  --mdc-icon-size: 18px;
  color: var(--secondary-text-color);
}

.name-picker-chip-remove {
  margin-right: -4px;
}

.status-badge-hide-hidden-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  min-height: 40px;
}

.status-badge-device-class-options {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  align-items: center;
  column-gap: 16px;
  row-gap: 8px;
  min-height: 40px;
}

.status-badge-device-class-options ha-checkbox {
  display: inline-flex;
}

.status-area-count-low-sensors-hint {
  color: var(--secondary-text-color);
  font-size: 12px;
  line-height: 1.35;
}

.color-pair,
.selector-pair,
.icon-pair {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.status-settings-row .status-separator-field {
  padding-top: 44px;
}

@media (max-width: 640px) {
  .color-pair,
  .selector-pair,
  .icon-pair {
    grid-template-columns: 1fr;
  }

  .status-settings-row .status-separator-field {
    padding-top: 0;
  }
}

.editor-toggle-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 36px;
  font-size: var(--ha-font-size-m, 14px);
  font-weight: var(--ha-font-weight-normal, 400);
  line-height: var(--ha-line-height-normal, 20px);
  opacity: 0.9;
}

.editor-toggle-row span {
  opacity: 0.78;
}

input,
select,
ha-selector {
  width: 100%;
}

ha-selector {
  display: block;
}

input,
select {
  height: 56px;
  padding: 0 16px;

  border: none;
  border-bottom: 1px solid var(--input-ink-color, var(--secondary-text-color));
  border-radius: 4px 4px 0 0;

  background: var(--orbit-editor-control);
  color: inherit;
  font: inherit;
  font-size: var(--ha-font-size-l, 16px);
  line-height: var(--ha-line-height-expanded, 24px);

  outline: none;
  box-sizing: border-box;
}

input:focus,
select:focus {
  border-bottom-color: var(--primary-color);
  box-shadow: inset 0 -1px 0 var(--primary-color);
}

input::placeholder {
  color: var(--secondary-text-color);
  opacity: 1;
}

select {
  appearance: auto;
}

.editor-note {
  padding: 10px 12px;
  border-radius: 10px;
  background: var(--orbit-editor-control);
  border: 1px solid var(--orbit-editor-border);
  color: inherit;
  font-size: var(--ha-font-size-s, 12px);
  line-height: var(--ha-line-height-condensed, 18px);
  opacity: 0.72;
}

.editor-note code {
  display: block;
  margin-top: 4px;
  font-family: monospace;
  white-space: normal;
  overflow-wrap: anywhere;
}

`,
	d`
.entity-picker {
  width: 100%;
  display: block;
}

.entity-picker::part(root),
.entity-picker * {
  box-sizing: border-box;
}

`,
	d`
.color-row {
  position: relative;
}

.color-control-button {
  width: 100%;
  height: 56px;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 12px;
  padding: 0 16px;
  border: 0;
  border-bottom: 1px solid var(--input-ink-color, var(--secondary-text-color));
  border-radius: 4px 4px 0 0;
  background: var(--orbit-editor-control);
  color: inherit;
  cursor: pointer;
  font: inherit;
  font-size: var(--ha-font-size-l, 16px);
  font-weight: var(--ha-font-weight-normal, 400);
  line-height: var(--ha-line-height-expanded, 24px);
  text-align: left;
  box-sizing: border-box;
}

.color-control-button:focus {
  border-bottom-color: var(--primary-color);
  box-shadow: inset 0 -1px 0 var(--primary-color);
  outline: none;
}

.color-control-button ha-icon {
  --mdc-icon-size: 20px;
  opacity: 0.72;
}

.color-control-label {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.color-control-label.placeholder {
  color: var(--secondary-text-color);
}

.color-preview {
  position: relative;
  flex: none;
  width: 34px;
  height: 34px;
  border-radius: var(--ha-border-radius-md, 8px);
  border: 1px solid var(--orbit-editor-border);
  cursor: pointer;
  overflow: hidden;
}

.color-popover {
  position: relative;
  width: 100%;
  max-width: 100%;
  padding: 0;
  border: 0;
  border-radius: 0;
  background: transparent;
  box-sizing: border-box;
}

.color-tabs {
  display: flex;
  align-items: end;
  gap: 0;
  margin-bottom: 10px;
  border-bottom: 1px solid var(--orbit-editor-border);
  overflow-x: auto;
}

.color-tabs button {
  position: relative;
  flex: 1 1 0;
  min-width: 44px;
  height: 34px;
  padding: 0 12px;
  border: 0;
  border-bottom: 3px solid transparent;
  border-radius: 0;
  background: transparent;
  color: inherit;
  cursor: pointer;
  font: inherit;
  font-size: var(--ha-font-size-m, 14px);
  font-weight: var(--ha-font-weight-medium, 500);
  line-height: var(--ha-line-height-normal, 20px);
  opacity: 0.62;
  overflow: hidden;
}

.color-tabs button ha-icon {
  --mdc-icon-size: 20px;
  pointer-events: none;
}

.color-tabs button.active {
  color: var(--primary-color);
  border-bottom-color: var(--primary-color);
  opacity: 1;
}

.native-color-picker-field {
  position: relative;
  width: 100%;
  height: 56px;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto auto;
  align-items: center;
  gap: 12px;
  padding: 0 16px;
  border: 0;
  border-bottom: 1px solid var(--input-ink-color, var(--secondary-text-color));
  border-radius: 4px 4px 0 0;
  background: var(--orbit-editor-control);
  color: inherit;
  cursor: pointer;
  box-sizing: border-box;
}

.native-color-picker-field:focus-within {
  border-bottom-color: var(--primary-color);
  box-shadow: inset 0 -1px 0 var(--primary-color);
}

.native-color-picker-input {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  border: 0;
  cursor: pointer;
  z-index: 1;
}

.native-color-picker-swatch {
  position: relative;
  z-index: 2;
  display: block;
  width: 20px;
  height: 20px;
  border-radius: var(--ha-border-radius-pill, 999px);
  border: 1px solid var(--outline-color, var(--divider-color));
  box-sizing: border-box;
  pointer-events: none;
}

.native-color-picker-empty-swatch {
  position: relative;
  z-index: 2;
  display: block;
  width: 20px;
  height: 20px;
  pointer-events: none;
}

.native-color-picker-text {
  position: relative;
  z-index: 2;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2px;
  pointer-events: none;
}

.native-color-picker-label {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: var(--ha-font-size-m, 14px);
  line-height: var(--ha-line-height-normal, 20px);
  color: var(--secondary-text-color);
}

.native-color-picker-value {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: var(--ha-font-size-m, 14px);
  line-height: var(--ha-line-height-normal, 20px);
  letter-spacing: 0;
}

.native-color-picker-value.empty {
  min-height: 20px;
}

.native-color-picker-clear {
  position: relative;
  z-index: 3;
  width: 36px;
  height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 0 -8px 0 0;
  padding: 0;
  border: 0;
  border-radius: var(--ha-border-radius-pill, 999px);
  background: transparent;
  color: var(--secondary-text-color);
  cursor: pointer;
}

.native-color-picker-clear:hover,
.native-color-picker-clear:focus {
  background: color-mix(in srgb, var(--primary-text-color) 10%, transparent);
  color: var(--primary-text-color);
  outline: none;
}

.native-color-picker-clear ha-icon {
  --mdc-icon-size: 22px;
}

.native-color-picker-arrow {
  position: relative;
  z-index: 2;
  --mdc-icon-size: 20px;
  color: var(--secondary-text-color);
  pointer-events: none;
}

.theme-color-picker {
  position: relative;
}

.color-template-input {
  position: relative;
}

.color-template-input ha-selector {
  display: block;
}

.theme-color-picker ha-generic-picker {
  display: block;
  --ha-generic-picker-width: min(360px, calc(100vw - 48px));
  --ha-generic-picker-max-width: min(360px, calc(100vw - 48px));
}

.theme-color-select {
  width: 100%;
  height: 56px;
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  align-items: center;
  gap: 12px;
  padding: 0 16px;
  border: 0;
  border-bottom: 1px solid var(--orbit-editor-border);
  border-radius: 4px 4px 0 0;
  background: var(--orbit-editor-control);
  color: inherit;
  cursor: pointer;
  font: inherit;
  font-size: var(--ha-font-size-l, 16px);
  font-weight: var(--ha-font-weight-normal, 400);
  line-height: var(--ha-line-height-expanded, 24px);
  text-align: left;
}

.theme-color-select ha-icon {
  --mdc-icon-size: 20px;
  opacity: 0.7;
}

.theme-color-empty {
  grid-column: 1 / 4;
  min-height: 24px;
}

.theme-color-menu {
  position: absolute;
  z-index: 25;
  top: calc(100% + 2px);
  left: 0;
  right: 0;
  border-radius: var(--ha-border-radius-xl, 16px);
  background: var(--mdc-theme-surface, var(--orbit-editor-popover));
  border: 1px solid var(--orbit-editor-border);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
  overflow: hidden;
}

.theme-color-search {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 10px;
  padding: 0 10px;
  height: 40px;
  border: 1px solid var(--primary-color);
  border-radius: var(--ha-border-radius-md, 8px);
  background: var(--mdc-theme-surface, var(--orbit-editor-popover));
}

.theme-color-search ha-icon {
  --mdc-icon-size: 20px;
  opacity: 0.68;
}

.theme-color-search input {
  flex: 1;
  min-width: 0;
  height: 100%;
  padding: 0;
  border: 0;
  outline: none;
  background: transparent;
  color: inherit;
  font: inherit;
}

.theme-color-options {
  max-height: 392px;
  overflow: auto;
  border-top: 1px solid var(--orbit-editor-border);
}

.theme-color-option {
  width: 100%;
  min-height: 46px;
  display: grid;
  grid-template-columns: 30px 1fr auto;
  align-items: center;
  gap: 14px;
  padding: 8px 14px;
  border: 0;
  background: transparent;
  color: inherit;
  cursor: pointer;
  font: inherit;
  font-size: var(--ha-font-size-l, 16px);
  line-height: var(--ha-line-height-expanded, 24px);
  text-align: left;
}

.theme-color-option.active {
  background: var(--orbit-editor-active);
}

.theme-color-no-results {
  padding: 14px;
  opacity: 0.72;
}

.theme-color-preview {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
}

.theme-color-swatch {
  display: block;
  flex: none;
  width: 20px;
  height: 20px;
  border-radius: var(--ha-border-radius-pill, 999px);
  border: 1px solid var(--orbit-editor-border);
  box-sizing: border-box;
}

.theme-color-default-icon {
  --mdc-icon-size: 20px;
  color: var(--secondary-text-color);
}

.theme-color-name {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.theme-source-badge {
  display: inline-flex;
  flex: none;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  background: var(--primary-color);
  color: var(--text-primary-color);
  font-size: 8px;
  font-weight: 800;
  line-height: 1;
}

.theme-source-badge-theme {
  background: var(--accent-color, var(--primary-color));
}

.theme-source-badge-standard {
  background: var(--primary-color);
}

.icon-input-row {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
}

.icon-input-row input {
  flex: 1;
}

.icon-preview {
  width: 34px;
  height: 34px;
  min-width: 34px;
  border-radius: var(--ha-border-radius-md, 8px);
  background: var(--orbit-editor-control);
  border: 1px solid var(--orbit-editor-border);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;
}

.preview-image-stack {
  position: relative;
  width: 24px;
  height: 24px;
  display: block;
}

.icon-preview .preview-image,
.icon-preview .preview-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.icon-preview .preview-image {
  object-fit: contain;
  filter: brightness(0) invert(1);
}

.icon-preview .preview-svg {
  color: currentColor;
  display: flex;
  background: transparent;
}

.icon-preview .preview-svg svg {
  width: 100%;
  height: 100%;
}

.icon-preview ha-icon {
  --mdc-icon-size: 24px;
}

.icon-popover {
  position: absolute;
  z-index: 20;
  top: calc(100% + 8px);
  right: 0;
  width: min(360px, 100%);
  padding: 10px;
  border-radius: var(--ha-border-radius-xl, 16px);
  background: var(--mdc-theme-surface, var(--card-background-color, var(--secondary-background-color)));
  box-shadow: var(--ha-card-box-shadow, 0 8px 24px rgba(0, 0, 0, 0.35));
  border: 1px solid var(--orbit-editor-border);
}

.icon-picker-panel {
  position: relative;
  width: 100%;
  max-width: 100%;
  padding: 0;
  border: 0;
  border-radius: 0;
  background: transparent;
  box-sizing: border-box;
}

.icon-picker-panel ha-icon-picker,
.icon-picker-panel ha-generic-picker {
  display: block;
  width: 100%;
}

.icon-picker-panel ha-icon-picker {
  --ha-icon-picker-width: 100%;
  --ha-icon-picker-max-width: 100%;
}

.icon-picker-panel ha-generic-picker {
  --ha-generic-picker-width: min(360px, calc(100vw - 48px));
  --ha-generic-picker-max-width: min(360px, calc(100vw - 48px));
}

.file-picker-preview {
  display: inline-flex;
  flex: none;
  width: 24px;
  height: 24px;
  min-width: 24px;
  min-height: 24px;
  max-width: 24px;
  max-height: 24px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  line-height: 0;
  color: var(--secondary-text-color);
}

.file-picker-preview-inner {
  display: inline-flex;
  width: 24px;
  height: 24px;
  min-width: 24px;
  min-height: 24px;
  max-width: 24px;
  max-height: 24px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  line-height: 0;
  color: inherit;
}

.file-picker-preview-inner svg,
.file-picker-preview-inner img {
  display: block;
  width: 24px !important;
  height: 24px !important;
  min-width: 24px !important;
  min-height: 24px !important;
  max-width: 24px !important;
  max-height: 24px !important;
  object-fit: contain;
}

.file-picker-preview-inner img {
  filter: brightness(0) opacity(0.72);
}

.file-picker-preview-inner img.dark {
  filter: brightness(0) invert(0.72);
}

.icon-tabs {
  display: flex;
  align-items: end;
  gap: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid var(--orbit-editor-border);
  overflow-x: auto;
}

.icon-tabs button {
  border: 0;
  border-bottom: 3px solid transparent;
  border-radius: 0;
  min-width: 92px;
  height: 34px;
  padding: 0 12px;
  background: transparent;
  color: inherit;
  cursor: pointer;
  font: inherit;
  font-size: var(--ha-font-size-m, 14px);
  font-weight: var(--ha-font-weight-medium, 500);
  line-height: var(--ha-line-height-normal, 20px);
  opacity: 0.62;
}

.icon-tabs button.active {
  color: var(--primary-color);
  border-bottom-color: var(--primary-color);
  opacity: 1;
}

.icon-source-template-field ha-selector {
  display: block;
}

.file-icon-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1px;
  overflow: hidden;
  background: var(--orbit-editor-popover);
}

.file-icon-section + .file-icon-section {
  margin-top: 10px;
}

.file-icon-section-title {
  margin: 0 0 6px;
  font-size: var(--ha-font-size-s, 12px);
  font-weight: var(--ha-font-weight-medium, 500);
  line-height: var(--ha-line-height-condensed, 18px);
  opacity: 0.62;
  text-transform: uppercase;
}

.icon-popover {
  max-height: 320px;
  overflow: auto;
}

.file-icon-option {
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 0;
  min-height: 54px;
  padding: 10px 14px;
  border: 0;
  border-radius: 0;
  background: var(--orbit-editor-popover);
  color: var(--primary-text-color);
  cursor: pointer;
  font: inherit;
  font-size: var(--ha-font-size-l, 16px);
  font-weight: var(--ha-font-weight-normal, 400);
  line-height: var(--ha-line-height-expanded, 24px);
  text-align: left;
}

.file-icon-option.active {
  background: rgba(var(--rgb-primary-color, 3, 169, 244), 0.18);
}

.file-icon-option:hover {
  background: var(--orbit-editor-control-hover);
}

.file-icon-preview {
  display: inline-flex;
  flex: none;
  width: 24px;
  height: 24px;
  min-width: 24px;
  min-height: 24px;
  max-width: 24px;
  max-height: 24px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  line-height: 0;
  color: var(--secondary-text-color);
}

.file-icon-preview svg,
.file-icon-preview img {
  display: block;
  width: 24px !important;
  height: 24px !important;
  min-width: 24px !important;
  min-height: 24px !important;
  max-width: 24px !important;
  max-height: 24px !important;
  object-fit: contain;
}

.file-icon-option span:last-child {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.icon-picker-note {
  padding: 10px;
  border-radius: 9px;
  background: var(--orbit-editor-control);
  font-size: var(--ha-font-size-s, 12px);
  line-height: var(--ha-line-height-condensed, 18px);
  opacity: 0.76;
}

.icon-picker-note code {
  display: block;
  margin-top: 5px;
  overflow-wrap: anywhere;
}
`,
	d`
.action-field {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.interactions-form {
  display: block;
  margin-top: 0;
}

.interactions-form ha-form {
  display: block;
}

.action-picker {
  width: 100%;
}

.action-picker ha-generic-picker,
.action-subfield ha-navigation-picker,
.action-subfield ha-service-control,
.action-subfield ha-input,
.action-subfield ha-selector {
  width: 100%;
}

.action-subfield ha-navigation-picker,
.action-subfield ha-service-control,
.action-subfield ha-input {
  display: block;
}

.action-subfield ha-service-control {
  --service-control-padding: 0;
}

.action-picker ha-combo-box-item ha-icon,
.action-picker ha-icon[slot="start"] {
  color: var(--secondary-text-color);
}

.inline-field {
  display: flex;
  align-items: center;
  gap: 10px;
}

.inline-label {
  width: 80px;
  min-width: 80px;

  font-size: var(--ha-font-size-m, 14px);
  font-weight: var(--ha-font-weight-normal, 400);
  line-height: var(--ha-line-height-normal, 20px);
  opacity: 0.7;
}

.inline-field input {
  flex: 1;
}

.action-subfield {
  align-items: flex-start;
}

.action-subfield .inline-label {
  padding-top: 18px;
}

.action-subfield input {
  min-height: 56px;
}
`,
	d`
.editor-version {
  padding: 0 14px;
  font-size: var(--ha-font-size-xs, 11px);
  font-weight: var(--ha-font-weight-normal, 400);
  line-height: var(--ha-line-height-condensed, 18px);
  opacity: 0.5;
  text-align: right;
}
`,
	d`
.editor-tabs {
  display: flex;
  align-items: end;
  gap: 10px;
  border-bottom: 1px solid var(--orbit-editor-border);
  overflow-x: auto;
}

.editor-tabs + .editor-tabs {
  margin-top: -12px;
}

.editor-tab {
  min-width: 72px;
  height: 42px;
  padding: 0 12px;
  border: none;
  border-bottom: 3px solid transparent;
  background: transparent;
  color: inherit;
  font: inherit;
  font-size: var(--ha-font-size-m, 14px);
  font-weight: var(--ha-font-weight-medium, 500);
  line-height: var(--ha-line-height-normal, 20px);
  opacity: 0.62;
  cursor: pointer;
}

.editor-tab.active {
  color: var(--primary-color);
  border-bottom-color: var(--primary-color);
  opacity: 1;
}

.editor-segment-menu {
  display: grid;
  grid-template-columns: repeat(
    var(--editor-segment-columns, 3),
    minmax(0, 1fr)
  );
  gap: 6px;
  padding: 6px;
  border-radius: var(--ha-border-radius-xl, 16px);
  background: var(--orbit-editor-surface);
  border: 1px solid var(--orbit-editor-border);
}

.editor-segment-item {
  min-width: 0;
  height: 34px;
  padding: 0 10px;
  border: none;
  border-radius: var(--ha-border-radius-lg, 12px);
  background: transparent;
  color: inherit;
  font: inherit;
  font-size: var(--ha-font-size-m, 14px);
  font-weight: var(--ha-font-weight-medium, 500);
  line-height: var(--ha-line-height-normal, 20px);
  opacity: 0.58;
  cursor: pointer;
}

.editor-segment-item.active {
  background: var(--orbit-editor-active);
  color: var(--primary-color);
  opacity: 1;
}

.selected-button-section {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.sub-section-title {
  margin-bottom: 12px;
  font-size: var(--ha-font-size-m, 14px);
  font-weight: var(--ha-font-weight-medium, 500);
  line-height: var(--ha-line-height-normal, 20px);
  opacity: 0.62;
}
`
], Es = {
	Stronger: "Stronger",
	Weaker: "Weaker",
	"Current state": "Current state",
	"Currently {state}": "Currently {state}",
	"No active entities": "No active entities",
	"This will turn off {count} active entities.": "This will turn off {count} active entities.",
	Always: "Always",
	"Area Count": "Area Count",
	Badge: "Badge",
	"Device class": "Device class",
	"Hidden entities": "Hidden entities",
	"Name template": "Name template",
	"Not configured": "Not configured",
	"State type": "State type",
	"Active template": "Active template",
	"Inactive template": "Inactive template",
	"Action button": "Action button",
	"Actions per row": "Actions per row",
	"Add a card to start.": "Add a card to start.",
	"Battery entity {index}": "Battery entity {index}",
	"Button {index}": "Button {index}",
	Cards: "Cards",
	"Curve buttons": "Curve buttons",
	Dynamic: "Dynamic",
	"ETA entity": "ETA entity",
	Files: "Files",
	"Icon only": "Icon only",
	"Items per row": "Items per row",
	"Loading files...": "Loading files...",
	"Lock curve button positions": "Lock curve button positions",
	"Main entity": "Main entity",
	"Move left": "Move left",
	"Move right": "Move right",
	"No files found. Add a local icon manifest at /local/icons/manifest.json or type the filename manually.": "No files found. Add a local icon manifest at /local/icons/manifest.json or type the filename manually.",
	"No matching actions": "No matching actions",
	"No matching colors": "No matching colors",
	"No matching files": "No matching files",
	"Orbit Action Card v{version}": "Orbit Action Card v{version}",
	"Orbit Deck Card v{version}": "Orbit Deck Card v{version}",
	"Orbit Area Card v{version}": "Orbit Area Card v{version}",
	"Orbit Status Card v{version}": "Orbit Status Card v{version}",
	"Orbit Status Badge v{version}": "Orbit Status Badge v{version}",
	"Person entity": "Person entity",
	Picker: "Picker",
	"Separate cards": "Separate cards",
	"State light color": "State light color",
	"State color (default)": "State color (default)",
	"State template": "State template",
	"Status {index}": "Status {index}",
	"Card background": "Card background",
	"Force padding": "Force padding",
	Main: "Main",
	Overlay: "Overlay",
	Resize: "Resize",
	Height: "Height",
	"Transparent background": "Transparent background",
	"Primary text color": "Primary text color",
	"Secondary background color": "Secondary background color",
	"Tab font size": "Tab font size",
	"Tab width": "Tab width",
	Tabs: "Tabs",
	"Tracker entity": "Tracker entity",
	"Low sensors": "Low sensors",
	"Low sensors are only used when a device has no percentage sensor.": "Low sensors are only used when a device has no percentage sensor."
}, Ds = {
	Stronger: "Stronger",
	Weaker: "Weaker",
	"Current state": "Current state",
	"Currently {state}": "Currently {state}",
	"No active entities": "No active entities",
	"This will turn off {count} active entities.": "This will turn off {count} active entities.",
	Always: "Always",
	"Area Count": "Area Count",
	Badge: "Badge",
	"Device class": "Device class",
	"Hidden entities": "Hidden entities",
	"Name template": "Name template",
	"Not configured": "Not configured",
	"State type": "State type",
	"Active template": "Active template",
	"Inactive template": "Inactive template",
	"Action button": "Action button",
	"Actions per row": "Actions per row",
	"Add a card to start.": "Add a card to start.",
	"Battery entity {index}": "Battery entity {index}",
	"Button {index}": "Button {index}",
	Cards: "Cards",
	"Curve buttons": "Curve buttons",
	Dynamic: "Dynamic",
	"ETA entity": "ETA entity",
	Files: "Files",
	"Icon only": "Icon only",
	"Items per row": "Items per row",
	"Loading files...": "Loading files...",
	"Lock curve button positions": "Lock curve button positions",
	"Main entity": "Main entity",
	"Move left": "Move left",
	"Move right": "Move right",
	"No files found. Add a local icon manifest at /local/icons/manifest.json or type the filename manually.": "No files found. Add a local icon manifest at /local/icons/manifest.json or type the filename manually.",
	"No matching actions": "No matching actions",
	"No matching colors": "No matching colours",
	"No matching files": "No matching files",
	"Orbit Action Card v{version}": "Orbit Action Card v{version}",
	"Orbit Deck Card v{version}": "Orbit Deck Card v{version}",
	"Orbit Area Card v{version}": "Orbit Area Card v{version}",
	"Orbit Status Card v{version}": "Orbit Status Card v{version}",
	"Orbit Status Badge v{version}": "Orbit Status Badge v{version}",
	"Person entity": "Person entity",
	Picker: "Picker",
	"Separate cards": "Separate cards",
	"State light color": "State light colour",
	"State color (default)": "State colour (default)",
	"State template": "State template",
	"Status {index}": "Status {index}",
	"Card background": "Card background",
	"Force padding": "Force padding",
	Main: "Main",
	Overlay: "Overlay",
	Resize: "Resize",
	Height: "Height",
	"Transparent background": "Transparent background",
	"Primary text color": "Primary text colour",
	"Secondary background color": "Secondary background colour",
	"Tab font size": "Tab font size",
	"Tab width": "Tab width",
	Tabs: "Tabs",
	"Tracker entity": "Tracker entity",
	"Low sensors": "Low sensors",
	"Low sensors are only used when a device has no percentage sensor.": "Low sensors are only used when a device has no percentage sensor."
}, Os = {
	Stronger: "Stärker",
	Weaker: "Schwächer",
	"Current state": "Aktueller Zustand",
	"Currently {state}": "Derzeit {state}",
	"No active entities": "Keine aktiven Entitäten",
	"This will turn off {count} active entities.": "Dadurch werden {count} aktive Entitäten ausgeschaltet.",
	Always: "Immer",
	"Area Count": "Bereichszähler",
	Badge: "Abzeichen",
	"Device class": "Geräteklasse",
	"Hidden entities": "Ausgeblendete Entitäten",
	"Name template": "Namensvorlage",
	"Not configured": "Nicht konfiguriert",
	"State type": "Zustandstyp",
	"Active template": "Aktivierungsvorlage",
	"Inactive template": "Inaktivitätsvorlage",
	"Action button": "Aktionstaste",
	"Actions per row": "Aktionen pro Zeile",
	"Add a card to start.": "Füge eine Karte hinzu, um zu beginnen.",
	"Battery entity {index}": "Batterie-Entität {index}",
	"Button {index}": "Taste {index}",
	Cards: "Karten",
	"Curve buttons": "Bogen-Tasten",
	Dynamic: "Dynamisch",
	"ETA entity": "ETA-Entität",
	Files: "Dateien",
	"Icon only": "Nur Symbol",
	"Items per row": "Elemente pro Zeile",
	"Loading files...": "Dateien werden geladen...",
	"Lock curve button positions": "Bogen-Tastenpositionen sperren",
	"Main entity": "Hauptentität",
	"Move left": "Nach links verschieben",
	"Move right": "Nach rechts verschieben",
	"No matching colors": "Keine passenden Farben",
	"No matching actions": "Keine passenden Aktionen",
	"No matching files": "Keine passenden Dateien",
	"Person entity": "Personen-Entität",
	Picker: "Auswahl",
	"Separate cards": "Separate Karten",
	"State light color": "Lichtstatusfarbe",
	"State color (default)": "Statusfarbe (Standard)",
	"State template": "Zustandsvorlage",
	"Status {index}": "Status {index}",
	"Card background": "Kartenhintergrund",
	"Force padding": "Padding erzwingen",
	Main: "Hauptkarte",
	Overlay: "Überlagerung",
	Resize: "Größe ändern",
	Height: "Höhe",
	"Transparent background": "Transparenter Hintergrund",
	"Primary text color": "Primäre Textfarbe",
	"Secondary background color": "Sekundäre Hintergrundfarbe",
	"Tab font size": "Tab-Schriftgröße",
	"Tab width": "Tab-Breite",
	Tabs: "Tabs",
	"Tracker entity": "Tracker-Entität",
	"No files found. Add a local icon manifest at /local/icons/manifest.json or type the filename manually.": "Keine Dateien gefunden. Füge ein lokales Symbolmanifest unter /local/icons/manifest.json hinzu oder gib den Dateinamen manuell ein.",
	"Orbit Action Card v{version}": "Orbit Action Card v{version}",
	"Orbit Area Card v{version}": "Orbit Area Card v{version}",
	"Orbit Deck Card v{version}": "Orbit Deck Card v{version}",
	"Orbit Status Card v{version}": "Orbit Status Card v{version}",
	"Orbit Status Badge v{version}": "Orbit Status Badge v{version}",
	"Low sensors": "Sensoren für niedrigen Batteriestand",
	"Low sensors are only used when a device has no percentage sensor.": "Sensoren für niedrigen Batteriestand werden nur verwendet, wenn ein Gerät keinen Prozentsensor hat."
}, ks = {
	Stronger: "Más fuerte",
	Weaker: "Más débil",
	"Current state": "Estado actual",
	"Currently {state}": "Actualmente {state}",
	"No active entities": "No hay entidades activas",
	"This will turn off {count} active entities.": "Esto apagará {count} entidades activas.",
	Always: "Siempre",
	"Area Count": "Recuento de área",
	Badge: "Insignia",
	"Device class": "Clase de dispositivo",
	"Hidden entities": "Entidades ocultas",
	"Name template": "Plantilla de nombre",
	"Not configured": "Sin configurar",
	"State type": "Tipo de estado",
	"Active template": "Plantilla de activación",
	"Inactive template": "Plantilla de inactividad",
	"Action button": "Botón de acción",
	"Actions per row": "Acciones por fila",
	"Add a card to start.": "Añade una tarjeta para empezar.",
	"Battery entity {index}": "Entidad de batería {index}",
	"Button {index}": "Botón {index}",
	Cards: "Tarjetas",
	"Curve buttons": "Botones curvos",
	Dynamic: "Dinámico",
	"ETA entity": "Entidad ETA",
	Files: "Archivos",
	"Icon only": "Solo icono",
	"Items per row": "Elementos por fila",
	"Loading files...": "Cargando archivos...",
	"Lock curve button positions": "Bloquear posiciones de botones curvos",
	"Main entity": "Entidad principal",
	"Move left": "Mover a la izquierda",
	"Move right": "Mover a la derecha",
	"No matching colors": "No hay colores coincidentes",
	"No matching actions": "No hay acciones coincidentes",
	"No matching files": "No hay archivos coincidentes",
	"Person entity": "Entidad de persona",
	Picker: "Selector",
	"Separate cards": "Tarjetas separadas",
	"State light color": "Color de luz de estado",
	"State color (default)": "Color de estado (predeterminado)",
	"State template": "Plantilla de estado",
	"Status {index}": "Estado {index}",
	"Card background": "Fondo de tarjeta",
	"Force padding": "Forzar relleno",
	Main: "Principal",
	Overlay: "Superposición",
	Resize: "Redimensionar",
	Height: "Alto",
	"Transparent background": "Fondo transparente",
	"Primary text color": "Color de texto primario",
	"Secondary background color": "Color de fondo secundario",
	"Tab font size": "Tamaño de fuente de pestaña",
	"Tab width": "Ancho de pestaña",
	Tabs: "Pestañas",
	"Tracker entity": "Entidad de seguimiento",
	"No files found. Add a local icon manifest at /local/icons/manifest.json or type the filename manually.": "No se encontraron archivos. Añade un manifiesto de iconos local en /local/icons/manifest.json o escribe el nombre del archivo manualmente.",
	"Orbit Action Card v{version}": "Orbit Action Card v{version}",
	"Orbit Area Card v{version}": "Orbit Area Card v{version}",
	"Orbit Deck Card v{version}": "Orbit Deck Card v{version}",
	"Orbit Status Card v{version}": "Orbit Status Card v{version}",
	"Orbit Status Badge v{version}": "Orbit Status Badge v{version}",
	"Low sensors": "Sensores de batería baja",
	"Low sensors are only used when a device has no percentage sensor.": "Los sensores de batería baja solo se usan cuando un dispositivo no tiene un sensor de porcentaje."
}, As = {
	Stronger: "Plus fort",
	Weaker: "Plus faible",
	"Current state": "État actuel",
	"Currently {state}": "Actuellement {state}",
	"No active entities": "Aucune entité active",
	"This will turn off {count} active entities.": "Cela éteindra {count} entités actives.",
	Always: "Toujours",
	"Area Count": "Comptage de zone",
	Badge: "Badge",
	"Device class": "Classe d’appareil",
	"Hidden entities": "Entités masquées",
	"Name template": "Modèle de nom",
	"Not configured": "Non configuré",
	"State type": "Type d’état",
	"Active template": "Modèle d’activation",
	"Inactive template": "Modèle d’inactivité",
	"Action button": "Bouton d'action",
	"Actions per row": "Actions par ligne",
	"Add a card to start.": "Ajoutez une carte pour commencer.",
	"Battery entity {index}": "Entité batterie {index}",
	"Button {index}": "Bouton {index}",
	Cards: "Cartes",
	"Curve buttons": "Boutons courbes",
	Dynamic: "Dynamique",
	"ETA entity": "Entité ETA",
	Files: "Fichiers",
	"Icon only": "Icône seule",
	"Items per row": "Éléments par ligne",
	"Loading files...": "Chargement des fichiers...",
	"Lock curve button positions": "Verrouiller les positions des boutons courbes",
	"Main entity": "Entité principale",
	"Move left": "Déplacer à gauche",
	"Move right": "Déplacer à droite",
	"No matching colors": "Aucune couleur correspondante",
	"No matching actions": "Aucune action correspondante",
	"No matching files": "Aucun fichier correspondant",
	"Person entity": "Entité personne",
	Picker: "Sélecteur",
	"Separate cards": "Cartes séparées",
	"State light color": "Couleur d’état de lumière",
	"State color (default)": "Couleur d’état (par défaut)",
	"State template": "Modèle d'état",
	"Status {index}": "Statut {index}",
	"Card background": "Arrière-plan de la carte",
	"Force padding": "Forcer le remplissage",
	Main: "Principal",
	Overlay: "Superposition",
	Resize: "Redimensionner",
	Height: "Hauteur",
	"Transparent background": "Arrière-plan transparent",
	"Primary text color": "Couleur du texte principal",
	"Secondary background color": "Couleur d’arrière-plan secondaire",
	"Tab font size": "Taille de police de l’onglet",
	"Tab width": "Largeur de l’onglet",
	Tabs: "Onglets",
	"Tracker entity": "Entité de suivi",
	"No files found. Add a local icon manifest at /local/icons/manifest.json or type the filename manually.": "Aucun fichier trouvé. Ajoutez un manifeste d’icônes local dans /local/icons/manifest.json ou saisissez le nom du fichier manuellement.",
	"Orbit Action Card v{version}": "Orbit Action Card v{version}",
	"Orbit Area Card v{version}": "Orbit Area Card v{version}",
	"Orbit Deck Card v{version}": "Orbit Deck Card v{version}",
	"Orbit Status Card v{version}": "Orbit Status Card v{version}",
	"Orbit Status Badge v{version}": "Orbit Status Badge v{version}",
	"Low sensors": "Capteurs de batterie faible",
	"Low sensors are only used when a device has no percentage sensor.": "Les capteurs de batterie faible ne sont utilisés que lorsqu’un appareil ne possède pas de capteur de pourcentage."
}, js = {
	Stronger: "Più forte",
	Weaker: "Più debole",
	"Current state": "Stato attuale",
	"Currently {state}": "Attualmente {state}",
	"No active entities": "Nessuna entità attiva",
	"This will turn off {count} active entities.": "Verranno disattivate {count} entità attive.",
	Always: "Sempre",
	"Area Count": "Conteggio area",
	Badge: "Badge",
	"Device class": "Classe dispositivo",
	"Hidden entities": "Entità nascoste",
	"Name template": "Modello del nome",
	"Not configured": "Non configurato",
	"State type": "Tipo di stato",
	"Active template": "Modello di attivazione",
	"Inactive template": "Modello di inattività",
	"Action button": "Pulsante azione",
	"Actions per row": "Azioni per riga",
	"Add a card to start.": "Aggiungi una scheda per iniziare.",
	"Battery entity {index}": "Entità batteria {index}",
	"Button {index}": "Pulsante {index}",
	Cards: "Schede",
	"Curve buttons": "Pulsanti curvi",
	Dynamic: "Dinamico",
	"ETA entity": "Entità ETA",
	Files: "File",
	"Icon only": "Solo icona",
	"Items per row": "Elementi per riga",
	"Loading files...": "Caricamento file...",
	"Lock curve button positions": "Blocca posizioni dei pulsanti curvi",
	"Main entity": "Entità principale",
	"Move left": "Sposta a sinistra",
	"Move right": "Sposta a destra",
	"No matching colors": "Nessun colore corrispondente",
	"No matching actions": "Nessuna azione corrispondente",
	"No matching files": "Nessun file corrispondente",
	"Person entity": "Entità persona",
	Picker: "Selettore",
	"Separate cards": "Schede separate",
	"State light color": "Colore stato luce",
	"State color (default)": "Colore stato (predefinito)",
	"State template": "Template stato",
	"Status {index}": "Stato {index}",
	"Card background": "Sfondo scheda",
	"Force padding": "Forza padding",
	Main: "Principale",
	Overlay: "Sovrapposizione",
	Resize: "Ridimensiona",
	Height: "Altezza",
	"Transparent background": "Sfondo trasparente",
	"Primary text color": "Colore testo primario",
	"Secondary background color": "Colore sfondo secondario",
	"Tab font size": "Dimensione font scheda",
	"Tab width": "Larghezza scheda",
	Tabs: "Schede",
	"Tracker entity": "Entità tracker",
	"No files found. Add a local icon manifest at /local/icons/manifest.json or type the filename manually.": "Nessun file trovato. Aggiungi un manifesto icone locale in /local/icons/manifest.json oppure digita manualmente il nome del file.",
	"Orbit Action Card v{version}": "Orbit Action Card v{version}",
	"Orbit Area Card v{version}": "Orbit Area Card v{version}",
	"Orbit Deck Card v{version}": "Orbit Deck Card v{version}",
	"Orbit Status Card v{version}": "Orbit Status Card v{version}",
	"Orbit Status Badge v{version}": "Orbit Status Badge v{version}",
	"Low sensors": "Sensori di batteria scarica",
	"Low sensors are only used when a device has no percentage sensor.": "I sensori di batteria scarica vengono usati solo quando un dispositivo non dispone di un sensore percentuale."
}, Ms = {
	Stronger: "Sterker",
	Weaker: "Zwakker",
	"Current state": "Huidige status",
	"Currently {state}": "Momenteel {state}",
	"No active entities": "Geen actieve entiteiten",
	"This will turn off {count} active entities.": "Hiermee worden {count} actieve entiteiten uitgeschakeld.",
	Always: "Altijd",
	"Area Count": "Gebiedstelling",
	Badge: "Badge",
	"Device class": "Apparaatklasse",
	"Hidden entities": "Verborgen entiteiten",
	"Name template": "Naamsjabloon",
	"Not configured": "Niet geconfigureerd",
	"State type": "Statustype",
	"Active template": "Activeringssjabloon",
	"Inactive template": "Deactiveringssjabloon",
	"Action button": "Actieknop",
	"Actions per row": "Acties per rij",
	"Add a card to start.": "Voeg een kaart toe om te beginnen.",
	"Battery entity {index}": "Batterij-entiteit {index}",
	"Button {index}": "Knop {index}",
	Cards: "Kaarten",
	"Curve buttons": "Gebogen knoppen",
	Dynamic: "Dynamisch",
	"ETA entity": "ETA-entiteit",
	Files: "Bestanden",
	"Icon only": "Alleen icoon",
	"Items per row": "Items per rij",
	"Loading files...": "Bestanden laden...",
	"Lock curve button positions": "Posities van gebogen knoppen vergrendelen",
	"Main entity": "Hoofdentiteit",
	"Move left": "Naar links verplaatsen",
	"Move right": "Naar rechts verplaatsen",
	"No matching colors": "Geen overeenkomende kleuren",
	"No matching actions": "Geen overeenkomende acties",
	"No matching files": "Geen overeenkomende bestanden",
	"Person entity": "Persoon-entiteit",
	Picker: "Kiezer",
	"Separate cards": "Aparte kaarten",
	"State light color": "Statuskleur licht",
	"State color (default)": "Statuskleur (standaard)",
	"State template": "Statussjabloon",
	"Status {index}": "Status {index}",
	"Card background": "Kaartachtergrond",
	"Force padding": "Padding afdwingen",
	Main: "Hoofdkaart",
	Overlay: "Overlay",
	Resize: "Formaat wijzigen",
	Height: "Hoogte",
	"Transparent background": "Transparante achtergrond",
	"Primary text color": "Primaire tekstkleur",
	"Secondary background color": "Secundaire achtergrondkleur",
	"Tab font size": "Tabblad lettergrootte",
	"Tab width": "Tabbladbreedte",
	Tabs: "Tabbladen",
	"Tracker entity": "Tracker-entiteit",
	"No files found. Add a local icon manifest at /local/icons/manifest.json or type the filename manually.": "Geen bestanden gevonden. Voeg een lokaal iconenmanifest toe op /local/icons/manifest.json of typ de bestandsnaam handmatig.",
	"Orbit Action Card v{version}": "Orbit Action Card v{version}",
	"Orbit Area Card v{version}": "Orbit Area Card v{version}",
	"Orbit Deck Card v{version}": "Orbit Deck Card v{version}",
	"Orbit Status Card v{version}": "Orbit Status Card v{version}",
	"Orbit Status Badge v{version}": "Orbit Status Badge v{version}",
	"Low sensors": "Sensoren voor lage batterij",
	"Low sensors are only used when a device has no percentage sensor.": "Sensoren voor lage batterij worden alleen gebruikt als een apparaat geen percentagesensor heeft."
}, Ns = {
	Stronger: "Mais forte",
	Weaker: "Mais fraco",
	"Current state": "Estado atual",
	"Currently {state}": "Atualmente {state}",
	"No active entities": "Nenhuma entidade ativa",
	"This will turn off {count} active entities.": "Isso desligará {count} entidades ativas.",
	Always: "Sempre",
	"Area Count": "Contagem da área",
	Badge: "Emblema",
	"Device class": "Classe do dispositivo",
	"Hidden entities": "Entidades ocultas",
	"Name template": "Modelo de nome",
	"Not configured": "Não configurado",
	"State type": "Tipo de estado",
	"Active template": "Modelo de ativação",
	"Inactive template": "Modelo de inatividade",
	"Action button": "Botão de ação",
	"Actions per row": "Ações por linha",
	"Add a card to start.": "Adicione um cartão para começar.",
	"Battery entity {index}": "Entidade de bateria {index}",
	"Button {index}": "Botão {index}",
	Cards: "Cartões",
	"Curve buttons": "Botões curvos",
	Dynamic: "Dinâmico",
	"ETA entity": "Entidade ETA",
	Files: "Arquivos",
	"Icon only": "Somente ícone",
	"Items per row": "Itens por linha",
	"Loading files...": "Carregando arquivos...",
	"Lock curve button positions": "Bloquear posições dos botões curvos",
	"Main entity": "Entidade principal",
	"Move left": "Mover para a esquerda",
	"Move right": "Mover para a direita",
	"No matching colors": "Nenhuma cor correspondente",
	"No matching actions": "Nenhuma ação correspondente",
	"No matching files": "Nenhum arquivo correspondente",
	"Person entity": "Entidade de pessoa",
	Picker: "Seletor",
	"Separate cards": "Cartões separados",
	"State light color": "Cor de estado da luz",
	"State color (default)": "Cor de estado (padrão)",
	"State template": "Modelo de estado",
	"Status {index}": "Status {index}",
	"Card background": "Fundo do cartão",
	"Force padding": "Forçar preenchimento",
	Main: "Principal",
	Overlay: "Sobreposição",
	Resize: "Redimensionar",
	Height: "Altura",
	"Transparent background": "Fundo transparente",
	"Primary text color": "Cor do texto primário",
	"Secondary background color": "Cor de fundo secundário",
	"Tab font size": "Tamanho da fonte da aba",
	"Tab width": "Largura da aba",
	Tabs: "Abas",
	"Tracker entity": "Entidade de rastreamento",
	"No files found. Add a local icon manifest at /local/icons/manifest.json or type the filename manually.": "Nenhum arquivo encontrado. Adicione um manifesto de ícones local em /local/icons/manifest.json ou digite o nome do arquivo manualmente.",
	"Orbit Action Card v{version}": "Orbit Action Card v{version}",
	"Orbit Area Card v{version}": "Orbit Area Card v{version}",
	"Orbit Deck Card v{version}": "Orbit Deck Card v{version}",
	"Orbit Status Card v{version}": "Orbit Status Card v{version}",
	"Orbit Status Badge v{version}": "Orbit Status Badge v{version}",
	"Low sensors": "Sensores de bateria fraca",
	"Low sensors are only used when a device has no percentage sensor.": "Os sensores de bateria fraca só são usados quando um dispositivo não tem um sensor de porcentagem."
}, Ps = {
	de: Os,
	en: Es,
	"en-gb": Ds,
	en_gb: Ds,
	es: ks,
	fr: As,
	it: js,
	nl: Ms,
	"pt-br": Ns,
	pt_br: Ns
};
function J(e, t, n = {}) {
	let r = Rs(e), i = r.replace("_", "-"), a = r.split("-")[0], o = Fs(e, t) || Ls(r, t) || Ls(i, t) || Ls(a, t) || Ps.en[t] || t;
	return Object.entries(n).reduce((e, [t, n]) => e.replaceAll(`{${t}}`, n ?? ""), o);
}
function Fs(e, t) {
	if (!e?.localize || !t) return null;
	let n = Is[t] || [];
	for (let t of n) {
		let n = e.localize(t);
		if (n && n !== t) return n;
	}
	return null;
}
var Is = {
	Add: ["ui.common.add"],
	Above: ["ui.components.selectors.numeric_threshold.crossed.above", "ui.panel.config.automation.editor.conditions.type.numeric_state.above"],
	"Add card": ["ui.panel.lovelace.editor.edit_card.add"],
	All: ["ui.components.selectors.automation_behavior.trigger.options.all.label", "ui.panel.config.backup.data.apps_all"],
	Active: [
		"ui.panel.config.users.editor.active",
		"ui.panel.config.users.picker.headers.is_active",
		"ui.panel.config.zwave_js.provisioned.active"
	],
	Area: [
		"ui.components.selectors.selector.types.area",
		"ui.components.entity.entity-name-picker.types.area",
		"ui.components.area-picker.area"
	],
	Areas: ["ui.components.area-filter.title"],
	Background: ["ui.panel.lovelace.editor.card.tile.background", "ui.panel.lovelace.editor.card.generic.background"],
	Below: ["ui.components.selectors.numeric_threshold.crossed.below", "ui.panel.config.automation.editor.conditions.type.numeric_state.below"],
	"Binary sensors": ["component.binary_sensor.entity_component._.name_plural"],
	"Binary Sensors": ["component.binary_sensor.entity_component._.name_plural"],
	Badges: ["ui.panel.lovelace.editor.card.heading.badges", "ui.panel.lovelace.editor.badges.name"],
	Color: ["ui.panel.lovelace.editor.card.tile.color", "ui.dialogs.label-detail.color"],
	Clear: ["ui.common.clear"],
	Custom: [
		"ui.components.entity.entity-name-picker.mode_custom",
		"ui.panel.lovelace.editor.edit_card.pick_card.custom",
		"ui.panel.config.backup.setup.custom_heading",
		"ui.panel.config.backup.schedule.time_options.custom",
		"ui.panel.config.backup.data.apps_custom"
	],
	Content: ["ui.panel.lovelace.editor.card.generic.content"],
	"Configuration error": ["ui.errors.config.configuration_error"],
	Domain: ["ui.panel.config.entities.picker.headers.domain"],
	Entity: [
		"ui.components.selectors.selector.types.entity",
		"ui.components.entity.entity-picker.entity",
		"ui.panel.lovelace.editor.card.generic.entity"
	],
	Divider: ["ui.panel.lovelace.editor.card.entities.entity_row.divider"],
	Default: ["ui.common.default"],
	Duplicate: ["ui.common.duplicate"],
	Equal: ["ui.components.selectors.select.options.equal"],
	Icon: ["ui.components.selectors.selector.types.icon", "ui.panel.lovelace.editor.card.generic.icon"],
	Hide: ["ui.common.hide"],
	Inactive: ["ui.components.color-picker.colors.inactive"],
	Interactions: ["ui.panel.lovelace.editor.card.tile.interactions", "ui.panel.lovelace.editor.card.generic.interactions"],
	Threshold: ["ui.components.selectors.selector.types.threshold", "ui.panel.config.automation.editor.conditions.type.numeric_state.threshold"],
	None: ["ui.common.none"],
	Accent: ["ui.components.color-picker.colors.accent"],
	Automations: ["ui.panel.config.automation.caption", "ui.dialogs.more_info_control.add_to.automations_heading"],
	Away: ["state_badge.person.not_home"],
	Buttons: ["ui.panel.lovelace.editor.card.entities.entity_row.buttons"],
	Card: ["ui.panel.lovelace.editor.card.conditional.card"],
	Cameras: ["component.camera.entity_component._.name_plural"],
	Climate: ["component.climate.entity_component._.name_plural", "panel.climate"],
	Covers: ["component.cover.entity_component._.name_plural"],
	Crop: ["ui.dialogs.image_cropper.crop"],
	"Display precision": ["ui.dialogs.entity_registry.editor.precision"],
	"Displayed elements": ["ui.panel.lovelace.editor.badge.entity.displayed_elements"],
	"Double tap behavior": ["ui.panel.lovelace.editor.card.generic.double_tap_action"],
	Home: ["state_badge.person.home"],
	Fans: ["component.fan.entity_component._.name_plural"],
	Header: ["ui.panel.lovelace.editor.header-footer.header"],
	Icons: ["ui.panel.lovelace.editor.features.types.climate-preset-modes.style_list.icons"],
	"Icon tap behavior": ["ui.panel.lovelace.editor.card.tile.icon_tap_action"],
	"Hold behavior": ["ui.panel.lovelace.editor.card.generic.hold_action"],
	"Icon hold behavior": ["ui.panel.lovelace.editor.card.tile.icon_hold_action"],
	"Icon double tap behavior": ["ui.panel.lovelace.editor.card.tile.icon_double_tap_action"],
	Mode: ["ui.card.climate.mode"],
	Multiple: ["ui.components.selectors.selector.multiple"],
	Person: ["component.person.entity_component._.name"],
	Prefix: ["ui.panel.lovelace.editor.elements.prefix"],
	Primary: ["ui.components.color-picker.colors.primary"],
	Name: ["ui.common.name"],
	Lights: ["component.light.entity_component._.name_plural"],
	Locks: ["component.lock.entity_component._.name_plural"],
	"Media players": ["component.media_player.entity_component._.name_plural"],
	Remove: ["ui.common.remove"],
	Search: ["ui.components.data-table.search", "ui.panel.lovelace.editor.card.generic.search"],
	Scenes: ["ui.panel.config.scene.caption"],
	Sensors: ["component.sensor.entity_component._.name_plural"],
	Scripts: ["ui.panel.config.script.caption"],
	Security: ["panel.security"],
	Separator: ["ui.panel.lovelace.editor.card.clock.date.sections.separator"],
	Standard: ["ui.panel.config.energy.battery.dialog.type_standard"],
	State: ["ui.panel.lovelace.editor.card.generic.state"],
	Switches: ["component.switch.entity_component._.name_plural"],
	"State content": ["ui.panel.lovelace.editor.badge.entity.state_content"],
	Status: ["ui.panel.config.entities.picker.headers.status"],
	Style: ["ui.panel.lovelace.editor.features.types.climate-preset-modes.style", "ui.panel.lovelace.editor.features.types.numeric-input.style"],
	"Tap behavior": ["ui.panel.lovelace.editor.card.generic.tap_action"],
	Theme: ["ui.components.selectors.selector.types.theme", "ui.components.theme-picker.theme"],
	Template: ["ui.components.selectors.selector.types.template"],
	Unavailable: ["state.default.unavailable"],
	Top: ["ui.panel.lovelace.editor.edit_view_header.settings.badges_position_options.top"],
	Right: ["ui.panel.lovelace.editor.card.energy-date-selection.opening_directions.right"],
	Bottom: ["ui.panel.lovelace.editor.card.tile.features_position_options.bottom", "ui.panel.lovelace.editor.edit_view_header.settings.badges_position_options.bottom"],
	Left: ["ui.panel.lovelace.editor.card.energy-date-selection.opening_directions.left"],
	Width: ["ui.panel.lovelace.editor.edit_section.settings.column_span"],
	Visibility: ["ui.panel.lovelace.editor.edit_card.tab_visibility"],
	"Visible if selected in state content": ["ui.panel.lovelace.editor.card.heading.entity_config.name_helper"],
	Wrap: ["ui.panel.lovelace.editor.edit_view_header.settings.badges_wrap_options.wrap"]
};
function Ls(e, t) {
	let n = Ps[e]?.[t];
	return n === "" ? null : n;
}
function Rs(e) {
	return (e?.locale?.language || e?.language || "en").toLowerCase();
}
//#endregion
//#region src/editors/area-card-editor.js
var zs = class extends j {
	static svgCache = V;
	static properties = {
		hass: { attribute: !1 },
		_config: { state: !0 },
		_activeSection: { state: !0 },
		_selectedStatusIndex: { state: !0 },
		_selectedButtonIndex: { state: !0 },
		_selectedCurveButtonIndex: { state: !0 },
		_areaButtonDomainFilter: { state: !0 },
		_areaCurveButtonDomainFilter: { state: !0 },
		_areaActionButtonDomainFilter: { state: !0 },
		_colorPickerKey: { state: !0 },
		_colorPickerTab: { state: !0 },
		_iconPickerKey: { state: !0 },
		_iconPickerTab: { state: !0 },
		_iconFileSearch: { state: !0 },
		_iconFilePickerOpen: { state: !0 },
		_orbitIconFiles: { state: !0 },
		_orbitIconFilesLoading: { state: !0 },
		_localIconFiles: { state: !0 },
		_localIconFilesLoading: { state: !0 }
	};
	constructor() {
		super(), this._config = this._config || {}, this._activeSection = "card", this._selectedStatusIndex = 1, this._selectedButtonIndex = 1, this._selectedCurveButtonIndex = 1, this._areaButtonDomainFilter = "all", this._areaCurveButtonDomainFilter = "all", this._areaActionButtonDomainFilter = "all", this._colorPickerKey = "", this._colorPickerTab = "picker", this._iconPickerKey = "", this._iconPickerTab = "ha", this._iconFileSearch = "", this._iconFilePickerOpen = !1, this._orbitIconFiles = [], this._orbitIconFilesLoading = !1, this._localIconFiles = [], this._localIconFilesLoading = !1;
	}
	connectedCallback() {
		super.connectedCallback(), bo(this), this._updateDocumentationContext();
	}
	disconnectedCallback() {
		xo(this), super.disconnectedCallback();
	}
	_getColorStyle(e) {
		return Co(e);
	}
	_getColorPickerValue(e) {
		return wo(e);
	}
	_t(e, t) {
		return J(this.hass, e, t);
	}
	setConfig(e) {
		let { config: t, migrated: n } = tn(e || {}), r = Js(t || {}), i = !Ys(t || {}, r);
		this._config = r, this._updateDocumentationContext(), (n || i) && this._queueConfigMigration();
	}
	_queueConfigMigration() {
		this._configMigrationQueued || (this._configMigrationQueued = !0, Promise.resolve().then(() => {
			this._configMigrationQueued = !1, this.dispatchEvent(new CustomEvent("config-changed", {
				detail: { config: Js(this._config) },
				bubbles: !0,
				composed: !0
			}));
		}));
	}
	_updateConfig(e) {
		let t = { ...e };
		Object.prototype.hasOwnProperty.call(t, "tap_action") && t.tap_action !== void 0 && (t.navigate = void 0);
		let n = Vi(this._config, t), r = ui(n, {
			sourceKey: "icon_source",
			templateKey: "icon",
			entityKey: "main_entity",
			areaKey: "area",
			allowArea: !0,
			customIconKeys: [
				"icon",
				"icon_on",
				"icon_off"
			]
		}), i = Object.prototype.hasOwnProperty.call(t, "icon_source") && !["custom", "template"].includes(t.icon_source), a = r !== "custom" && n.icon === "";
		(i || a) && (n.icon = void 0), this._config = Js(Vi(n, {})), this.dispatchEvent(new CustomEvent("config-changed", {
			detail: { config: this._config },
			bubbles: !0,
			composed: !0
		}));
	}
	_handleInput(e, t) {
		this._updateConfig({ [e]: t.target.value });
	}
	_handleEntityUpdate(e, t) {
		if (t) {
			this._handleConfigUpdate(e, t);
			return;
		}
		if (e.startsWith("button")) {
			this._clearButtonEntity(e);
			return;
		}
		if (e.startsWith("curve_button")) {
			this._clearCurveButtonEntity(e);
			return;
		}
		if (e === "action_button") {
			this._clearActionButtonEntity(e);
			return;
		}
		if (/^status[1-3]$/.test(e)) {
			this._clearStatusEntity(e);
			return;
		}
		if (e !== "main_entity") {
			this._handleConfigUpdate(e, t);
			return;
		}
		this._updateConfig(G("main_entity", Hs));
	}
	_clearStatusEntity(e) {
		this._updateConfig(Hi(e, Us));
	}
	_clearButtonEntity(e) {
		this._updateConfig(Hi(e, Ws));
	}
	_clearCurveButtonEntity(e) {
		this._updateConfig(Hi(e, Gs));
	}
	_clearActionButtonEntity(e) {
		this._updateConfig(Hi(e, Ks));
	}
	_renderInput(e, t, n = "", r = {}) {
		return Ri.call(this, e, t, n, r);
	}
	_renderTemplateInput(e, t) {
		return zi.call(this, e, t);
	}
	_handleConfigUpdate(e, t) {
		this._updateConfig({ [e]: t });
	}
	_renderColor(e, t, n) {
		return Gi.call(this, e, t, n);
	}
	_renderColorControl(e, t, n, r, i = n) {
		return Ki.call(this, e, t, n, r, i);
	}
	_renderColorPair(e) {
		return qi.call(this, e);
	}
	_renderIconInput(e, t, n = "mdi:lightbulb or icon.svg") {
		return ci.call(this, e, t, n);
	}
	_loadLocalIconFiles(e = "") {
		return di.call(this, e);
	}
	_isImageIcon(e) {
		return oi(e);
	}
	_resolveIconPath(e) {
		return si(e);
	}
	_getInlineSvg(e) {
		return B.call(this, e, { forceColor: !0 });
	}
	_renderEntity(e, t, n) {
		return vo.call(this, e, t, n);
	}
	_renderArea(e, t) {
		return yo.call(this, e, t);
	}
	_renderAreaSection() {
		return us.call(this);
	}
	_renderStatusSection() {
		let e = this._selectedStatusIndex || 1;
		return E`
      <div class="section">
        <div class="selector-pair status-settings-row">
          <div class="status-separator-field">
            ${this._renderInput("Separator", "status_separator", "|")}
          </div>

          ${this._renderColorControl("Color", "status_color", this._config?.status_color || this._config?.color || "", (e) => this._handleConfigUpdate("status_color", e), this._config?.status_color || this._config?.color || "")}
        </div>

        <div
          class="editor-segment-menu"
          style="--editor-segment-columns: 3;"
        >
          ${[
			1,
			2,
			3
		].map((t) => E`
            <button
              type="button"
              class="editor-segment-item ${e === t ? "active" : ""}"
              @click=${() => {
			this._selectedStatusIndex = t;
		}}
            >
              ${this._t("Status {index}", { index: t })}
            </button>
          `)}
        </div>

        <div class="sub-section selected-button-section">
          ${this._renderEntity("Entity", `status${e}`)}

          ${li.call(this, {
			label: ["Prefix", "Icon"],
			sourceKey: `status${e}_icon_source`,
			templateKey: `status${e}_icon`,
			entityKey: `status${e}`,
			allowNone: !0,
			customIconKeys: [`status${e}_icon`],
			renderCustom() {
				return this._renderIconInput("", `status${e}_icon`, "mdi:thermometer / icon.svg / 🌡️");
			}
		})}

          ${this._renderInput("Display precision", `status${e}_decimal_places`, "entity default")}
        </div>
      </div>
    `;
	}
	_renderButtonsSection() {
		return ms.call(this);
	}
	_renderCurvedButtonsSection() {
		return vs.call(this);
	}
	_renderActionButtonSection() {
		return ys.call(this);
	}
	_renderEditorTabs() {
		return E`
      <div class="editor-tabs">
        ${Bs.map((e) => E`
          <button
            type="button"
            class="editor-tab ${this._activeSection === e.key ? "active" : ""}"
            @click=${() => {
			this._activeSection = e.key, this._updateDocumentationContext();
		}}
          >
            ${this._t(e.label)}
          </button>
        `)}
      </div>
    `;
	}
	_updateDocumentationContext() {
		Qt(this, this._config?.type || "orbit-area-card", this._activeSection || "card");
	}
	_renderActiveSection() {
		let e = Bs.find((e) => e.key === this._activeSection) || Bs[0];
		return this[e.render]();
	}
	render() {
		return E`
      <div class="wrapper">
        ${this._renderEditorTabs()}
        ${this._renderActiveSection()}
        <div class="editor-version">
          ${this._t("Orbit Area Card v{version}", { version: t.area })}
        </div>
      </div>
    `;
	}
	static styles = [Ts];
}, Bs = [
	{
		key: "card",
		label: "Card",
		render: "_renderAreaSection"
	},
	{
		key: "status",
		label: "Status",
		render: "_renderStatusSection"
	},
	{
		key: "buttons",
		label: "Buttons",
		render: "_renderButtonsSection"
	},
	{
		key: "curve",
		label: "Curve buttons",
		render: "_renderCurvedButtonsSection"
	},
	{
		key: "action",
		label: "Action button",
		render: "_renderActionButtonSection"
	}
], Vs = class extends zs {};
customElements.define("orbit-area-card-editor", zs), customElements.define("orbit-room-card-editor", Vs);
var Hs = [
	"state_template",
	"icon_source",
	"icon",
	"icon_on",
	"icon_off",
	"tap_action",
	"hold_action",
	"double_tap_action",
	"main_entity_tap_action",
	"main_entity_hold_action",
	"main_entity_double_tap_action"
], Us = [
	"_icon_source",
	"_icon",
	"_decimal_places"
], Ws = [
	"_color_source",
	"_color",
	"_color_on",
	"_color_off",
	"_icon_source",
	"_icon",
	"_icon_on",
	"_icon_off",
	"_state_template",
	"_tap_action",
	"_hold_action",
	"_double_tap_action"
], Gs = [
	"_color_source",
	"_color",
	"_color_on",
	"_color_off",
	"_icon_source",
	"_icon",
	"_icon_on",
	"_icon_off",
	"_state_template",
	"_tap_action",
	"_hold_action",
	"_double_tap_action"
], Ks = [
	"_color_source",
	"_color",
	"_color_on",
	"_color_off",
	"_icon_source",
	"_icon",
	"_icon_on",
	"_icon_off",
	"_state_template",
	"_tap_action",
	"_hold_action",
	"_double_tap_action"
], qs = [
	"type",
	"area_name",
	"room_name",
	"area",
	"color",
	"main_entity",
	"main_entity_tap_action",
	"main_entity_hold_action",
	"main_entity_double_tap_action",
	"icon_source",
	"icon",
	"icon_on",
	"icon_off",
	"icon_svg_color_override",
	"icon_on_svg_color_override",
	"icon_off_svg_color_override",
	"state_template",
	"navigate",
	"tap_action",
	"hold_action",
	"double_tap_action",
	"status_color",
	"status_separator",
	...[
		1,
		2,
		3
	].flatMap((e) => [
		`status${e}`,
		`status${e}_icon_source`,
		`status${e}_icon`,
		`status${e}_decimal_places`
	]),
	...[
		1,
		2,
		3,
		4
	].flatMap((e) => [
		`button${e}`,
		`button${e}_color_source`,
		`button${e}_color`,
		`button${e}_color_on`,
		`button${e}_color_off`,
		`button${e}_icon_source`,
		`button${e}_icon`,
		`button${e}_icon_on`,
		`button${e}_icon_off`,
		`button${e}_icon_svg_color_override`,
		`button${e}_icon_on_svg_color_override`,
		`button${e}_icon_off_svg_color_override`,
		`button${e}_state_template`,
		`button${e}_tap_action`,
		`button${e}_hold_action`,
		`button${e}_double_tap_action`
	]),
	"curve_buttons_lock_position",
	...[
		1,
		2,
		3,
		4,
		5,
		6
	].flatMap((e) => [
		`curve_button${e}`,
		`curve_button${e}_color_source`,
		`curve_button${e}_color`,
		`curve_button${e}_color_on`,
		`curve_button${e}_color_off`,
		`curve_button${e}_icon_source`,
		`curve_button${e}_icon`,
		`curve_button${e}_icon_on`,
		`curve_button${e}_icon_off`,
		`curve_button${e}_icon_svg_color_override`,
		`curve_button${e}_icon_on_svg_color_override`,
		`curve_button${e}_icon_off_svg_color_override`,
		`curve_button${e}_state_template`,
		`curve_button${e}_tap_action`,
		`curve_button${e}_hold_action`,
		`curve_button${e}_double_tap_action`
	]),
	"action_button",
	"action_button_color_source",
	"action_button_color",
	"action_button_color_on",
	"action_button_color_off",
	"action_button_icon_source",
	"action_button_icon",
	"action_button_icon_on",
	"action_button_icon_off",
	"action_button_icon_svg_color_override",
	"action_button_icon_on_svg_color_override",
	"action_button_icon_off_svg_color_override",
	"action_button_state_template",
	"action_button_tap_action",
	"action_button_hold_action",
	"action_button_double_tap_action",
	"grid_options",
	"view_layout"
];
function Js(e) {
	let t = {}, n = /* @__PURE__ */ new Set();
	return qs.forEach((r) => {
		Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r], n.add(r));
	}), Object.keys(e).forEach((r) => {
		n.has(r) || (t[r] = e[r]);
	}), t;
}
function Ys(e, t) {
	return JSON.stringify(e) === JSON.stringify(t);
}
//#endregion
//#region src/cards/area-card.js
var Xs = class extends j {
	static svgCache = V;
	static get properties() {
		return {
			hass: {},
			_config: { type: Object },
			_cardName: { type: String },
			_statusText: { type: String },
			_statusItems: { type: Array },
			_icon: { type: String },
			_areaColor: { type: String },
			_statusColor: { type: String },
			_iconColor: { type: String },
			_circleColor: { type: String },
			_templateRevision: { type: Number }
		};
	}
	static getConfigElement() {
		return document.createElement("orbit-area-card-editor");
	}
	static getStubConfig(e) {
		let t = ec(e), n = {
			type: "custom:orbit-area-card",
			color: "blue",
			tap_action: {
				action: "navigate",
				navigation_path: "/lovelace/home"
			}
		};
		return t && (n.area = t), n;
	}
	getLayoutOptions() {
		return {
			grid_columns: 3,
			grid_min_columns: 2,
			grid_rows: "auto"
		};
	}
	setConfig(e) {
		this._config = tn(e).config, this._areaColor = this._computeFullColor(this._config.color), this._statusColor = this._computeFullColor(this._config.status_color || this._config.color), this._iconColor = this._computeIconColor(this._config.color), this._circleColor = this._computeCircleColor(this._config.color);
	}
	willUpdate(e) {
		return (e.has("_config") || e.has("hass")) && dt.call(this, this._getTemplateEntries()), nr.call(this, e);
	}
	disconnectedCallback() {
		ft.call(this), this._cancelLongPress(), this._clearDoubleTapTimer(), super.disconnectedCallback();
	}
	shouldUpdate(e) {
		return qn.call(this, e, this._getRelevantEntities(), { hasTemplates: Jn(this._config) });
	}
	_handleAction(e, t = null) {
		return Be.call(this, e, t);
	}
	_navigate(e) {
		return We.call(this, e);
	}
	_toggleEntity(e, t, n = null) {
		return Ge.call(this, e, t, n);
	}
	_handleButtonClick(e) {
		return Ke.call(this, e);
	}
	_handleButtonDoubleClick(e) {
		return qe.call(this, e);
	}
	_handleCurveButtonClick(e) {
		return Je.call(this, e);
	}
	_handleCurveButtonDoubleClick(e) {
		return Ye.call(this, e);
	}
	_handleTap(e) {
		return Xe.call(this, e);
	}
	_handleCardPointerDown(e) {
		if (N(this) || Zs(e)) return;
		let t = this._config?.hold_action;
		if (!(!t?.action || t.action === "none")) return this._startLongPress(e, this._config.main_entity || this._config.entity, t);
	}
	_handleCardDoubleTap(e) {
		return Ze.call(this, e);
	}
	_handleMainEntityTap(e) {
		return Qe.call(this, e);
	}
	_handleMainEntityDoubleTap(e) {
		return $e.call(this, e);
	}
	_handleMainEntityPointerDown(e) {
		if (!N(this)) return this._startLongPress(e, this._config.main_entity || this._config.entity, this._config.main_entity_hold_action);
	}
	_handleButtonPointerDown(e) {
		if (N(this)) return;
		let t = e.currentTarget;
		return this._startLongPress(e, t.dataEntity, t.dataHoldAction);
	}
	_computeFullColor(e) {
		return Dt.call(this, e);
	}
	_computeIconColor(e) {
		return Ot.call(this, e);
	}
	_computeCircleColor(e) {
		return kt.call(this, e);
	}
	_computeButtonBackground(e) {
		return At.call(this, e);
	}
	_getCardName(e = "Card") {
		return Ht(this._config, this.hass, e);
	}
	formatState(e) {
		return nt(e);
	}
	_getEntityActiveState(e) {
		return rt(e);
	}
	_getMainIconColor(e, t) {
		return Pn.call(this, e, t);
	}
	_getEntityColor(e) {
		return Fn(e);
	}
	_isImageIcon(e) {
		return In(e);
	}
	_resolveIconPath(e) {
		return Ln(e);
	}
	_getInlineSvg(e, t = !0, n = !1) {
		return B.call(this, e, {
			forceColor: t,
			animate: n
		});
	}
	_getSvgColorOverride(e) {
		return Rn(this._config, e);
	}
	get _LONG_PRESS_DELAY() {
		return 500;
	}
	_startLongPress(e, t, n) {
		return Wn.call(this, e, t, n);
	}
	_cancelLongPress() {
		return Gn.call(this);
	}
	_clearDoubleTapTimer() {
		return Ve.call(this);
	}
	_finishLongPress(e) {
		return Kn.call(this, e);
	}
	_evaluateStateTemplate(e, t) {
		return L.call(this, e, t);
	}
	_getTemplateEntries() {
		let e = this._config?.state_template ? [{
			template: this._config.state_template,
			entityId: this._config?.main_entity || ""
		}] : [];
		for (let t of [
			"button1",
			"button2",
			"button3",
			"button4",
			"curve_button1",
			"curve_button2",
			"curve_button3",
			"curve_button4",
			"curve_button5",
			"curve_button6",
			"action_button"
		]) {
			let n = this._config?.[`${t}_state_template`];
			n && e.push({
				template: n,
				entityId: this._config?.[t] || ""
			});
		}
		return [
			...e,
			...gt(this._config),
			..._t(this._config)
		];
	}
	_getRelevantEntities() {
		return [
			this._config?.main_entity,
			this._config?.entity,
			this._config?.status1,
			this._config?.status2,
			this._config?.status3,
			this._config?.button1,
			this._config?.button2,
			this._config?.button3,
			this._config?.button4,
			this._config?.curve_button1,
			this._config?.curve_button2,
			this._config?.curve_button3,
			this._config?.curve_button4,
			this._config?.curve_button5,
			this._config?.curve_button6,
			this._config?.action_button
		];
	}
	_renderButtons(e) {
		return Or.call(this, e);
	}
	_renderCurveButtons() {
		return Ur.call(this);
	}
	render() {
		return kr.call(this);
	}
	static styles = ri;
};
function Zs(e) {
	return e.composedPath().some((e) => e?.classList ? e.classList.contains("entity-button") || e.classList.contains("curve-button") || e.classList.contains("action-button") : !1);
}
var Qs = class extends Xs {};
en({
	tag: "orbit-area-card",
	cardClass: Xs,
	name: "Orbit Area Card",
	description: "Responsive area card",
	version: t.area,
	getEntitySuggestion: tc,
	aliases: [{
		tag: "orbit-room-card",
		cardClass: Qs
	}]
});
var $s = new Set([
	"light",
	"fan",
	"climate",
	"media_player",
	"switch",
	"cover",
	"lock"
]);
function ec(e) {
	return Object.keys(e?.areas || {}).sort((t, n) => {
		let r = e.areas[t]?.name || t, i = e.areas[n]?.name || n;
		return r.localeCompare(i, void 0, { sensitivity: "base" });
	})[0] || "";
}
function tc(e, t) {
	let n = Xn(t);
	if (!$s.has(n)) return null;
	let r = Zn(e, t), i = {
		type: "custom:orbit-area-card",
		main_entity: t,
		color: n === "light" ? "light" : "theme"
	};
	return r && (i.area = r), { config: i };
}
//#endregion
//#region src/common/helpers/card-layout.js
function nc({ config: e = {}, count: t = 1, wrapKey: n = "wrap", perRowKey: r, defaultColumns: i = 3 }) {
	if (!e[n]) return Math.max(1, t);
	let a = Number(e[r]);
	return Math.max(1, Math.min(t, (Number.isFinite(a) ? Math.floor(a) : i) || 1));
}
function rc(e) {
	let t = nc(e);
	return Math.max(1, Math.ceil((e?.count || 1) / t));
}
//#endregion
//#region src/common/helpers/status-badge.js
var ic = [
	{
		value: "light",
		label: "Lights",
		icon: "mdi:lightbulb"
	},
	{
		value: "switch",
		label: "Switches",
		icon: "mdi:toggle-switch",
		requiresDeviceClass: !0
	},
	{
		value: "fan",
		label: "Fans",
		icon: "mdi:fan"
	},
	{
		value: "cover",
		label: "Covers",
		icon: "mdi:window-shutter"
	},
	{
		value: "lock",
		label: "Locks",
		icon: "mdi:lock"
	},
	{
		value: "media_player",
		label: "Media players",
		icon: "mdi:play-box-multiple"
	},
	{
		value: "climate",
		label: "Climate",
		icon: "mdi:thermostat"
	},
	{
		value: "binary_sensor",
		label: "Binary sensors",
		icon: "mdi:radiobox-marked",
		requiresDeviceClass: !0
	},
	{
		value: "sensor",
		label: "Sensors",
		icon: "mdi:gauge",
		requiresDeviceClass: !0
	}
], Y = "Current state", ac = new Set([
	"date",
	"enum",
	"timestamp",
	"uptime"
]), oc = [
	"state_source",
	"area",
	"domain",
	"device_class",
	"threshold",
	"thresholds",
	"hide",
	"active_template",
	"inactive_template"
];
function sc(e = {}) {
	return Object.fromEntries(oc.map((t) => [t, e[t]]));
}
function cc(e = {}) {
	let t = X(e);
	return t === "entity" ? { action: "more-info" } : t === "area_count" ? { action: Y } : { action: "none" };
}
var lc = new Map(ic.map((e) => [e.value, e]));
function uc(e = "") {
	return lc.get(e) || {
		value: e,
		label: e ? e.replaceAll("_", " ") : "Status",
		icon: "mdi:shape"
	};
}
function X(e = {}) {
	let t = e.state_source || "entity";
	if ([
		"entity",
		"area_count",
		"template"
	].includes(t)) return t;
	throw Error(`Invalid state_source "${t}". Expected "entity", "area_count", or "template".`);
}
function dc(e = {}) {
	let t = X(e), n = e.domain ? uc(e.domain) : void 0;
	if (t === "area_count" && n?.requiresDeviceClass && Z(e).length === 0) throw Error(`Orbit Status Badge requires "device_class" for domain "${e.domain}".`);
	return t;
}
function fc(e = {}) {
	if (!Object.prototype.hasOwnProperty.call(e, "hide")) return [{ type: "hidden" }];
	if (!Array.isArray(e.hide)) return [];
	let t = [], n = /* @__PURE__ */ new Set(), r = !1;
	return e.hide.forEach((e) => {
		if (e === "hidden" && !r) {
			r = !0, t.push({ type: "hidden" });
			return;
		}
		if (e === "low" && !t.some((e) => e.type === "low")) {
			t.push({ type: "low" });
			return;
		}
		let i = typeof e?.label == "string" ? e.label.trim() : "";
		!i || n.has(i) || (n.add(i), t.push({
			type: "label",
			label: i
		}));
	}), t;
}
function pc(e = []) {
	return e.map((e) => ["hidden", "low"].includes(e?.type) ? e.type : { label: e?.label });
}
function mc(e, t, n = {}) {
	let r = fc(n), i = e?.entities?.[t];
	return r.some((n) => {
		if (n.type === "hidden") return !!(i?.hidden_by || i?.hidden);
		if (n.type === "low") {
			let n = e?.states?.[t];
			return t.startsWith("binary_sensor.") && n?.attributes?.device_class === "battery";
		}
		return n.type === "label" && Array.isArray(i?.labels) && i.labels.includes(n.label);
	});
}
function hc(e = {}) {
	let t = rn(e).config, n = X(t), r = { ...t };
	Object.keys(r).forEach((e) => {
		(r[e] === "" || r[e] === void 0) && delete r[e];
	});
	let i = Z(r), a = n === "area_count" && i.includes("battery"), o = n === "area_count" && r.domain === "sensor";
	if (i.length === 0 ? delete r.device_class : r.device_class = i.length === 1 ? i[0] : i, !a) delete r.threshold;
	else {
		let e = Number(r.threshold);
		!Number.isFinite(e) || e === 20 ? delete r.threshold : r.threshold = Math.min(100, Math.max(0, e));
	}
	if (!o) delete r.thresholds;
	else {
		let e = Object.fromEntries(Object.entries(r.thresholds || {}).flatMap(([e, t]) => {
			if (!i.includes(e) || e === "battery") return [];
			let n = Number(t?.value), r = yc(e), a = ["above", "below"].includes(t?.direction) ? t.direction : r;
			return !Number.isFinite(n) || n === 0 && a === r ? [] : [[e, {
				value: n,
				direction: a
			}]];
		}));
		Object.keys(e).length ? r.thresholds = e : delete r.thresholds;
	}
	return delete r.include_low_sensors, r.show_state === !0 && delete r.show_state, r.show_icon === !0 && delete r.show_icon, r.show_name === !1 && delete r.show_name, r.show_entity_picture === !1 && delete r.show_entity_picture, Object.prototype.hasOwnProperty.call(r, "hide") && (r.hide = pc(fc(r)), r.hide.length === 1 && r.hide[0] === "hidden" && delete r.hide), r.card_visibility === "always" && delete r.card_visibility, n === "entity" ? (delete r.state_source, delete r.area, delete r.domain, delete r.device_class, delete r.state_template, delete r.active_template, delete r.inactive_template, delete r.name_template, delete r.hide, r.state_content === "state" && delete r.state_content, r.tap_action?.action === "more-info" && delete r.tap_action) : n === "area_count" ? (r.state_source = "area_count", delete r.entity, delete r.state_template, delete r.active_template, delete r.inactive_template, delete r.name_template, r.state_content === "count" && delete r.state_content, r.tap_action?.action === "Current state" && delete r.tap_action) : (r.state_source = "template", r.display_style !== "badge" && delete r.entity, delete r.area, delete r.domain, delete r.device_class, delete r.hide, r.state_content === "state" && delete r.state_content, r.tap_action?.action === "none" && delete r.tap_action), r.hold_action?.action === "none" && delete r.hold_action, r.double_tap_action?.action === "none" && delete r.double_tap_action, r.icon_source === "domain" && (delete r.icon_source, delete r.icon, delete r.icon_on, delete r.icon_off), [
		"",
		"theme",
		"state",
		"state-active"
	].includes(r.color_on) && delete r.color_on, [
		"",
		"theme",
		"state",
		"state-inactive"
	].includes(r.color_off) && delete r.color_off, r;
}
function gc(e = "") {
	return e.replaceAll("_", " ").replace(/\b\w/g, (e) => e.toUpperCase());
}
function Z(e = {}) {
	let t = Array.isArray(e?.device_class) ? e.device_class : [e?.device_class];
	return [...new Set(t.filter((e) => typeof e == "string").map((e) => e.trim()).filter(Boolean))];
}
function _c(e = {}) {
	let t = Number(e.threshold);
	return Number.isFinite(t) ? Math.min(100, Math.max(0, t)) : 20;
}
function vc(e = {}, t = "") {
	let n = e.thresholds?.[t] || {}, r = Number(n.value), i = yc(t);
	return {
		value: Number.isFinite(r) ? r : 0,
		direction: ["above", "below"].includes(n.direction) ? n.direction : i
	};
}
function yc(e = "") {
	return e === "signal_strength" ? "below" : "above";
}
function bc(e = [], t = {}, n = rt) {
	let r = X(t) === "area_count", i = Z(t), a = r && i.includes("battery"), o = r && t.domain === "sensor";
	if (!a && !o) return e.filter(n);
	let s = _c(t);
	return e.filter((e) => {
		let r = e?.attributes?.device_class;
		if (r === "battery" && a) {
			let t = Sc(e?.state);
			return Number.isFinite(t) ? t <= s : e?.entity_id?.startsWith("binary_sensor.") && n(e);
		}
		if (e?.entity_id?.startsWith("sensor.") && o) {
			if (ac.has(r)) return xc(e?.state);
			let n = r === "power" ? Cc(e) : Sc(e?.state);
			if (Number.isFinite(n)) {
				let e = vc(t, r);
				return e.direction === "below" ? n <= e.value : n > e.value;
			}
			return !1;
		}
		return n(e);
	});
}
function xc(e) {
	let t = e?.toString().trim().toLowerCase();
	return !!t && ![
		"unknown",
		"unavailable",
		"none"
	].includes(t);
}
function Sc(e) {
	let t = e?.toString().trim();
	if (!t) return NaN;
	let n = Number(t);
	return Number.isFinite(n) ? n : NaN;
}
function Cc(e) {
	let t = Sc(e?.state);
	if (!Number.isFinite(t)) return NaN;
	let n = {
		mW: .001,
		W: 1,
		kW: 1e3,
		MW: 1e6,
		GW: 1e9,
		TW: 0xe8d4a51000
	}[e?.attributes?.unit_of_measurement || "W"];
	return n === void 0 ? NaN : t * n;
}
function wc(e, t) {
	return e?.attributes?.device_class || (t === "switch" ? "switch" : "");
}
function Tc(e, t = {}) {
	let n = t.domain || "", r = new Set(Z(t));
	return n ? (Object.values(e?.states || {}).forEach((e) => {
		if (!e.entity_id.startsWith(`${n}.`)) return;
		let t = wc(e, n);
		t && r.add(t);
	}), [...r].sort((e, t) => e.localeCompare(t)).map((e) => ({
		value: e,
		label: gc(e)
	}))) : [];
}
function Ec(e, t = {}) {
	let n = kc(t), r = t.domain || "", i = uc(r), a = Z(t);
	if (!e || !n.length || !r || i.requiresDeviceClass && !a.length) return [];
	let o = a.includes("battery") && ["sensor", "binary_sensor"].includes(r) ? new Set(["sensor", "binary_sensor"]) : null, s = Object.values(e.states || {}).filter((s) => (o ? o.has(s.entity_id.split(".")[0]) : s.entity_id.startsWith(`${r}.`)) && n.includes(Zn(e, s.entity_id)) && (!i.requiresDeviceClass || a.includes(wc(s, r))) && !mc(e, s.entity_id, t));
	return a.includes("battery") ? Dc(e, s) : s;
}
function Dc(e, t) {
	let n = /* @__PURE__ */ new Map();
	return t.forEach((t) => {
		if (t?.attributes?.device_class !== "battery") {
			n.set(t.entity_id, [t]);
			return;
		}
		let r = e?.entities?.[t.entity_id]?.device_id || t.entity_id;
		n.set(r, [...n.get(r) || [], t]);
	}), [...n.values()].flatMap((e) => {
		let t = e.filter((e) => e.entity_id.startsWith("sensor."));
		return t.length ? t : e;
	});
}
function Oc(e, t = {}) {
	if (X(t) === "entity" || t.display_style === "badge" && t.entity) {
		let n = t.entity || t.main_entity || "", r = e?.states?.[n];
		return r ? [r] : [];
	}
	return Ec(e, t);
}
function kc(e = {}) {
	return Array.isArray(e.area) ? e.area.filter(Boolean) : [e.area].filter(Boolean);
}
function Ac(e, t = {}) {
	return kc(t).map((t) => e?.areas?.[t]?.name || t).filter(Boolean).join(", ");
}
function jc(e, t = {}) {
	return Ec(e, t).map((e) => e.entity_id);
}
function Mc(e, t = !1) {
	if (e.state === "unavailable") return "var(--state-unavailable-color)";
	let n = e.entity_id.split(".")[0], r = e.attributes || {};
	if (n === "light" && t && Array.isArray(r.rgb_color)) return Pc(r.rgb_color);
	let i = Nc(e.state), a = t ? "active" : "inactive";
	return [
		r.device_class ? `--state-${n}-${r.device_class}-${i}-color` : "",
		`--state-${n}-${i}-color`,
		`--state-${n}-${a}-color`,
		`--state-${a}-color`
	].filter(Boolean).reduceRight((e, t) => `var(${t}, ${e})`, "var(--state-icon-color, var(--secondary-text-color))");
}
function Nc(e = "") {
	return e.toString().trim().toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
}
function Pc(e) {
	let [t, n, r] = Fc(e);
	return n < .4 && (n < .1 ? r = 225 : n = .4), `#${Ic(t, n, r).map((e) => e.toString(16).padStart(2, "0")).join("")}`;
}
function Fc([e, t, n]) {
	let [r, i, a] = [
		e,
		t,
		n
	].map((e) => e / 255), o = Math.max(r, i, a), s = o - Math.min(r, i, a), c = 0;
	return s && (c = o === r ? (i - a) / s % 6 : o === i ? (a - r) / s + 2 : (r - i) / s + 4), [
		(c * 60 + 360) % 360,
		o ? s / o : 0,
		o * 255
	];
}
function Ic(e, t, n) {
	let r = n / 255 * t, i = e / 60, a = r * (1 - Math.abs(i % 2 - 1)), [o, s, c] = i < 1 ? [
		r,
		a,
		0
	] : i < 2 ? [
		a,
		r,
		0
	] : i < 3 ? [
		0,
		r,
		a
	] : i < 4 ? [
		0,
		a,
		r
	] : i < 5 ? [
		a,
		0,
		r
	] : [
		r,
		0,
		a
	], l = n / 255 - r;
	return [
		o,
		s,
		c
	].map((e) => Math.round((e + l) * 255));
}
//#endregion
//#region src/common/helpers/active-entities-dialog.js
var Lc = {
	_activeEntitiesOpen: { state: !0 },
	_activeEntitiesConfirmOpen: { state: !0 },
	_activeEntitiesDurationNow: { state: !0 }
};
function Rc() {
	this._activeEntitiesOpen = !1, this._activeEntitiesConfirmOpen = !1, this._activeEntitiesDurationNow = Date.now(), this._activeEntitiesDurationTimer = null;
}
function zc() {
	this._activeEntitiesOpen = !0, this._activeEntitiesDurationNow = Date.now(), Bc.call(this);
}
function Bc() {
	this._activeEntitiesDurationTimer === null && (this._activeEntitiesDurationTimer = window.setInterval(() => {
		if (!this._activeEntitiesOpen) {
			Vc.call(this);
			return;
		}
		this._activeEntitiesDurationNow = Date.now();
	}, 6e4));
}
function Vc() {
	this._activeEntitiesDurationTimer !== null && (window.clearInterval(this._activeEntitiesDurationTimer), this._activeEntitiesDurationTimer = null);
}
function Hc() {
	this._activeEntitiesOpen = !1, this._activeEntitiesConfirmOpen = !1, Vc.call(this);
}
function Uc(e, t = []) {
	return !e || !t.length ? Promise.resolve() : this.hass?.callService(e.domain, e.service, { entity_id: t }) || Promise.resolve();
}
function Wc(e) {
	e && queueMicrotask(() => this.dispatchEvent(new CustomEvent("hass-more-info", {
		detail: { entityId: e },
		bubbles: !0,
		composed: !0
	})));
}
//#endregion
//#region src/common/helpers/active-entities.js
var Gc = {
	light: {
		service: "turn_off",
		icon: "mdi:power"
	},
	switch: {
		service: "turn_off",
		icon: "mdi:power"
	},
	fan: {
		service: "turn_off",
		icon: "mdi:power"
	},
	cover: {
		service: "close_cover",
		icon: "mdi:window-shutter"
	},
	lock: {
		service: "lock",
		icon: "mdi:lock"
	},
	media_player: {
		service: "turn_off",
		icon: "mdi:power"
	},
	climate: {
		service: "turn_off",
		icon: "mdi:power"
	}
}, Kc = /* @__PURE__ */ new Map(), qc = /* @__PURE__ */ new Map();
function Jc(e, t) {
	let n = t?.entity_id?.split(".")[0] || "", r = Gc[n];
	return !r || n === "cover" && !(t.attributes?.supported_features & 2) || n === "lock" && !(t.attributes?.supported_features & 1) || e?.services?.[n] && !e.services[n][r.service] ? null : {
		domain: n,
		...r
	};
}
function Yc(e) {
	if (!e.length) return null;
	let t = e[0].control;
	return e.every(({ control: e }) => e.domain === t.domain && e.service === t.service) ? t : null;
}
function Xc(e, t) {
	let n = e?.formatEntityName?.(t) || t?.attributes?.friendly_name || t?.entity_id || "", r = Zc(e, t);
	if (!r || n.length <= r.length) return n;
	let i = RegExp(`^${ol(r)}(?:\\s*[-–—:|]\\s*|\\s+)`, "i");
	return n.replace(i, "").trim() || n;
}
function Zc(e, t) {
	let n = Zn(e, t?.entity_id) || t?.attributes?.area_id || "";
	return e?.areas?.[n]?.name?.trim() || "";
}
function Qc(e) {
	let t = e?.locale?.language || e?.language || "en";
	return Kc.has(t) || Kc.set(t, new Intl.Collator(t, {
		numeric: !0,
		sensitivity: "base"
	})), Kc.get(t);
}
function $c(e, t) {
	let n = e?.formatEntityState?.(t);
	if (n) return n;
	let r = String(t?.state || "").replaceAll("_", " ");
	return r ? r[0].toUpperCase() + r.slice(1) : "";
}
function el(e, t, n) {
	return e.compare(t.name, n.name) || t.stateObj.entity_id.localeCompare(n.stateObj.entity_id);
}
function tl(e, t) {
	let n = 132 + e.reduce((e, { name: t, areaName: n }) => Math.max(e, t.length, n?.length || 0), 0) * 8;
	return Math.min(520, Math.max(t ? 360 : 280, n));
}
function nl(e, t, n = Date.now()) {
	let r = Date.parse(t?.last_changed || "");
	if (!Number.isFinite(r)) return "";
	let i = Math.max(0, n - r), a, o;
	i >= 864e5 ? (a = "days", o = Math.round(i / 864e5)) : i >= 36e5 ? (a = "hours", o = Math.round(i / 36e5)) : (a = "minutes", o = Math.max(1, Math.round(i / 6e4)));
	let s = String(e?.locale?.language || e?.language || "en").replace("_", "-");
	try {
		let e = al(s).format({ [a]: o });
		return s.toLowerCase().startsWith("en") ? e.replace(/\b(days?|hours?|minutes?)\b/, (e) => e[0].toUpperCase() + e.slice(1)) : e;
	} catch {
		let e = a.slice(0, -1), t = o === 1 ? e : a;
		return `${o} ${t[0].toUpperCase()}${t.slice(1)}`;
	}
}
function rl(e, t) {
	return e?.services?.[t.domain]?.[t.service]?.name;
}
function il(e) {
	return `color:${Fn(e) || Mc(e, !0)};--mdc-icon-size:36px`;
}
function al(e) {
	return qc.has(e) || qc.set(e, new Intl.DurationFormat(e, { style: "long" })), qc.get(e);
}
function ol(e) {
	return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
//#endregion
//#region src/common/renders/active-entities-dialog.js
function sl(e = []) {
	if (!this._activeEntitiesOpen) return O;
	let t = Qc(this.hass), n = e.map((e) => {
		let t = Jc(this.hass, e);
		return {
			stateObj: e,
			control: t,
			name: Xc(this.hass, e),
			areaName: Zc(this.hass, e),
			serviceName: t ? rl(this.hass, t) : ""
		};
	}).sort((e, n) => el(t, e, n)), r = n.filter((e) => e.control), i = Yc(r), a = i ? rl(this.hass, i) : "", o = tl(n, i), s = [
		`--ha-dialog-width-sm:${o}px`,
		`--mdc-dialog-min-width:${o}px`,
		`--mdc-dialog-max-width:${o}px`
	].join(";"), c = $c(this.hass, n[0]?.stateObj), l = c ? this._t("Currently {state}", { state: c }) : this._t("Current state");
	return E`
    <ha-adaptive-dialog
      .open=${!0}
      width="small"
      style=${s}
      @closed=${(e) => {
		e.stopPropagation(), Hc.call(this);
	}}
    >
      <ha-icon-button
        slot="headerNavigationIcon"
        .label=${this.hass?.localize?.("ui.common.close")}
        @click=${() => Hc.call(this)}
      >
        <ha-icon icon="mdi:close"></ha-icon>
      </ha-icon-button>
      <span slot="headerTitle">${l}</span>
      ${i ? E`
            <ha-button
              slot="headerActionItems"
              appearance="filled"
              @click=${async () => {
		if (i.service === "turn_off") {
			this._activeEntitiesConfirmOpen = !0;
			return;
		}
		await Uc.call(this, i, r.map((e) => e.stateObj.entity_id)), Hc.call(this);
	}}
            >
              <ha-icon slot="start" .icon=${i.icon}></ha-icon>
              ${a} (${r.length})
            </ha-button>
          ` : ""}
      <div class="active-entities-dialog-content">
        ${n.length ? n.map(({ stateObj: e, name: t, areaName: n, control: r, serviceName: i }) => E`
              <div class="active-entity-row">
                ${r ? E`
                      <button
                        type="button"
                        class="active-entity-control-button"
                        aria-label=${i}
                        title=${i}
                        @click=${(t) => {
		t.stopPropagation(), Uc.call(this, r, [e.entity_id]);
	}}
                      >
                        <ha-state-icon
                          .hass=${this.hass}
                          .stateObj=${e}
                          style=${il(e)}
                        ></ha-state-icon>
                      </button>
                    ` : E`
                      <ha-state-icon
                        .hass=${this.hass}
                        .stateObj=${e}
                        style=${il(e)}
                      ></ha-state-icon>
                    `}
                <button
                  type="button"
                  class="active-entity-info"
                  @click=${() => Wc.call(this, e.entity_id)}
                >
                  <span class="active-entity-name">${t}</span>
                  ${n ? E`
                        <span class="active-entity-area">${n}</span>
                      ` : O}
                  <span class="active-entity-state-line">
                    <state-display
                      .hass=${this.hass}
                      .stateObj=${e}
                    ></state-display>
                    <span aria-hidden="true">-</span>
                    <span>${nl(this.hass, e, this._activeEntitiesDurationNow)}</span>
                  </span>
                </button>
              </div>
            `) : E`
              <div class="active-entities-empty">
                ${this._t("No active entities")}
              </div>
            `}
      </div>
    </ha-adaptive-dialog>
    ${this._activeEntitiesConfirmOpen && i?.service === "turn_off" ? E`
          <ha-dialog
            .open=${!0}
            type="alert"
            .preventScrimClose=${!0}
            @closed=${(e) => {
		e.stopPropagation(), this._activeEntitiesConfirmOpen = !1;
	}}
            aria-labelledby="active-entities-confirmation-title"
            aria-describedby="active-entities-confirmation-description"
          >
            <ha-dialog-header slot="header">
              <h1
                slot="title"
                id="active-entities-confirmation-title"
                class="active-entities-confirmation-title"
              >
                ${this.hass?.localize?.("ui.dialogs.generic.default_confirmation_title")}
              </h1>
            </ha-dialog-header>
            <p
              id="active-entities-confirmation-description"
              class="active-entities-confirmation-text"
            >
              ${this._t("This will turn off {count} active entities.", { count: r.length })}
            </p>
            <ha-dialog-footer slot="footer">
              <ha-button
                slot="secondaryAction"
                appearance="plain"
                @click=${() => {
		this._activeEntitiesConfirmOpen = !1;
	}}
              >
                ${this.hass?.localize?.("ui.common.cancel")}
              </ha-button>
              <ha-button
                slot="primaryAction"
                variant="danger"
                @click=${async () => {
		await Uc.call(this, i, r.map((e) => e.stateObj.entity_id)), this._activeEntitiesConfirmOpen = !1, Hc.call(this);
	}}
              >
                ${a || this.hass?.localize?.("ui.card.common.turn_off")}
              </ha-button>
            </ha-dialog-footer>
          </ha-dialog>
        ` : O}
  `;
}
//#endregion
//#region src/cards/status/helpers/attributes.js
function Q(e, t) {
	let n = e?.attributes?.[t];
	return n == null || typeof n == "string" && n.trim() === "" ? null : n;
}
function cl(e) {
	let t = e.navigate?.navigation_path;
	return typeof t == "string" && t.trim() || null;
}
function ll(e, t, n) {
	let r = Q(t, "color");
	return e.color_source === "template" ? e.color || r || "theme" : n ? e.color_on || r || "theme" : e.color_off || r || "theme";
}
function ul(e, t = null, n = null) {
	if (!e) return !1;
	let r = (n ?? e.state)?.toString().trim().toLowerCase(), i = Number(r);
	if (Number.isFinite(i)) return i > 0;
	if (dl.includes(r)) return !1;
	let a = e.entity_id?.split(".")[0];
	return [
		"sensor",
		"input_text",
		"input_select",
		"select"
	].includes(a) ? !0 : typeof t == "function" ? t(e) : !0;
}
var dl = [
	"",
	"0",
	"off",
	"false",
	"no",
	"none",
	"unknown",
	"unavailable",
	"idle",
	"standby",
	"docked",
	"disarmed",
	"closed",
	"locked",
	"clear",
	"cleared",
	"normal",
	"ok",
	"okay",
	"safe",
	"home",
	"online",
	"connected",
	"available",
	"disabled"
];
function fl(e, t) {
	let n = Q(t, "navigation"), r = typeof n == "string" ? n.trim() : n?.navigation_path;
	return cl(e) || r || "/lovelace/home";
}
//#endregion
//#region src/common/helpers/zones.js
var pl = /* @__PURE__ */ new WeakMap();
function ml(e) {
	let t = e?.states;
	if (!t) return {
		zones: [],
		zoneByTrackerState: /* @__PURE__ */ new Map()
	};
	let n = pl.get(t);
	if (n) return n;
	let r = Object.values(t).filter((e) => e.entity_id?.startsWith("zone.") && !e.attributes?.passive), i = {
		zones: r,
		zoneByTrackerState: new Map(r.map((e) => [hl(e), e]))
	};
	return pl.set(t, i), i;
}
function hl(e) {
	return (e.attributes?.friendly_name || e.entity_id.replace(/^zone\./, "")).toLowerCase().replace(/\s+/g, "_");
}
//#endregion
//#region src/cards/status/helpers/lifecycle.js
function gl(e) {
	if (!e.has("_config") && !e.has("hass") && !e.has("_templateRevision")) return;
	if (this._config.mode === "person") {
		xl.call(this);
		return;
	}
	if (this._config.mode === "icon_only") {
		let e = _l(this._config);
		this._statusItems = e.map((e) => vl.call(this, e, this._config)), bl.call(this, this._statusItems[0] || {});
		return;
	}
	let t = this._config.entity, n = vl.call(this, { entity: t }, this._config);
	this._statusItems = [n], bl.call(this, n);
}
function _l(e = {}) {
	return Array.isArray(e.entities) && e.entities.length ? e.entities.map((e) => typeof e == "string" ? { entity: e } : e || {}) : [{
		entity: e.entity,
		...sc(e),
		color_source: e.color_source,
		color: e.color,
		color_on: e.color_on,
		color_off: e.color_off,
		icon_source: e.icon_source,
		icon: e.icon,
		icon_on: e.icon_on,
		icon_off: e.icon_off,
		entity_icon_source: e.entity_icon_source,
		entity_icon_template: e.entity_icon_template,
		entity_icon: e.entity_icon,
		entity_icon_on: e.entity_icon_on,
		entity_icon_off: e.entity_icon_off,
		entity_icon_svg_color_override: e.entity_icon_svg_color_override,
		entity_icon_on_svg_color_override: e.entity_icon_on_svg_color_override,
		entity_icon_off_svg_color_override: e.entity_icon_off_svg_color_override,
		state_template: e.state_template,
		label_template: e.label_template,
		name_template: e.name_template,
		tap_action: e.tap_action,
		hold_action: e.hold_action,
		double_tap_action: e.double_tap_action,
		entity_tap_action: e.entity_tap_action,
		entity_hold_action: e.entity_hold_action,
		entity_double_tap_action: e.entity_double_tap_action
	}];
}
function vl(e, t = {}) {
	let n = {
		...t,
		...e
	}, r = X(n), i = e.entity || t.entity, a = r === "area_count" ? Ec(this.hass, n) : [], o = bc(a, n, (e) => this._getEntityActiveState(e)), s = r === "area_count" ? o[0] || a[0] || null : i && this.hass ? this.hass.states[i] : null, c = i || s?.entity_id || "", l = c.split(".")[0] || n.domain || "";
	n.entity = c;
	let u = n.mode !== "icon_only" && Object.prototype.hasOwnProperty.call(n, "name") && n.name !== void 0 && n.name !== "", d = r === "template" && n.state_template ? this._evaluateStateTemplate(n.state_template, c) : null, f = r === "template" && n.active_template ? this._evaluateStateTemplate(n.active_template, c) : null, p = r === "template" && n.inactive_template ? this._evaluateStateTemplate(n.inactive_template, c) : null, m = r !== "area_count" && n.name_template ? this._evaluateStateTemplate(n.name_template, c) : null, h = r === "template" && n.label_template ? this._evaluateStateTemplate(n.label_template, c) : null, g = m === null ? u ? Ut(n.name, n, this.hass) : r === "area_count" ? Z(n).length ? Z(n).map(gc).join(", ") : uc(n.domain).label : Q(s, "friendly_name") || c || J(this.hass, "Status") : String(m), _ = h === null ? r === "template" ? n.state_template ? ht(d) : s ? Q(s, "label") || this.formatState(s) : "" : r === "area_count" ? String(o.length) : Q(s, "label") || (s ? this.formatState(s) : "") : String(h), v = n.icon_on ?? n.entity_icon_on, ee = n.icon_off ?? n.entity_icon_off, y = !!(n.state_template || n.active_template || n.inactive_template), b = r === "template" ? y ? mt(f, l) ? !0 : mt(p, l) ? !1 : mt(d, l) : s ? this._getEntityActiveState(s) : !1 : r === "area_count" ? o.length > 0 : ul(s, (e) => this._getEntityActiveState(e), d), x = yl(n, c), te = Nn.call(this, n.icon, c), S = x === "template" ? te : x === "custom" && ((b ? v : ee) || te) || "", ne = S || (r === "area_count" ? uc(n.domain).icon : "mdi:information-outline"), re = Z(n)[0] || "", ie = r === "area_count" ? {
		entity_id: `${n.domain || "sensor"}.orbit_status_card`,
		state: s?.state ?? (b ? "on" : "off"),
		attributes: re ? { device_class: re } : {}
	} : s, C = x === "template" && te ? "icon" : x === "custom" && b && v ? n.icon_on ? "icon_on" : "entity_icon_on" : x === "custom" && !b && ee ? n.icon_off ? "icon_off" : "entity_icon_off" : x === "custom" && te ? n.icon ? "icon" : "entity_icon" : "", w = ll(n, s, b), ae = fl(n, s), oe = this._computeFullColor(w), se = this._computeFullColor(w), ce = this._computeCircleColor(w), T = b ? this._computeFullColor(w) : this._computeIconColor(w);
	return {
		...e,
		entityId: c,
		stateObj: s,
		nativeIconStateObj: ie,
		useStateIcon: !!ie && x !== "template" && !S,
		cardName: g,
		statusText: _,
		icon: ne,
		navigationPath: ae,
		nameColor: oe,
		statusColor: se,
		circleColor: ce,
		iconColor: T,
		svgForceColor: C ? this._getSvgColorOverride(n, C) : !0
	};
}
function yl(e, t) {
	let n = e.icon_source ?? e.entity_icon_source, r = !!t, i = !!(e.icon || e.icon_on || e.icon_off || e.entity_icon || e.entity_icon_on || e.entity_icon_off);
	return n === "custom" ? "custom" : n === "template" ? "template" : n === "domain" && e.domain ? "domain" : n === "entity" && r ? "entity" : i ? "custom" : e.state_source === "area_count" ? "domain" : "entity";
}
function bl(e) {
	this._cardName = e.cardName ?? J(this.hass, "Status"), this._statusText = e.statusText || "", this._icon = e.icon || "mdi:information-outline", this._mainStateObj = e.stateObj || null, this._mainIconStateObj = e.nativeIconStateObj || e.stateObj || null, this._useNativeMainIcon = e.useStateIcon ?? !1, this._navigationPath = e.navigationPath || "", this._nameColor = e.nameColor || this._nameColor, this._statusColor = e.statusColor || this._statusColor, this._circleColor = e.circleColor || this._circleColor, this._iconColor = e.iconColor || this._iconColor, this._iconSvgForceColor = e.svgForceColor ?? !0;
}
function xl() {
	let e = this._config.entity, t = this._config.tracker_entity, n = this._config.eta_entity, r = t && this.hass ? this.hass.states[t] : null, i = e && this.hass ? this.hass.states[e] : null, a = n && this.hass ? this.hass.states[n] : null, o = Object.prototype.hasOwnProperty.call(this._config, "name") && this._config.name !== void 0 && this._config.name !== "";
	this._cardName = o ? Ut(this._config.name, this._config, this.hass) : Q(i, "friendly_name") || Q(r, "friendly_name") || e || t || J(this.hass, "Person");
	let s = this._config.name_template ? this._evaluateStateTemplate(this._config.name_template, t) : null;
	s !== null && (this._cardName = String(s));
	let c = r ? Cl.call(this, r) : "", l = a && r?.state !== "home" ? this.formatState(a) : "";
	this._statusText = l ? `${c} | ${l}` : c;
	let u = ul(r, (e) => this._getEntityActiveState(e), this._config.state_template ? this._evaluateStateTemplate(this._config.state_template, t) : null), d = ll(this._config, r, u);
	this._personPicture = Q(i, "entity_picture") || Q(r, "entity_picture") || "", this._personZoneIcon = Sl.call(this, r, i), this._personBattery1 = wl.call(this, this._config.battery_entity_1), this._personBattery2 = wl.call(this, this._config.battery_entity_2), this._icon = Q(i, "icon") || Q(r, "icon") || "mdi:account", this._navigationPath = fl(this._config, r), this._nameColor = this._computeFullColor(d), this._statusColor = this._computeFullColor(d), this._circleColor = this._computeCircleColor(d), this._iconColor = u ? this._computeFullColor(d) : this._computeIconColor(d), this._iconSvgForceColor = !0;
}
function Sl(e, t) {
	if (e?.state === "home") return "mdi:home-variant";
	let n = ml(this.hass), r = t?.entity_id;
	if (r) {
		let e = n.zones.find((e) => Array.isArray(e.attributes?.persons) && e.attributes.persons.includes(r));
		if (e?.attributes?.icon) return e.attributes.icon;
	}
	let i = e?.state?.toLowerCase();
	if (i && i !== "not_home") {
		let e = n.zoneByTrackerState.get(i);
		if (e?.attributes?.icon) return e.attributes.icon;
	}
	return "mdi:home-minus";
}
function Cl(e) {
	let t = e?.state;
	return t ? t === "home" ? J(this.hass, "Home") : t === "not_home" ? J(this.hass, "Away") : t.replace(/_/g, " ").replace(/\b\w/g, (e) => e.toUpperCase()) : "";
}
function wl(e) {
	let t = e && this.hass ? this.hass.states[e] : null;
	if (!t) return null;
	let n = Number(t.state), r = "var(--state-icon-color)";
	return Number.isFinite(n) && (r = n >= 70 ? "var(--state-sensor-battery-high-color)" : n >= 30 ? "var(--state-sensor-battery-medium-color)" : "var(--state-sensor-battery-low-color)"), {
		entityId: e,
		stateObj: t,
		color: r
	};
}
//#endregion
//#region src/cards/status/helpers/action-config.js
function Tl() {
	return M(this._config.hold_action) ? this._config.hold_action : null;
}
function El() {
	return M(this._config.double_tap_action) ? this._config.double_tap_action : null;
}
function Dl() {
	return M(this._config.entity_hold_action) ? this._config.entity_hold_action : null;
}
function Ol() {
	let e = jl(this).entity_tap_action;
	return e?.action ? e : Al.call(this);
}
function kl() {
	return M(this._config.entity_double_tap_action) ? this._config.entity_double_tap_action : null;
}
function Al() {
	let e = jl(this), t = X(e);
	if (t === "area_count") return e.tap_action?.action ? e.tap_action : { action: Y };
	if (t === "template") return e.tap_action?.action ? e.tap_action : { action: "more-info" };
	let n = {
		action: this._isIconOnlyMode() || this._isPersonMode() ? "more-info" : "navigate",
		navigation_path: this._navigationPath || "/lovelace/home"
	}, r = this._config.tap_action;
	return r?.action ? r : n;
}
function jl(e) {
	if (e._config?.mode !== "icon_only") return e._config || {};
	let t = Array.isArray(e._config?.entities) ? e._config.entities[0] : null;
	return t && typeof t == "object" ? {
		...e._config,
		...t
	} : e._config || {};
}
function Ml(e = 0) {
	let t = this._statusItems?.[e];
	return t?.tap_action?.action ? t.tap_action : this._config.tap_action?.action ? this._config.tap_action : X(t) === "area_count" ? {
		action: Y,
		status_index: e
	} : { action: "more-info" };
}
function Nl(e = 0) {
	let t = this._statusItems?.[e];
	return M(t?.hold_action) ? t.hold_action : M(this._config.hold_action) ? this._config.hold_action : null;
}
function Pl(e = 0) {
	let t = this._statusItems?.[e];
	return M(t?.double_tap_action) ? t.double_tap_action : M(this._config.double_tap_action) ? this._config.double_tap_action : null;
}
function Fl(e = 0) {
	let t = this._statusItems?.[e];
	return t?.entity_tap_action?.action ? t.entity_tap_action : this._config.entity_tap_action?.action ? this._config.entity_tap_action : this._getStatusItemCardTapAction(e);
}
function Il(e = 0) {
	let t = this._statusItems?.[e];
	return M(t?.entity_double_tap_action) ? t.entity_double_tap_action : M(this._config.entity_double_tap_action) ? this._config.entity_double_tap_action : null;
}
function Ll(e = 0) {
	let t = this._statusItems?.[e];
	return t?.entity_hold_action?.action ? t.entity_hold_action.action === "none" ? null : t.entity_hold_action : this._config.entity_hold_action?.action ? this._config.entity_hold_action.action === "none" ? null : this._config.entity_hold_action : null;
}
//#endregion
//#region src/common/helpers/editor-preview.js
function Rl(e) {
	let t = e;
	for (; t;) {
		let e = t.localName || "";
		if (e === "hui-dialog-edit-card" || e === "hui-dialog-edit-badge") return !0;
		let n = t.getRootNode?.();
		t = t.parentElement || t.assignedSlot || n?.host || null;
	}
	return !1;
}
//#endregion
//#region src/common/editor/helpers/group-options.js
function zl({ config: e = {}, itemCount: t = 0, wrapEnabled: n = !!e?.wrap, perRowKey: r = "items_per_row", defaultPerRow: i = 3, scrollThreshold: a = 6 } = {}) {
	let o = Math.max(1, Number(e?.[r]) || i), s = !!n && t > o;
	return {
		itemsPerRow: o,
		shouldWrapTabs: s,
		showTabScrollHint: !s && t > a || s && o > a
	};
}
function Bl({ itemCount: e = 0, classPrefix: t, wrapKey: n = "wrap", wrapEnabled: r = !!this._config?.[n], showWrapToggle: i = !0, showSeparateToggle: a = e > 1, separateKey: o = "separate_cards", perRowKey: s = "items_per_row", perRowLabel: c = "Items per row", defaultPerRow: l = 3 } = {}) {
	let u = t || "action";
	return E`
    <div class="${u}-group-options">
      ${i ? E`
            <label class="${u}-wrap-toggle">
              <span>${this._t("Wrap")}</span>
              <ha-switch
                .checked=${!!r}
                @change=${(e) => this._updateConfig({
		[n]: e.target.checked,
		[s]: e.target.checked ? this._config?.[s] || l : this._config?.[s]
	})}
              ></ha-switch>
            </label>
          ` : ""}

      ${a ? E`
            <label class="${u}-wrap-toggle">
              <span>${this._t("Separate cards")}</span>
              <ha-switch
                .checked=${!!this._config?.[o]}
                @change=${(e) => this._updateConfig({ [o]: e.target.checked })}
              ></ha-switch>
            </label>
          ` : ""}

      ${r ? E`
            <div class="${u}-per-row-field">
              ${this._renderNumberInput(c, s, {
		value: this._config?.[s] || l,
		min: 1,
		step: 1,
		onValueChanged: (e) => this._updateConfig({ [s]: Math.max(1, Number(e) || 1) })
	})}
            </div>
          ` : ""}
    </div>
  `;
}
//#endregion
//#region src/common/editor/renders/status-state-controls.js
function Vl(e = "entity") {
	let t = this._config?.icon_source || (this._config?.icon ? "custom" : "domain");
	return E`
    <div class="field main-entity-icon-source-field">
      <div class="field-header">
        <label>${this._t("Icon")}</label>
        <ha-selector
          class="main-entity-icon-source-selector"
          .hass=${this.hass}
          .selector=${{ button_toggle: { options: [
		{
			label: this._t(e === "entity" ? "Entity" : e === "area_count" ? "Domain" : "Default"),
			value: "domain"
		},
		{
			label: this._t("Custom"),
			value: "custom"
		},
		{
			label: this._t("Template"),
			value: "template"
		}
	] } }}
          .value=${t}
          @value-changed=${(e) => {
		let n = e.detail.value;
		if (t !== n && [t, n].includes("template") && this._handleConfigUpdate("icon", ""), ["custom", "template"].includes(n)) {
			this._handleConfigUpdate("icon_source", n);
			return;
		}
		this._updateConfig({
			icon_source: void 0,
			icon: void 0,
			icon_on: void 0,
			icon_off: void 0
		});
	}}
        ></ha-selector>
      </div>

      ${t === "custom" ? E`
            ${this._renderIconInput("", "icon")}
            <div class="icon-pair">
              ${this._renderIconInput(["Active", "Icon"], "icon_on")}
              ${this._renderIconInput(["Inactive", "Icon"], "icon_off")}
            </div>
          ` : ""}
      ${t === "template" ? E`
            <div class="field icon-source-template-field">
              <ha-selector
                .hass=${this.hass}
                .selector=${{ template: {} }}
                .value=${this._config?.icon || ""}
                @value-changed=${(e) => this._handleConfigUpdate("icon", e.detail.value || "")}
              ></ha-selector>
            </div>
          ` : ""}
    </div>
  `;
}
function Hl({ stateSource: e, domainConfig: t, deviceClassOptions: n, badgeMode: r, showActiveTemplate: i = !0, showInactiveTemplate: a = r, showStateTemplate: o = !1, showLabelTemplate: s = !1, showNameTemplate: c = !r, preserveStateConfig: l = !1, renderEntityPicker: u, areaMultiple: d = !1, renderAreaPicker: f }) {
	let p = this._config?.domain || "", m = Z(this._config), h = ql(this.hass, p, m), g = r ? this._config?.card_visibility || "always" : e, _ = r ? [
		{
			label: this._t("Always"),
			value: "always"
		},
		{
			label: this._t("State"),
			value: "state"
		},
		{
			label: this._t("Template"),
			value: "template"
		}
	] : [
		{
			label: this._t("Entity"),
			value: "entity"
		},
		{
			label: this._t("Area Count"),
			value: "area_count"
		},
		{
			label: this._t("Template"),
			value: "template"
		}
	];
	return E`
    <div class="field main-entity-icon-source-field">
      ${r ? E`
            <ha-selector
              .hass=${this.hass}
              .label=${this._t("Entity")}
              .selector=${{ entity: {} }}
              .required=${!1}
              .value=${this._config?.entity || ""}
              @value-changed=${(e) => this._handleConfigUpdate("entity", e.detail.value || "")}
            ></ha-selector>
          ` : ""}

      <div class="field-header">
        <label>${this._t(r ? "Visibility" : "State")}</label>
        <ha-selector
          class="main-entity-icon-source-selector"
          .hass=${this.hass}
          .selector=${{ button_toggle: { options: _ } }}
          .value=${g}
          @value-changed=${(e) => {
		let t = e.detail.value || (r ? "always" : "entity");
		if (r) {
			this._updateConfig(t === "always" ? {
				card_visibility: void 0,
				state_source: void 0,
				area: void 0,
				domain: void 0,
				device_class: void 0,
				thresholds: void 0,
				state_template: void 0,
				active_template: void 0,
				inactive_template: void 0,
				name_template: void 0,
				state_content: void 0
			} : t === "state" ? {
				card_visibility: "state",
				state_source: void 0,
				area: void 0,
				domain: void 0,
				device_class: void 0,
				thresholds: void 0,
				state_template: void 0,
				active_template: void 0,
				inactive_template: void 0,
				name_template: void 0,
				state_content: void 0
			} : {
				card_visibility: "template",
				state_source: "template",
				area: void 0,
				domain: void 0,
				device_class: void 0,
				thresholds: void 0,
				state_template: void 0,
				name_template: void 0,
				state_content: void 0
			});
			return;
		}
		if (l) {
			this._updateConfig(t === "entity" ? {
				state_source: void 0,
				area: void 0,
				domain: void 0,
				device_class: void 0,
				thresholds: void 0,
				state_template: void 0,
				label_template: void 0,
				active_template: void 0,
				inactive_template: void 0
			} : t === "area_count" ? {
				state_source: "area_count",
				entity: void 0,
				state_template: void 0,
				label_template: void 0,
				active_template: void 0,
				inactive_template: void 0
			} : {
				state_source: "template",
				area: void 0,
				domain: void 0,
				device_class: void 0,
				thresholds: void 0
			});
			return;
		}
		this._updateConfig(t === "entity" ? {
			state_source: void 0,
			area: void 0,
			domain: void 0,
			device_class: void 0,
			thresholds: void 0,
			state_template: void 0,
			active_template: void 0,
			inactive_template: void 0,
			state_content: void 0
		} : t === "area_count" ? {
			state_source: "area_count",
			entity: void 0,
			state_template: void 0,
			active_template: void 0,
			inactive_template: void 0,
			state_content: void 0
		} : {
			state_source: "template",
			entity: void 0,
			area: void 0,
			domain: void 0,
			device_class: void 0,
			thresholds: void 0,
			state_content: void 0
		});
	}}
        ></ha-selector>
      </div>

      ${!r && e === "entity" ? u ? u() : E`
            <ha-selector
              .hass=${this.hass}
              .label=${this._t("Entity")}
              .selector=${{ entity: {} }}
              .required=${!1}
              .value=${this._config?.entity || ""}
              @value-changed=${(e) => this._handleConfigUpdate("entity", e.detail.value || "")}
            ></ha-selector>
            ` : !r && e === "area_count" ? E`
            ${f ? f() : d ? eu.call(this, {
		config: this._config,
		updateConfig: (e) => this._updateConfig(e)
	}) : E`
                  <div class="field">
                    <span class="native-picker-label">${this._t("Area")}</span>
                    <ha-selector
                      .hass=${this.hass}
                      .label=${""}
                      .selector=${{ area: {} }}
                      .required=${!1}
                      .value=${this._config?.area || ""}
                      @value-changed=${(e) => this._handleConfigUpdate("area", e.detail.value || "")}
                    ></ha-selector>
                  </div>
                `}

            <div class="field">
              <ha-generic-picker
                .hass=${this.hass}
                .value=${p}
                .label=${this._t("Domain")}
                .placeholder=${this._t("Domain")}
                use-top-label
                .getItems=${() => Kl.call(this)}
                .valueRenderer=${(e) => Ql.call(this, e)}
                .rowRenderer=${$l}
                @value-changed=${(e) => this._updateConfig({
		domain: e.detail.value || void 0,
		device_class: void 0,
		threshold: void 0,
		thresholds: void 0
	})}
              ></ha-generic-picker>
            </div>

            ${t?.requiresDeviceClass && n.length > 0 ? E`
                  <div class="field">
                    <label>${this._t("Device class")}</label>
                    <div class="status-badge-device-class-options">
                      ${n.map((e) => E`
                          <ha-checkbox
                            .checked=${m.includes(e.value)}
                            .value=${e.value}
                            @change=${(t) => {
		let n = t.target.checked ? [...new Set([...m, e.value])] : m.filter((t) => t !== e.value);
		this._updateConfig({
			device_class: n.length ? n : void 0,
			threshold: n.includes("battery") ? this._config?.threshold : void 0,
			thresholds: Xl(this._config?.thresholds, n)
		});
	}}
                          >${e.label}</ha-checkbox>
                        `)}
                    </div>
                  </div>
                ` : ""}

            ${m.includes("battery") ? E`
                  <div class="field">
                    <ha-selector
                      .hass=${this.hass}
                      .label=${this._t("Threshold")}
                      .selector=${{ number: {
		min: 0,
		max: 100,
		step: 1,
		mode: "box",
		unit_of_measurement: "%"
	} }}
                      .value=${this._config?.threshold ?? 20}
                      @value-changed=${(e) => this._handleConfigUpdate("threshold", e.detail.value === "" || e.detail.value === void 0 ? void 0 : Number(e.detail.value))}
                    ></ha-selector>
                  </div>
                ` : ""}

            ${h.map((e) => {
		let t = Jl(this._config, e), n = Zl(this.hass, e);
		return E`
                <div class="field sensor-threshold-field">
                  <div class="field-header">
                    <label>${gc(e)}</label>
                    <ha-selector
                      .hass=${this.hass}
                      .selector=${{ button_toggle: { options: [{
			label: this._t(e === "signal_strength" ? "Stronger" : "Above"),
			value: "above"
		}, {
			label: this._t(e === "signal_strength" ? "Weaker" : "Below"),
			value: "below"
		}] } }}
                      .value=${t.direction}
                      @value-changed=${(t) => Yl.call(this, e, { direction: t.detail.value })}
                    ></ha-selector>
                  </div>
                  <ha-selector
                    .hass=${this.hass}
                    .label=${this._t("Threshold")}
                    .selector=${{ number: {
			step: .1,
			mode: "box",
			...n ? { unit_of_measurement: n } : {}
		} }}
                    .value=${t.value}
                    @value-changed=${(t) => Yl.call(this, e, { value: t.detail.value === "" || t.detail.value === void 0 ? 0 : Number(t.detail.value) })}
                  ></ha-selector>
                </div>
              `;
	})}

            ${Gl.call(this)}
          ` : g === "template" ? E`
              ${r ? "" : u ? u("") : E`
                    <ha-selector
                      .hass=${this.hass}
                      .label=${""}
                      .selector=${{ entity: {} }}
                      .required=${!1}
                      .value=${this._config?.entity || ""}
                      @value-changed=${(e) => this._handleConfigUpdate("entity", e.detail.value || "")}
                    ></ha-selector>
                    `}
              ${i ? Ul.call(this, {
		key: "active_template",
		label: "Active template"
	}) : ""}
              ${a ? E`
                    <div class="field">
                      <ha-selector
                        .hass=${this.hass}
                        .label=${this._t("Inactive template")}
                        .selector=${{ template: {} }}
                        .value=${this._config?.inactive_template || ""}
                        @value-changed=${(e) => this._handleConfigUpdate("inactive_template", e.detail.value || void 0)}
                      ></ha-selector>
                      ${Wl.call(this, this._config?.inactive_template, this._config?.entity || "")}
                    </div>
                  ` : ""}
              ${o ? Ul.call(this, {
		key: "state_template",
		label: "State"
	}) : ""}
              ${s ? Ul.call(this, {
		key: "label_template",
		label: "Label"
	}) : ""}
              ${c ? E`
                    <div class="field">
                      <ha-selector
                        .hass=${this.hass}
                        .label=${this._t("Name template")}
                        .selector=${{ template: {} }}
                        .value=${this._config?.name_template || ""}
                        @value-changed=${(e) => this._handleConfigUpdate("name_template", e.detail.value || void 0)}
                      ></ha-selector>
                      ${Wl.call(this, this._config?.name_template)}
                    </div>
                  ` : ""}
            ` : ""}
    </div>
  `;
}
function Ul({ key: e, label: t }) {
	return E`
    <div class="field">
      <ha-selector
        .hass=${this.hass}
        .label=${this._t(t)}
        .selector=${{ template: {} }}
        .required=${!1}
        .value=${this._config?.[e] || ""}
        @value-changed=${(t) => this._handleConfigUpdate(e, t.detail.value || void 0)}
      ></ha-selector>
      ${Wl.call(this, this._config?.[e], this._config?.entity || "")}
    </div>
  `;
}
function Wl(e, t = "") {
	let n = pt.call(this, e, t);
	return n ? E`<ha-alert alert-type="error">${n}</ha-alert>` : "";
}
function Gl() {
	let e = fc(this._config), t = e.some((e) => e.type === "hidden"), n = e.some((e) => e.type === "low"), r = Z(this._config).includes("battery"), i = e.filter((e) => e.type === "label").map((e) => e.label), a = ({ hidden: e = t, low: r = n, labels: a = i } = {}) => {
		this._updateConfig({ hide: pc([
			...e ? [{ type: "hidden" }] : [],
			...r ? [{ type: "low" }] : [],
			...a.map((e) => ({
				type: "label",
				label: e
			}))
		]) });
	};
	return E`
    <div class="field">
      <label>${this._t("Hide")}</label>

      <div class="status-badge-hide-hidden-row">
        <button
          type="button"
          class=${t ? "name-picker-chip" : "name-picker-add-chip"}
          @click=${() => a({ hidden: !t })}
        >
          <ha-icon icon=${t ? "mdi:eye-off" : "mdi:plus"}></ha-icon>
          <span>${this._t("Hidden entities")}</span>
          ${t ? E`<ha-icon
                class="name-picker-chip-remove"
                icon="mdi:close"
              ></ha-icon>` : ""}
        </button>

        ${r ? E`
              <button
                type="button"
                class=${n ? "name-picker-chip" : "name-picker-add-chip"}
                @click=${() => a({ low: !n })}
              >
                <ha-icon icon=${n ? "mdi:battery-alert" : "mdi:plus"}></ha-icon>
                <span>${this._t("Low sensors")}</span>
                ${n ? E`<ha-icon
                      class="name-picker-chip-remove"
                      icon="mdi:close"
                    ></ha-icon>` : ""}
              </button>
            ` : ""}
      </div>

      ${r ? E`
            <div class="status-area-count-low-sensors-hint">
              ${this._t("Low sensors are only used when a device has no percentage sensor.")}
            </div>
          ` : ""}

      <ha-selector
        .hass=${this.hass}
        .selector=${{ label: { multiple: !0 } }}
        .value=${i}
        @value-changed=${(e) => a({ labels: Array.isArray(e.detail.value) ? e.detail.value : [] })}
      ></ha-selector>
    </div>
  `;
}
function Kl() {
	return ic.map((e) => ({
		id: e.value,
		primary: this._t(e.label),
		sorting_label: this._t(e.label),
		icon: e.icon
	}));
}
function ql(e, t, n) {
	return t === "sensor" ? n.filter((t) => t !== "battery" && !ac.has(t) && Object.values(e?.states || {}).some((e) => e.entity_id.startsWith("sensor.") && e.attributes?.device_class === t)) : [];
}
function Jl(e = {}, t) {
	return vc(e, t);
}
function Yl(e, t = {}) {
	let n = Jl(this._config, e);
	this._updateConfig({ thresholds: {
		...this._config?.thresholds || {},
		[e]: {
			...n,
			...t
		}
	} });
}
function Xl(e = {}, t = []) {
	let n = Object.fromEntries(Object.entries(e || {}).filter(([e]) => t.includes(e) && e !== "battery"));
	return Object.keys(n).length ? n : void 0;
}
function Zl(e, t) {
	return t === "power" ? "W" : Object.values(e?.states || {}).find((e) => e.entity_id.startsWith("sensor.") && e.attributes?.device_class === t && e.attributes?.unit_of_measurement)?.attributes?.unit_of_measurement || "";
}
function Ql(e) {
	let t = ic.find((t) => t.value === e);
	return t ? E`
    <ha-icon slot="start" .icon=${t.icon}></ha-icon>
    <span slot="headline">${this._t(t.label)}</span>
  ` : "";
}
function $l(e, t) {
	return E`
    <ha-combo-box-item type="button" compact .borderTop=${t !== 0}>
      <ha-icon slot="start" .icon=${e.icon}></ha-icon>
      <span slot="headline">${e.primary}</span>
    </ha-combo-box-item>
  `;
}
function eu({ config: e = this._config || {}, updateConfig: t = (e) => this._updateConfig(e) } = {}) {
	let n = Array.isArray(e.area), r = n ? e.area : [], i = Object.values(this.hass?.areas || {}).sort((e, t) => (e.name || e.area_id).localeCompare(t.name || t.area_id)), a = [{
		value: "__multiple__",
		label: this._t("Multiple")
	}, ...i.map((e) => ({
		value: e.area_id,
		label: e.name || e.area_id
	}))];
	return E`
    <div class="field">
      <ha-selector
        .hass=${this.hass}
        .label=${this._t("Area")}
        .selector=${{ select: {
		mode: "dropdown",
		options: a
	} }}
        .value=${n ? "__multiple__" : e.area || ""}
        @value-changed=${(n) => {
		let r = n.detail.value || "";
		t({ area: r === "__multiple__" ? e.area ? [e.area].flat().filter(Boolean) : [] : r });
	}}
      ></ha-selector>
    </div>

    ${n ? E`
          <div class="field">
            <label>${this._t("Areas")}</label>
            <div class="status-badge-device-class-options">
              ${i.map((e) => E`
                <ha-checkbox
                  .checked=${r.includes(e.area_id)}
                  @change=${(n) => t({ area: n.target.checked ? [...new Set([...r, e.area_id])] : r.filter((t) => t !== e.area_id) })}
                >${e.name || e.area_id}</ha-checkbox>
              `)}
            </div>
          </div>
        ` : ""}
  `;
}
//#endregion
//#region src/editors/status/sections/status.js
function tu() {
	let e = this._config?.mode || "standard", t = e === "icon_only", n = e === "person", r = n ? "entity" : X(this._config), i = r === "area_count" ? Y : r === "template" || t || n ? "more-info" : "navigate", a = this._config?.tap_action?.action || i, o = r === "area_count" ? Y : t || n ? a : "more-info";
	return E`
    <div class="section">
      <div class="field editor-button-toggle-field">
        <div class="field-header">
          <label>${this._t("Mode")}</label>

          <ha-selector
            class="editor-header-button-toggle status-mode-selector"
            .hass=${this.hass}
            .selector=${{ button_toggle: { options: uu.call(this) } }}
            .value=${e}
            @value-changed=${(e) => this._handleStatusModeChange(e.detail.value || "standard")}
          ></ha-selector>
        </div>
      </div>
    </div>

    ${t ? ru.call(this, {
		cardActionDefault: i,
		mainEntityActionDefault: o
	}) : E`
          <div class="section">
            ${n ? au.call(this, E`
                  ${nu.call(this)}
                  ${this._renderEntity("Person entity", "entity")}
                  ${this._renderEntity("Tracker entity", "tracker_entity")}
                  ${this._renderEntity("ETA entity", "eta_entity")}
                  ${this._renderEntity("Battery entity {index}", "battery_entity_1", { index: 1 })}
                  ${this._renderEntity("Battery entity {index}", "battery_entity_2", { index: 2 })}
                  ${this._renderColorPair({
		label: "Color",
		onLabel: ["Active", "Color"],
		offLabel: ["Inactive", "Color"],
		onKey: "color_on",
		offKey: "color_off",
		sourceKey: "color_source",
		templateKey: "color",
		legacySourceKey: "accent_color_source",
		legacyTemplateKey: "accent_color"
	})}
                `) : E`
                  ${iu.call(this, this._config, "entity", (e) => this._updateConfig(e), (e) => this._handleEntityUpdate("entity", e))}
                  ${au.call(this, E`
                    ${nu.call(this)}
                    ${this._renderColorPair({
		label: "Color",
		onLabel: ["Active", "Color"],
		offLabel: ["Inactive", "Color"],
		onKey: "color_on",
		offKey: "color_off",
		sourceKey: "color_source",
		templateKey: "color",
		legacySourceKey: "accent_color_source",
		legacyTemplateKey: "accent_color"
	})}
                    ${cu.call(this, r)}
                    ${r === "template" ? E`
                          ${this._renderTemplateInput("State template", "state_template", { required: !1 })}
                          ${this._renderTemplateInput("Label template", "label_template", { required: !1 })}
                        ` : ""}
                  `)}
                `}

            ${this._config?.entity || r !== "entity" ? q.call(this, {
		interactions: [
			{
				key: "tap_action",
				formKey: "tap_action",
				label: "Tap behavior",
				defaultAction: i,
				defaultVisible: !0,
				customDefaultLabel: i === "Current state" ? Y : void 0
			},
			{
				key: "hold_action",
				formKey: "hold_action",
				label: "Hold behavior",
				defaultAction: "none"
			},
			{
				key: "double_tap_action",
				formKey: "double_tap_action",
				label: "Double tap behavior",
				defaultAction: "none"
			},
			{
				key: "entity_tap_action",
				formKey: "icon_tap_action",
				label: "Icon tap behavior",
				defaultAction: o,
				customDefaultLabel: o === "Current state" ? Y : void 0
			},
			{
				key: "entity_hold_action",
				formKey: "icon_hold_action",
				label: "Icon hold behavior",
				defaultAction: "none"
			},
			{
				key: "entity_double_tap_action",
				formKey: "icon_double_tap_action",
				label: "Icon double tap behavior",
				defaultAction: "none"
			}
		],
		context: {
			entity_id: this._config.entity,
			area_id: this._config.area
		}
	}) : ""}
          </div>
        `}
  `;
}
function nu() {
	let e = X(this._config), t = e === "area_count";
	return Mo.call(this, {
		label: this.hass.localize("ui.panel.lovelace.editor.card.generic.name"),
		valueKey: "name",
		entityKey: "entity",
		defaultType: t ? "device_class" : "entity",
		defaultMode: e === "template" ? "template" : "composed",
		modeKey: `name:${e}`,
		templateKey: "name_template"
	});
}
function ru({ cardActionDefault: e, mainEntityActionDefault: t }) {
	let n = this._getStatusItems(), r = Math.min(this._selectedStatusIndex || 0, n.length - 1), i = n[r] || {}, a = X(i), o = a === "area_count", s = o ? Y : e, c = o ? Y : t, { itemsPerRow: l, shouldWrapTabs: u, showTabScrollHint: d } = zl({
		config: this._config,
		itemCount: n.length,
		defaultPerRow: 3
	});
	return E`
    <div class="section">
      ${Bl.call(this, {
		itemCount: n.length,
		classPrefix: "status",
		defaultPerRow: 3
	})}

      <div
        class="status-tabs ${u ? "wrapped" : ""} ${d ? "scroll-hint" : ""} ${n.length > 1 ? "has-tools" : ""}"
        style=${u ? `--status-tabs-per-row: ${l};` : ""}
      >
        <div class="status-tab-items">
          ${n.map((e, t) => E`
            <button
              type="button"
              class="status-tab ${t === r ? "active" : ""}"
              @click=${() => this._selectStatusItem(t)}
            >
              ${t + 1}
            </button>
          `)}
        </div>

        ${d ? E`
              <div class="status-tabs-scroll-indicator" aria-hidden="true">
                <ha-icon icon="mdi:chevron-right"></ha-icon>
              </div>
            ` : ""}

        <div class="status-editor-tools">
          <button
            type="button"
            class="status-tab-add"
            title=${this._t("Add")}
            @click=${() => this._addStatusItem()}
          >
            +
          </button>

          <button
            type="button"
            class="status-tool-button"
            title=${this._t("Duplicate")}
            @click=${() => this._duplicateStatusItem(r)}
          >
            <ha-icon icon="mdi:content-copy"></ha-icon>
          </button>

          ${n.length > 1 ? E`
                <button
                  type="button"
                  class="status-tool-button status-tool-remove"
                  title=${this._t("Remove")}
                  @click=${() => this._removeStatusItem(r)}
                >
                  <ha-icon icon="mdi:trash-can"></ha-icon>
                </button>

                <button
                  type="button"
                  class="status-tool-button"
                  title=${this._t("Move left")}
                  ?disabled=${r === 0}
                  @click=${() => this._moveStatusItem(r, -1)}
                >
                  <ha-icon icon="mdi:arrow-left"></ha-icon>
                </button>

                <button
                  type="button"
                  class="status-tool-button"
                  title=${this._t("Move right")}
                  ?disabled=${r === n.length - 1}
                  @click=${() => this._moveStatusItem(r, 1)}
                >
                  <ha-icon icon="mdi:arrow-right"></ha-icon>
                </button>
              ` : ""}
        </div>
      </div>

      ${iu.call(this, i, "entity", (e) => this._updateStatusItem(r, e), (e) => this._updateStatusItem(r, { entity: e }))}

      ${au.call(this, E`

        ${this._renderColorPair({
		label: "Color",
		onLabel: ["Active", "Color"],
		offLabel: ["Inactive", "Color"],
		onKey: "color_on",
		offKey: "color_off",
		sourceKey: "color_source",
		templateKey: "color",
		legacySourceKey: "accent_color_source",
		legacyTemplateKey: "accent_color",
		config: i,
		pickerPrefix: `status-${r}-`,
		onUpdate: (e, t) => this._updateStatusItem(r, { [e]: t })
	})}

        ${lu.call(this, r, i, o)}

        ${a === "template" ? E`
              ${su.call(this, "State template", "state_template", r, i)}
              ${su.call(this, "Label template", "label_template", r, i)}
            ` : ""}
      `)}

      ${i.entity || a !== "entity" ? this._renderStatusItemInteractions(r, i, s, c) : ""}
    </div>
  `;
}
function iu(e, t, n, r) {
	let i = {
		...e,
		entity: e?.[t] || ""
	}, a = X(i), o = {
		hass: this.hass,
		_config: i,
		_t: this._t.bind(this),
		_updateConfig: (e) => n(ou(e, t)),
		_handleConfigUpdate: (e, r) => n(ou({ [e]: r }, t))
	};
	return E`
    <ha-expansion-panel
      class="state-type-panel"
      outlined
      .expanded=${this._statusStateTypeExpanded === !0}
      @expanded-changed=${(e) => {
		this._statusStateTypeExpanded = e.detail.expanded;
	}}
    >
      <ha-icon
        slot="leading-icon"
        icon="mdi:format-list-bulleted-type"
      ></ha-icon>
      <div slot="header" role="heading" aria-level="3">
        ${this._t("State type")}
      </div>
      <div class="content-panel-body">
        ${Hl.call(o, {
		stateSource: a,
		domainConfig: uc(i.domain),
		deviceClassOptions: Tc(this.hass, i),
		badgeMode: !1,
		showActiveTemplate: !0,
		showInactiveTemplate: !0,
		showStateTemplate: !1,
		showLabelTemplate: !1,
		showNameTemplate: !1,
		preserveStateConfig: !0,
		renderAreaPicker: () => eu.call(this, {
			config: e,
			updateConfig: n
		}),
		renderEntityPicker: (n = "Main entity") => E`
            <div class="field">
              ${n ? E`<label>${this._t(n)}</label>` : ""}
              ${Ga.call(this, {
			value: e?.[t] || "",
			filterOptions: du,
			onValueChanged: r
		})}
            </div>
          `
	})}
      </div>
    </ha-expansion-panel>
  `;
}
function au(e) {
	return E`
    <ha-expansion-panel
      class="content-panel status-content-panel"
      outlined
      .expanded=${this._statusContentExpanded === !0}
      @expanded-changed=${(e) => {
		this._statusContentExpanded = e.detail.expanded;
	}}
    >
      <ha-icon slot="leading-icon" icon="mdi:text-short"></ha-icon>
      <div slot="header" role="heading" aria-level="3">
        ${this._t("Content")}
      </div>
      <div class="content-panel-body">${e}</div>
    </ha-expansion-panel>
  `;
}
function ou(e, t) {
	let n = { ...e };
	return Object.prototype.hasOwnProperty.call(n, "entity") && (n[t] = n.entity, delete n.entity), n;
}
function su(e, t, n, r) {
	return this._renderTemplateInput(e, t, {
		required: !1,
		value: r[t] || "",
		onValueChanged: (e) => this._updateStatusItem(n, { [t]: e })
	});
}
function cu(e = "entity") {
	let t = e === "area_count";
	return li.call(this, {
		label: "Icon",
		sourceKey: "icon_source",
		legacySourceKey: "entity_icon_source",
		templateKey: "icon",
		legacyTemplateKeys: ["entity_icon_template"],
		entityKey: "entity",
		defaultSource: t ? "domain" : "entity",
		defaultSourceLabel: t ? "Domain" : "Entity",
		customIconKeys: [
			"icon",
			"icon_on",
			"icon_off"
		],
		renderCustom() {
			return E`
        ${this._renderIconInput("", "icon")}
        <div class="icon-pair">
          ${this._renderIconInput(["Active", "Icon"], "icon_on")}
          ${this._renderIconInput(["Inactive", "Icon"], "icon_off")}
        </div>
      `;
		}
	});
}
function lu(e, t, n = !1) {
	let r = this, i = {
		hass: this.hass,
		_config: t,
		_t: (e, t) => this._t(e, t),
		_handleConfigUpdate: (t, n) => r._updateStatusItem(e, { [t]: n }),
		_renderIconInput: (t, n) => r._renderStatusItemIconInput(t, n, e)
	};
	return li.call(i, {
		label: "Icon",
		sourceKey: "icon_source",
		legacySourceKey: "entity_icon_source",
		templateKey: "icon",
		legacyTemplateKeys: ["entity_icon_template"],
		entityKey: "entity",
		defaultSource: n ? "domain" : "entity",
		defaultSourceLabel: n ? "Domain" : "Entity",
		customIconKeys: [
			"icon",
			"icon_on",
			"icon_off"
		],
		renderCustom() {
			return E`
        ${this._renderIconInput("", "icon")}
        <div class="icon-pair">
          ${this._renderIconInput(["Active", "Icon"], "icon_on")}
          ${this._renderIconInput(["Inactive", "Icon"], "icon_off")}
        </div>
      `;
		}
	});
}
function uu() {
	return [
		{
			label: this._t("Standard"),
			value: "standard"
		},
		{
			label: this._t("Icon only"),
			value: "icon_only"
		},
		{
			label: this._t("Person"),
			value: "person"
		}
	];
}
var du = [
	{
		label: "All",
		value: "all",
		domains: null
	},
	{
		label: "Binary Sensors",
		haDomains: ["binary_sensor"],
		value: "binary_sensor",
		domains: ["binary_sensor"]
	},
	{
		label: "Sensors",
		haDomains: ["sensor"],
		value: "sensor",
		domains: ["sensor"]
	}
], fu = d`
.state-type-panel,
.content-panel {
  display: block;
  --expansion-panel-content-padding: 0;
  border-radius: var(--ha-border-radius-md);
  --ha-card-border-radius: var(--ha-border-radius-md);
}

.state-type-panel > [slot="header"],
.content-panel > [slot="header"] {
  margin: 0;
  font-size: inherit;
  font-weight: inherit;
}

.state-type-panel > ha-icon,
.content-panel > ha-icon {
  color: var(--secondary-text-color);
}

.content-panel-body {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px;
}

.status-wrap-toggle {
  display: flex;
  align-items: center;
  gap: 10px;
  opacity: 1;
}

.status-per-row-field {
  margin-left: auto;
  width: 128px;
  min-width: 128px;
}

.status-group-options {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 2px;
}

.status-tabs {
  display: flex;
  align-items: end;
  gap: 6px;
  border-bottom: 1px solid var(--orbit-editor-border);
  padding-bottom: 2px;
  margin-bottom: 12px;
  overflow: visible;
}

.status-tabs.scroll-hint .status-tab-items {
  -webkit-mask-image: linear-gradient(to right, #000 calc(100% - 12px), transparent);
  mask-image: linear-gradient(to right, #000 calc(100% - 12px), transparent);
}

.status-tabs.wrapped {
  display: flex;
  align-items: start;
}

.status-tab-items {
  display: flex;
  align-items: end;
  gap: 6px;
  min-width: 0;
  overflow-x: auto;
}

.status-tabs.wrapped .status-tab-items {
  display: grid;
  grid-template-columns: repeat(
    var(--status-tabs-per-row, 3),
    32px
  );
  justify-content: start;
  flex: 1 1 auto;
  overflow-x: auto;
}

.status-tabs-scroll-indicator {
  width: 16px;
  min-width: 16px;
  height: 36px;
  color: var(--primary-color);
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  opacity: 0.78;
  pointer-events: none;
}

.status-tabs-scroll-indicator ha-icon {
  --mdc-icon-size: 18px;
}

.status-tab,
.status-tab-add {
  border: none;
  background: transparent;
  color: inherit;
  width: 32px;
  min-width: 32px;
  height: 36px;
  padding: 0;
  font: inherit;
  font-size: var(--ha-font-size-m, 14px);
  font-weight: var(--ha-font-weight-medium, 500);
  line-height: var(--ha-line-height-normal, 20px);
  opacity: 0.6;
  cursor: pointer;
}

.status-tab.active {
  color: var(--primary-color);
  opacity: 1;
  border-bottom: 3px solid var(--primary-color);
}

.status-tabs.wrapped .status-tab,
.status-tabs.wrapped .status-tab-add {
  width: 32px;
  min-width: 32px;
}

.status-editor-tools .status-tab-add {
  width: 34px;
  min-width: 34px;
  height: 34px;
  border: 1px solid var(--orbit-editor-border);
  border-radius: var(--ha-border-radius-lg, 12px);
  background: var(--orbit-editor-control);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
}

.status-tab-add {
  font-size: 24px;
  opacity: 0.9;
}

.status-editor-tools {
  display: flex;
  gap: 4px;
  margin-left: auto;
  justify-content: flex-end;
}

.status-tabs.scroll-hint .status-editor-tools {
  margin-left: 0;
}

.status-tabs.wrapped .status-editor-tools {
  display: grid;
  grid-template-columns: repeat(2, 34px);
  grid-template-rows: repeat(2, 34px);
  gap: 4px;
  min-width: max-content;
  align-self: start;
}

.status-tool-button {
  width: 34px;
  height: 34px;
  border: 1px solid var(--orbit-editor-border);
  border-radius: var(--ha-border-radius-lg, 12px);
  background: var(--orbit-editor-control);
  color: inherit;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.status-tool-button:disabled {
  opacity: 0.35;
  cursor: default;
}

.status-tool-button ha-icon {
  --mdc-icon-size: 20px;
}
`, pu = Symbol.for("orbit-status-card-preview-selected-index"), mu = class extends j {
	static svgCache = V;
	static properties = {
		hass: { attribute: !1 },
		_config: { state: !0 },
		_selectedStatusIndex: { state: !0 },
		_colorPickerKey: { state: !0 },
		_colorPickerTab: { state: !0 },
		_iconPickerKey: { state: !0 },
		_iconPickerTab: { state: !0 },
		_iconFileSearch: { state: !0 },
		_iconFilePickerOpen: { state: !0 },
		_orbitIconFiles: { state: !0 },
		_orbitIconFilesLoading: { state: !0 },
		_localIconFiles: { state: !0 },
		_localIconFilesLoading: { state: !0 },
		_statusStateTypeExpanded: { state: !0 },
		_statusContentExpanded: { state: !0 }
	};
	constructor() {
		super(), this._config = this._config || {}, this._selectedStatusIndex = 0, this._colorPickerKey = "", this._colorPickerTab = "picker", this._iconPickerKey = "", this._iconPickerTab = "ha", this._iconFileSearch = "", this._iconFilePickerOpen = !1, this._orbitIconFiles = [], this._orbitIconFilesLoading = !1, this._localIconFiles = [], this._localIconFilesLoading = !1, this._statusStateTypeExpanded = !1, this._statusContentExpanded = !1;
	}
	connectedCallback() {
		super.connectedCallback(), bo(this), Qt(this, "orbit-status-card");
	}
	disconnectedCallback() {
		xo(this), super.disconnectedCallback();
	}
	_getColorStyle(e) {
		return Co(e);
	}
	_getColorPickerValue(e) {
		return wo(e);
	}
	_t(e, t) {
		return J(this.hass, e, t);
	}
	setConfig(e) {
		let t = Pu(e || {}), { config: n, migrated: r } = cn(e || {}), i = ku(n || {}), a = !Au(n || {}, i);
		this._config = i, this._selectedStatusIndex = Math.min(this._selectedStatusIndex || 0, this._getStatusItems(this._config).length - 1), (r || t || a) && this._queueConfigMigration();
	}
	_queueConfigMigration() {
		this._configMigrationQueued || (this._configMigrationQueued = !0, Promise.resolve().then(() => {
			this._configMigrationQueued = !1, this.dispatchEvent(new CustomEvent("config-changed", {
				detail: { config: this._getPreviewConfig(ku(this._config)) },
				bubbles: !0,
				composed: !0
			}));
		}));
	}
	_updateConfig(e) {
		this._config = ku(Vi(this._config, e)), this.dispatchEvent(new CustomEvent("config-changed", {
			detail: { config: this._getPreviewConfig() },
			bubbles: !0,
			composed: !0
		}));
	}
	_getPreviewConfig(e = this._config) {
		return {
			...e,
			[pu]: this._selectedStatusIndex || 0
		};
	}
	_handleInput(e, t) {
		this._updateConfig({ [e]: t.target.value });
	}
	_handleConfigUpdate(e, t) {
		this._updateConfig({ [e]: t });
	}
	_handleEntityUpdate(e, t) {
		if (t) {
			this._handleConfigUpdate(e, t);
			return;
		}
		if (e === "entity" && X(this._config) !== "entity") {
			this._handleConfigUpdate(e, t);
			return;
		}
		if (e === "entity") {
			this._clearMainEntity();
			return;
		}
		if (e === "tracker_entity") {
			this._updateConfig(G("tracker_entity", yu));
			return;
		}
		this._handleConfigUpdate(e, t);
	}
	_clearMainEntity() {
		if (this._config?.mode === "person") {
			this._updateConfig(G("entity", vu));
			return;
		}
		this._updateConfig(G("entity", gu));
	}
	_getStatusItems(e = this._config) {
		return Array.isArray(e?.entities) && e.entities.length ? e.entities.map((e) => typeof e == "string" ? { entity: e } : e || {}) : [{
			entity: e?.entity || "",
			...sc(e),
			color_source: e?.color_source || e?.accent_color_source || "",
			color: e?.color || e?.accent_color || "",
			accent_color_source: e?.accent_color_source || "",
			accent_color: e?.accent_color || "",
			color_on: e?.color_on || "",
			color_off: e?.color_off || "",
			icon_source: e?.icon_source || e?.entity_icon_source || "",
			icon: e?.icon || e?.entity_icon || "",
			icon_on: e?.icon_on || e?.entity_icon_on || "",
			icon_off: e?.icon_off || e?.entity_icon_off || "",
			entity_icon_source: e?.entity_icon_source || "",
			entity_icon_template: e?.entity_icon_template || "",
			entity_icon: e?.entity_icon || "",
			entity_icon_on: e?.entity_icon_on || "",
			entity_icon_off: e?.entity_icon_off || "",
			state_template: e?.state_template || "",
			label_template: e?.label_template || "",
			name_template: e?.name_template || "",
			tap_action: e?.tap_action,
			hold_action: e?.hold_action,
			double_tap_action: e?.double_tap_action,
			entity_tap_action: e?.entity_tap_action,
			entity_hold_action: e?.entity_hold_action,
			entity_double_tap_action: e?.entity_double_tap_action
		}];
	}
	_handleStatusModeChange(e) {
		if (this._config?.mode === "icon_only" && e === "standard") {
			let t = this._getStatusItems(), n = t[Math.min(this._selectedStatusIndex || 0, t.length - 1)] || {};
			this._updateConfig({
				...W(_u),
				mode: e,
				entities: void 0,
				entity: n.entity || void 0,
				...sc(n),
				color_source: n.color_source,
				color: n.color,
				accent_color_source: n.accent_color_source,
				accent_color: n.accent_color,
				color_on: n.color_on,
				color_off: n.color_off,
				icon_source: n.icon_source,
				icon: n.icon,
				icon_on: n.icon_on,
				icon_off: n.icon_off,
				entity_icon_source: n.entity_icon_source,
				entity_icon_template: n.entity_icon_template,
				entity_icon: n.entity_icon,
				entity_icon_on: n.entity_icon_on,
				entity_icon_off: n.entity_icon_off,
				state_template: n.state_template,
				label_template: n.label_template,
				name_template: n.name_template,
				tap_action: n.tap_action,
				hold_action: n.hold_action,
				double_tap_action: n.double_tap_action,
				entity_tap_action: n.entity_tap_action,
				entity_hold_action: n.entity_hold_action,
				entity_double_tap_action: n.entity_double_tap_action
			});
			return;
		}
		this._updateConfig({
			mode: e,
			...e === "icon_only" ? {} : { entities: void 0 }
		});
	}
	_selectStatusItem(e) {
		this._selectedStatusIndex = e, this.dispatchEvent(new CustomEvent("config-changed", {
			detail: { config: this._getPreviewConfig() },
			bubbles: !0,
			composed: !0
		}));
	}
	_addStatusItem() {
		let e = this._getStatusItems();
		this._selectedStatusIndex = e.length, this._updateConfig(W(_u, { entities: [...e, { entity: "" }] }));
	}
	_duplicateStatusItem(e) {
		let t = this._getStatusItems(), n = t[e];
		if (!n) return;
		let r = [...t];
		r.splice(e + 1, 0, structuredClone(n)), this._selectedStatusIndex = e + 1, this._updateConfig(W(_u, { entities: r }));
	}
	_removeStatusItem(e) {
		let t = this._getStatusItems();
		if (t.length <= 1) {
			this._updateConfig(G("entity", gu));
			return;
		}
		let n = t.filter((t, n) => n !== e);
		this._selectedStatusIndex = Math.max(0, Math.min(e, n.length - 1)), this._updateConfig({ entities: n });
	}
	_moveStatusItem(e, t) {
		let n = this._getStatusItems(), r = e + t;
		if (r < 0 || r >= n.length) return;
		let i = [...n], [a] = i.splice(e, 1);
		i.splice(r, 0, a), this._selectedStatusIndex = r, this._updateConfig(W(_u, { entities: i }));
	}
	_updateStatusItem(e, t) {
		let n = this._getStatusItems(), r = {
			...n[e] || {},
			...t
		};
		if (t.entity === "" && X(r) === "entity" && hu(r), Array.isArray(this._config?.entities)) {
			let t = [...n];
			t[e] = r;
			let i = { entities: t };
			t.length > 1 && Object.assign(i, W(_u)), this._updateConfig(i);
			return;
		}
		if (t.entity === "" && X(r) === "entity") {
			this._updateConfig(G("entity", gu));
			return;
		}
		this._updateConfig({
			entity: r.entity || "",
			...sc(r),
			color_source: r.color_source || "",
			color: r.color || "",
			accent_color_source: r.accent_color_source || "",
			accent_color: r.accent_color || "",
			color_on: r.color_on || "",
			color_off: r.color_off || "",
			icon_source: r.icon_source || "",
			icon: r.icon || "",
			icon_on: r.icon_on || "",
			icon_off: r.icon_off || "",
			entity_icon_source: r.entity_icon_source || "",
			entity_icon_template: r.entity_icon_template || "",
			entity_icon: r.entity_icon || "",
			entity_icon_on: r.entity_icon_on || "",
			entity_icon_off: r.entity_icon_off || "",
			state_template: r.state_template || "",
			label_template: r.label_template || "",
			name_template: r.name_template || "",
			tap_action: r.tap_action,
			hold_action: r.hold_action,
			double_tap_action: r.double_tap_action,
			entity_tap_action: r.entity_tap_action,
			entity_hold_action: r.entity_hold_action,
			entity_double_tap_action: r.entity_double_tap_action
		});
	}
	_renderInput(e, t, n = "", r = {}) {
		return Ri.call(this, e, t, n, r);
	}
	_renderTemplateInput(e, t, n = {}) {
		return zi.call(this, e, t, n);
	}
	_renderNumberInput(e, t, n = {}) {
		return Bi.call(this, e, t, n);
	}
	_renderColor(e, t, n) {
		return Gi.call(this, e, t, n);
	}
	_renderColorControl(e, t, n, r, i) {
		return Ki.call(this, e, t, n, r, i);
	}
	_renderColorPair(e) {
		return qi.call(this, e);
	}
	_renderEntity(e, t, n) {
		return vo.call(this, e, t, n);
	}
	_renderStatusItemInteractions(e, t, n, r) {
		let i = {
			hass: this.hass,
			_config: t,
			_t: (e, t) => this._t(e, t),
			requestUpdate: () => this.requestUpdate(),
			_updateConfig: (t) => this._updateStatusItem(e, t)
		};
		return q.call(i, {
			interactions: [
				{
					key: "tap_action",
					formKey: "tap_action",
					label: "Tap behavior",
					defaultAction: n,
					defaultVisible: !0,
					customDefaultLabel: n === "Current state" ? Y : void 0
				},
				{
					key: "hold_action",
					formKey: "hold_action",
					label: "Hold behavior",
					defaultAction: "none"
				},
				{
					key: "double_tap_action",
					formKey: "double_tap_action",
					label: "Double tap behavior",
					defaultAction: "none"
				},
				{
					key: "entity_tap_action",
					formKey: "icon_tap_action",
					label: "Icon tap behavior",
					defaultAction: r,
					customDefaultLabel: r === "Current state" ? Y : void 0
				},
				{
					key: "entity_hold_action",
					formKey: "icon_hold_action",
					label: "Icon hold behavior",
					defaultAction: "none"
				},
				{
					key: "entity_double_tap_action",
					formKey: "icon_double_tap_action",
					label: "Icon double tap behavior",
					defaultAction: "none"
				}
			],
			context: {
				entity_id: t.entity,
				area_id: this._config?.area
			}
		});
	}
	_renderArea(e, t) {
		return yo.call(this, e, t);
	}
	_renderIconInput(e, t, n = "mdi:information-outline or icon.svg") {
		return ci.call(this, e, t, n);
	}
	_loadLocalIconFiles(e = "") {
		return di.call(this, e);
	}
	_renderStatusItemIconInput(e, t, n, r = "mdi:information-outline or icon.svg") {
		let i = this._getStatusItems()[n] || {}, a = {
			hass: this.hass,
			_config: i,
			_iconPickerPrefix: `status-${n}-icon`,
			_t: (e, t) => this._t(e, t),
			_isImageIcon: (e) => this._isImageIcon(e),
			_resolveIconPath: (e) => this._resolveIconPath(e),
			_getInlineSvg: (e) => this._getInlineSvg(e),
			_loadLocalIconFiles: (e) => this._loadLocalIconFiles(e),
			requestUpdate: () => this.requestUpdate(),
			renderRoot: this.renderRoot,
			_handleConfigUpdate: (e, t) => this._updateStatusItem(n, { [e]: t })
		};
		return Object.defineProperties(a, {
			_iconPickerKey: {
				get: () => this._iconPickerKey,
				set: (e) => {
					this._iconPickerKey = e;
				}
			},
			_iconPickerTab: {
				get: () => this._iconPickerTab,
				set: (e) => {
					this._iconPickerTab = e;
				}
			},
			_localIconFiles: {
				get: () => this._localIconFiles,
				set: (e) => {
					this._localIconFiles = e;
				}
			},
			_orbitIconFiles: {
				get: () => this._orbitIconFiles,
				set: (e) => {
					this._orbitIconFiles = e;
				}
			},
			_localIconFilesLoading: {
				get: () => this._localIconFilesLoading,
				set: (e) => {
					this._localIconFilesLoading = e;
				}
			},
			_orbitIconFilesLoading: {
				get: () => this._orbitIconFilesLoading,
				set: (e) => {
					this._orbitIconFilesLoading = e;
				}
			}
		}), ci.call(a, e, t, r);
	}
	_isImageIcon(e) {
		return oi(e);
	}
	_resolveIconPath(e) {
		return si(e);
	}
	_getInlineSvg(e) {
		return B.call(this, e, { forceColor: !0 });
	}
	_renderStatusSection() {
		return tu.call(this);
	}
	render() {
		return E`
      <div class="wrapper">
        ${this._renderStatusSection()}
        <div class="editor-version">
          ${this._t("Orbit Status Card v{version}", { version: t.status })}
        </div>
      </div>
    `;
	}
	static styles = [Ts, fu];
};
customElements.define("orbit-status-card-editor", mu);
function hu(e) {
	Object.assign(e, W(gu));
}
var gu = [
	...oc,
	"color_source",
	"color",
	"color_on",
	"color_off",
	"icon_source",
	"icon",
	"icon_on",
	"icon_off",
	"icon_svg_color_override",
	"icon_on_svg_color_override",
	"icon_off_svg_color_override",
	"state_template",
	"label_template",
	"name_template",
	"tap_action",
	"hold_action",
	"double_tap_action",
	"entity_tap_action",
	"entity_hold_action",
	"entity_double_tap_action"
], _u = ["entity", ...gu], vu = [
	"tracker_entity",
	"eta_entity",
	"battery_entity_1",
	"battery_entity_2",
	"color_source",
	"color",
	"color_on",
	"color_off",
	"tap_action",
	"hold_action",
	"double_tap_action",
	"entity_tap_action",
	"entity_hold_action",
	"entity_double_tap_action"
], yu = ["eta_entity"], bu = /* @__PURE__ */ "state_source.entity.area.domain.device_class.threshold.thresholds.hide.active_template.inactive_template.entity_tap_action.entity_hold_action.entity_double_tap_action.color_source.color.color_on.color_off.icon_source.icon.icon_on.icon_off.icon_svg_color_override.icon_on_svg_color_override.icon_off_svg_color_override.state_template.label_template.name_template.tap_action.hold_action.double_tap_action".split("."), xu = [
	"state_source",
	"entity",
	"area",
	"domain",
	"device_class",
	"threshold",
	"thresholds",
	"hide",
	"active_template",
	"inactive_template"
], Su = [
	"color_source",
	"color",
	"color_on",
	"color_off",
	"icon_source",
	"icon",
	"icon_on",
	"icon_off",
	"icon_svg_color_override",
	"icon_on_svg_color_override",
	"icon_off_svg_color_override"
], Cu = [
	"tap_action",
	"hold_action",
	"double_tap_action"
], wu = [
	"entity_tap_action",
	"entity_hold_action",
	"entity_double_tap_action"
], Tu = [
	"type",
	"mode",
	...xu,
	...wu,
	"name",
	"name_template",
	...Su,
	"state_template",
	"label_template",
	...Cu,
	"grid_options",
	"view_layout"
], Eu = [
	"type",
	"mode",
	"name",
	"name_template",
	"entity",
	"tracker_entity",
	"eta_entity",
	"battery_entity_1",
	"battery_entity_2",
	...wu,
	...Su,
	...Cu,
	"grid_options",
	"view_layout"
], Du = [
	"type",
	"mode",
	"wrap",
	"separate_cards",
	"items_per_row",
	"entities",
	...Cu,
	"grid_options",
	"view_layout"
];
function Ou(e) {
	return e?.mode === "person" ? Eu : e?.mode === "icon_only" ? Du : Tu;
}
function ku(e) {
	let t = Nu(Lu(e));
	t.mode !== "icon_only" && delete t.entities, ju(t), t.mode !== "person" && t.mode !== "icon_only" && (t.state_source = X(t)), Fu(t), Iu(t);
	let n = {}, r = /* @__PURE__ */ new Set();
	return Ou(t).forEach((e) => {
		Object.prototype.hasOwnProperty.call(t, e) && (n[e] = e === "entities" && Array.isArray(t[e]) ? t[e].map(Mu) : t[e], r.add(e));
	}), Object.keys(t).forEach((e) => {
		r.has(e) || (n[e] = t[e]);
	}), n;
}
function Au(e, t) {
	return JSON.stringify(e) === JSON.stringify(t);
}
function ju(e) {
	if (e?.mode !== "icon_only" || e.state_source !== "area_count" || !Array.isArray(e.entities) || e.entities.length === 0) return;
	let t = sc(e);
	e.entities = e.entities.map((e) => {
		let n = typeof e == "string" ? { entity: e } : { ...e || {} };
		return n.state_source === void 0 && (Object.assign(n, t), Fu(n)), n;
	}), oc.forEach((t) => {
		delete e[t];
	});
}
function Mu(e) {
	if (typeof e == "string") return Ru({
		state_source: "entity",
		entity: e
	}, bu);
	if (!e || typeof e != "object" || Array.isArray(e)) return e;
	let t = Nu(Lu(e));
	return t.state_source = X(t), Fu(t), Iu(t), Ru(t, bu);
}
function Nu(e = {}) {
	let t = { ...e };
	return t.color_source === void 0 && t.accent_color_source !== void 0 && (t.color_source = t.accent_color_source), t.color === void 0 && (t.color_source === "template" || I(t.accent_color)) && t.accent_color !== void 0 && (t.color = t.accent_color), t.color_source !== void 0 && delete t.accent_color_source, t.color !== void 0 && delete t.accent_color, t.icon_source === void 0 && t.entity_icon_source !== void 0 && (t.icon_source = t.entity_icon_source), t.icon_source === "template" && t.icon === void 0 && (t.icon = t.icon_template || t.entity_icon_template || t.entity_icon), [
		["icon", "entity_icon"],
		["icon_on", "entity_icon_on"],
		["icon_off", "entity_icon_off"],
		["icon_svg_color_override", "entity_icon_svg_color_override"],
		["icon_on_svg_color_override", "entity_icon_on_svg_color_override"],
		["icon_off_svg_color_override", "entity_icon_off_svg_color_override"]
	].forEach(([e, n]) => {
		t[e] === void 0 && t[n] !== void 0 && !(e === "icon" && t.icon_source === "template") && (t[e] = t[n]), delete t[n];
	}), delete t.entity_icon_source, delete t.entity_icon_template, delete t.icon_template, t;
}
function Pu(e = {}) {
	let t = (e) => !!(e && typeof e == "object" && !Array.isArray(e) && (e.accent_color_source !== void 0 || I(e.accent_color) || e.entity_icon_source !== void 0 || e.entity_icon_template !== void 0 || e.entity_icon !== void 0 || e.entity_icon_on !== void 0 || e.entity_icon_off !== void 0 || e.icon_template !== void 0));
	return t(e) || Array.isArray(e.entities) && e.entities.some(t);
}
function Fu(e) {
	e?.state_source === "area_count" && (delete e.entity, delete e.main_entity, delete e.include_low_sensors);
}
function Iu(e) {
	e?.state_source === "area_count" && (e.tap_action?.action === "Current state" && delete e.tap_action, e.entity_tap_action?.action === "Current state" && delete e.entity_tap_action);
}
function Lu(e = {}) {
	return Object.fromEntries(Object.entries(e).filter(([, e]) => e !== void 0 && e !== ""));
}
function Ru(e, t) {
	let n = {}, r = /* @__PURE__ */ new Set();
	return t.forEach((t) => {
		Object.prototype.hasOwnProperty.call(e, t) && (n[t] = e[t], r.add(t));
	}), Object.keys(e).forEach((t) => {
		r.has(t) || (n[t] = e[t]);
	}), n;
}
//#endregion
//#region src/cards/status/renders/status-card.js
function zu() {
	let e = this._config?.mode || "standard", t = this._statusItems || [], n = e === "icon_only" && t.length > 1, r = Math.max(t.length, 1), i = this._getStatusColumnCount(r), a = this._getStatusRowCount(r), o = Ku(this._statusText), s = this._isImageIcon(this._icon) ? this._resolveIconPath(this._icon) : "", c = s ? this._getInlineSvg(s, this._iconSvgForceColor) : "";
	return E`
    <ha-card
      class="mode-${e} ${n ? "grouped" : ""} ${n && this._config?.separate_cards ? "separate-cards" : ""}"
      tabindex="0"
      style="
        --status-item-count:${r};
        --status-columns:${i};
        --status-rows:${a};
      "
      @click=${this._handleTap}
      @dblclick=${this._handleDoubleTap}
      @pointerdown=${this._handleCardPointerDown}
      @pointerup=${this._handleCardPointerUp}
      @pointerleave=${this._handleCardPointerCancel}
      @pointercancel=${this._handleCardPointerCancel}
      @contextmenu=${this._handleCardContextMenu}
    >
      <div
        class="container status-container mode-${e} ${n ? "grouped" : ""}"
        style="
          --status-circle-color:${this._circleColor};
          --status-icon-color:${this._iconColor};
          --status-name-color:${this._nameColor};
          --status-text-color:${this._statusColor};
        "
      >
        ${n ? Bu.call(this, t, i) : E`
        <div
          class="circle status-circle"
          @pointerdown=${this._handleMainIconPointerDown}
          @pointerup=${this._handleMainIconPointerUp}
          @pointerleave=${this._handleMainIconPointerCancel}
          @pointercancel=${this._handleMainIconPointerCancel}
          @touchstart=${this._handleMainIconPointerDown}
          @touchend=${this._handleMainIconPointerUp}
          @touchcancel=${this._handleMainIconPointerCancel}
          @click=${this._handleMainIconClick}
          @dblclick=${this._handleMainEntityDoubleTap}
          @contextmenu=${this._handleMainIconContextMenu}
        >
          ${e === "person" ? Hu.call(this) : this._isImageIcon(this._icon) ? E`
                <div
                  class="main-image-icon"
                >
                  ${c ? H(c) : E`<img src=${s} alt="" />`}
                </div>
              ` : this._useNativeMainIcon && this._mainIconStateObj ? E`
                <ha-state-icon
                  class="main-icon"
                  .stateObj=${this._mainIconStateObj}
                ></ha-state-icon>
              ` : E`
                <ha-icon
                  class="main-icon"
                  .icon=${this._icon}
                ></ha-icon>
            `}
          ${Wu.call(this, this._mainStateObj)}
        </div>

        ${e === "icon_only" ? E`
              <div
                class="status-badge"
                ?hidden=${!o}
              >
                ${o}
              </div>
            ` : E`
              <div class="content">
                <div class="header">
                  <div class="card-name">
                    ${this._cardName}
                  </div>

                  <div class="status">
                    ${this._statusText || ""}
                  </div>
                </div>
              </div>
            `}
          `}
      </div>
    </ha-card>
    ${this._renderActiveEntitiesDialog()}
  `;
}
function Bu(e, t) {
	return E`
    <div class="status-icon-grid">
      ${qu(e, t).map((e, n) => E`
        <div class="status-icon-row">
          ${e.map((e, r) => Vu.call(this, e, n * t + r))}
          ${Ju(e.length, t, "status-icon-spacer")}
        </div>
      `)}
    </div>
  `;
}
function Vu(e, t) {
	let n = this._config?.[pu], r = Rl(this) && Number.isInteger(n) && n === t ? "orbit-editor-preview-selected" : "", i = Ku(e.statusText), a = this._isImageIcon(e.icon) ? this._resolveIconPath(e.icon) : "", o = a ? this._getInlineSvg(a, e.svgForceColor) : "", s = E`
    <div class="circle status-circle">
      ${this._isImageIcon(e.icon) ? E`
            <div class="main-image-icon">
              ${o ? H(o) : E`<img src=${a} alt="" />`}
            </div>
          ` : e.useStateIcon && e.nativeIconStateObj ? E`
            <ha-state-icon
              class="main-icon"
              .stateObj=${e.nativeIconStateObj}
            ></ha-state-icon>
          ` : E`
            <ha-icon
              class="main-icon"
              .icon=${e.icon}
            ></ha-icon>
          `}
      ${Wu.call(this, e.stateObj)}
    </div>

    <div
      class="status-badge"
      ?hidden=${!i}
    >
      ${i}
    </div>
  `;
	return (this._statusItems?.length || 0) > 1 && !this._config?.separate_cards ? E`
      <div
        class="status-icon-item ${r}"
        style="
          --status-circle-color:${e.circleColor};
          --status-icon-color:${e.iconColor};
        "
        @click=${(e) => this._handleStatusItemClick(e, t)}
        @dblclick=${(e) => this._handleStatusItemDoubleClick(e, t)}
        @pointerdown=${(e) => this._handleStatusItemPointerDown(e, t)}
        @pointerup=${this._handleStatusItemPointerUp}
        @pointerleave=${this._handleStatusItemPointerCancel}
        @pointercancel=${this._handleStatusItemPointerCancel}
        @contextmenu=${(e) => this._handleStatusItemContextMenu(e, t)}
      >
        ${s}
      </div>
    ` : E`
    <ha-card
      class="status-icon-item ${r}"
      style="
        --status-circle-color:${e.circleColor};
        --status-icon-color:${e.iconColor};
      "
      @click=${(e) => this._handleStatusItemClick(e, t)}
      @dblclick=${(e) => this._handleStatusItemDoubleClick(e, t)}
      @pointerdown=${(e) => this._handleStatusItemPointerDown(e, t)}
      @pointerup=${this._handleStatusItemPointerUp}
      @pointerleave=${this._handleStatusItemPointerCancel}
      @pointercancel=${this._handleStatusItemPointerCancel}
      @contextmenu=${(e) => this._handleStatusItemContextMenu(e, t)}
    >
      ${s}
    </ha-card>
  `;
}
function Hu() {
	return E`
    <div class="person-main-icon">
      ${this._personPicture ? E`
            <img
              class="person-picture"
              src=${this._personPicture}
              alt=""
            />
          ` : E`
          <ha-icon
            class="person-fallback-icon"
            .icon=${this._icon || "mdi:account"}
          ></ha-icon>
          `}

      ${Uu.call(this, "zone", this._personZoneIcon || "mdi:home-minus", this._computeFullColor("blue"))}

      ${this._personBattery1 ? Uu.call(this, "battery-1", null, this._personBattery1.color, this._personBattery1.entityId, this._personBattery1.stateObj) : ""}

      ${this._personBattery2 ? Uu.call(this, "battery-2", null, this._personBattery2.color, this._personBattery2.entityId, this._personBattery2.stateObj) : ""}
    </div>
  `;
}
function Uu(e, t, n, r = null, i = null) {
	let a = Gu(i);
	return E`
    <span
      class="person-badge person-badge-${e} ${r ? "clickable" : ""}"
      style="background:${n}"
      .dataEntity=${r}
      @pointerdown=${this._handlePersonBadgeStop}
      @pointerup=${this._handlePersonBadgePointerUp}
      @pointerleave=${this._handlePersonBadgeStop}
      @pointercancel=${this._handlePersonBadgeStop}
      @touchstart=${this._handlePersonBadgeStop}
      @touchend=${this._handlePersonBadgeStop}
      @touchcancel=${this._handlePersonBadgeStop}
      @click=${this._handlePersonBadgeClick}
    >
      <span class="person-badge-icon">
        ${i ? E`
              <ha-state-icon
                class=${a ? "charging" : ""}
                .stateObj=${i}
              ></ha-state-icon>
            ` : E`<ha-icon .icon=${t}></ha-icon>`}
      </span>
      ${Wu.call(this, i)}
    </span>
  `;
}
function Wu(e) {
	return st(e) ? E`
        <ha-tile-badge
          class="entity-unavailable-badge"
          title=${this._t("Unavailable")}
          aria-label=${this._t("Unavailable")}
        >
          <ha-icon .icon=${"mdi:exclamation-thick"}></ha-icon>
        </ha-tile-badge>
      ` : "";
}
function Gu(e) {
	let t = e?.attributes || {};
	return String(t.icon || "").toLowerCase().includes("battery-charging") || t.battery_charging === !0 || t.is_charging === !0 || t.charging === !0;
}
function Ku(e) {
	let t = String(e || "").match(/-?\d+(?:\.\d+)?/);
	return (t ? Number(t[0]) : null) === 0 ? "" : t?.[0] || "";
}
function qu(e, t = 1) {
	let n = Math.max(1, t), r = [];
	for (let t = 0; t < e.length; t += n) r.push(e.slice(t, t + n));
	return r;
}
function Ju(e, t, n) {
	let r = Math.max(0, t - e);
	return Array.from({ length: r }, () => E`
    <div class=${n}></div>
  `);
}
//#endregion
//#region src/common/styles/editor-preview-selection.js
var Yu = d`
  .orbit-editor-preview-selected {
    isolation: isolate;
    position: relative;
  }

  .orbit-editor-preview-selected::before {
    border: 3px solid var(--primary-color);
    border-radius: inherit;
    box-sizing: border-box;
    content: "";
    inset: 0;
    pointer-events: none;
    position: absolute;
    z-index: 100;
  }

`, Xu = [
	Kr,
	qr,
	Jr,
	Yu,
	d`
  ha-card {
    aspect-ratio: 3 / 1;
    border-radius: 15px;
  }

  ha-card.mode-icon_only {
    aspect-ratio: 0.94 / 1;
  }

  ha-card.mode-icon_only.grouped {
    --orbit-grouped-item-gap: clamp(5px, 1.4cqw, 8px);
    aspect-ratio: auto;
    container-type: inline-size;
  }

  ha-card.mode-icon_only.grouped:not(.separate-cards) {
    background: var(--ha-card-background, var(--card-background-color, #1a1a1a));
    overflow: hidden;
  }

  ha-card.mode-icon_only.grouped.separate-cards {
    background: transparent;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    border: var(--ha-card-border-width, 1px) solid transparent;
    box-shadow: none;
    overflow: visible;
  }

  ha-card.mode-person {
    aspect-ratio: 3 / 1;
  }

  .status-container {
    --status-circle-color: rgba(var(--color-theme),0.05);
    --status-icon-color: rgba(var(--color-theme),0.4);
    --status-name-color: rgb(var(--color-theme));
    --status-text-color: rgb(var(--color-theme));
    overflow: hidden;
  }

  .status-circle {
    background: var(--status-circle-color);
    position: absolute;
    left: -8%;
    top: 18%;
    width: 34%;
    aspect-ratio: 1 / 1;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: visible;
    touch-action: manipulation;
    z-index: 3;
  }

  .status-circle .main-icon {
    --orbit-main-icon-size: 45%;
    color: var(--status-icon-color);
  }

  .status-circle .main-image-icon {
    width: 45%;
    height: 45%;
    color: var(--status-icon-color);
  }

  .status-container .content {
    justify-content: center;
    padding-left: 31%;
    pointer-events: none;
  }

  .status-container .status {
    color: var(--status-text-color);
    font-size: clamp(16px, 8cqw, 32px);
  }

  .status-container .card-name {
    color: var(--status-name-color);
  }

  .status-container.mode-icon_only .status-circle {
    left: -12%;
    top: auto;
    bottom: -12%;
    width: 82%;
    transform: none;
  }

  .status-container.mode-icon_only.grouped {
    display: block;
    height: auto;
    overflow: visible;
    padding: 0;
  }

  .status-icon-grid {
    display: flex;
    flex-direction: column;
    gap: var(--orbit-grouped-item-gap);
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }

  .status-container.mode-icon_only.grouped .status-icon-grid {
    height: auto;
  }

  .status-icon-row {
    display: flex;
    gap: var(--orbit-grouped-item-gap);
    width: 100%;
  }

  .status-icon-item {
    border-radius: 15px;
    box-sizing: border-box;
    container-type: size;
    cursor: pointer;
    overflow: hidden;
    position: relative;
    flex: 1 1 0;
    min-width: 0;
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
  }

  .status-icon-spacer {
    flex: 1 1 0;
    min-width: 0;
    visibility: hidden;
    pointer-events: none;
  }

  .status-container.mode-icon_only.grouped .status-icon-item {
    aspect-ratio: 0.94 / 1;
  }

  ha-card.mode-icon_only.grouped:not(.separate-cards) .status-icon-item {
    --ha-card-background: transparent;
    --card-background-color: transparent;
    background: transparent !important;
    border: var(--ha-card-border-width, 1px) solid transparent;
    box-shadow: none;
  }

  .status-container.mode-icon_only.grouped .status-icon-spacer {
    aspect-ratio: 0.94 / 1;
  }

  ha-card.mode-icon_only.grouped.separate-cards .status-icon-item {
    border-radius: 15px;
    overflow: hidden;
  }

  .status-icon-item .status-circle {
    left: -12%;
    top: auto;
    bottom: -12%;
    width: 82%;
  }

  .status-container.mode-icon_only .status-circle .main-icon {
    --orbit-main-icon-size: 54%;
  }

  .status-container.mode-icon_only .status-circle .main-image-icon {
    width: 54%;
    height: 54%;
  }

  .status-container.mode-person .status-circle {
    overflow: visible;
  }

  .status-container.mode-person .person-main-icon {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .status-container.mode-person .person-picture,
  .status-container.mode-person .person-fallback-icon {
    width: 100%;
    height: 100%;
  }

  .status-container.mode-person .person-picture {
    border-radius: 50%;
    object-fit: cover;
    display: block;
  }

  .status-container.mode-person .person-fallback-icon {
    --mdc-icon-size: 100%;
    color: var(--status-icon-color);
  }

  .person-badge {
    --person-badge-size: clamp(16px, 18%, 40px);
    --person-badge-ring: clamp(2px, 0.55cqw, 4px);
    position: absolute;
    width: var(--person-badge-size);
    height: var(--person-badge-size);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 0 var(--person-badge-ring) var(--ha-card-background, var(--card-background-color));
    transform: translate(-50%, -50%);
    z-index: 5;
    pointer-events: none;
  }

  .person-badge.clickable {
    pointer-events: auto;
    cursor: pointer;
  }

  .person-badge-icon {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .person-badge ha-icon,
  .person-badge ha-state-icon {
    --mdc-icon-size: 92%;
    width: 92%;
    height: 92%;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: none;
    color: var(--primary-background-color);
  }

  .person-badge-zone {
    left: 37%;
    top: 4%;
    z-index: 6;
  }

  .person-badge-zone ha-icon {
    transform: none;
  }

  .person-badge ha-state-icon {
    transform: translate(4%, -10%);
  }

  .person-badge ha-state-icon.charging {
    transform: translate(10%, -10%);
  }

  .person-badge-battery-1 {
    left: 69%;
    top: 4%;
  }

  .person-badge-battery-2 {
    left: 94%;
    top: 25%;
  }

  .status-badge {
    background: var(--status-circle-color);
    color: var(--status-icon-color);
    position: absolute;
    top: 5%;
    right: 5%;
    min-width: clamp(20px, 36cqw, 80px);
    height: clamp(20px, 36cqw, 80px);
    padding: 0 clamp(3px, 7cqw, 18px);
    border-radius: 999px;
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: clamp(17px, 23cqw, 52px);
    font-weight: bold;
    line-height: 1;
    white-space: nowrap;
    z-index: 4;
    pointer-events: none;
  }

  .status-badge[hidden] {
    display: none;
  }
`
], Zu = d`
  ha-adaptive-dialog {
    --ha-dialog-min-height: auto;
    --ha-bottom-sheet-height: auto;
  }

  .active-entities-dialog-content {
    min-width: 0;
    padding: 0 var(--ha-space-4, 16px);
  }

  .active-entity-row {
    display: flex;
    align-items: center;
    gap: var(--ha-space-3, 12px);
    min-height: 52px;
    padding: 6px 0;
    border-top: 1px solid var(--divider-color);
  }

  .active-entity-row > ha-state-icon {
    flex: 0 0 auto;
    margin: 12px;
  }

  .active-entity-row ha-state-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    line-height: 0;
    --mdc-icon-size: 36px;
  }

  .active-entity-control-button {
    display: grid;
    flex: 0 0 auto;
    width: 48px;
    height: 48px;
    padding: 0;
    place-items: center;
    border: 0;
    border-radius: 50%;
    outline: 0;
    background: transparent;
    color: inherit;
    cursor: pointer;
  }

  .active-entity-control-button ha-state-icon {
    pointer-events: none;
  }

  .active-entity-control-button:focus-visible,
  .active-entity-control-button:hover {
    background: var(--secondary-background-color);
  }

  .active-entity-info {
    display: flex;
    flex: 1 1 auto;
    min-width: 0;
    flex-direction: column;
    gap: 1px;
    padding: 4px 0;
    border: 0;
    outline: 0;
    background: transparent;
    color: inherit;
    font: inherit;
    text-align: start;
    cursor: pointer;
  }

  .active-entity-info:focus-visible {
    border-radius: var(--ha-border-radius-md);
    background: var(--secondary-background-color);
  }

  .active-entity-name {
    overflow: hidden;
    color: var(--primary-text-color);
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .active-entity-area,
  .active-entity-state-line {
    color: var(--secondary-text-color);
    font-size: var(--ha-font-size-s, 12px);
  }

  .active-entity-area {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .active-entity-state-line {
    display: flex;
    align-items: baseline;
    gap: 5px;
  }

  .active-entity-state-line state-display {
    color: var(--secondary-text-color);
    font-size: var(--ha-font-size-s, 12px);
  }

  .active-entities-empty {
    padding: var(--ha-space-5, 20px) 0;
    color: var(--secondary-text-color);
    text-align: center;
  }

  .active-entities-confirmation-text {
    margin: 0;
    color: var(--primary-text-color);
  }

  .active-entities-confirmation-title {
    margin: inherit;
    padding: 0 var(--ha-space-2, 8px);
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
  }
`, Qu = class extends j {
	static svgCache = V;
	static get properties() {
		return {
			hass: {},
			_config: { type: Object },
			_cardName: { type: String },
			_statusText: { type: String },
			_icon: { type: String },
			_nameColor: { type: String },
			_statusColor: { type: String },
			_iconColor: { type: String },
			_circleColor: { type: String },
			_navigationPath: { type: String },
			_personPicture: { type: String },
			_personZoneIcon: { type: String },
			_personBattery1: { type: Object },
			_personBattery2: { type: Object },
			_statusItems: { type: Array },
			_templateRevision: { type: Number },
			...Lc
		};
	}
	constructor() {
		super(), Rc.call(this), this._activeEntitiesStatusIndex = 0;
	}
	static getConfigElement() {
		return document.createElement("orbit-status-card-editor");
	}
	static getStubConfig() {
		return {
			type: "custom:orbit-status-card",
			mode: "standard",
			entity: ""
		};
	}
	getLayoutOptions() {
		if (this._config?.mode === "icon_only") {
			let e = _l(this._config).length, t = ed(this._config, e);
			return {
				grid_columns: Math.max(1, t),
				grid_min_columns: .5,
				grid_rows: "auto"
			};
		}
		return {
			grid_columns: 3,
			grid_min_columns: 2
		};
	}
	setConfig(e) {
		this._config = cn(e).config;
		let t = this._config.color_off || "theme";
		this._nameColor = this._computeFullColor(t), this._statusColor = this._computeFullColor(t), this._iconColor = this._computeIconColor(t), this._circleColor = this._computeCircleColor(t), this._statusItems = [];
	}
	willUpdate(e) {
		return (e.has("_config") || e.has("hass")) && dt.call(this, this._getTemplateEntries()), gl.call(this, e);
	}
	disconnectedCallback() {
		ft.call(this), this._clearMainIconHoldTimer(), this._clearStatusItemHoldTimer(), this._clearDoubleTapTimer(), Vc.call(this), super.disconnectedCallback();
	}
	shouldUpdate(e) {
		return qn.call(this, e, this._getRelevantEntities(), {
			hasTemplates: Jn(this._config),
			includeZones: this._config?.mode === "person"
		});
	}
	_handleAction(e, t = null) {
		if (e?.action === "Current state") {
			this._activeEntitiesStatusIndex = e.status_index ?? 0, zc.call(this);
			return;
		}
		return Be.call(this, e, t);
	}
	_renderActiveEntitiesDialog() {
		let e = this._config?.mode === "icon_only" ? _l(this._config)[this._activeEntitiesStatusIndex] || {} : this._config;
		return sl.call(this, bc(Oc(this.hass, e), e, (e) => this._getEntityActiveState(e)));
	}
	_t(e, t) {
		return J(this.hass, e, t);
	}
	_handleTap(e) {
		if (!N(this)) {
			if (this._shouldSuppressMainIconTap(e)) {
				this._stopEvent(e);
				return;
			}
			if (this._isMainIconEvent(e)) {
				this._handleMainEntityTap(e);
				return;
			}
			P.call(this, e, this._getStatusItemEntityId(0), this._getCardTapAction(), this._getCardDoubleTapAction());
		}
	}
	_handleDoubleTap(e) {
		if (this._isMainIconEvent(e)) {
			this._handleMainEntityDoubleTap(e);
			return;
		}
		F.call(this, e, this._config.entity, this._getCardDoubleTapAction());
	}
	_isMainIconEvent(e) {
		if (e.composedPath().some((e) => e?.classList && (e.classList.contains("circle") || e.classList.contains("status-circle") || e.classList.contains("main-icon") || e.classList.contains("main-image-icon")))) return !0;
		let t = (this.shadowRoot?.querySelector(".status-circle"))?.getBoundingClientRect();
		return t ? e.clientX >= t.left && e.clientX <= t.right && e.clientY >= t.top && e.clientY <= t.bottom : !1;
	}
	_handleMainEntityTap(e) {
		if (N(this)) return;
		if (this._shouldSuppressMainIconTap(e)) {
			this._stopEvent(e);
			return;
		}
		if (this._longPressTriggered) {
			this._longPressTriggered = !1, this._stopEvent(e);
			return;
		}
		let t = this._getStatusItemEntityId(0), n = this._getMainEntityTapAction() || this._getCardTapAction();
		!t && !$u(n) || P.call(this, e, t, n, this._getMainEntityDoubleTapAction());
	}
	_handleMainEntityDoubleTap(e) {
		F.call(this, e, this._config.entity, this._getMainEntityDoubleTapAction());
	}
	_handleCardTapAction() {
		let e = this._getCardTapAction(), t = this._getStatusItemEntityId(0);
		if (e.action && e.action !== "navigate") {
			this._handleAction(e, t);
			return;
		}
		this._navigate(e.navigation_path || this._navigationPath || "/lovelace/home");
	}
	_handleCardPointerDown(e) {
		if (N(this) || this._isMainIconEvent(e)) return;
		this._stopEvent(e), this._clearStatusItemHoldTimer();
		let t = this._getCardHoldAction();
		t && (this._statusItemHoldTimer = setTimeout(() => {
			this._statusItemLongPressTriggered = !0, this._handleAction(t, this._config.entity);
		}, this._LONG_PRESS_DELAY));
	}
	_handleCardPointerUp(e) {
		this._isMainIconEvent(e) || (this._stopEvent(e), this._clearStatusItemHoldTimer());
	}
	_handleCardPointerCancel(e) {
		this._isMainIconEvent(e) || (this._stopEvent(e), this._clearStatusItemHoldTimer());
	}
	_handleCardContextMenu(e) {
		if (this._isMainIconEvent(e)) return;
		this._stopEvent(e);
		let t = this._getCardHoldAction();
		t && (this._clearStatusItemHoldTimer(), this._statusItemLongPressTriggered = !0, this._handleAction(t, this._config.entity));
	}
	_handleStatusItemClick(e, t = 0) {
		if (this._statusItemLongPressTriggered) {
			this._statusItemLongPressTriggered = !1, this._stopEvent(e);
			return;
		}
		let n = this._getStatusItemEntityId(t), r = this._isStatusItemMainIconEvent(e) ? this._getStatusItemMainEntityTapAction(t) : this._getStatusItemCardTapAction(t), i = this._isStatusItemMainIconEvent(e) ? this._getStatusItemMainEntityDoubleTapAction(t) : this._getStatusItemCardDoubleTapAction(t);
		!n && !$u(r) || P.call(this, e, n, r?.action ? r.action === "Current state" ? {
			...r,
			status_index: t
		} : r : { action: "more-info" }, i);
	}
	_handleStatusItemDoubleClick(e, t = 0) {
		F.call(this, e, this._getStatusItemEntityId(t), this._isStatusItemMainIconEvent(e) ? this._getStatusItemMainEntityDoubleTapAction(t) : this._getStatusItemCardDoubleTapAction(t));
	}
	_handleStatusItemPointerDown(e, t = 0) {
		if (N(this)) return;
		this._stopEvent(e), this._clearStatusItemHoldTimer();
		let n = this._isStatusItemMainIconEvent(e) ? this._getStatusItemMainEntityHoldAction(t) : this._getStatusItemCardHoldAction(t);
		n && (this._statusItemHoldTimer = setTimeout(() => {
			this._statusItemLongPressTriggered = !0, this._handleAction(n, this._getStatusItemEntityId(t));
		}, this._LONG_PRESS_DELAY));
	}
	_handleStatusItemPointerUp(e) {
		this._stopEvent(e), this._clearStatusItemHoldTimer();
	}
	_handleStatusItemPointerCancel(e) {
		this._stopEvent(e), this._clearStatusItemHoldTimer();
	}
	_handleStatusItemContextMenu(e, t = 0) {
		this._stopEvent(e);
		let n = this._isStatusItemMainIconEvent(e) ? this._getStatusItemMainEntityHoldAction(t) : this._getStatusItemCardHoldAction(t);
		n && (this._clearStatusItemHoldTimer(), this._statusItemLongPressTriggered = !0, this._handleAction(n, this._getStatusItemEntityId(t)));
	}
	_navigate(e) {
		return We.call(this, e);
	}
	_handlePersonBadgeStop(e) {
		e.currentTarget?.dataEntity && e.stopPropagation();
	}
	_handlePersonBadgePointerUp(e) {
		let t = e.currentTarget?.dataEntity;
		t && (e.stopPropagation(), this._personBadgeActionFired = !0, this._openPersonBadgeMoreInfo(t));
	}
	_handlePersonBadgeClick(e) {
		let t = e.currentTarget?.dataEntity;
		if (t) {
			if (e.stopPropagation(), this._personBadgeActionFired) {
				this._personBadgeActionFired = !1;
				return;
			}
			this._openPersonBadgeMoreInfo(t);
		}
	}
	_openPersonBadgeMoreInfo(e) {
		this.dispatchEvent(new CustomEvent("hass-more-info", {
			detail: { entityId: e },
			bubbles: !0,
			composed: !0
		}));
	}
	_computeFullColor(e) {
		return Dt.call(this, e);
	}
	_computeIconColor(e) {
		return Ot.call(this, e);
	}
	_computeCircleColor(e) {
		return kt.call(this, e);
	}
	_getMainStateObj() {
		let e = this._config.entity;
		return e && this.hass ? this.hass.states[e] : null;
	}
	formatState(e) {
		return nt(e);
	}
	_getEntityActiveState(e) {
		return rt(e);
	}
	_isImageIcon(e) {
		return In(e);
	}
	_resolveIconPath(e) {
		return Ln(e);
	}
	_getInlineSvg(e, t = !0) {
		return B.call(this, e, { forceColor: t });
	}
	_getSvgColorOverride(e, t) {
		return Rn(e, t);
	}
	_evaluateStateTemplate(e, t) {
		return L.call(this, e, t);
	}
	_getTemplateEntries() {
		if (this._config?.mode === "icon_only") return [
			..._l(this._config).flatMap((e) => (X(e) === "area_count" ? [] : [
				e.state_template,
				e.active_template,
				e.inactive_template,
				e.label_template,
				e.name_template
			]).filter(Boolean).map((t) => ({
				template: t,
				entityId: e.entity || ""
			}))),
			...gt(this._config),
			..._t(this._config)
		];
		let e = this._config?.mode === "person" ? this._config?.tracker_entity || "" : this._config?.entity || "";
		return [
			...(X(this._config) === "area_count" ? [] : [
				this._config?.state_template,
				this._config?.active_template,
				this._config?.inactive_template,
				this._config?.label_template,
				this._config?.name_template
			]).filter(Boolean).map((t) => ({
				template: t,
				entityId: e
			})),
			...gt(this._config),
			..._t(this._config)
		];
	}
	_getRelevantEntities() {
		return this._config?.mode === "icon_only" ? _l(this._config).flatMap((e) => X(e) === "area_count" ? jc(this.hass, e) : [e.entity]) : X(this._config) === "area_count" ? jc(this.hass, this._config) : [
			this._config?.entity,
			this._config?.tracker_entity,
			this._config?.eta_entity,
			this._config?.battery_entity_1,
			this._config?.battery_entity_2
		];
	}
	get _LONG_PRESS_DELAY() {
		return 500;
	}
	_handleMainIconPointerDown(e) {
		if (N(this)) return;
		if (this._isDuplicateTouchEvent(e)) {
			this._stopEvent(e);
			return;
		}
		this._trackPointerEvent(e), this._stopEvent(e), e.currentTarget?.setPointerCapture?.(e.pointerId), this._mainIconPointerDown = !0, this._mainIconHoldFired = !1, this._mainIconSuppressUntil = 0, this._clearMainIconHoldTimer();
		let t = this._getMainEntityHoldAction();
		t && (this._mainIconHoldTimer = setTimeout(() => {
			this._mainIconHoldFired = !0, this._mainIconSuppressUntil = Date.now() + 1e3, this._handleAction(t, this._config.entity);
		}, this._LONG_PRESS_DELAY));
	}
	_handleMainIconPointerUp(e) {
		if (this._isDuplicateTouchEvent(e)) {
			this._stopEvent(e);
			return;
		}
		this._trackPointerEvent(e), this._stopEvent(e);
		let t = this._mainIconHoldFired;
		if (this._clearMainIconHoldTimer(), this._mainIconPointerDown = !1, t) {
			this._mainIconSuppressClick = !0, this._mainIconSuppressUntil = Date.now() + 1e3;
			return;
		}
		this._handleMainEntityTap(e), this._mainIconSuppressClick = !0;
	}
	_handleMainIconPointerCancel(e) {
		if (this._isDuplicateTouchEvent(e)) {
			this._stopEvent(e);
			return;
		}
		if (this._trackPointerEvent(e), this._stopEvent(e), !this._getMainEntityHoldAction()) {
			this._clearMainIconHoldTimer(), this._mainIconPointerDown = !1;
			return;
		}
	}
	_handleMainIconClick(e) {
		this._stopEvent(e), this._mainIconSuppressClick &&= !1;
	}
	_handleMainIconContextMenu(e) {
		this._stopEvent(e);
		let t = this._getMainEntityHoldAction();
		t && this._mainIconPointerDown && !this._mainIconHoldFired && (this._clearMainIconHoldTimer(), this._mainIconHoldFired = !0, this._mainIconSuppressClick = !0, this._mainIconSuppressUntil = Date.now() + 1e3, this._handleAction(t, this._config.entity));
	}
	_clearMainIconHoldTimer() {
		this._mainIconHoldTimer &&= (clearTimeout(this._mainIconHoldTimer), null);
	}
	_clearStatusItemHoldTimer() {
		this._statusItemHoldTimer &&= (clearTimeout(this._statusItemHoldTimer), null);
	}
	_clearDoubleTapTimer() {
		return Ve.call(this);
	}
	_getCardHoldAction() {
		return Tl.call(this);
	}
	_getCardDoubleTapAction() {
		return El.call(this);
	}
	_getMainEntityHoldAction() {
		return Dl.call(this);
	}
	_getMainEntityTapAction() {
		return Ol.call(this);
	}
	_getMainEntityDoubleTapAction() {
		return kl.call(this);
	}
	_getCardTapAction() {
		return Al.call(this);
	}
	_getStatusItemCardTapAction(e = 0) {
		return Ml.call(this, e);
	}
	_getStatusItemCardHoldAction(e = 0) {
		return Nl.call(this, e);
	}
	_getStatusItemCardDoubleTapAction(e = 0) {
		return Pl.call(this, e);
	}
	_getStatusItemMainEntityTapAction(e = 0) {
		return Fl.call(this, e);
	}
	_getStatusItemMainEntityDoubleTapAction(e = 0) {
		return Il.call(this, e);
	}
	_getStatusItemMainEntityHoldAction(e = 0) {
		return Ll.call(this, e);
	}
	_isIconOnlyMode() {
		return this._config?.mode === "icon_only";
	}
	_isPersonMode() {
		return this._config?.mode === "person";
	}
	_getStatusItemEntityId(e = 0) {
		let t = this._statusItems?.[e];
		return t?.entityId || t?.entity || this._config.entity;
	}
	_getStatusColumnCount(e = this._statusItems?.length || 1) {
		return ed(this._config, e);
	}
	_getStatusRowCount(e = this._statusItems?.length || 1) {
		return td(this._config, e);
	}
	_isStatusItemMainIconEvent(e) {
		return e.composedPath().some((e) => e?.classList && (e.classList.contains("status-circle") || e.classList.contains("main-icon") || e.classList.contains("main-image-icon")));
	}
	_trackPointerEvent(e) {
		e.type?.startsWith("pointer") && (this._lastMainIconPointerEventAt = Date.now());
	}
	_isDuplicateTouchEvent(e) {
		return !!(e.type?.startsWith("touch") && this._lastMainIconPointerEventAt && Date.now() - this._lastMainIconPointerEventAt < 750);
	}
	_shouldSuppressMainIconTap(e) {
		return !this._mainIconSuppressUntil || Date.now() > this._mainIconSuppressUntil ? !1 : !e || this._isMainIconEvent(e);
	}
	_stopEvent(e) {
		e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation && e.stopImmediatePropagation();
	}
	render() {
		return zu.call(this);
	}
	static styles = [...Xu, Zu];
};
function $u(e) {
	let t = e?.action;
	return t === "Current state" ? !0 : t === "more-info" ? !!(e.entity || e.entity_id) : [
		"navigate",
		"url",
		"perform-action",
		"call-service",
		"fire-dom-event",
		"popup",
		"none"
	].includes(t);
}
function ed(e = {}, t = 1) {
	return nc({
		config: e,
		count: t,
		perRowKey: "items_per_row"
	});
}
function td(e = {}, t = 1) {
	return rc({
		config: e,
		count: t,
		perRowKey: "items_per_row"
	});
}
en({
	tag: "orbit-status-card",
	cardClass: Qu,
	name: "Orbit Status Card",
	description: "Responsive status card",
	version: t.status,
	getEntitySuggestion: rd
});
var nd = new Set([
	"automation",
	"button",
	"input_button",
	"scene",
	"script"
]);
function rd(e, t) {
	let n = Xn(t);
	if (n === "person") return { config: {
		type: "custom:orbit-status-card",
		mode: "person",
		entity: t
	} };
	if (nd.has(n)) return null;
	let r = {
		label: J(e, "Standard"),
		config: {
			type: "custom:orbit-status-card",
			mode: "standard",
			entity: t
		}
	};
	return Qn(e, t) ? [r, {
		label: J(e, "Icon only"),
		config: {
			type: "custom:orbit-status-card",
			mode: "icon_only",
			entity: t
		}
	}] : { config: r.config };
}
//#endregion
//#region src/cards/action/helpers/lifecycle.js
function id(e) {
	!e.has("_config") && !e.has("hass") && !e.has("_templateRevision") || (this._actions = ad(this._config).map((e) => od.call(this, e)));
}
function ad(e = {}) {
	return Array.isArray(e.entities) && e.entities.length ? e.entities.map((e) => typeof e == "string" ? { entity: e } : e || {}) : [{
		entity: e.main_entity,
		color: e.color,
		icon_source: e.icon_source,
		icon: e.icon,
		icon_svg_color_override: e.icon_svg_color_override,
		tap_action: e.tap_action,
		hold_action: e.hold_action,
		double_tap_action: e.double_tap_action
	}];
}
function od(e) {
	let t = e.entity || e.main_entity, n = t && this.hass ? this.hass.states[t] : null, r = e.color || this._config.color || "theme";
	this._orbitColorTemplateEntityId = t || "";
	let i = cd(n), a = this._computeCircleColor(r), o = i ? this._computeFullColor(r) : this._computeIconColor(r);
	this._orbitColorTemplateEntityId = "";
	let s = sd(e, t), c = ["custom", "template"].includes(s) ? Nn.call(this, e.icon, t) : "", l = ["custom", "template"].includes(s) && c ? "icon" : "", u = c || "mdi:play-circle";
	return {
		...e,
		entityId: t,
		stateObj: n,
		useStateIcon: !!n && s !== "template" && !c,
		icon: u,
		iconColor: o,
		cardBackground: a,
		isRunning: i,
		svgForceColor: l ? this._getSvgColorOverride(e, l) : !0
	};
}
function sd(e, t) {
	let n = e.icon_source, r = !!t, i = !!e.icon;
	return n === "custom" ? "custom" : n === "template" ? "template" : n === "entity" && r ? "entity" : i ? "custom" : "entity";
}
function cd(e) {
	if (!e) return !1;
	let t = e.entity_id?.split(".")[0], n = Number(e.attributes?.current);
	return Number.isFinite(n) && n > 0 ? !0 : t === "script" && e.state === "on";
}
//#endregion
//#region src/cards/action/renders/action-card.js
function ld() {
	let e = this._actions || [], t = Math.max(e.length, 1), n = this._getActionColumnCount(t), r = this._getActionRowCount(t), i = dd(e, n);
	return E`
    <ha-card
      class="${t > 1 ? "grouped" : ""} ${t > 1 && this._config?.separate_cards ? "separate-cards" : ""}"
      tabindex="0"
      style="
        --action-count:${t};
        --action-columns:${n};
        --action-rows:${r};
      "
    >
      <div class="container action-container">
        ${i.map((e, t) => E`
          <div class="action-row">
            ${e.map((e, r) => ud.call(this, e, t * n + r))}
            ${fd(e.length, n, "action-spacer")}
          </div>
        `)}
      </div>
    </ha-card>
  `;
}
function ud(e, t) {
	let n = this._isImageIcon(e.icon) ? this._resolveIconPath(e.icon) : "", r = n ? this._getInlineSvg(n, e.svgForceColor) : "", i = E`
    <div class="circle action-circle">
      ${this._isImageIcon(e.icon) ? E`
            <div class="main-image-icon">
              ${r ? H(r) : E`<img src=${n} alt="" />`}
            </div>
          ` : e.useStateIcon && e.stateObj ? E`
            <ha-state-icon
              class="main-icon"
              .stateObj=${e.stateObj}
            ></ha-state-icon>
          ` : E`
            <ha-icon
              class="main-icon"
              .icon=${e.icon}
            ></ha-icon>
          `}
      ${st(e.stateObj) ? E`
            <ha-tile-badge
              class="entity-unavailable-badge"
              title=${this._t("Unavailable")}
              aria-label=${this._t("Unavailable")}
            >
              <ha-icon .icon=${"mdi:exclamation-thick"}></ha-icon>
            </ha-tile-badge>
          ` : ""}
    </div>
  `;
	return (this._actions?.length || 0) > 1 && !this._config?.separate_cards ? E`
      <div
        class="action-button ${e.isRunning ? "running" : ""}"
        role="button"
        tabindex="0"
        style="
          --action-card-background:${e.cardBackground};
          --action-icon-color:${e.iconColor};
        "
        @click=${(e) => this._handleTap(e, t)}
        @dblclick=${(e) => this._handleDoubleTap(e, t)}
        @pointerdown=${(e) => this._handlePointerDown(e, t)}
        @pointerup=${this._handlePointerUp}
        @pointerleave=${this._handlePointerCancel}
        @pointercancel=${this._handlePointerCancel}
        @contextmenu=${(e) => this._handleContextMenu(e, t)}
      >
        ${i}
      </div>
    ` : E`
    <ha-card
      class="action-button ${e.isRunning ? "running" : ""}"
      role="button"
      tabindex="0"
      style="
        --action-card-background:${e.cardBackground};
        --action-icon-color:${e.iconColor};
      "
      @click=${(e) => this._handleTap(e, t)}
      @dblclick=${(e) => this._handleDoubleTap(e, t)}
      @pointerdown=${(e) => this._handlePointerDown(e, t)}
      @pointerup=${this._handlePointerUp}
      @pointerleave=${this._handlePointerCancel}
      @pointercancel=${this._handlePointerCancel}
      @contextmenu=${(e) => this._handleContextMenu(e, t)}
    >
      ${i}
    </ha-card>
  `;
}
function dd(e, t = 1) {
	let n = Math.max(1, t), r = [];
	for (let t = 0; t < e.length; t += n) r.push(e.slice(t, t + n));
	return r;
}
function fd(e, t, n) {
	let r = Math.max(0, t - e);
	return Array.from({ length: r }, () => E`
    <div class=${n}></div>
  `);
}
//#endregion
//#region src/cards/action/styles/action-card-styles.js
var pd = [
	qr,
	Jr,
	d`
    ha-card {
      aspect-ratio: 0.94 / 1;
      border-radius: 15px;
    }

    ha-card.grouped {
      --orbit-grouped-item-gap: clamp(5px, 1.4cqw, 8px);
      aspect-ratio: auto;
      container-type: inline-size;
    }

    ha-card.grouped:not(.separate-cards) {
      background: var(--ha-card-background, var(--card-background-color, #1a1a1a));
      overflow: hidden;
    }

    ha-card.grouped.separate-cards {
      background: transparent;
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
      border: var(--ha-card-border-width, 1px) solid transparent;
      box-shadow: none;
      overflow: visible;
    }

    .action-container {
      display: flex;
      flex-direction: column;
      gap: var(--orbit-grouped-item-gap);
      height: auto;
      padding: 0;
      box-sizing: border-box;
    }

    .action-row {
      display: flex;
      flex: 1 1 auto;
      gap: var(--orbit-grouped-item-gap);
      min-height: 0;
      width: 100%;
    }

    ha-card.grouped .action-row {
      flex: 0 0 auto;
    }

    .action-button {
      border-radius: 15px;
      box-sizing: border-box;
      overflow: hidden;
      width: 100%;
      height: 100%;
      display: flex;
      flex: 1 1 0;
      align-items: center;
      justify-content: center;
      min-width: 0;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }

    .action-spacer {
      flex: 1 1 0;
      min-width: 0;
      visibility: hidden;
      pointer-events: none;
    }

    ha-card.grouped .action-button {
      aspect-ratio: 0.94 / 1;
      height: auto;
    }

    ha-card.grouped:not(.separate-cards) .action-button {
      --ha-card-background: transparent;
      --card-background-color: transparent;
      background: transparent !important;
      border: var(--ha-card-border-width, 1px) solid transparent;
      box-shadow: none;
    }

    ha-card.grouped .action-spacer {
      aspect-ratio: 0.94 / 1;
    }

    ha-card.grouped.separate-cards .action-button {
      border-radius: 15px;
      overflow: hidden;
    }

    .action-circle {
      width: min(84%, 84cqh);
      aspect-ratio: 1 / 1;
      border-radius: 50%;
      background: var(--action-card-background, rgba(var(--color-theme),0.05));
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: visible;
      position: relative;
      pointer-events: none;
    }

    .action-button.running .action-circle {
      background: color-mix(
        in srgb,
        var(--action-card-background, rgba(var(--color-theme),0.05)) 70%,
        var(--action-icon-color, currentColor)
      );
    }

    .action-circle .main-icon,
    .action-circle .main-image-icon {
      color: var(--action-icon-color);
    }

    .action-circle .main-icon {
      --orbit-main-icon-size: 58%;
    }

    .action-circle .main-image-icon {
      width: 58%;
      height: 58%;
    }
  `
];
//#endregion
//#region src/editors/action/sections/action.js
function md() {
	let e = this._getActionItems(), t = Math.min(this._selectedActionIndex || 0, e.length - 1), n = e[t] || {}, r = this._actionEntityDomainFilter || "all", { itemsPerRow: i, shouldWrapTabs: a, showTabScrollHint: o } = zl({
		config: this._config,
		itemCount: e.length,
		perRowKey: "actions_per_row",
		defaultPerRow: 3
	});
	return E`
    <div class="section">
      ${Bl.call(this, {
		itemCount: e.length,
		classPrefix: "action",
		perRowKey: "actions_per_row",
		perRowLabel: "Actions per row",
		defaultPerRow: 3
	})}

      <div
        class="action-tabs ${a ? "wrapped" : ""} ${o ? "scroll-hint" : ""} ${e.length > 1 ? "has-tools" : ""}"
        style=${a ? `--action-tabs-per-row: ${i};` : ""}
      >
        <div class="action-tab-items">
          ${e.map((e, n) => E`
            <button
              type="button"
              class="action-tab ${n === t ? "active" : ""}"
              @click=${() => this._selectActionItem(n)}
            >
              ${n + 1}
            </button>
          `)}
        </div>

        ${o ? E`
              <div class="action-tabs-scroll-indicator" aria-hidden="true">
                <ha-icon icon="mdi:chevron-right"></ha-icon>
              </div>
            ` : ""}

        <div class="action-editor-tools">
          <button
            type="button"
            class="action-tab-add"
            title=${this._t("Add")}
            @click=${() => this._addActionItem()}
          >
            +
          </button>

          ${e.length > 1 ? E`
                <button
                  type="button"
                  class="action-tool-button action-tool-remove"
                  title=${this._t("Remove")}
                  @click=${() => this._removeActionItem(t)}
                >
                  <ha-icon icon="mdi:trash-can"></ha-icon>
                </button>

                <button
                  type="button"
                  class="action-tool-button"
                  title=${this._t("Move left")}
                  ?disabled=${t === 0}
                  @click=${() => this._moveActionItem(t, -1)}
                >
                  <ha-icon icon="mdi:arrow-left"></ha-icon>
                </button>

                <button
                  type="button"
                  class="action-tool-button"
                  title=${this._t("Move right")}
                  ?disabled=${t === e.length - 1}
                  @click=${() => this._moveActionItem(t, 1)}
                >
                  <ha-icon icon="mdi:arrow-right"></ha-icon>
                </button>
              ` : ""}
        </div>
      </div>

      <div class="field">
        <label>${this._t("Main entity")}</label>

        ${Ga.call(this, {
		value: n.entity || "",
		filterOptions: hd,
		activeFilter: r,
		onValueChanged: (e) => this._updateActionItem(t, { entity: e })
	})}
      </div>

      ${this._renderColorControl("Color", `action-${t}-color`, n.color || "", (e) => this._updateActionItem(t, { color: e }), this._config?.color || "theme")}

      ${gd.call(this, t, n)}

      ${n.entity ? this._renderActionItemInteractions(t, n) : ""}
    </div>
  `;
}
var hd = [
	{
		label: "All",
		value: "all",
		domains: null
	},
	{
		label: "Automations",
		haDomains: ["automation"],
		value: "automation",
		domains: ["automation"]
	},
	{
		label: "Buttons",
		haDomains: ["button"],
		value: "button",
		domains: [
			"button",
			"input_button",
			"input_boolean"
		]
	},
	{
		label: "Cameras",
		haDomains: ["camera"],
		value: "camera",
		domains: ["camera"]
	},
	{
		label: "Scenes",
		haDomains: ["scene"],
		value: "scene",
		domains: ["scene"]
	},
	{
		label: "Scripts",
		haDomains: ["script"],
		value: "script",
		domains: ["script"]
	}
];
function gd(e, t) {
	let n = this, r = {
		hass: this.hass,
		_config: t,
		_t: (e, t) => this._t(e, t),
		_handleConfigUpdate: (t, r) => n._updateActionItem(e, { [t]: r }),
		_renderIconInput: (t, r) => n._renderActionItemIconInput(t, r, e)
	};
	return li.call(r, {
		label: "Icon",
		sourceKey: "icon_source",
		templateKey: "icon",
		entityKey: "entity",
		customIconKeys: ["icon"],
		renderCustom() {
			return this._renderIconInput("", "icon");
		}
	});
}
//#endregion
//#region src/common/editor/styles/action-editor.js
var _d = d`
.action-tabs {
  display: flex;
  align-items: end;
  gap: 6px;
  border-bottom: 1px solid var(--orbit-editor-border);
  padding-bottom: 2px;
  margin-bottom: 12px;
  overflow: visible;
}

.action-tabs.scroll-hint .action-tab-items {
  -webkit-mask-image: linear-gradient(to right, #000 calc(100% - 12px), transparent);
  mask-image: linear-gradient(to right, #000 calc(100% - 12px), transparent);
}

.action-tabs.wrapped {
  display: flex;
  align-items: start;
}

.action-tab-items {
  display: flex;
  align-items: end;
  gap: 6px;
  min-width: 0;
  overflow-x: auto;
}

.action-tabs.wrapped .action-tab-items {
  display: grid;
  grid-template-columns: repeat(
    var(--action-tabs-per-row, 3),
    32px
  );
  justify-content: start;
  flex: 1 1 auto;
  overflow-x: auto;
}

.action-tabs-scroll-indicator {
  width: 16px;
  min-width: 16px;
  height: 36px;
  color: var(--primary-color);
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  opacity: 0.78;
  pointer-events: none;
}

.action-tabs-scroll-indicator ha-icon {
  --mdc-icon-size: 18px;
}

.action-group-options {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 2px;
}

.action-wrap-toggle {
  display: flex;
  align-items: center;
  gap: 10px;
  opacity: 1;
}

.action-per-row-field {
  margin-left: auto;
  width: 144px;
  min-width: 144px;
}

.action-tab,
.action-tab-add {
  border: none;
  background: transparent;
  color: inherit;
  width: 32px;
  min-width: 32px;
  height: 36px;
  padding: 0;
  font: inherit;
  font-size: var(--ha-font-size-m, 14px);
  font-weight: var(--ha-font-weight-medium, 500);
  line-height: var(--ha-line-height-normal, 20px);
  opacity: 0.6;
  cursor: pointer;
}

.action-tab.active {
  color: var(--primary-color);
  opacity: 1;
  border-bottom: 3px solid var(--primary-color);
}

.action-tabs.wrapped .action-tab,
.action-tabs.wrapped .action-tab-add {
  width: 32px;
  min-width: 32px;
}

.action-editor-tools .action-tab-add {
  width: 34px;
  min-width: 34px;
  height: 34px;
  border: 1px solid var(--orbit-editor-border);
  border-radius: var(--ha-border-radius-lg, 12px);
  background: var(--orbit-editor-control);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
}

.action-tab-add {
  font-size: 24px;
  opacity: 0.9;
}

.action-editor-tools {
  display: flex;
  gap: 4px;
  margin-left: auto;
  justify-content: flex-end;
}

.action-tabs.scroll-hint .action-editor-tools {
  margin-left: 0;
}

.action-tabs.wrapped .action-editor-tools {
  display: grid;
  grid-template-columns: repeat(2, 34px);
  grid-template-rows: repeat(2, 34px);
  gap: 4px;
  min-width: max-content;
  align-self: start;
}

.action-tool-button {
  width: 34px;
  height: 34px;
  border: 1px solid var(--orbit-editor-border);
  border-radius: var(--ha-border-radius-lg, 12px);
  background: var(--orbit-editor-control);
  color: inherit;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.action-tool-button:disabled {
  opacity: 0.35;
  cursor: default;
}

.action-tool-button ha-icon {
  --mdc-icon-size: 20px;
}
`, vd = class extends j {
	static svgCache = V;
	static properties = {
		hass: { attribute: !1 },
		_config: { state: !0 },
		_selectedActionIndex: { state: !0 },
		_actionEntityDomainFilter: { state: !0 },
		_colorPickerKey: { state: !0 },
		_colorPickerTab: { state: !0 },
		_iconPickerKey: { state: !0 },
		_iconPickerTab: { state: !0 },
		_iconFileSearch: { state: !0 },
		_iconFilePickerOpen: { state: !0 },
		_orbitIconFiles: { state: !0 },
		_orbitIconFilesLoading: { state: !0 },
		_localIconFiles: { state: !0 },
		_localIconFilesLoading: { state: !0 }
	};
	constructor() {
		super(), this._config = this._config || {}, this._selectedActionIndex = 0, this._actionEntityDomainFilter = "all", this._colorPickerKey = "", this._colorPickerTab = "picker", this._iconPickerKey = "", this._iconPickerTab = "ha", this._iconFileSearch = "", this._iconFilePickerOpen = !1, this._orbitIconFiles = [], this._orbitIconFilesLoading = !1, this._localIconFiles = [], this._localIconFilesLoading = !1;
	}
	connectedCallback() {
		super.connectedCallback(), bo(this), Qt(this, "orbit-action-card");
	}
	disconnectedCallback() {
		xo(this), super.disconnectedCallback();
	}
	setConfig(e) {
		let { config: t, migrated: n } = nn(e || {}), r = wd(t || {}), i = !Td(t || {}, r);
		this._config = r, this._selectedActionIndex = Math.min(this._selectedActionIndex || 0, this._getActionItems(this._config).length - 1), (n || i) && queueMicrotask(() => this._dispatchConfigChanged(this._config));
	}
	_t(e, t) {
		return J(this.hass, e, t);
	}
	_updateConfig(e) {
		this._config = wd(Vi(this._config, e)), this._dispatchConfigChanged(this._config);
	}
	_dispatchConfigChanged(e) {
		this.dispatchEvent(new CustomEvent("config-changed", {
			detail: { config: e },
			bubbles: !0,
			composed: !0
		}));
	}
	_handleConfigUpdate(e, t) {
		this._updateConfig({ [e]: t });
	}
	_getActionItems(e = this._config) {
		return Array.isArray(e?.entities) && e.entities.length ? e.entities.map((e) => typeof e == "string" ? { entity: e } : e || {}) : [{
			entity: e?.main_entity || "",
			color: e?.color || "",
			icon_source: e?.icon_source || "",
			icon: e?.icon || "",
			tap_action: e?.tap_action,
			hold_action: e?.hold_action,
			double_tap_action: e?.double_tap_action
		}];
	}
	_selectActionItem(e) {
		this._selectedActionIndex = e;
	}
	_addActionItem() {
		let e = this._getActionItems();
		this._selectedActionIndex = e.length, this._updateConfig(W(xd, { entities: [...e, { entity: "" }] }));
	}
	_removeActionItem(e) {
		let t = this._getActionItems();
		if (t.length <= 1) {
			this._updateConfig(G("main_entity", bd));
			return;
		}
		let n = t.filter((t, n) => n !== e);
		this._selectedActionIndex = Math.max(0, Math.min(e, n.length - 1)), this._updateConfig({ entities: n });
	}
	_moveActionItem(e, t) {
		let n = this._getActionItems(), r = e + t;
		if (r < 0 || r >= n.length) return;
		let i = [...n], [a] = i.splice(e, 1);
		i.splice(r, 0, a), this._selectedActionIndex = r, this._updateConfig(W(xd, { entities: i }));
	}
	_updateActionItem(e, t) {
		let n = this._getActionItems(), r = {
			...n[e] || {},
			...t
		};
		if (t.entity === "" && yd(r), Array.isArray(this._config?.entities)) {
			let t = [...n];
			t[e] = r;
			let i = { entities: t };
			t.length > 1 && Object.assign(i, W(xd)), this._updateConfig(i);
			return;
		}
		if (t.entity === "") {
			this._updateConfig(G("main_entity", bd));
			return;
		}
		this._updateConfig({
			main_entity: r.entity || "",
			color: r.color || "",
			icon_source: r.icon_source || "",
			icon: r.icon || "",
			tap_action: r.tap_action,
			hold_action: r.hold_action,
			double_tap_action: r.double_tap_action
		});
	}
	_getColorStyle(e) {
		return Co(e);
	}
	_getColorPickerValue(e) {
		return wo(e);
	}
	_renderActionItemInteractions(e, t) {
		let n = {
			hass: this.hass,
			_config: t,
			_t: (e, t) => this._t(e, t),
			requestUpdate: () => this.requestUpdate(),
			_updateConfig: (t) => this._updateActionItem(e, t)
		};
		return q.call(n, {
			interactions: [
				{
					key: "tap_action",
					formKey: "tap_action",
					label: "Tap behavior",
					defaultAction: tr(t.entity, "toggle"),
					defaultVisible: !0
				},
				{
					key: "hold_action",
					formKey: "hold_action",
					label: "Hold behavior",
					defaultAction: "more-info"
				},
				{
					key: "double_tap_action",
					formKey: "double_tap_action",
					label: "Double tap behavior",
					defaultAction: "none"
				}
			],
			context: { entity_id: t.entity }
		});
	}
	_renderColor(e, t, n) {
		return Gi.call(this, e, t, n);
	}
	_renderColorControl(e, t, n, r, i) {
		return Ki.call(this, e, t, n, r, i);
	}
	_renderEntity(e, t, n) {
		return vo.call(this, e, t, n);
	}
	_renderNumberInput(e, t, n = {}) {
		return Bi.call(this, e, t, n);
	}
	_renderIconInput(e, t, n = "mdi:palette or icon.svg") {
		return ci.call(this, e, t, n);
	}
	_loadLocalIconFiles(e = "") {
		return di.call(this, e);
	}
	_renderActionItemIconInput(e, t, n, r = "mdi:palette or icon.svg") {
		let i = this._getActionItems()[n] || {}, a = {
			hass: this.hass,
			_config: i,
			_iconPickerPrefix: `action-${n}-icon`,
			_t: (e, t) => this._t(e, t),
			_isImageIcon: (e) => this._isImageIcon(e),
			_resolveIconPath: (e) => this._resolveIconPath(e),
			_getInlineSvg: (e) => this._getInlineSvg(e),
			_loadLocalIconFiles: (e) => this._loadLocalIconFiles(e),
			requestUpdate: () => this.requestUpdate(),
			renderRoot: this.renderRoot,
			_handleConfigUpdate: (e, t) => this._updateActionItem(n, { [e]: t })
		};
		return Object.defineProperties(a, {
			_iconPickerKey: {
				get: () => this._iconPickerKey,
				set: (e) => {
					this._iconPickerKey = e;
				}
			},
			_iconPickerTab: {
				get: () => this._iconPickerTab,
				set: (e) => {
					this._iconPickerTab = e;
				}
			},
			_localIconFiles: {
				get: () => this._localIconFiles,
				set: (e) => {
					this._localIconFiles = e;
				}
			},
			_orbitIconFiles: {
				get: () => this._orbitIconFiles,
				set: (e) => {
					this._orbitIconFiles = e;
				}
			},
			_localIconFilesLoading: {
				get: () => this._localIconFilesLoading,
				set: (e) => {
					this._localIconFilesLoading = e;
				}
			},
			_orbitIconFilesLoading: {
				get: () => this._orbitIconFilesLoading,
				set: (e) => {
					this._orbitIconFilesLoading = e;
				}
			}
		}), ci.call(a, e, t, r);
	}
	_isImageIcon(e) {
		return oi(e);
	}
	_resolveIconPath(e) {
		return si(e);
	}
	_getInlineSvg(e) {
		return B.call(this, e, { forceColor: !0 });
	}
	_renderActionSection() {
		return md.call(this);
	}
	render() {
		return E`
      <div class="wrapper">
        ${this._renderActionSection()}
        <div class="editor-version">
          ${this._t("Orbit Action Card v{version}", { version: t.action })}
        </div>
      </div>
    `;
	}
	static styles = [Ts, _d];
};
customElements.define("orbit-action-card-editor", vd);
function yd(e) {
	Object.assign(e, W(bd));
}
var bd = [
	"color",
	"icon_source",
	"icon",
	"tap_action",
	"hold_action",
	"double_tap_action"
], xd = ["main_entity", ...bd], Sd = [
	"entity",
	"color",
	"icon_source",
	"icon",
	"icon_svg_color_override",
	"tap_action",
	"hold_action",
	"double_tap_action"
], Cd = [
	"type",
	"wrap",
	"actions_per_row",
	"separate_cards",
	"main_entity",
	"color",
	"icon_source",
	"icon",
	"icon_svg_color_override",
	"tap_action",
	"hold_action",
	"double_tap_action",
	"entities",
	"grid_options",
	"view_layout"
];
function wd(e) {
	let t = {}, n = /* @__PURE__ */ new Set();
	return Cd.forEach((r) => {
		Object.prototype.hasOwnProperty.call(e, r) && (t[r] = r === "entities" && Array.isArray(e[r]) ? e[r].map(Ed) : e[r], n.add(r));
	}), Object.keys(e).forEach((r) => {
		n.has(r) || (t[r] = e[r]);
	}), t;
}
function Td(e, t) {
	return JSON.stringify(e) === JSON.stringify(t);
}
function Ed(e) {
	return !e || typeof e != "object" || Array.isArray(e) ? e : Dd(e, Sd);
}
function Dd(e, t) {
	let n = {}, r = /* @__PURE__ */ new Set();
	return t.forEach((t) => {
		Object.prototype.hasOwnProperty.call(e, t) && (n[t] = e[t], r.add(t));
	}), Object.keys(e).forEach((t) => {
		r.has(t) || (n[t] = e[t]);
	}), n;
}
//#endregion
//#region src/cards/action-card.js
var Od = class extends j {
	static svgCache = V;
	static get properties() {
		return {
			hass: {},
			_config: { type: Object },
			_icon: { type: String },
			_iconColor: { type: String },
			_cardBackground: { type: String },
			_isRunning: { type: Boolean },
			_actions: { type: Array },
			_templateRevision: { type: Number }
		};
	}
	static getConfigElement() {
		return document.createElement("orbit-action-card-editor");
	}
	static getStubConfig() {
		return {
			type: "custom:orbit-action-card",
			main_entity: "",
			color: "theme"
		};
	}
	getLayoutOptions() {
		let e = ad(this._config).length, t = kd(this._config, e);
		return {
			grid_columns: Math.max(1, t * 1),
			grid_min_columns: .5,
			grid_rows: "auto"
		};
	}
	setConfig(e) {
		this._config = nn(e).config;
		let t = this._config.color || "theme";
		this._iconColor = this._computeIconColor(t), this._cardBackground = this._computeCircleColor(t), this._isRunning = !1, this._actions = [];
	}
	willUpdate(e) {
		return (e.has("_config") || e.has("hass")) && dt.call(this, [...gt(this._config), ..._t(this._config)]), id.call(this, e);
	}
	disconnectedCallback() {
		ft.call(this), this._clearHoldTimer(), this._clearDoubleTapTimer(), super.disconnectedCallback();
	}
	shouldUpdate(e) {
		return qn.call(this, e, ad(this._config).map((e) => e.entity || e.main_entity), { hasTemplates: Jn(this._config) });
	}
	_handleTap(e, t = 0) {
		if (this._longPressTriggered) {
			this._longPressTriggered = !1, this._stopEvent(e);
			return;
		}
		P.call(this, e, this._getActionEntityId(t), this._getTapAction(t), this._getDoubleTapAction(t));
	}
	_handleDoubleTap(e, t = 0) {
		F.call(this, e, this._getActionEntityId(t), this._getDoubleTapAction(t));
	}
	_clearDoubleTapTimer() {
		return Ve.call(this);
	}
	_getDoubleTapAction(e = 0) {
		let t = this._actions?.[e];
		return t?.double_tap_action?.action ? t.double_tap_action : this._config.double_tap_action?.action ? this._config.double_tap_action : null;
	}
	_handlePointerDown(e, t = 0) {
		N(this) || (this._stopEvent(e), this._clearHoldTimer(), this._holdTimer = setTimeout(() => {
			this._longPressTriggered = !0, this._handleAction(this._getHoldAction(t), this._getActionEntityId(t));
		}, 500));
	}
	_handlePointerUp(e) {
		this._stopEvent(e), this._clearHoldTimer();
	}
	_handlePointerCancel(e) {
		this._stopEvent(e), this._clearHoldTimer();
	}
	_handleContextMenu(e, t = 0) {
		this._stopEvent(e), this._clearHoldTimer(), this._longPressTriggered = !0, this._handleAction(this._getHoldAction(t), this._getActionEntityId(t));
	}
	_getTapAction(e = 0) {
		let t = this._actions?.[e];
		return t?.tap_action?.action ? t.tap_action : this._config.tap_action?.action ? this._config.tap_action : tr(this._getActionEntityId(e), "toggle");
	}
	_getHoldAction(e = 0) {
		let t = this._actions?.[e];
		return t?.hold_action?.action ? t.hold_action : this._config.hold_action?.action ? this._config.hold_action : { action: "more-info" };
	}
	_getActionEntityId(e = 0) {
		let t = this._actions?.[e];
		return t?.entityId || t?.entity || this._config.main_entity;
	}
	_getActionColumnCount(e = this._actions?.length || 1) {
		return kd(this._config, e);
	}
	_getActionRowCount(e = this._actions?.length || 1) {
		return rc({
			config: this._config,
			count: e,
			perRowKey: "actions_per_row"
		});
	}
	_handleAction(e, t = null) {
		return Be.call(this, e, t);
	}
	_computeFullColor(e) {
		return Dt.call(this, e);
	}
	_computeIconColor(e) {
		return Ot.call(this, e);
	}
	_computeCircleColor(e) {
		return kt.call(this, e);
	}
	_isImageIcon(e) {
		return In(e);
	}
	_resolveIconPath(e) {
		return Ln(e);
	}
	_getInlineSvg(e, t = !0) {
		return B.call(this, e, { forceColor: t });
	}
	_getSvgColorOverride(e, t) {
		return Rn(e, t);
	}
	_clearHoldTimer() {
		this._holdTimer &&= (clearTimeout(this._holdTimer), null);
	}
	_stopEvent(e) {
		e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation && e.stopImmediatePropagation();
	}
	render() {
		return ld.call(this);
	}
	static styles = pd;
};
function kd(e = {}, t = 1) {
	return nc({
		config: e,
		count: t,
		perRowKey: "actions_per_row"
	});
}
en({
	tag: "orbit-action-card",
	cardClass: Od,
	name: "Orbit Action Card",
	description: "Compact scene, script, and automation launcher",
	version: t.action,
	getEntitySuggestion: jd
});
var Ad = new Set([
	"automation",
	"button",
	"input_button",
	"scene",
	"script"
]);
function jd(e, t) {
	return Ad.has(Xn(t)) ? { config: {
		type: "custom:orbit-action-card",
		main_entity: t
	} } : null;
}
//#endregion
//#region src/common/helpers/deck-padding.js
function Md(e = {}) {
	let t = e?.attributes || {};
	return {
		top: Rd(t.padding_top),
		right: Rd(t.padding_right),
		bottom: Rd(t.padding_bottom),
		left: Rd(t.padding_left)
	};
}
function Nd(e = {}) {
	return Object.values(Md(e)).some(Boolean);
}
function Pd(e = {}) {
	return e?.attributes?.force_padding === !0;
}
function Fd(e = {}) {
	return Nd(e) && (Pd(e) || !Ld(e?.card));
}
function Id(e = {}) {
	return Pd(e) && Nd(e);
}
function Ld(e) {
	return Array.isArray(e) ? e.some((e) => Ld(e)) : !e || typeof e != "object" ? typeof e == "string" ? /\bpadding(?:-(?:top|right|bottom|left))?\b/i.test(e) : !1 : Object.entries(e).some(([e, t]) => e.toLowerCase().includes("padding") || Ld(t));
}
function Rd(e) {
	if (e == null || e === "") return "";
	let t = e.toString().trim();
	return t ? /^-?\d+(\.\d+)?$/.test(t) ? `${t}px` : t : "";
}
//#endregion
//#region src/cards/deck/items.js
function zd(e = {}) {
	return Array.isArray(e?.decks) ? e.decks.map((e) => e?.badge ? {
		attributes: e?.attributes || {},
		badge: e.badge || {}
	} : {
		attributes: e?.attributes || {},
		card: e?.card || {}
	}) : [];
}
function Bd(e = {}) {
	return [
		$(e, "tap_action"),
		$(e, "hold_action"),
		$(e, "double_tap_action")
	].some(M);
}
function $(e = {}, t) {
	let n = e?.attributes?.[t];
	return n?.action ? n : null;
}
function Vd(e = {}) {
	let t = Wd(e);
	return e?.attributes?.entity || Kd(e?.attributes?.tap_action) || Kd(e?.attributes?.hold_action) || Kd(e?.attributes?.double_tap_action) || Kd(t?.tap_action) || Kd(t?.hold_action) || Kd(t?.double_tap_action) || t?.entity || null;
}
function Hd(e = {}, t = !1) {
	let n = Wd(e), r = Id(e) ? Gd(n) : n, i = r, a = [
		"tap_action",
		"hold_action",
		"double_tap_action"
	].filter((t) => M($(e, t)));
	return a.length && (i = { ...r }, a.forEach((e) => delete i[e])), t ? {
		...i,
		hide_background: !0
	} : i;
}
function Ud(e = {}) {
	return e?.badge ? "badge" : "card";
}
function Wd(e = {}) {
	return e?.badge || e?.card || {};
}
function Gd(e) {
	return Array.isArray(e) ? e.map((e) => Gd(e)) : !e || typeof e != "object" ? e : Object.entries(e).reduce((e, [t, n]) => (t.toLowerCase().includes("padding") || (e[t] = Gd(n)), e), {});
}
function Kd(e) {
	return e?.entity || e?.entity_id || null;
}
function qd(e = []) {
	return Math.max(0, e.findIndex((e) => e.attributes?.default));
}
function Jd(e = []) {
	return e.map((e, t) => e.attributes?.default ? t : "").join(":");
}
//#endregion
//#region src/cards/deck/layout.js
function Yd(e = {}, t = 0) {
	let n = e?.attributes || {}, r = Xd(n.left, 0), i = Xd(n.top, 0);
	return `${[
		`--orbit-deck-overlay-left:${r}px`,
		`--orbit-deck-overlay-top:${i}px`,
		`--orbit-deck-overlay-z-index:${t + 1}`
	].join(";")};`;
}
function Xd(e, t) {
	if (e == null || e === "") return t;
	let n = Number(e);
	return Number.isFinite(n) ? n : t;
}
function Zd(e) {
	let t = Xd(e, null);
	return t === null ? null : Math.max(0, t);
}
function Qd(e = {}) {
	return e?.attributes?.fit === "crop" ? "crop" : "resize";
}
function $d(e, t, n, r, i) {
	if (i) return {
		width: n ?? e,
		height: r ?? t,
		scaleX: 1,
		scaleY: 1
	};
	if (n === null && r === null) return {
		width: e,
		height: t,
		scaleX: 1,
		scaleY: 1
	};
	if (n !== null && r === null) {
		let r = n / e;
		return {
			width: n,
			height: t * r,
			scaleX: r,
			scaleY: r
		};
	}
	if (n === null && r !== null) {
		let n = r / t;
		return {
			width: e * n,
			height: r,
			scaleX: n,
			scaleY: n
		};
	}
	return {
		width: n,
		height: r,
		scaleX: n / e,
		scaleY: r / t
	};
}
function ef(e = {}) {
	return [
		"equal",
		"dynamic",
		"custom"
	].includes(e?.tab_width_mode) ? e.tab_width_mode : "equal";
}
function tf(e = {}) {
	return [
		e.tab_font_size ? `--orbit-deck-tab-font-size:${e.tab_font_size};` : "",
		nf.call(this, "--orbit-deck-tab-color", e.tab_color),
		nf.call(this, "--orbit-deck-tab-active-color", e.tab_active_color),
		nf.call(this, "--orbit-deck-tab-background-color", e.tab_background_color)
	].filter(Boolean).join("");
}
function nf(e, t) {
	return t ? `${e}:${Dt.call(this, t)};` : "";
}
function rf(e, t = 1) {
	let n = Math.max(1, t), r = [];
	for (let t = 0; t < e.length; t += n) r.push(e.slice(t, t + n));
	return r;
}
function af(e, t) {
	return Array.from({ length: Math.max(0, t - e) }, () => E`
    <div class="deck-spacer"></div>
  `);
}
//#endregion
//#region src/cards/deck/surface.js
function of(e = []) {
	return e.map((e) => {
		if (!e?.element) return `${e?.index ?? ""}:none`;
		let t = Md(e.item), n = Pd(e.item), r = Fd(e.item);
		return [
			e.index,
			e.kind || Ud(e.item),
			Wd(e.item)?.type || "",
			n ? "force" : "child",
			r ? t.top : "",
			r ? t.right : "",
			r ? t.bottom : "",
			r ? t.left : ""
		].join(":");
	}).join("|");
}
function sf(e, t) {
	return e?.querySelector?.(`.deck-item-interaction[data-deck-index="${t}"]`);
}
function cf(e = {}, t = {}, n = 0) {
	let r = t?.attributes?.transparent_background;
	return e?.layout === "wrap" ? typeof r == "boolean" ? r : !e?.separate_cards : e?.layout === "overlay" ? n > 0 && r === !0 : e?.layout === "tabs" && r !== !1;
}
var lf = {
	background: "transparent",
	"backdrop-filter": "none",
	"-webkit-backdrop-filter": "none",
	"border-color": "transparent",
	"box-shadow": "none"
};
function uf(e, t) {
	if (t) {
		e._orbitDeckSurfaceStyles ||= Object.fromEntries(Object.keys(lf).map((t) => [t, {
			value: e.style.getPropertyValue(t),
			priority: e.style.getPropertyPriority(t)
		}])), df(e), ff(e);
		return;
	}
	let n = e._orbitDeckSurfaceStyles;
	n && (pf(e), Object.entries(n).forEach(([t, n]) => {
		n.value ? e.style.setProperty(t, n.value, n.priority) : e.style.removeProperty(t);
	}), delete e._orbitDeckSurfaceStyles);
}
function df(e) {
	Object.entries(lf).forEach(([t, n]) => {
		(e.style.getPropertyValue(t) !== n || e.style.getPropertyPriority(t) !== "important") && e.style.setProperty(t, n, "important");
	});
}
function ff(e) {
	e._orbitDeckSurfaceObserver || (e._orbitDeckSurfaceObserver = new MutationObserver(() => {
		e._orbitDeckSurfaceStyles && df(e);
	}), e._orbitDeckSurfaceObserver.observe(e, {
		attributes: !0,
		attributeFilter: ["style"]
	}));
}
function pf(e) {
	e._orbitDeckSurfaceObserver?.disconnect(), e._orbitDeckSurfaceObserver = null;
}
function mf(e) {
	let t = /* @__PURE__ */ new Set();
	return hf(e, t, /* @__PURE__ */ new WeakSet()), [...t];
}
function hf(e, t, n) {
	!e || n.has(e) || (n.add(e), e.localName === "ha-card" && t.add(e), [e.shadowRoot, e].filter(Boolean).forEach((e) => {
		let r = e.querySelectorAll?.("*") || [];
		for (let e of r) e.localName === "ha-card" && t.add(e), e.shadowRoot && hf(e, t, n);
	}));
}
function gf(e, t, n) {
	_f(e, n ? t : {
		top: "",
		right: "",
		bottom: "",
		left: ""
	}), e._orbitDeckPaddingApplied = n;
}
function _f(e, t) {
	vf(e, "padding-top", t.top), vf(e, "padding-right", t.right), vf(e, "padding-bottom", t.bottom), vf(e, "padding-left", t.left);
}
function vf(e, t, n) {
	n ? (e.style.getPropertyValue(t) !== n || e.style.getPropertyPriority(t) !== "important") && e.style.setProperty(t, n, "important") : e.style.removeProperty(t);
}
function yf(e, t) {
	e._orbitDeckPadding = t, !e._orbitDeckPaddingObserver && (e._orbitDeckPaddingObserver = new MutationObserver(() => {
		e._orbitDeckPadding && _f(e, e._orbitDeckPadding);
	}), e._orbitDeckPaddingObserver.observe(e, {
		attributes: !0,
		attributeFilter: ["style"]
	}));
}
function bf(e) {
	e._orbitDeckPadding = null, e._orbitDeckPaddingObserver?.disconnect(), e._orbitDeckPaddingObserver = null;
}
//#endregion
//#region src/cards/deck/styles/deck-card-styles.js
var xf = [Yu, d`
  ha-card.deck-card {
    border-radius: var(--ha-card-border-radius, 15px);
    overflow: visible;
  }

  ha-card.deck-card.wrap.separate-cards {
    background: transparent;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    border: none;
    box-shadow: none;
  }

  ha-card.deck-card.overlay {
    background: transparent;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    border: none;
    box-shadow: none;
  }

  .deck-item-interaction.transparent-background,
  .deck-item-interaction.transparent-background > * {
    background: transparent;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    border-color: transparent;
    box-shadow: none;
  }

  .deck-card.empty {
    min-height: 96px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--secondary-text-color);
  }

  .deck-wrap {
    display: flex;
    flex-direction: column;
    gap: var(--orbit-deck-gap, 8px);
    padding: var(--orbit-deck-padding, 0);
  }

  .deck-row {
    display: flex;
    gap: var(--orbit-deck-gap, 8px);
    width: 100%;
  }

  .deck-item,
  .deck-spacer {
    flex: 1 1 0;
    min-width: 0;
  }

  .deck-item.orbit-editor-preview-resized {
    flex: 0 0 var(--orbit-editor-preview-width, 50%);
  }

  .deck-row:has(.orbit-editor-preview-resized) {
    align-items: flex-start;
    flex-wrap: wrap;
  }

  .deck-item.orbit-editor-preview-resized >
    .deck-item-interaction.orbit-editor-preview-selected {
    height: auto;
    width: 100%;
  }

  .deck-item-interaction {
    display: block;
    height: 100%;
  }

  .deck-item-interaction.has-actions {
    cursor: pointer;
  }

  .deck-spacer {
    visibility: hidden;
    pointer-events: none;
  }

  .deck-visibility-observers {
    display: none !important;
  }

  .deck-tabs {
    display: flex;
    align-items: end;
    gap: 4px;
    border-bottom: none;
    box-shadow: inset 0 -2px 0 var(--divider-color);
    background: var(--orbit-deck-tab-background-color, transparent);
    overflow-x: auto;
  }

  .deck-tab {
    position: relative;
    min-width: 72px;
    min-height: 44px;
    border: none;
    border-bottom: 3px solid transparent;
    background: transparent;
    color: var(--orbit-deck-tab-color, inherit);
    padding: 0 12px;
    font: inherit;
    font-size: var(--orbit-deck-tab-font-size, var(--ha-font-size-m, 14px));
    font-weight: var(--ha-font-weight-medium, 500);
    opacity: 0.62;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    cursor: pointer;
  }

  .deck-card.tabs:not(.hide-tab-dividers) .deck-tab + .deck-tab::before {
    content: "";
    position: absolute;
    inset-inline-start: -3px;
    top: 8px;
    bottom: 0;
    width: 2px;
    background: var(--divider-color);
    pointer-events: none;
  }

  .deck-card.tabs.tab-width-equal .deck-tab {
    flex: 1 1 0;
    min-width: 0;
  }

  .deck-card.tabs.tab-width-dynamic .deck-tab {
    flex: 0 0 auto;
  }

  .deck-card.tabs.tab-width-custom .deck-tab {
    flex: 0 0 var(--orbit-deck-tab-width, 120px);
    min-width: var(--orbit-deck-tab-width, 120px);
  }

  .deck-tab.active {
    color: var(--orbit-deck-tab-active-color, var(--primary-color));
    border-bottom-color: var(--orbit-deck-tab-active-color, var(--primary-color));
    opacity: 1;
  }

  .deck-tab ha-icon {
    --mdc-icon-size: 20px;
  }

  .deck-tab-content {
    padding-top: var(--orbit-deck-gap, 8px);
  }

  .deck-overlay {
    position: relative;
    width: 100%;
    overflow: hidden;
    border-radius: var(--ha-card-border-radius, 15px);
  }

  .deck-overlay-main {
    position: relative;
    z-index: 0;
  }

  .deck-overlay-item {
    position: absolute;
    inset-inline-start: var(--orbit-deck-overlay-left, 0);
    top: var(--orbit-deck-overlay-top, 0);
    z-index: var(--orbit-deck-overlay-z-index, 1);
    flex: 0 0 auto;
    pointer-events: auto;
  }

  .deck-overlay-item.overlay-card {
    width: 100%;
  }

  .deck-overlay-item.overlay-badge {
    width: max-content;
  }

  .deck-overlay-content {
    display: block;
    transform-origin: top left;
  }

  .deck-overlay-item .deck-item-interaction {
    height: auto;
  }

  .deck-overlay-item.transparent-background,
  .deck-overlay-item.transparent-background .deck-overlay-content,
  .deck-overlay-item.transparent-background .deck-item-interaction,
  .deck-overlay-item.transparent-background .deck-item-interaction > * {
    background: transparent;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    border-width: 0;
    border-color: transparent;
    box-shadow: none;
  }

  .deck-error-card {
    padding: 16px;
    background: color-mix(in srgb, var(--error-color) 14%, transparent);
    color: var(--primary-text-color);
  }

  .deck-error-title {
    font-weight: var(--ha-font-weight-bold, 700);
    margin-bottom: 8px;
  }
`], Sf = [
	"type",
	"layout",
	"items_per_row",
	"separate_cards",
	"tab_width_mode",
	"tab_font_size",
	"tab_divider",
	"tab_color",
	"tab_active_color",
	"tab_background_color",
	"decks",
	"grid_options",
	"view_layout"
], Cf = [
	"attributes",
	"badge",
	"card"
], wf = [
	"default",
	"icon",
	"name",
	"width",
	"fit",
	"left",
	"top",
	"height",
	"transparent_background",
	"force_padding",
	"padding_top",
	"padding_bottom",
	"padding_left",
	"padding_right",
	"tap_action",
	"hold_action",
	"double_tap_action"
];
function Tf(e) {
	let t = {}, n = /* @__PURE__ */ new Set();
	return Sf.forEach((r) => {
		Object.prototype.hasOwnProperty.call(e, r) && (t[r] = r === "decks" && Array.isArray(e[r]) ? e[r].map(Of) : e[r], n.add(r));
	}), Object.keys(e).forEach((r) => {
		n.has(r) || (t[r] = e[r]);
	}), t;
}
function Ef(e) {
	if (!Array.isArray(e?.decks)) return {
		config: e,
		changed: !1
	};
	let t = !1, n = e.decks.map((e) => {
		let n = e?.attributes || {};
		if (!Object.prototype.hasOwnProperty.call(n, "label")) return e;
		t = !0;
		let { label: r, ...i } = n;
		return {
			...e,
			attributes: {
				...i,
				name: n.name || r
			}
		};
	});
	return t ? {
		config: {
			...e,
			decks: n
		},
		changed: t
	} : {
		config: e,
		changed: t
	};
}
function Df(e = {}) {
	return e?.badge ? {
		attributes: e.attributes || {},
		badge: e.badge || {}
	} : {
		attributes: e?.attributes || {},
		card: e?.card || {}
	};
}
function Of(e) {
	if (!e || typeof e != "object" || Array.isArray(e)) return e;
	let t = {}, n = /* @__PURE__ */ new Set(), r = {
		...e,
		attributes: kf(Af(e.attributes || {}), wf)
	};
	return e.badge?.type ? (r.badge = e.badge, delete r.card) : e.card?.type ? (r.card = e.card, delete r.badge) : (delete r.badge, delete r.card), Cf.forEach((e) => {
		Object.prototype.hasOwnProperty.call(r, e) && (t[e] = r[e], n.add(e));
	}), Object.keys(r).forEach((e) => {
		n.has(e) || (t[e] = r[e]);
	}), t;
}
function kf(e, t) {
	let n = {}, r = /* @__PURE__ */ new Set();
	return t.forEach((t) => {
		Object.prototype.hasOwnProperty.call(e, t) && (n[t] = e[t], r.add(t));
	}), Object.keys(e).forEach((t) => {
		r.has(t) || (n[t] = e[t]);
	}), n;
}
function Af(e = {}) {
	return Object.entries(e).reduce((e, [t, n]) => (n !== void 0 && n !== "" && (e[t] = n), e), {});
}
//#endregion
//#region src/editors/deck/item-helpers.js
function jf(e = {}, t) {
	let n = Mf(e);
	return n?.[t]?.action ? n[t] : t === "tap_action" && n?.entity ? "more-info" : "none";
}
function Mf(e = {}) {
	return e?.badge || e?.card || {};
}
function Nf(e = {}, t, n = "Card") {
	let r = Mf(e)?.type || "";
	if (!r) return n;
	let i = r.replace(/^custom:/, ""), a = (e?.badge ? window.customBadges || [] : window.customCards || []).find((e) => e.type === r || e.type === i);
	if (a?.name) return a.name;
	let o = e?.badge ? [`ui.panel.lovelace.editor.badges.${i}.name`, `ui.panel.lovelace.editor.badge.${i}.name`] : [`ui.panel.lovelace.editor.card.${i}.name`];
	for (let e of o) {
		let n = t?.localize?.(e);
		if (n && n !== e) return n;
	}
	return i.replace(/[-_]+/g, " ").replace(/\b\w/g, (e) => e.toUpperCase());
}
function Pf(e) {
	return Ff(e) !== "none";
}
function Ff(e) {
	return typeof e == "string" ? e : e?.action || "none";
}
//#endregion
//#region src/editors/deck/native-pickers.js
async function If() {
	if (!this._badgePickerLoadRequested) {
		this._badgePickerLoadRequested = !0;
		try {
			window.loadCardHelpers && await window.loadCardHelpers(), customElements.get("hui-badge-picker") || await this._loadNativeBadgeModule({
				eventName: "ll-create-badge",
				dialogTag: "hui-dialog-create-badge"
			}), await Promise.race([customElements.whenDefined("hui-badge-picker"), new Promise((e) => setTimeout(e, 1500))]);
		} catch {} finally {
			this._badgePickerLoadRequested = !1, this.requestUpdate();
		}
	}
}
async function Lf() {
	if (!this._badgeEditorLoadRequested) {
		this._badgeEditorLoadRequested = !0;
		try {
			if (window.loadCardHelpers && await window.loadCardHelpers(), !customElements.get("hui-badge-element-editor")) {
				let e = this._findElementInShadowRoots(document, (e) => e.localName === "hui-view" && e._layoutElement), t = Number.isInteger(e?.index) ? e.index : 0;
				await this._loadNativeBadgeModule({
					eventName: "ll-edit-badge",
					dialogTag: "hui-dialog-edit-badge",
					detail: { path: [t, 0] },
					huiView: e
				});
			}
			await Promise.race([customElements.whenDefined("hui-badge-element-editor"), new Promise((e) => setTimeout(e, 1500))]);
		} catch {} finally {
			this._badgeEditorLoadRequested = !1, this.requestUpdate();
		}
	}
}
async function Rf({ eventName: e, dialogTag: t, detail: n, huiView: r }) {
	let i = r || this._findElementInShadowRoots(document, (e) => e.localName === "hui-view" && e._layoutElement);
	if (!i) return;
	let a, o = (e) => {
		e.detail?.dialogTag === t && (e.preventDefault(), e.stopImmediatePropagation(), a = e.detail.dialogImport);
	};
	i.addEventListener("show-dialog", o);
	try {
		i._layoutElement.dispatchEvent(new CustomEvent(e, {
			detail: n,
			bubbles: !1,
			composed: !0
		}));
	} finally {
		i.removeEventListener("show-dialog", o);
	}
	typeof a == "function" && await a();
}
function zf(e, t) {
	let n = e.querySelectorAll?.("*") || [];
	for (let e of n) {
		if (t(e)) return e;
		if (e.shadowRoot) {
			let n = this._findElementInShadowRoots(e.shadowRoot, t);
			if (n) return n;
		}
	}
}
async function Bf() {
	if (!this._cardPickerLoadRequested) {
		this._cardPickerLoadRequested = !0;
		try {
			window.loadCardHelpers && await window.loadCardHelpers(), await Promise.race([customElements.whenDefined("hui-card-picker"), new Promise((e) => setTimeout(e, 1500))]);
		} catch {} finally {
			this._cardPickerLoadRequested = !1, this.requestUpdate();
		}
	}
}
//#endregion
//#region src/editors/deck/sections/child-picker.js
function Vf() {
	let e = this._childPickerType;
	return E`
    <div class="editor-tabs deck-child-type-tabs" role="tablist">
      ${[["badge", "Badges"], ["card", "Cards"]].map(([t, n]) => E`
        <button
          type="button"
          class="editor-tab ${e === t ? "active" : ""}"
          role="tab"
          aria-selected=${e === t ? "true" : "false"}
          @click=${() => {
		this._childPickerType = t;
	}}
        >
          ${this._t(n)}
        </button>
      `)}
    </div>
  `;
}
function Hf(e, t) {
	return this._childPickerType === "badge" ? this._renderBadgePicker(e, t) : this._renderCardPicker(e, t);
}
function Uf(e, t) {
	return t?.badge?.type ? customElements.get("hui-badge-element-editor") ? E`
      <hui-badge-element-editor
        .hass=${this.hass}
        .lovelace=${this.lovelace}
        .value=${t.badge}
        @config-changed=${(t) => {
		t.stopPropagation(), this._updateDeckBadge(e, t.detail.config);
	}}
      ></hui-badge-element-editor>
    ` : (this._ensureNativeBadgeEditor(), E`
        <div class="deck-card-picker-loading">
          <ha-spinner></ha-spinner>
        </div>
      `) : !this.hass || !this.lovelace ? E`` : customElements.get("hui-badge-picker") ? E`
    <hui-badge-picker
      .hass=${this.hass}
      .lovelace=${this.lovelace}
      .badgePicked=${(t) => this._updateDeckBadge(e, t)}
      @config-changed=${(t) => {
		t.stopPropagation(), this._updateDeckBadge(e, t.detail.config);
	}}
    ></hui-badge-picker>
  ` : (this._ensureNativeBadgePicker(), E`
      <div class="deck-card-picker-loading">
        <ha-spinner></ha-spinner>
      </div>
    `);
}
function Wf(e, t) {
	return t?.card?.type ? E`
      <hui-card-element-editor
        .hass=${this.hass}
        .lovelace=${this.lovelace}
        .value=${t.card}
        .showVisibilityTab=${["wrap", "tabs"].includes(this._config?.layout || "wrap")}
        @config-changed=${(t) => {
		t.stopPropagation(), this._updateDeckCard(e, t.detail.config);
	}}
      ></hui-card-element-editor>
    ` : !this.hass || !this.lovelace ? E`` : customElements.get("hui-card-picker") ? E`
    <hui-card-picker
      .hass=${this.hass}
      .lovelace=${this.lovelace}
      .cardPicked=${(t) => this._updateDeckCard(e, t)}
      @config-changed=${(t) => {
		t.stopPropagation(), this._updateDeckCard(e, t.detail.config);
	}}
    ></hui-card-picker>
  ` : (this._ensureNativeCardPicker(), E`
      <hui-card-element-editor
        class="native-picker-preloader"
        .hass=${this.hass}
        .lovelace=${this.lovelace}
        .value=${{
		type: "vertical-stack",
		cards: []
	}}
        @config-changed=${(e) => e.stopPropagation()}
      ></hui-card-element-editor>
      <div class="deck-card-picker-loading">
        <ha-spinner></ha-spinner>
      </div>
    `);
}
//#endregion
//#region src/editors/deck/sections/style.js
function Gf(e, t) {
	let n = t?.attributes || {}, r = this._config?.layout === "wrap", i = this._config?.layout === "tabs", a = this._config?.layout === "overlay" && e > 0, o = r || i || a, s = i || r && !this._config?.separate_cards, c = typeof n.transparent_background == "boolean" ? n.transparent_background : s;
	return E`
    <ha-expansion-panel
      class="deck-card-section deck-style-section"
      outlined
      .expanded=${this._styleSectionExpanded === !0}
      @expanded-changed=${(e) => {
		e.target === e.currentTarget && (this._styleSectionExpanded = e.detail.expanded);
	}}
    >
      <ha-icon slot="leading-icon" icon="mdi:palette"></ha-icon>
      <div slot="header" role="heading" aria-level="3">
        ${this._t("Style")}
      </div>
      <div class="deck-card-section-content deck-style-content">
        ${i ? E`
              <div class="field-grid two-columns">
                ${this._renderAttributeSelector(e, {
		label: "Icon",
		selector: { icon: {} },
		value: n.icon || "",
		changeKey: "icon"
	})}
                ${this._renderAttributeSelector(e, {
		label: "Name",
		selector: { text: {} },
		value: n.name || n.label || "",
		changeKey: "name"
	})}
              </div>
            ` : ""}

        ${i && this._config?.tab_width_mode === "custom" ? this._renderAttributeSelector(e, {
		label: "Tab width",
		selector: { text: {} },
		value: n.width || "",
		changeKey: "width"
	}) : ""}

        ${a ? E`
              <div class="field editor-button-toggle-field">
                <div class="field-header">
                  <label>${this._t("Mode")}</label>
                  <ha-selector
                    class="editor-header-button-toggle deck-overlay-fit-toggle"
                    .hass=${this.hass}
                    .selector=${{ button_toggle: { options: [{
		label: this._t("Crop"),
		value: "crop"
	}, {
		label: this._t("Resize"),
		value: "resize"
	}] } }}
                    .value=${n.fit || "resize"}
                    @value-changed=${(t) => this._updateDeckAttributes(e, { fit: t.detail.value === "resize" ? void 0 : t.detail.value })}
                  ></ha-selector>
                </div>
              </div>
              <div class="field-grid four-columns deck-overlay-layout-grid">
                ${this._renderOverlayNumberSelector(e, {
		label: "Left",
		value: n.left,
		changeKey: "left",
		min: -1e4
	})}
                ${this._renderOverlayNumberSelector(e, {
		label: "Top",
		value: n.top,
		changeKey: "top",
		min: -1e4
	})}
                ${this._renderOverlayNumberSelector(e, {
		label: "Width",
		value: n.width,
		changeKey: "width"
	})}
                ${this._renderOverlayNumberSelector(e, {
		label: "Height",
		value: n.height,
		changeKey: "height"
	})}
              </div>
            ` : ""}

        ${o ? E`
              <label class="deck-force-padding-row">
                <span>${this._t("Transparent background")}</span>
                <ha-switch
                  .checked=${c}
                  @change=${(t) => {
		let n = t.target.checked;
		this._updateDeckAttributes(e, { transparent_background: n === s ? void 0 : n });
	}}
                ></ha-switch>
              </label>
            ` : ""}

        <label class="deck-force-padding-row">
          <span>${this._t("Force padding")}</span>
          <ha-switch
            .checked=${n.force_padding === !0}
            @change=${(t) => this._updateDeckAttributes(e, { force_padding: t.target.checked ? !0 : void 0 })}
          ></ha-switch>
        </label>

        <div class="field-grid four-columns deck-padding-grid">
          ${this._renderAttributeSelector(e, {
		label: "Top",
		selector: { text: {} },
		value: n.padding_top || "",
		changeKey: "padding_top"
	})}
          ${this._renderAttributeSelector(e, {
		label: "Bottom",
		selector: { text: {} },
		value: n.padding_bottom || "",
		changeKey: "padding_bottom"
	})}
          ${this._renderAttributeSelector(e, {
		label: "Left",
		selector: { text: {} },
		value: n.padding_left || "",
		changeKey: "padding_left"
	})}
          ${this._renderAttributeSelector(e, {
		label: "Right",
		selector: { text: {} },
		value: n.padding_right || "",
		changeKey: "padding_right"
	})}
        </div>
      </div>
    </ha-expansion-panel>
  `;
}
//#endregion
//#region src/editors/deck/styles.js
var Kf = [
	Ts,
	_d,
	d`
    .deck-subtabs-row {
      display: flex;
      align-items: end;
      gap: 12px;
      border-bottom: 1px solid var(--orbit-editor-border);
      margin-bottom: 12px;
    }

    .deck-subtabs {
      flex: 1 1 auto;
      border-bottom: none;
    }

    .deck-layout-toggle {
      display: flex;
      justify-content: flex-end;
      margin-left: auto;
      width: auto;
      min-width: 270px;
      margin-bottom: 6px;
    }

    .deck-tab-width-toggle {
      width: auto;
      min-width: 260px;
    }

    .deck-overlay-fit-toggle {
      width: min(360px, 100%);
      min-width: 0;
    }

    .field-grid.two-columns {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 12px;
      margin-bottom: 12px;
    }

    .field-grid.four-columns {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 8px;
    }

    .deck-tab-colors {
      margin-top: 12px;
    }

    .deck-tab-divider-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      min-height: 36px;
      margin-top: 4px;
      font-size: var(--ha-font-size-m, 14px);
      font-weight: var(--ha-font-weight-normal, 400);
      line-height: var(--ha-line-height-normal, 20px);
    }

    .deck-card-tab-section {
      gap: 4px;
    }

    .deck-style-section {
      margin-top: 4px;
    }

    .deck-style-content {
      display: flex;
      flex-direction: column;
      gap: 6px;
      padding-bottom: 0;
    }

    .deck-style-content .field-grid.two-columns {
      margin-bottom: 0;
    }

    .deck-force-padding-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      min-height: 36px;
      margin: 0;
      font-size: var(--ha-font-size-m, 14px);
      font-weight: var(--ha-font-weight-normal, 400);
      line-height: var(--ha-line-height-normal, 20px);
    }

    .deck-padding-grid {
      margin-top: -4px;
      margin-bottom: -26px;
    }

    .deck-default-toggle {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin: 6px 0 16px;
    }

    .deck-card-editor-frame {
      min-height: 160px;
    }

    .deck-child-type-tabs {
      margin: -4px 0 12px;
    }

    hui-badge-picker {
      display: block;
      min-height: 320px;
    }

    .deck-card-section {
      display: block;
      margin: 0;
      --expansion-panel-content-padding: 0;
      border-radius: var(--ha-border-radius-md);
      --ha-card-border-radius: var(--ha-border-radius-md);
    }

    .deck-card-section-content {
      padding: 12px;
    }

    .deck-card-section ha-icon {
      color: var(--secondary-text-color);
    }

    .deck-card-picker-loading {
      width: 100%;
      min-height: 56px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .native-picker-preloader {
      display: none;
    }

    .deck-empty-editor {
      color: var(--secondary-text-color);
      padding: 24px 0;
    }
  `
], qf = Symbol.for("orbit-deck-card-preview-selected-index"), Jf = class extends j {
	static properties = {
		hass: { attribute: !1 },
		lovelace: { attribute: !1 },
		_config: { state: !0 },
		_selectedTab: { state: !0 },
		_selectedDeckIndex: { state: !0 },
		_childPickerType: { state: !0 },
		_colorPickerKey: { state: !0 },
		_colorPickerTab: { state: !0 },
		_styleSectionExpanded: { state: !0 },
		_cardSectionExpanded: { state: !0 }
	};
	constructor() {
		super(), this._config = {}, this._selectedTab = "setup", this._selectedDeckIndex = 0, this._childPickerType = "badge", this._colorPickerKey = "", this._colorPickerTab = "picker", this._styleSectionExpanded = !1, this._cardSectionExpanded = !0;
	}
	connectedCallback() {
		super.connectedCallback(), bo(this), this._updateDocumentationContext();
	}
	disconnectedCallback() {
		xo(this), super.disconnectedCallback();
	}
	setConfig(e) {
		let t = an(e || {}), n = Ef(t.config), r = {
			...n.config,
			layout: ["tabs", "overlay"].includes(t.config?.layout) ? t.config.layout : "wrap"
		}, i = Tf(r), a = !Yf(r, i);
		this._config = i, this._selectedDeckIndex = Math.min(this._selectedDeckIndex || 0, Math.max(0, this._getDeckItems().length - 1));
		let o = this._getDeckItems()[this._selectedDeckIndex];
		this._childPickerType = o?.badge ? "badge" : "card", this._updateDocumentationContext(), (t.migrated || n.changed || a) && queueMicrotask(() => this._dispatchConfigChanged());
	}
	_t(e, t) {
		return J(this.hass, e, t);
	}
	_getColorPickerValue(e) {
		return wo(e);
	}
	_getColorStyle(e) {
		return Co(e);
	}
	_updateConfig(e) {
		this._config = Tf(Vi(this._config, e)), this._dispatchConfigChanged();
	}
	_dispatchConfigChanged() {
		this.dispatchEvent(new CustomEvent("config-changed", {
			detail: { config: this._getPreviewConfig() },
			bubbles: !0,
			composed: !0
		}));
	}
	_getPreviewConfig() {
		return {
			...this._config,
			[qf]: this._selectedDeckIndex || 0
		};
	}
	_getDeckItems(e = this._config) {
		return Array.isArray(e?.decks) ? e.decks.map(Df) : [];
	}
	_selectDeckItem(e) {
		let t = this._getDeckItems()[e];
		this._selectedDeckIndex = e, this._childPickerType = t?.badge ? "badge" : "card", this._dispatchPreviewSelection(e);
	}
	_dispatchPreviewSelection(e) {
		this.dispatchEvent(new CustomEvent("config-changed", {
			detail: { config: {
				...this._getPreviewConfig(),
				[qf]: e
			} },
			bubbles: !0,
			composed: !0
		}));
	}
	_addDeckItem() {
		let e = this._getDeckItems();
		this._selectedDeckIndex = e.length, this._selectedTab = "card", this._childPickerType = "badge", this.requestUpdate();
	}
	_removeDeckItem(e) {
		let t = this._getDeckItems().filter((t, n) => n !== e);
		this._selectedDeckIndex = Math.max(0, Math.min(e, t.length - 1)), this._updateConfig({ decks: t });
	}
	_duplicateDeckItem(e) {
		let t = this._getDeckItems(), n = t[e];
		if (!n) return;
		let r = [...t];
		r.splice(e + 1, 0, structuredClone(n)), this._selectedDeckIndex = e + 1, this._updateConfig({ decks: r });
	}
	_moveDeckItem(e, t) {
		let n = this._getDeckItems(), r = e + t;
		if (r < 0 || r >= n.length) return;
		let i = [...n], [a] = i.splice(e, 1);
		i.splice(r, 0, a), this._selectedDeckIndex = r, this._updateConfig({ decks: i });
	}
	_updateDeckItem(e, t) {
		let n = [...this._getDeckItems()];
		n[e] = {
			...n[e] || {},
			...t
		}, this._updateConfig({ decks: n });
	}
	_updateDeckAttributes(e, t) {
		let n = this._getDeckItems()[e] || {};
		this._updateDeckItem(e, { attributes: {
			...n.attributes || {},
			...t
		} });
	}
	_updateDeckCard(e, t) {
		let n = this._getDeckItems();
		if (e >= n.length) {
			this._selectedDeckIndex = n.length, this._updateConfig({ decks: [...n, {
				attributes: {},
				card: t
			}] });
			return;
		}
		this._updateDeckItem(e, {
			badge: void 0,
			card: t
		});
	}
	_updateDeckBadge(e, t) {
		let n = this._getDeckItems();
		if (e >= n.length) {
			this._selectedDeckIndex = n.length, this._updateConfig({ decks: [...n, {
				attributes: {},
				badge: t
			}] });
			return;
		}
		this._updateDeckItem(e, {
			badge: t,
			card: void 0
		});
	}
	_renderInput(e, t, n = "", r = {}) {
		return Ri.call(this, e, t, n, r);
	}
	_renderNumberInput(e, t, n = {}) {
		return Bi.call(this, e, t, n);
	}
	_renderColorControl(e, t, n, r, i = n) {
		return Ki.call(this, e, t, n, r, i);
	}
	_renderSubTabs() {
		return E`
      <div class="deck-subtabs-row">
        <div class="editor-tabs deck-subtabs">
          ${["setup", "card"].map((e) => E`
            <button
              type="button"
              class="editor-tab ${this._selectedTab === e ? "active" : ""}"
              @click=${() => {
			this._selectedTab = e, this._updateDocumentationContext();
		}}
            >
              ${e === "setup" ? this._t("Setup") : this._t("Card")}
            </button>
          `)}
        </div>

        <ha-selector
          class="editor-header-button-toggle deck-layout-toggle"
          .hass=${this.hass}
          .selector=${{ button_toggle: { options: [
			{
				label: this._t("Wrap"),
				value: "wrap"
			},
			{
				label: this._t("Tabs"),
				value: "tabs"
			},
			{
				label: this._t("Overlay"),
				value: "overlay"
			}
		] } }}
          .value=${this._config?.layout || "wrap"}
          @value-changed=${(e) => {
			this._updateConfig({ layout: e.detail.value || "wrap" }), this._updateDocumentationContext();
		}}
        ></ha-selector>
      </div>
    `;
	}
	_updateDocumentationContext() {
		let e = this._selectedTab === "card" ? "card" : `setup-${this._config?.layout || "wrap"}`;
		Qt(this, "orbit-deck-card", e);
	}
	_renderSetup() {
		let e = this._getDeckItems();
		return E`
      <div class="section deck-card-tab-section">
        ${this._config?.layout === "wrap" ? Bl.call(this, {
			itemCount: e.length,
			classPrefix: "action",
			wrapEnabled: !0,
			showWrapToggle: !1,
			perRowKey: "items_per_row",
			perRowLabel: "Items per row",
			defaultPerRow: 1
		}) : this._config?.layout === "tabs" ? E`
              ${this._renderTabWidthModeControl()}
              ${this._renderInput("Tab font size", "tab_font_size", "18px", {
			value: this._config?.tab_font_size || "",
			onValueChanged: (e) => this._updateConfig({ tab_font_size: e || void 0 })
		})}
              <label class="deck-tab-divider-row">
                <span>${this._t("Divider")}</span>
                <ha-switch
                  .checked=${this._config?.tab_divider !== !1}
                  @change=${(e) => this._updateConfig({ tab_divider: e.target.checked ? void 0 : !1 })}
                ></ha-switch>
              </label>
              <div class="field-grid two-columns deck-tab-colors">
                ${this._renderColorControl(["Inactive", "Color"], "tab_color", this._config?.tab_color || "", (e) => this._updateConfig({ tab_color: e || void 0 }), "primary-text-color")}
                ${this._renderColorControl(["Active", "Color"], "tab_active_color", this._config?.tab_active_color || "", (e) => this._updateConfig({ tab_active_color: e || void 0 }), "primary-color")}
                ${this._renderColorControl(["Background", "Color"], "tab_background_color", this._config?.tab_background_color || "", (e) => this._updateConfig({ tab_background_color: e || void 0 }), "card-background-color")}
              </div>
              ` : ""}
      </div>
    `;
	}
	_renderTabWidthModeControl() {
		return E`
      <div class="field editor-button-toggle-field">
        <div class="field-header">
          <label>${this._t("Tab width")}</label>

          <ha-selector
            class="editor-header-button-toggle deck-tab-width-toggle"
            .hass=${this.hass}
            .selector=${{ button_toggle: { options: [
			{
				label: this._t("Equal"),
				value: "equal"
			},
			{
				label: this._t("Dynamic"),
				value: "dynamic"
			},
			{
				label: this._t("Custom"),
				value: "custom"
			}
		] } }}
            .value=${this._config?.tab_width_mode || "equal"}
            @value-changed=${(e) => this._updateConfig({ tab_width_mode: e.detail.value || "equal" })}
          ></ha-selector>
        </div>
      </div>
    `;
	}
	_renderDeckTabs(e, t) {
		let { itemsPerRow: n, shouldWrapTabs: r } = zl({
			config: this._config,
			itemCount: e.length,
			wrapEnabled: this._config?.layout === "wrap",
			defaultPerRow: 1
		});
		return E`
      <div
        class="action-tabs ${r ? "wrapped" : ""} ${e.length > 1 ? "has-tools" : ""}"
        style=${r ? `--action-tabs-per-row: ${n};` : ""}
      >
        <div class="action-tab-items">
          ${e.map((e, n) => E`
            <button
              type="button"
              class="action-tab ${n === t ? "active" : ""}"
              @click=${() => this._selectDeckItem(n)}
            >
              ${this._config?.layout === "overlay" && n === 0 ? this._t("Main") : n + 1}
            </button>
          `)}
        </div>

        <div class="action-editor-tools">
          <button
            type="button"
            class="action-tab-add"
            title=${this._t("Add")}
            @click=${() => this._addDeckItem()}
          >
            +
          </button>

          ${e.length > 0 && t < e.length ? E`
                <button
                  type="button"
                  class="action-tool-button"
                  title=${this._t("Duplicate")}
                  @click=${() => this._duplicateDeckItem(t)}
                >
                  <ha-icon icon="mdi:content-copy"></ha-icon>
                </button>

                <button
                  type="button"
                  class="action-tool-button action-tool-remove"
                  title=${this._t("Remove")}
                  @click=${() => this._removeDeckItem(t)}
                >
                  <ha-icon icon="mdi:trash-can"></ha-icon>
                </button>

                <button
                  type="button"
                  class="action-tool-button"
                  title=${this._t("Move left")}
                  ?disabled=${t === 0}
                  @click=${() => this._moveDeckItem(t, -1)}
                >
                  <ha-icon icon="mdi:arrow-left"></ha-icon>
                </button>

                <button
                  type="button"
                  class="action-tool-button"
                  title=${this._t("Move right")}
                  ?disabled=${t === e.length - 1}
                  @click=${() => this._moveDeckItem(t, 1)}
                >
                  <ha-icon icon="mdi:arrow-right"></ha-icon>
                </button>
              ` : ""}
        </div>
      </div>
    `;
	}
	_renderChildTypeTabs() {
		return Vf.call(this);
	}
	_renderChildPicker(e, t) {
		return Hf.call(this, e, t);
	}
	_renderBadgePicker(e, t) {
		return Uf.call(this, e, t);
	}
	_renderCardPicker(e, t) {
		return Wf.call(this, e, t);
	}
	_renderDeckStyleControls(e, t) {
		return Gf.call(this, e, t);
	}
	_renderAttributeSelector(e, { label: t, selector: n, value: r, changeKey: i }) {
		return E`
      <ha-selector
        .hass=${this.hass}
        .label=${this._t(t)}
        .selector=${n}
        .value=${r}
        @value-changed=${(t) => this._updateDeckAttributes(e, { [i]: t.detail.value || void 0 })}
      ></ha-selector>
    `;
	}
	_renderOverlayNumberSelector(e, { label: t, value: n, changeKey: r, min: i = 0 }) {
		return Bi.call(this, t, r, {
			value: n ?? "",
			min: i,
			onValueChanged: (t) => this._updateDeckAttributes(e, { [r]: t === "" || t === null ? void 0 : t })
		});
	}
	_renderDeckCardSection(e, t) {
		return E`
      <ha-expansion-panel
        class="deck-card-section"
        outlined
        .expanded=${this._cardSectionExpanded !== !1}
        @expanded-changed=${(e) => {
			e.target === e.currentTarget && (this._cardSectionExpanded = e.detail.expanded);
		}}
      >
        <ha-icon slot="leading-icon" icon="mdi:cards-outline"></ha-icon>
        <div slot="header" role="heading" aria-level="3">
          ${Nf(t, this.hass, this._t("Card"))}
        </div>
        <div class="deck-card-section-content">
          ${t?.badge?.type || t?.card?.type ? "" : this._renderChildTypeTabs()}
          <div class="deck-card-editor-frame">
            ${this._renderChildPicker(e, t)}
          </div>
        </div>
      </ha-expansion-panel>
    `;
	}
	_renderDeckInteractions(e, t) {
		let n = t?.attributes || {}, r = jf(t, "tap_action"), i = jf(t, "hold_action"), a = jf(t, "double_tap_action");
		return q.call(this, {
			expanded: !1,
			config: n,
			onChange: (t) => this._updateDeckAttributes(e, t),
			interactions: [
				{
					key: "tap_action",
					formKey: "tap_action",
					label: "Tap behavior",
					defaultAction: r,
					defaultVisible: Pf(r),
					displayDefaultValue: Pf(r)
				},
				{
					key: "hold_action",
					formKey: "hold_action",
					label: "Hold behavior",
					defaultAction: i,
					defaultVisible: Pf(i),
					displayDefaultValue: Pf(i)
				},
				{
					key: "double_tap_action",
					formKey: "double_tap_action",
					label: "Double tap behavior",
					defaultAction: a,
					defaultVisible: Pf(a),
					displayDefaultValue: Pf(a)
				}
			],
			context: { entity_id: n.entity || Mf(t)?.entity }
		});
	}
	async _ensureNativeBadgePicker() {
		return If.call(this);
	}
	async _ensureNativeBadgeEditor() {
		return Lf.call(this);
	}
	async _loadNativeBadgeModule(e) {
		return Rf.call(this, e);
	}
	_findElementInShadowRoots(e, t) {
		return zf.call(this, e, t);
	}
	async _ensureNativeCardPicker() {
		return Bf.call(this);
	}
	_renderCard() {
		let e = this._getDeckItems(), t = Math.min(this._selectedDeckIndex || 0, e.length), n = e[t], r = t === e.length;
		return E`
      <div class="section">
        ${this._renderDeckTabs(e, t)}

        ${n || r ? E`
              ${n && this._config?.layout === "tabs" ? E`
                    <label class="deck-default-toggle">
                      <span>${this._t("Default")}</span>
                      <ha-switch
                        .checked=${!!n.attributes?.default}
                        @change=${(e) => this._setDefaultDeck(t, e.target.checked)}
                      ></ha-switch>
                    </label>
                  ` : ""}

              ${n ? this._renderDeckStyleControls(t, n) : ""}

              ${n ? E`
                    <div class="deck-interactions-section">
                      ${this._renderDeckInteractions(t, n)}
                    </div>
                  ` : ""}

              ${this._renderDeckCardSection(t, n)}
            ` : E`<div class="deck-empty-editor">${this._t("Add a card to start.")}</div>`}
      </div>
    `;
	}
	_setDefaultDeck(e, t) {
		let n = this._getDeckItems().map((n, r) => ({
			...n,
			attributes: {
				...n.attributes || {},
				default: t && r === e ? !0 : void 0
			}
		}));
		this._updateConfig({ decks: n });
	}
	render() {
		return E`
      <div class="wrapper">
        ${this._renderSubTabs()}
        ${this._selectedTab === "setup" ? this._renderSetup() : this._renderCard()}

        <div class="editor-version">
          ${this._t("Orbit Deck Card v{version}", { version: t.deck })}
        </div>
      </div>
    `;
	}
	static styles = Kf;
};
function Yf(e, t) {
	return JSON.stringify(e) === JSON.stringify(t);
}
customElements.define("orbit-deck-card-editor", Jf);
//#endregion
//#region src/cards/deck-card.js
var Xf = [
	"pointerdown",
	"click",
	"dblclick",
	"pointerup",
	"pointerleave",
	"pointercancel"
], Zf = class extends j {
	static get properties() {
		return {
			hass: {},
			preview: { type: Boolean },
			_config: { type: Object },
			_deckCards: { state: !0 },
			_selectedIndex: { state: !0 },
			_templateRevision: { state: !0 }
		};
	}
	constructor() {
		super(), this._config = {}, this.preview = !1, this._deckCards = [], this._selectedIndex = 0, this._cardHelpers = null, this._cardBuildKey = "", this._defaultSelectionKey = "", this._paddingApplyKey = "", this._overlayGeometryFrame = null, this._overlayGeometryObserver = null, this._overlayObservedTargets = /* @__PURE__ */ new Set(), this._overlayGeometryToken = 0, this._deckEntryGeneration = 0, this._deckInteractionListener = (e) => this._handleDeckInteractionEvent(e);
	}
	connectedCallback() {
		super.connectedCallback(), this._bindDeckItemActionListeners(), this._paddingApplyKey = "", this.requestUpdate();
	}
	disconnectedCallback() {
		ft.call(this), this._cancelLongPress(), this._clearDoubleTapTimer(), this._clearOverlayGeometryObserver(), this._disconnectDeckEntryObservers(), this._unbindDeckItemActionListeners(), super.disconnectedCallback();
	}
	willUpdate(e) {
		(e.has("_config") || e.has("hass")) && dt.call(this, gt(this._config));
	}
	static getConfigElement() {
		return document.createElement("orbit-deck-card-editor");
	}
	static getStubConfig() {
		return {
			type: "custom:orbit-deck-card",
			layout: "wrap",
			decks: []
		};
	}
	getLayoutOptions() {
		let e = zd(this._config), t = Math.max(e.length, 1), n = this._getColumnCount(t);
		return {
			grid_columns: Math.max(1, n * 2),
			grid_min_columns: 1,
			grid_rows: "auto"
		};
	}
	setConfig(e) {
		let t = an(e || {}), n = ["tabs", "overlay"].includes(t.config?.layout) ? t.config.layout : "wrap";
		this._config = {
			...t.config,
			layout: n
		};
		let r = zd(this._config), i = Jd(r), a = qd(r);
		Rl(this) && Number.isInteger(e?.[qf]) ? this._selectedIndex = Math.min(Math.max(0, e[qf]), Math.max(0, r.length - 1)) : i === this._defaultSelectionKey ? this._selectedIndex = Math.min(this._selectedIndex || 0, Math.max(0, r.length - 1)) : (this._selectedIndex = a, this._defaultSelectionKey = i), this._scheduleCardBuild();
	}
	updated(e) {
		(e.has("hass") || e.has("preview")) && this._deckCards.forEach((t) => {
			t.element && (e.has("hass") && (t.element.hass = this.hass), e.has("preview") && (t.element.preview = this.preview, t.element.editMode = this.preview));
		}), (e.has("_deckCards") || e.has("_config")) && this._applyDeckPaddingToEntries(), this._config?.layout === "overlay" ? (e.has("_deckCards") || e.has("_config")) && this._scheduleOverlayGeometrySync() : this._clearOverlayGeometryObserver();
	}
	_scheduleOverlayGeometrySync() {
		this._overlayGeometryFrame !== null && cancelAnimationFrame(this._overlayGeometryFrame);
		let e = ++this._overlayGeometryToken;
		this._overlayGeometryFrame = requestAnimationFrame(() => {
			this._overlayGeometryFrame = null, this._syncOverlayGeometry(e);
		});
	}
	async _syncOverlayGeometry(e) {
		if (this._config?.layout !== "overlay") return;
		let t = this.renderRoot.querySelector(".deck-overlay"), n = [...this.renderRoot.querySelectorAll(".deck-overlay-item")];
		if (!t || !n.length || (await Promise.all(this._deckCards.slice(1).map((e) => e?.element?.updateComplete instanceof Promise ? e.element.updateComplete.catch(() => {}) : Promise.resolve())), e !== this._overlayGeometryToken)) return;
		let r = t.clientWidth;
		n.forEach((e) => {
			let t = e.querySelector(".deck-overlay-content");
			if (!t) return;
			let n = e.classList.contains("overlay-badge");
			t.style.width = n ? "max-content" : `${r}px`, t.style.height = "auto";
		}), n.forEach((e) => this._applyOverlayItemGeometry(e)), this._observeOverlayGeometry(t, n);
	}
	_applyOverlayItemGeometry(e) {
		let t = Number(e.dataset.deckIndex), n = Number.isInteger(t) ? this._deckCards[t] : null, r = e.querySelector(".deck-overlay-content");
		if (!n || !r) return;
		let i = r.offsetWidth, a = r.offsetHeight;
		if (i <= 0 || a <= 0) return;
		let o = n.item?.attributes || {}, s = Ud(n.item) === "badge", c = Zd(o.width), l = Zd(o.height), u = Qd(n.item) === "crop", d = $d(i, a, c, l, u);
		e.style.width = `${d.width}px`, e.style.height = `${d.height}px`, e.style.overflow = u ? "hidden" : "visible", r.style.width = s ? "max-content" : `${i}px`, r.style.height = "auto", r.style.transform = u ? "none" : `scale(${d.scaleX}, ${d.scaleY})`, e.dataset.naturalWidth = String(i), e.dataset.naturalHeight = String(a);
	}
	_observeOverlayGeometry(e, t) {
		if (!window.ResizeObserver) return;
		this._overlayGeometryObserver ||= new ResizeObserver(() => {
			this._scheduleOverlayGeometrySync();
		});
		let n = new Set([e]);
		t.forEach((e) => {
			let t = e.querySelector(".deck-overlay-content");
			t && n.add(t);
		}), this._overlayObservedTargets.forEach((e) => {
			n.has(e) || this._overlayGeometryObserver.unobserve(e);
		}), n.forEach((e) => {
			this._overlayObservedTargets.has(e) || this._overlayGeometryObserver.observe(e);
		}), this._overlayObservedTargets = n;
	}
	_clearOverlayGeometryObserver() {
		this._overlayGeometryToken += 1, this._overlayGeometryFrame !== null && (cancelAnimationFrame(this._overlayGeometryFrame), this._overlayGeometryFrame = null), this._overlayGeometryObserver?.disconnect(), this._overlayObservedTargets.clear();
	}
	_getColumnCount(e) {
		return ["tabs", "overlay"].includes(this._config?.layout) ? 1 : Math.max(1, Math.min(e, Number(this._config?.items_per_row) || 1));
	}
	async _scheduleCardBuild() {
		let e = zd(this._config), t = JSON.stringify(e.map((e, t) => ({
			kind: Ud(e),
			config: Hd(e, cf(this._config, e, t))
		})));
		if (t === this._cardBuildKey) {
			this._deckCards = this._deckCards.map((t, n) => ({
				...t,
				item: e[n],
				index: n
			}));
			return;
		}
		this._cardBuildKey = t, this._disconnectDeckEntryObservers(), this._deckCards = e.map((e, t) => ({
			item: e,
			index: t
		}));
		let n = await this._loadCardHelpers(), r = e.map((e, t) => this._createDeckEntry(e, n, t, cf(this._config, e, t)));
		t === this._cardBuildKey && (this._deckCards = r);
	}
	async _loadCardHelpers() {
		return !this._cardHelpers && window.loadCardHelpers && (this._cardHelpers = await window.loadCardHelpers()), this._cardHelpers;
	}
	_createDeckEntry(e, t, n, r = !1) {
		let i = Ud(e), a = Hd(e, r);
		if (!a.type) return {
			item: e,
			index: n,
			error: `No ${i} type configured`
		};
		try {
			let r = this._config?.layout !== "overlay" && Array.isArray(a.visibility) && a.visibility.length > 0, o = r ? this._createVisibilityAwareElement(i, a) : i === "badge" ? t.createBadgeElement(a) : t.createCardElement(a);
			o.hass = this.hass, o.preview = this.preview, o.editMode = this.preview, o.addEventListener("ll-rebuild", () => this._scheduleCardBuild(), { once: !0 });
			let s = {
				item: e,
				index: n,
				kind: i,
				element: o,
				visible: !o.hidden
			};
			if (r) {
				let e = i === "badge" ? "badge-visibility-changed" : "card-visibility-changed";
				o.addEventListener(e, (e) => {
					e.stopPropagation();
					let t = e.detail?.value !== !1 && !o.hidden, n = this._deckCards.find((e) => e.element === o) || s;
					n.visible !== t && (n.visible = t, this.requestUpdate(), this.updateComplete.then(() => {
						t && this._applyDeckCardPadding(n);
					}));
				}), o.load();
			}
			return s;
		} catch (t) {
			return {
				item: e,
				index: n,
				error: t?.message || "Unable to create card"
			};
		}
	}
	_createVisibilityAwareElement(e, t) {
		let n = document.createElement(e === "badge" ? "hui-badge" : "hui-card");
		return n.hass = this.hass, n.preview = this.preview, n.editMode = this.preview, n.config = t, n;
	}
	_disconnectDeckEntryObservers(e = this._deckCards) {
		this._deckEntryGeneration += 1, e.forEach((e) => {
			let t = e?.element;
			t && new Set([t, ...mf(t)]).forEach((e) => {
				disconnectDeckCardSurfaceObserver(e), bf(e);
			});
		});
	}
	_isDeckEntryActive(e, t) {
		return this.isConnected && t === this._deckEntryGeneration && this._deckCards.includes(e);
	}
	_selectTab(e) {
		this._selectedIndex = e;
	}
	get _LONG_PRESS_DELAY() {
		return 500;
	}
	_handleAction(e, t = null) {
		return Be.call(this, e, t);
	}
	_navigate(e) {
		return We.call(this, e);
	}
	_clearDoubleTapTimer() {
		return Ve.call(this);
	}
	_startLongPress(e, t, n) {
		return Wn.call(this, e, t, n);
	}
	_cancelLongPress() {
		return Gn.call(this);
	}
	_finishLongPress(e) {
		return Kn.call(this, e);
	}
	_getDeckEntryFromEventTarget(e) {
		let t = Number(e?.dataset?.deckIndex);
		return Number.isInteger(t) && this._deckCards[t] || null;
	}
	_bindDeckItemActionListeners() {
		Xf.forEach((e) => {
			this.renderRoot.addEventListener(e, this._deckInteractionListener, !0);
		});
	}
	_unbindDeckItemActionListeners() {
		Xf.forEach((e) => {
			this.renderRoot.removeEventListener(e, this._deckInteractionListener, !0);
		});
	}
	_handleDeckInteractionEvent(e) {
		let t = e.composedPath().find((e) => e?.classList?.contains("deck-item-interaction") && e.getRootNode() === this.renderRoot);
		if (!t) return;
		let n = this._getDeckEntryFromEventTarget(t);
		e.type === "pointerdown" ? this._handleDeckItemPointerDown(e, n) : e.type === "click" ? this._handleDeckItemClick(e, n) : e.type === "dblclick" ? this._handleDeckItemDoubleClick(e, n) : e.type === "pointerup" ? this._finishLongPress(e) : (e.type === "pointercancel" || e.type === "pointerleave" && e.target === t) && this._cancelLongPress();
	}
	_handleDeckItemPointerDown(e, t) {
		if (!Bd(t?.item)) return;
		e.stopPropagation();
		let n = $(t?.item, "hold_action");
		if (M(n)) return this._startLongPress(e, Vd(t.item), n);
	}
	_handleDeckItemClick(e, t) {
		if (this._longPressTriggered) {
			this._longPressTriggered = !1;
			return;
		}
		let n = $(t?.item, "tap_action"), r = $(t?.item, "double_tap_action");
		!M(n) && !M(r) || P.call(this, e, Vd(t.item), n || { action: "none" }, r);
	}
	_handleDeckItemDoubleClick(e, t) {
		let n = $(t?.item, "double_tap_action");
		M(n) && F.call(this, e, Vd(t.item), n);
	}
	_renderInteractiveDeckEntry(e) {
		let t = Bd(e?.item), n = cf(this._config, e?.item, e?.index), r = this._config?.[qf], i = Rl(this) && Number.isInteger(r) && r === e?.index;
		return E`
      <div
        class="deck-item-interaction ${t ? "has-actions" : ""} ${n ? "transparent-background" : ""} ${i ? "orbit-editor-preview-selected" : ""}"
        data-deck-index=${e?.index ?? ""}
      >
        ${this._renderDeckEntry(e)}
      </div>
    `;
	}
	_renderDeckEntry(e) {
		return e?.element ? e.element : E`
      <ha-card class="deck-error-card">
        <div class="deck-error-title">${this._t("Configuration error")}</div>
        <div>${e?.error || "No card configured"}</div>
      </ha-card>
    `;
	}
	_applyDeckPaddingToEntries() {
		let e = this._deckCards.map((e) => cf(this._config, e.item, e.index) ? "flat" : "native").join(":"), t = `${of(this._deckCards)}|surface:${e}`;
		t !== this._paddingApplyKey && (this._paddingApplyKey = t, this._deckCards.forEach((e) => this._applyDeckCardPadding(e)));
	}
	_applyDeckCardPadding(e, t = 0) {
		let n = e?.element;
		if (!n) return;
		let r = this._deckEntryGeneration, i = Md(e.item), a = Fd(e.item);
		(n.updateComplete instanceof Promise ? n.updateComplete : Promise.resolve()).then(() => new Promise((e) => requestAnimationFrame(e))).then(() => {
			if (!this._isDeckEntryActive(e, r)) return;
			let o = mf(n), s = o[0] || null, c = sf(this.renderRoot, e.index), l = cf(this._config, e.item, e.index);
			if (!(!s && !c)) {
				if ((a || l) && !s && t < 10 && window.setTimeout(() => this._applyDeckCardPadding(e, t + 1), 50), uf(n, l), o.forEach((e) => uf(e, l)), !a && !s?._orbitDeckPaddingApplied && !c?._orbitDeckPaddingApplied) {
					s && bf(s);
					return;
				}
				c && gf(c, i, !1), s && gf(s, i, a), a && s ? (yf(s, i), requestAnimationFrame(() => {
					this._isDeckEntryActive(e, r) && (c && gf(c, i, !1), gf(s, i, !0));
				})) : s && bf(s);
			}
		}).catch(() => {});
	}
	_renderWrap(e) {
		let t = this._getVisibleDeckEntries(), n = this._deckCards.filter((e) => e.visible === !1), r = this._getColumnCount(t.length || 1), i = rf(t, r);
		return E`
      <ha-card
        class="deck-card wrap ${e.length > 1 && this._config?.separate_cards ? "separate-cards" : ""}"
        style="--deck-columns:${r};"
      >
        <div class="deck-wrap">
          ${i.map((e) => E`
            <div class="deck-row">
              ${e.map((e) => {
			let t = Rl(this) && this._config?.[qf] === e.index ? Qf(e, r) : "";
			return E`
                  <div
                    class="deck-item ${t ? "orbit-editor-preview-resized" : ""}"
                    style=${t ? `--orbit-editor-preview-width:${t};` : ""}
                  >
                    ${this._renderInteractiveDeckEntry(e)}
                  </div>
                `;
		})}
              ${af(e.length, r)}
            </div>
          `)}
        </div>
        ${this._renderVisibilityObservers(n)}
      </ha-card>
    `;
	}
	_renderTabs(e) {
		let t = Math.min(this._selectedIndex || 0, Math.max(0, e.length - 1)), n = this._getVisibleDeckEntries(), r = n.find((e) => e.index === t) || n[0], i = r?.index ?? t, a = this._deckCards.filter((e) => e !== r), o = ef(this._config), s = tf.call(this, this._config);
		return E`
      <ha-card
        class="deck-card tabs tab-width-${o} ${this._config?.tab_divider === !1 ? "hide-tab-dividers" : ""}"
        style=${s}
      >
        <div class="deck-tabs" role="tablist">
          ${n.map((e) => E`
            <button
              type="button"
              class="deck-tab ${e.index === i ? "active" : ""}"
              role="tab"
              aria-selected=${e.index === i ? "true" : "false"}
              style=${o === "custom" ? `--orbit-deck-tab-width:${e.item.attributes?.width || "120px"};` : ""}
              @click=${() => this._selectTab(e.index)}
            >
              ${e.item.attributes?.icon ? E`<ha-icon .icon=${e.item.attributes.icon}></ha-icon>` : ""}
              <span>${e.item.attributes?.name || e.item.attributes?.label || `Card ${e.index + 1}`}</span>
            </button>
          `)}
        </div>
        <div class="deck-tab-content">
          ${r ? this._renderInteractiveDeckEntry(r) : ""}
        </div>
        ${this._renderVisibilityObservers(a)}
      </ha-card>
    `;
	}
	_getVisibleDeckEntries() {
		return this._deckCards.filter((e) => e.visible !== !1);
	}
	_renderVisibilityObservers(e) {
		return e.length ? E`
      <div class="deck-visibility-observers" aria-hidden="true">
        ${e.map((e) => this._renderDeckEntry(e))}
      </div>
    ` : "";
	}
	_renderOverlay() {
		let e = this._deckCards[0], t = this._deckCards.slice(1);
		return E`
      <ha-card class="deck-card overlay">
        <div class="deck-overlay">
          <div class="deck-overlay-main deck-item">
            ${this._renderInteractiveDeckEntry(e)}
          </div>

          ${t.map((e, t) => E`
            <div
              class="deck-overlay-item deck-item ${Qd(e.item)} ${e.item?.attributes?.transparent_background === !0 ? "transparent-background" : ""} overlay-${e.kind || Ud(e.item)}"
              data-deck-index=${e.index}
              style=${Yd(e.item, t)}
            >
              <div class="deck-overlay-content">
                ${this._renderInteractiveDeckEntry(e)}
              </div>
            </div>
          `)}
        </div>
      </ha-card>
    `;
	}
	render() {
		let e = zd(this._config);
		return e.length ? this._config?.layout === "tabs" ? this._renderTabs(e) : this._config?.layout === "overlay" ? this._renderOverlay() : this._renderWrap(e) : E`
        <ha-card class="deck-card empty">
          <div>${this._t("Add card")}</div>
        </ha-card>
      `;
	}
	static styles = xf;
};
function Qf(e, t) {
	let n = Hd(e?.item)?.grid_options?.columns, r = n === "full" ? 12 : Number(n);
	if (!Number.isFinite(r) || r <= 0) try {
		r = Number(e?.element?.getLayoutOptions?.()?.grid_columns);
	} catch {
		r = 0;
	}
	(!Number.isFinite(r) || r <= 0) && (r = 6);
	let i = Math.min(12, Math.max(1, r)) / 12 * 100;
	return i > 100 / Math.max(1, Number(t) || 1) + .01 ? `${i}%` : "";
}
en({
	tag: "orbit-deck-card",
	cardClass: Zf,
	name: "Orbit Deck Card",
	description: "Wrap or tab any Lovelace cards",
	version: t.deck
});
//#endregion
//#region src/common/helpers/badge-registration.js
function $f({ tag: e, badgeClass: t, name: n, description: r, version: a, documentationURL: o }) {
	customElements.get(e) || customElements.define(e, t), window.customBadges = window.customBadges || [];
	for (let t = window.customBadges.length - 1; t >= 0; --t) window.customBadges[t].type === e && window.customBadges.splice(t, 1);
	window.customBadges.push({
		type: e,
		name: n,
		description: r,
		preview: !0,
		documentationURL: o || Zt(e)
	}), i(n, a);
}
//#endregion
//#region src/badges/helpers/model.js
function ep() {
	let e = X(this._config), t = this._getEntities(), n = bc(t, this._config), r = e === "template" ? L.call(this, this._config?.state_template, "") ?? "unavailable" : "", i = this._config?.active_template?.trim() || "", a = e === "template" && i ? L.call(this, i, "") : null, o = this._config?.inactive_template?.trim() || "", s = e === "template" && o ? L.call(this, o, "") : null, c = t[0]?.entity_id?.split(".")[0] || this._config?.domain || "", l = !!o && mt(s, c), u = e === "template" ? mt(a ?? r, c) : n.length > 0, d = this._config?.display_style === "badge" && !this._config?.card_visibility ? !0 : u, f = t[0], p = Z(this._config), m = p[0] || "", h = f?.entity_id.split(".")[0] || this._config?.domain || "", g = uc(h), _ = this._config?.icon_source || (this._config?.icon ? "custom" : "domain"), v = Nn.call(this, this._config?.icon, f?.entity_id || ""), ee = _ === "template" ? v : d ? this._config?.icon_on || v : this._config?.icon_off || v, y = ["custom", "template"].includes(_) && ee || g.icon, b = this._config?.color_source === "template" ? this._config?.color : d ? this._config?.color_on ?? (this._config?.color_source ? void 0 : this._config?.color) : this._config?.color_off, x = R.call(this, b), te = !!(x && ![
		"theme",
		"state",
		"state-active",
		"state-inactive"
	].includes(x)), S = !x || [
		"theme",
		"state",
		"state-active",
		"state-inactive"
	].includes(x) ? "theme" : x, ne = e === "template" && this._config?.name_template?.trim() || "", re = ne ? L.call(this, ne, "") : null, ie = String(re ?? "").trim(), C = e === "template" && !f ? {
		entity_id: "sensor.orbit_status_badge_template",
		state: r || "unavailable",
		attributes: { friendly_name: ie || "Template" }
	} : n[0] || t[0] || {
		entity_id: `${h || "sensor"}.orbit_status_badge`,
		state: d ? "on" : "off",
		attributes: m ? { device_class: m } : {}
	}, w = ["entity", "template"].includes(e) ? C : {
		entity_id: `${h}.orbit_status_badge`,
		state: C.state,
		attributes: m ? { device_class: m } : {}
	}, ae = Ac(this.hass, this._config), oe = this._config?.name, se = p.map((e) => gc(e)).join(", "), ce = (f && this.hass?.formatEntityName ? this.hass.formatEntityName(f) : "") || (e === "template" ? "Template" : ae || se || g.label), T = oe && this.hass?.formatEntityName && this.hass.formatEntityName(C, tp(oe, ie)) || ce, le = _ === "custom" ? d && this._config?.icon_on ? "icon_on" : !d && this._config?.icon_off ? "icon_off" : this._config?.icon ? "icon" : "" : _ === "template" && v ? "icon" : "";
	return {
		entities: t,
		activeEntities: n,
		isOn: d,
		inactiveTemplateActive: l,
		count: n.length,
		displayValue: e === "template" ? ht(r) : e === "entity" ? C.state : n.length,
		label: T,
		icon: y,
		iconKey: le,
		iconSource: _,
		stateSource: e,
		representativeStateObj: C,
		iconStateObj: w,
		displayStateObj: ["entity", "template"].includes(e) ? C : {
			entity_id: "sensor.orbit_status_badge_count",
			state: d ? "on" : "off",
			attributes: {
				count: n.length,
				friendly_name: T
			},
			last_changed: C.last_changed,
			last_updated: C.last_updated,
			context: C.context
		},
		defaultStateContent: e === "area_count" ? "count" : "state",
		hasConfiguredColor: !!x,
		hasIconColorOverride: te,
		iconColor: S === "theme" ? Mc(C, d) : Dt.call(this, S)
	};
}
function tp(e, t) {
	let n = (e) => e?.type === "template" ? {
		type: "text",
		text: t
	} : e;
	return Array.isArray(e) ? e.map(n) : n(e);
}
//#endregion
//#region src/badges/styles/status-badge-styles.js
var np = d`
  .card-badge {
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 0;
    width: 16px;
    height: 16px;
    border-radius: var(--ha-border-radius-md);
    background-color: var(--tile-badge-background-color);
    transition: background-color 280ms ease-in-out;
    box-sizing: border-box;
    user-select: none;
  }

  .card-badge[role="button"] {
    cursor: pointer;
  }

  .card-badge:focus-visible {
    outline: 2px solid var(--tile-badge-background-color);
    outline-offset: 2px;
  }

  .card-badge > * {
    color: var(--tile-badge-icon-color);
  }

  .card-badge .image-icon {
    width: 12px;
    height: 12px;
    color: var(--tile-badge-icon-color);
  }

  .image-icon {
    width: var(--ha-badge-icon-size, 18px);
    height: var(--ha-badge-icon-size, 18px);
    display: block;
    line-height: 0;
    color: var(--icon-color, var(--badge-color));
  }

  :host([heading-badge]) .image-icon {
    width: 18px;
    height: 18px;
  }

  :host([heading-badge]) .entity-picture {
    width: 18px;
    height: 18px;
    border-radius: var(--ha-border-radius-circle);
    object-fit: cover;
  }

  :host([heading-badge]) ha-state-icon {
    --mdc-icon-size: 18px;
  }

  .image-icon svg {
    display: block;
    width: 100%;
    height: 100%;
  }

  .template-state {
    white-space: pre-line;
  }

`, rp = "sensor.orbit_status_badge_preview", ip = class extends j {
	static svgCache = V;
	static properties = {
		hass: { attribute: !1 },
		_config: { state: !0 },
		_colorPickerKey: { state: !0 },
		_colorPickerTab: { state: !0 },
		_iconPickerKey: { state: !0 },
		_iconPickerTab: { state: !0 },
		_orbitIconFiles: { state: !0 },
		_orbitIconFilesLoading: { state: !0 },
		_localIconFiles: { state: !0 },
		_localIconFilesLoading: { state: !0 },
		_contentExpanded: { state: !0 },
		_stateTypeExpanded: { state: !0 },
		_templateRevision: { state: !0 }
	};
	constructor() {
		super(), this._config = {}, this._colorPickerKey = "", this._colorPickerTab = "picker", this._iconPickerKey = "", this._iconPickerTab = "ha", this._orbitIconFiles = [], this._orbitIconFilesLoading = !1, this._localIconFiles = [], this._localIconFilesLoading = !1, this._contentExpanded = !1, this._stateTypeExpanded = !1, this._namePickerEnhanceFrame = void 0, this._namePickerEnhanceAttempts = 0;
	}
	connectedCallback() {
		super.connectedCallback(), bo(this), Qt(this, "orbit-status-badge"), queueMicrotask(() => this._syncTemplateSubscriptions());
	}
	disconnectedCallback() {
		this._namePickerEnhanceFrame !== void 0 && (cancelAnimationFrame(this._namePickerEnhanceFrame), this._namePickerEnhanceFrame = void 0), ft.call(this), xo(this), super.disconnectedCallback();
	}
	updated(e) {
		(e.has("hass") || e.has("_config")) && (this._syncTemplateSubscriptions(), this._namePickerEnhanceAttempts = 0), this._scheduleNamePickerEnhancement();
	}
	_scheduleNamePickerEnhancement() {
		X(this._config) !== "template" || this._namePickerEnhanceFrame !== void 0 || (this._namePickerEnhanceFrame = requestAnimationFrame(() => {
			this._namePickerEnhanceFrame = void 0, this._namePickerEnhanceAttempts += 1, this._enhanceNamePicker();
		}));
	}
	_syncTemplateSubscriptions() {
		let e = X(this._config), t = [
			this._config?.state_template,
			this._config?.active_template,
			this._config?.inactive_template,
			this._config?.name_template
		], n = this._config?.display_style === "badge", r = [
			...(e === "template" ? n ? [this._config?.active_template, this._config?.inactive_template] : t : []).filter(Boolean).map((e) => ({
				template: e,
				entityId: ""
			})),
			...gt(this._config),
			..._t(this._config)
		];
		dt.call(this, r);
	}
	_enhanceNamePicker() {
		let e = this.shadowRoot?.querySelector(".status-badge-name-selector"), t = dp(e, "ha-entity-name-picker");
		if (!t) {
			this._namePickerEnhanceAttempts < 10 && this._scheduleNamePickerEnhancement();
			return;
		}
		if (this._namePickerEnhanceAttempts = 0, t.__orbitTemplateNameEnhanced) return;
		let n = t._getFilteredItems, r = t._validTypes, i = t._formatItem, a = t._pickerValueChanged;
		typeof n != "function" || typeof r != "function" || typeof i != "function" || typeof a != "function" || (t.__orbitTemplateNameEnhanced = !0, t._validTypes = (e) => new Set([...r.call(t, e), "template"]), t._formatItem = (e) => e?.type === "template" ? this._t("Template") : i.call(t, e), t._getFilteredItems = () => {
			let e = n.call(t), r = up(t.value), i = t._editIndex != null && r[t._editIndex]?.type === "template";
			if (!r.some((e) => e?.type === "template") || i) {
				let t = String(L.call(this, this._config?.name_template, "") ?? "").trim(), n = this._t("Template"), r = t || this._t("Not configured");
				e.push({
					id: "___template___",
					primary: n,
					secondary: r,
					search_labels: {
						id: "___template___",
						primary: n,
						secondary: r
					},
					sorting_label: n
				});
			}
			return e;
		}, t._pickerValueChanged = (e) => {
			if (e.detail?.value !== "___template___") {
				a.call(t, e);
				return;
			}
			if (e.stopPropagation(), t.disabled) return;
			let n = up(t.value), r = { type: "template" };
			t._editIndex == null ? n.push(r) : (n[t._editIndex] = r, t._editIndex = void 0), t._setValue(n), t._picker && (t._picker.value = void 0);
		}, t.requestUpdate());
	}
	setConfig(e) {
		let { config: t, migrated: n } = rn(e || {}), r = cp(hc(t)), i = !lp(t, r);
		this._config = r, (n || i) && queueMicrotask(() => this._dispatchConfigChanged(this._config));
	}
	_t(e, t) {
		return J(this.hass, e, t);
	}
	_updateConfig(e) {
		this._config = cp(hc(Vi(this._config, e))), this._dispatchConfigChanged(this._config);
	}
	_dispatchConfigChanged(e) {
		this.dispatchEvent(new CustomEvent("config-changed", {
			detail: { config: e },
			bubbles: !0,
			composed: !0
		}));
	}
	_handleConfigUpdate(e, t) {
		let n = ["color_on", "color_off"].includes(e) && (!t || t === "theme");
		this._updateConfig({ [e]: n || t === "" ? void 0 : t });
	}
	_renderColor(e, t, n) {
		return Gi.call(this, e, t, n);
	}
	_renderColorPair(e) {
		return qi.call(this, e);
	}
	_renderIconInput(e, t, n = "mdi:lightbulb or icon.svg") {
		return ci.call(this, e, t, n);
	}
	_getColorStyle(e) {
		return Co(e);
	}
	_getColorPickerValue(e) {
		return wo(e);
	}
	_loadLocalIconFiles(e = "") {
		return di.call(this, e);
	}
	_isImageIcon(e) {
		return oi(e);
	}
	_resolveIconPath(e) {
		return si(e);
	}
	_getInlineSvg(e) {
		return B.call(this, e, { forceColor: !0 });
	}
	_getDeviceClassOptions() {
		return Tc(this.hass, this._config);
	}
	_getStateContentHass() {
		let e = (/* @__PURE__ */ new Date()).toISOString(), t = Ac(this.hass, this._config), n = this._config?.name_template?.trim() || "", r = {
			entity_id: rp,
			state: "on",
			attributes: {
				count: 2,
				friendly_name: (X(this._config) === "template" ? String(L.call(this, n, "") ?? "").trim() : "") || t || "Orbit status"
			},
			last_changed: e,
			last_updated: e,
			context: {
				id: "",
				parent_id: null,
				user_id: null
			}
		};
		return {
			...this.hass,
			entities: {
				...this.hass?.entities || {},
				[rp]: {
					entity_id: rp,
					platform: "orbit",
					area_id: kc(this._config)[0] || null,
					device_id: null
				}
			},
			states: {
				...this.hass?.states || {},
				[rp]: r
			}
		};
	}
	render() {
		let e = this._config?.display_style === "badge", n = this._getDeviceClassOptions(), r = ic.find((e) => e.value === this._config?.domain), i = [
			...this._config?.show_name === !0 ? ["name"] : [],
			...this._config?.show_state === !1 ? [] : ["state"],
			...this._config?.show_icon === !1 ? [] : ["icon"]
		], a = X(this._config), o = this._config?.entity || "", s = a === "entity" && o ? this.hass : this._getStateContentHass(), c = a === "entity" && o ? o : rp;
		return E`
      <div class="wrapper">
        <div class="section">
          <div class="field editor-button-toggle-field mode-field">
            <div class="field-header">
              <label>${this._t("Mode")}</label>
              <ha-selector
                class="editor-header-button-toggle"
                .hass=${this.hass}
                .selector=${{ button_toggle: { options: [{
			label: this._t("Header"),
			value: "header"
		}, {
			label: this._t("Badge"),
			value: "badge"
		}] } }}
                .value=${e ? "badge" : "header"}
                @value-changed=${(e) => this._handleConfigUpdate("display_style", e.detail.value === "badge" ? "badge" : void 0)}
              ></ha-selector>
            </div>
          </div>

          <ha-expansion-panel
            class="state-type-panel"
            outlined
            .expanded=${this._stateTypeExpanded}
            @expanded-changed=${(e) => {
			this._stateTypeExpanded = e.detail.expanded;
		}}
          >
            <ha-icon
              slot="leading-icon"
              icon="mdi:format-list-bulleted-type"
            ></ha-icon>
            <div slot="header" role="heading" aria-level="3">
              ${this._t("State type")}
            </div>
            <div class="content-panel-body">
              ${Hl.call(this, {
			stateSource: a,
			domainConfig: r,
			deviceClassOptions: n,
			badgeMode: e,
			areaMultiple: !0
		})}
            </div>
          </ha-expansion-panel>

          <ha-expansion-panel
            class="content-panel"
            outlined
            .expanded=${this._contentExpanded}
            @expanded-changed=${(e) => {
			this._contentExpanded = e.detail.expanded;
		}}
          >
            <ha-icon slot="leading-icon" icon="mdi:text-short"></ha-icon>
            <div slot="header" role="heading" aria-level="3">
              ${this._t("Content")}
            </div>
            <div class="content-panel-body">
              ${e ? this._renderColor(["Background", "Color"], "card_color", "primary-color") : E`
                    <div class="field">
                      <ha-selector
                        class=${a === "template" ? "status-badge-name-selector" : ""}
                        .hass=${s}
                        .label=${this.hass?.localize("ui.panel.lovelace.editor.card.generic.name") || this._t("Name")}
                        .helper=${this.hass?.localize("ui.panel.lovelace.editor.card.heading.entity_config.name_helper") || this._t("Visible if selected in state content")}
                        .selector=${{ entity_name: { entity_id: c } }}
                        .value=${this._config?.name}
                        @value-changed=${(e) => this._handleConfigUpdate("name", e.detail.value)}
                      ></ha-selector>
                    </div>
                  `}

              ${this._renderColorPair({
			label: "Color",
			onKey: "color_on",
			offKey: "color_off",
			onPreviewValue: e ? "white" : "theme",
			offPreviewValue: e ? "white" : "theme"
		})}

              ${Vl.call(this, a)}

              ${e ? "" : E`
                    <div class="field">
                      <label>${this.hass?.localize("ui.panel.lovelace.editor.card.heading.entity_config.displayed_elements") || this._t("Displayed elements")}</label>
                      <ha-selector
                        .hass=${this.hass}
                        .selector=${{ select: {
			mode: "list",
			multiple: !0,
			options: [
				{
					value: "name",
					label: this.hass?.localize("ui.panel.lovelace.editor.card.heading.entity_config.displayed_elements_options.name") || this._t("Name")
				},
				{
					value: "state",
					label: this.hass?.localize("ui.panel.lovelace.editor.card.heading.entity_config.displayed_elements_options.state") || this._t("State")
				},
				{
					value: "icon",
					label: this.hass?.localize("ui.panel.lovelace.editor.card.heading.entity_config.displayed_elements_options.icon") || this._t("Icon")
				}
			]
		} }}
                        .value=${i}
                        @value-changed=${(e) => {
			let t = e.detail.value || [];
			this._updateConfig({
				show_name: t.includes("name") ? !0 : void 0,
				show_state: t.includes("state") ? void 0 : !1,
				show_icon: t.includes("icon") ? void 0 : !1
			});
		}}
                      ></ha-selector>
                    </div>
                    ${a === "template" ? "" : E`
                          <div class="field">
                            <ha-selector
                              .hass=${s}
                              .label=${this.hass?.localize("ui.panel.lovelace.editor.card.heading.entity_config.state_content") || this._t("State content")}
                              .selector=${{ ui_state_content: {
			entity_id: c,
			allow_name: !0
		} }}
                              .value=${this._config?.state_content || (a === "entity" ? "state" : "count")}
                              @value-changed=${(e) => this._handleConfigUpdate("state_content", (() => {
			let t = e.detail.value;
			return !t || t === (a === "entity" ? "state" : "count") ? void 0 : t;
		})())}
                            ></ha-selector>
                          </div>
                        `}
                  `}
            </div>
          </ha-expansion-panel>

          ${q.call(this, {
			interactions: [
				{
					key: "tap_action",
					formKey: "tap_action",
					label: "Tap behavior",
					defaultAction: a === "entity" ? "more-info" : a === "area_count" ? Y : "none",
					defaultVisible: !0,
					customDefaultLabel: a === "area_count" ? Y : void 0
				},
				{
					key: "hold_action",
					formKey: "hold_action",
					label: "Hold behavior",
					defaultAction: "none"
				},
				{
					key: "double_tap_action",
					formKey: "double_tap_action",
					label: "Double tap behavior",
					defaultAction: "none"
				}
			],
			context: {
				entity_id: this._config?.entity,
				area_id: this._config?.area
			}
		})}
        </div>

        <div class="editor-version">
          ${this._t("Orbit Status Badge v{version}", { version: t.statusBadge })}
        </div>
      </div>
    `;
	}
	static styles = [...Ts, d`
      .content-panel,
      .state-type-panel {
        display: block;
        --expansion-panel-content-padding: 0;
        border-radius: var(--ha-border-radius-md);
        --ha-card-border-radius: var(--ha-border-radius-md);
      }

      .content-panel > [slot="header"],
      .state-type-panel > [slot="header"] {
        margin: 0;
        font-size: inherit;
        font-weight: inherit;
      }

      .content-panel ha-icon,
      .state-type-panel ha-icon {
        color: var(--secondary-text-color);
      }

      .content-panel-body {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 12px;
      }

      .native-picker-label {
        display: block;
      }
    `];
}, ap = [
	"state_source",
	"entity",
	"area",
	"domain",
	"device_class",
	"threshold",
	"thresholds",
	"hide",
	"active_template",
	"inactive_template",
	"name_template",
	"state_template"
], op = [
	"card_color",
	"name",
	"color_source",
	"color",
	"color_on",
	"color_off",
	"icon_source",
	"icon",
	"icon_on",
	"icon_off",
	"icon_svg_color_override",
	"icon_on_svg_color_override",
	"icon_off_svg_color_override",
	"show_name",
	"show_state",
	"show_icon",
	"show_entity_picture",
	"state_content"
], sp = [
	"tap_action",
	"hold_action",
	"double_tap_action"
];
function cp(e = {}) {
	let t = e.display_style === "badge" ? [
		"type",
		"display_style",
		"entity",
		"card_visibility",
		...ap.filter((e) => e !== "entity"),
		...op,
		...sp,
		"grid_options",
		"view_layout"
	] : [
		"type",
		"display_style",
		...ap,
		...op,
		...sp,
		"grid_options",
		"view_layout"
	], n = {}, r = /* @__PURE__ */ new Set();
	return t.forEach((t) => {
		Object.prototype.hasOwnProperty.call(e, t) && (n[t] = e[t], r.add(t));
	}), Object.keys(e).forEach((t) => {
		r.has(t) || (n[t] = e[t]);
	}), n;
}
function lp(e, t) {
	return JSON.stringify(e) === JSON.stringify(t);
}
customElements.define("orbit-status-badge-editor", ip);
function up(e) {
	return e ? typeof e == "string" ? [{
		type: "text",
		text: e
	}] : Array.isArray(e) ? [...e] : [e] : [];
}
function dp(e, t) {
	if (!e) return;
	if (e.matches?.(t)) return e;
	let n = e.shadowRoot?.querySelector(t);
	if (n) return n;
	for (let n of e.shadowRoot?.querySelectorAll("*") || []) {
		let e = dp(n, t);
		if (e) return e;
	}
}
//#endregion
//#region src/index.js
$f({
	tag: "orbit-status-badge",
	badgeClass: class extends j {
		static svgCache = V;
		static properties = {
			hass: { attribute: !1 },
			_config: { state: !0 },
			_isHeadingBadge: { state: !0 },
			_templateRevision: { state: !0 },
			...Lc
		};
		constructor() {
			super(), Rc.call(this);
		}
		static getConfigElement() {
			return document.createElement("orbit-status-badge-editor");
		}
		static getStubConfig() {
			return {};
		}
		setConfig(e) {
			dc(e || {}), this._config = hc(e || {});
		}
		_t(e, t) {
			return J(this.hass, e, t);
		}
		connectedCallback() {
			super.connectedCallback(), this._isHeadingBadge = !!this.closest("hui-heading-badge"), this.toggleAttribute("heading-badge", this._isHeadingBadge), queueMicrotask(() => this._syncTemplateSubscriptions());
		}
		disconnectedCallback() {
			ft.call(this), Vc.call(this), this._clearDoubleTapTimer(), this._cancelLongPress(), super.disconnectedCallback();
		}
		updated(e) {
			(e.has("hass") || e.has("_config")) && this._syncTemplateSubscriptions();
		}
		shouldUpdate(e) {
			if (!e.has("hass") || e.has("_config") || [...e.keys()].some((e) => e !== "hass")) return !0;
			let t = e.get("hass"), n = this.hass;
			if (!t || !n || t.entities !== n.entities || t.devices !== n.devices || t.areas !== n.areas) return !0;
			let r = X(this._config);
			return r === "template" ? !0 : (r === "area_count" ? jc(this.hass, this._config) : [this._config?.entity].filter(Boolean)).some((e) => t.states?.[e] !== n.states?.[e]);
		}
		_syncTemplateSubscriptions() {
			let e = X(this._config), t = this._config?.state_template?.trim() || "", n = this._config?.active_template?.trim() || "", r = this._config?.inactive_template?.trim() || "", i = this._config?.name_template?.trim() || "", a = this._config?.display_style === "badge", o = (e === "template" ? a ? [n, r] : [
				t,
				n,
				r,
				i
			] : []).filter(Boolean).map((e) => ({
				template: e,
				entityId: ""
			}));
			dt.call(this, [
				...o,
				...gt(this._config),
				..._t(this._config)
			]);
		}
		_getEntities() {
			return Oc(this.hass, this._config);
		}
		_getModel() {
			return ep.call(this);
		}
		_handleAction(e, t = null) {
			if (e?.action === "Current state") {
				zc.call(this);
				return;
			}
			return Be.call(this, e, t);
		}
		_navigate(e) {
			return We(e);
		}
		_clearDoubleTapTimer() {
			return Ve.call(this);
		}
		_cancelLongPress() {
			return Gn.call(this);
		}
		get _LONG_PRESS_DELAY() {
			return 500;
		}
		_handlePointerDown(e, t) {
			if (M(this._config?.hold_action)) return Wn.call(this, e, t, this._config?.hold_action);
		}
		_handlePointerEnd(e) {
			return Kn.call(this, e);
		}
		_handleTap(e, t) {
			if (this._longPressTriggered) {
				this._longPressTriggered = !1;
				return;
			}
			let n = cc(this._config);
			return P.call(this, e, t, this._config?.tap_action || n, this._config?.double_tap_action);
		}
		_handleDoubleTap(e, t) {
			return F.call(this, e, t, this._config?.double_tap_action);
		}
		_renderIcon(e) {
			let t = this._config?.display_style === "badge", n = t ? "width:12px;height:12px;margin:0;" : "", r = t ? "width:16px;height:16px;margin:0;border-radius:var(--ha-border-radius-md);" : "", i = e.stateSource === "entity" && this._config?.show_entity_picture ? e.representativeStateObj.attributes?.entity_picture_local || e.representativeStateObj.attributes?.entity_picture : "";
			if (i) return E`
        <img
          class="entity-picture"
          slot="icon"
          src=${this.hass?.hassUrl ? this.hass.hassUrl(i) : i}
          alt=""
          style=${r}
        />
      `;
			if (!In(e.icon)) return E`
        <ha-state-icon
          slot="icon"
          .icon=${e.iconSource === "custom" ? e.icon : void 0}
          .stateObj=${e.iconSource === "custom" ? e.representativeStateObj : e.iconStateObj}
        ></ha-state-icon>
      `;
			if (In(e.icon)) {
				let t = Ln(e.icon), r = e.iconKey ? Rn(this._config, e.iconKey) : !0;
				if (t.toLowerCase().split("?")[0].endsWith(".svg")) {
					let e = B.call(this, t, { forceColor: r });
					return e ? E`<span slot="icon" class="image-icon">${H(e)}</span>` : E`<img
              slot="icon"
              src=${t}
              alt=""
              style=${n}
            />`;
				}
				return E`<img
        slot="icon"
        src=${t}
        alt=""
        style=${n}
      />`;
			}
			return "";
		}
		_renderActiveEntitiesDialog(e) {
			return sl.call(this, e.activeEntities);
		}
		render() {
			let e = this._getModel(), t = e.activeEntities[0]?.entity_id || e.entities[0]?.entity_id || null, n = M(this._config?.tap_action || cc(this._config)) || M(this._config?.hold_action) || M(this._config?.double_tap_action), r = this._config?.display_style === "badge", i = this._config?.card_visibility || "always", a = i === "always" || i === "state" && e.isOn || i === "template" && (e.isOn || e.inactiveTemplateActive), o = !r && this._config?.show_state !== !1, s = !r && this._config?.show_name === !0, c = r || this._config?.show_icon !== !1, l = this._config?.card_color ? Dt.call(this, this._config.card_color) : "var(--primary-color)", u = `--badge-color:${e.iconColor};`, d = [
				`--tile-badge-background-color:${l}`,
				`--tile-badge-icon-color:${e.hasIconColorOverride ? e.iconColor : "var(--white-color, #fff)"}`,
				"--mdc-icon-size:12px"
			].join(";"), f = E`
      ${c ? this._renderIcon(e) : ""}
      ${o ? e.stateSource === "template" ? E`<span class="template-state">${e.displayValue}</span>` : E`
              <state-display
                .hass=${this.hass}
                .stateObj=${e.displayStateObj}
                .content=${this._config?.state_content || e.defaultStateContent}
                .timeFormat=${this._config?.time_format}
                .name=${e.label}
                dash-unavailable
              ></state-display>
            ` : ""}
    `, p = {
				click: (e) => this._handleTap(e, t),
				dblclick: (e) => this._handleDoubleTap(e, t),
				pointerdown: (e) => this._handlePointerDown(e, t),
				pointerup: (e) => this._handlePointerEnd(e)
			}, m = this._renderActiveEntitiesDialog(e);
			return r && !a ? O : r ? E`
        <div
          class="card-badge"
          style=${d}
          role=${n ? "button" : "img"}
          tabindex=${n ? "0" : "-1"}
          title=${`${e.label}: ${e.displayValue}`}
          aria-label=${`${e.label}: ${e.displayValue}`}
          @click=${p.click}
          @dblclick=${p.dblclick}
          @pointerdown=${p.pointerdown}
          @pointerup=${p.pointerup}
          @pointercancel=${() => this._cancelLongPress()}
          @pointerleave=${() => this._cancelLongPress()}
        >
          ${f}
        </div>
        ${m}
      ` : E`${this._isHeadingBadge ? E`
          <ha-heading-badge
            .type=${n ? "button" : "text"}
            style=${[
				`--icon-color:${e.hasConfiguredColor ? e.iconColor : "currentColor"}`,
				"--ha-heading-badge-font-size:var(--ha-heading-card-title-font-size,var(--ha-font-size-l))",
				"--ha-heading-badge-font-weight:var(--ha-heading-card-title-font-weight,var(--ha-font-weight-normal))",
				"--ha-heading-badge-line-height:var(--ha-heading-card-title-line-height,var(--ha-line-height-normal))"
			].join(";")}
            .title=${`${e.label}: ${e.displayValue}`}
            aria-label=${`${e.label}: ${e.displayValue}`}
            @click=${p.click}
            @dblclick=${p.dblclick}
            @pointerdown=${p.pointerdown}
            @pointerup=${p.pointerup}
            @pointercancel=${() => this._cancelLongPress()}
            @pointerleave=${() => this._cancelLongPress()}
          >
            ${f}
          </ha-heading-badge>
        ` : E`
          <ha-badge
            .type=${n ? "button" : "badge"}
            .label=${s ? e.label : void 0}
            .iconOnly=${r || !o && !s}
            style=${u}
            .title=${`${e.label}: ${e.displayValue}`}
            aria-label=${`${e.label}: ${e.displayValue}`}
            @click=${p.click}
            @dblclick=${p.dblclick}
            @pointerdown=${p.pointerdown}
            @pointerup=${p.pointerup}
            @pointercancel=${() => this._cancelLongPress()}
            @pointerleave=${() => this._cancelLongPress()}
          >
            ${f}
          </ha-badge>
        `}${m}`;
		}
		static styles = [np, Zu];
	},
	name: "Orbit Status Badge",
	description: "Displays an entity, area count, or template state",
	version: t.statusBadge
}), i("Orbit Cards", e);
//#endregion
