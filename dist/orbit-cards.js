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
})(e) : e, { is: m, defineProperty: ee, getOwnPropertyDescriptor: h, getOwnPropertyNames: te, getOwnPropertySymbols: ne, getPrototypeOf: re } = Object, g = globalThis, _ = g.trustedTypes, ie = _ ? _.emptyScript : "", ae = g.reactiveElementPolyfillSupport, v = (e, t) => e, y = {
	toAttribute(e, t) {
		switch (t) {
			case Boolean:
				e = e ? ie : null;
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
}, b = (e, t) => !m(e, t), oe = {
	attribute: !0,
	type: String,
	converter: y,
	reflect: !1,
	useDefault: !1,
	hasChanged: b
};
Symbol.metadata ??= Symbol("metadata"), g.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
var x = class extends HTMLElement {
	static addInitializer(e) {
		this._$Ei(), (this.l ??= []).push(e);
	}
	static get observedAttributes() {
		return this.finalize(), this._$Eh && [...this._$Eh.keys()];
	}
	static createProperty(e, t = oe) {
		if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
			let n = Symbol(), r = this.getPropertyDescriptor(e, n, t);
			r !== void 0 && ee(this.prototype, e, r);
		}
	}
	static getPropertyDescriptor(e, t, n) {
		let { get: r, set: i } = h(this.prototype, e) ?? {
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
		return this.elementProperties.get(e) ?? oe;
	}
	static _$Ei() {
		if (this.hasOwnProperty(v("elementProperties"))) return;
		let e = re(this);
		e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
	}
	static finalize() {
		if (this.hasOwnProperty(v("finalized"))) return;
		if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(v("properties"))) {
			let e = this.properties, t = [...te(e), ...ne(e)];
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
			let i = (n.converter?.toAttribute === void 0 ? y : n.converter).toAttribute(t, n.type);
			this._$Em = e, i == null ? this.removeAttribute(r) : this.setAttribute(r, i), this._$Em = null;
		}
	}
	_$AK(e, t) {
		let n = this.constructor, r = n._$Eh.get(e);
		if (r !== void 0 && this._$Em !== r) {
			let e = n.getPropertyOptions(r), i = typeof e.converter == "function" ? { fromAttribute: e.converter } : e.converter?.fromAttribute === void 0 ? y : e.converter;
			this._$Em = r;
			let a = i.fromAttribute(t, e.type);
			this[r] = a ?? this._$Ej?.get(r) ?? a, this._$Em = null;
		}
	}
	requestUpdate(e, t, n, r = !1, i) {
		if (e !== void 0) {
			let a = this.constructor;
			if (!1 === r && (i = this[e]), n ??= a.getPropertyOptions(e), !((n.hasChanged ?? b)(i, t) || n.useDefault && n.reflect && i === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, n)))) return;
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
x.elementStyles = [], x.shadowRootOptions = { mode: "open" }, x[v("elementProperties")] = /* @__PURE__ */ new Map(), x[v("finalized")] = /* @__PURE__ */ new Map(), ae?.({ ReactiveElement: x }), (g.reactiveElementVersions ??= []).push("2.1.2");
//#endregion
//#region node_modules/lit-html/lit-html.js
var se = globalThis, ce = (e) => e, le = se.trustedTypes, ue = le ? le.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, de = "$lit$", S = `lit$${Math.random().toFixed(9).slice(2)}$`, fe = "?" + S, pe = `<${fe}>`, C = document, me = () => C.createComment(""), he = (e) => e === null || typeof e != "object" && typeof e != "function", ge = Array.isArray, _e = (e) => ge(e) || typeof e?.[Symbol.iterator] == "function", ve = "[ 	\n\f\r]", ye = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, be = /-->/g, xe = />/g, w = RegExp(`>|${ve}(?:([^\\s"'>=/]+)(${ve}*=${ve}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), Se = /'/g, Ce = /"/g, we = /^(?:script|style|textarea|title)$/i, T = ((e) => (t, ...n) => ({
	_$litType$: e,
	strings: t,
	values: n
}))(1), E = Symbol.for("lit-noChange"), D = Symbol.for("lit-nothing"), Te = /* @__PURE__ */ new WeakMap(), O = C.createTreeWalker(C, 129);
function Ee(e, t) {
	if (!ge(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
	return ue === void 0 ? t : ue.createHTML(t);
}
var De = (e, t) => {
	let n = e.length - 1, r = [], i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = ye;
	for (let t = 0; t < n; t++) {
		let n = e[t], s, c, l = -1, u = 0;
		for (; u < n.length && (o.lastIndex = u, c = o.exec(n), c !== null);) u = o.lastIndex, o === ye ? c[1] === "!--" ? o = be : c[1] === void 0 ? c[2] === void 0 ? c[3] !== void 0 && (o = w) : (we.test(c[2]) && (i = RegExp("</" + c[2], "g")), o = w) : o = xe : o === w ? c[0] === ">" ? (o = i ?? ye, l = -1) : c[1] === void 0 ? l = -2 : (l = o.lastIndex - c[2].length, s = c[1], o = c[3] === void 0 ? w : c[3] === "\"" ? Ce : Se) : o === Ce || o === Se ? o = w : o === be || o === xe ? o = ye : (o = w, i = void 0);
		let d = o === w && e[t + 1].startsWith("/>") ? " " : "";
		a += o === ye ? n + pe : l >= 0 ? (r.push(s), n.slice(0, l) + de + n.slice(l) + S + d) : n + S + (l === -2 ? t : d);
	}
	return [Ee(e, a + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
}, Oe = class e {
	constructor({ strings: t, _$litType$: n }, r) {
		let i;
		this.parts = [];
		let a = 0, o = 0, s = t.length - 1, c = this.parts, [l, u] = De(t, n);
		if (this.el = e.createElement(l, r), O.currentNode = this.el.content, n === 2 || n === 3) {
			let e = this.el.content.firstChild;
			e.replaceWith(...e.childNodes);
		}
		for (; (i = O.nextNode()) !== null && c.length < s;) {
			if (i.nodeType === 1) {
				if (i.hasAttributes()) for (let e of i.getAttributeNames()) if (e.endsWith(de)) {
					let t = u[o++], n = i.getAttribute(e).split(S), r = /([.?@])?(.*)/.exec(t);
					c.push({
						type: 1,
						index: a,
						name: r[2],
						strings: n,
						ctor: r[1] === "." ? Me : r[1] === "?" ? Ne : r[1] === "@" ? Pe : je
					}), i.removeAttribute(e);
				} else e.startsWith(S) && (c.push({
					type: 6,
					index: a
				}), i.removeAttribute(e));
				if (we.test(i.tagName)) {
					let e = i.textContent.split(S), t = e.length - 1;
					if (t > 0) {
						i.textContent = le ? le.emptyScript : "";
						for (let n = 0; n < t; n++) i.append(e[n], me()), O.nextNode(), c.push({
							type: 2,
							index: ++a
						});
						i.append(e[t], me());
					}
				}
			} else if (i.nodeType === 8) if (i.data === fe) c.push({
				type: 2,
				index: a
			});
			else {
				let e = -1;
				for (; (e = i.data.indexOf(S, e + 1)) !== -1;) c.push({
					type: 7,
					index: a
				}), e += S.length - 1;
			}
			a++;
		}
	}
	static createElement(e, t) {
		let n = C.createElement("template");
		return n.innerHTML = e, n;
	}
};
function k(e, t, n = e, r) {
	if (t === E) return t;
	let i = r === void 0 ? n._$Cl : n._$Co?.[r], a = he(t) ? void 0 : t._$litDirective$;
	return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(e), i._$AT(e, n, r)), r === void 0 ? n._$Cl = i : (n._$Co ??= [])[r] = i), i !== void 0 && (t = k(e, i._$AS(e, t.values), i, r)), t;
}
var ke = class {
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
		let { el: { content: t }, parts: n } = this._$AD, r = (e?.creationScope ?? C).importNode(t, !0);
		O.currentNode = r;
		let i = O.nextNode(), a = 0, o = 0, s = n[0];
		for (; s !== void 0;) {
			if (a === s.index) {
				let t;
				s.type === 2 ? t = new Ae(i, i.nextSibling, this, e) : s.type === 1 ? t = new s.ctor(i, s.name, s.strings, this, e) : s.type === 6 && (t = new Fe(i, this, e)), this._$AV.push(t), s = n[++o];
			}
			a !== s?.index && (i = O.nextNode(), a++);
		}
		return O.currentNode = C, r;
	}
	p(e) {
		let t = 0;
		for (let n of this._$AV) n !== void 0 && (n.strings === void 0 ? n._$AI(e[t]) : (n._$AI(e, n, t), t += n.strings.length - 2)), t++;
	}
}, Ae = class e {
	get _$AU() {
		return this._$AM?._$AU ?? this._$Cv;
	}
	constructor(e, t, n, r) {
		this.type = 2, this._$AH = D, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = n, this.options = r, this._$Cv = r?.isConnected ?? !0;
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
		e = k(this, e, t), he(e) ? e === D || e == null || e === "" ? (this._$AH !== D && this._$AR(), this._$AH = D) : e !== this._$AH && e !== E && this._(e) : e._$litType$ === void 0 ? e.nodeType === void 0 ? _e(e) ? this.k(e) : this._(e) : this.T(e) : this.$(e);
	}
	O(e) {
		return this._$AA.parentNode.insertBefore(e, this._$AB);
	}
	T(e) {
		this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
	}
	_(e) {
		this._$AH !== D && he(this._$AH) ? this._$AA.nextSibling.data = e : this.T(C.createTextNode(e)), this._$AH = e;
	}
	$(e) {
		let { values: t, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = Oe.createElement(Ee(n.h, n.h[0]), this.options)), n);
		if (this._$AH?._$AD === r) this._$AH.p(t);
		else {
			let e = new ke(r, this), n = e.u(this.options);
			e.p(t), this.T(n), this._$AH = e;
		}
	}
	_$AC(e) {
		let t = Te.get(e.strings);
		return t === void 0 && Te.set(e.strings, t = new Oe(e)), t;
	}
	k(t) {
		ge(this._$AH) || (this._$AH = [], this._$AR());
		let n = this._$AH, r, i = 0;
		for (let a of t) i === n.length ? n.push(r = new e(this.O(me()), this.O(me()), this, this.options)) : r = n[i], r._$AI(a), i++;
		i < n.length && (this._$AR(r && r._$AB.nextSibling, i), n.length = i);
	}
	_$AR(e = this._$AA.nextSibling, t) {
		for (this._$AP?.(!1, !0, t); e !== this._$AB;) {
			let t = ce(e).nextSibling;
			ce(e).remove(), e = t;
		}
	}
	setConnected(e) {
		this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
	}
}, je = class {
	get tagName() {
		return this.element.tagName;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	constructor(e, t, n, r, i) {
		this.type = 1, this._$AH = D, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = i, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(/* @__PURE__ */ new String()), this.strings = n) : this._$AH = D;
	}
	_$AI(e, t = this, n, r) {
		let i = this.strings, a = !1;
		if (i === void 0) e = k(this, e, t, 0), a = !he(e) || e !== this._$AH && e !== E, a && (this._$AH = e);
		else {
			let r = e, o, s;
			for (e = i[0], o = 0; o < i.length - 1; o++) s = k(this, r[n + o], t, o), s === E && (s = this._$AH[o]), a ||= !he(s) || s !== this._$AH[o], s === D ? e = D : e !== D && (e += (s ?? "") + i[o + 1]), this._$AH[o] = s;
		}
		a && !r && this.j(e);
	}
	j(e) {
		e === D ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
	}
}, Me = class extends je {
	constructor() {
		super(...arguments), this.type = 3;
	}
	j(e) {
		this.element[this.name] = e === D ? void 0 : e;
	}
}, Ne = class extends je {
	constructor() {
		super(...arguments), this.type = 4;
	}
	j(e) {
		this.element.toggleAttribute(this.name, !!e && e !== D);
	}
}, Pe = class extends je {
	constructor(e, t, n, r, i) {
		super(e, t, n, r, i), this.type = 5;
	}
	_$AI(e, t = this) {
		if ((e = k(this, e, t, 0) ?? D) === E) return;
		let n = this._$AH, r = e === D && n !== D || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, i = e !== D && (n === D || r);
		r && this.element.removeEventListener(this.name, this, n), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
	}
	handleEvent(e) {
		typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
	}
}, Fe = class {
	constructor(e, t, n) {
		this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = n;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AI(e) {
		k(this, e);
	}
}, Ie = {
	M: de,
	P: S,
	A: fe,
	C: 1,
	L: De,
	R: ke,
	D: _e,
	V: k,
	I: Ae,
	H: je,
	N: Ne,
	U: Pe,
	B: Me,
	F: Fe
}, Le = se.litHtmlPolyfillSupport;
Le?.(Oe, Ae), (se.litHtmlVersions ??= []).push("3.3.3");
var Re = (e, t, n) => {
	let r = n?.renderBefore ?? t, i = r._$litPart$;
	if (i === void 0) {
		let e = n?.renderBefore ?? null;
		r._$litPart$ = i = new Ae(t.insertBefore(me(), e), e, void 0, n ?? {});
	}
	return i._$AI(e), i;
}, ze = globalThis, A = class extends x {
	constructor() {
		super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
	}
	createRenderRoot() {
		let e = super.createRenderRoot();
		return this.renderOptions.renderBefore ??= e.firstChild, e;
	}
	update(e) {
		let t = this.render();
		this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Re(t, this.renderRoot, this.renderOptions);
	}
	connectedCallback() {
		super.connectedCallback(), this._$Do?.setConnected(!0);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this._$Do?.setConnected(!1);
	}
	render() {
		return E;
	}
};
A._$litElement$ = !0, A.finalized = !0, ze.litElementHydrateSupport?.({ LitElement: A });
var Be = ze.litElementPolyfillSupport;
Be?.({ LitElement: A }), (ze.litElementVersions ??= []).push("4.2.2");
//#endregion
//#region src/common/helpers/actions.js
function Ve(e, t = null) {
	if (!(!e || !this.hass)) switch (e.action || "toggle") {
		case "toggle": {
			if (!t) return;
			let e = t.split(".")[0];
			this.hass.callService(e, "toggle", { entity_id: t });
			break;
		}
		case "more-info":
			this.dispatchEvent(new CustomEvent("hass-more-info", {
				detail: { entityId: t },
				bubbles: !0,
				composed: !0
			}));
			break;
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
			let r = We(e, t, n);
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
function j(e) {
	return !!(e?.action && e.action !== "none");
}
function M(e) {
	let t = e;
	for (; t;) {
		let e = t.localName || "";
		if (e === "hui-card-picker" || e === "hui-dialog-add-card" || e === "hui-card-picker-card") return !0;
		let n = t.getRootNode?.();
		t = t.parentElement || (n instanceof ShadowRoot ? n.host : null);
	}
	return !1;
}
function N(e, t, n, r) {
	if (!M(this)) {
		if (Ue(e), this._clearDoubleTapTimer?.(), j(r)) {
			this._doubleTapTimer = setTimeout(() => {
				this._doubleTapTimer = null, this._handleAction(n, t);
			}, 250);
			return;
		}
		this._handleAction(n, t);
	}
}
function P(e, t, n) {
	M(this) || (Ue(e), this._clearDoubleTapTimer?.(), j(n) && this._handleAction(n, t));
}
function He() {
	this._doubleTapTimer &&= (clearTimeout(this._doubleTapTimer), null);
}
function Ue(e) {
	e?.preventDefault?.(), e?.stopPropagation?.(), e?.stopImmediatePropagation && e.stopImmediatePropagation();
}
function We(e, t, n) {
	let { action: r, popup_title: i, popup_content: a, popup_options: o, title: s, content: c, ...l } = e;
	return {
		...l,
		...o || {},
		title: t,
		content: n
	};
}
function Ge(e) {
	e && (history.pushState(null, "", e), window.dispatchEvent(new CustomEvent("location-changed", { detail: { replace: !1 } })));
}
function Ke(e, t, n = null) {
	t.stopPropagation(), this._handleAction(n || { action: "toggle" }, e);
}
function qe(e) {
	let t = e.currentTarget.dataEntity, n = e.currentTarget.dataAction, r = e.currentTarget.dataDoubleAction;
	N.call(this, e, t, n, r);
}
function Je(e) {
	P.call(this, e, e.currentTarget.dataEntity, e.currentTarget.dataDoubleAction);
}
function Ye(e) {
	if (this._longPressTriggered) {
		this._longPressTriggered = !1;
		return;
	}
	let t = e.currentTarget.dataEntity, n = e.currentTarget.dataAction, r = e.currentTarget.dataDoubleAction;
	N.call(this, e, t, n, r);
}
function Xe(e) {
	P.call(this, e, e.currentTarget.dataEntity, e.currentTarget.dataDoubleAction);
}
function Ze(e) {
	if (!M(this)) {
		if (this._longPressTriggered) {
			this._longPressTriggered = !1;
			return;
		}
		if (e.composedPath().some((e) => e?.classList && e.classList.contains("circle"))) return $e.call(this, e);
		N.call(this, e, this._config.main_entity || this._config.entity, tt(this._config), this._config.double_tap_action);
	}
}
function Qe(e) {
	if (!M(this)) {
		if (e.composedPath().some((e) => e?.classList && e.classList.contains("circle"))) return et.call(this, e);
		P.call(this, e, this._config.main_entity || this._config.entity, this._config.double_tap_action);
	}
}
function $e(e) {
	if (this._longPressTriggered) {
		this._longPressTriggered = !1;
		return;
	}
	let t = this._config.main_entity || this._config.entity;
	if (!t) {
		N.call(this, e, null, tt(this._config), this._config.double_tap_action);
		return;
	}
	N.call(this, e, t, nt(this._config), this._config.main_entity_double_tap_action);
}
function et(e) {
	let t = this._config.main_entity || this._config.entity;
	if (!t) {
		P.call(this, e, null, this._config.double_tap_action);
		return;
	}
	P.call(this, e, t, this._config.main_entity_double_tap_action);
}
function tt(e = {}) {
	return e.tap_action?.action ? e.tap_action : {
		action: "navigate",
		navigation_path: e.navigate?.navigation_path || e.navigation_path || "/lovelace/home"
	};
}
function nt(e = {}) {
	return e.main_entity_tap_action?.action === "none" ? tt(e) : e.main_entity_tap_action || { action: "more-info" };
}
//#endregion
//#region src/common/helpers/colors.js
function rt(e) {
	if (!e) return "rgb(var(--color-theme))";
	let t = e.toString().trim();
	return gt(t) ? t : st(t);
}
function it(e) {
	if (!e) return "rgba(var(--color-theme), 0.3)";
	let t = e.toString().trim();
	return t === "theme" ? "rgba(var(--color-theme), 0.3)" : ht(t, 70);
}
function at(e) {
	if (!e) return "rgba(var(--color-theme), 0.2)";
	let t = e.toString().trim();
	return t === "theme" ? "rgba(var(--color-theme), 0.05)" : ht(t, 20);
}
function ot(e) {
	return e ? ht(e.toString().trim(), 25) : "rgba(var(--color-theme), 0.25)";
}
function st(e) {
	let t = _t(e);
	if (!t) return "rgb(var(--color-theme))";
	if (t === "light") return "var(--state-light-active-color, var(--state-active-color, rgb(var(--color-theme))))";
	let n = dt(t);
	return ct(t) ? n ? `rgb(var(--${n}))` : `var(--${t}-color, var(--${t}, rgb(var(--color-theme))))` : t.startsWith("color-") ? `rgb(var(--${t}))` : `var(--${t}, rgb(var(--color-${t}, var(--color-theme))))`;
}
function ct(e) {
	return lt.has(_t(e));
}
var lt = new Set([
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
function ut(e) {
	return !!dt(e);
}
function dt(e) {
	let t = _t(e);
	return t && ft(t).find(mt) || "";
}
function ft(e) {
	let t = e.startsWith("color-") ? e.slice(6) : e, n = pt[t] || [];
	return [`color-${t}`, ...n.map((e) => `color-${e}`)];
}
var pt = {
	"blue-grey": ["bluegrey"],
	"dark-grey": ["darkgrey"],
	"deep-orange": ["deeporange"],
	"deep-purple": ["deeppurple"],
	"light-blue": ["lightblue"],
	"light-green": ["lightgreen"],
	"light-grey": ["lightgrey"]
};
function mt(e) {
	return typeof document > "u" ? !1 : [document.documentElement, document.body].filter(Boolean).some((t) => getComputedStyle(t).getPropertyValue(`--${e}`).trim());
}
function ht(e, t) {
	let n = e.toString().trim();
	return `color-mix(in srgb, transparent, ${gt(n) ? n : st(n)} ${t}%)`;
}
function gt(e) {
	let t = e.toString().trim();
	return t.startsWith("rgb") || t.startsWith("hsl") || t.startsWith("#");
}
function _t(e) {
	return e.toString().trim().toLowerCase().replace(/[^a-z0-9-_]/g, "");
}
//#endregion
//#region src/common/helpers/card-name.js
function vt(e, t, n = "Card") {
	if (e.name) return e.name;
	if (e.card_name) return e.card_name;
	if (e.area_name) return yt(e.area_name, e, t, n);
	if (e.room_name) return yt(e.room_name, e, t, n);
	let r = e.area;
	return r && t?.areas?.[r] && t.areas[r].name || n;
}
function yt(e, t, n, r = "") {
	return typeof e == "string" ? e : (Array.isArray(e) ? e : [e]).map((e) => bt(e, t, n, r)).filter(Boolean).join(" ");
}
function bt(e, t, n, r) {
	if (!e) return "";
	if (typeof e == "string") return e;
	if (e.type === "text") return e.text || "";
	if (e.type === "area") return xt(t, n) || "";
	if (e.type === "floor") return St(t, n) || "";
	let i = Ct(t, n);
	return i && typeof n?.formatEntityName == "function" ? n.formatEntityName(i, { type: e.type }) || "" : e.type === "entity" && (i?.attributes?.friendly_name || i?.entity_id) || "";
}
function xt(e, t) {
	let n = e.area;
	if (n && t?.areas?.[n]) return t.areas[n].name || "";
	let r = Ct(e, t);
	return r && typeof t?.formatEntityName == "function" ? t.formatEntityName(r, { type: "area" }) : "";
}
function St(e, t) {
	let n = e.area, r = n && t?.areas?.[n] ? t.areas[n].floor_id : "";
	if (r && t?.floors?.[r]) return t.floors[r].name || "";
	let i = Ct(e, t);
	return i && typeof t?.formatEntityName == "function" ? t.formatEntityName(i, { type: "floor" }) : "";
}
function Ct(e, t) {
	let n = e.main_entity || e.entity || "";
	return n && t?.states ? t.states[n] : null;
}
//#endregion
//#region src/common/helpers/documentation.js
var wt = "https://github.com/andyblac/Orbit-Cards/wiki", Tt = {
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
function Et(e = "") {
	return e.replace(/^custom:/, "");
}
function Dt(e, t = "default") {
	let n = Tt[Et(e)], r = n?.[t] || n?.default;
	return r ? `${wt}/${r}` : `${wt}`;
}
function Ot(e, t, n = "default") {
	let r = Dt(t, n);
	queueMicrotask(() => {
		let t = kt(e, "hui-dialog-edit-card") || kt(e, "hui-dialog-edit-badge");
		!t || t._documentationURL === r || (t._documentationURL = r, t.requestUpdate?.());
	});
}
function kt(e, t) {
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
function At({ tag: e, cardClass: t, name: n, description: r, version: a, getEntitySuggestion: o, documentationURL: s, aliases: c = [] }) {
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
		documentationURL: s || Dt(e),
		getEntitySuggestion: o
	}), i(n, a);
}
//#endregion
//#region src/common/helpers/templates.js
var jt = "__ORBIT_TEMPLATE_RESULT_START_8C4F2A__", Mt = "__ORBIT_TEMPLATE_RESULT_END_8C4F2A__";
function Nt(e) {
	if (typeof e != "string") return e;
	let t = e.trim();
	return !t || Pt(t) ? e : `{{ ${t} }}`;
}
function Pt(e) {
	return /{{|{%|{#/.test(e || "");
}
function Ft(e = []) {
	let t = this.hass?.connection;
	if (!this.isConnected || !t?.subscribeMessage) {
		It.call(this);
		return;
	}
	let n = Bt(this), r = Ut(this._config || {}), i = /* @__PURE__ */ new Map();
	for (let t of e) {
		let e = Nt(t?.template || "")?.trim();
		if (!e) continue;
		let n = t?.entityId || "", a = Vt(e, n);
		i.set(a, {
			id: a,
			template: e,
			entityId: n,
			configSignature: r
		});
	}
	for (let [e, t] of n) {
		let r = i.get(e);
		(!r || r.configSignature !== t.configSignature) && (Ht(t), n.delete(e));
	}
	for (let e of i.values()) n.has(e.id) || Rt.call(this, e);
}
function It() {
	let e = this.__orbitTemplateSubscriptions;
	if (e) {
		for (let t of e.values()) Ht(t);
		e.clear();
	}
}
function F(e, t = "") {
	if (!e) return null;
	let n = Nt(e)?.trim();
	return this.__orbitTemplateSubscriptions?.get(Vt(n, t))?.result ?? null;
}
function Lt(e, t = "") {
	if (!e) return "";
	let n = Nt(e)?.trim();
	return this.__orbitTemplateSubscriptions?.get(Vt(n, t))?.error || "";
}
function I(e) {
	let t = String(e ?? "").trim().toLowerCase();
	if (!t || [
		"false",
		"off",
		"no",
		"none",
		"null",
		"unknown",
		"unavailable"
	].includes(t)) return !1;
	let n = Number(t);
	return Number.isFinite(n) ? n !== 0 : !0;
}
function Rt(e) {
	let t = Bt(this), { id: n, template: r, entityId: i, configSignature: a } = e, o = {
		configSignature: a,
		result: null,
		error: "",
		subscription: void 0
	};
	t.set(n, o);
	let s = [
		"{% set entity = states[orbit_entity_id] if orbit_entity_id else none %}",
		jt,
		r,
		Mt
	].join(""), c = this.hass.connection.subscribeMessage((e) => {
		t.get(n) === o && ("error" in e ? (o.error = Wt(e.error), o.result = null) : (o.error = "", o.result = zt(e.result)), this._templateRevision = (this._templateRevision || 0) + 1);
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
		t.get(n) === o && (o.subscription = void 0, o.error = Wt(e), o.result = null, this._templateRevision = (this._templateRevision || 0) + 1);
	});
}
function zt(e) {
	let t = String(e ?? ""), n = t.indexOf(jt), r = t.lastIndexOf(Mt);
	return n !== -1 && r > n ? t.slice(n + 38, r).trim() : t.trim();
}
function Bt(e) {
	return e.__orbitTemplateSubscriptions ||= /* @__PURE__ */ new Map(), e.__orbitTemplateSubscriptions;
}
function Vt(e, t) {
	return JSON.stringify([e || "", t || ""]);
}
function Ht(e) {
	e.subscription?.then((e) => e()).catch(() => {});
}
function Ut(e) {
	try {
		return JSON.stringify(e);
	} catch {
		return "";
	}
}
function Wt(e) {
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
//#region src/common/helpers/config-migration.js
function Gt(e = {}) {
	let t = { ...e || {} }, n = !1;
	return t.type === "custom:orbit-room-card" && (t.type = "custom:orbit-area-card", n = !0), Object.prototype.hasOwnProperty.call(t, "room_name") && (t.area_name === void 0 && t.room_name !== void 0 && t.room_name !== "" && (t.area_name = t.room_name), delete t.room_name, n = !0), n = qt(t) || n, {
		config: n ? t : e,
		migrated: n
	};
}
function Kt(e = {}) {
	let t = { ...e || {} }, n = qt(t);
	if (Object.prototype.hasOwnProperty.call(t, "main_entity") && (t.entity === void 0 && t.main_entity !== void 0 && t.main_entity !== "" && (t.entity = t.main_entity), delete t.main_entity, n = !0), Array.isArray(t.entities)) {
		let e = t.entities.map((e) => {
			if (!e || typeof e == "string") return e;
			let t = { ...e }, r = qt(t);
			return n ||= r, r ? t : e;
		});
		n && (t.entities = e);
	}
	return {
		config: n ? t : e,
		migrated: n
	};
}
function qt(e) {
	let t = !1;
	for (let n of Object.keys(e || {})) {
		if (!n.endsWith("_template")) continue;
		let r = Nt(e[n]);
		r !== e[n] && (e[n] = r, t = !0);
	}
	return t;
}
//#endregion
//#region src/common/helpers/entities.js
function Jt(e) {
	let t = e.attributes.unit_of_measurement || "", n = e.state;
	return t ? `${n}${t}` : n === "on" || n === "off" ? n.toUpperCase() : n;
}
function Yt(e) {
	if (!e) return !1;
	let t = e.entity_id.split(".")[0], n = e.state;
	switch (t) {
		case "cover": return ["open", "opening"].includes(n);
		case "lock": return n === "unlocked";
		case "person": return n === "home";
		case "device_tracker": return n !== "not_home";
		case "climate": return n !== "off";
		case "media_player": return ![
			"off",
			"idle",
			"standby",
			"unavailable"
		].includes(n);
		case "vacuum": return ![
			"docked",
			"idle",
			"off"
		].includes(n);
		case "alarm_control_panel": return n !== "disarmed";
		case "sun": return n === "above_horizon";
		default: return n === "on";
	}
}
function Xt(e) {
	return e?.state?.toString().toLowerCase() === "unavailable";
}
//#endregion
//#region src/icons/fan.svg?raw
var Zt = "<svg xmlns=\"http://www.w3.org/2000/svg\"\n     width=\"120\"\n     height=\"120\"\n     viewBox=\"0 0 24 24\"\n     fill=\"none\">\n\n  <style>\n    .spinner {\n      transform-origin: center;\n      animation: spin 1.2s linear infinite;\n    }\n\n    @keyframes spin {\n      100% {\n        transform: rotate(360deg);\n      }\n    }\n  </style>\n\n  <g class=\"spinner\">\n    <path\n      fill=\"black\"\n      d=\"M12,11A1,1 0 0,0 11,12A1,1 0 0,0 12,13A1,1 0 0,0 13,12A1,1 0 0,0 12,11M12.5,2C17,2 17.11,5.57 14.75,6.75C13.76,7.24 13.32,8.29 13.13,9.22C13.61,9.42 14.03,9.73 14.35,10.13C18.05,8.13 22.03,8.92 22.03,12.5C22.03,17 18.46,17.1 17.28,14.73C16.78,13.74 15.72,13.3 14.79,13.11C14.59,13.59 14.28,14 13.88,14.34C15.87,18.03 15.08,22 11.5,22C7,22 6.91,18.42 9.27,17.24C10.25,16.75 10.69,15.71 10.89,14.79C10.4,14.59 9.97,14.27 9.65,13.87C5.96,15.85 2,15.07 2,11.5C2,7 5.56,6.89 6.74,9.26C7.24,10.25 8.29,10.68 9.22,10.87C9.41,10.39 9.73,9.97 10.14,9.65C8.15,5.96 8.94,2 12.5,2Z\"\n    />\n  </g>\n\n</svg>", Qt = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\">\n  <title>garage-fixed</title>\n\n  <!-- Frame -->\n  <path d=\"M22 9V20H20V11H4V20H2V9L12 5L22 9\" fill=\"currentColor\"/>\n\n  <clipPath id=\"doorClip\">\n    <rect x=\"4\" y=\"11\" width=\"16\" height=\"9\" />\n  </clipPath>\n\n  <g clip-path=\"url(#doorClip)\">\n\n    <!-- Animated group (NO base transform!) -->\n    <g>\n\n      <!-- Door panels -->\n      <path d=\"M19 12H5V14H19V12Z\" fill=\"currentColor\"/>\n      <path d=\"M19 15H5V17H19V15Z\" fill=\"currentColor\"/>\n      <path d=\"M19 18H5V20H19V18Z\" fill=\"currentColor\"/>\n\n      <!-- Start OPEN via animation itself -->\n      <animateTransform\n        attributeName=\"transform\"\n        type=\"translate\"\n        from=\"0 -10\"\n        to=\"0 0\"\n        dur=\"1.5s\"\n        begin=\"0s\"\n        fill=\"freeze\"\n      />\n\n    </g>\n  </g>\n</svg>", $t = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\">\n  <title>garage-variant-open</title>\n\n  <!-- Frame / roof -->\n  <path d=\"M22 9V20H20V11H4V20H2V9L12 5L22 9\" fill=\"currentColor\"/>\n\n  <!-- Clip area -->\n  <clipPath id=\"doorClip\">\n    <rect x=\"4\" y=\"11\" width=\"16\" height=\"9\" />\n  </clipPath>\n\n  <g clip-path=\"url(#doorClip)\">\n\n    <!-- Door group (FINAL STATE is open) -->\n    <g class=\"door\" transform=\"translate(0 -10)\">\n\n      <!-- Door panels -->\n      <path d=\"M19 12H5V14H19V12Z\" fill=\"currentColor\"/>\n      <path d=\"M19 15H5V17H19V15Z\" fill=\"currentColor\"/>\n      <path d=\"M19 18H5V20H19V18Z\" fill=\"currentColor\"/>\n\n      <!-- Optional SMIL animation (safe fallback style) -->\n      <animateTransform\n        attributeName=\"transform\"\n        type=\"translate\"\n        from=\"0 0\"\n        to=\"0 -10\"\n        dur=\"1.5s\"\n        begin=\"0s\"\n        fill=\"freeze\"\n      />\n    </g>\n\n  </g>\n</svg>", en = "<svg xmlns=\"http://www.w3.org/2000/svg\"\n     viewBox=\"0 0 24 24\">\n\n  <style>\n    .arc {\n      opacity: 0;\n      animation-duration: 2s;\n      animation-iteration-count: infinite;\n    }\n\n    /* arc 1 appears first and stays on */\n    .a1 {\n      animation-name: arc1;\n    }\n\n    /* arc 2 appears second and stays on */\n    .a2 {\n      animation-name: arc2;\n    }\n\n    /* arc 3 appears third and stays on */\n    .a3 {\n      animation-name: arc3;\n    }\n\n    @keyframes arc1 {\n      0%   { opacity: 0; }\n      10%  { opacity: 1; }\n      75%  { opacity: 1; }\n      100% { opacity: 0; }\n    }\n\n    @keyframes arc2 {\n      0%   { opacity: 0; }\n      25%  { opacity: 0; }\n      35%  { opacity: 1; }\n      75%  { opacity: 1; }\n      100% { opacity: 0; }\n    }\n\n    @keyframes arc3 {\n      0%   { opacity: 0; }\n      50%  { opacity: 0; }\n      60%  { opacity: 1; }\n      75%  { opacity: 1; }\n      100% { opacity: 0; }\n    }\n  </style>\n\n  <!-- RADAR ARCS -->\n  <path class=\"arc a1\" fill=\"currentColor\"\n    d=\"M21,1A2,2 0 0,0 23,3V1H21\"/>\n\n  <path class=\"arc a2\" fill=\"currentColor\"\n    d=\"M18.33,1C18.33,3.58 20.42,5.67 23,5.67V4.33C21.16,4.33 19.67,2.84 19.67,1H18.33\"/>\n\n  <path class=\"arc a3\" fill=\"currentColor\"\n    d=\"M15.67,1A7.33,7.33 0 0,0 23,8.33V7A6,6 0 0,1 17,1H15.67\"/>\n\n  <!-- MAIN ICON -->\n  <path fill=\"currentColor\"\n    d=\"M10,0.2C9,0.2 8.2,1 8.2,2C8.2,3 9,3.8 10,3.8C11,3.8 11.8,3 11.8,2C11.8,1 11,0.2 10,0.2M7.92,4.03C7.75,4.03 7.58,4.06 7.42,4.11L2,5.8V11H3.8V7.33L5.91,6.67L2,22H3.8L6.67,13.89L9,17V22H10.8V15.59L8.31,11.05L9.04,8.18L10.12,10H15V8.2H11.38L9.38,4.87C9.08,4.37 8.54,4.03 7.92,4.03Z\"\n  />\n</svg>", tn = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" style=\"color: inherit;\">\n  <g class=\"start\">\n    <path\n      fill=\"currentColor\"\n      d=\"M10,0.2C9,0.2 8.2,1 8.2,2C8.2,3 9,3.8 10,3.8C11,3.8 11.8,3 11.8,2C11.8,1 11,0.2 10,0.2M7.92,4.03C7.75,4.03 7.58,4.06 7.42,4.11L2,5.8V11H3.8V7.33L5.91,6.67L2,22H3.8L6.67,13.89L9,17V22H10.8V15.59L8.31,11.05L9.04,8.18L10.12,10H15V8.2H11.38L9.38,4.87C9.08,4.37 8.54,4.03 7.92,4.03Z\"/>\n  </g>\n</svg>", nn = "<svg xmlns=\"http://www.w3.org/2000/svg\"\n     viewBox=\"0 0 24 24\">\n\n  <style>\n    .arc {\n      opacity: 0;\n      animation-duration: 2s;\n      animation-iteration-count: infinite;\n    }\n\n    /* arc 1 appears first and stays on */\n    .a1 {\n      animation-name: arc1;\n    }\n\n    /* arc 2 appears second and stays on */\n    .a2 {\n      animation-name: arc2;\n    }\n\n    /* arc 3 appears third and stays on */\n    .a3 {\n      animation-name: arc3;\n    }\n\n    @keyframes arc1 {\n      0%   { opacity: 0; }\n      10%  { opacity: 1; }\n      75%  { opacity: 1; }\n      100% { opacity: 0; }\n    }\n\n    @keyframes arc2 {\n      0%   { opacity: 0; }\n      25%  { opacity: 0; }\n      35%  { opacity: 1; }\n      75%  { opacity: 1; }\n      100% { opacity: 0; }\n    }\n\n    @keyframes arc3 {\n      0%   { opacity: 0; }\n      50%  { opacity: 0; }\n      60%  { opacity: 1; }\n      75%  { opacity: 1; }\n      100% { opacity: 0; }\n    }\n  </style>\n\n  <!-- RADAR ARCS -->\n  <path class=\"arc a1\" fill=\"currentColor\"\n    d=\"M21,1A2,2 0 0,0 23,3V1H21\"/>\n\n  <path class=\"arc a2\" fill=\"currentColor\"\n    d=\"M18.33,1C18.33,3.58 20.42,5.67 23,5.67V4.33C21.16,4.33 19.67,2.84 19.67,1H18.33\"/>\n\n  <path class=\"arc a3\" fill=\"currentColor\"\n    d=\"M15.67,1A7.33,7.33 0 0,0 23,8.33V7A6,6 0 0,1 17,1H15.67\"/>\n\n  <!-- MAIN ICON -->\n  <path fill=\"currentColor\"\n    d=\"M10,0.2C9,0.2 8.2,1 8.2,2C8.2,3 9,3.8 10,3.8C11,3.8 11.8,3 11.8,2C11.8,1 11,0.2 10,0.2M7.92,4.03C7.75,4.03 7.58,4.06 7.42,4.11L2,5.8V11H3.8V7.33L5.91,6.67L2,22H3.8L6.67,13.89L9,17V22H10.8V15.59L8.31,11.05L9.04,8.18L10.12,10H15V8.2H11.38L9.38,4.87C9.08,4.37 8.54,4.03 7.92,4.03Z\"\n  />\n</svg>", rn = "<?xml version=\"1.0\" encoding=\"utf-8\"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->\r\n<svg fill=\"#000000\" width=\"800px\" height=\"800px\" viewBox=\"0 0 50 50\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"><path d=\"M22 0L22 7.28125C22.972656 7.109375 23.972656 7 25 7C26.027344 7 27.027344 7.109375 28 7.28125L28 0 Z M 25 9C18.394531 9 12.871094 13.273438 11.40625 19L38.59375 19C37.128906 13.273438 31.605469 9 25 9 Z M 10 21C8.347656 21 7 22.347656 7 24C7 25.652344 8.347656 27 10 27L40 27C41.652344 27 43 25.652344 43 24C43 22.347656 41.652344 21 40 21 Z M 17 30C15.894531 30 15 30.894531 15 32C15 33.105469 15.894531 34 17 34C18.105469 34 19 33.105469 19 32C19 30.894531 18.105469 30 17 30 Z M 25 30C23.894531 30 23 30.894531 23 32C23 33.105469 23.894531 34 25 34C26.105469 34 27 33.105469 27 32C27 30.894531 26.105469 30 25 30 Z M 33 30C31.894531 30 31 30.894531 31 32C31 33.105469 31.894531 34 33 34C34.105469 34 35 33.105469 35 32C35 30.894531 34.105469 30 33 30 Z M 13 38C11.894531 38 11 38.894531 11 40C11 41.105469 11.894531 42 13 42C14.105469 42 15 41.105469 15 40C15 38.894531 14.105469 38 13 38 Z M 21 38C19.894531 38 19 38.894531 19 40C19 41.105469 19.894531 42 21 42C22.105469 42 23 41.105469 23 40C23 38.894531 22.105469 38 21 38 Z M 29 38C27.894531 38 27 38.894531 27 40C27 41.105469 27.894531 42 29 42C30.105469 42 31 41.105469 31 40C31 38.894531 30.105469 38 29 38 Z M 37 38C35.894531 38 35 38.894531 35 40C35 41.105469 35.894531 42 37 42C38.105469 42 39 41.105469 39 40C39 38.894531 38.105469 38 37 38 Z M 9 46C7.894531 46 7 46.894531 7 48C7 49.105469 7.894531 50 9 50C10.105469 50 11 49.105469 11 48C11 46.894531 10.105469 46 9 46 Z M 17 46C15.894531 46 15 46.894531 15 48C15 49.105469 15.894531 50 17 50C18.105469 50 19 49.105469 19 48C19 46.894531 18.105469 46 17 46 Z M 25 46C23.894531 46 23 46.894531 23 48C23 49.105469 23.894531 50 25 50C26.105469 50 27 49.105469 27 48C27 46.894531 26.105469 46 25 46 Z M 33 46C31.894531 46 31 46.894531 31 48C31 49.105469 31.894531 50 33 50C34.105469 50 35 49.105469 35 48C35 46.894531 34.105469 46 33 46 Z M 41 46C39.894531 46 39 46.894531 39 48C39 49.105469 39.894531 50 41 50C42.105469 50 43 49.105469 43 48C43 46.894531 42.105469 46 41 46Z\"/></svg>", an = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<svg width=\"800px\" height=\"800px\" viewBox=\"0 0 50 50\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-labelledby=\"title desc\">\n  <title id=\"title\">Animated shower</title>\n  <desc id=\"desc\">A shower head icon with animated falling water droplets.</desc>\n  <style>\n    .fixture {\n      fill: #111111;\n    }\n\n    .drop {\n      fill: #1597d3;\n      opacity: 0;\n      transform-box: fill-box;\n      transform-origin: center;\n      animation: fall 1.35s linear infinite;\n    }\n\n    .drop:nth-child(1) { animation-delay: 0s; }\n    .drop:nth-child(2) { animation-delay: .18s; }\n    .drop:nth-child(3) { animation-delay: .36s; }\n    .drop:nth-child(4) { animation-delay: .54s; }\n    .drop:nth-child(5) { animation-delay: .72s; }\n    .drop:nth-child(6) { animation-delay: .9s; }\n    .drop:nth-child(7) { animation-delay: 1.08s; }\n    .drop:nth-child(8) { animation-delay: .12s; }\n    .drop:nth-child(9) { animation-delay: .3s; }\n    .drop:nth-child(10) { animation-delay: .48s; }\n    .drop:nth-child(11) { animation-delay: .66s; }\n    .drop:nth-child(12) { animation-delay: .84s; }\n\n    @keyframes fall {\n      0% {\n        opacity: 0;\n        transform: translateY(-8px) scale(.72);\n      }\n      18% {\n        opacity: 1;\n      }\n      72% {\n        opacity: .95;\n      }\n      100% {\n        opacity: 0;\n        transform: translateY(8px) scale(1);\n      }\n    }\n\n    @media (prefers-reduced-motion: reduce) {\n      .drop {\n        opacity: 1;\n        animation: none;\n      }\n    }\n  </style>\n\n  <path class=\"fixture\" d=\"M22 0L22 7.28125C22.972656 7.109375 23.972656 7 25 7C26.027344 7 27.027344 7.109375 28 7.28125L28 0 Z M25 9C18.394531 9 12.871094 13.273438 11.40625 19L38.59375 19C37.128906 13.273438 31.605469 9 25 9 Z M10 21C8.347656 21 7 22.347656 7 24C7 25.652344 8.347656 27 10 27L40 27C41.652344 27 43 25.652344 43 24C43 22.347656 41.652344 21 40 21 Z\"/>\n\n  <g id=\"water\">\n    <circle class=\"drop\" cx=\"17\" cy=\"32\" r=\"2\"/>\n    <circle class=\"drop\" cx=\"25\" cy=\"32\" r=\"2\"/>\n    <circle class=\"drop\" cx=\"33\" cy=\"32\" r=\"2\"/>\n    <circle class=\"drop\" cx=\"13\" cy=\"40\" r=\"2\"/>\n    <circle class=\"drop\" cx=\"21\" cy=\"40\" r=\"2\"/>\n    <circle class=\"drop\" cx=\"29\" cy=\"40\" r=\"2\"/>\n    <circle class=\"drop\" cx=\"37\" cy=\"40\" r=\"2\"/>\n    <circle class=\"drop\" cx=\"9\" cy=\"48\" r=\"2\"/>\n    <circle class=\"drop\" cx=\"17\" cy=\"48\" r=\"2\"/>\n    <circle class=\"drop\" cx=\"25\" cy=\"48\" r=\"2\"/>\n    <circle class=\"drop\" cx=\"33\" cy=\"48\" r=\"2\"/>\n    <circle class=\"drop\" cx=\"41\" cy=\"48\" r=\"2\"/>\n  </g>\n</svg>\n", on = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" style=\"color: inherit;\" role=\"img\" aria-labelledby=\"title desc\">\n  <title id=\"title\">Closing shutter</title>\n  <desc id=\"desc\">A blue shutter smoothly closes from twenty percent closed to fully closed.</desc>\n  <style>\n    .shade-closing {\n      transform-box: view-box;\n      transform-origin: 0 4.021px;\n      transform: scaleY(3.943322);\n    }\n\n    .rail-closing {\n      transform: translateY(12.827px);\n    }\n\n    svg[data-orbit-animate=\"true\"] .shade-closing {\n      animation: shade-closing 5s cubic-bezier(0.4, 0, 0.2, 1) forwards;\n    }\n\n    svg[data-orbit-animate=\"true\"] .rail-closing {\n      animation: rail-closing 5s cubic-bezier(0.4, 0, 0.2, 1) forwards;\n    }\n\n    @keyframes shade-closing {\n      from { transform: scaleY(1); }\n      to   { transform: scaleY(3.943322); }\n    }\n\n    @keyframes rail-closing {\n      from { transform: translateY(0); }\n      to   { transform: translateY(12.827px); }\n    }\n  </style>\n\n  <g fill=\"currentColor\" shape-rendering=\"geometricPrecision\">\n    <!-- Top housing -->\n    <path fill-rule=\"evenodd\"\n      d=\"M2.42 2H21.58V3.707H2.42Z M2.991 2.273H6.173V3.359H2.991Z M3.194 2.476H5.97V3.157H3.194Z\"/>\n\n    <!-- Fabric/shade -->\n    <rect class=\"shade-closing\" x=\"2.651\" y=\"4.021\" width=\"18.698\" height=\"4.358\"/>\n\n    <!-- Bottom rail -->\n    <rect class=\"rail-closing\" x=\"2.42\" y=\"8.694\" width=\"19.16\" height=\"0.479\"/>\n  </g>\n</svg>\n", sn = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" style=\"color: inherit;\" role=\"img\" aria-labelledby=\"title desc\">\n  <title id=\"title\">Opening shutter</title>\n  <desc id=\"desc\">A blue shutter smoothly opens from fully closed to twenty percent closed.</desc>\n  <style>\n    .shade-opening {\n      transform-box: view-box;\n      transform-origin: 0 4.021px;\n      transform: scaleY(0.253593);\n    }\n\n    .rail-opening {\n      transform: translateY(-12.827px);\n    }\n\n    svg[data-orbit-animate=\"true\"] .shade-opening {\n      animation: shade-opening 5s cubic-bezier(0.4, 0, 0.2, 1) forwards;\n    }\n\n    svg[data-orbit-animate=\"true\"] .rail-opening {\n      animation: rail-opening 5s cubic-bezier(0.4, 0, 0.2, 1) forwards;\n    }\n\n    @keyframes shade-opening {\n      from { transform: scaleY(1); }\n      to   { transform: scaleY(0.253593); }\n    }\n\n    @keyframes rail-opening {\n      from { transform: translateY(0); }\n      to   { transform: translateY(-12.827px); }\n    }\n  </style>\n\n  <g fill=\"currentColor\" shape-rendering=\"geometricPrecision\">\n    <!-- Top housing -->\n    <path fill-rule=\"evenodd\"\n      d=\"M2.42 2H21.58V3.707H2.42Z M2.991 2.273H6.173V3.359H2.991Z M3.194 2.476H5.97V3.157H3.194Z\"/>\n\n    <!-- Fabric/shade -->\n    <rect class=\"shade-opening\" x=\"2.651\" y=\"4.021\" width=\"18.698\" height=\"17.185\"/>\n\n    <!-- Bottom rail -->\n    <rect class=\"rail-opening\" x=\"2.42\" y=\"21.521\" width=\"19.16\" height=\"0.479\"/>\n  </g>\n</svg>\n", cn = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"120\" height=\"120\" fill=\"currentColor\">\n\n  <style>\n    .swirl {\n      transform-origin: 12px 14px;\n      animation: wash 1.5s ease-in-out infinite;\n    }\n\n    @keyframes wash {\n      0%,100% { transform: rotate(0deg); }\n      25%     { transform: rotate(-20deg); }\n      75%     { transform: rotate(20deg); }\n    }\n  </style>\n\n  <!-- machine -->\n  <path\n    fill=\"currentColor\"\n    d=\"M6,2H18A2,2 0 0,1 20,4V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V4A2,2 0 0,1 6,2\n       M7,4A1,1 0 0,0 6,5A1,1 0 0,0 7,6A1,1 0 0,0 8,5A1,1 0 0,0 7,4\n       M10,4A1,1 0 0,0 9,5A1,1 0 0,0 10,6A1,1 0 0,0 11,5A1,1 0 0,0 10,4\n       M12,8A6,6 0 0,0 6,14A6,6 0 0,0 12,20A6,6 0 0,0 18,14A6,6 0 0,0 12,8Z\" />\n\n  <!-- animated inner swirl -->\n  <path\n    class=\"swirl\"\n    fill=\"currentColor\"\n    d=\"M14.83,11.17\n       C16.39,12.73 16.39,15.27 14.83,16.83\n       C13.27,18.39 10.73,18.39 9.17,16.83\n       L14.83,11.17\" />\n</svg>", ln = [
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
], un = Object.freeze({
	"fan.svg": Zt,
	"garage-door_closed.svg": Qt,
	"garage-door_open.svg": $t,
	"motion_detected.svg": en,
	"motion_off.svg": tn,
	"motion_on.svg": nn,
	"shower_off.svg": rn,
	"shower_on.svg": an,
	"shutter-closing.svg": on,
	"shutter-opening.svg": sn,
	"washing-machine-running.svg": cn
});
function dn(e) {
	return e?.startsWith("orbit:") && un[decodeURIComponent(e.slice(6).split("?")[0])] || "";
}
//#endregion
//#region src/common/helpers/icons.js
function fn(e, t) {
	let n = this._config.accent_color || "theme";
	return t ? n === "light" ? this._getEntityColor(e) || this._computeFullColor("theme") : this._computeFullColor(n) : this._computeIconColor(n);
}
function pn(e) {
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
function mn(e) {
	if (!e) return !1;
	let t = e.split("?")[0].toLowerCase();
	return t.endsWith(".svg") || t.endsWith(".png") || t.endsWith(".webp") || t.endsWith(".gif");
}
function hn(e) {
	return e ? e.startsWith("orbit:") ? e : e.startsWith("local:") ? `/local/icons/${e.slice(6)}` : e.startsWith("/") || e.startsWith("http") ? e : `/local/icons/${e}` : "";
}
function L(e, t = {}) {
	if (!e) return "";
	let n = t.forceColor !== !1, r = t.animate === !0, i = [
		e,
		n ? "forced" : "auto",
		r ? "animated" : "static"
	].join("::"), a = this.constructor.svgCache, o = a[i];
	if (typeof o == "string" && o !== "loading") return o;
	if (o === "loading") return yn(i, this), "";
	let s = dn(e);
	if (s) {
		let e = _n(s, n, r);
		return a[i] = e, e;
	}
	return a[i] = "loading", yn(i, this), xn(e).then((e) => {
		if (!e.ok) throw Error(`HTTP ${e.status}`);
		return e.text();
	}).then((e) => {
		e = _n(e, n, r), a[i] = e, bn(i);
	}).catch((t) => {
		console.error("SVG load failed:", e, t), delete a[i], bn(i);
	}), "";
}
function gn(e, t) {
	return !e || !t ? !0 : e[`${t}_svg_color_override`] !== !1;
}
function _n(e, t, n = !1) {
	let r = e.replace(/<svg\b[^>]*>/i, (e) => {
		let t = e.replace(/\swidth="[^"]*"/i, " width=\"100%\"").replace(/\sheight="[^"]*"/i, " height=\"100%\"");
		return n && (t = t.replace(/^<svg\b/i, "<svg data-orbit-animate=\"true\"")), t;
	});
	return t ? r.replace(/fill="(?!none|transparent|currentColor|inherit|initial|unset|url\()[^"]*"/gi, "fill=\"currentColor\"").replace(/stroke="(?!none|transparent|currentColor|inherit|initial|unset|url\()[^"]*"/gi, "stroke=\"currentColor\"").replace(/fill:\s*(?!none|transparent|currentColor|inherit|initial|unset|url\()[^;"]+/gi, "fill:currentColor").replace(/stroke:\s*(?!none|transparent|currentColor|inherit|initial|unset|url\()[^;"]+/gi, "stroke:currentColor") : r;
}
var vn = {};
function yn(e, t) {
	t && (vn[e] = vn[e] || /* @__PURE__ */ new Set(), vn[e].add(t));
}
function bn(e) {
	let t = vn[e];
	t && (delete vn[e], requestAnimationFrame(() => {
		t.forEach((e) => {
			e.isConnected && e.requestUpdate();
		});
	}));
}
function xn(e) {
	return fetch(e).then((t) => t.ok ? t : fetch(e, { cache: "reload" }));
}
//#endregion
//#region src/common/helpers/long-press.js
function Sn(e, t, n) {
	n && (e.stopPropagation(), this._cancelLongPress(), this._longPressTriggered = !1, this._longPressTimer = setTimeout(() => {
		this._longPressTriggered = !0, this._handleAction(n, t);
	}, this._LONG_PRESS_DELAY));
}
function Cn() {
	this._longPressTimer &&= (clearTimeout(this._longPressTimer), null);
}
function wn(e) {
	return this._cancelLongPress(), this._longPressTriggered ? (e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation && e.stopImmediatePropagation(), !0) : !1;
}
//#endregion
//#region src/common/helpers/updates.js
function Tn(e, t, n = {}) {
	if (!e.has("hass") || e.has("_config") || [...e.keys()].some((e) => e !== "hass") || n.hasTemplates) return !0;
	let r = e.get("hass"), i = this.hass;
	if (!r || !i) return !0;
	let a = [...new Set(t.filter(Boolean))];
	return !a.length && !n.includeZones ? !1 : a.some((e) => r.states?.[e] !== i.states?.[e]) ? !0 : n.includeZones ? Dn(r, i) : !1;
}
function En(e) {
	return Object.keys(e || {}).some((e) => e.endsWith("_template"));
}
function Dn(e, t) {
	return [...new Set([...Object.keys(e.states || {}), ...Object.keys(t.states || {})].filter((e) => e.startsWith("zone.")))].some((n) => e.states?.[n] !== t.states?.[n]);
}
//#endregion
//#region src/common/helpers/suggestions.js
function On(e = "") {
	return e.split(".")[0] || "";
}
function kn(e, t) {
	let n = e?.entities?.[t];
	if (n?.area_id) return n.area_id;
	let r = n?.device_id;
	return r && e?.devices?.[r]?.area_id || "";
}
function An(e, t) {
	let n = e?.states?.[t]?.state;
	return n !== "" && Number.isFinite(Number(n));
}
//#endregion
//#region src/common/helpers/svg-cache.js
var R = {}, jn = {
	automation: "automation.trigger",
	button: "button.press",
	input_button: "input_button.press",
	scene: "scene.turn_on",
	script: "script.turn_on"
}, Mn = new Set([
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
function Nn(e, t = "more-info") {
	let n = e?.split(".")[0];
	if (!n) return { action: t };
	let r = jn[n];
	return r ? {
		action: "call-service",
		service: r,
		service_data: { entity_id: e }
	} : Mn.has(n) ? { action: "toggle" } : { action: t };
}
//#endregion
//#region src/cards/area/helpers/lifecycle.js
function Pn(e) {
	if (!e.has("_config") && !e.has("hass") && !e.has("_templateRevision")) return;
	this._cardName = this._getCardName("");
	let t = this._config.main_entity || this._config.entity, n = this._config.area, r = t && this.hass ? this.hass.states[t] : null, i = r ? this._getEntityActiveState(r) : !1;
	this._iconColor = this._getMainIconColor(r, i);
	let a = this._config.main_entity_icon, o = this._config.main_entity_icon_on, s = this._config.main_entity_icon_off, c = $n(this._config, n, t), l = c === "custom", u = n && this.hass?.areas?.[n] && this.hass.areas[n].icon || "mdi:sofa", d = l && ((i ? o : s) || a) || "";
	this._mainStateObj = r, this._useNativeMainIcon = !!r && c !== "area" && !d;
	let f = l && i && o ? "main_entity_icon_on" : l && !i && s ? "main_entity_icon_off" : l && a ? "main_entity_icon" : "";
	this._icon = d || u, this._iconSvgForceColor = f ? this._getSvgColorOverride(f) : !0, this._statusItems = Fn.call(this), this._buttonModels = zn.call(this), this._curveButtonModels = Bn.call(this), this._actionButtonModel = Vn.call(this);
}
function Fn() {
	return [
		1,
		2,
		3
	].map((e) => {
		let t = this._config[`status${e}`];
		if (!t) return null;
		let n = this.hass?.states[t], r = `status${e}`, i = this._config[`${r}_icon`] || "", a = Ln.call(this, r, t), o = a === "custom" ? i : "";
		return {
			entityId: t,
			stateObj: n,
			useStateIcon: a === "entity" && !!n,
			text: Rn.call(this, n, this._config[`status${e}_decimal_places`]),
			icon: o,
			iconPath: this._isImageIcon(o) ? this._resolveIconPath(o) : "",
			isImage: this._isImageIcon(o),
			isHaIcon: In(o)
		};
	}).filter(Boolean);
}
function In(e) {
	return /^[a-z0-9_-]+:/i.test(e || "");
}
function Ln(e, t = "") {
	let n = this._config?.[`${e}_icon_source`], r = !!(t || this._config?.[e]);
	return n === "custom" ? "custom" : n === "none" ? "none" : n === "entity" && r ? "entity" : this._config?.[`${e}_icon`] ? "custom" : "none";
}
function Rn(e, t) {
	if (!e) return "—";
	if (t === void 0 || t === "") return this.formatState(e);
	let n = Number(t), r = Number(e.state);
	if (!Number.isFinite(n) || !Number.isFinite(r)) return this.formatState(e);
	let i = e.attributes.unit_of_measurement || "";
	return `${r.toFixed(Math.max(0, n))}${i}`;
}
function zn() {
	return [
		this._config.button1,
		this._config.button2,
		this._config.button3,
		this._config.button4
	].filter(Boolean).map((e, t) => Hn.call(this, "button", e, t, {
		defaultAction: { action: "toggle" },
		defaultHoldAction: { action: "more-info" },
		getIconColor: qn,
		getBackgroundColor: Kn
	})).filter(Boolean);
}
function Bn() {
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
		let i = Hn.call(this, "curve_button", t, r, {
			defaultAction: { action: "more-info" },
			defaultHoldAction: null,
			getIconColor: Xn,
			getBackgroundColor: null
		});
		return i ? (i.position = e ? r : n.indexOf(t), i) : null;
	}).filter(Boolean);
}
function Vn() {
	let e = this._config.action_button;
	return e ? Hn.call(this, "action_button", e, 0, {
		key: "action_button",
		defaultAction: Nn(e),
		defaultHoldAction: null,
		getIconColor: Zn,
		getBackgroundColor: null
	}) : null;
}
function Hn(e, t, n, r) {
	let i = this.hass?.states[t];
	if (!i) return null;
	let a = r.key || `${e}${n + 1}`, o = this._config?.[`${a}_state_template`], s = this._evaluateStateTemplate(o, t), c = o ? I(s) : this._getEntityActiveState(i), l = Gn.call(this, a, t), u = Wn.call(this, a, c), d = this._isImageIcon(u), f = this._buttonIconStates?.get(a), p = !!(f && f.entityId === t && f.isOn !== c);
	return this._buttonIconStates ||= /* @__PURE__ */ new Map(), this._buttonIconStates.set(a, {
		entityId: t,
		isOn: c
	}), {
		entityId: t,
		stateObj: i,
		useStateIcon: !!i && (l === "entity" || !u),
		holdAction: this._config?.[`${a}_hold_action`] || r.defaultHoldAction,
		doubleTapAction: this._config?.[`${a}_double_tap_action`] || null,
		tapAction: this._config?.[`${a}_tap_action`] || r.defaultAction,
		backgroundColor: r.getBackgroundColor ? r.getBackgroundColor.call(this, a, i, c) : "",
		icon: u,
		iconColor: r.getIconColor.call(this, a, i, c),
		iconPath: d ? this._resolveIconPath(u) : "",
		svgForceColor: Un.call(this, a, c),
		animateIcon: p,
		isImage: d
	};
}
function Un(e, t) {
	if (Gn.call(this, e) !== "custom") return !0;
	let n = this._config?.[`${e}_icon`], r = t && this._config?.[`${e}_icon_on`] ? `${e}_icon_on` : !t && this._config?.[`${e}_icon_off`] ? `${e}_icon_off` : n ? `${e}_icon` : "";
	return r ? this._getSvgColorOverride(r) : !0;
}
function Wn(e, t) {
	let n = this._config?.[`${e}_icon`], r = this._config?.[`${e}_icon_on`], i = this._config?.[`${e}_icon_off`];
	return Gn.call(this, e) === "entity" ? "" : (t ? r : i) || n || "";
}
function Gn(e, t = "") {
	let n = this._config?.[`${e}_icon_source`], r = !!(t || this._config?.[e]);
	return n === "custom" ? "custom" : n === "entity" && r ? "entity" : this._config?.[`${e}_icon`] || this._config?.[`${e}_icon_on`] || this._config?.[`${e}_icon_off`] ? "custom" : "entity";
}
function Kn(e, t, n) {
	if (n) return this._computeButtonBackground(Jn.call(this, e, t));
	let r = this._config[`${e}_off_color`] || "theme";
	return !r || r === "theme" ? "rgba(var(--color-theme),0.05)" : ht(r, 10);
}
function qn(e, t, n) {
	if (n) return this._computeFullColor(Jn.call(this, e, t));
	let r = this._config[`${e}_off_color`] || "theme";
	return r.startsWith("rgba(") ? r : this._computeIconColor(r);
}
function Jn(e, t) {
	let n = this._config[`${e}_on_color`] || "theme";
	return n === "light" ? this._getEntityColor(t) || this._config.accent_color || "theme" : n;
}
function Yn(e, t, n) {
	let r = this._config.accent_color || "theme";
	return r === "theme" ? n ? "rgba(var(--color-theme),0.7)" : "rgba(var(--color-theme),0.2)" : n ? this._computeFullColor(r) : ht(r, 40);
}
function Xn(e, t, n) {
	let r = n ? this._config[`${e}_on_color`] : this._config[`${e}_off_color`];
	return r && r !== "theme" ? Qn.call(this, e, t, n, r) : Yn.call(this, e, t, n);
}
function Zn(e, t, n) {
	let r = n ? this._config[`${e}_on_color`] : this._config[`${e}_off_color`];
	return r && r !== "theme" ? Qn.call(this, e, t, n, r) : Yn.call(this, e, t, n);
}
function Qn(e, t, n, r) {
	return n ? qn.call(this, e, t, !0) : r.startsWith("rgba(") ? r : ht(r, 40);
}
function $n(e = {}, t, n) {
	let r = e.main_entity_icon_source, i = !!t, a = !!n;
	return r === "custom" ? r : r === "area" && i ? "area" : r === "entity" && a ? "entity" : i ? "area" : a ? "entity" : "area";
}
//#endregion
//#region node_modules/lit-html/directive.js
var er = {
	ATTRIBUTE: 1,
	CHILD: 2,
	PROPERTY: 3,
	BOOLEAN_ATTRIBUTE: 4,
	EVENT: 5,
	ELEMENT: 6
}, tr = (e) => (...t) => ({
	_$litDirective$: e,
	values: t
}), nr = class {
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
}, rr = class extends nr {
	constructor(e) {
		if (super(e), this.it = D, e.type !== er.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
	}
	render(e) {
		if (e === D || e == null) return this._t = void 0, this.it = e;
		if (e === E) return e;
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
rr.directiveName = "unsafeHTML", rr.resultType = 1;
var z = tr(rr);
//#endregion
//#region src/cards/area/renders/buttons.js
function ir(e) {
	return e ? T`
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
        ${e.isImage ? T`
              <div
                class="button-image-icon"
                style="color:${e.iconColor};"
              >
                ${e.iconPath ? z(this._getInlineSvg(e.iconPath, e.svgForceColor, e.animateIcon)) : ""}
              </div>
            ` : e.useStateIcon && e.stateObj ? T`
                <ha-state-icon
                  .stateObj=${e.stateObj}
                  style="color:${e.iconColor};"
                ></ha-state-icon>
              ` : T`
              <ha-icon
                .icon=${e.icon}
                style="color:${e.iconColor};"
              ></ha-icon>
            `}
        ${Xt(e.stateObj) ? T`
              <ha-tile-badge
                class="entity-unavailable-badge"
                title="Unavailable"
                aria-label="Unavailable"
              >
                <ha-icon .icon=${"mdi:exclamation-thick"}></ha-icon>
              </ha-tile-badge>
            ` : ""}
      </button>
    ` : null;
}
//#endregion
//#region src/cards/area/renders/area-card.js
function ar() {
	let e = this._buttonModels || [], t = this._isImageIcon(this._icon) ? this._resolveIconPath(this._icon) : "", n = t ? this._getInlineSvg(t, this._iconSvgForceColor) : "";
	return T`
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
              ${or.call(this)}
            </div>
          </div>

          ${e.length ? T`
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
            ${this._isImageIcon(this._icon) ? T`
                  <div
                    class="main-image-icon"
                    style="color:${this._iconColor};"
                  >
                    ${n ? z(n) : T`<img src=${t} alt="" />`}
                  </div>
                ` : this._useNativeMainIcon && this._mainStateObj ? T`
                    <ha-state-icon
                      class="main-icon"
                      .stateObj=${this._mainStateObj}
                      style="color:${this._iconColor}"
                    ></ha-state-icon>
                  ` : T`
                  <ha-icon
                    class="main-icon"
                    .icon=${this._icon}
                    style="color:${this._iconColor}"
                  ></ha-icon>
                `}

            ${Xt(this._mainStateObj) ? T`
                  <ha-tile-badge
                    class="entity-unavailable-badge"
                    title="Unavailable"
                    aria-label="Unavailable"
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
function or() {
	let e = this._statusItems || [];
	if (!e.length) return this._statusText || "";
	let t = this._config?.status_separator || "|";
	return e.map((e, n) => T`
    ${n > 0 ? T`
          <span class="status-separator">
            ${t}
          </span>
        ` : ""}
    <span class="status-item">
      ${sr.call(this, e)}
      <span>${e.text}</span>
    </span>
  `);
}
function sr(e) {
	return !e.icon && !e.useStateIcon ? "" : e.isImage ? T`
      <span class="status-prefix-icon status-prefix-image">
        ${e.iconPath ? z(this._getInlineSvg(e.iconPath, !0)) : ""}
      </span>
    ` : e.useStateIcon && e.stateObj ? T`
      <ha-state-icon
        class="status-prefix-icon"
        .stateObj=${e.stateObj}
      ></ha-state-icon>
    ` : e.isHaIcon ? T`
      <ha-icon
        class="status-prefix-icon"
        .icon=${e.icon}
      ></ha-icon>
    ` : T`
    <span class="status-prefix-text">
      ${e.icon}
    </span>
  `;
}
//#endregion
//#region node_modules/lit-html/directive-helpers.js
var { I: cr } = Ie, lr = (e) => e, ur = () => document.createComment(""), dr = (e, t, n) => {
	let r = e._$AA.parentNode, i = t === void 0 ? e._$AB : t._$AA;
	if (n === void 0) n = new cr(r.insertBefore(ur(), i), r.insertBefore(ur(), i), e, e.options);
	else {
		let t = n._$AB.nextSibling, a = n._$AM, o = a !== e;
		if (o) {
			let t;
			n._$AQ?.(e), n._$AM = e, n._$AP !== void 0 && (t = e._$AU) !== a._$AU && n._$AP(t);
		}
		if (t !== i || o) {
			let e = n._$AA;
			for (; e !== t;) {
				let t = lr(e).nextSibling;
				lr(r).insertBefore(e, i), e = t;
			}
		}
	}
	return n;
}, B = (e, t, n = e) => (e._$AI(t, n), e), fr = {}, pr = (e, t = fr) => e._$AH = t, mr = (e) => e._$AH, hr = (e) => {
	e._$AR(), e._$AA.remove();
}, gr = (e, t, n) => {
	let r = /* @__PURE__ */ new Map();
	for (let i = t; i <= n; i++) r.set(e[i], i);
	return r;
}, _r = tr(class extends nr {
	constructor(e) {
		if (super(e), e.type !== er.CHILD) throw Error("repeat() can only be used in text expressions");
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
		let i = mr(e), { values: a, keys: o } = this.dt(t, n, r);
		if (!Array.isArray(i)) return this.ut = o, a;
		let s = this.ut ??= [], c = [], l, u, d = 0, f = i.length - 1, p = 0, m = a.length - 1;
		for (; d <= f && p <= m;) if (i[d] === null) d++;
		else if (i[f] === null) f--;
		else if (s[d] === o[p]) c[p] = B(i[d], a[p]), d++, p++;
		else if (s[f] === o[m]) c[m] = B(i[f], a[m]), f--, m--;
		else if (s[d] === o[m]) c[m] = B(i[d], a[m]), dr(e, c[m + 1], i[d]), d++, m--;
		else if (s[f] === o[p]) c[p] = B(i[f], a[p]), dr(e, i[d], i[f]), f--, p++;
		else if (l === void 0 && (l = gr(o, p, m), u = gr(s, d, f)), l.has(s[d])) if (l.has(s[f])) {
			let t = u.get(o[p]), n = t === void 0 ? null : i[t];
			if (n === null) {
				let t = dr(e, i[d]);
				B(t, a[p]), c[p] = t;
			} else c[p] = B(n, a[p]), dr(e, i[d], n), i[t] = null;
			p++;
		} else hr(i[f]), f--;
		else hr(i[d]), d++;
		for (; p <= m;) {
			let t = dr(e, c[m + 1]);
			B(t, a[p]), c[p++] = t;
		}
		for (; d <= f;) {
			let e = i[d++];
			e !== null && hr(e);
		}
		return this.ut = o, pr(e, c), E;
	}
});
//#endregion
//#region src/cards/area/renders/curve-buttons.js
function vr() {
	let e = this._curveButtonModels || [], t = this._actionButtonModel;
	return T`
      <div class="curve-buttons">

        ${_r(e, (e, t) => t, (e) => e.empty ? T`
              <div class="curve-button pos-${e.position}"></div>
            ` : T`
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
              ${e.isImage ? T`
                    <div
                      class="curve-image-icon"
                      style="color:${e.iconColor};"
                    >
                      ${z(this._getInlineSvg(e.iconPath, e.svgForceColor, e.animateIcon))}
                    </div>
                  ` : e.useStateIcon && e.stateObj ? T`
                      <ha-state-icon
                        .stateObj=${e.stateObj}
                        style="color:${e.iconColor};"
                      ></ha-state-icon>
                    ` : T`
                    <ha-icon
                      .icon=${e.icon}
                      style="color:${e.iconColor};"
                    ></ha-icon>
                  `}
              ${br(e.stateObj)}
            </button>
          `)}

      ${t ? yr.call(this, t) : ""}

      </div>
    `;
}
function yr(e) {
	return T`
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
      ${e.isImage ? T`
            <div
              class="curve-image-icon"
              style="color:${e.iconColor};"
            >
              ${z(this._getInlineSvg(e.iconPath, e.svgForceColor, e.animateIcon))}
            </div>
          ` : e.useStateIcon && e.stateObj ? T`
              <ha-state-icon
                .stateObj=${e.stateObj}
                style="color:${e.iconColor};"
              ></ha-state-icon>
            ` : T`
            <ha-icon
              .icon=${e.icon}
              style="color:${e.iconColor};"
            ></ha-icon>
          `}
      ${br(e.stateObj)}
    </button>
  `;
}
function br(e) {
	return Xt(e) ? T`
        <ha-tile-badge
          class="entity-unavailable-badge"
          title="Unavailable"
          aria-label="Unavailable"
        >
          <ha-icon .icon=${"mdi:exclamation-thick"}></ha-icon>
        </ha-tile-badge>
      ` : "";
}
//#endregion
//#region src/common/styles/header.js
var xr = d`
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
`, Sr = d`
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
`, Cr = d`
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
`, wr = d`
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
`, Tr = d`
  ha-card {
    aspect-ratio: 1 / 1;
  }

  .container {
    --button-area-width: clamp(46px, 23.5cqw, 210px);
  }
`, Er = d`
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
`, Dr = d`
  .curve-buttons {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 4;
  }
`, Or = d`
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
`, kr = d`
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
`, Ar = d`
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
`, jr = d`
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
`, Mr = [
	Sr,
	xr,
	Cr,
	Tr,
	wr,
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
	Ar,
	jr,
	Er,
	Dr,
	Or,
	kr
];
//#endregion
//#region src/common/editor/helpers/icon.js
function V(e, t) {
	return Array.isArray(t) ? Nr(e, t.map((t) => V(e, t))) : e._t ? e._t(t) : t;
}
function Nr(e, t) {
	return (e?.hass?.locale?.language || e?.hass?.language || "en").toLowerCase().startsWith("en") ? t.map((e, t) => t === 0 ? e : Pr(e)).join(" ") : t.join(" ");
}
function Pr(e = "") {
	return e.replace(/^(\p{L})/u, (e) => e.toLocaleLowerCase());
}
function Fr(e) {
	if (!e) return !1;
	let t = e.split("?")[0].toLowerCase();
	return t.endsWith(".svg") || t.endsWith(".png") || t.endsWith(".gif") || t.endsWith(".webp");
}
function Ir(e) {
	return e ? e.startsWith("orbit:") ? e : e.startsWith("local:") ? `/local/icons/${e.slice(6)}` : e.startsWith("/") || e.startsWith("http") ? e : `/local/icons/${e}` : "";
}
function Lr(e, t, n) {
	let r = this._config?.[t] || "", i = `${this._iconPickerPrefix || "icon"}-${t}`, a = r && this._isImageIcon(r) ? "files" : "ha", o = this._iconPickerKey === i && this._iconPickerTab || a;
	return o === "files" && !this._orbitIconFilesLoading && !this._localIconFilesLoading && !(this._orbitIconFiles || []).length && !(this._localIconFiles || []).length && queueMicrotask(() => this._loadLocalIconFiles?.(r)), T`
    <div class="field">
      ${e ? T`<label>${V(this, e)}</label>` : ""}

      <div
        class="icon-picker-panel"
        @click=${(e) => e.stopPropagation()}
      >
        <div class="icon-tabs">
          <button
            type="button"
            class=${o === "ha" ? "active" : ""}
            @click=${() => {
		this._iconPickerKey = i, this._iconPickerTab = "ha";
	}}
          >
            ${V(this, "Icons")}
          </button>
          <button
            type="button"
            class=${o === "files" ? "active" : ""}
            @click=${() => {
		this._iconPickerKey = i, this._iconPickerTab = "files", this._loadLocalIconFiles?.(r);
	}}
          >
            ${V(this, "Files")}
          </button>
        </div>

        ${o === "files" ? Vr.call(this, t, r) : Br.call(this, t, r)}
      </div>
    </div>
  `;
}
function H({ label: e = "Icon", sourceKey: t = "main_entity_icon_source", entityKey: n = "main_entity", areaKey: r = "area", allowArea: i = !1, allowNone: a = !1, customIconKeys: o = [], renderCustom: s } = {}) {
	let c = Rr(this._config, {
		sourceKey: t,
		entityKey: n,
		areaKey: r,
		allowArea: i,
		allowNone: a,
		customIconKeys: o
	}), l = c === "custom", u = [
		a ? {
			label: V(this, "None"),
			value: "none"
		} : null,
		i ? {
			label: V(this, "Area"),
			value: "area"
		} : null,
		{
			label: V(this, "Entity"),
			value: "entity"
		},
		{
			label: V(this, "Custom"),
			value: "custom"
		}
	].filter(Boolean);
	return T`
    <div class="field main-entity-icon-source-field">
      <div class="field-header">
        <label>${V(this, e)}</label>

        <ha-selector
          class="main-entity-icon-source-selector"
          .hass=${this.hass}
          .selector=${{ button_toggle: { options: u } }}
          .value=${c}
          @value-changed=${(e) => {
		this._handleConfigUpdate(t, e.detail.value || (a ? "none" : "custom"));
	}}
        ></ha-selector>
      </div>

      ${l && s ? s.call(this) : ""}
    </div>
  `;
}
function Rr(e = {}, { sourceKey: t = "main_entity_icon_source", entityKey: n = "main_entity", areaKey: r = "area", allowArea: i = !1, allowNone: a = !1, customIconKeys: o = [] } = {}) {
	let s = e[t], c = i && !!e[r], l = !!(e[n] || e.entity), u = o.some((t) => !!e[t]);
	if (s === "custom") return "custom";
	if (s === "none" && a) return "none";
	if (s === "area" && c) return "area";
	if (s === "entity" && l) return "entity";
	if (i) {
		if (c) return "area";
		if (l) return "entity";
	}
	return u ? "custom" : a ? "none" : l ? "entity" : i ? "area" : "entity";
}
async function zr(e = "") {
	let t = oi(e);
	this._localIconFilesLoading = !0, this._orbitIconFilesLoading = !0, this.requestUpdate();
	let [n, r] = await Promise.all([$r(), ei()]);
	this._orbitIconFiles = ci(n), this._localIconFiles = ci([t?.source === "local" || !t?.source ? t : null, ...r]), this._orbitIconFilesLoading = !1, this._localIconFilesLoading = !1, this.requestUpdate();
}
function Br(e, t) {
	return T`
    <ha-icon-picker
      .hass=${this.hass}
      .value=${t && !this._isImageIcon(t) ? t : ""}
      @value-changed=${(t) => {
		this._handleConfigUpdate(e, t.detail.value || "");
	}}
    ></ha-icon-picker>
  `;
}
function Vr(e, t) {
	let n = this._orbitIconFiles || [], r = this._localIconFiles || [], i = Hr([...n, ...r]);
	return this._orbitIconFilesLoading || this._localIconFilesLoading ? T`
      <div class="icon-picker-note">${V(this, "Loading files...")}</div>
    ` : !n.length && !r.length ? T`
      <div class="icon-picker-note">
        ${V(this, "No files found. Add a local icon manifest at /local/icons/manifest.json or type the filename manually.")}
      </div>
    ` : T`
    <ha-generic-picker
      .value=${t && this._isImageIcon(t) ? t : ""}
      .getItems=${(e) => Wr(i, e)}
      .rowRenderer=${(e) => Gr.call(this, e)}
      .valueRenderer=${(e) => Kr.call(this, i.find((t) => t.id === e))}
      .notFoundLabel=${V(this, "No matching files")}
      .emptyLabel=${""}
      .noSort=${!0}
      @value-changed=${(t) => {
		t.stopPropagation(), this._handleConfigUpdate(e, t.detail.value || "");
	}}
    ></ha-generic-picker>
  `;
}
function Hr(e) {
	return ci(e).map((e) => {
		let t = si(e), n = Ur(e);
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
function Ur(e) {
	return `${e.source ? `${e.source}:` : ""}${(e.name || e.file || "").trim().replace(/\s+/g, "-")}`;
}
function Wr(e, t = "") {
	let n = t.trim().toLowerCase();
	return n ? e.filter((e) => Object.values(e.search_labels || {}).some((e) => String(e).toLowerCase().includes(n))) : e;
}
function Gr(e) {
	return T`
    <ha-combo-box-item type="button" compact>
      ${qr.call(this, e)}
      <span slot="headline">${e.primary}</span>
    </ha-combo-box-item>
  `;
}
function Kr(e) {
	return e ? T`
    ${qr.call(this, e)}
    <span slot="headline">${e.primary}</span>
  ` : "";
}
function qr(e) {
	return e?.iconFile ? T`
    <span
      slot="start"
      class="file-picker-preview"
      style=${Yr()}
    >
      ${Jr.call(this, e.iconFile)}
    </span>
  ` : "";
}
function Jr(e) {
	let t = si(e), n = this._resolveIconPath(t);
	if (!n) return T``;
	let r = this._getInlineSvg ? this._getInlineSvg(n) : "", i = this.hass?.themes?.darkMode ?? this.hass?.selectedTheme?.dark ?? !1, a = Yr(), o = Xr(i);
	return T`
    <span
      class="file-picker-preview-inner"
      style=${a}
    >
      ${r ? T`${z(Zr(r))}` : T`
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
function Yr() {
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
function Xr(e) {
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
function Zr(e) {
	if (!e) return "";
	let t = Qr(e.replace(/<\?xml[^>]*>/gi, "").trim()), n = t.match(/<svg\b[^>]*>/i)?.[0];
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
function Qr(e) {
	let t = "(?!none\\b|currentColor\\b|transparent\\b|inherit\\b|url\\()(?:rgb\\([^)]*\\)|rgba\\([^)]*\\)|hsl\\([^)]*\\)|hsla\\([^)]*\\)|[^\"';)]+)";
	return e.replace(RegExp(`\\s(fill|stroke)=(["'])${t}\\2`, "gi"), (e, t) => ` ${t}="currentColor"`).replace(RegExp(`(fill|stroke)\\s*:\\s*${t}`, "gi"), (e, t) => `${t}:currentColor`);
}
async function $r() {
	return ln.filter(ii).map((e) => ai(e, "orbit"));
}
async function ei() {
	let e = Array.isArray(window.ORBIT_ICON_FILES) ? window.ORBIT_ICON_FILES : [], t = await ti([
		"/local/icons/manifest.json",
		"/local/icons/orbit-icons.json",
		"/local/icons/icons.json"
	]), n = await ni();
	return [
		...e,
		...t,
		...n
	].filter(ii).map((e) => ai(e, "local"));
}
async function ti(e) {
	for (let t of e) try {
		let e = await fetch(t, { cache: "no-store" });
		if (!e.ok) continue;
		let n = await e.json(), r = Array.isArray(n) ? n : n.files;
		if (Array.isArray(r)) return r.filter(ii).map((e) => ai(e));
	} catch {}
	return [];
}
async function ni() {
	try {
		let e = await fetch("/local/icons/", { cache: "no-store" });
		return e.ok ? [...(await e.text()).matchAll(/href=["']([^"']+)["']/gi)].map((e) => e[1]) : [];
	} catch {
		return [];
	}
}
function ri(e) {
	return e ? (typeof e == "object" ? e.file : e).toString().split("?")[0].split("/").pop() : "";
}
function ii(e) {
	return Fr(ri(e));
}
function ai(e, t = "") {
	let n = ri(e);
	return n ? {
		file: n,
		name: typeof e == "object" && e.name || n,
		tags: Array.isArray(e?.tags) ? e.tags : [],
		source: e?.source || t
	} : null;
}
function oi(e) {
	if (!e || !ii(e)) return null;
	let t = ri(e);
	return t ? {
		file: t,
		name: t,
		tags: [],
		source: e?.toString().startsWith("orbit:") ? "orbit" : e?.toString().startsWith("local:") ? "local" : ""
	} : null;
}
function si(e) {
	return e.source === "orbit" ? `orbit:${e.file}` : e.source === "local" ? `local:${e.file}` : e.file;
}
function ci(e) {
	let t = /* @__PURE__ */ new Set();
	return e.filter(Boolean).filter((e) => {
		let n = `${e.source || ""}:${e.file}`;
		return t.has(n) ? !1 : (t.add(n), !0);
	}).sort((e, t) => (e.name || e.file).localeCompare(t.name || t.file));
}
//#endregion
//#region src/common/editor/helpers/inputs.js
function li(e, t) {
	return Array.isArray(t) ? ui(e, t.map((t) => li(e, t))) : e._t ? e._t(t) : t;
}
function ui(e, t) {
	return (e?.hass?.locale?.language || e?.hass?.language || "en").toLowerCase().startsWith("en") ? t.map((e, t) => t === 0 ? e : di(e)).join(" ") : t.join(" ");
}
function di(e = "") {
	return e.replace(/^(\p{L})/u, (e) => e.toLocaleLowerCase());
}
function fi(e, t, n, r = {}) {
	let i = r.externalLabel === !0, a = r.value ?? this._config?.[t] ?? "", o = r.onValueChanged || ((e) => this._handleConfigUpdate(t, e));
	return T`
      <div class="field">
        ${i ? T`<label>${li(this, e)}</label>` : ""}

        <ha-selector
          .hass=${this.hass}
          .label=${i ? "" : li(this, e)}
          .selector=${{ text: {} }}
          .value=${a}
          .placeholder=${n}
          @value-changed=${(e) => o(e.detail.value || "")}
        ></ha-selector>
      </div>
    `;
}
function pi(e, t, n = {}) {
	let r = n.value ?? this._config?.[t] ?? "", i = n.hideLabel === !0, a = n.onValueChanged || ((e) => this._handleConfigUpdate(t, e));
	return T`
      <div class="field">
        <ha-selector
          .hass=${this.hass}
          .label=${i ? "" : li(this, e)}
          .selector=${{ template: {} }}
          .value=${r}
          @value-changed=${(e) => a(e.detail.value || "")}
        ></ha-selector>
      </div>
    `;
}
function mi(e, t, n = {}) {
	let r = n.value ?? this._config?.[t] ?? "", i = n.min ?? 0, a = n.step ?? 1, o = n.onValueChanged || ((e) => this._handleConfigUpdate(t, e));
	return T`
    <div class="field">
      <ha-selector
        .hass=${this.hass}
        .label=${li(this, e)}
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
function hi(e, t) {
	let n = {
		...e || {},
		...t
	};
	return Object.keys(n).forEach((e) => {
		n[e] === void 0 && delete n[e];
	}), n;
}
function U(e, t = {}) {
	let n = { ...t };
	return e.forEach((e) => {
		n[e] = void 0;
	}), n;
}
function W(e, t = []) {
	return U([e, ...t]);
}
function gi(e, t = []) {
	return U([e, ...t.map((t) => `${e}${t}`)]);
}
//#endregion
//#region src/common/editor/helpers/labels.js
function G(e, t, n) {
	return Array.isArray(t) ? _i(e, t.map((t) => G(e, t, n))) : e._t ? e._t(t, n) : t;
}
function _i(e, t) {
	return (e?.hass?.locale?.language || e?.hass?.language || "en").toLowerCase().startsWith("en") ? t.map((e, t) => t === 0 ? e : vi(e)).join(" ") : t.join(" ");
}
function vi(e = "") {
	return e.replace(/^(\p{L})/u, (e) => e.toLocaleLowerCase());
}
//#endregion
//#region src/common/editor/helpers/color-picker.js
function yi(e, t, n) {
	let r = this._config?.[t] || "";
	return bi.call(this, e, t, r, (e) => this._handleConfigUpdate(t, e), n);
}
function bi(e, t, n, r, i) {
	Mi.call(this);
	let a = xi.call(this, n, i), o = $i(n || a), s = this._colorPickerKey === t && this._colorPickerTab || o;
	return T`
    <div class="field">
      <div class="color-row">
        <div
          class="color-popover"
          @click=${(e) => e.stopPropagation()}
        >
          <div class="color-tabs">
            <button
              type="button"
              class=${s === "picker" ? "active" : ""}
              @click=${() => {
		this._colorPickerKey = t, this._colorPickerTab = "picker", this._themeColorPickerOpen = !1;
		let e = n || a;
		if (e && !ea(e)) {
			let t = this._getColorPickerValue(e);
			t && r(t);
		}
	}}
            >
              ${G(this, "Color")}
            </button>
            <button
              type="button"
              class=${s === "theme" ? "active" : ""}
              @click=${() => {
		this._colorPickerKey = t, this._colorPickerTab = "theme", this._themeColorPickerOpen = !1, this._themeColorSearch = "";
	}}
            >
              ${G(this, "Theme")}
            </button>
          </div>

          ${s === "theme" ? T`
                ${Ci.call(this, e, n, r, a, t)}
              ` : T`
                ${Si.call(this, e, n, r, a)}
              `}
        </div>
      </div>
    </div>
  `;
}
function xi(e, t) {
	return t || e || "theme";
}
function Si(e, t, n, r = t) {
	let i = ea(t) ? this._getColorPickerValue(t) : "", a = i || (ea(t) ? this._getColorPickerValue(t) : this._getColorPickerValue(t || r)) || "#000000";
	return T`
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

      ${i ? T`
            <span
              class="native-color-picker-swatch"
              style=${`background-color:${i};`}
            ></span>
            <span class="native-color-picker-text">
              ${e ? T`
                    <span class="native-color-picker-label">
                      ${G(this, e)}
                    </span>
                  ` : ""}
              <span class="native-color-picker-value">
                ${i.toUpperCase()}
              </span>
            </span>
          ` : T`
            <span class="native-color-picker-empty-swatch"></span>
            <span class="native-color-picker-text">
              ${e ? T`
                    <span class="native-color-picker-label">
                      ${G(this, e)}
                    </span>
                  ` : ""}
              <span class="native-color-picker-value empty"></span>
            </span>
          `}

      ${i ? T`
            <button
              type="button"
              class="native-color-picker-clear"
              aria-label=${G(this, "Clear")}
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
function Ci(e, t, n, r = t, i = "") {
	let a = t || r, o = $i(a) === "theme" ? Ii(a) || "theme" : "", s = ji.call(this), c = wi.call(this, s, o);
	return T`
    <div
      class="theme-color-picker"
      @click=${(e) => e.stopPropagation()}
    >
      <ha-generic-picker
        .getItems=${Ti.call(this, i, c)}
        .label=${e ? G(this, e) : ""}
        .value=${o}
        .rowRenderer=${(e) => Ei.call(this, e)}
        .valueRenderer=${(e) => Di.call(this, c.find((t) => t.id === e))}
        .notFoundLabel=${G(this, "No matching colors")}
        .emptyLabel=${""}
        .noSort=${!0}
        @value-changed=${(e) => {
		e.stopPropagation(), n(e.detail.value || "");
	}}
      ></ha-generic-picker>
    </div>
  `;
}
function wi(e, t) {
	return !t || e.some((e) => e.id === t) ? e : [...e, Pi.call(this, {
		id: t,
		source: "theme"
	})];
}
function Ti(e, t) {
	this._themeColorItemGetters ||= /* @__PURE__ */ new Map();
	let n = this._themeColorItemGetters.get(e);
	return n ? n.items = t : (n = {
		items: t,
		getItems: () => n.items
	}, this._themeColorItemGetters.set(e, n)), n.getItems;
}
function Ei(e) {
	return T`
    <ha-combo-box-item type="button" compact>
      ${Oi.call(this, e)}
      <span slot="headline">${e.primary}</span>
      ${ki(e)}
    </ha-combo-box-item>
  `;
}
function Di(e) {
	return e ? T`
    ${Oi.call(this, e)}
    <span slot="headline">${e.primary}</span>
    ${ki(e)}
  ` : "";
}
function Oi(e) {
	return e.id === "theme" ? T`
      <ha-icon
        slot="start"
        class="theme-color-default-icon"
        icon="mdi:palette"
      ></ha-icon>
    ` : T`
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
function ki(e) {
	return e.isThemeColor ? T`
      <span
        slot="end"
        class="theme-source-badge theme-source-badge-theme"
        aria-label="Theme"
      >T</span>
    ` : e.isStandardFallback ? T`
        <span
          slot="end"
          class="theme-source-badge theme-source-badge-standard"
          aria-label="Standard"
        >S</span>
      ` : "";
}
function Ai() {
	let e = [], t = /* @__PURE__ */ new Set();
	for (let n of Qi) {
		let r = Pi.call(this, n);
		!r || t.has(r.id) || (t.add(r.id), e.push(r));
	}
	for (let n of Li.call(this)) {
		let r = Pi.call(this, n);
		!r || t.has(r.id) || (t.add(r.id), e.push(r));
	}
	return e;
}
function ji() {
	let e = Ni.call(this);
	if (this._themeColorItemsCache && this._themeColorItemsCacheKey === e) return this._themeColorItemsCache;
	let t = Ai.call(this);
	return this._themeColorItemsCache = t, this._themeColorItemsCacheKey = e, t;
}
function Mi() {
	let e = Ni.call(this);
	if (this._themeColorItemsCacheKey === e || this._themeColorWarmupScheduled === e) return;
	this._themeColorWarmupScheduled = e;
	let t = () => {
		this._themeColorWarmupScheduled === e && (ji.call(this), this._themeColorWarmupScheduled = "");
	};
	if (window.requestIdleCallback) {
		window.requestIdleCallback(t, { timeout: 500 });
		return;
	}
	window.setTimeout(t, 0);
}
function Ni() {
	return `${this?.hass?.locale?.language || this?.hass?.language || ""}|${this?.hass?.selectedTheme?.theme || this?.hass?.themes?.theme || ""}|${this?.hass?.themes?.darkMode ?? this?.hass?.selectedTheme?.dark ?? ""}|${Ri.call(this)}`;
}
function Pi(e) {
	let t = Fi(typeof e == "string" ? { id: e } : e), n = Ji(t.id), r = n && Yi(t.id), i = !r && (t.source === "theme" || Ki.call(this, t.id)), a = t.label ? G(this, t.label) : Xi.call(this, t.id);
	return {
		id: t.id,
		primary: a,
		secondary: n ? G(this, "Color") : G(this, "Theme"),
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
function Fi(e) {
	return {
		...e,
		id: Ii(e.id),
		label: e.label || null
	};
}
function Ii(e) {
	if (!e) return "";
	let t = e.toString().trim().toLowerCase().replace(/[^a-z0-9-_]/g, ""), n = t.startsWith("color-") ? t.slice(6) : t;
	return Zi[n] || n;
}
function Li() {
	return zi.call(this).map((e) => Hi(e)).filter(Ui).map((e) => ({
		id: e,
		source: "theme"
	})).sort((e, t) => Xi.call(this, e.id).localeCompare(Xi.call(this, t.id), this?.hass?.locale?.language || this?.hass?.language || void 0, { sensitivity: "base" }));
}
function Ri() {
	return Bi.call(this).map(([e, t]) => `${e}:${t}`).join(",");
}
function zi() {
	return Bi.call(this).map(([e]) => e).sort();
}
function Bi() {
	let e = /* @__PURE__ */ new Set(), t = [], n = Vi.call(this);
	for (let [r, i] of Object.entries(n)) {
		let n = r.toLowerCase();
		Wi(n, i) && (e.has(n) || (e.add(n), t.push([n, i])));
	}
	return t.sort(([e], [t]) => e.localeCompare(t));
}
function Vi() {
	let e = this?.hass?.selectedTheme?.theme || this?.hass?.themes?.theme || "", t = e ? this?.hass?.themes?.themes?.[e] : null;
	if (!t) return {};
	let { modes: n, ...r } = t, i = this?.hass?.themes?.darkMode ?? this?.hass?.selectedTheme?.dark ?? !1 ? n?.dark : n?.light;
	return {
		...r,
		...i || {}
	};
}
function Hi(e) {
	return e.startsWith("color-") ? e.slice(6) : e;
}
function Ui(e) {
	return !!e && !/^\d+$/.test(e);
}
function Wi(e, t) {
	return !e || !(e.startsWith("color-") || e.startsWith("google-") || e.endsWith("-color") || e.includes("-color-")) ? !1 : Gi(t);
}
function Gi(e) {
	let t = e == null ? "" : e.toString().trim();
	return t ? /^#[0-9a-f]{3,8}$/i.test(t) || /^(rgb|rgba|hsl|hsla)\(/i.test(t) || /^var\(\s*--[a-z0-9-_]*color[a-z0-9-_]*/i.test(t) || /^\d+\s*,\s*\d+\s*,\s*\d+/.test(t) : !1;
}
function Ki(e) {
	let t = new Set(zi.call(this));
	return qi(e).some((e) => t.has(e));
}
function qi(e) {
	let t = Ii(e);
	if (!t) return [];
	let n = t.startsWith("color-") ? t : `color-${t}`;
	return t.endsWith("-color") ? [t, n] : [n, t];
}
function Ji(e) {
	return e === "theme" || e === "primary-color" || e === "accent-color" || ct(e);
}
function Yi(e) {
	return ct(e) && !ut(e);
}
function Xi(e) {
	return e === "theme" ? G(this, "State color (default)") : e === "light" ? G(this, "State Light color") : e === "primary-color" ? G(this, "Primary") : e === "primary-text-color" ? G(this, "Primary text color") : e === "card-background-color" ? G(this, "Card background") : e === "secondary-background-color" ? G(this, "Secondary background color") : e === "accent-color" ? G(this, "Accent") : e.replaceAll("-", " ").replace(/\b\w/g, (e) => e.toUpperCase());
}
var Zi = {
	bluegrey: "blue-grey",
	darkgrey: "dark-grey",
	deeporange: "deep-orange",
	deeppurple: "deep-purple",
	lightblue: "light-blue",
	lightgreen: "light-green",
	lightgrey: "light-grey"
}, Qi = [
	{
		id: "theme",
		label: "State color (default)"
	},
	{
		id: "light",
		label: "State Light color"
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
function $i(e) {
	let t = e?.toString().trim();
	return t && ea(t) ? "picker" : "theme";
}
function ea(e) {
	let t = e?.toString().trim().toLowerCase();
	return !!(t && (t.startsWith("#") || t.startsWith("rgb") || t.startsWith("hsl")));
}
//#endregion
//#region src/common/editor/helpers/actions.js
function K(e, t) {
	return ra(e?.hass, t) || ia[t] || t;
}
function ta(e, t) {
	return aa(e?.hass, t) || t;
}
function na(e) {
	e.stopPropagation();
}
function ra(e, t) {
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
var ia = {
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
function aa(e, t) {
	if (!e?.localize || !t) return null;
	let n = oa[t] || [];
	for (let t of n) {
		let n = e.localize(t);
		if (n && n !== t) return n;
	}
	return null;
}
var oa = {
	content: ["ui.panel.lovelace.editor.card.markdown.content"],
	entity_id: ["ui.dialogs.entity_registry.editor.entity_id", "ui.panel.lovelace.unused_entities.entity_id"],
	path: ["ui.panel.lovelace.editor.action-editor.navigation_path", "ui.panel.lovelace.editor.edit_view.path"],
	service: ["ui.panel.developer-tools.tabs.actions.actions.call_service", "ui.panel.config.devices.type.service_heading"],
	title: ["ui.panel.lovelace.editor.edit_lovelace.title", "ui.panel.lovelace.dashboards.picker.headers.title"],
	url: ["ui.panel.lovelace.editor.action-editor.url_path"]
};
function sa(e, t, n, { extraActions: r = [] } = {}) {
	let i = this._config?.[t], a = typeof n == "object" ? n : { action: n || "none" }, o = i && typeof i == "object" ? ka(i, a) : a, s = o.action || a.action || "none", c = new Set(r.map((e) => e.id)), l = [...r, ...ba(this).filter((e) => !c.has(e.id))];
	return T`
    <div class="field action-field">
      <div class="action-picker">
        <ha-generic-picker
          .label=${G(this, e)}
          .value=${s}
          .getItems=${() => l}
          .rowRenderer=${(e) => xa(e)}
          .valueRenderer=${(e) => Sa(l.find((t) => t.id === e))}
          .notFoundLabel=${G(this, "No matching actions")}
          .noSort=${!0}
          @value-changed=${(e) => {
		e.stopPropagation();
		let n = ya(e) || "none";
		this._updateConfig({ [t]: Oa(this, n, o) }), this.requestUpdate?.();
	}}
        ></ha-generic-picker>
      </div>

      ${s === "navigate" ? wa.call(this, t, o) : ""}

      ${s === "call-service" ? Ta.call(this, t, o) : ""}

      ${s === "url" ? Ea.call(this, t, o) : ""}

      ${s === "popup" ? Da.call(this, t, o) : ""}
    </div>
  `;
}
function q({ interactions: e = [], title: t = "Interactions", expanded: n = !1, context: r = {}, config: i = this._config, onChange: a } = {}) {
	let o = e.filter(Boolean);
	if (!o.length) return "";
	let s = o.filter((e) => ca(i, e)), c = o.filter((e) => !s.includes(e)), l = [{
		name: "interactions",
		type: "expandable",
		flatten: !0,
		expanded: n,
		icon: "mdi:gesture-tap-button",
		schema: [...s.map((e) => la(e, r, i, this)), {
			name: "",
			type: "optional_actions",
			flatten: !0,
			schema: c.map((e) => la(e, r, i, this))
		}]
	}], u = ua(i, o);
	return T`
    <ha-form
      class="interactions-form"
      .hass=${this.hass}
      .data=${u}
      .schema=${l}
      .computeLabel=${(e) => fa(this, e, o, t)}
      @value-changed=${(e) => {
		e.stopPropagation();
		let t = da(e.detail.value || {}, o, i);
		a ? a(t) : this._updateConfig(t), this.requestUpdate?.();
	}}
    ></ha-form>
  `;
}
function ca(e = {}, t) {
	return t.defaultVisible && !ma(e?.[t.key]);
}
function la(e, t, n, r) {
	let i = pa(e.defaultAction), a = n?.[e.key];
	if (e.customDefaultLabel && !a) {
		let t = ha(i);
		return {
			name: e.formKey || e.key,
			selector: { select: {
				mode: "dropdown",
				options: [{
					value: "__default__",
					label: `${G(r, "Default")} (${G(r, e.customDefaultLabel)})`
				}, ...t.map((e) => ({
					value: e,
					label: K(r, e)
				}))]
			} }
		};
	}
	return {
		name: e.formKey || e.key,
		selector: { ui_action: {
			actions: ha(i),
			default_action: i
		} },
		...t ? { context: t } : {}
	};
}
function ua(e = {}, t) {
	return t.reduce((t, n) => {
		let r = n.formKey || n.key;
		if (n.customDefaultLabel && !e?.[n.key]) return t[r] = "__default__", t;
		let i = e?.[n.key] || (n.displayDefaultValue ? ga(n.defaultAction) : void 0);
		return i && typeof i == "object" && i.action !== "popup" && (!ma(i) || pa(n.defaultAction) !== "none") && (t[r] = _a(i)), t;
	}, {});
}
function da(e, t, n = {}) {
	return t.reduce((t, r) => {
		let i = r.formKey || r.key;
		if (r.customDefaultLabel && typeof e[i] == "string") return t[r.key] = e[i] === "__default__" ? void 0 : { action: e[i] }, t;
		let a = va(e[i], r.defaultAction);
		return t[r.key] = n?.[r.key]?.action === "popup" && !(i in e) ? n[r.key] : a, t;
	}, {});
}
function fa(e, t, n, r) {
	return t.name === "interactions" ? G(e, r) : G(e, n.find((e) => (e.formKey || e.key) === t.name)?.label || t.name);
}
function pa(e) {
	let t = typeof e == "string" ? e : e?.action || "none";
	return t === "call-service" ? "perform-action" : t;
}
function ma(e) {
	return e?.action === "none";
}
function ha(e) {
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
function ga(e) {
	return typeof e == "string" ? { action: e } : e || { action: "none" };
}
function _a(e) {
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
function va(e, t) {
	if (!(!e || typeof e != "object") && !(e.action === "none" && pa(t) === "none")) {
		if (e.action === "perform-action") {
			let t = {
				...e,
				action: "call-service",
				service: e.perform_action || e.service || ""
			};
			return e.data && !e.service_data && (t.service_data = e.data), delete t.perform_action, delete t.data, J(t);
		}
		return J(e);
	}
}
function ya(e) {
	let t = e.detail?.value ?? e.detail?.item?.id ?? e.target?.value ?? "";
	return typeof t == "object" ? t.id || t.value || "" : t;
}
function ba(e) {
	return [
		{
			id: "toggle",
			primary: K(e, "toggle"),
			icon: "mdi:toggle-switch"
		},
		{
			id: "more-info",
			primary: K(e, "more-info"),
			icon: "mdi:information-outline"
		},
		{
			id: "navigate",
			primary: K(e, "navigate"),
			icon: "mdi:arrow-right"
		},
		{
			id: "call-service",
			primary: K(e, "perform-action"),
			icon: "mdi:flash"
		},
		{
			id: "url",
			primary: K(e, "url"),
			icon: "mdi:open-in-new"
		},
		{
			id: "popup",
			primary: K(e, "popup"),
			icon: "mdi:window-open"
		},
		{
			id: "none",
			primary: K(e, "none"),
			icon: "mdi:close-circle-outline"
		}
	];
}
function xa(e) {
	return T`
    <ha-combo-box-item type="button" compact>
      ${Ca(e)}
      <span slot="headline">${e.primary}</span>
    </ha-combo-box-item>
  `;
}
function Sa(e) {
	return e ? T`
    ${Ca(e)}
    <span slot="headline">${e.primary}</span>
  ` : "";
}
function Ca(e) {
	return T`
    <ha-icon
      slot="start"
      .icon=${e.icon}
    ></ha-icon>
  `;
}
function wa(e, t) {
	return installEntityFilterScrollGuard(), T`
    <div class="inline-field action-subfield">
      <ha-navigation-picker
        @click=${na}
        @pointerdown=${na}
        @wheel=${na}
        @touchmove=${na}
        @picker-opened=${(e) => {
		e.currentTarget.__orbitSuppressSectionScroll = !0;
	}}
        .hass=${this.hass}
        .value=${t.navigation_path || ""}
        @value-changed=${(n) => {
		n.stopPropagation(), this._updateConfig({ [e]: J({
			...t,
			navigation_path: n.detail.value || ""
		}) });
	}}
      ></ha-navigation-picker>
    </div>
  `;
}
function Ta(e, t) {
	let n = {
		action: t.perform_action || t.service || "",
		...t.data || t.service_data ? { data: t.data || t.service_data } : {},
		...t.target ? { target: t.target } : {}
	};
	return T`
    <div class="inline-field action-subfield">
      <ha-service-control
        .hass=${this.hass}
        .value=${n}
        narrow
        @value-changed=${(n) => {
		n.stopPropagation();
		let r = n.detail.value || {};
		this._updateConfig({ [e]: J({
			...t,
			service: r.action || "",
			service_data: r.data,
			target: r.target
		}) });
	}}
      ></ha-service-control>
    </div>
  `;
}
function Ea(e, t) {
	return T`
    <div class="inline-field action-subfield">
      <ha-input
        .label=${ta(this, "url")}
        .value=${t.url_path || ""}
        @input=${(n) => {
		n.stopPropagation(), this._updateConfig({ [e]: J({
			...t,
			url_path: n.target.value
		}) });
	}}
      ></ha-input>
    </div>
  `;
}
function Da(e, t) {
	return T`
    <div class="inline-field action-subfield">
      <ha-input
        .label=${ta(this, "title")}
        .value=${t.popup_title || ""}
        .placeholder=${"Security"}
        @input=${(n) => {
		n.stopPropagation(), this._updateConfig({ [e]: J({
			...t,
			popup_title: n.target.value
		}) });
	}}
      ></ha-input>
    </div>

    <div class="inline-field action-subfield">
      <ha-input
        .label=${ta(this, "content")}
        .value=${typeof t.popup_content == "string" ? t.popup_content : t.popup_content ? JSON.stringify(t.popup_content) : ""}
        @input=${(n) => {
		n.stopPropagation(), this._updateConfig({ [e]: J({
			...t,
			popup_content: n.target.value
		}) });
	}}
      ></ha-input>
    </div>
  `;
}
function Oa(e, t, n) {
	let r = J({
		...n,
		action: t
	});
	return t === "popup" ? J({
		...r,
		popup_title: r.popup_title || G(e, "Security"),
		popup_content: r.popup_content || {
			type: "vertical-stack",
			cards: [{
				type: "tile",
				entity: "alarm_control_panel.house_alarm",
				vertical: !0
			}]
		},
		style: r.style || "--popup-min-width: 400px;\n--popup-max-width: 500px;\n--popup-border-radius: 20px;"
	}) : r;
}
function ka(e, t) {
	let n = e.action === "perform-action" ? "call-service" : e.action;
	return J({
		...t,
		...e,
		action: n || t.action || "none"
	});
}
function J(e) {
	let t = e?.action === "perform-action" ? "call-service" : e?.action || "none", n = { action: t };
	return t === "navigate" ? (n.navigation_path = e.navigation_path || "", n) : t === "call-service" ? (n.service = e.service || e.perform_action || "", (e.service_data || e.data) && (n.service_data = { ...e.service_data || e.data }), e.target && (n.target = { ...e.target }), n) : t === "url" ? (n.url_path = e.url_path || "", n) : t === "popup" ? (n.popup_title = e.popup_title || "", n.popup_content = e.popup_content || "", e.style && (n.style = e.style), e.card_mod && (n.card_mod = e.card_mod), n) : n;
}
//#endregion
//#region src/common/editor/helpers/renders.js
function Aa({ value: e = "", includeDomains: t, excludeDomains: n, multiple: r = !1, onValueChanged: i, filterOptions: a, activeFilter: o = "all", className: s = "entity-picker" } = {}) {
	let c = a?.length ? a.map((e) => ({
		...e,
		label: ja.call(this, e)
	})) : null, l = c ? Na(c) : t;
	return r ? T`
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
    ` : c?.length ? Fa.call(this, {
		value: e,
		includeDomains: t,
		excludeDomains: n,
		filters: c,
		activeFilter: o,
		className: s,
		onValueChanged: i
	}) : T`
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
function ja(e) {
	if (e.haDomains?.length) {
		let t = e.haDomains.map((e) => Ma(this?.hass, e)).filter(Boolean);
		if (t.length) return t.join(" / ");
	}
	return G(this, e.label);
}
function Ma(e, t) {
	if (!e?.localize || !t) return null;
	let n = [`component.${t}.entity_component._.name_plural`, `component.${t}.entity_component._.name`];
	for (let t of n) {
		let n = e.localize(t);
		if (n && n !== t) return n;
	}
	return null;
}
function Na(e = []) {
	if (e.some((e) => e.value === "all" && (!e.domains || e.domains.length === 0))) return;
	let t = /* @__PURE__ */ new Set();
	return e.forEach((e) => e.domains?.forEach((e) => t.add(e))), [...t];
}
var Pa = !1;
function Fa({ value: e, includeDomains: t, excludeDomains: n, filters: r, activeFilter: i, className: a, onValueChanged: o }) {
	Ka();
	let s = r.map((e) => ({
		id: e.value,
		label: e.label
	}));
	return T`
    <ha-generic-picker
      class=${a}
      .hass=${this.hass}
      .value=${e || ""}
      .placeholder=${"Entity"}
      .getItems=${(e, i) => Ia.call(this, {
		search: e,
		section: i,
		filters: r,
		includeDomains: t,
		excludeDomains: n
	})}
      .valueRenderer=${(e) => Ra.call(this, e)}
      .rowRenderer=${za}
      .sections=${s}
      .selectedSection=${i || r[0]?.value || "all"}
      @picker-opened=${(e) => {
		e.currentTarget.__orbitSuppressSectionScroll = !0;
	}}
      @value-changed=${(e) => o?.(e.detail.value || "")}
    ></ha-generic-picker>
  `;
}
function Ia({ search: e, section: t, filters: n, includeDomains: r, excludeDomains: i }) {
	let a = n.find((e) => e.value === (t || "all"))?.domains, o = a?.length ? a : r, s = new Set(i || []), c = (e || "").trim().toLowerCase();
	return Object.values(this.hass?.states || {}).filter((e) => {
		let t = Wa(e.entity_id);
		return o?.length && !o.includes(t) ? !1 : !s.has(t);
	}).map((e) => La.call(this, e)).filter((e) => Ba(e, c)).sort(Va);
}
function La(e) {
	let t = Ha(e), n = Wa(e.entity_id), r = Ua(this.hass, e);
	return {
		id: e.entity_id,
		primary: t,
		secondary: r,
		sorting_label: `${t}_${e.entity_id}`,
		stateObj: e,
		domain: n,
		domainLabel: Ga(n),
		searchText: [
			t,
			e.entity_id,
			n,
			Ga(n),
			r,
			e.attributes?.device_class
		].filter(Boolean).join(" ").toLowerCase()
	};
}
function Ra(e) {
	let t = this.hass?.states?.[e], n = t ? Ha(t) : e, r = t ? Ua(this.hass, t) : void 0;
	return T`
    ${t ? T`<state-badge slot="start" .stateObj=${t}></state-badge>` : ""}
    <span slot="headline">${n}</span>
    ${r ? T`<span slot="supporting-text">${r}</span>` : ""}
  `;
}
function za(e, t) {
	return T`
    <ha-combo-box-item
      type="button"
      compact
      .borderTop=${t !== 0}
    >
      <state-badge slot="start" .stateObj=${e.stateObj}></state-badge>
      <span slot="headline">${e.primary}</span>
      ${e.secondary ? T`<span slot="supporting-text">${e.secondary}</span>` : ""}
      <div slot="trailing-supporting-text" class="domain">
        ${e.domainLabel}
      </div>
    </ha-combo-box-item>
  `;
}
function Ba(e, t) {
	return t ? t.split(/\s+/).every((t) => e.searchText.includes(t)) : !0;
}
function Va(e, t) {
	return e.sorting_label.localeCompare(t.sorting_label, void 0, { sensitivity: "base" });
}
function Ha(e) {
	return e.attributes?.friendly_name || e.entity_id;
}
function Ua(e, t) {
	let n = e?.entities?.[t.entity_id], r = n?.device_id ? e?.devices?.[n.device_id] : void 0, i = n?.area_id || r?.area_id || t.attributes?.area_id;
	return i ? e?.areas?.[i]?.name : void 0;
}
function Wa(e = "") {
	return e.split(".")[0] || "";
}
function Ga(e = "") {
	return e.split("_").filter(Boolean).map((e) => e[0]?.toUpperCase() + e.slice(1)).join(" ");
}
function Ka() {
	if (Pa) return;
	let e = Element.prototype.scrollIntoView;
	Element.prototype.scrollIntoView = function(...t) {
		if (Ja(this)) {
			qa(this);
			return;
		}
		return e.apply(this, t);
	}, Pa = !0;
}
function qa(e) {
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
function Ja(e) {
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
function Ya({ value: e = "", onValueChanged: t, className: n = "entity-picker" } = {}) {
	return T`
    <ha-generic-picker
      class=${n}
      .hass=${this.hass}
      .value=${e || ""}
      .placeholder=${"Area"}
      .getItems=${() => Xa.call(this)}
      .valueRenderer=${(e) => Qa.call(this, e)}
      .rowRenderer=${$a}
      @value-changed=${(e) => t?.(e.detail.value || "")}
    ></ha-generic-picker>
  `;
}
function Xa() {
	return Object.values(this.hass?.areas || {}).map((e) => Za.call(this, e)).sort(to);
}
function Za(e) {
	let t = e.name || e.area_id, n = eo(this.hass, e);
	return {
		id: e.area_id,
		primary: t,
		secondary: n,
		sorting_label: t,
		icon: e.icon || "mdi:texture-box"
	};
}
function Qa(e) {
	let t = this.hass?.areas?.[e], n = t ? Za.call(this, t) : {
		id: e,
		primary: e,
		icon: "mdi:texture-box"
	};
	return T`
    <ha-icon slot="start" .icon=${n.icon}></ha-icon>
    <span slot="headline">${n.primary}</span>
    ${n.secondary ? T`<span slot="supporting-text">${n.secondary}</span>` : ""}
  `;
}
function $a(e, t) {
	return T`
    <ha-combo-box-item
      type="button"
      compact
      .borderTop=${t !== 0}
    >
      <ha-icon slot="start" .icon=${e.icon}></ha-icon>
      <span slot="headline">${e.primary}</span>
      ${e.secondary ? T`<span slot="supporting-text">${e.secondary}</span>` : ""}
    </ha-combo-box-item>
  `;
}
function eo(e, t) {
	let n = t.floor_id;
	return n ? e?.floors?.[n]?.name : void 0;
}
function to(e, t) {
	return e.sorting_label.localeCompare(t.sorting_label, void 0, { sensitivity: "base" });
}
function no(e, t, n) {
	return T`
    <div class="field">
      <label>${G(this, e, n)}</label>

      ${Aa.call(this, {
		value: this._config?.[t] || "",
		onValueChanged: (e) => this._handleEntityUpdate ? this._handleEntityUpdate(t, e) : this._handleConfigUpdate(t, e)
	})}
    </div>
  `;
}
function ro(e, t) {
	return T`
    <div class="field">
      ${Ya.call(this, {
		value: this._config?.[t] || "",
		onValueChanged: (e) => this._handleConfigUpdate ? this._handleConfigUpdate(t, e) : this._updateConfig({ [t]: e })
	})}
    </div>
  `;
}
//#endregion
//#region src/common/editor/helpers/helpers.js
function io(e) {
	e._editorPopoverCloseHandler || (e._editorPopoverCloseHandler = (t) => {
		!e._iconPickerKey && !e._colorPickerKey || oo(t.composedPath?.() || []) || (e._iconPickerKey = "", e._colorPickerKey = "", e._iconFilePickerOpen = !1, e._iconFileSearch = "", e._themeColorPickerOpen = !1, e._themeColorSearch = "", e.requestUpdate?.());
	}, document.addEventListener("pointerdown", e._editorPopoverCloseHandler, !0), e.addEventListener("pointerdown", e._editorPopoverCloseHandler, !0));
}
function ao(e) {
	e._editorPopoverCloseHandler &&= (document.removeEventListener("pointerdown", e._editorPopoverCloseHandler, !0), e.removeEventListener("pointerdown", e._editorPopoverCloseHandler, !0), null);
}
function oo(e) {
	return e.some((e) => {
		let t = e?.classList, n = e?.tagName?.toLowerCase?.();
		return t?.contains("icon-popover") || t?.contains("color-popover") || t?.contains("icon-preview") || t?.contains("color-preview") || t?.contains("color-control-button") || t?.contains("mdc-menu-surface") || n === "ha-generic-picker" || n === "ha-icon-picker" || n === "ha-combo-box" || n === "ha-combo-box-item" || n === "mwc-list" || n === "mwc-list-item";
	});
}
function so(e) {
	if (!e) return "background-color: rgb(var(--color-theme));";
	let t = e.toString().trim().toLowerCase();
	if (t.startsWith("#") || t.startsWith("rgb(") || t.startsWith("hsl(")) return `background-color:${t};`;
	let n = t.replace(/[^a-z0-9-_]/g, "");
	return n ? `background-color: ${st(n)};` : "background-color: rgb(var(--color-theme));";
}
function co(e) {
	let t = e?.toString().trim();
	return t && (po(t) || mo(t) || lo(t)) || "#ffffff";
}
function lo(e, t = /* @__PURE__ */ new Set()) {
	let n = e?.toString().trim().toLowerCase().replace(/[^a-z0-9-_]/g, "");
	if (!n || t.has(n)) return "";
	t.add(n);
	let r = dt(n), i = ut(n) ? fo(r) : "", a = ct(n) ? fo(`${n}-color`) : "", o = fo(n), s = n.startsWith("color-") ? "" : fo(`color-${n}`);
	return uo(i, t) || uo(a, t) || uo(o, t) || uo(s, t) || "";
}
function uo(e, t) {
	let n = e?.trim();
	if (!n) return "";
	let r = po(n);
	if (r) return r;
	let i = mo(n);
	if (i) return i;
	let a = n.match(/^var\(\s*--([^),\s]+)\s*\)$/i);
	return a ? lo(a[1], t) : "";
}
function fo(e) {
	let t = `--${e}`, n = [document.documentElement, document.body].filter(Boolean);
	for (let e of n) {
		let n = getComputedStyle(e).getPropertyValue(t).trim();
		if (n) return n;
	}
	return "";
}
function po(e) {
	return /^#[0-9a-f]{6}$/i.test(e) ? e : /^#[0-9a-f]{3}$/i.test(e) ? `#${e[1]}${e[1]}${e[2]}${e[2]}${e[3]}${e[3]}` : "";
}
function mo(e) {
	let t = e.match(/^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})/i);
	if (t) return ho(Number(t[1]), Number(t[2]), Number(t[3]));
	let n = e.match(/^\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*$/i);
	return n ? ho(Number(n[1]), Number(n[2]), Number(n[3])) : "";
}
function ho(e, t, n) {
	return `#${go(e)}${go(t)}${go(n)}`;
}
function go(e) {
	return Math.max(0, Math.min(255, e || 0)).toString(16).padStart(2, "0");
}
//#endregion
//#region src/common/editor/helpers/name-picker.js
function _o({ label: e = "Name", valueKey: t, legacyValueKey: n = "", entityKey: r = "main_entity", areaKey: i = "area", defaultType: a = "", defaultMode: o = "composed", modeKey: s = t, templateKey: c = "", templateLabel: l = "Template" } = {}) {
	return vo.call(this), c || !customElements.get("ha-entity-name-picker") ? yo.call(this, {
		label: e,
		valueKey: t,
		entityKey: r,
		areaKey: i,
		defaultType: a,
		defaultMode: o,
		modeKey: s,
		templateKey: c,
		templateLabel: l
	}) : T`
    <div class="field name-picker-field">
      <ha-entity-name-picker
        .hass=${this.hass}
        .label=${this._t(e)}
        .entityId=${Ro.call(this, {
		entityKey: r,
		areaKey: i
	})}
        .value=${jo(this._config, {
		valueKey: t,
		legacyValueKey: n,
		entityKey: r,
		areaKey: i,
		defaultType: a
	})}
        @value-changed=${(e) => {
		e.stopPropagation(), Po.call(this, {
			valueKey: t,
			legacyValueKey: n,
			value: Fo(e.detail.value, this._config, {
				entityKey: r,
				areaKey: i,
				defaultType: a
			})
		});
	}}
      ></ha-entity-name-picker>
    </div>
  `;
}
function vo() {
	customElements.get("ha-entity-name-picker") || this._namePickerRenderQueued || (this._namePickerRenderQueued = !0, customElements.whenDefined("ha-entity-name-picker").then(() => {
		this._namePickerRenderQueued = !1, this.requestUpdate?.();
	}));
}
function yo(e) {
	let t = wo(this._config, To(this, e.modeKey), e);
	return T`
    <div class="field name-picker-field name-picker-fallback">
      <div class="field-header">
        <label>${this._t(e.label)}</label>

        <ha-selector
          class="editor-header-button-toggle name-picker-mode-selector"
          .hass=${this.hass}
          .selector=${{ button_toggle: { options: [
		...e.templateKey ? [{
			label: this._t("Template"),
			value: "template"
		}] : [],
		{
			label: Ho(this, "composed"),
			value: "composed"
		},
		{
			label: Ho(this, "custom"),
			value: "custom"
		}
	] } }}
          .value=${t}
          @value-changed=${(t) => {
		t.stopPropagation();
		let n = t.detail.value || "composed";
		if (Eo(this, e.modeKey, n), !(e.templateKey && (this._updateConfig({
			[e.valueKey]: void 0,
			...e.legacyValueKey ? { [e.legacyValueKey]: void 0 } : {},
			[e.templateKey]: n === "template" ? this._config?.[e.templateKey] : void 0
		}), n === "template" || n === "composed"))) {
			if (n === "composed") {
				Po.call(this, {
					valueKey: e.valueKey,
					legacyValueKey: e.legacyValueKey,
					value: void 0
				});
				return;
			}
			if (typeof No(this._config, e) != "string") {
				Po.call(this, {
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

      ${t === "template" ? this._renderTemplateInput(e.templateLabel, e.templateKey, { hideLabel: !0 }) : t === "custom" ? bo.call(this, e) : xo.call(this, e)}
    </div>
  `;
}
function bo(e) {
	return T`
    <ha-selector
      class="name-picker-custom-input"
      .hass=${this.hass}
      .selector=${{ text: {} }}
      .value=${typeof No(this._config, e) == "string" ? No(this._config, e) : ""}
      @value-changed=${(t) => {
		t.stopPropagation(), Po.call(this, {
			valueKey: e.valueKey,
			legacyValueKey: e.legacyValueKey,
			value: t.detail.value || void 0
		});
	}}
    ></ha-selector>
  `;
}
function xo(e) {
	let t = Do(this._config, e), n = ko.call(this, t, e);
	return T`
    <ha-generic-picker
      class="name-picker-composed-picker"
      .hass=${this.hass}
      .value=${""}
      .placeholder=${this._t(e.label)}
      .getItems=${() => n}
      allow-custom-value
      .customValueLabel=${Go(this)}
      .rowRenderer=${(e) => T`
        <ha-combo-box-item type="button" compact>
          <span slot="headline">${e.primary}</span>
          ${e.secondary ? T`<span slot="supporting-text">${e.secondary}</span>` : ""}
        </ha-combo-box-item>
      `}
      .noSort=${!0}
      .searchLabel=${Wo(this)}
      @value-changed=${(n) => {
		n.stopPropagation();
		let r = Ao(n.detail.value);
		r && (Eo(this, e.modeKey, "composed"), Po.call(this, {
			valueKey: e.valueKey,
			legacyValueKey: e.legacyValueKey,
			value: Fo([...t, r], this._config, e)
		}));
	}}
    >
      <div slot="field" class="name-picker-composed-field">
        ${t.map((n, r) => So.call(this, n, r, t, e))}

        <button
          type="button"
          class="name-picker-add-chip"
          @click=${(e) => Co(e)}
        >
          <ha-icon icon="mdi:plus"></ha-icon>
          <span>${Uo(this)}</span>
        </button>
      </div>
    </ha-generic-picker>
  `;
}
function So(e, t, n, r) {
	return T`
    <button
      type="button"
      class="name-picker-chip"
      @click=${(e) => Co(e)}
    >
      <ha-icon icon="mdi:drag-horizontal-variant"></ha-icon>
      <span>${Oo.call(this, e)}</span>
      <ha-icon
        class="name-picker-chip-remove"
        icon="mdi:close"
        @click=${(e) => {
		e.preventDefault(), e.stopPropagation();
		let i = n.filter((e, n) => n !== t);
		Po.call(this, {
			valueKey: r.valueKey,
			legacyValueKey: r.legacyValueKey,
			value: Fo(i, this._config, r)
		});
	}}
      ></ha-icon>
    </button>
  `;
}
function Co(e) {
	e.preventDefault(), e.stopPropagation(), e.currentTarget?.closest("ha-generic-picker")?.open?.();
}
function wo(e = {}, t, n) {
	if (n.templateKey && Mo(e, n.templateKey)) return "template";
	let r = No(e, n);
	return typeof r == "string" ? "custom" : r ? "composed" : t || n.defaultMode || "composed";
}
function To(e, t) {
	return e._namePickerModes?.[t];
}
function Eo(e, t, n) {
	e._namePickerModes = {
		...e._namePickerModes,
		[t]: n
	};
}
function Do(e = {}, t) {
	let n = jo(e, t);
	return !n || typeof n == "string" ? [] : Array.isArray(n) ? n : [n];
}
function Oo(e) {
	return e ? e.type === "text" ? `"${e.text || ""}"` : e.type === "area" ? this._t("Area") : e.type === "entity" ? this._t("Entity") : Ko(this, e.type) : "";
}
function ko(e = [], t) {
	let n = [], r = new Set(e.filter((e) => e?.type && e.type !== "text").map((e) => e.type)), i = t.areaKey && this._config?.[t.areaKey] ? this.hass?.areas?.[this._config[t.areaKey]] : null, a = Ro.call(this, t), o = a ? this.hass?.states?.[a] : null;
	if (i && !r.has("area")) n.push({
		id: "area",
		primary: this._t("Area"),
		secondary: i.name || ""
	});
	else if (o && !r.has("area")) {
		let e = Bo(this.hass, o, "area");
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
			secondary: Bo(this.hass, o, "entity")
		});
		let e = Bo(this.hass, o, "device");
		e && !r.has("device") && n.push({
			id: "device",
			primary: Ko(this, "device"),
			secondary: e
		});
		let i = Vo(this.hass, this._config?.[t.areaKey]) || Bo(this.hass, o, "floor");
		i && !r.has("floor") && n.push({
			id: "floor",
			primary: Ko(this, "floor"),
			secondary: i
		});
	}
	return n;
}
function Ao(e) {
	if (e) return [
		"area",
		"device",
		"entity",
		"floor"
	].includes(e) ? { type: e } : {
		type: "text",
		text: e
	};
}
function jo(e = {}, t) {
	let n = No(e, t);
	if (n !== void 0) return n;
	if (t.defaultType === "area" && e[t.areaKey]) return { type: "area" };
	if (t.defaultType === "entity" && (e[t.entityKey] || e.entity)) return { type: "entity" };
}
function Mo(e = {}, t) {
	return Object.prototype.hasOwnProperty.call(e, t) && e[t] !== void 0 && e[t] !== "";
}
function No(e = {}, t) {
	if (Mo(e, t.valueKey)) return e[t.valueKey];
	if (t.legacyValueKey && Mo(e, t.legacyValueKey)) return e[t.legacyValueKey];
}
function Po({ valueKey: e, legacyValueKey: t, value: n }) {
	if (t && typeof this._updateConfig == "function") {
		this._updateConfig({
			[e]: n,
			[t]: void 0
		});
		return;
	}
	this._handleConfigUpdate(e, n);
}
function Fo(e, t = {}, n) {
	if (!(!e || Array.isArray(e) && e.length === 0) && !(n.defaultType && Io(t, n) && Lo(e, n.defaultType))) return e;
}
function Io(e = {}, t) {
	return t.defaultType === "area" ? !!e[t.areaKey] : t.defaultType === "entity" ? !!(e[t.entityKey] || e.entity) : !1;
}
function Lo(e, t) {
	let n = Array.isArray(e) ? e : [e];
	return n.length === 1 && n[0] && typeof n[0] == "object" && n[0].type === t;
}
function Ro(e) {
	return this._config?.[e.entityKey] || this._config?.entity || zo(this.hass, this._config?.[e.areaKey]);
}
function zo(e, t) {
	if (!e || !t) return "";
	let n = e.entities || {}, r = e.devices || {};
	for (let i of Object.keys(e.states || {})) {
		let e = n[i];
		if (e?.area_id === t || e?.device_id && r[e.device_id]?.area_id === t) return i;
	}
	return "";
}
function Bo(e, t, n) {
	return !t || typeof e?.formatEntityName != "function" ? n === "entity" && (t?.attributes?.friendly_name || t?.entity_id) || "" : e.formatEntityName(t, { type: n }) || "";
}
function Vo(e, t) {
	let n = t && e?.areas?.[t] ? e.areas[t].floor_id : "";
	return n && e?.floors?.[n] && e.floors[n].name || "";
}
function Ho(e, t) {
	let n = `ui.components.entity.entity-name-picker.mode_${t}`, r = e.hass?.localize?.(n);
	return r && r !== n ? r : t === "custom" ? e._t("Custom") : "Composed";
}
function Uo(e) {
	let t = "ui.components.entity.entity-name-picker.add", n = e.hass?.localize?.(t);
	return n && n !== t ? n : e._t("Add");
}
function Wo(e) {
	let t = "ui.components.entity.entity-name-picker.search", n = e.hass?.localize?.(t);
	return n && n !== t ? n : e._t("Search");
}
function Go(e) {
	let t = "ui.components.entity.entity-name-picker.custom_name", n = e.hass?.localize?.(t);
	return n && n !== t ? n : e._t("Name");
}
function Ko(e, t) {
	let n = `ui.components.entity.entity-name-picker.types.${t}`, r = e.hass?.localize?.(n);
	return r && r !== n ? r : t;
}
//#endregion
//#region src/editors/area/sections/area.js
function qo() {
	return T`
    <div class="section">
      ${Yo.call(this)}

      ${this._renderArea("Area", "area")}

      ${this._renderColor(["Accent", "Color"], "accent_color")}

      ${this._renderEntity("Main entity", "main_entity")}
      ${Xo.call(this)}

      ${q.call(this, {
		interactions: [
			{
				key: "tap_action",
				formKey: "tap_action",
				label: "Tap behavior",
				defaultAction: Jo(this._config),
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
function Jo(e = {}) {
	return {
		action: "navigate",
		navigation_path: e.tap_action?.navigation_path || e.navigate?.navigation_path || e.navigation_path || "/lovelace/home"
	};
}
function Yo() {
	return _o.call(this, {
		label: "Name",
		valueKey: "area_name",
		legacyValueKey: "room_name",
		entityKey: "main_entity",
		areaKey: "area",
		defaultType: "area"
	});
}
function Xo() {
	return H.call(this, {
		label: "Icon",
		sourceKey: "main_entity_icon_source",
		entityKey: "main_entity",
		areaKey: "area",
		allowArea: !0,
		customIconKeys: [
			"main_entity_icon",
			"main_entity_icon_on",
			"main_entity_icon_off"
		],
		renderCustom() {
			return T`
        ${this._renderIconInput("", "main_entity_icon")}

        <div class="icon-pair">
          ${this._renderIconInput(["Active", "Icon"], "main_entity_icon_on")}
          ${this._renderIconInput(["Inactive", "Icon"], "main_entity_icon_off")}
        </div>
      `;
		}
	});
}
//#endregion
//#region src/editors/area/sections/buttons.js
function Zo() {
	let e = this._selectedButtonIndex || 1;
	return T`
    <div class="section">
      ${Qo.call(this, [
		1,
		2,
		3,
		4
	], e, (e) => {
		this._selectedButtonIndex = e;
	})}

      ${$o.call(this, e)}
    </div>
  `;
}
function Qo(e, t, n) {
	return T`
    <div
      class="editor-segment-menu"
      style="--editor-segment-columns: 4;"
    >
      ${e.map((e) => T`
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
function $o(e) {
	let t = `button${e}`, n = this._areaButtonDomainFilter || "all";
	return T`
    <div class="sub-section selected-button-section">
      <div class="field">
        <label>${this._t("Entity")}</label>

        ${Aa.call(this, {
		value: this._config?.[t] || "",
		filterOptions: es,
		activeFilter: n,
		onValueChanged: (e) => this._handleEntityUpdate ? this._handleEntityUpdate(t, e) : this._handleConfigUpdate(t, e)
	})}
      </div>

      <div class="color-pair">
        ${this._renderColor(["Active", "Color"], `${t}_on_color`, "theme")}
        ${this._renderColor(["Inactive", "Color"], `${t}_off_color`, "theme")}
      </div>

      ${H.call(this, {
		label: "Icon",
		sourceKey: `${t}_icon_source`,
		entityKey: t,
		customIconKeys: [
			`${t}_icon`,
			`${t}_icon_on`,
			`${t}_icon_off`
		],
		renderCustom() {
			return T`
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
var es = [
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
function ts() {
	let e = this._selectedCurveButtonIndex || 1;
	return T`
    <div class="section">
      <label class="editor-toggle-row">
        <span>${this._t("Lock curve button positions")}</span>
        <ha-switch
          .checked=${!!this._config?.curve_buttons_lock_position}
          @change=${(e) => this._updateConfig({ curve_buttons_lock_position: e.target.checked })}
        ></ha-switch>
      </label>

      <div class="curve-divider"></div>

      ${rs.call(this, [
		1,
		2,
		3,
		4,
		5,
		6
	], e, (e) => {
		this._selectedCurveButtonIndex = e;
	})}

      ${is.call(this, `curve_button${e}`, "", "more-info", { index: e }, {
		showColors: !0,
		filteredEntity: !0,
		filterKey: "_areaCurveButtonDomainFilter",
		filters: os
	})}
    </div>
  `;
}
function ns() {
	let e = Nn(this._config?.action_button);
	return T`
    <div class="section">
      ${is.call(this, "action_button", "", e, {}, {
		showColors: !0,
		filteredEntity: !0
	})}
    </div>
  `;
}
function rs(e, t, n) {
	return T`
    <div class="editor-segment-menu">
      ${e.map((e) => T`
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
function is(e, t, n, r = {}, i = {}) {
	let a = this._config?.[e];
	return T`
    <div class="sub-section selected-button-section">
      ${t ? T`
            <div class="sub-section-title">
              ${this._t(t, r)}
            </div>
          ` : ""}

      ${i.filteredEntity ? ss.call(this, "Entity", e, i) : this._renderEntity("Entity", e)}

      ${i.showColors ? T`
            <div class="color-pair">
              ${cs.call(this, ["Active", "Color"], `${e}_on_color`)}
              ${cs.call(this, ["Inactive", "Color"], `${e}_off_color`)}
            </div>
          ` : ""}

      ${H.call(this, {
		label: "Icon",
		sourceKey: `${e}_icon_source`,
		entityKey: e,
		customIconKeys: [
			`${e}_icon`,
			`${e}_icon_on`,
			`${e}_icon_off`
		],
		renderCustom() {
			return T`
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
var as = [
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
], os = [
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
function ss(e, t, n = {}) {
	let r = this[n.filterKey || "_areaActionButtonDomainFilter"] || "all", i = n.filters || as;
	return T`
    <div class="field">
      <label>${this._t(e)}</label>

      ${Aa.call(this, {
		value: this._config?.[t] || "",
		filterOptions: i,
		activeFilter: r,
		onValueChanged: (e) => this._handleEntityUpdate ? this._handleEntityUpdate(t, e) : this._handleConfigUpdate(t, e)
	})}
    </div>
  `;
}
function cs(e, t) {
	let n = this._config?.[t] || "", r = n === "theme" ? "" : n, i = r || this._config?.accent_color || "theme";
	return this._renderColorControl(e, t, r, (e) => this._handleConfigUpdate(t, e), i);
}
//#endregion
//#region src/common/editor/styles/editor-styles.js
var ls = [
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
.name-picker-mode-selector {
  flex: 0 1 auto;
  width: auto;
  max-width: 100%;
}

.editor-button-toggle-field .field-header,
.main-entity-icon-source-field .field-header,
.name-picker-fallback .field-header {
  min-height: 40px;
}

.name-picker-field ha-entity-name-picker,
.name-picker-custom-input,
.name-picker-composed-picker {
  display: block;
  width: 100%;
}

.name-picker-composed-picker {
  --ha-generic-picker-width: min(720px, calc(100vw - 48px));
  --ha-generic-picker-max-width: min(720px, calc(100vw - 48px));
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
  gap: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid var(--orbit-editor-border);
  overflow-x: auto;
}

.color-tabs button {
  position: relative;
  min-width: 92px;
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
  margin-top: 16px;
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
], us = {
	"Current state": "Current state",
	"Currently {state}": "Currently {state}",
	"No active entities": "No active entities",
	Always: "Always",
	"Area Count": "Area Count",
	Badge: "Badge",
	Content: "Content",
	"Device class": "Device class",
	"Displayed elements": "Displayed elements",
	Domain: "Domain",
	"Entity state": "Entity state",
	Hide: "Hide",
	"Hidden entities": "Hidden entities",
	Header: "Header",
	Labels: "Labels",
	Name: "Name",
	"Name template": "Name template",
	"Not configured": "Not configured",
	State: "State",
	"State content": "State content",
	"State type": "State type",
	Template: "Template",
	"Display template": "Display template",
	"Active template": "Active template",
	"Inactive template": "Inactive template",
	Type: "Type",
	Visibility: "Visibility",
	"Visible if selected in state content": "Visible if selected in state content",
	"Accent color": "Accent color",
	"Action button": "Action button",
	"Actions per row": "Actions per row",
	"Add a card to start.": "Add a card to start.",
	"Battery entity {index}": "Battery entity {index}",
	"Button {index}": "Button {index}",
	Cards: "Cards",
	"Choose color": "Choose color",
	"Choose icon": "Choose icon",
	"Curve buttons": "Curve buttons",
	Dynamic: "Dynamic",
	"ETA entity": "ETA entity",
	Files: "Files",
	"Icon only": "Icon only",
	"Items per row": "Items per row",
	"Label template": "Label template",
	"Loading files...": "Loading files...",
	"Local Icons": "Local Icons",
	"Lock curve button positions": "Lock curve button positions",
	"Main entity": "Main entity",
	"Move left": "Move left",
	"Move right": "Move right",
	"Navigation path": "Navigation path",
	"Native active state color": "Native active state color",
	"Native inactive state color": "Native inactive state color",
	"No files found. Add a local icon manifest at /local/icons/manifest.json or type the filename manually.": "No files found. Add a local icon manifest at /local/icons/manifest.json or type the filename manually.",
	"No matching actions": "No matching actions",
	"No matching colors": "No matching colors",
	"No matching files": "No matching files",
	"Orbit Action Card v{version}": "Orbit Action Card v{version}",
	"Orbit Deck Card v{version}": "Orbit Deck Card v{version}",
	"Orbit Icons": "Orbit Icons",
	"Orbit Area Card v{version}": "Orbit Area Card v{version}",
	"Orbit Status Card v{version}": "Orbit Status Card v{version}",
	"Orbit Status Badge v{version}": "Orbit Status Badge v{version}",
	"Person entity": "Person entity",
	"Separate cards": "Separate cards",
	Separator: "Separator",
	"State light color": "State light color",
	"State color (default)": "State color (default)",
	"State color": "State color",
	"State template": "State template",
	"Status {index}": "Status {index}",
	"Status color": "Status color",
	"Status name": "Status name",
	"Status sensors": "Status sensors",
	"Card background": "Card background",
	"Force padding": "Force padding",
	Main: "Main",
	Overlay: "Overlay",
	Crop: "Crop",
	Resize: "Resize",
	Height: "Height",
	"Transparent background": "Transparent background",
	"Primary text color": "Primary text color",
	"Secondary background color": "Secondary background color",
	"Tab font size": "Tab font size",
	"Tab width": "Tab width",
	Tabs: "Tabs",
	"Tracker entity": "Tracker entity"
}, ds = {
	"Current state": "Current state",
	"Currently {state}": "Currently {state}",
	"No active entities": "No active entities",
	Always: "Always",
	"Area Count": "Area Count",
	Badge: "Badge",
	Content: "Content",
	"Device class": "Device class",
	"Displayed elements": "Displayed elements",
	Domain: "Domain",
	"Entity state": "Entity state",
	Hide: "Hide",
	"Hidden entities": "Hidden entities",
	Header: "Header",
	Labels: "Labels",
	Name: "Name",
	"Name template": "Name template",
	"Not configured": "Not configured",
	State: "State",
	"State content": "State content",
	"State type": "State type",
	Template: "Template",
	"Display template": "Display template",
	"Active template": "Active template",
	"Inactive template": "Inactive template",
	Type: "Type",
	Visibility: "Visibility",
	"Visible if selected in state content": "Visible if selected in state content",
	"Accent color": "Accent colour",
	"Action button": "Action button",
	"Actions per row": "Actions per row",
	"Add a card to start.": "Add a card to start.",
	"Battery entity {index}": "Battery entity {index}",
	"Button {index}": "Button {index}",
	Cards: "Cards",
	"Choose color": "Choose colour",
	"Choose icon": "Choose icon",
	"Curve buttons": "Curve buttons",
	Dynamic: "Dynamic",
	"ETA entity": "ETA entity",
	Files: "Files",
	"Icon only": "Icon only",
	"Items per row": "Items per row",
	"Label template": "Label template",
	"Loading files...": "Loading files...",
	"Local Icons": "Local Icons",
	"Lock curve button positions": "Lock curve button positions",
	"Main entity": "Main entity",
	"Move left": "Move left",
	"Move right": "Move right",
	"Navigation path": "Navigation path",
	"Native active state color": "Native active state colour",
	"Native inactive state color": "Native inactive state colour",
	"No files found. Add a local icon manifest at /local/icons/manifest.json or type the filename manually.": "No files found. Add a local icon manifest at /local/icons/manifest.json or type the filename manually.",
	"No matching actions": "No matching actions",
	"No matching colors": "No matching colours",
	"No matching files": "No matching files",
	"Orbit Action Card v{version}": "Orbit Action Card v{version}",
	"Orbit Deck Card v{version}": "Orbit Deck Card v{version}",
	"Orbit Icons": "Orbit Icons",
	"Orbit Area Card v{version}": "Orbit Area Card v{version}",
	"Orbit Status Card v{version}": "Orbit Status Card v{version}",
	"Orbit Status Badge v{version}": "Orbit Status Badge v{version}",
	"Person entity": "Person entity",
	"Separate cards": "Separate cards",
	Separator: "Separator",
	"State light color": "State light colour",
	"State color (default)": "State colour (default)",
	"State color": "State colour",
	"State template": "State template",
	"Status {index}": "Status {index}",
	"Status color": "Status colour",
	"Status name": "Status name",
	"Status sensors": "Status sensors",
	"Card background": "Card background",
	"Force padding": "Force padding",
	Main: "Main",
	Overlay: "Overlay",
	Crop: "Crop",
	Resize: "Resize",
	Height: "Height",
	"Transparent background": "Transparent background",
	"Primary text color": "Primary text colour",
	"Secondary background color": "Secondary background colour",
	"Tab font size": "Tab font size",
	"Tab width": "Tab width",
	Tabs: "Tabs",
	"Tracker entity": "Tracker entity"
}, fs = {
	"Current state": "Aktueller Zustand",
	"Currently {state}": "Derzeit {state}",
	"No active entities": "Keine aktiven Entitäten",
	Always: "Immer",
	"Area Count": "Bereichszähler",
	Badge: "Abzeichen",
	Content: "Inhalt",
	"Device class": "Geräteklasse",
	"Displayed elements": "Angezeigte Elemente",
	Domain: "Domäne",
	"Entity state": "Entitätszustand",
	Hide: "Ausblenden",
	"Hidden entities": "Ausgeblendete Entitäten",
	Header: "Kopfzeile",
	Labels: "Bezeichnungen",
	Name: "Name",
	"Name template": "Namensvorlage",
	"Not configured": "Nicht konfiguriert",
	State: "Zustand",
	"State content": "Zustandsinhalt",
	"State type": "Zustandstyp",
	Template: "Vorlage",
	"Display template": "Anzeigevorlage",
	"Active template": "Aktivierungsvorlage",
	"Inactive template": "Inaktivitätsvorlage",
	Type: "Typ",
	Visibility: "Sichtbarkeit",
	"Visible if selected in state content": "Sichtbar, wenn im Zustandsinhalt ausgewählt",
	"Accent color": "Akzentfarbe",
	"Action button": "Aktionstaste",
	"Actions per row": "Aktionen pro Zeile",
	"Add a card to start.": "Füge eine Karte hinzu, um zu beginnen.",
	"Battery entity {index}": "Batterie-Entität {index}",
	"Button {index}": "Taste {index}",
	Cards: "Karten",
	"Choose color": "Farbe auswählen",
	"Choose icon": "Symbol auswählen",
	"Curve buttons": "Bogen-Tasten",
	Dynamic: "Dynamisch",
	"ETA entity": "ETA-Entität",
	Files: "Dateien",
	"Icon only": "Nur Symbol",
	"Items per row": "Elemente pro Zeile",
	"Label template": "Beschriftungsvorlage",
	"Loading files...": "Dateien werden geladen...",
	"Local Icons": "Lokale Symbole",
	"Lock curve button positions": "Bogen-Tastenpositionen sperren",
	"Main entity": "Hauptentität",
	"Move left": "Nach links verschieben",
	"Move right": "Nach rechts verschieben",
	"Navigation path": "Navigationspfad",
	"Native active state color": "Native Farbe für aktiven Zustand",
	"Native inactive state color": "Native Farbe für inaktiven Zustand",
	"No matching colors": "Keine passenden Farben",
	"No matching actions": "Keine passenden Aktionen",
	"No matching files": "Keine passenden Dateien",
	"Person entity": "Personen-Entität",
	"Separate cards": "Separate Karten",
	Separator: "Trennzeichen",
	"State light color": "Lichtstatusfarbe",
	"State color (default)": "Statusfarbe (Standard)",
	"State color": "Statusfarbe",
	"State template": "Zustandsvorlage",
	"Status {index}": "Status {index}",
	"Status color": "Statusfarbe",
	"Status name": "Statusname",
	"Status sensors": "Statussensoren",
	"Card background": "Kartenhintergrund",
	"Force padding": "Padding erzwingen",
	Main: "Hauptkarte",
	Overlay: "Überlagerung",
	Crop: "Zuschneiden",
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
	"Orbit Icons": "Orbit-Symbole",
	"Orbit Area Card v{version}": "Orbit Area Card v{version}",
	"Orbit Deck Card v{version}": "Orbit Deck Card v{version}",
	"Orbit Status Card v{version}": "Orbit Status Card v{version}",
	"Orbit Status Badge v{version}": "Orbit Status Badge v{version}"
}, ps = {
	"Current state": "Estado actual",
	"Currently {state}": "Actualmente {state}",
	"No active entities": "No hay entidades activas",
	Always: "Siempre",
	"Area Count": "Recuento de área",
	Badge: "Insignia",
	Content: "Contenido",
	"Device class": "Clase de dispositivo",
	"Displayed elements": "Elementos mostrados",
	Domain: "Dominio",
	"Entity state": "Estado de entidad",
	Hide: "Ocultar",
	"Hidden entities": "Entidades ocultas",
	Header: "Encabezado",
	Labels: "Etiquetas",
	Name: "Nombre",
	"Name template": "Plantilla de nombre",
	"Not configured": "Sin configurar",
	State: "Estado",
	"State content": "Contenido del estado",
	"State type": "Tipo de estado",
	Template: "Plantilla",
	"Display template": "Plantilla de visualización",
	"Active template": "Plantilla de activación",
	"Inactive template": "Plantilla de inactividad",
	Type: "Tipo",
	Visibility: "Visibilidad",
	"Visible if selected in state content": "Visible si se selecciona en el contenido del estado",
	"Accent color": "Color de acento",
	"Action button": "Botón de acción",
	"Actions per row": "Acciones por fila",
	"Add a card to start.": "Añade una tarjeta para empezar.",
	"Battery entity {index}": "Entidad de batería {index}",
	"Button {index}": "Botón {index}",
	Cards: "Tarjetas",
	"Choose color": "Elegir color",
	"Choose icon": "Elegir icono",
	"Curve buttons": "Botones curvos",
	Dynamic: "Dinámico",
	"ETA entity": "Entidad ETA",
	Files: "Archivos",
	"Icon only": "Solo icono",
	"Items per row": "Elementos por fila",
	"Label template": "Plantilla de etiqueta",
	"Loading files...": "Cargando archivos...",
	"Local Icons": "Iconos locales",
	"Lock curve button positions": "Bloquear posiciones de botones curvos",
	"Main entity": "Entidad principal",
	"Move left": "Mover a la izquierda",
	"Move right": "Mover a la derecha",
	"Navigation path": "Ruta de navegación",
	"Native active state color": "Color nativo del estado activo",
	"Native inactive state color": "Color nativo del estado inactivo",
	"No matching colors": "No hay colores coincidentes",
	"No matching actions": "No hay acciones coincidentes",
	"No matching files": "No hay archivos coincidentes",
	"Person entity": "Entidad de persona",
	"Separate cards": "Tarjetas separadas",
	Separator: "Separador",
	"State light color": "Color de luz de estado",
	"State color (default)": "Color de estado (predeterminado)",
	"State color": "Color de estado",
	"State template": "Plantilla de estado",
	"Status {index}": "Estado {index}",
	"Status color": "Color de estado",
	"Status name": "Nombre de estado",
	"Status sensors": "Sensores de estado",
	"Card background": "Fondo de tarjeta",
	"Force padding": "Forzar relleno",
	Main: "Principal",
	Overlay: "Superposición",
	Crop: "Recortar",
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
	"Orbit Icons": "Iconos de Orbit",
	"Orbit Area Card v{version}": "Orbit Area Card v{version}",
	"Orbit Deck Card v{version}": "Orbit Deck Card v{version}",
	"Orbit Status Card v{version}": "Orbit Status Card v{version}",
	"Orbit Status Badge v{version}": "Orbit Status Badge v{version}"
}, ms = {
	"Current state": "État actuel",
	"Currently {state}": "Actuellement {state}",
	"No active entities": "Aucune entité active",
	Always: "Toujours",
	"Area Count": "Comptage de zone",
	Badge: "Badge",
	Content: "Contenu",
	"Device class": "Classe d’appareil",
	"Displayed elements": "Éléments affichés",
	Domain: "Domaine",
	"Entity state": "État de l’entité",
	Hide: "Masquer",
	"Hidden entities": "Entités masquées",
	Header: "En-tête",
	Labels: "Étiquettes",
	Name: "Nom",
	"Name template": "Modèle de nom",
	"Not configured": "Non configuré",
	State: "État",
	"State content": "Contenu de l’état",
	"State type": "Type d’état",
	Template: "Modèle",
	"Display template": "Modèle d’affichage",
	"Active template": "Modèle d’activation",
	"Inactive template": "Modèle d’inactivité",
	Type: "Type",
	Visibility: "Visibilité",
	"Visible if selected in state content": "Visible si sélectionné dans le contenu de l’état",
	"Accent color": "Couleur d'accent",
	"Action button": "Bouton d'action",
	"Actions per row": "Actions par ligne",
	"Add a card to start.": "Ajoutez une carte pour commencer.",
	"Battery entity {index}": "Entité batterie {index}",
	"Button {index}": "Bouton {index}",
	Cards: "Cartes",
	"Choose color": "Choisir une couleur",
	"Choose icon": "Choisir une icône",
	"Curve buttons": "Boutons courbes",
	Dynamic: "Dynamique",
	"ETA entity": "Entité ETA",
	Files: "Fichiers",
	"Icon only": "Icône seule",
	"Items per row": "Éléments par ligne",
	"Label template": "Modèle de libellé",
	"Loading files...": "Chargement des fichiers...",
	"Local Icons": "Icônes locales",
	"Lock curve button positions": "Verrouiller les positions des boutons courbes",
	"Main entity": "Entité principale",
	"Move left": "Déplacer à gauche",
	"Move right": "Déplacer à droite",
	"Navigation path": "Chemin de navigation",
	"Native active state color": "Couleur native de l’état actif",
	"Native inactive state color": "Couleur native de l’état inactif",
	"No matching colors": "Aucune couleur correspondante",
	"No matching actions": "Aucune action correspondante",
	"No matching files": "Aucun fichier correspondant",
	"Person entity": "Entité personne",
	"Separate cards": "Cartes séparées",
	Separator: "Séparateur",
	"State light color": "Couleur d’état de lumière",
	"State color (default)": "Couleur d’état (par défaut)",
	"State color": "Couleur d’état",
	"State template": "Modèle d'état",
	"Status {index}": "Statut {index}",
	"Status color": "Couleur du statut",
	"Status name": "Nom du statut",
	"Status sensors": "Capteurs de statut",
	"Card background": "Arrière-plan de la carte",
	"Force padding": "Forcer le remplissage",
	Main: "Principal",
	Overlay: "Superposition",
	Crop: "Recadrer",
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
	"Orbit Icons": "Icônes Orbit",
	"Orbit Area Card v{version}": "Orbit Area Card v{version}",
	"Orbit Deck Card v{version}": "Orbit Deck Card v{version}",
	"Orbit Status Card v{version}": "Orbit Status Card v{version}",
	"Orbit Status Badge v{version}": "Orbit Status Badge v{version}"
}, hs = {
	"Current state": "Stato attuale",
	"Currently {state}": "Attualmente {state}",
	"No active entities": "Nessuna entità attiva",
	Always: "Sempre",
	"Area Count": "Conteggio area",
	Badge: "Badge",
	Content: "Contenuto",
	"Device class": "Classe dispositivo",
	"Displayed elements": "Elementi visualizzati",
	Domain: "Dominio",
	"Entity state": "Stato entità",
	Hide: "Nascondi",
	"Hidden entities": "Entità nascoste",
	Header: "Intestazione",
	Labels: "Etichette",
	Name: "Nome",
	"Name template": "Modello del nome",
	"Not configured": "Non configurato",
	State: "Stato",
	"State content": "Contenuto dello stato",
	"State type": "Tipo di stato",
	Template: "Modello",
	"Display template": "Modello di visualizzazione",
	"Active template": "Modello di attivazione",
	"Inactive template": "Modello di inattività",
	Type: "Tipo",
	Visibility: "Visibilità",
	"Visible if selected in state content": "Visibile se selezionato nel contenuto dello stato",
	"Accent color": "Colore accento",
	"Action button": "Pulsante azione",
	"Actions per row": "Azioni per riga",
	"Add a card to start.": "Aggiungi una scheda per iniziare.",
	"Battery entity {index}": "Entità batteria {index}",
	"Button {index}": "Pulsante {index}",
	Cards: "Schede",
	"Choose color": "Scegli colore",
	"Choose icon": "Scegli icona",
	"Curve buttons": "Pulsanti curvi",
	Dynamic: "Dinamico",
	"ETA entity": "Entità ETA",
	Files: "File",
	"Icon only": "Solo icona",
	"Items per row": "Elementi per riga",
	"Label template": "Template etichetta",
	"Loading files...": "Caricamento file...",
	"Local Icons": "Icone locali",
	"Lock curve button positions": "Blocca posizioni dei pulsanti curvi",
	"Main entity": "Entità principale",
	"Move left": "Sposta a sinistra",
	"Move right": "Sposta a destra",
	"Navigation path": "Percorso navigazione",
	"Native active state color": "Colore nativo dello stato attivo",
	"Native inactive state color": "Colore nativo dello stato inattivo",
	"No matching colors": "Nessun colore corrispondente",
	"No matching actions": "Nessuna azione corrispondente",
	"No matching files": "Nessun file corrispondente",
	"Person entity": "Entità persona",
	"Separate cards": "Schede separate",
	Separator: "Separatore",
	"State light color": "Colore stato luce",
	"State color (default)": "Colore stato (predefinito)",
	"State color": "Colore stato",
	"State template": "Template stato",
	"Status {index}": "Stato {index}",
	"Status color": "Colore stato",
	"Status name": "Nome stato",
	"Status sensors": "Sensori stato",
	"Card background": "Sfondo scheda",
	"Force padding": "Forza padding",
	Main: "Principale",
	Overlay: "Sovrapposizione",
	Crop: "Ritaglia",
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
	"Orbit Icons": "Icone Orbit",
	"Orbit Area Card v{version}": "Orbit Area Card v{version}",
	"Orbit Deck Card v{version}": "Orbit Deck Card v{version}",
	"Orbit Status Card v{version}": "Orbit Status Card v{version}",
	"Orbit Status Badge v{version}": "Orbit Status Badge v{version}"
}, gs = {
	"Current state": "Huidige status",
	"Currently {state}": "Momenteel {state}",
	"No active entities": "Geen actieve entiteiten",
	Always: "Altijd",
	"Area Count": "Gebiedstelling",
	Badge: "Badge",
	Content: "Inhoud",
	"Device class": "Apparaatklasse",
	"Displayed elements": "Weergegeven elementen",
	Domain: "Domein",
	"Entity state": "Entiteitsstatus",
	Hide: "Verbergen",
	"Hidden entities": "Verborgen entiteiten",
	Header: "Koptekst",
	Labels: "Labels",
	Name: "Naam",
	"Name template": "Naamsjabloon",
	"Not configured": "Niet geconfigureerd",
	State: "Status",
	"State content": "Statusinhoud",
	"State type": "Statustype",
	Template: "Sjabloon",
	"Display template": "Weergavesjabloon",
	"Active template": "Activeringssjabloon",
	"Inactive template": "Deactiveringssjabloon",
	Type: "Type",
	Visibility: "Zichtbaarheid",
	"Visible if selected in state content": "Zichtbaar indien geselecteerd in statusinhoud",
	"Accent color": "Accentkleur",
	"Action button": "Actieknop",
	"Actions per row": "Acties per rij",
	"Add a card to start.": "Voeg een kaart toe om te beginnen.",
	"Battery entity {index}": "Batterij-entiteit {index}",
	"Button {index}": "Knop {index}",
	Cards: "Kaarten",
	"Choose color": "Kleur kiezen",
	"Choose icon": "Icoon kiezen",
	"Curve buttons": "Gebogen knoppen",
	Dynamic: "Dynamisch",
	"ETA entity": "ETA-entiteit",
	Files: "Bestanden",
	"Icon only": "Alleen icoon",
	"Items per row": "Items per rij",
	"Label template": "Labelsjabloon",
	"Loading files...": "Bestanden laden...",
	"Local Icons": "Lokale iconen",
	"Lock curve button positions": "Posities van gebogen knoppen vergrendelen",
	"Main entity": "Hoofdentiteit",
	"Move left": "Naar links verplaatsen",
	"Move right": "Naar rechts verplaatsen",
	"Navigation path": "Navigatiepad",
	"Native active state color": "Systeemeigen kleur voor actieve status",
	"Native inactive state color": "Systeemeigen kleur voor inactieve status",
	"No matching colors": "Geen overeenkomende kleuren",
	"No matching actions": "Geen overeenkomende acties",
	"No matching files": "Geen overeenkomende bestanden",
	"Person entity": "Persoon-entiteit",
	"Separate cards": "Aparte kaarten",
	Separator: "Scheidingsteken",
	"State light color": "Statuskleur licht",
	"State color (default)": "Statuskleur (standaard)",
	"State color": "Statuskleur",
	"State template": "Statussjabloon",
	"Status {index}": "Status {index}",
	"Status color": "Statuskleur",
	"Status name": "Statusnaam",
	"Status sensors": "Statussensoren",
	"Card background": "Kaartachtergrond",
	"Force padding": "Padding afdwingen",
	Main: "Hoofdkaart",
	Overlay: "Overlay",
	Crop: "Bijsnijden",
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
	"Orbit Icons": "Orbit-iconen",
	"Orbit Area Card v{version}": "Orbit Area Card v{version}",
	"Orbit Deck Card v{version}": "Orbit Deck Card v{version}",
	"Orbit Status Card v{version}": "Orbit Status Card v{version}",
	"Orbit Status Badge v{version}": "Orbit Status Badge v{version}"
}, _s = {
	"Current state": "Estado atual",
	"Currently {state}": "Atualmente {state}",
	"No active entities": "Nenhuma entidade ativa",
	Always: "Sempre",
	"Area Count": "Contagem da área",
	Badge: "Emblema",
	Content: "Conteúdo",
	"Device class": "Classe do dispositivo",
	"Displayed elements": "Elementos exibidos",
	Domain: "Domínio",
	"Entity state": "Estado da entidade",
	Hide: "Ocultar",
	"Hidden entities": "Entidades ocultas",
	Header: "Cabeçalho",
	Labels: "Rótulos",
	Name: "Nome",
	"Name template": "Modelo de nome",
	"Not configured": "Não configurado",
	State: "Estado",
	"State content": "Conteúdo do estado",
	"State type": "Tipo de estado",
	Template: "Modelo",
	"Display template": "Modelo de exibição",
	"Active template": "Modelo de ativação",
	"Inactive template": "Modelo de inatividade",
	Type: "Tipo",
	Visibility: "Visibilidade",
	"Visible if selected in state content": "Visível se selecionado no conteúdo do estado",
	"Accent color": "Cor de destaque",
	"Action button": "Botão de ação",
	"Actions per row": "Ações por linha",
	"Add a card to start.": "Adicione um cartão para começar.",
	"Battery entity {index}": "Entidade de bateria {index}",
	"Button {index}": "Botão {index}",
	Cards: "Cartões",
	"Choose color": "Escolher cor",
	"Choose icon": "Escolher ícone",
	"Curve buttons": "Botões curvos",
	Dynamic: "Dinâmico",
	"ETA entity": "Entidade ETA",
	Files: "Arquivos",
	"Icon only": "Somente ícone",
	"Items per row": "Itens por linha",
	"Label template": "Modelo de rótulo",
	"Loading files...": "Carregando arquivos...",
	"Local Icons": "Ícones locais",
	"Lock curve button positions": "Bloquear posições dos botões curvos",
	"Main entity": "Entidade principal",
	"Move left": "Mover para a esquerda",
	"Move right": "Mover para a direita",
	"Navigation path": "Caminho de navegação",
	"Native active state color": "Cor nativa do estado ativo",
	"Native inactive state color": "Cor nativa do estado inativo",
	"No matching colors": "Nenhuma cor correspondente",
	"No matching actions": "Nenhuma ação correspondente",
	"No matching files": "Nenhum arquivo correspondente",
	"Person entity": "Entidade de pessoa",
	"Separate cards": "Cartões separados",
	Separator: "Separador",
	"State light color": "Cor de estado da luz",
	"State color (default)": "Cor de estado (padrão)",
	"State color": "Cor de estado",
	"State template": "Modelo de estado",
	"Status {index}": "Status {index}",
	"Status color": "Cor do status",
	"Status name": "Nome do status",
	"Status sensors": "Sensores de status",
	"Card background": "Fundo do cartão",
	"Force padding": "Forçar preenchimento",
	Main: "Principal",
	Overlay: "Sobreposição",
	Crop: "Recortar",
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
	"Orbit Icons": "Ícones Orbit",
	"Orbit Area Card v{version}": "Orbit Area Card v{version}",
	"Orbit Deck Card v{version}": "Orbit Deck Card v{version}",
	"Orbit Status Card v{version}": "Orbit Status Card v{version}",
	"Orbit Status Badge v{version}": "Orbit Status Badge v{version}"
}, vs = {
	de: fs,
	en: us,
	"en-gb": ds,
	en_gb: ds,
	es: ps,
	fr: ms,
	it: hs,
	nl: gs,
	"pt-br": _s,
	pt_br: _s
};
function Y(e, t, n = {}) {
	let r = Ss(e), i = r.replace("_", "-"), a = r.split("-")[0], o = ys(e, t) || xs(r, t) || xs(i, t) || xs(a, t) || vs.en[t] || t;
	return Object.entries(n).reduce((e, [t, n]) => e.replaceAll(`{${t}}`, n ?? ""), o);
}
function ys(e, t) {
	if (!e?.localize || !t) return null;
	let n = bs[t] || [];
	for (let t of n) {
		let n = e.localize(t);
		if (n && n !== t) return n;
	}
	return null;
}
var bs = {
	Add: ["ui.common.add"],
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
	Background: ["ui.panel.lovelace.editor.card.tile.background", "ui.panel.lovelace.editor.card.generic.background"],
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
	Entity: [
		"ui.components.selectors.selector.types.entity",
		"ui.components.entity.entity-picker.entity",
		"ui.panel.lovelace.editor.card.generic.entity"
	],
	Disabled: ["ui.dialogs.entity_registry.editor.disabled_label", "ui.panel.config.entities.picker.status.disabled"],
	Divider: ["ui.panel.lovelace.editor.card.entities.entity_row.divider"],
	Default: ["ui.common.default"],
	Duplicate: ["ui.common.duplicate"],
	Enabled: ["ui.dialogs.entity_registry.editor.enabled_label", "ui.panel.config.entities.picker.status.enabled"],
	Equal: ["ui.components.selectors.select.options.equal"],
	Icon: ["ui.components.selectors.selector.types.icon", "ui.panel.lovelace.editor.card.generic.icon"],
	Inactive: ["ui.components.color-picker.colors.inactive"],
	Interactions: ["ui.panel.lovelace.editor.card.tile.interactions", "ui.panel.lovelace.editor.card.generic.interactions"],
	None: ["ui.common.none"],
	Accent: ["ui.components.color-picker.colors.accent"],
	Automations: ["ui.panel.config.automation.caption", "ui.dialogs.more_info_control.add_to.automations_heading"],
	Away: ["state_badge.person.not_home"],
	Buttons: ["ui.panel.lovelace.editor.card.entities.entity_row.buttons"],
	Card: ["ui.panel.lovelace.editor.card.conditional.card"],
	"Display precision": ["ui.dialogs.entity_registry.editor.precision"],
	"Double tap behavior": ["ui.panel.lovelace.editor.card.generic.double_tap_action"],
	Home: ["state_badge.person.home"],
	Icons: ["ui.panel.lovelace.editor.features.types.climate-preset-modes.style_list.icons"],
	"Icon tap behavior": ["ui.panel.lovelace.editor.card.tile.icon_tap_action"],
	"Hold behavior": ["ui.panel.lovelace.editor.card.generic.hold_action"],
	"Icon hold behavior": ["ui.panel.lovelace.editor.card.tile.icon_hold_action"],
	"Icon double tap behavior": ["ui.panel.lovelace.editor.card.tile.icon_double_tap_action"],
	Mode: ["ui.card.climate.mode"],
	Person: ["component.person.entity_component._.name"],
	Position: ["ui.panel.lovelace.editor.card.entities.secondary_info_values.position", "ui.card.cover.position"],
	Prefix: ["ui.panel.lovelace.editor.elements.prefix"],
	Primary: ["ui.components.color-picker.colors.primary"],
	Name: ["ui.common.name"],
	Remove: ["ui.common.remove"],
	Search: ["ui.components.data-table.search", "ui.panel.lovelace.editor.card.generic.search"],
	Scenes: ["ui.panel.config.scene.caption"],
	Scripts: ["ui.panel.config.script.caption"],
	Security: ["panel.security"],
	Standard: ["ui.panel.config.energy.battery.dialog.type_standard"],
	Status: ["ui.panel.config.entities.picker.headers.status"],
	Style: ["ui.panel.lovelace.editor.features.types.climate-preset-modes.style", "ui.panel.lovelace.editor.features.types.numeric-input.style"],
	"Tap behavior": ["ui.panel.lovelace.editor.card.generic.tap_action"],
	Theme: ["ui.components.selectors.selector.types.theme", "ui.components.theme-picker.theme"],
	Top: ["ui.panel.lovelace.editor.edit_view_header.settings.badges_position_options.top"],
	Right: ["ui.panel.lovelace.editor.card.energy-date-selection.opening_directions.right"],
	Bottom: ["ui.panel.lovelace.editor.card.tile.features_position_options.bottom", "ui.panel.lovelace.editor.edit_view_header.settings.badges_position_options.bottom"],
	Left: ["ui.panel.lovelace.editor.card.energy-date-selection.opening_directions.left"],
	Width: ["ui.panel.lovelace.editor.edit_section.settings.column_span"],
	Wrap: ["ui.panel.lovelace.editor.edit_view_header.settings.badges_wrap_options.wrap"]
};
function xs(e, t) {
	let n = vs[e]?.[t];
	return n === "" ? null : n;
}
function Ss(e) {
	return (e?.locale?.language || e?.language || "en").toLowerCase();
}
//#endregion
//#region src/editors/area-card-editor.js
var Cs = class extends A {
	static svgCache = R;
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
		super.connectedCallback(), io(this), this._updateDocumentationContext();
	}
	disconnectedCallback() {
		ao(this), super.disconnectedCallback();
	}
	_getColorStyle(e) {
		return so(e);
	}
	_getColorPickerValue(e) {
		return co(e);
	}
	_t(e, t) {
		return Y(this.hass, e, t);
	}
	setConfig(e) {
		let { config: t, migrated: n } = Gt(e || {});
		this._config = t || {}, this._updateDocumentationContext(), n && this._queueConfigMigration();
	}
	_queueConfigMigration() {
		this._configMigrationQueued || (this._configMigrationQueued = !0, Promise.resolve().then(() => {
			this._configMigrationQueued = !1, this.dispatchEvent(new CustomEvent("config-changed", {
				detail: { config: Ms(this._config) },
				bubbles: !0,
				composed: !0
			}));
		}));
	}
	_updateConfig(e) {
		let t = { ...e };
		Object.prototype.hasOwnProperty.call(t, "tap_action") && t.tap_action !== void 0 && (t.navigate = void 0);
		let n = hi(this._config, t), r = Rr(n, {
			sourceKey: "main_entity_icon_source",
			entityKey: "main_entity",
			areaKey: "area",
			allowArea: !0,
			customIconKeys: [
				"main_entity_icon",
				"main_entity_icon_on",
				"main_entity_icon_off"
			]
		}), i = Object.prototype.hasOwnProperty.call(t, "main_entity_icon_source") && t.main_entity_icon_source !== "custom", a = r !== "custom" && n.main_entity_icon === "";
		(i || a) && (n.main_entity_icon = void 0), this._config = Ms(hi(n, {})), this.dispatchEvent(new CustomEvent("config-changed", {
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
		this._updateConfig(W("main_entity", Es));
	}
	_clearStatusEntity(e) {
		this._updateConfig(gi(e, Ds));
	}
	_clearButtonEntity(e) {
		this._updateConfig(gi(e, Os));
	}
	_clearCurveButtonEntity(e) {
		this._updateConfig(gi(e, ks));
	}
	_clearActionButtonEntity(e) {
		this._updateConfig(gi(e, As));
	}
	_renderInput(e, t, n = "", r = {}) {
		return fi.call(this, e, t, n, r);
	}
	_renderTemplateInput(e, t) {
		return pi.call(this, e, t);
	}
	_handleConfigUpdate(e, t) {
		this._updateConfig({ [e]: t });
	}
	_renderColor(e, t, n) {
		return yi.call(this, e, t, n);
	}
	_renderColorControl(e, t, n, r, i = n) {
		return bi.call(this, e, t, n, r, i);
	}
	_renderIconInput(e, t, n = "mdi:lightbulb or icon.svg") {
		return Lr.call(this, e, t, n);
	}
	_loadLocalIconFiles(e = "") {
		return zr.call(this, e);
	}
	_isImageIcon(e) {
		return Fr(e);
	}
	_resolveIconPath(e) {
		return Ir(e);
	}
	_getInlineSvg(e) {
		return L.call(this, e, { forceColor: !0 });
	}
	_renderEntity(e, t, n) {
		return no.call(this, e, t, n);
	}
	_renderArea(e, t) {
		return ro.call(this, e, t);
	}
	_renderAreaSection() {
		return qo.call(this);
	}
	_renderStatusSection() {
		let e = this._selectedStatusIndex || 1;
		return T`
      <div class="section">
        <div class="selector-pair status-settings-row">
          <div class="status-separator-field">
            ${this._renderInput("Separator", "status_separator", "|")}
          </div>

          ${this._renderColorControl("Color", "status_color", this._config?.status_color || this._config?.accent_color || "", (e) => this._handleConfigUpdate("status_color", e), this._config?.status_color || this._config?.accent_color || "")}
        </div>

        <div
          class="editor-segment-menu"
          style="--editor-segment-columns: 3;"
        >
          ${[
			1,
			2,
			3
		].map((t) => T`
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

          ${H.call(this, {
			label: ["Prefix", "Icon"],
			sourceKey: `status${e}_icon_source`,
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
		return Zo.call(this);
	}
	_renderCurvedButtonsSection() {
		return ts.call(this);
	}
	_renderActionButtonSection() {
		return ns.call(this);
	}
	_renderEditorTabs() {
		return T`
      <div class="editor-tabs">
        ${ws.map((e) => T`
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
		Ot(this, this._config?.type || "orbit-area-card", this._activeSection || "card");
	}
	_renderActiveSection() {
		let e = ws.find((e) => e.key === this._activeSection) || ws[0];
		return this[e.render]();
	}
	render() {
		return T`
      <div class="wrapper">
        ${this._renderEditorTabs()}
        ${this._renderActiveSection()}
        <div class="editor-version">
          ${this._t("Orbit Area Card v{version}", { version: t.area })}
        </div>
      </div>
    `;
	}
	static styles = [ls];
}, ws = [
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
], Ts = class extends Cs {};
customElements.define("orbit-area-card-editor", Cs), customElements.define("orbit-room-card-editor", Ts);
var Es = [
	"main_entity_icon_source",
	"main_entity_icon",
	"main_entity_icon_on",
	"main_entity_icon_off",
	"tap_action",
	"hold_action",
	"double_tap_action",
	"main_entity_tap_action",
	"main_entity_hold_action",
	"main_entity_double_tap_action"
], Ds = [
	"_icon_source",
	"_icon",
	"_decimal_places"
], Os = [
	"_on_color",
	"_off_color",
	"_icon_source",
	"_icon",
	"_icon_on",
	"_icon_off",
	"_state_template",
	"_tap_action",
	"_hold_action",
	"_double_tap_action"
], ks = [
	"_icon_source",
	"_icon",
	"_icon_on",
	"_icon_off",
	"_state_template",
	"_tap_action",
	"_hold_action",
	"_double_tap_action"
], As = [
	"_icon_source",
	"_icon",
	"_icon_on",
	"_icon_off",
	"_state_template",
	"_tap_action",
	"_hold_action",
	"_double_tap_action"
], js = [
	"type",
	"area_name",
	"room_name",
	"accent_color",
	"status_color",
	"area",
	"navigate",
	"tap_action",
	"hold_action",
	"double_tap_action",
	"main_entity",
	"main_entity_icon_source",
	"main_entity_icon",
	"main_entity_icon_on",
	"main_entity_icon_off",
	"main_entity_icon_svg_color_override",
	"main_entity_icon_on_svg_color_override",
	"main_entity_icon_off_svg_color_override",
	"main_entity_tap_action",
	"main_entity_hold_action",
	"main_entity_double_tap_action",
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
		`button${e}_on_color`,
		`button${e}_off_color`,
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
		`curve_button${e}_on_color`,
		`curve_button${e}_off_color`,
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
function Ms(e) {
	let t = {}, n = /* @__PURE__ */ new Set();
	return js.forEach((r) => {
		Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r], n.add(r));
	}), Object.keys(e).forEach((r) => {
		n.has(r) || (t[r] = e[r]);
	}), t;
}
//#endregion
//#region src/cards/area-card.js
var Ns = class extends A {
	static svgCache = R;
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
		let t = Ls(e), n = {
			type: "custom:orbit-area-card",
			accent_color: "blue",
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
		this._config = Gt(e).config, this._areaColor = this._computeFullColor(this._config.accent_color), this._statusColor = this._computeFullColor(this._config.status_color || this._config.accent_color), this._iconColor = this._computeIconColor(this._config.accent_color), this._circleColor = this._computeCircleColor(this._config.accent_color);
	}
	willUpdate(e) {
		return (e.has("_config") || e.has("hass")) && Ft.call(this, this._getTemplateEntries()), Pn.call(this, e);
	}
	disconnectedCallback() {
		It.call(this), this._cancelLongPress(), this._clearDoubleTapTimer(), super.disconnectedCallback();
	}
	shouldUpdate(e) {
		return Tn.call(this, e, this._getRelevantEntities(), { hasTemplates: En(this._config) });
	}
	_handleAction(e, t = null) {
		return Ve.call(this, e, t);
	}
	_navigate(e) {
		return Ge.call(this, e);
	}
	_toggleEntity(e, t, n = null) {
		return Ke.call(this, e, t, n);
	}
	_handleButtonClick(e) {
		return qe.call(this, e);
	}
	_handleButtonDoubleClick(e) {
		return Je.call(this, e);
	}
	_handleCurveButtonClick(e) {
		return Ye.call(this, e);
	}
	_handleCurveButtonDoubleClick(e) {
		return Xe.call(this, e);
	}
	_handleTap(e) {
		return Ze.call(this, e);
	}
	_handleCardPointerDown(e) {
		if (M(this) || Ps(e)) return;
		let t = this._config?.hold_action;
		if (!(!t?.action || t.action === "none")) return this._startLongPress(e, this._config.main_entity || this._config.entity, t);
	}
	_handleCardDoubleTap(e) {
		return Qe.call(this, e);
	}
	_handleMainEntityTap(e) {
		return $e.call(this, e);
	}
	_handleMainEntityDoubleTap(e) {
		return et.call(this, e);
	}
	_handleMainEntityPointerDown(e) {
		if (!M(this)) return this._startLongPress(e, this._config.main_entity || this._config.entity, this._config.main_entity_hold_action);
	}
	_handleButtonPointerDown(e) {
		if (M(this)) return;
		let t = e.currentTarget;
		return this._startLongPress(e, t.dataEntity, t.dataHoldAction);
	}
	_computeFullColor(e) {
		return rt.call(this, e);
	}
	_computeIconColor(e) {
		return it.call(this, e);
	}
	_computeCircleColor(e) {
		return at.call(this, e);
	}
	_computeButtonBackground(e) {
		return ot.call(this, e);
	}
	_getCardName(e = "Card") {
		return vt(this._config, this.hass, e);
	}
	formatState(e) {
		return Jt(e);
	}
	_getEntityActiveState(e) {
		return Yt(e);
	}
	_getMainIconColor(e, t) {
		return fn.call(this, e, t);
	}
	_getEntityColor(e) {
		return pn(e);
	}
	_isImageIcon(e) {
		return mn(e);
	}
	_resolveIconPath(e) {
		return hn(e);
	}
	_getInlineSvg(e, t = !0, n = !1) {
		return L.call(this, e, {
			forceColor: t,
			animate: n
		});
	}
	_getSvgColorOverride(e) {
		return gn(this._config, e);
	}
	get _LONG_PRESS_DELAY() {
		return 500;
	}
	_startLongPress(e, t, n) {
		return Sn.call(this, e, t, n);
	}
	_cancelLongPress() {
		return Cn.call(this);
	}
	_clearDoubleTapTimer() {
		return He.call(this);
	}
	_finishLongPress(e) {
		return wn.call(this, e);
	}
	_evaluateStateTemplate(e, t) {
		return F.call(this, e, t);
	}
	_getTemplateEntries() {
		let e = [];
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
		return e;
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
		return ir.call(this, e);
	}
	_renderCurveButtons() {
		return vr.call(this);
	}
	render() {
		return ar.call(this);
	}
	static styles = Mr;
};
function Ps(e) {
	return e.composedPath().some((e) => e?.classList ? e.classList.contains("entity-button") || e.classList.contains("curve-button") || e.classList.contains("action-button") : !1);
}
var Fs = class extends Ns {};
At({
	tag: "orbit-area-card",
	cardClass: Ns,
	name: "Orbit Area Card",
	description: "Responsive area card",
	version: t.area,
	getEntitySuggestion: Rs,
	aliases: [{
		tag: "orbit-room-card",
		cardClass: Fs
	}]
});
var Is = new Set([
	"light",
	"fan",
	"climate",
	"media_player",
	"switch",
	"cover",
	"lock"
]);
function Ls(e) {
	return Object.keys(e?.areas || {}).sort((t, n) => {
		let r = e.areas[t]?.name || t, i = e.areas[n]?.name || n;
		return r.localeCompare(i, void 0, { sensitivity: "base" });
	})[0] || "";
}
function Rs(e, t) {
	let n = On(t);
	if (!Is.has(n)) return null;
	let r = kn(e, t), i = {
		type: "custom:orbit-area-card",
		main_entity: t,
		accent_color: n === "light" ? "light" : "theme"
	};
	return r && (i.area = r), { config: i };
}
//#endregion
//#region src/common/helpers/card-layout.js
function zs({ config: e = {}, count: t = 1, wrapKey: n = "wrap", perRowKey: r, defaultColumns: i = 3 }) {
	if (!e[n]) return Math.max(1, t);
	let a = Number(e[r]);
	return Math.max(1, Math.min(t, (Number.isFinite(a) ? Math.floor(a) : i) || 1));
}
function Bs(e) {
	let t = zs(e);
	return Math.max(1, Math.ceil((e?.count || 1) / t));
}
//#endregion
//#region src/common/helpers/status-badge.js
var Vs = [
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
	}
], X = "Current state", Hs = [
	"state_source",
	"area",
	"domain",
	"device_class",
	"hide",
	"active_template",
	"inactive_template"
];
function Us(e = {}) {
	return Object.fromEntries(Hs.map((t) => [t, e[t]]));
}
function Ws(e = {}) {
	let t = Z(e);
	return t === "entity" ? { action: "more-info" } : t === "area_count" ? { action: X } : { action: "none" };
}
var Gs = new Map(Vs.map((e) => [e.value, e]));
function Ks(e = "") {
	return Gs.get(e) || {
		value: e,
		label: e ? e.replaceAll("_", " ") : "Status",
		icon: "mdi:shape"
	};
}
function Z(e = {}) {
	let t = e.state_source || "entity";
	if ([
		"entity",
		"area_count",
		"template"
	].includes(t)) return t;
	throw Error(`Invalid state_source "${t}". Expected "entity", "area_count", or "template".`);
}
function qs(e = {}) {
	let t = Z(e), n = e.domain ? Ks(e.domain) : void 0;
	if (t === "area_count" && n?.requiresDeviceClass && $s(e).length === 0) throw Error(`Orbit Status Badge requires "device_class" for domain "${e.domain}".`);
	return t;
}
function Js(e = {}) {
	if (!Object.prototype.hasOwnProperty.call(e, "hide")) return [{ type: "hidden" }];
	if (!Array.isArray(e.hide)) return [];
	let t = [], n = /* @__PURE__ */ new Set(), r = !1;
	return e.hide.forEach((e) => {
		if (e === "hidden" && !r) {
			r = !0, t.push({ type: "hidden" });
			return;
		}
		let i = typeof e?.label == "string" ? e.label.trim() : "";
		!i || n.has(i) || (n.add(i), t.push({
			type: "label",
			label: i
		}));
	}), t;
}
function Ys(e = []) {
	return e.map((e) => e?.type === "hidden" ? "hidden" : { label: e?.label });
}
function Xs(e, t, n = {}) {
	let r = Js(n), i = e?.entities?.[t];
	return r.some((e) => e.type === "hidden" ? !!i?.hidden : e.type === "label" && Array.isArray(i?.labels) && i.labels.includes(e.label));
}
function Zs(e = {}) {
	let t = Z(e), n = { ...e };
	Object.keys(n).forEach((e) => {
		(n[e] === "" || n[e] === void 0) && delete n[e];
	});
	let r = $s(n);
	return r.length === 0 ? delete n.device_class : n.device_class = r.length === 1 ? r[0] : r, n.show_state === !0 && delete n.show_state, n.show_icon === !0 && delete n.show_icon, n.show_name === !1 && delete n.show_name, n.show_entity_picture === !1 && delete n.show_entity_picture, Object.prototype.hasOwnProperty.call(n, "hide") && (n.hide = Ys(Js(n)), n.hide.length === 1 && n.hide[0] === "hidden" && delete n.hide), n.card_visibility === "always" && delete n.card_visibility, t === "entity" ? (delete n.state_source, delete n.area, delete n.domain, delete n.device_class, delete n.state_template, delete n.active_template, delete n.inactive_template, delete n.name_template, delete n.hide, n.state_content === "state" && delete n.state_content, n.tap_action?.action === "more-info" && delete n.tap_action) : t === "area_count" ? (n.state_source = "area_count", delete n.entity, delete n.state_template, delete n.active_template, delete n.inactive_template, delete n.name_template, n.state_content === "count" && delete n.state_content, n.tap_action?.action === "Current state" && delete n.tap_action) : (n.state_source = "template", n.display_style !== "badge" && delete n.entity, delete n.area, delete n.domain, delete n.device_class, delete n.hide, n.state_content === "state" && delete n.state_content, n.tap_action?.action === "none" && delete n.tap_action), n.hold_action?.action === "none" && delete n.hold_action, n.double_tap_action?.action === "none" && delete n.double_tap_action, n.icon_source === "domain" && (delete n.icon_source, delete n.icon, delete n.icon_on, delete n.icon_off), [
		"",
		"theme",
		"state",
		"state-active"
	].includes(n.accent_on_color) && delete n.accent_on_color, [
		"",
		"theme",
		"state",
		"state-inactive"
	].includes(n.accent_off_color) && delete n.accent_off_color, n;
}
function Qs(e = "") {
	return e.replaceAll("_", " ").replace(/\b\w/g, (e) => e.toUpperCase());
}
function $s(e = {}) {
	let t = Array.isArray(e?.device_class) ? e.device_class : [e?.device_class];
	return [...new Set(t.filter((e) => typeof e == "string").map((e) => e.trim()).filter(Boolean))];
}
function ec(e, t) {
	return e?.attributes?.device_class || (t === "switch" ? "switch" : "");
}
function tc(e, t = {}) {
	let n = t.domain || "", r = new Set($s(t));
	return n ? (Object.values(e?.states || {}).forEach((e) => {
		if (!e.entity_id.startsWith(`${n}.`)) return;
		let t = ec(e, n);
		t && r.add(t);
	}), [...r].sort((e, t) => e.localeCompare(t)).map((e) => ({
		value: e,
		label: Qs(e)
	}))) : [];
}
function nc(e, t = {}) {
	let n = ic(t), r = t.domain || "", i = Ks(r), a = $s(t);
	return !e || !n.length || !r || i.requiresDeviceClass && !a.length ? [] : Object.values(e.states || {}).filter((o) => o.entity_id.startsWith(`${r}.`) && n.includes(kn(e, o.entity_id)) && (!i.requiresDeviceClass || a.includes(ec(o, r))) && !Xs(e, o.entity_id, t));
}
function rc(e, t = {}) {
	if (Z(t) === "entity" || t.display_style === "badge" && t.entity) {
		let n = t.entity || t.main_entity || "", r = e?.states?.[n];
		return r ? [r] : [];
	}
	return nc(e, t);
}
function ic(e = {}) {
	return Array.isArray(e.area) ? e.area.filter(Boolean) : [e.area].filter(Boolean);
}
function ac(e, t = {}) {
	return ic(t).map((t) => e?.areas?.[t]?.name || t).filter(Boolean).join(", ");
}
function oc(e, t = {}) {
	return nc(e, t).map((e) => e.entity_id);
}
function sc(e, t = !1) {
	if (e.state === "unavailable") return "var(--state-unavailable-color)";
	let n = e.entity_id.split(".")[0], r = e.attributes || {};
	if (n === "light" && t && Array.isArray(r.rgb_color)) return lc(r.rgb_color);
	let i = cc(e.state), a = t ? "active" : "inactive";
	return [
		r.device_class ? `--state-${n}-${r.device_class}-${i}-color` : "",
		`--state-${n}-${i}-color`,
		`--state-${n}-${a}-color`,
		`--state-${a}-color`
	].filter(Boolean).reduceRight((e, t) => `var(${t}, ${e})`, "var(--state-icon-color, var(--secondary-text-color))");
}
function cc(e = "") {
	return e.toString().trim().toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
}
function lc(e) {
	let [t, n, r] = uc(e);
	return n < .4 && (n < .1 ? r = 225 : n = .4), `#${dc(t, n, r).map((e) => e.toString(16).padStart(2, "0")).join("")}`;
}
function uc([e, t, n]) {
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
function dc(e, t, n) {
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
var fc = {
	_activeEntitiesOpen: { state: !0 },
	_activeEntitiesDurationNow: { state: !0 }
};
function pc() {
	this._activeEntitiesOpen = !1, this._activeEntitiesDurationNow = Date.now(), this._activeEntitiesDurationTimer = null;
}
function mc(e = []) {
	return e.filter((e) => Yt(e));
}
function hc() {
	this._activeEntitiesOpen = !0, this._activeEntitiesDurationNow = Date.now(), gc.call(this);
}
function gc() {
	this._activeEntitiesDurationTimer === null && (this._activeEntitiesDurationTimer = window.setInterval(() => {
		if (!this._activeEntitiesOpen) {
			_c.call(this);
			return;
		}
		this._activeEntitiesDurationNow = Date.now();
	}, 6e4));
}
function _c() {
	this._activeEntitiesDurationTimer !== null && (window.clearInterval(this._activeEntitiesDurationTimer), this._activeEntitiesDurationTimer = null);
}
function vc() {
	this._activeEntitiesOpen = !1, _c.call(this);
}
function yc(e, t = []) {
	return !e || !t.length ? Promise.resolve() : this.hass?.callService(e.domain, e.service, { entity_id: t }) || Promise.resolve();
}
function bc(e) {
	e && queueMicrotask(() => this.dispatchEvent(new CustomEvent("hass-more-info", {
		detail: { entityId: e },
		bubbles: !0,
		composed: !0
	})));
}
//#endregion
//#region src/common/helpers/active-entities.js
var xc = {
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
}, Sc = /* @__PURE__ */ new Map(), Cc = /* @__PURE__ */ new Map();
function wc(e, t) {
	let n = t?.entity_id?.split(".")[0] || "", r = xc[n];
	return !r || n === "cover" && !(t.attributes?.supported_features & 2) || n === "lock" && !(t.attributes?.supported_features & 1) || e?.services?.[n] && !e.services[n][r.service] ? null : {
		domain: n,
		...r
	};
}
function Tc(e) {
	if (!e.length) return null;
	let t = e[0].control;
	return e.every(({ control: e }) => e.domain === t.domain && e.service === t.service) ? t : null;
}
function Ec(e, t) {
	let n = e?.formatEntityName?.(t) || t?.attributes?.friendly_name || t?.entity_id || "", r = kn(e, t?.entity_id), i = e?.areas?.[r]?.name?.trim();
	if (!i || n.length <= i.length) return n;
	let a = RegExp(`^${Fc(i)}(?:\\s*[-–—:|]\\s*|\\s+)`, "i");
	return n.replace(a, "").trim() || n;
}
function Dc(e) {
	let t = e?.locale?.language || e?.language || "en";
	return Sc.has(t) || Sc.set(t, new Intl.Collator(t, {
		numeric: !0,
		sensitivity: "base"
	})), Sc.get(t);
}
function Oc(e, t) {
	let n = e?.formatEntityState?.(t);
	if (n) return n;
	let r = String(t?.state || "").replaceAll("_", " ");
	return r ? r[0].toUpperCase() + r.slice(1) : "";
}
function kc(e, t, n) {
	return e.compare(t.name, n.name) || t.stateObj.entity_id.localeCompare(n.stateObj.entity_id);
}
function Ac(e, t) {
	let n = 132 + e.reduce((e, { name: t }) => Math.max(e, t.length), 0) * 8;
	return Math.min(520, Math.max(t ? 360 : 280, n));
}
function jc(e, t, n = Date.now()) {
	let r = Date.parse(t?.last_changed || "");
	if (!Number.isFinite(r)) return "";
	let i = Math.max(0, n - r), a, o;
	i >= 864e5 ? (a = "days", o = Math.round(i / 864e5)) : i >= 36e5 ? (a = "hours", o = Math.round(i / 36e5)) : (a = "minutes", o = Math.max(1, Math.round(i / 6e4)));
	let s = String(e?.locale?.language || e?.language || "en").replace("_", "-");
	try {
		let e = Pc(s).format({ [a]: o });
		return s.toLowerCase().startsWith("en") ? e.replace(/\b(days?|hours?|minutes?)\b/, (e) => e[0].toUpperCase() + e.slice(1)) : e;
	} catch {
		let e = a.slice(0, -1), t = o === 1 ? e : a;
		return `${o} ${t[0].toUpperCase()}${t.slice(1)}`;
	}
}
function Mc(e, t) {
	return e?.services?.[t.domain]?.[t.service]?.name;
}
function Nc(e) {
	return `color:${pn(e) || sc(e, !0)};--mdc-icon-size:36px`;
}
function Pc(e) {
	return Cc.has(e) || Cc.set(e, new Intl.DurationFormat(e, { style: "long" })), Cc.get(e);
}
function Fc(e) {
	return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
//#endregion
//#region src/common/renders/active-entities-dialog.js
function Ic(e = []) {
	if (!this._activeEntitiesOpen) return D;
	let t = Dc(this.hass), n = e.map((e) => {
		let t = wc(this.hass, e);
		return {
			stateObj: e,
			control: t,
			name: Ec(this.hass, e),
			serviceName: t ? Mc(this.hass, t) : ""
		};
	}).sort((e, n) => kc(t, e, n)), r = n.filter((e) => e.control), i = Tc(r), a = i ? Mc(this.hass, i) : "", o = Ac(n, i), s = [
		`--ha-dialog-width-sm:${o}px`,
		`--mdc-dialog-min-width:${o}px`,
		`--mdc-dialog-max-width:${o}px`
	].join(";"), c = Oc(this.hass, n[0]?.stateObj), l = c ? this._t("Currently {state}", { state: c }) : this._t("Current state");
	return T`
    <ha-adaptive-dialog
      .open=${!0}
      width="small"
      style=${s}
      @closed=${() => vc.call(this)}
    >
      <ha-icon-button
        slot="headerNavigationIcon"
        .label=${this.hass?.localize?.("ui.common.close")}
        @click=${() => vc.call(this)}
      >
        <ha-icon icon="mdi:close"></ha-icon>
      </ha-icon-button>
      <span slot="headerTitle">${l}</span>
      ${i ? T`
            <ha-button
              slot="headerActionItems"
              appearance="filled"
              @click=${async () => {
		await yc.call(this, i, r.map((e) => e.stateObj.entity_id)), vc.call(this);
	}}
            >
              <ha-icon slot="start" .icon=${i.icon}></ha-icon>
              ${a} (${r.length})
            </ha-button>
          ` : ""}
      <div class="active-entities-dialog-content">
        ${n.length ? n.map(({ stateObj: e, name: t, control: n, serviceName: r }) => T`
              <div class="active-entity-row">
                ${n ? T`
                      <button
                        type="button"
                        class="active-entity-control-button"
                        aria-label=${r}
                        title=${r}
                        @click=${(t) => {
		t.stopPropagation(), yc.call(this, n, [e.entity_id]);
	}}
                      >
                        <ha-state-icon
                          .hass=${this.hass}
                          .stateObj=${e}
                          style=${Nc(e)}
                        ></ha-state-icon>
                      </button>
                    ` : T`
                      <ha-state-icon
                        .hass=${this.hass}
                        .stateObj=${e}
                        style=${Nc(e)}
                      ></ha-state-icon>
                    `}
                <button
                  type="button"
                  class="active-entity-info"
                  @click=${() => bc.call(this, e.entity_id)}
                >
                  <span class="active-entity-name">${t}</span>
                  <span class="active-entity-state-line">
                    <state-display
                      .hass=${this.hass}
                      .stateObj=${e}
                    ></state-display>
                    <span aria-hidden="true">-</span>
                    <span>${jc(this.hass, e, this._activeEntitiesDurationNow)}</span>
                  </span>
                </button>
              </div>
            `) : T`
              <div class="active-entities-empty">
                ${this._t("No active entities")}
              </div>
            `}
      </div>
    </ha-adaptive-dialog>
  `;
}
//#endregion
//#region src/cards/status/helpers/attributes.js
function Q(e, t) {
	let n = e?.attributes?.[t];
	return n == null || typeof n == "string" && n.trim() === "" ? null : n;
}
function Lc(e) {
	let t = e.navigate?.navigation_path;
	return typeof t == "string" && t.trim() || null;
}
function Rc(e, t, n) {
	let r = Q(t, "color");
	return n ? e.accent_on_color || r || "theme" : e.accent_off_color || r || "theme";
}
function zc(e, t = null, n = null) {
	if (!e) return !1;
	let r = (n ?? e.state)?.toString().trim().toLowerCase(), i = Number(r);
	if (Number.isFinite(i)) return i > 0;
	if (Bc.includes(r)) return !1;
	let a = e.entity_id?.split(".")[0];
	return [
		"sensor",
		"input_text",
		"input_select",
		"select"
	].includes(a) ? !0 : typeof t == "function" ? t(e) : !0;
}
var Bc = [
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
function Vc(e, t) {
	let n = Q(t, "navigation"), r = typeof n == "string" ? n.trim() : n?.navigation_path;
	return Lc(e) || r || "/lovelace/home";
}
//#endregion
//#region src/common/helpers/zones.js
var Hc = /* @__PURE__ */ new WeakMap();
function Uc(e) {
	let t = e?.states;
	if (!t) return {
		zones: [],
		zoneByTrackerState: /* @__PURE__ */ new Map()
	};
	let n = Hc.get(t);
	if (n) return n;
	let r = Object.values(t).filter((e) => e.entity_id?.startsWith("zone.") && !e.attributes?.passive), i = {
		zones: r,
		zoneByTrackerState: new Map(r.map((e) => [Wc(e), e]))
	};
	return Hc.set(t, i), i;
}
function Wc(e) {
	return (e.attributes?.friendly_name || e.entity_id.replace(/^zone\./, "")).toLowerCase().replace(/\s+/g, "_");
}
//#endregion
//#region src/cards/status/helpers/lifecycle.js
function Gc(e) {
	if (!e.has("_config") && !e.has("hass") && !e.has("_templateRevision")) return;
	if (this._config.mode === "person") {
		Xc.call(this);
		return;
	}
	if (this._config.mode === "icon_only") {
		let e = Kc(this._config);
		this._statusItems = e.map((e) => qc.call(this, e, this._config)), Yc.call(this, this._statusItems[0] || {});
		return;
	}
	let t = this._config.entity, n = qc.call(this, { entity: t }, this._config);
	this._statusItems = [n], Yc.call(this, n);
}
function Kc(e = {}) {
	return Array.isArray(e.entities) && e.entities.length ? e.entities.map((e) => typeof e == "string" ? { entity: e } : e || {}) : [{
		entity: e.entity,
		...Us(e),
		accent_on_color: e.accent_on_color,
		accent_off_color: e.accent_off_color,
		main_entity_icon_source: e.main_entity_icon_source,
		main_entity_icon: e.main_entity_icon,
		main_entity_icon_on: e.main_entity_icon_on,
		main_entity_icon_off: e.main_entity_icon_off,
		main_entity_icon_svg_color_override: e.main_entity_icon_svg_color_override,
		main_entity_icon_on_svg_color_override: e.main_entity_icon_on_svg_color_override,
		main_entity_icon_off_svg_color_override: e.main_entity_icon_off_svg_color_override,
		state_template: e.state_template,
		name_template: e.name_template,
		tap_action: e.tap_action,
		hold_action: e.hold_action,
		double_tap_action: e.double_tap_action,
		main_entity_tap_action: e.main_entity_tap_action,
		main_entity_hold_action: e.main_entity_hold_action,
		main_entity_double_tap_action: e.main_entity_double_tap_action
	}];
}
function qc(e, t = {}) {
	let n = {
		...t,
		...e
	}, r = Z(n), i = e.entity || t.entity, a = r === "area_count" ? nc(this.hass, n) : [], o = a.filter((e) => this._getEntityActiveState(e)), s = r === "area_count" ? o[0] || a[0] || null : i && this.hass ? this.hass.states[i] : null, c = i || s?.entity_id || "";
	n.entity = c;
	let l = n.mode !== "icon_only" && Object.prototype.hasOwnProperty.call(n, "name") && n.name !== void 0 && n.name !== "", u = r !== "area_count" && n.state_template ? this._evaluateStateTemplate(n.state_template, c) : null, d = r === "template" && n.active_template ? this._evaluateStateTemplate(n.active_template, c) : null, f = r === "template" && n.inactive_template ? this._evaluateStateTemplate(n.inactive_template, c) : null, p = r !== "area_count" && n.name_template ? this._evaluateStateTemplate(n.name_template, c) : null, m = p === null ? l ? yt(n.name, n, this.hass) : Q(s, "friendly_name") || c || Y(this.hass, "Status") : String(p), ee = r === "template" ? n.state_template ? String(u ?? "") : s ? Q(s, "label") || this.formatState(s) : "" : r === "area_count" ? String(o.length) : Q(s, "label") || (s ? this.formatState(s) : ""), h = n.main_entity_icon, te = n.main_entity_icon_on, ne = n.main_entity_icon_off, re = !!(n.state_template || n.active_template || n.inactive_template), g = r === "template" ? re ? I(d) ? !0 : I(f) ? !1 : I(u) : s ? this._getEntityActiveState(s) : !1 : r === "area_count" ? o.length > 0 : zc(s, (e) => this._getEntityActiveState(e), u), _ = Jc(n, c), ie = _ === "custom" && ((g ? te : ne) || h) || "", ae = ie || (r === "area_count" ? Ks(n.domain).icon : "mdi:information-outline"), v = _ === "custom" && g && te ? "main_entity_icon_on" : _ === "custom" && !g && ne ? "main_entity_icon_off" : _ === "custom" && h ? "main_entity_icon" : "", y = Rc(n, s, g), b = Vc(n, s), oe = this._computeFullColor(y), x = this._computeFullColor(y), se = this._computeCircleColor(y), ce = g ? this._computeFullColor(y) : this._computeIconColor(y);
	return {
		...e,
		entityId: c,
		stateObj: s,
		useStateIcon: r !== "area_count" && !!s && !ie,
		cardName: m,
		statusText: ee,
		icon: ae,
		navigationPath: b,
		nameColor: oe,
		statusColor: x,
		circleColor: se,
		iconColor: ce,
		svgForceColor: v ? this._getSvgColorOverride(n, v) : !0
	};
}
function Jc(e, t) {
	let n = e.main_entity_icon_source, r = !!t, i = !!(e.main_entity_icon || e.main_entity_icon_on || e.main_entity_icon_off);
	return n === "custom" ? "custom" : n === "entity" && r ? "entity" : i ? "custom" : "entity";
}
function Yc(e) {
	this._cardName = e.cardName ?? Y(this.hass, "Status"), this._statusText = e.statusText || "", this._icon = e.icon || "mdi:information-outline", this._mainStateObj = e.stateObj || null, this._useNativeMainIcon = e.useStateIcon ?? !1, this._navigationPath = e.navigationPath || "", this._nameColor = e.nameColor || this._nameColor, this._statusColor = e.statusColor || this._statusColor, this._circleColor = e.circleColor || this._circleColor, this._iconColor = e.iconColor || this._iconColor, this._iconSvgForceColor = e.svgForceColor ?? !0;
}
function Xc() {
	let e = this._config.entity, t = this._config.tracker_entity, n = this._config.eta_entity, r = t && this.hass ? this.hass.states[t] : null, i = e && this.hass ? this.hass.states[e] : null, a = n && this.hass ? this.hass.states[n] : null, o = Object.prototype.hasOwnProperty.call(this._config, "name") && this._config.name !== void 0 && this._config.name !== "";
	this._cardName = o ? yt(this._config.name, this._config, this.hass) : Q(i, "friendly_name") || Q(r, "friendly_name") || e || t || Y(this.hass, "Person");
	let s = this._config.name_template ? this._evaluateStateTemplate(this._config.name_template, t) : null;
	s !== null && (this._cardName = String(s));
	let c = r ? Qc.call(this, r) : "", l = a && r?.state !== "home" ? this.formatState(a) : "";
	this._statusText = l ? `${c} | ${l}` : c;
	let u = zc(r, (e) => this._getEntityActiveState(e), this._config.state_template ? this._evaluateStateTemplate(this._config.state_template, t) : null), d = Rc(this._config, r, u);
	this._personPicture = Q(i, "entity_picture") || Q(r, "entity_picture") || "", this._personZoneIcon = Zc.call(this, r, i), this._personBattery1 = $c.call(this, this._config.battery_entity_1), this._personBattery2 = $c.call(this, this._config.battery_entity_2), this._icon = Q(i, "icon") || Q(r, "icon") || "mdi:account", this._navigationPath = Vc(this._config, r), this._nameColor = this._computeFullColor(d), this._statusColor = this._computeFullColor(d), this._circleColor = this._computeCircleColor(d), this._iconColor = u ? this._computeFullColor(d) : this._computeIconColor(d), this._iconSvgForceColor = !0;
}
function Zc(e, t) {
	if (e?.state === "home") return "mdi:home-variant";
	let n = Uc(this.hass), r = t?.entity_id;
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
function Qc(e) {
	let t = e?.state;
	return t ? t === "home" ? Y(this.hass, "Home") : t === "not_home" ? Y(this.hass, "Away") : t.replace(/_/g, " ").replace(/\b\w/g, (e) => e.toUpperCase()) : "";
}
function $c(e) {
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
function el() {
	return j(this._config.hold_action) ? this._config.hold_action : null;
}
function tl() {
	return j(this._config.double_tap_action) ? this._config.double_tap_action : null;
}
function nl() {
	return j(this._config.main_entity_hold_action) ? this._config.main_entity_hold_action : null;
}
function rl() {
	let e = ol(this), t = e.main_entity_tap_action;
	return t?.action === "none" ? null : t?.action ? t : Z(e) === "area_count" ? { action: X } : this._isIconOnlyMode() || this._isPersonMode() ? null : { action: "more-info" };
}
function il() {
	return j(this._config.main_entity_double_tap_action) ? this._config.main_entity_double_tap_action : null;
}
function al() {
	let e = ol(this), t = Z(e);
	if (t === "area_count" || t === "template") return e.tap_action?.action ? e.tap_action : { action: "more-info" };
	let n = {
		action: this._isIconOnlyMode() || this._isPersonMode() ? "more-info" : "navigate",
		navigation_path: this._navigationPath || "/lovelace/home"
	}, r = this._config.tap_action;
	return r?.action ? r : n;
}
function ol(e) {
	if (e._config?.mode !== "icon_only") return e._config || {};
	let t = Array.isArray(e._config?.entities) ? e._config.entities[0] : null;
	return t && typeof t == "object" ? {
		...e._config,
		...t
	} : e._config || {};
}
function sl(e = 0) {
	let t = this._statusItems?.[e];
	return t?.tap_action?.action ? t.tap_action : this._config.tap_action?.action ? this._config.tap_action : { action: "more-info" };
}
function cl(e = 0) {
	let t = this._statusItems?.[e];
	return j(t?.hold_action) ? t.hold_action : j(this._config.hold_action) ? this._config.hold_action : null;
}
function ll(e = 0) {
	let t = this._statusItems?.[e];
	return j(t?.double_tap_action) ? t.double_tap_action : j(this._config.double_tap_action) ? this._config.double_tap_action : null;
}
function ul(e = 0) {
	let t = this._statusItems?.[e];
	return t?.main_entity_tap_action?.action && t.main_entity_tap_action.action !== "none" ? t.main_entity_tap_action : this._config.main_entity_tap_action?.action && this._config.main_entity_tap_action.action !== "none" ? this._config.main_entity_tap_action : Z(t) === "area_count" ? {
		action: X,
		status_index: e
	} : this._getStatusItemCardTapAction(e);
}
function dl(e = 0) {
	let t = this._statusItems?.[e];
	return j(t?.main_entity_double_tap_action) ? t.main_entity_double_tap_action : j(this._config.main_entity_double_tap_action) ? this._config.main_entity_double_tap_action : null;
}
function fl(e = 0) {
	let t = this._statusItems?.[e];
	return t?.main_entity_hold_action?.action ? t.main_entity_hold_action.action === "none" ? null : t.main_entity_hold_action : this._config.main_entity_hold_action?.action ? this._config.main_entity_hold_action.action === "none" ? null : this._config.main_entity_hold_action : null;
}
//#endregion
//#region src/cards/status/renders/status-card.js
function pl() {
	let e = this._config?.mode || "standard", t = this._statusItems || [], n = e === "icon_only" && t.length > 1, r = Math.max(t.length, 1), i = this._getStatusColumnCount(r), a = this._getStatusRowCount(r), o = bl(this._statusText), s = this._isImageIcon(this._icon) ? this._resolveIconPath(this._icon) : "", c = s ? this._getInlineSvg(s, this._iconSvgForceColor) : "";
	return T`
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
        ${n ? ml.call(this, t, i) : T`
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
          ${e === "person" ? gl.call(this) : this._isImageIcon(this._icon) ? T`
                <div
                  class="main-image-icon"
                >
                  ${c ? z(c) : T`<img src=${s} alt="" />`}
                </div>
              ` : this._useNativeMainIcon && this._mainStateObj ? T`
                <ha-state-icon
                  class="main-icon"
                  .stateObj=${this._mainStateObj}
                ></ha-state-icon>
              ` : T`
                <ha-icon
                  class="main-icon"
                  .icon=${this._icon}
                ></ha-icon>
            `}
          ${vl(this._mainStateObj)}
        </div>

        ${e === "icon_only" ? T`
              <div
                class="status-badge"
                ?hidden=${!o}
              >
                ${o}
              </div>
            ` : T`
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
function ml(e, t) {
	return T`
    <div class="status-icon-grid">
      ${xl(e, t).map((e, n) => T`
        <div class="status-icon-row">
          ${e.map((e, r) => hl.call(this, e, n * t + r))}
          ${Sl(e.length, t, "status-icon-spacer")}
        </div>
      `)}
    </div>
  `;
}
function hl(e, t) {
	let n = bl(e.statusText), r = this._isImageIcon(e.icon) ? this._resolveIconPath(e.icon) : "", i = r ? this._getInlineSvg(r, e.svgForceColor) : "", a = T`
    <div class="circle status-circle">
      ${this._isImageIcon(e.icon) ? T`
            <div class="main-image-icon">
              ${i ? z(i) : T`<img src=${r} alt="" />`}
            </div>
          ` : e.useStateIcon && e.stateObj ? T`
            <ha-state-icon
              class="main-icon"
              .stateObj=${e.stateObj}
            ></ha-state-icon>
          ` : T`
            <ha-icon
              class="main-icon"
              .icon=${e.icon}
            ></ha-icon>
          `}
      ${vl(e.stateObj)}
    </div>

    <div
      class="status-badge"
      ?hidden=${!n}
    >
      ${n}
    </div>
  `;
	return (this._statusItems?.length || 0) > 1 && !this._config?.separate_cards ? T`
      <div
        class="status-icon-item"
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
        ${a}
      </div>
    ` : T`
    <ha-card
      class="status-icon-item"
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
      ${a}
    </ha-card>
  `;
}
function gl() {
	return T`
    <div class="person-main-icon">
      ${this._personPicture ? T`
            <img
              class="person-picture"
              src=${this._personPicture}
              alt=""
            />
          ` : T`
          <ha-icon
            class="person-fallback-icon"
            .icon=${this._icon || "mdi:account"}
          ></ha-icon>
          `}

      ${_l.call(this, "zone", this._personZoneIcon || "mdi:home-minus", this._computeFullColor("blue"))}

      ${this._personBattery1 ? _l.call(this, "battery-1", null, this._personBattery1.color, this._personBattery1.entityId, this._personBattery1.stateObj) : ""}

      ${this._personBattery2 ? _l.call(this, "battery-2", null, this._personBattery2.color, this._personBattery2.entityId, this._personBattery2.stateObj) : ""}
    </div>
  `;
}
function _l(e, t, n, r = null, i = null) {
	let a = yl(i);
	return T`
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
        ${i ? T`
              <ha-state-icon
                class=${a ? "charging" : ""}
                .stateObj=${i}
              ></ha-state-icon>
            ` : T`<ha-icon .icon=${t}></ha-icon>`}
      </span>
      ${vl(i)}
    </span>
  `;
}
function vl(e) {
	return Xt(e) ? T`
        <ha-tile-badge
          class="entity-unavailable-badge"
          title="Unavailable"
          aria-label="Unavailable"
        >
          <ha-icon .icon=${"mdi:exclamation-thick"}></ha-icon>
        </ha-tile-badge>
      ` : "";
}
function yl(e) {
	let t = e?.attributes || {};
	return String(t.icon || "").toLowerCase().includes("battery-charging") || t.battery_charging === !0 || t.is_charging === !0 || t.charging === !0;
}
function bl(e) {
	let t = String(e || "").match(/-?\d+(?:\.\d+)?/);
	return (t ? Number(t[0]) : null) === 0 ? "" : t?.[0] || "";
}
function xl(e, t = 1) {
	let n = Math.max(1, t), r = [];
	for (let t = 0; t < e.length; t += n) r.push(e.slice(t, t + n));
	return r;
}
function Sl(e, t, n) {
	let r = Math.max(0, t - e);
	return Array.from({ length: r }, () => T`
    <div class=${n}></div>
  `);
}
//#endregion
//#region src/cards/status/styles/status-card-styles.js
var Cl = [
	xr,
	Sr,
	Cr,
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
], wl = d`
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
    min-height: 56px;
    padding: var(--ha-space-2, 8px) 0;
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
    gap: 2px;
    padding: var(--ha-space-2, 8px) 0;
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

  .active-entity-state-line {
    display: flex;
    align-items: baseline;
    gap: 5px;
    color: var(--secondary-text-color);
    font-size: var(--ha-font-size-s, 12px);
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
`;
//#endregion
//#region src/common/editor/helpers/group-options.js
function Tl({ config: e = {}, itemCount: t = 0, wrapEnabled: n = !!e?.wrap, perRowKey: r = "items_per_row", defaultPerRow: i = 3, scrollThreshold: a = 6 } = {}) {
	let o = Math.max(1, Number(e?.[r]) || i), s = !!n && t > o;
	return {
		itemsPerRow: o,
		shouldWrapTabs: s,
		showTabScrollHint: !s && t > a || s && o > a
	};
}
function El({ itemCount: e = 0, classPrefix: t, wrapKey: n = "wrap", wrapEnabled: r = !!this._config?.[n], showWrapToggle: i = !0, showSeparateToggle: a = e > 1, separateKey: o = "separate_cards", perRowKey: s = "items_per_row", perRowLabel: c = "Items per row", defaultPerRow: l = 3 } = {}) {
	let u = t || "action";
	return T`
    <div class="${u}-group-options">
      ${i ? T`
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

      ${a ? T`
            <label class="${u}-wrap-toggle">
              <span>${this._t("Separate cards")}</span>
              <ha-switch
                .checked=${!!this._config?.[o]}
                @change=${(e) => this._updateConfig({ [o]: e.target.checked })}
              ></ha-switch>
            </label>
          ` : ""}

      ${r ? T`
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
function Dl(e) {
	let t = e === "entity" ? "more-info" : e === "area_count" ? X : "none", n = {
		id: X,
		primary: this._t("Current state"),
		icon: "mdi:format-list-bulleted"
	};
	return T`
    <ha-expansion-panel
      class="badge-interactions-panel"
      outlined
      .expanded=${this._interactionsExpanded === !0}
      @expanded-changed=${(e) => {
		this._interactionsExpanded = e.detail.expanded;
	}}
    >
      <ha-icon slot="leading-icon" icon="mdi:gesture-tap-button"></ha-icon>
      <div slot="header" role="heading" aria-level="3">
        ${this._t("Interactions")}
      </div>
      <div class="badge-interactions-content">
        ${sa.call(this, "Tap behavior", "tap_action", t, e === "area_count" ? { extraActions: [n] } : void 0)}
        ${sa.call(this, "Hold behavior", "hold_action", "none")}
        ${sa.call(this, "Double tap behavior", "double_tap_action", "none")}
      </div>
    </ha-expansion-panel>
  `;
}
function Ol(e = "entity") {
	let t = this._config?.icon_source || (this._config?.icon ? "custom" : "domain");
	return T`
    <div class="field main-entity-icon-source-field">
      <div class="field-header">
        <label>${this._t("Icon")}</label>
        <ha-selector
          class="main-entity-icon-source-selector"
          .hass=${this.hass}
          .selector=${{ button_toggle: { options: [{
		label: this._t(e === "entity" ? "Entity" : e === "area_count" ? "Domain" : "Default"),
		value: "domain"
	}, {
		label: this._t("Custom"),
		value: "custom"
	}] } }}
          .value=${t}
          @value-changed=${(e) => e.detail.value === "custom" ? this._handleConfigUpdate("icon_source", "custom") : this._updateConfig({
		icon_source: void 0,
		icon: void 0,
		icon_on: void 0,
		icon_off: void 0
	})}
        ></ha-selector>
      </div>

      ${t === "custom" ? T`
            ${this._renderIconInput("", "icon")}
            <div class="icon-pair">
              ${this._renderIconInput(["Active", "Icon"], "icon_on")}
              ${this._renderIconInput(["Inactive", "Icon"], "icon_off")}
            </div>
          ` : ""}
    </div>
  `;
}
function kl({ stateSource: e, domainConfig: t, deviceClassOptions: n, badgeMode: r, showInactiveTemplate: i = r, showNameTemplate: a = !r, preserveStateConfig: o = !1, renderEntityPicker: s, areaMultiple: c = !1, renderAreaPicker: l }) {
	let u = this._config?.domain || "", d = $s(this._config), f = r ? this._config?.card_visibility || "always" : e, p = r ? [
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
	return T`
    <div class="field main-entity-icon-source-field">
      ${r ? T`
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
          .selector=${{ button_toggle: { options: p } }}
          .value=${f}
          @value-changed=${(e) => {
		let t = e.detail.value || (r ? "always" : "entity");
		if (r) {
			this._updateConfig(t === "always" ? {
				card_visibility: void 0,
				state_source: void 0,
				area: void 0,
				domain: void 0,
				device_class: void 0,
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
				state_template: void 0,
				name_template: void 0,
				state_content: void 0
			});
			return;
		}
		if (o) {
			this._updateConfig({ state_source: t === "entity" ? void 0 : t });
			return;
		}
		this._updateConfig(t === "entity" ? {
			state_source: void 0,
			area: void 0,
			domain: void 0,
			device_class: void 0,
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
			state_content: void 0
		});
	}}
        ></ha-selector>
      </div>

      ${!r && e === "entity" ? s ? s() : T`
            <ha-selector
              .hass=${this.hass}
              .label=${this._t("Entity")}
              .selector=${{ entity: {} }}
              .required=${!1}
              .value=${this._config?.entity || ""}
              @value-changed=${(e) => this._handleConfigUpdate("entity", e.detail.value || "")}
            ></ha-selector>
            ` : !r && e === "area_count" ? T`
            ${l ? l() : c ? Fl.call(this, {
		config: this._config,
		updateConfig: (e) => this._updateConfig(e)
	}) : T`
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
                .value=${u}
                .label=${this._t("Domain")}
                .placeholder=${this._t("Domain")}
                use-top-label
                .getItems=${() => Ml.call(this)}
                .valueRenderer=${(e) => Nl.call(this, e)}
                .rowRenderer=${Pl}
                @value-changed=${(e) => this._updateConfig({
		domain: e.detail.value || void 0,
		device_class: void 0
	})}
              ></ha-generic-picker>
            </div>

            ${t?.requiresDeviceClass && n.length > 0 ? T`
                  <div class="field">
                    <label>${this._t("Device class")}</label>
                    <div class="status-badge-device-class-options">
                      ${n.map((e) => T`
                          <ha-checkbox
                            .checked=${d.includes(e.value)}
                            .value=${e.value}
                            @change=${(t) => {
		let n = t.target.checked ? [...new Set([...d, e.value])] : d.filter((t) => t !== e.value);
		this._handleConfigUpdate("device_class", n.length ? n : void 0);
	}}
                          >${e.label}</ha-checkbox>
                        `)}
                    </div>
                  </div>
                ` : ""}

            ${jl.call(this)}
          ` : f === "template" ? T`
              ${r ? "" : s ? s("") : T`
                    <ha-selector
                      .hass=${this.hass}
                      .label=${""}
                      .selector=${{ entity: {} }}
                      .required=${!1}
                      .value=${this._config?.entity || ""}
                      @value-changed=${(e) => this._handleConfigUpdate("entity", e.detail.value || "")}
                    ></ha-selector>
                    `}
              <div class="field">
                <ha-selector
                  .hass=${this.hass}
                  .label=${this._t("Active template")}
                  .selector=${{ template: {} }}
                  .value=${this._config?.active_template || ""}
                  @value-changed=${(e) => this._handleConfigUpdate("active_template", e.detail.value || void 0)}
                ></ha-selector>
                ${Al.call(this, this._config?.active_template, this._config?.entity || "")}
              </div>
              ${i ? T`
                    <div class="field">
                      <ha-selector
                        .hass=${this.hass}
                        .label=${this._t("Inactive template")}
                        .selector=${{ template: {} }}
                        .value=${this._config?.inactive_template || ""}
                        @value-changed=${(e) => this._handleConfigUpdate("inactive_template", e.detail.value || void 0)}
                      ></ha-selector>
                      ${Al.call(this, this._config?.inactive_template, this._config?.entity || "")}
                    </div>
                  ` : ""}
              ${a ? T`
                    <div class="field">
                      <ha-selector
                        .hass=${this.hass}
                        .label=${this._t("Name template")}
                        .selector=${{ template: {} }}
                        .value=${this._config?.name_template || ""}
                        @value-changed=${(e) => this._handleConfigUpdate("name_template", e.detail.value || void 0)}
                      ></ha-selector>
                      ${Al.call(this, this._config?.name_template)}
                    </div>
                  ` : ""}
            ` : ""}
    </div>
  `;
}
function Al(e, t = "") {
	let n = Lt.call(this, e, t);
	return n ? T`<ha-alert alert-type="error">${n}</ha-alert>` : "";
}
function jl() {
	let e = Js(this._config), t = e.some((e) => e.type === "hidden"), n = e.filter((e) => e.type === "label").map((e) => e.label), r = ({ hidden: e = t, labels: r = n } = {}) => {
		this._updateConfig({ hide: Ys([...e ? [{ type: "hidden" }] : [], ...r.map((e) => ({
			type: "label",
			label: e
		}))]) });
	};
	return T`
    <div class="field">
      <label>${this._t("Hide")}</label>

      <div class="status-badge-hide-hidden-row">
        <button
          type="button"
          class=${t ? "name-picker-chip" : "name-picker-add-chip"}
          @click=${() => r({ hidden: !t })}
        >
          <ha-icon icon=${t ? "mdi:eye-off" : "mdi:plus"}></ha-icon>
          <span>${this._t("Hidden entities")}</span>
          ${t ? T`<ha-icon
                class="name-picker-chip-remove"
                icon="mdi:close"
              ></ha-icon>` : ""}
        </button>
      </div>

      <ha-selector
        .hass=${this.hass}
        .selector=${{ label: { multiple: !0 } }}
        .value=${n}
        @value-changed=${(e) => r({ labels: Array.isArray(e.detail.value) ? e.detail.value : [] })}
      ></ha-selector>
    </div>
  `;
}
function Ml() {
	return Vs.map((e) => ({
		id: e.value,
		primary: this._t(e.label),
		sorting_label: this._t(e.label),
		icon: e.icon
	}));
}
function Nl(e) {
	let t = Vs.find((t) => t.value === e);
	return t ? T`
    <ha-icon slot="start" .icon=${t.icon}></ha-icon>
    <span slot="headline">${this._t(t.label)}</span>
  ` : "";
}
function Pl(e, t) {
	return T`
    <ha-combo-box-item type="button" compact .borderTop=${t !== 0}>
      <ha-icon slot="start" .icon=${e.icon}></ha-icon>
      <span slot="headline">${e.primary}</span>
    </ha-combo-box-item>
  `;
}
function Fl({ config: e = this._config || {}, updateConfig: t = (e) => this._updateConfig(e) } = {}) {
	let n = Array.isArray(e.area), r = n ? e.area : [], i = Object.values(this.hass?.areas || {}).sort((e, t) => (e.name || e.area_id).localeCompare(t.name || t.area_id)), a = [{
		value: "__multiple__",
		label: this._t("Multiple")
	}, ...i.map((e) => ({
		value: e.area_id,
		label: e.name || e.area_id
	}))];
	return T`
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

    ${n ? T`
          <div class="field">
            <label>${this._t("Areas")}</label>
            <div class="status-badge-device-class-options">
              ${i.map((e) => T`
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
function Il() {
	let e = this._config?.mode || "standard", t = e === "icon_only", n = e === "person", r = n ? "entity" : Z(this._config), i = r === "area_count" || r === "template" || t || n ? "more-info" : "navigate", a = this._config?.tap_action?.action || i, o = r === "area_count" ? X : t || n ? a : "more-info";
	return T`
    <div class="section">
      <div class="field editor-button-toggle-field">
        <div class="field-header">
          <label>${this._t("Mode")}</label>

          <ha-selector
            class="editor-header-button-toggle status-mode-selector"
            .hass=${this.hass}
            .selector=${{ button_toggle: { options: Kl.call(this) } }}
            .value=${e}
            @value-changed=${(e) => this._handleStatusModeChange(e.detail.value || "standard")}
          ></ha-selector>
        </div>
      </div>
    </div>

    ${t ? Rl.call(this, {
		cardActionDefault: i,
		mainEntityActionDefault: o
	}) : T`
          <div class="section">
            ${n ? Bl.call(this, T`
                  ${Ll.call(this)}
                  ${this._renderEntity("Person entity", "entity")}
                  ${this._renderEntity("Tracker entity", "tracker_entity")}
                  ${this._renderEntity("ETA entity", "eta_entity")}
                  ${this._renderEntity("Battery entity {index}", "battery_entity_1", { index: 1 })}
                  ${this._renderEntity("Battery entity {index}", "battery_entity_2", { index: 2 })}
                  <div class="color-pair">
                    ${this._renderColor([
		"Accent",
		"Active",
		"Color"
	], "accent_on_color")}
                    ${this._renderColor([
		"Accent",
		"Inactive",
		"Color"
	], "accent_off_color")}
                  </div>
                `) : T`
                  ${zl.call(this, this._config, "entity", (e) => this._updateConfig(e), (e) => this._handleEntityUpdate("entity", e))}
                  ${Bl.call(this, T`
                    ${Ll.call(this)}
                    <div class="color-pair">
                      ${this._renderColor([
		"Accent",
		"Active",
		"Color"
	], "accent_on_color")}
                      ${this._renderColor([
		"Accent",
		"Inactive",
		"Color"
	], "accent_off_color")}
                    </div>
                    ${Wl.call(this)}
                    ${r === "area_count" ? "" : T`
                          ${this._renderTemplateInput("State template", "state_template")}
                        `}
                  `)}
                `}

            ${this._config?.entity || r !== "entity" ? q.call(this, {
		interactions: [
			{
				key: "tap_action",
				formKey: "tap_action",
				label: "Tap behavior",
				defaultAction: i,
				defaultVisible: !0
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
				key: "main_entity_tap_action",
				formKey: "icon_tap_action",
				label: "Icon tap behavior",
				defaultAction: o,
				defaultVisible: !0,
				customDefaultLabel: o === "Current state" ? X : void 0
			},
			{
				key: "main_entity_hold_action",
				formKey: "icon_hold_action",
				label: "Icon hold behavior",
				defaultAction: "none"
			},
			{
				key: "main_entity_double_tap_action",
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
function Ll() {
	return _o.call(this, {
		label: "Name",
		valueKey: "name",
		entityKey: "entity",
		defaultType: "entity",
		defaultMode: "template",
		templateKey: "name_template"
	});
}
function Rl({ cardActionDefault: e, mainEntityActionDefault: t }) {
	let n = this._getStatusItems(), r = Math.min(this._selectedStatusIndex || 0, n.length - 1), i = n[r] || {}, a = Z(i), o = a === "area_count", s = o ? "more-info" : e, c = o ? X : t, { itemsPerRow: l, shouldWrapTabs: u, showTabScrollHint: d } = Tl({
		config: this._config,
		itemCount: n.length,
		defaultPerRow: 3
	});
	return T`
    <div class="section">
      ${El.call(this, {
		itemCount: n.length,
		classPrefix: "status",
		defaultPerRow: 3
	})}

      <div
        class="status-tabs ${u ? "wrapped" : ""} ${d ? "scroll-hint" : ""} ${n.length > 1 ? "has-tools" : ""}"
        style=${u ? `--status-tabs-per-row: ${l};` : ""}
      >
        <div class="status-tab-items">
          ${n.map((e, t) => T`
            <button
              type="button"
              class="status-tab ${t === r ? "active" : ""}"
              @click=${() => this._selectStatusItem(t)}
            >
              ${t + 1}
            </button>
          `)}
        </div>

        ${d ? T`
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

          ${n.length > 1 ? T`
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

      ${zl.call(this, i, "entity", (e) => this._updateStatusItem(r, e), (e) => this._updateStatusItem(r, { entity: e }))}

      ${Bl.call(this, T`

        <div class="color-pair">
          ${Ul.call(this, [
		"Accent",
		"Active",
		"Color"
	], "accent_on_color", r, i)}
          ${Ul.call(this, [
		"Accent",
		"Inactive",
		"Color"
	], "accent_off_color", r, i)}
        </div>

        ${Gl.call(this, r, i)}

        ${o ? "" : T`
              ${Hl.call(this, "State template", "state_template", r, i)}
            `}
      `)}

      ${i.entity || a !== "entity" ? this._renderStatusItemInteractions(r, i, s, c) : ""}
    </div>
  `;
}
function zl(e, t, n, r) {
	let i = {
		...e,
		entity: e?.[t] || ""
	}, a = Z(i), o = {
		hass: this.hass,
		_config: i,
		_t: this._t.bind(this),
		_updateConfig: (e) => n(Vl(e, t)),
		_handleConfigUpdate: (e, r) => n(Vl({ [e]: r }, t))
	};
	return T`
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
        ${kl.call(o, {
		stateSource: a,
		domainConfig: Ks(i.domain),
		deviceClassOptions: tc(this.hass, i),
		badgeMode: !1,
		showInactiveTemplate: !0,
		showNameTemplate: !1,
		preserveStateConfig: !0,
		renderAreaPicker: () => Fl.call(this, {
			config: e,
			updateConfig: n
		}),
		renderEntityPicker: (n = "Main entity") => T`
            <div class="field">
              ${n ? T`<label>${this._t(n)}</label>` : ""}
              ${Aa.call(this, {
			value: e?.[t] || "",
			filterOptions: ql,
			onValueChanged: r
		})}
            </div>
          `
	})}
      </div>
    </ha-expansion-panel>
  `;
}
function Bl(e) {
	return T`
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
function Vl(e, t) {
	let n = { ...e };
	return Object.prototype.hasOwnProperty.call(n, "entity") && (n[t] = n.entity, delete n.entity), n;
}
function Hl(e, t, n, r) {
	return this._renderTemplateInput(e, t, {
		value: r[t] || "",
		onValueChanged: (e) => this._updateStatusItem(n, { [t]: e })
	});
}
function Ul(e, t, n, r) {
	return this._renderColorControl(e, `status-${n}-${t}`, r[t] || "", (e) => this._updateStatusItem(n, { [t]: e }));
}
function Wl() {
	return H.call(this, {
		label: "Icon",
		sourceKey: "main_entity_icon_source",
		entityKey: "entity",
		customIconKeys: [
			"main_entity_icon",
			"main_entity_icon_on",
			"main_entity_icon_off"
		],
		renderCustom() {
			return T`
        ${this._renderIconInput("", "main_entity_icon")}
        <div class="icon-pair">
          ${this._renderIconInput(["Active", "Icon"], "main_entity_icon_on")}
          ${this._renderIconInput(["Inactive", "Icon"], "main_entity_icon_off")}
        </div>
      `;
		}
	});
}
function Gl(e, t) {
	let n = this, r = {
		hass: this.hass,
		_config: t,
		_t: (e, t) => this._t(e, t),
		_handleConfigUpdate: (t, r) => n._updateStatusItem(e, { [t]: r }),
		_renderIconInput: (t, r) => n._renderStatusItemIconInput(t, r, e)
	};
	return H.call(r, {
		label: "Icon",
		sourceKey: "main_entity_icon_source",
		entityKey: "entity",
		customIconKeys: [
			"main_entity_icon",
			"main_entity_icon_on",
			"main_entity_icon_off"
		],
		renderCustom() {
			return T`
        ${this._renderIconInput("", "main_entity_icon")}
        <div class="icon-pair">
          ${this._renderIconInput(["Active", "Icon"], "main_entity_icon_on")}
          ${this._renderIconInput(["Inactive", "Icon"], "main_entity_icon_off")}
        </div>
      `;
		}
	});
}
function Kl() {
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
var ql = [
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
], Jl = d`
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

.section > .interactions-form {
  margin-top: 0;
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
`, Yl = class extends A {
	static svgCache = R;
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
		super.connectedCallback(), io(this), Ot(this, "orbit-status-card");
	}
	disconnectedCallback() {
		ao(this), super.disconnectedCallback();
	}
	_getColorStyle(e) {
		return so(e);
	}
	_getColorPickerValue(e) {
		return co(e);
	}
	_t(e, t) {
		return Y(this.hass, e, t);
	}
	setConfig(e) {
		let { config: t, migrated: n } = Kt(e || {});
		this._config = ru(t || {}), this._selectedStatusIndex = Math.min(this._selectedStatusIndex || 0, this._getStatusItems(this._config).length - 1), (n || JSON.stringify(this._config) !== JSON.stringify(t || {})) && this._queueConfigMigration();
	}
	_queueConfigMigration() {
		this._configMigrationQueued || (this._configMigrationQueued = !0, Promise.resolve().then(() => {
			this._configMigrationQueued = !1, this.dispatchEvent(new CustomEvent("config-changed", {
				detail: { config: ru(this._config) },
				bubbles: !0,
				composed: !0
			}));
		}));
	}
	_updateConfig(e) {
		this._config = ru(hi(this._config, e)), this.dispatchEvent(new CustomEvent("config-changed", {
			detail: { config: this._config },
			bubbles: !0,
			composed: !0
		}));
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
		if (e === "entity" && Z(this._config) !== "entity") {
			this._handleConfigUpdate(e, t);
			return;
		}
		if (e === "entity") {
			this._clearMainEntity();
			return;
		}
		if (e === "tracker_entity") {
			this._updateConfig(W("tracker_entity", eu));
			return;
		}
		this._handleConfigUpdate(e, t);
	}
	_clearMainEntity() {
		if (this._config?.mode === "person") {
			this._updateConfig(W("entity", $l));
			return;
		}
		this._updateConfig(W("entity", Zl));
	}
	_getStatusItems(e = this._config) {
		return Array.isArray(e?.entities) && e.entities.length ? e.entities.map((e) => typeof e == "string" ? { entity: e } : e || {}) : [{
			entity: e?.entity || "",
			...Us(e),
			accent_on_color: e?.accent_on_color || "",
			accent_off_color: e?.accent_off_color || "",
			main_entity_icon_source: e?.main_entity_icon_source || "",
			main_entity_icon: e?.main_entity_icon || "",
			main_entity_icon_on: e?.main_entity_icon_on || "",
			main_entity_icon_off: e?.main_entity_icon_off || "",
			state_template: e?.state_template || "",
			name_template: e?.name_template || "",
			tap_action: e?.tap_action,
			hold_action: e?.hold_action,
			double_tap_action: e?.double_tap_action,
			main_entity_tap_action: e?.main_entity_tap_action,
			main_entity_hold_action: e?.main_entity_hold_action,
			main_entity_double_tap_action: e?.main_entity_double_tap_action
		}];
	}
	_handleStatusModeChange(e) {
		if (this._config?.mode === "icon_only" && e === "standard") {
			let t = this._getStatusItems(), n = t[Math.min(this._selectedStatusIndex || 0, t.length - 1)] || {};
			this._updateConfig({
				...U(Ql),
				mode: e,
				entities: void 0,
				entity: n.entity || void 0,
				...Us(n),
				accent_on_color: n.accent_on_color,
				accent_off_color: n.accent_off_color,
				main_entity_icon_source: n.main_entity_icon_source,
				main_entity_icon: n.main_entity_icon,
				main_entity_icon_on: n.main_entity_icon_on,
				main_entity_icon_off: n.main_entity_icon_off,
				state_template: n.state_template,
				name_template: n.name_template,
				tap_action: n.tap_action,
				hold_action: n.hold_action,
				double_tap_action: n.double_tap_action,
				main_entity_tap_action: n.main_entity_tap_action,
				main_entity_hold_action: n.main_entity_hold_action,
				main_entity_double_tap_action: n.main_entity_double_tap_action
			});
			return;
		}
		this._updateConfig({
			mode: e,
			...e === "icon_only" ? {} : { entities: void 0 }
		});
	}
	_selectStatusItem(e) {
		this._selectedStatusIndex = e;
	}
	_addStatusItem() {
		let e = this._getStatusItems();
		this._selectedStatusIndex = e.length, this._updateConfig(U(Ql, { entities: [...e, { entity: "" }] }));
	}
	_duplicateStatusItem(e) {
		let t = this._getStatusItems(), n = t[e];
		if (!n) return;
		let r = [...t];
		r.splice(e + 1, 0, structuredClone(n)), this._selectedStatusIndex = e + 1, this._updateConfig(U(Ql, { entities: r }));
	}
	_removeStatusItem(e) {
		let t = this._getStatusItems();
		if (t.length <= 1) {
			this._updateConfig(W("entity", Zl));
			return;
		}
		let n = t.filter((t, n) => n !== e);
		this._selectedStatusIndex = Math.max(0, Math.min(e, n.length - 1)), this._updateConfig({ entities: n });
	}
	_moveStatusItem(e, t) {
		let n = this._getStatusItems(), r = e + t;
		if (r < 0 || r >= n.length) return;
		let i = [...n], [a] = i.splice(e, 1);
		i.splice(r, 0, a), this._selectedStatusIndex = r, this._updateConfig(U(Ql, { entities: i }));
	}
	_updateStatusItem(e, t) {
		let n = this._getStatusItems(), r = {
			...n[e] || {},
			...t
		};
		if (t.entity === "" && Z(r) === "entity" && Xl(r), Array.isArray(this._config?.entities)) {
			let t = [...n];
			t[e] = r;
			let i = { entities: t };
			t.length > 1 && Object.assign(i, U(Ql)), this._updateConfig(i);
			return;
		}
		if (t.entity === "" && Z(r) === "entity") {
			this._updateConfig(W("entity", Zl));
			return;
		}
		this._updateConfig({
			entity: r.entity || "",
			...Us(r),
			accent_on_color: r.accent_on_color || "",
			accent_off_color: r.accent_off_color || "",
			main_entity_icon_source: r.main_entity_icon_source || "",
			main_entity_icon: r.main_entity_icon || "",
			main_entity_icon_on: r.main_entity_icon_on || "",
			main_entity_icon_off: r.main_entity_icon_off || "",
			state_template: r.state_template || "",
			name_template: r.name_template || "",
			tap_action: r.tap_action,
			hold_action: r.hold_action,
			double_tap_action: r.double_tap_action,
			main_entity_tap_action: r.main_entity_tap_action,
			main_entity_hold_action: r.main_entity_hold_action,
			main_entity_double_tap_action: r.main_entity_double_tap_action
		});
	}
	_renderInput(e, t, n = "", r = {}) {
		return fi.call(this, e, t, n, r);
	}
	_renderTemplateInput(e, t, n = {}) {
		return pi.call(this, e, t, n);
	}
	_renderNumberInput(e, t, n = {}) {
		return mi.call(this, e, t, n);
	}
	_renderColor(e, t, n) {
		return yi.call(this, e, t, n);
	}
	_renderColorControl(e, t, n, r, i) {
		return bi.call(this, e, t, n, r, i);
	}
	_renderEntity(e, t, n) {
		return no.call(this, e, t, n);
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
					defaultVisible: !0
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
					key: "main_entity_tap_action",
					formKey: "icon_tap_action",
					label: "Icon tap behavior",
					defaultAction: r,
					defaultVisible: !0,
					customDefaultLabel: r === "Current state" ? X : void 0
				},
				{
					key: "main_entity_hold_action",
					formKey: "icon_hold_action",
					label: "Icon hold behavior",
					defaultAction: "none"
				},
				{
					key: "main_entity_double_tap_action",
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
		return ro.call(this, e, t);
	}
	_renderIconInput(e, t, n = "mdi:information-outline or icon.svg") {
		return Lr.call(this, e, t, n);
	}
	_loadLocalIconFiles(e = "") {
		return zr.call(this, e);
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
		}), Lr.call(a, e, t, r);
	}
	_isImageIcon(e) {
		return Fr(e);
	}
	_resolveIconPath(e) {
		return Ir(e);
	}
	_getInlineSvg(e) {
		return L.call(this, e, { forceColor: !0 });
	}
	_renderStatusSection() {
		return Il.call(this);
	}
	render() {
		return T`
      <div class="wrapper">
        ${this._renderStatusSection()}
        <div class="editor-version">
          ${this._t("Orbit Status Card v{version}", { version: t.status })}
        </div>
      </div>
    `;
	}
	static styles = [ls, Jl];
};
customElements.define("orbit-status-card-editor", Yl);
function Xl(e) {
	Object.assign(e, U(Zl));
}
var Zl = [
	...Hs,
	"accent_on_color",
	"accent_off_color",
	"main_entity_icon_source",
	"main_entity_icon",
	"main_entity_icon_on",
	"main_entity_icon_off",
	"state_template",
	"name_template",
	"tap_action",
	"hold_action",
	"double_tap_action",
	"main_entity_tap_action",
	"main_entity_hold_action",
	"main_entity_double_tap_action"
], Ql = ["entity", ...Zl], $l = [
	"tracker_entity",
	"eta_entity",
	"battery_entity_1",
	"battery_entity_2",
	"accent_on_color",
	"accent_off_color",
	"tap_action",
	"hold_action",
	"double_tap_action",
	"main_entity_tap_action",
	"main_entity_hold_action",
	"main_entity_double_tap_action"
], eu = ["eta_entity"], tu = [
	"entity",
	...Hs,
	"accent_on_color",
	"accent_off_color",
	"main_entity_icon_source",
	"main_entity_icon",
	"main_entity_icon_on",
	"main_entity_icon_off",
	"main_entity_icon_svg_color_override",
	"main_entity_icon_on_svg_color_override",
	"main_entity_icon_off_svg_color_override",
	"state_template",
	"name_template",
	"tap_action",
	"hold_action",
	"double_tap_action",
	"main_entity_tap_action",
	"main_entity_hold_action",
	"main_entity_double_tap_action"
], nu = [
	"type",
	"mode",
	"name",
	"entity",
	...Hs,
	"tracker_entity",
	"eta_entity",
	"battery_entity_1",
	"battery_entity_2",
	"accent_on_color",
	"accent_off_color",
	"main_entity_icon_source",
	"main_entity_icon",
	"main_entity_icon_on",
	"main_entity_icon_off",
	"main_entity_icon_svg_color_override",
	"main_entity_icon_on_svg_color_override",
	"main_entity_icon_off_svg_color_override",
	"state_template",
	"name_template",
	"tap_action",
	"hold_action",
	"double_tap_action",
	"main_entity_tap_action",
	"main_entity_hold_action",
	"main_entity_double_tap_action",
	"wrap",
	"items_per_row",
	"separate_cards",
	"entities",
	"grid_options",
	"view_layout"
];
function ru(e) {
	let t = cu(e);
	t.mode !== "icon_only" && delete t.entities, iu(t), ou(t), su(t);
	let n = {}, r = /* @__PURE__ */ new Set();
	return nu.forEach((e) => {
		Object.prototype.hasOwnProperty.call(t, e) && (n[e] = e === "entities" && Array.isArray(t[e]) ? t[e].map(au) : t[e], r.add(e));
	}), Object.keys(t).forEach((e) => {
		r.has(e) || (n[e] = t[e]);
	}), n;
}
function iu(e) {
	if (e?.mode !== "icon_only" || e.state_source !== "area_count" || !Array.isArray(e.entities) || e.entities.length === 0) return;
	let t = Us(e);
	e.entities = e.entities.map((e) => {
		let n = typeof e == "string" ? { entity: e } : { ...e || {} };
		return n.state_source === void 0 && (Object.assign(n, t), ou(n)), n;
	}), Hs.forEach((t) => {
		delete e[t];
	});
}
function au(e) {
	if (!e || typeof e != "object" || Array.isArray(e)) return e;
	let t = cu(e);
	return ou(t), su(t), lu(t, tu);
}
function ou(e) {
	e?.state_source === "area_count" && (delete e.entity, delete e.main_entity);
}
function su(e) {
	e?.state_source === "area_count" && (e.tap_action?.action === "more-info" && delete e.tap_action, e.main_entity_tap_action?.action === "Current state" && delete e.main_entity_tap_action);
}
function cu(e = {}) {
	return Object.fromEntries(Object.entries(e).filter(([, e]) => e !== void 0 && e !== ""));
}
function lu(e, t) {
	let n = {}, r = /* @__PURE__ */ new Set();
	return t.forEach((t) => {
		Object.prototype.hasOwnProperty.call(e, t) && (n[t] = e[t], r.add(t));
	}), Object.keys(e).forEach((t) => {
		r.has(t) || (n[t] = e[t]);
	}), n;
}
//#endregion
//#region src/cards/status-card.js
var uu = class extends A {
	static svgCache = R;
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
			...fc
		};
	}
	constructor() {
		super(), pc.call(this), this._activeEntitiesStatusIndex = 0;
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
			let e = Kc(this._config).length, t = du(this._config, e);
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
		this._config = Kt(e).config;
		let t = e.accent_off_color || "theme";
		this._nameColor = this._computeFullColor(t), this._statusColor = this._computeFullColor(t), this._iconColor = this._computeIconColor(t), this._circleColor = this._computeCircleColor(t), this._statusItems = [];
	}
	willUpdate(e) {
		return (e.has("_config") || e.has("hass")) && Ft.call(this, this._getTemplateEntries()), Gc.call(this, e);
	}
	disconnectedCallback() {
		It.call(this), this._clearMainIconHoldTimer(), this._clearStatusItemHoldTimer(), this._clearDoubleTapTimer(), _c.call(this), super.disconnectedCallback();
	}
	shouldUpdate(e) {
		return Tn.call(this, e, this._getRelevantEntities(), {
			hasTemplates: En(this._config),
			includeZones: this._config?.mode === "person"
		});
	}
	_handleAction(e, t = null) {
		if (e?.action === "Current state") {
			this._activeEntitiesStatusIndex = e.status_index ?? 0, hc.call(this);
			return;
		}
		return Ve.call(this, e, t);
	}
	_renderActiveEntitiesDialog() {
		let e = this._config?.mode === "icon_only" ? Kc(this._config)[this._activeEntitiesStatusIndex] || {} : this._config;
		return Ic.call(this, mc(rc(this.hass, e)));
	}
	_t(e, t) {
		return Y(this.hass, e, t);
	}
	_handleTap(e) {
		if (!M(this)) {
			if (this._shouldSuppressMainIconTap(e)) {
				this._stopEvent(e);
				return;
			}
			if (this._isMainIconEvent(e)) {
				this._handleMainEntityTap(e);
				return;
			}
			N.call(this, e, this._getStatusItemEntityId(0), this._getCardTapAction(), this._getCardDoubleTapAction());
		}
	}
	_handleDoubleTap(e) {
		if (this._isMainIconEvent(e)) {
			this._handleMainEntityDoubleTap(e);
			return;
		}
		P.call(this, e, this._config.entity, this._getCardDoubleTapAction());
	}
	_isMainIconEvent(e) {
		if (e.composedPath().some((e) => e?.classList && (e.classList.contains("circle") || e.classList.contains("status-circle") || e.classList.contains("main-icon") || e.classList.contains("main-image-icon")))) return !0;
		let t = (this.shadowRoot?.querySelector(".status-circle"))?.getBoundingClientRect();
		return t ? e.clientX >= t.left && e.clientX <= t.right && e.clientY >= t.top && e.clientY <= t.bottom : !1;
	}
	_handleMainEntityTap(e) {
		if (M(this)) return;
		if (this._shouldSuppressMainIconTap(e)) {
			this._stopEvent(e);
			return;
		}
		if (this._longPressTriggered) {
			this._longPressTriggered = !1, this._stopEvent(e);
			return;
		}
		let t = this._getStatusItemEntityId(0), n = this._config?.mode === "icon_only" ? Kc(this._config)[0] || {} : this._config;
		!t && Z(n) !== "area_count" || N.call(this, e, t, this._getMainEntityTapAction() || this._getCardTapAction(), this._getMainEntityDoubleTapAction());
	}
	_handleMainEntityDoubleTap(e) {
		P.call(this, e, this._config.entity, this._getMainEntityDoubleTapAction());
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
		if (M(this) || this._isMainIconEvent(e)) return;
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
		let n = Z(this._statusItems?.[t]) === "area_count", r = this._getStatusItemEntityId(t);
		if (!r && !n) return;
		let i = this._isStatusItemMainIconEvent(e) ? this._getStatusItemMainEntityTapAction(t) : this._getStatusItemCardTapAction(t), a = this._isStatusItemMainIconEvent(e) ? this._getStatusItemMainEntityDoubleTapAction(t) : this._getStatusItemCardDoubleTapAction(t);
		N.call(this, e, r, i?.action ? i.action === "Current state" ? {
			...i,
			status_index: t
		} : i : { action: "more-info" }, a);
	}
	_handleStatusItemDoubleClick(e, t = 0) {
		P.call(this, e, this._getStatusItemEntityId(t), this._isStatusItemMainIconEvent(e) ? this._getStatusItemMainEntityDoubleTapAction(t) : this._getStatusItemCardDoubleTapAction(t));
	}
	_handleStatusItemPointerDown(e, t = 0) {
		if (M(this)) return;
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
		return Ge.call(this, e);
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
		return rt.call(this, e);
	}
	_computeIconColor(e) {
		return it.call(this, e);
	}
	_computeCircleColor(e) {
		return at.call(this, e);
	}
	_getMainStateObj() {
		let e = this._config.entity;
		return e && this.hass ? this.hass.states[e] : null;
	}
	formatState(e) {
		return Jt(e);
	}
	_getEntityActiveState(e) {
		return Yt(e);
	}
	_isImageIcon(e) {
		return mn(e);
	}
	_resolveIconPath(e) {
		return hn(e);
	}
	_getInlineSvg(e, t = !0) {
		return L.call(this, e, { forceColor: t });
	}
	_getSvgColorOverride(e, t) {
		return gn(e, t);
	}
	_evaluateStateTemplate(e, t) {
		return F.call(this, e, t);
	}
	_getTemplateEntries() {
		if (this._config?.mode === "icon_only") return Kc(this._config).flatMap((e) => (Z(e) === "area_count" ? [] : [
			e.state_template,
			e.active_template,
			e.inactive_template,
			e.name_template
		]).filter(Boolean).map((t) => ({
			template: t,
			entityId: e.entity || ""
		})));
		let e = this._config?.mode === "person" ? this._config?.tracker_entity || "" : this._config?.entity || "";
		return (Z(this._config) === "area_count" ? [] : [
			this._config?.state_template,
			this._config?.active_template,
			this._config?.inactive_template,
			this._config?.name_template
		]).filter(Boolean).map((t) => ({
			template: t,
			entityId: e
		}));
	}
	_getRelevantEntities() {
		return this._config?.mode === "icon_only" ? Kc(this._config).flatMap((e) => Z(e) === "area_count" ? oc(this.hass, e) : [e.entity]) : Z(this._config) === "area_count" ? oc(this.hass, this._config) : [
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
		if (M(this)) return;
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
		return He.call(this);
	}
	_getCardHoldAction() {
		return el.call(this);
	}
	_getCardDoubleTapAction() {
		return tl.call(this);
	}
	_getMainEntityHoldAction() {
		return nl.call(this);
	}
	_getMainEntityTapAction() {
		return rl.call(this);
	}
	_getMainEntityDoubleTapAction() {
		return il.call(this);
	}
	_getCardTapAction() {
		return al.call(this);
	}
	_getStatusItemCardTapAction(e = 0) {
		return sl.call(this, e);
	}
	_getStatusItemCardHoldAction(e = 0) {
		return cl.call(this, e);
	}
	_getStatusItemCardDoubleTapAction(e = 0) {
		return ll.call(this, e);
	}
	_getStatusItemMainEntityTapAction(e = 0) {
		return ul.call(this, e);
	}
	_getStatusItemMainEntityDoubleTapAction(e = 0) {
		return dl.call(this, e);
	}
	_getStatusItemMainEntityHoldAction(e = 0) {
		return fl.call(this, e);
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
		return du(this._config, e);
	}
	_getStatusRowCount(e = this._statusItems?.length || 1) {
		return fu(this._config, e);
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
		return pl.call(this);
	}
	static styles = [...Cl, wl];
};
function du(e = {}, t = 1) {
	return zs({
		config: e,
		count: t,
		perRowKey: "items_per_row"
	});
}
function fu(e = {}, t = 1) {
	return Bs({
		config: e,
		count: t,
		perRowKey: "items_per_row"
	});
}
At({
	tag: "orbit-status-card",
	cardClass: uu,
	name: "Orbit Status Card",
	description: "Responsive status card",
	version: t.status,
	getEntitySuggestion: mu
});
var pu = new Set([
	"automation",
	"button",
	"input_button",
	"scene",
	"script"
]);
function mu(e, t) {
	let n = On(t);
	if (n === "person") return { config: {
		type: "custom:orbit-status-card",
		mode: "person",
		entity: t
	} };
	if (pu.has(n)) return null;
	let r = {
		label: Y(e, "Standard"),
		config: {
			type: "custom:orbit-status-card",
			mode: "standard",
			entity: t
		}
	};
	return An(e, t) ? [r, {
		label: Y(e, "Icon only"),
		config: {
			type: "custom:orbit-status-card",
			mode: "icon_only",
			entity: t
		}
	}] : { config: r.config };
}
//#endregion
//#region src/cards/action/helpers/lifecycle.js
function hu(e) {
	!e.has("_config") && !e.has("hass") || (this._actions = gu(this._config).map((e) => _u.call(this, e)));
}
function gu(e = {}) {
	return Array.isArray(e.entities) && e.entities.length ? e.entities.map((e) => typeof e == "string" ? { entity: e } : e || {}) : [{
		entity: e.main_entity,
		accent_color: e.accent_color,
		main_entity_icon_source: e.main_entity_icon_source,
		main_entity_icon: e.main_entity_icon,
		main_entity_icon_svg_color_override: e.main_entity_icon_svg_color_override,
		tap_action: e.tap_action,
		hold_action: e.hold_action,
		double_tap_action: e.double_tap_action
	}];
}
function _u(e) {
	let t = e.entity || e.main_entity, n = t && this.hass ? this.hass.states[t] : null, r = e.accent_color || this._config.accent_color || "theme", i = yu(n), a = this._computeCircleColor(r), o = i ? this._computeFullColor(r) : this._computeIconColor(r), s = vu(e, t), c = s === "custom" && (e.main_entity_icon || e.icon) || "", l = s === "custom" && e.main_entity_icon ? "main_entity_icon" : s === "custom" && e.icon ? "icon" : "", u = c || "mdi:play-circle";
	return {
		...e,
		entityId: t,
		stateObj: n,
		useStateIcon: !!n && !c,
		icon: u,
		iconColor: o,
		cardBackground: a,
		isRunning: i,
		svgForceColor: l ? this._getSvgColorOverride(e, l) : !0
	};
}
function vu(e, t) {
	let n = e.main_entity_icon_source, r = !!t, i = !!(e.main_entity_icon || e.icon);
	return n === "custom" ? "custom" : n === "entity" && r ? "entity" : i ? "custom" : "entity";
}
function yu(e) {
	if (!e) return !1;
	let t = e.entity_id?.split(".")[0], n = Number(e.attributes?.current);
	return Number.isFinite(n) && n > 0 ? !0 : t === "script" && e.state === "on";
}
//#endregion
//#region src/cards/action/renders/action-card.js
function bu() {
	let e = this._actions || [], t = Math.max(e.length, 1), n = this._getActionColumnCount(t), r = this._getActionRowCount(t), i = Su(e, n);
	return T`
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
        ${i.map((e, t) => T`
          <div class="action-row">
            ${e.map((e, r) => xu.call(this, e, t * n + r))}
            ${Cu(e.length, n, "action-spacer")}
          </div>
        `)}
      </div>
    </ha-card>
  `;
}
function xu(e, t) {
	let n = this._isImageIcon(e.icon) ? this._resolveIconPath(e.icon) : "", r = n ? this._getInlineSvg(n, e.svgForceColor) : "", i = T`
    <div class="circle action-circle">
      ${this._isImageIcon(e.icon) ? T`
            <div class="main-image-icon">
              ${r ? z(r) : T`<img src=${n} alt="" />`}
            </div>
          ` : e.useStateIcon && e.stateObj ? T`
            <ha-state-icon
              class="main-icon"
              .stateObj=${e.stateObj}
            ></ha-state-icon>
          ` : T`
            <ha-icon
              class="main-icon"
              .icon=${e.icon}
            ></ha-icon>
          `}
      ${Xt(e.stateObj) ? T`
            <ha-tile-badge
              class="entity-unavailable-badge"
              title="Unavailable"
              aria-label="Unavailable"
            >
              <ha-icon .icon=${"mdi:exclamation-thick"}></ha-icon>
            </ha-tile-badge>
          ` : ""}
    </div>
  `;
	return (this._actions?.length || 0) > 1 && !this._config?.separate_cards ? T`
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
    ` : T`
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
function Su(e, t = 1) {
	let n = Math.max(1, t), r = [];
	for (let t = 0; t < e.length; t += n) r.push(e.slice(t, t + n));
	return r;
}
function Cu(e, t, n) {
	let r = Math.max(0, t - e);
	return Array.from({ length: r }, () => T`
    <div class=${n}></div>
  `);
}
//#endregion
//#region src/cards/action/styles/action-card-styles.js
var wu = [
	Sr,
	Cr,
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
function Tu() {
	let e = this._getActionItems(), t = Math.min(this._selectedActionIndex || 0, e.length - 1), n = e[t] || {}, r = this._actionEntityDomainFilter || "all", { itemsPerRow: i, shouldWrapTabs: a, showTabScrollHint: o } = Tl({
		config: this._config,
		itemCount: e.length,
		perRowKey: "actions_per_row",
		defaultPerRow: 3
	});
	return T`
    <div class="section">
      ${El.call(this, {
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
          ${e.map((e, n) => T`
            <button
              type="button"
              class="action-tab ${n === t ? "active" : ""}"
              @click=${() => this._selectActionItem(n)}
            >
              ${n + 1}
            </button>
          `)}
        </div>

        ${o ? T`
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

          ${e.length > 1 ? T`
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

        ${Aa.call(this, {
		value: n.entity || "",
		filterOptions: Eu,
		activeFilter: r,
		onValueChanged: (e) => this._updateActionItem(t, { entity: e })
	})}
      </div>

      ${this._renderColorControl(["Accent", "Color"], `action-${t}-accent_color`, n.accent_color || "", (e) => this._updateActionItem(t, { accent_color: e }), this._config?.accent_color || "theme")}

      ${Du.call(this, t, n)}

      ${n.entity ? this._renderActionItemInteractions(t, n) : ""}
    </div>
  `;
}
var Eu = [
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
function Du(e, t) {
	let n = this, r = {
		hass: this.hass,
		_config: t,
		_t: (e, t) => this._t(e, t),
		_handleConfigUpdate: (t, r) => n._updateActionItem(e, { [t]: r }),
		_renderIconInput: (t, r) => n._renderActionItemIconInput(t, r, e)
	};
	return H.call(r, {
		label: "Icon",
		sourceKey: "main_entity_icon_source",
		entityKey: "entity",
		customIconKeys: ["main_entity_icon"],
		renderCustom() {
			return this._renderIconInput("", "main_entity_icon");
		}
	});
}
//#endregion
//#region src/common/editor/styles/action-editor.js
var Ou = d`
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
`, ku = class extends A {
	static svgCache = R;
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
		super.connectedCallback(), io(this), Ot(this, "orbit-action-card");
	}
	disconnectedCallback() {
		ao(this), super.disconnectedCallback();
	}
	setConfig(e) {
		this._config = e || {}, this._selectedActionIndex = Math.min(this._selectedActionIndex || 0, this._getActionItems(e).length - 1);
	}
	_t(e, t) {
		return Y(this.hass, e, t);
	}
	_updateConfig(e) {
		this._config = Fu(hi(this._config, e)), this.dispatchEvent(new CustomEvent("config-changed", {
			detail: { config: this._config },
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
			accent_color: e?.accent_color || "",
			main_entity_icon_source: e?.main_entity_icon_source || "",
			main_entity_icon: e?.main_entity_icon || "",
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
		this._selectedActionIndex = e.length, this._updateConfig(U(Mu, { entities: [...e, { entity: "" }] }));
	}
	_removeActionItem(e) {
		let t = this._getActionItems();
		if (t.length <= 1) {
			this._updateConfig(W("main_entity", ju));
			return;
		}
		let n = t.filter((t, n) => n !== e);
		this._selectedActionIndex = Math.max(0, Math.min(e, n.length - 1)), this._updateConfig({ entities: n });
	}
	_moveActionItem(e, t) {
		let n = this._getActionItems(), r = e + t;
		if (r < 0 || r >= n.length) return;
		let i = [...n], [a] = i.splice(e, 1);
		i.splice(r, 0, a), this._selectedActionIndex = r, this._updateConfig(U(Mu, { entities: i }));
	}
	_updateActionItem(e, t) {
		let n = this._getActionItems(), r = {
			...n[e] || {},
			...t
		};
		if (t.entity === "" && Au(r), Array.isArray(this._config?.entities)) {
			let t = [...n];
			t[e] = r;
			let i = { entities: t };
			t.length > 1 && Object.assign(i, U(Mu)), this._updateConfig(i);
			return;
		}
		if (t.entity === "") {
			this._updateConfig(W("main_entity", ju));
			return;
		}
		this._updateConfig({
			main_entity: r.entity || "",
			accent_color: r.accent_color || "",
			main_entity_icon_source: r.main_entity_icon_source || "",
			main_entity_icon: r.main_entity_icon || "",
			tap_action: r.tap_action,
			hold_action: r.hold_action,
			double_tap_action: r.double_tap_action
		});
	}
	_getColorStyle(e) {
		return so(e);
	}
	_getColorPickerValue(e) {
		return co(e);
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
					defaultAction: Nn(t.entity, "toggle"),
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
		return yi.call(this, e, t, n);
	}
	_renderColorControl(e, t, n, r, i) {
		return bi.call(this, e, t, n, r, i);
	}
	_renderEntity(e, t, n) {
		return no.call(this, e, t, n);
	}
	_renderNumberInput(e, t, n = {}) {
		return mi.call(this, e, t, n);
	}
	_renderIconInput(e, t, n = "mdi:palette or icon.svg") {
		return Lr.call(this, e, t, n);
	}
	_loadLocalIconFiles(e = "") {
		return zr.call(this, e);
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
		}), Lr.call(a, e, t, r);
	}
	_isImageIcon(e) {
		return Fr(e);
	}
	_resolveIconPath(e) {
		return Ir(e);
	}
	_getInlineSvg(e) {
		return L.call(this, e, { forceColor: !0 });
	}
	_renderActionSection() {
		return Tu.call(this);
	}
	render() {
		return T`
      <div class="wrapper">
        ${this._renderActionSection()}
        <div class="editor-version">
          ${this._t("Orbit Action Card v{version}", { version: t.action })}
        </div>
      </div>
    `;
	}
	static styles = [ls, Ou];
};
customElements.define("orbit-action-card-editor", ku);
function Au(e) {
	Object.assign(e, U(ju));
}
var ju = [
	"accent_color",
	"main_entity_icon_source",
	"main_entity_icon",
	"tap_action",
	"hold_action",
	"double_tap_action"
], Mu = ["main_entity", ...ju], Nu = [
	"entity",
	"accent_color",
	"main_entity_icon_source",
	"main_entity_icon",
	"main_entity_icon_svg_color_override",
	"tap_action",
	"hold_action",
	"double_tap_action"
], Pu = [
	"type",
	"main_entity",
	"accent_color",
	"main_entity_icon_source",
	"main_entity_icon",
	"main_entity_icon_svg_color_override",
	"tap_action",
	"hold_action",
	"double_tap_action",
	"wrap",
	"actions_per_row",
	"separate_cards",
	"entities",
	"grid_options",
	"view_layout"
];
function Fu(e) {
	let t = {}, n = /* @__PURE__ */ new Set();
	return Pu.forEach((r) => {
		Object.prototype.hasOwnProperty.call(e, r) && (t[r] = r === "entities" && Array.isArray(e[r]) ? e[r].map(Iu) : e[r], n.add(r));
	}), Object.keys(e).forEach((r) => {
		n.has(r) || (t[r] = e[r]);
	}), t;
}
function Iu(e) {
	return !e || typeof e != "object" || Array.isArray(e) ? e : Lu(e, Nu);
}
function Lu(e, t) {
	let n = {}, r = /* @__PURE__ */ new Set();
	return t.forEach((t) => {
		Object.prototype.hasOwnProperty.call(e, t) && (n[t] = e[t], r.add(t));
	}), Object.keys(e).forEach((t) => {
		r.has(t) || (n[t] = e[t]);
	}), n;
}
//#endregion
//#region src/cards/action-card.js
var Ru = class extends A {
	static svgCache = R;
	static get properties() {
		return {
			hass: {},
			_config: { type: Object },
			_icon: { type: String },
			_iconColor: { type: String },
			_cardBackground: { type: String },
			_isRunning: { type: Boolean },
			_actions: { type: Array }
		};
	}
	static getConfigElement() {
		return document.createElement("orbit-action-card-editor");
	}
	static getStubConfig() {
		return {
			type: "custom:orbit-action-card",
			main_entity: "",
			accent_color: "theme"
		};
	}
	getLayoutOptions() {
		let e = gu(this._config).length, t = zu(this._config, e);
		return {
			grid_columns: Math.max(1, t * 1),
			grid_min_columns: .5,
			grid_rows: "auto"
		};
	}
	setConfig(e) {
		this._config = e;
		let t = e.accent_color || "theme";
		this._iconColor = this._computeIconColor(t), this._cardBackground = this._computeCircleColor(t), this._isRunning = !1, this._actions = [];
	}
	willUpdate(e) {
		return hu.call(this, e);
	}
	disconnectedCallback() {
		this._clearHoldTimer(), this._clearDoubleTapTimer(), super.disconnectedCallback();
	}
	shouldUpdate(e) {
		return Tn.call(this, e, gu(this._config).map((e) => e.entity || e.main_entity), { hasTemplates: En(this._config) });
	}
	_handleTap(e, t = 0) {
		if (this._longPressTriggered) {
			this._longPressTriggered = !1, this._stopEvent(e);
			return;
		}
		N.call(this, e, this._getActionEntityId(t), this._getTapAction(t), this._getDoubleTapAction(t));
	}
	_handleDoubleTap(e, t = 0) {
		P.call(this, e, this._getActionEntityId(t), this._getDoubleTapAction(t));
	}
	_clearDoubleTapTimer() {
		return He.call(this);
	}
	_getDoubleTapAction(e = 0) {
		let t = this._actions?.[e];
		return t?.double_tap_action?.action ? t.double_tap_action : this._config.double_tap_action?.action ? this._config.double_tap_action : null;
	}
	_handlePointerDown(e, t = 0) {
		M(this) || (this._stopEvent(e), this._clearHoldTimer(), this._holdTimer = setTimeout(() => {
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
		return t?.tap_action?.action ? t.tap_action : this._config.tap_action?.action ? this._config.tap_action : Nn(this._getActionEntityId(e), "toggle");
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
		return zu(this._config, e);
	}
	_getActionRowCount(e = this._actions?.length || 1) {
		return Bs({
			config: this._config,
			count: e,
			perRowKey: "actions_per_row"
		});
	}
	_handleAction(e, t = null) {
		return Ve.call(this, e, t);
	}
	_computeFullColor(e) {
		return rt.call(this, e);
	}
	_computeIconColor(e) {
		return it.call(this, e);
	}
	_computeCircleColor(e) {
		return at.call(this, e);
	}
	_isImageIcon(e) {
		return mn(e);
	}
	_resolveIconPath(e) {
		return hn(e);
	}
	_getInlineSvg(e, t = !0) {
		return L.call(this, e, { forceColor: t });
	}
	_getSvgColorOverride(e, t) {
		return gn(e, t);
	}
	_clearHoldTimer() {
		this._holdTimer &&= (clearTimeout(this._holdTimer), null);
	}
	_stopEvent(e) {
		e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation && e.stopImmediatePropagation();
	}
	render() {
		return bu.call(this);
	}
	static styles = wu;
};
function zu(e = {}, t = 1) {
	return zs({
		config: e,
		count: t,
		perRowKey: "actions_per_row"
	});
}
At({
	tag: "orbit-action-card",
	cardClass: Ru,
	name: "Orbit Action Card",
	description: "Compact scene, script, and automation launcher",
	version: t.action,
	getEntitySuggestion: Vu
});
var Bu = new Set([
	"automation",
	"button",
	"input_button",
	"scene",
	"script"
]);
function Vu(e, t) {
	return Bu.has(On(t)) ? { config: {
		type: "custom:orbit-action-card",
		main_entity: t
	} } : null;
}
//#endregion
//#region src/common/helpers/deck-padding.js
function Hu(e = {}) {
	let t = e?.attributes || {};
	return {
		top: Ju(t.padding_top),
		right: Ju(t.padding_right),
		bottom: Ju(t.padding_bottom),
		left: Ju(t.padding_left)
	};
}
function Uu(e = {}) {
	return Object.values(Hu(e)).some(Boolean);
}
function Wu(e = {}) {
	return e?.attributes?.force_padding === !0;
}
function Gu(e = {}) {
	return Uu(e) && (Wu(e) || !qu(e?.card));
}
function Ku(e = {}) {
	return Wu(e) && Uu(e);
}
function qu(e) {
	return Array.isArray(e) ? e.some((e) => qu(e)) : !e || typeof e != "object" ? typeof e == "string" ? /\bpadding(?:-(?:top|right|bottom|left))?\b/i.test(e) : !1 : Object.entries(e).some(([e, t]) => e.toLowerCase().includes("padding") || qu(t));
}
function Ju(e) {
	if (e == null || e === "") return "";
	let t = e.toString().trim();
	return t ? /^-?\d+(\.\d+)?$/.test(t) ? `${t}px` : t : "";
}
//#endregion
//#region src/cards/deck/items.js
function Yu(e = {}) {
	return Array.isArray(e?.decks) ? e.decks.map((e) => e?.badge ? {
		attributes: e?.attributes || {},
		badge: e.badge || {}
	} : {
		attributes: e?.attributes || {},
		card: e?.card || {}
	}) : [];
}
function Xu(e = {}) {
	return [
		$(e, "tap_action"),
		$(e, "hold_action"),
		$(e, "double_tap_action")
	].some(j);
}
function $(e = {}, t) {
	let n = e?.attributes?.[t];
	return n?.action ? n : null;
}
function Zu(e = {}) {
	let t = ed(e);
	return e?.attributes?.entity || nd(e?.attributes?.tap_action) || nd(e?.attributes?.hold_action) || nd(e?.attributes?.double_tap_action) || nd(t?.tap_action) || nd(t?.hold_action) || nd(t?.double_tap_action) || t?.entity || null;
}
function Qu(e = {}, t = !1) {
	let n = ed(e), r = Ku(e) ? td(n) : n, i = r, a = [
		"tap_action",
		"hold_action",
		"double_tap_action"
	].filter((t) => j($(e, t)));
	return a.length && (i = { ...r }, a.forEach((e) => delete i[e])), t ? {
		...i,
		hide_background: !0
	} : i;
}
function $u(e = {}) {
	return e?.badge ? "badge" : "card";
}
function ed(e = {}) {
	return e?.badge || e?.card || {};
}
function td(e) {
	return Array.isArray(e) ? e.map((e) => td(e)) : !e || typeof e != "object" ? e : Object.entries(e).reduce((e, [t, n]) => (t.toLowerCase().includes("padding") || (e[t] = td(n)), e), {});
}
function nd(e) {
	return e?.entity || e?.entity_id || null;
}
function rd(e = []) {
	return Math.max(0, e.findIndex((e) => e.attributes?.default));
}
function id(e = []) {
	return e.map((e, t) => e.attributes?.default ? t : "").join(":");
}
//#endregion
//#region src/cards/deck/layout.js
function ad(e = {}, t = 0) {
	let n = e?.attributes || {}, r = od(n.left, 0), i = od(n.top, 0);
	return `${[
		`--orbit-deck-overlay-left:${r}px`,
		`--orbit-deck-overlay-top:${i}px`,
		`--orbit-deck-overlay-z-index:${t + 1}`
	].join(";")};`;
}
function od(e, t) {
	if (e == null || e === "") return t;
	let n = Number(e);
	return Number.isFinite(n) ? n : t;
}
function sd(e) {
	let t = od(e, null);
	return t === null ? null : Math.max(0, t);
}
function cd(e = {}) {
	return e?.attributes?.fit === "crop" ? "crop" : "resize";
}
function ld(e, t, n, r, i) {
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
function ud(e = {}) {
	return [
		"equal",
		"dynamic",
		"custom"
	].includes(e?.tab_width_mode) ? e.tab_width_mode : "equal";
}
function dd(e = {}) {
	return [
		e.tab_font_size ? `--orbit-deck-tab-font-size:${e.tab_font_size};` : "",
		fd("--orbit-deck-tab-color", e.tab_color),
		fd("--orbit-deck-tab-active-color", e.tab_active_color),
		fd("--orbit-deck-tab-background-color", e.tab_background_color)
	].filter(Boolean).join("");
}
function fd(e, t) {
	return t ? `${e}:${rt(t)};` : "";
}
function pd(e, t = 1) {
	let n = Math.max(1, t), r = [];
	for (let t = 0; t < e.length; t += n) r.push(e.slice(t, t + n));
	return r;
}
function md(e, t) {
	return Array.from({ length: Math.max(0, t - e) }, () => T`
    <div class="deck-spacer"></div>
  `);
}
//#endregion
//#region src/cards/deck/surface.js
function hd(e = []) {
	return e.map((e) => {
		if (!e?.element) return `${e?.index ?? ""}:none`;
		let t = Hu(e.item), n = Wu(e.item), r = Gu(e.item);
		return [
			e.index,
			e.kind || $u(e.item),
			ed(e.item)?.type || "",
			n ? "force" : "child",
			r ? t.top : "",
			r ? t.right : "",
			r ? t.bottom : "",
			r ? t.left : ""
		].join(":");
	}).join("|");
}
function gd(e, t) {
	return e?.querySelector?.(`.deck-item-interaction[data-deck-index="${t}"]`);
}
function _d(e = {}, t = {}, n = 0) {
	let r = t?.attributes?.transparent_background;
	return e?.layout === "wrap" ? typeof r == "boolean" ? r : !e?.separate_cards : e?.layout === "overlay" ? n > 0 && r === !0 : e?.layout === "tabs" && r !== !1;
}
var vd = {
	background: "transparent",
	"backdrop-filter": "none",
	"-webkit-backdrop-filter": "none",
	"border-color": "transparent",
	"box-shadow": "none"
};
function yd(e, t) {
	if (t) {
		e._orbitDeckSurfaceStyles ||= Object.fromEntries(Object.keys(vd).map((t) => [t, {
			value: e.style.getPropertyValue(t),
			priority: e.style.getPropertyPriority(t)
		}])), bd(e), xd(e);
		return;
	}
	let n = e._orbitDeckSurfaceStyles;
	n && (Sd(e), Object.entries(n).forEach(([t, n]) => {
		n.value ? e.style.setProperty(t, n.value, n.priority) : e.style.removeProperty(t);
	}), delete e._orbitDeckSurfaceStyles);
}
function bd(e) {
	Object.entries(vd).forEach(([t, n]) => {
		(e.style.getPropertyValue(t) !== n || e.style.getPropertyPriority(t) !== "important") && e.style.setProperty(t, n, "important");
	});
}
function xd(e) {
	e._orbitDeckSurfaceObserver || (e._orbitDeckSurfaceObserver = new MutationObserver(() => {
		e._orbitDeckSurfaceStyles && bd(e);
	}), e._orbitDeckSurfaceObserver.observe(e, {
		attributes: !0,
		attributeFilter: ["style"]
	}));
}
function Sd(e) {
	e._orbitDeckSurfaceObserver?.disconnect(), e._orbitDeckSurfaceObserver = null;
}
function Cd(e) {
	let t = /* @__PURE__ */ new Set();
	return wd(e, t, /* @__PURE__ */ new WeakSet()), [...t];
}
function wd(e, t, n) {
	!e || n.has(e) || (n.add(e), e.localName === "ha-card" && t.add(e), [e.shadowRoot, e].filter(Boolean).forEach((e) => {
		let r = e.querySelectorAll?.("*") || [];
		for (let e of r) e.localName === "ha-card" && t.add(e), e.shadowRoot && wd(e, t, n);
	}));
}
function Td(e, t, n) {
	Ed(e, n ? t : {
		top: "",
		right: "",
		bottom: "",
		left: ""
	}), e._orbitDeckPaddingApplied = n;
}
function Ed(e, t) {
	Dd(e, "padding-top", t.top), Dd(e, "padding-right", t.right), Dd(e, "padding-bottom", t.bottom), Dd(e, "padding-left", t.left);
}
function Dd(e, t, n) {
	n ? (e.style.getPropertyValue(t) !== n || e.style.getPropertyPriority(t) !== "important") && e.style.setProperty(t, n, "important") : e.style.removeProperty(t);
}
function Od(e, t) {
	e._orbitDeckPadding = t, !e._orbitDeckPaddingObserver && (e._orbitDeckPaddingObserver = new MutationObserver(() => {
		e._orbitDeckPadding && Ed(e, e._orbitDeckPadding);
	}), e._orbitDeckPaddingObserver.observe(e, {
		attributes: !0,
		attributeFilter: ["style"]
	}));
}
function kd(e) {
	e._orbitDeckPadding = null, e._orbitDeckPaddingObserver?.disconnect(), e._orbitDeckPaddingObserver = null;
}
//#endregion
//#region src/cards/deck/styles/deck-card-styles.js
var Ad = d`
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
`, jd = [
	"type",
	"layout",
	"items_per_row",
	"separate_cards",
	"tab_font_size",
	"tab_divider",
	"tab_width_mode",
	"tab_color",
	"tab_active_color",
	"tab_background_color",
	"decks",
	"grid_options",
	"view_layout"
], Md = [
	"attributes",
	"badge",
	"card"
];
function Nd(e) {
	let t = {}, n = /* @__PURE__ */ new Set();
	return jd.forEach((r) => {
		Object.prototype.hasOwnProperty.call(e, r) && (t[r] = r === "decks" && Array.isArray(e[r]) ? e[r].map(Id) : e[r], n.add(r));
	}), Object.keys(e).forEach((r) => {
		n.has(r) || (t[r] = e[r]);
	}), t;
}
function Pd(e) {
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
function Fd(e = {}) {
	return e?.badge ? {
		attributes: e.attributes || {},
		badge: e.badge || {}
	} : {
		attributes: e?.attributes || {},
		card: e?.card || {}
	};
}
function Id(e) {
	if (!e || typeof e != "object" || Array.isArray(e)) return e;
	let t = {}, n = /* @__PURE__ */ new Set(), r = {
		...e,
		attributes: Ld(e.attributes || {})
	};
	return e.badge?.type ? (r.badge = e.badge, delete r.card) : e.card?.type ? (r.card = e.card, delete r.badge) : (delete r.badge, delete r.card), Md.forEach((e) => {
		Object.prototype.hasOwnProperty.call(r, e) && (t[e] = r[e], n.add(e));
	}), Object.keys(r).forEach((e) => {
		n.has(e) || (t[e] = r[e]);
	}), t;
}
function Ld(e = {}) {
	return Object.entries(e).reduce((e, [t, n]) => (n !== void 0 && n !== "" && (e[t] = n), e), {});
}
//#endregion
//#region src/editors/deck/item-helpers.js
function Rd(e = {}, t) {
	let n = zd(e);
	return n?.[t]?.action ? n[t] : t === "tap_action" && n?.entity ? "more-info" : "none";
}
function zd(e = {}) {
	return e?.badge || e?.card || {};
}
function Bd(e = {}, t, n = "Card") {
	let r = zd(e)?.type || "";
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
function Vd(e) {
	return Hd(e) !== "none";
}
function Hd(e) {
	return typeof e == "string" ? e : e?.action || "none";
}
//#endregion
//#region src/editors/deck/native-pickers.js
async function Ud() {
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
async function Wd() {
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
async function Gd({ eventName: e, dialogTag: t, detail: n, huiView: r }) {
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
function Kd(e, t) {
	let n = e.querySelectorAll?.("*") || [];
	for (let e of n) {
		if (t(e)) return e;
		if (e.shadowRoot) {
			let n = this._findElementInShadowRoots(e.shadowRoot, t);
			if (n) return n;
		}
	}
}
async function qd() {
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
function Jd() {
	let e = this._childPickerType;
	return T`
    <div class="editor-tabs deck-child-type-tabs" role="tablist">
      ${[["badge", "Badges"], ["card", "Cards"]].map(([t, n]) => T`
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
function Yd(e, t) {
	return this._childPickerType === "badge" ? this._renderBadgePicker(e, t) : this._renderCardPicker(e, t);
}
function Xd(e, t) {
	return t?.badge?.type ? customElements.get("hui-badge-element-editor") ? T`
      <hui-badge-element-editor
        .hass=${this.hass}
        .lovelace=${this.lovelace}
        .value=${t.badge}
        @config-changed=${(t) => {
		t.stopPropagation(), this._updateDeckBadge(e, t.detail.config);
	}}
      ></hui-badge-element-editor>
    ` : (this._ensureNativeBadgeEditor(), T`
        <div class="deck-card-picker-loading">
          <ha-spinner></ha-spinner>
        </div>
      `) : !this.hass || !this.lovelace ? T`` : customElements.get("hui-badge-picker") ? T`
    <hui-badge-picker
      .hass=${this.hass}
      .lovelace=${this.lovelace}
      .badgePicked=${(t) => this._updateDeckBadge(e, t)}
      @config-changed=${(t) => {
		t.stopPropagation(), this._updateDeckBadge(e, t.detail.config);
	}}
    ></hui-badge-picker>
  ` : (this._ensureNativeBadgePicker(), T`
      <div class="deck-card-picker-loading">
        <ha-spinner></ha-spinner>
      </div>
    `);
}
function Zd(e, t) {
	return t?.card?.type ? T`
      <hui-card-element-editor
        .hass=${this.hass}
        .lovelace=${this.lovelace}
        .value=${t.card}
        .showVisibilityTab=${["wrap", "tabs"].includes(this._config?.layout || "wrap")}
        @config-changed=${(t) => {
		t.stopPropagation(), this._updateDeckCard(e, t.detail.config);
	}}
      ></hui-card-element-editor>
    ` : !this.hass || !this.lovelace ? T`` : customElements.get("hui-card-picker") ? T`
    <hui-card-picker
      .hass=${this.hass}
      .lovelace=${this.lovelace}
      .cardPicked=${(t) => this._updateDeckCard(e, t)}
      @config-changed=${(t) => {
		t.stopPropagation(), this._updateDeckCard(e, t.detail.config);
	}}
    ></hui-card-picker>
  ` : (this._ensureNativeCardPicker(), T`
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
function Qd(e, t) {
	let n = t?.attributes || {}, r = this._config?.layout === "wrap", i = this._config?.layout === "tabs", a = this._config?.layout === "overlay" && e > 0, o = r || i || a, s = i || r && !this._config?.separate_cards, c = typeof n.transparent_background == "boolean" ? n.transparent_background : s;
	return T`
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
        ${i ? T`
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

        ${a ? T`
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

        ${o ? T`
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
var $d = [
	ls,
	Ou,
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

    .deck-interactions-section .interactions-form {
      margin-top: 0;
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
], ef = Symbol.for("orbit-deck-card-preview-selected-index"), tf = class extends A {
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
		super.connectedCallback(), io(this), this._updateDocumentationContext();
	}
	disconnectedCallback() {
		ao(this), super.disconnectedCallback();
	}
	setConfig(e) {
		let t = Pd(e || {});
		this._config = {
			...t.config,
			layout: ["tabs", "overlay"].includes(e?.layout) ? e.layout : "wrap"
		}, this._selectedDeckIndex = Math.min(this._selectedDeckIndex || 0, Math.max(0, this._getDeckItems().length - 1));
		let n = this._getDeckItems()[this._selectedDeckIndex];
		this._childPickerType = n?.badge ? "badge" : "card", this._updateDocumentationContext(), t.changed && queueMicrotask(() => this._dispatchConfigChanged());
	}
	_t(e, t) {
		return Y(this.hass, e, t);
	}
	_getColorPickerValue(e) {
		return co(e);
	}
	_getColorStyle(e) {
		return so(e);
	}
	_updateConfig(e) {
		this._config = Nd(hi(this._config, e)), this._dispatchConfigChanged();
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
			[ef]: this._selectedDeckIndex || 0
		};
	}
	_getDeckItems(e = this._config) {
		return Array.isArray(e?.decks) ? e.decks.map(Fd) : [];
	}
	_selectDeckItem(e) {
		let t = this._getDeckItems()[e];
		this._selectedDeckIndex = e, this._childPickerType = t?.badge ? "badge" : "card", this._dispatchPreviewSelection(e);
	}
	_dispatchPreviewSelection(e) {
		this.dispatchEvent(new CustomEvent("config-changed", {
			detail: { config: {
				...this._getPreviewConfig(),
				[ef]: e
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
		return fi.call(this, e, t, n, r);
	}
	_renderNumberInput(e, t, n = {}) {
		return mi.call(this, e, t, n);
	}
	_renderColorControl(e, t, n, r, i = n) {
		return bi.call(this, e, t, n, r, i);
	}
	_renderSubTabs() {
		return T`
      <div class="deck-subtabs-row">
        <div class="editor-tabs deck-subtabs">
          ${["setup", "card"].map((e) => T`
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
		Ot(this, "orbit-deck-card", e);
	}
	_renderSetup() {
		let e = this._getDeckItems();
		return T`
      <div class="section deck-card-tab-section">
        ${this._config?.layout === "wrap" ? El.call(this, {
			itemCount: e.length,
			classPrefix: "action",
			wrapEnabled: !0,
			showWrapToggle: !1,
			perRowKey: "items_per_row",
			perRowLabel: "Items per row",
			defaultPerRow: 1
		}) : this._config?.layout === "tabs" ? T`
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
		return T`
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
		let { itemsPerRow: n, shouldWrapTabs: r } = Tl({
			config: this._config,
			itemCount: e.length,
			wrapEnabled: this._config?.layout === "wrap",
			defaultPerRow: 1
		});
		return T`
      <div
        class="action-tabs ${r ? "wrapped" : ""} ${e.length > 1 ? "has-tools" : ""}"
        style=${r ? `--action-tabs-per-row: ${n};` : ""}
      >
        <div class="action-tab-items">
          ${e.map((e, n) => T`
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

          ${e.length > 0 && t < e.length ? T`
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
		return Jd.call(this);
	}
	_renderChildPicker(e, t) {
		return Yd.call(this, e, t);
	}
	_renderBadgePicker(e, t) {
		return Xd.call(this, e, t);
	}
	_renderCardPicker(e, t) {
		return Zd.call(this, e, t);
	}
	_renderDeckStyleControls(e, t) {
		return Qd.call(this, e, t);
	}
	_renderAttributeSelector(e, { label: t, selector: n, value: r, changeKey: i }) {
		return T`
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
		return mi.call(this, t, r, {
			value: n ?? "",
			min: i,
			onValueChanged: (t) => this._updateDeckAttributes(e, { [r]: t === "" || t === null ? void 0 : t })
		});
	}
	_renderDeckCardSection(e, t) {
		return T`
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
          ${Bd(t, this.hass, this._t("Card"))}
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
		let n = t?.attributes || {}, r = Rd(t, "tap_action"), i = Rd(t, "hold_action"), a = Rd(t, "double_tap_action");
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
					defaultVisible: Vd(r),
					displayDefaultValue: Vd(r)
				},
				{
					key: "hold_action",
					formKey: "hold_action",
					label: "Hold behavior",
					defaultAction: i,
					defaultVisible: Vd(i),
					displayDefaultValue: Vd(i)
				},
				{
					key: "double_tap_action",
					formKey: "double_tap_action",
					label: "Double tap behavior",
					defaultAction: a,
					defaultVisible: Vd(a),
					displayDefaultValue: Vd(a)
				}
			],
			context: { entity_id: n.entity || zd(t)?.entity }
		});
	}
	async _ensureNativeBadgePicker() {
		return Ud.call(this);
	}
	async _ensureNativeBadgeEditor() {
		return Wd.call(this);
	}
	async _loadNativeBadgeModule(e) {
		return Gd.call(this, e);
	}
	_findElementInShadowRoots(e, t) {
		return Kd.call(this, e, t);
	}
	async _ensureNativeCardPicker() {
		return qd.call(this);
	}
	_renderCard() {
		let e = this._getDeckItems(), t = Math.min(this._selectedDeckIndex || 0, e.length), n = e[t], r = t === e.length;
		return T`
      <div class="section">
        ${this._renderDeckTabs(e, t)}

        ${n || r ? T`
              ${n && this._config?.layout === "tabs" ? T`
                    <label class="deck-default-toggle">
                      <span>${this._t("Default")}</span>
                      <ha-switch
                        .checked=${!!n.attributes?.default}
                        @change=${(e) => this._setDefaultDeck(t, e.target.checked)}
                      ></ha-switch>
                    </label>
                  ` : ""}

              ${n ? this._renderDeckStyleControls(t, n) : ""}

              ${n ? T`
                    <div class="deck-interactions-section">
                      ${this._renderDeckInteractions(t, n)}
                    </div>
                  ` : ""}

              ${this._renderDeckCardSection(t, n)}
            ` : T`<div class="deck-empty-editor">${this._t("Add a card to start.")}</div>`}
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
		return T`
      <div class="wrapper">
        ${this._renderSubTabs()}
        ${this._selectedTab === "setup" ? this._renderSetup() : this._renderCard()}

        <div class="editor-version">
          ${this._t("Orbit Deck Card v{version}", { version: t.deck })}
        </div>
      </div>
    `;
	}
	static styles = $d;
};
customElements.define("orbit-deck-card-editor", tf);
//#endregion
//#region src/cards/deck-card.js
var nf = [
	"pointerdown",
	"click",
	"dblclick",
	"pointerup",
	"pointerleave",
	"pointercancel"
];
At({
	tag: "orbit-deck-card",
	cardClass: class extends A {
		static get properties() {
			return {
				hass: {},
				preview: { type: Boolean },
				_config: { type: Object },
				_deckCards: { state: !0 },
				_selectedIndex: { state: !0 }
			};
		}
		constructor() {
			super(), this._config = {}, this.preview = !1, this._deckCards = [], this._selectedIndex = 0, this._cardHelpers = null, this._cardBuildKey = "", this._defaultSelectionKey = "", this._paddingApplyKey = "", this._overlayGeometryFrame = null, this._overlayGeometryObserver = null, this._overlayObservedTargets = /* @__PURE__ */ new Set(), this._overlayGeometryToken = 0, this._deckEntryGeneration = 0, this._deckInteractionListener = (e) => this._handleDeckInteractionEvent(e);
		}
		connectedCallback() {
			super.connectedCallback(), this._bindDeckItemActionListeners(), this._paddingApplyKey = "", this.requestUpdate();
		}
		disconnectedCallback() {
			this._cancelLongPress(), this._clearDoubleTapTimer(), this._clearOverlayGeometryObserver(), this._disconnectDeckEntryObservers(), this._unbindDeckItemActionListeners(), super.disconnectedCallback();
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
			let e = Yu(this._config), t = Math.max(e.length, 1), n = this._getColumnCount(t);
			return {
				grid_columns: Math.max(1, n * 2),
				grid_min_columns: 1,
				grid_rows: "auto"
			};
		}
		setConfig(e) {
			let t = ["tabs", "overlay"].includes(e?.layout) ? e.layout : "wrap";
			this._config = {
				...e,
				layout: t
			};
			let n = Yu(this._config), r = id(n), i = rd(n);
			Number.isInteger(e?.[ef]) ? this._selectedIndex = Math.min(Math.max(0, e[ef]), Math.max(0, n.length - 1)) : r === this._defaultSelectionKey ? this._selectedIndex = Math.min(this._selectedIndex || 0, Math.max(0, n.length - 1)) : (this._selectedIndex = i, this._defaultSelectionKey = r), this._scheduleCardBuild();
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
			let o = n.item?.attributes || {}, s = $u(n.item) === "badge", c = sd(o.width), l = sd(o.height), u = cd(n.item) === "crop", d = ld(i, a, c, l, u);
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
			let e = Yu(this._config), t = JSON.stringify(e.map((e, t) => ({
				kind: $u(e),
				config: Qu(e, _d(this._config, e, t))
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
			let n = await this._loadCardHelpers(), r = e.map((e, t) => this._createDeckEntry(e, n, t, _d(this._config, e, t)));
			t === this._cardBuildKey && (this._deckCards = r);
		}
		async _loadCardHelpers() {
			return !this._cardHelpers && window.loadCardHelpers && (this._cardHelpers = await window.loadCardHelpers()), this._cardHelpers;
		}
		_createDeckEntry(e, t, n, r = !1) {
			let i = $u(e), a = Qu(e, r);
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
				t && new Set([t, ...Cd(t)]).forEach((e) => {
					disconnectDeckCardSurfaceObserver(e), kd(e);
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
			return Ve.call(this, e, t);
		}
		_navigate(e) {
			return Ge.call(this, e);
		}
		_clearDoubleTapTimer() {
			return He.call(this);
		}
		_startLongPress(e, t, n) {
			return Sn.call(this, e, t, n);
		}
		_cancelLongPress() {
			return Cn.call(this);
		}
		_finishLongPress(e) {
			return wn.call(this, e);
		}
		_getDeckEntryFromEventTarget(e) {
			let t = Number(e?.dataset?.deckIndex);
			return Number.isInteger(t) && this._deckCards[t] || null;
		}
		_bindDeckItemActionListeners() {
			nf.forEach((e) => {
				this.renderRoot.addEventListener(e, this._deckInteractionListener, !0);
			});
		}
		_unbindDeckItemActionListeners() {
			nf.forEach((e) => {
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
			if (!Xu(t?.item)) return;
			e.stopPropagation();
			let n = $(t?.item, "hold_action");
			if (j(n)) return this._startLongPress(e, Zu(t.item), n);
		}
		_handleDeckItemClick(e, t) {
			if (this._longPressTriggered) {
				this._longPressTriggered = !1;
				return;
			}
			let n = $(t?.item, "tap_action"), r = $(t?.item, "double_tap_action");
			!j(n) && !j(r) || N.call(this, e, Zu(t.item), n || { action: "none" }, r);
		}
		_handleDeckItemDoubleClick(e, t) {
			let n = $(t?.item, "double_tap_action");
			j(n) && P.call(this, e, Zu(t.item), n);
		}
		_renderInteractiveDeckEntry(e) {
			let t = Xu(e?.item), n = _d(this._config, e?.item, e?.index);
			return T`
      <div
        class="deck-item-interaction ${t ? "has-actions" : ""} ${n ? "transparent-background" : ""}"
        data-deck-index=${e?.index ?? ""}
      >
        ${this._renderDeckEntry(e)}
      </div>
    `;
		}
		_renderDeckEntry(e) {
			return e?.element ? e.element : T`
      <ha-card class="deck-error-card">
        <div class="deck-error-title">Configuration error</div>
        <div>${e?.error || "No card configured"}</div>
      </ha-card>
    `;
		}
		_applyDeckPaddingToEntries() {
			let e = this._deckCards.map((e) => _d(this._config, e.item, e.index) ? "flat" : "native").join(":"), t = `${hd(this._deckCards)}|surface:${e}`;
			t !== this._paddingApplyKey && (this._paddingApplyKey = t, this._deckCards.forEach((e) => this._applyDeckCardPadding(e)));
		}
		_applyDeckCardPadding(e, t = 0) {
			let n = e?.element;
			if (!n) return;
			let r = this._deckEntryGeneration, i = Hu(e.item), a = Gu(e.item);
			(n.updateComplete instanceof Promise ? n.updateComplete : Promise.resolve()).then(() => new Promise((e) => requestAnimationFrame(e))).then(() => {
				if (!this._isDeckEntryActive(e, r)) return;
				let o = Cd(n), s = o[0] || null, c = gd(this.renderRoot, e.index), l = _d(this._config, e.item, e.index);
				if (!(!s && !c)) {
					if ((a || l) && !s && t < 10 && window.setTimeout(() => this._applyDeckCardPadding(e, t + 1), 50), yd(n, l), o.forEach((e) => yd(e, l)), !a && !s?._orbitDeckPaddingApplied && !c?._orbitDeckPaddingApplied) {
						s && kd(s);
						return;
					}
					c && Td(c, i, !1), s && Td(s, i, a), a && s ? (Od(s, i), requestAnimationFrame(() => {
						this._isDeckEntryActive(e, r) && (c && Td(c, i, !1), Td(s, i, !0));
					})) : s && kd(s);
				}
			}).catch(() => {});
		}
		_renderWrap(e) {
			let t = this._getVisibleDeckEntries(), n = this._deckCards.filter((e) => e.visible === !1), r = this._getColumnCount(t.length || 1), i = pd(t, r);
			return T`
      <ha-card
        class="deck-card wrap ${e.length > 1 && this._config?.separate_cards ? "separate-cards" : ""}"
        style="--deck-columns:${r};"
      >
        <div class="deck-wrap">
          ${i.map((e) => T`
            <div class="deck-row">
              ${e.map((e) => T`
                <div class="deck-item">
                  ${this._renderInteractiveDeckEntry(e)}
                </div>
              `)}
              ${md(e.length, r)}
            </div>
          `)}
        </div>
        ${this._renderVisibilityObservers(n)}
      </ha-card>
    `;
		}
		_renderTabs(e) {
			let t = Math.min(this._selectedIndex || 0, Math.max(0, e.length - 1)), n = this._getVisibleDeckEntries(), r = n.find((e) => e.index === t) || n[0], i = r?.index ?? t, a = this._deckCards.filter((e) => e !== r), o = ud(this._config), s = dd(this._config);
			return T`
      <ha-card
        class="deck-card tabs tab-width-${o} ${this._config?.tab_divider === !1 ? "hide-tab-dividers" : ""}"
        style=${s}
      >
        <div class="deck-tabs" role="tablist">
          ${n.map((e) => T`
            <button
              type="button"
              class="deck-tab ${e.index === i ? "active" : ""}"
              role="tab"
              aria-selected=${e.index === i ? "true" : "false"}
              style=${o === "custom" ? `--orbit-deck-tab-width:${e.item.attributes?.width || "120px"};` : ""}
              @click=${() => this._selectTab(e.index)}
            >
              ${e.item.attributes?.icon ? T`<ha-icon .icon=${e.item.attributes.icon}></ha-icon>` : ""}
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
			return e.length ? T`
      <div class="deck-visibility-observers" aria-hidden="true">
        ${e.map((e) => this._renderDeckEntry(e))}
      </div>
    ` : "";
		}
		_renderOverlay() {
			let e = this._deckCards[0], t = this._deckCards.slice(1);
			return T`
      <ha-card class="deck-card overlay">
        <div class="deck-overlay">
          <div class="deck-overlay-main deck-item">
            ${this._renderInteractiveDeckEntry(e)}
          </div>

          ${t.map((e, t) => T`
            <div
              class="deck-overlay-item deck-item ${cd(e.item)} ${e.item?.attributes?.transparent_background === !0 ? "transparent-background" : ""} overlay-${e.kind || $u(e.item)}"
              data-deck-index=${e.index}
              style=${ad(e.item, t)}
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
			let e = Yu(this._config);
			return e.length ? this._config?.layout === "tabs" ? this._renderTabs(e) : this._config?.layout === "overlay" ? this._renderOverlay() : this._renderWrap(e) : T`
        <ha-card class="deck-card empty">
          <div>Add card</div>
        </ha-card>
      `;
		}
		static styles = Ad;
	},
	name: "Orbit Deck Card",
	description: "Wrap or tab any Lovelace cards",
	version: t.deck
});
//#endregion
//#region src/common/helpers/badge-registration.js
function rf({ tag: e, badgeClass: t, name: n, description: r, version: a, documentationURL: o }) {
	customElements.get(e) || customElements.define(e, t), window.customBadges = window.customBadges || [];
	for (let t = window.customBadges.length - 1; t >= 0; --t) window.customBadges[t].type === e && window.customBadges.splice(t, 1);
	window.customBadges.push({
		type: e,
		name: n,
		description: r,
		preview: !0,
		documentationURL: o || Dt(e)
	}), i(n, a);
}
//#endregion
//#region src/badges/helpers/model.js
function af() {
	let e = Z(this._config), t = this._getEntities(), n = mc(t), r = e === "template" ? F.call(this, this._config?.state_template, "") ?? "unavailable" : "", i = this._config?.active_template?.trim() || "", a = e === "template" && i ? F.call(this, i, "") : null, o = this._config?.inactive_template?.trim() || "", s = e === "template" && o ? F.call(this, o, "") : null, c = !!o && I(s), l = e === "template" ? I(a ?? r) : n.length > 0, u = this._config?.display_style === "badge" && !this._config?.card_visibility ? !0 : l, d = t[0], f = $s(this._config), p = f[0] || "", m = d?.entity_id.split(".")[0] || this._config?.domain || "", ee = Ks(m), h = this._config?.icon_source || (this._config?.icon ? "custom" : "domain"), te = this._config?.icon || "", ne = u ? this._config?.icon_on || te : this._config?.icon_off || te, re = h === "custom" && ne || ee.icon, g = u ? this._config?.accent_on_color ?? this._config?.color : this._config?.accent_off_color, _ = !!(g && ![
		"theme",
		"state",
		"state-active",
		"state-inactive"
	].includes(g)), ie = !g || [
		"theme",
		"state",
		"state-active",
		"state-inactive"
	].includes(g) ? "theme" : g, ae = e === "template" && this._config?.name_template?.trim() || "", v = ae ? F.call(this, ae, "") : null, y = String(v ?? "").trim(), b = e === "template" && !d ? {
		entity_id: "sensor.orbit_status_badge_template",
		state: r || "unavailable",
		attributes: { friendly_name: y || "Template" }
	} : n[0] || t[0] || {
		entity_id: `${m || "sensor"}.orbit_status_badge`,
		state: u ? "on" : "off",
		attributes: p ? { device_class: p } : {}
	}, oe = ["entity", "template"].includes(e) ? b : {
		entity_id: `${m}.orbit_status_badge`,
		state: b.state,
		attributes: p ? { device_class: p } : {}
	}, x = ac(this.hass, this._config), se = this._config?.name, ce = f.map((e) => Qs(e)).join(", "), le = (d && this.hass?.formatEntityName ? this.hass.formatEntityName(d) : "") || (e === "template" ? "Template" : x || ce || ee.label), ue = se && this.hass?.formatEntityName && this.hass.formatEntityName(b, of(se, y)) || le, de = h === "custom" ? u && this._config?.icon_on ? "icon_on" : !u && this._config?.icon_off ? "icon_off" : this._config?.icon ? "icon" : "" : "";
	return {
		entities: t,
		activeEntities: n,
		isOn: u,
		inactiveTemplateActive: c,
		count: n.length,
		displayValue: e === "template" ? r : e === "entity" ? b.state : n.length,
		label: ue,
		icon: re,
		iconKey: de,
		iconSource: h,
		stateSource: e,
		representativeStateObj: b,
		iconStateObj: oe,
		displayStateObj: ["entity", "template"].includes(e) ? b : {
			entity_id: "sensor.orbit_status_badge_count",
			state: u ? "on" : "off",
			attributes: {
				count: n.length,
				friendly_name: ue
			},
			last_changed: b.last_changed,
			last_updated: b.last_updated,
			context: b.context
		},
		defaultStateContent: e === "area_count" ? "count" : "state",
		hasIconColorOverride: _,
		iconColor: ie === "theme" ? sc(b, u) : rt(ie)
	};
}
function of(e, t) {
	let n = (e) => e?.type === "template" ? {
		type: "text",
		text: t
	} : e;
	return Array.isArray(e) ? e.map(n) : n(e);
}
//#endregion
//#region src/badges/styles/status-badge-styles.js
var sf = d`
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

`, cf = "sensor.orbit_status_badge_preview", lf = class extends A {
	static svgCache = R;
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
		_interactionsExpanded: { state: !0 },
		_templateRevision: { state: !0 }
	};
	constructor() {
		super(), this._config = {}, this._colorPickerKey = "", this._colorPickerTab = "picker", this._iconPickerKey = "", this._iconPickerTab = "ha", this._orbitIconFiles = [], this._orbitIconFilesLoading = !1, this._localIconFiles = [], this._localIconFilesLoading = !1, this._contentExpanded = !1, this._stateTypeExpanded = !1, this._interactionsExpanded = !1, this._namePickerEnhanceFrame = void 0, this._namePickerEnhanceAttempts = 0;
	}
	connectedCallback() {
		super.connectedCallback(), io(this), Ot(this, "orbit-status-badge"), queueMicrotask(() => this._syncTemplateSubscriptions());
	}
	disconnectedCallback() {
		this._namePickerEnhanceFrame !== void 0 && (cancelAnimationFrame(this._namePickerEnhanceFrame), this._namePickerEnhanceFrame = void 0), It.call(this), ao(this), super.disconnectedCallback();
	}
	updated(e) {
		(e.has("hass") || e.has("_config")) && (this._syncTemplateSubscriptions(), this._namePickerEnhanceAttempts = 0), this._scheduleNamePickerEnhancement();
	}
	_scheduleNamePickerEnhancement() {
		Z(this._config) !== "template" || this._namePickerEnhanceFrame !== void 0 || (this._namePickerEnhanceFrame = requestAnimationFrame(() => {
			this._namePickerEnhanceFrame = void 0, this._namePickerEnhanceAttempts += 1, this._enhanceNamePicker();
		}));
	}
	_syncTemplateSubscriptions() {
		let e = Z(this._config), t = [
			this._config?.state_template,
			this._config?.active_template,
			this._config?.inactive_template,
			this._config?.name_template
		], n = this._config?.display_style === "badge", r = (e === "template" ? n ? [this._config?.active_template, this._config?.inactive_template] : t : []).filter(Boolean).map((e) => ({
			template: e,
			entityId: ""
		}));
		Ft.call(this, r);
	}
	_enhanceNamePicker() {
		let e = this.shadowRoot?.querySelector(".status-badge-name-selector"), t = df(e, "ha-entity-name-picker");
		if (!t) {
			this._namePickerEnhanceAttempts < 10 && this._scheduleNamePickerEnhancement();
			return;
		}
		if (this._namePickerEnhanceAttempts = 0, t.__orbitTemplateNameEnhanced) return;
		let n = t._getFilteredItems, r = t._validTypes, i = t._formatItem, a = t._pickerValueChanged;
		typeof n != "function" || typeof r != "function" || typeof i != "function" || typeof a != "function" || (t.__orbitTemplateNameEnhanced = !0, t._validTypes = (e) => new Set([...r.call(t, e), "template"]), t._formatItem = (e) => e?.type === "template" ? this._t("Template") : i.call(t, e), t._getFilteredItems = () => {
			let e = n.call(t), r = uf(t.value), i = t._editIndex != null && r[t._editIndex]?.type === "template";
			if (!r.some((e) => e?.type === "template") || i) {
				let t = String(F.call(this, this._config?.name_template, "") ?? "").trim(), n = this._t("Template"), r = t || this._t("Not configured");
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
			let n = uf(t.value), r = { type: "template" };
			t._editIndex == null ? n.push(r) : (n[t._editIndex] = r, t._editIndex = void 0), t._setValue(n), t._picker && (t._picker.value = void 0);
		}, t.requestUpdate());
	}
	setConfig(e) {
		this._config = Zs(e || {});
	}
	_t(e, t) {
		return Y(this.hass, e, t);
	}
	_updateConfig(e) {
		this._config = Zs(hi(this._config, e)), this._dispatchConfigChanged(this._config);
	}
	_dispatchConfigChanged(e) {
		this.dispatchEvent(new CustomEvent("config-changed", {
			detail: { config: e },
			bubbles: !0,
			composed: !0
		}));
	}
	_handleConfigUpdate(e, t) {
		let n = ["accent_on_color", "accent_off_color"].includes(e) && (!t || t === "theme");
		this._updateConfig({ [e]: n || t === "" ? void 0 : t });
	}
	_renderColor(e, t, n) {
		return yi.call(this, e, t, n);
	}
	_renderIconInput(e, t, n = "mdi:lightbulb or icon.svg") {
		return Lr.call(this, e, t, n);
	}
	_getColorStyle(e) {
		return so(e);
	}
	_getColorPickerValue(e) {
		return co(e);
	}
	_loadLocalIconFiles(e = "") {
		return zr.call(this, e);
	}
	_isImageIcon(e) {
		return Fr(e);
	}
	_resolveIconPath(e) {
		return Ir(e);
	}
	_getInlineSvg(e) {
		return L.call(this, e, { forceColor: !0 });
	}
	_getDeviceClassOptions() {
		return tc(this.hass, this._config);
	}
	_getStateContentHass() {
		let e = (/* @__PURE__ */ new Date()).toISOString(), t = ac(this.hass, this._config), n = this._config?.name_template?.trim() || "", r = {
			entity_id: cf,
			state: "on",
			attributes: {
				count: 2,
				friendly_name: (Z(this._config) === "template" ? String(F.call(this, n, "") ?? "").trim() : "") || t || "Orbit status"
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
				[cf]: {
					entity_id: cf,
					platform: "orbit",
					area_id: ic(this._config)[0] || null,
					device_id: null
				}
			},
			states: {
				...this.hass?.states || {},
				[cf]: r
			}
		};
	}
	render() {
		let e = this._config?.display_style === "badge", n = this._getDeviceClassOptions(), r = Vs.find((e) => e.value === this._config?.domain), i = [
			...this._config?.show_name === !0 ? ["name"] : [],
			...this._config?.show_state === !1 ? [] : ["state"],
			...this._config?.show_icon === !1 ? [] : ["icon"]
		], a = Z(this._config), o = this._config?.entity || "", s = a === "entity" && o ? this.hass : this._getStateContentHass(), c = a === "entity" && o ? o : cf;
		return T`
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
              ${kl.call(this, {
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
              ${e ? this._renderColor(["Background", "Color"], "card_color", "primary-color") : T`
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

              <div class="color-pair">
                ${this._renderColor(["Active", "Color"], "accent_on_color", e ? "white" : "theme")}
                ${this._renderColor(["Inactive", "Color"], "accent_off_color", e ? "white" : "theme")}
              </div>

              ${Ol.call(this, a)}

              ${e ? "" : T`
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
                    ${a === "template" ? "" : T`
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

          ${Dl.call(this, a)}
        </div>

        <div class="editor-version">
          ${this._t("Orbit Status Badge v{version}", { version: t.statusBadge })}
        </div>
      </div>
    `;
	}
	static styles = [...ls, d`
      .content-panel,
      .state-type-panel,
      .badge-interactions-panel {
        display: block;
        --expansion-panel-content-padding: 0;
        border-radius: var(--ha-border-radius-md);
        --ha-card-border-radius: var(--ha-border-radius-md);
      }

      .content-panel > [slot="header"],
      .state-type-panel > [slot="header"],
      .badge-interactions-panel > [slot="header"] {
        margin: 0;
        font-size: inherit;
        font-weight: inherit;
      }

      .content-panel ha-icon,
      .state-type-panel ha-icon,
      .badge-interactions-panel > ha-icon {
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

      .badge-interactions-content {
        display: flex;
        flex-direction: column;
        gap: 16px;
        padding: 12px;
      }
    `];
};
customElements.define("orbit-status-badge-editor", lf);
function uf(e) {
	return e ? typeof e == "string" ? [{
		type: "text",
		text: e
	}] : Array.isArray(e) ? [...e] : [e] : [];
}
function df(e, t) {
	if (!e) return;
	if (e.matches?.(t)) return e;
	let n = e.shadowRoot?.querySelector(t);
	if (n) return n;
	for (let n of e.shadowRoot?.querySelectorAll("*") || []) {
		let e = df(n, t);
		if (e) return e;
	}
}
//#endregion
//#region src/index.js
rf({
	tag: "orbit-status-badge",
	badgeClass: class extends A {
		static svgCache = R;
		static properties = {
			hass: { attribute: !1 },
			_config: { state: !0 },
			_isHeadingBadge: { state: !0 },
			_templateRevision: { state: !0 },
			...fc
		};
		constructor() {
			super(), pc.call(this);
		}
		static getConfigElement() {
			return document.createElement("orbit-status-badge-editor");
		}
		static getStubConfig() {
			return {};
		}
		setConfig(e) {
			qs(e || {}), this._config = Zs(e || {});
		}
		_t(e, t) {
			return Y(this.hass, e, t);
		}
		connectedCallback() {
			super.connectedCallback(), this._isHeadingBadge = !!this.closest("hui-heading-badge"), this.toggleAttribute("heading-badge", this._isHeadingBadge), queueMicrotask(() => this._syncTemplateSubscriptions());
		}
		disconnectedCallback() {
			It.call(this), _c.call(this), this._clearDoubleTapTimer(), this._cancelLongPress(), super.disconnectedCallback();
		}
		updated(e) {
			(e.has("hass") || e.has("_config")) && this._syncTemplateSubscriptions();
		}
		shouldUpdate(e) {
			if (!e.has("hass") || e.has("_config") || [...e.keys()].some((e) => e !== "hass")) return !0;
			let t = e.get("hass"), n = this.hass;
			if (!t || !n || t.entities !== n.entities || t.devices !== n.devices || t.areas !== n.areas) return !0;
			let r = Z(this._config);
			return r === "template" ? !0 : (r === "area_count" ? oc(this.hass, this._config) : [this._config?.entity].filter(Boolean)).some((e) => t.states?.[e] !== n.states?.[e]);
		}
		_syncTemplateSubscriptions() {
			let e = Z(this._config), t = this._config?.state_template?.trim() || "", n = this._config?.active_template?.trim() || "", r = this._config?.inactive_template?.trim() || "", i = this._config?.name_template?.trim() || "", a = this._config?.display_style === "badge", o = (e === "template" ? a ? [n, r] : [
				t,
				n,
				r,
				i
			] : []).filter(Boolean).map((e) => ({
				template: e,
				entityId: ""
			}));
			Ft.call(this, o);
		}
		_getEntities() {
			return rc(this.hass, this._config);
		}
		_getModel() {
			return af.call(this);
		}
		_handleAction(e, t = null) {
			if (e?.action === "Current state") {
				hc.call(this);
				return;
			}
			return Ve.call(this, e, t);
		}
		_navigate(e) {
			return Ge(e);
		}
		_clearDoubleTapTimer() {
			return He.call(this);
		}
		_cancelLongPress() {
			return Cn.call(this);
		}
		get _LONG_PRESS_DELAY() {
			return 500;
		}
		_handlePointerDown(e, t) {
			if (j(this._config?.hold_action)) return Sn.call(this, e, t, this._config?.hold_action);
		}
		_handlePointerEnd(e) {
			return wn.call(this, e);
		}
		_handleTap(e, t) {
			if (this._longPressTriggered) {
				this._longPressTriggered = !1;
				return;
			}
			let n = Ws(this._config);
			return N.call(this, e, t, this._config?.tap_action || n, this._config?.double_tap_action);
		}
		_handleDoubleTap(e, t) {
			return P.call(this, e, t, this._config?.double_tap_action);
		}
		_renderIcon(e) {
			let t = this._config?.display_style === "badge", n = t ? "width:12px;height:12px;margin:0;" : "", r = t ? "width:16px;height:16px;margin:0;border-radius:var(--ha-border-radius-md);" : "", i = e.stateSource === "entity" && this._config?.show_entity_picture ? e.representativeStateObj.attributes?.entity_picture_local || e.representativeStateObj.attributes?.entity_picture : "";
			if (i) return T`
        <img
          class="entity-picture"
          slot="icon"
          src=${this.hass?.hassUrl ? this.hass.hassUrl(i) : i}
          alt=""
          style=${r}
        />
      `;
			if (!mn(e.icon)) return T`
        <ha-state-icon
          slot="icon"
          .icon=${e.iconSource === "custom" ? e.icon : void 0}
          .stateObj=${e.iconSource === "custom" ? e.representativeStateObj : e.iconStateObj}
        ></ha-state-icon>
      `;
			if (mn(e.icon)) {
				let t = hn(e.icon), r = e.iconKey ? gn(this._config, e.iconKey) : !0;
				if (t.toLowerCase().split("?")[0].endsWith(".svg")) {
					let e = L.call(this, t, { forceColor: r });
					return e ? T`<span slot="icon" class="image-icon">${z(e)}</span>` : T`<img
              slot="icon"
              src=${t}
              alt=""
              style=${n}
            />`;
				}
				return T`<img
        slot="icon"
        src=${t}
        alt=""
        style=${n}
      />`;
			}
			return "";
		}
		_renderActiveEntitiesDialog(e) {
			return Ic.call(this, e.activeEntities);
		}
		render() {
			let e = this._getModel(), t = e.activeEntities[0]?.entity_id || e.entities[0]?.entity_id || null, n = j(this._config?.tap_action || Ws(this._config)) || j(this._config?.hold_action) || j(this._config?.double_tap_action), r = this._config?.display_style === "badge", i = this._config?.card_visibility || "always", a = i === "always" || i === "state" && e.isOn || i === "template" && (e.isOn || e.inactiveTemplateActive), o = !r && this._config?.show_state !== !1, s = !r && this._config?.show_name === !0, c = r || this._config?.show_icon !== !1, l = this._config?.card_color ? rt(this._config.card_color) : "var(--primary-color)", u = `--badge-color:${e.iconColor};`, d = [
				`--tile-badge-background-color:${l}`,
				`--tile-badge-icon-color:${e.hasIconColorOverride ? e.iconColor : "var(--white-color, #fff)"}`,
				"--mdc-icon-size:12px"
			].join(";"), f = T`
      ${c ? this._renderIcon(e) : ""}
      ${o ? e.stateSource === "template" ? T`<span class="template-state">${e.displayValue}</span>` : T`
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
			return r && !a ? D : r ? T`
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
      ` : T`${this._isHeadingBadge ? T`
          <ha-heading-badge
            .type=${n ? "button" : "text"}
            style=${[
				`--icon-color:${e.iconColor}`,
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
        ` : T`
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
		static styles = [sf, wl];
	},
	name: "Orbit Status Badge",
	description: "Displays an entity, area count, or template state",
	version: t.statusBadge
}), i("Orbit Cards", e);
//#endregion
